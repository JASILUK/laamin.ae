import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { site } from "@/data/site";

const description = `The terms that apply to enquiries and to services provided by ${site.legalName}, and how they relate to your service agreement.`;

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description,
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    heading: "About these terms",
    body: (
      <>
        <p>
          These terms are published by {site.legalName} (&ldquo;{site.name}&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;). They explain the basis on which we offer our
          business setup, PRO and administrative support services, and how this website should be
          used.
        </p>
        <p>
          Sending an enquiry, selecting a service category or plan on this website, or receiving
          information from us does not by itself create an engagement. Our services begin only
          when you and {site.name} have agreed the engagement, for example through a signed
          service agreement or a quotation that you have accepted.
        </p>
      </>
    ),
  },
  {
    heading: "How these terms relate to your agreement",
    body: (
      <>
        <p>
          If you become a client, your engagement is governed by your service agreement or
          approved quotation. If there is any conflict, the terms of your signed service
          agreement take priority, followed by your approved quotation, and then these website
          terms.
        </p>
        <p>
          Nothing in these terms or in your agreement removes rights that you have under
          mandatory UAE law.
        </p>
      </>
    ),
  },
  {
    heading: "Our services",
    body: (
      <>
        <p>
          We provide administrative and business-support services, which may include assistance
          with business setup and licensing, PRO and government-related administrative work, and
          visa processing and document clearing.
        </p>
        <p>
          The exact services, inclusions, exclusions, timelines and responsibilities depend on
          the plan and engagement you agree with us. Unless we expressly agree otherwise in
          writing, our services do not include legal, tax, accounting or audit advice.
        </p>
      </>
    ),
  },
  {
    heading: "Fees",
    body: (
      <>
        <p>
          Our professional service fees are those set out in your approved quotation or service
          agreement. Any plan or fee information shown on this website is a general guide and does
          not replace them.
        </p>
        <p>
          Payment timing, deposits and the consequences of late payment are as set out in your
          agreement or quotation.
        </p>
      </>
    ),
  },
  {
    heading: "Government and third-party charges",
    body: (
      <p>
        Government fees, fines, insurance premiums, medical charges, translation-office charges
        and other third-party costs are separate from our professional service fees unless your
        agreement says otherwise. Where such costs apply, we will tell you what they are and how
        they are to be paid or reimbursed, as set out in your agreement.
      </p>
    ),
  },
  {
    heading: "VAT",
    body: (
      <p>
        Our fees are subject to UAE value added tax (VAT) where it applies under UAE law. Where
        VAT is charged, it will be shown on the invoice.
      </p>
    ),
  },
  {
    heading: "Your information and documents",
    body: (
      <>
        <p>
          To carry out our services, we need information and documents that are accurate,
          complete, current and lawfully provided. Please review documents we prepare for you
          before they are submitted, and tell us promptly if anything changes.
        </p>
        <p>
          If information or documents are missing, incorrect or late, or if a required approval
          from you is delayed, the timeline or outcome of the work may be affected. We will let
          you know when we become aware of this. You are responsible for the consequences only to
          the extent they result from your own information, documents or delays.
        </p>
      </>
    ),
  },
  {
    heading: "Authorities and external parties",
    body: (
      <>
        <p>
          Applications, licences, permits, visas, approvals and processing times depend on
          government authorities and other independent third parties. We are not a government
          authority, and we cannot guarantee that an application will be approved or how long a
          decision will take unless a specific commitment is stated in your agreement.
        </p>
        <p>
          This does not affect our responsibility for performing our own services with reasonable
          care and in line with our agreement with you.
        </p>
      </>
    ),
  },
  {
    heading: "Additional work",
    body: (
      <p>
        If you ask for work beyond the services agreed in your plan or service agreement, or if
        your requirements change, we will tell you before starting that work. Additional work may
        be charged separately on terms agreed with you.
      </p>
    ),
  },
  {
    heading: "Confidentiality and personal information",
    body: (
      <>
        <p>
          We treat the business information and documents you share with us as confidential and
          take reasonable steps to protect them. We may disclose them to authorities and service
          providers where this is needed to carry out the services you have asked for, or where
          the law requires or permits it. Any further confidentiality terms are set out in your
          service agreement.
        </p>
        <p>
          How we handle personal information is explained in our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </>
    ),
  },
  {
    heading: "Term, cancellation, suspension and refunds",
    body: (
      <p>
        The duration of an engagement, and any renewal, cancellation, suspension, notice or refund
        arrangements, are set out in your service agreement or approved quotation and will be
        applied in line with applicable law.
      </p>
    ),
  },
  {
    heading: "Liability and events outside our control",
    body: (
      <>
        <p>
          Each party&rsquo;s responsibility for loss or damage is as set out in your service
          agreement and applicable law. Nothing in these terms excludes or limits any liability
          that cannot lawfully be excluded or limited.
        </p>
        <p>
          Neither party is responsible for a delay or failure to perform caused by events beyond
          its reasonable control, including delays or closures at government authorities, to the
          extent permitted by law and your agreement. Your service agreement states the governing
          law and how disputes are resolved.
        </p>
      </>
    ),
  },
  {
    heading: "Using this website",
    body: (
      <p>
        You may use this website to learn about our services and to contact us. Unless stated
        otherwise, the content of this website, including text, logos and design, belongs to or is
        licensed to {site.legalName} and may not be copied or reused for commercial purposes
        without our permission. Information on this website is general and may change.
      </p>
    ),
  },
  {
    heading: "Changes and contact",
    body: (
      <>
        <p>
          We may update these website terms from time to time, and the current version is always
          published on this page. Changes do not alter the terms of a signed service agreement
          unless that agreement allows it or you agree to the change. If any part of these terms
          is found to be unenforceable, the rest remains in effect.
        </p>
        <p>
          For questions about these terms, contact us at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
          <a href={`tel:${site.phones[0].tel}`}>{site.phones[0].display}</a>.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return <LegalPage title="Terms and Conditions" description={description} sections={sections} />;
}