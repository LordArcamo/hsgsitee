/* ============================================================
   "SEE WHAT OTHERS CHOSE" — copy for the sample comparison

   From Michael's voice note and sketch of 25 Sep 2026.

   Source tags, as used in src/data/hiring.ts:
     SPEC  — Michael's own words, transcribed from the voice note or
             lettered on the sketch. Change these only with him.
     DRAFT — written here to join his words together. He did not supply
             wording for these, so they are the ones to review first.

   The point of the whole block is his closing question: "How do we let
   them know they'll become successful as a result of using this service?"
   The answer the sketch gives is the purple squirrel — normally the
   impossible-to-find candidate, here the HR manager who found one.
   ============================================================ */

export const SAMPLE_COPY = {
  /** SPEC — "see some samples of what some other people chose". */
  openLabel: "See what others chose",

  /** DRAFT — the way back to their own report. */
  closeLabel: "Back to your comparison",

  /**
   * DRAFT — says plainly whose report this is. Without it the sample reads
   * as the employer's own result, and the extra column looks like data we
   * hold on these six.
   */
  intro: (role: string) =>
    `A sample: the same comparison for ${role}, with the columns another employer asked us to add.`,

  /** SPEC — "maybe you can even write that above that: let us know what's important to you." */
  calloutTitle: "Let us know what's important to you.",

  /** SPEC — lettered on the sketch, in red: "Optional columns, you choose!" */
  calloutKicker: "Optional columns — you choose",

  /**
   * SPEC — "these two columns are for you to tell us what you need, so that
   * we can create the best Compare the Professionals for you."
   */
  calloutBody:
    "These two columns are for you to tell us what you need, so that we can create the best Compare the Professionals for you.",

  /** SPEC — the label the sketch's arrows carry down onto each column. */
  columnTag: "You choose",

  /** SPEC — the arrow chain along the bottom of the sketch. */
  chain: ["If you choose…", "Maybe you become…"] as const,

  /** SPEC — "the purple squirrel of HR". */
  payoffTitle: "The Purple Squirrel of HR",

  /**
   * DRAFT — the sketch draws this rather than writing it: the squirrel at
   * the desk with the award behind it. Michael's intent, in his words, was
   * "you'll become successful as a result of using this service".
   */
  payoffBody:
    "Tell us what matters to you and we will build the comparison around it — so the shortlist you walk into the room with is the one that makes you look right.",
};
