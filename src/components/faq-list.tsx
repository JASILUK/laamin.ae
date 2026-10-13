import { Plus } from "lucide-react";
import type { Faq } from "@/data/faqs";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="border-t border-line">
      {faqs.map((faq) => (
        <details key={faq.question} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-medium text-navy-900 transition-colors hover:text-brand-700">
            {faq.question}
            <Plus
              aria-hidden="true"
              className="size-5 shrink-0 text-brand-700 transition-transform duration-300 group-open:rotate-45"
            />
          </summary>
          <p className="max-w-2xl pb-7 leading-relaxed text-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
