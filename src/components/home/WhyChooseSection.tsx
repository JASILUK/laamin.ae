"use client";
import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal, DrawLine } from "@/components/ui/Reveal";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { SCENE_EASE } from "@/lib/constants";
import { whyChooseContent } from "@/lib/data";

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
      <motion.div
        style={{ y: blobA, rotate: rotA }}
        className="absolute -left-48 top-8 size-[520px] rounded-full bg-brand-300/10 blur-[120px] sm:size-[640px]"
      />
      <motion.div
        style={{ y: blobB, rotate: rotB }}
        className="absolute -right-52 top-1/4 size-[560px] rounded-full bg-brand-400/10 blur-[140px] sm:size-[720px]"
      />
      <motion.div
        style={{ y: blobC }}
        className="absolute -bottom-[10%] left-1/4 size-[480px] rounded-full bg-[#a7d6ef]/15 blur-[110px] sm:size-[600px]"
      />
      <motion.div
        style={{ y: blobD }}
        className="absolute -bottom-40 right-1/4 size-[420px] rounded-full bg-brand-300/10 blur-[120px] sm:size-[520px]"
      />
    </div>
  );
}

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

const WHY_ENTER_END = 0.27;
const WHY_EXIT_START = 0.68;
const WHY_FROM_SCALE = 0.55;
const WHY_EXIT_GROW = 0.35;
const WHY_ENTER_BLUR = 14;
const WHY_EXIT_BLUR = 18;
const WHY_INCOMING_OVERLAP = 0.32;
const WHY_FIRST_HEADSTART = 0.15;

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

export function WhyChooseSection() {
  const reduce = false;
  const items = whyChooseContent.items;

  return (
    <section
      aria-labelledby="why-heading"
      className="relative isolate bg-[#eaf4fb] pt-20 text-ink lg:pt-28"
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
