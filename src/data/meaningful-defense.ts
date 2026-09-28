/* ============================================================
   MEANINGFUL DEFENSE — the payoff of the funnel on /find-talent/

   Michael's note on the funnel section: "this is what everyone does. To
   make it meaningful you need to show comparison of 3 candidates and
   conversations to follow. We are not just dropping paper."

   He is right, and he had already written the answer himself. Every line of
   framing below is verbatim from Client_Solutions_Questions_Handoff_Full.pdf
   — questions 4 and 10 — where "Meaningful Defense" is named and the
   argument is made. Nothing here is written for him:

     "Anyone can forward paper."
     "We would rather send fewer candidates and be able to provide what we
      call a Meaningful Defense of why each one deserves your time."
     "We don't gamble with our clients' time."
     "We're not in the paper-moving business. We're in the matching
      business."

   THE THREE PROFILES ARE THE FICTIONAL FINALISTS ALREADY IN candidates.ts
   (ids 48, 49, 50). They are not duplicated here — role, scope, strength
   and watch-point are read from that file so the funnel and the comparison
   can never disagree. Only what is genuinely new is written here.

   DEFENSE AND CONVERSATIONS ARE DRAFT. They are demonstration copy in the
   register of the rest of candidates.ts, built from the methods question 4
   actually names — reference verification, direct conversations with
   references, vetting the credibility of the person vouching, technical
   specialists, observing other interviews. Replace them with real language
   from a real search when Michael has one he is willing to publish.
   The section carries the illustrative note either way.

   "Meaningful Defense" is published nowhere on the live site or on staging.
   It ships here and on /questions-to-ask-an-executive-recruiter/ at the
   same time, so Michael only has to approve the term once.
   ============================================================ */

/** Keyed by the candidate id in candidates.ts. */
export interface Defense {
  /** Why this profile is in front of the client at all. DRAFT. */
  why: string;
  /** Who HSG actually spoke to, and what it changed. DRAFT. */
  conversations: string[];
}

export const DEFENSES: Record<number, Defense> = {
  48: {
    why: "Has done the harder version of this job twice — stood up new sites without letting the existing business slip. The scope on paper is close; the evidence behind it is not.",
    conversations: [
      "Two former direct reports, reached through our own network rather than the list provided.",
      "The CFO who signed off both site builds, who confirmed the numbers and the timeline.",
      "A supplier who worked through the second launch and described how decisions were made under pressure.",
    ],
  },
  49: {
    why: "The growth figure is real and we verified it with someone who was there for it. Worth your time even at the top of the range, because the range moved for a reason.",
    conversations: [
      "The board member who approved the compensation, on what the increase was actually paid for.",
      "Two peers from the same period, on how much of the growth was the market and how much was the operator.",
      "A direct report who left mid-way, which is the conversation most references never include.",
    ],
  },
  50: {
    why: "The only one of the three who has repeatedly built the people who replaced him. If this hire is meant to leave a department stronger than it was, that record matters more than the two extra years he does not have.",
    conversations: [
      "Three of the four people he developed into general management, each now at a different company.",
      "His current manager, on what he would need in order to step up again.",
      "A regulatory lead, brought in by us because we are not the technical expert in that room.",
    ],
  },
};

/* ---------- section copy ---------- */
export const DEFENSE_COPY = {
  /** LIVE — question 10, verbatim. */
  kicker: "Anyone can forward paper.",
  /** LIVE — question 4, verbatim. */
  lede: "We would rather send fewer candidates and be able to provide what we call a Meaningful Defense of why each one deserves your time. We don’t gamble with our clients’ time.",
  compareHeading: "The three who are left, and what we can tell you about each",
  whyLabel: "Why this one is in front of you",
  conversationsLabel: "The conversations behind it",
  strengthLabel: "Strength",
  watchLabel: "Worth knowing",
};

/* ---------- the conversations that follow ----------
   Michael's "conversations to follow". Each is question 4 or question 10 of
   the handoff, shortened only where a sentence ran past what a card can
   hold. LIVE. */
export const CONVERSATIONS = {
  eyebrow: "What Happens After the Shortlist",
  title: "The Reference Behind the Reference.",
  lede: "A reference responding to a stranger may give a polite answer. A reference speaking with someone whose reputation or relationships they respect often has a very different conversation.",
  items: [
    {
      title: "We vet the voucher, not only the candidate",
      body: "Through our recruiting network and relationships built over decades, we can sometimes vet not only the candidate — but the credibility of the person vouching for the candidate.",
    },
    {
      title: "We bring in the expert when we are not one",
      body: "In highly technical searches we use what we call our fly-on-the-wall approach. If we’re not the technical expert in the room, we listen while people who are talk shop.",
    },
    {
      title: "We involve the people who will work beside the hire",
      body: "Not only the owner. Not only HR. The people on the floor, in the department, beside the desk often understand aspects of the position that aren’t written anywhere.",
    },
    {
      title: "We cross-check what we are told",
      body: "Repeated coordinated interactions, in-person assessments, customized testing and cross-checking of information gathered at different stages.",
    },
  ],
  /** LIVE — question 10's closing line, and the answer to "we are not just
      dropping paper". */
  close: ["We’re not in the paper-moving business.", "We’re in the matching business."],
  cta: { label: "Ask Us the Tough Questions", href: "/questions-to-ask-an-executive-recruiter/" },
};
