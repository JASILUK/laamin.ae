"use client";
import { motion, type Variants } from "framer-motion";

import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { SCENE_EASE } from "@/lib/constants";

export type HeadingLine = {
  text: string;
  /** Applies the brand-700 → brand-400 gradient across this whole line */
  accent?: boolean;
};

/**
 * Letter-by-letter heading reveal. Reveals once when scrolled into view.
 * Each line stays on its own line; words never break in the middle.
 * Screen readers get the plain text (sr-only), letters are aria-hidden.
 */
export function LetterHeading({
  lines,
  className = "",
  as: Tag = "h2",
  stagger = 0.035,
  delay = 0,
}: {
  lines: HeadingLine[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  stagger?: number;
  delay?: number;
}) {
  const reduce = useSafeReducedMotion();
  let globalIndex = 0; // keeps the stagger flowing from line 1 into line 2

  const letter: Variants = {
    hidden: reduce
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: "0.6em", filter: "blur(8px)" },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, delay: delay + i * stagger, ease: SCENE_EASE },
    }),
  };

  return (
    <Tag className={className}>
      <span className="sr-only">{lines.map((l) => l.text).join(" ")}</span>

      <motion.span
        aria-hidden="true"
        className="block"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {lines.map((line, li) => {
          const words = line.text.split(" ");
          const total = line.text.replace(/\s+/g, "").length;
          let local = 0; // letter position inside this line (for the gradient)

          return (
            <span key={li} className="block">
              {words.map((word, wi) => (
                <span key={wi}>
                  <span className="inline-block whitespace-nowrap">
                    {Array.from(word).map((char, ci) => {
                      const pos = local++;
                      const style = line.accent
                        ? {
                            /* one continuous gradient spread across the whole line */
                            backgroundImage:
                              "linear-gradient(90deg, var(--color-brand-700), var(--color-brand-400))",
                            backgroundSize: `${total * 100}% 100%`,
                            backgroundPosition: `${
                              total > 1 ? (pos / (total - 1)) * 100 : 0
                            }% 0`,
                            backgroundRepeat: "no-repeat",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            color: "transparent",
                            WebkitTextFillColor: "transparent",
                          }
                        : undefined;

                      return (
                        <motion.span
                          key={ci}
                          custom={globalIndex++}
                          variants={letter}
                          style={style}
                          className={
                            line.accent
                              ? "inline-block pb-[0.1em] -mb-[0.1em]" // stops g/y descenders being clipped
                              : "inline-block"
                          }
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </span>
                  {wi < words.length - 1 && " "}
                </span>
              ))}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}