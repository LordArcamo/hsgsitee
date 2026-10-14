import { prefersReducedMotion } from "./prefers-reduced-motion";

/**
 * Count the proof figures up from zero as the strip comes into view.
 *
 * The real values are in the HTML, so a strip the visitor never reaches —
 * or one on a browser with no IntersectionObserver, or with reduced motion
 * asked for — simply shows its real figures and is never touched.
 *
 * ONE OBSERVER, ON PURPOSE
 *
 * This used to be two: one to prime the strip to zero just below the fold,
 * a second to play it once properly in view, plus a geometry read to leave
 * an already-visible strip alone. That arrangement is why Heshy kept seeing
 * no animation. The homepage strip moved above the fold, so the priming
 * observer fired on load and wrote "0", and the playing observer — a 0.4
 * threshold against a 103px strip sitting at the very bottom edge of the
 * first screen — never did. The figures stuck on zero.
 *
 * So: no priming, no geometry read. A single observer, and the first time
 * the strip is meaningfully on screen it counts. An already-visible strip
 * gets that callback immediately on observe, which is exactly what the
 * homepage needs. The cost is that a strip scrolled into view drops from
 * its real figures to zero for one frame before counting; the benefit is
 * that the animation always runs, which is the thing that was asked for
 * twice.
 */
export function initCountUp(): void {
  if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;

  document.querySelectorAll<HTMLElement>("[data-countup]").forEach((strip) => {
    if (strip.dataset.countupBound) return;
    strip.dataset.countupBound = "1";

    const figures = Array.from(strip.querySelectorAll<HTMLElement>("[data-count]"));
    if (!figures.length) return;

    // 0.25, not 0.4: the homepage strip sits on the fold line with a sliver
    // of itself below it, and 0.4 was never reached there.
    const play = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        play.disconnect();
        figures.forEach(animate);
      },
      { threshold: 0.25 },
    );

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
  // 1100 read as a flicker on a five-figure strip. Heshy asked for slower,
  // "but not too much slow" — at 2000 each figure is legible on the way up
  // without the strip becoming something you wait for.
  const DURATION = 2000;
  const start = performance.now();
  // Safety net. The figure is reset to zero before this runs, so if rAF is
  // throttled or starved — a background tab, an embedded or headless view —
  // it must still land on the real number instead of sitting on "0".
  const land = window.setTimeout(() => draw(el, 1), DURATION + 500);
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / DURATION);
    draw(el, 1 - Math.pow(1 - t, 3));
    if (t < 1) requestAnimationFrame(tick);
    else window.clearTimeout(land);
  };
  requestAnimationFrame(tick);
}
