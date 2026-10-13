export type Plan = {
  id: string;
  name: string;
  /** Monthly professional service fee in AED. */
  price: number;
  employees: string;
  summary: string;
  services: string[];
};

export const plans: Plan[] = [
  {
    id: "bronze",
    name: "Bronze",
    price: 800,
    employees: "1–50",
    summary: "Essential employment, visa and immigration support for individuals, small businesses and start-ups.",
    services: [
      "Work-permit package support",
      "Dubai insurance coordination",
      "Labour and immigration services",
      "Emirates ID and medical-process coordination",
      "Tawjeeh contract submission",
      "ILOE insurance support",
      "Labour card renewal",
      "Partner visa support",
      "Return permits and cancellation processes",
      "Biometric appointment updates",
      "Fine-payment assistance, where applicable",
      "Quota requests",
      "Establishment-card updates",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    price: 2000,
    employees: "51–100",
    summary:
      "Expanded support for growing businesses, adding legal translation, tax filing, external department approvals and family and tourist visa support.",
    services: [
      "Core Bronze Plan services",
      "Letter drafting and normal/legal translation",
      "Quota applications",
      "Trade licence and establishment-card updates",
      "VAT and corporate tax registration and filing support",
      "Selected external department approvals, including DM, SIRA, DEWA, RTA, and MOHRE, as applicable",
      "Family visa and tourist visa support",
      "Additional employment, visa, and documentation support described in the company proposal",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: 3000,
    employees: "101–150",
    summary:
      "Full typing and employment services together with trade licence and financial services.",
    services: [
      "Employment visa applications, renewals, and cancellations",
      "Part-time, temporary, GCC, and relative work-permit support",
      "Partner and investor visa applications and renewals",
      "Establishment updates and ICP-related support",
      "Letter drafting and translation",
      "Fine-deduction applications and monthly NOCs",
      "Trade licence applications, amendments, and renewal support",
      "Voucher adjustment applications",
      "VAT and corporate tax registration and submission support",
      "External department approvals, including municipal approvals where applicable",
      "Global visa consultation",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    price: 5000,
    employees: "151–250",
    summary:
      "Broad coverage for businesses with frequent employment, visa and company administration requirements.",
    services: [
      "Work-permit package support",
      "Dubai insurance and labour payment support",
      "Change-of-status assistance",
      "Entry permits, medical processing, and Emirates ID",
      "Visa stamping and Tawjeeh contract submission",
      "ILOE and labour card renewals",
      "Labour and immigration cancellations",
      "GCC work-permit support",
      "GPSSA employer registration support",
      "Quota applications and modifications",
      "Partner visa and return permit support",
      "Establishment-card renewal or amendment",
      "Fine-payment assistance and letter drafting",
      "Monthly NOCs",
      "Normal translation up to 20 pages each, as stated in the proposal",
      "Relevant VAT and corporate tax registration support",
    ],
  },
  {
    id: "diamond",
    name: "Diamond",
    price: 7000,
    employees: "251–400",
    summary:
      "All Silver Plan services plus auditing, legal and IT consultation, company visits and document pick-up and drop-off.",
    services: [
      "Silver Plan services",
      "Employment, visa, immigration, and document services",
      "Trade licence and establishment-card updates",
      "VAT and corporate tax registration and filing support",
      "Selected external department approvals",
      "Family visa and tourist visa support",
      "Company auditing support, subject to terms",
      "Company visits and consultation",
      "Legal and IT consultation",
      "Document pickup and drop-off, subject to agreed conditions",
      "Other agreed business support services",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: 10000,
    employees: "400+",
    summary:
      "Our highest tier: every Diamond Plan service, sized for large workforces.",
    services: [
      "Diamond Plan service set",
      "Employment, visa, immigration, and document services",
      "Trade licence and establishment-card updates",
      "VAT and corporate tax registration and filing support",
      "Selected external department approvals",
      "Family visa and tourist visa support",
      "Company auditing support, subject to terms",
      "Company visits and consultation",
      "Legal and IT consultation",
      "Document pickup and drop-off, subject to agreed conditions",
      "Capacity, priorities, and service limits agreed for large workforces",
    ],
  },
];

export function formatPrice(price: number): string {
  return `AED ${price.toLocaleString("en-US")}`;
}

export const pricingNotice =
  "Monthly fees cover LAAMIN’s professional service charges. Government fees, fines, insurance premiums, medical charges, translation-office charges, other third-party costs, and applicable VAT are billed separately at actual cost, according to the company proposal and agreed service terms.";

export const agreementNotice =
  "Service inclusions and limits for each plan are confirmed in the relevant service agreement.";
