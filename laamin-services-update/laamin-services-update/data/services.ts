import {
  BriefcaseBusiness,
  Building2,
  FileText,
  Stamp,
  Users,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";

/**
 * Canonical service content for the services overview and service detail pages.
 * Keep this file as the single source of truth for service-page copy.
 *
 * The four primary services are used by the services overview.
 * Family Visa and Golden Visa are specialist pages nested under Visa & Immigration.
 */

export type ServiceStep = {
  title: string;
  text: string;
};

export type Service = {
  slug: string;
  legacySlugs?: string[];
  title: string;
  shortTitle: string;
  heroTitle: string;
  icon: LucideIcon;
  short: string;
  summary: string;
  metaDescription: string;
  intro: string[];
  itemsTitle: string;
  items: string[];
  processTitle: string;
  process: ServiceStep[];
  benefits?: string[];
  notice?: string;
  parentSlug?: string;
  cta: { heading: string; label: string };
};

export const services: Service[] = [
  {
    slug: "business-setup-services",
    legacySlugs: ["business-setup"],
    title: "Business Setup & Company Formation",
    shortTitle: "Business Setup",
    heroTitle: "Business Setup & Company Formation in Dubai",
    icon: Building2,
    short:
      "Support for company formation, trade licensing and related business administration in the UAE and selected international jurisdictions.",
    summary:
      "Establishing a business involves decisions about jurisdiction, structure, licensing and documentation. LAAMIN helps clients understand the administrative steps involved and coordinates agreed company formation and licensing services.",
    metaDescription:
      "Explore business setup and company formation support in Dubai and the UAE, including mainland and free zone setup, trade licensing, licence amendments and renewals, and selected international company formation coordination.",
    intro: [
      "LAAMIN provides business setup and company formation support for entrepreneurs and businesses establishing or managing a company in the UAE.",
      "We help coordinate the administrative steps involved in company formation and licensing, based on your business activities, chosen jurisdiction and confirmed service scope. Support for international company formation is available in selected jurisdictions and should be confirmed for each enquiry.",
    ],
    itemsTitle: "Business setup services",
    items: [
      "UAE mainland company setup support",
      "UAE free zone company setup support",
      "Trade licence application coordination",
      "Trade licence amendments and renewal support",
      "Establishment-card updates and related company records",
      "Quota applications and related licensing administration",
      "Company formation coordination in selected international jurisdictions",
    ],
    processTitle: "How it works",
    process: [
      { title: "Initial enquiry", text: "Tell us about your business activity, preferred jurisdiction and intended setup." },
      { title: "Requirements review", text: "We review the administrative requirements and documents relevant to your enquiry." },
      { title: "Scope and fees", text: "We confirm the agreed service scope, professional fees and any government or third-party charges before work begins." },
      { title: "Coordination and follow-up", text: "We coordinate the agreed steps and keep you informed as the process progresses." },
    ],
    benefits: [
      "A clearer view of the administrative steps involved",
      "Coordinated document handling and follow-up",
      "Service scope and fees discussed before proceeding",
      "Support based on the jurisdiction and requirements confirmed for your case",
    ],
    notice:
      "Company formation, licensing and related applications are subject to the requirements and decisions of the relevant authorities or registries. Jurisdiction availability, fees and processing times must be confirmed for each case. LAAMIN does not guarantee approvals or processing times.",
    cta: { heading: "Discuss Your Business Setup", label: "Discuss Your Requirements" },
  },
  {
    slug: "pro-services",
    title: "PRO & Government Services",
    shortTitle: "PRO Services",
    heroTitle: "PRO & Government Services in Dubai",
    icon: BriefcaseBusiness,
    short:
      "Administrative coordination for government-related procedures, employment records, applications and selected approvals in the UAE.",
    summary:
      "LAAMIN helps businesses coordinate recurring government-related administrative tasks, employment documentation and relevant application follow-ups through an agreed service arrangement.",
    metaDescription:
      "PRO and government-related administrative support in Dubai, including labour and immigration file support, work-permit coordination, quota requests, establishment-card updates, employment documentation and selected external approvals.",
    intro: [
      "LAAMIN provides PRO and government-related administrative coordination for businesses operating in Dubai and across the UAE.",
      "We help organise documents, coordinate relevant applications and follow up on agreed processes. The exact services available depend on your requirements, the applicable authority and the scope confirmed before engagement.",
    ],
    itemsTitle: "PRO services we can coordinate",
    items: [
      "Labour and immigration file support",
      "Work-permit and employment-process coordination",
      "Quota requests and related submissions",
      "Establishment-card updates and renewals",
      "Labour-card and employment-record administration",
      "Employment letters, NOCs and related documentation",
      "Selected external department approvals, where applicable",
      "Application follow-up and document coordination",
    ],
    processTitle: "Our PRO service process",
    process: [
      { title: "Understand your requirements", text: "Tell us about your company and the government-related process you need help coordinating." },
      { title: "Review requirements", text: "We identify the documents and process requirements relevant to your case." },
      { title: "Confirm the service scope", text: "We confirm the tasks, professional fees, third-party costs and any applicable limits before proceeding." },
      { title: "Coordinate and follow up", text: "We coordinate the agreed administrative steps and provide progress updates." },
    ],
    benefits: [
      "One point of contact for agreed administrative tasks",
      "Organised handling of relevant documents",
      "Support with application follow-ups",
      "Service arrangements that can be discussed around business requirements",
    ],
    notice:
      "Government procedures, eligibility, approvals and processing times are determined by the relevant authorities. Any external approvals are subject to applicability and availability. LAAMIN does not guarantee approvals or processing times.",
    cta: { heading: "Discuss Your PRO Requirements", label: "Enquire About PRO Services" },
  },
  {
    slug: "visa-processing",
    title: "Visa & Immigration Services",
    shortTitle: "Visa Processing",
    heroTitle: "Visa & Immigration Support in Dubai",
    icon: Stamp,
    short:
      "Administrative support for applicable employment, residence, partner, investor and family visa processes.",
    summary:
      "Visa and immigration procedures involve eligibility requirements, documents and steps that vary by applicant and visa category. LAAMIN helps coordinate the relevant documentation and administrative process for services confirmed in advance.",
    metaDescription:
      "Visa and immigration support in Dubai and the UAE, including employment and residence visa coordination, partner and investor visa support, family visa assistance, Golden Visa assistance, medical fitness and Emirates ID process coordination.",
    intro: [
      "LAAMIN provides administrative coordination for applicable visa and immigration processes for businesses, individuals and families in the UAE.",
      "We help organise documentation, coordinate relevant steps and follow up on agreed processes. The appropriate route, eligibility and requirements depend on the applicant's circumstances and the rules applied by the relevant authorities.",
    ],
    itemsTitle: "Visa and immigration support",
    items: [
      "Employment visa application and renewal coordination",
      "Residence visa process support",
      "Partner and investor visa support",
      "Family and dependent visa assistance",
      "Golden Visa application assistance",
      "Visa cancellation and return-permit coordination",
      "Medical fitness process coordination",
      "Emirates ID and biometric appointment coordination",
      "Related immigration documentation and follow-up",
    ],
    processTitle: "The visa support process",
    process: [
      { title: "Initial enquiry", text: "Tell us which visa or immigration process you are enquiring about and who the application concerns." },
      { title: "Requirements review", text: "We review the relevant requirements and identify documents or information that may be needed." },
      { title: "Document coordination", text: "We coordinate the agreed documentation and administrative steps." },
      { title: "Follow-up", text: "We follow up on the process and keep you informed of updates or additional requirements." },
    ],
    benefits: [
      "Clearer understanding of the steps involved",
      "Coordinated documentation and process follow-up",
      "Support for relevant visa categories, subject to confirmation",
      "Service scope discussed before work begins",
    ],
    notice:
      "Visa eligibility, application requirements, approvals and processing times are determined by the relevant authorities. Any guidance or coordination is subject to the applicant's circumstances and current requirements. LAAMIN does not guarantee visa approval or processing times.",
    cta: { heading: "Discuss Your Visa Requirements", label: "Discuss Your Visa Requirements" },
  },
  {
    slug: "document-clearing",
    title: "Document Clearing & Attestation",
    shortTitle: "Document Clearing",
    heroTitle: "Document Clearing & Attestation Support in Dubai",
    icon: FileText,
    short:
      "Document preparation, coordination, translation support and submission assistance for applicable administrative procedures.",
    summary:
      "Accurate and organised documentation is an important part of business and immigration administration. LAAMIN helps coordinate relevant documents and submissions according to the service scope agreed with each client.",
    metaDescription:
      "Document clearing support in Dubai and the UAE, including employment and immigration documents, letter drafting, translation and attestation coordination, and applicable government document submissions.",
    intro: [
      "LAAMIN provides document-clearing and administrative support for businesses and individuals navigating relevant procedures in the UAE.",
      "We help prepare, organise and coordinate documents for agreed processes, including translation or attestation coordination where applicable. Availability, requirements and third-party charges are confirmed before proceeding.",
    ],
    itemsTitle: "Document services",
    items: [
      "Employment and immigration documentation",
      "Document preparation and coordination",
      "Business and employment letter drafting",
      "Normal and legal translation coordination",
      "Document attestation and notary coordination",
      "Applicable government document submissions",
      "Selected department documentation and approvals, where applicable",
      "Document pickup and drop-off where included in the agreed service",
    ],
    processTitle: "How document clearing works",
    process: [
      { title: "Tell us what you need", text: "Share the document or administrative process you need assistance with." },
      { title: "Confirm requirements", text: "We confirm the relevant documents, format and any applicable third-party requirements." },
      { title: "Agree scope and costs", text: "We explain the agreed service, professional fees and any external charges before proceeding." },
      { title: "Coordinate the process", text: "We coordinate the agreed document-related steps and keep you updated." },
    ],
    benefits: [
      "More organised document handling",
      "Coordination around the requirements of the relevant process",
      "Clearer expectations about scope and charges",
      "Follow-up on agreed administrative steps",
    ],
    notice:
      "Translation, attestation, notarisation and government submission requirements vary by document and authority. Third-party charges may apply. Any legal or certified service is subject to the availability and requirements of the relevant authorised provider.",
    cta: { heading: "Discuss Your Document Requirements", label: "Enquire About Document Services" },
  },
];

export const specialistServices: Service[] = [
  {
    slug: "family-visa",
    title: "Family Visa Assistance",
    shortTitle: "Family Visa",
    heroTitle: "Family Visa Assistance in Dubai",
    icon: Users,
    parentSlug: "visa-processing",
    short:
      "Administrative coordination for applicable family and dependent residence visa processes in the UAE.",
    summary:
      "Family sponsorship requirements depend on the sponsor, family member and applicable immigration rules. LAAMIN helps coordinate relevant documentation and administrative steps where the service is available.",
    metaDescription:
      "Family visa assistance in Dubai and the UAE, including document coordination and support with applicable dependent residence visa procedures, subject to current eligibility and authority requirements.",
    intro: [
      "LAAMIN offers family visa assistance for enquiries involving applicable family and dependent residence visa procedures in the UAE.",
      "We help coordinate the documentation and administrative steps relevant to the case. Requirements can vary depending on the sponsor, the family member and the applicable rules, so the details must be reviewed before the service is confirmed.",
    ],
    itemsTitle: "Family visa support may include",
    items: [
      "Initial review of the requested family visa process",
      "Coordination of relevant application documents",
      "Administrative support for applicable dependent residence visa procedures",
      "Medical fitness and Emirates ID process coordination, where applicable",
      "Renewal and follow-up coordination, where included in the agreed scope",
    ],
    processTitle: "How family visa assistance works",
    process: [
      { title: "Tell us about your case", text: "Share the relationship, sponsor situation and type of assistance you are enquiring about." },
      { title: "Review requirements", text: "We review the applicable requirements and documents for your case." },
      { title: "Confirm scope and fees", text: "We confirm which steps LAAMIN can coordinate and any professional or third-party charges." },
      { title: "Coordinate and follow up", text: "We coordinate the agreed steps and share relevant updates." },
    ],
    notice:
      "Eligibility, sponsorship requirements, approvals and processing times are determined by the relevant authorities and depend on the individual case. LAAMIN does not guarantee approval or processing times.",
    cta: { heading: "Discuss Your Family Visa Enquiry", label: "Enquire About Family Visa Support" },
  },
  {
    slug: "golden-visa",
    title: "Golden Visa Assistance",
    shortTitle: "Golden Visa",
    heroTitle: "Golden Visa Assistance in the UAE",
    icon: BadgeCheck,
    parentSlug: "visa-processing",
    short:
      "Administrative assistance with applicable Golden Visa enquiries, document preparation and application coordination.",
    summary:
      "Golden Visa eligibility and documentation depend on the applicant's category and the criteria in force. LAAMIN can discuss the administrative support available for a case before confirming the service.",
    metaDescription:
      "Golden Visa assistance in the UAE, including initial enquiry review, document coordination and administrative application support, subject to current eligibility criteria and the requirements of the relevant authorities.",
    intro: [
      "LAAMIN provides administrative assistance for enquiries about applicable UAE Golden Visa processes.",
      "The eligibility route, evidence and application requirements depend on the applicant's category and the rules in force. We can review the enquiry and confirm the administrative coordination available for the case before work begins.",
    ],
    itemsTitle: "Golden Visa assistance may include",
    items: [
      "Initial enquiry and category discussion",
      "Coordination of relevant supporting documents",
      "Administrative application coordination, where available",
      "Medical fitness and Emirates ID process coordination, where applicable",
      "Follow-up on agreed administrative steps",
    ],
    processTitle: "How Golden Visa assistance works",
    process: [
      { title: "Initial enquiry", text: "Tell us about your circumstances and the Golden Visa route you are enquiring about." },
      { title: "Requirements review", text: "We review the applicable category requirements and supporting documents at a preliminary level." },
      { title: "Confirm service scope", text: "We explain the assistance available, professional fees and any third-party charges before proceeding." },
      { title: "Coordinate and follow up", text: "We coordinate the agreed administrative steps and provide updates as available." },
    ],
    notice:
      "Golden Visa eligibility and approval depend on the applicable criteria and decisions of the relevant authorities. An enquiry or document review is not a guarantee of eligibility or approval. LAAMIN does not guarantee approval or processing times.",
    cta: { heading: "Discuss Your Golden Visa Enquiry", label: "Enquire About Golden Visa Support" },
  },
];

/** All detail pages, including specialist pages linked from Visa & Immigration. */
export const allServices: Service[] = [...services, ...specialistServices];

/** Resolve canonical slugs and the legacy business-setup URL without breaking existing links. */
export function getService(slug: string): Service | undefined {
  return allServices.find(
    (service) => service.slug === slug || service.legacySlugs?.includes(slug),
  );
}

/** Canonical route slugs used to pre-render service detail pages. */
export function getServiceStaticParams() {
  return allServices.map((service) => ({ slug: service.slug }));
}
