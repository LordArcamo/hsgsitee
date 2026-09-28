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

  /* The career assessment (real radios, one step at a time) and the client
     self-check (buttons, all on screen) are different controls, so try both.
     Whichever is on the page takes the answer. */
  const panel = document.querySelector<HTMLElement>(`[data-as] [data-panel="${qi}"]`);
  if (panel) {
    const radios = Array.from(panel.querySelectorAll<HTMLInputElement>('input[type="radio"]'));
    if (!radios[oi]) return;
    radios[oi].checked = true;
    // The assessment listens for change to re-enable Continue and to work
    // out how far the visitor may jump.
    radios[oi].dispatchEvent(new Event("change", { bubbles: true }));
    return;
  }

  const group = document.querySelector<HTMLElement>("[data-cc-check]")
    ?.querySelectorAll<HTMLElement>(".cc-opts")[qi];
  const opts = group ? Array.from(group.querySelectorAll<HTMLButtonElement>(".cc-opt")) : [];
  if (!opts[oi]) return;
  opts.forEach((o) => o.setAttribute("aria-pressed", "false"));
  opts[oi].setAttribute("aria-pressed", "true");
}

/* ---------- the self-check: one answer per question, nothing scored ---------- */
function setupCheck(root: HTMLElement): void {
  const groups = Array.from(root.querySelectorAll<HTMLElement>(".cc-opts"));

  groups.forEach((group) => {
    const opts = Array.from(group.querySelectorAll<HTMLButtonElement>(".cc-opt"));
    opts.forEach((b) =>
      b.addEventListener("click", () => {
        // A second click clears it: someone changing their mind should not
        // be stuck with an answer they no longer mean.
        const was = b.getAttribute("aria-pressed") === "true";
        opts.forEach((o) => o.setAttribute("aria-pressed", "false"));
        b.setAttribute("aria-pressed", String(!was));
        report(root, groups);
      }),
    );
  });

  report(root, groups);
}

/**
 * How many are answered, drawn as a ring.
 *
 * Still no score and no conclusion — this counts, it does not judge. It
 * exists because five rows of untouched buttons give a visitor no sense
 * that anything is happening, which is what made the old version feel like
 * a form rather than a conversation.
 *
 * `data-cc-progress` opts a section in. The client self-check on
 * /find-talent/ does not carry it, and everything here no-ops for it.
 */
function report(root: HTMLElement, groups: HTMLElement[]): void {
  if (!("ccProgress" in root.dataset)) return;

  groups.forEach((g) => {
    const answered = !!g.querySelector('.cc-opt[aria-pressed="true"]');
    g.closest<HTMLElement>("[data-q]")?.classList.toggle("is-answered", answered);
  });

  const done = groups.filter((g) => g.querySelector('.cc-opt[aria-pressed="true"]')).length;
  const total = groups.length;

  const n = root.querySelector<HTMLElement>("[data-ring-n]");
  if (n) n.textContent = String(done);

  const ring = root.querySelector<SVGCircleElement>("[data-ring]");
  if (ring) {
    // r=19 in the SVG's own units; the dash array is the full circumference.
    const c = 2 * Math.PI * 19;
    ring.style.strokeDasharray = String(c);
    ring.style.strokeDashoffset = String(c * (1 - done / total));
  }

  const label = root.querySelector<HTMLElement>("[data-ring-label]");
  if (label) {
    label.textContent =
      done === 0 ? `${total} questions`
      : done === total ? "That is enough to start"
      : `${done} of ${total}`;
  }
}
