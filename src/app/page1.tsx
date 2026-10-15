"use client";

import { useState, useEffect, useCallback, useId, useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Building2,
  FileText,
  BadgeCheck,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

import type { Metadata } from "next";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* ============================================================
   DATA & CONFIGURATION (INCLUDING INTERNATIONAL JURISDICTIONS)
   ============================================================ */

/* Single source for the hero headline (renders the text and feeds data-text) */
const heroHeadline = {
  lead: "Business Support That",
  accent: "Moves You Forward.",
};
const headlineText = `${heroHeadline.lead} ${heroHeadline.accent}`;

type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  short: string;
  summary: string;
  icon: LucideIcon;
  listLabel: string;
  details: string[];
};

const services: Service[] = [
  {
    slug: "business-setup-services",
    title: "Business Setup Services",
    shortTitle: "Business Setup",
    short: "Complete mainland, freezone, and international corporate structuring across UAE, US, Qatar, Singapore, Saudi, Oman, Cayman & Panama.",
    summary: "Company formation and licensing support in the UAE and key international jurisdictions.",
    icon: Building2,
    listLabel: "Jurisdictions",
    details: ["UAE (Mainland & Freezone)", "US (Delaware / Wyoming LLC)", "Singapore, KSA, Qatar & Oman", "Cayman & Panama Offshore"],
  },
  {
    slug: "pro-services",
    title: "PRO Services",
    shortTitle: "PRO Services",
    short: "Hassle-free government liaison, document attestation, ministry approvals, and regulatory compliance management.",
    summary: "Support with government liaison, document attestation, ministry approvals and regulatory compliance management.",
    icon: ShieldCheck,
    listLabel: "Services include",
    details: ["Ejari & Tenancy Registration", "Labor & Immigration File", "Notary & Attestation"],
  },
  {
    slug: "visa-processing",
    title: "Visa Processing",
    shortTitle: "Visa Processing",
    short: "End-to-end residence visas, employment permits, dependent sponsorships, medical fitness, and Emirates ID coordination.",
    summary: "Support with residence visas, employment permits, dependent sponsorships, medical fitness and Emirates ID coordination.",
    icon: BadgeCheck,
    listLabel: "Services include",
    details: ["Entry Permit Issuance", "Medical Fitness Typing", "Emirates ID Biometrics"],
  },
  {
    slug: "document-clearing",
    title: "Document Clearing",
    shortTitle: "Document Clearing",
    short: "Paperwork clearance and coordination across UAE federal and local departments.",
    summary: "Paperwork clearance and coordination with UAE federal and local departments.",
    icon: FileText,
    listLabel: "Departments covered",
    details: ["Department of Economy", "Ministry of Foreign Affairs", "Municipal Approvals"],
  },
];

const internationalJurisdictions = [
  { country: "United States (US)", type: "Delaware / Wyoming LLC", timeline: "3-5 Days" },
  { country: "Singapore", type: "ACRA Corporate Entity", timeline: "2-4 Days" },
  { country: "Saudi Arabia (KSA)", type: "MISA & Commercial Reg.", timeline: "5-10 Days" },
  { country: "Qatar", type: "QFC & Mainland Setup", timeline: "7-12 Days" },
  { country: "Oman", type: "MOCI Registration", timeline: "5-7 Days" },
  { country: "Cayman Islands", type: "Offshore Exempted Company", timeline: "3-5 Days" },
  { country: "Panama", type: "International Business Corp.", timeline: "4-6 Days" },
];

const focusAreas = [
  "Business support & global formations",
  "Government-related administrative processes",
  "Employment and visa documentation",
  "Licensing administration",
  "Document services",
];

const heroFacts = [
  { label: "Office", value: "City Centre Deira, Dubai" },
  { label: "Global Reach", value: "UAE, US, SG, KSA, QA, OM, KY, PA" },
  { label: "Monthly plans", value: "Six plans from AED 800" },
];

const homeFaqs = [
  {
    q: "Can LAAMIN handle international company formations alongside UAE setup?",
    a: "Yes. In addition to Dubai and UAE mainland/freezone setups, we coordinate formations in the US, Singapore, Saudi Arabia, Qatar, Oman, Cayman Islands, and Panama.",
  },
  {
    q: "What is included in LAAMIN's monthly support plans?",
    a: "Our monthly plans cover dedicated professional service charges for PRO tasks, document clearing, visa processing oversight, and regular compliance updates.",
  },
  {
    q: "How long does standard visa processing take?",
    a: "With our priority PRO liaison, standard residence visa stamping and Emirates ID registration typically complete within 3 to 5 working days after medical clearance.",
  },
];

const plans = [
  { id: "bronze", name: "Bronze", price: 800, employees: "1–50" },
  { id: "silver", name: "Silver", price: 2000, employees: "51–100" },
  { id: "gold", name: "Gold", price: 3000, employees: "101–150" },
  { id: "platinum", name: "Platinum", price: 5000, employees: "151–250" },
  { id: "diamond", name: "Diamond", price: 7000, employees: "251–400" },
  { id: "elite", name: "Elite", price: 10000, employees: "400+" },
];

const processSteps = [
  { title: "Initial Consultation", text: "We discuss your exact business activities, jurisdiction (UAE or International), and structure." },
  { title: "Documentation & Filing", text: "Our team prepares, reviews, and submits all required paperwork to official registries." },
  { title: "Approval & Issuance", text: "We track official progress until your license, corporate documents, or visa are successfully issued." },
];

const reasons = [
  { title: "Dedicated Specialists", text: "Assigned account handlers who know your file inside out." },
  { title: "Transparent Pricing", text: "Clear monthly professional fees with zero hidden markups." },
  { title: "Global & Local Expertise", text: "Seamless handling for UAE operations and international jurisdictions." },
];

/* ============================================================
   REUSABLE UI COMPONENTS
   ============================================================ */

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={`inline-block text-xs font-semibold uppercase tracking-[0.25em] ${light ? "text-brand-300" : "text-brand-700"}`}>
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  className = "",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`mt-4 font-display text-3xl tracking-tight sm:text-4xl ${light ? "text-white" : "text-navy-900"}`}>{title}</h2>
      {description && <p className={`mt-3 max-w-2xl text-lg leading-relaxed ${light ? "text-navy-300" : "text-muted"}`}>{description}</p>}
    </div>
  );
}

function ButtonLink({
  href,
  children,
  variant = "accent",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "accent" | "outline" | "outline-light";
  className?: string;
}) {
  const base = "inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold transition-all duration-200 rounded-none";
  const variants = {
    accent: "bg-brand-400 text-navy-950 hover:bg-brand-300 shadow-lg shadow-brand-500/20",
    outline: "border border-line text-navy-900 hover:bg-mist",
    "outline-light": "border border-white/30 text-white hover:bg-white/10",
  };
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

function BrandArcs({ className = "" }: { className?: string }) {
  return (
    <svg className={`pointer-events-none absolute opacity-20 ${className}`} fill="none" viewBox="0 0 800 800" aria-hidden="true">
      <circle cx="400" cy="400" r="300" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
      <circle cx="400" cy="400" r="500" stroke="currentColor" strokeWidth="1" />
      <circle cx="400" cy="400" r="700" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

function ContactCta() {
  return (
    <section className="bg-navy-950 py-20 text-white text-center border-t border-white/10">
      <Container className="max-w-3xl">
        <Eyebrow light>Ready to get started?</Eyebrow>
        <h2 className="mt-4 font-display text-3xl sm:text-5xl tracking-tight">Streamline Your UAE &amp; Global Business Setup Today</h2>
        <p className="mt-4 text-navy-300 text-lg">Speak with our corporate advisors at City Centre Deira, Dubai (info.laamin@gmail.com).</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/contact" variant="accent">Contact Our Team <ArrowRight className="size-4" /></ButtonLink>
          <ButtonLink href="/services" variant="outline-light">Explore All Services</ButtonLink>
        </div>
      </Container>
    </section>
  );
}

function FaqList({ faqs }: { faqs: typeof homeFaqs }) {
  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <details key={idx} className="group border border-line bg-paper p-6 transition-all">
          <summary className="flex cursor-pointer items-center justify-between font-display text-lg text-navy-900">
            {faq.q}
            <span className="ml-4 transition-transform group-open:rotate-45 text-brand-700 font-bold">+</span>
          </summary>
          <p className="mt-4 text-muted leading-relaxed">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}

function ProcessStepsComponent({ steps }: { steps: typeof processSteps }) {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {steps.map((step, idx) => (
        <div key={step.title} className="relative border border-line bg-paper p-8">
          <span className="font-display text-3xl text-brand-700">0{idx + 1}</span>
          <h3 className="mt-4 font-display text-xl text-navy-900">{step.title}</h3>
          <p className="mt-2 text-muted leading-relaxed">{step.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   HERO SERVICE DEMONSTRATION (5 SCENES) - ALL-WHITE CLEAN THEME
   ============================================================ */

const SCENE_DURATION_MS = 4800;
const MANUAL_HOLD_MS = 9000;
const SCENE_EASE = [0.22, 1, 0.36, 1] as const;

const overviewSummary =
  "Business setup and administrative support in Dubai, across the UAE and in key international jurisdictions.";

const demoTabs: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "Overview", icon: Briefcase },
  ...services.map((service) => ({ id: service.slug, label: service.shortTitle, icon: service.icon })),
];

const SCENE_COUNT = demoTabs.length;

function formatPosition(position: number) {
  return `${String(position).padStart(2, "0")} / ${String(SCENE_COUNT).padStart(2, "0")}`;
}

function SceneFrame({
  icon: Icon,
  title,
  description,
  href,
  linkLabel,
  position,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  position: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3.5">
        <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-brand-400/30 bg-[#EAF6FC] text-brand-400">
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </span>
        <h3 className="font-display text-xl leading-tight text-[#042D55] sm:text-2xl">{title}</h3>
      </div>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-[#526174]">{description}</p>

      <div className="mt-5">{children}</div>

      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-4">
          <span className="text-xs tabular-nums text-[#526174]/70">{formatPosition(position)}</span>
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 py-1 text-sm font-semibold text-brand-400 transition-colors hover:text-brand-500"
          >
            {linkLabel}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function OverviewScene({ onSelect }: { onSelect: (index: number) => void }) {
  return (
    <SceneFrame
      icon={Briefcase}
      title="LAAMIN Business Services"
      description={overviewSummary}
      href="/services"
      linkLabel="Explore all services"
      position={1}
    >
      <ul className="grid grid-cols-2 gap-2">
        {services.map((service, i) => {
          const ServiceIcon = service.icon;
          return (
            <li key={service.slug}>
              <button
                type="button"
                onClick={() => onSelect(i + 1)}
                className="group flex w-full items-center gap-2.5 rounded-lg border border-[#E2E8F0] bg-white px-3 py-3 text-left transition-colors hover:border-brand-400/40 hover:bg-[#F8FAFC]"
              >
                <ServiceIcon aria-hidden="true" className="size-4 shrink-0 text-brand-400" strokeWidth={1.5} />
                <span className="text-sm font-medium leading-tight text-[#042D55]">{service.shortTitle}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="ml-auto size-3.5 shrink-0 text-[#526174] transition-colors group-hover:text-brand-400"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </SceneFrame>
  );
}

function ServiceScene({ service, position }: { service: Service; position: number }) {
  return (
    <SceneFrame
      icon={service.icon}
      title={service.title}
      description={service.summary}
      href={`/services/${service.slug}`}
      linkLabel={`View ${service.shortTitle} details`}
      position={position}
    >
      <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
        <p className="text-xs font-semibold text-[#526174]">{service.listLabel}</p>
        <ul className="mt-3 space-y-2.5">
          {service.details.map((detail) => (
            <li key={detail} className="flex items-center gap-3 text-sm text-[#042D55]">
              <CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-brand-400" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </SceneFrame>
  );
}

function HeroServiceDemo() {
  const uid = useId();
  const reduceMotion = useReducedMotion();

  const [[index, direction], setPage] = useState<[number, number]>([0, 1]);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [held, setHeld] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);

  const holdTimer = useRef<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const holdAutoplay = useCallback(() => {
    setHeld(true);
    if (holdTimer.current !== null) window.clearTimeout(holdTimer.current);
    holdTimer.current = window.setTimeout(() => {
      setHeld(false);
      holdTimer.current = null;
    }, MANUAL_HOLD_MS);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      setPage((prev) => (prev[0] === next ? prev : [next, next > prev[0] ? 1 : -1]));
      holdAutoplay();
    },
    [holdAutoplay],
  );

  useEffect(() => {
    return () => {
      if (holdTimer.current !== null) window.clearTimeout(holdTimer.current);
    };
  }, []);

  useEffect(() => {
    const onVisibility = () => setPageHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const paused = Boolean(reduceMotion) || hovered || keyboardFocus || held || pageHidden;
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => {
      setPage(([current]) => [(current + 1) % SCENE_COUNT, 1]);
    }, SCENE_DURATION_MS);
    return () => window.clearTimeout(id);
  }, [index, paused]);

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (event.key === "ArrowRight") next = (i + 1) % SCENE_COUNT;
    else if (event.key === "ArrowLeft") next = (i - 1 + SCENE_COUNT) % SCENE_COUNT;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = SCENE_COUNT - 1;
    else return;
    event.preventDefault();
    goTo(next);
    tabRefs.current[next]?.focus();
  };

  const slide = reduceMotion ? 0 : 18;
  const sceneVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * slide }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -slide }),
  };

  const renderScene = (i: number) =>
    i === 0 ? <OverviewScene onSelect={goTo} /> : <ServiceScene service={services[i - 1]} position={i + 1} />;

  return (
    <div
      role="region"
      aria-label="LAAMIN services overview"
      className="hero-panel-reveal relative"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setHovered(false);
      }}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") holdAutoplay();
      }}
      onFocus={(e) => {
        if (e.target.matches(":focus-visible")) setKeyboardFocus(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setKeyboardFocus(false);
      }}
    >
      <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] shadow-[0_12px_32px_-12px_rgba(4,45,85,0.16),0_3px_8px_rgba(4,45,85,0.06)]">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#E2E8F0] bg-[#F3F7FB] px-4 py-3">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#CBD5E1]" />
            <span className="size-2.5 rounded-full bg-[#CBD5E1]" />
            <span className="size-2.5 rounded-full bg-[#CBD5E1]" />
          </span>
          <span className="text-xs font-medium text-[#526174]">Service overview</span>
        </div>

        {/* Scene selectors */}
        <div role="tablist" aria-label="LAAMIN services" className="grid grid-cols-5 border-b border-[#E2E8F0] bg-white">
          {demoTabs.map((tab, i) => {
            const active = i === index;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={active}
                aria-controls={active ? `${uid}-panel-${i}` : undefined}
                tabIndex={active ? 0 : -1}
                onClick={() => goTo(i)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
                className={`relative flex flex-col items-center gap-1.5 border-r border-[#E2E8F0] px-1 py-3 text-center text-[10px] font-medium leading-tight transition-colors last:border-r-0 focus-visible:outline-offset-[-2px] sm:text-xs ${
                  active ? "bg-[#EAF6FC] text-[#042D55]" : "bg-white text-[#526174] hover:bg-[#F8FAFC] hover:text-[#042D55]"
                }`}
              >
                <TabIcon
                  aria-hidden="true"
                  className={`size-4 ${active ? "text-brand-400" : "text-[#526174]"}`}
                  strokeWidth={1.5}
                />
                <span>{tab.label}</span>
                {active && (
                  <motion.span
                    layoutId={`${uid}-tab-indicator`}
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-400"
                    transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Scenes Container - Fully White background */}
        <div className="relative bg-[#FFFFFF]">
          <div aria-hidden="true" className="invisible grid">
            {demoTabs.map((tab, i) => (
              <div key={tab.id} className="col-start-1 row-start-1 p-5 sm:p-6">
                {renderScene(i)}
              </div>
            ))}
          </div>

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              id={`${uid}-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`${uid}-tab-${index}`}
              custom={direction}
              variants={sceneVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduceMotion ? 0.15 : 0.42, ease: SCENE_EASE }}
              className="absolute inset-0 p-5 sm:p-6 bg-[#FFFFFF]"
            >
              {renderScene(index)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN HOMEPAGE COMPONENT
   ============================================================ */

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <BrandArcs className="inset-0 size-full text-brand-400/30" />

        <Container className="relative grid items-center gap-12 pb-14 pt-8 sm:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-20 lg:pt-16">
          
          {/* Left Content (Masked Slide-Up & Stroke-to-Fill Headline) */}
          <div>
            <div className="reveal-mask">
              <div className="hero-reveal hero-reveal-1">
                <Eyebrow light>UAE &amp; INTERNATIONAL BUSINESS SERVICES</Eyebrow>
              </div>
            </div>

            <div className="reveal-mask mt-6">
              <h1
                className="hero-headline hero-reveal hero-reveal-2 font-display text-[2.5rem] leading-[1.08] tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]"
                data-text={headlineText}
              >
                <span className="hero-headline-fill">
                  {heroHeadline.lead}{" "}
                  <span className="text-brand-400">{heroHeadline.accent}</span>
                </span>
              </h1>
            </div>

            <div className="reveal-mask mt-6">
              <p className="hero-reveal hero-reveal-3 max-w-xl text-lg leading-relaxed text-navy-300">
                LAAMIN BUSINESS SET UP SERVICES L.L.C provides business setup, PRO services, visa processing, and document clearing in Dubai, UAE, and across key global jurisdictions.
              </p>
            </div>

            <div className="reveal-mask mt-8">
              <div className="hero-reveal hero-reveal-3 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/services" variant="accent">
                  Explore Our Services
                  <ArrowRight aria-hidden="true" className="size-4" />
                </ButtonLink>

                <ButtonLink href="/contact" variant="outline-light">
                  Contact Us
                </ButtonLink>
              </div>
            </div>
          </div>

          {/* Right-Side Service Demonstration (five scenes) */}
          <HeroServiceDemo />

        </Container>

        {/* Hero Facts Footer Strip */}
        <div className="relative border-t border-white/10">
          <Container>
            <dl className="grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {heroFacts.map((fact) => (
                <div key={fact.label} className="py-6 sm:px-8 sm:first:pl-0">
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-base text-white">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 lg:py-28 bg-white text-ink">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>About LAAMIN</Eyebrow>
            <p className="mt-6 font-display text-2xl leading-[1.3] tracking-tight text-navy-900 sm:text-[2rem]">
              LAAMIN BUSINESS SET UP SERVICES L.L.C is a Dubai-based provider of business support and administrative services.
            </p>
          </div>

          <div>
            <p className="text-lg leading-relaxed text-muted">
              We help companies manage the paperwork, applications and follow-up that come with operating in the UAE and internationally, so requirements are handled in an organised way and you always know where things stand.
            </p>

            <ul className="mt-8 border-t border-line">
              {focusAreas.map((area, index) => (
                <li key={area} className="flex items-baseline gap-5 border-b border-line py-4">
                  <span aria-hidden="true" className="font-display text-sm text-brand-700">
                    0{index + 1}
                  </span>
                  <span className="font-medium text-navy-900">{area}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 underline decoration-brand-500 decoration-2 underline-offset-8 hover:text-brand-700"
            >
              More about LAAMIN
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Main Services Grid */}
      <section className="border-y border-line bg-mist py-20 lg:py-28 text-ink">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Our services"
              title="Four areas of business support"
              description="Each service is available on its own or as part of a monthly plan."
            />
            <ButtonLink href="/services" variant="outline" className="self-start lg:self-auto">
              All Services
            </ButtonLink>
          </div>

          <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
            {services.map((service, index) => {
              const SIcon = service.icon;
              return (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col bg-paper p-8 transition-colors hover:bg-white sm:p-10"
                  >
                    <div className="flex items-start justify-between">
                      <span className="grid size-14 place-items-center bg-navy-900 text-brand-300">
                        <SIcon aria-hidden="true" className="size-6" strokeWidth={1.5} />
                      </span>
                      <span aria-hidden="true" className="font-display text-lg text-brand-700">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-8 font-display text-2xl tracking-tight text-navy-900">
                      {service.title}
                    </h3>

                    <p className="mt-3 max-w-md flex-1 leading-relaxed text-muted">
                      {service.short}
                    </p>

                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 group-hover:text-brand-700">
                      View service
                      <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* International Jurisdictions Feature Section */}
      <section className="py-20 bg-navy-950 text-white border-t border-white/10">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow light>Global Expansion</Eyebrow>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl tracking-tight">International Company Formations</h2>
            <p className="mt-3 text-navy-300 text-lg">
              Beyond Dubai and the UAE, LAAMIN assists with corporate setups and registered formations across key global financial hubs.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {internationalJurisdictions.map((j) => (
              <div key={j.country} className="border border-white/15 bg-white/5 p-6 rounded-lg backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <Globe className="size-5 text-brand-400" />
                  <span className="text-[10px] font-mono text-brand-300 bg-brand-400/10 px-2 py-0.5 rounded">
                    {j.timeline}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg text-white">{j.country}</h3>
                <p className="mt-1 text-xs text-navy-300">{j.type}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose LAAMIN */}
      <section className="py-20 lg:py-28 bg-white text-ink">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="Why choose LAAMIN"
            title="Organised support, clearly communicated"
            className="lg:sticky lg:top-32 lg:self-start"
          />

          <ol className="border-t border-line">
            {reasons.map((reason, index) => (
              <li key={reason.title} className="grid gap-x-8 gap-y-2 border-b border-line py-8 sm:grid-cols-[3rem_1fr]">
                <span aria-hidden="true" className="font-display text-2xl text-brand-700">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-navy-900">{reason.title}</h3>
                  <p className="mt-2 max-w-lg leading-relaxed text-muted">{reason.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Monthly Plans Preview */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
        <BrandArcs className="inset-0 size-full text-brand-400/20" />

        <Container className="relative">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              light
              eyebrow="Monthly plans"
              title="Six plans for different team sizes"
              description="Monthly fees cover LAAMIN’s professional service charges. Government and third-party costs are billed separately at actual cost."
            />
            <ButtonLink href="/plans" variant="accent" className="self-start lg:self-auto">
              View All Plans
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          </div>

          <ul className="mt-14 grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <li key={plan.id}>
                <Link
                  href={`/plans#${plan.id}`}
                  className="group flex h-full flex-col bg-navy-900 p-7 transition-colors hover:bg-navy-800 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-400">
                      {plan.name} Plan
                    </h3>
                    <ArrowUpRight aria-hidden="true" className="size-5 text-navy-300 transition-colors group-hover:text-brand-300" />
                  </div>

                  <p className="mt-6 font-display text-3xl tracking-tight sm:text-4xl">
                    AED {plan.price.toLocaleString()}
                    <span className="ml-1 font-sans text-base text-navy-300">/month</span>
                  </p>

                  <p className="mt-3 text-sm text-navy-300">Team size: {plan.employees} employees</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-white text-ink">
        <Container>
          <SectionHeading eyebrow="How it works" title="From first contact to agreed service" />
          <div className="mt-14">
            <ProcessStepsComponent steps={processSteps} />
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="border-t border-line bg-mist py-20 lg:py-28 text-ink">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="FAQs"
            title="Frequently asked questions"
            description="If your question is not covered here, contact us at info.laamin@gmail.com and we will be glad to help."
            className="lg:sticky lg:top-32 lg:self-start"
          />
          <FaqList faqs={homeFaqs} />
        </Container>
      </section>

      <ContactCta />
    </>
  );
}