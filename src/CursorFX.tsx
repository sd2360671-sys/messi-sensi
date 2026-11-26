import { useEffect, useRef } from "react";

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

/**
 * Full-page purple cursor experience:
 * - glowing dot + lagging ring (grows on interactive elements)
 * - particle trail on a canvas
 * - soft spotlight that follows the mouse
 * - click ripple bursts
 */
export default function CursorFX() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      // touch devices: still show tap bursts only
    }
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    let w = (cv.width = window.innerWidth);
    let h = (cv.height = window.innerHeight);
    const onResize = () => {
      w = cv.width = window.innerWidth;
      h = cv.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const mouse = { x: w / 2, y: h / 2, rx: w / 2, ry: h / 2, gx: w / 2, gy: h / 2 };
    const parts: P[] = [];
    let last = { x: mouse.x, y: mouse.y };

    const spawn = (x: number, y: number, n: number, speed: number) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = Math.random() * speed;
        parts.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          life: 1,
          size: Math.random() * 3 + 1,
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const dx = mouse.x - last.x;
      const dy = mouse.y - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 6) {
        spawn(mouse.x, mouse.y, Math.min(3, Math.ceil(dist / 25)), 0.8);
        last = { x: mouse.x, y: mouse.y };
      }
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest?.("a,button,[data-hover],input,video");
      ring.current?.classList.toggle("cursor-hover", interactive);
    };
    const onDown = (e: PointerEvent) => {
      spawn(e.clientX, e.clientY, 28, 5);
      ring.current?.classList.add("cursor-down");
    };
    const onUp = () => ring.current?.classList.remove("cursor-down");

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    let raf = 0;
    const loop = () => {
      mouse.rx += (mouse.x - mouse.rx) * 0.16;
      mouse.ry += (mouse.y - mouse.ry) * 0.16;
      mouse.gx += (mouse.x - mouse.gx) * 0.07;
      mouse.gy += (mouse.y - mouse.gy) * 0.07;
      if (dot.current)
        dot.current.style.transform = `translate3d(${mouse.x}px,${mouse.y}px,0) translate(-50%,-50%)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${mouse.rx}px,${mouse.ry}px,0) translate(-50%,-50%)`;
      if (glow.current)
        glow.current.style.transform = `translate3d(${mouse.gx}px,${mouse.gy}px,0) translate(-50%,-50%)`;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= 0.022;
        if (p.life <= 0) {
          parts.splice(i, 1);
          continue;
        }
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
        g.addColorStop(0, `rgba(192,132,252,${p.life})`);
        g.addColorStop(0.4, `rgba(147,51,234,${p.life * 0.5})`);
        g.addColorStop(1, "rgba(147,51,234,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <>
      <canvas ref={canvas} className="pointer-events-none fixed inset-0 z-[9998]" />
      <div
        ref={glow}
        className="cursor-glow pointer-events-none fixed left-0 top-0 z-[1] h-[560px] w-[560px] rounded-full"
      />
      <div ref={ring} className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9999]" />
      <div ref={dot} className="cursor-dot pointer-events-none fixed left-0 top-0 z-[9999]" />
    </>
  );
}
