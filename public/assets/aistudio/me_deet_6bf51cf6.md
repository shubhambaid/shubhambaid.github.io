# Shubham Baid — Professional Knowledge Base
 
**Version:** 1.2 | **As of:** 25 November 2026 | **Classification:** Personal master record; contains internal engineering information.
 
**Purpose:** A living, reusable factual source for résumés, biographies, research applications, technical portfolios, interview preparation, project documentation and professional AI assistants. This is deliberately broader than a résumé. It captures achievements, engineering decisions, research failures, context, and provenance. Do not treat every item as publishable.
 
## 01 — Professional identity and positioning
 
- Name: Shubham Baid
- Base: Bengaluru, India
- Current role: Senior AI Architect / founding engineering team, BLUE (myblue.ai), April 2025–present. KGraph is referenced in private employment discussions; confirm the precise legal entity and contractual title before formal use.
- Experience: 6+ years from September 2020 to November 2026, including the period overlapping undergraduate studies. Public profiles still say 5+ years; that is a conservative alternative.
- Primary identity: AI systems engineer and applied researcher working at the intersection of efficient multimodal intelligence, real-time perception, video infrastructure, and production ML.
- Public profiles: https://shubhambaid.github.io/ | https://github.com/shubhambaid | https://huggingface.co/shubhambaid | https://www.linkedin.com/in/shubhambaid21/ | https://devpost.com/shubhambaid
- Professional email: shubhambaid99@gmail.com
### Core professional narrative
Shubham develops AI systems where the model is only one component of a larger engineering problem. His work spans how visual information is acquired, transmitted, represented, processed, evaluated and consumed by machine-learning models. He is particularly interested in problems where bandwidth, compute, latency, memory, data quality or reliability invalidate conventional assumptions. Rather than defaulting to larger models, he investigates the bottleneck and redesigns the system around it.
 
His career progressed from classical computer vision, model training and accelerated video inference, to enterprise deployment and edge optimization, to agentic business automation, and then to perception-aware video compression and domain-specific multimodal model research. The current emphasis includes dataset design, post-training, non-autoregressive decision architectures, quantization, production inference and scientifically defensible evaluation.
 
### Professional differentiators
- End-to-end ownership: data preparation, model architecture, training, benchmarking, low-level infrastructure, deployment, debugging and maintenance.
- Research grounded in production: investigations originate from real constraints and are tested against practical baselines and operational objectives.
- Heterogeneous compute experience: CPU, GPU, edge accelerators, embedded ARM, Intel media engines, Apple Silicon and NVIDIA deployment stacks.
- Strong interest in how models fail, not simply headline benchmark gains: negative results, task-specific degradation, calibration, uncertainty and reproducibility.
- Hands-on individual-contributor/architect orientation; able to work across ambiguous technical requirements, rapidly prototype, then harden the parts that need production reliability.
**Evidence legend:** PUBLIC = paper, public model card or repository supports the claim; SELF = prior résumé, user-provided record or first-party portfolio; INTERNAL = detailed engineering notes, not independently audited; PROTOTYPE = exploratory or demonstration status; CHECK = unresolved or missing evidence. Multiple labels can apply. Public availability does not imply independent validation.
 
---
## 02 — Employment chronology and role context
 
| Period | Organization | Role | Main scope |
|---|---|---|---|
| Sep 2020–May 2022 | Integration Wizards | Senior AI Engineer | Industrial CV, ALPR, GPU migration |
| May 2022–Jan 2025 | SparkCognition / Avathon | Senior AI Engineer | Production video analytics, edge inference, school safety |
| Jan–Apr 2025 | CAFU (Dubai, remote) | AI Engineer | ETA prediction, marketing agents, B2B automation |
| Apr 2025–present | BLUE / myblue.ai | Senior AI Architect, founding team | Video compression, VLMs, inference, edge systems |
 
Sources: previous professional sourcebooks and public personal portfolio [S1, S2]. Dates and titles are self-reported, not verified against employment letters. Integration Wizards was acquired by SparkCognition; Avathon is the subsequent company name used in professional materials. NeoFab.ai is a separate discontinued project, not an additional employer in this timeline.
 
### Integration Wizards — September 2020 to May 2022 [SELF]
Worked on industrial and enterprise computer vision, combining model development with deployment. The central engineering challenge was running multiple models on continuous video while minimizing resource usage.
- Developed an automatic license plate recognition (ALPR) pipeline with YOLO-based localization followed by OCR, including hybrid CPU/GPU execution. Optimized for real-time streaming under a constrained compute budget.
- Migrated legacy inference pipelines into NVIDIA DeepStream and TensorRT, enabling GPU-accelerated, production-oriented video processing.
- Delivered PPE detection, fall-arrester detection and vehicle classification, including data curation, training and deployment. These are distinct use cases of the same underlying production CV capability.
- Established experience in detector/classifier integration, model conversion, batch/stream handling, inference optimization, deployment troubleshooting and industrial camera conditions.
- The company's acquisition is part of organizational history; do not claim an individual model caused the acquisition.
### SparkCognition / Avathon — May 2022 to January 2025 [SELF]
Expanded from individual vision modules to production system ownership and deployment reliability. Developed and shipped detection and classification models used across thousands of cameras over the tenure.
- Led AI development for VAIA School Safety Suite, a real-time multi-camera system in US schools; reported deployment across 100+ cameras. Included object detection and person re-identification, model reliability and inference optimization.
- Built a gamified active-learning annotation system to accelerate curation and retraining. The principle was to create a feedback loop from uncertain or useful production samples to annotation and model updates. No quantified annotation speedup is currently available.
- Integrated vision-language models with conventional computer vision to address richer scene understanding beyond fixed-class detectors.
- Applied ARM/NEON optimization and INT8 quantization to reduce inference CPU utilization by a reported 50% while preserving real-time throughput. Exact hardware, baseline and test workload require recovery for a public benchmark.
- Worked across edge and GPU inference, production debugging, dataset maintenance, enterprise deployment and constrained video workloads.
---
## 03 — CAFU and current architectural responsibilities
 
### CAFU — January to April 2025 [SELF]
Applied ML and LLM workflows to operational and commercial outcomes rather than primarily visual perception. This role demonstrates versatility across predictive modelling and business automation.
 
**ETA prediction:** Improved an ML-based estimated-arrival-time system using real-time signals and operational analytics. Reported late fulfillment fell from 13% to 8% over three months (a five-percentage-point reduction); SLA breaches exceeding five minutes fell by 42%. The exact model family, feature pipeline and causal attribution have not been recovered. Use “reported” when citing the metrics outside a résumé.
 
**Marketing content workflow:** Designed an agentic LLM workflow to generate or assist with marketing copy, reducing turnaround by 50% and increasing click-through rate by 15%, according to prior career materials. Keep the CTR gain as reported; whether relative or absolute was not specified. Architecture and campaign-level evaluation are not available.
 
**B2B prospecting:** Developed an autonomous multimodal-LLM lead-acquisition workflow, reportedly processing approximately 1,400 prospects per month and reducing manual prospecting effort by 90%. Relevant skills include agent orchestration, multimodal information extraction and business-process automation. Exact integrations, lead quality measures and human-review policy need confirmation.
 
### BLUE — April 2025 to present [SELF/INTERNAL/PUBLIC]
Role: Senior AI Architect, founding team. Responsibilities include architectural design, hands-on C++ and Python engineering, video processing, edge hardware evaluation, applied vision-language research, training and serving, system performance, and technical problem solving.
 
Major workstreams (each treated separately in this knowledge base):
- BLUE perception-aware video compression and its edge-to-cloud SDK/infrastructure.
- Blue-Warehouse-2B domain-specific multi-frame VLM: data, fine-tuning, quantization, evaluation and serving.
- Blue-Decide-2B single-pass visual decision architecture and vLLM serving extension.
- Facial recognition and large-scale attendance infrastructure; model selection, latency, recognition quality and scaling.
- QSR tray/POS validation and retail visual understanding.
- Edge accelerator selection, hardware decode throughput, streaming capacity, storage and operational reliability.
The combined platform is reported to operate across 1,000+ production cameras, including offices, industrial environments, banks, warehouses and moving metro trains. Do not add camera counts from other products to this number; deployment populations may overlap. The warehouse VLM deployment is a separate approximately 400-camera POC footprint described later.
 
Research position: an AI architect who remains hands-on, developing model and system components rather than functioning solely as a managerial role. Current work includes production model evaluation and experimental architecture designs; those categories must remain distinct.
 
---
## 04 — BLUE perception-aware compression: technical case study
 
**Project ID:** BLUE-COMP | **Status:** production system and published research | **Role:** technical lead / architect / hands-on developer | **Evidence:** PUBLIC [S3, S4]; INTERNAL implementation and deployment notes.
 
### Problem and conceptual contribution
Fixed-camera surveillance contains high temporal redundancy. Standard encoders still expend bits representing a visually changing background due to sensor noise, illumination variation and other small changes. Downstream inference often cares much more about the foreground activity. The research question was how to suppress irrelevant temporal information without materially damaging object detection, event interpretation or vision-language reasoning. BLUE is a pre-encode compositor, not a replacement H.264/H.265 codec and not a learned neural video codec.
 
### System and algorithm
- Maintain a persistent background seed frame; preserve live foreground pixels while replacing selected background pixels with stale seed values. This increases inter-frame predictability for the conventional encoder.
- Use optical-flow-based motion estimation, thresholds and foreground masks to identify regions that require updates. Engineering variants included forward/backward flow, backward remapping, morphological mask cleanup, linger/hold logic and region-of-interest policies.
- OpenCV DIS optical flow (ultrafast configuration in CPU implementations); NVIDIA optical-flow hardware path explored via DeepStream nvof. Quantile-based motion statistics (approximately 90th–93rd percentile in some experiments) and EMA-style adaptation were used to manage motion thresholds.
- Separate foreground fidelity from background update frequency. Background frame-rate throttling, region-level configuration and scene-specific adaptation were explored. Seed refresh and transitions require care to avoid stale foreground content and excessive artifacts.
- Configuration experiments included flow_scale, base_motion_threshold, threshold min/max/smoothing, adaptive up/down adjustments, eta, quantile, magnitude scale, fill bounds and ROI coordinates with background FPS. These are internal design notes, not a stable public API contract.
### Evaluation philosophy
A conventional fidelity score is not enough to assess information preservation for downstream machine perception. Foreground-oriented VMAF evaluation and task-level comparisons were used to examine whether important regions retained useful information. Detection precision/recall, VLM semantic outputs, latency, throughput per watt, hallucinations, and matched codec comparisons informed design. The work examined multiple compression settings rather than one cherry-picked operating point.
 
### Production and research outcomes
- Project-reported median 40% bitrate reduction beyond H.265, reaching up to 69% in tested settings; less than 1% downstream detection performance impact in reported evaluations. These are scoped results, not guarantees for every camera or task.
- A prior résumé reports less than 0.1% VLM-output deviation under a specific internal protocol. Prefer the public paper's explicitly defined metrics when discussing semantic quality.
- Deployed across 1,000+ production cameras as reported by the user/portfolio; patent application filed, not granted.
- Early development references to roughly 80% savings use different baselines and should not be mixed with the later H.265 comparison.
---
## 05 — BLUE streaming infrastructure and edge engineering
 
**Project ID:** BLUE-EDGE | **Evidence:** INTERNAL; public portfolio supports high-level architecture [S1]. The configurations here are historical snapshots and test targets, not instructions for a universal deployment.
 
### Video processing architecture
RTSP source → depayload/parse → hardware decoder → resize/rate control → NV12 preprocessing → motion-aware compositor → hardware encoder → parse/mux → RTMP delivery → cloud decode and AI inference. A recording branch uses HLS and object storage. Resource fallbacks and camera lifecycle handling are essential to sustained operation.
 
**Intel N100 / VAAPI reference path:** rtspsrc (TCP, 200–300 ms latency) → rtph264depay → h264parse → vah264dec → videorate → vapostproc (960×540) → videoconvert (NV12) → identity optflow_point → vah264enc → h264parse → flvmux → rtmpsink. Tested encoder modes included CQP, ICQ, VCM and QVBR.
 
**NVIDIA reference path (RTX 4060):** depayload/parse → nvv4l2decoder → nvvideoconvert (NV12/NVMM) → nvstreammux (batch 1) → nvof → nvvideoconvert → nvv4l2h264enc → h264parse → flvmux → rtmpsink. Some tests used CQP (18/25/22), iframe interval 60, low latency and zero B-frames. These values varied by workload and device.
 
**Representative edge target:** 960×540, 5–10 fps, H.264 RTMP, at most 300 kbps per camera, roughly 4-second GOP and no B-frames. Other experiments retained original frame rate or resolution; this target is not a claim that all BLUE streams were downsampled.
 
### Performance and reliability investigations
- N100 handled roughly 4–5 FHD inputs with the full processing/compression workload in historical tests. CPU spikes near the limit motivated optical-flow concurrency cap of 2 and optional skipping every third frame under overload.
- Separate RTMP ingest/write benchmark: Intel Core Ultra 9 handled about 550 cameras and N100 about 90 cameras using Restreamer in an April 2026 test. This is ingest capacity, not full decode + optical flow + inference throughput.
- Explored multi-camera scheduling, CPU/GPU fallback, rate control, stream lifecycle, pipeline failures, network transport, low-latency buffering, concurrent processing and media-server integration.
- Recording experiments included HLS segments from 2 to 10 minutes, 30-day retention and S3-backed storage via s3fs; MediaMTX port conflicts and RTSP interoperability debugging formed part of operational work.
- Modeled storage for 6,000 cameras with 45-day retention, comparing illustrative 2 Mbps H.264, 1.2 Mbps H.265, 250 kbps semantic stream and day/night bitrate scenarios. This was capacity planning, not a measured 6,000-camera deployment.
### Hardware exploration
Intel N100, Core Ultra, NVIDIA RTX/Jetson, AMD Ryzen AI, Radxa, Raspberry Pi plus accelerator, Axelera M.2, and other embedded platforms were considered. The primary distinction is that NPU TOPS alone does not establish usable camera capacity: network demux, hardware decode, memory bandwidth and cross-device transfers can dominate. Evaluated architectural ideas include separating decode from inference and scheduling detector, OCR and embedding workloads independently. Specific comparative throughput numbers not recovered should remain estimates.
 
---
## 06 — BLUE public research record
 
### Paper 1: BLUE: A Stale-Pixel Optical-Flow Compositor for Entropy-Efficient Surveillance Video Encoding [PUBLIC]
Authors: Shubham Baid, Akash James, Sahil Chachra, Nishant Sinha, Kunal Kislay. arXiv:2606.28753. Submitted 27 June 2026; revised 4 July 2026. https://arxiv.org/abs/2606.28753 [S3]
 
Study: pre-encoding substitution of redundant background pixels in fixed-camera footage, paired with conventional video encoding. Evaluation uses the 308 annotated short VIRAT surveillance subclips, with a six-point CRF sweep across x264 and x265. At CRF 28, mean file-size reduction is 34.6% with x264 and 39.4% with x265; 95.8% and 99.4% of clips respectively show file-size reductions. These are mean values from the paper, not the separate median/up-to headline numbers from company materials. Do not conflate them.
 
### Paper 2: BLUE: Semantics-Preserving Video Compression for Efficient Vision-Language Surveillance Analytics [PUBLIC]
Authors: Shubham Baid, Akash James, Sahil Chachra, Nishant Sinha, Kunal Kislay. arXiv:2607.19515. Submitted 21 July 2026. https://arxiv.org/abs/2607.19515 [S4]
 
Study: assesses semantic event/anomaly understanding under BLUE-compressed H.265 versus unmodified H.265. Uses 227 paired event samples drawn from 106 VIRAT clips, and 54 CHAD anomaly clips. Matched frames are passed through a VLM captioning workflow and judged blind against annotation-derived ground truth. VIRAT average difference is approximately −0.01 on a 0–10 scale; CHAD scores are 4.31 (raw H.265) versus 4.26 (BLUE). These near-equivalent scores support the method under the tested setup; they do not prove universal equivalence or a particular human-perception metric.
 
### Intellectual property and publication hygiene
- User reports a patent filing related to perception-aware surveillance video compression for machine vision. Filing details and application identifiers are intentionally withheld at the user’s request. Never state that a patent has been granted.
- Both BLUE papers are arXiv preprints; journal or conference acceptance has not been established. Shubham is first author on both public records, with four coauthors.
- Research claims should include baseline, dataset, encoder/CRF, metric and scope. Use public-paper numbers when available; identify internal benchmarks explicitly.
- Technical narrative: the first paper asks whether background substitution improves encoding efficiency; the second asks whether the same transformation retains VLM-relevant semantics. Together they connect system optimization to downstream task preservation.
### Research skills evidenced by this work
Hypothesis design; optical-flow compositing; controlled codec sweeps; paired comparisons; semantic quality assessment; objective selection; production-to-research iteration; technical writing and communicating tradeoffs.
 
---
## 07 — Blue-Warehouse-2B: domain-specific VLM post-training
 
**Project ID:** BLUE-WH2B | **Period:** August–24 November 2026 | **Role:** end-to-end research and engineering owner | **Status:** FP8 deployment in warehouse POCs | **Evidence:** INTERNAL [S5, S6]. Treat training data, operational metrics and architecture details as confidential until cleared.
 
### Problem and scope
Create a compact multimodal model for warehouse CCTV events that can answer task-specific safety questions, count relevant objects/people, produce structured outputs and ground visual evidence. The production baseline was a much larger 30B model. The goal was to reduce latency and serving cost while retaining reliability on real warehouse events, rather than optimize only general-purpose benchmarks.
 
### Dataset engineering and reproducibility
- Fine-tuned Qwen3.5-2B for multi-frame visual understanding. Developed teacher-student supervision with a 35B teacher and human review rather than accepting all synthetic labels blindly.
- Round-two dataset: 11,786 training rows, 8,540 images. 9,536 rows from 916 private events, plus 2,250 public VQA/caption/grounding rows. Keep event count, row count and image count separate.
- Frozen validation: 1,364 rows, split at event level to avoid correlated frames leaking across train and validation. SHA256 manifests document data identity and enable reproducible runs.
- Dataset task mix includes warehouse safety decisions, counting, grounding, general VQA and captioning. Public data supports retention of broader visual capabilities; exact dataset licenses and mixture by individual task should be recorded separately.
- Human-reviewed evaluation: 226 events, expanded to 791 clips. These are separate from the frozen row-level validation metrics and must not be merged.
### Training design and engineering incident
- BF16 LoRA fine-tuning, rank 16; frozen vision tower, multi-image inputs, answer-only loss masking. The prompt is context, not a supervised target for loss.
- Qwen3.5's Gated DeltaNet / linear-attention projections require explicit adapter targeting. Diagnosed a silent PEFT target mismatch that left linear-attention projections in 18 of 24 layers unadapted. Fixed target selection and added a trainer preflight check to verify adaptation coverage before spending compute.
- Production-equivalent evaluation uses vLLM with a JSON grammar, ensuring structured answers are evaluated under the serving constraints customers actually experience.
- Maintained a 42-section decision log and a 13-page research-paper draft (internal, not an accepted publication). Documented both successful and failed approaches.
### Evaluation discipline
Balanced accuracy and recall for binary safety decisions; exact-count accuracy; grounding IoU; comparisons on event-level held-out samples; McNemar and bootstrap analysis; controlled ablations and precision sweeps. Safety recall matters independently of aggregate accuracy. Thresholds, class balance and false-negative costs should be included in deployment decision-making.
 
---
## 08 — Blue-Warehouse-2B: outcomes and quantization tradeoffs
 
| Evaluation | Baseline | Adapted result | Scope |
|---|---|---|---|
| Round 1 balanced accuracy | 59.7% | 75.7% | Internal validation |
| Round 1 recall | 37.4% | 62.4% | Internal validation |
| Round 2 balanced accuracy | 80.1% base | 82.0% BF16; 81.4% FP8 | Frozen validation |
| Round 2 recall | 75.2% base | 70.9% BF16; 71.4% FP8 | Frozen validation |
| Round 2 exact counts | Not recovered | 64.7% BF16; 62.2% FP8 | Frozen validation |
| Reviewed clips correct | 683/791, production 30B | 682/791, compact model | 226 reviewed events |
| Median latency | 4.53 s, production 30B | 2.45 s, compact model | Same reviewed comparison |
 
Source: internal November 2026 model engineering record and updated applied-ML résumé [S5, S6]. Round 1 and Round 2 are separate experimental protocols. Do not present the round-one improvement as a change measured on round-two validation.
 
### Precision and serving decision
Compared BF16, FP8, INT8, AWQ and NVFP4/4-bit paths. The FP8 variant (3.06 GB) was selected for serving. Lower precision did not degrade all tasks equally: a 4-bit grounding IoU result dropped from approximately 0.41 to 0.28. A smaller model is not necessarily preferable when grounding is an operational requirement. FP8 retained most measured quality while meeting practical memory and latency goals.
 
The compact model produced one fewer correct clip than the 30B comparison in the 791-clip reviewed sample, with a median latency of 2.45 s instead of 4.53 s (approximately 46% lower). The result supports near-parity on this specific reviewed sample, not equivalence across all possible inputs, or across every metric. Internal notes also report deployment across about 400 cameras at four warehouse POC customers. POC scale is not a claim of four fully rolled-out commercial deployments.
 
### Important failure modes and lessons
- Fine-tuning can silently target the wrong subset of parameters when model internals differ from expected attention architectures. Validate parameter coverage, not only absence of exceptions.
- Higher balanced accuracy can coexist with lower recall. This occurred in Round 2 and matters for safety alerts; do not hide the tradeoff.
- Quantization precision must be selected using task-level results. Grounding can degrade substantially even when binary decisions are comparatively robust.
- Event splits, stable manifests and production-equivalent grammar reduce misleading metrics and train/validation leakage. They do not eliminate all dataset biases.
- Comparing an adapted compact model with a 30B incumbent must use matched examples and review protocols. Report both model accuracy and latency; avoid claiming a statistically proven equivalence unless the test supports it.
**Reusable claim:** Owned the full workflow for a compact, domain-specific VLM, from teacher labeling and human validation through LoRA training, precision selection, vLLM inference and customer POC rollout; achieved near-identical reviewed-clip correctness to the 30B baseline with substantially reduced median latency.
 
---
## 09 — Blue-Decide-2B: single-pass multimodal decisions
 
**Project ID:** BLUE-DEC2B | **Period:** August–November 2026 research program | **Status:** experimental architecture and serving implementation; general production rollout not established | **Evidence:** INTERNAL [S5, S6].
 
### Research question
A generative VLM spends time autoregressively producing strings, punctuation and repeated structured answers, even when a customer requires only a collection of binary decisions. Can the model answer many typed questions with one forward computation, avoiding token-by-token generation, without a measurable loss of decision accuracy on a controlled held-out study?
 
### Architecture and serving
- Designed a custom pointer/decision head on a compact multimodal model to answer up to ten binary questions in one pass.
- Implemented a custom vLLM serving plugin for the non-autoregressive decision architecture rather than relying on the default JSON generation path.
- Investigated the interaction among question representations, model hidden states and output readout. Evaluated MoE routing and question-keyed readout variants via controlled ablations; both were recorded as no-go results in the available research notes.
- Compared decision output to the generative structured baseline, using multiple seeds and held-out evaluation rather than one favorable run.
| Metric | JSON-generating baseline | Single-pass head |
|---|---|---|
| Event latency (reported test) | 0.59 s | 0.17 s |
| Throughput (reported test) | 1× | 2.1× |
| Held-out accuracy | Comparator | No detectable difference in three-seed study |
 
Latency reduction and throughput gain are different metrics, potentially influenced by batching, concurrency and service overhead. They need not be reciprocals. The test setup, hardware and exact confidence intervals should accompany public use. “No detectable difference” is not proof that models are identical, nor proof that the new architecture generalizes to open-ended tasks.
 
### Research significance
The project moves beyond using a pre-trained VLM as an application component. It studies how a decision-focused output interface and custom serving path can change the computation required to extract visual judgments. It connects model architecture to real operational latency. Negative findings are valuable: not every additional routing mechanism or more elaborate question representation improves the measured result. The smallest useful output space may be a better design than an unrestricted text generation interface for a well-defined decision task.
 
**Reusable evidence:** custom model head; multi-question inference; non-autoregressive structured decisions; vLLM extension; controlled ablations; three-seed evaluation; performance benchmarking; internal research manuscript. Keep this separate from the public Verdict v1 project: both are decision-oriented, but use different model architectures and evaluation contexts.
 
---
## 10 — Additional BLUE applied perception projects
 
### Face recognition and attendance [INTERNAL]
**Project ID:** BLUE-FR | **Status:** engineering and scale-up work; final rollout metrics unconfirmed.
- Model pipeline: SCRFD detection and ArcFace embeddings; later YOLOv11-face evaluated as a detector alternative. Triton inference server served detection and embedding stages over gRPC, with FastAPI-facing services. Investigated integration with the core BLUE SDK.
- Historical benchmark: 100,000–200,000 enrolled face vectors, roughly 500–800 ms matching/pipeline latency in the May 2026 discussion; precise latency boundaries and hardware need verification. Approximately 40 real-time chunks were referenced; unit and test conditions are unclear.
- Design target: attendance for 8,000–10,000 employees using around 100 entry/exit cameras (50 each); this is a planning/deployment target, not a verified operational count.
- Explored FAISS Flat vector search performance with a million embeddings and batches of 1,000 queries; L40S detector/embedding throughput and matching bottlenecks were considered. Do not present estimated hardware numbers as observed benchmarks.
- Quality engineering: false matches, identity separation, confidence calibration, enrollment augmentation, detection quality, alignment, pose, eyewear, masks, hats, blur and fast motion. Model selection and onboarding design were considered together rather than treating threshold tuning as the only lever.
- Commercialization review: audited pretrained InsightFace ArcFace and LVFace model/data licensing. Investigated training from scratch with appropriately licensed data, separating source-code permissions from pretrained-weight and dataset rights. No claim of completed relicensing or legally cleared training dataset.
- Sensitive deployment domain: recognize privacy, consent, retention, access control, demographic performance and human review requirements. Specific compliance status has not been established.
### QSR order validation and retail analytics [SELF/INTERNAL]
**Project ID:** BLUE-QSR | Developed a workflow for verifying tray contents against point-of-sale order records using live CCTV and multimodal reasoning. Structured output and fuzzy matching addressed variants in menu item naming. The broader challenge is reconciling observations from an imperfect visual system with transaction records, including missing items or variations in presentation. Related retail exploration included top-shelf item detection, inventory/POS reconciliation and OCR. No validated accuracy, latency or customer rollout figure is available.
 
### BLUE 2.0 and related investigations [INTERNAL/PROTOTYPE]
Explored prioritized RTMP decode, integration with external services, event-specific VLM datasets, semantic indexing and resource-aware multi-camera scheduling. Additional experiments considered separating media decode hardware from AI inference hardware, OCR alongside detection/recognition, and using egocentric video to identify SOP steps or spatial paths. These are technical directions, not automatically completed deliverables.
 
---
## 11 — NeoFab.ai: manufacturing intelligence and agent architecture
 
**Project ID:** NEOFAB | **Classification:** independent discontinued venture/project (not an employment entry) | **Role:** founding member; agent architecture and evaluation lead | **Period:** active by February 2026; commencement date unconfirmed | **Status:** shut down in October 2026 (user-confirmed). [INTERNAL]
 
### Product problem
Manufacturing facility and process planning involves turning customer requirements, product descriptions, engineering documents and process constraints into plausible production stations, workflows, equipment, cycle times, operating costs and space requirements. The project aimed to reduce manual first-pass planning work and improve consistency across these interconnected outputs through domain-aware agents. The shutdown does not invalidate the architecture or engineering experience, but no continuing company, revenue, customer count or commercial success is claimed.
 
### Agent system and data design
- Station/workflow generation: infer process steps, operations, required stations and dependencies from specifications and standard operating procedures.
- Cycle-time estimation: estimate processing/handling times and throughput constraints at station level; propagate assumptions into process planning.
- Opex estimation: use machine, labor, utilities and process assumptions to estimate recurring costs. Office space estimation: translate organization and facility requirements into preliminary space needs.
- PRD work dated 24 February 2026: design a unified input layer for PDF/CAD-derived information before station generation; distinguish Estimated, Verified and Review states; move prompts into YAML and maintain vertical-specific knowledge bases.
- Evaluation: compare generated outputs against process and engineering constraints, use explicit assumptions and domain knowledge, flag uncertain output for human review. Avoid treating LLM estimates as verified engineering facts.
### Manufacturing knowledge and case examples
Worked with water-based paint manufacturing (manual and automated), solvent-based paint processes, and industrial control system planning (including an approximately 20,000-I/O PCS7 example). Process scenarios included around 1,000 L/day manual output and automated 500 × 20 L/day output; these were planning inputs rather than independently validated plant capacities. Developed or examined SOP-AUTO-01 and machine-oriented workflows.
 
Equipment examples included a 1,000 L high-speed disperser (20–25 HP), 20 L bead mill (11 kW), SS304 1,200 L vessel, gravimetric fillers and ATEX-rated pail-filling options. Validation included correcting a bead-mill pricing assumption to approximately INR 8–12 lakh in the discussed context. These are historical engineering assumptions, not current vendor quotations or certified process-safety specifications.
 
### Transferable engineering value
Multi-agent architecture; complex document-to-structured-data workflows; domain knowledge engineering; structured output validation; estimation under uncertainty; explicit status and provenance; requirements translation; prompt modularization; system evaluation. The strongest narrative is translating ambiguous manufacturing requirements into reviewable agent-generated plans, not claiming automation of certified factory design. Exact framework choices, code repository, deployed integrations, commencement date and customers need recovery.
 
---
## 12 — Independent model research: LFM2.5-VL and LFM3-VL
 
### LFM2.5-VL Lab — mixed precision on Apple Silicon [PUBLIC]
**Project ID:** LFM2VL | **Date:** August 2026 | **Role:** independent researcher and implementer. Repository: https://github.com/shubhambaid/lfm2vl-lab. Model and raw results: [S7, S8].
 
Investigated component-wise mixed-precision quantization of Liquid AI's LFM2.5-VL-3B using MLX on an M4 Pro with 24 GB unified memory. The hypothesis was that uniform 4-bit conversion may not be the best memory-quality tradeoff when different vision and language components have different sensitivity and quantization eligibility. This is quantization of existing model weights, not new foundation-model training.
 
| Measure | Mixed v6/p6/b4/e4 | Stock MLX 4-bit | BF16 |
|---|---|---|---|
| Artifact size | 2.04 GB | 2.39 GB | — |
| Effective bits/weight | 5.19 | 6.07 | — |
| Mean benchmark score | 81.3 | 81.0 | 81.5 |
 
The mixed artifact is about 14.4% smaller by the reported measurement. Scores are within reported sampling uncertainty (roughly ±4.0–5.3 points per benchmark). Claim comparable measured quality with lower footprint, not a proven accuracy improvement.
 
### Method and findings
- Component recipe: vision tower 6-bit where eligible, projector 6-bit, backbone 4-bit, embeddings 4-bit. The higher vision/projector precision and lower overall size are compatible because actual quantization coverage differs from nominal bit labels.
- Audited quantizable modules and parameters; only 67.2% of vision tower parameters were quantized. The SigLIP2 intermediate dimension of 4304 makes 27 fc2 layers incompatible with typical MLX group sizes 32/64/128. Two embedding modules were intentionally excluded because direct tensor access could cause corruption or runtime errors after conversion.
- Benchmarked DocVQA, ChartQA, OCRBench, ScreenSpot-v2 and RefCOCO, with 300 examples per benchmark in the reported comparison. Captured parse failure rates and confidence intervals.
- Examined image-token budgets. ScreenSpot-v2 scores in one sweep: 53.0 at 256 tokens, 79.0 at 512, 70.0 at 1024. More visual tokens did not monotonically improve results.
- Published experiment artifacts: quantization-coverage audits, survey of 56 quantized repositories, component and token sweeps, baseline comparisons and machine-readable JSON results. The public model card lists LFM1.0 license; inherited terms should be reviewed before redistribution or commercial use.
### LFM3-VL-2B — mixed precision and fidelity evaluation [PUBLIC]
Project ID: LFM3VL | Independent mixed-precision quantization research | November 2026 | Public model card [S16].
 
Published 1.266 GB weights (official 4-bit: 1.591 GB; BF16: 3.836 GB). Preserved LiquidAI’s QAD 4-bit backbone tensor-for-tensor (1.47B, group 32); quantized 164M vision and 25M projector parameters to 8-bit, and requantized 262M tied embeddings to 4-bit (group 64).
 
Paired greedy no-thinking evaluation: 1,500 identical examples, 300/task, 1,048,576 pixels. Mean: 85.0 vs official 85.6 and BF16 84.9. Paired bootstrap deltas: −0.68 [−1.43,+0.04] and +0.07 [−0.93,+1.11] points respectively. Per-task scores: DocVQA 89.4, ChartQA 81.7, OCRBench 81.3, ScreenSpot-v2 88.7, RefCOCO 83.7.
 
Recipe selection used teacher-forced KL on 270 separate items (8,950 positions): KL 0.0334, top-1 agreement 95.3%; four-bit vision substantially degraded fidelity. Audited 17 MLX releases. Thinking ChartQA (100 items): 91.0, 2.1 s/sample vs official 91.0, 2.3 s. Native-resolution DocVQA: 90.0, 4.10 GB peak vs official 89.7, 4.43 GB.
 
Limitations: M4 Pro 24 GB, mlx-vlm 0.7.11, single seed; no video, multi-image, multilingual, tool-use or long-context evaluation. Comparable observed scores, not proven equivalence. LFM Open License v1.0; derived weights, not foundation-model training.
 
---
## 13 — Verdict v1: public single-pass visual decision model
 
**Project ID:** VERDICT | **Status:** public experimental model | **Date:** September 2026 | **Evidence:** PUBLIC [S9]. Model: https://huggingface.co/shubhambaid/verdict.
 
### Motivation and architecture
A visual decision model should not necessarily generate prose when the required output is a choice or a probability. Verdict takes an image and a typed question with allowed options and predicts probabilities in a single forward pass. It draws conceptual inspiration from decision-oriented models such as Jev and Laya.
- Frozen `google/siglip2-base-patch16-224` vision/text encoder plus approximately 6.24M trainable parameters in a three-layer transformer decision head. The head is not a full 6M-parameter end-to-end model; the underlying encoder is additional.
- Input tokens represent the question, pooled image, 49 patch tokens (7×7), option embeddings and an OTHER token. Option tokens do not use position encodings, supporting order-invariance.
- Combines a SigLIP zero-shot logit prior with a learned correction, retaining access to the base encoder's semantics. Yes/no (`noul`) uses learned YES/NO tokens; `choice` supports candidate labels and explicit OTHER. Ordinal score questions are not supported in v1.
- Training used roughly 23,000 images from a 36,000-image cache, across CIFAR-100, Oxford-IIIT Pets, Oxford Flowers-102, DTD and Food-101. Held-out classes and EuroSAT were used to probe generalization. Cross-entropy and validation-fitted temperature calibration support probabilistic output.
| Reported evaluation | Verdict v1 | SigLIP zero-shot |
|---|---|---|
| Seen-class yes/no accuracy | 95.5% | 75.3% |
| Unseen-class yes/no accuracy | 94.1% | 75.1% |
| Unseen-class 10-option choice | 91.0% | 93.8% |
| EuroSAT 10-option choice | 34.6% | 42.4% |
 
Prior sourcebook and public model card [S9] report these comparisons. Check exact checkpoint and split before quoting. Results suggest strong performance for specific yes/no tasks, not universal superiority. Explicit OTHER handling, expected calibration error and AUROC were studied.
 
### Limitations and relevance
Counting and spatial reasoning were not validated; free-form yes/no statements may fall outside the training distribution. Low image resolution limits small text/details, and abstention does not reliably transfer to a different domain such as EuroSAT. Dataset licenses vary. This project demonstrates small-head architecture design, calibrated decision outputs, generalization experiments and the importance of reporting regressions. It complements but is distinct from the internal Blue-Decide-2B project.
 
---
## 14 — Spatial intelligence, video research and agent infrastructure
 
### Sharingan — egocentric trajectory and collision analysis [PROTOTYPE/PRIVATE]
First-person RGB video pipeline for pedestrian tracking, wearer ego-motion estimation, approximate bird's-eye visualization, trajectory prediction and risk assessment. The prior repository review describes YOLOv11n person detection with ByteTrack; Shi–Tomasi feature selection and sparse Lucas–Kanade optical flow; RANSAC homography for ego-motion compensation; estimated ground-plane projection based on feet and bounding-box geometry. Calculates predicted closest approach and time-to-contact, with noise and identity-switch gates. Optional LSTM forecasting and crowd anomaly heuristics were explored. A screen-recorded demo exists; accuracy and real-world safety certification are not established. Avoid presenting approximate monocular distances as calibrated safety-critical measurements.
 
### Finite-Tsukuyomi (also referred to as Tsukiyomi) [PROTOTYPE/PRIVATE]
Experimental 3D spatial memory reconstruction from first-person video: extract frames with FFmpeg, estimate geometry/camera pose using MASt3R, assemble a colored point cloud and explore through an interactive viewer. Optional Gaussian splatting via OpenSplat, depth-based rendering and a relive mode for camera-position playback. The prior README review reports a 120-frame demonstration with roughly 886,000 points. Demo metric, not a benchmark of reconstruction accuracy. Public screen-recording discussed in prior chats; code is private and public demo URL not recovered.
 
### Mage-VL Codec Lab [PUBLIC/ONGOING]
https://github.com/shubhambaid/mage-codec-lab. Studies whether codec-native patch importance (motion vectors and residual energy) adds value in budget-constrained video-language inference. Tests or proposes comparisons among I/P-frame patch selection, frame differences, spatial gradients, FFmpeg motion vectors, random selection, center bias and codec-bitcost reference. The upstream MLX-VLM PR and its successor are documented below. The submitted PR reports a matched-budget NExT-QA ablation (150 clips, budget 4,096) in which none of the tested importance signals, including FFmpeg motion vectors, exceeded random selection. This is a reported negative result, not a general claim about codec-native sampling.
 
### Arxiv-RAG [PUBLIC/PROTOTYPE]
https://github.com/shubhambaid/Arxiv-RAG. CPU-first scientific PDF retrieval prototype. Separate document ingestion and embedding from query answering; FAISS retrieval, LangChain orchestration, all-MiniLM-L6-v2 embeddings and quantized TinyLlama-family local generation. README provides setup, ingestion and interactive inference. Evidence of actual RAG implementation; production quality and scale not established.
 
### MinerU Demo [PUBLIC/PROTOTYPE]
https://github.com/shubhambaid/miner-u-demo. Local document parsing interface for Markdown, JSON, figures and structured extraction. Supports PDF and other office/image formats according to prior README review. Separates layout and reading-order recovery, OCR and tables from generic summarization. Integration work, not original training of MinerU.
 
### Alethic [PUBLIC/PROTOTYPE]
https://github.com/shubhambaid/alethic. Git-backed coding-agent continuity: repository-local YAML in `.alethic/` for tasks, decisions, checkpoints and verification receipts, with stale-state detection and association with code changes. Emphasizes reviewable versioned state over dependence on chat memory or an external database. Relevant to agent infrastructure, developer tools and engineering reproducibility.
 
### Selected upstream open-source contributions [PUBLIC]
Reviewed GitHub pull requests attributed to shubhambaid, their merge states and maintainer discussions on 25 November 2026. Prioritize material engineering changes over cosmetic fixes, forks, and self-repository activity. Merge status is verified; implementation and experimental claims are not independently reproduced.
 
#### OSS-DORA — Dora MuJoCo simulation node (merged)
PR #43, dora-rs/dora-hub: https://github.com/dora-rs/dora-hub/pull/43. Submitted 25 February 2026; merged 13 May 2026. 165 additions, 84 deletions, two files. Transformed the MuJoCo client from a passive viewer into a configurable simulation node. Used GLContext/MjrContext for off-screen rendering; discovered MJCF camera elements dynamically and published JPEG images. Replaced direct qpos manipulation with data.ctrl so physics, actuator limits, gearing and damping govern motion. Split physics ticks from vision rendering to avoid coupling control frequency to image encoding; removed hardcoded joint/config assumptions in favor of the scene XML. Strong evidence of upstream robotics infrastructure, simulation, image pipelines and real-time systems engineering. No measured speedup or physical robot validation is claimed.
 
#### OSS-MLXVLM — Mage-VL video input and attention boundaries (superseded)
PR #2069, Neywa-Labs/mlx-vlm: https://github.com/Neywa-Labs/mlx-vlm/pull/2069. Submitted 28 August 2026; closed without merge. 107 additions, 25 deletions, four files. Investigated macOS incompatibility of the Linux-only codec-video-prep dependency; implemented uniform video sampling using existing OpenCV/Qwen3VL processing, video placeholder expansion and routing, and optional explicit cu_seqlens for sparse patch attention windows. Reported dense-path parity (max absolute difference 0), correct 1,568 placeholder tokens for an eight-frame grid and an end-to-end NExT-QA example. A maintainer said the fix was not quite right and provided PR #2202 (https://github.com/Neywa-Labs/mlx-vlm/pull/2202), merged 9 September 2026, explicitly superseding #2069 and forwarding video timestamp metadata. Credit: investigated and submitted a substantive upstream patch; do not claim the final merged implementation or sparse codec selection shipped.
 
#### OSS-OPENARM — OpenArm 2.0 bimanual sensors (superseded)
PR #17, enactic/openarm_mujoco: https://github.com/enactic/openarm_mujoco/pull/17. Submitted 25 February 2026; closed without merge. Added a v2 bimanual MJCF model with wrist-left, wrist-right, head and ceiling cameras aligned with intended inference topics. Camera poses were approximations, not physically calibrated. Maintainer acknowledged the configuration as helpful and discussed modular MJCF parameters for system identification and sim-to-real refinement. Closed in favor of PR #19 (https://github.com/enactic/openarm_mujoco/pull/19), merged 14 May 2026. Credit: submitted simulation sensor integration and participated in upstream architecture discussion; not authorship of the final refactor.
 
#### Additional history and selection
OpenALPR #935 (https://github.com/openalpr/openalpr/pull/935), submitted April 2021, remains open; two-line Ubuntu 18.04 documentation patch. Historical student/community PRs and trivial fixes are not flagship evidence. Alethic remains an owned OSS project, not a third-party contribution. The review is a targeted PR audit, not an exhaustive commit-by-commit attribution analysis.
 
---
## 15 — Early research, hackathons and physical AI projects
 
### YetiCoach [PUBLIC/SELF] — HackZurich track winner
https://github.com/shubhambaid/YetiCoach. Collaborative sports-vision project with Jackson Sunny, using action-camera video to estimate ski separation, angles and depth/path characteristics. Prior repository review credits YOLOv5 and MonoDepth components. Interactive coaching dashboard aimed to extract technique feedback without additional specialized sensors. Track associated with Sunrise, Huawei and Swiss-Ski. Portfolio reports 2021; LinkedIn labels the award 2022. Use track winner without year until confirmed, or use 2021 with the portfolio cited and verify certificate. Do not claim sole authorship or overall hackathon grand-prize win.
 
### Aegir — marine debris intelligence [SELF]
NASA Space Apps challenge project using satellite/UAV imagery and computer vision to identify and classify ocean debris, explore trajectories and support cleanup coordination. Portfolio says 2021 track winner; LinkedIn references 2022. Exact award level and official year require confirmation; use “NASA Space Apps track winner” rather than asserting global overall winner without official evidence. Project repository/link not recovered in current review.
 
### Argus [PUBLIC/PROTOTYPE]
https://github.com/shubhambaid/Argus | Devpost profile [S10]. Drone-based disaster response concept for observing affected localities and producing responder-relevant information, including estimated population/density and depth maps. Intended to support evacuation planning; no operational disaster-response deployment established.
 
### AutoSnotBot / Algal Boom and WHALES-EYE [PUBLIC/PROTOTYPE]
https://github.com/shubhambaid/Deepstream-SnotBot. Explored drone-based whale detection and a sampling concept using YOLO, DeepStream/TensorRT, Jetson Xavier NX and Tello video/control. Intended research use included whale health/algal bloom prediction. Devpost WHALES-EYE is a related educational web experience about whales and drone-based research. Do not claim completed biological sampling or validated environmental predictions.
 
### Hailey — GPT-2 writing assistance [PUBLIC/SELF]
https://github.com/shubhambaid/Hailey. Contextual sentence completion and writing assistance using GPT-2 and Hugging Face Transformers, predating modern mainstream generative-AI assistants. Associated publication and historical patent application noted in academic records (see next section).
 
### EnKindled — skin burn severity detection [PUBLIC/SELF]
Applied YOLOv3 to locate and classify burn severity; associated research paper and public dataset. Research prototype only, not a clinically validated diagnostic system. Dataset includes 1,227 images, 1,441 annotation files and 2,219 matched boxes, with 214 unmatched annotations; classes: first degree 872, second degree 992, third degree 355. License/data consent and clinical applicability require separate review. Dataset: https://huggingface.co/datasets/shubhambaid/skin-burn-dataset [S11].
 
### Smart Cap for Blind; Sharkzcout [PUBLIC/SELF]
Arduino wearable with ultrasonic distance sensing and haptic feedback for assistive navigation (prototype, not certified medical device). Sharkzcout is a Scapy-based network traffic analyzer, archived on GitHub: https://github.com/shubhambaid/sharkzcout. Demonstrates early work in embedded systems and networking.
 
---
## 16 — Other technical work and education
 
### Portfolio and additional prototyping [SELF/PROTOTYPE]
- NO ONE IS TYPING: October 2026 Wispr Flow hiring-challenge concept/demo, self-typing portfolio that renders text and ASCII visuals with a dictation-inspired daemon/hotkey interaction. Built with Emergent credits; explored how an interface might narrate the engineer's work through voice and live typing. The screen recording/demo was discussed; public deployment and final URL not confirmed.
- Arduino UNO Q smart-scale exploration: Linux plus STM32 microcontroller, camera input on Linux, sensor access on MCU and remote weight-server interfaces. Illustrates hardware/software co-design; final device completion not confirmed.
- Azure identity governance exploration: Workday to identity governance to Active Directory, provisioning and LDAP/LDAPS considerations. Record as technical consulting/exploration only unless delivery is confirmed.
- Broader interests: egocentric vision, SOP understanding, robotics/physical AI, spatial reconstruction, local multimodal inference, open-weight model optimization, agent continuity and evaluation. These interests are not additional delivered products.
### Education and credentials [SELF/PUBLIC]
B.Tech in Computer Science and Engineering, REVA University, Bengaluru, 2017–2021. CGPA 8.44/10 (self-reported). Best Outgoing Student award; founded Google Developer Student Club (GDSC) at REVA according to portfolio. Led student coordinators for internal Smart India Hackathon round in 2020 per LinkedIn. Credentials listed: NVIDIA Jetson AI Specialist, Intel Edge AI Specialist, Google TensorFlow Developer Certificate. Credential IDs and issue dates not recovered. IELTS 8.5, 10 April 2026 (self-reported; verify score report and validity if needed).
 
### Earlier recognition and academic research
- REVA institutional student-achievement page lists HACKFEST 2019 second position, KSIT Hackathon 2019 second position, VIT Hack 2019 special mention, JEEVA Samrakshak Hackathon 2020 top 10, and participation in NASA Space Apps 2019, HACKFEST 2018 and Hack Jaipur 2020 [S12]. Other discussions reference Sentinel Hack 2.0 and Galactic Problem-Solver; exact placement/year not recovered.
- “Text Generation Tool for Writing Assistance using Transformer,” Shubham Baid et al., Journal of Advanced Zoology, vol. 44(S6), 2023; earlier submitted August 2020 per public portfolio. Associated with Hailey. Verify full author order, DOI and publication details.
- “Detection of Different Degrees of Skin Burn using YOLOv3,” TEST Engineering and Management, May 2020, according to personal portfolio and dataset documentation. Verify full citation, author order, pagination and venue record.
- Historical personal portfolio references an Indian patent application for “System and Method for Text Generation Tool for Writing Assistance Using Transformer.” Do not merge with the BLUE patent filing or assert granted status. Filing details are private and not requested for this record. Two arXiv preprints plus two historical research records are documented; the older website's “2 publications” headline is stale/ambiguous and should not be used as an overall count without verification.
---
## 17 — Skills and evidence map
 
| Capability | Concrete evidence |
|---|---|
| Python and C++ | Production CV, GStreamer SDK, data/ML evaluation, edge tooling |
| Applied model research | BLUE papers, Warehouse-2B, Decide-2B, Verdict, LFM labs |
| Post-training | Qwen3.5-2B multi-image LoRA, teacher labeling, answer-only masking, adapter preflight |
| Vision and multimodal AI | YOLO, OCR, ArcFace, SCRFD, SigLIP2, Qwen-VL, LLaVA, InternVL; applied VLM evaluation |
| Video and streaming | GStreamer, DeepStream, FFmpeg, RTSP, RTMP, HLS, NV12, H.264/H.265, media decode/encode |
| Inference optimization | TensorRT, CUDA, VAAPI, NVENC/NVDEC, ARM/NEON, MLX, FP8/INT8/4-bit quantization |
| Serving and systems | vLLM custom plugin, Triton gRPC, FastAPI, Linux, Docker, multi-camera pipelines |
| Statistical evaluation | Paired tests, McNemar, bootstrap, confidence intervals, balanced accuracy, recall, IoU, calibration |
| Data engineering | Event-level splits, SHA256 manifests, teacher labeling, human review, annotation workflows |
| Agentic AI and RAG | CAFU, NeoFab, Arxiv-RAG, Alethic; LangChain directly evidenced; LangGraph/CrewAI listed skills |
| Spatial and embedded vision | Sharingan, Tsukuyomi, YetiCoach, drone prototypes, Jetson and embedded acceleration |
| Architecture/leadership | Founding team ownership, design reviews, end-to-end systems, cross-layer problem solving |
 
### Research-to-production approach
1. Define the actual objective: task accuracy, event detection, latency, resource usage or operational outcome instead of proxy metrics alone.
2. Identify the bottleneck using profiling and observations: hardware decode, bandwidth, memory, output generation, data imbalance, calibration or annotation reliability.
3. Establish meaningful baselines and stable datasets. Avoid leakage across correlated event frames, retain provenance, and distinguish estimates from verified observations.
4. Prototype narrowly and measure before scaling. Inspect model internals and actual precision/adapter coverage rather than trusting nominal configuration.
5. Evaluate the full system, including serving constraints, tail cases, failure modes, false negatives and deployment impact. Preserve negative results and scope statements.
6. Deploy or hand off with suitable lifecycle, fallback, observability and evaluation procedures. Document results and open issues so that another engineer can continue the work.
### Career direction (self-described, not commitments)
Interested in senior/staff/principal IC roles, AI systems engineering, inference engineering, edge AI, applied multimodal research, physical AI and research engineering. Prefers hands-on technical depth over pure management. Interested in research on model behavior, generalization, reliability, efficient architectures, quantization and practical evaluation. Open to global roles and technical collaboration. Bengaluru/Hyderabad validated startups are among domestic preferences; avoid using job-search preferences as part of a public technical bio unless relevant.
 
---
## 18 — Quantitative claim registry (for future writing)
 
| Claim | Value | Evidence and permitted scope |
|---|---|---|
| BLUE platform scale | 1,000+ cameras | SELF; production platform, no additive counting |
| BLUE compression headline | Median 40%, up to 69% beyond H.265 | SELF; specific evaluated conditions |
| BLUE downstream detection | <1% impact | SELF; exact metric/protocol to be named |
| BLUE codec paper | 34.6% x264; 39.4% x265 mean reduction | PUBLIC; VIRAT, CRF 28, 308 clips |
| BLUE VLM paper | VIRAT ≈−0.01; CHAD 4.31 vs 4.26 | PUBLIC; judged semantic scores |
| Warehouse training set | 11,786 rows; 1,364 validation | INTERNAL; Round 2, not image count |
| Warehouse reviewed correctness | 682 vs 683 of 791 clips | INTERNAL; 226 events, 2B vs 30B |
| Warehouse latency | 2.45 s vs 4.53 s | INTERNAL; median, matched comparison |
| Warehouse deployment | ~400 cameras, 4 warehouse POCs | INTERNAL; not confirmed full rollout |
| Warehouse model footprint | 3.06 GB FP8 | INTERNAL; served model |
| Decide throughput / latency | 2.1×; 0.17 vs 0.59 s/event | INTERNAL; specific serving benchmark |
| Avathon school deployment | 100+ cameras | SELF; VAIA, not current BLUE |
| Avathon CPU reduction | 50% | SELF; ARM/NEON + INT8, real-time throughput |
| CAFU delayed fulfillment | 13% to 8% | SELF; three-month operational metric |
| CAFU SLA breaches | −42% | SELF; breaches exceeding 5 minutes |
| CAFU marketing | CTR +15%; turnaround −50% | SELF; relative/absolute CTR not established |
| CAFU lead processing | ~1,400/mo; manual effort −90% | SELF; scope as reported |
| LFM2VL footprint | 2.04 vs 2.39 GB; −14.4% | PUBLIC; specific MLX artifacts |
| LFM3VL footprint / mean | 1.266 vs 1.591 GB; 85.0 vs 85.6 | PUBLIC; paired five-task comparison, not universal equivalence |
| Verdict trainable head | ~6.24M parameters | PUBLIC; excludes frozen encoder |
| Burn dataset | 1,227 images; 2,219 boxes | PUBLIC; 214 unmatched annotations |
 
**Claim-use rule:** A résumé can use concise project-reported results, but research proposals and technical documentation should include the underlying scope and comparator. Never convert plans into achievements, infer precision from rounded figures, or state statistical equivalence from an underpowered or nondetecting test. Internal metrics require company clearance before external publication.
 
---
## 19 — Repository inventory and public artifacts
 
GitHub connected-account search on 25 November 2026 returned the following public repository names. Listing establishes visibility at retrieval time, not sole authorship, source originality or active maintenance. The focus is on authored work and substantive experiments; forks/upstream-oriented repositories are not independent research accomplishments. For direct evidence use the selected repos documented in earlier sections. Private project information is not linked here.
 
**Research / developer infrastructure:** lfm2vl-lab, mage-codec-lab, alethic, alethic-labs, Arxiv-RAG, miner-u-demo, mlx-vlm.
 
**Vision / training / video tooling:** YetiCoach, Deepstream-SnotBot, DataAugmentation-GPU, YOLOv4-Cloud-Tutorial, RealTime-FaceFilters, BerryNet, tf-object-detection, openalpr, yolov5, edge-detectors, keras, deepstream_python_apps, darknet, TF2-Classifier, opencv, darknet-in-colab, YOLOv3-PyTorch, alprstream_sample, YoloGenerateTrainingFile, camera_localization.
 
**Robotics / early applied ML:** dora-hub, openarm_mujoco, dron-tello, tellooo, Argus, Machine-Learning-Epidemic, Medical-Cost-Prediction, gpt-2-Pytorch, Hailey, sharkzcout, enclosure-picroft.
 
**Community / web / miscellaneous:** GLUG-REVA.github.io, APNC-web-1, reva-newspaper.github.io, alacritty, 2020, mlh-localhost-github, snrkolar.github.io, harpy, daily-habito, public-apis, python-fire, dscreva.github.io, final-app-whyyy, shubhambaid.github.io, pcb-design.github.io, localhackday.github.io, hacktoberfest, saviskara.github.io, VITHACK2020, NewChitFund.
 
Additional earlier private or experimental work from the October repository review: YoloPytorch-ClassifierFusion (detector/classifier fusion), sanas-nn-test (PyTorch and C++/Eigen experiments), Sharingan, Finite-Tsukuyomi, Geki (handwritten note/manga application), Talk-to-drug (patient-support AI prototype), FlexiAthletics (web commerce/quiz application). Exact ownership, status and visibility can change; no medical, commercial or production claims made. Older profiles may list more projects than current public search.
 
**Hugging Face artifacts:** Verdict v1; LFM2.5-VL-3B-MLX-mixed-v6p6b4e4; LFM3-VL-2B-MLX-mixed-v8p8b4e4 (model card reviewed); lfm2vl-lab-results; skin-burn-dataset. Download/like counts are dynamic and intentionally omitted. Dataset viewer errors observed for some artifacts do not establish data absence; use files and model cards directly.
 
---
## 20 — Documentation templates, source index and verification backlog
 
### Reusable profile (short)
AI systems engineer and applied researcher with 6+ years of experience spanning production computer vision, video infrastructure, efficient multimodal models and edge inference. Builds systems from dataset and architecture design to optimization and deployment, with particular interest in how model behavior, compute constraints and reliability interact. First author of two BLUE video-compression preprints; independently researches quantization and single-pass visual decision architectures.
 
### Project record format (append new entries)
Project ID / title | organization or independent | dates | status | problem | personal responsibilities | collaborators | architecture / implementation | datasets and licensing | baseline and test protocol | results and uncertainty | negative findings | deployment scope | artifact links | confidentiality | last verified | unresolved questions. Maintain a separate numerical claim registry whenever a new benchmark supersedes an older one.
 
### Sources and provenance
[S1] First-party portfolio: https://shubhambaid.github.io/ and https://shubhambaid.github.io/index.html — career narrative, roles, dates, academic projects, awards; self-reported.
[S2] Prior user files: Shubham_Baid_Professional_Background_and_Work.docx; Shubham_Baid_Professional_Background_GitHub_Expanded.docx (October 2026). Recovered professional details and prior repository review; underlying résumé is self-reported.
[S3] BLUE encoding paper: https://arxiv.org/abs/2606.28753 (2026, v2).
[S4] BLUE semantic evaluation paper: https://arxiv.org/abs/2607.19515 (2026).
[S5] User's November 25 warehouse-model project record (Pasted text(2).txt, summarized from retrieved prior context); internal.
[S6] Shubham_Baid_Applied_ML_Engineer_Updated.pdf (November 2026), prior résumé; internal/self-reported.
[S7] https://huggingface.co/shubhambaid/LFM2.5-VL-3B-MLX-mixed-v6p6b4e4; [S8] https://huggingface.co/datasets/shubhambaid/lfm2vl-lab-results.
[S9] https://huggingface.co/shubhambaid/verdict; [S10] https://devpost.com/shubhambaid; [S11] https://huggingface.co/datasets/shubhambaid/skin-burn-dataset.
[S12] https://www.reva.edu.in/students-achievements/shubham-baid-3; [S13] https://in.linkedin.com/in/shubhambaid21 (date discrepancies noted); [S14] GitHub account listing and prior README review, https://github.com/shubhambaid; [S15] retrieved historical conversation and memory summaries, including February–November 2026 technical notes. Public pages accessed or indexed during current review; not independent system testing.
 
[S16] https://huggingface.co/shubhambaid/LFM3-VL-2B-MLX-mixed-v8p8b4e4 — public model card, reviewed 25 November 2026. Results are author-reported; not independently reproduced.
 
[S17] GitHub upstream PR review (25 November 2026): Dora #43; MLX-VLM #2069 and #2202; OpenArm #17 and #19; OpenALPR #935. Direct PR links and outcomes appear in section 14. GitHub records establish submitted/merged status, not independent performance validation.
 
### Verification backlog (priority before external reuse)
- Confirm official employment titles/legal entity, NeoFab commencement date and exact scope, and whether early employment overlapped university as internship or full-time.
- Recover official HackZurich/NASA certificates: year and award category conflict across first-party profiles. Confirm credential and academic citation IDs. Patent filing details are intentionally excluded.
- Recover full warehouse/decision paper, decision log, evaluation hardware, confidence intervals and approved disclosure scope; verify exact production vs POC status. Obtain direct demos for Sharingan/Tsukuyomi/portfolio.
- Record benchmark configurations for Avathon, CAFU, BLUE ingest, face recognition and other internal numbers; confirm whether CTR changes are relative. Obtain NeoFab architecture artifacts if available.
- This record was assembled from available chat retrieval, prior files, GitHub listing and accessible public sources, not a complete raw export of every chat or every repository commit. No access to unconnected email/Drive records. Unverified statements are labeled; no assumption of public permission for confidential employer or private-repository details.
