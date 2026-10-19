import { formatPrice, plans } from "@/data/plans";

export function PlansComparison() {
  const categories = Array.from(
    new Set(plans.flatMap((plan) => plan.services.map((s) => s.title)))
  );

  return (
    <div className="hidden overflow-x-auto border border-line bg-white lg:block">
      <table className="w-full min-w-[960px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-mist">
            <th
              scope="col"
              className="sticky left-0 z-10 w-56 bg-mist px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted"
            >
              Feature category
            </th>
            {plans.map((plan) => (
              <th key={plan.id} scope="col" className="px-4 py-3 align-bottom">
                <span className="block text-xs font-semibold uppercase tracking-wider text-brand-700">
                  {plan.name}
                </span>
                <span className="mt-1 block font-display text-lg text-navy-900">
                  {formatPrice(plan.price)}
                </span>
                <span className="block text-xs font-normal text-muted">
                  {plan.employees} employees
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((categoryTitle) => (
            <tr key={categoryTitle} className="border-t border-line align-top">
              <th
                scope="row"
                className="sticky left-0 z-10 w-56 bg-white px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted"
              >
                {categoryTitle}
              </th>
              {plans.map((plan) => {
                const match = plan.services.find(
                  (c) => c.title === categoryTitle
                );
                return (
                  <td key={plan.id} className="px-4 py-4 text-ink/90">
                    {match && match.items.length > 0 ? (
                      <ul className="space-y-1.5">
                        {match.items.map((item) => (
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
                        className="text-muted/50"
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