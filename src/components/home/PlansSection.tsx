import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { BrandArcs } from "@/components/brand-arcs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
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
          <ButtonLink href="/plans" variant="accent" className="self-start lg:self-auto">
            View All Plans
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <li key={plan.id}>
              <Link
                href={`/plans#${plan.id}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/60 hover:shadow-[0_20px_40px_-24px_rgba(2,26,51,0.35)] sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-700">
                    {plan.name} Plan
                  </h3>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 text-muted transition-colors group-hover:text-brand-700"
                  />
                </div>

                <p className="mt-6 font-display text-3xl tracking-tight text-navy-900 sm:text-4xl">
                  AED {plan.price.toLocaleString()}
                  <span className="ml-1 font-sans text-base text-muted">/month</span>
                </p>

                <p className="mt-3 text-sm text-muted">
                  Team size: {plan.employees} employees
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
