"use client";

import { useRef } from "react";
import { MotionConfig, motion, useScroll, useTransform } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LetterReveal, FadeUp } from "@/components/ui/letter-reveal";
import { getService } from "@/data/services";

const pad = (n: number) => String(n).padStart(2, "0");

function BenefitRow({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "end 0.12"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.18, 1, 1, 0.25]);
  const x = useTransform(scrollYProgress, [0, 0.35], [44, 0]);
  const line = useTransform(scrollYProgress, [0.04, 0.38], [0, 1]);
  const numColor = useTransform(
    scrollYProgress,
    [0.2, 0.4],
    ["rgba(127,203,236,0.35)", "rgba(127,203,236,1)"],
  );

  return (
    <li ref={ref} className="relative">
      {/* Static + drawn line */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/10">
        <motion.div
          style={{ scaleX: line }}
          className="h-full w-full origin-left bg-gradient-to-r from-brand-300 via-brand-400 to-transparent"
        />
      </div>

      <motion.div
        style={{ opacity, x }}
        className="flex items-start gap-5 py-9 sm:gap-8 sm:py-12 lg:py-16"
      >
        <motion.span
          aria-hidden
          style={{ color: numColor }}
          className="pt-1.5 font-display text-base tracking-widest sm:pt-3 sm:text-xl"
        >
          {pad(index + 1)}
        </motion.span>
        <p className="font-display text-2xl leading-[1.2] tracking-tight text-white text-balance sm:text-3xl lg:text-[2.5rem]">
          {text}
        </p>
      </motion.div>
    </li>
  );
}

export function ServiceBenefits({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service?.benefits) return null;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-navy-950 py-16 text-white sm:py-20 lg:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-[420px] w-[420px] rounded-full bg-brand-400/15 blur-3xl" />
          <div className="absolute -right-24 bottom-10 h-[380px] w-[380px] rounded-full bg-navy-700/40 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        <Container className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <FadeUp>
              <Eyebrow light>What to expect</Eyebrow>
            </FadeUp>

            <LetterReveal
              as="h2"
              text="Practical support, clearly scoped"
              stagger={0.025}
              className="mt-4 font-display text-4xl tracking-tight text-balance sm:text-5xl"
            />

            <FadeUp delay={0.2}>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-navy-300 sm:text-lg">
                Inclusions, professional fees and third-party costs are confirmed before
                engagement.
              </p>
            </FadeUp>

            <FadeUp delay={0.3} className="mt-10 hidden lg:block">
              <span
                aria-hidden
                className="font-display text-[8rem] leading-none text-white/[0.06]"
              >
                {pad(service.benefits.length)}
              </span>
            </FadeUp>
          </div>

          <ul className="border-b border-white/10">
            {service.benefits.map((benefit, index) => (
              <BenefitRow key={benefit} text={benefit} index={index} />
            ))}
          </ul>
        </Container>
      </section>
    </MotionConfig>
  );
}