"use client";
import { useReducedMotion } from "framer-motion";
import { useMounted } from "./useMounted";

export function useSafeReducedMotion() {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  return mounted ? Boolean(reduce) : false;
}
