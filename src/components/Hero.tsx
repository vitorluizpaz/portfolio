import { motion } from "motion/react";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { projects } from "../data/projects";
import { useSettings } from "../settings";

const ease = [0.16, 1, 0.3, 1] as const;

function Word({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease, delay }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const { t } = useSettings();
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 pt-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.1 }}
        className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-ink-soft/60 px-3 py-1 text-xs text-muted"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
        </span>
        {t.hero.available}
      </motion.div>

      <h1 className="font-display text-[15vw] font-bold leading-[0.86] tracking-tighter sm:text-[12vw] lg:text-[9.5rem]">
        <span className="block text-gradient">
          <Word delay={0.15}>Vitor</Word>
        </span>
        <span className="block">
          <Word delay={0.28}>Paz</Word>
          <motion.span
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.7 }}
            className="ml-4 inline-block align-top text-iris"
          >
            <Sparkles className="inline h-[0.5em] w-[0.5em]" strokeWidth={1.5} />
          </motion.span>
        </span>
      </h1>

      <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.6 }}
          className="max-w-md text-lg leading-relaxed text-muted"
        >
          {t.hero.taglinePre}
          <span className="text-paper">{t.hero.taglineEm}</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.75 }}
          className="flex items-center gap-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-iris to-cyan px-6 py-3 font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            {t.hero.cta}
            <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </a>
          <div className="text-sm text-muted">
            <span className="block font-display text-2xl text-paper">
              {projects.length.toString().padStart(2, "0")}
            </span>
            {t.hero.projects}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
