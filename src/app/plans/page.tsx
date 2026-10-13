import { ArrowRight, Info, Users } from "lucide-react";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { FaqList } from "@/components/faq-list";
import { PageHero } from "@/components/page-hero";
import { PlanInclusions } from "@/components/plan-inclusions";
import { SectionHeading } from "@/components/section-heading";
import { planFaqs } from "@/data/faqs";
import { agreementNotice, formatPrice, plans, pricingNotice } from "@/data/plans";

export const metadata: Metadata = {
  title: "Monthly Business Support Plans",
  description:
    "Six monthly business support plans from LAAMIN, from AED 800 to AED 10,000 per month, for businesses with different administrative requirements.",
  alternates: { canonical: "/plans" },
};

export default function PlansPage() {
  return (
    <>
      <PageHero
        title="Monthly Business Support Plans"
        description="LAAMIN offers six plans with different service levels, for businesses with different administrative requirements."
        crumbs={[{ label: "Monthly Plans" }]}
      />

      {/* Plan comparison */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Compare plans"
            title="Six plans at a glance"
            description="Plans are organised by employee range. Select a plan to see its inclusions."
          />

          <div className="mt-12 border border-line bg-white">
            <div
              aria-hidden="true"
              className="hidden grid-cols-[1fr_1fr_1fr_auto] gap-6 border-b border-line px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted md:grid"
            >
              <span>Plan</span>
              <span>Employees</span>
              <span>Monthly fee</span>
              <span className="w-36" />
            </div>
            <ul>
              {plans.map((plan) => (
                <li key={plan.id} className="border-b border-line last:border-0">
                  <a
                    href={`#${plan.id}`}
                    className="group grid grid-cols-2 items-center gap-x-6 gap-y-1 px-6 py-5 transition-colors hover:bg-mist md:grid-cols-[1fr_1fr_1fr_auto] md:px-8"
                  >
                    <span className="font-display text-2xl text-navy-900">{plan.name}</span>
                    <span className="row-start-2 text-sm text-muted md:row-start-auto md:text-base md:text-ink">
                      {plan.employees} employees
                    </span>
                    <span className="row-span-2 text-right md:row-span-1 md:text-left">
                      <span className="text-lg font-semibold text-navy-900">
                        {formatPrice(plan.price)}
                      </span>
                      <span className="text-sm text-muted">/month</span>
                    </span>
                    <span className="hidden w-36 items-center justify-end gap-2 text-sm font-semibold text-navy-900 group-hover:text-brand-700 md:inline-flex">
                      View inclusions
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 flex gap-3 text-sm leading-relaxed text-muted">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-700" />
            {agreementNotice}
          </p>
        </Container>
      </section>

      {/* Plan details */}
      <section className="border-y border-line bg-mist py-8 lg:py-12">
        <Container>
          {plans.map((plan) => (
            <article
              key={plan.id}
              id={plan.id}
              aria-labelledby={`${plan.id}-title`}
              className="grid gap-10 border-b border-line py-14 last:border-0 lg:grid-cols-[22rem_1fr] lg:gap-16 lg:py-20"
            >
              <div className="lg:sticky lg:top-32 lg:self-start">
                <div className="bg-navy-900 p-8 text-white">
                  <h2
                    id={`${plan.id}-title`}
                    className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-400"
                  >
                    {plan.name} Plan
                  </h2>
                  <p className="mt-6 font-display text-4xl tracking-tight">
                    {formatPrice(plan.price)}
                    <span className="ml-1 font-sans text-base text-navy-300">/month</span>
                  </p>
                  <p className="mt-5 flex items-center gap-2.5 border-t border-white/15 pt-5 text-sm text-navy-300">
                    <Users aria-hidden="true" className="size-4 text-brand-400" />
                    Employee range: <span className="font-semibold text-white">{plan.employees}</span>
                  </p>
                  <ButtonLink
                    href={`/contact?plan=${plan.id}`}
                    variant="accent"
                    className="mt-7 w-full"
                    aria-label={`Enquire about the ${plan.name} Plan`}
                  >
                    Enquire About This Plan
                  </ButtonLink>
                </div>
                <p className="mt-5 leading-relaxed text-muted">{plan.summary}</p>
              </div>

              <div>
                <h3 className="border-b border-navy-900 pb-4 text-xs font-semibold uppercase tracking-[0.22em] text-navy-900">
                  Services in the {plan.name} Plan
                </h3>
                <PlanInclusions planName={plan.name} services={plan.services} />
              </div>
            </article>
          ))}
        </Container>
      </section>

      {/* Pricing notice */}
      <section className="py-20 lg:py-28">
        <Container>
          <div
            role="note"
            className="grid gap-8 border border-brand-500/50 bg-white p-8 sm:p-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16"
          >
            <div>
              <Info aria-hidden="true" className="size-7 text-brand-700" />
              <h2 className="mt-5 font-display text-3xl tracking-tight text-navy-900">
                Important pricing notice
              </h2>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-ink">{pricingNotice}</p>
              <p className="mt-5 leading-relaxed text-muted">{agreementNotice}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Plan FAQs */}
      <section className="border-t border-line bg-mist py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="Plan FAQs"
            title="Questions about the plans"
            className="lg:sticky lg:top-32 lg:self-start"
          />
          <FaqList faqs={planFaqs} />
        </Container>
      </section>

      <ContactCta
        heading="Not Sure Which Plan Fits?"
        text="Tell us about your team size and requirements, and we will discuss the appropriate plan with you."
        enquiryHref="/contact?service=monthly-plans"
      />
    </>
  );
}
