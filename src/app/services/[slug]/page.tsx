import { ArrowRight, Check, Info } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ButtonLink } from "@/components/button";
import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { ProcessSteps } from "@/components/process-steps";
import { Eyebrow, SectionHeading } from "@/components/section-heading";
import { getService, allServices, getServiceStaticParams, services } from "@/data/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return getServiceStaticParams();
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

  // Preserve old inbound links while making the new canonical URL consistent.
  if (service.slug !== slug) {
    permanentRedirect(`/services/${service.slug}`);
  }

  const enquiryHref = `/contact?service=${service.slug}`;
  const otherServices = allServices.filter((other) => other.slug !== service.slug);
  const parentService = service.parentSlug
    ? services.find((item) => item.slug === service.parentSlug)
    : undefined;

  return (
    <>
      <PageHero
        title={service.heroTitle}
        description={service.short}
        crumbs={[
          { label: "Services", href: "/services" },
          ...(parentService
            ? [{ label: parentService.shortTitle, href: `/services/${parentService.slug}` }]
            : []),
          { label: service.title },
        ]}
      >
        <ButtonLink href={enquiryHref} variant="accent">
          {service.cta.label}
          <ArrowRight aria-hidden="true" className="size-4" />
        </ButtonLink>
        <ButtonLink href="/plans" variant="outline-light">
          View Monthly Plans
        </ButtonLink>
      </PageHero>

      <section className="py-16 sm:py-20 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>{service.title}</Eyebrow>
            <p className="mt-6 font-display text-2xl leading-[1.3] tracking-tight text-navy-900 sm:text-[2rem]">
              {service.intro[0]}
            </p>
            {service.intro.slice(1).map((paragraph) => (
              <p key={paragraph} className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
                {paragraph}
              </p>
            ))}
            {parentService && (
              <Link
                href={`/services/${parentService.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-navy-900"
              >
                View all {parentService.shortTitle.toLowerCase()}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            )}
          </div>

          <div className="border border-line bg-white p-6 sm:p-8 lg:p-10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
              {service.itemsTitle}
            </h2>
            <ul className="mt-4">
              {service.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 border-b border-line py-4 text-sm font-medium leading-relaxed text-navy-900 last:border-0 last:pb-0 sm:text-base"
                >
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-mist py-16 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow={service.processTitle} title="A clear process, agreed with you" />
          <div className="mt-10 sm:mt-14">
            <ProcessSteps steps={service.process} />
          </div>
        </Container>
      </section>

      {service.benefits && (
        <section className="py-16 sm:py-20 lg:py-28">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading eyebrow="What to expect" title="Practical support, clearly scoped" />
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {service.benefits.map((benefit, index) => (
                <li key={benefit} className="bg-paper p-6 sm:p-8">
                  <span aria-hidden="true" className="font-display text-2xl text-brand-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-base font-semibold leading-relaxed text-navy-900 sm:mt-5 sm:text-lg">
                    {benefit}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {service.notice && (
        <section className="pb-16 sm:pb-20 lg:pb-24">
          <Container>
            <div
              role="note"
              className="flex flex-col gap-4 border border-brand-500/50 bg-white p-6 sm:flex-row sm:gap-5 sm:p-8 lg:p-10"
            >
              <Info aria-hidden="true" className="size-6 shrink-0 text-brand-700" />
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                  Important information
                </h2>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-navy-900 sm:text-lg">
                  {service.notice}
                </p>
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className="pb-16 sm:pb-20 lg:pb-28">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                Explore further
              </p>
              <h2 className="mt-3 font-display text-2xl tracking-tight text-navy-900 sm:text-3xl">
                {parentService ? "Related services" : "Other services"}
              </h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-brand-700">
              All services <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <ul className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {otherServices
              .filter((other) =>
                parentService
                  ? other.slug === parentService.slug || other.parentSlug === parentService.slug
                  : true,
              )
              .slice(0, 6)
              .map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/services/${other.slug}`}
                    className="group flex h-full items-center justify-between gap-4 bg-paper p-5 transition-colors hover:bg-white sm:p-6"
                  >
                    <span className="flex items-center gap-3">
                      <other.icon aria-hidden="true" className="size-5 shrink-0 text-brand-700" strokeWidth={1.5} />
                      <span className="font-semibold leading-snug text-navy-900">{other.title}</span>
                    </span>
                    <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-700" />
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
