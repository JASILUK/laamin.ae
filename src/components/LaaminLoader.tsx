"use client";

import { useEffect, useState } from "react";
import "./LaaminLoader.css";

type Phase = "loading" | "exiting" | "done";

/** Minimum time the intro plays, so the logo reveal always finishes. */
const MIN_MS = 3000;
const MIN_MS_REDUCED_MOTION = 1200;
/** Never keep a visitor waiting longer than this, even on a slow network. */
const MAX_MS = 6000;
/** Must match the exit transition duration in LaaminLoader.css. */
const EXIT_MS = 900;

const wait = (ms: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, ms));

export default function LaaminLoader() {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const root = document.documentElement;
    const controller = new AbortController();
    let exitTimer: number | undefined;

    root.dataset.loading = "true";

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 1. the intro has played for its minimum time
    const minTime = wait(reduced ? MIN_MS_REDUCED_MOTION : MIN_MS);

    // 2. the page and its assets have actually loaded
    const pageLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", () => resolve(), {
          once: true,
          signal: controller.signal,
        });
      }
    });

    // 3. fonts are ready, so the hero text doesn't jump after the loader leaves
    const fontsReady: Promise<unknown> = document.fonts?.ready ?? Promise.resolve();

    // Whichever comes first: everything ready, or the safety limit.
    Promise.race([
      Promise.all([minTime, pageLoaded, fontsReady]),
      wait(MAX_MS),
    ]).then(() => {
      if (controller.signal.aborted) return;

      setPhase("exiting");
      // Release the hero animations as the curtain lifts.
      delete root.dataset.loading;

      exitTimer = window.setTimeout(() => setPhase("done"), EXIT_MS);
    });

    return () => {
      controller.abort();
      if (exitTimer) window.clearTimeout(exitTimer);
      delete root.dataset.loading;
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`laamin-loader${phase === "exiting" ? " is-exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-busy={phase === "loading"}
      aria-label="Loading LAAMIN"
    >
      <div className="laamin-loader__content">
        <div className="laamin-loader__symbol">
          {/* Bouncing square: shown first, hands over to the logo mark */}
          <span className="laamin-loader__bouncer" aria-hidden="true" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="laamin-loader__mark"
            src="/images/logo-mark.png"
            alt=""
            draggable={false}
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className="laamin-loader__wordmark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/lamin-text.png"
            alt="LAAMIN"
            draggable={false}
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <span className="laamin-loader__divider" aria-hidden="true" />

        <p className="laamin-loader__tagline">
          Business Set Up Services L.L.C.
        </p>
      </div>
    </div>
  );
}