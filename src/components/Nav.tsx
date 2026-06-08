import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useSettings } from "../settings";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, toggleLang, theme, toggleTheme } = useSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#work", label: t.nav.work },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];

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
          <div className="hidden md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-paper"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* language toggle */}
          <button
            onClick={toggleLang}
            aria-label={t.a11y.lang}
            title={t.a11y.lang}
            className="flex items-center rounded-full border border-line p-0.5 text-xs font-semibold"
          >
            <span
              className={`rounded-full px-2 py-1 transition-colors ${
                lang === "en" ? "bg-paper text-ink" : "text-muted"
              }`}
            >
              EN
            </span>
            <span
              className={`rounded-full px-2 py-1 transition-colors ${
                lang === "pt" ? "bg-paper text-ink" : "text-muted"
              }`}
            >
              PT
            </span>
          </button>

          {/* theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={t.a11y.theme}
            title={t.a11y.theme}
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-colors hover:text-paper"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <a
            href="#contact"
            className="ml-1 hidden rounded-full bg-paper px-4 py-1.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] sm:inline-block"
          >
            {t.nav.hire}
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
