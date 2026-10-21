"use client";
import { useState, useEffect, useCallback, useId, useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";

import { BrandArcs } from "@/components/brand-arcs";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { SCENE_EASE } from "@/lib/constants";
import {
  heroHeadline,
  headlineText,
  heroFacts,
  reachFlags,
  services,
  demoTabs,
  SCENE_COUNT,
  overviewSummary,
  type Service,
} from "@/lib/data";

const SCENE_DURATION_MS = 3500;
const TICK_MS = 500;
const MANUAL_HOLD_MS = 9000;

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

const titleStage: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.2, staggerChildren: 0.08 } },
};

const wordRise: Variants = {
  hidden: { y: "105%", skewY: 6 },
  show: { y: "0%", skewY: 0, transition: { duration: 0.85, ease: SCENE_EASE } },
};

const wipeIn: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  show: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: 0.9, delay: 0.6, ease: SCENE_EASE },
  },
};

const barDraw: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, delay: 0.45, ease: SCENE_EASE } },
};

const ghostIn: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", opacity: 0 },
  show: {
    clipPath: "inset(0% 0 0 0)",
    opacity: 1,
    transition: { duration: 1, delay: 0.1, ease: SCENE_EASE },
  },
};

const kickerIn: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  show: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.7, delay: 0.1, ease: SCENE_EASE } },
};

const tileIn: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  show: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 0.6, ease: SCENE_EASE },
  },
};

const rowStage: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const rowLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: SCENE_EASE } },
};

const rowRise: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.65, ease: SCENE_EASE } },
};

const footLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, delay: 1.15, ease: SCENE_EASE } },
};


const iconTile: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: SCENE_EASE } },
};

const footReveal = reveal(1.25);

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

function SceneFrame({
  icon: Icon,
  kicker,
  title,
  description,
  href,
  linkLabel,
  position,
  reduce,
  children,
}: {
  icon: LucideIcon;
  kicker: string;
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
      className="relative flex h-full flex-col justify-between"
    >
      {/* big outlined number */}
      <motion.span
        variants={ghostIn}
        aria-hidden="true"
        className="ghost-num pointer-events-none absolute -right-1 -top-3 z-0 select-none font-display text-[6.5rem] leading-none"
      >
        {String(position).padStart(2, "0")}
      </motion.span>

      <div className="relative z-10">
        {/* kicker */}
        <div className="flex items-center gap-3">
          <motion.span
            variants={iconTile}
            className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-brand-700/20 bg-white text-brand-700 shadow-sm shadow-navy-900/10"
          >
            <Icon
              aria-hidden="true"
              className={`size-5 ${reduce ? "" : "icon-draw"}`}
              strokeWidth={1.75}
            />
            {!reduce && <span aria-hidden="true" className="icon-sheen" />}
          </motion.span>

          <motion.span
            variants={kickerIn}
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700"
          >
            {kicker}
          </motion.span>
        </div>

        {/* title: words rise out of a mask */}
        <motion.h3
          variants={titleStage}
          aria-label={title}
          className="mt-5 max-w-[22rem] font-display text-[1.65rem] leading-[1.12] tracking-tight text-navy-900 sm:text-[1.9rem]"
        >
          {title.split(" ").map((word, wi) => (
            <span
              key={`${word}-${wi}`}
              aria-hidden="true"
              className="mr-[0.28em] inline-block overflow-hidden pb-[0.12em] align-bottom"
            >
              <motion.span variants={wordRise} className="inline-block origin-left will-change-transform">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h3>

        <motion.span
          variants={barDraw}
          aria-hidden="true"
          className="mt-3 block h-[3px] w-14 origin-left rounded-full bg-brand-400"
        />

        <motion.p
          variants={wipeIn}
          className="mt-4 max-w-md text-sm leading-relaxed text-muted"
        >
          {description}
        </motion.p>

        <div className="mt-5">{children}</div>
      </div>

      <div className="relative z-10 pt-5">
        <motion.span variants={footLine} aria-hidden="true" className="block h-px origin-left bg-navy-900/15" />
        <motion.div variants={footReveal} className="flex items-center justify-between pt-3.5">
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
      kicker="Overview"
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
            <motion.li key={service.slug} variants={tileIn}>
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
      kicker={`Service ${String(position - 1).padStart(2, "0")}`}
      title={service.title}
      description={service.summary}
      href={`/services/${service.slug}`}
      linkLabel={`View ${service.shortTitle}`}
      position={position}
      reduce={reduce}
    >
      <p className="mb-1 text-xs font-semibold text-muted">{service.listLabel}</p>
      <motion.ul variants={listStage}>
        {service.details.map((detail, i) => (
          <motion.li key={detail} variants={rowStage} className="group/row relative">
            <motion.span
              variants={rowLine}
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left bg-navy-900/15"
            />
            <div className="flex items-center gap-4 py-2.5">
              <span className="text-[11px] font-semibold tabular-nums tracking-widest text-brand-700">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="overflow-hidden">
                <motion.span
                  variants={rowRise}
                  className="block text-sm font-medium text-navy-900 transition-transform duration-300 group-hover/row:translate-x-1"
                >
                  {detail}
                </motion.span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="ml-auto size-4 -translate-x-1 text-brand-700 opacity-0 transition-all duration-300 group-hover/row:translate-x-0 group-hover/row:opacity-100"
              />
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </SceneFrame>
  );
}

function HeroServiceDemo() {
  const uid = useId();
  const shouldReduceMotion = useSafeReducedMotion();
  const reduce = Boolean(shouldReduceMotion);

  const [[index, direction], setPage] = useState<[number, number]>([0, 1]);
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);

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
className="hero-panel-reveal relative mx-auto w-full max-w-[600px] lg:ml-auto lg:mr-8 xl:mr-16"      >
        {/* soft light behind the screen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 -top-2 bottom-12 rounded-[2rem] bg-brand-400/25 blur-2xl"
        />
  
        <motion.div
          whileHover={reduce ? undefined : { y: -4 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative"
        >
          {/* bezel */}
          <div className="relative rounded-[1.25rem] bg-gradient-to-b from-[#222f40] via-[#0c1622] to-[#060b12] p-2.5 shadow-[0_30px_70px_-30px_rgba(2,26,51,0.8),inset_0_1px_0_rgba(255,255,255,0.18)] ring-1 ring-white/10 sm:p-3">
            {/* camera dot */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-[3px] size-1 -translate-x-1/2 rounded-full bg-white/25"
            />
  
            {/* screen */}
            <div
              ref={panelRef}
              onPointerMove={onPanelPointerMove}
              className="group/panel relative overflow-hidden rounded-[0.8rem] ring-1 ring-black/60"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "linear-gradient(155deg, #fbfdff 0%, #eaf4fb 48%, #d6e9f7 100%)",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-brand-300/35 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 -left-24 size-72 rounded-full bg-brand-400/15 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-25 opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
                style={{
                  background:
                    "radial-gradient(360px circle at var(--mx, 50%) var(--my, 0%), rgba(43,163,214,0.12), transparent 70%)",
                }}
              />
  
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
              {/* closes the min-h content block */}
  
              {/* glass reflection: covers the whole screen */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(115deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_22%,transparent_38%)] shadow-[inset_0_0_40px_rgba(2,26,51,0.18)]"
              />
            </div>
            {/* closes screen */}
          </div>
          {/* closes bezel (this was the missing one) */}
  
          {/* stand */}
          <div
            aria-hidden="true"
            className="mx-auto -mt-px h-6 w-28 bg-gradient-to-b from-[#0b1420] to-[#2b3949] [clip-path:polygon(14%_0,86%_0,100%_100%,0_100%)]"
          />
          <div
            aria-hidden="true"
            className="mx-auto h-1.5 w-48 rounded-full bg-gradient-to-b from-[#3a4a5d] to-[#0b1420] shadow-[0_14px_24px_-6px_rgba(2,26,51,0.8)]"
          />
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
  const reduce = useSafeReducedMotion();

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

export function HeroSection() {
  return (
    <section
      data-hero
      data-hero-overlay=""
      className="relative overflow-hidden bg-navy-900 text-white"
    >
      {/* Photo + light overlay (same treatment as the inner page heroes) */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
      <picture>
  <source
    srcSet="/images/hero/home-hero-2400.webp"
    type="image/webp"
  />
  <img
    src="/images/hero/home-hero-2400.jpg"
    alt=""
    loading="eager"
    fetchPriority="high"
    decoding="async"
    className="h-full w-full object-cover object-center"
    onError={(e) => {
      e.currentTarget.style.display = "none";
    }}
  />
</picture>



        {/* Text side stays readable, right side lets the photo show */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/60 to-navy-900/35" />
        {/* Darkens the bottom so the facts strip and HeroCutter blend cleanly */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent" />
        {/* Keeps nav links readable over a bright photo */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-navy-900/70 to-transparent" />
      </div>

      {/* Brand arc line work on top of the photo */}
      <BrandArcs className="inset-0 size-full text-brand-400/30" />

      <Container className="relative grid items-start gap-10 pb-14 pt-[7.25rem] sm:pt-[7.75rem] lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-20 lg:pt-[8.25rem]">
        <div>
          <div className="reveal-mask">
            <div className="hero-reveal hero-reveal-1">
              <Eyebrow light>UAE &amp; INTERNATIONAL BUSINESS SERVICES</Eyebrow>
            </div>
          </div>

          <div className="reveal-mask mt-6">
            <h1 className="hero-headline hero-reveal hero-reveal-2 font-display text-[2.5rem] leading-[1.08] tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]">
              <span className="hero-headline-fill">
                <span className="title-shimmer-white">{heroHeadline.lead}</span>
                {" "}
                <span className="title-shimmer-blue">{heroHeadline.accent}</span>
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
  );
}
