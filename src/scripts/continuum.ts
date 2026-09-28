/**
 * Both continuums: the rail's tabs, and the self-check beneath them.
 *
 * One file because the two sections behave identically — /find-talent/ has
 * four client situations, /find-a-job/ has three career ones with Nicole
 * beside the line rather than on it, and neither difference reaches the
 * behaviour.
 *
 * Both sections are complete without this file. Every story panel is in the
 * HTML and only `hidden` keeps the others out of view, so a visitor with no
 * JavaScript still gets all of them; the self-check is groups of buttons
 * that simply do nothing. All this adds is the ability to explore.
 *
 * The self-check keeps no score and reaches no conclusion, on both sides
 * and on purpose. An owner will not complete a survey that tells him his
 * company has a problem, and a professional does not want a diagnosis from
 * a web page. They click the line that sounds like them and draw their own.
 */
export function initContinuum(): void {
  document.querySelectorAll<HTMLElement>("[data-cc]").forEach(setupRail);
  document.querySelectorAll<HTMLElement>("[data-cc-check]").forEach(setupCheck);
}

/* ---------- the rail: WAI-ARIA tabs ---------- */
function setupRail(root: HTMLElement): void {
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls") ?? ""));
  if (!tabs.length) return;

  const select = (i: number, focus = false) => {
    tabs.forEach((t, k) => {
      const on = k === i;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      const p = panels[k];
      if (p) p.hidden = !on;
    });
    root.style.setProperty("--cc-i", String(i));
    if (focus) tabs[i].focus();
  };

  tabs.forEach((t, i) => {
    t.addEventListener("click", () => {
      select(i);
      prefill(t);
    });
    t.addEventListener("keydown", (e) => {
      const last = tabs.length - 1;
      const to =
        e.key === "ArrowRight" || e.key === "ArrowDown" ? (i === last ? 0 : i + 1)
        : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (i === 0 ? last : i - 1)
        : e.key === "Home" ? 0
        : e.key === "End" ? last
        : -1;
      if (to < 0) return;
      e.preventDefault();
      select(to, true);
    });
  });

  select(0);
}

/**
 * Clicking a story can answer one question of the self-check for the
 * visitor — the handoff's "preselect the closest answer in Question 2".
 *
 * Only where the mapping is honest. A marker carrying no data-prefill
 * answers nothing, which is the right outcome for David and Nicole: there
 * is no option in that question that describes them, and putting one there
 * to make the feature look finished would be a lie told by a web page.
 *
 * Deliberately does not run on first paint, so nobody arrives to find a
 * question already answered on their behalf.
 */
function prefill(tab: HTMLElement): void {
  const target = tab.dataset.prefill;
  if (!target) return;
  const [qi, oi] = target.split(":").map(Number);
  const check = document.querySelector<HTMLElement>("[data-cc-check]");
  const group = check?.querySelectorAll<HTMLElement>(".cc-opts")[qi];
  const opts = group ? Array.from(group.querySelectorAll<HTMLButtonElement>(".cc-opt")) : [];
  if (!opts[oi]) return;
  opts.forEach((o) => o.setAttribute("aria-pressed", "false"));
  opts[oi].setAttribute("aria-pressed", "true");
}

/* ---------- the self-check: one answer per question, nothing scored ---------- */
function setupCheck(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>(".cc-opts").forEach((group) => {
    const opts = Array.from(group.querySelectorAll<HTMLButtonElement>(".cc-opt"));
    opts.forEach((b) =>
      b.addEventListener("click", () => {
        // A second click clears it: someone changing their mind should not
        // be stuck with an answer they no longer mean.
        const was = b.getAttribute("aria-pressed") === "true";
        opts.forEach((o) => o.setAttribute("aria-pressed", "false"));
        b.setAttribute("aria-pressed", String(!was));
      }),
    );
  });
}
