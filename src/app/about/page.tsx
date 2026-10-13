import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Eyebrow, SectionHeading } from "@/components/section-heading";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About LAAMIN",
  description:
    "LAAMIN BUSINESS SET UP SERVICES L.L.C is a Dubai-based business support and administrative services provider.",
  alternates: { canonical: "/about" },
};

const focusAreas = [
  {
    title: "Business support",
    text: "Day-to-day administrative support for companies operating in the UAE.",
  },
  {
    title: "Government-related processes",
    text: "Coordination of government-related administrative processes and follow-ups.",
  },
  {
    title: "Employment and visa documentation",
    text: "Documentation for work permits, labour processes and visa applications.",
  },
  {
    title: "Licensing administration",
    text: "Trade licence applications, amendments, renewals and related updates.",
  },
  {
    title: "Document services",
    text: "Letter drafting, translation support and document coordination.",
  },
];

const approach = [
  {
    title: "Clear communication",
    text: "We explain what is required at each stage and keep you informed as things progress.",
  },
  {
    title: "Organised documentation",
    text: "Documents are collected, checked and kept in order so each process has what it needs.",
  },
  {
    title: "Practical administrative support",
    text: "We focus on the tasks that need to be done and the steps that move them along.",
  },
  {
    title: "Process coordination and follow-up",
    text: "Each application or request is coordinated and followed up, not left to stall.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About LAAMIN"
        description="A Dubai-based business support and administrative services provider, working with companies in Dubai and across the UAE."
        crumbs={[{ label: "About" }]}
      />

      {/* Company overview */}
      <section className="py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Company overview</Eyebrow>
            <p className="mt-6 font-display text-2xl leading-[1.3] tracking-tight text-navy-900 sm:text-[2rem]">
              {site.legalName} supports businesses with the administration that keeps them
              operating.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              From our office in City Centre Deira, we assist companies with business support,
              government-related administrative processes, employment and visa documentation,
              licensing administration and document services.
            </p>
          </div>
          <ul className="border-t border-line">
            {focusAreas.map((area, index) => (
              <li
                key={area.title}
                className="grid gap-x-8 gap-y-2 border-b border-line py-7 sm:grid-cols-[3rem_1fr]"
              >
                <span aria-hidden="true" className="font-display text-2xl text-brand-700">
                  0{index + 1}
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-navy-900">{area.title}</h2>
                  <p className="mt-2 leading-relaxed text-muted">{area.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Our approach */}
      <section className="border-y border-line bg-mist py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our approach"
            title="How we work with clients"
            description="Four principles shape the way we handle every requirement."
          />
          <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((item, index) => (
              <li key={item.title} className="bg-paper p-8">
                <span aria-hidden="true" className="font-display text-3xl text-brand-700">
                  0{index + 1}
                </span>
                <h3 className="mt-8 text-lg font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Our commitment */}
      <section className="py-20 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading eyebrow="Our commitment" title="Responsive support, organised delivery" />
          <div className="border-l-2 border-brand-500 pl-8">
            <p className="font-display text-xl leading-snug text-navy-900 sm:text-2xl">
              We aim to respond promptly, keep your documents and processes in order, and deliver
              the services we have agreed with you.
            </p>
            <p className="mt-6 max-w-xl leading-relaxed text-muted">
              Before any work begins, we confirm the service scope and fees with you. All
              applications remain subject to the requirements and decisions of the relevant
              authorities, and we will always be clear about that.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/services" variant="navy">
                Our Services
              </ButtonLink>
              <ButtonLink href="/plans" variant="outline">
                Monthly Plans
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <ContactCta
        heading="Discuss Your Requirements With LAAMIN"
        text="Tell us about your business and the support you need. We will discuss the appropriate service or plan with you."
      />
    </>
  );
}
