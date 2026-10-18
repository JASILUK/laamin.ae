import styles from "./LaaminBrandRibbon.module.css";

/**
 * Items per group. Group width = COUNT * item width (see CSS).
 */
const COUNT = 16;

const MARK = { src: "/logo-mark.png", width: 256, height: 256 };
const WORD = { src: "/lamin-text.png", width: 640, height: 128 };

const items = Array.from({ length: COUNT }, (_, i) => i);

function RibbonGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className={styles.group} aria-hidden={hidden || undefined}>
      {items.map((i) => (
        <div key={i} className={styles.item}>
          <div className={styles.brand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={MARK.src}
              alt=""
              width={MARK.width}
              height={MARK.height}
              draggable={false}
              decoding="async"
              className={styles.mark}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={WORD.src}
              alt=""
              width={WORD.width}
              height={WORD.height}
              draggable={false}
              decoding="async"
              className={styles.word}
            />
          </div>
          <span className={`${styles.sep} bg-brand-400`} />
        </div>
      ))}
    </div>
  );
}

export function LaaminBrandRibbon() {
  return (
    // 1. Top background is #eaf4fb (matches the WhyChooseSection above it)
    <div aria-hidden="true" className={`${styles.divider} bg-[#eaf4fb]`}>
      
      {/* 2. Bottom background is White (matches the section below it) */}
      <div className={`${styles.lower} bg-white`} />

      {/* 3. The Ribbon Band is Dark Navy with white text/images */}
      <div
        className={`${styles.band} border-y border-brand-400/40 bg-navy-900 shadow-[0_10px_28px_rgba(10,25,47,0.25)]`}
      >
        <div className={styles.track}>
          <RibbonGroup />
          <RibbonGroup hidden />
        </div>
      </div>
    </div>
  );
}