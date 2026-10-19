import Link from "next/link";
import { Check } from "lucide-react";

import { ButtonLink } from "@/components/button";
import { formatPrice, type Plan } from "@/data/plans";

type PlanCardProps = {
  plan: Plan;
};

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <article className="flex h-full flex-col border border-line bg-white p-6 transition-shadow duration-300 hover:shadow-[0_24px_48px_-32px_rgba(2,26,51,0.25)] sm:p-7">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
          {plan.name} Plan
        </p>
        <p className="mt-4 font-display text-3xl tracking-tight text-navy-900">
          {formatPrice(plan.price)}
          <span className="ml-1 font-sans text-base font-normal text-muted">
            /month
          </span>
        </p>
        <p className="mt-2 text-sm text-muted">
          Team size: {plan.employees} employees
        </p>
      </header>

      <p className="mt-4 text-sm leading-relaxed text-ink/80">{plan.summary}</p>

      <div className="mt-5">
        <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted">
          Key inclusions
        </p>
        <ul className="mt-2 space-y-1.5 text-sm text-ink/90">
          {plan.keyInclusions.map((item) => (
            <li key={item} className="flex gap-2">
              <Check
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-brand-700"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto space-y-3 pt-6">
        <Link
          href={`/plans#${plan.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 transition hover:text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          View full inclusions
        </Link>

        <ButtonLink
          href={`/contact?plan=${plan.id}`}
          variant="accent"
          className="w-full"
          aria-label={`Enquire about the ${plan.name} Plan`}
        >
          Enquire About This Plan
        </ButtonLink>
      </div>
    </article>
  );
}