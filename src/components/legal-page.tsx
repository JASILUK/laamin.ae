import { FileWarning } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/data/site";
import { Container } from "./container";
import { PageHero } from "./page-hero";

export type LegalSection = { heading: string; body: ReactNode };

export function LegalPage({
  title,
  description,
  sections,
}: {
  title: string;
  description: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero title={title} description={description} crumbs={[{ label: title }]} />
      <section className="py-16 lg:py-24">
        <Container className="max-w-4xl">
          {site.legalPagesAreDraft && (
            <p
              role="note"
              className="mb-12 flex gap-3 border border-brand-500/50 bg-white p-5 text-sm leading-relaxed text-ink"
            >
              <FileWarning aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-700" />
              <span>
                <strong className="font-semibold">Draft.</strong> This page is a draft pending
                review and approval by {site.legalName} and is not yet final.
              </span>
            </p>
          )}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <section key={section.heading} className="grid gap-4 sm:grid-cols-[3rem_1fr]">
                <span aria-hidden="true" className="font-display text-2xl text-brand-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-display text-3xl tracking-tight text-navy-900">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 leading-relaxed text-muted [&_a]:font-semibold [&_a]:text-navy-900 [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">
                    {section.body}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
