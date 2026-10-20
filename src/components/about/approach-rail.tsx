"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { Container } from "@/components/container";
import { Eyebrow } from "@/components/section-heading";
import { FadeUp, LetterReveal } from "@/components/ui/letter-reveal";

type Step = { title: string; text: string };

/* ------------------------------------------------------------------ */
/*  Single step — node on the rail + alternating card                  */
/* ------------------------------------------------------------------ */

function ApproachStep({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const flip = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.72", "end 0.4", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.28, 0.82, 0.98],
    [0, 1, 1, 0.4]
  );
  const y = useTransform(scrollYProgress, [0, 0.3, 1], [40, 0, -20]);
  const dotScale = useTransform(scrollYProgress, [0.18, 0.34], [0, 1]);

  return (
    <li ref={ref} className="relative lg:flex lg:min-h-[38vh] lg:items-center">
      {/* Node */}
      <motion.span
        aria-hidden
        style={{ opacity }}
        className="absolute left-[22px] top-6 z-10 -translate-x-1/2 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2"
      >
        <span className="relative flex h-9 w-9 items-center justify-center">
          <span className="absolute inset-[7px] rounded-full border-2 border-navy-900 bg-white shadow-[0_0_0_5px_#fff]" />
          <motion.span
            style={{ scale: dotScale }}
            className="relative h-2.5 w-2.5 rounded-full bg-navy-900"
          />
        </span>
      </motion.span>

      <motion.div
        style={{ opacity, y }}
        className="w-full pl-12 sm:pl-14 lg:pl-0"
      >
        <div className="lg:grid lg:grid-cols-2 lg:gap-24">
          <div
            className={`lg:flex ${
              flip
                ? "lg:col-start-2 lg:justify-start"
                : "lg:col-start-1 lg:justify-end"
            }`}
          >
            <div className="relative w-full overflow-hidden rounded-[24px] border border-line bg-white/85 p-5 shadow-[0_24px_60px_-30px_rgba(4,45,85,0.35)] backdrop-blur-sm sm:rounded-[28px] sm:p-8 lg:max-w-md">
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
        </div>
      </motion.div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Section — centre rail with scroll-driven progress                  */
/* ------------------------------------------------------------------ */

export function ApproachRail({ steps }: { steps: Step[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.85", "end 0.55"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const headTop = useTransform(lineScale, (v) => `${v * 100}%`);
  const headOpacity = useTransform(lineScale, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <section className="relative overflow-hidden bg-mist/40 py-16 sm:py-20 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-brand-300/15 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <FadeUp className="flex justify-center">
            <Eyebrow>Our approach</Eyebrow>
          </FadeUp>
          <LetterReveal
            as="h2"
            text="How we work with clients"
            stagger={0.03}
            className="mt-4 font-display text-3xl tracking-tight text-navy-900 sm:text-4xl lg:text-5xl"
          />
          <FadeUp delay={0.15}>
            <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
              Four principles shape the way we handle every requirement.
            </p>
          </FadeUp>
        </div>

        <div ref={trackRef} className="relative mt-12 sm:mt-16 lg:mt-20">
          {/* Rail */}
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
            {steps.map((step, i) => (
              <ApproachStep key={step.title} step={step} index={i} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}