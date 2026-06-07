import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * A two-part custom cursor: an instant inner dot and a lagging outer ring
 * that swells when hovering interactive elements. Hidden on touch devices.
 */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  const [hot, setHot] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      setHot(!!el.closest("a, button, [data-hot]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute -ml-4 -mt-4 flex h-8 w-8 items-center justify-center"
      >
        <motion.span
          animate={{ scale: hot ? 1.9 : 1, opacity: hot ? 0.9 : 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="block h-8 w-8 rounded-full border border-iris"
        />
      </motion.div>
      <motion.div
        style={{ x, y }}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-cyan"
      />
    </div>
  );
}
