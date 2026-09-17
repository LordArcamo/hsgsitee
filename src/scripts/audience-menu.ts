/**
 * "For Companies" hover dropdown: a two-step role intake in the audience bar.
 *
 * Hover opens it, but a form that vanishes when the pointer drifts is useless,
 * so the panel pins itself open as soon as the visitor focuses or answers
 * anything. After that only Escape, the close of the form, or a click outside
 * will dismiss it. Touch and keyboard users get the same panel from a click.
 */
import { initRoleCombobox } from "./role-combobox";

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

  initRoleCombobox(form);
  setupSteps(form, () => close(true));
}

/* ============================================================
   Two-step flow
   ============================================================ */
function setupSteps(form: HTMLFormElement, dismiss: () => void): void {
  /*
   * WordPress fork: N data steps, then a "done" step. The last data step
   * posts the answers to the theme's REST endpoint (window.hsgLead), which
   * stores the lead and emails HSG. Required-ness comes from the markup:
   * every input/select is required unless it carries data-optional.
   */
  const steps = Array.from(form.querySelectorAll<HTMLElement>("[data-aud-step]"));
  const dataSteps = steps.filter((s) => !s.classList.contains("aud-done")).length;
  const DONE = dataSteps + 1;
  const nextBtn = form.querySelector<HTMLButtonElement>("[data-aud-next]");
  const backBtn = form.querySelector<HTMLButtonElement>("[data-aud-back]");
  const sendBtn = form.querySelector<HTMLButtonElement>("[data-aud-send]");
  const err = form.querySelector<HTMLElement>("[data-aud-err]");
  const bar = form.querySelector<HTMLElement>("[data-aud-bar]");
  const count = form.querySelector<HTMLElement>("[data-aud-count]");
  const sub = form.querySelector<HTMLElement>("[data-aud-sub]");
  const recap = form.querySelector<HTMLElement>("[data-aud-recap]");
  const jump = form.querySelector<HTMLElement>("[data-aud-jump]");
  const consent = form.querySelector<HTMLElement>(".aud-consent");
  if (!nextBtn || !backBtn || !sendBtn || !err || !bar || !count) return;

  const LABELS: Record<string, string> = {};
  const ORDER: string[] = [];
  for (const el of Array.from(form.querySelectorAll<HTMLInputElement | HTMLSelectElement>("input, select"))) {
    if (!el.name || el.name === "website" || el.hasAttribute("data-recap-skip") || LABELS[el.name] !== undefined) continue;
    const label = el.closest(".aud-field")?.querySelector<HTMLElement>(".aud-lbl")?.textContent?.replace(/\(optional\)/i, "").trim();
    LABELS[el.name] = label || el.name;
    ORDER.push(el.name);
  }
  /* The role selector: hidden "role" carries a group key or "custom", the
     text box shows what the employer picked or typed — the recap shows that. */
  const roleText = form.querySelector<HTMLInputElement>("[data-role-input]");
  const copyFor = (step: number) => steps.find((s) => s.dataset.audStep === String(step))?.dataset.audCopy ?? "";
  let current = 1;
  let sending = false;
  const showError = (msg: string) => { err.textContent = msg; err.hidden = false; };
  const clearError = () => { err.hidden = true; err.textContent = ""; };

  const render = () => {
    steps.forEach((s) => { s.hidden = s.dataset.audStep !== String(current); });
    const done = current === DONE;
    const last = current === dataSteps;
    backBtn.hidden = current === 1 || done;
    nextBtn.hidden = last || done;
    sendBtn.hidden = !last;
    if (consent) consent.hidden = !last;
    if (jump) jump.hidden = done;
    bar.style.width = done ? "100%" : `${Math.round((current / dataSteps) * 100)}%`;
    count.textContent = done ? "Sent" : `Step ${current} of ${dataSteps}`;
    if (sub) { sub.textContent = copyFor(current); sub.hidden = done; }
    clearError();
  };

  const missingOn = (step: number): string | null => {
    const wrap = steps.find((s) => s.dataset.audStep === String(step));
    if (!wrap) return null;
    for (const el of Array.from(wrap.querySelectorAll<HTMLInputElement | HTMLSelectElement>("input, select"))) {
      // Unnamed controls are not answers (the role search box is one); an
      // empty name would read as "nothing missing" and wave the step through.
      if (!el.name || el.name === "website" || el.hasAttribute("data-optional")) continue;
      if (el.type === "radio") {
        const answered = Array.from(wrap.querySelectorAll<HTMLInputElement>(`input[name="${el.name}"]`)).some((r) => r.checked);
        if (!answered) return el.name;
        continue;
      }
      if (!el.value.trim()) return el.name;
      if (el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim())) return el.name;
    }
    return null;
  };
  const focusField = (name: string) => {
    const el = form.querySelector<HTMLInputElement>(`[name="${name}"]`);
    if (!el) return;
    // The role selector submits through a hidden input, which cannot take
    // focus — send the visitor to the search box that fills it instead.
    if (el.type === "hidden") { el.closest(".aud-field")?.querySelector<HTMLElement>("input:not([type='hidden']), select")?.focus(); return; }
    el.focus();
  };
  const complain = (name: string) => {
    const el = form.querySelector<HTMLInputElement>(`[name="${name}"]`);
    const invalid = el && el.type === "email" && el.value.trim() !== "";
    showError(invalid ? `${LABELS[name] ?? "That email"} doesn't look right.` : `${LABELS[name] ?? "That field"} is still blank.`);
    focusField(name);
  };
  const focusFirstOn = (step: number) => steps.find((s) => s.dataset.audStep === String(step))?.querySelector<HTMLElement>("input, select")?.focus();

  nextBtn.addEventListener("click", () => {
    const missing = missingOn(current);
    if (missing) { complain(missing); return; }
    current += 1; render(); focusFirstOn(current);
  });
  backBtn.addEventListener("click", () => { current = Math.max(1, current - 1); render(); focusFirstOn(current); });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (sending) return;
    // Enter on an earlier step means "next", not "send".
    if (current < dataSteps) { nextBtn.click(); return; }
    const missing = missingOn(current);
    if (missing) { complain(missing); return; }
    const cfg = (window as unknown as { hsgLead?: { endpoint: string; fallback?: string } }).hsgLead;
    if (!cfg) { showError("The form is not connected yet. Please call us instead."); return; }
    const data = new FormData(form);
    const payload: Record<string, string> = { audience: form.dataset.audAudience || "hire", page: location.href };
    for (const [k, v] of data.entries()) payload[k] = String(v).trim();
    sending = true; sendBtn.disabled = true; const label = sendBtn.innerHTML; sendBtn.textContent = "Sending…";
    try {
      const post = (url: string) => fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), credentials: "same-origin" });
      // A network-level failure ("Failed to fetch") on the pretty REST path is retried once on the plain one.
      let r: Response;
      try { r = await post(cfg.endpoint); } catch (netErr) { if (!cfg.fallback) throw netErr; r = await post(cfg.fallback); }
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.ok) throw new Error(j.message || `We couldn't send that (error ${r.status}). Please call 973-773-4473.`);
      /* Lead stored. A form with data-aud-results now hands the search to the
         Situations Wanted results page — role group plus the rest of the
         answers as the query string. A typed (custom) role has no pool, so
         it finishes on the recap instead. */
      const results = form.dataset.audResults;
      const role = String(data.get("role") ?? "").trim();
      if (results && role && role !== "custom") {
        const u = new URL(results, location.origin);
        u.searchParams.set("role", role);
        for (const k of ["location", "experience", "position", "career_path", "salary"]) { const v = String(data.get(k) ?? "").trim(); if (v) u.searchParams.set(k, v); }
        sendBtn.textContent = "Opening your results…";
        location.assign(u.href);
        return;
      }
      if (recap) {
        recap.innerHTML = "";
        for (const key of ORDER) { const val = key === "role" && roleText ? roleText.value.trim() : String(data.get(key) ?? "").trim(); if (!val) continue; const dt = document.createElement("dt"); dt.textContent = LABELS[key]; const dd = document.createElement("dd"); dd.textContent = val; recap.append(dt, dd); }
      }
      current = DONE; render(); form.reset();
      window.setTimeout(dismiss, 8000);
    } catch (ex) {
      const msg = ex instanceof Error ? ex.message : "";
      showError(/failed to fetch|networkerror|load failed/i.test(msg) ? "We couldn't reach the server. Please check your connection and try again, or call 973-773-4473." : msg || "Something went wrong. Please try again or call us.");
    } finally {
      sending = false; sendBtn.disabled = false; sendBtn.innerHTML = label;
    }
  });
  render();
}
