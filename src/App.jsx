import { useEffect, useMemo, useState } from "react";
import { Badge } from "./components/Badge";
import { BlogCard } from "./components/BlogCard";
import { BlogReader } from "./components/BlogReader";
import { Button } from "./components/Button";
import { ExperienceCard } from "./components/ExperienceCard";
import { ProjectCard } from "./components/ProjectCard";
import { Section } from "./components/Section";
import { ThemeToggle } from "./components/ThemeToggle";
import {
  capabilities,
  certifications,
  education,
  experience,
  navItems,
  profile,
  projects,
  skills,
  stats,
} from "./data/portfolio";
import { blogs } from "./data/blogs";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { smoothScrollTo } from "./utils/navigation";
import { getSystemTheme } from "./utils/theme";

const logoUrl = `${import.meta.env.BASE_URL}p_logo.png`;

export default function App() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [themeMode, setThemeMode] = useState("system");
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  const resolvedTheme = themeMode === "system" ? systemTheme : themeMode;

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = () => setSystemTheme(media.matches ? "dark" : "light");

    updateSystemTheme();
    media.addEventListener("change", updateSystemTheme);

    return () => media.removeEventListener("change", updateSystemTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const tags = useMemo(() => {
    const allTags = projects.flatMap((project) => project.tags);
    return ["All", ...Array.from(new Set(allTags))];
  }, []);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesTag = activeTag === "All" || project.tags.includes(activeTag);
      const searchable = [
        project.title,
        project.summary,
        project.metric,
        ...project.tags,
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);

      return matchesTag && matchesQuery;
    });
  }, [activeTag, query]);

  useScrollReveal(`${activeTag}-${filteredProjects.length}-${query}`);

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--page-bg)] text-[var(--text)] transition-colors duration-300">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-12rem] top-[-10rem] h-[32rem] w-[32rem] rounded-full bg-[var(--glow-one)] blur-3xl" />
        <div className="absolute bottom-[-12rem] right-[-12rem] h-[34rem] w-[34rem] rounded-full bg-[var(--glow-two)] blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] backdrop-blur-xl transition-colors duration-300">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-4">
          <a
            className="flex items-center gap-3"
            href="#top"
            onClick={(event) => smoothScrollTo(event, "#top")}
            aria-label="Prince Sharma home"
          >
            <img
              src={logoUrl}
              alt=""
              className="h-11 w-11 rounded-2xl object-cover shadow-sm ring-1 ring-[var(--logo-ring)]"
            />
            <div>
              <p className="text-sm font-bold leading-tight tracking-tight text-[var(--text-strong)]">
                {profile.name}
              </p>
              <p className="text-xs font-medium text-[var(--text-subtle)]">{profile.role}</p>
            </div>
          </a>
          <nav className="hidden items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--nav-bg)] p-1 shadow-sm lg:flex">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={(event) => smoothScrollTo(event, href)}
                className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--text-muted)] transition duration-300 hover:bg-[var(--accent)] hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle mode={themeMode} resolvedTheme={resolvedTheme} onChange={setThemeMode} />
            <Button href={profile.github} variant="ghost">
              GitHub
            </Button>
            <Button href={profile.linkedin} variant="secondary">
              LinkedIn
            </Button>
          </div>
        </div>
      </header>

      <section id="top" className="relative">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-16 sm:pb-20 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              {capabilities.slice(0, 4).map((item) => (
                <Badge key={item} tone="blue">
                  {item}
                </Badge>
              ))}
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              {profile.location}
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.055em] text-[var(--text-strong)] sm:text-6xl lg:text-7xl">
              {profile.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
              {profile.summary}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#projects" onClick={(event) => smoothScrollTo(event, "#projects")}>
                View selected work
              </Button>
              <Button href={`mailto:${profile.email}`} variant="secondary">
                Contact me
              </Button>
            </div>
          </div>

          <aside className="relative">
            <div className="absolute inset-4 -z-10 rounded-[2.5rem] bg-[var(--accent)] opacity-12 blur-2xl" />
            <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface-glass)] p-5 shadow-[0_30px_100px_var(--panel-shadow)] backdrop-blur">
              <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,var(--hero-card-from),var(--hero-card-via),var(--hero-card-to))] p-6 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
                      Focus
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                      Reliable AI systems
                    </h2>
                  </div>
                  <img
                    src={logoUrl}
                    alt=""
                    className="h-16 w-16 rounded-3xl object-cover ring-1 ring-white/35"
                  />
                </div>
                <div className="mt-8 grid gap-3">
                  {[
                    "Retrieval quality and semantic search",
                    "Agent orchestration with measurable guardrails",
                    "Cloud deployment, tracing, and cost-aware serving",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/20 bg-white/12 px-4 py-3 text-sm text-white/92"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-5"
                  >
                    <p className="text-2xl font-semibold tracking-tight text-[var(--accent-strong)]">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-[var(--text-subtle)]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Section
        id="projects"
        eyebrow="Selected work"
        title="AI projects with practical engineering depth."
      >
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface-glass)] p-4 shadow-sm backdrop-blur">
          <div className="grid gap-4">
            <label
              className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]"
              htmlFor="project-search"
            >
              Search projects
            </label>
            <div className="relative">
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--accent)]"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <input
                id="project-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by project, tool, or outcome"
                className="min-h-14 w-full rounded-[1.25rem] border border-[var(--input-border)] bg-[var(--input-bg)] py-3 pl-12 pr-5 text-sm text-[var(--text)] outline-none transition duration-300 placeholder:text-[var(--text-subtle)] focus:border-[var(--accent)] focus:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--focus-ring)]"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition duration-300 ${
                    activeTag === tag
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-[0_10px_26px_var(--accent-shadow)]"
                      : "border-[var(--chip-border)] bg-[var(--chip-bg)] text-[var(--chip-text)] hover:border-[var(--accent-soft)] hover:bg-[var(--chip-hover)] hover:text-[var(--accent-strong)]"
                  }`}
                >
                  {tag}
                </button>
              ))}
              <span className="ml-auto rounded-full border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-2 text-xs font-semibold text-[var(--text-subtle)]">
                {filteredProjects.length} shown
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="mt-8 rounded-[1.5rem] border border-dashed border-[var(--accent-soft)] bg-[var(--surface-glass)] p-8 text-center text-sm text-[var(--text-subtle)]">
            No projects match that filter yet. Try another keyword.
          </div>
        )}
      </Section>

      <Section
        id="blogs"
        eyebrow="Blogs"
        title="Notes on engineering, systems, and AI."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} onOpen={setSelectedBlog} />
          ))}
        </div>
      </Section>

      <Section
        id="experience"
        eyebrow="Experience"
        title="Shipping applied AI from prototype to production."
      >
        <div className="grid gap-5">
          {experience.map((item) => (
            <ExperienceCard key={`${item.company}-${item.title}`} item={item} />
          ))}
        </div>
      </Section>

      <Section
        id="skills"
        eyebrow="Technical range"
        title="A focused toolkit for model-powered products."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {Object.entries(skills).map(([group, items]) => (
            <div
              key={group}
              className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_18px_60px_var(--soft-shadow)]"
            >
              <h3 className="text-lg font-semibold tracking-tight text-[var(--text-strong)]">
                {group}
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="education"
        eyebrow="Education and credentials"
        title="Mathematical grounding with work-ready cloud credentials."
      >
        <div className="grid gap-5">
          <div className="grid gap-5 lg:grid-cols-3">
            {education.map((item, index) => (
              <div
                key={item.school}
                className="relative rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-[var(--line)] bg-[var(--surface-raised)] px-3 py-1 text-xs font-semibold text-[var(--text-subtle)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {index === 0 && (
                    <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-white">
                      Latest
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  {item.period}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-[var(--text-strong)]">
                  {item.school}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{item.degree}</p>
                <p className="mt-2 text-sm text-[var(--text-subtle)]">{item.location}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_18px_54px_var(--soft-shadow)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                  Work certifications
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-[var(--text-strong)]">
                  Cloud and AI credentials
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
              {certifications.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-2 text-sm font-medium text-[var(--text)]"
                >
                  {item}
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="contact"
        eyebrow="Contact"
        title="Have a hard AI problem? Let us make it concrete."
      >
        <div className="grid gap-5 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_24px_70px_var(--soft-shadow)] lg:grid-cols-[0.85fr_1.15fr] lg:p-8">
          <div>
            <p className="text-sm leading-7 text-[var(--text-muted)]">
              Open to product-focused AI roles, collaborations, and systems that need
              clean retrieval, strong evaluation loops, and reliable deployment.
            </p>
            <div className="mt-6 space-y-3 text-sm text-[var(--text-muted)]">
              <p>
                Email:{" "}
                <a className="font-semibold text-[var(--accent)] hover:text-[var(--accent-strong)]" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </p>
              <p>
                Alt:{" "}
                <a className="font-semibold text-[var(--accent)] hover:text-[var(--accent-strong)]" href={`mailto:${profile.altEmail}`}>
                  {profile.altEmail}
                </a>
              </p>
              <p>Location: {profile.location}</p>
            </div>
          </div>

          <form
            className="grid gap-3 sm:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const subject = encodeURIComponent("Inquiry via portfolio website");
              const body = encodeURIComponent(
                `Hi Prince,\n\nName: ${formData.get("name")}\nEmail: ${formData.get(
                  "email",
                )}\n\n${formData.get("message")}`,
              );
              window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
            }}
          >
            <input
              name="name"
              placeholder="Your name"
              className="min-h-12 rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 text-sm text-[var(--text)] outline-none transition duration-300 placeholder:text-[var(--text-subtle)] focus:border-[var(--accent)] focus:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--focus-ring)]"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Your email"
              className="min-h-12 rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 text-sm text-[var(--text)] outline-none transition duration-300 placeholder:text-[var(--text-subtle)] focus:border-[var(--accent)] focus:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--focus-ring)]"
              required
            />
            <textarea
              name="message"
              placeholder="What are we building or improving?"
              className="min-h-32 rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-sm text-[var(--text)] outline-none transition duration-300 placeholder:text-[var(--text-subtle)] focus:border-[var(--accent)] focus:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--focus-ring)] sm:col-span-2"
              required
            />
            <button
              className="min-h-12 rounded-2xl bg-[var(--accent)] px-5 text-sm font-semibold text-white shadow-[0_18px_40px_var(--accent-shadow)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--accent-hover)] sm:col-span-2"
              type="submit"
            >
              Open email draft
            </button>
          </form>
        </div>
      </Section>

      <footer className="border-t border-[var(--line)] bg-[var(--footer-bg)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-[var(--text-subtle)] sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} {profile.name}.</p>
          <div className="flex gap-4">
            <a className="font-semibold text-[var(--text-muted)] hover:text-[var(--accent)]" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="font-semibold text-[var(--text-muted)] hover:text-[var(--accent)]" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
      <BlogReader blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
    </main>
  );
}
