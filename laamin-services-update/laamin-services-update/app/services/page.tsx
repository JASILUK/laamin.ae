import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { services, specialistServices } from "@/data/services";

export const metadata: Metadata = {
  title: "Business Setup, PRO, Visa & Document Services in Dubai | LAAMIN",
  description:
    "Explore LAAMIN's business setup, PRO and government services, visa and immigration support, and document clearing services in Dubai and across the UAE.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Business Support for Every Stage"
        description="Explore business setup, government-related administration, visa and immigration support, and document services for businesses and individuals in Dubai and across the UAE."
        crumbs={[{ label: "Services" }]}
      />

      <section className="py-8 lg:py-12">
        <Container>
          <div className="mb-10 max-w-3xl lg:mb-14">
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              LAAMIN coordinates business and administrative services around your requirements.
              Services may be requested individually or through an applicable monthly plan.
              Inclusions, professional fees, government charges and third-party costs are confirmed
              before engagement.
            </p>
          </div>

          <ul>
            {services.map((service, index) => (
              <li
                key={service.slug}
                className="grid gap-8 border-b border-line py-12 last:border-0 sm:py-14 lg:grid-cols-[5rem_1fr_1fr] lg:gap-12 lg:py-20"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-4xl leading-none text-brand-500 sm:text-5xl"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <span className="grid size-14 place-items-center bg-navy-900 text-brand-300">
                    <service.icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
                  </span>
                  <h2 className="mt-6 font-display text-2xl tracking-tight text-navy-900 sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                    {service.short}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group mt-7 inline-flex items-center gap-2 rounded-sm bg-navy-900 px-5 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-navy-700"
                  >
                    Explore service
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>

                <ul className="self-start border-t border-line">
                  {service.items.slice(0, 5).map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 border-b border-line py-3.5 text-sm leading-relaxed text-ink sm:text-[0.9375rem]"
                    >
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-700" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-y border-line bg-mist py-16 lg:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
              Specialist visa support
            </p>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-navy-900 sm:text-4xl">
              Support for specific visa needs
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Explore these focused services for more information. Availability and the support
              LAAMIN can provide are confirmed after reviewing each enquiry.
            </p>
          </div>

          <ul className="mt-9 grid gap-4 md:grid-cols-2">
            {specialistServices.map((service) => (
              <li key={service.slug} className="border border-line bg-white p-6 sm:p-8">
                <span className="grid size-12 place-items-center bg-navy-900 text-brand-300">
                  <service.icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display text-2xl text-navy-900">{service.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{service.short}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-brand-700"
                >
                  Explore service
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ContactCta
        heading="Not Sure Which Service You Need?"
        text="Tell us about your requirements. We will review your enquiry and clarify the relevant service options, scope and fees before proceeding."
      />
    </>
  );
}
