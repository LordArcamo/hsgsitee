import { prefersReducedMotion } from "./prefers-reduced-motion";

/**
 * Scroll reveal for every `.rv` element.
 *
 * The class is toggled rather than added once, so the animation replays
 * whether the visitor scrolls down the page or back up it.
 */
export function initReveal(): void {
  const revealables =
    document.querySelectorAll<HTMLElement>(".rv");

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    revealables.forEach((el) => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("in", entry.isIntersecting);
      });
    },
    { rootMargin: "-6% 0px -10% 0px", threshold: 0.06 },
  );

  revealables.forEach((el) => io.observe(el));
}
