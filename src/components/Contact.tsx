import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const SOCIALS = [
  { label: "Email", href: "mailto:hello@vitorpaz.dev", Icon: Mail },
  { label: "GitHub", href: "https://github.com/", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/", Icon: Linkedin },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[2rem] border border-line bg-ink-soft/70 px-6 py-16 text-center sm:px-12 sm:py-24"
      >
        <div className="mesh absolute inset-0 opacity-40" />
        <div className="relative">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-iris">
            Let's build something
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold leading-[0.95] tracking-tighter sm:text-7xl">
            Got an idea that
            <br />
            deserves to feel <span className="text-gradient">amazing</span>?
          </h2>

          <a
            href="mailto:hello@vitorpaz.dev"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            Start a conversation
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <div className="mt-10 flex items-center justify-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-iris hover:text-paper"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
