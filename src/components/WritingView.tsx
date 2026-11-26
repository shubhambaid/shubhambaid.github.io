import React from "react";
import { WRITING_ITEMS } from "../data/portfolioData";

interface WritingViewProps {
  onBack: () => void;
}

export const WritingView: React.FC<WritingViewProps> = ({ onBack }) => {
  return (
    <main>
      <section className="py-14 md:py-20 border-b border-[#E2E6EE] dark:border-[#222631]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center min-h-[40px] text-[14px] font-semibold text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 mb-6"
          >
            &larr; Back to Portfolio
          </button>

          <p className="font-mono-tabular text-[13px] text-blue-600 dark:text-blue-400 mb-2">
            Technical Writing &amp; Research Notes
          </p>
          <h1 className="font-display text-[clamp(2.1rem,4vw,3.3rem)] font-bold tracking-[-0.03em] leading-[1.1] text-balance-safe text-[#0D1017] dark:text-[#F4F5F7] mb-4">
            Papers, model cards &amp; field guides
          </h1>
          <p className="text-[16px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8] max-w-[60ch]">
            Empirical investigations into video compression for machine perception, mixed-precision
            quantization on Apple Silicon, single-pass decision models, and practical inference optimization.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="border-t border-[#E2E6EE] dark:border-[#222631]">
            {WRITING_ITEMS.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="group grid grid-cols-1 md:grid-cols-[170px_1fr_auto] gap-3 md:gap-8 py-7 border-b border-[#E2E6EE] dark:border-[#222631] items-baseline"
              >
                <div className="font-mono-tabular text-[13px] text-[#667085] dark:text-[#6F7787]">
                  {item.date} · {item.format}
                </div>
                <div>
                  <h2 className="font-display text-[1.22rem] font-bold tracking-[-0.015em] text-[#0D1017] dark:text-[#F4F5F7] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5">
                    {item.title}
                  </h2>
                  <p className="text-[14.5px] leading-relaxed text-[#434B5C] dark:text-[#A2AAB8] max-w-[68ch]">
                    {item.description}
                  </p>
                </div>
                <span className="text-[14px] font-semibold text-[#434B5C] dark:text-[#A2AAB8] group-hover:text-blue-600 dark:group-hover:text-blue-400 whitespace-nowrap transition-colors">
                  {item.cta} {item.external ? "↗" : "→"}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
