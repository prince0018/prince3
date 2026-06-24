export function ThemeToggle({ mode, resolvedTheme, onChange }) {
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
  const isDark = resolvedTheme === "dark";
  const label = mode === "system" ? `System ${resolvedTheme}` : resolvedTheme;

  return (
    <button
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface-soft)] text-[var(--text-muted)] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
      type="button"
      onClick={() => onChange(nextTheme)}
      aria-label={`Theme is ${label}. Switch to ${nextTheme} mode.`}
      title={`Switch to ${nextTheme} mode`}
    >
      {isDark ? (
        <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 3v2.1M12 18.9V21M4.58 4.58l1.48 1.48M17.94 17.94l1.48 1.48M3 12h2.1M18.9 12H21M4.58 19.42l1.48-1.48M17.94 6.06l1.48-1.48M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      ) : (
        <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
          <path
            d="M20.25 15.46A8.75 8.75 0 0 1 8.54 3.75 8.75 8.75 0 1 0 20.25 15.46Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      )}
    </button>
  );
}
