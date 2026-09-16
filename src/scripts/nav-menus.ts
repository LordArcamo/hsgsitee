/**
 * Primary-nav dropdowns.
 *
 * Each `[data-nav-menu]` holds a `.nav-trigger` button and a `.nav-menu`
 * panel. On a pointer device the menu opens on hover with a short close
 * delay, so the cursor can cross the gap; everywhere it toggles on click
 * and on Enter/Space, closes on Escape, and closes when focus or a click
 * lands outside. Only one menu is open at a time.
 */
export function initNavMenus(): void {
  const items = Array.from(
    document.querySelectorAll<HTMLElement>("[data-nav-menu]"),
  );
  if (!items.length) return;

  const CLOSE_DELAY_MS = 140;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const timers = new WeakMap<HTMLElement, number>();

  const parts = (item: HTMLElement) => ({
    trigger: item.querySelector<HTMLButtonElement>(".nav-trigger"),
    menu: item.querySelector<HTMLElement>(".nav-menu"),
  });

  function open(item: HTMLElement): void {
    items.forEach((other) => other !== item && close(other));
    const { trigger, menu } = parts(item);
    if (!trigger || !menu) return;
    window.clearTimeout(timers.get(item));
    menu.hidden = false;
    // next frame so the transition runs from the hidden state
    requestAnimationFrame(() => item.classList.add("is-open"));
    trigger.setAttribute("aria-expanded", "true");
  }

  function close(item: HTMLElement): void {
    const { trigger, menu } = parts(item);
    if (!trigger || !menu) return;
    window.clearTimeout(timers.get(item));
    item.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  }

  const isOpen = (item: HTMLElement) =>
    parts(item).trigger?.getAttribute("aria-expanded") === "true";

  const closeSoon = (item: HTMLElement) =>
    timers.set(item, window.setTimeout(() => close(item), CLOSE_DELAY_MS));

  items.forEach((item) => {
    const { trigger, menu } = parts(item);
    if (!trigger || !menu) return;

    trigger.addEventListener("click", () =>
      isOpen(item) ? close(item) : open(item),
    );

    if (canHover) {
      item.addEventListener("mouseenter", () => open(item));
      item.addEventListener("mouseleave", () => closeSoon(item));
    }

    // Escape from anywhere inside returns focus to the trigger
    item.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen(item)) {
        e.preventDefault();
        close(item);
        trigger.focus();
      }
      // ArrowDown from the trigger enters the menu
      if (e.key === "ArrowDown" && e.target === trigger) {
        e.preventDefault();
        if (!isOpen(item)) open(item);
        menu.querySelector<HTMLElement>("a")?.focus();
      }
    });

    // tabbing out of the menu closes it
    item.addEventListener("focusout", (e) => {
      const next = e.relatedTarget as Node | null;
      if (next && !item.contains(next)) close(item);
    });
  });

  document.addEventListener("click", (e) => {
    const target = e.target as Node;
    items.forEach((item) => {
      if (isOpen(item) && !item.contains(target)) close(item);
    });
  });
}
