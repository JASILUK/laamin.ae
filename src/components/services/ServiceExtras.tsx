"use client";

import { MotionConfig } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { LetterReveal, FadeUp } from "@/components/ui/letter-reveal";
import { allServices, getService, services } from "@/data/services";

/* ------------------------------------------------------------------
   Important information
   ------------------------------------------------------------------ */
export function ServiceNotice({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service?.notice) return null;

  return (
    <MotionConfig reducedMotion="user">
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <FadeUp>
            <div
              role="note"
              className="relative overflow-hidden rounded-3xl border border-brand-400/40 bg-white p-6 shadow-[0_24px_60px_-35px_rgba(4,45,85,0.35)] sm:p-8 lg:p-10"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-brand-300 to-brand-700"
              />
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Info aria-hidden="true" className="size-6" />
                </span>
                <div>
                  <h2 className="font-display text-[11px] uppercase tracking-[0.25em] text-brand-700">
                    Important information
                  </h2>
                  <p className="mt-3 max-w-3xl text-base leading-relaxed text-navy-900 sm:text-lg">
                    {service.notice}
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        </Container>
      </section>
    </MotionConfig>
  );
}

/* ------------------------------------------------------------------
   Related services
   ------------------------------------------------------------------ */
export function ServiceRelated({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) return null;

  const parent = service.parentSlug
    ? services.find((item) => item.slug === service.parentSlug)
    : undefined;

  const others = allServices
    .filter((other) => other.slug !== service.slug)
    .filter((other) =>
      parent ? other.slug === parent.slug || other.parentSlug === parent.slug : true,
    )
    .slice(0, 6);

  if (others.length === 0) return null;

  return (
    <MotionConfig reducedMotion="user">
      <section className="pb-16 sm:pb-20 lg:pb-28">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <FadeUp>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                  <span className="font-display text-[11px] uppercase tracking-[0.25em] text-navy-900">
                    Explore further
                  </span>
                </div>
              </FadeUp>
              <LetterReveal
                as="h2"
                text={parent ? "Related services" : "Other services"}
                stagger={0.03}
                className="mt-3 font-display text-3xl tracking-tight text-navy-900 sm:text-4xl"
              />
            </div>
            <FadeUp>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-navy-900 transition-colors hover:text-brand-700"
              >
                All services
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </FadeUp>
          </div>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other, i) => {
              const Icon = other.icon;
              return (
                <li key={other.slug}>
                  <FadeUp delay={i * 0.08} className="h-full">
                    <Link
                      href={`/services/${other.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:shadow-[0_20px_50px_-20px_rgba(43,163,214,0.3)] sm:p-7"
                    >
                      <span className="grid size-11 place-items-center rounded-xl bg-navy-900 text-brand-300 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                        <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                      </span>
                      <h3 className="mt-5 font-display text-lg text-navy-900 sm:text-xl">
                        {other.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
                        {other.short}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 transition-colors group-hover:text-brand-700">
                        Explore service
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </Link>
                  </FadeUp>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </MotionConfig>
  );
}