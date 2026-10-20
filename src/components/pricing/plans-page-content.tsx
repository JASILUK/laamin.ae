"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Info, Users } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FadeUp, LetterReveal } from "@/components/ui/letter-reveal";
import { PageHero } from "@/components/page-hero";
import { FAQSection } from "@/components/home/FaqSection";
import { ContactCta } from "@/components/home/ContactCta";
import {
  agreementNotice,
  formatPrice,
  plans,
  pricingNotice,
} from "@/data/plans";

type Plan = (typeof plans)[number];

const EASE = [0.16, 1, 0.3, 1] as const;

/* Fixed header height used to offset the sticky tab bar.
   Set --site-header-h in your header/global CSS if it isn't 4rem. */
const STICKY_TOP = "top-[var(--site-header-h,4rem)]";

const countItems = (plan: Plan, category: string) =>
  plan.services.find((s) => s.title === category)?.items.length ?? 0;

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const panelVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, staggerChildren: 0.06 },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */

function AgreementNote() {
  return (
    <p className="mt-8 flex justify-center gap-3 text-sm leading-relaxed text-muted">
      <Info
        aria-hidden="true"
        className="mt-0.5 size-4 shrink-0 text-brand-700"
      />
      <span className="max-w-3xl">{agreementNotice}</span>
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function PlansPageContent() {
  const [activeId, setActiveId] = useState<string>(plans[0].id);
  const detailRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const activeIndex = Math.max(
    0,
    plans.findIndex((p) => p.id === activeId)
  );
  const activePlan = plans[activeIndex];

  const scrollToDetails = useCallback(() => {
    detailRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [reduceMotion]);

  /* Select a plan. `scroll` brings the details panel into view. */
  const selectPlan = useCallback(
    (id: string, scroll = false) => {
      setActiveId(id);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${id}`);
      }
      if (scroll) scrollToDetails();
    },
    [scrollToDetails]
  );

  /* Deep links: /plans#standard selects that plan and scrolls to it. */
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (plans.some((p) => p.id === id)) {
        setActiveId(id);
        return true;
      }
      return false;
    };
    if (fromHash()) {
      const t = window.setTimeout(scrollToDetails, 350);
      return () => window.clearTimeout(t);
    }
    const onHash = () => {
      if (fromHash()) scrollToDetails();
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (step: 1 | -1) => {
    const next = plans[(activeIndex + step + plans.length) % plans.length];
    selectPlan(next.id);
  };

  return (
    <div className="bg-white">
      {/* ---------------------------- HERO ---------------------------- */}
      <PageHero
        title="Monthly Business Support Plans"
        description="Six service levels for businesses at different stages — from straightforward employment and visa support to full administrative coordination."
        crumbs={[{ label: "Monthly Plans" }]}
        backgroundImage="/images/contactcta/contactctabg.jpg"
      >
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <ButtonLink
            href="#compare"
            variant="accent"
            className="w-full sm:w-auto"
          >
            Compare plans
            <ArrowRight className="size-4" />
          </ButtonLink>
          <ButtonLink
            href="/contact"
            variant="outline-light"
            className="w-full sm:w-auto"
          >
            Talk to our team
          </ButtonLink>
        </div>
      </PageHero>

      {/* ------------------------ PLAN SELECTOR ----------------------- */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-brand-300/15 blur-3xl" />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <FadeUp className="flex justify-center">
              <Eyebrow>Choose a plan</Eyebrow>
            </FadeUp>
            <LetterReveal
              as="h2"
              text="Pick the level that fits your team"
              stagger={0.03}
              className="mt-4 font-display text-3xl tracking-tight text-navy-900 sm:text-4xl lg:text-5xl"
            />
            <FadeUp delay={0.15}>
              <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
                Plans are organised by employee range. Select a plan to see
                exactly what it includes.
              </p>
            </FadeUp>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <motion.li
                key={plan.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
                className="h-full"
              >
                <PlanTile
                  plan={plan}
                  selected={plan.id === activeId}
                  onSelect={() => selectPlan(plan.id, true)}
                />
              </motion.li>
            ))}
          </ul>

          <FadeUp delay={0.2}>
            <AgreementNote />
          </FadeUp>
        </Container>
      </section>

      {/* ------------------------ PLAN DETAILS ------------------------ */}
      <section
        ref={detailRef}
        id="plan-details"
        aria-label="Plan details"
        className="relative scroll-mt-4 border-y border-line bg-mist/40 pb-16 sm:pb-20 lg:pb-24"
      >
        {/* Sticky plan switcher */}
        <div
          className={`sticky ${STICKY_TOP} z-30 border-b border-line bg-white/85 backdrop-blur-md`}
        >
          <Container className="py-3">
            <PlanTabs
              activeId={activeId}
              onSelect={(id) => selectPlan(id)}
              reduceMotion={!!reduceMotion}
            />
          </Container>
        </div>

        <Container className="pt-10 sm:pt-12 lg:pt-14">
          <div
            role="tabpanel"
            id="plan-panel"
            aria-labelledby={`tab-${activePlan.id}`}
            aria-live="polite"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activePlan.id}
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid gap-8 lg:grid-cols-[22rem_1fr] lg:gap-14"
              >
                {/* Summary card */}
                <motion.div
                  variants={itemVariants}
                  className="lg:sticky lg:top-40 lg:self-start"
                >
                  <div className="relative overflow-hidden rounded-3xl bg-navy-900 p-6 text-white shadow-xl sm:p-8">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-400/20 blur-2xl" />
                    <div className="relative">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-400">
                        {activePlan.name} Plan
                      </h3>
                      <p className="mt-5 font-display text-4xl tracking-tight sm:mt-6">
                        {formatPrice(activePlan.price)}
                        <span className="ml-1 font-sans text-base text-navy-300">
                          /month
                        </span>
                      </p>
                      <p className="mt-5 flex items-center gap-2.5 border-t border-white/15 pt-5 text-sm text-navy-300">
                        <Users
                          aria-hidden="true"
                          className="size-4 text-brand-400"
                        />
                        <span>
                          Employee range:{" "}
                          <span className="font-semibold text-white">
                            {activePlan.employees}
                          </span>
                        </span>
                      </p>
                      <ButtonLink
                        href={`/contact?plan=${activePlan.id}`}
                        variant="accent"
                        className="mt-6 w-full sm:mt-7"
                      >
                        Enquire about {activePlan.name}
                      </ButtonLink>
                    </div>
                  </div>
                  <p className="mt-5 leading-relaxed text-muted">
                    {activePlan.summary}
                  </p>
                </motion.div>

                {/* Services */}
                <div>
                  <motion.div
                    variants={itemVariants}
                    className="flex items-end justify-between gap-4 border-b border-navy-900 pb-4"
                  >
                    <h3 className="font-display text-xl text-navy-900 sm:text-2xl">
                      What’s included in {activePlan.name}
                    </h3>
                    <span className="shrink-0 text-xs text-muted">
                      {activePlan.services.length} service{" "}
                      {activePlan.services.length === 1
                        ? "category"
                        : "categories"}
                    </span>
                  </motion.div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {activePlan.services.map((category) => (
                      <motion.div
                        key={category.title}
                        variants={itemVariants}
                        className="rounded-2xl border border-line bg-white p-5 sm:p-6"
                      >
                        <h4 className="font-display text-lg leading-snug text-navy-900">
                          {category.title}
                        </h4>
                        <ul className="mt-3 space-y-2.5">
                          {category.items.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2.5 text-sm leading-relaxed text-muted"
                            >
                              <Check
                                aria-hidden="true"
                                className="mt-0.5 size-4 shrink-0 text-brand-600"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>

                  {/* Previous / next plan */}
                  <motion.div
                    variants={itemVariants}
                    className="mt-8 flex items-center justify-between gap-3"
                  >
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:border-brand-400 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                    >
                      <ArrowLeft aria-hidden="true" className="size-4" />
                      <span className="hidden sm:inline">
                        {plans[(activeIndex - 1 + plans.length) % plans.length].name}
                      </span>
                      <span className="sm:hidden">Previous</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:border-brand-400 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                    >
                      <span className="hidden sm:inline">
                        {plans[(activeIndex + 1) % plans.length].name}
                      </span>
                      <span className="sm:hidden">Next</span>
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </section>

      {/* ------------------------- COMPARISON ------------------------- */}
      <ComparisonSection onSelect={(id) => selectPlan(id, true)} />

      {/* ----------------------- PRICING NOTICE ----------------------- */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <FadeUp>
            <div
              role="note"
              className="grid gap-6 rounded-3xl border border-brand-500/40 bg-white p-6 sm:gap-8 sm:p-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16"
            >
              <div>
                <Info aria-hidden="true" className="size-7 text-brand-700" />
                <h2 className="mt-4 font-display text-2xl tracking-tight text-navy-900 sm:mt-5 sm:text-3xl">
                  Important pricing notice
                </h2>
              </div>
              <div>
                <p className="text-base leading-relaxed text-ink sm:text-lg">
                  {pricingNotice}
                </p>
                <p className="mt-5 leading-relaxed text-muted">
                  {agreementNotice}
                </p>
              </div>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* ------------------------- FAQ + CTA -------------------------- */}
      <div className="bg-mist/40">
        <FAQSection page="plans" />
      </div>
      <ContactCta />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Plan card (selector)                                               */
/* ------------------------------------------------------------------ */

function PlanTile({
  plan,
  selected,
  onSelect,
}: {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-controls="plan-panel"
      className={`group relative flex h-full w-full flex-col rounded-2xl border p-5 text-left transition-[background-color,border-color,box-shadow,transform] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 active:scale-[0.99] sm:p-6 ${
        selected
          ? "border-navy-900 bg-navy-900 text-white shadow-[0_28px_60px_-30px_rgba(4,45,85,0.7)]"
          : "border-line bg-white hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[0_20px_45px_-32px_rgba(4,45,85,0.35)]"
      }`}
    >
      {selected && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-400/25 blur-2xl"
        />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <h3
          className={`font-display text-2xl ${
            selected ? "text-white" : "text-navy-900"
          }`}
        >
          {plan.name}
        </h3>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            selected ? "bg-white/15 text-white" : "bg-brand-50 text-brand-700"
          }`}
        >
          {plan.employees}
        </span>
      </div>

      <p
        className={`relative mt-4 font-display text-3xl ${
          selected ? "text-white" : "text-navy-900"
        }`}
      >
        {formatPrice(plan.price)}
        <span
          className={`ml-1 text-sm font-normal ${
            selected ? "text-navy-300" : "text-muted"
          }`}
        >
          /month
        </span>
      </p>

      <p
        className={`relative mt-3 line-clamp-3 flex-1 text-sm leading-relaxed ${
          selected ? "text-navy-200" : "text-muted"
        }`}
      >
        {plan.summary}
      </p>

      <span
        className={`relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${
          selected ? "text-brand-300" : "text-navy-900 group-hover:text-brand-700"
        }`}
      >
        {selected ? "Viewing inclusions" : "View inclusions"}
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
        />
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Sticky tab bar                                                     */
/* ------------------------------------------------------------------ */

function PlanTabs({
  activeId,
  onSelect,
  reduceMotion,
}: {
  activeId: string;
  onSelect: (id: string) => void;
  reduceMotion: boolean;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  /* Keep the active tab centred inside the scrollable bar (no page scroll). */
  useEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>(`[data-tab="${activeId}"]`);
    if (!list || !tab) return;
    list.scrollTo({
      left: tab.offsetLeft - (list.clientWidth - tab.clientWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeId, reduceMotion]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = plans.findIndex((p) => p.id === activeId);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      onSelect(plans[(i + 1) % plans.length].id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onSelect(plans[(i - 1 + plans.length) % plans.length].id);
    }
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label="Monthly plans"
      onKeyDown={onKeyDown}
      className="relative mx-auto flex w-full max-w-fit gap-1 overflow-x-auto rounded-full border border-line bg-white p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {plans.map((plan) => {
        const active = plan.id === activeId;
        return (
          <button
            key={plan.id}
            id={`tab-${plan.id}`}
            data-tab={plan.id}
            role="tab"
            type="button"
            aria-selected={active}
            aria-controls="plan-panel"
            tabIndex={active ? 0 : -1}
            onClick={() => onSelect(plan.id)}
            className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:px-5 ${
              active ? "text-white" : "text-muted hover:text-navy-900"
            }`}
          >
            {active && (
              <motion.span
                layoutId="plan-tab-pill"
                aria-hidden
                className="absolute inset-0 rounded-full bg-navy-900"
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 36 }
                }
              />
            )}
            <span className="relative z-10">{plan.name}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Comparison                                                         */
/*  lg+  : all six plans side by side                                  */
/*  <lg  : pick any two plans → a compact 3-column table, no sideways  */
/*         scrolling                                                   */
/* ------------------------------------------------------------------ */

function Mark({ count }: { count: number }) {
  if (count === 0) {
    return (
      <span aria-label="Not included" className="text-muted/50">
        –
      </span>
    );
  }
  return (
    <span
      className="inline-flex flex-col items-center gap-0.5"
      aria-label={`Included, ${count} ${count === 1 ? "item" : "items"}`}
    >
      <Check aria-hidden="true" className="size-5 text-brand-600" />
      <span className="text-[11px] text-muted">
        {count} {count === 1 ? "item" : "items"}
      </span>
    </span>
  );
}

function ComparisonSection({ onSelect }: { onSelect: (id: string) => void }) {
  const [pair, setPair] = useState<[string, string]>([
    plans[0].id,
    plans[Math.min(2, plans.length - 1)].id,
  ]);

  const allCategories = Array.from(
    new Set(plans.flatMap((p) => p.services.map((s) => s.title)))
  );

  const [a, b] = pair.map(
    (id) => plans.find((p) => p.id === id) ?? plans[0]
  ) as [Plan, Plan];

  const setSlot = (slot: 0 | 1, id: string) =>
    setPair((prev) => (slot === 0 ? [id, prev[1]] : [prev[0], id]));

  return (
    <section
      id="compare"
      className="relative scroll-mt-24 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <FadeUp className="flex justify-center">
            <Eyebrow>Detailed comparison</Eyebrow>
          </FadeUp>
          <LetterReveal
            as="h2"
            text="Compare services across plans"
            stagger={0.03}
            className="mt-4 font-display text-3xl tracking-tight text-navy-900 sm:text-4xl lg:text-5xl"
          />
          <FadeUp delay={0.15}>
            <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
              See which service categories each plan covers and how many items
              are included.
            </p>
          </FadeUp>
        </div>

        {/* ===================== DESKTOP (lg+) ===================== */}
        <FadeUp delay={0.2} className="mt-12 hidden lg:block">
          <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
            <table className="w-full border-collapse text-sm">
              <caption className="sr-only">
                Service categories included in each monthly plan
              </caption>
              <thead>
                <tr className="border-b border-line bg-mist/60">
                  <th
                    scope="col"
                    className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-muted"
                  >
                    Service category
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.id} scope="col" className="px-3 py-4">
                      <button
                        type="button"
                        onClick={() => onSelect(plan.id)}
                        className="group block w-full text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                      >
                        <span className="block font-display text-base text-navy-900 transition-colors group-hover:text-brand-700">
                          {plan.name}
                        </span>
                        <span className="mt-0.5 block text-xs font-normal text-muted">
                          {formatPrice(plan.price)}/mo
                        </span>
                        <span className="mt-0.5 block text-[11px] font-normal text-muted">
                          {plan.employees}
                        </span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allCategories.map((category, row) => (
                  <tr
                    key={category}
                    className={`border-b border-line last:border-0 transition-colors hover:bg-brand-50/40 ${
                      row % 2 === 1 ? "bg-mist/30" : ""
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-5 py-4 text-left font-medium text-navy-900"
                    >
                      {category}
                    </th>
                    {plans.map((plan) => (
                      <td key={plan.id} className="px-3 py-4 text-center">
                        <Mark count={countItems(plan, category)} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>

        {/* ================== MOBILE / TABLET (<lg) ================= */}
        <FadeUp delay={0.2} className="mt-10 lg:hidden">
          <div className="grid grid-cols-2 gap-3">
            {([a, b] as Plan[]).map((current, slot) => (
              <label key={slot} className="block">
                <span className="mb-1.5 block text-xs font-semibold text-muted">
                  {slot === 0 ? "First plan" : "Second plan"}
                </span>
                <select
                  value={current.id}
                  onChange={(e) => setSlot(slot as 0 | 1, e.target.value)}
                  className="w-full rounded-xl border border-line bg-white px-3 py-3 text-sm font-semibold text-navy-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {formatPrice(p.price)}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
            <table className="w-full table-fixed border-collapse text-sm">
              <caption className="sr-only">
                Comparison of {a.name} and {b.name}
              </caption>
              <colgroup>
                <col className="w-[42%]" />
                <col className="w-[29%]" />
                <col className="w-[29%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-line bg-mist/60">
                  <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-muted sm:px-5">
                    Plan
                  </th>
                  {[a, b].map((p) => (
                    <th key={p.id} scope="col" className="px-2 py-3 text-center">
                      <span className="block font-display text-base text-navy-900">
                        {p.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <th scope="row" className="px-3 py-3.5 text-left text-[13px] font-medium text-navy-900 sm:px-5">
                    Monthly fee
                  </th>
                  {[a, b].map((p) => (
                    <td key={p.id} className="px-2 py-3.5 text-center text-[13px] font-semibold text-navy-900">
                      {formatPrice(p.price)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-line bg-mist/30">
                  <th scope="row" className="px-3 py-3.5 text-left text-[13px] font-medium text-navy-900 sm:px-5">
                    Employees
                  </th>
                  {[a, b].map((p) => (
                    <td key={p.id} className="px-2 py-3.5 text-center text-[13px] text-muted">
                      {p.employees}
                    </td>
                  ))}
                </tr>
                {allCategories.map((category, row) => (
                  <tr
                    key={category}
                    className={`border-b border-line last:border-0 ${
                      row % 2 === 0 ? "" : "bg-mist/30"
                    }`}
                  >
                    <th scope="row" className="px-3 py-3.5 text-left text-[13px] font-medium leading-snug text-navy-900 sm:px-5">
                      {category}
                    </th>
                    {[a, b].map((p) => (
                      <td key={p.id} className="px-2 py-3.5 text-center">
                        <Mark count={countItems(p, category)} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {[a, b].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelect(p.id)}
                className="rounded-full border border-navy-900/15 bg-white px-3 py-3 text-sm font-semibold text-navy-900 transition-colors hover:border-brand-600 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                See {p.name} details
              </button>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.25}>
          <AgreementNote />
        </FadeUp>
      </Container>
    </section>
  );
}