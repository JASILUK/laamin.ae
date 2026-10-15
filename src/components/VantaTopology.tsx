
"use client";

import { useEffect, useRef } from "react";
import p5 from "p5";
import TOPOLOGY from "vanta/dist/vanta.topology.min";

type VantaEffect = {
  destroy: () => void;
};

type TopologyOptions = {
  el: HTMLDivElement;
  p5: typeof p5;
  mouseControls: boolean;
  touchControls: boolean;
  gyroControls: boolean;
  minHeight: number;
  minWidth: number;
  scale: number;
  scaleMobile: number;
  color: number;
  backgroundColor: number;
};

export default function VantaTopology() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let effect: VantaEffect | undefined;
    let cancelled = false;

    const initialize = () => {
      const element = containerRef.current;

      if (!element || cancelled) return;

      try {
        const createTopology = TOPOLOGY as unknown as (
          options: TopologyOptions
        ) => VantaEffect;

        effect = createTopology({
          el: element,
          p5,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 0.8,

          // LAAMIN brand colours
          color: 0x2ba3d6,
          backgroundColor: 0x021a33,
        });
      } catch (error) {
        console.error("Vanta Topology initialization failed:", error);
      }
    };

    initialize();

    return () => {
      cancelled = true;
      effect?.destroy();
      effect = undefined;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    />
  );
}
