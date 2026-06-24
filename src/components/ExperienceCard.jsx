export function ExperienceCard({ item }) {
  return (
    <article className="scroll-reveal rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_22px_60px_var(--soft-shadow)]" data-scroll-reveal>
      <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            {item.company}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--text-strong)]">
            {item.title}
          </h3>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3 text-sm text-[var(--text-muted)] md:text-right">
          <p className="font-semibold text-[var(--text)]">{item.period}</p>
          <p>{item.location}</p>
        </div>
      </div>
      <ul className="mt-5 grid gap-3">
        {item.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 text-sm leading-7 text-[var(--text-muted)]">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_0_4px_var(--dot-ring)]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
