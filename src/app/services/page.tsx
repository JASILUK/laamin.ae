import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Business setup services, PRO services, visa processing support and document clearing in Dubai and across the UAE.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        description="LAAMIN provides four main areas of business support for companies in Dubai and across the UAE. Each is available individually or as part of a monthly plan."
        crumbs={[{ label: "Services" }]}
      />

      <section className="py-8 lg:py-12">
        <Container>
          <ul>
            {services.map((service, index) => (
              <li
                key={service.slug}
                className="grid gap-8 border-b border-line py-14 last:border-0 lg:grid-cols-[5rem_1fr_1fr] lg:gap-12 lg:py-20"
              >
                <span aria-hidden="true" className="font-display text-5xl leading-none text-brand-500">
                  0{index + 1}
                </span>
                <div>
                  <span className="grid size-14 place-items-center bg-navy-900 text-brand-300">
                    <service.icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
                  </span>
                  <h2 className="mt-6 font-display text-3xl tracking-tight text-navy-900">
                    {service.title}
                  </h2>
                  <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{service.short}</p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group mt-8 inline-flex items-center gap-2 rounded-sm bg-navy-900 px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-navy-700"
                  >
                    View {service.title}
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
                      className="flex gap-3 border-b border-line py-3.5 text-[0.9375rem] text-ink"
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

      <ContactCta
        heading="Enquire About Your Requirements"
        text="Not sure which service applies? Tell us what you need and we will point you to the right one."
      />
    </>
  );
}
