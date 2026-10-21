"use client";

import { useRef } from "react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { LetterReveal, FadeUp } from "@/components/ui/letter-reveal";
import { services, specialistServices, type Service } from "@/data/services";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Images live in /public/images/services/ */
const serviceImages: Record<string, string> = {
  "business-setup-services": "/images/services/business.webp",
  "pro-services": "/images/services/pro.webp",
  "visa-processing": "/images/services/visa.webp",
  "document-clearing": "/images/services/document.webp",
  "family-visa": "/images/services/family-visa.webp",
  "golden-visa": "/images/services/golden-visa.webp",
};

/* ------------------------------------------------------------------
   Image panel with scroll parallax + reveal
   ------------------------------------------------------------------ */
function ServiceImage({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Start at 0% so the initial transform is consistent during hydration.
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["0%", "7%"],
  );

  const Icon = service.icon;
  const src = serviceImages[service.slug];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 shadow-[0_30px_80px_-30px_rgba(10,25,47,0.45)] sm:aspect-[5/4] lg:aspect-[4/5]">
        {/* Fallback if the image file is missing */}
        <Icon
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 text-brand-300/30"
          strokeWidth={1}
        />

        {src && (
          <motion.img
            src={src}
            alt={service.title}
            loading="lazy"
            decoding="async"
            style={{ y, scale: 1.14 }}
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />

        {/* Number badge */}
        <span
          aria-hidden="true"
          className="absolute left-5 top-5 font-display text-5xl leading-none text-white/90 sm:left-7 sm:top-7 sm:text-6xl"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Bottom glass tag */}
        <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md sm:inset-x-6 sm:bottom-6">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-navy-900">
            <Icon aria-hidden="true" className="size-5" strokeWidth={1.6} />
          </span>
          <span className="font-display text-sm tracking-wide text-white sm:text-base">
            {service.shortTitle}
          </span>
        </div>
      </div>

      {/* Soft brand glow behind the frame */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-brand-300/10 blur-3xl"
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   Text panel
   ------------------------------------------------------------------ */
function ServiceText({
  service,
  eyebrow,
  headingLevel = "h2",
}: {
  service: Service;
  eyebrow: string;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <div className="flex flex-col justify-center">
      <FadeUp>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
          <span className="font-display text-[11px] uppercase tracking-[0.25em] text-navy-900">
            {eyebrow}
          </span>
        </div>
      </FadeUp>

      <LetterReveal
        as={headingLevel}
        text={service.title}
        stagger={0.02}
        className="mt-4 font-display text-3xl tracking-tight text-navy-900 text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
      />

      <FadeUp delay={0.15}>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {service.short}
        </p>
      </FadeUp>

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.07, delayChildren: 0.25 },
          },
        }}
        className="mt-8 border-t border-line"
      >
        {service.items.slice(0, 6).map((item) => (
          <motion.li
            key={item}
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: EASE },
              },
            }}
            className="flex gap-3.5 border-b border-line py-3.5 text-sm leading-relaxed text-ink sm:text-[0.9375rem]"
          >
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
              <Check aria-hidden="true" className="size-3" strokeWidth={3} />
            </span>
            {item}
          </motion.li>
        ))}
      </motion.ul>

      <FadeUp delay={0.2}>
        <Link
          href={`/services/${service.slug}`}
          className="group mt-9 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-7 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-navy-700 sm:w-auto"
        >
          Explore service
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-1"
          />
        </Link>
      </FadeUp>
    </div>
  );
}

/* ------------------------------------------------------------------
   Alternating row (image left/right)
   ------------------------------------------------------------------ */
function ServiceRow({
  service,
  index,
  eyebrow,
  headingLevel,
}: {
  service: Service;
  index: number;
  eyebrow: string;
  headingLevel?: "h2" | "h3";
}) {
  const imageRight = index % 2 === 1;

  return (
    <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <div className={imageRight ? "lg:order-2" : ""}>
        <ServiceImage service={service} index={index} />
      </div>
      <div className={imageRight ? "lg:order-1" : ""}>
        <ServiceText
          service={service}
          eyebrow={eyebrow}
          headingLevel={headingLevel}
        />
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------
   Main showcase
   ------------------------------------------------------------------ */
export function ServicesShowcase() {
  return (
    <MotionConfig reducedMotion="user">
      {/* ============ Primary services ============ */}
      <section className="relative py-16 sm:py-20 lg:py-28">
        <Container>
          <FadeUp className="mx-auto mb-16 max-w-3xl text-center lg:mb-24">
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              LAAMIN coordinates business and administrative services around your requirements.
              Services may be requested individually or through an applicable monthly plan.
              Inclusions, professional fees, government charges and third-party costs are confirmed
              before engagement.
            </p>
          </FadeUp>

          <div className="space-y-20 sm:space-y-28 lg:space-y-36">
            {services.map((service, index) => (
              <ServiceRow
                key={service.slug}
                service={service}
                index={index}
                eyebrow={`Service ${String(index + 1).padStart(2, "0")}`}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ============ Specialist visa support ============ */}
      <section className="relative border-y border-line bg-mist py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="mx-auto mb-16 max-w-2xl text-center lg:mb-24">
            <FadeUp>
              <div className="flex items-center justify-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                <span className="font-display text-[11px] uppercase tracking-[0.25em] text-navy-900">
                  Specialist visa support
                </span>
              </div>
            </FadeUp>

            <LetterReveal
              as="h2"
              text="Support for specific visa needs"
              stagger={0.02}
              className="mt-4 font-display text-3xl tracking-tight text-navy-900 text-balance sm:text-4xl lg:text-5xl"
            />

            <FadeUp delay={0.15}>
              <p className="mt-4 leading-relaxed text-muted sm:text-lg">
                Explore these focused services for more information. Availability and the support
                LAAMIN can provide are confirmed after reviewing each enquiry.
              </p>
            </FadeUp>
          </div>

          <div className="space-y-20 sm:space-y-28 lg:space-y-36">
            {specialistServices.map((service, index) => (
              <ServiceRow
                key={service.slug}
                service={service}
                index={index}
                headingLevel="h3"
                eyebrow={`Visa & Immigration · ${String(index + 1).padStart(2, "0")}`}
              />
            ))}
          </div>
        </Container>
      </section>
    </MotionConfig>
  );
}
