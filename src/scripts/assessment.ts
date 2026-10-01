import { prefersReducedMotion } from "./prefers-reduced-motion";

/**
 * "Where Are You Right Now?" — the sheet behaviour.
 *
 * It holds no answers of its own. The inputs are the state, which is the
 * point: what is on screen and what a form would submit are the same thing,
 * so they cannot drift apart.
 *
 * Without this script the sheet is still a working questionnaire — every
 * question is in the HTML, every chip is a real input. The script only adds
 * the running summary, the "why" box once something is chosen, and the
 * send action. Nothing is built at runtime.
 */

/** One answered question, in the order it appears on the page. */
interface Answer {
  q: string;
  values: string[];
}

export function initAssessment(): void {
  document.querySelectorAll<HTMLFormElement>("[data-wn]").forEach(setup);
}

function setup(form: HTMLFormElement): void {
  const groups = Array.from(form.querySelectorAll<HTMLFieldSetElement>("[data-q]"));
  if (!groups.length) return;

  const why = form.querySelector<HTMLElement>("[data-wn-why]");
  const text = form.querySelector<HTMLTextAreaElement>("#wn-why-text");
  const out = form.querySelector<HTMLElement>("[data-wn-out]");
  const list = form.querySelector<HTMLElement>("[data-wn-list]");
  const send = form.querySelector<HTMLButtonElement>("[data-wn-send]");
  const clear = form.querySelector<HTMLButtonElement>("[data-wn-clear]");

  const read = (): Answer[] =>
    groups
      .map((g) => ({
        q: g.querySelector<HTMLElement>(".wn-q-t")?.textContent?.trim() ?? "",
        values: Array.from(
          g.querySelectorAll<HTMLInputElement>("input:checked"),
        ).map((i) => i.value),
      }))
      .filter((a) => a.values.length > 0);

  /* Question 1 carries descriptions the chip is too thin to hold. Show the
     chosen one under the row, so the row stays thin and the copy survives. */
  const echo = (g: HTMLFieldSetElement) => {
    const line = g.querySelector<HTMLElement>("[data-wn-echo]");
    if (!line) return;
    const picked = Array.from(g.querySelectorAll<HTMLInputElement>("input:checked"))
      .map((i) => i.dataset.desc)
      .filter(Boolean);
    line.textContent = picked.join(" ");
    line.hidden = picked.length === 0;
  };

  const paint = () => {
    groups.forEach(echo);

    const answers = read();
    const any = answers.length > 0;

    if (why) why.hidden = !any;
    if (out) out.hidden = !any;
    if (clear) clear.hidden = !any;
    if (send) send.disabled = !any;

    if (!list) return;
    list.replaceChildren(
      ...answers.map((a) => {
        const li = document.createElement("li");
        const q = document.createElement("span");
        q.className = "wn-out-q";
        q.textContent = a.q;
        const v = document.createElement("span");
        v.className = "wn-out-v";
        v.textContent = a.values.join(", ");
        li.append(q, v);
        return li;
      }),
    );
  };

  /** The plain-text body Michael reads. Same shape whether it is mailed or posted. */
  const summary = (): string => {
    const lines = read().map((a) => `${a.q}\n  ${a.values.join(", ")}`);
    const note = text?.value.trim();
    if (note) lines.push(`Why I picked these\n  ${note}`);
    return lines.join("\n\n");
  };

  form.addEventListener("change", paint);
  form.addEventListener("input", (e) => {
    if (e.target === text) paint();
  });

  clear?.addEventListener("click", () => {
    form.reset();
    paint();
    form.querySelector<HTMLElement>(".wn-instruct")?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!read().length) return;

    /* Lord sets data-wn-endpoint in WordPress and this posts instead. Until
       then the summary goes to the visitor's mail app, which is also the
       quickest way for Michael to read the email he would be getting. */
    const endpoint = form.dataset.wnEndpoint;
    if (endpoint) {
      void fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "where-are-you-right-now",
          answers: read(),
          why: text?.value.trim() ?? "",
        }),
      });
      return;
    }

    const base = form.dataset.wnMail ?? "mailto:";
    window.location.href = `${base}&body=${encodeURIComponent(summary())}`;
  });

  paint();
}
