import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Suspense, type ReactNode } from "react";

import { Container } from "@/components/container";
import { EnquiryForm } from "@/components/enquiry-form";
import { FAQSection } from "@/components/home/FaqSection";
import { FadeUp, LetterReveal } from "@/components/ui/letter-reveal";
import { PageHero } from "@/components/page-hero";
import { Eyebrow } from "@/components/section-heading";
import { site, whatsappUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact LAAMIN",
  description:
    "Contact LAAMIN BUSINESS SET UP SERVICES L.L.C in City Centre Deira, Dubai. Call, email or send an enquiry about business support services and monthly plans.",
  alternates: { canonical: "/contact" },
};

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  "Tanvi Business Center, Horizon Building, Near Clock Tower, Deira, Dubai"
)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

const channels: {
  label: string;
  href: string;
  value: ReactNode;
  external?: boolean;
  icon: ReactNode;
}[] = [
  {
    label: "Call Us",
    href: `tel:${site.phones[0].tel}`,
    icon: <Phone className="size-5" strokeWidth={2} />,
    value: (
      <>
        <span className="block">{site.phones[0].display}</span>
        <span className="block text-navy-900/65">{site.phones[1].display}</span>
      </>
    ),
  },
  {
    label: "WhatsApp",
    href: whatsappUrl,
    external: true,
    icon: (
      <Image
        src="/images/icons/whatsapp.svg"
        alt=""
        width={22}
        height={22}
      />
    ),
    value: "Chat with us",
  },
  {
    label: "Email Us",
    href: `mailto:${site.email}`,
    icon: (
      <Image
        src="/images/icons/gmail.svg"
        alt=""
        width={22}
        height={22}
      />
    ),
    value: <span className="break-all">{site.email}</span>,
  },
  {
    label: "Instagram",
    href: site.instagram,
    external: true,
    icon: (
      <Image
        src="/images/icons/instagram.svg"
        alt=""
        width={22}
        height={22}
      />
    ),
    value: "@laamin_dubai",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* ============================================================ */}
      {/* SECTION 01 — CONTACT HERO                                    */}
      {/* ============================================================ */}
      <PageHero
        title="Let's talk about your business."
        description="Tell us about your requirements. We will discuss the appropriate service or plan and confirm the scope and fees with you."
        crumbs={[{ label: "Contact" }]}
        backgroundImage="/images/contact/contact-hero.jpg"
        overlay="light"

      >
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="#enquiry"
            className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800"
          >
            Send an enquiry
            <ArrowUpRight className="size-4" />
          </a>
          <a
            href={`tel:${site.phones[0].tel}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            <Phone className="size-4" />
            Call {site.phones[0].display}
          </a>
        </div>
      </PageHero>

      {/* ============================================================ */}
      {/* SECTION 02 — CONTACT DETAILS                                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-brand-300/15 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
            style={{
              backgroundImage:
                "linear-gradient(#dfe5ec 1px, transparent 1px), linear-gradient(90deg, #dfe5ec 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        <Container className="relative z-10">
          <div className="max-w-2xl">
            <FadeUp>
              <Eyebrow>Contact Details</Eyebrow>
            </FadeUp>
            <LetterReveal
              as="h2"
              text="Get in touch"
              stagger={0.045}
              className="mt-4 font-display text-3xl tracking-tight text-navy-900 sm:text-4xl"
            />
            <FadeUp delay={0.15}>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Whether you prefer a quick call, a message on WhatsApp, or an
                email, our team is ready to assist you.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.2} className="mt-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  {...(channel.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(4,45,85,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                >
                  <span className="grid size-11 place-items-center rounded-full bg-brand-50 text-brand-700  ring-brand-100">
                    {channel.icon}
                  </span>

                  <div>
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">
                      {channel.label}
                    </span>
                    <span className="mt-1 block font-display text-sm font-semibold leading-snug text-navy-900">
                      {channel.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* SECTION 03 — ENQUIRY FORM (single card)                      */}
      {/* ============================================================ */}
      <section
        id="enquiry"
        className="relative overflow-hidden bg-mist/40 py-16 sm:py-20 lg:py-24"
      >
        <Container className="relative z-10">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-14">
            <div className="flex flex-col gap-6 lg:sticky lg:top-24">
              <div>
                <FadeUp>
                  <Eyebrow>Enquiry Form</Eyebrow>
                </FadeUp>
                <LetterReveal
                  as="h2"
                  text="Tell us what you need"
                  stagger={0.03}
                  className="mt-4 font-display text-3xl tracking-tight text-navy-900 sm:text-4xl"
                />
                <FadeUp delay={0.15}>
                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                    Select the service you are interested in and share a short
                    message. We will review your enquiry and get back to you with
                    the appropriate options, scope, and fees.
                  </p>
                </FadeUp>
              </div>

              <FadeUp delay={0.22}>
                <ul className="space-y-3 text-sm text-muted">
                  <li className="flex gap-3">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand-500" />
                    Choose from individual services or one of our six monthly plans.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand-500" />
                    Scope and fees are confirmed with you before any work begins.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand-500" />
                    Your details are used only to respond to your enquiry.
                  </li>
                </ul>
              </FadeUp>
            </div>

            <Suspense
              fallback={
                <div className="h-[40rem] animate-pulse rounded-3xl border border-line bg-white" />
              }
            >
              <EnquiryForm />
            </Suspense>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* SECTION 04 — OFFICE LOCATION + MAP                           */}
      {/* ============================================================ */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <Container className="relative z-10">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="relative overflow-hidden rounded-3xl border border-line bg-navy-900 p-6 text-white shadow-xl sm:p-10">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-400/20 blur-2xl" />
              <div className="relative">
                <span className="grid size-11 place-items-center rounded-full bg-white/10">
                  <Image
                    src="/images/icons/google-maps.svg"
                    alt=""
                    width={22}
                    height={22}
                  />
                </span>

                <h2 className="mt-5 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-400">
                  <MapPin className="size-4" />
                  Office Location
                </h2>

                <address className="mt-4 text-sm not-italic leading-relaxed text-white/90 sm:text-base">
                  {site.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={site.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-400"
                  >
                    Get directions
                    <ArrowUpRight className="size-4" />
                  </a>
                  <a
                    href={`tel:${site.phones[0].tel}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                  >
                    <Phone className="size-4" />
                    Call office
                  </a>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-lg">
              <iframe
                title="LAAMIN office location on Google Maps"
                src={mapEmbedUrl}
                width="100%"
                height="520"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[420px] w-full sm:h-[520px]"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* SECTION 05 — CONTACT FAQS (from faqData → "contact")         */}
      {/* ============================================================ */}
      <div className="bg-mist/40">
        <FAQSection page="contact" />
      </div>
    </div>
  );
}