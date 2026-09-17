/** Count-up for the hero proof bar figures ("1,200+", "4.3M+", "18K+") once they scroll into view. */
export function initCounters(): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>(".proofbar b"));
  if (!els.length) return;
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const run = (el: HTMLElement) => {
    const text = (el.textContent ?? "").trim();
    const m = text.match(/^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
    if (!m) return;
    const pre = m[1], num = m[2], suf = m[3];
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = (num.split(".")[1] || "").length;
    const grouped = num.includes(",");
    const fmt = (v: number) => {
      let s = v.toFixed(decimals);
      if (grouped) { const parts = s.split("."); s = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : ""); }
      return pre + s + suf;
    };
    if (reduce || !Number.isFinite(target)) { el.textContent = fmt(target); return; }
    const dur = 1500, start = performance.now();
    el.textContent = fmt(0);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - t, 3);
      el.textContent = fmt(target * e);
      if (t < 1) requestAnimationFrame(tick); else el.textContent = fmt(target);
    };
    requestAnimationFrame(tick);
  };
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) { run(en.target as HTMLElement); io.unobserve(en.target); }
  }, { threshold: 0.3 });
  els.forEach((el) => io.observe(el));
}
