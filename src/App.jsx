import React, { useMemo, useState, useEffect } from "react";
// Azure‑style personal portfolio for Prince Sharma
// Framework: React + TailwindCSS (no external UI deps)
// Notes:
// 1) Drop this file into a Next.js app's app/page.tsx or pages/index.tsx (adjust to TS if needed),
//    or a Vite React project as App.jsx.
// 2) Ensure Tailwind is set up. Copy the colors from the config below if you want custom theme tokens.
// 3) Replace placeholder URLs (demo/code/case study) with your live links (Vercel, HuggingFace Spaces, GitHub, etc.).
// 4) The design leans into Microsoft Azure vibes: deep azure gradients, glassy cards, clean grids, and subtle blurs.

const config = {
  name: "Prince Sharma",
  role: "AI/ML Engineer — LLMs, RAG & MLOps",
  tagline:
    "Delivering production LLM & RAG pipelines: sub‑second semantic search, compliance‑grade claim‑audit extraction, multi‑agent summarization, and cross‑cloud MLOps.",
  email: "sharma18.prince@gmail.com",
  altEmail: "princesharma@alumni.iitm.ac.in",
  location: "Gurugram, India",
  linkedin: "https://www.linkedin.com/in/p18",
  github: "https://github.com/prince0018",
  resumeUrl: "/Prince_Sharma_Resume.pdf", // replace with your hosted resume path
  // Core palette inspired by Azure / Fluent
  azure: {
    primary: "#0078D4",
    primaryDark: "#106EBE",
    primaryDeep: "#0E78C1",
    ink: "#111827",
  },
};

const skills = {
  Programming_MLOps: [
    "Python",
    "SQL",
    "FastAPI",
    "Docker",
    "Kubernetes",
    "GitHub Actions",
    "Streamlit",
    "AWS",
    "Azure",
    "GCP",
    "MLflow",
    "Prometheus",
    "Grafana",
  ],
  Frameworks_Tools: [
    "PyTorch",
    "Hugging Face",
    "LangChain",
    "LangGraph",
    "LlamaIndex",
    "CrewAI",
    "Elasticsearch",
    "Redis",
    "NVIDIA NIM",
    "MCP (Model Context Protocol)",
  ],
  Concepts: [
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "Generative AI",
    "LLMs",
    "RAG",
    "Agents",
    "Quantization",
    "LTR (Learn‑to‑Rank)",
  ],
  Certifications: [
    "AWS Cloud Practitioner",
    "AWS AI Practitioner",
    "Microsoft Azure AI Fundamentals",
  ],
};

const experience = [
  {
    company: "Virtusa",
    title: "Associate Consultant (AI/ML)",
    period: "Aug 2024 – Present",
    location: "Gurugram, HR",
    bullets: [
      "Designed a Search‑as‑a‑Service engine: embeddings + Redis hot path (<10 ms) + Elasticsearch long‑tail → precise sub‑second answers.",
      "Built LTR retrieval pipeline for RAG; achieved nDCG@10 = 0.92 for relevance boosts.",
      "Architected end‑to‑end weather platform using Python MCP server/client; Dockerized & deployed on Google Cloud Run with Streamlit UI.",
      "Deployed AI‑first MLR audit platform with CrewAI multi‑agents + Azure GPT‑4o → auto‑extractions, regulatory flags, compliance scoring.",
      "Engineered agentic RAG on AWS EC2 with NVIDIA NIM (self‑hosting Llama‑3.1‑8B, embeddings, rerankers); integrated LangSmith; −30% latency.",
    ],
  },
  {
    company: "PDSVISION",
    title: "Data Science Project Intern",
    period: "Aug 2023 – Apr 2024",
    location: "Chennai, TN",
    bullets: [
      "Curated/annotated automotive‑parts dataset; trained YOLOv8; achieved 0.991 mAP enabling real‑time edge verification.",
    ],
  },
  {
    company: "Tata Communications",
    title: "Data Science Intern",
    period: "May 2023 – Jul 2023",
    location: "Chennai, TN",
    bullets: [
      "Labeled 500+ soccer videos for goals/fouls/corners; tuned EfficientNet‑B0; +15% multi‑class accuracy → near‑real‑time analytics.",
    ],
  },
];

const education = [
  {
    school: "IIT Madras",
    degree: "M.Tech — Industrial Mathematics & Scientific Computing",
    period: "Graduated Jul 2024",
    location: "Chennai, TN",
    gpa: "8.27/10",
  },
  {
    school: "Delhi Technological University",
    degree: "M.Sc — Mathematics",
    period: "Graduated Jul 2022",
    location: "New Delhi, DL",
    gpa: "8.47/10",
  },
];

const projects = [
  {
    title: "Agentic Product Recommender (Voice/Text)",
    summary:
      "LangGraph‑powered agent retrieves catalog data, maintains conversational state, and executes multi‑step tasks (cart, invoice) via toolchains.",
    tags: ["LangGraph", "Agents", "LLM", "RAG"],
    links: {
      demo: "#", // e.g., https://prince-sharma.com/apps/recommender
      code: "#", // e.g., https://github.com/prince0018/agentic-recommender
      caseStudy: "#",
    },
  },
  {
    title: "Medical Report Summarisation (T5)",
    summary:
      "Fine‑tuned T5 on curated medical texts to produce concise, patient‑friendly summaries. Achieved 33.8 ROUGE‑L F1.",
    tags: ["T5", "NLP", "Summarization", "Healthcare"],
    links: {
      demo: "#",
      code: "#",
      caseStudy: "#",
    },
  },
  {
    title: "Weather Platform (MCP + Streamlit)",
    summary:
      "Custom MCP server/client with autoscaling on Cloud Run + Streamlit UI for city‑specific low‑latency forecasts.",
    tags: ["MCP", "Streamlit", "GCP", "Docker"],
    links: {
      demo: "#",
      code: "#",
      caseStudy: "#",
    },
  },
  {
    title: "Search‑as‑a‑Service (Redis + Elasticsearch)",
    summary:
      "Embeddings‑backed semantic search; Redis hot cache for <10 ms paths; ES for persistent long‑tail. Sub‑second QA at scale.",
    tags: ["Elasticsearch", "Redis", "Embeddings", "Search"],
    links: {
      demo: "#",
      code: "#",
      caseStudy: "#",
    },
  },
  {
    title: "MLR Audit (CrewAI + Azure GPT‑4o)",
    summary:
      "Multi‑agent extraction of pharma claims with compliance scoring and breach flags; audit‑grade latency and accuracy.",
    tags: ["CrewAI", "Azure", "GPT‑4o", "Agents"],
    links: {
      demo: "#",
      code: "#",
      caseStudy: "#",
    },
  },
  {
    title: "Automotive Parts Detection (YOLOv8)",
    summary:
      "Edge‑ready detection pipeline with curated dataset and augmentations. Achieved 0.991 mAP in controlled tests.",
    tags: ["YOLOv8", "CV", "Edge AI"],
    links: {
      demo: "#",
      code: "#",
      caseStudy: "#",
    },
  },
  {
    title: "Soccer Event Analytics",
    summary:
      "Annotated 500+ clips; EfficientNet‑B0 tuning delivered +15% multi‑class accuracy for near real‑time workflows.",
    tags: ["CV", "Video", "EfficientNet"],
    links: {
      demo: "#",
      code: "#",
      caseStudy: "#",
    },
  },
];

const publications = [
  {
    title:
      "Sentiment Analysis using Twitter Data on Distance Learning (International Journal of Health Sciences, 2022)",
    details:
      "1M+ tweets via targeted API; VADER‑augmented XGBoost achieved 94% accuracy, surpassing alternative ML baselines.",
    link: "#",
  },
];

const achievements = [
  "NCC ‘C’ Certificate Holder",
  "Scouting State Award Holder",
  "2× U‑19 Hockey State‑Level Champion",
];

// --- UI HELPERS ---
const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="relative py-20 sm:py-24">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_120%_-10%,rgba(14,120,193,0.25),transparent_60%),radial-gradient(60rem_40rem_at_-20%_110%,rgba(16,110,190,0.25),transparent_60%)]" />
    <div className="mx-auto max-w-7xl px-4">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white/90">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-base sm:text-lg text-white/70 max-w-3xl">{subtitle}</p>
      )}
      <div className="mt-8">{children}</div>
    </div>
  </section>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
    {children}
  </span>
);

const PillButton = ({ onClick, href, children }) => {
  const base =
    "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors";
  if (href) return (
    <a href={href} className={base} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
  return (
    <button onClick={onClick} className={base}>
      {children}
    </button>
  );
};

const NavLink = ({ href, label }) => (
  <a
    href={href}
    className="text-sm text-white/80 hover:text-white transition-colors"
  >
    {label}
  </a>
);

// --- MAIN COMPONENT ---
export default function AzureStylePortfolio() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const tags = useMemo(() => {
    const t = new Set(["All"]);
    projects.forEach((p) => p.tags.forEach((x) => t.add(x)));
    return Array.from(t);
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesTag = activeTag === "All" || p.tags.includes(activeTag);
      const q = query.trim().toLowerCase();
      const matchesQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.join(" ").toLowerCase().includes(q);
      return matchesTag && matchesQ;
    });
  }, [activeTag, query]);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white selection:bg-sky-500/40 selection:text-white">
      {/* Top gradient banner */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#0E78C1] via-[#0B4A6F] to-slate-950">
        <div className="absolute inset-0 -z-10 opacity-30" aria-hidden>
          <div className="absolute left-1/2 top-[-12rem] h-[34rem] w-[72rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,255,255,0.2),transparent)] blur-2xl" />
          <div className="absolute right-[-8rem] bottom-[-10rem] h-[28rem] w-[48rem] bg-[radial-gradient(closest-side,rgba(14,120,193,0.5),transparent)] blur-3xl" />
        </div>

        {/* Nav */}
        <header className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur flex items-center justify-center font-bold">
              PS
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide text-white/90">
                {config.name}
              </div>
              <div className="text-xs text-white/60">{config.role}</div>
            </div>
          </div>
          <nav className="hidden sm:flex items-center gap-6">
            <NavLink href="#projects" label="Projects" />
            <NavLink href="#experience" label="Experience" />
            <NavLink href="#skills" label="Skills" />
            <NavLink href="#education" label="Education" />
            <NavLink href="#publications" label="Publications" />
            <NavLink href="#contact" label="Contact" />
          </nav>
          <div className="flex items-center gap-2">
            <PillButton href={config.github}>GitHub</PillButton>
            <PillButton href={config.linkedin}>LinkedIn</PillButton>
            <button
              onClick={() => setDark((d) => !d)}
              className="ml-1 rounded-full border border-white/20 bg-white/10 p-2 text-xs text-white hover:bg-white/20"
              title="Toggle theme"
            >
              {dark ? "🌙" : "☀️"}
            </button>
          </div>
        </header>

        {/* Hero */}
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:pb-28 sm:pt-12">
          <div className="grid items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Building reliable <span className="text-sky-300">LLM</span> & <span className="text-sky-300">RAG</span> systems
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-white/80">
                {config.tagline}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <PillButton href={config.resumeUrl}>Download Résumé</PillButton>
                <PillButton href="#projects">Explore Projects</PillButton>
                <PillButton href="#contact">Contact</PillButton>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <Badge>nDCG@10 = 0.92 (LTR)</Badge>
                <Badge>Sub‑second semantic search</Badge>
                <Badge>Agents on Azure GPT‑4o</Badge>
                <Badge>Cloud‑native MLOps</Badge>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-2 shadow-2xl backdrop-blur">
                <div className="absolute inset-0 -z-10 rounded-3xl bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
                <div className="h-full w-full rounded-2xl bg-gradient-to-br from-sky-400/20 via-white/10 to-transparent p-6">
                  <div className="text-sm text-white/80">Azure‑style Highlights</div>
                  <ul className="mt-3 space-y-2 text-sm text-white/70">
                    <li>• Redis hot path & Elasticsearch long‑tail</li>
                    <li>• CrewAI multi‑agent pipelines</li>
                    <li>• NVIDIA NIM + self‑hosted Llama‑3.1‑8B</li>
                    <li>• MCP server/client + Cloud Run</li>
                  </ul>
                  <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-white/60">
                    <div className="font-mono">$ curl https://api.prince-sharma.com/search?q=rag</div>
                    <div className="font-mono text-white/70">→ 12ms (Redis) · 240ms (ES)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <Section
        id="projects"
        title="Projects"
        subtitle="Case studies and demos that showcase applied GenAI, retrieval, and MLOps."
      >
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects by title, tag, or text…"
            className="w-full max-w-md rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
          />
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`rounded-full px-3 py-1 text-xs backdrop-blur border ${
                  activeTag === t
                    ? "bg-sky-500/30 border-sky-500/50 text-white"
                    : "bg-white/5 border-white/15 text-white/80 hover:bg-white/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <article
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:bg-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-white/90">{p.title}</h3>
                <div className="flex gap-2">
                  {p.links.demo && (
                    <a
                      href={p.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs rounded-full border border-white/15 bg-white/5 px-2 py-1 text-white/80 hover:bg-white/10"
                    >
                      Demo
                    </a>
                  )}
                  {p.links.code && (
                    <a
                      href={p.links.code}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs rounded-full border border-white/15 bg-white/5 px-2 py-1 text-white/80 hover:bg-white/10"
                    >
                      Code
                    </a>
                  )}
                  {p.links.caseStudy && (
                    <a
                      href={p.links.caseStudy}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs rounded-full border border-white/15 bg-white/5 px-2 py-1 text-white/80 hover:bg-white/10"
                    >
                      Case Study
                    </a>
                  )}
                </div>
              </div>
              <p className="mt-2 text-sm text-white/70">{p.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section
        id="experience"
        title="Experience"
        subtitle="Hands‑on platform engineering, retrieval quality, and latency‑first GenAI delivery."
      >
        <ol className="relative border-l border-white/15 pl-6">
          {experience.map((e, i) => (
            <li key={i} className="mb-10 ml-2">
              <span className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full border border-white/20 bg-sky-400/60" />
              <div className="flex flex-wrap items-center gap-x-3">
                <h3 className="text-white/90 font-semibold">{e.title}</h3>
                <span className="text-white/60 text-sm">@ {e.company}</span>
              </div>
              <div className="text-xs text-white/50">{e.period} • {e.location}</div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/80">
                {e.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills" subtitle="Tooling across model development, retrieval, serving, and observability.">
        <div className="grid gap-6 md:grid-cols-3">
          {Object.entries(skills).map(([k, arr]) => (
            <div key={k} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="text-white/80 font-semibold">{k.replaceAll("_", " & ")}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {arr.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Education & Certifications */}
      <Section id="education" title="Education">
        <div className="grid gap-6 sm:grid-cols-2">
          {education.map((ed, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="text-white/90 font-semibold">{ed.school}</div>
              <div className="text-white/70 text-sm">{ed.degree}</div>
              <div className="text-white/50 text-xs">{ed.period} • {ed.location} • GPA {ed.gpa}</div>
            </div>
          ))}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="text-white/90 font-semibold">Certifications</div>
            <ul className="mt-2 list-disc pl-5 text-sm text-white/80">
              {skills.Certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Publications */}
      <Section id="publications" title="Publications">
        <div className="grid gap-6 sm:grid-cols-2">
          {publications.map((p, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="text-white/90 font-semibold">{p.title}</div>
              <p className="mt-2 text-sm text-white/70">{p.details}</p>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm text-sky-300 hover:text-sky-200"
                >
                  View Paper →
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Achievements */}
      <Section id="achievements" title="Achievements">
        <div className="flex flex-wrap gap-2">
          {achievements.map((a) => (
            <Badge key={a}>{a}</Badge>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact" subtitle="Open to collaborations, challenging problems, and product‑focused AI roles.">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="text-white/80 font-semibold">Reach out</div>
            <div className="mt-3 space-y-2 text-sm text-white/80">
              <div>Email: <a className="text-sky-300 hover:text-sky-200" href={`mailto:${config.email}`}>{config.email}</a></div>
              <div>Alt: <a className="text-sky-300 hover:text-sky-200" href={`mailto:${config.altEmail}`}>{config.altEmail}</a></div>
              <div>GitHub: <a className="text-sky-300 hover:text-sky-200" href={config.github} target="_blank" rel="noreferrer">{config.github.replace("https://", "")}</a></div>
              <div>LinkedIn: <a className="text-sky-300 hover:text-sky-200" href={config.linkedin} target="_blank" rel="noreferrer">{config.linkedin.replace("https://", "")}</a></div>
              <div>Location: {config.location}</div>
            </div>
          </div>
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="text-white/80 font-semibold">Quick message</div>
            <form
              className="mt-4 grid gap-3 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const subject = encodeURIComponent("Inquiry via portfolio website");
                const body = encodeURIComponent(
                  `Hi Prince,%0D%0A%0D%0A` +
                    `Name: ${fd.get("name")}%0D%0A` +
                    `Email: ${fd.get("email")}%0D%0A` +
                    `Message: ${fd.get("message")}%0D%0A`
                );
                window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`;
              }}
            >
              <input name="name" placeholder="Your name" className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/60" required />
              <input name="email" type="email" placeholder="Your email" className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/60" required />
              <textarea name="message" placeholder="How can I help?" className="sm:col-span-2 h-28 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/60" required />
              <div className="sm:col-span-2">
                <button className="w-full rounded-xl border border-white/20 bg-sky-500/30 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500/40">
                  Send email
                </button>
              </div>
            </form>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
          <div className="text-xs text-white/60">© {new Date().getFullYear()} {config.name}. Built with ❤️, React & Tailwind.</div>
          <div className="flex items-center gap-4 text-xs text-white/70">
            <a href="#" className="hover:text-white/90">Privacy</a>
            <a href="#" className="hover:text-white/90">Imprint</a>
            <a href={config.resumeUrl} className="hover:text-white/90">Résumé</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
