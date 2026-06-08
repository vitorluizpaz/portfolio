import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "./data/projects";

export type Theme = "dark" | "light";

/** All translatable UI copy (project content lives in data/projects.ts). */
const STRINGS = {
  en: {
    nav: { work: "Work", about: "About", contact: "Contact", hire: "Hire" },
    hero: {
      available: "Available for frontend work",
      taglinePre:
        "Frontend engineer obsessed with the details most people scroll past — motion, type, and interfaces that feel ",
      taglineEm: "alive",
      cta: "See the work",
      projects: "projects",
    },
    work: {
      kicker: "Selected Work",
      title: "Things built with care.",
      more: "More on the way — this gallery grows with every project. ✦",
    },
    card: {
      live: "Live",
      wip: "In progress",
      archived: "Archived",
      view: (n: number) => `View ${n} shots`,
      open: "Open",
    },
    about: {
      kicker: "About",
      bodyPre: "I'm ",
      bodyName: "Vitor",
      bodyMid:
        " — a frontend engineer who treats the browser like a canvas. I sweat the micro-interactions, the easing curves, the empty states. The boring stuff done right is what makes the cool stuff feel ",
      bodyEm: "effortless",
      stats: [
        { k: "∞", v: "attention to detail" },
        { k: "0", v: "janky frames shipped" },
        { k: "100%", v: "hand-crafted UI" },
      ],
    },
    contact: {
      kicker: "Let's build something",
      titlePre: "Got an idea that\ndeserves to feel ",
      titleEm: "amazing",
      cta: "Start a conversation",
    },
    footer: {
      role: "Frontend Engineer",
      built: "Designed & built with React, Tailwind & Motion.",
    },
    a11y: { theme: "Toggle light / dark mode", lang: "Switch language" },
  },
  pt: {
    nav: {
      work: "Trabalhos",
      about: "Sobre",
      contact: "Contato",
      hire: "Contratar",
    },
    hero: {
      available: "Disponível para trabalhos de frontend",
      taglinePre:
        "Engenheiro frontend obcecado pelos detalhes que a maioria ignora — animação, tipografia e interfaces que parecem ",
      taglineEm: "vivas",
      cta: "Ver os projetos",
      projects: "projetos",
    },
    work: {
      kicker: "Trabalhos selecionados",
      title: "Coisas feitas com capricho.",
      more: "Mais por vir — esta galeria cresce a cada projeto. ✦",
    },
    card: {
      live: "No ar",
      wip: "Em andamento",
      archived: "Arquivado",
      view: (n: number) => `Ver ${n} telas`,
      open: "Abrir",
    },
    about: {
      kicker: "Sobre",
      bodyPre: "Eu sou o ",
      bodyName: "Vitor",
      bodyMid:
        " — um engenheiro frontend que trata o navegador como uma tela em branco. Cuido das microinterações, das curvas de animação, dos estados vazios. É o básico bem feito que faz o resto parecer ",
      bodyEm: "natural",
      stats: [
        { k: "∞", v: "atenção aos detalhes" },
        { k: "0", v: "frames travados entregues" },
        { k: "100%", v: "UI feita à mão" },
      ],
    },
    contact: {
      kicker: "Vamos construir algo",
      titlePre: "Tem uma ideia que\nmerece ficar ",
      titleEm: "incrível",
      cta: "Começar uma conversa",
    },
    footer: {
      role: "Engenheiro Frontend",
      built: "Projetado e construído com React, Tailwind e Motion.",
    },
    a11y: { theme: "Alternar modo claro / escuro", lang: "Trocar idioma" },
  },
};

export type Strings = (typeof STRINGS)["en"];

type SettingsCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  t: Strings;
};

const Ctx = createContext<SettingsCtx | null>(null);

function initialLang(): Lang {
  const saved = localStorage.getItem("lang");
  if (saved === "en" || saved === "pt") return saved;
  return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
}

function initialTheme(): Theme {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const value = useMemo<SettingsCtx>(
    () => ({
      lang,
      setLang: setLangState,
      toggleLang: () => setLangState((l) => (l === "en" ? "pt" : "en")),
      theme,
      setTheme: setThemeState,
      toggleTheme: () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
      t: STRINGS[lang],
    }),
    [lang, theme],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
