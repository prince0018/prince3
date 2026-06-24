export function Button({ href, children, variant = "primary", onClick }) {
  const variants = {
    primary:
      "border-[var(--accent)] bg-[var(--accent)] text-white shadow-[0_18px_40px_var(--accent-shadow)] hover:-translate-y-0.5 hover:bg-[var(--accent-hover)]",
    secondary:
      "border-[var(--button-secondary-border)] bg-[var(--button-secondary-bg)] text-[var(--accent-strong)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--button-secondary-hover)]",
    ghost:
      "border-transparent bg-transparent text-[var(--text-muted)] hover:text-[var(--accent)]",
  };

  return (
    <a
      className={`inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition duration-300 ${variants[variant]}`}
      href={href}
      onClick={onClick}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
