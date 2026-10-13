import Image from "next/image";
import Link from "next/link";
import logoFull from "../../public/logo-full.png";
import logoMark from "../../public/logo-mark.png";
import { site } from "@/data/site";

/**
 * LAAMIN logo, taken from the company proposal. The artwork is white and sky
 * blue, so it must sit on a navy background.
 */
export function Logo({ variant = "header" }: { variant?: "header" | "full" }) {
  if (variant === "full") {
    return (
      <Link href="/" aria-label={`${site.legalName} — home`} className="inline-block">
        <Image src={logoFull} alt={site.name} className="h-28 w-auto" sizes="140px" />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label={`${site.legalName} — home`}
      className="inline-flex items-center gap-3.5"
    >
      <Image src={logoMark} alt="" priority className="h-11 w-auto" sizes="32px" />
      <span className="leading-none">
        <span className="block font-display text-lg tracking-[0.12em] text-white">{site.name}</span>
        <span className="mt-1.5 block whitespace-nowrap text-[0.5625rem] font-medium uppercase tracking-[0.16em] text-navy-300 sm:text-[0.625rem] sm:tracking-[0.2em]">
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
