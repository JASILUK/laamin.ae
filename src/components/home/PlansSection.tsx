"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { BrandArcs } from "@/components/brand-arcs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PlanCard } from "@/components/pricing/plan-card";
import { plans } from "@/lib/data";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function PlansSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 text-ink lg:py-28">

      <Container className="relative">
        {/* Centered heading + description + CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <SectionHeading
            eyebrow="Monthly plans"
            title="Six plans for different team sizes"
            description="Monthly fees cover LAAMIN's professional service charges. Government and third-party costs are billed separately at actual cost."
            className="flex flex-col items-center text-center"
          />
          <ButtonLink href="/plans" variant="accent-on-light" className="mt-8">
  View All Plans
  <ArrowRight
    aria-hidden="true"
    className="size-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
  />
</ButtonLink>
        </motion.div>

        {/* Plan cards with staggered reveal */}
        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.li
              key={plan.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={reveal}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.07,
              }}
            >
              <PlanCard plan={plan} featured={index === 2} />
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}