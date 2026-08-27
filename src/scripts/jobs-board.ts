import { JOB_PAGES, type Job } from "../data/jobs";
import { prefersReducedMotion } from "./prefers-reduced-motion";

const ROTATE_MS = 6000;

const PIN_SVG =
  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>';
const BRIEF_SVG =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"/><path d="M3 12h18"/></svg>';
const GO_SVG =
  '<svg class="job-go" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>';

const jobHTML = (j: Job): string =>
  '<a class="job" href="#">' +
  `<span class="job-ic" aria-hidden="true">${BRIEF_SVG}</span>` +
  `<span class="job-main"><h4>${j.title}</h4>` +
  `<span class="loc">${PIN_SVG}${j.location}` +
  `<span class="ind-inline"> · ${j.industry}</span></span></span>` +
  `<span class="job-ind">${j.industry}</span>${GO_SVG}</a>`;

/**
 * Current opportunities board: a calm rotation through pages of roles, with a
 * pause control. Rotation also halts while the visitor is reading or
 * interacting, and never starts at all under reduced motion.
 */
export function initJobsBoard(): void {
  const list = document.getElementById("joblist");
  const dotsWrap = document.getElementById("jobdots");
  const pauseBtn = document.getElementById("jobpause");
  const pauseTxt = document.getElementById("jobpausetxt");
  const board = list?.closest(".board");
  if (!list || !dotsWrap || !pauseBtn || !pauseTxt || !board) return;

  const reduced = prefersReducedMotion();
  let page = 0;
  let timer: number | null = null;
  let paused = reduced;

  function render(i: number): void {
    list!.innerHTML = JOB_PAGES[i].map(jobHTML).join("");
    Array.from(dotsWrap!.children).forEach((d, k) =>
      d.setAttribute("aria-current", String(k === i)),
    );
  }

  function goTo(i: number, animate: boolean): void {
    page = (i + JOB_PAGES.length) % JOB_PAGES.length;
    if (animate && !reduced) {
      list!.classList.add("fading");
      window.setTimeout(() => {
        render(page);
        list!.classList.remove("fading");
      }, 340);
    } else {
      render(page);
    }
  }

  const start = () => {
    if (!paused && timer === null) {
      timer = window.setInterval(() => goTo(page + 1, true), ROTATE_MS);
    }
  };
  const stop = () => {
    if (timer !== null) window.clearInterval(timer);
    timer = null;
  };
  const restart = () => {
    stop();
    start();
  };

  /* ---------- page dots ---------- */
  JOB_PAGES.forEach((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute(
      "aria-label",
      `Show opportunities, set ${i + 1} of ${JOB_PAGES.length}`,
    );
    b.addEventListener("click", () => {
      goTo(i, true);
      restart();
    });
    dotsWrap.appendChild(b);
  });

  /* ---------- pause control ---------- */
  pauseBtn.addEventListener("click", () => {
    paused = !paused;
    pauseBtn.setAttribute("aria-pressed", String(paused));
    pauseTxt.textContent = paused ? "Play" : "Pause";
    if (paused) stop();
    else start();
  });

  // hold while the visitor is reading or interacting
  board.addEventListener("mouseenter", stop);
  board.addEventListener("mouseleave", () => start());
  board.addEventListener("focusin", stop);
  board.addEventListener("touchstart", stop, { passive: true });

  render(0);
  if (reduced) {
    paused = true;
    pauseBtn.setAttribute("aria-pressed", "true");
    pauseTxt.textContent = "Play";
  } else {
    start();
  }
}
