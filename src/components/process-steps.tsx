export function ProcessSteps({
  steps,
}: {
  steps: readonly { title: string; text: string }[];
}) {
  return (
    <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="relative">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center border border-brand-500 font-display text-xl text-brand-700">
              {index + 1}
            </span>
            {index < steps.length - 1 && (
              <span aria-hidden="true" className="hidden h-px flex-1 bg-line lg:block" />
            )}
          </div>
          <h3 className="mt-6 text-lg font-semibold text-navy-900">{step.title}</h3>
          <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
