import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Shot } from "../data/projects";
import { asset } from "../lib/asset";
import { useSettings } from "../settings";

const SLIDE = {
  enter: (d: number) => ({ opacity: 0, x: d * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -60 }),
};

export type LightboxState = {
  title: string;
  accent: [string, string];
  shots: Shot[];
  index: number;
};

export default function Lightbox({
  state,
  onClose,
}: {
  state: LightboxState | null;
  onClose: () => void;
}) {
  const { lang } = useSettings();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);

  // sync with the shot that was clicked
  useEffect(() => {
    if (state) setI(state.index);
  }, [state]);

  const count = state?.shots.length ?? 0;
  const go = useCallback(
    (delta: number) => {
      setDir(delta);
      setI((prev) => (prev + delta + count) % count);
    },
    [count],
  );

  // keyboard controls + lock body scroll while open
  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [state, go, onClose]);

  const shot = state?.shots[i];
  const [c1, c2] = state?.accent ?? ["#7c5cff", "#22d3ee"];

  return createPortal(
    <AnimatePresence>
      {state && shot && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex flex-col bg-ink/90 backdrop-blur-xl"
          onClick={onClose}
          data-hot
        >
          {/* top bar */}
          <div
            className="flex items-center justify-between px-5 py-4 sm:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: c2 }}
              />
              <span className="font-display text-sm font-semibold sm:text-base">
                {state.title}
              </span>
              <span className="text-sm text-muted">
                {i + 1} / {count}
              </span>
            </div>
            <button
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-paper hover:text-paper"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* stage */}
          <div
            className="relative flex flex-1 items-center justify-center px-4 sm:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            {count > 1 && (
              <button
                onClick={() => go(-1)}
                aria-label="Previous"
                className="absolute left-2 z-10 grid h-12 w-12 place-items-center rounded-full glass text-paper transition-transform hover:scale-110 sm:left-5"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            <div className="relative h-full max-h-[68vh] w-full max-w-5xl overflow-hidden">
              <AnimatePresence mode="popLayout" custom={dir}>
                <motion.img
                  key={shot.src}
                  src={asset(shot.src)}
                  alt={shot.caption[lang]}
                  custom={dir}
                  variants={SLIDE}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 m-auto max-h-full max-w-full rounded-xl border border-line object-contain shadow-2xl shadow-black/60"
                  style={{ boxShadow: `0 30px 80px -20px ${c1}55` }}
                />
              </AnimatePresence>
            </div>

            {count > 1 && (
              <button
                onClick={() => go(1)}
                aria-label="Next"
                className="absolute right-2 z-10 grid h-12 w-12 place-items-center rounded-full glass text-paper transition-transform hover:scale-110 sm:right-5"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* caption + thumbnails */}
          <div
            className="px-5 pb-6 pt-3 sm:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-4 text-center text-sm text-muted">
              {shot.caption[lang]}
            </p>
            <div className="flex justify-center gap-2 overflow-x-auto pb-1">
              {state.shots.map((s, idx) => (
                <button
                  key={s.src}
                  onClick={() => {
                    setDir(idx > i ? 1 : -1);
                    setI(idx);
                  }}
                  className="relative h-12 w-20 shrink-0 overflow-hidden rounded-md border transition-all"
                  style={{
                    borderColor: idx === i ? c2 : "transparent",
                    opacity: idx === i ? 1 : 0.45,
                  }}
                  aria-label={s.caption[lang]}
                >
                  <img
                    src={asset(s.src)}
                    alt=""
                    className="h-full w-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
