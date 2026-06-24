export const profile = {
  name: "Prince Sharma",
  role: "AI/ML Engineer",
  headline: "Production-grade LLM, RAG, and MLOps systems.",
  summary:
    "I build reliable AI products across retrieval, agents, model serving, observability, and cloud deployment. My work focuses on measurable latency, relevance, and operational quality.",
  email: "sharma18.prince@gmail.com",
  altEmail: "princesharma@alumni.iitm.ac.in",
  location: "Gurugram, India",
  linkedin: "https://www.linkedin.com/in/p18",
  github: "https://github.com/prince0018",
};

export const stats = [
  { value: "0.92", label: "nDCG@10 for LTR retrieval" },
  { value: "<10ms", label: "Redis semantic cache path" },
  { value: "0.991", label: "YOLOv8 mAP for edge detection" },
  { value: "-30%", label: "Latency reduction on agentic RAG" },
];

export const capabilities = [
  "LLM applications",
  "RAG architecture",
  "Agentic workflows",
  "Search relevance",
  "Cloud-native MLOps",
  "Model observability",
];

export const skills = {
  "Programming and MLOps": [
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
  "Frameworks and Tools": [
    "PyTorch",
    "Hugging Face",
    "LangChain",
    "LangGraph",
    "LlamaIndex",
    "CrewAI",
    "Elasticsearch",
    "Redis",
    "NVIDIA NIM",
    "MCP",
  ],
  "AI Concepts": [
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "Generative AI",
    "LLMs",
    "RAG",
    "Agents",
    "Quantization",
    "Learn-to-Rank",
  ],
};

export const experience = [
  {
    company: "Virtusa",
    title: "Software Engineer, AI/ML",
    period: "Aug 2024 - Present",
    location: "Gurugram, HR",
    bullets: [
      "Designed a Search-as-a-Service engine using embeddings, Redis hot paths, and Elasticsearch long-tail retrieval for precise sub-second answers.",
      "Built a learn-to-rank retrieval pipeline for RAG and reached nDCG@10 of 0.92 for relevance boosts.",
      "Architected a weather platform with Python MCP server/client, Docker, Google Cloud Run, and Streamlit.",
      "Delivered an AI-first MLR audit platform with CrewAI multi-agent extraction, regulatory flags, and compliance scoring.",
      "Engineered agentic RAG on AWS EC2 with NVIDIA NIM, self-hosted Llama-3.1-8B, embeddings, rerankers, and LangSmith tracing.",
    ],
  },
  {
    company: "PDSVISION",
    title: "Data Science Project Intern",
    period: "Aug 2023 - Apr 2024",
    location: "Chennai, TN",
    bullets: [
      "Curated and annotated an automotive-parts dataset, trained YOLOv8, and achieved 0.991 mAP for real-time edge verification.",
    ],
  },
  {
    company: "Tata Communications",
    title: "Data Science Intern",
    period: "May 2023 - Jul 2023",
    location: "Chennai, TN",
    bullets: [
      "Labeled 500+ soccer videos and tuned EfficientNet-B0, improving multi-class event accuracy by 15% for near real-time analytics.",
    ],
  },
];

export const education = [
  {
    school: "Indian Institute of Technology Madras",
    degree: "M.Tech, Industrial Mathematics and Scientific Computing",
    period: "Graduated Jul 2024",
    location: "Chennai, TN",
  },
  {
    school: "Delhi Technological University",
    degree: "M.Sc, Mathematics",
    period: "Graduated Jul 2022",
    location: "New Delhi, DL",
  },
  {
    school: "University of Delhi",
    degree: "B.Sc, Mathematics",
    period: "Graduated 2020",
    location: "New Delhi, DL",
  },
];

export const projects = [
  {
    title: "Agentic Product Recommender",
    summary:
      "LangGraph-powered assistant that retrieves catalog data, keeps conversational state, and executes tool-based actions like cart updates and invoices.",
    tags: ["LangGraph", "Agents", "LLM", "RAG"],
    metric: "Stateful toolchains",
  },
  {
    title: "Medical Report Summarisation",
    summary:
      "Fine-tuned T5 on curated medical texts to generate concise, patient-friendly summaries with 33.8 ROUGE-L F1.",
    tags: ["T5", "NLP", "Healthcare"],
    metric: "33.8 ROUGE-L",
  },
  {
    title: "Weather Platform",
    summary:
      "Custom MCP server/client deployed with Docker and Cloud Run, paired with a Streamlit UI for low-latency city forecasts.",
    tags: ["MCP", "Streamlit", "GCP", "Docker"],
    metric: "Cloud Run",
  },
  {
    title: "Search-as-a-Service",
    summary:
      "Embeddings-backed semantic search with Redis hot cache and Elasticsearch persistence for sub-second question answering at scale.",
    tags: ["Elasticsearch", "Redis", "Search"],
    metric: "<10ms cache path",
  },
  {
    title: "MLR Audit Platform",
    summary:
      "Multi-agent pharma claim extraction with compliance scoring, breach flags, and audit-ready workflows using Azure GPT-4o.",
    tags: ["CrewAI", "Azure", "Agents"],
    metric: "Compliance scoring",
  },
  {
    title: "Automotive Parts Detection",
    summary:
      "Edge-ready computer vision pipeline with curated data, augmentations, and YOLOv8 training for real-time inspection.",
    tags: ["YOLOv8", "Computer Vision", "Edge AI"],
    metric: "0.991 mAP",
  },
  {
    title: "Soccer Event Analytics",
    summary:
      "Annotated 500+ clips and tuned EfficientNet-B0 for goals, fouls, and corners in near real-time event workflows.",
    tags: ["Computer Vision", "Video", "EfficientNet"],
    metric: "+15% accuracy",
  },
];

export const certifications = [
  "AWS Cloud Practitioner",
  "AWS AI Practitioner",
  "Microsoft Azure AI Fundamentals",
];

export const navItems = [
  ["Work", "#projects"],
  ["Blogs", "#blogs"],
  ["Experience", "#experience"],
  ["Skills", "#skills"],
  ["Education", "#education"],
  ["Contact", "#contact"],
];
