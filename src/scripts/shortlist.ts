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

/** How long each stage holds before advancing on its own. */
const STAGE_MS = 4500;
/** How long outgoing cards stay on screen, dimmed and captioned. */
const LEAVING_HOLD_MS = 1700;
/** The fade-out that follows that hold. */
const LEAVING_FADE_MS = 520;
/** Below this many cards the pool sits still rather than drifting. */
const CONVEYOR_MIN = 8;

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
 * Shortlist demonstration: walks a pool of fictional profiles through the
 * Collaborative Search stages, showing why each one leaves.
 */
export function initShortlist(): void {
  const section = document.getElementById("shortlist");
  const stagesEl = document.getElementById("slStages");
  const track = document.getElementById("slTrack");
  const view = document.getElementById("slView");
  const req = document.getElementById("slReq");
  const note = document.getElementById("slNote");
  const count = document.getElementById("slCount");
  const countLbl = document.getElementById("slCountLbl");
  const play = document.getElementById("slPlay");
  const playTxt = document.getElementById("slPlayTxt");
  const funnel = document.getElementById("slFunnel");

  if (
    !section || !stagesEl || !track || !view || !req ||
    !note || !count || !countLbl || !play || !playTxt || !funnel
  ) {
    return;
  }

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
  let timer: number | null = null;
  let paused = reduced;
  let busy = false;

  /* ---------- painting ---------- */
  function paint(pool: Candidate[], leavingStage: number): void {
    // finalists get their own treatment once the pool is down to three
    if (!leavingStage && stage === LAST) {
      view!.classList.add("is-static");
      track!.className = "finalists";
      track!.innerHTML = pool.map(finalistHTML).join("");
      return;
    }

    track!.className = "pool-track";
    const conveyor = !reduced && pool.length > CONVEYOR_MIN;
    view!.classList.toggle("is-static", !conveyor);

    const cards = pool
      .map((c) => cardHTML(c, !!leavingStage && c.exitsAt === leavingStage))
      .join("");
    // duplicate the run so the vertical drift can loop seamlessly
    track!.innerHTML = conveyor ? cards + cards : cards;
  }

  function syncChrome(): void {
    stagesEl!.querySelectorAll(".stage-btn").forEach((b, k) => {
      b.setAttribute("aria-current", String(k === stage));
      b.classList.toggle("done", k < stage);
    });
    Array.from(req!.children).forEach((li, k) =>
      li.classList.toggle("hot", STAGES[stage].hot.includes(k)),
    );
    funnel!.querySelectorAll(".fn").forEach((f, k) =>
      f.classList.toggle("on", FUNNEL[k].fromStage <= stage),
    );
    note!.textContent = STAGES[stage].note;
    count!.textContent = String(survivors(stage).length);
    countLbl!.textContent = stage === LAST ? "finalists" : "in consideration";
  }

  const setBtn = (txt: string) => {
    playTxt!.textContent = txt;
  };

  const stop = () => {
    if (timer !== null) window.clearInterval(timer);
    timer = null;
  };
  const start = () => {
    if (!paused && timer === null && stage < LAST) {
      timer = window.setInterval(() => go(stage + 1, true), STAGE_MS);
    }
  };

  function go(target: number, animate: boolean): void {
    if (busy) return;
    target = Math.max(0, Math.min(LAST, target));

    const forward = target === stage + 1;
    const leaving = CANDIDATES.some((c) => c.exitsAt === target);

    if (animate && forward && leaving && !reduced) {
      // hold the outgoing cards on screen, dimmed and captioned, before they go
      busy = true;
      view!.classList.add("paused");
      paint(survivors(stage), target);

      window.setTimeout(() => {
        track!
          .querySelectorAll(".cand.out")
          .forEach((el) => el.classList.add("gone"));

        window.setTimeout(() => {
          stage = target;
          paint(survivors(stage), 0);
          view!.classList.remove("paused");
          syncChrome();
          busy = false;
          if (stage === LAST) {
            stop();
            setBtn("Replay");
          }
        }, LEAVING_FADE_MS);
      }, LEAVING_HOLD_MS);
      return;
    }

    stage = target;
    paint(survivors(stage), 0);
    syncChrome();
    if (stage === LAST) {
      stop();
      setBtn("Replay");
    }
  }

  /* ---------- build the static chrome ---------- */
  STAGES.forEach((st, k) => {
    if (k) {
      stagesEl.insertAdjacentHTML(
        "beforeend",
        '<span class="stage-sep" aria-hidden="true">→</span>',
      );
    }
    const b = document.createElement("button");
    b.type = "button";
    b.className = "stage-btn";
    b.textContent = st.key;
    b.setAttribute("aria-label", `Show stage ${k + 1}, ${st.key}`);
    b.addEventListener("click", () => {
      stop();
      paused = true;
      play.setAttribute("aria-pressed", "true");
      setBtn("Play");
      go(k, false);
    });
    stagesEl.appendChild(b);
  });

  req.innerHTML = CANDIDATE_CRITERIA.map(
    (r) => `<li><span class="k" aria-hidden="true"></span>${esc(r)}</li>`,
  ).join("");

  funnel.innerHTML = FUNNEL.map(
    (f, k) =>
      (k ? '<span class="fn-arrow" aria-hidden="true">→</span>' : "") +
      `<span class="fn"><b>${f.count}</b><span>${esc(f.label)}</span></span>`,
  ).join("");

  /* ---------- expand / collapse a candidate ---------- */
  const toggle = (card: HTMLElement) =>
    card.setAttribute("aria-expanded", String(card.classList.toggle("open")));

  track.addEventListener("click", (e) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>(".cand");
    if (card) toggle(card);
  });
  track.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = (e.target as HTMLElement).closest<HTMLElement>(".cand");
    if (card) {
      e.preventDefault();
      toggle(card);
    }
  });

  /* ---------- hold the drift while someone is reading ---------- */
  view.addEventListener("mouseenter", () => view.classList.add("paused"));
  view.addEventListener("mouseleave", () => {
    if (!busy) view.classList.remove("paused");
  });
  view.addEventListener("focusin", () => view.classList.add("paused"));
  track.addEventListener("touchstart", () => view.classList.add("paused"), {
    passive: true,
  });

  /* ---------- play / pause / replay ---------- */
  play.addEventListener("click", () => {
    if (stage === LAST) {
      // replay from the top
      paused = false;
      play.setAttribute("aria-pressed", "false");
      setBtn("Pause");
      go(0, false);
      start();
      return;
    }
    paused = !paused;
    play.setAttribute("aria-pressed", String(paused));
    setBtn(paused ? "Play" : "Pause");
    if (paused) stop();
    else start();
  });

  /* ---------- go ---------- */
  go(0, false);

  if (reduced) {
    paused = true;
    play.setAttribute("aria-pressed", "true");
    setBtn("Play");
  } else if ("IntersectionObserver" in window) {
    // only run once the section is actually on screen
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => (en.isIntersecting ? start() : stop()));
      },
      { threshold: 0.2 },
    );
    io.observe(section);
  } else {
    start();
  }
}
