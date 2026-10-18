"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ReactNode } from "react";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { SCENE_EASE } from "@/lib/constants";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useSafeReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: SCENE_EASE }}
    >
      {children}
    </motion.div>
  );
}

export function MaskLine({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const hidden = { y: "115%", skewY: 4, opacity: 0 };
  const shown = { y: "0%", skewY: 0, opacity: 1 };

  return (
    <span ref={ref} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
      <motion.span
        className={`block origin-bottom-left ${className}`}
        initial={hidden}
        animate={inView ? shown : hidden}
        transition={{ duration: 0.95, delay, ease: SCENE_EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function DrawLine({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  const reduce = useSafeReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={`block origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: SCENE_EASE }}
    />
  );
}
