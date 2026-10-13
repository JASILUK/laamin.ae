import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { Container } from "./container";
import { Logo } from "./logo";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Monthly Plans", href: "/plans" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms" },
];

const linkClass = "text-sm text-navy-300 transition-colors hover:text-white";
const headingClass = "text-xs font-semibold uppercase tracking-[0.2em] text-brand-400";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.8fr_1.3fr] lg:py-20">
        <div>
          <Logo variant="full" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-navy-300">
            Business setup, PRO services, visa processing and document clearing support in Dubai
            and across the UAE.
          </p>
        </div>

        <nav aria-label="Services">
          <h2 className={headingClass}>Services</h2>
          <ul className="mt-5 space-y-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className={linkClass}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className={headingClass}>Company</h2>
          <ul className="mt-5 space-y-3">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>Contact</h2>
          <ul className="mt-5 space-y-4 text-sm text-navy-300">
            <li className="flex gap-3">
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-400" />
              <span className="flex flex-col gap-1.5">
                {site.phones.map((phone) => (
                  <a key={phone.tel} href={`tel:${phone.tel}`} className="hover:text-white">
                    {phone.display}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-400" />
              <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-400" />
              <address className="not-italic leading-relaxed">
                {site.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </li>
          </ul>
        </div>
      </Container>

      <div className="bg-navy-950">
        <Container className="flex flex-col gap-4 py-6 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
