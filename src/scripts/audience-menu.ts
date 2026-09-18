import { encodeSalary } from "../data/situations";
import { initRoleCombobox } from "./role-combobox";

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

  /* ---------- fit to the screen ----------
     The bar is fixed, so the page cannot scroll a tall panel into view.
     Cap the panel at the space actually left below it and let it scroll
     internally. Measured rather than assumed: on a narrow phone the bar can
     wrap onto a second row, and a phone held sideways leaves very little. */
  const fit = () => {
    if (panel.hidden) return;
    const top = panel.getBoundingClientRect().top;
    const room = Math.max(180, Math.floor(window.innerHeight - top - 12));
    panel.style.setProperty("--aud-max-h", `${room}px`);
  };
  window.addEventListener("resize", fit);

  /* ---------- open / close ---------- */
  const open = () => {
    window.clearTimeout(hoverOut);
    if (menu.classList.contains("is-open")) return;
    panel.hidden = false;
    fit();
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

  initRoleCombobox(form);
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

  /*
   * Step 3 is whichever ending the search earned. The employer form has two
   * elements sharing that step — the recap and the Custom Search state —
   * and only the one matching `finalKind` is ever shown.
   */
  let finalKind = "done";

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
      const onStep = s.dataset.audStep === String(current);
      const kind = s.dataset.audFinal;
      s.hidden = !onStep || (kind !== undefined && kind !== finalKind);
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
      // Controls without a name are not answers — the role combobox's
      // search box is one of them. Reporting an unnamed control as the
      // missing field returns an empty string, which reads as "nothing
      // missing" and would wave the whole step through.
      if (!el.name) continue;
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
    const el = form.querySelector<HTMLInputElement>(`[name="${name}"]`);
    if (!el) return;
    // The role selector submits through a hidden input, which cannot take
    // focus — send the visitor to the search box that fills it instead.
    if (el.type === "hidden") {
      el
        .closest(".aud-field")
        ?.querySelector<HTMLElement>("input:not([type='hidden']), select")
        ?.focus();
      return;
    }
    el.focus();
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

    /* A form with data-aud-results hands its answers to a results page
       instead of finishing on the recap — the employer intake goes to
       Situations Wanted. data-aud-results is the BASE of that path: the
       chosen role group's key is appended to it, because each group has
       its own prerendered page. The remaining field names are the query
       keys, and they are read back in src/data/situations.ts. */
    const results = form.dataset.audResults;
    if (results) {
      const data = new FormData(form);
      const role = String(data.get("role") ?? "").trim();

      /* No role, no results path — "/situations-wanted//" is not a page.
         Step 1 already refuses to advance without one, so this only
         catches a form that was driven out of order, but the failure it
         prevents is a 404 rather than a message. */
      if (!role) {
        current = 1;
        render();
        showError(`${LABELS["role"] ?? "Role / Position"} is still blank.`);
        focusField("role");
        return;
      }

      /* Custom Search has no candidates and no results page: an
         unsupported role must never be answered with another profession's
         people. It ends here, on the custom-search state. */
      if (role === "custom") {
        finalKind = "custom";
        current = 3;
        render();
        return;
      }

      const base = results.endsWith("/") ? results : `${results}/`;
      const url = new URL(`${base}${role}/`, window.location.origin);
      for (const [key, value] of data.entries()) {
        if (key === "role") continue;
        const v = String(value).trim();
        if (!v) continue;
        // Salary is the one answer typed freely; it travels as the spec's
        // compact range ("180-225") whenever it can be read as one.
        url.searchParams.set(key, key === "salary" ? encodeSalary(v) : v);
      }
      window.location.assign(url.href);
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
    finalKind = "done";
    current = 3;
    render();
    window.setTimeout(dismiss, 6000);
  });

  render();
}
