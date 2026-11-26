export type WorkCategory = "all" | "research" | "production" | "oss" | "spatial";

export interface CaseStudyLink {
  label: string;
  href: string;
  download?: boolean;
}

export interface WorkMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  kickerAccent: string;
  kickerRest: string;
  title: string;
  summary: string;
  stack: string;
  categories: Exclude<WorkCategory, "all">[];
  spanTwo?: boolean;
  metrics?: WorkMetric[];
  bottleneck: string;
  architecture: string[];
  results: string[];
  caveats: string;
  links: CaseStudyLink[];
}

export interface PublicationItem {
  id: string;
  year: string;
  statusLine: string;
  roleLine: string;
  title: string;
  authors: string;
  venue: string;
  abstract: string;
  linkLabel?: string;
  linkHref?: string;
}

export interface ExperienceItem {
  period: string;
  organization: string;
  location: string;
  role: string;
  lead: string;
  bullets: string[];
  stack: string;
}

export interface WritingItem {
  date: string;
  format: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  external: boolean;
}

export const HERO_PROOF_METRICS = [
  {
    value: "1,000+",
    label: "Production cameras running BLUE pipelines",
    scope: "Offices, banks, warehouses & moving trains",
  },
  {
    value: "39.4%",
    label: "Mean x265 file-size reduction on VIRAT",
    scope: "308 clips, CRF 28 · arXiv:2606.28753",
  },
  {
    value: "1.266 GB",
    label: "LFM3-VL-2B mixed-precision MLX weights",
    scope: "85.0 mean across 1,500 paired 5-task items",
  },
  {
    value: "6+ yrs",
    label: "End-to-end research to edge deployment",
    scope: "First author · 2 arXiv preprints · 2026",
  },
];

export const RIBBON_ITEMS = [
  "perception-aware video compression",
  "mixed-precision quantization",
  "single-pass visual decisions",
  "gstreamer & deepstream",
  "vllm custom serving",
  "tensorrt & apple mlx",
  "statistically defensible evaluation",
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "blue-comp",
    kickerAccent: "BLUE",
    kickerRest: "Production & Published Research · 2025–Present",
    title: "BLUE Perception-Aware Video Compression",
    summary:
      "Pre-encode stale-pixel optical-flow compositor paired with standard H.264/H.265 encoders to suppress temporal background noise while preserving foreground semantics for detectors and VLMs.",
    stack: "C++ · Python · GStreamer · OpenCV DIS · DeepStream nvof · VAAPI",
    categories: ["production", "research"],
    spanTwo: true,
    metrics: [
      { value: "39.4%", label: "Mean x265 cut (VIRAT)" },
      { value: "−0.01", label: "VLM judge delta (0–10)" },
      { value: "1,000+", label: "Production cameras" },
    ],
    bottleneck:
      "Fixed-camera surveillance spends substantial bitrate re-encoding sensor noise and slight lighting drift in static backgrounds, even when downstream detectors and VLMs only care about foreground events.",
    architecture: [
      "Pre-encode stale-pixel optical-flow compositor (not a replacement codec and not a learned neural video codec) paired directly with standard H.264/H.265 encoders.",
      "Maintains a persistent background seed frame, estimates motion via OpenCV DIS optical flow (CPU) or NVIDIA nvof (DeepStream), applies morphological mask cleanup, and preserves live foreground pixels while freezing stale background regions.",
      "Architected full edge-to-cloud RTSP/RTMP pipelines across Intel VAAPI and NVIDIA DeepStream alongside Foreground VMAF and blind VLM semantic evaluation.",
    ],
    results: [
      "arXiv:2606.28753 (VIRAT 308 clips, CRF 28): 34.6% mean file-size reduction on x264 (95.8% of clips smaller) and 39.4% mean reduction on x265 (99.4% of clips smaller).",
      "arXiv:2607.19515 (227 paired VIRAT events + 54 CHAD anomaly clips): blind VLM semantic judge difference of −0.01 on 0–10 VIRAT scale and 4.31 vs 4.26 on CHAD.",
      "Production platform reported across 1,000+ cameras (offices, banks, industrial sites, warehouses, moving metro trains) with project-reported 40% median (up to 69%) bitrate cut beyond H.265 and <1% downstream detection impact; patent application filed.",
    ],
    caveats:
      "Both BLUE papers are arXiv preprints (not peer-reviewed venue acceptances). Patent application is filed, not granted. Actual compression savings vary with camera stability, foreground occupancy, and codec CRF.",
    links: [
      { label: "Encoding Paper (arXiv:2606.28753)", href: "https://arxiv.org/abs/2606.28753" },
      { label: "VLM Semantics Paper (arXiv:2607.19515)", href: "https://arxiv.org/abs/2607.19515" },
    ],
  },
  {
    id: "verdict",
    kickerAccent: "Hugging Face",
    kickerRest: "Independent Model · Sep 2026",
    title: "Verdict v1 — Single-Pass Visual Decision Model",
    summary:
      "Frozen SigLIP2 encoder + 6.24M trainable transformer decision head outputting calibrated probabilities in one forward pass with order-invariant options and explicit OTHER abstention.",
    stack: "SigLIP2 · PyTorch · Temperature Calibration",
    categories: ["research", "oss"],
    metrics: [{ value: "94.1%", label: "Unseen yes/no (vs 75.1%)" }],
    bottleneck:
      "Generative VLMs waste latency decoding prose and JSON syntax token by token when downstream workflows only need calibrated probabilities over a typed decision or closed candidate set.",
    architecture: [
      "Frozen google/siglip2-base-patch16-224 vision/text encoder paired with a ~6.24M trainable 3-layer transformer decision head.",
      "Feeds question, pooled image, 49 spatial patch tokens (7×7), position-free order-invariant option embeddings, and an explicit OTHER abstention token.",
      "Combines the SigLIP2 zero-shot logit prior with a learned correction and validation-fitted temperature calibration.",
    ],
    results: [
      "Seen-class yes/no accuracy: 95.5% vs 75.3% SigLIP2 zero-shot.",
      "Unseen-class yes/no accuracy: 94.1% vs 75.1% SigLIP2 zero-shot.",
      "Trained on ~23,000 images across CIFAR-100, Oxford-IIIT Pets, Flowers-102, DTD, and Food-101; evaluated expected calibration error and AUROC.",
    ],
    caveats:
      "Transparently documents regressions: unseen 10-option choice scored 91.0% vs 93.8% SigLIP zero-shot, and out-of-domain EuroSAT scored 34.6% vs 42.4%. Counting, small-text resolution, and cross-domain abstention are not solved in v1.",
    links: [{ label: "Hugging Face Model Card", href: "https://huggingface.co/shubhambaid/verdict" }],
  },
  {
    id: "oss-robotics",
    kickerAccent: "Upstream OSS",
    kickerRest: "Merged PR #43 · 2026",
    title: "dora-rs MuJoCo Simulation Node & Upstream PRs",
    summary:
      "Converted dora-hub's passive MuJoCo viewer into a configurable simulation node with off-screen rendering, dynamic MJCF camera JPEG streaming, and decoupled physics ticks.",
    stack: "MuJoCo · dora-rs · MLX-VLM · OpenArm",
    categories: ["oss", "spatial"],
    bottleneck:
      "Robotics simulation pipelines often couple image rendering directly to physics ticks and hardcode joint positions, breaking actuator physics and throttling control frequency.",
    architecture: [
      "dora-rs/dora-hub PR #43 (Merged May 2026): transformed the MuJoCo client using GLContext/MjrContext off-screen rendering, dynamic MJCF camera discovery with JPEG publishing, data.ctrl actuator-governed physics, and decoupled physics vs vision ticks.",
      "Neywa-Labs/mlx-vlm PR #2069 (Submitted Aug 2026): investigated macOS incompatibility of Linux-only codec-video-prep, implemented uniform video sampling and sparse patch cu_seqlens routing (later superseded by maintainer PR #2202).",
      "enactic/openarm_mujoco PR #17 (Submitted Feb 2026): contributed bimanual v2 MJCF multi-camera sensor rig aligned to inference topics, informing the merged PR #19 refactor.",
    ],
    results: [
      "dora-hub PR #43 merged cleanly (165 additions, 84 deletions across 2 files) removing hardcoded scene assumptions in favor of XML discovery.",
      "Verified dense-path parity (max absolute diff 0) and 1,568 placeholder token grid alignment in the MLX-VLM video patch investigation.",
    ],
    caveats:
      "Attributes merge credit strictly: PR #43 is merged; PR #2069 and PR #17 were closed in favor of maintainer follow-ups #2202 and #19.",
    links: [
      { label: "dora-hub PR #43 (Merged)", href: "https://github.com/dora-rs/dora-hub/pull/43" },
      { label: "mlx-vlm PR #2069", href: "https://github.com/Neywa-Labs/mlx-vlm/pull/2069" },
      { label: "openarm_mujoco PR #17", href: "https://github.com/enactic/openarm_mujoco/pull/17" },
    ],
  },
  {
    id: "lfm-quant",
    kickerAccent: "Apple MLX & Hugging Face",
    kickerRest: "Independent Research · Aug & Nov 2026",
    title: "LFM3-VL-2B & LFM2.5-VL Mixed-Precision Quantization Labs",
    summary:
      "Component-wise mixed-precision quantization on Apple Silicon M4 Pro. Audited 56+ public quantized repos, uncovered SigLIP2 group-size alignment blind spots, and shipped 1.266 GB LFM3-VL weights selected via teacher-forced KL.",
    stack: "MLX · QAD 4-bit · Teacher-Forced KL · Paired Bootstrap Eval",
    categories: ["research", "oss"],
    spanTwo: true,
    metrics: [
      { value: "1.266 GB", label: "vs 1.591 GB official 4-bit" },
      { value: "85.0", label: "5-task mean (1,500 items)" },
      { value: "95.3%", label: "Top-1 agreement (KL 0.0334)" },
    ],
    bottleneck:
      "Uniform 4-bit quantization treats sensitive vision encoders and projectors identically to language backbones, while nominal bit labels often hide unquantized layers caused by group-size alignment mismatches.",
    architecture: [
      "LFM3-VL-2B (Nov 2026): preserved LiquidAI's QAD 4-bit backbone tensor-for-tensor (1.47B, g32), quantized 164M vision and 25M projector params to 8-bit, and requantized 262M tied embeddings to 4-bit (g64). Selected recipe via teacher-forced KL (0.0334, 95.3% top-1 agreement).",
      "LFM2.5-VL-3B (Aug 2026): component recipe v6/p6/b4/e4. Audited 56 public quantized Hugging Face repos and uncovered that SigLIP2's 4304 intermediate dimension leaves 27 fc2 layers unquantized under MLX group sizes 32/64/128 (only 67.2% vision params quantized).",
    ],
    results: [
      "LFM3-VL-2B: 1.266 GB vs 1.591 GB official 4-bit (−20.4%) and 3.836 GB BF16. Paired 1,500-example 5-task eval mean: 85.0 vs 85.6 official and 84.9 BF16 (DocVQA 89.4, ChartQA 81.7, OCRBench 81.3, ScreenSpot-v2 88.7, RefCOCO 83.7). Native-res DocVQA 90.0 at 4.10 GB peak vs 4.43 GB.",
      "LFM2.5-VL-3B: 2.04 GB vs 2.39 GB stock MLX 4-bit (−14.4%); 81.3 mean vs 81.0 stock / 81.5 BF16. Documented non-monotonic visual token scaling on ScreenSpot-v2 (53.0 @ 256 → 79.0 @ 512 → 70.0 @ 1024).",
    ],
    caveats:
      "Evaluated on Apple M4 Pro 24 GB with single-seed greedy decoding; derived quantization weights under LFM Open License v1.0, not foundation-model training. Results show comparable observed scores, not universal equivalence.",
    links: [
      {
        label: "LFM3-VL-2B Model Card",
        href: "https://huggingface.co/shubhambaid/LFM3-VL-2B-MLX-mixed-v8p8b4e4",
      },
      { label: "LFM2.5-VL Lab (GitHub)", href: "https://github.com/shubhambaid/lfm2vl-lab" },
      {
        label: "LFM2.5-VL Results Dataset",
        href: "https://huggingface.co/datasets/shubhambaid/lfm2vl-lab-results",
      },
    ],
  },
  {
    id: "blue-multimodal",
    kickerAccent: "BLUE",
    kickerRest: "Applied Multimodal & Edge · 2025–Present",
    title: "Compact Domain VLMs, vLLM Serving & Edge Video Stack",
    summary:
      "Post-training compact multi-frame VLMs (LoRA, FP8 quantization, grammar-constrained vLLM), non-autoregressive decision heads, Triton face pipelines, and QSR tray validation.",
    stack: "Qwen3.5 · vLLM · FP8 · Triton gRPC · VAAPI",
    categories: ["production", "research"],
    bottleneck:
      "Running 30B-class general VLMs over continuous multi-camera CCTV feeds creates unsustainable serving latency and GPU cost, while heterogeneous edge hardware (Intel N100, Core Ultra, NVIDIA RTX/Jetson) bottlenecks on decode and memory bandwidth long before raw NPU TOPS.",
    architecture: [
      "End-to-end post-training of compact multi-frame VLMs: teacher-student supervision with human review, event-level train/validation splits with SHA256 manifests, answer-only loss masking, and LoRA adapter preflight verification.",
      "Precision and serving optimization across BF16, FP8, INT8, AWQ, and 4-bit — measuring task-specific degradation (such as spatial grounding vs binary classification) under grammar-constrained vLLM serving.",
      "Researched non-autoregressive multi-question decision heads with custom vLLM serving plugins, alongside multi-camera GStreamer/VAAPI/DeepStream pipelines, Triton gRPC face-recognition services, and QSR tray-vs-POS reconciliation.",
    ],
    results: [
      "Demonstrated that compact post-trained FP8 models can closely approach large incumbent accuracy on reviewed domain clips at substantially lower median latency.",
      "Diagnosed silent PEFT target mismatches on hybrid linear-attention architectures and codified automated adapter-coverage preflight checks.",
      "Production BLUE video platform operating across 1,000+ cameras with hardware-accelerated decode/encode scheduling and stream-lifecycle fallback.",
    ],
    caveats:
      "Internal operational datasets, customer POC metrics, and unreleased model architectures are intentionally kept high-level pending public release clearance.",
    links: [{ label: "BLUE Preprint Series (arXiv)", href: "https://arxiv.org/abs/2607.19515" }],
  },
  {
    id: "alethic",
    kickerAccent: "Open Source",
    kickerRest: "Agent Infrastructure · 2026",
    title: "Alethic — Git-Backed Coding-Agent Continuity",
    summary:
      "Repository-local YAML in .alethic/ for tasks, engineering decisions, checkpoints, and verification receipts with stale-state detection tied directly to commits.",
    stack: "Git · YAML State · Verification Receipts",
    categories: ["oss"],
    bottleneck:
      "Long-running coding-agent sessions lose engineering decisions, verification state, and task provenance across chat resets or brittle external databases.",
    architecture: [
      "Stores tasks, architectural decisions, checkpoints, and verification receipts as reviewable repository-local YAML under .alethic/.",
      "Links continuity artifacts directly to code commits with stale-state detection so engineers and agents share a versioned source of truth.",
    ],
    results: [
      "Public repository implementing Git-native continuity workflows without external database dependencies.",
    ],
    caveats:
      "Active developer-tooling prototype focused on reproducibility and reviewable agent state.",
    links: [{ label: "GitHub Repository", href: "https://github.com/shubhambaid/alethic" }],
  },
  {
    id: "mage-codec",
    kickerAccent: "Published Negative Result",
    kickerRest: "Video-VLM · 2026",
    title: "Mage-VL Codec Lab — Patch Importance Ablation",
    summary:
      "Matched-budget NExT-QA ablation (150 clips, 4,096 tokens) testing FFmpeg motion vectors and residual energy—finding none exceeded random selection under the tested setup.",
    stack: "FFmpeg MV · NExT-QA · Controlled Ablation",
    categories: ["research", "oss"],
    bottleneck:
      "Under tight token budgets for video-language models, do codec-native signals like FFmpeg motion vectors and residual energy actually select better visual patches than simpler heuristics?",
    architecture: [
      "Systematic ablation harness comparing I/P-frame patch selection, frame differences, spatial gradients, FFmpeg motion vectors, center bias, codec bitcost reference, and random selection under matched token budgets.",
    ],
    results: [
      "Controlled NExT-QA ablation (150 clips, budget 4,096 tokens): none of the tested importance signals, including FFmpeg motion vectors, outperformed random selection.",
    ],
    caveats:
      "A deliberate published negative result — narrow to the tested NExT-QA budget and protocol, demonstrating empirical discipline over cherry-picking.",
    links: [{ label: "GitHub Repository", href: "https://github.com/shubhambaid/mage-codec-lab" }],
  },
  {
    id: "spatial",
    kickerAccent: "Spatial Prototypes",
    kickerRest: "Egocentric & 3D Vision",
    title: "Sharingan & Finite-Tsukuyomi",
    summary:
      "First-person pedestrian trajectory and time-to-contact analysis (RANSAC homography + BEV) alongside MASt3R + OpenSplat 3D spatial memory reconstruction (~886k points).",
    stack: "YOLOv11 · ByteTrack · MASt3R · OpenSplat",
    categories: ["spatial", "research"],
    bottleneck:
      "Reconstructing egocentric spatial awareness—both real-time pedestrian collision risk and navigable 3D memory—from single-camera first-person RGB footage without specialized depth rigs.",
    architecture: [
      "Sharingan: YOLOv11n + ByteTrack tracking, Shi–Tomasi + sparse Lucas–Kanade optical flow, RANSAC homography for wearer ego-motion compensation, ground-plane bird's-eye projection, and time-to-contact estimation with identity-switch gating.",
      "Finite-Tsukuyomi: FFmpeg frame extraction → MASt3R geometry & camera-pose estimation → colored point-cloud assembly (~886,000 points across a 120-frame demo) with interactive viewer and optional OpenSplat Gaussian splatting.",
    ],
    results: [
      "Working end-to-end prototypes demonstrating monocular BEV trajectory projection and 3D camera-pose relive playback from handheld first-person video.",
    ],
    caveats:
      "Private exploratory prototypes; approximate monocular distances are not calibrated for safety-critical certification.",
    links: [{ label: "GitHub Profile", href: "https://github.com/shubhambaid" }],
  },
  {
    id: "avathon",
    kickerAccent: "Avathon",
    kickerRest: "Production CV · 2022–2025",
    title: "VAIA School Safety Suite & Active Learning",
    summary:
      "Led real-time multi-camera detection and person Re-ID across 100+ US school cameras, cut edge CPU load by 50% via ARM/NEON INT8, and built gamified active learning.",
    stack: "Multi-Camera CV · ARM/NEON · INT8 · VLMs",
    categories: ["production"],
    bottleneck:
      "Deploying multi-camera safety detection and person re-identification on constrained edge hardware while breaking manual annotation bottlenecks for continuous retraining.",
    architecture: [
      "Owned multi-camera object detection, person re-identification, inference optimization, and production reliability across 100+ live cameras in US school deployments.",
      "Optimized edge inference pipelines with ARM/NEON vectorization and INT8 quantization, and integrated early Vision-Language Models alongside classical CV for richer scene understanding.",
      "Built a gamified active-learning annotation system routing high-uncertainty production samples back into dataset curation and retraining loops.",
    ],
    results: [
      "Deployed across 100+ live cameras for VAIA School Safety Suite; shipped detection and classification models serving thousands of enterprise cameras over tenure.",
      "Reported 50% reduction in inference CPU utilization via ARM/NEON + INT8 optimization while maintaining real-time throughput.",
    ],
    caveats:
      "Exact historical hardware baseline and annotation speedup ratios are not publicly benchmarked.",
    links: [{ label: "Download Resume (PDF)", href: "/asset/Shubham_Baid.pdf", download: true }],
  },
  {
    id: "cafu",
    kickerAccent: "CAFU",
    kickerRest: "Applied ML & Agents · Jan–Apr 2025",
    title: "Real-Time ETA Modeling & B2B LLM Agents",
    summary:
      "Cut reported late fulfillment from 13% to 8% (−42% severe SLA breaches) and built multimodal B2B prospecting agents processing ~1,400 leads/month.",
    stack: "Predictive ML · Multimodal Agents · Python",
    categories: ["production"],
    bottleneck:
      "High late-fulfillment rates in on-demand mobile fuel delivery and slow, manual B2B lead research and marketing copywriting cycles.",
    architecture: [
      "Improved ML-based estimated-arrival-time modeling using real-time operational signals.",
      "Engineered an agentic LLM workflow for marketing content generation and an autonomous multimodal-LLM B2B lead-acquisition pipeline.",
    ],
    results: [
      "Reported late fulfillment dropped from 13% to 8% over three months (−5 percentage points) and SLA breaches over 5 minutes fell by 42%.",
      "Reported B2B agent processed ~1,400 prospects/month (−90% manual prospecting effort); marketing workflow cut turnaround by 50% with a reported 15% CTR lift.",
    ],
    caveats: "Metrics are role-reported operational outcomes from prior career records.",
    links: [{ label: "LinkedIn Profile", href: "https://www.linkedin.com/in/shubhambaid21/" }],
  },
  {
    id: "hackathons",
    kickerAccent: "Track Winners",
    kickerRest: "HackZurich & NASA Space Apps",
    title: "YetiCoach & Project Aegir",
    summary:
      "Action-camera ski biomechanics coaching (YOLOv5 + MonoDepth for Sunrise, Huawei & Swiss-Ski track) and satellite/UAV marine debris detection and tracking.",
    stack: "YOLOv5 · MonoDepth · Satellite/UAV CV",
    categories: ["spatial"],
    bottleneck:
      "Delivering actionable sports-biomechanics feedback from plain action cameras without wearable sensors, and tracking oceanic marine debris from aerial/satellite imagery.",
    architecture: [
      "YetiCoach (collaborative project with Jackson Sunny): YOLOv5 + MonoDepth pipeline estimating ski separation, posture angles, and depth path from action-camera video with an interactive coaching dashboard (Sunrise, Huawei & Swiss-Ski track).",
      "Project Aegir: computer vision workflow over satellite and UAV imagery to detect, classify, and model ocean debris trajectories for cleanup coordination.",
    ],
    results: [
      "YetiCoach: HackZurich track winner (Sunrise, Huawei & Swiss-Ski challenge).",
      "Project Aegir: NASA Space Apps track winner.",
    ],
    caveats:
      "Attributed accurately as track winners and collaborative hackathon builds rather than solo overall grand prizes.",
    links: [
      { label: "YetiCoach on GitHub", href: "https://github.com/shubhambaid/YetiCoach" },
      { label: "Devpost Profile", href: "https://devpost.com/shubhambaid" },
    ],
  },
  {
    id: "alpr",
    kickerAccent: "Integration Wizards",
    kickerRest: "Production CV · 2020–2022",
    title: "High-Throughput ALPR & DeepStream Migration",
    summary:
      "Hybrid CPU/GPU license plate recognition (YOLO + OCR), industrial PPE and fall-arrester detectors, and full migration onto NVIDIA DeepStream and TensorRT.",
    stack: "DeepStream · TensorRT · YOLO · OCR",
    categories: ["production"],
    bottleneck:
      "Running simultaneous detection and OCR models on continuous industrial camera feeds without exhausting edge hardware budgets.",
    architecture: [
      "Built an end-to-end Automatic License Plate Recognition (ALPR) pipeline combining YOLO localization and OCR with hybrid CPU/GPU execution.",
      "Migrated legacy inference workloads onto NVIDIA DeepStream and TensorRT GPU pipelines, and delivered PPE detection, fall-arrester detection, and vehicle classification.",
    ],
    results: [
      "Established the team's GPU-accelerated DeepStream/TensorRT production video inference architecture across continuous industrial streams.",
    ],
    caveats: "Integration Wizards was later acquired by SparkCognition (subsequently Avathon).",
    links: [
      {
        label: "Minato-Speed Inference Guide (Medium)",
        href: "https://shubhambaid.medium.com/make-your-deep-learning-models-infer-at-minato-speed-in-python-19563327425c",
      },
    ],
  },
];

export const PUBLICATIONS: PublicationItem[] = [
  {
    id: "blue-vlm",
    year: "July 2026",
    statusLine: "arXiv Preprint",
    roleLine: "First Author",
    title:
      "BLUE: Semantics-Preserving Video Compression for Efficient Vision-Language Surveillance Analytics",
    authors: "Shubham Baid, Akash James, Sahil Chachra, Nishant Sinha, Kunal Kislay",
    venue: "arXiv:2607.19515",
    abstract:
      "Evaluates event and anomaly understanding under BLUE-compressed H.265 versus unmodified H.265 across 227 paired VIRAT event samples and 54 CHAD anomaly clips using blind VLM judging: −0.01 average delta on VIRAT (0–10 scale) and 4.31 vs 4.26 on CHAD.",
    linkLabel: "arXiv PDF",
    linkHref: "https://arxiv.org/abs/2607.19515",
  },
  {
    id: "blue-enc",
    year: "June 2026",
    statusLine: "arXiv Preprint",
    roleLine: "First Author",
    title:
      "BLUE: A Stale-Pixel Optical-Flow Compositor for Entropy-Efficient Surveillance Video Encoding",
    authors: "Shubham Baid, Akash James, Sahil Chachra, Nishant Sinha, Kunal Kislay",
    venue: "arXiv:2606.28753",
    abstract:
      "Introduces pre-encoding substitution of redundant background pixels paired with conventional encoders across a six-point CRF sweep on 308 VIRAT surveillance clips. At CRF 28: 34.6% mean file-size reduction on x264 (95.8% of clips smaller) and 39.4% mean reduction on x265 (99.4% of clips smaller).",
    linkLabel: "arXiv PDF",
    linkHref: "https://arxiv.org/abs/2606.28753",
  },
  {
    id: "blue-patent",
    year: "Patent Filed",
    statusLine: "Application Pending",
    roleLine: "BLUE",
    title: "Perception-Aware Surveillance Video Compression for Machine Vision",
    authors: "Patent application filed (status: pending; filing identifiers withheld)",
    venue: "Intellectual Property",
    abstract:
      "Covers foreground-aware optical-flow compositing and downstream machine-perception compression evaluation workflows for multi-camera AI video analytics.",
  },
  {
    id: "hailey-pub",
    year: "2023 / 2020",
    statusLine: "Journal Record",
    roleLine: "+ Patent App",
    title: "Text Generation Tool for Writing Assistance using Transformer",
    authors: "Shubham Baid et al.",
    venue: "Journal of Advanced Zoology, Vol. 44(S6), 2023 (submitted Aug 2020)",
    abstract:
      "Contextual sentence completion and writing assistance built on GPT-2 and Hugging Face Transformers (Hailey), predating mainstream generative writing assistants, accompanied by a separate Indian patent application filing.",
    linkLabel: "GitHub",
    linkHref: "https://github.com/shubhambaid/Hailey",
  },
  {
    id: "burn-pub",
    year: "May 2020",
    statusLine: "Journal Record",
    roleLine: "+ Public Dataset",
    title: "Detection of Different Degrees of Skin Burn using YOLOv3",
    authors: "Shubham Baid et al.",
    venue: "TEST Engineering and Management · EnKindled Research Prototype",
    abstract:
      "Localized and classified first-, second-, and third-degree skin burns using YOLOv3 (research prototype, not a clinical diagnostic tool), accompanied by an open dataset of 1,227 images and 2,219 matched bounding boxes.",
    linkLabel: "HF Dataset",
    linkHref: "https://huggingface.co/datasets/shubhambaid/skin-burn-dataset",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: "Apr 2025 – Present",
    organization: "BLUE (myblue.ai)",
    location: "Bengaluru, India",
    role: "Senior AI Architect, Founding Engineering Team",
    lead: "Hands-on architecture and research spanning perception-aware video compression, edge-to-cloud streaming infrastructure, compact multimodal post-training, and custom serving.",
    bullets: [
      "Architected BLUE's stale-pixel optical-flow compositor and Foreground VMAF evaluation methodology: 39.4% mean x265 reduction on VIRAT (arXiv:2606.28753), −0.01 VLM semantic delta (arXiv:2607.19515), and project-reported 40% median (up to 69%) bitrate cut in production across 1,000+ cameras.",
      "Built end-to-end C++/Python GStreamer, Intel VAAPI, and NVIDIA DeepStream RTSP-to-RTMP edge pipelines across heterogeneous hardware (N100, Core Ultra, RTX, Jetson).",
      "Led applied research on compact domain-specific multi-frame VLM post-training (LoRA, FP8 precision selection, grammar-constrained vLLM serving) and non-autoregressive single-pass decision heads, plus Triton face recognition and QSR tray-vs-POS reconciliation.",
    ],
    stack: "C++ · Python · GStreamer · DeepStream · VAAPI · PyTorch · LoRA · FP8 · vLLM · Triton gRPC",
  },
  {
    period: "Jan 2025 – Apr 2025",
    organization: "CAFU",
    location: "Dubai, UAE · Remote",
    role: "AI Engineer",
    lead: "Applied predictive modeling and multimodal LLM automation directly to fulfillment SLAs and commercial workflows.",
    bullets: [
      "Improved real-time ETA prediction signals, with reported late fulfillment dropping from 13% to 8% over three months and SLA breaches exceeding 5 minutes falling by 42%.",
      "Built an autonomous multimodal-LLM B2B prospecting pipeline processing approximately 1,400 prospects/month (−90% manual prospecting effort) and an agentic marketing workflow (−50% turnaround, reported +15% CTR).",
    ],
    stack: "Predictive ML · Multimodal LLMs · Agent Orchestration · Python",
  },
  {
    period: "May 2022 – Jan 2025",
    organization: "Avathon (formerly SparkCognition)",
    location: "Bengaluru, India",
    role: "Senior AI Engineer",
    lead: "Owned production video analytics models, edge optimization, and continuous dataset loops deployed across thousands of enterprise cameras.",
    bullets: [
      "Led AI engineering for the VAIA School Safety Suite across 100+ live cameras in US school deployments, covering object detection, person re-identification, and production reliability.",
      "Reduced inference CPU utilization by a reported 50% at real-time throughput using ARM/NEON optimization and INT8 quantization.",
      "Built a gamified active-learning annotation feedback loop and integrated Vision-Language Models alongside classical detectors for context-rich scenes.",
    ],
    stack: "Multi-Camera CV · Person Re-ID · ARM/NEON · INT8 · TensorRT · Active Learning · VLMs",
  },
  {
    period: "Sep 2020 – May 2022",
    organization: "Integration Wizards",
    location: "Bengaluru, India · Acquired by SparkCognition",
    role: "Senior AI Engineer",
    lead: "Built multi-model industrial vision systems under strict edge compute budgets.",
    bullets: [
      "Owned a real-time ALPR pipeline (YOLO localization + OCR) with hybrid CPU/GPU execution tailored for continuous streaming.",
      "Migrated legacy inference workloads onto NVIDIA DeepStream and TensorRT GPU pipelines and shipped PPE, fall-arrester, and vehicle classification models.",
    ],
    stack: "NVIDIA DeepStream · TensorRT · YOLO · OCR · OpenCV · Hybrid CPU/GPU",
  },
];

export const ENGINEERING_PRINCIPLES = [
  {
    num: "01",
    title: "Define the actual operational objective",
    body: "Optimize task recall, event accuracy, latency, and throughput-per-watt rather than chasing proxy perceptual scores alone.",
  },
  {
    num: "02",
    title: "Profile the real bottleneck first",
    body: "NPU TOPS rarely tell the whole story—network demux, hardware decode, memory bandwidth, or token decoding often dominate.",
  },
  {
    num: "03",
    title: "Eliminate leakage before trusting metrics",
    body: "Use event-level splits, SHA256 data manifests, and matched baselines so correlated video frames never inflate validation scores.",
  },
  {
    num: "04",
    title: "Inspect model internals, not nominal configs",
    body: "Audit actual quantized parameter coverage and LoRA adapter targets—silent mismatches leave critical layers untouched.",
  },
  {
    num: "05",
    title: "Evaluate under serving constraints & keep negative results",
    body: "Test with production JSON grammars, paired bootstrap intervals, and publish task regressions openly so deployment tradeoffs stay honest.",
  },
];

export const CAPABILITIES = [
  {
    area: "Languages & Systems",
    detail: "Python, C++, Linux, Docker, FastAPI, Git-native workflows",
  },
  {
    area: "Multimodal & Post-Training",
    detail:
      "Qwen-VL / Qwen3.5, SigLIP2, LLaVA, InternVL, LoRA multi-image fine-tuning, answer-only masking, teacher-student supervision",
  },
  {
    area: "Video & Streaming",
    detail:
      "GStreamer, NVIDIA DeepStream, FFmpeg, RTSP, RTMP, HLS, NV12, H.264/H.265, OpenCV DIS & nvof optical flow",
  },
  {
    area: "Inference & Quantization",
    detail:
      "TensorRT, CUDA, VAAPI, NVENC/NVDEC, ARM/NEON, Apple MLX, FP8, INT8, AWQ, mixed-precision bit allocation",
  },
  {
    area: "Serving & Retrieval",
    detail: "vLLM custom serving plugins, NVIDIA Triton gRPC, FAISS vector search, LangChain, agentic orchestration",
  },
  {
    area: "Statistical Evaluation",
    detail:
      "Paired bootstrap CIs, McNemar tests, balanced accuracy & safety recall, grounding IoU, ECE calibration, teacher-forced KL",
  },
  {
    area: "Spatial & Robotics",
    detail: "MuJoCo simulation (dora-rs), ByteTrack, RANSAC homography, MASt3R 3D reconstruction, NVIDIA Jetson",
  },
];

export const WRITING_ITEMS: WritingItem[] = [
  {
    date: "Nov 2026",
    format: "Model Card",
    title: "LFM3-VL-2B Mixed-Precision Quantization & Paired Fidelity Evaluation",
    description:
      "1.266 GB Apple MLX weights preserving LiquidAI's QAD 4-bit backbone while holding vision and projector at 8-bit—selected via teacher-forced KL across 1,500 paired VQA items.",
    href: "https://huggingface.co/shubhambaid/LFM3-VL-2B-MLX-mixed-v8p8b4e4",
    cta: "Read on HF",
    external: true,
  },
  {
    date: "Sep 2026",
    format: "Model Card",
    title: "Verdict v1: Single-Pass Calibrated Visual Decisions on Frozen SigLIP2",
    description:
      "Architecture notes, order-invariant option tokens, explicit OTHER abstention, and an unvarnished breakdown of seen/unseen gains alongside EuroSAT domain-shift regressions.",
    href: "https://huggingface.co/shubhambaid/verdict",
    cta: "Read on HF",
    external: true,
  },
  {
    date: "Aug 2026",
    format: "Research Lab",
    title: "LFM2.5-VL Lab: Auditing Quantization Coverage & Non-Monotonic Visual Token Budgets",
    description:
      "Why nominal 4-bit labels hide unquantized SigLIP2 fc2 layers across 56 Hugging Face repos, and why 512 visual tokens beat 1024 on ScreenSpot-v2.",
    href: "https://github.com/shubhambaid/lfm2vl-lab",
    cta: "View Lab",
    external: true,
  },
  {
    date: "Jul 2026",
    format: "arXiv",
    title:
      "BLUE: Semantics-Preserving Video Compression for Efficient Vision-Language Surveillance Analytics",
    description:
      "Paired blind VLM judging across 227 VIRAT event samples and 54 CHAD anomaly clips evaluating semantic retention under BLUE-compressed H.265.",
    href: "https://arxiv.org/abs/2607.19515",
    cta: "Read Paper",
    external: true,
  },
  {
    date: "Jun 2026",
    format: "arXiv",
    title:
      "BLUE: A Stale-Pixel Optical-Flow Compositor for Entropy-Efficient Surveillance Video Encoding",
    description:
      "Six-point CRF sweep across x264 and x265 on 308 VIRAT clips demonstrating 34.6% and 39.4% mean file-size reduction at CRF 28 without altering standard decoders.",
    href: "https://arxiv.org/abs/2606.28753",
    cta: "Read Paper",
    external: true,
  },
  {
    date: "Guide",
    format: "Interactive",
    title: "Interactive Guide to LLM Testing, Evaluation & Fine-Tuning",
    description:
      "Sortable evaluation metrics comparison, Prompt Engineering vs RAG vs Fine-Tuning decision matrix, resource charts, and PEFT/LoRA practitioner notes.",
    href: "/llmguide.html",
    cta: "Open Guide",
    external: false,
  },
  {
    date: "May 2021",
    format: "Medium",
    title: "Make your Deep Learning models infer at Minato speed in Python",
    description:
      "Practical engineering walkthrough on accelerating deep learning inference pipelines with TensorRT, quantization, and runtime optimization in Python.",
    href: "https://shubhambaid.medium.com/make-your-deep-learning-models-infer-at-minato-speed-in-python-19563327425c",
    cta: "Read on Medium",
    external: true,
  },
];
