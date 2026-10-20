import type { Metadata } from "next";

import { PlansPageContent } from "@/components/pricing/plans-page-content";

export const metadata: Metadata = {
  title: "Monthly Business Support Plans",
  description:
    "Six monthly business support plans from LAAMIN, from AED 800 to AED 10,000 per month, for businesses with different administrative requirements.",
  alternates: { canonical: "/plans" },
};

export default function PlansPage() {
  return <PlansPageContent />;
}