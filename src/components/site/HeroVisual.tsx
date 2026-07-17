import { useEffect, useRef } from "react";

/**
 * IndiQuant signature visualization — a slow particle network.
 *
 * Hundreds of tiny nodes drift on a dark canvas. When two nodes are near, a
 * hair-thin line fades between them. The cursor gently biases motion —
 * never chases, never distorts. Everything is measured in seconds, not frames.
 *
 * Rendered on a canvas for GPU-friendly performance; falls back to a
 * near-static field for prefers-reduced-motion.
 */
export function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;

    // Pointer state (in CSS pixels, canvas-local).
    const pointer = { x: -9999, y: -9999, active: false };

    type P = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      // gentle sinusoidal breathing for opacity
      phase: number;
      speed: number;
    };
    let particles: P[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const seed = () => {
      // Density tuned to feel populated without being noisy.
      const area = width * height;
      const target = Math.round(Math.min(260, Math.max(120, area / 9000)));
      particles = new Array(target).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: 0.5 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0008 + Math.random() * 0.0014,
      }));
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    // Attach on window so the visualization responds even under content.
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);

    resize();

    const LINK_DIST = 110; // px
    const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
    const CENTER_PULL = 0.00008;
    const POINTER_RADIUS = 180;

    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;

      ctx.clearRect(0, 0, width, height);

      // Very soft radial vignette baked in via a subtle overlay gradient.
      const cx = width * 0.5;
      const cy = height * 0.5;

      // Update
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reduced) {
          // Gentle drift toward center — a whisper of gravity.
          p.vx += (cx - p.x) * CENTER_PULL;
          p.vy += (cy - p.y) * CENTER_PULL;

          // Very light pointer influence — attract subtly within radius.
          if (pointer.active) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < POINTER_RADIUS * POINTER_RADIUS && d2 > 1) {
              const f = (1 - Math.sqrt(d2) / POINTER_RADIUS) * 0.015;
              p.vx += dx * f * 0.02;
              p.vy += dy * f * 0.02;
            }
          }

          // Damping — keeps motion calm.
          p.vx *= 0.985;
          p.vy *= 0.985;

          p.x += p.vx * (dt / 16);
          p.y += p.vy * (dt / 16);
          p.phase += p.speed * dt;

          // Wrap softly.
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }
      }

      // Draw links first (behind nodes).
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST_SQ) {
            const alpha = (1 - d2 / LINK_DIST_SQ) * 0.14;
            ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes.
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - cx;
        const dy = p.y - cy;
        const distFromCenter = Math.sqrt(dx * dx + dy * dy);
        const centerFalloff = Math.max(
          0.35,
          1 - distFromCenter / (Math.max(width, height) * 0.55),
        );
        const breathe = 0.55 + Math.sin(p.phase) * 0.25;
        const alpha = Math.min(0.9, 0.35 + breathe * 0.55) * centerFalloff;
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Soft central signal.
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 240);
      glow.addColorStop(0, "rgba(108,99,255,0.14)");
      glow.addColorStop(0.5, "rgba(108,99,255,0.04)");
      glow.addColorStop(1, "rgba(108,99,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      if (!reduced) raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0">
      <canvas
        ref={canvasRef}
        aria-hidden
        className="h-full w-full"
      />
    </div>
  );
}
