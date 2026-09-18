/*
 * WordPress fork: the pool, criteria, stages and funnel come from the page
 * (<script id="hsg-shortlist" type="application/json">, rendered from ACF)
 * rather than a bundled data file, so HSG edits the demonstration in
 * wp-admin without a rebuild.
 */
import { prefersReducedMotion } from "./prefers-reduced-motion";

type Evidence = 0 | 1 | 2;
interface Candidate { id: number; role: string; years: number; industry: string; teamSize: string; scope: string; criteria: Evidence[]; strength: string; watchPoint: string; exitsAt: number; exitReason: string }
interface Stage { key: string; note: string; hot: number[] }
interface FunnelStep { count: number; label: string; fromStage: number }
const EVIDENCE_LABEL: Record<Evidence, string> = { 2: "Yes", 1: "Limited", 0: "Not evidenced" };
let CANDIDATES: Candidate[] = []; let CANDIDATE_CRITERIA: string[] = []; let STAGES: Stage[] = []; let FUNNEL: FunnelStep[] = [];
const esc = (v: unknown) => String(v ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));

/** How long outgoing cards stay on screen, dimmed and captioned. */
const LEAVING_HOLD_MS = 1700;
/** The fade-out that follows that hold. */
const LEAVING_FADE_MS = 520;

const pad = (n: number): string => (n < 10 ? `0${n}` : String(n));

/** Profiles still in the pool at a given stage. Finalists (exitsAt 0) never leave. */
const survivors = (stage: number): Candidate[] =>
  CANDIDATES.filter((c) => c.exitsAt === 0 || c.exitsAt > stage);

function cardHTML(c: Candidate, leaving: boolean): string {
  const crit = c.criteria.map((v) => `<i data-v="${v}"></i>`).join("");
  const rows = CANDIDATE_CRITERIA.map(
    (label, k) =>
      `<dt>${esc(label)}</dt><dd data-v="${c.criteria[k]}">${EVIDENCE_LABEL[c.criteria[k]]}</dd>`,
  ).join("");
  const id = pad(c.id);

  // Focusable and aria-expanded, but deliberately NOT role="button" — that role
  // makes descendants presentational and would hide the evaluation detail from
  // assistive technology.
  return (
    `<div class="cand${leaving ? " out" : ""}" tabindex="0" aria-expanded="false" ` +
    `aria-label="Candidate ${id}, ${esc(c.role)}, ${esc(c.industry)}. Activate for evaluation detail.">` +
    `<span class="cand-top"><span class="cand-id">Candidate ${id}</span>` +
    `<span class="cand-yrs">${c.years} yrs</span></span>` +
    `<span class="cand-role">${esc(c.role)}</span>` +
    `<span class="cand-meta">${esc(c.industry)} · ${esc(c.teamSize)} team · ${esc(c.scope)}</span>` +
    `<span class="crit" aria-hidden="true">${crit}</span>` +
    `<span class="cand-detail"><dl>${rows}</dl>` +
    `<span class="sw"><b>Strength:</b> ${esc(c.strength)}</span>` +
    `<span class="sw"><b>Watch point:</b> ${esc(c.watchPoint)}</span></span>` +
    `<span class="cand-why">${esc(c.exitReason)}</span>` +
    `</div>`
  );
}

const finalistHTML = (c: Candidate): string =>
  `<article class="fin">` +
  `<span class="cand-top"><span class="cand-id">Finalist · Candidate ${pad(c.id)}</span>` +
  `<span class="cand-yrs">${c.years} yrs</span></span>` +
  `<h4 class="cand-role">${esc(c.role)}</h4>` +
  `<span class="cand-meta">${esc(c.industry)} · ${esc(c.teamSize)} team · ${esc(c.scope)}</span>` +
  `<p class="sw"><b>Why they are here:</b> ${esc(c.strength)}</p>` +
  `<p class="sw"><b>Still to explore:</b> ${esc(c.watchPoint)}</p>` +
  `</article>`;

/**
 * Shortlist demonstration — simplified (client review, 17 Sep 2026).
 *
 * Same fictional pool and stages as the design, but: nothing plays on its
 * own, nothing scrolls on its own, and there is one control — "Next stage".
 * The pool shows eight profiles at a time (with a "show all" link); when a
 * stage advances, the profiles that leave are shown first, dimmed with the
 * reason, then removed. Stage names remain clickable to jump around.
 */
const SHOW_MAX = 8;

export function initShortlist(): void {
  const section = document.getElementById("shortlist");
  const stagesEl = document.getElementById("slStages");
  const track = document.getElementById("slTrack");
  const view = document.getElementById("slView");
  const req = document.getElementById("slReq");
  const note = document.getElementById("slNote");
  const count = document.getElementById("slCount");
  const countLbl = document.getElementById("slCountLbl");
  const next = document.getElementById("slNext");
  const more = document.getElementById("slMore");
  const poolLbl = document.getElementById("slPoolLbl");
  const funnel = document.getElementById("slFunnel");
  if (!section || !stagesEl || !track || !view || !req || !note || !count || !countLbl || !next || !more || !funnel) return;

  const data = document.getElementById("hsg-shortlist");
  if (!data) return;
  try {
    const j = JSON.parse(data.textContent || "{}");
    CANDIDATES = j.candidates || []; CANDIDATE_CRITERIA = j.criteria || []; STAGES = j.stages || []; FUNNEL = j.funnel || [];
  } catch { return; }
  if (!CANDIDATES.length || !STAGES.length) return;
  const reduced = prefersReducedMotion();
  const LAST = STAGES.length - 1;

  let stage = 0;
  let busy = false;
  let showAll = false;

  /** Which profiles to draw: the ones leaving first (so the reason is seen), then the rest, capped unless expanded. */
  const visible = (pool: Candidate[], leavingStage: number): Candidate[] => {
    const ordered = leavingStage
      ? [...pool.filter((c) => c.exitsAt === leavingStage), ...pool.filter((c) => c.exitsAt !== leavingStage)]
      : pool;
    return showAll ? ordered : ordered.slice(0, SHOW_MAX);
  };

  function paint(pool: Candidate[], leavingStage: number): void {
    view!.classList.add("is-static");
    if (!leavingStage && stage === LAST) {
      track!.className = "finalists";
      track!.innerHTML = pool.map(finalistHTML).join("");
      more!.hidden = true;
      return;
    }
    track!.className = "pool-track";
    const shown = visible(pool, leavingStage);
    track!.innerHTML = shown.map((c) => cardHTML(c, !!leavingStage && c.exitsAt === leavingStage)).join("");
    more!.hidden = pool.length <= SHOW_MAX;
    more!.textContent = showAll ? "Show fewer" : `Show all ${pool.length} profiles`;
  }

  function syncChrome(): void {
    stagesEl!.querySelectorAll(".stage-btn").forEach((b, k) => {
      b.setAttribute("aria-current", String(k === stage));
      b.classList.toggle("done", k < stage);
    });
    Array.from(req!.children).forEach((li, k) => li.classList.toggle("hot", (STAGES[stage].hot || []).includes(k)));
    funnel!.querySelectorAll(".fn").forEach((f, k) => f.classList.toggle("on", FUNNEL[k].fromStage <= stage));
    note!.textContent = STAGES[stage].note;
    const n = survivors(stage).length;
    count!.textContent = String(n);
    countLbl!.textContent = stage === LAST ? "finalists" : "in consideration";
    if (poolLbl) poolLbl.textContent = stage === LAST ? "The finalists" : `${n} profiles still in`;
    next!.innerHTML = stage === LAST
      ? 'Start over'
      : `Next: ${esc(STAGES[stage + 1].key)} <span class="arrow" aria-hidden="true">→</span>`;
  }

  function go(target: number, animate: boolean): void {
    if (busy) return;
    target = Math.max(0, Math.min(LAST, target));
    const forward = target === stage + 1;
    const leaving = CANDIDATES.some((c) => c.exitsAt === target);
    if (animate && forward && leaving && !reduced) {
      busy = true; next!.setAttribute("disabled", "");
      paint(survivors(stage), target);
      window.setTimeout(() => {
        track!.querySelectorAll(".cand.out").forEach((el) => el.classList.add("gone"));
        window.setTimeout(() => {
          stage = target; paint(survivors(stage), 0); syncChrome();
          busy = false; next!.removeAttribute("disabled");
        }, LEAVING_FADE_MS);
      }, LEAVING_HOLD_MS);
      return;
    }
    stage = target; paint(survivors(stage), 0); syncChrome();
  }

  /* ---------- chrome ---------- */
  STAGES.forEach((st, k) => {
    if (k) stagesEl.insertAdjacentHTML("beforeend", '<span class="stage-sep" aria-hidden="true">→</span>');
    const b = document.createElement("button");
    b.type = "button"; b.className = "stage-btn"; b.textContent = st.key;
    b.setAttribute("aria-label", `Show stage ${k + 1}, ${st.key}`);
    b.addEventListener("click", () => go(k, false));
    stagesEl.appendChild(b);
  });
  req.innerHTML = CANDIDATE_CRITERIA.map((r) => `<li><span class="k" aria-hidden="true"></span>${esc(r)}</li>`).join("");
  funnel.innerHTML = FUNNEL.map((f, k) => (k ? '<span class="fn-arrow" aria-hidden="true">→</span>' : "") + `<span class="fn"><b>${f.count}</b><span>${esc(f.label)}</span></span>`).join("");

  next.addEventListener("click", () => go(stage === LAST ? 0 : stage + 1, true));
  more.addEventListener("click", () => { showAll = !showAll; paint(survivors(stage), 0); });

  /* ---------- expand / collapse a candidate ---------- */
  const toggle = (card: HTMLElement) => card.setAttribute("aria-expanded", String(card.classList.toggle("open")));
  track.addEventListener("click", (e) => { const card = (e.target as HTMLElement).closest<HTMLElement>(".cand"); if (card) toggle(card); });
  track.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = (e.target as HTMLElement).closest<HTMLElement>(".cand");
    if (card) { e.preventDefault(); toggle(card); }
  });

  go(0, false);
}
