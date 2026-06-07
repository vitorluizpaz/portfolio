import { motion } from "motion/react";

const STATS = [
  { k: "∞", v: "attention to detail" },
  { k: "0", v: "janky frames shipped" },
  { k: "100%", v: "hand-crafted UI" },
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <span className="font-display text-sm uppercase tracking-[0.3em] text-cyan">
            About
          </span>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-display text-2xl leading-snug tracking-tight sm:text-3xl"
          >
            I'm <span className="text-gradient">Vitor</span> — a frontend
            engineer who treats the browser like a canvas. I sweat the
            micro-interactions, the easing curves, the empty states. The boring
            stuff done right is what makes the cool stuff feel{" "}
            <span className="text-iris">effortless</span>.
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
