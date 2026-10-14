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
  const bar = form.querySelector<HTMLElement>("[data-wn-bar]");
  const done = form.querySelector<HTMLElement>("[data-wn-done]");
  const fill = form.querySelector<HTMLElement>("[data-wn-fill]");
  const act = form.querySelector<HTMLElement>("[data-wn-act]");

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

  /* ---------- the people a visitor says sound like them ----------
     The continuum section publishes both of these as JSON. If this page has
     no continuum (or the block is missing) every one of these degrades to
     an empty list and the sheet behaves exactly as it did before. */
  const readJson = <T,>(sel: string, fallback: T): T => {
    const el = document.querySelector<HTMLScriptElement>(sel);
    if (!el?.textContent) return fallback;
    try { return JSON.parse(el.textContent) as T; } catch { return fallback; }
  };

  interface Person {
    key: string; name: string; said: string; tagline: string;
    body: string; work: string[]; investment?: { label: string; value: string };
  }

  const PEOPLE = readJson<Person[]>("[data-cs-people]", []);
  const PICK_COPY = readJson<any>("[data-cs-pick-copy]", {
    label: "This sounds like me", labelOn: "Close to my situation",
    recapTitle: "Who you said sounds like you", attribution: "",
    mail: { peopleHead: "WHO THEY SAID SOUNDS LIKE THEM", peopleNote: "", ownHead: "IN THEIR OWN WORDS",
            ownNote: "", answersHead: "WHAT THEY TICKED", said: "Their line", tagline: "Tagline",
            story: "Our write-up", work: "What the work involved", none: "Nothing typed." },
  });

  const picks = new Set<string>();
  const pickedPeople = (): Person[] => PEOPLE.filter((p) => picks.has(p.key));

  const whoBlock = document.querySelector<HTMLElement>("[data-wn-who]");
  const whoList = document.querySelector<HTMLElement>("[data-wn-who-list]");

  const paintWho = () => {
    const people = pickedPeople();
    if (whoBlock) whoBlock.hidden = people.length === 0;
    if (!whoList) return;
    whoList.replaceChildren(
      ...people.map((p) => {
        const li = document.createElement("li");
        li.className = "wn-who-i";

        const h = document.createElement("p");
        h.className = "wn-who-n";
        h.textContent = p.name;

        const said = document.createElement("p");
        said.className = "wn-who-said";
        said.textContent = `“${p.said}”`;

        const tag = document.createElement("p");
        tag.className = "wn-who-tag";
        tag.textContent = p.tagline;

        /* Marked as ours on the page too, not only in the email — the
           visitor should also never think we are quoting them. */
        const body = document.createElement("p");
        body.className = "wn-who-body";
        body.textContent = p.body;

        const work = document.createElement("ul");
        work.className = "wn-who-work";
        p.work.forEach((w) => {
          const wi = document.createElement("li");
          wi.textContent = w;
          work.append(wi);
        });

        li.append(h, said, tag, body, work);

        if (p.investment) {
          const inv = document.createElement("p");
          inv.className = "wn-who-inv";
          inv.textContent = `${p.investment.label}: ${p.investment.value}`;
          li.append(inv);
        }
        return li;
      }),
    );
  };

  document.querySelectorAll<HTMLButtonElement>("[data-cs-pick]").forEach((btn) => {
    const key = btn.dataset.csPick ?? "";
    btn.addEventListener("click", () => {
      const on = !picks.has(key);
      if (on) picks.add(key); else picks.delete(key);
      btn.setAttribute("aria-pressed", String(on));
      const label = btn.querySelector(".csc-pick-t");
      if (label) label.textContent = on ? PICK_COPY.labelOn : PICK_COPY.label;
      paint();
    });
  });

  /* Two gates on the sticky bar, both set by the observers below.
     - actSeen: the real Send button is on screen, so a sticky one would be a
       second live copy of it.
     - inView: the survey itself is on screen. Without this the bar followed
       the visitor down the FAQ and back up to the hero, still offering to
       send a survey they had scrolled away from. */
  let actSeen = false;
  let inView = false;

  const paint = () => {
    groups.forEach(echo);

    const answers = read();
    /* A visitor who has only pressed "This sounds like me" has told us
       something worth sending, so the sheet must come alive for them too. */
    const any = answers.length > 0 || picks.size > 0;
    paintWho();

    /* Mark each question answered, so there is feedback at the question and
       not only in the summary at the bottom. */
    groups.forEach((g) =>
      g.classList.toggle("is-done", !!g.querySelector("input:checked")),
    );

    if (done) done.textContent = String(answers.length);
    if (fill) fill.style.setProperty("--wn-p", String(answers.length / groups.length));
    if (bar) bar.hidden = !any || actSeen || !inView;

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

  /** The plain-text body Michael reads. Same shape whether it is mailed or posted.
   *
   *  His note: "I also need to see all information about Priya to know who
   *  we are talking about in my printout, along with everything they say.
   *  Please differentiate the text so that I know they didn't write that
   *  about themselves, but said they were close to Priya."
   *
   *  So the people come first and in full, under a heading that says whose
   *  words they are, and the visitor's own typing is fenced off under its
   *  own heading. Nothing is abbreviated — a printout he cannot read without
   *  the website open beside it is the thing he is complaining about. */
  const summary = (): string => {
    const M = PICK_COPY.mail;
    const out: string[] = [];

    const people = pickedPeople();
    if (people.length) {
      out.push(`${M.peopleHead}\n${M.peopleNote}`);
      people.forEach((p) => {
        const bits = [
          `--- ${p.name} ---`,
          `${M.said}: "${p.said}"`,
          `${M.tagline}: ${p.tagline}`,
          `${M.story}:\n  ${p.body}`,
          `${M.work}:\n${p.work.map((w) => `  - ${w}`).join("\n")}`,
        ];
        if (p.investment) bits.push(`${p.investment.label}: ${p.investment.value}`);
        out.push(bits.join("\n"));
      });
    }

    const answers = read();
    if (answers.length) {
      out.push(M.answersHead);
      answers.forEach((a) => out.push(`${a.q}\n  ${a.values.join(", ")}`));
    }

    const note = text?.value.trim();
    out.push(`${M.ownHead}\n${M.ownNote}\n\n${note || M.none}`);

    return out.join("\n\n");
  };

  /* No IntersectionObserver (an old browser, a test harness) leaves inView
     false, so the bar simply never appears. The sheet still works without
     it; a bar stuck to the bottom of an unrelated section would not. */
  const section = form.closest("section");
  if ("IntersectionObserver" in window) {
    if (act) {
      new IntersectionObserver(
        (entries) => {
          actSeen = entries[0].isIntersecting;
          paint();
        },
        { rootMargin: "0px 0px -40px 0px" },
      ).observe(act);
    }
    if (section) {
      new IntersectionObserver(
        (entries) => {
          inView = entries[0].isIntersecting;
          paint();
        },
        { rootMargin: "-10% 0px -10% 0px" },
      ).observe(section);
    }
  }

  form.addEventListener("change", paint);
  form.addEventListener("input", (e) => {
    if (e.target === text) paint();
  });

  clear?.addEventListener("click", () => {
    form.reset();
    picks.clear();
    document.querySelectorAll<HTMLButtonElement>("[data-cs-pick]").forEach((b) => {
      b.setAttribute("aria-pressed", "false");
      const l = b.querySelector(".csc-pick-t");
      if (l) l.textContent = PICK_COPY.label;
    });
    paint();
    form.querySelector<HTMLElement>(".wn-instruct")?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!read().length && !picks.size) return;

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
          /* Full records, not just names: whatever stores this has to be
             able to show Michael who Priya is without the site open. The
             flag says plainly that HSG wrote these, not the visitor. */
          soundsLikeThem: pickedPeople().map((p) => ({ ...p, writtenBy: "Hiring Solutions Group" })),
          why: text?.value.trim() ?? "",
          summary: summary(),
        }),
      });
      return;
    }

    const base = form.dataset.wnMail ?? "mailto:";
    window.location.href = `${base}&body=${encodeURIComponent(summary())}`;
  });

  paint();
}
