import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/container";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero } from "@/components/page-hero";
import { Eyebrow } from "@/components/section-heading";
import { site, whatsappUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact LAAMIN",
  description:
    "Contact LAAMIN BUSINESS SET UP SERVICES L.L.C in City Centre Deira, Dubai. Call, email or send an enquiry about business support services and monthly plans.",
  alternates: { canonical: "/contact" },
};

const actionClass =
  "group flex items-center gap-4 border-b border-line py-5 transition-colors hover:text-brand-700";
const iconClass = "grid size-11 shrink-0 place-items-center bg-navy-900 text-brand-300";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact LAAMIN"
        description="Tell us about your requirements. We will discuss the appropriate service or plan and confirm the scope and fees with you."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="py-20 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Eyebrow>Company details</Eyebrow>
            <h2 className="mt-5 font-display text-3xl leading-tight tracking-tight text-navy-900">
              {site.legalName}
            </h2>

            <ul className="mt-8 border-t border-line">
              {site.phones.map((phone) => (
                <li key={phone.tel}>
                  <a href={`tel:${phone.tel}`} className={actionClass}>
                    <span className={iconClass}>
                      <Phone aria-hidden="true" className="size-5" strokeWidth={1.5} />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                        Call us
                      </span>
                      <span className="mt-1 block text-lg font-semibold text-navy-900 group-hover:text-brand-700">
                        {phone.display}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className={actionClass}>
                  <span className={iconClass}>
                    <Mail aria-hidden="true" className="size-5" strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      Email us
                    </span>
                    <span className="mt-1 block break-all text-lg font-semibold text-navy-900 group-hover:text-brand-700">
                      {site.email}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={actionClass}
                >
                  <span className={iconClass}>
                    <MessageCircle aria-hidden="true" className="size-5" strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      WhatsApp us
                    </span>
                    <span className="mt-1 block text-lg font-semibold text-navy-900 group-hover:text-brand-700">
                      Start a WhatsApp chat
                    </span>
                  </span>
                </a>
              </li>
            </ul>

            <div id="location" className="mt-10 bg-navy-900 p-8 text-white">
              <h2 className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-400">
                <MapPin aria-hidden="true" className="size-4" />
                Office location
              </h2>
              <address className="mt-5 text-lg not-italic leading-relaxed">
                {site.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={site.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 underline decoration-brand-500 underline-offset-8 hover:text-white"
              >
                View Office Location
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <Eyebrow>Enquiry form</Eyebrow>
            <h2 className="mt-5 font-display text-4xl tracking-tight text-navy-900">
              Send us an enquiry
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              Share a few details and the LAAMIN team will get back to you.
            </p>
            <div className="mt-8">
              <Suspense fallback={<div className="h-[40rem] border border-line bg-white" />}>
                <EnquiryForm />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
