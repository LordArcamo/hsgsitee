/**
 * The client continuum: the rail's tabs, and the five-question self-check.
 *
 * Both sections are complete without this file. Every story panel is in the
 * HTML and only `hidden` keeps three of them out of view, so a visitor with
 * no JavaScript still gets all four; the self-check is five groups of
 * buttons that simply do nothing. All this adds is the ability to explore.
 *
 * The self-check keeps no score and reaches no conclusion on purpose. An
 * owner will not complete a survey that tells him his company has a problem.
 * He will click the line that sounds like his company and draw the
 * conclusion himself — which is the whole design.
 */
export function initClientContinuum(): void {
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
    t.addEventListener("click", () => select(i));
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

/* ---------- the self-check: one answer per question, nothing scored ---------- */
function setupCheck(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>(".cc-opts").forEach((group) => {
    const opts = Array.from(group.querySelectorAll<HTMLButtonElement>(".cc-opt"));
    opts.forEach((b) =>
      b.addEventListener("click", () => {
        // A second click clears it: an owner changing his mind should not be
        // stuck with an answer he no longer means.
        const was = b.getAttribute("aria-pressed") === "true";
        opts.forEach((o) => o.setAttribute("aria-pressed", "false"));
        b.setAttribute("aria-pressed", String(!was));
      }),
    );
  });
}
