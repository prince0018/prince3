export function Badge({ children, tone = "default" }) {
  const tones = {
    default: "border-[var(--chip-border)] bg-[var(--chip-bg)] text-[var(--chip-text)]",
    blue: "border-[var(--chip-blue-border)] bg-[var(--chip-blue-bg)] text-[var(--chip-blue-text)]",
    glass: "border-white/20 bg-white/12 text-white",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
