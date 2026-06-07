const ITEMS = [
  "React",
  "TypeScript",
  "Tailwind",
  "Motion",
  "Vite",
  "Design Systems",
  "Accessibility",
  "Micro-interactions",
  "Data Viz",
  "Performance",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative flex overflow-hidden border-y border-line py-5">
      <div className="flex shrink-0 animate-marquee gap-10 pr-10">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 whitespace-nowrap font-display text-xl text-muted"
          >
            {item}
            <span className="text-iris">✦</span>
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
