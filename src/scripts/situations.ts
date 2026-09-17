import {
  criteriaFromQuery,
  criteriaRow,
  rankCandidates,
  type Rankable,
} from "../data/situations";

/**
 * Fits the Situations Wanted page to the employer's search.
 *
 * The role is not this script's business: it is the URL segment, and the
 * page for it was prerendered with its own candidates. What arrives as a
 * query string is the rest of the search — location, experience band, new
 * or replacement, career path and salary range. Two things come of it:
 * the criteria line is written, and the six professionals are re-ordered.
 *
 * Each role page is a static file, so the markup ships carrying the spec's
 * worked example and the six in the order they are written. Until both are
 * put right, the criteria line and the three candidate lists are held
 * invisible by `[data-sw-pending]` — set by an inline script while the
 * document is still parsing — so nobody sees the example search or watches
 * the cards shuffle. Clearing that attribute is the last thing this does.
 */
export function initSituations(): void {
  const reveal = () => document.documentElement.removeAttribute("data-sw-pending");

  if (!window.location.search) {
    reveal();
    return;
  }

  const params = new URLSearchParams(window.location.search);
  fillCriteria(params);
  applyRanking(params);
  reveal();
}

/** Write the employer's answers onto the criteria line. */
function fillCriteria(params: URLSearchParams): void {
  for (const item of criteriaRow(criteriaFromQuery(params))) {
    const chip = document.querySelector<HTMLElement>(`[data-sw-chip="${item.key}"]`);
    const value = document.querySelector<HTMLElement>(`[data-sw-crit="${item.key}"]`);
    if (!chip || !value) continue;

    // An answer the employer did not give is dropped, not filled in with
    // the example's. Every field on the form is required, so this only
    // happens on a hand-edited URL — but a stale "Newark, NJ" sitting on
    // someone else's search would be worse than a shorter line.
    if (!item.value) {
      chip.hidden = true;
      continue;
    }
    chip.hidden = false;
    value.textContent = item.value;

    // "Career Path: Yes" already names itself; the screen-reader label in
    // front of it would read "Career path: Career Path: Yes".
    const label = document.querySelector<HTMLElement>(`[data-sw-lbl="${item.key}"]`);
    if (label) {
      label.hidden = !item.label;
      if (item.label) label.textContent = `${item.label}: `;
    }
  }
}

/**
 * Order the six by how closely they fit the search, and apply that one
 * order to the cards, the quick comparison and the full table together.
 *
 * The ranking is computed once, from the cards, and the other two lists
 * are re-ordered to match it by id — so the three cannot end up holding
 * different people or the same people in different orders.
 */
function applyRanking(params: URLSearchParams): void {
  const cards = document.querySelector<HTMLElement>(".sw-cards[data-sw-order]");
  if (!cards) return;

  const rankable: Rankable[] = Array.from(
    cards.querySelectorAll<HTMLElement>("[data-sw-id]"),
  ).map((el) => ({
    id: Number(el.dataset.swId),
    totalExperience: Number(el.dataset.swExp),
    currentSalary: Number(el.dataset.swSalary),
  }));

  const order = rankCandidates(rankable, params).map((c) => c.id);

  for (const list of document.querySelectorAll<HTMLElement>("[data-sw-order]")) {
    const byId = new Map(
      Array.from(list.children).map((el) => [
        Number((el as HTMLElement).dataset.swId),
        el,
      ]),
    );
    // Appending an element already in the list moves it, so walking the
    // order once leaves the children in exactly that sequence.
    for (const id of order) {
      const el = byId.get(id);
      if (el) list.append(el);
    }
  }

  // The staggered reveal delay is positional, so it has to follow the
  // cards to their new places rather than travelling with them.
  Array.from(cards.children).forEach((el, i) => {
    (el as HTMLElement).style.setProperty("--d", String(Math.min(i, 2)));
  });
}
