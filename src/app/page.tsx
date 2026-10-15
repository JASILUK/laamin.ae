"use client";

import { useState, useEffect, useCallback, useId, useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  FileText,
  BadgeCheck,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Briefcase,
  MapPin,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import  {BrandArcs}  from "@/components/brand-arcs";
/* ============================================================
   DATA & CONFIGURATION (INCLUDING INTERNATIONAL JURISDICTIONS)
   ============================================================ */

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

const heroFacts: {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  href?: string;
}[] = [
  { id: "office", label: "Office", value: "City Centre Deira, Dubai", icon: MapPin },
  { id: "reach", label: "Global Reach", value: "UAE, US, SG, KSA, QA, OM, KY, PA", icon: Globe },
  { id: "plans", label: "Monthly plans", value: "Six plans from AED 800", icon: Wallet, href: "/plans" },
];

const reachFlags = [
  { code: "ae", name: "United Arab Emirates" },
  { code: "us", name: "United States" },
  { code: "sg", name: "Singapore" },
  { code: "sa", name: "Saudi Arabia" },
  { code: "qa", name: "Qatar" },
  { code: "om", name: "Oman" },
  { code: "ky", name: "Cayman Islands" },
  { code: "pa", name: "Panama" },
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
   HERO SERVICE DEMONSTRATION — CINEMATIC SCENE PLAYER
   ============================================================ */

const SCENE_DURATION_MS = 3500;
const TICK_MS = 500;
const MANUAL_HOLD_MS = 9000;
const SCENE_EASE = [0.16, 1, 0.3, 1] as const;

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

const reveal = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay, ease: SCENE_EASE },
  },
});

const iconReveal: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -15 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 220, damping: 20 } },
};

/* ----- MODERN LETTER-BY-LETTER TITLE REVEAL (3D flip-up) ----- */

const letterStage: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.18, staggerChildren: 0.02 } },
};

const letterFlip: Variants = {
  hidden: { y: "115%", opacity: 0, rotateX: -55 },
  show: {
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.65, ease: SCENE_EASE },
  },
};

const descReveal = reveal(0.55);
const footReveal = reveal(1.25);

/* ----- CINEMATIC SCENE TRANSITIONS (video-cut feel) ----- */

const panelVariants: Variants = {
  enter: (dir: number) => ({
    x: dir * 110,
    opacity: 0,
    scale: 0.97,
    filter: "blur(12px)",
    zIndex: 2,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    zIndex: 2,
    transition: { duration: 0.85, ease: SCENE_EASE },
  },
  exit: (dir: number) => ({
    x: dir * -110,
    opacity: 0,
    scale: 0.97,
    filter: "blur(12px)",
    zIndex: 1,
    transition: { duration: 0.65, ease: [0.32, 0, 0.67, 0] },
  }),
};

const listStage: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.75, staggerChildren: 0.11 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, x: -18, filter: "blur(4px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: SCENE_EASE } },
};

const lineDraw: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, delay: 1.15, ease: SCENE_EASE } },
};

function SceneFrame({
  icon: Icon,
  title,
  description,
  href,
  linkLabel,
  position,
  reduce,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  position: number;
  reduce: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={reduce ? false : "hidden"}
      animate="show"
      className="flex h-full flex-col justify-between [perspective:800px]"
    >
      <div>
        <div className="flex items-center gap-4">
          <motion.span
            variants={iconReveal}
            className="relative grid size-12 shrink-0 place-items-center rounded-xl border border-brand-400/40 bg-brand-400/10 text-brand-300"
          >
            <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
            {!reduce && (
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0.6, scale: 1 }}
                animate={{ opacity: 0, scale: 1.8 }}
                transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
                className="absolute inset-0 rounded-xl border border-brand-400"
              />
            )}
          </motion.span>

          {/* Letter-by-letter masked reveal */}
          <motion.h3
            variants={letterStage}
            className="font-display text-xl leading-tight text-white sm:text-2xl"
            aria-label={title}
          >
            {title.split(" ").map((word, wi) => (
              <span
                key={`${word}-${wi}`}
                aria-hidden="true"
                className="mr-[0.26em] inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom [perspective:600px]"
              >
                {word.split("").map((ch, ci) => (
                  <span key={ci} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
                    <motion.span variants={letterFlip} className="inline-block will-change-transform">
                      {ch}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </motion.h3>
        </div>

        <motion.p variants={descReveal} className="mt-4 max-w-md text-sm leading-relaxed text-navy-300">
          {description}
        </motion.p>

        <div className="mt-5">{children}</div>
      </div>

      <div className="pt-6">
        <motion.span variants={lineDraw} aria-hidden="true" className="block h-px origin-left bg-white/15" />
        <motion.div variants={footReveal} className="flex items-center justify-between pt-4">
          <span className="text-xs tabular-nums text-navy-300/70">{formatPosition(position)}</span>
          <Link
            href={href}
            className="group/link relative inline-flex items-center gap-1.5 overflow-hidden rounded px-3 py-1.5 text-sm font-semibold text-brand-300 transition-colors duration-300 hover:text-navy-950 focus-visible:text-navy-950"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 origin-left scale-x-0 bg-brand-400 transition-transform duration-300 ease-out group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100"
            />
            <span>{linkLabel}</span>
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover/link:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

function OverviewScene({ onSelect, reduce }: { onSelect: (index: number) => void; reduce: boolean }) {
  return (
    <SceneFrame
      icon={Briefcase}
      title="LAAMIN Business Services"
      description={overviewSummary}
      href="/services"
      linkLabel="Explore all services"
      position={1}
      reduce={reduce}
    >
      <motion.ul variants={listStage} className="grid grid-cols-2 gap-2.5">
        {services.map((service, i) => {
          const ServiceIcon = service.icon;
          return (
            <motion.li key={service.slug} variants={listItem}>
              <button
                type="button"
                onClick={() => onSelect(i + 1)}
                className="group relative isolate flex w-full items-center gap-2.5 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-left transition-[translate,scale,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand-400/70 active:scale-[0.98]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-left scale-x-0 bg-brand-400 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <ServiceIcon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-brand-300 transition-colors duration-300 group-hover:text-navy-950 group-focus-visible:text-navy-950"
                  strokeWidth={1.75}
                />
                <span className="text-xs font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-navy-950 group-focus-visible:text-navy-950 sm:text-sm">
                  {service.shortTitle}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="ml-auto size-3.5 shrink-0 text-navy-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-navy-950 group-focus-visible:text-navy-950"
                />
              </button>
            </motion.li>
          );
        })}
      </motion.ul>
    </SceneFrame>
  );
}

function ServiceScene({ service, position, reduce }: { service: Service; position: number; reduce: boolean }) {
  return (
    <SceneFrame
      icon={service.icon}
      title={service.title}
      description={service.summary}
      href={`/services/${service.slug}`}
      linkLabel={`View ${service.shortTitle}`}
      position={position}
      reduce={reduce}
    >
      <p className="mb-2 text-xs font-semibold text-navy-300/80">{service.listLabel}</p>
      <motion.ul variants={listStage} className="space-y-2">
        {service.details.map((detail) => (
          <motion.li
            key={detail}
            variants={listItem}
            className="group/row relative isolate flex items-center gap-3 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:border-brand-400/60"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 origin-left scale-x-0 bg-brand-400/25 transition-transform duration-300 ease-out group-hover/row:scale-x-100 group-focus-visible/row:scale-x-100"
            />
            <CheckCircle2
              aria-hidden="true"
              className="size-4 shrink-0 text-brand-300 transition-transform duration-300 group-hover/row:scale-110"
            />
            <span>{detail}</span>
          </motion.li>
        ))}
      </motion.ul>
    </SceneFrame>
  );
}

/* ============================================================
   ROBUST AUTOPLAY ENGINE (self-healing, never permanently dies)
   ============================================================ */

function HeroServiceDemo() {
  const uid = useId();
  const shouldReduceMotion = useReducedMotion();
  const reduce = Boolean(shouldReduceMotion);

  const [[index, direction], setPage] = useState<[number, number]>([0, 1]);
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Refs only — never gating React state, so nothing can get stuck.
  const lastChangeRef = useRef(Date.now());
  const manualHoldRef = useRef(0);

  const regionRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    lastChangeRef.current = Date.now();
    const timer = window.setTimeout(() => setReady(true), reduce ? 0 : 500);
    return () => window.clearTimeout(timer);
  }, [reduce]);

  const goTo = useCallback((next: number, manual = false) => {
    setPage((prev) =>
      prev[0] === next
        ? prev
        : [next, next > prev[0] ? 1 : -1]
    );
    lastChangeRef.current = Date.now();
    if (manual) manualHoldRef.current = Date.now();
  }, []);

  const advance = useCallback(() => {
    setPage(([current]) => [(current + 1) % SCENE_COUNT, 1]);
    lastChangeRef.current = Date.now();
  }, []);

  /* ----- Bulletproof autoplay -----
     One interval, started once. Every 500ms it checks LIVE state:
     - is the mouse currently over the player? (:hover — cannot get stuck)
     - is the tab currently hidden? (document.hidden — cannot get stuck)
     - was there a manual click within the last 9s? (hold)
     - has the current scene been on screen long enough?
     If all clear -> advance. Self-heals from any edge case. */
  useEffect(() => {
    if (!mounted || !ready) return;

    const scheduler = window.setInterval(() => {
      const hovering = regionRef.current?.matches(":hover") ?? false;
      if (hovering || document.hidden) return;
      if (Date.now() - manualHoldRef.current < MANUAL_HOLD_MS) return;
      if (Date.now() - lastChangeRef.current >= SCENE_DURATION_MS) {
        advance();
      }
    }, TICK_MS);

    return () => window.clearInterval(scheduler);
  }, [mounted, ready, advance]);

  const onPanelPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const onTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    i: number
  ) => {
    let next = i;

    if (event.key === "ArrowRight") {
      next = (i + 1) % SCENE_COUNT;
    } else if (event.key === "ArrowLeft") {
      next = (i - 1 + SCENE_COUNT) % SCENE_COUNT;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = SCENE_COUNT - 1;
    } else {
      return;
    }

    event.preventDefault();
    goTo(next, true);
    tabRefs.current[next]?.focus();
  };

  const renderScene = (i: number, ghost = false) =>
    i === 0 ? (
      <OverviewScene onSelect={(n) => goTo(n, true)} reduce={reduce || ghost} />
    ) : (
      <ServiceScene
        service={services[i - 1]}
        position={i + 1}
        reduce={reduce || ghost}
      />
    );

  return (
    <div
      ref={regionRef}
      role="region"
      aria-label="LAAMIN services overview"
      className="hero-panel-reveal relative"
    >
      <motion.div
        ref={panelRef}
        whileHover={reduce ? undefined : { y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onPointerMove={onPanelPointerMove}
        className="group/panel relative overflow-hidden rounded-2xl border border-white/10 bg-navy-950 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)] ring-1 ring-brand-400/10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand-400/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 size-72 rounded-full bg-navy-700/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-25 opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
          style={{
            background:
              "radial-gradient(360px circle at var(--mx, 50%) var(--my, 0%), rgba(127,203,236,0.10), transparent 70%)",
          }}
        />

        <div className="relative flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-3.5">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
          </span>

          <span className="text-xs font-semibold tracking-wide text-navy-300">
            Service overview
          </span>

          <span className="ml-auto flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`size-2 rounded-full ${
                ready ? "animate-pulse bg-brand-400" : "bg-navy-300/60"
              }`}
            />
          </span>
        </div>

        <div
          role="tablist"
          aria-label="LAAMIN services"
          className="relative grid grid-cols-5 border-b border-white/10"
        >
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
                onClick={() => goTo(i, true)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
                className={`relative flex flex-col items-center gap-1.5 border-r border-white/10 px-1 py-3.5 text-center text-[10px] font-semibold leading-tight transition-colors duration-300 last:border-r-0 focus-visible:outline-offset-[-2px] sm:text-xs ${
                  active
                    ? "bg-brand-400/10 text-white"
                    : "text-navy-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <TabIcon
                  aria-hidden="true"
                  className={`size-4 transition-all duration-300 ${
                    active ? "scale-110 text-brand-300" : "text-navy-300"
                  }`}
                  strokeWidth={1.75}
                />

                <span>{tab.label}</span>

                {active && (
                  <motion.span
                    layoutId={`${uid}-tab-indicator`}
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[3px] overflow-hidden bg-brand-400/25"
                    transition={
                      !mounted || reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 450, damping: 32 }
                    }
                  >
                    {mounted && !reduce ? (
                      <span
                        key={index}
                        className="scene-progress block h-full origin-left bg-brand-400"
                        style={{
                          animationDuration: `${SCENE_DURATION_MS}ms`,
                          animationPlayState: ready ? "running" : "paused",
                        }}
                      />
                    ) : (
                      <span className="block h-full bg-brand-400" />
                    )}
                  </motion.span>
                )}
              </button>
            );
          })}
        </div>

        <div className="relative min-h-[380px] sm:min-h-[350px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              maskImage:
                "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
            }}
          />

          {/* Ghost measuring layer (inert, invisible) */}
          <div
            aria-hidden="true"
            ref={(el) => {
              el?.setAttribute("inert", "");
            }}
            className="invisible pointer-events-none grid"
          >
            {demoTabs.map((tab, i) => (
              <div key={tab.id} className="col-start-1 row-start-1 p-6 sm:p-7">
                {renderScene(i, true)}
              </div>
            ))}
          </div>

          {/* Cinematic overlapping scene transitions */}
          <AnimatePresence mode="popLayout" custom={reduce ? 0 : direction}>
            {ready && (
              <motion.div
                key={index}
                id={`${uid}-panel-${index}`}
                role="tabpanel"
                aria-labelledby={`${uid}-tab-${index}`}
                custom={reduce ? 0 : direction}
                variants={panelVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7"
              >
                {renderScene(index)}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Light sweep across scene change */}
          {ready && !reduce && (
            <motion.span
              key={`sweep-${index}`}
              aria-hidden="true"
              initial={{ x: "-110%" }}
              animate={{ x: "110%" }}
              transition={{
                duration: 1.1,
                delay: 0.15,
                ease: SCENE_EASE,
              }}
              className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-brand-300/15 to-transparent"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}



function FlagStack() {
  const label = reachFlags.map((f) => f.name).join(", ");
  return (
    <div className="flex items-center gap-3">
      <span role="img" aria-label={label} className="flex -space-x-2">
        {reachFlags.map((flag) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={flag.code}
            src={`https://flagcdn.com/w40/${flag.code}.png`}
            srcSet={`https://flagcdn.com/w80/${flag.code}.png 2x`}
            alt=""
            title={flag.name}
            width={24}
            height={24}
            loading="lazy"
            className="relative size-6 rounded-full object-cover ring-2 ring-navy-900 transition-transform duration-200 hover:z-10 hover:-translate-y-0.5"
          />
        ))}
      </span>
      <span className="text-sm text-navy-300">{reachFlags.length} countries</span>
      {/* keeps the original codes for screen readers / SEO */}
      <span className="sr-only">UAE, US, SG, KSA, QA, OM, KY, PA</span>
    </div>
  );
}

function HeroFactsStrip() {
  return (
    <div className="relative border-t border-white/10">
      <Container>
        <ul className="grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {heroFacts.map((fact) => {
            const Icon = fact.icon;
            return (
              <li
                key={fact.id}
                className="group relative flex items-center gap-4 py-4 sm:px-8 sm:first:pl-0 sm:last:pr-0"
              >
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-brand-300 transition-colors duration-300 group-hover:border-brand-400/50 group-hover:bg-brand-400/10"
                >
                  <Icon className="size-[18px]" strokeWidth={1.75} />
                </span>

                <div className="min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-400">
                    {fact.label}
                  </span>

                  <div className="mt-1 text-sm text-white sm:text-base">
                    {fact.id === "reach" ? (
                      <FlagStack />
                    ) : fact.href ? (
                      <Link
                        href={fact.href}
                        className="inline-flex items-center gap-1.5 after:absolute after:inset-0 hover:text-brand-300"
                      >
                        {fact.value}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 text-navy-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-300"
                        />
                      </Link>
                    ) : (
                      fact.value
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}


function HeroCutter() {
  return (
    <div aria-hidden="true" className="relative h-8 bg-navy-900 sm:h-14">
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 block h-full w-full text-white"
      >
        <path d="M0 56 V46 Q720 -14 1440 46 V56 Z" fill="currentColor" />
      </svg>
    </div>
  );
}



/* ============================================================
   MAIN HOMEPAGE COMPONENT
   ============================================================ */

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 text-white">

        <BrandArcs className="inset-0 size-full text-brand-400/30" />


<Container className="relative grid items-start gap-10 pb-14 pt-8 sm:pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-20 lg:pt-12">
          <div>
            <div className="reveal-mask">
              <div className="hero-reveal hero-reveal-1">
                <Eyebrow light>UAE &amp; INTERNATIONAL BUSINESS SERVICES</Eyebrow>
              </div>
            </div>



<div className="reveal-mask mt-6">
  <h1
    className="hero-headline hero-reveal hero-reveal-2 font-display text-[2.5rem] leading-[1.08] tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]"
  >
  <span className="hero-headline-fill">
  <span className="title-shimmer-white">
    {heroHeadline.lead}
  </span>
  {" "}
  <span className="title-shimmer-blue">
    {heroHeadline.accent}
  </span>
</span>

<span aria-hidden="true" className="title-shimmer-sweep">
  {headlineText}
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

          <HeroServiceDemo />
        </Container>

        <HeroFactsStrip />
        <HeroCutter />


      </section>

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

      <section className="py-20 lg:py-28 bg-white text-ink">
        <Container>
          <SectionHeading eyebrow="How it works" title="From first contact to agreed service" />
          <div className="mt-14">
            <ProcessStepsComponent steps={processSteps} />
          </div>
        </Container>
      </section>

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