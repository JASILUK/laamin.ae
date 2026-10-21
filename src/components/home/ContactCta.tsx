"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site, whatsappUrl } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------
   Letter-by-letter reveal for the CTA text (Matches Client Reviews)
   ------------------------------------------------------------------ */
function LetterReveal({
  text,
  className,
  stagger = 0.02,
  baseDelay = 0,
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  stagger?: number;
  baseDelay?: number;
  as?: "p" | "h2";
}) {
  const words = text.split(" ");
  let charIndex = 0;

  const letter: Variants = {
    hidden: { opacity: 0, y: "0.5em", filter: "blur(4px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, delay: baseDelay + i * stagger, ease: EASE },
    }),
  };

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        {words.map((word, wi) => (
          <span key={wi}>
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((char, ci) => (
                <motion.span
                  key={ci}
                  custom={charIndex++}
                  variants={letter}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {wi < words.length - 1 && " "}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Main Contact CTA Section
   ------------------------------------------------------------------ */
export function ContactCta() {
  return (
    // FIXED: Added z-10 to force this section on top of previous wrappers.
    // FIXED: Changed mobile overlap to -mt-4 to hide the line completely.
    <section className="relative z-10 -mt-4 overflow-hidden bg-navy-950 pt-48 pb-24 text-white sm:-mt-px sm:pt-64 sm:pb-32 lg:pt-[22rem]">
      {/* ================= BACKGROUND IMAGE & OVERLAYS ================= */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/contactcta/contactctabg.jpg"
          alt="UAE Business Background"
          className="h-full w-full border-0 object-cover object-center"
          loading="lazy"
          decoding="async"
        />

        {/* Dark Navy Overlay (Ensures text is readable over the image) */}
        <div className="absolute inset-0 bg-navy-950/85" />

        {/* Subtle gradient to fade the image into the footer seamlessly */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent opacity-90" />
      </div>

      {/* 🌟 FOG SPREAD TRANSITION 🌟 */}
      {/* This sits over the image to blend the section above into the dark section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white via-white/90 to-transparent sm:h-96 lg:h-[450px]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.9)_0%,transparent_80%)] blur-2xl sm:h-64 lg:h-80" />
      </div>

      {/* Ambient Brand Glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/10 blur-3xl" />
      </div>

      {/* ================= CONTENT ================= */}
      <Container className="relative z-20 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col items-center"
        >
          <Eyebrow light>Ready to get started?</Eyebrow>

          <LetterReveal
            as="h2"
            text="Streamline Your UAE & Global Business Setup Today"
            stagger={0.015}
            baseDelay={0.1}
            className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-balance"
          />

          <LetterReveal
            as="p"
            text="Speak with our corporate advisors at City Centre Deira, Dubai. Let's discuss your requirements and find the right solution for your business."
            stagger={0.008}
            baseDelay={0.4}
            className="mt-5 max-w-2xl text-base leading-relaxed text-navy-200 sm:text-lg"
          />

          {/* ================= PREMIUM BUTTONS ================= */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1, ease: EASE }}
            className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-5"
          >
            {/* Primary Button — wipe vars handled by ButtonLink */}
            <ButtonLink
              href="/contact"
              variant="accent"
              className="group w-full sm:w-auto"
            >
              Contact Our Team
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>

            {/* Secondary Button (WhatsApp) — target/rel now flow through */}
            <ButtonLink
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline-light"
              className="group w-full sm:w-auto"
            >
              <MessageCircle className="size-4" />
              Chat on WhatsApp
            </ButtonLink>
          </motion.div>

          {/* Quick Email Link - Pulls dynamic Email from site.ts */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-8 text-sm text-navy-300"
          >
            Or email us directly at{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-white underline decoration-brand-400 underline-offset-4 transition-colors hover:text-brand-300"
            >
              {site.email}
            </a>
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}