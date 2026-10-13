import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/section-heading";

export default function NotFound() {
  return (
    <section className="py-28 lg:py-40">
      <Container>
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-6 font-display text-5xl tracking-tight text-navy-900 sm:text-6xl">
          Page not found
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
          The page you are looking for does not exist or has moved.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="navy">
            Back to Home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact Us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
