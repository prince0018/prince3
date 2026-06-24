import { Badge } from "./Badge";

export function ProjectCard({ project }) {
  return (
    <article className="group flex h-full flex-col rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_24px_70px_var(--soft-shadow)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-soft)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight text-[var(--text-strong)]">
          {project.title}
        </h3>
        <span className="shrink-0 rounded-full bg-[var(--metric-bg)] px-3 py-1 text-xs font-semibold text-[var(--accent-strong)] ring-1 ring-[var(--metric-ring)]">
          {project.metric}
        </span>
      </div>
      <p className="flex-1 text-sm leading-7 text-[var(--text-muted)]">{project.summary}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} tone="blue">
            {tag}
          </Badge>
        ))}
      </div>
    </article>
  );
}
