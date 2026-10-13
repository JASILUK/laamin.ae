import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "accent" | "navy" | "outline" | "outline-light";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  accent: "bg-brand-400 text-navy-950 hover:bg-brand-300",
  navy: "bg-navy-900 text-white hover:bg-navy-700",
  outline: "border border-navy-900/25 text-navy-900 hover:border-navy-900 hover:bg-navy-900 hover:text-white",
  "outline-light": "border border-white/30 text-white hover:border-white hover:bg-white hover:text-navy-900",
};

export function buttonClasses(variant: Variant = "navy", className = ""): string {
  return `${base} ${variants[variant]} ${className}`;
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

/** Link styled as a button. Uses a plain anchor for tel:, mailto: and external URLs. */
export function ButtonLink({ href, variant, className, children, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses(variant, className);

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
