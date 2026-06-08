import { motion } from "motion/react";
import { useSettings } from "../settings";

export default function About() {
  const { t } = useSettings();
  const STATS = t.about.stats;
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <span className="font-display text-sm uppercase tracking-[0.3em] text-cyan">
            {t.about.kicker}
          </span>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-display text-2xl leading-snug tracking-tight sm:text-3xl"
          >
            {t.about.bodyPre}
            <span className="text-gradient">{t.about.bodyName}</span>
            {t.about.bodyMid}
            <span className="text-iris">{t.about.bodyEm}</span>.
          </motion.p>
        </div>

        <div className="grid gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.v}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass flex items-baseline gap-4 rounded-2xl px-5 py-4"
            >
              <span className="font-display text-3xl font-semibold text-paper">
                {s.k}
              </span>
              <span className="text-sm text-muted">{s.v}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
