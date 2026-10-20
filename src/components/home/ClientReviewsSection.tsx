// components/home/ClientReviewsSection.tsx
import type { CSSProperties } from "react";
import { Quote } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { LetterHeading } from "@/components/ui/LetterHeading";
import {
  clientReviews,
  clientReviewsContent,
  type ClientReview,
} from "@/lib/reviews";

const ROW = clientReviews;

function initials(company: string) {
  return company
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function ReviewCard({ review }: { review: ClientReview }) {
  return (
    <li className="relative flex w-[250px] shrink-0 flex-col justify-between overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-br from-navy-900 to-navy-950 p-5 shadow-[0_18px_40px_-24px_rgba(2,26,51,0.75)] transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-brand-400/50 sm:w-[310px] sm:p-6">
      <span aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-400/15 blur-2xl" />
      <Quote aria-hidden="true" className="pointer-events-none absolute bottom-3 right-4 size-12 text-white/[0.05]" />

      <div className="relative">
        <div className="flex items-center">
          <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-navy-300">
            {review.industry}
          </span>
        </div>
        <blockquote className="mt-4 text-[13.5px] leading-relaxed text-white/85">
          “{review.quote}”
        </blockquote>
      </div>

      <div className="relative mt-5 flex items-center gap-2.5 border-t border-white/10 pt-4">
        <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-xs text-white">
          {initials(review.company)}
        </span>
        <p className="text-xs font-semibold leading-snug text-white">
          {review.company}
        </p>
      </div>
    </li>
  );
}

function MarqueeRow({ reviews, duration }: { reviews: ClientReview[]; duration: number }) {
  return (
    <div className="reviews-row overflow-hidden py-8 sm:py-10">
      <div className="reviews-track reviews-track-left" style={{ "--reviews-dur": `${duration}s` } as CSSProperties}>
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-stretch gap-4 pr-4">
            {reviews.map((review) => (
              <ReviewCard key={`${copy}-${review.id}`} review={review} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function ClientReviewsSection() {
  return (
    // Removed overflow-hidden, bg-white, and the ambient background div
    <section aria-label="Client reviews" className="relative pb-16 pt-6 text-ink lg:pb-24 lg:pt-10">
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>{clientReviewsContent.eyebrow}</Eyebrow>
          </Reveal>
          <LetterHeading
            lines={[{ text: clientReviewsContent.heading }]}
            stagger={0.04}
            className="mt-4 font-display text-4xl tracking-tight text-navy-900 sm:text-5xl lg:text-6xl"
          />
          <Reveal delay={0.3}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {clientReviewsContent.description}
            </p>
          </Reveal>
        </div>
      </Container>

      <div className="reviews-mask relative mt-6 lg:mt-10">
        <MarqueeRow reviews={ROW} duration={60} />
      </div>
    </section>
  );
}