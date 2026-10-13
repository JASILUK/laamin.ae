import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.legalName} handles information submitted through this website.`,
  alternates: { canonical: "/privacy-policy" },
};

const sections: LegalSection[] = [
  {
    heading: "Information we collect",
    body: (
      <>
        <p>
          When you send an enquiry through the contact form on this website, we collect the
          details you provide:
        </p>
        <ul>
          <li>Your full name</li>
          <li>Your company name, if provided</li>
          <li>Your business email address</li>
          <li>Your phone number, if provided</li>
          <li>The service category and monthly plan you select</li>
          <li>The content of your message</li>
        </ul>
        <p>
          Please do not send passport copies, Emirates ID documents or other sensitive identity
          documents through the enquiry form.
        </p>
      </>
    ),
  },
  {
    heading: "Why we collect it",
    body: (
      <p>
        We use the information you submit to respond to your enquiry, to understand your
        requirements, and to discuss the appropriate service or plan with you. We do not use
        enquiry details for any unrelated purpose.
      </p>
    ),
  },
  {
    heading: "How enquiries are handled",
    body: (
      <>
        <p>
          Enquiries submitted through the form are delivered by email to the {site.name} team
          and are handled by staff who need them in order to respond to you.
        </p>
        <p>
          If you become a client, the handling of information and documents you provide for the
          delivery of services is governed by your service agreement with {site.name}.
        </p>
      </>
    ),
  },
  {
    heading: "Third-party service providers",
    body: (
      <>
        <p>
          We rely on third-party providers to operate this website and deliver enquiries,
          including website hosting and email service providers. These providers process
          information only as needed to provide their services to us.
        </p>
        <p>
          This website links to third-party services such as WhatsApp and Google Maps. When you
          follow those links, the privacy policies of those services apply.
        </p>
      </>
    ),
  },
  {
    heading: "Privacy requests",
    body: (
      <p>
        To ask about the information we hold from your enquiry, or to request that it be
        corrected or deleted, contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
        <a href={`tel:${site.phones[0].tel}`}>{site.phones[0].display}</a>.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description={`How ${site.legalName} handles information submitted through this website.`}
      sections={sections}
    />
  );
}
