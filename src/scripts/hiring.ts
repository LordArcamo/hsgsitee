import { prefersReducedMotion } from "./prefers-reduced-motion";

/**
 * Hiring Solutions page behaviour: the Collaborative Search® stage tabs and
 * the search-reach network. Both sections are complete without this — every
 * stage panel is visible and the network is a labelled list — so all this
 * does is turn them into something to explore.
 */
export function initHiringPage(): void {
  document.querySelectorAll<HTMLElement>("[data-cs]").forEach(setupStages);
  document.querySelectorAll<HTMLElement>("[data-net]").forEach(setupNetwork);
  document.querySelectorAll<HTMLElement>("[data-funnel]").forEach(setupFunnel);
}

/* ---------- Collaborative Search® stages: WAI-ARIA tabs ---------- */
function setupStages(root: HTMLElement): void {
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels = tabs.map((t) =>
    document.getElementById(t.getAttribute("aria-controls") ?? ""),
  );
  if (!tabs.length || panels.some((p) => !p)) return;

  root.classList.add("is-tabs");

  const select = (i: number, focus = false) => {
    tabs.forEach((t, k) => {
      const on = k === i;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      t.classList.toggle("done", k < i);
      panels[k]!.hidden = !on;
    });
    root.style.setProperty("--cs-i", String(i));
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
      // keep the chosen stage in view on the phone's scrolling row
      tabs[to].scrollIntoView({ block: "nearest", inline: "nearest" });
    });
  });

  select(0);
}

/* ---------- Search reach: light the spoke of the node in play ---------- */
function setupNetwork(root: HTMLElement): void {
  const set = (key: string | null) => {
    root.querySelectorAll<SVGLineElement>(".net-line").forEach((l) =>
      l.classList.toggle("hot", l.dataset.k === key),
    );
    root.querySelectorAll<HTMLElement>(".net-node").forEach((n) =>
      n.classList.toggle("hot", n.dataset.k === key),
    );
  };
  root.querySelectorAll<HTMLElement>(".net-node").forEach((n) => {
    const key = n.dataset.k ?? null;
    n.addEventListener("mouseenter", () => set(key));
    n.addEventListener("focus", () => set(key));
    n.addEventListener("mouseleave", () => set(null));
    n.addEventListener("blur", () => set(null));
  });
}

/* ---------- Candidate funnel: 50 dots narrowing to a decision ----------
   Each dot carries the stage it leaves at (data-out; 0 = finalist). Stage k
   fades every dot with 0 < out <= k. The last step is the decision itself:
   the finalists are the only ones left, and the choice is the client's. */
function setupFunnel(root: HTMLElement): void {
  const steps = Array.from(root.querySelectorAll<HTMLButtonElement>(".cf-step"));
  const dots = Array.from(root.querySelectorAll<HTMLElement>(".cf-dot"));
  const countEl = root.querySelector<HTMLElement>("[data-cf-count]");
  const labelEl = root.querySelector<HTMLElement>("[data-cf-label]");
  const last = Number(root.dataset.last ?? steps.length - 1);
  if (!steps.length || !dots.length) return;

  let timer: number | undefined;
  // Once the visitor picks a stage, the autoplay must never start or resume:
  // the observer can fire after the click, and would override their choice.
  let touched = false;
  const stop = () => { window.clearInterval(timer); timer = undefined; };

  const show = (k: number) => {
    steps.forEach((b, i) => b.setAttribute("aria-pressed", String(i === k)));
    dots.forEach((d) => {
      const out = Number(d.dataset.out);
      d.classList.toggle("gone", out > 0 && out <= k);
      d.classList.toggle("is-final", out === 0 && k >= last - 1);
    });
    root.classList.toggle("is-decision", k === last);
    const step = steps[k];
    const n = step.querySelector("b")?.textContent ?? "";
    const lbl = step.querySelector("span")?.textContent ?? "";
    if (countEl) countEl.textContent = k === last ? steps[last - 1].querySelector("b")?.textContent ?? "" : n;
    if (labelEl) labelEl.textContent = k === last ? "finalists — " + lbl.toLowerCase() : lbl;
  };

  steps.forEach((b, i) => b.addEventListener("click", () => { touched = true; stop(); show(i); }));

  // Play the narrowing once, the first time the section is properly in view.
  if (!prefersReducedMotion() && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      if (touched) return;
      let k = 0;
      timer = window.setInterval(() => {
        if (touched) { stop(); return; }
        k += 1;
        show(k);
        if (k >= last) stop();
      }, 1100);
    }, { threshold: 0.45 });
    io.observe(root);
  }

  show(0);
}
