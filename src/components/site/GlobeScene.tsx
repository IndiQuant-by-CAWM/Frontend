import { useEffect, useRef } from "react";
import type { BufferGeometry, InstancedMesh, Material, Mesh, Object3D } from "three";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// Fixed, full-viewport WebGL scene behind the landing page: the earth on a
// scroll-driven flight path, a Starlink constellation with Hubble, the ISS and
// the Moon orbiting it. Ported from the AURA design canvas.
//
// It is decoration only — every word on the page is legible without it, and the
// scene is skipped entirely when the viewer prefers reduced motion or the
// browser cannot give us a WebGL context.

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

export function GlobeScene({ spinSpeed = 1 }: { spinSpeed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let alive = true;
    let raf = 0;
    let dispose: (() => void) | undefined;

    void (async () => {
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
        const dayMap = tex("/earth/earth-color-4k.jpg", true);
        const nightMap = tex("/earth/earth-night-4k.jpg", true);
        const cloudMap = tex("/earth/earth-clouds-2k.jpg", true);
        const specMap = tex("/earth/earth-spec-2k.jpg", false);
        const bumpMap = tex("/earth/earth-bump-2k.jpg", false);

        const earthGroup = new THREE.Group();
        scene.add(earthGroup);

        const R = 2;
        const globe = new THREE.Mesh(
          new THREE.SphereGeometry(R, 128, 128),
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
          new THREE.SphereGeometry(R * 1.012, 96, 96),
          new THREE.MeshPhongMaterial({
            map: cloudMap,
            bumpMap,
            bumpScale: 0.6,
            transparent: true,
            opacity: 0.34,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        );
        earthGroup.add(clouds);

        scene.add(new THREE.AmbientLight(0xffffff, 0.35));
        const sun = new THREE.DirectionalLight(0xffffff, 1.5);
        sun.position.set(4, 2, 4);
        scene.add(sun);

        // Contributor network: real craft on individual orbits — a Starlink
        // constellation plus Hubble, the ISS and the Moon. They live on
        // earthGroup so they ride the scroll flight path with the planet
        // instead of drifting free of it.
        const STARLINK_COUNT = 14;

        const gltfLoader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("/draco/");
        gltfLoader.setDRACOLoader(dracoLoader);

        // Everything is authored at its own real-world scale, so each model is
        // normalised to a target size in globe radii rather than trusted.
        const fitToSize = (object: Object3D, target: number) => {
          const box = new THREE.Box3().setFromObject(object);
          const span = Math.max(...box.getSize(new THREE.Vector3()).toArray());
          object.scale.multiplyScalar(target / (span || 1));
        };

        const orbitFor = (radius: number, speedScale: number) => {
          const inclination = Math.acos(2 * Math.random() - 1);
          const node = Math.random() * Math.PI * 2;
          const normal = new THREE.Vector3(
            Math.sin(inclination) * Math.cos(node),
            Math.cos(inclination),
            Math.sin(inclination) * Math.sin(node),
          ).normalize();
          const u = new THREE.Vector3()
            .crossVectors(normal, Math.abs(normal.y) > 0.9 ? xAxis : yAxis)
            .normalize();
          const v = new THREE.Vector3().crossVectors(normal, u).normalize();
          return {
            radius,
            u,
            v,
            normal,
            phase: Math.random() * Math.PI * 2,
            speed: (speedScale / Math.pow(radius / R, 1.5)) * (Math.random() < 0.5 ? -1 : 1),
          };
        };

        const yAxis = new THREE.Vector3(0, 1, 0);
        const xAxis = new THREE.Vector3(1, 0, 0);

        // Reused every frame so orienting the swarm allocates nothing.
        const satPos = new THREE.Vector3();
        const satFwd = new THREE.Vector3();
        const satUp = new THREE.Vector3();
        const satRight = new THREE.Vector3();
        const satMatrix = new THREE.Matrix4();

        type Orbit = ReturnType<typeof orbitFor>;
        const orient = (o: Orbit, angle: number, scale: number) => {
          const ca = Math.cos(angle);
          const sa = Math.sin(angle);
          satPos
            .copy(o.u)
            .multiplyScalar(ca * o.radius)
            .addScaledVector(o.v, sa * o.radius);
          satFwd.copy(o.u).multiplyScalar(-sa).addScaledVector(o.v, ca).normalize();
          satUp.copy(o.normal);
          satRight.crossVectors(satUp, satFwd).normalize();
          satUp.crossVectors(satFwd, satRight).normalize();
          satMatrix.makeBasis(satRight, satUp, satFwd);
          satMatrix.scale(new THREE.Vector3(scale, scale, scale));
          satMatrix.setPosition(satPos);
          return satMatrix;
        };

        // Starlink is a constellation, so it is drawn as one instanced mesh; the
        // single-craft models are added as ordinary objects.
        let starlinks: InstancedMesh | null = null;
        let starlinkOrbits: Orbit[] = [];
        const solo: { object: Object3D; orbit: Orbit; scale: number }[] = [];

        const load = (url: string) =>
          new Promise<GLTF>((resolve, reject) => gltfLoader.load(url, resolve, undefined, reject));

        // The scene renders from the first frame; craft appear as they arrive.
        void (async () => {
          try {
            const [starlinkGltf, hubbleGltf, issGltf, moonGltf] = await Promise.all([
              load("/models/starlink.glb"),
              load("/models/hubble.glb"),
              load("/models/iss.glb"),
              load("/models/moon.glb"),
            ]);
            if (!alive) return;

            let source: Mesh | null = null;
            starlinkGltf.scene.traverse((child) => {
              if (!source && (child as Mesh).isMesh) source = child as Mesh;
            });
            if (source) {
              const mesh = source as Mesh;
              mesh.updateWorldMatrix(true, false);
              const geometry = mesh.geometry.clone().applyMatrix4(mesh.matrixWorld);
              geometry.computeBoundingBox();
              const span = Math.max(
                ...geometry.boundingBox!.getSize(new THREE.Vector3()).toArray(),
              );
              geometry.scale(0.14 / span, 0.14 / span, 0.14 / span);
              starlinks = new THREE.InstancedMesh(
                geometry,
                mesh.material as Material,
                STARLINK_COUNT,
              );
              starlinks.frustumCulled = false;
              starlinkOrbits = Array.from({ length: STARLINK_COUNT }, () =>
                orbitFor(R * (1.28 + Math.pow(Math.random(), 0.85) * 0.75), 0.3),
              );
              earthGroup.add(starlinks);
            }

            const addSolo = (gltf: GLTF, size: number, radius: number, speed: number) => {
              const object = gltf.scene;
              fitToSize(object, size);
              object.updateMatrixWorld(true);
              const holder = new THREE.Group();
              holder.add(object);
              holder.frustumCulled = false;
              earthGroup.add(holder);
              solo.push({ object: holder, orbit: orbitFor(radius, speed), scale: 1 });
            };

            // Orbits are kept inside the camera's visible span at the globe
            // plane, so each craft actually comes around into frame.
            addSolo(hubbleGltf, 0.2, R * 1.55, 0.26);
            addSolo(issGltf, 0.34, R * 1.33, 0.3);
            // The Moon is a natural satellite: much larger, further out, and far
            // slower than anything crewed.
            addSolo(moonGltf, 0.62, R * 2.3, 0.075);
          } catch (err) {
            // Models are decoration on top of decoration; the globe stands alone.
            console.error("IndiQuant satellite models failed to load:", err);
          }
        })();

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

        let p = 0;
        const tick = () => {
          if (!alive) return;
          const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const target = Math.min(1, Math.max(0, window.scrollY / max));
          p += (target - p) * 0.065;
          const t = performance.now() * 0.001;

          // Scroll-driven flight path around the globe.
          earthGroup.position.x = kf(p, [
            [0, 2.3],
            [0.2, -1.75],
            [0.45, 1.9],
            [0.72, -1.6],
            [1, 0.2],
          ]);
          earthGroup.position.y = kf(p, [
            [0, -0.25],
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
              [0, 1.16],
              [0.2, 0.9],
              [0.45, 1.02],
              [0.72, 0.94],
              [1, 0.72],
            ]),
          );

          // India-facing at rest, then a slow rotation as the page advances.
          globe.rotation.y = -1.35 + t * 0.035 * spinSpeed + p * 3.4;
          globe.rotation.z = 0.41;
          clouds.rotation.y = globe.rotation.y + t * 0.012;
          clouds.rotation.z = 0.41;
          earthGroup.rotation.x = kf(p, [
            [0, 0.06],
            [0.45, -0.22],
            [1, 0.3],
          ]);
          // Each craft advances along its own orbit; scroll nudges the whole
          // constellation forward so the sky keeps moving as the page does.
          const clock = t + p * 14;
          if (starlinks) {
            for (let i = 0; i < STARLINK_COUNT; i++) {
              const o = starlinkOrbits[i];
              starlinks.setMatrixAt(i, orient(o, o.phase + clock * o.speed, 1));
            }
            starlinks.instanceMatrix.needsUpdate = true;
          }
          for (const s of solo) {
            const o = s.orbit;
            s.object.matrix.copy(orient(o, o.phase + clock * o.speed, s.scale));
            s.object.matrixAutoUpdate = false;
            s.object.matrixWorldNeedsUpdate = true;
          }

          camera.position.x = mouse.x * 0.36;
          camera.position.y = -mouse.y * 0.28;
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
          starlinks?.dispose();
          dracoLoader.dispose();
          [dayMap, nightMap, cloudMap, specMap, bumpMap].forEach((tx) => tx.dispose());
          renderer.dispose();
        };
      } catch (err) {
        // No WebGL, a blocked module, or a texture that would not decode: the
        // page reads correctly on the flat ink ground without the scene.
        console.error("IndiQuant globe scene failed to initialise:", err);
      }
    })();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      dispose?.();
    };
  }, [spinSpeed]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-1"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 22% 38%, rgba(8,8,26,0.86), transparent 72%)",
        }}
      />
      {/* On narrow viewports the globe fills the frame behind the copy. A flat
          veil hid it almost entirely, so instead the ground is weighted toward
          the top and bottom edges, where the text sits, and left open through
          the middle where the earth reads. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-1 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,26,0.82) 0%, rgba(8,8,26,0.30) 38%, rgba(8,8,26,0.30) 62%, rgba(8,8,26,0.82) 100%)",
        }}
      />
    </>
  );
}
