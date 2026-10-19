import type { PlanCategory } from "@/data/plans";

type PlanInclusionsProps = {
  planName: string;
  services: PlanCategory[];
};

export function PlanInclusions({ planName, services }: PlanInclusionsProps) {
  return (
    <div className="space-y-8" aria-label={`Services included in the ${planName} Plan`}>
      {services.map((category) => (
        <div key={category.title}>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            {category.title}
          </h4>
          <ul className="mt-3 space-y-2">
            {category.items.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 leading-relaxed text-ink/90"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-brand-500"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}