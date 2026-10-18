import Link from "next/link";
import type { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  variant = "accent",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "accent" | "outline" | "outline-light";
  className?: string;
}) {
  const base = "inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold transition-all duration-200 rounded-none";
  const variants = {
    accent: "bg-brand-400 text-navy-950 hover:bg-brand-300 shadow-lg shadow-brand-500/20",
    outline: "border border-line text-navy-900 hover:bg-mist",
    "outline-light": "border border-white/30 text-white hover:bg-white/10",
  };
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
