function InlineText({ text }) {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={`${part}-${index}`} className="rounded-md bg-[var(--surface-raised)] px-1.5 py-0.5 text-sm text-[var(--accent-strong)]">
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${part}-${index}`} className="font-semibold text-[var(--text-strong)]">
          {part.slice(2, -2)}
        </strong>
      );
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={`${part}-${index}`}
          className="font-semibold text-[var(--accent)] hover:text-[var(--accent-strong)]"
          href={linkMatch[2]}
          target={linkMatch[2].startsWith("http") ? "_blank" : undefined}
          rel={linkMatch[2].startsWith("http") ? "noreferrer" : undefined}
        >
          {linkMatch[1]}
        </a>
      );
    }

    return part;
  });
}

export function MarkdownContent({ blocks }) {
  return (
    <div className="space-y-5 text-[var(--text-muted)]">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "heading") {
          const HeadingTag = `h${Math.min(block.level + 1, 4)}`;
          return (
            <HeadingTag key={key} className="pt-4 text-2xl font-semibold tracking-tight text-[var(--text-strong)]">
              {block.text}
            </HeadingTag>
          );
        }

        if (block.type === "image" && block.src) {
          return (
            <figure key={key} className="overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-raised)]">
              <img src={block.src} alt={block.alt} className="h-auto w-full object-cover" />
              {block.alt && (
                <figcaption className="px-4 py-3 text-xs text-[var(--text-subtle)]">
                  {block.alt}
                </figcaption>
              )}
            </figure>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={key} className="grid gap-3">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3 leading-8">
                  <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_0_4px_var(--dot-ring)]" />
                  <span>
                    <InlineText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "code") {
          return (
            <pre key={key} className="overflow-x-auto rounded-[1.25rem] border border-[var(--line)] bg-[var(--surface-raised)] p-4 text-sm text-[var(--text)]">
              <code>{block.code}</code>
            </pre>
          );
        }

        return (
          <p key={key} className="text-base leading-8">
            <InlineText text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
