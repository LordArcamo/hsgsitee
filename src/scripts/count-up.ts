import { prefersReducedMotion } from "./prefers-reduced-motion";

/**
 * Count the proof figures up from zero as the strip scrolls into view.
 *
 * The real values are in the HTML and stay there unless an animation is
 * actually going to run:
 *
 * - A strip already on screen when the script starts is never touched —
 *   resetting it would put a "0" into the first paint, which is what a
 *   phone screenshot captures.
 * - An off-screen strip is primed to zero while it is still just below the
 *   fold, then counts when it is properly in view. Priming early matters:
 *   without it the strip scrolls in showing the real figures and then
 *   visibly drops to zero before counting back up.
 * - A strip the visitor never approaches (a jump link straight past it)
 *   is never primed, so it keeps its real figures.
 */
export function initCountUp(): void {
  if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;

  document.querySelectorAll<HTMLElement>("[data-countup]").forEach((strip) => {
    if (strip.dataset.countupBound) return;
    strip.dataset.countupBound = "1";

    const r = strip.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    const figures = Array.from(strip.querySelectorAll<HTMLElement>("[data-count]"));

    const prime = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        prime.disconnect();
        figures.forEach((el) => draw(el, 0));
      },
      { rootMargin: "0px 0px 360px 0px" },
    );

    const play = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        play.disconnect();
        prime.disconnect();
        figures.forEach(animate);
      },
      { threshold: 0.4 },
    );

    prime.observe(strip);
    play.observe(strip);
  });
}

/** "4.3M+" → prefix "", number 4.3 (1 decimal), suffix "M+". "1,200+" keeps its comma. */
function parse(raw: string) {
  const m = raw.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  if (!m) return null;
  const digits = m[2].replace(/,/g, "");
  const value = Number(digits);
  if (!Number.isFinite(value)) return null;
  return {
    prefix: m[1],
    value,
    decimals: digits.includes(".") ? digits.split(".")[1].length : 0,
    comma: m[2].includes(","),
    suffix: m[3],
  };
}

/** Show a figure at `t` (0–1) of its final value, in its own format. */
function draw(el: HTMLElement, t: number): void {
  const final = el.dataset.count ?? "";
  const p = parse(final);
  if (!p) return;
  if (t >= 1) {
    el.textContent = final; // land on the authored string exactly
    return;
  }
  const n = p.value * t;
  const num = p.comma
    ? n.toLocaleString("en-US", { minimumFractionDigits: p.decimals, maximumFractionDigits: p.decimals })
    : n.toFixed(p.decimals);
  el.textContent = `${p.prefix}${num}${p.suffix}`;
}

function animate(el: HTMLElement): void {
  const DURATION = 1100;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / DURATION);
    draw(el, 1 - Math.pow(1 - t, 3));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
