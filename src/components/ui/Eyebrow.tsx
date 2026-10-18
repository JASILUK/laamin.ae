import type { ReactNode } from "react";

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className={`inline-block text-xs font-semibold uppercase tracking-[0.25em] ${light ? "text-brand-300" : "text-brand-700"}`}>
      {children}
    </span>
  );
}
