import { SITE } from "../data/site";
import {
  criteriaFromQuery,
  criteriaRow,
  pluralizeTitle,
  PROFESSIONALS,
} from "../data/situations";

/**
 * Fills the Situations Wanted results page from the "For Companies" form.
 *
 * The site is a static build, so the query string is not available when the
 * page is rendered — the markup ships carrying the spec's example search and
 * this rewrites it in the browser. With no query string it resolves to that
 * same example, so the page never flickers between two different searches.
 */
export function initSituations(): void {
  const criteria = criteriaFromQuery(
    new URLSearchParams(window.location.search),
  );

  const plural = pluralizeTitle(criteria.title);
  document
    .querySelectorAll<HTMLElement>("[data-sw-title]")
    .forEach((el) => {
      el.textContent = plural;
    });

  for (const item of criteriaRow(criteria)) {
    const el = document.querySelector<HTMLElement>(
      `[data-sw-crit="${item.key}"]`,
    );
    if (el) el.textContent = item.value;
  }

  document.title = `Situations Wanted for ${plural} — ${SITE.name}`;

  /*
   * The demonstration pool is a fixed mechanical-engineering sample set. If
   * the employer searched for something else, say so rather than letting the
   * heading promise a role the cards below do not show.
   */
  const searched = criteria.title.trim().toLowerCase();
  const poolMatches = PROFESSIONALS.some(
    (p) => p.role.trim().toLowerCase() === searched,
  );
  const note = document.querySelector<HTMLElement>("[data-sw-rolenote]");
  if (note) note.hidden = poolMatches;
}
