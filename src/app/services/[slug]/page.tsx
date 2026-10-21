import { existsSync } from "node:fs";
import path from "node:path";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ButtonLink } from "@/components/button";
import { PageHero } from "@/components/page-hero";
import { FAQSection } from "@/components/home/FaqSection";
import { ContactCta } from "@/components/home/ContactCta";
import { ServiceOverview } from "@/components/services/ServiceOverview";
import { ServiceProcess } from "@/components/services/ServiceProcess";
import { ServiceBenefits } from "@/components/services/ServiceBenefits";
import { ServiceNotice, ServiceRelated } from "@/components/services/ServiceExtras";
import { serviceHeroes } from "@/data/service-media";
import { site } from "@/data/site";
import { getService, getServiceStaticParams, services } from "@/data/services";

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

/** Service slug -> key in faqPageContent (unknown keys fall back to the home FAQs). */
const faqKeys: Record<string, string> = {
  "business-setup-services": "business-setup",
};

/** Only use the hero image if the file exists, otherwise fall back to the BrandArcs hero. */
function publicFileExists(src?: string) {
  return !!src && existsSync(path.join(process.cwd(), "public", src));
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
  const parentService = service.parentSlug
    ? services.find((item) => item.slug === service.parentSlug)
    : undefined;

  const heroSrc = serviceHeroes[service.slug];
  const heroImage = publicFileExists(heroSrc) ? heroSrc : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.shortTitle,
    description: service.metaDescription,
    areaServed: "AE",
    url: new URL(`/services/${service.slug}`, site.url).toString(),
    provider: {
      "@type": "ProfessionalService",
      name: site.legalName,
      url: site.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        title={service.heroTitle}
        description={service.short}
        backgroundImage={heroImage}
        overlay="light"
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

      <ServiceOverview slug={service.slug} />
      <ServiceProcess slug={service.slug} />
      {service.benefits && <ServiceBenefits slug={service.slug} />}
      {service.notice && <ServiceNotice slug={service.slug} />}
      <ServiceRelated slug={service.slug} />

      {/* White wrapper so the ContactCta fog transition blends like on the home page */}
      <div className="relative overflow-x-clip bg-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-16 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-brand-300/15 blur-3xl" />
          <div className="absolute -left-32 top-1/3 h-[360px] w-[360px] rounded-full bg-navy-300/20 blur-3xl" />
          <div className="absolute -right-32 bottom-24 h-[360px] w-[360px] rounded-full bg-brand-300/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
            style={{
              backgroundImage:
                "linear-gradient(#dfe5ec 1px, transparent 1px), linear-gradient(90deg, #dfe5ec 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>
        <FAQSection page={faqKeys[service.slug] ?? service.slug} />
      </div>

      <ContactCta
        heading={service.cta.heading}
        text="Tell us about your requirements. We will review your enquiry and confirm the scope, professional fees and any government or third-party charges before proceeding."
        enquiryHref={enquiryHref}
        enquiryLabel="Send an Enquiry"
      />
    </>
  );
}