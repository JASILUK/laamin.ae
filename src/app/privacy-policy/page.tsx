import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { site } from "@/data/site";

const description = `How ${site.legalName} collects, uses and shares information submitted through this website, and how to contact us about it.`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: "/privacy-policy" },
};

const sections: LegalSection[] = [
  {
    heading: "Who we are and what this policy covers",
    body: (
      <>
        <p>
          This Privacy Policy explains how {site.legalName} (&ldquo;{site.name}&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal information submitted through this
          website, including the contact form and the email, telephone and WhatsApp details
          published here.
        </p>
        <p>
          It does not describe how we handle documents and information provided to us by clients
          for the delivery of services. That is governed by the relevant service agreement and
          our communications with the client.
        </p>
        <p>
          You can contact us at <a href={`mailto:${site.email}`}>{site.email}</a> or on{" "}
          <a href={`tel:${site.phones[0].tel}`}>{site.phones[0].display}</a>.
        </p>
      </>
    ),
  },
  {
    heading: "Information we collect",
    body: (
      <>
        <p>
          When you send an enquiry through the contact form, we collect the details you choose
          to provide:
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
          We also receive the information you send us directly by email, telephone or WhatsApp.
          Please do not send passport copies, Emirates ID documents or other sensitive identity
          documents through the enquiry form.
        </p>
        <p>
          Like most websites, our hosting and infrastructure providers may automatically process
          technical information, such as IP address and request details, in order to deliver the
          site and keep it secure.
        </p>
      </>
    ),
  },
  {
    heading: "How and why we use it",
    body: (
      <>
        <p>We use the information you submit to:</p>
        <ul>
          <li>respond to your enquiry and understand your requirements;</li>
          <li>discuss suitable services or plans with you, including steps you ask us to take
            before entering into an agreement;</li>
          <li>keep reasonable records of our communications with you; and</li>
          <li>comply with legal obligations that apply to us.</li>
        </ul>
        <p>
          We rely on the information you voluntarily provide and on your request for us to
          contact you. We do not sell your personal information.
        </p>
      </>
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
    heading: "Service providers and external links",
    body: (
      <>
        <p>
          We use third-party providers to operate this website and deliver enquiries, such as
          website hosting and email delivery providers. They process information on our behalf
          only as needed to provide those services, and we may share information with
          professional advisers or authorities where we are legally required or permitted to do
          so.
        </p>
        <p>
          This website links to third-party services such as WhatsApp and Google Maps. If you
          follow those links, the terms and privacy policies of those services apply to what you
          do there.
        </p>
      </>
    ),
  },
  {
    heading: "Transfers outside the UAE",
    body: (
      <p>
        Some of our service providers may store or process information outside the UAE. Where
        personal information is transferred outside the UAE, we will do so only in line with the
        data protection laws that apply to us.
      </p>
    ),
  },
  {
    heading: "How long we keep information",
    body: (
      <p>
        We keep enquiry information for as long as it is reasonably needed to respond to you, to
        manage any resulting business relationship, to resolve disputes, and to meet legal,
        accounting or regulatory requirements. When information is no longer needed for these
        purposes, we delete or anonymise it.
      </p>
    ),
  },
  {
    heading: "Security",
    body: (
      <p>
        We take reasonable organisational and technical measures to protect the information we
        hold, including limiting access to staff who need it. No method of transmission or
        storage is completely secure, so we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    heading: "Your rights and privacy requests",
    body: (
      <>
        <p>
          Depending on the law that applies, you may have the right to request access to the
          personal information we hold about you, to ask for it to be corrected or deleted, to
          restrict or object to certain processing, and to withdraw consent you have given.
          These rights are subject to conditions and legal exceptions, and we may need to
          confirm your identity before acting on a request.
        </p>
        <p>
          To make a request, contact us at <a href={`mailto:${site.email}`}>{site.email}</a> or
          call <a href={`tel:${site.phones[0].tel}`}>{site.phones[0].display}</a>. If you are
          not satisfied with our response, you may also be entitled to raise a complaint with
          the competent UAE data protection authority.
        </p>
      </>
    ),
  },
  {
    heading: "Children",
    body: (
      <p>
        This website is intended for businesses and adults and is not directed at children. We do
        not knowingly collect personal information from children through it.
      </p>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. The current version is always published on
        this page. If you have questions about it, contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" description={description} sections={sections} />;
}