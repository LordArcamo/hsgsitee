/**
 * Audience jump bar.
 *
 * Appears once the hero has scrolled away — so a professional who landed on
 * the employer path can reach Career Solutions — and retires near the footer,
 * where the page offers both doors anyway.
 */
export function initAudienceBar(): void {
  const audbar = document.getElementById("audbar");
  const heroEl = document.querySelector<HTMLElement>(".hero");
  if (!audbar) return;

  window.addEventListener(
    "scroll",
    () => {
      const past = window.scrollY > (heroEl ? heroEl.offsetHeight * 0.75 : 500);
      const atEnd =
        window.scrollY + window.innerHeight > document.body.scrollHeight - 240;
      audbar.classList.toggle("show", past && !atEnd);
    },
    { passive: true },
  );
}
