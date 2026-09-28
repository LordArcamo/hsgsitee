/* ============================================================
   THE CAREER-NEEDS CONTINUUM — /find-a-job/

   Source: Career_Solutions_Continuum_Handoff_v2.pdf. Every word of the four
   stories, the labels and the five questions is that document's, unchanged.

   FIVE THINGS TO KNOW BEFORE EDITING

   1. NICOLE IS NOT THE EXPENSIVE ONE. She sits off the line, in her own
      card, because her problem was access and advocacy rather than more
      coaching — and because she cost the candidate nothing. The handoff
      says this twice; the layout has to keep saying it.

   2. It is not a price ladder. Prices live inside an opened story and
      nowhere else, and they are an "approximate investment", never a cost.

   3. DISCLAIMER carries two sentences, and the second one matters: Rachel's
      $200,000, David's three-times and Nicole's millionaire status are real
      outcomes, not promises. It renders beside the stories, not in a
      footnote.

   4. The three markers are drawn identically and the line is flat. The
      employer continuum descends; this one does not, because a career-needs
      continuum is a range of problems, not a depth.

   5. `prefill` exists only where the mapping is real. Clicking Adam or
      Rachel answers question 2 for the visitor; David and Nicole have no
      honest match in those five options, so clicking them answers nothing.
      Do not invent one to make the feature look complete.
   ============================================================ */

export const SECTION = {
  eyebrow: "Career Solutions",
  title: "Which of These Sounds Most Like You?",
  lede: "Different career problems need different solutions. The goal is not to sell you a package — it is to understand where you are and what would actually move you forward.",
  intro:
    "Career problems rarely arrive in neat packages. Some people need a stronger way into the market. Some need help breaking through a barrier. Others discover that the right next step is not another job at all. Career Solutions starts by understanding where you are — then building the right level of support around you.",
  railLabel: "A career-needs continuum",
};

export const DISCLAIMER =
  "Names and certain identifying details have been changed to protect client confidentiality. Individual results are examples and are not guarantees of future outcomes.";

export interface CareerStory {
  key: string;
  name: string;
  /** The line on the marker — the handoff says use these exactly. */
  said: string;
  /** The line under the marker. */
  tagline: string;
  body: string;
  work: string[];
  /** Label and figure kept apart so Nicole can say "Candidate cost". */
  investment: { label: string; value: string };
  /** Index of the option in SELF_CHECK.questions[1] this story answers. */
  prefill?: number;
}

export const STORIES: CareerStory[] = [
  {
    key: "adam",
    name: "Adam",
    said: "I need a better opportunity.",
    tagline: "Great potential. Wrong first stop.",
    body: "Adam earned a bachelor’s degree in Mechanical Engineering from a strong school and entered the workforce with solid internships and a reputation as a hard worker. Two years later, he realized his first employer had not delivered on many of the promises that brought him there. We spoke with teammates who remembered accomplishments Adam had barely thought worth mentioning, rebuilt his resume and LinkedIn profile, explored stronger employers and markets, and prepared him through role-playing with both HR and another Mechanical Engineer. After candid feedback from an early interview, we coached him on how to discuss a difficult employer without sounding negative. He returned for additional rounds and was hired.",
    work: [
      "Resume + LinkedIn strategy",
      "Career roadmapping and target-company strategy",
      "HR + Mechanical Engineering interview role-play",
      "Professional advocacy and follow-up",
    ],
    investment: { label: "Approximate investment", value: "$1,200" },
    prefill: 0, // Getting interviews
  },
  {
    key: "rachel",
    name: "Rachel",
    said: "I know I am capable of more. What is holding me back?",
    tagline: "Experienced. Capable. Passed over.",
    body: "Rachel had 12 years of marketing experience but had been passed over for management at two different companies. The recurring concerns were persuasion and presentation. Rather than simply rewrite her resume, we paired her with a senior marketing professional we had previously placed and brought in our Organizational Psychologist to work on the deeper barriers behind her presentation style. Rachel connected some of her hesitation to long-standing beliefs about herself, then practiced repeatedly until the way she presented finally matched the level at which she was capable of performing. She later moved into a much stronger position and is now earning close to $200,000 annually, compared with a previous high of roughly $125,000 including bonuses.",
    work: [
      "Executive coaching",
      "Presentation and persuasion development",
      "Organizational psychology support",
      "Repeated interview practice",
    ],
    investment: { label: "Approximate investment", value: "$5,700 over 6 months" },
    prefill: 3, // Confidence / presentation
  },
  {
    key: "david",
    name: "David",
    said: "Maybe another job is not the answer.",
    tagline: "Successful on paper. Ready for a different future.",
    body: "David was a strong performer, loyal employee, devoted husband and father — and someone who had spent years choosing the safe, familiar road. He knew his work inside and out, but bigger aspirations had been buried beneath years of messages telling him not to take risks. Our work became less about finding David another job and more about testing whether he should build something of his own. Over eight months we worked with him intensively, including repeated coaching, 14 different presentation situations, positioning work and real-world conversations designed to stretch him. We believed strongly enough in the opportunity that we even offered to help finance the business. He ultimately launched. For three consecutive years, his average earnings have been about three times what he previously made.",
    work: [
      "Career reinvention and business exploration",
      "Intensive role-playing and presentation work",
      "Resume and professional positioning",
      "Ongoing coaching and accountability",
    ],
    investment: { label: "Approximate investment", value: "$13,000 over 8 months" },
  },
];

/* Off the line, in her own card. Read note 1 at the top of this file before
   moving her onto it. */
export const NICOLE: CareerStory & { kicker: string; note: string } = {
  key: "nicole",
  name: "Nicole",
  kicker: "A different situation",
  said: "I already know what I can do. I need the right room.",
  tagline: "Already exceptional. She needed the right room.",
  note: "Not a higher-priced package. A different kind of career problem.",
  body: "Nicole was the kind of professional who could succeed almost anywhere, but for years she struggled to gain access to the circles where the biggest opportunities were being decided. Her challenge was not capability. It was access, fit and advocacy. Through trusted relationships, we connected her with a client whose needs genuinely matched her background, vetted the fit on both sides and helped support the process. The opportunity included meaningful equity with strong protections. Nicole went on to achieve her greatest professional success and became our first candidate to reach millionaire status. Because the opportunity developed through an employer engagement, the client covered the career-side costs.",
  work: [
    "Strategic introduction to the right employer",
    "Private vetting through trusted relationships",
    "Opportunity and equity positioning",
    "Full support through the process",
  ],
  investment: { label: "Candidate cost", value: "$0 — client covered the engagement" },
};

/* ---------- Where are you right now? ----------
   The handoff's five questions, verbatim. On the WordPress homepage these
   should drive the five-step form your developer already built rather than
   sit beside it; here there is no such form on the page, so this is it. */
export const SELF_CHECK = {
  title: "Where Are You Right Now?",
  lede: "You do not need to know what service you need. That is our job. Start by telling us where you are, and we will help you think through what would actually move you forward.",
  micro:
    "You do not need to fit one of these stories exactly. Most careers do not. The point is to help us understand which part sounds familiar.",
  questions: [
    {
      q: "Where are you now?",
      options: ["Happy where I am", "Open to the right move", "Actively looking", "Between roles"],
    },
    {
      q: "What is getting in your way?",
      options: [
        "Getting interviews",
        "Advancing once I interview",
        "Moving into leadership",
        "Confidence / presentation",
        "I am not sure",
      ],
    },
    {
      q: "Where do you actually want to go?",
      options: [
        "Better company",
        "Bigger role",
        "New industry / function",
        "Ownership / consulting",
        "Help me figure it out",
      ],
    },
    {
      q: "What kind of help would matter most right now?",
      options: [
        "Resume / LinkedIn",
        "Search and access",
        "Interviewing / presentation",
        "Deeper coaching / assessment",
        "A full career roadmap",
      ],
    },
    {
      q: "When would you ideally make a move?",
      options: ["Now", "Next 3–6 months", "Within a year", "No deadline — planning ahead"],
    },
  ],
  /* The handoff is explicit: never "Buy a Package" or "Choose a Plan". */
  ctaPrimary: { label: "Answer 5 Quick Questions", href: "#where-now" },
  ctaSecondary: { label: "Talk Through My Situation", href: "#talk" },
};
