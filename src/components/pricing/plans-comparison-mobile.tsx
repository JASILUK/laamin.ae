"use client";

import { useState } from "react";

import { formatPrice, plans } from "@/data/plans";

export function PlansComparisonMobile() {
  const [selectedId, setSelectedId] = useState(plans[0].id);
  const selected = plans.find((p) => p.id === selectedId) ?? plans[0];

  return (
    <div className="lg:hidden">
      <div
        role="tablist"
        aria-label="Select a plan to compare"
        className="flex flex-wrap gap-2"
      >
        {plans.map((plan) => {
          const active = plan.id === selectedId;
          return (
            <button
              key={plan.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`plan-panel-${plan.id}`}
              id={`plan-tab-${plan.id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setSelectedId(plan.id)}
              className={
                active
                  ? "rounded-full border border-brand-700 bg-brand-700 px-3.5 py-1.5 text-sm font-medium text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                  : "rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-navy-900 transition hover:border-brand-400/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
              }
            >
              {plan.name}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`plan-panel-${selected.id}`}
        aria-labelledby={`plan-tab-${selected.id}`}
        className="mt-4 border border-line bg-white p-5"
      >
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
            {selected.name} Plan
          </p>
          <p className="text-sm text-muted">
            {selected.employees} employees
          </p>
        </div>
        <p className="mt-1 font-display text-2xl tracking-tight text-navy-900">
          {formatPrice(selected.price)}
          <span className="ml-1 font-sans text-sm font-normal text-muted">
            /month
          </span>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink/80">
          {selected.summary}
        </p>

        <dl className="mt-5 space-y-4">
          {selected.services.map((category) => (
            <div key={category.title}>
              <dt className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted">
                {category.title}
              </dt>
              <dd className="mt-1.5">
                <ul className="space-y-1 text-sm text-ink/90">
                  {category.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-400"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}