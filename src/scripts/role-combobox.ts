/**
 * The role selector on the "For Companies" form — WordPress fork.
 *
 * The design's version is a strict combobox: only one of the ten role-group
 * keys can leave it, and anything else has to be routed through a separate
 * "Custom Search" option. That made sense for its results pages (never show
 * another profession's people) but here the form ends in a lead, so what the
 * employer types is a perfectly good answer.
 *
 * So: the text box offers the ten groups as suggestions. Picking one submits
 * the group's key. Typing something that matches none of them submits
 * role="custom" with the typed text as the title — no extra option, no
 * second field. The empty state says so in as many words.
 */
export function initRoleCombobox(root: HTMLElement): void {
  const combo = root.querySelector<HTMLElement>("[data-role-combo]");
  if (!combo) return;

  const input = combo.querySelector<HTMLInputElement>("[data-role-input]");
  const value = combo.querySelector<HTMLInputElement>("[data-role-value]");
  const title = combo.querySelector<HTMLInputElement>("[data-role-title]");
  const list = combo.querySelector<HTMLElement>("[data-role-list]");
  const empty = combo.querySelector<HTMLElement>("[data-role-empty]");
  const typed = combo.querySelector<HTMLElement>("[data-role-typed]");
  if (!input || !value || !list) return;

  const options = Array.from(list.querySelectorAll<HTMLElement>(".aud-combo-opt"));

  /** Index into the *visible* options, or -1 for none. */
  let active = -1;
  const visible = () => options.filter((o) => !o.hidden);

  const setActive = (next: number) => {
    const shown = visible();
    active = shown.length === 0 ? -1 : Math.max(0, Math.min(next, shown.length - 1));
    options.forEach((o) => o.classList.remove("is-active"));
    const el = active === -1 ? null : shown[active];
    if (el) {
      el.classList.add("is-active");
      el.scrollIntoView({ block: "nearest" });
      input.setAttribute("aria-activedescendant", el.id);
    } else {
      input.removeAttribute("aria-activedescendant");
    }
  };

  const open = () => {
    if (!list.hidden) return;
    list.hidden = false;
    input.setAttribute("aria-expanded", "true");
  };

  const close = () => {
    if (list.hidden) return;
    list.hidden = true;
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
    options.forEach((o) => o.classList.remove("is-active"));
    active = -1;
  };

  /** Show the groups matching what has been typed; say what happens if none do. */
  const filter = (query: string) => {
    const q = query.trim().toLowerCase();
    let hits = 0;
    for (const option of options) {
      const haystack = (option.dataset.search ?? option.textContent ?? "").toLowerCase();
      const hit = q === "" || haystack.includes(q);
      option.hidden = !hit;
      if (hit) hits += 1;
    }
    if (empty) {
      empty.hidden = q === "" || hits > 0;
      if (typed) typed.textContent = query.trim();
    }
    setActive(0);
  };

  /** A group was picked: submit its key, drop any typed title. */
  const choose = (option: HTMLElement) => {
    value.value = option.dataset.value ?? "";
    if (title) title.value = "";
    input.value = option.textContent?.trim() ?? "";
    options.forEach((o) => o.setAttribute("aria-selected", String(o === option)));
    close();
    input.dispatchEvent(new Event("change", { bubbles: true }));
  };

  /** Free text: the typed role is the answer, flagged as custom for the lead. */
  const typedAnswer = () => {
    const t = input.value.trim();
    value.value = t ? "custom" : "";
    if (title) title.value = t;
    options.forEach((o) => o.setAttribute("aria-selected", "false"));
  };

  /* ---------- pointer ---------- */
  // mousedown, not click: the input's blur would close the list first.
  list.addEventListener("mousedown", (e) => {
    const option = (e.target as HTMLElement).closest<HTMLElement>(".aud-combo-opt");
    if (!option) return;
    e.preventDefault();
    choose(option);
  });

  input.addEventListener("focus", () => {
    // A chosen group shows the whole list again; typed text keeps its filter.
    filter(value.value && value.value !== "custom" ? "" : input.value);
    open();
  });

  input.addEventListener("input", () => {
    typedAnswer();
    filter(input.value);
    open();
  });

  input.addEventListener("blur", close);

  /* ---------- keyboard ---------- */
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (list.hidden) {
        filter(value.value && value.value !== "custom" ? "" : input.value);
        open();
        return;
      }
      setActive(active + (e.key === "ArrowDown" ? 1 : -1));
      return;
    }
    if (e.key === "Enter") {
      const shown = visible();
      const el = active === -1 ? undefined : shown[active];
      if (!list.hidden && el) {
        // Only swallow Enter when it is picking something from the list;
        // otherwise let it advance the form as usual.
        e.preventDefault();
        choose(el);
      }
      return;
    }
    if (e.key === "Escape" && !list.hidden) {
      // Close the list without closing the whole panel.
      e.stopPropagation();
      close();
    }
  });
}
