"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { navigation } from "@/data/site";
import { Container } from "./container";
import { Logo } from "./logo";

const HEADER_HEIGHT = 84;
const FALLBACK_RANGE = 160;
const REDUCED_MOTION_THRESHOLD = 24;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let range = FALLBACK_RANGE;
    let last = -1;

    const measure = () => {
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      range = hero
        ? Math.max(
            hero.getBoundingClientRect().bottom + window.scrollY - HEADER_HEIGHT,
            FALLBACK_RANGE,
          )
        : FALLBACK_RANGE;
    };

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const raw = reduceMotion.matches
        ? y > REDUCED_MOTION_THRESHOLD
          ? 1
          : 0
        : Math.min(Math.max(y / range, 0), 1);
      const p = Math.round(raw * 1000) / 1000;
      if (p === last) return;
      last = p;
      el.style.setProperty("--p", String(p));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[5.25rem] bg-navy-900"
      />

      <header
        ref={headerRef}
        className="pointer-events-none sticky top-0 z-50 h-[5.25rem] [--p:0]"
      >
        <div className="h-full px-[calc(var(--p)*0.75rem)] pt-3 sm:px-[calc(var(--p)*1.5rem)]">
          <div
            data-header-surface
            className="pointer-events-auto relative isolate mx-auto w-full border border-transparent"
            style={{
              maxWidth: "min(100%, calc(100% - (100% - 72rem) * var(--p)))",
              borderRadius: "calc(var(--p) * 1rem)",
              boxShadow: "0 20px 40px -15px rgb(0 0 0 / calc(var(--p) * 0.6))",
            }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-[inherit] bg-navy-900 backdrop-blur-lg"
              style={{ opacity: "calc(1 - var(--p) * 0.15)" }}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-px rounded-[inherit] border border-brand-400/40"
              style={{ opacity: "calc(var(--p) * 0.7)" }}
            />

            <Container className="flex h-[calc(4.5rem_-_var(--p)*0.5rem_-_2px)] items-center justify-between gap-6">
              <Logo />

              <nav aria-label="Main" className="hidden lg:block">
                <ul className="flex items-center gap-6 xl:gap-9">
                  {navigation.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={`relative py-2 text-sm font-medium transition-colors hover:text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-brand-400 after:transition-transform after:duration-300 motion-reduce:after:transition-none ${
                          isActive(item.href)
                            ? "text-white after:scale-x-100"
                            : "text-navy-300 after:scale-x-0 hover:after:scale-x-100"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex items-center gap-3">
                {/* Contact Us — left→right wipe, arrow always visible, nudges on hover */}
                <div className="hidden md:block">
                  <Link
                    href="/contact"
                    style={
                      {
                        borderRadius: "calc(0.5rem + var(--p) * 0.25rem)",
                        "--wipe-bg": "#ffffff",
                        "--wipe-fg": "#042d55",
                      } as CSSProperties
                    }
                    className="btn-wipe btn-wipe-r group inline-flex items-center justify-center bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-shadow duration-300 ease-out hover:shadow-lg hover:shadow-brand-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
                  >
                    <span className="btn-wipe-content flex items-center">
                      Contact Us
                      <svg
                        aria-hidden="true"
                        className="ml-2 size-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>

                <button
                  type="button"
                  className="grid size-11 place-items-center rounded-lg border border-brand-400/30 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 lg:hidden"
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  aria-label={open ? "Close menu" : "Open menu"}
                  onClick={() => setOpen((value) => !value)}
                >
                  {open ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>
              </div>
            </Container>

            {open && (
              <nav
                id="mobile-menu"
                aria-label="Mobile"
                className="max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-b-[inherit] bg-navy-900/95 supports-[backdrop-filter]:backdrop-blur-xl lg:hidden"
              >
                <Container className="pb-4">
                  <ul className="border-t border-white/10">
                    {navigation.map((item) => (
                      <li
                        key={item.href}
                        className="border-b border-white/10 last:border-0"
                      >
                        <Link
                          href={item.href}
                          aria-current={isActive(item.href) ? "page" : undefined}
                          onClick={() => setOpen(false)}
                          className={`flex items-center justify-between py-4 font-display text-xl ${
                            isActive(item.href) ? "text-brand-300" : "text-white"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 md:hidden">
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      style={
                        {
                          "--wipe-bg": "#ffffff",
                          "--wipe-fg": "#042d55",
                        } as CSSProperties
                      }
                      className="btn-wipe btn-wipe-r group flex w-full items-center justify-center rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white shadow-md transition-shadow duration-300 hover:shadow-brand-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                    >
                      <span className="btn-wipe-content flex items-center">
                        Contact Us
                        <svg
                          aria-hidden="true"
                          className="ml-2 size-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </Container>
              </nav>
            )}
          </div>
        </div>
      </header>
    </>
  );
}