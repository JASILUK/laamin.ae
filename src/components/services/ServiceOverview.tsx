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
import { getService, services } from "@/data/services";
import { serviceImages } from "@/data/service-media";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ServiceOverview({ slug }: { slug: string }) {
  const service = getService(slug);
  const imageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  if (!service) return null;

  const Icon = service.icon;
  const src = serviceImages[service.slug];
  const parent = service.parentSlug
    ? services.find((item) => item.slug === service.parentSlug)
    : undefined;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative py-16 sm:py-20 lg:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* ---------- Image (sticky on desktop) ---------- */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative lg:sticky lg:top-28"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 shadow-[0_30px_80px_-30px_rgba(10,25,47,0.45)] sm:aspect-[5/4] lg:aspect-[4/5]">
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
                  style={{ y, scale: 1.12 }}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />

              <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md sm:inset-x-6 sm:bottom-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-navy-900">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.6} />
                </span>
                <span className="font-display text-sm tracking-wide text-white sm:text-base">
                  {service.shortTitle}
                </span>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-brand-300/10 blur-3xl"
            />
          </motion.div>

          {/* ---------- Copy + items ---------- */}
          <div>
            <FadeUp>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                <span className="font-display text-[11px] uppercase tracking-[0.25em] text-navy-900">
                  {service.title}
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="mt-6 font-display text-2xl leading-[1.3] tracking-tight text-navy-900 text-balance sm:text-[2rem]">
                {service.intro[0]}
              </p>
            </FadeUp>

            {service.intro.slice(1).map((paragraph, i) => (
              <FadeUp key={paragraph} delay={0.15 + i * 0.05}>
                <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
                  {paragraph}
                </p>
              </FadeUp>
            ))}

            {parent && (
              <FadeUp delay={0.2}>
                <Link
                  href={`/services/${parent.slug}`}
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-navy-900"
                >
                  View all {parent.shortTitle.toLowerCase()}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </FadeUp>
            )}

            <div className="mt-12 lg:mt-14">
              <LetterReveal
                as="h2"
                text={service.itemsTitle}
                stagger={0.02}
                className="font-display text-2xl tracking-tight text-navy-900 sm:text-3xl"
              />

              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-8% 0px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
                }}
                className="mt-6 border-t border-line"
              >
                {service.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                    }}
                    className="group flex gap-4 border-b border-line py-4 text-[15px] font-medium leading-relaxed text-navy-900 transition-transform duration-300 hover:translate-x-1 sm:text-base"
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                      <Check aria-hidden="true" className="size-3" strokeWidth={3} />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </Container>
      </section>
    </MotionConfig>
  );
}