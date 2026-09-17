/* Theme entry: every widget from the design, initialised once the DOM is ready. */
import { initReveal } from "./scripts/reveal";
import { initHeader } from "./scripts/header";
import { initAudienceBar } from "./scripts/audience-bar";
import { initAudienceMenu } from "./scripts/audience-menu";
import { initCounters } from "./scripts/counters";
import { initJobsBoard } from "./scripts/jobs-board";
const initProgress = () => {
  const bar = document.querySelector<HTMLElement>(".post-progress"); const body = document.querySelector<HTMLElement>(".post-body");
  if (!bar || !body) return;
  const tick = () => { const r = body.getBoundingClientRect(); const total = r.height - innerHeight * 0.6; const done = Math.min(1, Math.max(0, -r.top / (total || 1))); bar.style.setProperty("--p", String(done)); };
  addEventListener("scroll", tick, { passive: true }); addEventListener("resize", tick); tick();
};
const initCopy = () => document.querySelectorAll<HTMLButtonElement>(".post-copy").forEach((b) => b.addEventListener("click", async () => { try { await navigator.clipboard.writeText(b.dataset.copy || location.href); b.classList.add("is-done"); b.textContent = "Copied"; setTimeout(() => { b.classList.remove("is-done"); b.textContent = "Copy link"; }, 1800); } catch {} }));
const boot = () => { initCopy(); initHeader(); initAudienceBar(); initAudienceMenu(); initCounters(); initJobsBoard(); initProgress(); initReveal(); };
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", boot) : boot();
