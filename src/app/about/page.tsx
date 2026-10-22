import type { Metadata } from "next";

import { AboutPageContent } from "@/components/about/about-page-content";

export const metadata: Metadata = {
  title: "About LAAMIN",
  description:
    "LAAMIN Business Set Up Services L.L.C. provides professional business setup, PRO services, visa processing, document clearing, and UAE government transaction support through reliable service, transparent communication, and client-focused solutions.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutPageContent />;
}