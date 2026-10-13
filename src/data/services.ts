import { BriefcaseBusiness, Building2, FileText, Stamp, type LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  heroTitle: string;
  icon: LucideIcon;
  /** One-line description used on cards and the services overview. */
  short: string;
  metaDescription: string;
  intro: string[];
  itemsTitle: string;
  items: string[];
  processTitle: string;
  process: { title: string; text: string }[];
  benefits?: string[];
  notice?: string;
  cta: { heading: string; label: string };
};

export const services: Service[] = [
  {
    slug: "business-setup",
    title: "Business Setup Services",
    heroTitle: "Business Setup Services in Dubai",
    icon: Building2,
    short:
      "Administrative support for trade licence applications, amendments, renewals and related licensing work.",
    metaDescription:
      "Business setup and licensing-related administrative support in Dubai: trade licence applications, amendments, renewal support, establishment-card updates and quota applications.",
    intro: [
      "LAAMIN provides business setup and licensing-related administrative support for companies in Dubai and across the UAE.",
      "We help you prepare and coordinate the applications, amendments and renewals connected to your trade licence and establishment records, and follow each one up with you.",
    ],
    itemsTitle: "What we support",
    items: [
      "Trade licence applications",
      "Trade licence amendments",
      "Trade licence renewal support",
      "Establishment-card updates",
      "Quota applications",
      "Related licensing administration",
    ],
    processTitle: "How it works",
    process: [
      { title: "Enquiry", text: "Tell us about your business and what you need." },
      {
        title: "Requirements review",
        text: "We review the requirements and the documents involved.",
      },
      {
        title: "Scope confirmation",
        text: "The service scope and fees are confirmed with you before work begins.",
      },
      {
        title: "Service coordination",
        text: "We coordinate the agreed services and keep you updated on progress.",
      },
    ],
    cta: { heading: "Discuss Your Business Requirements", label: "Discuss Your Requirements" },
  },
  {
    slug: "pro-services",
    title: "PRO Services",
    heroTitle: "PRO Services in Dubai",
    icon: BriefcaseBusiness,
    short:
      "Coordination of employment-related documentation, applications, renewals and follow-ups.",
    metaDescription:
      "PRO services in Dubai: work-permit support, labour and immigration services, labour card renewal, establishment-card updates, quota requests and employment documentation.",
    intro: [
      "LAAMIN coordinates the employment-related documentation and administrative processes your company deals with on a regular basis.",
      "That includes preparing applications, managing renewals and following up on each process, so your team has one point of contact for its PRO requirements.",
    ],
    itemsTitle: "What we support",
    items: [
      "Work-permit support",
      "Labour and immigration services",
      "Labour card renewal",
      "Establishment-card updates",
      "Quota requests",
      "Letter drafting",
      "Employment documentation",
      "Selected external department approvals, where applicable",
    ],
    processTitle: "How it works",
    process: [
      { title: "Enquiry", text: "Tell us about your company and its PRO requirements." },
      {
        title: "Requirements review",
        text: "We review what is needed and the documents involved.",
      },
      {
        title: "Scope confirmation",
        text: "The service scope and fees are confirmed with you before work begins.",
      },
      {
        title: "Coordination and follow-up",
        text: "We coordinate the agreed services and follow up on each process.",
      },
    ],
    benefits: [
      "Coordinated administrative support",
      "Organised document handling",
      "Assistance with process follow-ups",
      "Services based on agreed requirements",
    ],
    cta: { heading: "Enquire About PRO Services", label: "Enquire About PRO Services" },
  },
  {
    slug: "visa-processing",
    title: "Visa Processing",
    heroTitle: "Visa Processing Support in Dubai",
    icon: Stamp,
    short:
      "Administrative coordination of employment, partner, investor and other relevant visa processes.",
    metaDescription:
      "Visa processing support in Dubai: administrative coordination of employment, partner and investor visa processes, Emirates ID, medical processes and immigration documentation.",
    intro: [
      "LAAMIN provides administrative coordination for the relevant visa and immigration processes your business and its people go through.",
      "We help organise the documentation, coordinate the steps involved and follow up on each application with you.",
    ],
    itemsTitle: "What we support",
    items: [
      "Employment visa applications, renewals, and cancellations",
      "Partner and investor visa support",
      "Family visa support where included in the relevant plan",
      "Tourist visa support where included in the relevant plan",
      "Return permits",
      "Medical-process coordination",
      "Emirates ID process coordination",
      "Biometric appointment updates",
      "Immigration-related documentation",
    ],
    processTitle: "The process",
    process: [
      { title: "Enquiry", text: "Tell us which visa or immigration process you need support with." },
      {
        title: "Requirements review",
        text: "We review the requirements that apply to your case.",
      },
      {
        title: "Document coordination",
        text: "We coordinate the documents needed for the application.",
      },
      {
        title: "Follow-up",
        text: "We follow up on the process and keep you updated.",
      },
    ],
    notice:
      "All applications are subject to the requirements and decisions of the relevant authorities. LAAMIN does not guarantee approvals or processing times.",
    cta: { heading: "Discuss Your Visa Requirements", label: "Discuss Your Visa Requirements" },
  },
  {
    slug: "document-clearing",
    title: "Document Clearing",
    heroTitle: "Document Clearing Services in Dubai",
    icon: FileText,
    short:
      "Document handling, letter drafting, translation support and document coordination.",
    metaDescription:
      "Document clearing services in Dubai: employment and immigration documentation, letter drafting, translation support and document coordination.",
    intro: [
      "LAAMIN provides document-handling and administrative support for businesses in Dubai and across the UAE.",
      "We help you prepare, organise and coordinate the documents your processes depend on, based on the scope agreed with you.",
    ],
    itemsTitle: "What we support",
    items: [
      "Employment and immigration documentation",
      "Letter drafting",
      "Normal and legal translation support",
      "Document coordination",
      "Selected external department approvals, where applicable",
      "Document pickup and drop-off where included in the relevant plan",
    ],
    processTitle: "How it works",
    process: [
      { title: "Enquiry", text: "Tell us which documents or processes you need support with." },
      {
        title: "Document requirements",
        text: "We confirm which documents are required.",
      },
      {
        title: "Scope confirmation",
        text: "The service scope and fees are confirmed with you before work begins.",
      },
      {
        title: "Agreed service process",
        text: "We carry out the agreed service and keep you updated.",
      },
    ],
    cta: { heading: "Enquire About Document Services", label: "Enquire About Document Services" },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
