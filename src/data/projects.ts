export type Lang = "en" | "pt";

/** A string available in every supported language. */
export type LangText = Record<Lang, string>;

export type Shot = {
  /** path under /public */
  src: string;
  /** short label shown in the lightbox */
  caption: LangText;
};

export type Project = {
  /** stable id, also used for anchors */
  slug: string;
  /** brand name — same in every language */
  title: string;
  /** one-line punchy subtitle */
  tagline: LangText;
  /** longer paragraph for the detail panel */
  description: LangText;
  year: string;
  status: "live" | "wip" | "archived";
  /** glyph shown as a small badge on the card */
  emoji: string;
  /** screenshots — first one is the card preview; all are shown in the lightbox */
  gallery?: Shot[];
  /** two hex colors that theme the whole card */
  accent: [string, string];
  tech: string[];
  /** 2-4 things worth bragging about, per language */
  highlights: Record<Lang, string[]>;
  /** optional deployed URL — card gets an "Open" button when present */
  live?: string;
  /** optional source link */
  repo?: string;
};

/**
 * 👋 To add a project, just append an object here.
 * Everything in the UI (cards, count, filters, lightbox) is derived from this
 * array. Translatable fields carry both languages: { en: "...", pt: "..." }.
 */
export const projects: Project[] = [
  {
    slug: "ticket-to-ride-manual",
    title: "All Aboard",
    tagline: {
      en: "An interactive manual for Ticket to Ride",
      pt: "Um manual interativo de Ticket to Ride",
    },
    description: {
      en: "A fan-made, beautifully typeset rules companion for the board game Ticket to Ride. Reads like a vintage railway timetable — sepia, rail-red, and parchment — but it's fully interactive: a draggable route sandbox, a live scoring table, and a quiz that checks you actually learned the rules.",
      pt: "Um guia de regras não-oficial e caprichado na tipografia para o jogo de tabuleiro Ticket to Ride. Parece uma tabela de horários ferroviária antiga — sépia, vermelho-trem e pergaminho — mas é totalmente interativo: um sandbox de rotas arrastáveis, uma tabela de pontuação ao vivo e um quiz que confirma se você aprendeu as regras.",
    },
    year: "2026",
    status: "live",
    emoji: "🚂",
    gallery: [
      {
        src: "/shots/ttr-1-hero.png",
        caption: {
          en: "The illustrated conductor's handbook",
          pt: "O manual ilustrado do maquinista",
        },
      },
      {
        src: "/shots/ttr-3-map.png",
        caption: {
          en: "Interactive route-building map sandbox",
          pt: "Sandbox interativo de construção de rotas",
        },
      },
      {
        src: "/shots/ttr-4-scoring.png",
        caption: {
          en: "How routes score — visual scoring guide",
          pt: "Como as rotas pontuam — guia visual",
        },
      },
      {
        src: "/shots/ttr-2-turn.png",
        caption: {
          en: "Your turn, broken down step by step",
          pt: "Sua vez, explicada passo a passo",
        },
      },
      {
        src: "/shots/ttr-5-quiz.png",
        caption: {
          en: "The conductor's exam — a quick rules quiz",
          pt: "O exame do maquinista — um quiz rápido",
        },
      },
    ],
    accent: ["#e2483d", "#f2a341"],
    tech: ["React 19", "TypeScript", "Tailwind", "Vite"],
    highlights: {
      en: [
        "Interactive map sandbox with real route geometry",
        "Live scoring calculator",
        "Self-check quiz on the rules",
        "Hand-tuned vintage-print art direction",
      ],
      pt: [
        "Sandbox de mapa interativo com geometria real das rotas",
        "Calculadora de pontuação ao vivo",
        "Quiz de autoavaliação das regras",
        "Direção de arte vintage feita à mão",
      ],
    },
    live: "https://vitorluizpaz.github.io/ticket-to-ride-manual/",
    repo: "https://github.com/vitorluizpaz/ticket-to-ride-manual",
  },
  {
    slug: "fwc26-simulator",
    title: "FWC26 Simulator",
    tagline: {
      en: "Predict the 2026 World Cup, phase by phase",
      pt: "Simule a Copa do Mundo de 2026, fase por fase",
    },
    description: {
      en: "An interactive FIFA World Cup 2026 predictor built on the real 48-team December 2025 draw. Enter results round by round and the group tables, best-third race, and the entire knockout bracket recompute instantly — full FIFA tiebreakers, constraint-respecting Round-of-32 seeding, and penalty shootouts included.",
      pt: "Um simulador interativo da Copa do Mundo FIFA 2026 baseado no sorteio real de 48 seleções de dezembro de 2025. Insira os resultados rodada a rodada e as tabelas dos grupos, a disputa dos melhores terceiros e todo o mata-mata se recalculam na hora — com os critérios de desempate da FIFA, chaveamento da Rodada de 32 respeitando as restrições e disputas de pênaltis.",
    },
    year: "2026",
    status: "live",
    emoji: "⚽",
    gallery: [
      {
        src: "/shots/fwc-6-champion.png",
        caption: {
          en: "And we have a World Champion — the simulated final",
          pt: "E temos um campeão mundial — a final simulada",
        },
      },
      {
        src: "/shots/fwc-2-standings.png",
        caption: {
          en: "Live group standings with full FIFA tiebreakers",
          pt: "Classificação dos grupos ao vivo com critérios da FIFA",
        },
      },
      {
        src: "/shots/fwc-5-bracket.png",
        caption: {
          en: "The knockout bracket, Round of 32 to Final",
          pt: "O mata-mata, da Rodada de 32 à final",
        },
      },
      {
        src: "/shots/fwc-4-bracket.png",
        caption: {
          en: "Round of 32 — seeded from the official draw",
          pt: "Rodada de 32 — chaveada a partir do sorteio oficial",
        },
      },
      {
        src: "/shots/fwc-3-filled.png",
        caption: {
          en: "Every group recomputes as you enter results",
          pt: "Cada grupo se recalcula conforme você insere os resultados",
        },
      },
      {
        src: "/shots/fwc-1-groups.png",
        caption: {
          en: "Start from the real 48-team December 2025 draw",
          pt: "Comece pelo sorteio real de 48 seleções de dez/2025",
        },
      },
    ],
    accent: ["#16a34a", "#2563eb"],
    tech: ["React 19", "TypeScript", "Tailwind v4", "Vite"],
    highlights: {
      en: [
        "Real 48-team official draw, Groups A–L",
        "Live standings with full FIFA tiebreakers",
        "Best-8-of-12 third place via bipartite matching",
        "Visual bracket + localStorage persistence",
      ],
      pt: [
        "Sorteio oficial real de 48 seleções, Grupos A–L",
        "Classificação ao vivo com todos os critérios da FIFA",
        "Os 8 melhores de 12 terceiros via emparelhamento bipartido",
        "Chaveamento visual + persistência em localStorage",
      ],
    },
    live: "https://vitorluizpaz.github.io/fwc26-simulator/",
    repo: "https://github.com/vitorluizpaz/fwc26-simulator",
  },
];
