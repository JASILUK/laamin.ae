
export type FAQItem = {
    id: string;
    question: string;
    answer: string;
  };
  
  export type FAQGroup = {
    eyebrow: string;
    heading: string;
    description: string;
    items: FAQItem[];
  };
  
  export const faqPageContent: Record<string, FAQGroup> = {
    home: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      heading: "Questions Before You Get Started?",
      description:
        "Find clear answers about LAAMIN's business setup, PRO services, visa processing, and document clearing support across the UAE.",
      items: [
        {
          id: "home-services",
          question: "What services does LAAMIN provide?",
          answer:
            "LAAMIN BUSINESS SET UP SERVICES L.L.C provides business setup and licensing support, PRO services, visa processing assistance, document clearing, and related business administration support. We also assist with company formation in selected international jurisdictions.",
        },
        {
          id: "home-business-setup",
          question: "Can LAAMIN help me establish a company in Dubai?",
          answer:
            "Yes. We assist with company formation and licensing procedures in Dubai and across the UAE. We help you understand the relevant requirements, coordinate documentation, and navigate the applicable registration process based on your intended business activities.",
        },
        {
          id: "home-pro",
          question: "What are PRO services, and why does my business need them?",
          answer:
            "PRO services help businesses manage government-related administrative procedures, including labour and immigration documentation, establishment records, renewals, and applicable approvals. LAAMIN helps coordinate these requirements so you can focus more on running your business.",
        },
        {
          id: "home-visas",
          question: "Can you assist with employment and family visas?",
          answer:
            "We assist with applicable employment, residence, family, dependent, and Golden Visa procedures, along with related documentation and appointment coordination. Eligibility, requirements, and approval depend on the applicant's circumstances and the relevant authorities.",
        },
        {
          id: "home-pricing",
          question: "How much do LAAMIN's services cost?",
          answer:
            "Pricing depends on the service, the complexity of your requirements, and the support arrangement you choose. Our monthly service proposal lists six plans ranging from AED 800 to AED 10,000 per month. Government fees, third-party charges, and applicable VAT are separate where applicable. Contact us for a proposal suited to your requirements.",
        },
        {
          id: "home-processing",
          question: "How long does company setup or visa processing take?",
          answer:
            "Processing times vary according to the application, documentation, business activity, and the relevant authority's procedures. We help coordinate submissions and follow-ups, but final processing times and approval decisions remain with the responsible authorities.",
        },
        {
          id: "home-international",
          question: "Do you support company formation outside the UAE?",
          answer:
            "Yes. In addition to UAE company formation, we support company formation in selected jurisdictions, including the United States, Singapore, Saudi Arabia, Qatar, Oman, the Cayman Islands, and Panama. Requirements and availability depend on the jurisdiction and proposed business structure.",
        },
        {
          id: "home-contact",
          question: "How can I get started with LAAMIN?",
          answer:
            "Contact our team with your business activity, location, and service requirements. We can discuss the applicable procedures, documentation, estimated costs, and available service options before confirming the next steps.",
        },
      ],
    },
  
    "business-setup": {
      eyebrow: "BUSINESS SETUP FAQS",
      heading: "Starting a Business in the UAE?",
      description:
        "Understand the company formation process, licensing requirements, documentation, and support available through LAAMIN.",
      items: [
        {
          id: "setup-mainland-freezone",
          question: "What is the difference between mainland and free zone company setup?",
          answer:
            "Mainland and free zone companies operate under different registration frameworks, licensing requirements, and applicable rules. The appropriate option depends on your business activity, intended market, ownership structure, and operational needs. We help you understand the relevant options before proceeding.",
        },
        {
          id: "setup-documents",
          question: "What documents are required to establish a company?",
          answer:
            "Requirements depend on the jurisdiction, business activity, legal structure, and shareholders involved. Documents may include identification, shareholder information, proposed business activities, and application forms. We confirm the applicable checklist for your specific case.",
        },
        {
          id: "setup-license",
          question: "Can LAAMIN help with trade licence applications and renewals?",
          answer:
            "Yes. We provide assistance with applicable trade licence applications, renewals, amendments, and related administrative procedures. The exact requirements depend on your licensing authority and business activity.",
        },
        {
          id: "setup-timeline",
          question: "How long does it take to register a company?",
          answer:
            "The timeline varies by jurisdiction, business activity, documentation, and approval requirements. We coordinate the required paperwork and follow-ups, while the relevant authority determines the actual processing time.",
        },
        {
          id: "setup-international",
          question: "Can I establish a company outside the UAE through LAAMIN?",
          answer:
            "We support company formation in selected international jurisdictions, including the United States, Singapore, Saudi Arabia, Qatar, Oman, the Cayman Islands, and Panama. Available structures, eligibility, documentation, and fees vary by jurisdiction.",
        },
        {
          id: "setup-cost",
          question: "What is the total cost of setting up a company?",
          answer:
            "The total cost depends on the jurisdiction, licence type, business activity, legal structure, premises requirements, and other applicable charges. We help clarify professional service fees and relevant government or third-party costs before proceeding.",
        },
      ],
    },
  
    "pro-services": {
      eyebrow: "PRO SERVICES FAQS",
      heading: "Simplifying Your Business Administration",
      description:
        "Learn how LAAMIN can help coordinate recurring government procedures and employment-related documentation.",
      items: [
        {
          id: "pro-includes",
          question: "What is included in PRO services?",
          answer:
            "Depending on the agreed scope, PRO support may include labour and immigration procedures, establishment-card updates, work-permit documentation, renewals, cancellations, quota applications, and related government submissions. Specific inclusions depend on your service agreement or selected monthly plan.",
        },
        {
          id: "pro-outsourcing",
          question: "Can I outsource PRO work instead of hiring an in-house PRO?",
          answer:
            "Outsourcing can be a practical option for businesses that need administrative support without employing a dedicated in-house PRO. The suitability and cost benefits depend on your workforce, transaction volume, and service requirements.",
        },
        {
          id: "pro-renewals",
          question: "Can you assist with labour cards and establishment-card renewals?",
          answer:
            "Yes. We assist with applicable labour-card, establishment-card, and related record renewal or amendment procedures. Requirements and eligibility depend on the relevant authority and your company's current records.",
        },
        {
          id: "pro-followup",
          question: "Do you follow up after submitting applications?",
          answer:
            "We coordinate follow-ups and communicate relevant updates as part of the agreed service scope. Additional documents, corrections, appointments, or authority requests may be required while an application is being processed.",
        },
        {
          id: "pro-monthly",
          question: "Do you offer monthly PRO service plans?",
          answer:
            "Yes. LAAMIN offers six monthly service plans designed for different business sizes and administrative requirements. Available services, limits, and fees vary by plan and are confirmed in the service agreement.",
        },
        {
          id: "pro-approval",
          question: "Can LAAMIN guarantee government approvals?",
          answer:
            "No. Government approvals and processing decisions are made by the relevant authorities. We help coordinate documentation, submissions, and follow-ups, but cannot guarantee an approval or a specific processing time.",
        },
      ],
    },
  
    "visa-processing": {
      eyebrow: "VISA PROCESSING FAQS",
      heading: "Visa Requirements, Clearly Explained",
      description:
        "Explore our assistance with UAE residence, employment, family, and other applicable visa procedures.",
      items: [
        {
          id: "visa-types",
          question: "Which visa procedures can LAAMIN assist with?",
          answer:
            "We assist with applicable residence visa, employment visa, family and dependent visa, partner and investor visa, and Golden Visa procedures. Tourist visa assistance and other services may also be available depending on the selected service arrangement and individual eligibility.",
        },
        {
          id: "visa-employment",
          question: "Can you assist with employment visas for company staff?",
          answer:
            "Yes. We help coordinate applicable employment and residence visa procedures, work-permit documentation, medical fitness appointments, Emirates ID processes, and related administrative requirements. The process depends on the employer, employee eligibility, and the relevant authorities.",
        },
        {
          id: "visa-family",
          question: "Can you help me sponsor my family in the UAE?",
          answer:
            "We assist with applicable family and dependent visa applications and documentation. Sponsorship eligibility, income or accommodation requirements, and supporting documents depend on the applicant's circumstances and the rules in force.",
        },
        {
          id: "visa-documents",
          question: "What documents are required for a visa application?",
          answer:
            "Requirements vary by visa category and applicant. Common documents may include a valid passport, photographs, sponsor or employment details, and other supporting records. We confirm the relevant checklist for your application before submission.",
        },
        {
          id: "visa-time",
          question: "How long does UAE visa processing take?",
          answer:
            "Processing time depends on the visa category, completeness of the application, medical fitness requirements, appointment availability, and authority procedures. We coordinate the process and provide updates where available, but cannot guarantee a fixed timeline.",
        },
        {
          id: "visa-rejection",
          question: "What happens if a visa application is delayed or rejected?",
          answer:
            "We can help review available application information, identify any additional documentation requested, and explain applicable next steps. The reasons for a decision and any available reconsideration or reapplication options depend on the relevant authority's rules.",
        },
      ],
    },
  
    "document-clearing": {
      eyebrow: "DOCUMENT CLEARING FAQS",
      heading: "Documentation Without the Confusion",
      description:
        "Find out how we help coordinate document preparation, submissions, attestations, and related administrative procedures.",
      items: [
        {
          id: "docs-services",
          question: "What does document clearing include?",
          answer:
            "Document clearing involves coordinating the preparation, review, submission, and follow-up of documents for applicable administrative and government procedures. The exact scope depends on the document type, destination authority, and service requested.",
        },
        {
          id: "docs-attestation",
          question: "Can you assist with document attestation?",
          answer:
            "We assist with applicable document attestation and notary coordination, including guidance on the required steps and supporting documents. Requirements depend on the document's origin, intended use, and the authorities involved.",
        },
        {
          id: "docs-government",
          question: "Can you submit documents to UAE government departments?",
          answer:
            "We coordinate submissions and related administrative procedures through applicable government departments and service channels within the agreed scope. Acceptance and approval remain subject to the relevant authority's requirements.",
        },
        {
          id: "docs-translation",
          question: "Can you arrange document translation?",
          answer:
            "Translation support may be available depending on your selected service or plan. Legal or certified translation requirements, languages, charges, and acceptance criteria should be confirmed before the work begins.",
        },
        {
          id: "docs-requirements",
          question: "What should I provide before starting a document request?",
          answer:
            "Provide the documents you currently have, explain the purpose and destination of the paperwork, and share any deadlines or instructions received from the relevant authority. We can then help identify the applicable requirements and missing information.",
        },
        {
          id: "docs-confidentiality",
          question: "How does LAAMIN handle client documents?",
          answer:
            "Client documents and information are handled confidentially and used to deliver the agreed services, subject to applicable legal and government requirements. Clients should provide complete, accurate, and current information to support the process.",
        },
      ],
    },
  
    services: {
      eyebrow: "SERVICES FAQS",
      heading: "Choosing the Right Service",
      description:
        "Answers to common questions about how LAAMIN's business setup, PRO, visa and document services work.",
      items: [
        {
          id: "services-overview",
          question: "Which services does LAAMIN offer?",
          answer:
            "LAAMIN coordinates business setup and company formation, PRO and government services, visa and immigration support, and document clearing and attestation for businesses and individuals in Dubai and across the UAE.",
        },
        {
          id: "services-individual",
          question: "Can I request a single service without a monthly plan?",
          answer:
            "Yes. Services can be requested individually or through an applicable monthly plan. The scope, professional fees, and any government or third-party charges are confirmed before engagement.",
        },
        {
          id: "services-not-sure",
          question: "What if I'm not sure which service I need?",
          answer:
            "Tell us about your requirements and we will review your enquiry, then clarify the relevant service options, scope, and fees before proceeding.",
        },
        {
          id: "services-fees",
          question: "Are government fees included in the service fee?",
          answer:
            "No. Professional fees cover LAAMIN's service. Government charges, third-party costs, and applicable VAT are separate and confirmed in advance.",
        },
        {
          id: "services-guarantee",
          question: "Does LAAMIN guarantee approvals or processing times?",
          answer:
            "No. Approvals and processing times are determined by the relevant authorities. We coordinate documentation, submissions, and follow-ups on your behalf.",
        },
        {
          id: "services-specialist",
          question: "Do you handle Family Visa and Golden Visa enquiries?",
          answer:
            "Yes, subject to review of each case. Both have dedicated pages under Visa & Immigration, and availability is confirmed after we review your enquiry.",
        },
      ],
    },

    plans: {
      eyebrow: "MONTHLY PLANS FAQS",
      heading: "Choosing the Right Service Plan",
      description:
        "Compare our monthly business support arrangements and understand how fees, inclusions, and service limits work.",
      items: [
        {
          id: "plans-options",
          question: "What monthly service plans does LAAMIN offer?",
          answer:
            "Our proposal lists six plans: Bronze at AED 800, Silver at AED 2,000, Gold at AED 3,000, Platinum at AED 5,000, Diamond at AED 7,000, and Elite at AED 10,000 per month. The appropriate plan depends on your administrative requirements and agreed service scope.",
        },
        {
          id: "plans-selection",
          question: "How do I choose the right plan for my company?",
          answer:
            "Consider your workforce size, expected visa and employment transactions, licensing requirements, document workload, and need for additional support. Our team can discuss these requirements and help identify a suitable plan before the scope is confirmed in writing.",
        },
        {
          id: "plans-inclusions",
          question: "Are all services included in every monthly plan?",
          answer:
            "No. Each plan has its own inclusions, service limits, and conditions. Higher-tier plans provide broader support, but not every service is included at every level. Review the plan details and confirm the final scope in your written service agreement.",
        },
        {
          id: "plans-government-fees",
          question: "Are government fees included in the monthly price?",
          answer:
            "No. The monthly fees cover LAAMIN's professional service charges. Government fees, fines, insurance premiums, medical charges, translation-office charges, other applicable third-party costs, and VAT where applicable are billed separately at the relevant cost.",
        },
        {
          id: "plans-payment",
          question: "When is the monthly service fee payable?",
          answer:
            "Under the standard proposal terms, the monthly service fee is payable in advance at the beginning of each month. Confirm the agreed payment terms and commencement date in your service agreement.",
        },
        {
          id: "plans-term",
          question: "What is the standard service agreement duration?",
          answer:
            "The proposal specifies a twelve-month agreement from the commencement date unless a different term is agreed in writing. Renewal is subject to mutual written agreement, and termination provisions are governed by the signed agreement.",
        },
        {
          id: "plans-limits",
          question: "Can additional work incur extra charges?",
          answer:
            "Yes. Work beyond the agreed service limits, including applicable employee, page, or transaction limits, may be charged separately where agreed in advance. Any changes to plan inclusions or fees should be confirmed in writing.",
        },
        {
          id: "plans-change",
          question: "Can I change my service plan later?",
          answer:
            "Plan changes may be possible by agreement. Changes to services, inclusions, or fees must be agreed in writing and documented in accordance with your service agreement.",
        },
      ],
    },
  
    about: {
      eyebrow: "ABOUT LAAMIN FAQS",
      heading: "Getting to Know LAAMIN",
      description:
        "Learn about our business support approach, service coverage, and how we work with businesses and individuals.",
      items: [
        {
          id: "about-company",
          question: "What is LAAMIN BUSINESS SET UP SERVICES L.L.C?",
          answer:
            "LAAMIN BUSINESS SET UP SERVICES L.L.C is a Dubai-based business support company providing assistance with company formation, licensing administration, PRO services, visa processing, document clearing, and related administrative requirements.",
        },
        {
          id: "about-location",
          question: "Where is LAAMIN located?",
          answer:
            "Our office is located at Door No. 17, 5th Floor, Tanvi Business Center, Horizon Building, near the Clock Tower, City Centre Deira, Dubai, UAE. Contact our team to coordinate your enquiry or visit.",
        },
        {
          id: "about-clients",
          question: "Who can use LAAMIN's services?",
          answer:
            "Our services are designed for businesses, entrepreneurs, employers, and individuals who need assistance with applicable company formation, licensing, visa, documentation, and government-related administrative procedures.",
        },
        {
          id: "about-approach",
          question: "How does LAAMIN work with clients?",
          answer:
            "We begin by understanding your requirements, explain the relevant procedures and expected documentation, and coordinate the agreed submissions and follow-ups. Fees, responsibilities, and service inclusions are clarified before engagement.",
        },
        {
          id: "about-international",
          question: "Does LAAMIN provide international company formation support?",
          answer:
            "Yes. We support company formation in selected international jurisdictions, including the United States, Singapore, Saudi Arabia, Qatar, Oman, the Cayman Islands, and Panama. Each jurisdiction has its own registration, documentation, and compliance requirements.",
        },
      ],
    },
  
    contact: {
      eyebrow: "CONTACT FAQS",
      heading: "Let's Discuss Your Requirements",
      description:
        "Know what to prepare before contacting LAAMIN about your company setup or business support needs.",
      items: [
        {
          id: "contact-start",
          question: "What information should I share when contacting LAAMIN?",
          answer:
            "Share your business activity, current location or intended jurisdiction, the service you need, and any relevant deadline. For an existing company, details about its current licence or administrative requirements can help us understand your request.",
        },
        {
          id: "contact-quote",
          question: "Can I request a customised service proposal?",
          answer:
            "Yes. Contact us with your requirements so we can discuss the applicable services, expected documentation, professional fees, and additional government or third-party costs. Final inclusions and conditions should be confirmed in writing.",
        },
        {
          id: "contact-email",
          question: "How can I reach LAAMIN?",
          answer:
            "You can email info.laamin@gmail.com or call +971 56 167 3832 or +971 52 108 4400. Our office is located in City Centre Deira, Dubai, UAE.",
        },
        {
          id: "contact-documents",
          question: "Should I send my documents before receiving a proposal?",
          answer:
            "Start by describing your requirements and sharing only the information necessary for the initial discussion. We will explain which documents are needed and the appropriate way to provide them for the agreed service.",
        },
      ],
    },
  };
  
  // Use this when a page has no dedicated FAQ group.
  export const defaultFAQPage = "home";
  
  // FAQ groups for the main navigation pages.
  export const faqPageKeys = [
    "home",
    "business-setup",
    "pro-services",
    "visa-processing",
    "document-clearing",
    "services",
    "plans",
    "about",
    "contact",
  ] as const;
  
  export type FAQPageKey = (typeof faqPageKeys)[number];
  