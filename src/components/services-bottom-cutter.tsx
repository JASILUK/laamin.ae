/* ============================================================
   SERVICES → WHY CHOOSE US DIVIDER
   Diagonal cut: navy-900 (Services) → white (Why Choose Us).
   The base is painted in the LOWER section's color (white) and
   the navy shape is drawn over it, extending past every edge of
   the box. Both outer seams are therefore same-color on
   same-color, and only the diagonal is a color change.
   ============================================================ */

   type ServicesBottomCutterProps = {
    className?: string;
    baseColor?: string;  // navy-900 — Services section above
    panelColor?: string; // white — Why Choose Us section below
  };
  
  export function ServicesBottomCutter({
    className = "h-16 sm:h-20 lg:h-24",
    baseColor = "#042d55",
    panelColor = "#ffffff",
  }: ServicesBottomCutterProps) {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none relative -mb-px -mt-px overflow-hidden ${className}`}
        style={{ backgroundColor: panelColor }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          shapeRendering="geometricPrecision"
          className="absolute inset-0 h-full w-full overflow-visible"
          fill="none"
        >
          {/* Navy triangle above the diagonal (0,0 → 1440,120).
              Extended 10 units beyond top/left/right on the same slope,
              so the parent's overflow-hidden clips it cleanly. */}
          <polygon
            points="-10,-10 1450,-10 1450,120.83 -10,-0.83"
            fill={baseColor}
          />
        </svg>
      </div>
    );
  }