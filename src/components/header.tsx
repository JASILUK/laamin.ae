"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/data/site";
import { ButtonLink } from "./button";
import { Container } from "./container";
import { Logo } from "./logo";

/** Scroll distance (px) that switches to the floating state. */
const SCROLL_ENTER = 24;
/** Scroll distance (px) below which it switches back. Lower than ENTER to avoid flicker near the threshold. */
const SCROLL_EXIT = 8;

/** Shared motion tokens (full class strings so Tailwind can see them). */
const MOTION =
  "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

/**
 * Background design token matching the homepage hero section.
 * Ensures the initial unscrolled state integrates seamlessly without seams or white flashes.
 */
const HERO_BACKGROUND = "bg-navy-900";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;

      setScrolled((previous) =>
        previous ? y > SCROLL_EXIT : y > SCROLL_ENTER
      );
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`pointer-events-none sticky top-0 z-50 h-[5.25rem] transition-colors ${MOTION} ${
        scrolled ? "bg-transparent" : HERO_BACKGROUND
      }`}
    >
      <div
        className={`h-full pt-3 transition-[padding] ${MOTION} ${
          scrolled ? "px-3 sm:px-6" : "px-0"
        }`}
      >
        <div
          data-scrolled={scrolled}
          className={`pointer-events-auto mx-auto w-full transition-[max-width,border-radius,background-color,box-shadow,border-color] ${MOTION} ${
            scrolled
              ? "max-w-[72rem] rounded-2xl border border-white/10 bg-navy-900/85 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] supports-[backdrop-filter]:backdrop-blur-xl"
              : `max-w-full rounded-none border-transparent ${HERO_BACKGROUND} shadow-none`
          }`}
        >
          <Container
            className={`flex items-center justify-between gap-6 transition-[height] ${MOTION} ${
              scrolled ? "h-16" : "h-[4.5rem]"
            }`}
          >
            <Logo />

            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-6 xl:gap-9">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={
                        isActive(item.href) ? "page" : undefined
                      }
                      className={`relative py-2 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-brand-400 after:transition-transform after:duration-300 hover:text-white motion-reduce:after:transition-none ${
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
              <div
                className={`hidden md:block [&_a]:transition-[background-color,border-color,color,border-radius] [&_a]:duration-500 [&_a]:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:[&_a]:transition-none ${
                  scrolled ? "[&_a]:rounded-xl" : "[&_a]:rounded-lg"
                }`}
              >
                <ButtonLink href="/contact" variant="accent">
                  Contact Us
                </ButtonLink>
              </div>

              <button
                type="button"
                className="grid size-11 place-items-center rounded-lg border border-white/25 text-white transition-colors hover:bg-white/10 lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((value) => !value)}
              >
                {open ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </button>
            </div>
          </Container>

          {open && (
            <nav
              id="mobile-menu"
              aria-label="Mobile"
              className="max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-b-2xl bg-navy-900/95 supports-[backdrop-filter]:backdrop-blur-xl lg:hidden"
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
                        aria-current={
                          isActive(item.href) ? "page" : undefined
                        }
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between py-4 font-display text-xl ${
                          isActive(item.href)
                            ? "text-brand-300"
                            : "text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 md:hidden [&_a]:rounded-xl">
                  <ButtonLink
                    href="/contact"
                    variant="accent"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    Contact Us
                  </ButtonLink>
                </div>
              </Container>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}