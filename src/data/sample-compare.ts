/* ============================================================
   COMPARE THE PROFESSIONALS — the section's copy

   Three sources, newest wins:

     SPEC   — the written corrections of 25 Sep 2026, which are the most
              recent instruction and override everything below them.
     VOICE  — Michael's voice note and sketch of the same day.
     DRAFT  — written here. These are the lines to review first.

   THE CORRECTIONS REVERSED TWO THINGS THE VOICE NOTE ASKED FOR. They were
   reversed deliberately ("unless new client instructions specifically
   override it"), so do not put them back:

   1. The voice note said the employer BECOMES the purple squirrel, with an
      award on the wall behind. The corrections say the opposite: "do not
      use an award medal or imply that the client becomes the Purple
      Squirrel". The squirrel is the candidate again, and the medal is
      gone. Headline and supporting copy below are theirs, word for word.
   2. The voice note's sketch gave Robert 0 years of management experience,
      so the column read 3 2 1 0 0 0. The corrections set him to 4. See
      data/role-groups.ts.

   TWO THINGS THE VOICE NOTE ASKED FOR STILL STAND, because the corrections
   restate them rather than contradict them:

   3. The annotations are RED, not brand purple — "keep these two columns
      highlighted together in red".
   4. BOTH columns are the employer's to choose, not just the new one —
      "do not treat Management Experience as the only customizable field".
   ============================================================ */

export const SAMPLE_COPY = {
  /* ---------- the section, always visible ---------- */

  /** DRAFT — from the design mockup. */
  eyebrow: "Compare Talent",

  /** DRAFT — from the design mockup. */
  lede: "Get a clear, side-by-side view of top candidates. Quickly compare experience, skills, education and more — all in one place.",

  /** DRAFT — from the design mockup. */
  tailoredKicker: "Tailored for you",

  /** VOICE — "Tell us, tell us what you need to know." */
  tailoredTitle: "Tell us what you need to know.",

  /** DRAFT — from the design mockup. */
  tailoredBody: "We customize this comparison around your hiring needs.",

  /* ---------- the toggle ---------- */

  /** SPEC — "Keep: See what others chose →". */
  openLabel: "See what others chose",

  /** SPEC — "change the button state to something simple such as". */
  closeLabel: "Hide custom example",

  /* ---------- the sample ---------- */

  /** DRAFT — from the design mockup. */
  sampleTag: "Sample chart",

  /** DRAFT — from the design mockup. */
  sampleBadge: "Customizable example",

  /**
   * DRAFT — says plainly whose report this is. Without it the sample reads
   * as the employer's own result, and the extra column looks like data we
   * hold on these six.
   */
  intro: (role: string) =>
    `A sample: the same comparison for ${role}, with the columns another employer asked us to add.`,

  /** SPEC — "OPTIONAL COLUMNS — YOU CHOOSE". Uppercased by the stylesheet. */
  calloutKicker: "Optional columns — you choose",

  /** SPEC — "Tell us what's important to you." */
  calloutTitle: "Tell us what's important to you.",

  /** SPEC — the corrections' replacement wording, verbatim. */
  calloutBody:
    "Choose the two criteria that matter most to your hiring decision, and we'll customize the comparison around them.",

  /** VOICE — the label the sketch's arrows carry down onto each column. */
  columnTag: "You choose",

  /**
   * SPEC — "if needed, add a smaller note directly above the columns".
   * Directly above, not below: "do not leave the explanation floating far
   * below the table".
   */
  columnNote: "Example criteria chosen by a client",

  /* ---------- the payoff ---------- */

  /** SPEC — "use a headline such as: Uncover the Purple Squirrel". */
  payoffTitle: "Uncover the Purple Squirrel",

  /** SPEC — the corrections' supporting copy, verbatim. */
  payoffBody:
    "Choose the criteria that matter most, and the right candidate may become easier to see.",
};
