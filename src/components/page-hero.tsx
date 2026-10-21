import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./container";
import { BrandArcs } from "./brand-arcs";

type Crumb = { label: string; href?: string };

export function PageHero({
  title,
  description,
  crumbs,
  children,
  backgroundImage,
  overlay = "default",
}: {
  title: string;
  description: string;
  crumbs: Crumb[];
  children?: ReactNode;
  backgroundImage?: string;
  overlay?: "default" | "light";
}) {
  return (
    <section
  data-hero
  data-hero-overlay={backgroundImage ? "" : undefined}
  className="relative overflow-hidden bg-navy-900 text-white"
>
  {backgroundImage ? (
    <div className="absolute inset-0 z-0">
      <img
        src={backgroundImage}
        alt=""
        className="h-full w-full object-cover object-center"
        loading="eager"
        decoding="async"
      />
      {overlay === "light" ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 via-navy-900/55 to-navy-900/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-navy-900/85" />
      )}
      {/* Keeps nav links readable over a bright image */}
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-navy-900/70 to-transparent" />
    </div>
  ) : (
    <BrandArcs className="inset-0 size-full text-brand-400/25" />
  )}

  <Container
    className={`relative z-10 ${
      backgroundImage
        ? "pb-16 pt-[9.25rem] sm:pb-20 sm:pt-[10.25rem] lg:pb-24 lg:pt-[11.25rem]"
        : "py-16 sm:py-20 lg:py-24"
    }`}
  >
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-navy-300">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            {crumbs.map((crumb) => (
              <li key={crumb.label} className="flex items-center gap-2">
                <ChevronRight aria-hidden="true" className="size-3.5" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-brand-400">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="mt-8 max-w-4xl font-display text-4xl leading-[1.08] tracking-tight text-balance sm:text-[3.5rem]">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-300">{description}</p>
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </Container>
    </section>
  );
}