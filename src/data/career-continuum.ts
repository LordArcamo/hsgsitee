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

   6. THE SIX EXAMPLES CARRY NO OUTCOME AND NO PRICE, and that is the whole
      point of them. Adam, Rachel, David and Nicole are real anonymised
      clients with real results. The six are recognition examples — a
      situation to see yourself in — written to Michael's note that he
      wanted "a few more examples under Adam's category... I'll talk to
      people that'll describe things a little bit differently". Giving one
      an investment figure would turn it into a case study HSG never had.
      Every one maps to an option already in SELF_CHECK and to service copy
      already published on the live /find-a-job/ page.

      DRAFT until Michael redlines them. The lines are mine, not his.
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

/**
 * A recognition example. Deliberately has no `investment` and no outcome —
 * see note 6. Rendered under its category's lead, as a compact row.
 */
export interface CareerExample {
  key: string;
  name: string;
  /** The "sounds like me" line, shown on the row. */
  said: string;
  tagline: string;
  /** Two or three sentences. No result, no figure. */
  body: string;
  /** Services that already exist in HSG's published copy. */
  work: string[];
  /** Index of the option in SELF_CHECK.questions[1] this example answers. */
  prefill?: number;
}

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
  /** Two more ways the same problem gets described. See note 6. */
  examples?: CareerExample[];
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
    examples: [
      {
        key: "marcus",
        name: "Marcus",
        said: "I\u2019m applying and hearing nothing back.",
        tagline: "Qualified on paper. Invisible in the system.",
        body: "Three years in, applying steadily, barely a reply. His resume reads like a job description instead of a record of what he actually did \u2014 and the screening software filters it out before a person ever sees it.",
        work: ["Professional Resume Services", "Crafting an Online Presence"],
        prefill: 0, // Getting interviews
      },
      {
        key: "priya",
        name: "Priya",
        said: "I\u2019ve outgrown my first job and I don\u2019t know what I\u2019m worth.",
        tagline: "Doing more than the title says.",
        body: "She has quietly taken on work well beyond what she was hired for. Nobody wrote any of it down, including her \u2014 so when she reads a job posting she cannot tell which level she belongs at.",
        work: ["Career Roadmapping", "Resume Strategy & Development", "Compensation & Negotiation Preparation"],
      },
    ],
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
    examples: [
      {
        key: "dana",
        name: "Dana",
        said: "I keep reaching the final round and not getting the offer.",
        tagline: "Strong on paper. Something happens in the room.",
        body: "She gets interviews easily and gets close. The feedback, when it comes at all, is vague \u2014 \u201Cculture\u201D, \u201Cnot quite the right fit\u201D. Nobody has ever told her what actually goes wrong in the last conversation.",
        work: ["Simulated Interviews and Skills Practice", "Post-interview debriefing", "Vetting Your References"],
        prefill: 1, // Advancing once I interview
      },
      {
        key: "omar",
        name: "Omar",
        said: "I\u2019m the one they rely on, and someone else gets the title.",
        tagline: "Trusted with the work. Passed over for the role.",
        body: "He is who the team goes to when something breaks. When the management job opened, it went to someone with less tenure and a better story about themselves.",
        work: ["Career Coaching, Analysis & Strategy", "Presentation and persuasion development", "Networking Strategy"],
        prefill: 2, // Moving into leadership
      },
    ],
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
    examples: [
      {
        key: "elaine",
        name: "Elaine",
        said: "I\u2019m doing well and I dread Monday.",
        tagline: "Successful by every measure but one.",
        body: "Good title, good money, no complaint anyone would take seriously. What she cannot answer is whether the problem is this company or this kind of work.",
        work: ["Life & Career Deep Dive Inventory", "Career Coaching, Analysis & Strategy"],
        prefill: 4, // I am not sure
      },
      {
        key: "ray",
        name: "Ray",
        said: "People keep telling me to go out on my own. I don\u2019t know if they\u2019re right.",
        tagline: "The next step might not be a job.",
        body: "Former colleagues and clients keep asking whether he consults. He has never tested whether that is a real business or just a compliment, and he is not willing to find out by quitting first.",
        work: ["Career reinvention and business exploration", "Opportunity Evaluation"],
      },
    ],
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
   Rebuilt from Michael's call, which asks for the opposite of the written
   spec. His words: "too much space between options, use a thinner row …
   so when it's on mobile they can see more at once and check it off."

   WHAT CHANGED AND WHY

   - One scrollable sheet, not a five-step wizard. He also asked to make
     clear "whether they're making a choice or following a path" — that
     confusion is the wizard's own doing. A sheet you tick is plainly a
     choice; a numbered rail with Continue buttons is plainly a path.
   - Chips, not cards. A five-option question goes from about 410px of
     phone to about 90px, which is the "thinner row" he asked for.
   - Three questions take more than one answer. He describes people who
     "pick three things" and "check it off" — that is a checkbox, not a
     radio. Situation and timing stay single: you cannot be in two.
   - Four more questions, because he wants "a storyline to work from"
     before the lead reaches him.

   WHAT IS HIS AND WHAT IS MINE

   - The first five questions and every answer value in them are the
     original handoff's, unchanged. They are the strings a form submits.
   - Question 1's four descriptions are the written spec's, word for word.
   - THE SECOND GROUP IS DRAFT. The four questions are Michael's own from
     the call — how long you have been working, whether you like your job,
     switch field or stay, whether you liked your managers. The ANSWER
     OPTIONS under them are mine and he has not seen them. They carry
     draft: true so they are easy to redline or pull.
   - The "why" question is his, verbatim. */
export interface CheckOption {
  value: string;
  icon: string;
  /** Question 1 only — the spec wrote these. Do not invent the rest. */
  desc?: string;
}

export interface CheckQuestion {
  /** Stable key. The continuum prefills by this, never by position. */
  id: string;
  q: string;
  /** "one" renders radios, "any" renders checkboxes. */
  pick: "one" | "any";
  options: CheckOption[];
}

export interface CheckGroup {
  label: string;
  /** True where the answer options are mine and Michael has not seen them. */
  draft?: boolean;
  questions: CheckQuestion[];
}

const GROUPS: CheckGroup[] = [
  {
    label: "Where you are",
    questions: [
      {
        id: "now",
        q: "Where are you now?",
        pick: "one",
        options: [
          { value: "Happy where I am", icon: "user", desc: "I’m doing well, but I want to understand what could be next." },
          { value: "Open to the right move", icon: "briefcase", desc: "I’m not actively looking, but I’d consider the right opportunity." },
          { value: "Actively looking", icon: "search", desc: "I’m ready to make a change now." },
          { value: "Between roles", icon: "resume", desc: "I’m deciding what my next move should be." },
        ],
      },
      {
        id: "blocker",
        q: "What is getting in your way?",
        pick: "any",
        options: [
          { value: "Getting interviews", icon: "target" },
          { value: "Advancing once I interview", icon: "chart" },
          { value: "Moving into leadership", icon: "star" },
          { value: "Confidence / presentation", icon: "talk" },
          { value: "I am not sure", icon: "compass" },
        ],
      },
      {
        id: "goal",
        q: "Where do you actually want to go?",
        pick: "any",
        options: [
          { value: "Better company", icon: "building" },
          { value: "Bigger role", icon: "chart" },
          { value: "New industry / function", icon: "globe" },
          { value: "Ownership / consulting", icon: "flag" },
          { value: "Help me figure it out", icon: "compass" },
        ],
      },
      {
        id: "help",
        q: "What kind of help would matter most right now?",
        pick: "any",
        options: [
          { value: "Resume / LinkedIn", icon: "resume" },
          { value: "Search and access", icon: "network" },
          { value: "Interviewing / presentation", icon: "talk" },
          { value: "Deeper coaching / assessment", icon: "people" },
          { value: "A full career roadmap", icon: "compass" },
        ],
      },
      {
        id: "timing",
        q: "When would you ideally make a move?",
        pick: "one",
        options: [
          { value: "Now", icon: "flag" },
          { value: "Next 3–6 months", icon: "clock" },
          { value: "Within a year", icon: "calendar" },
          { value: "No deadline — planning ahead", icon: "compass" },
        ],
      },
    ],
  },
  {
    label: "A bit more about you",
    draft: true,
    questions: [
      {
        id: "years",
        q: "How long have you been working?",
        pick: "one",
        options: [
          { value: "Under 5 years", icon: "clock" },
          { value: "5–10 years", icon: "clock" },
          { value: "10–20 years", icon: "clock" },
          { value: "20+ years", icon: "clock" },
        ],
      },
      {
        id: "like-job",
        q: "Do you like your job?",
        pick: "one",
        options: [
          { value: "Yes, mostly", icon: "star" },
          { value: "Parts of it", icon: "compass" },
          { value: "Not really", icon: "target" },
          { value: "No", icon: "flag" },
        ],
      },
      {
        id: "field",
        q: "Switch field, or stay in it?",
        pick: "one",
        options: [
          { value: "Stay in my field", icon: "building" },
          { value: "Open to switching", icon: "globe" },
          { value: "I want to switch", icon: "flag" },
          { value: "Not sure yet", icon: "compass" },
        ],
      },
      {
        id: "managers",
        q: "Did you like the managers you have worked for?",
        pick: "one",
        options: [
          { value: "Mostly yes", icon: "people" },
          { value: "Mixed", icon: "compass" },
          { value: "Mostly no", icon: "target" },
          { value: "That is part of why I am here", icon: "talk" },
        ],
      },
    ],
  },
];

export const SELF_CHECK = {
  eyebrow: "Career Solutions",
  title: "Where Are You Right Now?",
  lede: "You do not need to know what service you need. That is our job. Start by telling us where you are, and we will help you think through what would actually move you forward.",
  /** Michael: "tell people what to do — choose what applies to you". */
  instruction: "Choose what applies to you",
  instructionSub: "Nothing here is required, and there are no wrong answers.",
  pickOne: "Pick one",
  pickAny: "Pick as many as apply",
  micro:
    "You do not need to fit one of these stories exactly. Most careers do not. The point is to help us understand which part sounds familiar.",
  /** His question, verbatim. Appears once something is selected. */
  why: {
    q: "Can you tell us a bit more about why you picked these?",
    hint: "A couple of sentences is plenty. This is the part that tells us who you are.",
    placeholder: "In your own words…",
  },
  recap: {
    title: "What you have told us",
    empty: "Nothing selected yet.",
  },
  send: {
    label: "Send this to Michael",
    note: "Opens your email app with the summary already written.",
    subject: "Where I am right now",
  },
  clear: "Start over",
  draftNote: "Draft — the questions are Michael’s; the answers under them are not his yet.",
  final: { label: "Talk Through My Situation", href: "#talk" },
  groups: GROUPS,
};
