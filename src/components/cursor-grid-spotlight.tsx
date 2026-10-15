
"use client";

import { useEffect, useRef } from "react";

type CursorGridSpotlightProps = {
  className?: string;
};

export function CursorGridSpotlight({
  className = "",
}: CursorGridSpotlightProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let frameId: number | null = null;
    let pointerX = -1000;
    let pointerY = -1000;

    const hide = () => {
      root.style.setProperty("--spotlight-opacity", "0");
    };

    const render = () => {
      frameId = null;

      const rect = root.getBoundingClientRect();

      if (
        pointerX < rect.left ||
        pointerX > rect.right ||
        pointerY < rect.top ||
        pointerY > rect.bottom
      ) {
        hide();
        return;
      }

      root.style.setProperty("--pointer-x", `${pointerX - rect.left}px`);
      root.style.setProperty("--pointer-y", `${pointerY - rect.top}px`);
      root.style.setProperty("--spotlight-opacity", "1");
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches) return;

      pointerX = event.clientX;
      pointerY = event.clientY;

      if (frameId === null) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const onPointerLeave = () => {
      hide();
    };

    const onPreferencesChange = () => {
      if (!finePointer.matches || reducedMotion.matches) {
        if (frameId !== null) {
          window.cancelAnimationFrame(frameId);
          frameId = null;
        }

        hide();
      }
    };

    if (finePointer.matches && !reducedMotion.matches) {
      window.addEventListener("pointermove", onPointerMove, {
        passive: true,
      });
      root.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("blur", onPointerLeave);
    }

    finePointer.addEventListener("change", onPreferencesChange);
    reducedMotion.addEventListener("change", onPreferencesChange);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);

      finePointer.removeEventListener("change", onPreferencesChange);
      reducedMotion.removeEventListener("change", onPreferencesChange);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`cursor-grid-spotlight ${className}`}
    >
      <div className="cursor-grid-spotlight__lines" />
      <div className="cursor-grid-spotlight__highlight" />
    </div>
  );
}
