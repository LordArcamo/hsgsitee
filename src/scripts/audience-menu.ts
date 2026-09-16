/**
 * "For Companies" hover dropdown: a two-step role intake in the audience bar.
 *
 * Hover opens it, but a form that vanishes when the pointer drifts is useless,
 * so the panel pins itself open as soon as the visitor focuses or answers
 * anything. After that only Escape, the close of the form, or a click outside
 * will dismiss it. Touch and keyboard users get the same panel from a click.
 */
export function initAudienceMenu(): void {
  document
    .querySelectorAll<HTMLElement>("[data-aud-menu]")
    .forEach((menu) => setupMenu(menu));
}

const canHover = () =>
  window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function setupMenu(menu: HTMLElement): void {
  const trigger = menu.querySelector<HTMLButtonElement>(".aud-trigger");
  const panel = menu.querySelector<HTMLElement>(".aud-panel");
  const form = menu.querySelector<HTMLFormElement>("[data-aud-form]");
  if (!trigger || !panel || !form) return;

  const audbar = menu.closest<HTMLElement>(".audbar");
  let pinned = false;
  let hoverOut: number | undefined;

  /* ---------- open / close ---------- */
  const open = () => {
    window.clearTimeout(hoverOut);
    if (menu.classList.contains("is-open")) return;
    panel.hidden = false;
    // let the browser paint the hidden state before transitioning in
    requestAnimationFrame(() => menu.classList.add("is-open"));
    trigger.setAttribute("aria-expanded", "true");
    // the jump bar retires on scroll; hold it while the form is up
    audbar?.classList.add("menu-open");
  };

  const close = (force = false) => {
    if (pinned && !force) return;
    window.clearTimeout(hoverOut);
    pinned = false;
    menu.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    audbar?.classList.remove("menu-open");
    window.setTimeout(() => {
      if (!menu.classList.contains("is-open")) panel.hidden = true;
    }, 220);
  };

  const pin = () => {
    pinned = true;
  };

  /* ---------- pointer ---------- */
  if (canHover()) {
    menu.addEventListener("mouseenter", open);
    menu.addEventListener("mouseleave", () => {
      if (pinned) return;
      hoverOut = window.setTimeout(() => close(), 180);
    });
  }

  trigger.addEventListener("click", () => {
    if (menu.classList.contains("is-open")) {
      close(true);
    } else {
      open();
      pin();
      form.querySelector<HTMLInputElement>("input, select")?.focus();
    }
  });

  /* ---------- once they engage, it stays ---------- */
  panel.addEventListener("focusin", pin);
  panel.addEventListener("input", pin);
  panel.addEventListener("change", pin);

  /* ---------- dismissal ---------- */
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("is-open")) return;
    if (!menu.contains(e.target as Node)) close(true);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      close(true);
      trigger.focus();
    }
  });

  menu.querySelector<HTMLAnchorElement>("[data-aud-jump]")
    ?.addEventListener("click", () => close(true));

  setupSteps(form, () => close(true));
}

/* ============================================================
   Two-step flow
   ============================================================ */
function setupSteps(form: HTMLFormElement, dismiss: () => void): void {
  const steps = Array.from(form.querySelectorAll<HTMLElement>("[data-aud-step]"));
  const nextBtn = form.querySelector<HTMLButtonElement>("[data-aud-next]");
  const backBtn = form.querySelector<HTMLButtonElement>("[data-aud-back]");
  const sendBtn = form.querySelector<HTMLButtonElement>("[data-aud-send]");
  const err = form.querySelector<HTMLElement>("[data-aud-err]");
  const bar = form.querySelector<HTMLElement>("[data-aud-bar]");
  const count = form.querySelector<HTMLElement>("[data-aud-count]");
  const sub = form.querySelector<HTMLElement>("[data-aud-sub]");
  const recap = form.querySelector<HTMLElement>("[data-aud-recap]");
  const jump = form.querySelector<HTMLElement>("[data-aud-jump]");
  if (!nextBtn || !backBtn || !sendBtn || !err || !bar || !count) return;

  /* Labels and step copy come from the markup, so the employer and the
     professional panel share this one engine and neither owns a copy deck
     in here. A field's label is the .aud-lbl beside it; a step's subtext is
     its data-aud-copy. Recap order follows the DOM. */
  const LABELS: Record<string, string> = {};
  const ORDER: string[] = [];
  for (const el of Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLSelectElement>("input, select"),
  )) {
    if (!el.name || LABELS[el.name] !== undefined) continue;
    const label = el
      .closest(".aud-field")
      ?.querySelector<HTMLElement>(".aud-lbl")
      ?.textContent?.trim();
    LABELS[el.name] = label || el.name;
    ORDER.push(el.name);
  }

  const copyFor = (step: number) =>
    steps.find((s) => s.dataset.audStep === String(step))?.dataset.audCopy ?? "";

  let current = 1;

  const showError = (msg: string) => {
    err.textContent = msg;
    err.hidden = false;
  };
  const clearError = () => {
    err.hidden = true;
    err.textContent = "";
  };

  const render = () => {
    steps.forEach((s) => {
      s.hidden = s.dataset.audStep !== String(current);
    });
    const done = current === 3;
    backBtn.hidden = current !== 2;
    nextBtn.hidden = current !== 1;
    sendBtn.hidden = current !== 2;
    if (jump) jump.hidden = done;
    bar.style.width = done ? "100%" : current === 1 ? "50%" : "100%";
    count.textContent = done ? "Complete" : `Step ${current} of 2`;
    if (sub) sub.textContent = copyFor(current);
    if (sub) sub.hidden = done;
    clearError();
  };

  /* --- validation: name the first thing they skipped --- */
  const missingOn = (step: number): string | null => {
    const wrap = steps.find((s) => s.dataset.audStep === String(step));
    if (!wrap) return null;
    for (const el of Array.from(
      wrap.querySelectorAll<HTMLInputElement | HTMLSelectElement>("input, select"),
    )) {
      if (el.type === "radio") {
        const group = wrap.querySelectorAll<HTMLInputElement>(
          `input[name="${el.name}"]`,
        );
        const answered = Array.from(group).some((r) => r.checked);
        if (!answered) return el.name;
        continue;
      }
      if (!el.value.trim()) return el.name;
    }
    return null;
  };

  const focusField = (name: string) => {
    const el = form.querySelector<HTMLElement>(`[name="${name}"]`);
    el?.focus();
  };

  /* whichever field happens to come first on that step */
  const focusFirstOn = (step: number) => {
    steps
      .find((s) => s.dataset.audStep === String(step))
      ?.querySelector<HTMLElement>("input, select")
      ?.focus();
  };

  nextBtn.addEventListener("click", () => {
    const missing = missingOn(1);
    if (missing) {
      showError(`${LABELS[missing] ?? "That field"} is still blank.`);
      focusField(missing);
      return;
    }
    current = 2;
    render();
    focusFirstOn(2);
  });

  backBtn.addEventListener("click", () => {
    current = 1;
    render();
    focusFirstOn(1);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const missing = missingOn(2);
    if (missing) {
      showError(`${LABELS[missing] ?? "That field"} is still blank.`);
      focusField(missing);
      return;
    }
    if (recap) {
      const data = new FormData(form);
      recap.innerHTML = "";
      for (const key of ORDER) {
        const val = String(data.get(key) ?? "").trim();
        if (!val) continue;
        const dt = document.createElement("dt");
        dt.textContent = LABELS[key];
        const dd = document.createElement("dd");
        dd.textContent = val;
        recap.append(dt, dd);
      }
    }
    current = 3;
    render();
    window.setTimeout(dismiss, 6000);
  });

  render();
}
