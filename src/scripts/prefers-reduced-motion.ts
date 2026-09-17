/**
 * Whether the visitor has asked for reduced motion.
 *
 * Every animated widget on the page consults this: carousels start paused,
 * the candidate conveyor stops drifting, and reveals are applied immediately
 * rather than on scroll.
 */
export const prefersReducedMotion = (): boolean =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
