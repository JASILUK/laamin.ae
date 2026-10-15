import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

type Variant = "accent" | "navy" | "outline" | "outline-light";
type RevealDir = "r" | "l" | "u" | "d" | "radial";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

/* Default variants — keep the original instant hover colors. */
const variants: Record<Variant, string> = {
  accent: "bg-brand-400 text-navy-950 hover:bg-brand-300",
  navy: "bg-navy-900 text-white hover:bg-navy-700",
  outline:
    "border border-navy-900/25 text-navy-900 hover:border-navy-900 hover:bg-navy-900 hover:text-white",
  "outline-light":
    "border border-white/30 text-white hover:border-white hover:bg-white hover:text-navy-900",
};

/* Reveal variants — no instant hover:bg, so the wipe is the only change. */
const revealVariants: Record<Variant, string> = {
  accent: "bg-brand-400 text-navy-950",
  navy: "bg-navy-900 text-white",
  outline: "border border-navy-900/25 text-navy-900",
  "outline-light": "border border-white/30 text-white",
};

export function buttonClasses(variant: Variant = "navy", className = ""): string {
  return `${base} ${variants[variant]} ${className}`;
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  className?: string;
  /** Directional background reveal on hover / focus. */
  reveal?: RevealDir;
  /** Overlay color. Defaults to white. */
  revealBg?: string;
  /** Radial origin + radius (used only when reveal="radial"). */
  revealX?: string;
  revealY?: string;
  revealR?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

/** Link styled as a button. Uses a plain anchor for tel:, mailto: and external URLs. */
export function ButtonLink({
  href,
  variant = "navy",
  className = "",
  reveal,
  revealBg,
  revealX,
  revealY,
  revealR,
  children,
  ...rest
}: ButtonLinkProps) {
  const revealClasses = reveal
    ? reveal === "radial"
      ? "reveal reveal-radial"
      : `reveal reveal-wipe-${reveal}`
    : "";

  const palette = reveal ? revealVariants : variants;
  const classes = `${base} ${palette[variant]} ${revealClasses} ${className}`.trim();

  let style: CSSProperties | undefined;
  if (reveal) {
    style = {
      ["--reveal-bg" as string]: revealBg ?? "#ffffff",
      ...(reveal === "radial"
        ? {
            ["--reveal-x" as string]: revealX ?? "0%",
            ["--reveal-y" as string]: revealY ?? "0%",
            ["--reveal-r" as string]: revealR ?? "150%",
          }
        : {}),
    } as CSSProperties;
  }

  const content = reveal ? (
    <span className="reveal-content inline-flex items-center gap-2">{children}</span>
  ) : (
    children
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} style={style} {...rest}>
        {content}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      style={style}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}