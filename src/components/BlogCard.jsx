export function BlogCard({ blog, onOpen }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_24px_70px_var(--soft-shadow)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-soft)]">
      <button className="flex h-full flex-col text-left" type="button" onClick={() => onOpen(blog)}>
        {blog.image ? (
          <img src={blog.image} alt={blog.imageAlt} className="h-48 w-full object-cover" />
        ) : (
          <div className="h-48 bg-[linear-gradient(135deg,var(--hero-card-from),var(--hero-card-via),var(--hero-card-to))]" />
        )}
        <div className="flex flex-1 flex-col p-6">
          {blog.date && (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              {blog.date}
            </p>
          )}
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--text-strong)]">
            {blog.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-[var(--text-muted)]">{blog.summary}</p>
          <span className="mt-6 inline-flex text-sm font-semibold text-[var(--accent)] transition group-hover:text-[var(--accent-strong)]">
            Read full blog
          </span>
        </div>
      </button>
    </article>
  );
}
