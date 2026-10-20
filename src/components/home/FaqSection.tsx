"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageSquare, ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { faqPageContent, defaultFAQPage, type FAQItem } from "@/lib/faqData";

/* ------------------------------------------------------------------
   Single Accordion Item (Framer Motion + Tailwind)
   ------------------------------------------------------------------ */
function AccordionItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`group overflow-hidden rounded-2xl border transition-colors duration-300 ${
        isOpen
          ? "border-brand-400/50 bg-white shadow-[0_8px_30px_-12px_rgba(43,163,214,0.15)]"
          : "border-line/60 bg-white/60 hover:border-brand-400/30 hover:bg-white"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between p-5 text-left sm:p-6"
      >
        <span
          className={`font-display text-base font-medium transition-colors sm:text-lg ${
            isOpen ? "text-brand-700" : "text-navy-900"
          }`}
        >
          {faq.question}
        </span>
        
        {/* Animated Icon */}
        <span
          className={`ml-4 flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
            isOpen ? "bg-brand-50 text-brand-700" : "bg-mist text-navy-900"
          }`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Plus className="size-5" strokeWidth={2.5} />
          </motion.div>
        </span>
      </button>

      {/* Smooth Height Reveal */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-5 pb-6 text-[15px] leading-relaxed text-muted sm:px-6 sm:pb-7 sm:text-base">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------
   Reusable Contact Card
   ------------------------------------------------------------------ */
function ContactCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900 p-6 shadow-xl sm:p-8 ${className}`}
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-400/20 blur-2xl" />
      
      <div className="relative flex flex-col items-start gap-4">
        <span className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm">
          <MessageSquare className="size-5" />
        </span>
        <div>
          <h4 className="font-display text-lg text-white">Still have questions?</h4>
          <p className="mt-1 text-sm leading-relaxed text-white/70">
            Can't find the answer you're looking for? Our team is here to help.
          </p>
        </div>
        <a
          href="/contact#enquiry"
          className="group mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 transition-colors hover:text-white"
        >
          Contact Support
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Main FAQ Section
   ------------------------------------------------------------------ */
type FAQSectionProps = {
  page?: string;
};

export function FAQSection({ page = defaultFAQPage }: FAQSectionProps) {
  // Get the content based on the current page prop, fallback to default
  const content = faqPageContent[page] ?? faqPageContent[defaultFAQPage];

  // State to manage which accordion is open (defaults to first item)
  const [openId, setOpenId] = useState<string | null>(
    content.items.length > 0 ? content.items[0].id : null
  );

  return (
    <section className="relative py-16 text-ink sm:py-20 lg:py-28">
      <Container className="relative flex flex-col gap-10 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        
        {/* ======================= LEFT COLUMN (Heading & Image) ======================= */}
        <div className="flex flex-col gap-8 lg:sticky lg:top-32 lg:self-start">
          
          {/* Dynamic Heading Area */}
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              <span className="font-display text-[11px] uppercase tracking-[0.25em] text-navy-900">
                {content.eyebrow}
              </span>
            </div>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
              {content.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {content.description}
            </p>
          </div>

          {/* Decorative Image Area (Now visible on mobile, centered) */}
          <div className="relative mt-2 flex aspect-[4/3] w-full max-w-sm mx-auto items-center justify-center overflow-hidden rounded-[24px] lg:mx-0 lg:block">
            <img
              src="/images/faq/support-illustration.svg"
              alt="LAAMIN Support"
              className="h-full w-full object-contain p-4" 
              onError={(e) => {
                // Fallback if image isn't there yet
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          {/* Contact CTA Card (Desktop Only) */}
          <ContactCard className="hidden lg:flex" />
        </div>

        {/* ======================= RIGHT COLUMN (Accordion) ======================= */}
        <div className="space-y-4">
          {content.items.map((faq) => (
            <AccordionItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>

        {/* ======================= CONTACT CTA (Mobile Only) ======================= */}
        {/* This renders after the Accordion on mobile, but is hidden on desktop */}
        <ContactCard className="flex lg:hidden mt-4" />

      </Container>
    </section>
  );
}