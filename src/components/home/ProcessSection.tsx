"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/* ------------------------------------------------------------------
   Content — local to this section so no external file changes.
   ------------------------------------------------------------------ */
const PROCESS_STEPS = [
  {
    title: "Initial Consultation",
    text: "We discuss your business activities, service requirements, and objectives to understand your needs and identify the appropriate service and procedures.",
  },
  {
    title: "Requirements & Planning",
    text: "We clarify the required documents, applicable service fees, government charges, approvals, and next steps. Once the scope is agreed, we guide you through the information and documents needed to proceed.",
  },
  {
    title: "Documentation & Filing",
    text: "We coordinate the preparation and review of the required paperwork and manage application submissions through the relevant UAE authorities and service channels, according to your selected service.",
  },
  {
    title: "Follow-Up & Completion",
    text: "We follow up on application progress, communicate updates, and coordinate any additional requirements. Once processing is completed by the relevant authority, we arrange the handover of issued licences, visas, or other documents, as applicable.",
  },
];

const STEP_MEDIA = [
  { src: "/images/howitsworks/step-01-consultation.svg", alt: "Illustration representing the initial business consultation" },
  { src: "/images/howitsworks/step-02-planning.svg", alt: "Illustration representing requirements and planning" },
  { src: "/images/howitsworks/step-03-documentation.svg", alt: "Illustration representing documentation and filing" },
  { src: "/images/howitsworks/step-04-completion.svg", alt: "Illustration representing follow-up and completion" },
];

/* Opacity a step (card + number + image) falls to as it scrolls up and out. */
const EXIT_OPACITY = 0.35;

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------
   Letter-by-letter reveal — SSR-safe.
   No `useReducedMotion` branching; MotionConfig handles accessibility.
   ------------------------------------------------------------------ */
function LetterReveal({
  text,
  className,
  stagger = 0.04,
  baseDelay = 0,
  blur = true,
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  stagger?: number;
  baseDelay?: number;
  blur?: boolean;
  as?: "p" | "h2" | "h3";
}) {
  const words = text.split(" ");
  let charIndex = 0;

  const letter: Variants = {
    hidden: {
      opacity: 0,
      y: "0.55em",
      ...(blur ? { filter: "blur(8px)" } : {}),
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      ...(blur ? { filter: "blur(0px)" } : {}),
      transition: { duration: 0.6, delay: baseDelay + i * stagger, ease: EASE },
    }),
  };

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-12% 0px" }}
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

/* Simple fade-up — SSR-safe. */
function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   Single scroll-driven step — LineScroller-style.
   Image is a bare SVG with no card/frame/background.
   ------------------------------------------------------------------ */
function ProcessStep({
  step,
  index,
}: {
  step: (typeof PROCESS_STEPS)[number];
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const media = STEP_MEDIA[index % STEP_MEDIA.length];
  const flip = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.62", "end 0.38", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.28, 0.55, 0.9],
    [0, 1, 1, EXIT_OPACITY]
  );
  const y = useTransform(scrollYProgress, [0, 0.32, 1], [56, 0, -28]);
  const scale = useTransform(scrollYProgress, [0, 0.32], [0.96, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.28], ["blur(6px)", "blur(0px)"]);

  const dotScale = useTransform(scrollYProgress, [0.16, 0.3], [0, 1]);
  const haloScale = useTransform(scrollYProgress, [0.2, 0.45], [0.6, 1.6]);
  const haloOpacity = useTransform(scrollYProgress, [0.2, 0.32, 0.6, 0.8], [0, 0.45, 0.25, 0]);

  const imgY = useTransform(scrollYProgress, [0, 1], [22, -22]);

  return (
    <li ref={ref} className="relative lg:flex lg:min-h-[62vh] lg:items-center">
      {/* Node on the rail */}
      <motion.span
        aria-hidden
        style={{ opacity }}
        className="absolute left-[22px] top-6 z-10 -translate-x-1/2 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2"
      >
        <span className="relative flex h-9 w-9 items-center justify-center">
          <motion.span
            style={{ scale: haloScale, opacity: haloOpacity }}
            className="absolute inset-0 rounded-full bg-navy-700/30"
          />
          <span className="absolute inset-[7px] rounded-full border-2 border-navy-900 bg-white shadow-[0_0_0_5px_#fff]" />
          <motion.span
            style={{ scale: dotScale }}
            className="relative h-2.5 w-2.5 rounded-full bg-navy-900"
          />
        </span>
      </motion.span>

      <motion.div
        style={{ opacity, y, scale, filter: blur }}
        className="grid w-full items-center gap-8 pl-12 sm:pl-14 lg:grid-cols-2 lg:gap-24 lg:pl-0"
      >
        {/* Image — bare SVG, no frame, no background */}
        <div
          className={`flex justify-center ${
            flip ? "lg:order-2 lg:justify-start" : "lg:justify-end"
          }`}
        >
          <motion.div
            style={{ y: imgY }}
            className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[360px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media.src}
              alt={media.alt}
              loading="lazy"
              decoding="async"
              className="h-auto w-full select-none"
            />
          </motion.div>
        </div>

        {/* Copy card */}
        <div className={flip ? "lg:order-1 lg:flex lg:justify-end" : ""}>
          <div className="relative overflow-hidden rounded-[24px] border border-line bg-white/80 p-5 shadow-[0_24px_60px_-30px_rgba(4,45,85,0.35)] backdrop-blur-sm sm:rounded-[28px] sm:p-8 lg:max-w-md">
            {/* Ghost number */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[110px] leading-none text-navy-900/[0.05] sm:text-[150px]"
            >
              {num}
            </span>

            <div className="relative">
              <h3 className="font-display text-xl tracking-tight text-navy-900 sm:text-2xl lg:text-3xl">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted sm:mt-3 sm:text-base lg:text-[17px]">
                {step.text}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </li>
  );
}

/* ------------------------------------------------------------------
   Section — LineScroller-style progress rail
   ------------------------------------------------------------------ */
export function ProcessSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: trackProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.85", "end 0.55"],
  });
  const lineScale = useSpring(trackProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const headTop = useTransform(lineScale, (v) => `${v * 100}%`);
  const headOpacity = useTransform(lineScale, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <section className="relative overflow-hidden bg-white py-16 text-ink sm:py-20 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-16 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-brand-300/15 blur-3xl" />
        <div className="absolute -left-32 top-1/2 h-[360px] w-[360px] rounded-full bg-navy-300/20 blur-3xl" />
        <div className="absolute -right-32 bottom-24 h-[360px] w-[360px] rounded-full bg-brand-300/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(#dfe5ec 1px, transparent 1px), linear-gradient(90deg, #dfe5ec 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <FadeUp className="flex justify-center">
            <Eyebrow>OUR PROCESS</Eyebrow>
          </FadeUp>

          <LetterReveal
            as="h2"
            text="How It Works"
            stagger={0.05}
            className="mt-4 font-display text-4xl tracking-tight text-navy-900 sm:text-5xl lg:text-6xl"
          />

          <LetterReveal
            text="Clear steps. Coordinated services. Professional support."
            stagger={0.022}
            baseDelay={0.55}
            className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-navy-900 sm:mt-6 sm:text-lg lg:text-xl"
          />

          <LetterReveal
            text="From your initial enquiry to the completion of your requested service, LAAMIN coordinates the necessary procedures, documentation, and follow-ups to help you manage your business requirements in the UAE."
            stagger={0.01}
            baseDelay={1.2}
            blur={false}
            className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base"
          />
        </div>

        <div ref={trackRef} className="relative mt-12 sm:mt-16 lg:mt-24">
          <div
            aria-hidden
            className="absolute inset-y-0 left-[22px] w-[2px] -translate-x-1/2 rounded-full bg-navy-900/10 lg:left-1/2"
          >
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top rounded-full bg-gradient-to-b from-brand-300 via-brand-400 to-navy-800 shadow-[0_0_10px_rgba(43,163,214,0.45)]"
            />

            <motion.div
              style={{ top: headTop, opacity: headOpacity }}
              className="absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
            >
              <span className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/30 blur-md" />
              <span className="relative block h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_0_2px_#124a82,0_0_14px_3px_rgba(43,163,214,0.55)]" />
            </motion.div>
          </div>

          <ol className="space-y-16 sm:space-y-20 lg:space-y-0">
            {PROCESS_STEPS.map((step, index) => (
              <ProcessStep key={step.title} step={step} index={index} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}