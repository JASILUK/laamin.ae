import { ArrowRight, Check, Info } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button";
import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { ProcessSteps } from "@/components/process-steps";
import { Eyebrow, SectionHeading } from "@/components/section-heading";
import { getService, services } from "@/data/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.heroTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const enquiryHref = `/contact?service=${service.slug}`;
  const otherServices = services.filter((other) => other.slug !== service.slug);

  return (
    <>
      <PageHero
        title={service.heroTitle}
        description={service.short}
        crumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
      >
        <ButtonLink href={enquiryHref} variant="accent">
          {service.cta.label}
          <ArrowRight aria-hidden="true" className="size-4" />
        </ButtonLink>
        <ButtonLink href="/plans" variant="outline-light">
          View Monthly Plans
        </ButtonLink>
      </PageHero>

      {/* Introduction and service list */}
      <section className="py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>{service.title}</Eyebrow>
            <p className="mt-6 font-display text-2xl leading-[1.3] tracking-tight text-navy-900 sm:text-[2rem]">
              {service.intro[0]}
            </p>
            {service.intro.slice(1).map((paragraph) => (
              <p key={paragraph} className="mt-6 text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="border border-line bg-white p-8 sm:p-10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
              {service.itemsTitle}
            </h2>
            <ul className="mt-4">
              {service.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 border-b border-line py-4 font-medium text-navy-900 last:border-0 last:pb-0"
                >
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="border-y border-line bg-mist py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow={service.processTitle} title="Four steps, agreed with you" />
          <div className="mt-14">
            <ProcessSteps steps={service.process} />
          </div>
        </Container>
      </section>

      {/* Benefits */}
      {service.benefits && (
        <section className="py-20 lg:py-28">
          <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading eyebrow="Benefits" title="What you can expect" />
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {service.benefits.map((benefit, index) => (
                <li key={benefit} className="bg-paper p-8">
                  <span aria-hidden="true" className="font-display text-2xl text-brand-700">
                    0{index + 1}
                  </span>
                  <p className="mt-5 text-lg font-semibold text-navy-900">{benefit}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Important notice */}
      {service.notice && (
        <section className="pt-20 lg:pt-28">
          <Container>
            <div
              role="note"
              className="flex flex-col gap-5 border border-brand-500/50 bg-white p-8 sm:flex-row sm:p-10"
            >
              <Info aria-hidden="true" className="size-7 shrink-0 text-brand-700" />
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                  Important notice
                </h2>
                <p className="mt-3 max-w-3xl font-display text-xl leading-snug text-navy-900">
                  {service.notice}
                </p>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Other services */}
      <section className="pt-20 lg:pt-28">
        <Container>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
            Other services
          </h2>
          <ul className="mt-6 grid gap-px border border-line bg-line md:grid-cols-3">
            {otherServices.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/services/${other.slug}`}
                  className="group flex h-full items-center justify-between gap-4 bg-paper p-6 transition-colors hover:bg-white"
                >
                  <span className="flex items-center gap-4">
                    <other.icon aria-hidden="true" className="size-5 text-brand-700" strokeWidth={1.5} />
                    <span className="font-semibold text-navy-900">{other.title}</span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-700"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ContactCta
        heading={service.cta.heading}
        enquiryHref={enquiryHref}
        enquiryLabel="Send an Enquiry"
      />
    </>
  );
}
