/**
 * Sticky header: drop shadow on scroll, mobile menu, and publishing the
 * header height as `--hdr-h` so the audience jump bar can sit beneath it.
 */
import { initNavMenus } from "./nav-menus";

export function initHeader(): void {
  initNavMenus();

  const hdr = document.getElementById("hdr");
  const burger = document.getElementById("burger");
  const mobilenav = document.getElementById("mobilenav");
  if (!hdr || !burger || !mobilenav) return;

  /* ---------- shadow on scroll ---------- */
  const onScroll = () => hdr.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- publish header height ---------- */
  const sizeHdr = () =>
    document.documentElement.style.setProperty("--hdr-h", `${hdr.offsetHeight}px`);
  sizeHdr();
  window.addEventListener("resize", sizeHdr);

  /* ---------- mobile menu ---------- */
  const closeMenu = () => {
    mobilenav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
  };

  burger.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") === "true";
    if (open) {
      closeMenu();
    } else {
      mobilenav.classList.add("open");
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", "Close menu");
    }
  });

  // follow a link and the menu should get out of the way
  mobilenav.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobilenav.classList.contains("open")) {
      closeMenu();
      burger.focus();
    }
  });
}
