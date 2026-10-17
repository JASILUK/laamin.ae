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
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  useScroll,
  MotionConfig,
  useMotionValueEvent,
  useSpring,
  useTransform,
  useMotionTemplate,   // 👈 add this
  type MotionValue,
  type Variants,
} from "framer-motion";
import  {BrandArcs}  from "@/components/brand-arcs";
import  {ServicesBottomCutter}  from "@/components/services-bottom-cutter";
import Image from "next/image";

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
    short:
      "Start and structure your business with support for company formation and licensing in the UAE and selected international jurisdictions.",
    summary:
      "From choosing a suitable business structure to navigating formation and licensing procedures, we help simplify the administrative steps involved in establishing your business.",
    icon: Building2,
    listLabel: "Company formation support",
    details: [
      "UAE Mainland Company Setup",
      "UAE Free Zone Company Setup",
      "US Company Formation",
      "International Formation in Selected Jurisdictions",
    ],
  },
  {
    slug: "pro-services",
    title: "PRO Services",
    shortTitle: "PRO Services",
    short:
      "Practical administrative support for government-related procedures, document attestation, approvals, and business compliance requirements in the UAE.",
    summary:
      "We help businesses navigate essential administrative procedures through document coordination, relevant applications, and support with applicable government processes.",
    icon: ShieldCheck,
    listLabel: "PRO support includes",
    details: [
      "Labour and Immigration File Support",
      "Document Attestation and Notary Coordination",
      "Ejari and Tenancy Registration Assistance",
      "Applicable Government Approvals",
    ],
  },
  {
    slug: "visa-processing",
    title: "Visa Processing",
    shortTitle: "Visa Processing",
    short:
      "Visa application assistance for individuals, families, and businesses, including residence, employment, Family Visa, and Golden Visa support.",
    summary:
      "We assist with applicable visa procedures and related administrative requirements, helping applicants understand the process and coordinate the necessary documentation.",
    icon: BadgeCheck,
    listLabel: "Visa assistance includes",
    details: [
      "Residence Visa Assistance",
      "Employment Visa and Permit Coordination",
      "Family Visa and Dependent Sponsorship",
      "Golden Visa Application Assistance",
      "Medical Fitness and Emirates ID Coordination",
    ],
  },
  {
    slug: "document-clearing",
    title: "Document Clearing",
    shortTitle: "Document Clearing",
    short:
      "Document processing and submission coordination to help individuals and businesses navigate applicable UAE administrative procedures.",
    summary:
      "We support the preparation, coordination, and submission of relevant documents for applicable procedures involving UAE government departments and authorities.",
    icon: FileText,
    listLabel: "Document coordination includes",
    details: [
      "Department of Economy Procedures",
      "Ministry of Foreign Affairs Attestation",
      "Municipal Documentation and Approvals",
      "Government Document Submission Support",
    ],
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

const whyChooseContent = {
  eyebrow: "WHY LAAMIN",
  titleLead: "More Than a Service —",
  titleAccent: "Your Trusted Business Partner.",
  description:
    "From establishing your company to managing essential visa and documentation requirements, LAAMIN brings business support services together to help you navigate the process with clarity and confidence.",
  cta: {
    label: "Let's Talk About Your Business",
    href: "/contact",
  },
  items: [
    {
      id: "01",
      title: "Dedicated, Personal Support",
      text: "Business requirements can involve multiple documents, procedures, and decisions. We help you understand the relevant requirements and coordinate the administrative steps involved in your requested services.",
      image: {
        src: "/images/why-laamin/personal-support.png",
        alt: "Illustration representing dedicated personal business support",
      },
    },
    {
      id: "02",
      title: "Clear Fees. Clear Expectations.",
      text: "We explain our professional service fees and distinguish them from applicable government fees and other third-party charges, helping you understand the costs involved before proceeding.",
      image: {
        src: "/images/why-laamin/transparent-pricing.png",
        alt: "Illustration representing transparent professional fees",
      },
    },
    {
      id: "03",
      title: "UAE Knowledge. International Reach.",
      text: "With a focus on UAE business support and assistance with company formation and licensing in selected international jurisdictions, we help businesses explore opportunities across borders.",
      image: {
        src: "/images/why-laamin/global-reach.png",
        alt: "Illustration representing UAE knowledge and international reach",
      },
    },
  ],
};
  

/* ============================================================
   REUSABLE UI COMPONENTS
   ============================================================ */

   function Container({
    children,
    className = "",
    style,
  }: {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }) {
    return (
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
        style={style}
      >
        {children}
      </div>
    );
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
            className="relative grid size-12 shrink-0 place-items-center rounded-xl border border-brand-700/20 bg-white text-brand-700 shadow-sm shadow-navy-900/10"
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
            className="font-display text-xl leading-tight text-navy-900 sm:text-2xl"
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

        <motion.p variants={descReveal} className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          {description}
        </motion.p>

        <div className="mt-5">{children}</div>
      </div>

      <div className="pt-6">
        <motion.span variants={lineDraw} aria-hidden="true" className="block h-px origin-left bg-navy-900/15" />
        <motion.div variants={footReveal} className="flex items-center justify-between pt-4">
          <span className="text-xs tabular-nums text-muted">{formatPosition(position)}</span>
          <Link
            href={href}
            className="group/link relative isolate inline-flex items-center gap-1.5 overflow-hidden rounded px-3 py-1.5 text-sm font-semibold text-brand-700 transition-colors duration-300 hover:text-white focus-visible:text-white"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 origin-left scale-x-0 bg-navy-900 transition-transform duration-300 ease-out group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100"
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
                className="group relative isolate flex w-full items-center gap-2.5 overflow-hidden rounded-xl border border-navy-900/10 bg-white/70 px-3.5 py-3 text-left shadow-sm shadow-navy-900/5 transition-[translate,scale,border-color] duration-300 hover:-translate-y-0.5 hover:border-navy-900 active:scale-[0.98]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-left scale-x-0 bg-navy-900 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <ServiceIcon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-brand-700 transition-colors duration-300 group-hover:text-brand-300 group-focus-visible:text-brand-300"
                  strokeWidth={1.75}
                />
                <span className="text-xs font-semibold leading-tight text-navy-900 transition-colors duration-300 group-hover:text-white group-focus-visible:text-white sm:text-sm">
                  {service.shortTitle}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="ml-auto size-3.5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-white group-focus-visible:text-white"
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
      <p className="mb-2 text-xs font-semibold text-muted">{service.listLabel}</p>
      <motion.ul variants={listStage} className="space-y-2">
        {service.details.map((detail) => (
          <motion.li
            key={detail}
            variants={listItem}
            className="group/row relative isolate flex items-center gap-3 overflow-hidden rounded-lg border border-navy-900/10 bg-white/70 px-3.5 py-2.5 text-sm font-medium text-navy-900 shadow-sm shadow-navy-900/5 transition-colors duration-300 hover:border-brand-700/40"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 origin-left scale-x-0 bg-brand-400/15 transition-transform duration-300 ease-out group-hover/row:scale-x-100 group-focus-visible/row:scale-x-100"
            />
            <CheckCircle2
              aria-hidden="true"
              className="size-4 shrink-0 text-brand-700 transition-transform duration-300 group-hover/row:scale-110"
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
  const shouldReduceMotion = useSafeReducedMotion() ;
  const reduce = Boolean(shouldReduceMotion);

  const [[index, direction], setPage] = useState<[number, number]>([0, 1]);
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Refs only: never gating React state, so nothing can get stuck.
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
    setPage((prev) => (prev[0] === next ? prev : [next, next > prev[0] ? 1 : -1]));
    lastChangeRef.current = Date.now();
    if (manual) manualHoldRef.current = Date.now();
  }, []);

  const advance = useCallback(() => {
    setPage(([current]) => [(current + 1) % SCENE_COUNT, 1]);
    lastChangeRef.current = Date.now();
  }, []);

  /* One interval, started once. Every 500ms it checks LIVE state:
     hover, hidden tab, recent manual click, and scene time on screen. */
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

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
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
      <ServiceScene service={services[i - 1]} position={i + 1} reduce={reduce || ghost} />
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
        className="group/panel relative overflow-hidden rounded-2xl border border-white/70 shadow-[0_30px_70px_-30px_rgba(2,26,51,0.65)] ring-1 ring-navy-900/10"
      >
        {/* frosted ice base: soft white to pale blue, never pure white or strong blue */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(155deg, #fbfdff 0%, #eaf4fb 48%, #d6e9f7 100%)",
          }}
        />
        {/* soft sky glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-brand-300/35 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 size-72 rounded-full bg-brand-400/15 blur-3xl"
        />
        {/* cursor spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-25 opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
          style={{
            background:
              "radial-gradient(360px circle at var(--mx, 50%) var(--my, 0%), rgba(43,163,214,0.12), transparent 70%)",
          }}
        />

        {/* header bar */}
        <div className="relative flex items-center gap-3 border-b border-navy-900/10 bg-white/50 px-4 py-3.5">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-navy-900/20" />
            <span className="size-2.5 rounded-full bg-navy-900/20" />
            <span className="size-2.5 rounded-full bg-navy-900/20" />
          </span>

          <span className="text-xs font-semibold tracking-wide text-navy-800">Service overview</span>

          <span className="ml-auto flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`size-2 rounded-full ${
                ready ? "animate-pulse bg-brand-700" : "bg-navy-900/25"
              }`}
            />
          </span>
        </div>

        {/* tabs */}
        <div
          role="tablist"
          aria-label="LAAMIN services"
          className="relative grid grid-cols-5 border-b border-navy-900/10"
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
                className={`relative flex flex-col items-center gap-1.5 border-r border-navy-900/10 px-1 py-3.5 text-center text-[10px] font-semibold leading-tight transition-colors duration-300 last:border-r-0 focus-visible:outline-offset-[-2px] sm:text-xs ${
                  active
                    ? "bg-white/80 text-navy-900"
                    : "text-muted hover:bg-white/50 hover:text-navy-900"
                }`}
              >
                <TabIcon
                  aria-hidden="true"
                  className={`size-4 transition-all duration-300 ${
                    active ? "scale-110 text-brand-700" : "text-muted"
                  }`}
                  strokeWidth={1.75}
                />

                <span>{tab.label}</span>

                {active && (
                  <motion.span
                    layoutId={`${uid}-tab-indicator`}
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[3px] overflow-hidden bg-navy-900/10"
                    transition={
                      !mounted || reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 450, damping: 32 }
                    }
                  >
                    {mounted && !reduce ? (
                      <span
                        key={index}
                        className="scene-progress block h-full origin-left bg-brand-700"
                        style={{
                          animationDuration: `${SCENE_DURATION_MS}ms`,
                          animationPlayState: ready ? "running" : "paused",
                        }}
                      />
                    ) : (
                      <span className="block h-full bg-brand-700" />
                    )}
                  </motion.span>
                )}
              </button>
            );
          })}
        </div>

        {/* scene area */}
        <div className="relative min-h-[380px] sm:min-h-[350px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(rgba(4,45,85,0.08) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
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
              transition={{ duration: 1.1, delay: 0.15, ease: SCENE_EASE }}
              className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/70 to-transparent"
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
<div className="relative z-10 border-t border-transparent">     
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
  const reduce = useSafeReducedMotion() ;

  const drift = (from: string, to: string, duration: number) =>
    reduce
      ? {}
      : {
          initial: { x: from },
          animate: { x: to },
          transition: {
            duration,
            repeat: Infinity,
            repeatType: "mirror" as const,
            ease: "easeInOut" as const,
          },
        };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative z-0 -mt-10 h-44 overflow-hidden sm:-mt-14 sm:h-60 lg:-mt-20 lg:h-72"
    >
      {/* 1. Base: transparent top (hero shows through), eases into the boundary haze #e3f1fa */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom,
            rgba(4,45,85,0) 0%,
            rgba(30,110,170,0.10) 8%,
            rgba(43,140,195,0.24) 20%,
            rgba(70,165,215,0.38) 34%,
            rgba(110,195,232,0.52) 48%,
            rgba(160,215,240,0.68) 62%,
            rgba(200,228,246,0.86) 78%,
            #e3f1fa 100%)`,
        }}
      />

      {/* 2. Fog A */}
      <motion.div
        className="absolute inset-y-0 -left-[30%] w-[160%] transform-gpu will-change-transform"
        style={{
          background: [
            "radial-gradient(ellipse 38% 55% at 22% 52%, rgba(127,203,236,0.55), transparent 70%)",
            "radial-gradient(ellipse 34% 48% at 58% 62%, rgba(43,163,214,0.38), transparent 72%)",
            "radial-gradient(ellipse 30% 50% at 86% 48%, rgba(127,203,236,0.45), transparent 70%)",
          ].join(","),
        }}
        {...drift("-4%", "4%", 26)}
      />

      {/* 3. Fog B */}
      <motion.div
        className="absolute inset-y-0 -left-[30%] w-[160%] transform-gpu will-change-transform"
        style={{
          background: [
            "radial-gradient(ellipse 36% 42% at 14% 70%, rgba(176,222,244,0.60), transparent 72%)",
            "radial-gradient(ellipse 40% 46% at 46% 74%, rgba(150,210,240,0.50), transparent 74%)",
            "radial-gradient(ellipse 34% 44% at 78% 72%, rgba(176,222,244,0.55), transparent 72%)",
          ].join(","),
        }}
        {...drift("4%", "-4%", 32)}
      />

      {/* 4. Grain, faded at both edges */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 30%, black 65%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 30%, black 65%, transparent 100%)",
        }}
      />

      {/* 5. Flat boundary colour at the very bottom, so the edge is one uniform tint (NOT white) */}
      <div
        className="absolute inset-x-0 -bottom-0.5 h-1/4"
        style={{
          background:
            "linear-gradient(to bottom, rgba(227,241,250,0) 0%, #e3f1fa 100%)",
        }}
      />
    </div>
  );
}


function FogSpill() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-px h-40 sm:h-52"
      style={{
        // starts at exactly the cutter's bottom colour, then eases to transparent
        background: `linear-gradient(to bottom,
          #e3f1fa 0%,
          rgba(227,241,250,0.82) 18%,
          rgba(227,241,250,0.58) 38%,
          rgba(227,241,250,0.34) 58%,
          rgba(227,241,250,0.14) 78%,
          rgba(227,241,250,0) 100%)`,
      }}
    />
  );
}

/* ============================================================
   ABOUT → SERVICES DIVIDER
   White (About) arcs down into navy-900 (Services) to match
   the hero. Brand-arc linework only.
   ============================================================ */

function AboutServicesDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative -mb-px h-20 overflow-hidden bg-white sm:h-24 lg:h-28"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* white base — matches About bottom */}
        <rect width="1440" height="120" fill="#ffffff" />

        {/* navy arc sweeping down into Services */}
        <path
          d="M 0 120 L 0 74 Q 720 8 1440 74 L 1440 120 Z"
          fill="#042d55"
        />

        {/* brand linework above the arc */}
        <g stroke="#2ba3d6" fill="none" strokeLinecap="round">
          <path
            d="M -80 58 Q 720 -8 1520 58"
            strokeOpacity="0.42"
            strokeWidth="1.2"
          />
          <path
            d="M -80 74 Q 720 8 1520 74"
            strokeOpacity="0.24"
            strokeWidth="1"
          />
          <path
            d="M -80 90 Q 720 24 1520 90"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        </g>

        <path
          d="M -80 46 Q 720 -20 1520 46"
          stroke="#7fcbec"
          strokeOpacity="0.5"
          strokeWidth="1"
          strokeDasharray="1 10"
        />
      </svg>
    </div>
  );
}

/* ============================================================
   ABOUT SECTION
   ============================================================ */

   const aboutContent = {
    eyebrow: "About LAAMIN",
    headlineLead: "Business Support That",
    headlineAccent: "Moves You Forward.",
    description:
      "Dubai-based business support for company formation, PRO services, visa processing, and document clearing, with international company formation support.",
  
    intro:
      "LAAMIN BUSINESS SET UP SERVICES L.L.C. is a Dubai-based business support company helping businesses and individuals navigate company formation, licensing, and essential administrative procedures. Our services include business setup and licensing, PRO services, visa processing, document clearing, Family Visa assistance, Golden Visa assistance, and related company administration support across the UAE.",
  
    global:
      "Beyond the UAE, we support company formation and business licensing in the United States, Qatar, Singapore, Saudi Arabia, Oman, the Cayman Islands, and Panama.",
  };

const aboutCountries = reachFlags.filter((f) => f.code !== "ae");

const pillStage: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const pillItem: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: SCENE_EASE } },
};

/* ----- hydration-safe mount hook (never branch on useReducedMotion during SSR) ----- */

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
/* true only on lg+ screens; false on server + first render (hydration safe) */
function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

function useSafeReducedMotion() {
  const reduce = useReducedMotion() ;
  const mounted = useMounted();
  return mounted ? Boolean(reduce) : false;   // ← returns TRUE because your OS has reduce motion ON
}

/* ----- small motion helpers ----- */

function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useSafeReducedMotion() ;
  return (
    <motion.div
      className={className}
initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: SCENE_EASE }}
    >
      {children}
    </motion.div>
  );
}

function MaskLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // watch the visible wrapper, NOT the clipped text
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const hidden = { y: "115%", skewY: 4, opacity: 0 };
  const shown = { y: "0%", skewY: 0, opacity: 1 };

  return (
    <span ref={ref} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
      <motion.span
        className={`block origin-bottom-left ${className}`}
        initial={hidden}
        animate={inView ? shown : hidden}
        transition={{ duration: 0.95, delay, ease: SCENE_EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function DrawLine({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  const reduce = useSafeReducedMotion() ;
  return (
    <motion.span
      aria-hidden="true"
      className={`block origin-left ${className}`}
initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: SCENE_EASE }}
    />
  );
}

/* ----- scroll-linked word reveal: opacity rises as you read ----- */

/* ============================================================
   SCROLL-LINKED TEXT REVEAL — MAIN + SMALL DESCRIPTIONS
   • MAIN  → word by word: fades in (+ rises and un-blurs when motion is allowed)
   • SMALL → letter by letter: fades in as scroll progresses
   • Reduced motion → opacity-only fade (still visible, no movement)
   ============================================================ */

function RevealWord({
  word,
  start,
  end,
  progress,
  minOpacity,
  calm,
}: {
  word: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
  minOpacity: number;
  calm: boolean;
}) {
  const s = Math.max(0, Math.min(start, 0.995));
  const e = Math.max(s + 0.005, Math.min(end, 1));

  const opacity = useTransform(progress, [s, e], [minOpacity, 1]);
  const y = useTransform(progress, [s, e], [16, 0]);
  const filter = useTransform(progress, [s, e], ["blur(4px)", "blur(0px)"]);

  return (
    <motion.span
      style={calm ? { opacity } : { opacity, y, filter }}
      className="mr-[0.28em] inline-block"
    >
      {word}
    </motion.span>
  );
}

function RevealLetter({
  char,
  start,
  end,
  progress,
  minOpacity,
}: {
  char: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
  minOpacity: number;
}) {
  const s = Math.max(0, Math.min(start, 0.995));
  const e = Math.max(s + 0.005, Math.min(end, 1));
  const opacity = useTransform(progress, [s, e], [minOpacity, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char}
    </motion.span>
  );
}

type ScrollTextProps = { text: string; className?: string; minOpacity?: number };

/* ---------- MAIN description (right side) ---------- */

function ScrollRevealText(props: ScrollTextProps) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  // server + first client render: plain text (no hydration mismatch)
  if (!mounted) return <p className={props.className}>{props.text}</p>;
  return <ScrollRevealTextLive {...props} calm={Boolean(reduce)} />;
}

function ScrollRevealTextLive({
  text,
  className = "",
  minOpacity = 0.15,
  calm,
}: ScrollTextProps & { calm: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.6"],
  });

  const words = text.split(/\s+/).filter(Boolean);
  const total = words.length;

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => {
          const start = total > 1 ? (i / total) * 0.85 : 0;
          return (
            <RevealWord
              key={`${word}-${i}`}
              word={word}
              start={start}
              end={start + 0.15}
              progress={scrollYProgress}
              minOpacity={minOpacity}
              calm={calm}
            />
          );
        })}
      </span>
    </p>
  );
}

/* ---------- second paragraph (right side): typing driven by scroll ---------- */

function ScrollTypeText(props: ScrollTextProps) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  // typing is motion, so reduced-motion users get the full text
  if (!mounted || reduce) return <p className={props.className}>{props.text}</p>;
  return <ScrollTypeTextLive {...props} />;
}

function ScrollTypeTextLive({ text, className = "" }: ScrollTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.6"],
  });
  const typed = useTransform(scrollYProgress, (v) =>
    text.slice(0, Math.round(v * text.length))
  );
  const caretOpacity = useTransform(scrollYProgress, [0, 0.03, 0.96, 1], [0, 1, 1, 0]);

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        <motion.span>{typed}</motion.span>
        <motion.span
          style={{ opacity: caretOpacity }}
          className="laamin-caret-blink ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] bg-brand-700 align-baseline"
        />
      </span>
    </p>
  );
}

/* ---------- SMALL description (left side): letter by letter ---------- */

function ScrollLetterText(props: ScrollTextProps) {
  const mounted = useMounted();
  // opacity-only, so it is safe to run even with reduced motion
  if (!mounted) return <p className={props.className}>{props.text}</p>;
  return <ScrollLetterTextLive {...props} />;
}

function ScrollLetterTextLive({
  text,
  className = "",
  minOpacity = 0.1,
}: ScrollTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.5"],
  });

  const words = text.split(" ");
  const totalChars = text.replace(/\s+/g, "").length;
  let charIndex = 0;

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
            {word.split("").map((char, ci) => {
              const start = totalChars > 1 ? (charIndex / totalChars) * 0.85 : 0;
              charIndex += 1;
              return (
                <RevealLetter
                  key={ci}
                  char={char}
                  start={start}
                  end={start + 0.15}
                  progress={scrollYProgress}
                  minOpacity={minOpacity}
                />
              );
            })}
            {wi < words.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </span>
    </p>
  );
}
/* ----- scroll-fade description: opacity + blur eases in on scroll ----- */

function ScrollFadeText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useSafeReducedMotion() ;
  const mounted = useMounted();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.65"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["4px", "0px"]);

  if (!mounted || reduce) return <p className={className}>{text}</p>;

  return (
    <motion.p ref={ref} style={{ opacity, y, filter: blur }} className={className}>
      {text}
    </motion.p>
  );
}

/* ----- background: blueprint grid + concentric rings with light parallax ----- */

function AboutBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useSafeReducedMotion() ;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ringsY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-60, 60]);
  const gridY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -40]);

  const vFade =
    "linear-gradient(to bottom, transparent 0, black 200px, black calc(100% - 140px), transparent 100%)";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ maskImage: vFade, WebkitMaskImage: vFade }}
    >
      {/* soft sky light */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 85% 30%, rgba(127,203,236,0.18), transparent 70%)",
        }}
      />

      {/* blueprint grid */}
      <motion.div
        className="absolute inset-x-0 -inset-y-10"
        style={{
          y: gridY,
          backgroundImage:
            "linear-gradient(rgba(4,45,85,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(4,45,85,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 75% 40%, black 10%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 75% 40%, black 10%, transparent 75%)",
        }}
      />

      {/* concentric rings */}
      <motion.svg
        style={{ y: ringsY }}
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMaxYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full text-brand-700"
      >
        <g stroke="currentColor" strokeWidth="1" strokeOpacity="0.16">
          <circle cx="1080" cy="380" r="150" />
          <circle cx="1080" cy="380" r="240" />
          <circle cx="1080" cy="380" r="330" />
          <circle cx="1080" cy="380" r="420" />
          <circle cx="1080" cy="380" r="510" />
        </g>
        <circle
          cx="1080"
          cy="380"
          r="285"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.2"
          strokeDasharray="1 12"
        />
        <circle
          cx="1080"
          cy="380"
          r="465"
          stroke="currentColor"
          strokeOpacity="0.22"
          strokeWidth="1.2"
          strokeDasharray="1 16"
        />
        <g fill="currentColor" fillOpacity="0.35">
          <circle cx="1080" cy="95" r="3" />
          <circle cx="1410" cy="380" r="3" />
          <circle cx="796" cy="602" r="3" />
        </g>

        {/* lower-left counterweight */}
        <g stroke="currentColor" strokeWidth="1" strokeOpacity="0.12">
          <circle cx="0" cy="820" r="200" />
          <circle cx="0" cy="820" r="300" />
          <circle cx="0" cy="820" r="400" />
        </g>
      </motion.svg>
    </div>
  );
}

/* ----- the section ----- */

function AboutSection() {
  return (
    <section className="relative -mt-px bg-white py-20 text-ink lg:py-28">
      <AboutBackdrop />
      <FogSpill />

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* left: sticky headline */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-3">
              <DrawLine className="h-px w-8 bg-brand-700" />
              <Eyebrow>{aboutContent.eyebrow}</Eyebrow>
            </div>

            <h2 className="mt-6 font-display text-4xl leading-[1.08] tracking-tight text-navy-900 sm:text-5xl lg:text-[3.4rem]">
              <MaskLine delay={0.05}>{aboutContent.headlineLead}</MaskLine>
              <MaskLine delay={0.18}>
                <span className="bg-gradient-to-r from-brand-700 to-brand-400 bg-clip-text text-transparent">
                  {aboutContent.headlineAccent}
                </span>
              </MaskLine>
            </h2>

            {/* small description: revealed letter by letter on scroll */}
            {/* small description: revealed letter by letter on scroll */}
            <ScrollLetterText
              text={aboutContent.description}
              className="mt-6 max-w-sm text-base leading-relaxed text-muted min-h-[6em]"
            />

            <DrawLine delay={0.5} className="mt-8 h-0.5 w-16 bg-brand-400" />
          </div>

          {/* right: scroll-driven copy (low opacity, rises as you scroll) */}
          <div className="space-y-8">
            <ScrollRevealText
              text={aboutContent.intro}
              className="font-display text-2xl leading-[1.4] tracking-tight text-navy-900 sm:text-[1.7rem]"
              minOpacity={0.14}
            />

            <ScrollTypeText
              text={aboutContent.global}
              className="min-h-[4.5em] text-lg leading-relaxed text-muted sm:min-h-[3.5em]"
            />

          <motion.ul
            aria-label="International jurisdictions"
            variants={pillStage}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap min-h-[8rem] sm:min-h-0"
          >
            {aboutCountries.map((country) => (
              <motion.li
                key={country.code}
                variants={pillItem}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-navy-900 shadow-sm shadow-navy-900/5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://flagcdn.com/w40/${country.code}.png`}
                  srcSet={`https://flagcdn.com/w80/${country.code}.png 2x`}
                  alt=""
                  width={16}
                  height={16}
                  loading="lazy"
                  className="size-4 rounded-full object-cover"
                />
                {country.name}
              </motion.li>
            ))}
          </motion.ul>
          </div>
        </div>

        {/* CTA row: buttons left, line in the middle, About link bottom-right */}
        <Reveal delay={0.1} className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/services" variant="accent">
              Explore Our Services
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact Enquiry
            </ButtonLink>
          </div>

          <DrawLine delay={0.4} className="hidden h-px flex-1 bg-line sm:block" />

          <Link
            href="/about"
            className="group/about inline-flex items-center gap-2 self-start text-sm font-semibold text-navy-900 transition-colors hover:text-brand-700 sm:self-auto"
          >
            <span className="border-b border-navy-900/30 pb-0.5 transition-colors group-hover/about:border-brand-700">
              About detail page
            </span>
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-full border border-line transition-all duration-300 group-hover/about:border-brand-700 group-hover/about:bg-brand-700 group-hover/about:text-white"
            >
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}


/* ============================================================
   SERVICES — EDITORIAL STICKY STACK (FIXED)
   • Section does NOT have overflow-hidden (that broke sticky).
   • Backdrop lives in its own clipped wrapper.
   • White cards with a subtle brand arc inside each.
   • Inside content fades/slides in on entry (staggered),
     and gently dims as the next card covers it.
   ============================================================ */

const SERVICE_MEDIA: Record<string, { src: string; alt: string }> = {
  "business-setup-services": {
    src: "/images/services/business-setup.png",
    alt: "3D illustration representing company formation and business licensing support",
  },
  "pro-services": {
    src: "/images/services/pro-services.png",
    alt: "3D illustration representing government liaison and PRO services",
  },
  "visa-processing": {
    src: "/images/services/visa-processing.png",
    alt: "3D illustration representing visa processing and Emirates ID support",
  },
  "document-clearing": {
    src: "/images/services/document-clearing.png",
    alt: "3D illustration representing document clearing and attestation support",
  },
};

/* stagger for inside content of each card */
const insideStage: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.05, staggerChildren: 0.09 } },
};

const insideItem: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: SCENE_EASE },
  },
};

const insideMedia: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, delay: 0.15, ease: SCENE_EASE },
  },
};

const CARD_TINTS = [
  "from-white via-white to-[#eaf4fb]",
  "from-white via-[#f6fafd] to-[#e3f1fa]",
  "from-white via-white to-[#eef6fc]",
  "from-white via-[#f6fafd] to-[#e8f3fb]",
];

function ServiceEditorialCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLElement | null>(null);
  const number = String(index + 1).padStart(2, "0");
  const href = `/services/${service.slug}`;
  const media = SERVICE_MEDIA[service.slug];
  const reduce = useSafeReducedMotion();

  const inView = useInView(cardRef, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <motion.article
      ref={cardRef}
      initial="hidden"
      animate={inView || reduce ? "show" : "hidden"}
      className={`group relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br ${CARD_TINTS[index % CARD_TINTS.length]} shadow-[0_-16px_36px_-18px_rgba(2,26,51,0.28),0_28px_70px_-32px_rgba(2,26,51,0.55)] transition-[border-color,box-shadow] duration-500 hover:border-brand-400/40`}
    >
      {/* top hairline */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent"
      />

      {/* giant outlined number watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-6 select-none font-display text-[11rem] leading-none text-transparent opacity-[0.07] [-webkit-text-stroke:1.5px_#0e6c9b] sm:text-[14rem]"
      >
        {number}
      </span>

      {/* brand rings, top-right */}
      <svg
        aria-hidden="true"
        viewBox="0 0 320 320"
        fill="none"
        className="pointer-events-none absolute -right-20 -top-24 size-[340px] text-brand-700 opacity-[0.07] transition-all duration-700 group-hover:rotate-6 group-hover:opacity-[0.13]"
      >
        <circle cx="160" cy="160" r="80" stroke="currentColor" />
        <circle cx="160" cy="160" r="130" stroke="currentColor" />
        <circle cx="160" cy="160" r="180" stroke="currentColor" />
        <circle cx="160" cy="160" r="105" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1 8" />
      </svg>

      <div className="relative grid items-center gap-5 p-5 sm:gap-8 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:p-12">        {/* text column */}
        <motion.div variants={insideStage} className="order-2 lg:order-1">
          <motion.div variants={insideItem} className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-navy-900 font-display text-sm text-brand-300">
              {number}
            </span>
            <span aria-hidden="true" className="h-px w-10 bg-brand-400/60" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">
              {service.shortTitle}
            </span>
          </motion.div>

          <motion.h3
  variants={insideItem}
  className="mt-4 font-display text-2xl leading-[1.1] tracking-tight text-navy-900 sm:mt-6 sm:text-4xl"
>
            {service.title}
          </motion.h3>

          <motion.p variants={insideItem} className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">            {service.short}
          </motion.p>

          {/* detail chips */}
          <motion.ul variants={insideItem} className="mt-4 flex flex-wrap gap-1.5 sm:mt-6 sm:gap-2">            {service.details.slice(0, 3).map((d) => (
              <li
                key={d}
                className="inline-flex items-center gap-1.5 rounded-full border border-navy-900/10 bg-white/80 px-3 py-1 text-xs font-medium text-navy-900"
              >
                <CheckCircle2 aria-hidden="true" className="size-3.5 text-brand-700" />
                {d}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={insideItem} className="mt-5 sm:mt-8">      
                  <Link
              href={href}
              className="group/cta inline-flex items-center gap-3 text-sm font-semibold text-navy-900 transition-colors hover:text-brand-700"
            >
              <span className="border-b border-navy-900/25 pb-0.5 transition-colors group-hover/cta:border-brand-700">
                Explore service
              </span>
              <span className="grid size-9 place-items-center rounded-full border border-line bg-white transition-all duration-300 group-hover/cta:border-brand-700 group-hover/cta:bg-brand-700 group-hover/cta:text-white">
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* illustration column */}
        <motion.div variants={insideMedia} className="order-1 lg:order-2">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-[170px] overflow-hidden rounded-2xl border border-line/70 bg-gradient-to-br from-mist to-white sm:max-w-xs lg:max-w-none">            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(rgba(4,45,85,0.07) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
                maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 80%)",
                WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 80%)",
              }}
            />
            <div className="relative flex h-full w-full items-center justify-center p-6">
              <Image
                src={media.src}
                alt={media.alt}
                width={520}
                height={390}
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="max-h-full w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                priority={index === 0}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

function StackItem({
  service,
  index,
  total,
  progress,
  effects,
}: {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
  effects: boolean;
}) {
  const isLast = index === total - 1;
  const start = index / total;

  const targetScale = isLast ? 1 : 1 - (total - 1 - index) * 0.022;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);

  return (
    <li
    className={`stack-item sticky min-h-[120vh] sm:min-h-[135vh] lg:min-h-[150vh]`}
      style={
        {
          "--stack-top": `calc(2rem + ${index * 10}px)`,
          "--stack-top-lg": `calc(5rem + ${index * 22}px)`,
          top: "var(--stack-top)",
          zIndex: index + 1,
        } as React.CSSProperties
      }
    >
      <motion.div
        style={effects ? { scale } : undefined}
        className="relative origin-top will-change-transform"
      >
        <ServiceEditorialCard service={service} index={index} />
      </motion.div>
    </li>
  );
}

function StickyServicesStack() {
  const ref = useRef<HTMLUListElement>(null);
  const reduce = useSafeReducedMotion();
  const desktop = useIsDesktop();
  const effects = desktop && !reduce;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <ul ref={ref} className="mt-14 -mb-[55vh] sm:-mb-[75vh] lg:-mb-[85vh] lg:mt-20">
            {services.map((service, i) => (
        <StackItem
          key={service.slug}
          service={service}
          index={i}
          total={services.length}
          progress={scrollYProgress}
          effects={effects}
        />
      ))}
    </ul>
  );
}

function ServicesEditorialSection() {
  return (
    <section
      aria-labelledby="services-heading"
      className="relative isolate bg-navy-900 py-20 text-white lg:py-28"
    >
      {/* clipped backdrop: the ONLY place overflow-hidden is used (it would break sticky) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <BrandArcs className="inset-0 size-full text-brand-400/15" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(169,198,221,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(169,198,221,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 90% 65% at 70% 30%, black 10%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 65% at 70% 30%, black 10%, transparent 75%)",
          }}
        />
      </div>

      <Container className="relative">
        <Reveal>
          <div id="services-heading">
            <SectionHeading
              light
              eyebrow="Our Services"
              title="Business Support for Every Stage"
              description="From company formation to essential administrative support, explore the services we provide."
            />
          </div>
        </Reveal>

        <StickyServicesStack />

        <Reveal delay={0.1} className="relative z-10 mt-38 flex justify-end">
          <ButtonLink href="/services" variant="outline-light">
            All Services
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}



/* ----- card content stagger ----- */

const whyCardStage: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.05, staggerChildren: 0.09 } },
};

const whyCardItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: SCENE_EASE },
  },
};

/* ============================================================
   WHY CHOOSE LAAMIN — STICKY LEFT + CARDS SLIDING IN FROM RIGHT
   ============================================================ */

/* ============================================================
   WHY CHOOSE LAAMIN — STICKY LEFT + CARDS SLIDING IN FROM RIGHT
   ============================================================ */

/* --- centered top title, zoom-out letter reveal on scroll --- */

function ZoomLetterTitle() {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const reduce = useSafeReducedMotion();

  const leadWords = whyChooseContent.titleLead.split(" ");
  const accentWords = whyChooseContent.titleAccent.split(" ");
  const full = `${whyChooseContent.titleLead} ${whyChooseContent.titleAccent}`;

  let charIndex = 0;

  const renderWord = (word: string, keyPrefix: string) => (
    <span
      key={keyPrefix}
      aria-hidden="true"
      className="mr-[0.26em] inline-block overflow-hidden pb-[0.16em] -mb-[0.16em] align-bottom [perspective:900px]"
    >
      {word.split("").map((ch, ci) => {
        const delay = 0.15 + charIndex * 0.02;
        charIndex += 1;
        return (
          <span
            key={ci}
            className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
          >
            <motion.span
              initial={
                reduce
                  ? { opacity: 1 }
                  : { opacity: 0, y: "0.55em", scale: 1.6, filter: "blur(10px)" }
              }
              animate={
                reduce || inView
                  ? { opacity: 1, y: "0%", scale: 1, filter: "blur(0px)" }
                  : undefined
              }
              transition={{ duration: 0.7, delay, ease: SCENE_EASE }}
              className="inline-block will-change-transform"
            >
              {ch}
            </motion.span>
          </span>
        );
      })}
    </span>
  );

  return (
    <h2
      ref={ref}
      className="mt-6 font-display text-4xl leading-[1.06] tracking-tight text-navy-900 sm:text-5xl lg:text-[3.6rem]"
    >
      <span className="sr-only">{full}</span>
      <span aria-hidden="true">
        <span className="block text-navy-900">
          {leadWords.map((w, i) => renderWord(w, `lead-${w}-${i}`))}
        </span>
        <span className="mt-1 block text-brand-700">
          {accentWords.map((w, i) => renderWord(w, `acc-${w}-${i}`))}
        </span>
      </span>
    </h2>
  );
}

/* ============================================================
   WHY CHOOSE LAAMIN — CENTERED HEADER + PINNED CARD STACK
   ------------------------------------------------------------
   NOTE: `reduce` is hardcoded to `false` below so the pinned stage
   always renders while you're verifying the animation. After it
   works, restore accessibility by changing the line in
   WhyChooseSection from:
       const reduce = false;
   back to:
       const reduce = useSafeReducedMotion();
   ============================================================ */

/* ----- backdrop: soft blue gradient blobs with parallax ----- */

function WhyBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const blobA = useTransform(scrollYProgress, [0, 1], [-90, 130]);
  const blobB = useTransform(scrollYProgress, [0, 1], [110, -110]);
  const blobC = useTransform(scrollYProgress, [0, 1], [-60, 90]);
  const blobD = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const rotA = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const rotB = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(127,203,236,0.10), transparent 70%)",
        }}
      />
      <motion.div
        style={{ y: blobA, rotate: rotA }}
        className="absolute -left-48 top-8 size-[520px] rounded-full bg-brand-300/30 blur-[120px] sm:size-[640px]"
      />
      <motion.div
        style={{ y: blobB, rotate: rotB }}
        className="absolute -right-52 top-1/4 size-[560px] rounded-full bg-brand-400/20 blur-[140px] sm:size-[720px]"
      />
      <motion.div
        style={{ y: blobC }}
        className="absolute -bottom-[10%] left-1/4 size-[480px] rounded-full bg-[#a7d6ef]/45 blur-[110px] sm:size-[600px]"
      />
      <motion.div
        style={{ y: blobD }}
        className="absolute -bottom-40 right-1/4 size-[420px] rounded-full bg-brand-300/25 blur-[120px] sm:size-[520px]"
      />
    </div>
  );
}

/* ----- fallback card (used only when reduce motion is on) ----- */

function WhyCardVisual({
  item,
  index,
}: {
  item: (typeof whyChooseContent.items)[number];
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-white via-white to-[#eef6fc] p-6 shadow-[0_-14px_32px_-18px_rgba(2,26,51,0.22),0_28px_60px_-30px_rgba(2,26,51,0.5)] transition-[border-color] duration-500 hover:border-brand-400/40 sm:p-8 lg:p-10">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 320 320"
        fill="none"
        className="pointer-events-none absolute -right-16 -top-20 size-[260px] text-brand-700 opacity-[0.07] transition-all duration-700 group-hover:rotate-6 group-hover:opacity-[0.13]"
      >
        <circle cx="160" cy="160" r="80" stroke="currentColor" />
        <circle cx="160" cy="160" r="130" stroke="currentColor" />
        <circle cx="160" cy="160" r="105" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1 8" />
      </svg>
      <div className="relative grid items-center gap-6 sm:grid-cols-[1fr_auto] sm:gap-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-navy-900 font-display text-xs text-brand-300">
              {number}
            </span>
            <span aria-hidden="true" className="block h-px w-12 bg-brand-400/60" />
          </div>
          <h3 className="mt-4 font-display text-2xl leading-tight tracking-tight text-navy-900 sm:text-3xl">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            {item.text}
          </p>
        </div>
        <div className="mx-auto flex w-full max-w-[180px] items-center justify-center sm:max-w-[200px]">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={400}
            height={400}
            sizes="(min-width: 640px) 200px, 180px"
            className="h-auto w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        </div>
      </div>
    </article>
  );
}

/* ----- centered header: eyebrow → title → description → CTA ----- */

const whyTitleClass =
  "mt-6 text-center font-display text-4xl leading-[1.06] tracking-tight text-navy-900 sm:text-5xl lg:text-[3.6rem]";

function WhyScrollTitle() {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const show = inView;

  const lines = [
    { text: whyChooseContent.titleLead, className: "block" },
    { text: whyChooseContent.titleAccent, className: "mt-1 block text-brand-700" },
  ];
  const full = lines.map((l) => l.text).join(" ");
  let charIndex = 0;

  return (
    <h2 ref={ref} className={whyTitleClass}>
      <span className="sr-only">{full}</span>
      <span aria-hidden="true">
        {lines.map((line, li) => (
          <span key={li} className={line.className}>
            {line.text.split(" ").map((word, wi) => (
              <span
                key={`${word}-${wi}`}
                className="mr-[0.26em] inline-block whitespace-nowrap last:mr-0"
              >
                {word.split("").map((ch, ci) => {
                  const delay = 0.1 + charIndex * 0.028;
                  charIndex += 1;
                  return (
                    <motion.span
                      key={ci}
                      initial={{ opacity: 0, y: "0.4em", filter: "blur(10px)" }}
                      animate={
                        show
                          ? { opacity: 1, y: "0em", filter: "blur(0px)" }
                          : { opacity: 0, y: "0.4em", filter: "blur(10px)" }
                      }
                      transition={{ duration: 0.7, delay, ease: SCENE_EASE }}
                      className="inline-block will-change-transform"
                    >
                      {ch}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </span>
        ))}
      </span>
    </h2>
  );
}

function WhyScrollDescription({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -5% 0px" });
  const show = inView;
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={
              show
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(6px)" }
            }
            transition={{ duration: 0.6, delay: 0.5 + i * 0.03, ease: SCENE_EASE }}
            className="mr-[0.26em] inline-block"
          >
            {word}
          </motion.span>
        ))}
      </span>
    </p>
  );
}

function WhyHeader() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <div className="flex items-center justify-center gap-3">
        <DrawLine className="h-px w-8 bg-brand-700" />
        <Eyebrow>{whyChooseContent.eyebrow}</Eyebrow>
        <DrawLine className="h-px w-8 bg-brand-700" />
      </div>

      <div id="why-heading">
        <WhyScrollTitle />
      </div>

      <WhyScrollDescription
        text={whyChooseContent.description}
        className="mt-6 min-h-[8em] max-w-2xl text-base leading-relaxed text-muted sm:min-h-[6em] sm:text-lg"
      />

      <Reveal delay={0.1} className="mt-8">
        <ButtonLink href={whyChooseContent.cta.href} variant="accent">
          {whyChooseContent.cta.label}
          <ArrowRight aria-hidden="true" className="size-4" />
        </ButtonLink>
      </Reveal>
    </div>
  );
}

/* ============================================================
   PINNED CARD STAGE — reference-style zoom / blur / fade
   ============================================================ */

const WHY_ENTER_END = 0.27;
const WHY_EXIT_START = 0.68;
const WHY_FROM_SCALE = 0.55;
const WHY_EXIT_GROW = 0.35;
const WHY_ENTER_BLUR = 14;
const WHY_EXIT_BLUR = 18;
const WHY_INCOMING_OVERLAP = 0.32;
const WHY_FIRST_HEADSTART = 0.15;
const WHY_SCROLL_PER_CARD = 100;

function whyClamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function whySmooth(value: number) {
  const t = whyClamp(value, 0, 1);
  return t * t * (3 - 2 * t);
}

function WhyPinnedCard({
  item,
  index,
  total,
  progress,
}: {
  item: (typeof whyChooseContent.items)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const dark = index % 2 === 0;
  const lead = isFirst ? WHY_FIRST_HEADSTART : WHY_INCOMING_OVERLAP;
  const number = String(index + 1).padStart(2, "0");

  const local = useTransform(progress, (p) => p * total - index);

  const entrance = useTransform(local, (l) =>
    whySmooth((l + lead) / WHY_ENTER_END)
  );
  const exit = useTransform(local, (l) =>
    isLast ? 0 : whySmooth((l - WHY_EXIT_START) / (1 - WHY_EXIT_START))
  );

  const reveal = useTransform(local, (l) =>
    whySmooth((l + lead - 0.1) / 0.25)
  );
  const hide = useTransform(local, (l) =>
    isLast ? 0 : whySmooth((l - 0.7) / 0.25)
  );

  const alpha = useTransform([entrance, exit], ([e, x]: number[]) => e * (1 - x));
  const scale = useTransform(
    [entrance, exit],
    ([e, x]: number[]) =>
      WHY_FROM_SCALE + e * (1 - WHY_FROM_SCALE) + x * WHY_EXIT_GROW
  );
  const filter = useTransform(
    [entrance, exit],
    ([e, x]: number[]) =>
      `blur(${((1 - e) * WHY_ENTER_BLUR + x * WHY_EXIT_BLUR).toFixed(2)}px)`
  );
  const visibility = useTransform(alpha, (a) => (a > 0.005 ? "visible" : "hidden"));
  const pointerEvents = useTransform(alpha, (a) => (a > 0.8 ? "auto" : "none"));

  const contentOpacity = useTransform([reveal, hide], ([r, h]: number[]) => r * (1 - h));
  const contentScale = useTransform(
    [reveal, hide],
    ([r, h]: number[]) => 0.92 + r * 0.08 - h * 0.04
  );
  const contentFilter = useTransform(
    [reveal, hide],
    ([r, h]: number[]) => `blur(${((1 - r) * 10 + h * 12).toFixed(2)}px)`
  );
  const contentStyle = {
    opacity: contentOpacity,
    scale: contentScale,
    filter: contentFilter,
  };

  return (
    <motion.div
      style={{
        scale,
        opacity: alpha,
        filter,
        visibility,
        pointerEvents,
        zIndex: index + 1,
      }}
      className="col-start-1 row-start-1 w-full origin-center will-change-transform"
    >
      <article
        className={`relative grid h-[min(34rem,72svh)] min-h-[420px] grid-cols-1 grid-rows-[40%_60%] overflow-hidden rounded-3xl border shadow-[0_28px_90px_-30px_rgba(2,26,51,0.55)] md:min-h-[360px] md:grid-cols-2 md:grid-rows-1 ${
          dark
            ? "border-white/10 bg-navy-900 text-white"
            : "border-line bg-gradient-to-br from-white via-white to-[#e3f1fa] text-navy-900"
        }`}
      >
        <motion.div
          style={contentStyle}
          className="relative grid place-items-center overflow-hidden bg-gradient-to-br from-[#fbfdff] via-[#eaf4fb] to-[#d6e9f7]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(rgba(4,45,85,0.14) 0.8px, transparent 0.8px)",
              backgroundSize: "14px 14px",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute aspect-square w-[68%] rounded-full border border-navy-900/20 shadow-[0_0_0_30px_rgba(255,255,255,0.35),0_0_0_65px_rgba(255,255,255,0.22)] [transform:scaleY(0.8)_rotate(-25deg)]"
          />
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={400}
            height={400}
            sizes="(min-width: 768px) 320px, 200px"
            className="relative z-10 h-auto max-h-[78%] w-auto max-w-[62%] object-contain drop-shadow-[0_18px_28px_rgba(2,26,51,0.25)]"
          />
          <span className="absolute bottom-[6%] left-[7%] z-10 text-[9px] font-semibold uppercase tracking-[0.18em] text-navy-800/70">
            {number} — {item.title.split(" ").slice(0, 2).join(" ")}
          </span>
        </motion.div>

        <motion.div
          style={contentStyle}
          className="relative z-10 flex flex-col items-start justify-center p-6 sm:p-8 md:p-10 lg:p-12"
        >
          <span
            className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
              dark ? "text-brand-300" : "text-brand-700"
            }`}
          >
            Why LAAMIN
          </span>
          <h3 className="mt-3 font-display text-2xl leading-[1.1] tracking-tight sm:mt-5 sm:text-3xl lg:text-4xl">
            {item.title}
          </h3>
          <p
            className={`mt-3 text-sm leading-relaxed sm:mt-4 ${
              dark ? "text-navy-300" : "text-muted"
            }`}
          >
            {item.text}
          </p>
        </motion.div>

        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -bottom-6 right-3 select-none font-display text-[9rem] leading-none sm:text-[11rem] ${
            dark ? "text-white/[0.06]" : "text-navy-900/[0.06]"
          }`}
        >
          {number}
        </span>
      </article>
    </motion.div>
  );
}

function WhyPinnedStage({ items }: { items: typeof whyChooseContent.items }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const total = items.length;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    mass: 0.3,
  });

 
  const barScale = useTransform(progress, [0, 1], [0, 1]);

  if (total === 0) return null;

  return (
    <div
      ref={trackRef}
      style={{
        position: "relative",
        height: `${(total + 1) * 100}vh`,
        overflow: "visible",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          isolation: "isolate",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at 15% 25%, rgba(127,203,236,0.22) 0, transparent 38%), radial-gradient(ellipse at 90% 80%, rgba(43,163,214,0.14) 0, transparent 38%)",
          }}
        />

       

        <div className="relative z-10 mx-auto grid mt-15 w-full max-w-4xl grid-cols-1 [perspective:1200px]">
          {items.map((item, index) => (
            <WhyPinnedCard
              key={item.id}
              item={item}
              index={index}
              total={total}
              progress={progress}
            />
          ))}
        </div>

        <div className="relative z-20 mx-auto mt-5 flex w-full max-w-4xl items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-muted sm:mt-8 sm:gap-4 sm:text-[11px] sm:tracking-[0.2em]">
          <span className="hidden shrink-0 sm:inline">Your UAE business partner</span>
          <span className="relative block h-px flex-1 overflow-hidden bg-navy-900/15">
            <motion.span
              style={{ scaleX: barScale }}
              className="absolute inset-0 block origin-left bg-brand-700"
            />
          </span>
          <span className="shrink-0">Scroll to explore ↓</span>
        </div>
      </div>
    </div>
  );
}

/* ----- section ----- */

function WhyChooseSection() {
  // ⚠️ TEMP: hardcoded false so the pinned stage ALWAYS renders while
  // you verify the animation. Swap back to useSafeReducedMotion() after.
  const reduce = false;
  const items = whyChooseContent.items;

  return (
    <section
      aria-labelledby="why-heading"
      className="relative isolate bg-white pt-20 text-ink lg:pt-28"
      style={{ overflow: "visible" }}
    >
      <WhyBackdrop />

      <Container className="relative" style={{ overflow: "visible" }}>
        <WhyHeader />

        {reduce ? (
          <ol className="mx-auto mt-12 max-w-3xl space-y-6 pb-20">
            {items.map((item, index) => (
              <li key={item.id}>
                <WhyCardVisual item={item} index={index} />
              </li>
            ))}
          </ol>
        ) : (
          <WhyPinnedStage items={items} />
        )}
      </Container>
    </section>
  );
}

/* ============================================================
   MAIN HOMEPAGE COMPONENT
   ============================================================ */

export default function HomePage() {
  return (
        <MotionConfig reducedMotion="user">

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


      <AboutSection />


<AboutServicesDivider />

<ServicesEditorialSection />

<ServicesBottomCutter />

{/* <ServicesToDarkDivider /> */}

  {/* <section className="py-20 bg-navy-950 text-white border-t border-white/10">
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
      </section> */}

<WhyChooseSection />

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
        </MotionConfig>

  );
}