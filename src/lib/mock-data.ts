export interface IntelligenceModule {
  id: string;
  title: string;
  detail: string;
  domain: string;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: number;
  deltaPct: number;
  unit?: string;
  trend: number[];
}

export interface TimeSeriesPoint {
  tick: string;
  signals: number;
  experiments: number;
  contributors: number;
  latency: number;
}

export interface DashboardAlert {
  id: string;
  type: "info" | "warning" | "success";
  title: string;
  detail: string;
  at: string;
}

export interface InfrastructureStage {
  id: string;
  title: string;
  detail: string;
  throughput: string;
}

export interface ProductModule {
  id: string;
  name: string;
  summary: string;
  stage: "Operational" | "In Development" | "Research";
}

export interface RoadmapItem {
  id: string;
  stream: "Now" | "Next" | "Experimental";
  title: string;
  description: string;
}

export interface TeamProfile {
  id: string;
  name: string;
  role: string;
  specialization: string;
  linkedin: string;
  image?: string;
}

export interface CareerRole {
  id: string;
  title: string;
  track: string;
  whatYouBuild: string;
  mode: "Full-time" | "Internship";
}

export const intelligenceModules: IntelligenceModule[] = [
  {
    id: "aggregation-protocol",
    title: "Signal Aggregation Protocol",
    detail:
      "Consensus layer that normalizes contributor outputs before model orchestration, reducing single-model bias.",
    domain: "Consensus Systems",
  },
  {
    id: "contributor-attribution",
    title: "Attribution Engine",
    detail:
      "Tracks predictive contribution quality over rolling horizons to preserve accountability and model explainability.",
    domain: "Research Integrity",
  },
  {
    id: "distributed-validation",
    title: "Distributed Validation Mesh",
    detail:
      "Parallel validation surfaces that benchmark hypotheses across regimes before deployment into strategy stacks.",
    domain: "Infrastructure",
  },
  {
    id: "adaptive-ensembling",
    title: "Adaptive Ensembling",
    detail:
      "Dynamic reweighting of signals based on context drift, confidence windows, and historical precision bands.",
    domain: "Modeling",
  },
];

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: "signals",
    label: "Signals Processed",
    value: 18420,
    deltaPct: 4.8,
    trend: [132, 144, 150, 162, 168, 176, 188],
  },
  {
    id: "contributors",
    label: "Research Contributors",
    value: 186,
    deltaPct: 2.4,
    trend: [148, 152, 158, 161, 167, 172, 186],
  },
  {
    id: "experiments",
    label: "Active Experiments",
    value: 61,
    deltaPct: 7.1,
    trend: [42, 44, 47, 50, 54, 57, 61],
  },
  {
    id: "models",
    label: "Models Running",
    value: 23,
    deltaPct: 3.2,
    trend: [18, 19, 19, 20, 22, 22, 23],
  },
  {
    id: "markets",
    label: "Market Coverage",
    value: 312,
    deltaPct: 1.6,
    unit: "instruments",
    trend: [286, 292, 296, 299, 304, 309, 312],
  },
  {
    id: "latency",
    label: "Pipeline Latency",
    value: 143,
    deltaPct: -2.3,
    unit: "ms",
    trend: [162, 158, 155, 151, 149, 146, 143],
  },
  {
    id: "confidence",
    label: "Consensus Confidence",
    value: 82,
    deltaPct: 1.1,
    unit: "%",
    trend: [76, 77, 78, 80, 81, 81, 82],
  },
  {
    id: "anomaly",
    label: "Anomaly Flags",
    value: 3,
    deltaPct: -25,
    trend: [7, 6, 5, 5, 4, 3, 3],
  },
  {
    id: "coverage-regime",
    label: "Regime Buckets",
    value: 9,
    deltaPct: 0.0,
    trend: [8, 8, 9, 9, 9, 9, 9],
  },
];

export const dashboardSeries: TimeSeriesPoint[] = [
  { tick: "09:00", signals: 210, experiments: 42, contributors: 129, latency: 169 },
  { tick: "10:00", signals: 268, experiments: 45, contributors: 136, latency: 164 },
  { tick: "11:00", signals: 323, experiments: 49, contributors: 142, latency: 160 },
  { tick: "12:00", signals: 370, experiments: 53, contributors: 148, latency: 154 },
  { tick: "13:00", signals: 418, experiments: 55, contributors: 154, latency: 151 },
  { tick: "14:00", signals: 449, experiments: 59, contributors: 165, latency: 147 },
  { tick: "15:00", signals: 501, experiments: 61, contributors: 172, latency: 143 },
];

export const dashboardAlerts: DashboardAlert[] = [
  {
    id: "alert-1",
    type: "warning",
    title: "Latency Spike Detected",
    detail: "Ingestion node 03 exceeded threshold for 14m before auto-correction.",
    at: "14:11",
  },
  {
    id: "alert-2",
    type: "success",
    title: "Consensus Lock Stabilized",
    detail: "Adaptive ensemble reached target confidence in volatility bucket B2.",
    at: "13:44",
  },
  {
    id: "alert-3",
    type: "info",
    title: "New Contributor Cohort",
    detail: "6 additional validated contributors entered delayed validation lane C.",
    at: "12:58",
  },
];

export const infrastructureStages: InfrastructureStage[] = [
  {
    id: "ingestion",
    title: "Ingestion + Normalization",
    detail: "Market and contributor streams are normalized into deterministic feature contracts.",
    throughput: "2.8M events/day",
  },
  {
    id: "mesh",
    title: "Experimentation Mesh",
    detail: "Hypotheses are benchmarked across cohorts before inclusion into active stacks.",
    throughput: "61 active tracks",
  },
  {
    id: "consensus",
    title: "Consensus Orchestrator",
    detail: "Adaptive weighting composes validated signals into portfolio-grade intelligence.",
    throughput: "23 model cohorts",
  },
  {
    id: "observability",
    title: "Observability + Attribution",
    detail: "Telemetry and contribution quality remain visible through every pipeline stage.",
    throughput: "18420 signals/day",
  },
];

export const productModules: ProductModule[] = [
  {
    id: "investor-portal",
    name: "Investor Portal",
    summary: "Institutional view over consensus diagnostics and strategy lineage.",
    stage: "In Development",
  },
  {
    id: "research-dashboard",
    name: "Research Dashboard",
    summary: "Experiment lifecycle tracking, model notes, and validation workflows.",
    stage: "Operational",
  },
  {
    id: "signal-intelligence",
    name: "Signal Intelligence",
    summary: "Cross-regime signal quality maps and confidence surface monitoring.",
    stage: "Operational",
  },
  {
    id: "analytics-systems",
    name: "Analytics Systems",
    summary: "Portfolio-level analytics surfaces for hypothesis and risk decomposition.",
    stage: "In Development",
  },
  {
    id: "trade-journal",
    name: "Trade Journal",
    summary: "Execution narrative repository for post-trade causal analysis.",
    stage: "Research",
  },
  {
    id: "future-ai-tools",
    name: "Future AI Tools",
    summary: "Model-assistive research interfaces for hypothesis generation support.",
    stage: "Research",
  },
];

export const roadmapItems: RoadmapItem[] = [
  {
    id: "now-1",
    stream: "Now",
    title: "Research Surface Unification",
    description: "Consolidating fragmented research modules into a single systems dashboard.",
  },
  {
    id: "now-2",
    stream: "Now",
    title: "Contributor Reliability Scoring",
    description: "Hardening confidence attribution for distributed contributors.",
  },
  {
    id: "next-1",
    stream: "Next",
    title: "Model Registry Federation",
    description: "Shared model lineage index across experimentation tracks.",
  },
  {
    id: "next-2",
    stream: "Next",
    title: "Institutional Reporting Layer",
    description: "Structured reporting views for long-horizon research stakeholders.",
  },
  {
    id: "exp-1",
    stream: "Experimental",
    title: "Agentic Research Assistants",
    description: "Assisted research copilots for signal hypothesis exploration (concept stage).",
  },
  {
    id: "exp-2",
    stream: "Experimental",
    title: "Market Regime Intelligence Maps",
    description: "Probabilistic regime topology for adaptive signal weighting.",
  },
];

export const leadershipProfiles: TeamProfile[] = [
  {
    id: "raif",
    name: "Raif Mondal",
    role: "Founder, CEO & Product Lead",
    specialization: "AI/ML Systems, Quant Architecture",
    linkedin: "https://linkedin.com/in/raifmondal",
    image: "/images/raifmondal.jpeg",
  },
  {
    id: "diganta",
    name: "Diganta Sarkar",
    role: "Chief Financial Officer",
    specialization: "Financial Strategy, Compliance",
    linkedin: "https://www.linkedin.com/in/dig1nt1/",
    image: "/images/digantasarkar.png",
  },
  {
    id: "soumyadeep",
    name: "Soumyadeep Roy",
    role: "Chief Sales Officer",
    specialization: "Partnerships, GTM Systems",
    linkedin: "https://www.linkedin.com/in/soumyadeep-roy-2a392a269/",
    image: "/images/soumyadeeproy.png",
  },
  {
    id: "edgar",
    name: "Edgar Meva",
    role: "Platform Engineer",
    specialization: "Infrastructure Reliability",
    linkedin: "https://www.linkedin.com/in/edgar-peggy-meva-a-16a93a267/",
  },
];

export const careerRoles: CareerRole[] = [
  {
    id: "quant-researcher",
    title: "Quant Researcher",
    track: "Research",
    mode: "Full-time",
    whatYouBuild:
      "Alpha research pipelines, hypothesis testing workflows, and market microstructure models.",
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    track: "Data Systems",
    mode: "Full-time",
    whatYouBuild:
      "High-integrity ingestion and feature pipelines for market and contributor intelligence.",
  },
  {
    id: "full-stack-dev",
    title: "Full Stack Developer",
    track: "Platform",
    mode: "Full-time",
    whatYouBuild:
      "Operational research interfaces, dashboard infrastructure, and observability workflows.",
  },
  {
    id: "quant-intern",
    title: "Quant Researcher Intern",
    track: "Research",
    mode: "Internship",
    whatYouBuild:
      "Backtesting experiments, feature studies, and validation notebooks under senior guidance.",
  },
  {
    id: "data-intern",
    title: "Data Engineer Intern",
    track: "Data Systems",
    mode: "Internship",
    whatYouBuild:
      "ETL diagnostics, data-quality monitors, and supporting pipeline components.",
  },
  {
    id: "growth-seo",
    title: "Growth and SEO Intern",
    track: "Growth",
    mode: "Internship",
    whatYouBuild:
      "Research narrative distribution, documentation discoverability, and channel intelligence loops.",
  },
];
