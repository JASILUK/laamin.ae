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

const EASE_PANEL = "cubic-bezier(0.76, 0, 0.24, 1)";
const EASE_REVEAL = "cubic-bezier(0.16, 1, 0.3, 1)";
const PANEL_MS = 600;
const ITEM_START_MS = PANEL_MS - 150; // items begin as the panel finishes filling
const ITEM_STEP_MS = 90;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [overlay, setOverlay] = useState(false); // true when the page hero has a background image
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Lock page scroll while the full-screen menu is open
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Close the menu if the viewport grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    // Detect whether the current page hero sits behind the navbar
    setOverlay(!!document.querySelector("[data-hero-overlay]"));

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

  // Staggered, masked slide-up for each menu row (reverses instantly on close)
  const revealStyle = (index: number): CSSProperties => ({
    transform: open ? "translateY(0)" : "translateY(110%)",
    opacity: open ? 1 : 0,
    transitionProperty: "transform, opacity",
    transitionDuration: open ? "750ms" : "250ms",
    transitionTimingFunction: EASE_REVEAL,
    transitionDelay: open ? `${ITEM_START_MS + index * ITEM_STEP_MS}ms` : "0ms",
  });

  return (
    <>
      {!overlay && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[5.25rem] bg-navy-900"
        />
      )}

      <header
        ref={headerRef}
        className={`pointer-events-none sticky top-0 z-50 h-[5.25rem] [--p:0] ${
          overlay ? "-mb-[5.25rem]" : ""
        }`}
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
              style={{
                opacity: open
                  ? 1
                  : overlay
                    ? "calc(var(--p) * 0.92)"
                    : "calc(1 - var(--p) * 0.15)",
              }}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-px rounded-[inherit] border border-brand-400/40"
              style={{ opacity: "calc(var(--p) * 0.7)" }}
            />

            {/* Full-screen mobile menu — slides in from the right */}
            <div
              aria-hidden={!open}
              inert={!open}
              className="fixed inset-0 z-0 flex h-dvh flex-col overflow-y-auto overscroll-contain pt-24 lg:hidden"
              style={{
                background:
                  "radial-gradient(ellipse at 85% 10%, rgba(43,163,214,0.16) 0%, rgba(43,163,214,0.05) 30%, transparent 55%), linear-gradient(135deg, #021a33 0%, #042d55 55%, #021a33 100%)",
                transform: open ? "translate3d(0,0,0)" : "translate3d(100%,0,0)",
                visibility: open ? "visible" : "hidden",
                transitionProperty: "transform, visibility",
                transitionDuration: `${PANEL_MS}ms`,
                transitionTimingFunction: EASE_PANEL,
              }}
            >
              <Container className="flex flex-1 flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                <nav
                  id="mobile-menu"
                  aria-label="Mobile"
                  className="flex flex-1 flex-col justify-center"
                >
                  <ul className="border-t border-white/10">
                    {navigation.map((item, index) => (
                      <li
                        key={item.href}
                        className="border-b border-white/10"
                      >
                        <span className="block overflow-hidden">
                          <span
                            className="block motion-reduce:!transition-none"
                            style={revealStyle(index)}
                          >
                            <Link
                              href={item.href}
                              aria-current={isActive(item.href) ? "page" : undefined}
                              onClick={() => setOpen(false)}
                              className={`group flex items-baseline gap-4 py-4 font-display text-4xl leading-tight transition-colors hover:text-brand-300 sm:py-5 sm:text-5xl ${
                                isActive(item.href) ? "text-brand-300" : "text-white"
                              }`}
                            >
                              <span className="w-7 shrink-0 text-sm font-medium tracking-widest text-brand-400">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              {item.label}
                            </Link>
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-8 md:hidden">
                  <span className="block overflow-hidden">
                    <span
                      className="block motion-reduce:!transition-none"
                      style={revealStyle(navigation.length)}
                    >
                      <Link
                        href="/contact"
                        onClick={() => setOpen(false)}
                        style={
                          {
                            "--wipe-bg": "#ffffff",
                            "--wipe-fg": "#042d55",
                          } as CSSProperties
                        }
                        className="btn-wipe btn-wipe-r group flex w-full items-center justify-center rounded-xl bg-brand-500 py-4 text-base font-semibold text-white shadow-md transition-shadow duration-300 hover:shadow-brand-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
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
                    </span>
                  </span>
                </div>
              </Container>
            </div>

            <Container className="relative z-10 flex h-[calc(4.5rem_-_var(--p)*0.5rem_-_2px)] items-center justify-between gap-6">
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
          </div>
        </div>
      </header>
    </>
  );
}