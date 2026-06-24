import { useEffect } from "react";
import { MarkdownContent } from "./MarkdownContent";

export function BlogReader({ blog, onClose }) {
  useEffect(() => {
    if (!blog) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [blog, onClose]);

  if (!blog) return null;

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-black/45 px-4 py-6 backdrop-blur-sm sm:px-6">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_30px_100px_rgba(0,0,0,0.25)]">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              {blog.date && (
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                  {blog.date}
                </p>
              )}
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-strong)] sm:text-4xl">
                {blog.title}
              </h2>
            </div>
            <button
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface-soft)] text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              type="button"
              onClick={onClose}
              aria-label="Close blog"
            >
              <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                <path
                  d="m6 6 12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
          <div className="mt-8">
            <MarkdownContent blocks={blog.blocks} />
          </div>
        </div>
      </div>
    </div>
  );
}
