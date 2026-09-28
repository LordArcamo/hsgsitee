import { prefersReducedMotion } from "./prefers-reduced-motion";

/**
 * The guided assessment: one question at a time, Back and Continue.
 *
 * The markup already contains all five steps; this hides four of them and
 * moves between. Without it a visitor sees the whole questionnaire at once
 * — the old design, but still answerable — so nothing is lost when the
 * script does not run.
 *
 * It holds no answers of its own. The radios are the state, which is the
 * point: the choice on screen and the value a form would submit cannot
 * drift apart, because they are the same thing.
 */
export function initAssessment(): void {
  document.querySelectorAll<HTMLElement>("[data-as]").forEach(setup);
}

function setup(card: HTMLElement): void {
  const panels = Array.from(card.querySelectorAll<HTMLFieldSetElement>("[data-panel]"));
  if (!panels.length) return;

  const section = card.closest("section") ?? document;
  const crumbs = Array.from(section.querySelectorAll<HTMLButtonElement>(".as-step"));
  const back = card.querySelector<HTMLButtonElement>("[data-as-back]");
  const next = card.querySelector<HTMLButtonElement>("[data-as-next]");
  const nextLabel = card.querySelector<HTMLElement>("[data-as-next-label]");
  const final = card.querySelector<HTMLElement>("[data-as-final]");
  const last = panels.length - 1;

  let at = 0;

  const answered = (i: number) => !!panels[i].querySelector<HTMLInputElement>("input:checked");

  /** The furthest step a visitor may jump to: the first unanswered one. */
  const reachable = () => {
    let i = 0;
    while (i < last && answered(i)) i += 1;
    return i;
  };

  const paint = () => {
    crumbs.forEach((c, i) => {
      const reach = reachable();
      c.disabled = i > reach;
      c.classList.toggle("is-done", answered(i) && i !== at);
      if (i === at) c.setAttribute("aria-current", "step");
      else c.removeAttribute("aria-current");
    });

    if (back) back.hidden = at === 0;

    const ok = answered(at);
    const onLast = at === last;

    // On the last step the button becomes the page's real closing action,
    // and only once there is an answer — an empty assessment has nothing
    // to talk through.
    if (next) {
      next.hidden = onLast && ok;
      next.disabled = !ok;
    }
    if (final) final.hidden = !(onLast && ok);
    if (nextLabel) nextLabel.textContent = onLast ? "Continue" : "Continue";
  };

  const show = (to: number, dir: 1 | -1) => {
    if (to < 0 || to > last || to === at) return;
    const from = panels[at];
    const target = panels[to];

    const move = () => {
      from.hidden = true;
      target.hidden = false;
      at = to;
      paint();
      // Focus the question, not the first option: announcing the question
      // is what a screen-reader user needs on arrival, and it does not
      // preselect anything by accident.
      target.querySelector<HTMLElement>(".as-q")?.setAttribute("tabindex", "-1");
      target.querySelector<HTMLElement>(".as-q")?.focus();
    };

    if (prefersReducedMotion()) {
      move();
      return;
    }

    from.classList.add(dir === 1 ? "is-out-left" : "is-out-right");
    window.setTimeout(() => {
      from.classList.remove("is-out-left", "is-out-right");
      move();
      target.classList.add(dir === 1 ? "is-in-right" : "is-in-left");
      window.setTimeout(() => target.classList.remove("is-in-right", "is-in-left"), 240);
    }, 170);
  };

  card.addEventListener("change", (e) => {
    if ((e.target as HTMLElement)?.matches?.('input[type="radio"]')) paint();
  });

  next?.addEventListener("click", () => show(at + 1, 1));
  back?.addEventListener("click", () => show(at - 1, -1));
  crumbs.forEach((c, i) => c.addEventListener("click", () => show(i, i > at ? 1 : -1)));

  paint();
}
