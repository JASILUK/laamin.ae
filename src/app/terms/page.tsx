import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `The terms that apply to services provided by ${site.legalName}.`,
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    heading: "Service scope",
    body: (
      <p>
        The scope of services provided by {site.name} depends on the service plan you select and
        the service agreement between you and {site.name}. Service inclusions and limits are
        confirmed in that agreement.
      </p>
    ),
  },
  {
    heading: "Monthly service fees",
    body: (
      <p>
        Monthly fees cover {site.name}’s professional service charges for the services included
        in the agreed plan.
      </p>
    ),
  },
  {
    heading: "Government and third-party charges",
    body: (
      <p>
        Government fees, fines, insurance premiums, medical charges, translation-office charges
        and other third-party costs are not included in the monthly fee. They are charged
        separately at actual cost.
      </p>
    ),
  },
  {
    heading: "VAT",
    body: <p>Applicable VAT is charged where required.</p>,
  },
  {
    heading: "Customer information and documents",
    body: (
      <p>
        Customers must provide complete and accurate information and documents. Delays or
        outcomes caused by incomplete or inaccurate information are the customer’s
        responsibility.
      </p>
    ),
  },
  {
    heading: "Authority decisions",
    body: (
      <p>
        All applications are subject to the requirements and decisions of the relevant
        authorities. {site.name} does not guarantee approvals or processing times.
      </p>
    ),
  },
  {
    heading: "Work beyond agreed limits",
    body: (
      <p>
        Work beyond the service limits agreed in your plan or service agreement may be charged
        separately on agreed terms.
      </p>
    ),
  },
  {
    heading: "Confidentiality, termination and changes to services",
    body: (
      <p>
        Confidentiality, termination, and changes to services are governed by the approved
        service agreement between you and {site.name}.
      </p>
    ),
  },
  {
    heading: "Contact",
    body: (
      <p>
        For questions about these terms, contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      description={`The terms that apply to services provided by ${site.legalName}.`}
      sections={sections}
    />
  );
}
