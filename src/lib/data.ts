import {
  Building2,
  FileText,
  BadgeCheck,
  ShieldCheck,
  Briefcase,
  Globe,
  MapPin,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/* ---------- Hero headline ---------- */

export const heroHeadline = {
  lead: "Business Support That",
  accent: "Moves You Forward.",
};
export const headlineText = `${heroHeadline.lead} ${heroHeadline.accent}`;

/* ---------- Services ---------- */

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  short: string;
  summary: string;
  icon: LucideIcon;
  listLabel: string;
  details: string[];
};

export const services: Service[] = [
  {
    slug: "business-setup-services",
    title: "Business Setup Services",
    shortTitle: "Business Setup",
    short:
      "Start and structure your business with support for company formation and licensing in the UAE and selected international jurisdictions.",
    summary:
      "From choosing a suitable business structure to navigating formation and licensing procedures, we help simplify the administrative steps involved in establishing your business.",
    icon: Building2,
    listLabel: "Company formation support",
    details: [
      "UAE Mainland Company Setup",
      "UAE Free Zone Company Setup",
      "US Company Formation",
      "International Formation in Selected Jurisdictions",
    ],
  },
  {
    slug: "pro-services",
    title: "PRO Services",
    shortTitle: "PRO Services",
    short:
      "Practical administrative support for government-related procedures, document attestation, approvals, and business compliance requirements in the UAE.",
    summary:
      "We help businesses navigate essential administrative procedures through document coordination, relevant applications, and support with applicable government processes.",
    icon: ShieldCheck,
    listLabel: "PRO support includes",
    details: [
      "Labour and Immigration File Support",
      "Document Attestation and Notary Coordination",
      "Ejari and Tenancy Registration Assistance",
      "Applicable Government Approvals",
    ],
  },
  {
    slug: "visa-processing",
    title: "Visa Processing",
    shortTitle: "Visa Processing",
    short:
      "Visa application assistance for individuals, families, and businesses, including residence, employment, Family Visa, and Golden Visa support.",
    summary:
      "We assist with applicable visa procedures and related administrative requirements, helping applicants understand the process and coordinate the necessary documentation.",
    icon: BadgeCheck,
    listLabel: "Visa assistance includes",
    details: [
      "Residence Visa Assistance",
      "Employment Visa and Permit Coordination",
      "Family Visa and Dependent Sponsorship",
      "Golden Visa Application Assistance",
      "Medical Fitness and Emirates ID Coordination",
    ],
  },
  {
    slug: "document-clearing",
    title: "Document Clearing",
    shortTitle: "Document Clearing",
    short:
      "Document processing and submission coordination to help individuals and businesses navigate applicable UAE administrative procedures.",
    summary:
      "We support the preparation, coordination, and submission of relevant documents for applicable procedures involving UAE government departments and authorities.",
    icon: FileText,
    listLabel: "Document coordination includes",
    details: [
      "Department of Economy Procedures",
      "Ministry of Foreign Affairs Attestation",
      "Municipal Documentation and Approvals",
      "Government Document Submission Support",
    ],
  },
];

/* ---------- Misc data ---------- */

export const internationalJurisdictions = [
  { country: "United States (US)", type: "Delaware / Wyoming LLC", timeline: "3-5 Days" },
  { country: "Singapore", type: "ACRA Corporate Entity", timeline: "2-4 Days" },
  { country: "Saudi Arabia (KSA)", type: "MISA & Commercial Reg.", timeline: "5-10 Days" },
  { country: "Qatar", type: "QFC & Mainland Setup", timeline: "7-12 Days" },
  { country: "Oman", type: "MOCI Registration", timeline: "5-7 Days" },
  { country: "Cayman Islands", type: "Offshore Exempted Company", timeline: "3-5 Days" },
  { country: "Panama", type: "International Business Corp.", timeline: "4-6 Days" },
];

export const focusAreas = [
  "Business support & global formations",
  "Government-related administrative processes",
  "Employment and visa documentation",
  "Licensing administration",
  "Document services",
];

export const heroFacts: {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  href?: string;
}[] = [
  { id: "office", label: "Office", value: "City Centre Deira, Dubai", icon: MapPin },
  { id: "reach", label: "Global Reach", value: "UAE, US, SG, KSA, QA, OM, KY, PA", icon: Globe },
  { id: "plans", label: "Monthly plans", value: "Six plans from AED 800", icon: Wallet, href: "/plans" },
];

export const reachFlags = [
  { code: "ae", name: "United Arab Emirates" },
  { code: "us", name: "United States" },
  { code: "sg", name: "Singapore" },
  { code: "sa", name: "Saudi Arabia" },
  { code: "qa", name: "Qatar" },
  { code: "om", name: "Oman" },
  { code: "ky", name: "Cayman Islands" },
  { code: "pa", name: "Panama" },
];

export const aboutCountries = reachFlags.filter((f) => f.code !== "ae");

export const homeFaqs = [
  {
    q: "Can LAAMIN handle international company formations alongside UAE setup?",
    a: "Yes. In addition to Dubai and UAE mainland/freezone setups, we coordinate formations in the US, Singapore, Saudi Arabia, Qatar, Oman, Cayman Islands, and Panama.",
  },
  {
    q: "What is included in LAAMIN's monthly support plans?",
    a: "Our monthly plans cover dedicated professional service charges for PRO tasks, document clearing, visa processing oversight, and regular compliance updates.",
  },
  {
    q: "How long does standard visa processing take?",
    a: "With our priority PRO liaison, standard residence visa stamping and Emirates ID registration typically complete within 3 to 5 working days after medical clearance.",
  },
];

export { plans } from "@/data/plans";
export type { Plan, PlanId, PlanCategory } from "@/data/plans";

export const processSteps = [
  { title: "Initial Consultation", text: "We discuss your exact business activities, jurisdiction (UAE or International), and structure." },
  { title: "Documentation & Filing", text: "Our team prepares, reviews, and submits all required paperwork to official registries." },
  { title: "Approval & Issuance", text: "We track official progress until your license, corporate documents, or visa are successfully issued." },
];

export const whyChooseContent = {
  eyebrow: "WHY LAAMIN",
  titleLead: "More Than a Service —",
  titleAccent: "Your Trusted Business Partner.",
  description:
    "From establishing your company to managing essential visa and documentation requirements, LAAMIN brings business support services together to help you navigate the process with clarity and confidence.",
  cta: {
    label: "Let's Talk About Your Business",
    href: "/contact",
  },
  items: [
    {
      id: "01",
      title: "Dedicated, Personal Support",
      text: "Business requirements can involve multiple documents, procedures, and decisions. We help you understand the relevant requirements and coordinate the administrative steps involved in your requested services.",
      image: {
        src: "/images/why-laamin/personal-support.svg",
        alt: "Illustration representing dedicated personal business support",
      },
    },
    {
      id: "02",
      title: "Clear Fees. Clear Expectations.",
      text: "We explain our professional service fees and distinguish them from applicable government fees and other third-party charges, helping you understand the costs involved before proceeding.",
      image: {
        src: "/images/why-laamin/transparent-pricing.svg",
        alt: "Illustration representing transparent professional fees",
      },
    },
    {
      id: "03",
      title: "UAE Knowledge. International Reach.",
      text: "With a focus on UAE business support and assistance with company formation and licensing in selected international jurisdictions, we help businesses explore opportunities across borders.",
      image: {
        src: "/images/why-laamin/global-reach.svg",
        alt: "Illustration representing UAE knowledge and international reach",
      },
    },
  ],
};

export const aboutContent = {
  eyebrow: "About LAAMIN",
  headlineLead: "Business Support That",
  headlineAccent: "Moves You Forward.",
  description:
    "Dubai-based business support for company formation, PRO services, visa processing, and document clearing, with international company formation support.",

  intro:
    "LAAMIN BUSINESS SET UP SERVICES L.L.C. is a Dubai-based business support company helping businesses and individuals navigate company formation, licensing, and essential administrative procedures. Our services include business setup and licensing, PRO services, visa processing, document clearing, Family Visa assistance, Golden Visa assistance, and related company administration support across the UAE.",

  global:
    "Beyond the UAE, we support company formation and business licensing in the United States, Qatar, Singapore, Saudi Arabia, Oman, the Cayman Islands, and Panama.",
};

/* ---------- Hero service demo derived data ---------- */

export const overviewSummary =
  "Business setup and administrative support in Dubai, across the UAE and in key international jurisdictions.";

export const demoTabs: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "Overview", icon: Briefcase },
  ...services.map((service) => ({ id: service.slug, label: service.shortTitle, icon: service.icon })),
];

export const SCENE_COUNT = demoTabs.length;
