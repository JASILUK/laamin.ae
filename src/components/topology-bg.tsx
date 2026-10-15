"use client";

import { useEffect, useRef } from "react";

export function TopologyBg({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let effect: { destroy: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: p5 }, { default: TOPOLOGY }] = await Promise.all([
        import("p5"),
        import("vanta/dist/vanta.topology.min"),
      ]);
      if (cancelled || !ref.current) return;
      effect = TOPOLOGY({
        el: ref.current,
        p5,
        mouseControls: false,
        touchControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        color: 0x2ba3d6,
        backgroundColor: 0x042d55, // matches navy-900
      });
    })();

    return () => {
      cancelled = true;
      effect?.destroy();
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute ${className}`} />;
}