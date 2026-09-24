/**
 * "See what others chose" — swaps the employer's own comparison for the
 * sample of what another employer asked us to add, and back.
 *
 * One of the two tables is in the document at a time rather than both being
 * present with one hidden: two comparison tables of the same six people is
 * a trap for a screen reader, for Ctrl-F, and for anyone printing the page.
 *
 * With no JavaScript the button never appears, so the section is exactly the
 * single table it has always been.
 */
export function initSampleCompare(): void {
  const btn = document.querySelector<HTMLButtonElement>("[data-sw-sample]");
  const real = document.querySelector<HTMLElement>("[data-sw-real]");
  const sample = document.querySelector<HTMLElement>("#sample-comparison");
  const label = btn?.querySelector<HTMLElement>("[data-sw-sample-label]");
  if (!btn || !real || !sample || !label) return;

  btn.hidden = false;

  const show = (showing: boolean) => {
    sample.hidden = !showing;
    real.hidden = showing;
    btn.setAttribute("aria-expanded", String(showing));
    label.textContent = showing
      ? (btn.dataset.close ?? "")
      : (btn.dataset.open ?? "");
    btn.classList.toggle("is-showing", showing);
  };

  btn.addEventListener("click", () => {
    const showing = btn.getAttribute("aria-expanded") === "true";
    show(!showing);

    /*
     * Coming back, the button can end up above the fold with the section
     * scrolled past it — the table it controls is shorter than the sample.
     * Put the heading back in view so the swap is visible rather than
     * something that happened off-screen.
     */
    if (showing && btn.getBoundingClientRect().top < 0) {
      btn.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  });
}
