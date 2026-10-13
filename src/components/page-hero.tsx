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
}: {
  title: string;
  description: string;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <BrandArcs className="inset-0 size-full text-brand-400/25" />
      <Container className="relative py-16 sm:py-20 lg:py-24">
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
