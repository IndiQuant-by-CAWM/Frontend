import { useEffect, useRef } from "react";
import type { BufferGeometry, Material, Mesh } from "three";

// Fixed, full-viewport WebGL scene behind the landing page: the earth on a
// scroll-driven flight path, turned so the Indian subcontinent faces the
// viewer at rest.
//
// It is decoration only. Every word on the page is legible without it, so it
// is skipped entirely when:
//   - the viewport is narrower than 768px (the globe would sit behind the copy),
//   - the visitor prefers reduced motion,
//   - the browser asks for reduced data (Save-Data),
//   - or WebGL is unavailable.
// When it does run, three.js is imported only after the browser is idle, so it
// never competes with the first paint. Satellite models were dropped: they
// cost ~3.7 MB for a few pixels of movement.

/** Smoothstep-interpolated keyframe track: stops are [progress, value] pairs. */
function kf(p: number, stops: [number, number][]): number {
  for (let i = 0; i < stops.length - 1; i++) {
    const [t0, v0] = stops[i];
    const [t1, v1] = stops[i + 1];
    if (p <= t1 || i === stops.length - 2) {
      const u = Math.min(1, Math.max(0, (p - t0) / (t1 - t0)));
      return v0 + (v1 - v0) * (u * u * (3 - 2 * u));
    }
  }
  return stops[stops.length - 1][1];
}

/**
 * Yaw that brings longitude ~78°E (central India) to the camera-facing side.
 *
 * three.js maps an equirectangular texture so that, at rotation 0, longitude
 * -90° faces +z. A point at texture-u sits at phi = u·2π and ends up facing the
 * camera when phi + yaw = π/2. India's u is (78 + 180) / 360. The globe rests to
 * the right of the camera, so the side we actually see is turned ~0.35 rad
 * towards -x; the small offset puts India on the visible centre-right of the
 * disc, clear of the text column on the left.
 */
const INDIA_YAW = Math.PI / 2 - ((78 + 180) / 360) * Math.PI * 2 - 0.12;

function shouldRender(): boolean {
  if (typeof window === "undefined") return false;
  if (!window.matchMedia?.("(min-width: 768px)").matches) return false;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return false;
  return true;
}

function whenIdle(fn: () => void): () => void {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(fn, { timeout: 2500 });
    return () => w.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(fn, 1200);
  return () => window.clearTimeout(id);
}

export function GlobeScene({ spinSpeed = 1 }: { spinSpeed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !shouldRender()) return;

    let alive = true;
    let raf = 0;
    let dispose: (() => void) | undefined;

    const start = async () => {
      try {
        const THREE = await import("three");
        if (!alive) return;

        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          46,
          window.innerWidth / window.innerHeight,
          0.1,
          300,
        );
        camera.position.set(0, 0, 6.4);

        const loader = new THREE.TextureLoader();
        const tex = (path: string, srgb: boolean) => {
          const t = loader.load(path);
          if (srgb) t.colorSpace = THREE.SRGBColorSpace;
          t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
          return t;
        };
        const dayMap = tex("/earth/earth-color-2k.webp", true);
        const nightMap = tex("/earth/earth-night-2k.webp", true);
        const cloudMap = tex("/earth/earth-clouds-1k.webp", true);
        const specMap = tex("/earth/earth-spec-1k.webp", false);
        const bumpMap = tex("/earth/earth-bump-1k.webp", false);

        const earthGroup = new THREE.Group();
        scene.add(earthGroup);

        const R = 2;
        const globe = new THREE.Mesh(
          new THREE.SphereGeometry(R, 96, 96),
          new THREE.MeshPhongMaterial({
            map: dayMap,
            bumpMap,
            bumpScale: 0.4,
            specularMap: specMap,
            specular: new THREE.Color("#1b2a6b"),
            shininess: 14,
            emissiveMap: nightMap,
            emissive: new THREE.Color("#ffffff"),
            emissiveIntensity: 0.85,
          }),
        );
        earthGroup.add(globe);

        const clouds = new THREE.Mesh(
          new THREE.SphereGeometry(R * 1.012, 72, 72),
          new THREE.MeshPhongMaterial({
            map: cloudMap,
            bumpMap,
            bumpScale: 0.6,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        );
        earthGroup.add(clouds);

        scene.add(new THREE.AmbientLight(0xffffff, 0.35));
        const sun = new THREE.DirectionalLight(0xffffff, 1.5);
        sun.position.set(4, 2, 4);
        scene.add(sun);

        const onResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight, false);
        };
        window.addEventListener("resize", onResize);

        const mouse = { x: 0, y: 0 };
        const onMove = (e: PointerEvent) => {
          mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
          mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("pointermove", onMove, { passive: true });

        const startedAt = performance.now();
        let p = 0;
        const tick = () => {
          if (!alive) return;
          const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const target = Math.min(1, Math.max(0, window.scrollY / max));
          p += (target - p) * 0.065;
          const t = (performance.now() - startedAt) * 0.001;

          // Scroll-driven flight path. At rest the globe sits right of the
          // text column.
          earthGroup.position.x = kf(p, [
            [0, 2.35],
            [0.2, -1.75],
            [0.45, 1.9],
            [0.72, -1.6],
            [1, 0.2],
          ]);
          earthGroup.position.y = kf(p, [
            [0, -0.2],
            [0.2, 0.8],
            [0.45, -0.95],
            [0.72, 0.7],
            [1, 1.9],
          ]);
          earthGroup.position.z = kf(p, [
            [0, 0],
            [0.2, 1.2],
            [0.45, -1.6],
            [0.72, 0.9],
            [1, -4.5],
          ]);
          earthGroup.scale.setScalar(
            kf(p, [
              [0, 1.12],
              [0.2, 0.9],
              [0.45, 1.02],
              [0.72, 0.94],
              [1, 0.72],
            ]),
          );

          // India faces the viewer at rest; a very slow drift and the scroll
          // position turn it from there.
          globe.rotation.y = INDIA_YAW + t * 0.004 * spinSpeed + p * 3.4;
          globe.rotation.z = 0.41;
          clouds.rotation.y = globe.rotation.y + t * 0.006;
          clouds.rotation.z = 0.41;
          // A slight forward tilt brings the northern tropics (India sits at
          // ~8-35°N) towards the camera.
          earthGroup.rotation.x = kf(p, [
            [0, 0.32],
            [0.45, -0.22],
            [1, 0.3],
          ]);

          camera.position.x = mouse.x * 0.3;
          camera.position.y = -mouse.y * 0.22;
          camera.lookAt(earthGroup.position.x * 0.35, earthGroup.position.y * 0.3, 0);

          canvas.style.opacity = kf(p, [
            [0, 1],
            [0.16, 0.72],
            [0.5, 0.66],
            [0.8, 0.78],
            [1, 0.95],
          ]).toFixed(3);

          renderer.render(scene, camera);
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        dispose = () => {
          window.removeEventListener("resize", onResize);
          window.removeEventListener("pointermove", onMove);
          scene.traverse((obj) => {
            const mesh = obj as Mesh<BufferGeometry, Material | Material[]>;
            mesh.geometry?.dispose?.();
            const mat = mesh.material;
            if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
            else mat?.dispose?.();
          });
          [dayMap, nightMap, cloudMap, specMap, bumpMap].forEach((tx) => tx.dispose());
          renderer.dispose();
        };
      } catch (err) {
        // No WebGL, a blocked module, or a texture that would not decode: the
        // page reads correctly on the flat ink ground without the scene.
        console.error("IndiQuant globe scene failed to initialise:", err);
      }
    };

    const cancelIdle = whenIdle(() => void start());

    return () => {
      alive = false;
      cancelIdle();
      cancelAnimationFrame(raf);
      dispose?.();
    };
  }, [spinSpeed]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 hidden h-full w-full opacity-0 transition-opacity duration-700 md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-1 hidden md:block"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 22% 38%, rgba(8,8,26,0.86), transparent 72%)",
        }}
      />
    </>
  );
}
