"use client";

import { MotionConfig } from "framer-motion";

import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { AboutServicesDivider } from "@/components/home/AboutServicesDivider";
import { ServicesEditorialSection } from "@/components/home/ServicesEditorialSection";
import { ServicesBottomCutter } from "@/components/services-bottom-cutter";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { PlansSection } from "@/components/home/PlansSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ClientReviewsSection } from "@/components/home/ClientReviewsSection";
import { FAQSection } from "@/components/home/FaqSection";
import { ContactCta } from "@/components/home/ContactCta";
import { LaaminBrandRibbon } from "@/components/home/LaaminBrandRibbon";

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <HeroSection />
      <AboutSection />
      <AboutServicesDivider />
      <ServicesEditorialSection />
      <ServicesBottomCutter />
      <WhyChooseSection />

      <LaaminBrandRibbon />

      <PlansSection />

      {/* 🌟 CONTINUOUS BACKGROUND WRAPPER 🌟 */}
      <div className="relative overflow-x-clip bg-white">
        {/* Single Ambient Background for all 3 sections */}
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

        <ProcessSection />
        <ClientReviewsSection />
        <FAQSection page="home" /> 
        </div>

      <ContactCta />
    </MotionConfig>
  );
}