"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/data/site";
import { ButtonLink } from "./button";
import { Container } from "./container";
import { Logo } from "./logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-900">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative py-2 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-brand-400 after:transition-transform after:duration-300 hover:text-white ${
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
          <div className="hidden md:block">
            <ButtonLink href="/contact" variant="accent">
              Contact Us
            </ButtonLink>
          </div>
          <button
            type="button"
            className="grid size-11 place-items-center border border-white/25 text-white lg:hidden"
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
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-white/10 bg-navy-900 lg:hidden">
          <Container className="py-4">
            <ul>
              {navigation.map((item) => (
                <li key={item.href} className="border-b border-white/10 last:border-0">
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
    </header>
  );
}
