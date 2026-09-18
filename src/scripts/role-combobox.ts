/**
 * The controlled role selector on the "For Companies" form.
 *
 * A searchable list, not a free-text field: the only thing that can leave
 * this control is one of the role-group keys or "custom". Typing
 * narrows the list — it never becomes the answer. Whatever is in the text
 * box when the form is submitted is irrelevant; the hidden input is the
 * value, and it is cleared the moment the text stops matching the
 * selection, so a half-typed role cannot ride along on a stale key.
 *
 * Custom Search is never filtered out. An employer searching for a role
 * HSG has no preview pool for still has somewhere to go, which is what
 * keeps an unsupported role from ever reaching another profession's
 * candidates.
 *
 * The options are rendered server-side from data/role-groups.ts, so this
 * holds no copy of the role list.
 */
export function initRoleCombobox(root: HTMLElement): void {
  const combo = root.querySelector<HTMLElement>("[data-role-combo]");
  if (!combo) return;

  const input = combo.querySelector<HTMLInputElement>("[data-role-input]");
  const value = combo.querySelector<HTMLInputElement>("[data-role-value]");
  const list = combo.querySelector<HTMLElement>("[data-role-list]");
  const empty = combo.querySelector<HTMLElement>("[data-role-empty]");
  if (!input || !value || !list) return;

  const options = Array.from(
    list.querySelectorAll<HTMLElement>(".aud-combo-opt"),
  );

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

  /** Show the groups matching what has been typed; Custom Search always. */
  const filter = (query: string) => {
    const q = query.trim().toLowerCase();
    let groupHits = 0;

    for (const option of options) {
      if (option.classList.contains("is-custom")) {
        option.hidden = false;
        continue;
      }
      const haystack = (option.dataset.search ?? option.textContent ?? "").toLowerCase();
      const hit = q === "" || haystack.includes(q);
      option.hidden = !hit;
      if (hit) groupHits += 1;
    }

    // Said only when a real search found nothing, so that the lone Custom
    // Search option below it does not look like a match for what they typed.
    if (empty) empty.hidden = q === "" || groupHits > 0;
    setActive(0);
  };

  const choose = (option: HTMLElement) => {
    value.value = option.dataset.value ?? "";
    input.value = option.textContent?.trim() ?? "";
    options.forEach((o) =>
      o.setAttribute("aria-selected", String(o === option)),
    );
    close();
    input.dispatchEvent(new Event("change", { bubbles: true }));
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
    filter(value.value ? "" : input.value);
    open();
  });

  input.addEventListener("input", () => {
    // Editing the text abandons the selection until something is picked
    // again — the field never submits a role the visitor cannot see.
    value.value = "";
    filter(input.value);
    open();
  });

  input.addEventListener("blur", () => {
    close();
    // Nothing was chosen, so leave the box empty rather than showing a
    // role-shaped fragment that is not a selection.
    if (!value.value) input.value = "";
  });

  /* ---------- keyboard ---------- */
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (list.hidden) {
        filter(value.value ? "" : input.value);
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
