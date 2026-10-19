import type { Plan } from "@/lib/data";

const ALL_CATEGORIES = [
  "Package Coverage",
  "Employment & Work Permits",
  "Visas & Immigration",
  "Licensing & Establishment",
  "Documentation & Coordination",
  "Documentation & Translation",
  "Insurance",
  "Tax & Financial",
  "Government Approvals & Support",
  "Consultation & Advisory",
  "Additional Support",
] as const;

type Props = { plans: Plan[] };

export function PlansComparisonDesktop({ plans }: Props) {
  const usedCategories = ALL_CATEGORIES.filter((cat) =>
    plans.some((plan) => plan.services.some((c) => c.title === cat))
  );

  return (
    <div className="hidden overflow-x-auto rounded-2xl border border-line bg-white lg:block">
      <table className="w-full min-w-[960px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-mist">
            <th
              scope="col"
              className="sticky left-0 z-10 w-52 bg-mist px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted"
            >
              Feature category
            </th>
            {plans.map((plan) => (
              <th
                key={plan.id}
                scope="col"
                className="px-4 py-3 align-bottom"
              >
                <span className="block text-xs font-semibold uppercase tracking-wider text-brand-700">
                  {plan.name}
                </span>
                <span className="mt-1 block font-display text-lg text-navy-900">
                  AED {plan.price.toLocaleString()}
                </span>
                <span className="block text-xs font-normal text-muted">
                  {plan.employees} employees
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {usedCategories.map((category) => (
            <tr key={category} className="border-t border-line align-top">
              <th
                scope="row"
                className="sticky left-0 z-10 w-52 bg-white px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted"
              >
                {category}
              </th>
              {plans.map((plan) => {
                const cat = plan.services.find((c) => c.title === category);
                const items = cat?.items ?? [];
                return (
                  <td
                    key={plan.id}
                    className="px-4 py-4 text-sm text-ink/90"
                  >
                    {items.length > 0 ? (
                      <ul className="space-y-1.5">
                        {items.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span
                              aria-hidden="true"
                              className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-400"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span
                        aria-label="Not included in this plan"
                        className="text-muted/60"
                      >
                        —
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}