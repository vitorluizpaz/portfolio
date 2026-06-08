import { useState } from "react";
import { motion } from "motion/react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import Lightbox, { type LightboxState } from "./Lightbox";
import { useSettings } from "../settings";

export default function Work() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const { t } = useSettings();

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-sm uppercase tracking-[0.3em] text-iris"
          >
            {t.work.kicker}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {t.work.title}
          </motion.h2>
        </div>
        <span className="hidden shrink-0 font-display text-sm text-muted sm:block">
          {projects.length.toString().padStart(2, "0")} / ∞
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            index={i}
            onOpenGallery={(shotIndex) =>
              p.gallery &&
              setLightbox({
                title: p.title,
                accent: p.accent,
                shots: p.gallery,
                index: shotIndex,
              })
            }
          />
        ))}
      </div>

      <Lightbox state={lightbox} onClose={() => setLightbox(null)} />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 text-center text-sm text-muted"
      >
        {t.work.more}
      </motion.p>
    </section>
  );
}
