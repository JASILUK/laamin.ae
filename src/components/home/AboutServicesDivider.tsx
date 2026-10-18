export function AboutServicesDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative -mb-px h-20 overflow-hidden bg-white sm:h-24 lg:h-28"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
      >
        <rect width="1440" height="120" fill="#ffffff" />
        <path d="M 0 120 L 0 74 Q 720 8 1440 74 L 1440 120 Z" fill="#042d55" />
        <g stroke="#2ba3d6" fill="none" strokeLinecap="round">
          <path d="M -80 58 Q 720 -8 1520 58" strokeOpacity="0.42" strokeWidth="1.2" />
          <path d="M -80 74 Q 720 8 1520 74" strokeOpacity="0.24" strokeWidth="1" />
          <path d="M -80 90 Q 720 24 1520 90" strokeOpacity="0.12" strokeWidth="1" />
        </g>
        <path
          d="M -80 46 Q 720 -20 1520 46"
          stroke="#7fcbec"
          strokeOpacity="0.5"
          strokeWidth="1"
          strokeDasharray="1 10"
        />
      </svg>
    </div>
  );
}
