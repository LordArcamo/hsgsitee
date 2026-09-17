/*
 * WordPress fork of the design's jobs-board.ts: the roles come from the page
 * (a JSON <script id="hsg-jobs"> rendered from the ACF field) instead of a
 * bundled data file, so editors control the board without a rebuild.
 */
import { prefersReducedMotion } from "./prefers-reduced-motion";

interface Job { title: string; industry: string; location: string; href?: string }
const ROTATE_MS = 6000;
const PIN_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>';
const BRIEF_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"/><path d="M3 12h18"/></svg>';
const GO_SVG = '<svg class="job-go" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>';
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
const jobHTML = (j: Job, href: string): string =>
  `<a class="job" href="${esc(j.href || href)}"><span class="job-ic" aria-hidden="true">${BRIEF_SVG}</span>` +
  `<span class="job-main"><h4>${esc(j.title)}</h4><span class="loc">${PIN_SVG}${esc(j.location)}<span class="ind-inline"> · ${esc(j.industry)}</span></span></span>` +
  `<span class="job-ind">${esc(j.industry)}</span>${GO_SVG}</a>`;

export function initJobsBoard(): void {
  const list = document.getElementById("joblist"); const dotsWrap = document.getElementById("jobdots");
  const pauseBtn = document.getElementById("jobpause"); const pauseTxt = document.getElementById("jobpausetxt");
  const data = document.getElementById("hsg-jobs"); const board = list?.closest(".board");
  if (!list || !dotsWrap || !pauseBtn || !pauseTxt || !board || !data) return;
  let jobs: Job[] = []; try { jobs = JSON.parse(data.textContent || "[]"); } catch { return; }
  const href = data.getAttribute("data-href") || "#";
  const PAGES: Job[][] = []; for (let i = 0; i < jobs.length; i += 5) PAGES.push(jobs.slice(i, i + 5));
  if (!PAGES.length) return;
  const reduced = prefersReducedMotion(); let page = 0; let timer: number | null = null; let paused = reduced;
  const render = (i: number) => { list.innerHTML = PAGES[i].map((j) => jobHTML(j, href)).join(""); Array.from(dotsWrap.children).forEach((d, k) => d.setAttribute("aria-current", String(k === i))); };
  const goTo = (i: number, animate: boolean) => { page = (i + PAGES.length) % PAGES.length; if (animate && !reduced) { list.classList.add("fading"); window.setTimeout(() => { render(page); list.classList.remove("fading"); }, 340); } else render(page); };
  const start = () => { if (!paused && timer === null && PAGES.length > 1) timer = window.setInterval(() => goTo(page + 1, true), ROTATE_MS); };
  const stop = () => { if (timer !== null) window.clearInterval(timer); timer = null; };
  PAGES.forEach((_, i) => { const b = document.createElement("button"); b.type = "button"; b.setAttribute("role", "tab"); b.setAttribute("aria-label", `Show opportunities, set ${i + 1} of ${PAGES.length}`); b.addEventListener("click", () => { goTo(i, true); stop(); start(); }); dotsWrap.appendChild(b); });
  pauseBtn.addEventListener("click", () => { paused = !paused; pauseBtn.setAttribute("aria-pressed", String(paused)); pauseTxt.textContent = paused ? "Play" : "Pause"; paused ? stop() : start(); });
  board.addEventListener("mouseenter", stop); board.addEventListener("mouseleave", () => start()); board.addEventListener("focusin", stop); board.addEventListener("touchstart", stop, { passive: true });
  render(0);
  if (reduced) { paused = true; pauseBtn.setAttribute("aria-pressed", "true"); pauseTxt.textContent = "Play"; } else start();
}
