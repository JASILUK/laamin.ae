type ServicesBottomCutterProps = {
  className?: string;
  baseColor?: string;
  panelColor?: string;
};

export function ServicesBottomCutter({
  className = "h-16 sm:h-20 lg:h-24",
  baseColor = "#042d55",   // navy-900 — matches section above
  panelColor = "#021a33",  // navy-950 — matches section below
}: ServicesBottomCutterProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative -mb-px overflow-hidden ${className}`}
      style={{ backgroundColor: baseColor }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        {/* Diagonal cut: top-left corner → bottom-right corner */}
        <polygon points="0,0 1440,120 1440,120 0,120" fill={panelColor} />
      </svg>
    </div>
  );
}