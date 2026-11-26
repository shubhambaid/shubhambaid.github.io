/* ==========================================================================
   SHUBHAM BAID — Interactive Systems Lab, Case Study Modal & Site Controls
   ========================================================================== */

(function () {
    "use strict";

    // ----------------------------------------------------------------------
    // 1. THEME MANAGEMENT (Dark Default, Full Light Paper Mode)
    // ----------------------------------------------------------------------
    const themeBtns = document.querySelectorAll("[data-theme-toggle]");

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        try {
            localStorage.setItem("sb-theme", theme);
        } catch (_) {
            // Storage may be unavailable in restricted contexts
        }
        themeBtns.forEach((btn) => {
            const label = btn.querySelector("[data-theme-label]");
            const nextLabel = theme === "dark" ? "Light mode" : "Dark mode";
            btn.setAttribute("aria-label", "Switch to " + nextLabel.toLowerCase());
            if (label) label.textContent = nextLabel;
        });
    }

    let savedTheme = "dark";
    try {
        savedTheme = localStorage.getItem("sb-theme") || "dark";
    } catch (_) {
        savedTheme = "dark";
    }
    applyTheme(savedTheme);

    themeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("data-theme") || "dark";
            applyTheme(current === "dark" ? "light" : "dark");
        });
    });

    // ----------------------------------------------------------------------
    // 2. MOBILE NAVIGATION DRAWER
    // ----------------------------------------------------------------------
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileDrawer = document.getElementById("mobile-drawer");

    if (menuBtn && mobileDrawer) {
        menuBtn.addEventListener("click", () => {
            const isOpen = mobileDrawer.classList.toggle("open");
            menuBtn.setAttribute("aria-expanded", String(isOpen));
        });
        mobileDrawer.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mobileDrawer.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

    // ----------------------------------------------------------------------
    // 3. COPY EMAIL BUTTON
    // ----------------------------------------------------------------------
    const copyEmailBtn = document.getElementById("copy-email-btn");
    if (copyEmailBtn) {
        const defaultLabel = copyEmailBtn.textContent;
        copyEmailBtn.addEventListener("click", () => {
            const email = "shubhambaid99@gmail.com";
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(() => {
                    copyEmailBtn.textContent = "Copied email address";
                    setTimeout(() => {
                        copyEmailBtn.textContent = defaultLabel;
                    }, 2200);
                });
            } else {
                const ta = document.createElement("textarea");
                ta.value = email;
                ta.style.position = "fixed";
                ta.style.opacity = "0";
                document.body.appendChild(ta);
                ta.select();
                document.execCommand("copy");
                document.body.removeChild(ta);
                copyEmailBtn.textContent = "Copied email address";
                setTimeout(() => {
                    copyEmailBtn.textContent = defaultLabel;
                }, 2200);
            }
        });
    }

    // ----------------------------------------------------------------------
    // 4. INTERACTIVE SYSTEMS LAB TABS
    // ----------------------------------------------------------------------
    const labTabs = document.querySelectorAll("[data-lab-tab]");
    const labPanels = document.querySelectorAll("[data-lab-panel]");

    if (labTabs.length && labPanels.length) {
        labTabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                const target = tab.getAttribute("data-lab-tab");
                labTabs.forEach((t) => {
                    const active = t === tab;
                    t.classList.toggle("active", active);
                    t.setAttribute("aria-selected", String(active));
                });
                labPanels.forEach((p) => {
                    p.classList.toggle("active", p.getAttribute("data-lab-panel") === target);
                });
            });
        });
    }

    // ----------------------------------------------------------------------
    // 5. LAB TAB 1: BLUE STALE-PIXEL OPTICAL-FLOW COMPOSITOR SIMULATOR
    // ----------------------------------------------------------------------
    const blueCanvas = document.getElementById("blue-compositor-canvas");
    const splitWrap = document.getElementById("blue-stage-wrap");
    const thresholdSlider = document.getElementById("blue-threshold-slider");
    const thresholdValEl = document.getElementById("blue-threshold-val");
    const activePixelsEl = document.getElementById("blue-active-pixels");
    const savedBitrateEl = document.getElementById("blue-est-savings");
    const modeBtns = document.querySelectorAll("[data-blue-mode]");

    if (blueCanvas && splitWrap) {
        const ctx = blueCanvas.getContext("2d");
        const prefersReducedMotion =
            window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let splitRatio = 0.52;
        let isDragging = false;
        let viewMode = "split"; // 'split' | 'mask' | 'raw'
        let threshold = 50; // 15..85
        let time = 0;

        // Deterministic fixed-camera warehouse / yard scene objects
        const actors = [
            { x: 140, y: 235, w: 96, h: 46, vx: 1.35, vy: 0.08, type: "vehicle", label: "Forklift 01" },
            { x: 520, y: 195, w: 30, h: 64, vx: -0.78, vy: 0.14, type: "person", label: "Operator A" },
            { x: 310, y: 292, w: 34, h: 72, vx: 0.55, vy: -0.09, type: "person", label: "Operator B" }
        ];

        function updateMetrics() {
            // Compute foreground ratio from actor areas + motion threshold sensitivity
            const maskPad = Math.max(4, Math.round((100 - threshold) * 0.34));
            const totalArea = 720 * 450;
            let fgArea = 0;
            actors.forEach((a) => {
                fgArea += (a.w + maskPad * 2) * (a.h + maskPad * 2);
            });
            const fgPct = Math.min(48, Math.max(7.2, (fgArea / totalArea) * 100));
            // Map to realistic BLUE compression operating range (grounded in VIRAT 39.4% mean / 40-69% field range)
            const estCut = Math.min(64.5, Math.max(21.0, 56 - fgPct * 0.72));
            if (activePixelsEl) activePixelsEl.textContent = fgPct.toFixed(1) + "%";
            if (savedBitrateEl) savedBitrateEl.textContent = "−" + estCut.toFixed(1) + "%";
            if (thresholdValEl) thresholdValEl.textContent = threshold + " px/mag";
        }

        function drawWarehouseBackground(c, w, h, addSensorNoise) {
            // Static fixed-camera industrial bay geometry
            c.fillStyle = "#0b0e14";
            c.fillRect(0, 0, w, h);

            // Perspective floor grid
            c.strokeStyle = addSensorNoise ? "rgba(148, 163, 184, 0.14)" : "rgba(148, 163, 184, 0.08)";
            c.lineWidth = 1;
            for (let x = -120; x <= w + 120; x += 72) {
                c.beginPath();
                c.moveTo(w * 0.5 + (x - w * 0.5) * 0.35, 130);
                c.lineTo(x, h);
                c.stroke();
            }
            for (let y = 130; y <= h; y += 44) {
                c.beginPath();
                c.moveTo(0, y);
                c.lineTo(w, y);
                c.stroke();
            }

            // Static racking silhouettes (top half)
            c.fillStyle = "#121722";
            c.fillRect(0, 0, w, 130);
            for (let rx = 28; rx < w - 40; rx += 112) {
                c.fillStyle = "#182030";
                c.fillRect(rx, 24, 88, 92);
                c.strokeStyle = "#263147";
                c.strokeRect(rx, 24, 88, 92);
                // Pallet shelves
                c.fillStyle = "#1f293d";
                c.fillRect(rx + 8, 42, 30, 22);
                c.fillRect(rx + 46, 42, 32, 22);
                c.fillRect(rx + 8, 76, 36, 26);
                c.fillRect(rx + 50, 76, 28, 26);
            }

            // Raw camera sensor grain & illumination flicker (temporal entropy wasted in standard encoders)
            if (addSensorNoise) {
                const cols = 36;
                const rows = 22;
                const cw = w / cols;
                const ch = h / rows;
                for (let r = 0; r < rows; r++) {
                    for (let col = 0; col < cols; col++) {
                        const seed = Math.sin((col * 12.9898 + r * 78.233 + Math.floor(time * 8) * 1.37)) * 43758.5453;
                        const frac = seed - Math.floor(seed);
                        if (frac > 0.72) {
                            const alpha = (frac - 0.72) * 0.32;
                            c.fillStyle = `rgba(148, 163, 184, ${alpha.toFixed(3)})`;
                            c.fillRect(col * cw, r * ch, cw - 1, ch - 1);
                        }
                    }
                }
            } else {
                // BLUE stale-pixel seed indicator: calm uniform frozen macroblocks
                c.strokeStyle = "rgba(59, 130, 246, 0.09)";
                c.lineWidth = 0.75;
                for (let x = 0; x < w; x += 36) {
                    c.beginPath();
                    c.moveTo(x, 0);
                    c.lineTo(x, h);
                    c.stroke();
                }
                for (let y = 0; y < h; y += 36) {
                    c.beginPath();
                    c.moveTo(0, y);
                    c.lineTo(w, y);
                    c.stroke();
                }
            }
        }

        function drawActors(c, showMaskOverlay) {
            const pad = Math.max(6, Math.round((100 - threshold) * 0.34));

            actors.forEach((a) => {
                // Foreground optical-flow preserve region
                if (showMaskOverlay) {
                    c.fillStyle = "rgba(59, 130, 246, 0.16)";
                    c.fillRect(a.x - pad, a.y - pad, a.w + pad * 2, a.h + pad * 2);
                    c.strokeStyle = "#3b82f6";
                    c.lineWidth = 1.5;
                    c.strokeRect(a.x - pad, a.y - pad, a.w + pad * 2, a.h + pad * 2);

                    // Optical flow vectors
                    c.strokeStyle = "#60a5fa";
                    c.lineWidth = 1.5;
                    const cx = a.x + a.w / 2;
                    const cy = a.y + a.h / 2;
                    c.beginPath();
                    c.moveTo(cx, cy);
                    c.lineTo(cx + a.vx * 24, cy + a.vy * 24);
                    c.stroke();
                }

                // Render crisp actor silhouette
                if (a.type === "vehicle") {
                    c.fillStyle = "#eab308";
                    c.fillRect(a.x, a.y + 10, a.w - 22, a.h - 16);
                    c.fillStyle = "#1e293b";
                    c.fillRect(a.x + 12, a.y + 2, 34, 18);
                    // Forks
                    c.fillStyle = "#cbd5e1";
                    c.fillRect(a.x + a.w - 22, a.y + 4, 4, a.h - 6);
                    c.fillRect(a.x + a.w - 18, a.y + a.h - 10, 18, 4);
                    // Wheels
                    c.fillStyle = "#0f172a";
                    c.beginPath();
                    c.arc(a.x + 16, a.y + a.h - 4, 7, 0, Math.PI * 2);
                    c.arc(a.x + a.w - 32, a.y + a.h - 4, 7, 0, Math.PI * 2);
                    c.fill();
                } else {
                    // Pedestrian / safety vest operator
                    c.fillStyle = "#f8fafc";
                    c.beginPath();
                    c.arc(a.x + a.w / 2, a.y + 10, 7, 0, Math.PI * 2);
                    c.fill();
                    c.fillStyle = "#38bdf8";
                    c.fillRect(a.x + 6, a.y + 19, a.w - 12, 24);
                    c.fillStyle = "#94a3b8";
                    c.fillRect(a.x + 8, a.y + 43, 6, 22);
                    c.fillRect(a.x + a.w - 14, a.y + 43, 6, 22);
                }

                if (showMaskOverlay) {
                    c.font = "500 11px 'IBM Plex Mono', monospace";
                    c.fillStyle = "#93c5fd";
                    c.fillText(a.label + " · live fg", a.x - pad, a.y - pad - 6);
                }
            });
        }

        function drawFrame() {
            const w = blueCanvas.width;
            const h = blueCanvas.height;
            ctx.clearRect(0, 0, w, h);

            if (viewMode === "raw") {
                drawWarehouseBackground(ctx, w, h, true);
                drawActors(ctx, false);
                drawCornerLabel(ctx, 14, 24, "Raw H.265 input · background noise consumes inter-frame bits");
                return;
            }

            if (viewMode === "mask") {
                ctx.fillStyle = "#06080c";
                ctx.fillRect(0, 0, w, h);
                drawWarehouseBackground(ctx, w, h, false);
                ctx.fillStyle = "rgba(6, 8, 12, 0.72)";
                ctx.fillRect(0, 0, w, h);
                drawActors(ctx, true);
                drawCornerLabel(ctx, 14, 24, "DIS optical-flow foreground mask · stale seed covers background");
                return;
            }

            // Split comparison view
            const splitX = Math.round(w * splitRatio);

            // Left side: Raw noisy stream
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, splitX, h);
            ctx.clip();
            drawWarehouseBackground(ctx, w, h, true);
            drawActors(ctx, false);
            ctx.restore();

            // Right side: BLUE stale-pixel compositor
            ctx.save();
            ctx.beginPath();
            ctx.rect(splitX, 0, w - splitX, h);
            ctx.clip();
            drawWarehouseBackground(ctx, w, h, false);
            drawActors(ctx, true);
            ctx.restore();

            // Split curtain hairline & handle
            ctx.strokeStyle = "#f4f5f7";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(splitX, 0);
            ctx.lineTo(splitX, h);
            ctx.stroke();

            ctx.fillStyle = "#08090b";
            ctx.strokeStyle = "#f4f5f7";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(splitX, h / 2, 16, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "#f4f5f7";
            ctx.font = "600 12px 'IBM Plex Mono', monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("<>", splitX, h / 2 + 0.5);
            ctx.textAlign = "left";
            ctx.textBaseline = "alphabetic";

            drawCornerLabel(ctx, 14, 24, "Standard H.265 (raw noise)");
            drawCornerLabel(ctx, Math.min(w - 235, Math.max(splitX + 14, 230)), 24, "BLUE compositor (stale bg)");
        }

        function drawCornerLabel(c, x, y, text) {
            c.font = "500 11px 'IBM Plex Mono', monospace";
            const metrics = c.measureText(text);
            const padX = 8;
            c.fillStyle = "rgba(8, 9, 11, 0.78)";
            c.fillRect(x - 4, y - 13, metrics.width + padX * 2, 20);
            c.fillStyle = "#e2e8f0";
            c.fillText(text, x + 4, y + 1);
        }

        function stepActors() {
            const w = blueCanvas.width;
            const h = blueCanvas.height;
            actors.forEach((a) => {
                a.x += a.vx;
                a.y += a.vy;
                if (a.x < 24 || a.x + a.w > w - 24) a.vx *= -1;
                if (a.y < 142 || a.y + a.h > h - 22) a.vy *= -1;
            });
        }

        function loop() {
            if (!prefersReducedMotion) {
                time += 0.032;
                stepActors();
            }
            drawFrame();
            if (!prefersReducedMotion) {
                requestAnimationFrame(loop);
            }
        }

        function updateSplitFromClientX(clientX) {
            const rect = splitWrap.getBoundingClientRect();
            const rel = (clientX - rect.left) / rect.width;
            splitRatio = Math.max(0.14, Math.min(0.86, rel));
            if (prefersReducedMotion) drawFrame();
        }

        splitWrap.addEventListener("pointerdown", (e) => {
            if (viewMode !== "split") return;
            isDragging = true;
            splitWrap.setPointerCapture(e.pointerId);
            updateSplitFromClientX(e.clientX);
        });

        splitWrap.addEventListener("pointermove", (e) => {
            if (!isDragging || viewMode !== "split") return;
            updateSplitFromClientX(e.clientX);
        });

        splitWrap.addEventListener("pointerup", () => {
            isDragging = false;
        });

        modeBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                viewMode = btn.getAttribute("data-blue-mode") || "split";
                modeBtns.forEach((b) => b.classList.toggle("active", b === btn));
                if (prefersReducedMotion) drawFrame();
            });
        });

        if (thresholdSlider) {
            thresholdSlider.addEventListener("input", () => {
                threshold = Number(thresholdSlider.value);
                updateMetrics();
                if (prefersReducedMotion) drawFrame();
            });
        }

        updateMetrics();
        loop();
    }

    // ----------------------------------------------------------------------
    // 6. LAB TAB 2: MIXED-PRECISION QUANTIZATION EXPLORER (LFM3 & LFM2.5)
    // ----------------------------------------------------------------------
    const quantDatasets = {
        lfm3: {
            title: "LFM3-VL-2B · Mixed Precision on Apple Silicon",
            meta: "November 2026 · M4 Pro 24 GB · mlx-vlm 0.7.11 · 1,500 paired examples (300/task)",
            summary:
                "Preserved LiquidAI's QAD 4-bit backbone tensor-for-tensor (1.47B, group 32), quantized 164M vision and 25M projector parameters to 8-bit, and requantized 262M tied embeddings to 4-bit (group 64). Selected via teacher-forced KL divergence on 270 held-out items (KL 0.0334, 95.3% top-1 agreement).",
            footprintMixed: "1.266 GB",
            footprintBase: "1.591 GB",
            footprintBf16: "3.836 GB",
            footprintNote: "−20.4% smaller than official 4-bit",
            meanMixed: "85.0",
            meanBase: "85.6",
            meanBf16: "84.9",
            deltaNote: "Paired bootstrap delta: −0.68 [−1.43, +0.04] vs official 4-bit; +0.07 [−0.93, +1.11] vs BF16.",
            baselineLabel: "Official 4-bit (1.591 GB)",
            mixedLabel: "Mixed v8p8b4e4 (1.266 GB)",
            blocks: [
                { label: "Vision Tower", bits: "8-bit", detail: "164M params" },
                { label: "Projector", bits: "8-bit", detail: "25M params" },
                { label: "Backbone", bits: "QAD 4-bit", detail: "1.47B · g32 exact" },
                { label: "Tied Embeddings", bits: "4-bit", detail: "262M · g64" }
            ],
            benchmarks: [
                { name: "DocVQA", mixed: 89.4, base: 89.7 },
                { name: "ChartQA", mixed: 81.7, base: 82.3 },
                { name: "OCRBench", mixed: 81.3, base: 82.0 },
                { name: "ScreenSpot-v2", mixed: 88.7, base: 89.3 },
                { name: "RefCOCO", mixed: 83.7, base: 84.7 }
            ],
            links: [
                { label: "Hugging Face Model Card", href: "https://huggingface.co/shubhambaid/LFM3-VL-2B-MLX-mixed-v8p8b4e4" }
            ]
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
            meanMixed: "81.3",
            meanBase: "81.0",
            meanBf16: "81.5",
            deltaNote:
                "Scores sit within sampling uncertainty (±4.0–5.3 pts/benchmark). Also found non-monotonic token scaling on ScreenSpot-v2: 53.0 @ 256 tokens → 79.0 @ 512 → 70.0 @ 1024.",
            baselineLabel: "Stock MLX 4-bit (2.39 GB)",
            mixedLabel: "Mixed v6p6b4e4 (2.04 GB)",
            blocks: [
                { label: "Vision Tower", bits: "6-bit", detail: "67.2% eligible" },
                { label: "Projector", bits: "6-bit", detail: "High sensitivity" },
                { label: "Backbone", bits: "4-bit", detail: "Primary savings" },
                { label: "Embeddings", bits: "4-bit", detail: "2 excluded safely" }
            ],
            benchmarks: [
                { name: "5-Task Mean", mixed: 81.3, base: 81.0 },
                { name: "ScreenSpot (256t)", mixed: 53.0, base: 53.0 },
                { name: "ScreenSpot (512t)", mixed: 79.0, base: 79.0 },
                { name: "ScreenSpot (1024t)", mixed: 70.0, base: 70.0 }
            ],
            links: [
                { label: "GitHub Lab Repo", href: "https://github.com/shubhambaid/lfm2vl-lab" },
                { label: "Hugging Face Weights", href: "https://huggingface.co/shubhambaid/LFM2.5-VL-3B-MLX-mixed-v6p6b4e4" },
                { label: "Raw Results Dataset", href: "https://huggingface.co/datasets/shubhambaid/lfm2vl-lab-results" }
            ]
        }
    };

    const quantToggleBtns = document.querySelectorAll("[data-quant-model]");
    const quantBlocksEl = document.getElementById("quant-blocks");
    const quantBarsEl = document.getElementById("quant-bars");
    const quantTitleEl = document.getElementById("quant-title");
    const quantMetaEl = document.getElementById("quant-meta");
    const quantSummaryEl = document.getElementById("quant-summary");
    const quantTableEl = document.getElementById("quant-table-body");
    const quantNoteEl = document.getElementById("quant-footnote");
    const quantLinksEl = document.getElementById("quant-links");
    const quantLegendMixed = document.getElementById("quant-legend-mixed");
    const quantLegendBase = document.getElementById("quant-legend-base");

    function renderQuant(key) {
        const d = quantDatasets[key];
        if (!d) return;

        if (quantTitleEl) quantTitleEl.textContent = d.title;
        if (quantMetaEl) quantMetaEl.textContent = d.meta;
        if (quantSummaryEl) quantSummaryEl.textContent = d.summary;
        if (quantNoteEl) quantNoteEl.textContent = d.deltaNote;
        if (quantLegendMixed) quantLegendMixed.textContent = d.mixedLabel;
        if (quantLegendBase) quantLegendBase.textContent = d.baselineLabel;

        if (quantBlocksEl) {
            quantBlocksEl.innerHTML = d.blocks
                .map(
                    (b) => `
                    <div class="quant-block">
                        <div class="quant-block-label">${b.label}</div>
                        <div class="quant-block-bits tabular">${b.bits}</div>
                        <div class="quant-block-detail">${b.detail}</div>
                    </div>`
                )
                .join("");
        }

        if (quantBarsEl) {
            quantBarsEl.innerHTML = d.benchmarks
                .map(
                    (bm) => `
                    <div class="bar-row">
                        <div class="bar-label">${bm.name}</div>
                        <div class="bar-tracks">
                            <div class="bar-track">
                                <div class="bar-fill mixed" style="width: ${bm.mixed}%"></div>
                            </div>
                            <div class="bar-track">
                                <div class="bar-fill baseline" style="width: ${bm.base}%"></div>
                            </div>
                        </div>
                        <div class="bar-nums"><strong>${bm.mixed.toFixed(1)}</strong> / ${bm.base.toFixed(1)}</div>
                    </div>`
                )
                .join("");
        }

        if (quantTableEl) {
            quantTableEl.innerHTML = `
                <tr>
                    <td>Mixed-precision artifact</td>
                    <td class="val-accent">${d.footprintMixed}</td>
                </tr>
                <tr>
                    <td>Official / Stock 4-bit</td>
                    <td class="val-strong">${d.footprintBase}</td>
                </tr>
                <tr>
                    <td>Footprint reduction</td>
                    <td class="val-strong">${d.footprintNote}</td>
                </tr>
                <tr>
                    <td>Mean score (Mixed / Base / BF16)</td>
                    <td class="val-strong">${d.meanMixed} / ${d.meanBase} / ${d.meanBf16}</td>
                </tr>
            `;
        }

        if (quantLinksEl) {
            quantLinksEl.innerHTML = d.links
                .map(
                    (l) => `<a href="${l.href}" target="_blank" rel="noopener noreferrer">${l.label} &rarr;</a>`
                )
                .join("");
        }
    }

    if (quantToggleBtns.length) {
        quantToggleBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                const key = btn.getAttribute("data-quant-model");
                quantToggleBtns.forEach((b) => b.classList.toggle("active", b === btn));
                renderQuant(key);
            });
        });
        renderQuant("lfm3");
    }

    // ----------------------------------------------------------------------
    // 7. LAB TAB 3: VERDICT V1 SINGLE-PASS DECISION EXPLORER
    // ----------------------------------------------------------------------
    const verdictSplits = {
        seen_yn: {
            label: "Seen-class Yes/No",
            verdict: 95.5,
            siglip: 75.3,
            delta: "+20.2 pts",
            note: "Strong gain on binary visual verification questions over the frozen SigLIP2 zero-shot prior. Trained on ~23k images across CIFAR-100, Oxford-IIIT Pets, Flowers-102, DTD, and Food-101 with validation-fitted temperature calibration."
        },
        unseen_yn: {
            label: "Unseen-class Yes/No",
            verdict: 94.1,
            siglip: 75.1,
            delta: "+19.0 pts",
            note: "Transfers cleanly to held-out object categories not seen during head training by combining the SigLIP2 zero-shot logit prior with a learned 6.24M-parameter correction."
        },
        unseen_10: {
            label: "Unseen 10-Option Choice",
            verdict: 91.0,
            siglip: 93.8,
            delta: "−2.8 pts",
            note: "Honest regression: on unseen 10-way multiple-choice classification, the raw SigLIP2 zero-shot prior slightly outperforms the learned head. Reporting regressions is essential to calibrating when a learned head helps."
        },
        eurosat: {
            label: "EuroSAT Out-of-Domain (10-Option)",
            verdict: 34.6,
            siglip: 42.4,
            delta: "−7.8 pts",
            note: "Domain shift limitation: satellite imagery sits far outside the natural-image training distribution, and explicit OTHER abstention does not reliably transfer across domain boundaries."
        }
    };

    const verdictBtns = document.querySelectorAll("[data-verdict-split]");
    const verdictBarsEl = document.getElementById("verdict-bars");
    const verdictNoteEl = document.getElementById("verdict-note");

    function renderVerdict(key) {
        const item = verdictSplits[key];
        if (!item) return;

        if (verdictBarsEl) {
            verdictBarsEl.innerHTML = `
                <div class="bar-row">
                    <div class="bar-label">Verdict v1</div>
                    <div class="bar-tracks">
                        <div class="bar-track"><div class="bar-fill mixed" style="width: ${item.verdict}%"></div></div>
                    </div>
                    <div class="bar-nums"><strong>${item.verdict.toFixed(1)}%</strong></div>
                </div>
                <div class="bar-row">
                    <div class="bar-label">SigLIP2 0-shot</div>
                    <div class="bar-tracks">
                        <div class="bar-track"><div class="bar-fill baseline" style="width: ${item.siglip}%"></div></div>
                    </div>
                    <div class="bar-nums">${item.siglip.toFixed(1)}% (${item.delta})</div>
                </div>
            `;
        }

        if (verdictNoteEl) {
            verdictNoteEl.innerHTML = `<strong>${item.label}:</strong> ${item.note}`;
        }
    }

    if (verdictBtns.length) {
        verdictBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                const key = btn.getAttribute("data-verdict-split");
                verdictBtns.forEach((b) => b.classList.toggle("active", b === btn));
                renderVerdict(key);
            });
        });
        renderVerdict("seen_yn");
    }

    // ----------------------------------------------------------------------
    // 8. SELECTED WORK FILTERING + CASE STUDY MODAL
    // ----------------------------------------------------------------------
    const filterBtns = document.querySelectorAll("[data-work-filter]");
    const workCards = document.querySelectorAll("[data-work-id]");

    if (filterBtns.length && workCards.length) {
        filterBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                const filter = btn.getAttribute("data-work-filter");
                filterBtns.forEach((b) => {
                    const active = b === btn;
                    b.classList.toggle("active", active);
                    b.setAttribute("aria-pressed", String(active));
                });
                workCards.forEach((card) => {
                    const cats = (card.getAttribute("data-work-cat") || "").split(" ");
                    const match = filter === "all" || cats.includes(filter);
                    card.classList.toggle("hidden-card", !match);
                });
            });
        });
    }

    const caseStudies = {
        "blue-comp": {
            kicker: "BLUE · Production System & Published Research · 2025–Present",
            title: "BLUE Perception-Aware Video Compression",
            bottleneck:
                "Fixed-camera surveillance spends substantial bitrate re-encoding sensor noise and slight lighting drift in static backgrounds, even when downstream detectors and VLMs only care about foreground events.",
            architecture: [
                "Pre-encode stale-pixel optical-flow compositor (not a replacement codec or neural video codec) paired with standard H.264/H.265 encoders.",
                "Maintains a persistent background seed frame, estimates motion via OpenCV DIS optical flow (CPU) or NVIDIA nvof (DeepStream), cleans masks morphologically, and preserves live foreground pixels while freezing stale background regions.",
                "Built end-to-end edge-to-cloud streaming infrastructure across Intel VAAPI and NVIDIA DeepStream paths, plus Foreground VMAF and blind VLM semantic evaluation."
            ],
            results: [
                "arXiv:2606.28753 (VIRAT 308 clips, CRF 28): 34.6% mean file-size reduction on x264 (95.8% of clips smaller) and 39.4% mean reduction on x265 (99.4% of clips smaller).",
                "arXiv:2607.19515 (227 paired VIRAT events + 54 CHAD anomaly clips): blind VLM semantic judge difference of −0.01 on 0–10 VIRAT scale and 4.31 vs 4.26 on CHAD.",
                "Production platform reported across 1,000+ cameras (offices, banks, industrial sites, warehouses, moving metro trains) with project-reported 40% median (up to 69%) bitrate cut beyond H.265 and <1% downstream detection impact; patent application filed."
            ],
            caveats:
                "Preprints are public on arXiv (not peer-reviewed venue acceptances). Patent application is filed, not granted. Compression savings depend on camera stability, foreground occupancy, and codec CRF.",
            links: [
                { label: "Paper 1 · Encoding (arXiv:2606.28753)", href: "https://arxiv.org/abs/2606.28753" },
                { label: "Paper 2 · VLM Semantics (arXiv:2607.19515)", href: "https://arxiv.org/abs/2607.19515" }
            ]
        },
        "lfm-quant": {
            kicker: "Independent Open-Weight Research · Aug & Nov 2026",
            title: "LFM3-VL-2B & LFM2.5-VL-3B Mixed-Precision MLX Labs",
            bottleneck:
                "Uniform 4-bit quantization treats sensitive vision encoders and projectors identically to language backbones, while nominal bit labels often hide unquantized layers caused by group-size alignment mismatches.",
            architecture: [
                "LFM3-VL-2B (Nov 2026): preserved LiquidAI's QAD 4-bit backbone tensor-for-tensor (1.47B, g32), quantized 164M vision and 25M projector params to 8-bit, and requantized 262M tied embeddings to 4-bit (g64). Selected recipe via teacher-forced KL (0.0334, 95.3% top-1 agreement).",
                "LFM2.5-VL-3B (Aug 2026): component recipe v6/p6/b4/e4. Audited 56 public quantized Hugging Face repos and uncovered that SigLIP2's 4304 intermediate dimension leaves 27 fc2 layers unquantized under MLX group sizes 32/64/128 (only 67.2% vision params quantized)."
            ],
            results: [
                "LFM3-VL-2B: 1.266 GB vs 1.591 GB official 4-bit (−20.4%) and 3.836 GB BF16. Paired 1,500-example 5-task eval mean: 85.0 vs 85.6 official and 84.9 BF16 (DocVQA 89.4, ChartQA 81.7, OCRBench 81.3, ScreenSpot-v2 88.7, RefCOCO 83.7). Native-res DocVQA 90.0 at 4.10 GB peak vs 4.43 GB.",
                "LFM2.5-VL-3B: 2.04 GB vs 2.39 GB stock MLX 4-bit (−14.4%); 81.3 mean vs 81.0 stock / 81.5 BF16. Documented non-monotonic token budgets on ScreenSpot-v2 (53.0 @ 256 → 79.0 @ 512 → 70.0 @ 1024)."
            ],
            caveats:
                "Evaluated on Apple M4 Pro 24 GB with single-seed greedy decoding; derived quantization weights under LFM Open License v1.0, not foundation-model training. Results show comparable observed quality, not universal equivalence.",
            links: [
                { label: "LFM3-VL-2B Model Card", href: "https://huggingface.co/shubhambaid/LFM3-VL-2B-MLX-mixed-v8p8b4e4" },
                { label: "LFM2.5-VL Lab (GitHub)", href: "https://github.com/shubhambaid/lfm2vl-lab" },
                { label: "LFM2.5-VL Results Dataset", href: "https://huggingface.co/datasets/shubhambaid/lfm2vl-lab-results" }
            ]
        },
        verdict: {
            kicker: "Independent Public Model · September 2026",
            title: "Verdict v1 — Single-Pass Visual Decision Model",
            bottleneck:
                "Generative VLMs waste latency decoding prose and JSON syntax token by token when downstream workflows only need calibrated probabilities over a typed decision or closed set of options.",
            architecture: [
                "Frozen google/siglip2-base-patch16-224 vision/text encoder paired with a ~6.24M trainable 3-layer transformer decision head.",
                "Feeds question, pooled image, 49 spatial patch tokens (7×7), position-free order-invariant option embeddings, and an explicit OTHER abstention token.",
                "Combines the SigLIP2 zero-shot logit prior with a learned correction and validation-fitted temperature calibration."
            ],
            results: [
                "Seen-class yes/no accuracy: 95.5% vs 75.3% SigLIP2 zero-shot.",
                "Unseen-class yes/no accuracy: 94.1% vs 75.1% SigLIP2 zero-shot.",
                "Trained on ~23,000 images across CIFAR-100, Oxford-IIIT Pets, Flowers-102, DTD, and Food-101; evaluated expected calibration error and AUROC."
            ],
            caveats:
                "Transparently documents regressions: unseen 10-option choice scored 91.0% vs 93.8% SigLIP zero-shot, and out-of-domain EuroSAT scored 34.6% vs 42.4%. Counting, small-text resolution, and cross-domain abstention are not solved in v1.",
            links: [
                { label: "Hugging Face Model Card", href: "https://huggingface.co/shubhambaid/verdict" }
            ]
        },
        "blue-multimodal": {
            kicker: "BLUE · Applied Multimodal & Edge Architecture · 2025–Present",
            title: "Compact Domain VLMs, Single-Pass Serving & Edge Video Stack",
            bottleneck:
                "Running 30B-class general VLMs over continuous multi-camera CCTV feeds creates unsustainable serving latency and GPU cost, while heterogeneous edge hardware (Intel N100, Core Ultra, NVIDIA RTX/Jetson) bottlenecks on decode and memory bandwidth long before raw NPU TOPS.",
            architecture: [
                "End-to-end post-training of compact multi-frame VLMs: teacher-student supervision with human review, event-level train/validation splits with SHA256 manifests, answer-only loss masking, and LoRA adapter preflight verification.",
                "Precision and serving optimization across BF16, FP8, INT8, AWQ, and 4-bit — measuring task-specific degradation (such as spatial grounding vs binary classification) under grammar-constrained vLLM serving.",
                "Researched non-autoregressive multi-question decision heads with custom vLLM serving plugins, alongside multi-camera GStreamer/VAAPI/DeepStream pipelines, Triton gRPC face-recognition services, and QSR tray-vs-POS reconciliation."
            ],
            results: [
                "Demonstrated that compact post-trained FP8 models can closely approach large incumbent accuracy on reviewed domain clips at substantially lower median latency.",
                "Diagnosed silent PEFT target mismatches on hybrid linear-attention architectures and codified automated adapter-coverage preflight checks.",
                "Production BLUE video platform operating across 1,000+ cameras with hardware-accelerated decode/encode scheduling and stream-lifecycle fallback."
            ],
            caveats:
                "Internal operational datasets, customer POC metrics, and unreleased model architectures are intentionally kept high-level pending public release clearance.",
            links: [
                { label: "BLUE Preprint Series (arXiv)", href: "https://arxiv.org/abs/2607.19515" }
            ]
        },
        "oss-robotics": {
            kicker: "Upstream Open Source · Robotics & MLX · 2026",
            title: "dora-rs MuJoCo Simulation Node & Upstream Contributions",
            bottleneck:
                "Robotics simulation pipelines often couple rendering to physics ticks and hardcode joint kinematics, breaking actuator physics and throttling control frequency.",
            architecture: [
                "dora-rs/dora-hub PR #43 (Merged May 2026): converted the MuJoCo client from a passive viewer into a configurable simulation node using GLContext/MjrContext off-screen rendering, dynamic MJCF camera discovery with JPEG publishing, data.ctrl actuator-governed physics, and decoupled physics vs vision ticks.",
                "Neywa-Labs/mlx-vlm PR #2069 (Submitted Aug 2026): investigated macOS incompatibility of Linux-only codec-video-prep, implemented uniform video sampling and sparse patch cu_seqlens routing (later superseded by maintainer PR #2202).",
                "enactic/openarm_mujoco PR #17 (Submitted Feb 2026): contributed bimanual v2 MJCF multi-camera sensor setup aligned to inference topics, informing the merged PR #19 refactor."
            ],
            results: [
                "dora-hub PR #43 merged cleanly (165 additions, 84 deletions across 2 files) removing hardcoded scene assumptions in favor of XML discovery.",
                "Verified dense-path parity (max absolute diff 0) and 1,568 placeholder token grid alignment in the MLX-VLM video patch investigation."
            ],
            caveats:
                "Attributes merge credit strictly: PR #43 is merged; PR #2069 and PR #17 were closed in favor of maintainer follow-ups #2202 and #19.",
            links: [
                { label: "dora-hub PR #43 (Merged)", href: "https://github.com/dora-rs/dora-hub/pull/43" },
                { label: "mlx-vlm PR #2069", href: "https://github.com/Neywa-Labs/mlx-vlm/pull/2069" },
                { label: "openarm_mujoco PR #17", href: "https://github.com/enactic/openarm_mujoco/pull/17" }
            ]
        },
        alethic: {
            kicker: "Developer Infrastructure · Open Source · 2026",
            title: "Alethic — Git-Backed Coding-Agent Continuity",
            bottleneck:
                "Long-running coding-agent sessions lose engineering decisions, verification state, and task provenance across chat resets or brittle external databases.",
            architecture: [
                "Stores tasks, architectural decisions, checkpoints, and verification receipts as reviewable repository-local YAML under .alethic/.",
                "Links continuity artifacts directly to code commits with stale-state detection so engineers and agents share a versioned source of truth."
            ],
            results: [
                "Public repository implementing Git-native continuity workflows without external database dependencies."
            ],
            caveats:
                "Active developer-tooling prototype focused on reproducibility and reviewable agent state.",
            links: [
                { label: "GitHub Repository", href: "https://github.com/shubhambaid/alethic" }
            ]
        },
        "mage-codec": {
            kicker: "Independent Research · Video-VLM Ablation · 2026",
            title: "Mage-VL Codec Lab — Patch Importance Ablation",
            bottleneck:
                "Under tight token budgets for video-language models, do codec-native signals like FFmpeg motion vectors and residual energy actually select better visual patches than simpler heuristics?",
            architecture: [
                "Systematic ablation harness comparing I/P-frame patch selection, frame differences, spatial gradients, FFmpeg motion vectors, center bias, codec bitcost reference, and random selection under matched token budgets."
            ],
            results: [
                "Controlled NExT-QA ablation (150 clips, budget 4,096 tokens): none of the tested importance signals, including FFmpeg motion vectors, outperformed random selection."
            ],
            caveats:
                "A deliberate published negative result — narrow to the tested NExT-QA budget and protocol, demonstrating empirical discipline over cherry-picking.",
            links: [
                { label: "GitHub Repository", href: "https://github.com/shubhambaid/mage-codec-lab" }
            ]
        },
        spatial: {
            kicker: "Spatial Intelligence Prototypes · Egocentric Vision & 3D",
            title: "Sharingan & Finite-Tsukuyomi",
            bottleneck:
                "Reconstructing egocentric spatial awareness—both real-time pedestrian collision risk and navigable 3D memory—from single-camera first-person RGB footage without specialized depth rigs.",
            architecture: [
                "Sharingan: YOLOv11n + ByteTrack tracking, Shi–Tomasi + sparse Lucas–Kanade optical flow, RANSAC homography for wearer ego-motion compensation, ground-plane bird's-eye projection, and time-to-contact estimation with identity-switch gating.",
                "Finite-Tsukuyomi: FFmpeg frame extraction → MASt3R geometry & camera-pose estimation → colored point-cloud assembly (~886,000 points across a 120-frame demo) with interactive viewer and optional OpenSplat Gaussian splatting."
            ],
            results: [
                "Working end-to-end prototypes demonstrating monocular BEV trajectory projection and 3D camera-pose relive playback from handheld first-person video."
            ],
            caveats:
                "Private exploratory prototypes; approximate monocular distances are not calibrated for safety-critical certification.",
            links: [
                { label: "GitHub Profile", href: "https://github.com/shubhambaid" }
            ]
        },
        avathon: {
            kicker: "Avathon (formerly SparkCognition) · Production CV · 2022–2025",
            title: "VAIA School Safety Suite & Active-Learning Edge Pipelines",
            bottleneck:
                "Deploying multi-camera safety detection and person re-identification on constrained edge hardware while breaking manual annotation bottlenecks for continuous retraining.",
            architecture: [
                "Owned multi-camera object detection, person re-identification, inference optimization, and production reliability across 100+ live cameras in US school deployments.",
                "Optimized edge inference pipelines with ARM/NEON vectorization and INT8 quantization, and integrated early Vision-Language Models alongside classical CV for richer scene understanding.",
                "Built a gamified active-learning annotation system routing high-uncertainty production samples back into dataset curation and retraining loops."
            ],
            results: [
                "Deployed across 100+ live cameras for VAIA School Safety Suite; shipped detection and classification models serving thousands of enterprise cameras over tenure.",
                "Reported 50% reduction in inference CPU utilization via ARM/NEON + INT8 optimization while maintaining real-time throughput."
            ],
            caveats:
                "Exact historical hardware baseline and annotation speedup ratios are not publicly benchmarked.",
            links: [
                { label: "Download Resume (PDF)", href: "asset/Shubham_Baid.pdf" }
            ]
        },
        cafu: {
            kicker: "CAFU · Predictive ML & Agentic Automation · Jan–Apr 2025",
            title: "Real-Time ETA Modeling & Multimodal Business Agents",
            bottleneck:
                "High late-fulfillment rates in on-demand mobile fuel delivery and slow, manual B2B lead research and marketing copywriting cycles.",
            architecture: [
                "Improved ML-based estimated-arrival-time modeling using real-time operational signals.",
                "Engineered an agentic LLM workflow for marketing content generation and an autonomous multimodal-LLM B2B lead-acquisition pipeline."
            ],
            results: [
                "Reported late fulfillment dropped from 13% to 8% over three months (−5 percentage points) and SLA breaches over 5 minutes fell by 42%.",
                "Reported B2B agent processed ~1,400 prospects/month (−90% manual prospecting effort); marketing workflow cut turnaround by 50% with a reported 15% CTR lift."
            ],
            caveats:
                "Metrics are role-reported operational outcomes from prior career records.",
            links: [
                { label: "LinkedIn Profile", href: "https://www.linkedin.com/in/shubhambaid21/" }
            ]
        },
        hackathons: {
            kicker: "International Hackathons · Track Winners",
            title: "YetiCoach (HackZurich) & Project Aegir (NASA Space Apps)",
            bottleneck:
                "Delivering actionable sports-biomechanics feedback from plain action cameras without wearable sensors, and tracking oceanic marine debris from aerial/satellite imagery.",
            architecture: [
                "YetiCoach (collaborative project with Jackson Sunny): YOLOv5 + MonoDepth pipeline estimating ski separation, posture angles, and depth path from action-camera video with an interactive coaching dashboard (Sunrise, Huawei & Swiss-Ski track).",
                "Project Aegir: computer vision workflow over satellite and UAV imagery to detect, classify, and model ocean debris trajectories for cleanup coordination."
            ],
            results: [
                "YetiCoach: HackZurich track winner (Sunrise, Huawei & Swiss-Ski challenge).",
                "Project Aegir: NASA Space Apps track winner."
            ],
            caveats:
                "Attributed accurately as track winners and collaborative hackathon builds rather than solo overall grand prizes.",
            links: [
                { label: "YetiCoach on GitHub", href: "https://github.com/shubhambaid/YetiCoach" },
                { label: "Devpost Profile", href: "https://devpost.com/shubhambaid" }
            ]
        },
        alpr: {
            kicker: "Integration Wizards · Production CV · 2020–2022",
            title: "High-Throughput ALPR & DeepStream GPU Migration",
            bottleneck:
                "Running simultaneous detection and OCR models on continuous industrial camera feeds without exhausting edge hardware budgets.",
            architecture: [
                "Built an end-to-end Automatic License Plate Recognition (ALPR) pipeline combining YOLO localization and OCR with hybrid CPU/GPU execution.",
                "Migrated legacy inference workloads onto NVIDIA DeepStream and TensorRT GPU pipelines, and delivered PPE detection, fall-arrester detection, and vehicle classification."
            ],
            results: [
                "Established the team's GPU-accelerated DeepStream/TensorRT production video inference architecture across continuous industrial streams."
            ],
            caveats:
                "Integration Wizards was later acquired by SparkCognition (subsequently Avathon).",
            links: [
                { label: "Minato-Speed Inference Guide (Medium)", href: "https://shubhambaid.medium.com/make-your-deep-learning-models-infer-at-minato-speed-in-python-19563327425c" }
            ]
        }
    };

    const modalOverlay = document.getElementById("case-modal");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalKicker = document.getElementById("modal-kicker");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");
    let lastFocusedEl = null;

    function openCaseModal(id) {
        const data = caseStudies[id];
        if (!data || !modalOverlay) return;

        lastFocusedEl = document.activeElement;
        modalKicker.textContent = data.kicker;
        modalTitle.textContent = data.title;

        const archList = data.architecture.map((item) => `<li>${item}</li>`).join("");
        const resList = data.results.map((item) => `<li>${item}</li>`).join("");
        const linksHtml = data.links
            .map((l) => {
                const isExternal = l.href.startsWith("http");
                return `<a class="btn btn-secondary" href="${l.href}" ${
                    isExternal ? 'target="_blank" rel="noopener noreferrer"' : "download"
                }>${l.label} &rarr;</a>`;
            })
            .join("");

        modalBody.innerHTML = `
            <div class="modal-section">
                <h4>The Bottleneck</h4>
                <p>${data.bottleneck}</p>
            </div>
            <div class="modal-section">
                <h4>Architecture & Engineering</h4>
                <ul>${archList}</ul>
            </div>
            <div class="modal-section">
                <h4>Measured Results & Scope</h4>
                <ul>${resList}</ul>
            </div>
            <div class="modal-section">
                <h4>Scope & Honest Limitations</h4>
                <p>${data.caveats}</p>
            </div>
            <div class="modal-links">${linksHtml}</div>
        `;

        modalOverlay.classList.add("open");
        modalOverlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        if (modalCloseBtn) modalCloseBtn.focus();
    }

    function closeCaseModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove("open");
        modalOverlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
            lastFocusedEl.focus();
        }
    }

    workCards.forEach((card) => {
        card.addEventListener("click", () => {
            openCaseModal(card.getAttribute("data-work-id"));
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", closeCaseModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) closeCaseModal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (modalOverlay && modalOverlay.classList.contains("open")) {
                closeCaseModal();
            }
            if (mobileDrawer && mobileDrawer.classList.contains("open")) {
                mobileDrawer.classList.remove("open");
                if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
            }
        }
    });
})();
