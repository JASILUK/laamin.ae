"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  MotionConfig,
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Landmark,
  Languages,
  ScrollText,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FadeUp, LetterReveal } from "@/components/ui/letter-reveal";
import { PageHero } from "@/components/page-hero";
import { FAQSection } from "@/components/home/FaqSection";
import { ContactCta } from "@/components/home/ContactCta";
import { site, whatsappUrl } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const HEADER = "var(--site-header-h, 4rem)";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

type Item = { slug: string; title: string; text: string; icon: LucideIcon };

const focusAreas: Item[] = [
  {
    slug: "business-support",
    title: "Business support",
    text: "Day-to-day administrative support for companies operating in the UAE.",
    icon: Briefcase,
  },
  {
    slug: "government-processes",
    title: "Government-related processes",
    text: "Coordination of government-related administrative processes and follow-ups.",
    icon: Landmark,
  },
  {
    slug: "visa-documentation",
    title: "Employment and visa documentation",
    text: "Documentation for work permits, labour processes and visa applications.",
    icon: Users,
  },
  {
    slug: "licensing",
    title: "Licensing administration",
    text: "Trade licence applications, amendments, renewals and related updates.",
    icon: ScrollText,
  },
  {
    slug: "document-services",
    title: "Document services",
    text: "Letter drafting, translation support and document coordination.",
    icon: Languages,
  },
];

/* Same pattern as the Home Services section: one 3D illustration per area. */
const FOCUS_MEDIA: Record<string, { src: string; alt: string }> = {
  "business-support": {
    src: "/images/about/business-support.png",
    alt: "3D illustration representing day-to-day business administrative support",
  },
  "government-processes": {
    src: "/images/about/government-processes.svg",
    alt: "3D illustration representing government administrative coordination",
  },
  "visa-documentation": {
    src: "/images/about/visa-documentation.svg",
    alt: "3D illustration representing visa and work permit documentation",
  },
  licensing: {
    src: "/images/about/licensing.svg",
    alt: "3D illustration representing trade licence applications and renewals",
  },
  "document-services": {
    src: "/images/about/document-services.svg",
    alt: "3D illustration representing letter drafting and document coordination",
  },
};

const processSteps = [
  {
    number: "01",
    title: "Initial consultation",
    text: "We discuss your business activities, service requirements and objectives to understand your needs and identify the appropriate service and procedures.",
  },
  {
    number: "02",
    title: "Requirements & planning",
    text: "We clarify the required documents, applicable service fees, government charges, approvals and next steps. Once the scope is agreed, we guide you through what is needed to proceed.",
  },
  {
    number: "03",
    title: "Documentation & filing",
    text: "We coordinate the preparation and review of the required paperwork and manage application submissions through the relevant UAE authorities and service channels.",
  },
  {
    number: "04",
    title: "Follow-up & completion",
    text: "We follow up on application progress, communicate updates and coordinate any additional requirements. Once processing is complete, we arrange the handover of issued documents.",
  },
];

const commitments = [
  "Service scope confirmed with you before work begins",
  "Fees confirmed with you before work begins",
  "Applications remain subject to the requirements and decisions of the relevant authorities",
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function AboutPageContent() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-white">
        {/* ============================ HERO ============================ */}
        <PageHero
          title="About LAAMIN"
          description="A Dubai-based business support and administrative services provider, working with companies in Dubai and across the UAE."
          crumbs={[{ label: "About" }]}
          backgroundImage="/images/contactcta/contactctabg.jpg"
        >
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink
              href="/contact"
              variant="accent"
              className="w-full sm:w-auto"
            >
              Talk to our team
            </ButtonLink>
            <ButtonLink
              href="/plans"
              variant="outline-light"
              className="w-full sm:w-auto"
            >
              View monthly plans
            </ButtonLink>
          </div>
        </PageHero>

        {/* ===================== COMPANY OVERVIEW ====================== */}
        <section className="relative overflow-x-clip py-16 sm:py-20 lg:py-28">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -right-32 top-10 h-[380px] w-[380px] rounded-full bg-brand-300/15 blur-3xl" />
          </div>

          <Container className="relative">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-20">
              <div>
                <FadeUp>
                  <Eyebrow>Company overview</Eyebrow>
                </FadeUp>

                <LetterReveal
                  as="h2"
                  text="Support that keeps your business moving."
                  stagger={0.03}
                  className="mt-4 font-display text-3xl tracking-tight text-navy-900 sm:text-4xl lg:text-5xl"
                />

                <FadeUp delay={0.15}>
                  <span className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-medium text-muted">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                    <span className="truncate">{site.legalName}</span>
                  </span>
                </FadeUp>

                <FadeUp delay={0.22}>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                    We assist companies with business support,
                    government-related administrative processes, employment and
                    visa documentation, licensing administration and document
                    services — in Dubai and across the UAE.
                  </p>
                </FadeUp>

                <FadeUp delay={0.3}>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <ButtonLink
                      href="/services"
                      variant="accent-on-light"
                      className="w-full sm:w-auto"
                    >
                      Our services
                    </ButtonLink>
                    <ButtonLink
                      href="/contact"
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      Contact us
                    </ButtonLink>
                  </div>
                </FadeUp>
              </div>

              {/* Office card — brand icons match the Contact page */}
              <FadeUp delay={0.15}>
                <div className="relative overflow-hidden rounded-3xl bg-navy-900 p-6 text-white shadow-xl sm:p-8">
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

                    <h3 className="mt-5 font-display text-2xl">
                      Visit our office
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-200 sm:text-base">
                      City Centre Deira, Dubai. Speak with our team in person
                      about your requirements.
                    </p>

                    <div className="mt-6 space-y-1 border-t border-white/15 pt-4">
                      <a
                        href={`mailto:${site.email}`}
                        className="group -mx-2 flex min-h-11 items-center gap-3 rounded-lg px-2 text-sm text-white transition-colors hover:bg-white/5 hover:text-brand-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
                      >
                        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10">
                          <Image
                            src="/images/icons/gmail.svg"
                            alt=""
                            width={16}
                            height={16}
                          />
                        </span>
                        <span className="break-all">{site.email}</span>
                      </a>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group -mx-2 flex min-h-11 items-center gap-3 rounded-lg px-2 text-sm text-white transition-colors hover:bg-white/5 hover:text-brand-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
                      >
                        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10">
                          <Image
                            src="/images/icons/whatsapp.svg"
                            alt=""
                            width={16}
                            height={16}
                          />
                        </span>
                        Chat on WhatsApp
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </Container>
        </section>

        {/* ========================= WHAT WE DO ========================= */}
        {/* Editorial cards — same visual language as Home Services       */}
        <section className="relative overflow-hidden border-y border-line bg-mist/40 py-16 sm:py-20 lg:py-28">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-brand-300/15 blur-3xl" />
          </div>

          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <FadeUp className="flex justify-center">
                <Eyebrow>What we do</Eyebrow>
              </FadeUp>
              <LetterReveal
                as="h2"
                text="Five areas of administrative support"
                stagger={0.03}
                className="mt-4 font-display text-3xl tracking-tight text-navy-900 sm:text-4xl lg:text-5xl"
              />
              <FadeUp delay={0.15}>
                <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
                  One team coordinating the paperwork, filings and follow-ups
                  your business depends on.
                </p>
              </FadeUp>
            </div>

            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
              {focusAreas.map((area, i) => {
                const wide = i < 2;
                const span = wide ? "lg:col-span-3" : "lg:col-span-2";
                const lastOdd =
                  i === focusAreas.length - 1 && focusAreas.length % 2 === 1
                    ? "sm:col-span-2"
                    : "";
                return (
                  <motion.li
                    key={area.slug}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.6,
                      delay: (i % 3) * 0.08,
                      ease: EASE,
                    }}
                    className={`${span} ${lastOdd}`}
                  >
                    <FocusEditorialCard area={area} index={i} wide={wide} />
                  </motion.li>
                );
              })}
            </ul>
          </Container>
        </section>

        {/* ============ HOW WE WORK WITH CLIENTS (single, stacked) ====== */}
        <HowItWorksSection />

        {/* ======================== COMMITMENT ========================== */}
        <section className="relative py-16 sm:py-20 lg:py-28">
          <Container>
            <FadeUp>
              <div className="relative overflow-hidden rounded-[28px] bg-navy-900 px-6 py-10 text-white shadow-xl sm:px-12 sm:py-14 lg:px-16 lg:py-16">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-brand-300/10 blur-3xl"
                />

                <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
                  <div>
                    <Eyebrow light>Our commitment</Eyebrow>
                    <h2 className="mt-4 font-display text-3xl tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                      Responsive support, organised delivery.
                    </h2>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-200 sm:text-lg">
                      We aim to respond promptly, keep your documents and
                      processes in order, and deliver the services we have
                      agreed with you.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <ButtonLink
                        href="/services"
                        variant="accent"
                        className="w-full sm:w-auto"
                      >
                        Our services
                      </ButtonLink>
                      <ButtonLink
                        href="/plans"
                        variant="outline-light"
                        className="w-full sm:w-auto"
                      >
                        Monthly plans
                      </ButtonLink>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {commitments.map((text, i) => (
                      <motion.li
                        key={text}
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          duration: 0.6,
                          delay: i * 0.1,
                          ease: EASE,
                        }}
                        className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-5"
                      >
                        <ShieldCheck
                          aria-hidden="true"
                          className="mt-0.5 size-5 shrink-0 text-brand-300"
                        />
                        <span className="text-sm leading-relaxed text-navy-100 sm:text-base">
                          {text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeUp>
          </Container>
        </section>

        {/* ============================ FAQ ============================= */}
        <div className="bg-mist/40">
          <FAQSection page="about" />
        </div>

        {/* ============================ CTA ============================= */}
        <ContactCta />
      </div>
    </MotionConfig>
  );
}

/* ------------------------------------------------------------------ */
/*  Editorial focus card — same language as Home Services              */
/* ------------------------------------------------------------------ */

function FocusEditorialCard({
    area,
    index,
    wide,
  }: {
    area: Item;
    index: number;
    wide: boolean;
  }) {
    const number = String(index + 1).padStart(2, "0");
    const media = FOCUS_MEDIA[area.slug];
  
    return (
      <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-white via-white to-[#eaf4fb] shadow-[0_-16px_36px_-18px_rgba(2,26,51,0.18),0_28px_70px_-32px_rgba(2,26,51,0.4)] transition-[border-color,box-shadow] duration-500 hover:border-brand-400/40">
        {/* top hairline */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent"
        />
  
        {/* ghost number */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-10 right-6 select-none font-display text-[11rem] leading-none text-transparent opacity-[0.07] [-webkit-text-stroke:1.5px_#0e6c9b] sm:text-[14rem]"
        >
          {number}
        </span>
  
        {/* decorative rings */}
        <svg
          aria-hidden
          viewBox="0 0 320 320"
          fill="none"
          className="pointer-events-none absolute -right-20 -top-24 size-[340px] text-brand-700 opacity-[0.07] transition-all duration-700 group-hover:rotate-6 group-hover:opacity-[0.13]"
        >
          <circle cx="160" cy="160" r="80" stroke="currentColor" />
          <circle cx="160" cy="160" r="130" stroke="currentColor" />
          <circle cx="160" cy="160" r="180" stroke="currentColor" />
          <circle
            cx="160"
            cy="160"
            r="105"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="1 8"
          />
        </svg>
  
        <div
          className={`relative grid gap-5 p-6 sm:gap-6 sm:p-8 ${
            wide ? "lg:grid-cols-2 lg:items-center lg:gap-8" : ""
          }`}
        >
          {/* Media plate — grid overlay removed */}
          <div
            className={`relative mx-auto w-full ${
              wide ? "max-w-[200px] lg:order-2 lg:max-w-none" : "max-w-[180px]"
            }`}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line/70 bg-gradient-to-br from-mist to-white">
              <div className="relative flex h-full w-full items-center justify-center p-4">
                <Image
                  src={media.src}
                  alt={media.alt}
                  width={400}
                  height={300}
                  sizes="(min-width: 1024px) 30vw, 60vw"
                  className="max-h-full w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
            </div>
          </div>
  
          {/* Copy — badge row removed, heading + body only */}
          <div className={wide ? "lg:order-1" : ""}>
            <h3 className="font-display text-xl leading-tight tracking-tight text-navy-900 sm:text-2xl">
              {area.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              {area.text}
            </p>
          </div>
        </div>
      </div>
    );
  }

/* ------------------------------------------------------------------ */
/*  How It Works — stacked cards + prominent numbers                   */
/* ------------------------------------------------------------------ */

function HowItWorksSection() {
  const listRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.7", "end 0.7"],
  });

  return (
    <section className="relative overflow-x-clip py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <FadeUp className="flex justify-center">
            <Eyebrow>How it works</Eyebrow>
          </FadeUp>
          <LetterReveal
            as="h2"
            text="How we work with clients"
            stagger={0.03}
            className="mt-4 font-display text-3xl tracking-tight text-navy-900 sm:text-4xl lg:text-5xl"
          />
          <FadeUp delay={0.15}>
            <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
              Four clear steps, coordinated end to end.
            </p>
          </FadeUp>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div
            className="lg:sticky lg:self-start"
            style={{ top: `calc(${HEADER} + 2rem)` }}
          >
            <FadeUp>
              <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg">
                From your initial enquiry to the completion of your requested
                service, LAAMIN coordinates the procedures, documentation and
                follow-ups that keep your business moving.
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="/contact"
                  variant="accent-on-light"
                  className="w-full sm:w-auto"
                >
                  Get started
                </ButtonLink>
                <ButtonLink
                  href="/services"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Our services
                </ButtonLink>
              </div>
            </FadeUp>
          </div>

          <ul ref={listRef} className="space-y-5 pb-4">
            {processSteps.map((step, i) => (
              <StackedStepCard
                key={step.number}
                step={step}
                index={i}
                total={processSteps.length}
                progress={scrollYProgress}
              />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function StackedStepCard({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof processSteps)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const scale = useTransform(
    progress,
    [start, 1],
    [1, 1 - 0.04 * (total - 1 - index)]
  );

  return (
    <li
      className="sticky"
      style={{ top: `calc(${HEADER} + 1.5rem + ${index * 0.9}rem)` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ scale, transformOrigin: "top center" }}
        className="relative flex items-start gap-5 overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-[0_24px_60px_-34px_rgba(4,45,85,0.4)] sm:gap-7 sm:p-8"
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-400 to-brand-300"
        />

        <span className="relative shrink-0 font-display text-5xl font-semibold leading-none tracking-tight text-brand-400 sm:text-6xl lg:text-7xl">
          {step.number}
        </span>

        <div className="relative pt-1">
          <h3 className="font-display text-xl text-navy-900 sm:text-2xl">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
            {step.text}
          </p>
        </div>
      </motion.div>
    </li>
  );
}