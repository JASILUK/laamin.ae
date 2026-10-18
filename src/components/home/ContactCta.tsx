import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function ContactCta() {
  return (
    <section className="bg-navy-950 py-20 text-white text-center border-t border-white/10">
      <Container className="max-w-3xl">
        <Eyebrow light>Ready to get started?</Eyebrow>
        <h2 className="mt-4 font-display text-3xl sm:text-5xl tracking-tight">
          Streamline Your UAE &amp; Global Business Setup Today
        </h2>
        <p className="mt-4 text-navy-300 text-lg">
          Speak with our corporate advisors at City Centre Deira, Dubai (info.laamin@gmail.com).
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/contact" variant="accent">
            Contact Our Team <ArrowRight className="size-4" />
          </ButtonLink>
          <ButtonLink href="/services" variant="outline-light">
            Explore All Services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
