/**
 * Hiring Solutions page behaviour: the Collaborative Search® stage tabs and
 * the search-reach network. Both sections are complete without this — every
 * stage panel is visible and the network is a labelled list — so all this
 * does is turn them into something to explore.
 */
export function initHiringPage(): void {
  document.querySelectorAll<HTMLElement>("[data-cs]").forEach(setupStages);
  document.querySelectorAll<HTMLElement>("[data-net]").forEach(setupNetwork);
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
