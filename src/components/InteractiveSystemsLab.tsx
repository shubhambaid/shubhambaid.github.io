import React, { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

type LabTab = "blue" | "quant" | "verdict";
type BlueMode = "split" | "mask" | "raw";
type BlueScene = "warehouse" | "metro";
type QuantModelKey = "lfm3" | "lfm25";
type VerdictSplitKey = "seen_yn" | "unseen_yn" | "unseen_10" | "eurosat";

interface QuantDataset {
  title: string;
  meta: string;
  summary: string;
  footprintMixed: string;
  footprintBase: string;
  footprintBf16: string;
  footprintNote: string;
  meanSummary: string;
  deltaNote: string;
  mixedLabel: string;
  baseLabel: string;
  blocks: { label: string; bits: string; detail: string }[];
  benchmarks: { name: string; mixed: number; base: number }[];
  links: { label: string; href: string }[];
}

const QUANT_DATA: Record<QuantModelKey, QuantDataset> = {
  lfm3: {
    title: "LFM3-VL-2B · Mixed Precision on Apple Silicon",
    meta: "November 2026 · M4 Pro 24 GB · mlx-vlm 0.7.11 · 1,500 paired items (300/task)",
    summary:
      "Preserved LiquidAI's QAD 4-bit backbone tensor-for-tensor (1.47B, group 32), quantized 164M vision and 25M projector parameters to 8-bit, and requantized 262M tied embeddings to 4-bit (group 64). Selected via teacher-forced KL on 270 held-out items (KL 0.0334, 95.3% top-1 agreement).",
    footprintMixed: "1.266 GB",
    footprintBase: "1.591 GB",
    footprintBf16: "3.836 GB",
    footprintNote: "−20.4% smaller than official 4-bit",
    meanSummary: "85.0 / 85.6 / 84.9",
    deltaNote:
      "Paired bootstrap deltas: −0.68 [−1.43, +0.04] vs official 4-bit; +0.07 [−0.93, +1.11] vs BF16. Native-resolution DocVQA: 90.0 at 4.10 GB peak vs 89.7 at 4.43 GB.",
    mixedLabel: "Mixed v8p8b4e4 (1.266 GB)",
    baseLabel: "Official 4-bit (1.591 GB)",
    blocks: [
      { label: "Vision Tower", bits: "8-bit", detail: "164M params" },
      { label: "Projector", bits: "8-bit", detail: "25M params" },
      { label: "Backbone", bits: "QAD 4-bit", detail: "1.47B · g32 exact" },
      { label: "Tied Embeddings", bits: "4-bit", detail: "262M · g64" },
    ],
    benchmarks: [
      { name: "DocVQA", mixed: 89.4, base: 89.7 },
      { name: "ChartQA", mixed: 81.7, base: 82.3 },
      { name: "OCRBench", mixed: 81.3, base: 82.0 },
      { name: "ScreenSpot-v2", mixed: 88.7, base: 89.3 },
      { name: "RefCOCO", mixed: 83.7, base: 84.7 },
    ],
    links: [
      {
        label: "Hugging Face Model Card",
        href: "https://huggingface.co/shubhambaid/LFM3-VL-2B-MLX-mixed-v8p8b4e4",
      },
    ],
  },
  lfm25: {
    title: "LFM2.5-VL-3B · Component Quantization Audit",
    meta: "August 2026 · M4 Pro 24 GB · 5 benchmarks × 300 examples · Audited 56 HF repos",
    summary:
      "Component-wise mixed-precision study testing whether non-uniform bit widths beat uniform 4-bit conversion. Audited actual parameter coverage and found only 67.2% of vision-tower parameters were quantizable because SigLIP2's 4304 intermediate dimension is incompatible with MLX group sizes 32/64/128 across 27 fc2 layers.",
    footprintMixed: "2.04 GB",
    footprintBase: "2.39 GB",
    footprintBf16: "—",
    footprintNote: "−14.4% smaller (5.19 vs 6.07 eff. bits/weight)",
    meanSummary: "81.3 / 81.0 / 81.5",
    deltaNote:
      "Scores sit within sampling uncertainty (±4.0–5.3 pts/benchmark). Also uncovered non-monotonic visual token scaling on ScreenSpot-v2: 53.0 @ 256 tokens → 79.0 @ 512 → 70.0 @ 1024.",
    mixedLabel: "Mixed v6p6b4e4 (2.04 GB)",
    baseLabel: "Stock MLX 4-bit (2.39 GB)",
    blocks: [
      { label: "Vision Tower", bits: "6-bit", detail: "67.2% eligible" },
      { label: "Projector", bits: "6-bit", detail: "High sensitivity" },
      { label: "Backbone", bits: "4-bit", detail: "Primary savings" },
      { label: "Embeddings", bits: "4-bit", detail: "2 excluded safely" },
    ],
    benchmarks: [
      { name: "5-Task Mean", mixed: 81.3, base: 81.0 },
      { name: "ScreenSpot (256t)", mixed: 53.0, base: 53.0 },
      { name: "ScreenSpot (512t)", mixed: 79.0, base: 79.0 },
      { name: "ScreenSpot (1024t)", mixed: 70.0, base: 70.0 },
    ],
    links: [
      { label: "GitHub Lab Repo", href: "https://github.com/shubhambaid/lfm2vl-lab" },
      {
        label: "Hugging Face Weights",
        href: "https://huggingface.co/shubhambaid/LFM2.5-VL-3B-MLX-mixed-v6p6b4e4",
      },
      {
        label: "Raw Results Dataset",
        href: "https://huggingface.co/datasets/shubhambaid/lfm2vl-lab-results",
      },
    ],
  },
};

const VERDICT_SPLITS: Record<
  VerdictSplitKey,
  { label: string; verdict: number; siglip: number; delta: string; note: string }
> = {
  seen_yn: {
    label: "Seen-class Yes/No",
    verdict: 95.5,
    siglip: 75.3,
    delta: "+20.2 pts",
    note: "Strong gain on binary visual verification questions over the frozen SigLIP2 zero-shot prior. Trained on ~23k images across CIFAR-100, Oxford-IIIT Pets, Flowers-102, DTD, and Food-101 with validation-fitted temperature calibration.",
  },
  unseen_yn: {
    label: "Unseen-class Yes/No",
    verdict: 94.1,
    siglip: 75.1,
    delta: "+19.0 pts",
    note: "Transfers cleanly to held-out object categories unseen during head training by combining the SigLIP2 zero-shot logit prior with a learned 6.24M-parameter correction.",
  },
  unseen_10: {
    label: "Unseen 10-Option Choice",
    verdict: 91.0,
    siglip: 93.8,
    delta: "−2.8 pts",
    note: "Honest regression: on unseen 10-way multiple-choice classification, the raw SigLIP2 zero-shot prior slightly beats the learned head. Reporting regressions is essential to calibrating when a learned head helps.",
  },
  eurosat: {
    label: "EuroSAT Out-of-Domain (10-Option)",
    verdict: 34.6,
    siglip: 42.4,
    delta: "−7.8 pts",
    note: "Domain shift limitation: satellite imagery sits far outside the natural-image training distribution, and explicit OTHER abstention does not reliably transfer across domain boundaries.",
  },
};

interface SimActor {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  type: "vehicle" | "person" | "train";
  label: string;
}

export const InteractiveSystemsLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LabTab>("blue");
  const [blueMode, setBlueMode] = useState<BlueMode>("split");
  const [blueScene, setBlueScene] = useState<BlueScene>("warehouse");
  const [threshold, setThreshold] = useState<number>(50);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [splitRatio, setSplitRatio] = useState<number>(0.52);

  const [quantModel, setQuantModel] = useState<QuantModelKey>("lfm3");
  const [verdictSplit, setVerdictSplit] = useState<VerdictSplitKey>("seen_yn");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef<boolean>(false);
  const actorsRef = useRef<SimActor[]>([]);
  const timeRef = useRef<number>(0);

  // Initialize scene actors whenever scene preset switches
  useEffect(() => {
    if (blueScene === "warehouse") {
      actorsRef.current = [
        { x: 130, y: 232, w: 96, h: 46, vx: 1.35, vy: 0.08, type: "vehicle", label: "Forklift 01" },
        { x: 520, y: 192, w: 30, h: 64, vx: -0.78, vy: 0.14, type: "person", label: "Operator A" },
        { x: 310, y: 294, w: 34, h: 72, vx: 0.55, vy: -0.09, type: "person", label: "Operator B" },
      ];
    } else {
      actorsRef.current = [
        { x: 90, y: 150, w: 220, h: 66, vx: 1.9, vy: 0, type: "train", label: "Metro Car 04" },
        { x: 460, y: 274, w: 32, h: 68, vx: -0.62, vy: 0.05, type: "person", label: "Passenger A" },
        { x: 210, y: 295, w: 32, h: 68, vx: 0.48, vy: -0.04, type: "person", label: "Passenger B" },
      ];
    }
  }, [blueScene]);

  // Derived foreground coverage & bitrate savings grounded in VIRAT CRF 28 + production operating range
  const maskPad = Math.max(5, Math.round((100 - threshold) * 0.34));
  const totalCanvasArea = 720 * 450;
  const approxFgArea =
    blueScene === "warehouse"
      ? (96 + maskPad * 2) * (46 + maskPad * 2) +
        (30 + maskPad * 2) * (64 + maskPad * 2) +
        (34 + maskPad * 2) * (72 + maskPad * 2)
      : (220 + maskPad * 2) * (66 + maskPad * 2) +
        (32 + maskPad * 2) * (68 + maskPad * 2) * 2;
  const activeFgPct = Math.min(48, Math.max(7.2, (approxFgArea / totalCanvasArea) * 100));
  const estBitrateCut = Math.min(64.5, Math.max(21.0, 56 - activeFgPct * 0.72));

  useEffect(() => {
    if (activeTab !== "blue") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rafId = 0;

    const drawCornerLabel = (x: number, y: number, text: string) => {
      ctx.font = "500 11px 'IBM Plex Mono', monospace";
      const m = ctx.measureText(text);
      ctx.fillStyle = "rgba(8, 9, 11, 0.82)";
      ctx.fillRect(x - 4, y - 13, m.width + 16, 20);
      ctx.fillStyle = "#E2E8F0";
      ctx.fillText(text, x + 4, y + 1);
    };

    const drawBackground = (w: number, h: number, addNoise: boolean) => {
      ctx.fillStyle = "#0B0E14";
      ctx.fillRect(0, 0, w, h);

      // Perspective industrial / platform grid
      ctx.strokeStyle = addNoise ? "rgba(148, 163, 184, 0.14)" : "rgba(148, 163, 184, 0.08)";
      ctx.lineWidth = 1;
      for (let x = -120; x <= w + 120; x += 72) {
        ctx.beginPath();
        ctx.moveTo(w * 0.5 + (x - w * 0.5) * 0.35, 130);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 130; y <= h; y += 44) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      if (blueScene === "warehouse") {
        ctx.fillStyle = "#121722";
        ctx.fillRect(0, 0, w, 130);
        for (let rx = 28; rx < w - 40; rx += 112) {
          ctx.fillStyle = "#182030";
          ctx.fillRect(rx, 24, 88, 92);
          ctx.strokeStyle = "#263147";
          ctx.strokeRect(rx, 24, 88, 92);
          ctx.fillStyle = "#1F293D";
          ctx.fillRect(rx + 8, 42, 30, 22);
          ctx.fillRect(rx + 46, 42, 32, 22);
          ctx.fillRect(rx + 8, 76, 36, 26);
          ctx.fillRect(rx + 50, 76, 28, 26);
        }
      } else {
        // Metro platform backdrop & yellow tactile line
        ctx.fillStyle = "#111622";
        ctx.fillRect(0, 0, w, 225);
        ctx.fillStyle = "#182030";
        ctx.fillRect(0, 128, w, 8);
        ctx.fillStyle = "rgba(234, 179, 8, 0.55)";
        ctx.fillRect(0, 232, w, 6);
      }

      if (addNoise) {
        const cols = 36;
        const rows = 22;
        const cw = w / cols;
        const ch = h / rows;
        const tStep = Math.floor(timeRef.current * 8);
        for (let r = 0; r < rows; r++) {
          for (let col = 0; col < cols; col++) {
            const seed = Math.sin(col * 12.9898 + r * 78.233 + tStep * 1.37) * 43758.5453;
            const frac = seed - Math.floor(seed);
            if (frac > 0.72) {
              const alpha = (frac - 0.72) * 0.34;
              ctx.fillStyle = `rgba(148, 163, 184, ${alpha.toFixed(3)})`;
              ctx.fillRect(col * cw, r * ch, cw - 1, ch - 1);
            }
          }
        }
      } else {
        // BLUE stale-pixel frozen macroblock grid
        ctx.strokeStyle = "rgba(59, 130, 246, 0.09)";
        ctx.lineWidth = 0.75;
        for (let x = 0; x < w; x += 36) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 0; y < h; y += 36) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
      }
    };

    const drawActors = (showMaskOverlay: boolean) => {
      const pad = Math.max(6, Math.round((100 - threshold) * 0.34));
      actorsRef.current.forEach((a) => {
        if (showMaskOverlay) {
          ctx.fillStyle = "rgba(59, 130, 246, 0.16)";
          ctx.fillRect(a.x - pad, a.y - pad, a.w + pad * 2, a.h + pad * 2);
          ctx.strokeStyle = "#3B82F6";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(a.x - pad, a.y - pad, a.w + pad * 2, a.h + pad * 2);

          // Optical flow motion vector
          const cx = a.x + a.w / 2;
          const cy = a.y + a.h / 2;
          ctx.strokeStyle = "#60A5FA";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + a.vx * 24, cy + a.vy * 24);
          ctx.stroke();
        }

        if (a.type === "vehicle") {
          ctx.fillStyle = "#EAB308";
          ctx.fillRect(a.x, a.y + 10, a.w - 22, a.h - 16);
          ctx.fillStyle = "#1E293B";
          ctx.fillRect(a.x + 12, a.y + 2, 34, 18);
          ctx.fillStyle = "#CBD5E1";
          ctx.fillRect(a.x + a.w - 22, a.y + 4, 4, a.h - 6);
          ctx.fillRect(a.x + a.w - 18, a.y + a.h - 10, 18, 4);
          ctx.fillStyle = "#0F172A";
          ctx.beginPath();
          ctx.arc(a.x + 16, a.y + a.h - 4, 7, 0, Math.PI * 2);
          ctx.arc(a.x + a.w - 32, a.y + a.h - 4, 7, 0, Math.PI * 2);
          ctx.fill();
        } else if (a.type === "train") {
          ctx.fillStyle = "#CBD5E1";
          ctx.fillRect(a.x, a.y, a.w, a.h);
          ctx.fillStyle = "#2563EB";
          ctx.fillRect(a.x, a.y + a.h - 14, a.w, 6);
          ctx.fillStyle = "#0F172A";
          for (let wx = a.x + 16; wx < a.x + a.w - 26; wx += 44) {
            ctx.fillRect(wx, a.y + 12, 30, 22);
          }
        } else {
          ctx.fillStyle = "#F8FAFC";
          ctx.beginPath();
          ctx.arc(a.x + a.w / 2, a.y + 10, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#38BDF8";
          ctx.fillRect(a.x + 6, a.y + 19, a.w - 12, 24);
          ctx.fillStyle = "#94A3B8";
          ctx.fillRect(a.x + 8, a.y + 43, 6, 22);
          ctx.fillRect(a.x + a.w - 14, a.y + 43, 6, 22);
        }

        if (showMaskOverlay) {
          ctx.font = "500 11px 'IBM Plex Mono', monospace";
          ctx.fillStyle = "#93C5FD";
          ctx.fillText(a.label + " · live fg", a.x - pad, a.y - pad - 6);
        }
      });
    };

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      if (blueMode === "raw") {
        drawBackground(w, h, true);
        drawActors(false);
        drawCornerLabel(14, 24, "Raw H.265 input · sensor noise consumes inter-frame bits");
        return;
      }

      if (blueMode === "mask") {
        ctx.fillStyle = "#06080C";
        ctx.fillRect(0, 0, w, h);
        drawBackground(w, h, false);
        ctx.fillStyle = "rgba(6, 8, 12, 0.74)";
        ctx.fillRect(0, 0, w, h);
        drawActors(true);
        drawCornerLabel(14, 24, "DIS optical-flow foreground mask · stale seed covers background");
        return;
      }

      const splitX = Math.round(w * splitRatio);

      // Left: Raw H.265
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, splitX, h);
      ctx.clip();
      drawBackground(w, h, true);
      drawActors(false);
      ctx.restore();

      // Right: BLUE Compositor
      ctx.save();
      ctx.beginPath();
      ctx.rect(splitX, 0, w - splitX, h);
      ctx.clip();
      drawBackground(w, h, false);
      drawActors(true);
      ctx.restore();

      // Curtain line + drag puck
      ctx.strokeStyle = "#F4F5F7";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(splitX, 0);
      ctx.lineTo(splitX, h);
      ctx.stroke();

      ctx.fillStyle = "#08090B";
      ctx.strokeStyle = "#F4F5F7";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(splitX, h / 2, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#F4F5F7";
      ctx.font = "600 12px 'IBM Plex Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("<>", splitX, h / 2 + 0.5);
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";

      drawCornerLabel(14, 24, "Standard H.265 (raw noise)");
      drawCornerLabel(Math.min(w - 235, Math.max(splitX + 14, 230)), 24, "BLUE compositor (stale bg)");
    };

    const tick = () => {
      if (isPlaying && !prefersReducedMotion) {
        timeRef.current += 0.032;
        const w = canvas.width;
        const h = canvas.height;
        actorsRef.current.forEach((a) => {
          a.x += a.vx;
          a.y += a.vy;
          if (a.type === "train") {
            if (a.x > w + 40) a.x = -a.w - 30;
          } else {
            if (a.x < 24 || a.x + a.w > w - 24) a.vx *= -1;
            const minY = blueScene === "metro" ? 248 : 142;
            if (a.y < minY || a.y + a.h > h - 22) a.vy *= -1;
          }
        });
      }
      render();
      if (isPlaying && !prefersReducedMotion) {
        rafId = requestAnimationFrame(tick);
      }
    };

    tick();
    return () => cancelAnimationFrame(rafId);
  }, [activeTab, blueMode, blueScene, threshold, isPlaying, splitRatio]);

  const updateSplit = (clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rel = (clientX - rect.left) / rect.width;
    setSplitRatio(Math.max(0.14, Math.min(0.86, rel)));
  };

  const currentQuant = QUANT_DATA[quantModel];
  const currentVerdict = VERDICT_SPLITS[verdictSplit];

  return (
    <section
      id="lab"
      className="py-16 md:py-24 border-b border-[#E2E6EE] dark:border-[#222631] bg-[#F1F3F7] dark:bg-[#0E1015]"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-mono-tabular text-[13px] text-blue-600 dark:text-blue-400 mb-2">
              01. Interactive Systems Lab
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.45rem)] font-bold tracking-[-0.028em] leading-[1.15] text-balance-safe text-[#0D1017] dark:text-[#F4F5F7]">
              Inspect the mechanics behind the benchmarks
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Interactive research labs"
            className="inline-flex items-center gap-1 p-1 rounded-[10px] bg-white dark:bg-[#12151C] border border-[#E2E6EE] dark:border-[#222631] max-w-full overflow-x-auto"
          >
            {(
              [
                { id: "blue", label: "BLUE Compositor" },
                { id: "quant", label: "Mixed-Precision MLX" },
                { id: "verdict", label: "Verdict Single-Pass" },
              ] as const
            ).map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-h-[38px] px-4 py-1.5 rounded-[7px] text-[13.5px] font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    active
                      ? "bg-[#0D1017] text-white dark:bg-[#F4F5F7] dark:text-[#08090B]"
                      : "text-[#434B5C] dark:text-[#A2AAB8] hover:text-[#0D1017] dark:hover:text-[#F4F5F7]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-white dark:bg-[#12151C] border border-[#E2E6EE] dark:border-[#222631] overflow-hidden">
          {/* TAB 1: BLUE COMPOSITOR */}
          {activeTab === "blue" && (
            <div role="tabpanel" className="p-5 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.9fr] gap-8 items-start">
                <div>
                  <div
                    ref={stageRef}
                    onPointerDown={(e) => {
                      if (blueMode !== "split") return;
                      draggingRef.current = true;
                      e.currentTarget.setPointerCapture(e.pointerId);
                      updateSplit(e.clientX);
                    }}
                    onPointerMove={(e) => {
                      if (!draggingRef.current || blueMode !== "split") return;
                      updateSplit(e.clientX);
                    }}
                    onPointerUp={() => {
                      draggingRef.current = false;
                    }}
                    className={`relative rounded-[10px] overflow-hidden border border-[#222631] bg-[#06080C] aspect-[16/10] touch-pan-y ${
                      blueMode === "split" ? "cursor-ew-resize" : "cursor-default"
                    }`}
                    title="Drag horizontally to compare raw H.265 vs BLUE stale-pixel compositor"
                  >
                    <canvas ref={canvasRef} width={720} height={450} className="w-full h-full block" />
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {(
                        [
                          { id: "split", label: "Split Curtain" },
                          { id: "mask", label: "Optical-Flow Mask" },
                          { id: "raw", label: "Raw Input" },
                        ] as const
                      ).map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setBlueMode(m.id)}
                          className={`min-h-[36px] px-3 py-1.5 rounded-md text-[13px] font-medium whitespace-nowrap shrink-0 border transition-colors ${
                            blueMode === m.id
                              ? "bg-blue-600/10 border-blue-600 text-blue-700 dark:text-blue-300 dark:border-blue-500"
                              : "border-[#E2E6EE] dark:border-[#222631] text-[#434B5C] dark:text-[#A2AAB8] hover:text-[#0D1017] dark:hover:text-[#F4F5F7]"
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}

                      <button
                        type="button"
                        onClick={() =>
                          setBlueScene((s) => (s === "warehouse" ? "metro" : "warehouse"))
                        }
                        className="min-h-[36px] px-3 py-1.5 rounded-md text-[13px] font-medium whitespace-nowrap shrink-0 border border-[#E2E6EE] dark:border-[#222631] text-[#434B5C] dark:text-[#A2AAB8] hover:text-[#0D1017] dark:hover:text-[#F4F5F7] transition-colors"
                      >
                        Scene: {blueScene === "warehouse" ? "Warehouse" : "Metro"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsPlaying((p) => !p)}
                        aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
                        className="min-h-[36px] px-2.5 py-1.5 rounded-md border border-[#E2E6EE] dark:border-[#222631] text-[#434B5C] dark:text-[#A2AAB8] hover:text-[#0D1017] dark:hover:text-[#F4F5F7] inline-flex items-center justify-center transition-colors"
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <label className="flex items-center gap-2.5 text-[13px] text-[#434B5C] dark:text-[#A2AAB8]">
                      <span>Motion threshold</span>
                      <input
                        type="range"
                        min={15}
                        max={85}
                        value={threshold}
                        onChange={(e) => setThreshold(Number(e.target.value))}
                        className="w-28 accent-blue-600 cursor-pointer"
                      />
                      <span className="font-mono-tabular text-[12px] text-[#0D1017] dark:text-[#F4F5F7] w-16 text-right">
                        {threshold} mag
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <p className="font-mono-tabular text-[12.5px] text-[#667085] dark:text-[#6F7787] mb-2">
                    BLUE-COMP · Pre-encode compositor · arXiv:2606.28753 &amp; 2607.19515
                  </p>
                  <h3 className="font-display text-[1.4rem] font-bold tracking-[-0.02em] text-[#0D1017] dark:text-[#F4F5F7] mb-3">
                    Stop spending H.265 bits on static sensor noise
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8] mb-5">
                    BLUE is a pre-encode stale-pixel optical-flow compositor—not a replacement codec
                    and not a learned neural video codec. It holds a persistent background seed frame
                    while preserving live foreground motion masks via DIS optical flow or NVIDIA nvof,
                    making standard H.264/H.265 encoders far more entropy-efficient.
                  </p>

                  <table className="w-full border-collapse text-[13.5px] mb-4">
                    <thead>
                      <tr className="border-b border-[#E2E6EE] dark:border-[#222631] text-[#667085] dark:text-[#6F7787] text-[12px]">
                        <th className="py-2 text-left font-semibold">Signal / Published Benchmark</th>
                        <th className="py-2 text-right font-semibold">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E6EE] dark:divide-[#222631]">
                      <tr>
                        <td className="py-2.5 text-[#434B5C] dark:text-[#A2AAB8]">
                          Simulated active foreground area
                        </td>
                        <td className="py-2.5 text-right font-mono-tabular font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                          {activeFgPct.toFixed(1)}%
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-[#434B5C] dark:text-[#A2AAB8]">
                          Simulated bitrate reduction
                        </td>
                        <td className="py-2.5 text-right font-mono-tabular font-semibold text-blue-600 dark:text-blue-400">
                          −{estBitrateCut.toFixed(1)}%
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-[#434B5C] dark:text-[#A2AAB8]">
                          VIRAT 308 clips (CRF 28, x265 / x264)
                        </td>
                        <td className="py-2.5 text-right font-mono-tabular font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                          39.4% / 34.6%
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-[#434B5C] dark:text-[#A2AAB8]">
                          Blind VLM judge delta (VIRAT 0–10)
                        </td>
                        <td className="py-2.5 text-right font-mono-tabular font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                          −0.01
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-[#434B5C] dark:text-[#A2AAB8]">
                          CHAD anomaly VLM score (Raw vs BLUE)
                        </td>
                        <td className="py-2.5 text-right font-mono-tabular font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                          4.31 vs 4.26
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <p className="text-[13px] text-[#667085] dark:text-[#6F7787] leading-relaxed mb-4">
                    Drag the split curtain across the frame to inspect raw sensor noise against frozen
                    stale-pixel macroblocks. Patent application filed (pending).
                  </p>

                  <div className="flex flex-wrap gap-5 text-[14px] font-semibold text-blue-600 dark:text-blue-400">
                    <a
                      href="https://arxiv.org/abs/2606.28753"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline underline-offset-4"
                    >
                      Read Encoding Paper &rarr;
                    </a>
                    <a
                      href="https://arxiv.org/abs/2607.19515"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline underline-offset-4"
                    >
                      Read VLM Semantics Paper &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MIXED-PRECISION QUANTIZATION */}
          {activeTab === "quant" && (
            <div role="tabpanel" className="p-5 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-[#E2E6EE] dark:border-[#222631]">
                <div>
                  <p className="font-mono-tabular text-[12.5px] text-[#667085] dark:text-[#6F7787] mb-1">
                    {currentQuant.meta}
                  </p>
                  <h3 className="font-display text-[1.4rem] font-bold tracking-[-0.02em] text-[#0D1017] dark:text-[#F4F5F7]">
                    {currentQuant.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { id: "lfm3", label: "LFM3-VL-2B (Nov 2026)" },
                      { id: "lfm25", label: "LFM2.5-VL-3B (Aug 2026)" },
                    ] as const
                  ).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setQuantModel(m.id)}
                      className={`min-h-[36px] px-3.5 py-1.5 rounded-md text-[13px] font-medium whitespace-nowrap shrink-0 border transition-colors ${
                        quantModel === m.id
                          ? "bg-blue-600/10 border-blue-600 text-blue-700 dark:text-blue-300 dark:border-blue-500"
                          : "border-[#E2E6EE] dark:border-[#222631] text-[#434B5C] dark:text-[#A2AAB8] hover:text-[#0D1017] dark:hover:text-[#F4F5F7]"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
                {currentQuant.blocks.map((b) => (
                  <div
                    key={b.label}
                    className="p-4 rounded-md bg-[#F8F9FB] dark:bg-[#0E1015] border border-[#E2E6EE] dark:border-[#222631]"
                  >
                    <div className="text-[12.5px] text-[#667085] dark:text-[#6F7787] mb-1">
                      {b.label}
                    </div>
                    <div className="font-display text-[1.25rem] font-bold text-[#0D1017] dark:text-[#F4F5F7] tabular-nums">
                      {b.bits}
                    </div>
                    <div className="font-mono-tabular text-[12px] text-[#434B5C] dark:text-[#A2AAB8] mt-1">
                      {b.detail}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.95fr] gap-8 items-start">
                <div>
                  <div className="space-y-4">
                    {currentQuant.benchmarks.map((bm) => (
                      <div
                        key={bm.name}
                        className="grid grid-cols-[108px_1fr_112px] items-center gap-3.5"
                      >
                        <div className="text-[13.5px] font-medium text-[#434B5C] dark:text-[#A2AAB8]">
                          {bm.name}
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-2 rounded bg-[#F1F3F7] dark:bg-[#0E1015] border border-[#E2E6EE] dark:border-[#222631] overflow-hidden">
                            <div
                              className="h-full bg-blue-600 dark:bg-blue-500 rounded transition-[width] duration-300"
                              style={{ width: `${bm.mixed}%` }}
                            />
                          </div>
                          <div className="h-2 rounded bg-[#F1F3F7] dark:bg-[#0E1015] border border-[#E2E6EE] dark:border-[#222631] overflow-hidden">
                            <div
                              className="h-full bg-[#667085]/55 dark:bg-[#6F7787]/60 rounded transition-[width] duration-300"
                              style={{ width: `${bm.base}%` }}
                            />
                          </div>
                        </div>
                        <div className="font-mono-tabular text-[12.5px] text-right text-[#434B5C] dark:text-[#A2AAB8]">
                          <strong className="text-[#0D1017] dark:text-[#F4F5F7]">
                            {bm.mixed.toFixed(1)}
                          </strong>{" "}
                          / {bm.base.toFixed(1)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-5 text-[12.5px] text-[#667085] dark:text-[#6F7787]">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-3 h-1.5 rounded-sm bg-blue-600 dark:bg-blue-500" />
                      {currentQuant.mixedLabel}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="w-3 h-1.5 rounded-sm bg-[#667085]/55 dark:bg-[#6F7787]/60" />
                      {currentQuant.baseLabel}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-[15px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8] mb-5">
                    {currentQuant.summary}
                  </p>

                  <table className="w-full border-collapse text-[13.5px] mb-4">
                    <thead>
                      <tr className="border-b border-[#E2E6EE] dark:border-[#222631] text-[#667085] dark:text-[#6F7787] text-[12px]">
                        <th className="py-2 text-left font-semibold">Measurement</th>
                        <th className="py-2 text-right font-semibold">Observed</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E6EE] dark:divide-[#222631]">
                      <tr>
                        <td className="py-2.5 text-[#434B5C] dark:text-[#A2AAB8]">
                          Mixed-precision artifact
                        </td>
                        <td className="py-2.5 text-right font-mono-tabular font-semibold text-blue-600 dark:text-blue-400">
                          {currentQuant.footprintMixed}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-[#434B5C] dark:text-[#A2AAB8]">
                          Official / Stock 4-bit
                        </td>
                        <td className="py-2.5 text-right font-mono-tabular font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                          {currentQuant.footprintBase}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-[#434B5C] dark:text-[#A2AAB8]">
                          Footprint reduction
                        </td>
                        <td className="py-2.5 text-right font-mono-tabular font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                          {currentQuant.footprintNote}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-[#434B5C] dark:text-[#A2AAB8]">
                          Mean (Mixed / Base / BF16)
                        </td>
                        <td className="py-2.5 text-right font-mono-tabular font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                          {currentQuant.meanSummary}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <p className="text-[13px] text-[#667085] dark:text-[#6F7787] leading-relaxed mb-4">
                    {currentQuant.deltaNote}
                  </p>

                  <div className="flex flex-wrap gap-5 text-[14px] font-semibold text-blue-600 dark:text-blue-400">
                    {currentQuant.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline underline-offset-4"
                      >
                        {l.label} &rarr;
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VERDICT V1 SINGLE-PASS DECISIONS */}
          {activeTab === "verdict" && (
            <div role="tabpanel" className="p-5 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.95fr] gap-8 items-start">
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {[
                      {
                        step: "Stage 01",
                        title: "Frozen SigLIP2 Encoder",
                        sub: "Pooled image + 49 spatial patch tokens (7×7) + zero-shot logit prior",
                      },
                      {
                        step: "Stage 02",
                        title: "6.24M Decision Head",
                        sub: "3-layer transformer with order-invariant option tokens & explicit OTHER",
                      },
                      {
                        step: "Stage 03",
                        title: "Single Forward Pass",
                        sub: "Temperature-calibrated probabilities without autoregressive token decoding",
                      },
                    ].map((node) => (
                      <div
                        key={node.step}
                        className="p-4 rounded-md bg-[#F8F9FB] dark:bg-[#0E1015] border border-[#E2E6EE] dark:border-[#222631]"
                      >
                        <div className="font-mono-tabular text-[12px] text-blue-600 dark:text-blue-400 mb-1">
                          {node.step}
                        </div>
                        <div className="font-semibold text-[14px] text-[#0D1017] dark:text-[#F4F5F7] mb-1">
                          {node.title}
                        </div>
                        <div className="text-[12.5px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8]">
                          {node.sub}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {(
                      [
                        { id: "seen_yn", label: "Seen Yes/No" },
                        { id: "unseen_yn", label: "Unseen Yes/No" },
                        { id: "unseen_10", label: "Unseen 10-Way" },
                        { id: "eurosat", label: "EuroSAT OOD" },
                      ] as const
                    ).map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setVerdictSplit(s.id)}
                        className={`min-h-[36px] px-3.5 py-1.5 rounded-md text-[13px] font-medium whitespace-nowrap shrink-0 border transition-colors ${
                          verdictSplit === s.id
                            ? "bg-blue-600/10 border-blue-600 text-blue-700 dark:text-blue-300 dark:border-blue-500"
                            : "border-[#E2E6EE] dark:border-[#222631] text-[#434B5C] dark:text-[#A2AAB8] hover:text-[#0D1017] dark:hover:text-[#F4F5F7]"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-[110px_1fr_118px] items-center gap-3.5">
                      <div className="text-[13.5px] font-medium text-[#434B5C] dark:text-[#A2AAB8]">
                        Verdict v1
                      </div>
                      <div className="h-2.5 rounded bg-[#F1F3F7] dark:bg-[#0E1015] border border-[#E2E6EE] dark:border-[#222631] overflow-hidden">
                        <div
                          className="h-full bg-blue-600 dark:bg-blue-500 rounded transition-[width] duration-300"
                          style={{ width: `${currentVerdict.verdict}%` }}
                        />
                      </div>
                      <div className="font-mono-tabular text-[13px] font-semibold text-right text-[#0D1017] dark:text-[#F4F5F7]">
                        {currentVerdict.verdict.toFixed(1)}%
                      </div>
                    </div>

                    <div className="grid grid-cols-[110px_1fr_118px] items-center gap-3.5">
                      <div className="text-[13.5px] font-medium text-[#434B5C] dark:text-[#A2AAB8]">
                        SigLIP2 0-shot
                      </div>
                      <div className="h-2.5 rounded bg-[#F1F3F7] dark:bg-[#0E1015] border border-[#E2E6EE] dark:border-[#222631] overflow-hidden">
                        <div
                          className="h-full bg-[#667085]/55 dark:bg-[#6F7787]/60 rounded transition-[width] duration-300"
                          style={{ width: `${currentVerdict.siglip}%` }}
                        />
                      </div>
                      <div className="font-mono-tabular text-[12.5px] text-right text-[#434B5C] dark:text-[#A2AAB8]">
                        {currentVerdict.siglip.toFixed(1)}% ({currentVerdict.delta})
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 p-4 rounded-md bg-[#F8F9FB] dark:bg-[#0E1015] border border-[#E2E6EE] dark:border-[#222631] text-[13.5px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8]">
                    <strong className="text-[#0D1017] dark:text-[#F4F5F7]">
                      {currentVerdict.label}:
                    </strong>{" "}
                    {currentVerdict.note}
                  </div>
                </div>

                <div>
                  <p className="font-mono-tabular text-[12.5px] text-[#667085] dark:text-[#6F7787] mb-2">
                    VERDICT v1 · Public Experimental Model · Sep 2026
                  </p>
                  <h3 className="font-display text-[1.4rem] font-bold tracking-[-0.02em] text-[#0D1017] dark:text-[#F4F5F7] mb-3">
                    Calibrated decisions without generating prose
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8] mb-5">
                    When an application needs a yes/no judgment or a calibrated probability over
                    candidate labels, autoregressive text generation burns latency on punctuation
                    and schema boilerplate. Verdict learns a lightweight correction over a frozen
                    SigLIP2 prior and explicitly publishes both its wins and out-of-domain regressions.
                  </p>

                  <table className="w-full border-collapse text-[13.5px] mb-5">
                    <thead>
                      <tr className="border-b border-[#E2E6EE] dark:border-[#222631] text-[#667085] dark:text-[#6F7787] text-[12px]">
                        <th className="py-2 text-left font-semibold">Architecture Spec</th>
                        <th className="py-2 text-right font-semibold">Detail</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E6EE] dark:divide-[#222631]">
                      <tr>
                        <td className="py-2.5 text-[#434B5C] dark:text-[#A2AAB8]">Backbone (frozen)</td>
                        <td className="py-2.5 text-right font-mono-tabular font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                          siglip2-base-patch16-224
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-[#434B5C] dark:text-[#A2AAB8]">
                          Trainable decision head
                        </td>
                        <td className="py-2.5 text-right font-mono-tabular font-semibold text-blue-600 dark:text-blue-400">
                          ~6.24M params
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-[#434B5C] dark:text-[#A2AAB8]">Training set</td>
                        <td className="py-2.5 text-right font-mono-tabular font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                          ~23k images (5 datasets)
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-[#434B5C] dark:text-[#A2AAB8]">Calibration</td>
                        <td className="py-2.5 text-right font-mono-tabular font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                          Temp-scaled + OTHER token
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <a
                    href="https://huggingface.co/shubhambaid/verdict"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[14px] font-semibold text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
                  >
                    Inspect Model Card on Hugging Face &rarr;
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
