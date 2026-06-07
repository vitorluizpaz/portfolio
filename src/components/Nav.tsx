import { useEffect, useState } from "react";
import { motion } from "motion/react";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-3xl items-center justify-between rounded-full px-3 py-2 transition-all duration-300 ${
          scrolled ? "glass shadow-2xl shadow-black/40" : "bg-transparent"
        }`}
      >
        <a
          href="#top"
          className="flex items-center gap-2 pl-2 font-display text-sm font-semibold tracking-tight"
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-iris to-cyan text-ink">
            VP
          </span>
          <span className="hidden sm:inline">Vitor Paz</span>
        </a>

        <div className="flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-paper"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-1 rounded-full bg-paper px-4 py-1.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            Hire
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
