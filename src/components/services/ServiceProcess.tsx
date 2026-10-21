"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LetterReveal, FadeUp } from "@/components/ui/letter-reveal";
import { getService, type ServiceStep } from "@/data/services";

const EASE = [0.16, 1, 0.3, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------
   One step: outlined number fills solid as the rail reaches it
   ------------------------------------------------------------------ */
function Step({ step, index }: { step: ServiceStep; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.62", "end 0.38", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.28, 0.55, 0.9], [0.15, 1, 1, 0.35]);
  const x = useTransform(scrollYProgress, [0, 0.32], [32, 0]);
  const fill = useTransform(
    scrollYProgress,
    [0.2, 0.36],
    ["rgba(4,45,85,0)", "rgba(4,45,85,1)"],
  );
  const dotScale = useTransform(scrollYProgress, [0.18, 0.3], [0, 1]);
  const haloScale = useTransform(scrollYProgress, [0.2, 0.45], [0.6, 1.8]);
  const haloOpacity = useTransform(scrollYProgress, [0.2, 0.32, 0.6, 0.8], [0, 0.5, 0.25, 0]);

  return (
    <li ref={ref} className="relative pl-12 sm:pl-16 lg:pl-20">
      {/* Node on the rail */}
      <span
        aria-hidden
        className="absolute left-[11px] top-9 z-10 -translate-x-1/2 sm:top-10 lg:top-16"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <motion.span
            style={{ scale: haloScale, opacity: haloOpacity }}
            className="absolute inset-0 rounded-full bg-brand-400/40"
          />
          <span className="absolute inset-0 rounded-full border-2 border-navy-900/25 bg-white shadow-[0_0_0_4px_#f3f7fb]" />
          <motion.span
            style={{ scale: dotScale }}
            className="relative h-2.5 w-2.5 rounded-full bg-navy-900"
          />
        </span>
      </span>

      <motion.div
        style={{ opacity, x }}
        className="flex flex-col gap-2 py-8 sm:flex-row sm:items-start sm:gap-8 lg:gap-10 lg:py-14"
      >
        <motion.span
          aria-hidden
          style={{ color: fill, WebkitTextStroke: "1.5px #042d55" }}
          className="select-none font-display text-7xl leading-none sm:text-8xl"
        >
          {pad(index + 1)}
        </motion.span>

        <div className="max-w-xl sm:pt-3 lg:pt-4">
          <h3 className="font-display text-2xl tracking-tight text-navy-900 sm:text-3xl">
            {step.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">{step.text}</p>
        </div>
      </motion.div>
    </li>
  );
}

/* ------------------------------------------------------------------
   Section
   ------------------------------------------------------------------ */
export function ServiceProcess({ slug }: { slug: string }) {
  const service = getService(slug);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const headTop = useTransform(lineScale, (v) => `${v * 100}%`);
  const headOpacity = useTransform(lineScale, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  const total = service?.process.length ?? 0;
  useMotionValueEvent(lineScale, "change", (v) => {
    if (!total) return;
    const next = Math.min(total - 1, Math.max(0, Math.floor(v * total)));
    setActive((prev) => (prev === next ? prev : next));
  });

  if (!service) return null;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden border-y border-line bg-mist py-16 sm:py-20 lg:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 top-1/4 h-[420px] w-[420px] rounded-full bg-brand-300/15 blur-3xl" />
          <div className="absolute -left-32 bottom-10 h-[360px] w-[360px] rounded-full bg-navy-300/20 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
            style={{
              backgroundImage:
                "linear-gradient(#dfe5ec 1px, transparent 1px), linear-gradient(90deg, #dfe5ec 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        <Container className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* ---------- Sticky left column ---------- */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <FadeUp>
              <Eyebrow>HOW IT WORKS</Eyebrow>
            </FadeUp>

            <LetterReveal
              as="h2"
              text={service.processTitle}
              stagger={0.03}
              className="mt-4 font-display text-4xl tracking-tight text-navy-900 text-balance sm:text-5xl"
            />

            <FadeUp delay={0.2}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                A clear process, agreed with you. Scope, professional fees and third-party
                charges are confirmed before work begins.
              </p>
            </FadeUp>

            {/* Live step counter (desktop) */}
            <div className="mt-12 hidden lg:block">
              <div className="flex items-end gap-4">
                <div className="h-24 overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={active}
                      initial={{ y: "55%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-55%", opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="block font-display text-8xl leading-none text-navy-900"
                    >
                      {pad(active + 1)}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="pb-3 font-display text-xl text-navy-900/30">/ {pad(total)}</span>
              </div>
              <p className="mt-3 max-w-xs font-display text-lg text-brand-700">
                {service.process[active]?.title}
              </p>
            </div>
          </div>

          {/* ---------- Rail + steps ---------- */}
          <div ref={trackRef} className="relative">
            <div
              aria-hidden
              className="absolute inset-y-0 left-[11px] w-[2px] -translate-x-1/2 rounded-full bg-navy-900/10"
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

            <ol>
              {service.process.map((step, index) => (
                <Step key={step.title} step={step} index={index} />
              ))}
            </ol>
          </div>
        </Container>
      </section>
    </MotionConfig>
  );
}