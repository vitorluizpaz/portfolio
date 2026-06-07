export type Shot = {
  /** path under /public */
  src: string;
  /** short label shown in the lightbox */
  caption: string;
};

export type Project = {
  /** stable id, also used for anchors */
  slug: string;
  title: string;
  /** one-line punchy subtitle */
  tagline: string;
  /** longer paragraph for the detail panel */
  description: string;
  year: string;
  status: "live" | "wip" | "archived";
  /** glyph shown as a small badge on the card */
  emoji: string;
  /** screenshots — first one is the card preview; all are shown in the lightbox */
  gallery?: Shot[];
  /** two hex colors that theme the whole card */
  accent: [string, string];
  tech: string[];
  /** 2-4 things worth bragging about */
  highlights: string[];
  /** optional deployed URL — card becomes clickable when present */
  live?: string;
  /** optional source link */
  repo?: string;
};

/**
 * 👋 To add a project, just append an object here.
 * Everything in the UI (cards, count, filters, detail panel) is derived
 * from this array — no other file needs to change.
 */
export const projects: Project[] = [
  {
    slug: "ticket-to-ride-manual",
    title: "All Aboard",
    tagline: "An interactive manual for Ticket to Ride",
    description:
      "A fan-made, beautifully typeset rules companion for the board game Ticket to Ride. Reads like a vintage railway timetable — sepia, rail-red, and parchment — but it's fully interactive: a draggable route sandbox, a live scoring table, and a quiz that checks you actually learned the rules.",
    year: "2026",
    status: "live",
    emoji: "🚂",
    gallery: [
      { src: "/shots/ttr-1-hero.png", caption: "The illustrated conductor's handbook" },
      { src: "/shots/ttr-3-map.png", caption: "Interactive route-building map sandbox" },
      { src: "/shots/ttr-4-scoring.png", caption: "How routes score — visual scoring guide" },
      { src: "/shots/ttr-2-turn.png", caption: "Your turn, broken down step by step" },
      { src: "/shots/ttr-5-quiz.png", caption: "The conductor's exam — a quick rules quiz" },
    ],
    accent: ["#e2483d", "#f2a341"],
    tech: ["React 19", "TypeScript", "Tailwind", "Vite"],
    highlights: [
      "Interactive map sandbox with real route geometry",
      "Live scoring calculator",
      "Self-check quiz on the rules",
      "Hand-tuned vintage-print art direction",
    ],
    live: "https://vitorluizpaz.github.io/ticket-to-ride-manual/",
    repo: "https://github.com/vitorluizpaz/ticket-to-ride-manual",
  },
  {
    slug: "fwc26-simulator",
    title: "FWC26 Simulator",
    tagline: "Predict the 2026 World Cup, phase by phase",
    description:
      "An interactive FIFA World Cup 2026 predictor built on the real 48-team December 2025 draw. Enter results round by round and the group tables, best-third race, and the entire knockout bracket recompute instantly — full FIFA tiebreakers, constraint-respecting Round-of-32 seeding, and penalty shootouts included.",
    year: "2026",
    status: "live",
    emoji: "⚽",
    gallery: [
      { src: "/shots/fwc-6-champion.png", caption: "And we have a World Champion — the simulated final" },
      { src: "/shots/fwc-2-standings.png", caption: "Live group standings with full FIFA tiebreakers" },
      { src: "/shots/fwc-5-bracket.png", caption: "The knockout bracket, Round of 32 to Final" },
      { src: "/shots/fwc-4-bracket.png", caption: "Round of 32 — seeded from the official draw" },
      { src: "/shots/fwc-3-filled.png", caption: "Every group recomputes as you enter results" },
      { src: "/shots/fwc-1-groups.png", caption: "Start from the real 48-team December 2025 draw" },
    ],
    accent: ["#16a34a", "#2563eb"],
    tech: ["React 19", "TypeScript", "Tailwind v4", "Vite"],
    highlights: [
      "Real 48-team official draw, Groups A–L",
      "Live standings with full FIFA tiebreakers",
      "Best-8-of-12 third place via bipartite matching",
      "Visual bracket + localStorage persistence",
    ],
    live: "https://vitorluizpaz.github.io/fwc26-simulator/",
    repo: "https://github.com/vitorluizpaz/fwc26-simulator",
  },
];
