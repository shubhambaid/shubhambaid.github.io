import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import {
  CAPABILITIES,
  CASE_STUDIES,
  ENGINEERING_PRINCIPLES,
  EXPERIENCE,
  HERO_PROOF_METRICS,
  PUBLICATIONS,
  RIBBON_ITEMS,
  type CaseStudy,
  type WorkCategory,
} from "./data/portfolioData";
import { InteractiveSystemsLab } from "./components/InteractiveSystemsLab";
import { CaseStudyModal } from "./components/CaseStudyModal";
import { WritingView } from "./components/WritingView";

const WORK_FILTERS: { id: WorkCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "research", label: "Research & Models" },
  { id: "production", label: "Production" },
  { id: "oss", label: "Open Source" },
  { id: "spatial", label: "Spatial & Awards" },
];

export function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const saved = localStorage.getItem("sb-theme");
      return saved === "light" ? "light" : "dark";
    } catch {
      return "dark";
    }
  });
  const [page, setPage] = useState<"home" | "writing">("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [workFilter, setWorkFilter] = useState<WorkCategory>("all");
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [portraitError, setPortraitError] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("sb-theme", theme);
    } catch {
      // Ignore storage errors in sandboxed iframes
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const navigateToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (page !== "home") {
      setPage("home");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 40);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openWriting = () => {
    setMobileMenuOpen(false);
    setPage("writing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyEmail = async () => {
    const email = "shubhambaid99@gmail.com";
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      }
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2200);
    } catch {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2200);
    }
  };

  const visibleStudies =
    workFilter === "all"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((s) => s.categories.includes(workFilter));

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#0D1017] dark:bg-[#08090B] dark:text-[#F4F5F7] transition-colors duration-200">
      {/* Top Bar: Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-[#F8F9FB]/90 dark:bg-[#08090B]/85 backdrop-blur-md border-b border-[#E2E6EE] dark:border-[#222631]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 h-[64px] md:h-[68px] flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => {
              setPage("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-display text-[1.15rem] font-bold tracking-[-0.025em] text-[#0D1017] dark:text-[#F4F5F7] whitespace-nowrap shrink-0"
          >
            Shubham Baid
          </button>

          {/* Zone 2: 5 Concise Single-Line Nav Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-[14.5px] font-medium text-[#434B5C] dark:text-[#A2AAB8]"
          >
            <button
              type="button"
              onClick={() => navigateToSection("lab")}
              className="hover:text-[#0D1017] dark:hover:text-[#F4F5F7] whitespace-nowrap shrink-0 transition-colors"
            >
              Systems Lab
            </button>
            <button
              type="button"
              onClick={() => navigateToSection("work")}
              className="hover:text-[#0D1017] dark:hover:text-[#F4F5F7] whitespace-nowrap shrink-0 transition-colors"
            >
              Work
            </button>
            <button
              type="button"
              onClick={() => navigateToSection("publications")}
              className="hover:text-[#0D1017] dark:hover:text-[#F4F5F7] whitespace-nowrap shrink-0 transition-colors"
            >
              Publications
            </button>
            <button
              type="button"
              onClick={() => navigateToSection("experience")}
              className="hover:text-[#0D1017] dark:hover:text-[#F4F5F7] whitespace-nowrap shrink-0 transition-colors"
            >
              Experience
            </button>
            <button
              type="button"
              onClick={openWriting}
              className={`whitespace-nowrap shrink-0 transition-colors ${
                page === "writing"
                  ? "text-[#0D1017] dark:text-[#F4F5F7] underline underline-offset-8 decoration-blue-600 dark:decoration-blue-400"
                  : "hover:text-[#0D1017] dark:hover:text-[#F4F5F7]"
              }`}
            >
              Writing
            </button>
          </nav>

          {/* Zone 3: 1 Primary CTA Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="/asset/Shubham_Baid.pdf"
              download
              className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-md bg-[#0D1017] text-white dark:bg-[#F4F5F7] dark:text-[#08090B] hover:opacity-90 text-[13.5px] font-semibold whitespace-nowrap shrink-0 transition-opacity"
            >
              Resume PDF
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden w-11 h-11 rounded-md border border-[#E2E6EE] dark:border-[#222631] inline-flex items-center justify-center text-[#0D1017] dark:text-[#F4F5F7]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E2E6EE] dark:border-[#222631] bg-[#F8F9FB] dark:bg-[#08090B] px-5 py-3">
            <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-[#E2E6EE] dark:divide-[#222631]">
              <button
                type="button"
                onClick={() => navigateToSection("lab")}
                className="min-h-[44px] text-left font-medium text-[#434B5C] dark:text-[#A2AAB8]"
              >
                Systems Lab
              </button>
              <button
                type="button"
                onClick={() => navigateToSection("work")}
                className="min-h-[44px] text-left font-medium text-[#434B5C] dark:text-[#A2AAB8]"
              >
                Work
              </button>
              <button
                type="button"
                onClick={() => navigateToSection("publications")}
                className="min-h-[44px] text-left font-medium text-[#434B5C] dark:text-[#A2AAB8]"
              >
                Publications
              </button>
              <button
                type="button"
                onClick={() => navigateToSection("experience")}
                className="min-h-[44px] text-left font-medium text-[#434B5C] dark:text-[#A2AAB8]"
              >
                Experience
              </button>
              <button
                type="button"
                onClick={openWriting}
                className="min-h-[44px] text-left font-medium text-[#434B5C] dark:text-[#A2AAB8]"
              >
                Writing
              </button>
              <button
                type="button"
                onClick={() => navigateToSection("contact")}
                className="min-h-[44px] text-left font-medium text-[#434B5C] dark:text-[#A2AAB8]"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </header>

      {page === "writing" ? (
        <WritingView
          onBack={() => {
            setPage("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      ) : (
        <main>
          {/* Split-Screen Editorial Hero */}
          <section className="pt-12 md:pt-16 pb-12">
            <div className="max-w-[1200px] mx-auto px-5 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.85fr] gap-10 lg:gap-14 items-stretch">
                {/* Left Column: Typographic Hierarchy */}
                <div className="flex flex-col justify-between py-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-[14px] font-medium text-[#434B5C] dark:text-[#A2AAB8] mb-6">
                      <span>Bengaluru, India</span>
                      <span aria-hidden="true" className="text-[#667085] dark:text-[#6F7787]">
                        ·
                      </span>
                      <span>Senior AI Architect, Founding Team at BLUE</span>
                    </div>

                    <h1 className="font-display text-[clamp(2.45rem,4.3vw,3.8rem)] font-bold leading-[1.06] tracking-[-0.032em] text-balance-safe max-w-[17ch] text-[#0D1017] dark:text-[#F4F5F7] mb-6">
                      AI systems built around the{" "}
                      <span className="text-blue-600 dark:text-blue-400">real bottleneck.</span>
                    </h1>

                    <p className="text-[16.5px] leading-[1.68] text-[#434B5C] dark:text-[#A2AAB8] max-w-[58ch] mb-8">
                      I am an{" "}
                      <strong className="font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                        AI systems engineer and applied researcher
                      </strong>{" "}
                      with 6+ years taking computer vision, video infrastructure, and efficient
                      multimodal models from research to production. Rather than defaulting to
                      larger models, I profile the constraint—bandwidth, decode throughput,
                      quantization sensitivity, or autoregressive latency—and redesign the system
                      around it.
                    </p>

                    <div className="flex flex-wrap items-center gap-3.5 mb-8">
                      <button
                        type="button"
                        onClick={() => navigateToSection("lab")}
                        className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-[14px] font-semibold whitespace-nowrap shrink-0 transition-colors"
                      >
                        Explore Interactive Lab
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateToSection("contact")}
                        className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-md border border-[#C8D0DE] dark:border-[#323847] hover:bg-white dark:hover:bg-[#12151C] text-[#0D1017] dark:text-[#F4F5F7] text-[14px] font-semibold whitespace-nowrap shrink-0 transition-colors"
                      >
                        Get in Touch
                      </button>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-[#E2E6EE] dark:border-[#222631] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] font-medium text-[#434B5C] dark:text-[#A2AAB8]">
                      <a
                        href="https://github.com/shubhambaid"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        GitHub ↗
                      </a>
                      <a
                        href="https://huggingface.co/shubhambaid"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        Hugging Face ↗
                      </a>
                      <a
                        href="https://www.linkedin.com/in/shubhambaid21/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        LinkedIn ↗
                      </a>
                      <a
                        href="https://twitter.com/shubhamkahanhai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        X / Twitter ↗
                      </a>
                      <a
                        href="https://devpost.com/shubhambaid"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        Devpost ↗
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="min-h-[36px] px-3 py-1.5 rounded-md border border-[#E2E6EE] dark:border-[#222631] text-[13px] font-medium text-[#434B5C] dark:text-[#A2AAB8] hover:text-[#0D1017] dark:hover:text-[#F4F5F7] hover:bg-white dark:hover:bg-[#12151C] whitespace-nowrap shrink-0 transition-colors"
                    >
                      {theme === "dark" ? "Light mode" : "Dark mode"}
                    </button>
                  </div>
                </div>

                {/* Right Column: Matching-Height Editorial Portrait */}
                <div className="relative rounded-2xl overflow-hidden border border-[#E2E6EE] dark:border-[#222631] bg-[#12151C] min-h-[380px] lg:h-full">
                  {!portraitError ? (
                    <img
                      src="/asset/me.jpg"
                      alt="Shubham Baid standing on a misty green mountain ridge in monochrome attire"
                      referrerPolicy="no-referrer"
                      onError={() => setPortraitError(true)}
                      className="w-full h-full object-cover object-[56%_40%] transition-transform duration-500 hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="w-full h-full min-h-[380px] flex items-center justify-center bg-[#12151C] text-[#A2AAB8] font-display text-xl">
                      Shubham Baid
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6 pointer-events-none">
                    <p className="font-display text-[17px] font-semibold text-white">
                      Shubham Baid
                    </p>
                    <p className="text-[13px] text-white/80 mt-0.5">
                      Video Infrastructure · Efficient Multimodal Models · Production Edge AI
                    </p>
                  </div>
                </div>
              </div>

              {/* Full-Width 4-Column Quantitative Proof Strip Below Hero Split */}
              <div
                aria-label="Key measured impact"
                className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-[#E2E6EE] dark:border-[#222631]"
              >
                {HERO_PROOF_METRICS.map((m, idx) => (
                  <div
                    key={m.label}
                    className={`py-6 ${
                      idx > 0
                        ? "border-t sm:border-t-0 lg:border-l border-[#E2E6EE] dark:border-[#222631] lg:pl-6"
                        : ""
                    } ${idx === 2 ? "sm:border-t lg:border-t-0" : ""} ${
                      idx === 3 ? "sm:border-t sm:border-l lg:border-t-0 sm:pl-6" : ""
                    } ${idx === 1 ? "sm:border-l sm:pl-6" : ""} lg:pr-5`}
                  >
                    <div className="font-display text-[clamp(1.75rem,2.4vw,2.2rem)] font-bold tracking-[-0.03em] leading-none text-[#0D1017] dark:text-[#F4F5F7] tabular-nums mb-2">
                      {m.value}
                    </div>
                    <div className="text-[14px] font-medium text-[#434B5C] dark:text-[#A2AAB8] leading-snug">
                      {m.label}
                    </div>
                    <div className="font-mono-tabular text-[12px] text-[#667085] dark:text-[#6F7787] mt-1.5">
                      {m.scope}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Subtle Editorial Ribbon Divider */}
          <div
            aria-hidden="true"
            className="ribbon-wrapper overflow-hidden border-y border-[#E2E6EE] dark:border-[#222631] bg-[#F1F3F7] dark:bg-[#0E1015] py-3.5 select-none"
          >
            <div className="animate-ribbon font-mono-tabular text-[13px] text-[#667085] dark:text-[#6F7787]">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex items-center gap-6 pr-6 whitespace-nowrap">
                  {RIBBON_ITEMS.map((item) => (
                    <React.Fragment key={`${dup}-${item}`}>
                      <span>{item}</span>
                      <span className="text-blue-600 dark:text-blue-400">·</span>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Section 01: Interactive Systems Lab */}
          <InteractiveSystemsLab />

          {/* Section 02: Selected Work & Open Source (Dynamic Bento Grid) */}
          <section id="work" className="py-16 md:py-24 border-b border-[#E2E6EE] dark:border-[#222631]">
            <div className="max-w-[1200px] mx-auto px-5 md:px-8">
              <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
                <div>
                  <p className="font-mono-tabular text-[13px] text-blue-600 dark:text-blue-400 mb-2">
                    02. Selected Work &amp; Open Source
                  </p>
                  <h2 className="font-display text-[clamp(1.75rem,3vw,2.45rem)] font-bold tracking-[-0.028em] leading-[1.15] text-balance-safe text-[#0D1017] dark:text-[#F4F5F7]">
                    Production pipelines, open weights &amp; upstream PRs
                  </h2>
                </div>

                <div
                  role="group"
                  aria-label="Filter projects by domain"
                  className="inline-flex items-center gap-1 p-1 rounded-[10px] bg-white dark:bg-[#12151C] border border-[#E2E6EE] dark:border-[#222631] max-w-full overflow-x-auto"
                >
                  {WORK_FILTERS.map((f) => {
                    const active = workFilter === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setWorkFilter(f.id)}
                        className={`min-h-[38px] px-3.5 py-1.5 rounded-[7px] text-[13.5px] font-semibold whitespace-nowrap shrink-0 transition-colors ${
                          active
                            ? "bg-[#0D1017] text-white dark:bg-[#F4F5F7] dark:text-[#08090B]"
                            : "text-[#434B5C] dark:text-[#A2AAB8] hover:text-[#0D1017] dark:hover:text-[#F4F5F7]"
                        }`}
                      >
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {visibleStudies.map((study) => (
                  <button
                    key={study.id}
                    type="button"
                    onClick={() => setSelectedStudy(study)}
                    className={`group text-left rounded-2xl p-6 sm:p-7 bg-white dark:bg-[#12151C] border border-[#E2E6EE] dark:border-[#222631] hover:border-[#C8D0DE] dark:hover:border-[#323847] hover:bg-[#F9FAFC] dark:hover:bg-[#171B24] transition-all duration-150 hover:-translate-y-0.5 flex flex-col justify-between gap-5 ${
                      study.spanTwo ? "md:col-span-2" : ""
                    }`}
                  >
                    <div>
                      <p className="font-mono-tabular text-[12.5px] text-[#667085] dark:text-[#6F7787] mb-2.5">
                        <span className="text-blue-600 dark:text-blue-400">{study.kickerAccent}</span>{" "}
                        · {study.kickerRest}
                      </p>
                      <h3
                        className={`font-display font-bold tracking-[-0.02em] leading-snug text-[#0D1017] dark:text-[#F4F5F7] mb-2.5 ${
                          study.spanTwo ? "text-[1.45rem] sm:text-[1.55rem]" : "text-[1.25rem]"
                        }`}
                      >
                        {study.title}
                      </h3>
                      <p className="text-[14.5px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8]">
                        {study.summary}
                      </p>
                    </div>

                    <div>
                      {study.metrics && study.metrics.length > 0 && (
                        <div className="flex flex-wrap gap-x-6 gap-y-2.5 pt-4 mb-3 border-t border-[#E2E6EE] dark:border-[#222631]">
                          {study.metrics.map((m) => (
                            <div key={m.label}>
                              <div className="font-mono-tabular text-[16px] font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                                {m.value}
                              </div>
                              <div className="text-[12px] text-[#667085] dark:text-[#6F7787]">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="pt-3.5 border-t border-[#E2E6EE] dark:border-[#222631] flex items-center justify-between gap-3 text-[12.5px] text-[#667085] dark:text-[#6F7787]">
                        <span className="truncate font-mono-tabular">{study.stack}</span>
                        <span className="font-semibold text-[#0D1017] dark:text-[#F4F5F7] group-hover:text-blue-600 dark:group-hover:text-blue-400 whitespace-nowrap shrink-0 transition-colors">
                          {study.spanTwo ? "Case study →" : "Details →"}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Section 03: Publications, Preprints & IP */}
          <section
            id="publications"
            className="py-16 md:py-24 border-b border-[#E2E6EE] dark:border-[#222631] bg-[#F1F3F7] dark:bg-[#0E1015]"
          >
            <div className="max-w-[1200px] mx-auto px-5 md:px-8">
              <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
                <div>
                  <p className="font-mono-tabular text-[13px] text-blue-600 dark:text-blue-400 mb-2">
                    03. Publications, Preprints &amp; IP
                  </p>
                  <h2 className="font-display text-[clamp(1.75rem,3vw,2.45rem)] font-bold tracking-[-0.028em] leading-[1.15] text-balance-safe text-[#0D1017] dark:text-[#F4F5F7]">
                    Public research record
                  </h2>
                </div>
                <p className="text-[15px] text-[#434B5C] dark:text-[#A2AAB8] max-w-[54ch] leading-relaxed">
                  Preprints, peer-venue records, public datasets, and pending patent applications—kept
                  explicitly separated by publication status and scope.
                </p>
              </div>

              <div className="border-t border-[#E2E6EE] dark:border-[#222631]">
                {PUBLICATIONS.map((pub) => (
                  <article
                    key={pub.id}
                    className="grid grid-cols-1 md:grid-cols-[156px_1fr_auto] gap-4 md:gap-8 py-7 border-b border-[#E2E6EE] dark:border-[#222631] items-start"
                  >
                    <div className="font-mono-tabular text-[13px] text-[#667085] dark:text-[#6F7787] leading-snug">
                      <strong className="block font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                        {pub.year}
                      </strong>
                      {pub.statusLine}
                      <br />
                      {pub.roleLine}
                    </div>

                    <div>
                      <h3 className="font-display text-[1.18rem] font-bold tracking-[-0.015em] leading-snug text-[#0D1017] dark:text-[#F4F5F7] mb-1.5">
                        {pub.title}
                      </h3>
                      <p className="text-[13.5px] text-[#667085] dark:text-[#6F7787] mb-2.5">
                        {pub.authors} · {pub.venue}
                      </p>
                      <p className="text-[14.5px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8] max-w-[74ch]">
                        {pub.abstract}
                      </p>
                    </div>

                    <div className="md:text-right whitespace-nowrap">
                      {pub.linkHref ? (
                        <a
                          href={pub.linkHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center min-h-[36px] text-[14px] font-semibold text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
                        >
                          {pub.linkLabel} ↗
                        </a>
                      ) : (
                        <span className="font-mono-tabular text-[12.5px] text-[#667085] dark:text-[#6F7787]">
                          Pending
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Section 04: Experience, Methodology & Capabilities */}
          <section id="experience" className="py-16 md:py-24 border-b border-[#E2E6EE] dark:border-[#222631]">
            <div className="max-w-[1200px] mx-auto px-5 md:px-8">
              <div className="mb-10">
                <p className="font-mono-tabular text-[13px] text-blue-600 dark:text-blue-400 mb-2">
                  04. Career Chronology
                </p>
                <h2 className="font-display text-[clamp(1.75rem,3vw,2.45rem)] font-bold tracking-[-0.028em] leading-[1.15] text-balance-safe text-[#0D1017] dark:text-[#F4F5F7]">
                  Six years shipping AI under real constraints
                </h2>
              </div>

              <div className="border-t border-[#E2E6EE] dark:border-[#222631]">
                {EXPERIENCE.map((job) => (
                  <div
                    key={`${job.organization}-${job.period}`}
                    className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-5 md:gap-10 py-9 border-b border-[#E2E6EE] dark:border-[#222631]"
                  >
                    <div>
                      <div className="font-mono-tabular text-[13.5px] font-semibold text-[#0D1017] dark:text-[#F4F5F7] mb-1">
                        {job.period}
                      </div>
                      <div className="text-[15px] font-semibold text-blue-600 dark:text-blue-400 mb-0.5">
                        {job.organization}
                      </div>
                      <div className="text-[13px] text-[#667085] dark:text-[#6F7787]">
                        {job.location}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display text-[1.35rem] font-bold tracking-[-0.02em] text-[#0D1017] dark:text-[#F4F5F7] mb-2.5">
                        {job.role}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8] mb-4 max-w-[72ch]">
                        {job.lead}
                      </p>
                      <ul className="space-y-2.5 mb-4 max-w-[74ch] text-[14.5px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8]">
                        {job.bullets.map((b) => (
                          <li
                            key={b}
                            className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[#667085]"
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                      <p className="font-mono-tabular text-[12.5px] text-[#667085] dark:text-[#6F7787]">
                        {job.stack}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Engineering Principles + Capabilities Map */}
              <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 items-start">
                <div>
                  <p className="font-mono-tabular text-[13px] text-blue-600 dark:text-blue-400 mb-2">
                    Research-to-Production Approach
                  </p>
                  <h3 className="font-display text-[1.6rem] font-bold tracking-[-0.025em] text-[#0D1017] dark:text-[#F4F5F7] mb-6">
                    How I debug and ship AI systems
                  </h3>
                  <div className="border-t border-[#E2E6EE] dark:border-[#222631]">
                    {ENGINEERING_PRINCIPLES.map((p) => (
                      <div
                        key={p.num}
                        className="grid grid-cols-[36px_1fr] gap-3.5 py-4 border-b border-[#E2E6EE] dark:border-[#222631]"
                      >
                        <div className="font-mono-tabular text-[13px] font-semibold text-blue-600 dark:text-blue-400 pt-0.5">
                          {p.num}
                        </div>
                        <div>
                          <div className="font-semibold text-[15px] text-[#0D1017] dark:text-[#F4F5F7] mb-1">
                            {p.title}
                          </div>
                          <div className="text-[14px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8]">
                            {p.body}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-mono-tabular text-[13px] text-blue-600 dark:text-blue-400 mb-2">
                    Technical Capabilities
                  </p>
                  <h3 className="font-display text-[1.6rem] font-bold tracking-[-0.025em] text-[#0D1017] dark:text-[#F4F5F7] mb-6">
                    Stack grounded in shipped evidence
                  </h3>
                  <table className="w-full border-collapse border-t border-[#E2E6EE] dark:border-[#222631]">
                    <tbody className="divide-y divide-[#E2E6EE] dark:divide-[#222631]">
                      {CAPABILITIES.map((c) => (
                        <tr key={c.area}>
                          <th className="w-[34%] py-4 pr-4 text-left align-top text-[14px] font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                            {c.area}
                          </th>
                          <td className="py-4 text-[14px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8]">
                            {c.detail}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Education, Honors & Credentials */}
              <div className="mt-14 pt-12 border-t border-[#E2E6EE] dark:border-[#222631] grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-display text-[1.1rem] font-bold text-[#0D1017] dark:text-[#F4F5F7] mb-3">
                    Education
                  </h3>
                  <ul className="space-y-3 text-[14px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8]">
                    <li>
                      <strong className="block font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                        B.Tech, Computer Science &amp; Engineering
                      </strong>
                      REVA University, Bengaluru · 2017–2021 · CGPA 8.44 / 10
                    </li>
                    <li>
                      <strong className="block font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                        Best Outgoing Student &amp; GDSC Founder
                      </strong>
                      Founded Google Developer Student Club (GDSC) REVA and led student coordinators
                      for Smart India Hackathon 2020 internal round.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-display text-[1.1rem] font-bold text-[#0D1017] dark:text-[#F4F5F7] mb-3">
                    Hackathons &amp; Recognition
                  </h3>
                  <ul className="space-y-3 text-[14px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8]">
                    <li>
                      <strong className="block font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                        HackZurich Track Winner (YetiCoach)
                      </strong>
                      Sunrise, Huawei &amp; Swiss-Ski challenge · built collaboratively with Jackson Sunny.
                    </li>
                    <li>
                      <strong className="block font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                        NASA Space Apps Track Winner (Project Aegir)
                      </strong>
                      Satellite &amp; UAV computer vision for marine debris detection and trajectory coordination.
                    </li>
                    <li>
                      <strong className="block font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                        University Hackathon Honors
                      </strong>
                      2nd place HACKFEST 2019 &amp; KSIT Hackathon 2019 · Special Mention VIT Hack 2019 · Top 10 JEEVA Samrakshak 2020.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-display text-[1.1rem] font-bold text-[#0D1017] dark:text-[#F4F5F7] mb-3">
                    Certifications &amp; Independent Work
                  </h3>
                  <ul className="space-y-3 text-[14px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8]">
                    <li>
                      <strong className="block font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                        Hardware &amp; Edge AI Credentials
                      </strong>
                      NVIDIA Jetson AI Specialist · Intel Edge AI Specialist · Google TensorFlow Developer Certificate.
                    </li>
                    <li>
                      <strong className="block font-semibold text-[#0D1017] dark:text-[#F4F5F7]">
                        NeoFab.ai (Feb–Oct 2026, Discontinued)
                      </strong>
                      Founding member &amp; agent architecture lead for manufacturing facility planning
                      agents (station workflows, cycle-time &amp; Opex estimation).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 05: Contact */}
          <section
            id="contact"
            className="py-16 md:py-24 border-b border-[#E2E6EE] dark:border-[#222631] bg-[#F1F3F7] dark:bg-[#0E1015]"
          >
            <div className="max-w-[1200px] mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-end">
              <div>
                <p className="font-mono-tabular text-[13px] text-blue-600 dark:text-blue-400 mb-2">
                  05. Contact &amp; Collaboration
                </p>
                <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.85rem)] font-bold tracking-[-0.03em] leading-[1.12] text-balance-safe max-w-[22ch] text-[#0D1017] dark:text-[#F4F5F7] mb-4">
                  Working on a hard constraint in video, edge, or multimodal AI?
                </h2>
                <p className="text-[15.5px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8] max-w-[56ch] mb-7">
                  Based in Bengaluru, India. Always glad to talk shop on inference optimization,
                  efficient multimodal architectures, video infrastructure, applied research
                  collaborations, and hands-on principal or staff AI systems work.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="mailto:shubhambaid99@gmail.com"
                    className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-[14px] font-semibold whitespace-nowrap shrink-0 transition-colors"
                  >
                    Email Shubham
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-md border border-[#C8D0DE] dark:border-[#323847] hover:bg-white dark:hover:bg-[#12151C] text-[#0D1017] dark:text-[#F4F5F7] text-[14px] font-semibold whitespace-nowrap shrink-0 transition-colors"
                  >
                    {emailCopied ? "Copied email address" : "Copy email address"}
                  </button>
                  <a
                    href="/asset/Shubham_Baid.pdf"
                    download
                    className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-md border border-[#C8D0DE] dark:border-[#323847] hover:bg-white dark:hover:bg-[#12151C] text-[#0D1017] dark:text-[#F4F5F7] text-[14px] font-semibold whitespace-nowrap shrink-0 transition-colors"
                  >
                    Download Resume
                  </a>
                </div>
              </div>

              <div className="border-t border-[#E2E6EE] dark:border-[#222631]">
                {[
                  { label: "Email", value: "shubhambaid99@gmail.com", href: "mailto:shubhambaid99@gmail.com", external: false },
                  { label: "GitHub", value: "github.com/shubhambaid ↗", href: "https://github.com/shubhambaid", external: true },
                  { label: "Hugging Face", value: "huggingface.co/shubhambaid ↗", href: "https://huggingface.co/shubhambaid", external: true },
                  { label: "LinkedIn", value: "linkedin.com/in/shubhambaid21 ↗", href: "https://www.linkedin.com/in/shubhambaid21/", external: true },
                  { label: "X / Twitter", value: "@shubhamkahanhai ↗", href: "https://twitter.com/shubhamkahanhai", external: true },
                  { label: "Devpost", value: "devpost.com/shubhambaid ↗", href: "https://devpost.com/shubhambaid", external: true },
                ].map((row) => (
                  <a
                    key={row.label}
                    href={row.href}
                    target={row.external ? "_blank" : undefined}
                    rel={row.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between gap-4 min-h-[48px] py-2.5 border-b border-[#E2E6EE] dark:border-[#222631] text-[14.5px]"
                  >
                    <span className="font-mono-tabular text-[12.5px] text-[#667085] dark:text-[#6F7787]">
                      {row.label}
                    </span>
                    <span className="font-medium text-[#0D1017] dark:text-[#F4F5F7] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {row.value}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Quiet Footer */}
      <footer className="py-8 bg-[#F8F9FB] dark:bg-[#08090B]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 flex flex-wrap items-center justify-between gap-4 text-[13.5px] text-[#667085] dark:text-[#6F7787]">
          <div>© 2026 Shubham Baid · Bengaluru, India</div>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={openWriting}
              className="hover:text-[#0D1017] dark:hover:text-[#F4F5F7] transition-colors"
            >
              Writing &amp; Notes
            </button>
            <a
              href="/llmguide.html"
              className="hover:text-[#0D1017] dark:hover:text-[#F4F5F7] transition-colors"
            >
              LLM Testing &amp; Fine-Tuning Guide
            </a>
            <a
              href="https://shubhambaid.medium.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0D1017] dark:hover:text-[#F4F5F7] transition-colors"
            >
              Medium
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              className="min-h-[34px] px-3 py-1 rounded-md border border-[#E2E6EE] dark:border-[#222631] text-[12.5px] font-medium text-[#434B5C] dark:text-[#A2AAB8] hover:text-[#0D1017] dark:hover:text-[#F4F5F7] transition-colors"
            >
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </div>
      </footer>

      <CaseStudyModal study={selectedStudy} onClose={() => setSelectedStudy(null)} />
    </div>
  );
}

export default App;
