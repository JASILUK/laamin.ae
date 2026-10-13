import { MessageCircle, Phone, Send } from "lucide-react";
import { site, whatsappUrl } from "@/data/site";
import { ButtonLink } from "./button";
import { Container } from "./container";
import { BrandArcs } from "./brand-arcs";

export function ContactCta({
  heading = "Need Support With Your Business Requirements?",
  text = "Tell us what you need. We will discuss the appropriate service or plan and confirm the scope and fees with you.",
  enquiryHref = "/contact",
  enquiryLabel = "Send an Enquiry",
}: {
  heading?: string;
  text?: string;
  enquiryHref?: string;
  enquiryLabel?: string;
}) {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <Container>
        <div className="relative overflow-hidden bg-navy-900 px-6 py-14 text-white sm:px-12 lg:px-20 lg:py-20">
          <BrandArcs className="inset-0 size-full text-brand-400/25" />
          <div className="relative grid items-end gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="max-w-xl font-display text-3xl leading-[1.12] tracking-tight text-balance sm:text-[2.75rem]">
                {heading}
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-navy-300">{text}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row xl:justify-end">
              <ButtonLink href={enquiryHref} variant="accent">
                <Send aria-hidden="true" className="size-4" />
                {enquiryLabel}
              </ButtonLink>
              <ButtonLink href={`tel:${site.phones[0].tel}`} variant="outline-light">
                <Phone aria-hidden="true" className="size-4" />
                Call Us
              </ButtonLink>
              <ButtonLink href={whatsappUrl} variant="outline-light">
                <MessageCircle aria-hidden="true" className="size-4" />
                WhatsApp Us
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
