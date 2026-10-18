import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  className = "",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`mt-4 font-display text-3xl tracking-tight sm:text-4xl ${light ? "text-white" : "text-navy-900"}`}>{title}</h2>
      {description && <p className={`mt-3 max-w-2xl text-lg leading-relaxed ${light ? "text-navy-300" : "text-muted"}`}>{description}</p>}
    </div>
  );
}
