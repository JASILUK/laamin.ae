"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Users } from "lucide-react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { formatPrice, type Plan } from "@/data/plans";

const EASE = [0.16, 1, 0.3, 1] as const;
const MOBILE_VISIBLE = 3;

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

type PlanCardProps = {
  plan: Plan;
  featured?: boolean;
  index?: number;
};

export function PlanCard({ plan, featured = false, index = 0 }: PlanCardProps) {
  const [expanded, setExpanded] = useState(false);
  const extraId = useId();

  const firstItems = plan.keyInclusions.slice(0, MOBILE_VISIBLE);
  const extraItems = plan.keyInclusions.slice(MOBILE_VISIBLE);
  const hiddenCount = extraItems.length;

  const card: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: EASE,
        delay: index * 0.08,
        delayChildren: index * 0.08 + 0.2,
        staggerChildren: 0.07,
      },
    },
  };

  const renderItem = (text: string) => (
    <motion.li key={text} variants={item} className="flex gap-3">
      <span
        aria-hidden="true"
        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
          featured
            ? "bg-brand-400/20 text-brand-300"
            : "bg-brand-400/10 text-brand-700"
        }`}
      >
        <Check className="size-3" strokeWidth={3} />
      </span>
      <span className={featured ? "text-white/90" : "text-ink/90"}>{text}</span>
    </motion.li>
  );

  return (
    <motion.article
      variants={card}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-[box-shadow,border-color,translate] duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7 ${
        featured
          ? "border-navy-700 bg-navy-900 text-white shadow-[0_30px_60px_-30px_rgba(2,26,51,0.7)]"
          : "border-line bg-white text-ink hover:border-brand-400/50 hover:shadow-[0_28px_50px_-30px_rgba(2,26,51,0.3)]"
      }`}
    >
      {/* Top accent line */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-[3px] ${
          featured
            ? "bg-gradient-to-r from-brand-400 via-brand-300 to-brand-400"
            : "origin-left scale-x-0 bg-brand-400 transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
        }`}
      />

      {featured && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-brand-400/15 blur-3xl"
        />
      )}

      <header className="relative">
        <motion.div
          variants={item}
          className="flex items-center justify-between gap-3"
        >
          <p
            className={`text-xs font-semibold uppercase tracking-[0.2em] ${
              featured ? "text-brand-300" : "text-brand-700"
            }`}
          >
            {plan.name}
          </p>
          {featured && (
            <span className="rounded-full bg-brand-400 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-navy-950">
              Most chosen
            </span>
          )}
        </motion.div>

        {/* Price: never wraps, so every card looks the same */}
        <motion.p
          variants={item}
          className="mt-5 flex flex-nowrap items-baseline gap-1 whitespace-nowrap"
        >
          <span
            className={`font-display text-[2rem] leading-none tracking-tight tabular-nums sm:text-[2.25rem] xl:text-[2.5rem] ${
              featured ? "text-white" : "text-navy-900"
            }`}
          >
            {formatPrice(plan.price)}
          </span>
          <span
            className={`shrink-0 text-sm ${
              featured ? "text-navy-300" : "text-muted"
            }`}
          >
            /month
          </span>
        </motion.p>

        <motion.p
          variants={item}
          className={`mt-1.5 text-xs ${
            featured ? "text-navy-300" : "text-muted"
          }`}
        >
          Professional service fee. Government costs billed separately.
        </motion.p>

        <motion.div
          variants={item}
          className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
            featured ? "bg-white/10 text-white" : "bg-mist text-navy-800"
          }`}
        >
          <Users aria-hidden="true" className="size-3.5" />
          {plan.employees} employees
        </motion.div>
      </header>

      <motion.p
        variants={item}
        className={`relative mt-5 text-sm leading-relaxed ${
          featured ? "text-navy-300" : "text-muted"
        }`}
      >
        {plan.summary}
      </motion.p>

      <div
        className={`relative mt-5 border-t pt-5 ${
          featured ? "border-white/10" : "border-line"
        }`}
      >
        <motion.p
          variants={item}
          className={`text-[0.7rem] font-semibold uppercase tracking-wider ${
            featured ? "text-navy-300" : "text-muted"
          }`}
        >
          Key inclusions
        </motion.p>

        <ul className="mt-4 space-y-3 text-sm">{firstItems.map(renderItem)}</ul>

        {hiddenCount > 0 && (
          <>
            {/* Extra items: collapsed on mobile, always open from md up */}
            <div
              id={extraId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none md:grid-rows-[1fr] ${
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <ul className="space-y-3 pt-3 text-sm">
                  {extraItems.map(renderItem)}
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls={extraId}
              className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:underline md:hidden ${
                featured
                  ? "text-brand-300 hover:text-white"
                  : "text-brand-700 hover:text-navy-900"
              }`}
            >
              {expanded ? "Show less" : `Show ${hiddenCount} more`}
              <ChevronDown
                aria-hidden="true"
                className={`size-4 transition-transform duration-300 motion-reduce:transition-none ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </>
        )}
      </div>

      <motion.div variants={item} className="relative mt-auto space-y-4 pt-7">
        <ButtonLink
          href={`/contact?plan=${plan.id}`}
          variant={featured ? "accent" : "accent-on-light"}
          className="w-full"
          ariaLabel={`Enquire about the ${plan.name} plan`}
        >
          Enquire About This Plan
        </ButtonLink>

        <Link
          href={`/plans#${plan.id}`}
          className={`group/link flex items-center justify-center gap-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:underline ${
            featured
              ? "text-brand-300 hover:text-white"
              : "text-brand-700 hover:text-navy-900"
          }`}
        >
          View full inclusions
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover/link:translate-x-1 motion-reduce:transition-none"
          />
        </Link>
      </motion.div>
    </motion.article>
  );
}