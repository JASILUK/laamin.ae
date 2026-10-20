import type { Metadata } from "next";

import { AboutPageContent } from "@/components/about/about-page-content";

export const metadata: Metadata = {
  title: "About LAAMIN",
  description:
    "LAAMIN BUSINESS SET UP SERVICES L.L.C is a Dubai-based business support and administrative services provider, working with companies in Dubai and across the UAE.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutPageContent />;
}