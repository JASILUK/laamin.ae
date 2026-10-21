import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { ServicesShowcase } from "@/components/services/ServicesShowcase";
import { FAQSection } from "@/components/home/FaqSection";
import { ContactCta } from "@/components/home/ContactCta";

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
  backgroundImage="/images/services/hero.jpg"
  overlay="light"
/>

      <ServicesShowcase />

      {/* Same continuous background wrapper as the home page so the
          ContactCta fog transition blends from white correctly */}
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
        <FAQSection page="services" />
      </div>

      <ContactCta />
    </>
  );
}