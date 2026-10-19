import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type Variant = "accent" | "accent-on-light" | "outline" | "outline-light";

const variants: Record<Variant, { className: string; wipeBg: string; wipeFg: string }> = {
  // Dark backgrounds (hero, header): wipes to white
  accent: {
    className:
      "bg-brand-500 text-white shadow-md hover:shadow-lg hover:shadow-brand-500/30",
    wipeBg: "#ffffff",
    wipeFg: "#042d55",
  },
  // Light backgrounds (plans section): wipes to navy
  "accent-on-light": {
    className:
      "bg-brand-500 text-white shadow-md hover:shadow-lg hover:shadow-brand-500/30",
    wipeBg: "#042d55",
    wipeFg: "#ffffff",
  },
  outline: {
    className: "border border-line text-navy-900",
    wipeBg: "#f3f7fb",
    wipeFg: "#042d55",
  },
  "outline-light": {
    className: "border border-white/30 text-white",
    wipeBg: "#ffffff",
    wipeFg: "#042d55",
  },
};

export function ButtonLink({
  href,
  children,
  variant = "accent",
  className = "",
  ariaLabel = "",  
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;

}) {
  const v = variants[variant];

  return (
    <Link
      href={href}
      style={{ "--wipe-bg": v.wipeBg, "--wipe-fg": v.wipeFg } as CSSProperties}
      className={`btn-wipe group inline-flex items-center justify-center rounded-lg px-6 py-3.5 text-sm font-semibold transition-shadow duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 ${v.className} ${className}`}
      aria-label={ariaLabel}
    >
      <span className="btn-wipe-content flex items-center gap-2">{children}</span>
    </Link>
  );
}