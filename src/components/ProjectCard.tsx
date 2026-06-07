import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ArrowUpRight, Expand, Github } from "lucide-react";
import type { Project } from "../data/projects";
import { asset } from "../lib/asset";

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live",
  wip: "In progress",
  archived: "Archived",
};

export default function ProjectCard({
  project,
  index,
  onOpenGallery,
}: {
  project: Project;
  index: number;
  /** open the lightbox for this project at the given shot index */
  onOpenGallery: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  // glow follows the pointer inside the card
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 10);
    rx.set((0.5 - py) * 10);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const [c1, c2] = project.accent;
  const gallery = project.gallery ?? [];
  const glow = useMotionTemplate`radial-gradient(30rem 30rem at ${gx}% ${gy}%, ${c1}22, transparent 60%)`;
  const Wrapper = project.live ? "a" : "div";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-3xl border border-line bg-ink-soft/70 p-1.5"
      >
        {/* themed glow */}
        <motion.div
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {/* gradient hairline on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(130deg, ${c1}, ${c2})`,
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: 1.5,
          }}
        />

        <div className="relative rounded-[1.35rem] p-6 sm:p-8">
          {/* faux app chrome / preview */}
          <div
            className="relative mb-7 overflow-hidden rounded-2xl border border-line"
            style={{
              background: `linear-gradient(150deg, ${c1}1f, ${c2}14)`,
            }}
          >
            <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 truncate text-[11px] text-muted">
                {project.slug}
              </span>
            </div>
            {gallery.length > 0 ? (
              <button
                type="button"
                onClick={() => onOpenGallery(0)}
                aria-label={`Open ${project.title} gallery`}
                className="group/shot relative block h-44 w-full cursor-pointer overflow-hidden sm:h-52"
              >
                <img
                  src={asset(gallery[0].src)}
                  alt={`${project.title} screenshot`}
                  loading="lazy"
                  className="h-full w-full origin-top object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                {/* fade into the card */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-soft/90 to-transparent" />
                {/* hover: expand affordance */}
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/30 opacity-0 transition-opacity duration-300 group-hover/shot:opacity-100">
                  <span className="flex items-center gap-2 rounded-full bg-paper/95 px-4 py-2 text-sm font-semibold text-ink">
                    <Expand className="h-4 w-4" />
                    View {gallery.length} shots
                  </span>
                </span>
                {/* emoji badge */}
                <span
                  className="absolute bottom-3 left-3 grid h-9 w-9 place-items-center rounded-xl text-lg shadow-lg backdrop-blur"
                  style={{ background: `${c1}26`, boxShadow: `0 4px 16px ${c1}33` }}
                >
                  {project.emoji}
                </span>
                {/* count pill */}
                <span className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-medium text-paper/90 backdrop-blur">
                  1 / {gallery.length}
                </span>
              </button>
            ) : (
              <div className="grid h-44 place-items-center text-7xl sm:h-52 sm:text-8xl">
                {project.emoji}
              </div>
            )}
          </div>

          {/* meta row */}
          <div className="mb-3 flex items-center gap-3 text-xs">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium"
              style={{ background: `${c1}1f`, color: c2 }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: c2 }}
              />
              {STATUS_LABEL[project.status]}
            </span>
            <span className="text-muted">{project.year}</span>
          </div>

          <h3 className="font-display text-3xl font-semibold tracking-tight">
            {project.title}
          </h3>
          <p
            className="mt-1 text-sm font-medium"
            style={{ color: c2 }}
          >
            {project.tagline}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          {/* highlights */}
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 text-sm text-paper/80"
              >
                <span
                  className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                  style={{ background: c1 }}
                />
                {h}
              </li>
            ))}
          </ul>

          {/* tech + links */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-xs text-muted"
              >
                {t}
              </span>
            ))}
            <div className="ml-auto flex items-center gap-2">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-paper"
                  aria-label="Source"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {project.live && (
                <Wrapper
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
                  style={{
                    background: `linear-gradient(120deg, ${c1}, ${c2})`,
                  }}
                >
                  Open
                  <ArrowUpRight className="h-4 w-4" />
                </Wrapper>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
