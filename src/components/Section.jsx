export function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-reveal scroll-mt-28 py-16 sm:py-20" data-scroll-reveal>
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-strong)] sm:text-4xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
