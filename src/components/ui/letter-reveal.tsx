"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type TagName = "p" | "h1" | "h2" | "h3" | "span";

export function LetterReveal({
  text,
  className,
  stagger = 0.04,
  baseDelay = 0,
  blur = true,
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  stagger?: number;
  baseDelay?: number;
  blur?: boolean;
  as?: TagName;
}) {
  const words = text.split(" ");
  let charIndex = 0;

  const letter: Variants = {
    hidden: {
      opacity: 0,
      y: "0.55em",
      ...(blur ? { filter: "blur(8px)" } : {}),
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      ...(blur ? { filter: "blur(0px)" } : {}),
      transition: { duration: 0.6, delay: baseDelay + i * stagger, ease: EASE },
    }),
  };

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-12% 0px" }}
      >
        {words.map((word, wi) => (
          <span key={wi}>
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((char, ci) => (
                <motion.span
                  key={ci}
                  custom={charIndex++}
                  variants={letter}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {wi < words.length - 1 && " "}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}