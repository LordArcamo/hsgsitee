/* ============================================================
   COMPARE THE PROFESSIONALS — the section's copy

   Two sources, and where they disagree the voice note wins. That was the
   instruction: "please follow what in the message."

     SPEC   — Michael's voice note and sketch, 25 Sep 2026.
     DRAFT  — everything else. Most of it comes from the design mockup of
              the same date; the rest was written here to join his words
              together. These are the lines to review first.

   FOUR PLACES THE MOCKUP DISAGREES WITH HIM, ALL RESOLVED HIS WAY:

   1. The mockup says "You may uncover the purple squirrel" — the candidate
      is the rare find, which is the conventional industry meaning. He said
      "maybe you become … the purple squirrel of HR": the HR manager is the
      rare find, which is why he drew an award on the wall. Kept his.
   2. The mockup draws the annotations in brand purple. He asked for red,
      twice, because they are notes ABOUT the report rather than part of
      it. Kept red — see --note-red in situations.css.
   3. The mockup gives Robert 4 years of management experience. The sketch
      is 3 2 1 0 0 0, "the first three people have experience, the second
      three don't". Kept the sketch — see data/role-groups.ts.
   4. The mockup's three steps read left to right but its arrows point
      left. The chain here runs left to right, ending at the squirrel.
   ============================================================ */

export const SAMPLE_COPY = {
  /* ---------- the section, always visible ---------- */

  /** DRAFT — mockup. */
  eyebrow: "Compare Talent",

  /** DRAFT — mockup. */
  lede: "Get a clear, side-by-side view of top candidates. Quickly compare experience, skills, education and more — all in one place.",

  /** DRAFT — mockup. */
  tailoredKicker: "Tailored for you",

  /** SPEC — "Tell us, tell us what you need to know." */
  tailoredTitle: "Tell us what you need to know.",

  /**
   * DRAFT — mockup, and close to his "we're going to customize this for
   * you. We're going to make something that's so special".
   */
  tailoredBody: "We customize this comparison around your hiring needs.",

  /* ---------- the toggle ---------- */

  /** SPEC — "see some samples of what some other people chose". */
  openLabel: "See what others chose",

  /** DRAFT — the way back to their own report. */
  closeLabel: "Back to your comparison",

  /* ---------- the sample ---------- */

  /** DRAFT — mockup. */
  sampleTag: "Sample chart",

  /** DRAFT — mockup. */
  sampleBadge: "Customizable example",

  /**
   * DRAFT — says plainly whose report this is. Without it the sample reads
   * as the employer's own result, and the extra column looks like data we
   * hold on these six.
   */
  intro: (role: string) =>
    `A sample: the same comparison for ${role}, with the columns another employer asked us to add.`,

  /** SPEC — lettered on the sketch, in red: "Optional columns, you choose!" */
  calloutKicker: "Optional columns — you choose",

  /** SPEC — "maybe you can even write that above that: let us know what's important to you." */
  calloutTitle: "Let us know what's important to you.",

  /**
   * SPEC — "these two columns are for you to tell us what you need, so that
   * we can create the best Compare the Professionals for you."
   */
  calloutBody:
    "These two columns are for you to tell us what you need, so that we can create the best Compare the Professionals for you.",

  /** SPEC — the label the sketch's arrows carry down onto each column. */
  columnTag: "You choose",

  /** DRAFT — mockup, the note under the panel. */
  columnNote: "These columns are examples of criteria chosen by the client.",

  /* ---------- the payoff ---------- */

  /**
   * SPEC — the arrow chain along the bottom of the sketch, in his words and
   * in his order. The mockup's middle step, "you may uncover the purple
   * squirrel", is the one thing he was most explicit about NOT meaning.
   */
  chain: ["If you choose…", "Maybe you become…"] as const,

  /** SPEC — "the purple squirrel of HR". */
  payoffTitle: "The Purple Squirrel of HR",

  /**
   * DRAFT — the sketch draws this rather than writing it: the squirrel at
   * the desk with the award behind it. His intent, in his words, was
   * "you'll become successful as a result of using this service".
   */
  payoffBody:
    "Tell us what matters to you and we will build the comparison around it — so the shortlist you walk into the room with is the one that makes you look right.",
};
