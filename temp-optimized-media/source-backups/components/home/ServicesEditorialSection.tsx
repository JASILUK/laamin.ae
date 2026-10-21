"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";

import { BrandArcs } from "@/components/brand-arcs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { SCENE_EASE } from "@/lib/constants";
import { services, type Service } from "@/lib/data";

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
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-6 select-none font-display text-[11rem] leading-none text-transparent opacity-[0.07] [-webkit-text-stroke:1.5px_#0e6c9b] sm:text-[14rem]"
      >
        {number}
      </span>

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

      <div className="relative grid items-center gap-5 p-5 sm:gap-8 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:p-12">
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

          <motion.p variants={insideItem} className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
            {service.short}
          </motion.p>

          <motion.ul variants={insideItem} className="mt-4 flex flex-wrap gap-1.5 sm:mt-6 sm:gap-2">
            {service.details.slice(0, 3).map((d) => (
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

        <motion.div variants={insideMedia} className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[170px] overflow-hidden rounded-2xl border border-line/70 bg-gradient-to-br from-mist to-white sm:max-w-xs lg:max-w-none">
            <div
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
      className="stack-item sticky min-h-[120vh] sm:min-h-[135vh] lg:min-h-[150vh]"
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

export function ServicesEditorialSection() {
  return (
    <section
      aria-labelledby="services-heading"
      className="relative isolate bg-navy-900 py-20 text-white lg:py-28"
    >
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
