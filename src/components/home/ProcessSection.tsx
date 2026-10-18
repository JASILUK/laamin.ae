import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data";

function ProcessStepsComponent({ steps }: { steps: typeof processSteps }) {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {steps.map((step, idx) => (
        <div key={step.title} className="relative border border-line bg-paper p-8">
          <span className="font-display text-3xl text-brand-700">0{idx + 1}</span>
          <h3 className="mt-4 font-display text-xl text-navy-900">{step.title}</h3>
          <p className="mt-2 text-muted leading-relaxed">{step.text}</p>
        </div>
      ))}
    </div>
  );
}

export function ProcessSection() {
  return (
    <section className="py-20 lg:py-28 bg-white text-ink">
      <Container>
        <SectionHeading eyebrow="How it works" title="From first contact to agreed service" />
        <div className="mt-14">
          <ProcessStepsComponent steps={processSteps} />
        </div>
      </Container>
    </section>
  );
}
