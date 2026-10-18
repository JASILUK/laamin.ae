import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeFaqs } from "@/lib/data";

function FaqList({ faqs }: { faqs: typeof homeFaqs }) {
  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <details key={idx} className="group border border-line bg-paper p-6 transition-all">
          <summary className="flex cursor-pointer items-center justify-between font-display text-lg text-navy-900">
            {faq.q}
            <span className="ml-4 transition-transform group-open:rotate-45 text-brand-700 font-bold">+</span>
          </summary>
          <p className="mt-4 text-muted leading-relaxed">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqSection() {
  return (
    <section className="border-t border-line bg-mist py-20 lg:py-28 text-ink">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          eyebrow="FAQs"
          title="Frequently asked questions"
          description="If your question is not covered here, contact us at info.laamin@gmail.com and we will be glad to help."
          className="lg:sticky lg:top-32 lg:self-start"
        />
        <FaqList faqs={homeFaqs} />
      </Container>
    </section>
  );
}
