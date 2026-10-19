export type PlanId =
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "diamond"
  | "elite";

export type PlanCategory = {
  title: string;
  items: string[];
};

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  employees: string;
  summary: string;
  keyInclusions: string[];
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
      {
        title: "Consultation & Advisory",
        items: ["Global visa consultation"],
      },
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