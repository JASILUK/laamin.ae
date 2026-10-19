import { ArrowRight } from "lucide-react";

import { BrandArcs } from "@/components/brand-arcs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PlanCard } from "@/components/pricing/plan-card";
import { plans } from "@/lib/data";

export function PlansSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 text-ink lg:py-28">
      <BrandArcs className="inset-0 size-full text-brand-400/[0.06]" />

      <Container className="relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Monthly plans"
            title="Six plans for different team sizes"
            description="Monthly fees cover LAAMIN’s professional service charges. Government and third-party costs are billed separately at actual cost."
          />
          <ButtonLink
            href="/plans"
            variant="accent"
            className="self-start lg:self-auto"
          >
            View All Plans
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <li key={plan.id}>
              <PlanCard plan={plan} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}