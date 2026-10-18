"use client";
import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal, DrawLine, MaskLine } from "@/components/ui/Reveal";
import { useMounted } from "@/hooks/useMounted";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { SCENE_EASE } from "@/lib/constants";
import { aboutContent, aboutCountries } from "@/lib/data";

const pillStage: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const pillItem: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: SCENE_EASE } },
};

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

function ScrollRevealText(props: ScrollTextProps) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
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

function ScrollTypeText(props: ScrollTextProps) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
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

function ScrollLetterText(props: ScrollTextProps) {
  const mounted = useMounted();
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

function ScrollFadeText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useSafeReducedMotion();
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

function AboutBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useSafeReducedMotion();
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
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 85% 30%, rgba(127,203,236,0.18), transparent 70%)",
        }}
      />

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
        <circle cx="1080" cy="380" r="285" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="1 12" />
        <circle cx="1080" cy="380" r="465" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.2" strokeDasharray="1 16" />
        <g fill="currentColor" fillOpacity="0.35">
          <circle cx="1080" cy="95" r="3" />
          <circle cx="1410" cy="380" r="3" />
          <circle cx="796" cy="602" r="3" />
        </g>
        <g stroke="currentColor" strokeWidth="1" strokeOpacity="0.12">
          <circle cx="0" cy="820" r="200" />
          <circle cx="0" cy="820" r="300" />
          <circle cx="0" cy="820" r="400" />
        </g>
      </motion.svg>
    </div>
  );
}

function FogSpill() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-px h-40 sm:h-52"
      style={{
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

export function AboutSection() {
  return (
    <section className="relative -mt-px bg-white py-20 text-ink lg:py-28">
      <AboutBackdrop />
      <FogSpill />

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
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

            <ScrollLetterText
              text={aboutContent.description}
              className="mt-6 max-w-sm text-base leading-relaxed text-muted min-h-[6em]"
            />

            <DrawLine delay={0.5} className="mt-8 h-0.5 w-16 bg-brand-400" />
          </div>

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
