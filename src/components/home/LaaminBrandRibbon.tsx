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
    <div
      aria-hidden="true"
      className={`${styles.divider} -my-px bg-gradient-to-b from-[#eaf4fb] to-white`}
    >
      <div className={`${styles.band} bg-navy-900`}>
        <div className={styles.track}>
          <RibbonGroup />
          <RibbonGroup hidden />
        </div>
      </div>
    </div>
  );
}