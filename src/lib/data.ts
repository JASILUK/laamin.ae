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

export type PlanId =
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "diamond"
  | "elite";

export type PlanCategory = {
  /** Category title used only for grouping in the comparison table and detail view. */
  title: string;
  /** Exact wording from the approved package specification. */
  items: string[];
};

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  employees: string;
  /** Approved description — used on cards and on the plans page. */
  summary: string;
  /** 3–4 carefully chosen inclusions for the compact homepage card. */
  keyInclusions: string[];
  /** Full, categorised service list (verbatim wording). */
  services: PlanCategory[];
};

export const formatPrice = (value: number) =>
  `AED ${value.toLocaleString("en-AE")}`;

export const pricingNotice =
  "Monthly fees cover LAAMIN’s professional service charges. Government fees, fines, insurance premiums, medical charges, translation-office charges, other third-party costs, and applicable VAT are billed separately at actual cost, according to the company proposal and agreed service terms.";

export const agreementNotice =
  "Service inclusions and limits for each plan are confirmed in the relevant service agreement.";

export const plans: Plan[] = [
  {
    id: "bronze",
    name: "Bronze",
    price: 800,
    employees: "1–50",
    summary:
      "Essential employment, visa and immigration support for individuals, small businesses and start-ups.",
    keyInclusions: [
      "Work-permit package support",
      "Dubai insurance coordination",
      "Emirates ID and medical-process coordination",
      "Partner visa support",
    ],
    services: [
      {
        title: "Employment & Work Permits",
        items: [
          "Work-permit package support",
          "Labour and immigration services",
          "Labour card renewal",
          "Quota requests",
        ],
      },
      {
        title: "Visas & Immigration",
        items: [
          "Partner visa support",
          "Return permits and cancellation processes",
        ],
      },
      {
        title: "Licensing & Establishment",
        items: ["Establishment-card updates"],
      },
      {
        title: "Documentation & Coordination",
        items: [
          "Emirates ID and medical-process coordination",
          "Tawjeeh contract submission",
          "Biometric appointment updates",
        ],
      },
      {
        title: "Insurance",
        items: ["Dubai insurance coordination", "ILOE insurance support"],
      },
      {
        title: "Government Approvals & Support",
        items: ["Fine-payment assistance, where applicable"],
      },
    ],
  },
  {
    id: "silver",
    name: "Silver",
    price: 2000,
    employees: "51–100",
    summary:
      "Expanded support for growing businesses, adding legal translation, tax filing, external department approvals, and family and tourist visa support.",
    keyInclusions: [
      "Core Bronze Plan services",
      "Letter drafting and normal/legal translation",
      "VAT and corporate tax registration and filing support",
      "Family visa and tourist visa support",
    ],
    services: [
      { title: "Package Coverage", items: ["Core Bronze Plan services"] },
      { title: "Employment & Work Permits", items: ["Quota applications"] },
      {
        title: "Licensing & Establishment",
        items: ["Trade licence and establishment-card updates"],
      },
      {
        title: "Documentation & Translation",
        items: ["Letter drafting and normal/legal translation"],
      },
      {
        title: "Tax & Financial",
        items: ["VAT and corporate tax registration and filing support"],
      },
      {
        title: "Government Approvals & Support",
        items: [
          "Selected external department approvals, including DM, SIRA, DEWA, RTA and MOHRE, as applicable",
        ],
      },
      {
        title: "Visas & Immigration",
        items: ["Family visa and tourist visa support"],
      },
      {
        title: "Additional Support",
        items: [
          "Additional employment, visa and documentation support described in the company proposal",
        ],
      },
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: 3000,
    employees: "101–150",
    summary:
      "Full typing and employment services together with trade licence and financial services.",
    keyInclusions: [
      "Employment visa applications, renewals and cancellations",
      "Trade licence applications, amendments and renewal support",
      "VAT and corporate tax registration and submission support",
      "Global visa consultation",
    ],
    services: [
      {
        title: "Employment & Work Permits",
        items: [
          "Employment visa applications, renewals and cancellations",
          "Part-time, temporary, GCC and relative work-permit support",
        ],
      },
      {
        title: "Visas & Immigration",
        items: ["Partner and investor visa applications and renewals"],
      },
      {
        title: "Licensing & Establishment",
        items: [
          "Establishment updates and ICP-related support",
          "Trade licence applications, amendments and renewal support",
        ],
      },
      {
        title: "Documentation & Translation",
        items: ["Letter drafting and translation"],
      },
      {
        title: "Tax & Financial",
        items: ["VAT and corporate tax registration and submission support"],
      },
      {
        title: "Government Approvals & Support",
        items: [
          "Fine-deduction applications and monthly NOCs",
          "Voucher adjustment applications",
          "External department approvals, including municipal approvals where applicable",
        ],
      },
      { title: "Consultation & Advisory", items: ["Global visa consultation"] },
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    price: 5000,
    employees: "151–250",
    summary:
      "Broad coverage for businesses with frequent employment, visa and company administration requirements.",
    keyInclusions: [
      "Work-permit package support",
      "Visa stamping and Tawjeeh contract submission",
      "Establishment-card renewal or amendment",
      "Relevant VAT and corporate tax registration support",
    ],
    services: [
      {
        title: "Employment & Work Permits",
        items: [
          "Work-permit package support",
          "Labour and immigration cancellations",
          "GCC work-permit support",
          "GPSSA employer registration support",
          "Quota applications and modifications",
        ],
      },
      {
        title: "Visas & Immigration",
        items: [
          "Change-of-status assistance",
          "Partner visa and return permit support",
        ],
      },
      {
        title: "Licensing & Establishment",
        items: ["Establishment-card renewal or amendment"],
      },
      {
        title: "Documentation & Coordination",
        items: [
          "Entry permits, medical processing and Emirates ID",
          "Visa stamping and Tawjeeh contract submission",
          "Monthly NOCs",
        ],
      },
      {
        title: "Documentation & Translation",
        items: [
          "Normal translation up to 20 pages each, as stated in the proposal",
        ],
      },
      {
        title: "Insurance",
        items: [
          "Dubai insurance and labour payment support",
          "ILOE and labour card renewals",
        ],
      },
      {
        title: "Tax & Financial",
        items: ["Relevant VAT and corporate tax registration support"],
      },
      {
        title: "Government Approvals & Support",
        items: ["Fine-payment assistance and letter drafting"],
      },
    ],
  },
  {
    id: "diamond",
    name: "Diamond",
    price: 7000,
    employees: "251–400",
    summary:
      "All Silver Plan services plus auditing, legal and IT consultation, company visits, and document pick-up and drop-off.",
    keyInclusions: [
      "Silver Plan services",
      "Company auditing support, subject to terms",
      "Legal and IT consultation",
      "Document pickup and drop-off, subject to agreed conditions",
    ],
    services: [
      { title: "Package Coverage", items: ["Silver Plan services"] },
      {
        title: "Employment & Work Permits",
        items: ["Employment, visa, immigration and document services"],
      },
      {
        title: "Licensing & Establishment",
        items: ["Trade licence and establishment-card updates"],
      },
      {
        title: "Tax & Financial",
        items: ["VAT and corporate tax registration and filing support"],
      },
      {
        title: "Government Approvals & Support",
        items: ["Selected external department approvals"],
      },
      {
        title: "Visas & Immigration",
        items: ["Family visa and tourist visa support"],
      },
      {
        title: "Consultation & Advisory",
        items: [
          "Company auditing support, subject to terms",
          "Company visits and consultation",
          "Legal and IT consultation",
        ],
      },
      {
        title: "Additional Support",
        items: [
          "Document pickup and drop-off, subject to agreed conditions",
          "Other agreed business support services",
        ],
      },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: 10000,
    employees: "400+",
    summary:
      "Our highest tier: every Diamond Plan service, sized for large workforces.",
    keyInclusions: [
      "Diamond Plan service set",
      "Legal and IT consultation",
      "Document pickup and drop-off, subject to agreed conditions",
      "Capacity, priorities and service limits agreed for large workforces",
    ],
    services: [
      { title: "Package Coverage", items: ["Diamond Plan service set"] },
      {
        title: "Employment & Work Permits",
        items: ["Employment, visa, immigration and document services"],
      },
      {
        title: "Licensing & Establishment",
        items: ["Trade licence and establishment-card updates"],
      },
      {
        title: "Tax & Financial",
        items: ["VAT and corporate tax registration and filing support"],
      },
      {
        title: "Government Approvals & Support",
        items: ["Selected external department approvals"],
      },
      {
        title: "Visas & Immigration",
        items: ["Family visa and tourist visa support"],
      },
      {
        title: "Consultation & Advisory",
        items: [
          "Company auditing support, subject to terms",
          "Company visits and consultation",
          "Legal and IT consultation",
        ],
      },
      {
        title: "Additional Support",
        items: [
          "Document pickup and drop-off, subject to agreed conditions",
          "Capacity, priorities and service limits agreed for large workforces",
        ],
      },
    ],
  },
];

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
