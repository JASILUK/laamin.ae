"use client";

import { Check, ChevronDown } from "lucide-react";
import { useId, useState } from "react";

const VISIBLE_ON_MOBILE = 5;

/** Plan service list. Long lists collapse on small screens and expand on demand. */
export function PlanInclusions({ planName, services }: { planName: string; services: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const collapsible = services.length > VISIBLE_ON_MOBILE;

  return (
    <div>
      <ul id={listId} className="grid gap-x-10 sm:grid-cols-2">
        {services.map((service, index) => (
          <li
            key={service}
            className={`gap-3 border-b border-line py-3.5 text-[0.9375rem] leading-snug text-ink sm:flex ${
              !expanded && index >= VISIBLE_ON_MOBILE ? "hidden" : "flex"
            }`}
          >
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-700" />
            {service}
          </li>
        ))}
      </ul>
      {collapsible && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded((value) => !value)}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 sm:hidden"
        >
          {expanded
            ? "Show fewer services"
            : `Show all ${services.length} ${planName} services`}
          <ChevronDown
            aria-hidden="true"
            className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </div>
  );
}
