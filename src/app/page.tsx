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
import { FaqSection } from "@/components/home/FaqSection";
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
      <ProcessSection />
      <FaqSection />
      <ContactCta />
    </MotionConfig>
  );
}
