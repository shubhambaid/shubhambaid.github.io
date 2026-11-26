import React, { useEffect } from "react";
import { X } from "lucide-react";
import type { CaseStudy } from "../data/portfolioData";

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ study, onClose }) => {
  useEffect(() => {
    if (!study) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [study, onClose]);

  if (!study) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[760px] max-h-[88vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#12151C] border border-[#C8D0DE] dark:border-[#323847] p-6 sm:p-8 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-6 pb-5 mb-6 border-b border-[#E2E6EE] dark:border-[#222631]">
          <div>
            <p className="font-mono-tabular text-[12.5px] text-blue-600 dark:text-blue-400 mb-1.5">
              {study.kickerAccent} · {study.kickerRest}
            </p>
            <h3
              id="case-study-modal-title"
              className="font-display text-[1.5rem] sm:text-[1.7rem] font-bold tracking-[-0.025em] leading-tight text-[#0D1017] dark:text-[#F4F5F7]"
            >
              {study.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="w-10 h-10 shrink-0 rounded-md border border-[#E2E6EE] dark:border-[#222631] inline-flex items-center justify-center text-[#434B5C] dark:text-[#A2AAB8] hover:text-[#0D1017] dark:hover:text-[#F4F5F7] hover:bg-[#F8F9FB] dark:hover:bg-[#171B24] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-mono-tabular text-[12px] font-semibold text-[#667085] dark:text-[#6F7787] mb-2">
              The Bottleneck
            </h4>
            <p className="text-[15px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8]">
              {study.bottleneck}
            </p>
          </div>

          <div>
            <h4 className="font-mono-tabular text-[12px] font-semibold text-[#667085] dark:text-[#6F7787] mb-2">
              Architecture &amp; Engineering
            </h4>
            <ul className="space-y-2 text-[15px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8]">
              {study.architecture.map((line) => (
                <li key={line} className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[#667085]">
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono-tabular text-[12px] font-semibold text-[#667085] dark:text-[#6F7787] mb-2">
              Measured Results &amp; Scope
            </h4>
            <ul className="space-y-2 text-[15px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8]">
              {study.results.map((line) => (
                <li key={line} className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[#667085]">
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono-tabular text-[12px] font-semibold text-[#667085] dark:text-[#6F7787] mb-2">
              Scope &amp; Honest Limitations
            </h4>
            <p className="text-[14.5px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8]">
              {study.caveats}
            </p>
          </div>

          <div className="pt-5 border-t border-[#E2E6EE] dark:border-[#222631] flex flex-wrap gap-3">
            {study.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                download={link.download || undefined}
                className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-md border border-[#C8D0DE] dark:border-[#323847] text-[13.5px] font-semibold text-[#0D1017] dark:text-[#F4F5F7] hover:bg-[#F8F9FB] dark:hover:bg-[#171B24] whitespace-nowrap shrink-0 transition-colors"
              >
                {link.label} &rarr;
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
