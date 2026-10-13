import type { ReactNode } from "react";

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] ${
        light ? "text-brand-400" : "text-brand-700"
      }`}
    >
      <span aria-hidden="true" className="flex items-center gap-2">
        <span className="size-1.5 rotate-45 bg-brand-400" />
        <span className={`h-px w-8 ${light ? "bg-brand-400/60" : "bg-brand-400"}`} />
      </span>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2
        className={`mt-5 font-display text-3xl leading-[1.12] tracking-tight text-balance sm:text-[2.75rem] ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-xl text-lg leading-relaxed ${light ? "text-navy-300" : "text-muted"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
