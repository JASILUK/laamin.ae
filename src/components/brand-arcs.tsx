
/** Responsive architectural linework inspired by the LAAMIN brand. */
export function BrandArcs({ className = "" }: { className?: string }) {
  return (
    <>
      {/* Desktop and tablet: broad architectural contours */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 720"
        preserveAspectRatio="xMaxYMin slice"
        fill="none"
        stroke="currentColor"
        className={`pointer-events-none absolute inset-0 hidden h-full w-full sm:block ${className}`}
      >
        {/* Main architectural sweep */}
        <g strokeWidth="0.9">
          <path d="M 850 -150 C 1110 -90 1330 65 1450 270 C 1530 410 1510 565 1400 735" />
          <path d="M 940 -170 C 1190 -85 1390 75 1495 285 C 1565 420 1545 570 1460 735" />
          <path d="M 1030 -185 C 1270 -75 1450 95 1540 305 C 1600 435 1580 575 1515 735" />
        </g>

        {/* Nested contours concentrated on the right */}
        <g strokeWidth="0.8">
          <path d="M 1010 10 C 1190 0 1325 95 1375 230 C 1420 350 1365 455 1245 520" />
          <path d="M 1070 65 C 1220 55 1315 140 1350 245 C 1380 330 1335 415 1245 465" />
          <path d="M 1130 120 C 1240 115 1300 185 1320 260 C 1335 320 1300 375 1240 410" />
        </g>

        {/* Fine connecting lines */}
        <g strokeWidth="0.7">
          <path d="M 420 -60 C 670 30 865 155 1005 305 C 1080 390 1120 470 1135 555" />
          <path d="M 590 -80 C 800 20 975 150 1085 295 C 1145 370 1175 440 1185 510" />
        </g>

        {/* Subtle lower-left counterbalance */}
        <g strokeWidth="0.75">
          <path d="M -170 605 C 80 535 280 540 440 615 C 510 650 555 700 580 755" />
          <path d="M -170 650 C 70 585 255 590 405 660 C 460 690 495 720 515 760" />
        </g>
      </svg>

      {/* Mobile: compact portrait composition */}
      <svg
        aria-hidden="true"
        viewBox="0 0 390 780"
        preserveAspectRatio="xMaxYMin slice"
        fill="none"
        stroke="currentColor"
        className={`pointer-events-none absolute inset-0 block h-full w-full sm:hidden ${className}`}
      >
        <g strokeWidth="0.85">
          <path d="M 250 -75 C 365 0 410 105 385 220 C 365 315 320 375 340 455" />
          <path d="M 290 -85 C 400 0 440 110 410 220 C 390 305 350 360 365 425" />
          <path d="M 330 -95 C 435 10 465 115 435 215 C 415 290 385 340 395 400" />
        </g>

        {/* Light inner curves */}
        <g strokeWidth="0.7">
          <path d="M 125 35 C 225 45 295 105 315 190 C 332 260 305 315 255 350" />
          <path d="M 165 80 C 245 90 290 140 300 200 C 310 250 285 290 245 320" />
        </g>

        {/* Single understated lower curve */}
        <path
          d="M -90 625 C 35 570 145 575 230 630 C 270 660 295 705 305 755"
          strokeWidth="0.75"
        />
      </svg>
    </>
  );
}
