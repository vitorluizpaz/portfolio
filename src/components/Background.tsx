import { useEffect, useRef } from "react";

/**
 * Fixed backdrop: animated mesh gradient + a pointer-following spotlight.
 * The grain overlay is applied via the `.grain` class on <body>'s wrapper.
 */
export default function Background() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="mesh absolute inset-0 opacity-70" />
      {/* pointer spotlight */}
      <div
        ref={ref}
        className="absolute inset-0 transition-opacity"
        style={{
          background:
            "radial-gradient(22rem 22rem at var(--mx, 50%) var(--my, 30%), color-mix(in srgb, var(--color-iris) 18%, transparent), transparent 70%)",
        }}
      />
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 80%)",
        }}
      />
    </div>
  );
}
