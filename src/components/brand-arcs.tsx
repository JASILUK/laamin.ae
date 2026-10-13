/** Decorative fine arcs used on navy sections, echoing the company proposal artwork. */
export function BrandArcs({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 720"
      preserveAspectRatio="xMaxYMin slice"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={`pointer-events-none absolute ${className}`}
    >
      <circle cx="1210" cy="120" r="300" />
      <circle cx="1210" cy="120" r="470" />
      <circle cx="1210" cy="120" r="680" />
      <circle cx="140" cy="900" r="420" />
    </svg>
  );
}
