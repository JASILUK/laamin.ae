import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { FaqList } from "@/components/faq-list";
import { BrandArcs } from "@/components/brand-arcs";
import { ProcessSteps } from "@/components/process-steps";
import { Eyebrow, SectionHeading } from "@/components/section-heading";
import { homeFaqs } from "@/data/faqs";
import { formatPrice, plans } from "@/data/plans";
import { services } from "@/data/services";
import { processSteps, reasons } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const focusAreas = [
  "Business support",
  "Government-related administrative processes",
  "Employment and visa documentation",
  "Licensing administration",
  "Document services",
];

const heroFacts = [
  { label: "Office", value: "City Centre Deira, Dubai" },
  { label: "Coverage", value: "Dubai and across the UAE" },
  { label: "Monthly plans", value: "Six plans from AED 800" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <BrandArcs className="inset-0 size-full text-brand-400/30" />
        <Container className="relative grid items-center gap-14 pb-16 pt-16 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-24 lg:pt-28">
          <div>
            <Eyebrow light>Dubai · United Arab Emirates</Eyebrow>
            <h1 className="mt-7 font-display text-[2.5rem] leading-[1.08] tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]">
              Business Support That <span className="text-brand-400">Moves You Forward</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-navy-300">
              LAAMIN provides business setup and administrative support in Dubai and across the
              UAE — from licensing administration and PRO services to visa processing and document
              clearing.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/services" variant="accent">
                Explore Our Services
                <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline-light">
                Contact Us
              </ButtonLink>
            </div>
          </div>

          <div className="border border-white/15 bg-white/5 p-2">
            <div className="bg-paper text-ink">
              <p className="flex items-center justify-between border-b border-line px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                <span>What we handle</span>
                <span aria-hidden="true">01 — 04</span>
              </p>
              <ul>
                {services.map((service, index) => (
                  <li key={service.slug} className="border-b border-line">
                    <Link
                      href={`/services/${service.slug}`}
                      className="group flex items-center gap-5 px-6 py-5 transition-colors hover:bg-mist"
                    >
                      <span aria-hidden="true" className="font-display text-lg text-brand-700">
                        0{index + 1}
                      </span>
                      <span className="flex-1 text-lg font-semibold text-navy-900">
                        {service.title}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-5 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-700"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="flex items-center gap-2.5 px-6 py-4 text-sm text-muted">
                <MapPin aria-hidden="true" className="size-4 text-brand-700" />
                Tanvi Business Center, City Centre Deira
              </p>
            </div>
          </div>
        </Container>

        <div className="relative border-t border-white/10">
          <Container>
            <dl className="grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {heroFacts.map((fact) => (
                <div key={fact.label} className="py-6 sm:px-8 sm:first:pl-0">
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-base text-white">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </section>

      {/* Company introduction */}
      <section className="py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>About LAAMIN</Eyebrow>
            <p className="mt-6 font-display text-2xl leading-[1.3] tracking-tight text-navy-900 sm:text-[2rem]">
              LAAMIN BUSINESS SET UP SERVICES L.L.C is a Dubai-based provider of business support
              and administrative services.
            </p>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-muted">
              We help companies manage the paperwork, applications and follow-up that come with
              operating in the UAE, so requirements are handled in an organised way and you always
              know where things stand.
            </p>
            <ul className="mt-8 border-t border-line">
              {focusAreas.map((area, index) => (
                <li key={area} className="flex items-baseline gap-5 border-b border-line py-4">
                  <span aria-hidden="true" className="font-display text-sm text-brand-700">
                    0{index + 1}
                  </span>
                  <span className="font-medium text-navy-900">{area}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 underline decoration-brand-500 decoration-2 underline-offset-8 hover:text-brand-700"
            >
              More about LAAMIN
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Main services */}
      <section className="border-y border-line bg-mist py-20 lg:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Our services"
              title="Four areas of business support"
              description="Each service is available on its own or as part of a monthly plan."
            />
            <ButtonLink href="/services" variant="outline" className="self-start lg:self-auto">
              All Services
            </ButtonLink>
          </div>

          <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
            {services.map((service, index) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col bg-paper p-8 transition-colors hover:bg-white sm:p-10"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid size-14 place-items-center bg-navy-900 text-brand-300">
                      <service.icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
                    </span>
                    <span aria-hidden="true" className="font-display text-lg text-brand-700">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl tracking-tight text-navy-900">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md flex-1 leading-relaxed text-muted">{service.short}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 group-hover:text-brand-700">
                    View service
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Why choose LAAMIN */}
      <section className="py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="Why choose LAAMIN"
            title="Organised support, clearly communicated"
            className="lg:sticky lg:top-32 lg:self-start"
          />
          <ol className="border-t border-line">
            {reasons.map((reason, index) => (
              <li
                key={reason.title}
                className="grid gap-x-8 gap-y-2 border-b border-line py-8 sm:grid-cols-[3rem_1fr]"
              >
                <span aria-hidden="true" className="font-display text-2xl text-brand-700">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-navy-900">{reason.title}</h3>
                  <p className="mt-2 max-w-lg leading-relaxed text-muted">{reason.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Monthly plans preview */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
        <BrandArcs className="inset-0 size-full text-brand-400/20" />
        <Container className="relative">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              light
              eyebrow="Monthly plans"
              title="Six plans for different team sizes"
              description="Monthly fees cover LAAMIN’s professional service charges. Government and third-party costs are billed separately at actual cost."
            />
            <ButtonLink href="/plans" variant="accent" className="self-start lg:self-auto">
              View All Plans
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          </div>

          <ul className="mt-14 grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <li key={plan.id}>
                <Link
                  href={`/plans#${plan.id}`}
                  className="group flex h-full flex-col bg-navy-900 p-7 transition-colors hover:bg-navy-800 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-400">
                      {plan.name}
                    </h3>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 text-navy-300 transition-colors group-hover:text-brand-300"
                    />
                  </div>
                  <p className="mt-6 font-display text-3xl tracking-tight sm:text-4xl">
                    {formatPrice(plan.price)}
                    <span className="ml-1 font-sans text-base text-navy-300">/month</span>
                  </p>
                  <p className="mt-3 text-sm text-navy-300">{plan.employees} employees</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="How it works" title="From first contact to agreed service" />
          <div className="mt-14">
            <ProcessSteps steps={processSteps} />
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="border-t border-line bg-mist py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="FAQs"
            title="Frequently asked questions"
            description="If your question is not covered here, contact us and we will be glad to help."
            className="lg:sticky lg:top-32 lg:self-start"
          />
          <FaqList faqs={homeFaqs} />
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
