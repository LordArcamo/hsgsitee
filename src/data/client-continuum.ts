/* ============================================================
   THE CLIENT CONTINUUM — /find-talent/

   The employer mirror of the Career Solutions continuum. Source: the
   ChatGPT working session, which is where this copy was finalised — the
   handoff document set (.docx/.png/.pdf) that exists for the career side
   was never generated for this one.

   Michael's own material is underneath every story: the General Tools
   engagement, the 14 → 9 → 37 SKU turnaround, the anonymous-feedback
   findings, the 2½-hour minimum.

   FOUR THINGS TO KNOW BEFORE EDITING

   1. The company names are pseudonyms. The stories are real and the
      identifying details are changed, which is why DISCLAIMER sits inside
      the section and not in a footnote. There are deliberately no logos:
      a logo asserts that a specific business exists and was a client. A
      two-letter monogram labels the story without making that claim.

   2. It is NOT a price ladder. The career side shows an approximate
      investment per story; Michael asked for engagement level instead here.
      Nothing in this file carries a number that could be read as a price,
      and the markers are drawn the same size for the same reason.

   3. "Anchor Hire" and "Zeroed-In Recruiting" appear nowhere on the live
      site, on staging, or anywhere else in this build. They become HSG's
      published language the day this ships. Michael should confirm both.
      No ® on either — Collaborative Search® is the registered one.

   4. Atlas is the fourth point on the line AND a different kind of case.
      It keeps its own heading ("And sometimes…") so the shift from a
      hiring problem to a business problem is visible.
   ============================================================ */

export const SECTION = {
  eyebrow: "The Client Continuum",
  title: "The Position May Be the Same. The Problem Behind It May Be Very Different.",
  lede: [
    "Some companies know exactly who they need.",
    "Others have hired the position before — but the people don’t stay.",
    "Sometimes one key hire needs to stabilize a department, take ownership of an important project, or change the direction of a business.",
    "And sometimes, after we begin asking questions, we discover that recruiting is only one piece of the solution.",
  ],
  /** Set apart: it is the section's actual argument. */
  turn: "That’s why we don’t start by sending resumes. We start by understanding the company.",
  railHeading: "Where Is Your Company Right Now?",
};

export interface ClientStory {
  key: string;
  /** Two letters. Stands in for a logo without claiming the company exists. */
  monogram: string;
  company: string;
  /** What the client says when they call. */
  said: string;
  /** The marker on the rail. */
  marker: string;
  /** The marker's one-line answer. */
  answer: string;
  /** Short lines that set the scene, before the prose. */
  conditions?: string[];
  body: string[];
  /** A line the panel sets apart. */
  pull?: string;
  /** Prose that follows the pull quote. */
  after?: string[];
  /** Shown as its own panel — the thing competitors cannot do. */
  callout?: { label: string; body: string };
  engagement: string[];
  /** Atlas only: its own heading, because it is a different kind of case. */
  aside?: { kicker: string; title: string };
}

export const STORIES: ClientStory[] = [
  {
    key: "parker",
    monogram: "PI",
    company: "Parker Industries",
    said: "We know exactly who we need.",
    marker: "We know who we need",
    answer: "Find the right person.",
    conditions: [
      "The department is established.",
      "The position is clearly defined.",
      "Management agrees on what success looks like.",
      "Compensation is competitive.",
      "Everyone involved in the hiring process supports the goal of finding the strongest person for the position.",
    ],
    body: [
      "This is recruiting at its cleanest. Our job is to deeply understand the company, the department, the manager and the position — and then identify candidates who truly match what the organization is trying to accomplish.",
      "Even here, we don’t believe a 5- or 15-minute candidate screening is enough. Our candidate evaluation process can include multiple conversations, meetings, reference verification, discussions with references, interview preparation and continued interaction with both candidate and client.",
    ],
    pull: "We don’t want to know only whether someone can do the job. We want to understand whether this is likely to be the right job, company and environment for that person.",
    engagement: [
      "Collaborative Search",
      "Candidate Evaluation",
      "Reference Verification",
      "Interview Coordination",
      "Post-Hire Support",
    ],
  },
  {
    key: "meridian",
    monogram: "MM",
    company: "Meridian Manufacturing",
    said: "We can hire people. We just can’t seem to keep them.",
    marker: "We’ve hired before, but they don’t stay",
    answer: "Find out what’s really happening.",
    body: [
      "The company has filled the position before. Sometimes several times.",
      "The new employee looked great during the interview. Then something happened. They resigned. They stopped performing. The manager became frustrated. Projects stalled. The department fell behind. And everyone went back to recruiting again.",
      "When this happens repeatedly, the answer may not be another pile of resumes. We start asking questions.",
      "Sometimes candidates and former employees tell us things the company hasn’t heard. Perhaps compensation changed after someone joined. Perhaps a promised benefit never materialized. Maybe the responsibilities shifted dramatically from the position originally presented. Maybe Sales changed the commission structure and Human Resources never knew. Maybe employees were prevented from having proper exit conversations. Or perhaps a company loved hearing a candidate’s ideas during the interview — but once hired, wasn’t willing to let that person actually implement them.",
      "Those details matter.",
    ],
    pull: "Why does this position keep becoming vacant?",
    after: ["Sometimes the recruiting solution becomes much clearer once that question is answered."],
    callout: {
      label: "Confidential feedback",
      body: "When appropriate, we gather feedback confidentially and look for patterns. We don’t identify individual sources or turn the process into finger-pointing.",
    },
    engagement: [
      "Collaborative Search",
      "Confidential Market Feedback",
      "Compensation Review",
      "Role Clarification",
      "Management Discussions",
      "Retention Analysis",
      "Extended Post-Hire Support",
    ],
  },
  {
    key: "summit",
    monogram: "SP",
    company: "Summit Products",
    said: "We don’t just need another employee. We need this person to change something.",
    marker: "This person needs to own something important",
    answer: "Find the Anchor.",
    conditions: [
      "A stalled project.",
      "A new department.",
      "A troubled sales territory.",
      "A product line.",
      "A manufacturing challenge.",
      "A new market.",
      "A turnaround.",
    ],
    body: [
      "Sometimes the person being hired isn’t simply filling an empty chair. They’re being brought in to own something important. We often refer to this person as an Anchor Hire.",
      "That changes the search. We need to understand not only the technical qualifications but also what authority the person will have, what resources are available, how success will be measured and whether the organization is prepared to support the change it’s hiring this person to create.",
      "Sometimes we even create controlled projects or real-world exercises so that both sides can see how someone actually operates. Depending upon the position, this can include onsite work, spontaneous check-ins and practical demonstrations designed to reduce the chances of hiring someone who interviews beautifully but cannot perform when the work begins.",
    ],
    pull: "Because when an important project depends upon one person, finding somebody who merely “looks good” isn’t good enough.",
    engagement: [
      "Targeted Search",
      "Zeroed-In Recruiting",
      "Project-Based Evaluation",
      "Leadership Assessment",
      "Compensation Analysis",
      "Management Alignment",
      "Extended Warranty Options",
    ],
  },
  {
    key: "atlas",
    monogram: "AC",
    company: "Atlas Consumer Products",
    said: "We were losing ground. We needed somebody who had solved this before.",
    marker: "The business itself needs to move",
    answer: "Sometimes recruiting and strategy become one conversation.",
    aside: { kicker: "And sometimes…", title: "The Hiring Problem Is Really a Business Problem." },
    body: [
      "This company had watched major retailers reduce its presence SKU after SKU. Competition from overseas manufacturing, online sellers and major national players was changing the economics of the business.",
      "At one point, its presence with an important big-box customer had declined from approximately 14 SKUs to 9. Anyone who sells through major retailers understands what that can mean.",
      "The answer wasn’t simply: “Find us another salesperson.” The company needed a different strategy. One major opportunity involved establishing stronger development and shipping capabilities in China.",
      "So instead of searching for someone who might know how to do it, we searched for someone who had already done it. The engagement ultimately combined resources from Hiring Solutions Group and our sister company, Business Solutions Group.",
      "Talent strategy became business strategy. Business strategy affected the type of talent we needed. And the company built an all-fronts plan around both.",
    ],
    /* The one number in the section, and it is an outcome, not a price. */
    callout: {
      label: "The result",
      body: "From approximately 14 SKUs… down to 9… and ultimately up to 37.",
    },
    pull: "Sometimes the right hire fills a position. Sometimes the right person helps change the trajectory of the company.",
    engagement: [
      "Executive Search",
      "Industry Targeting",
      "Business Strategy",
      "International Operations",
      "Competitive Analysis",
      "Leadership Development",
      "HSG + BSG Collaboration",
    ],
  },
];

export const DISCLAIMER =
  "Company names and certain identifying details have been changed to protect client confidentiality.";

/* ---------- Before we recruit, we learn ---------- */
export const LEARN = {
  title: "Before We Recruit, We Learn.",
  body: [
    "Many recruiting firms begin with a resume database. Our process begins with people.",
    "We want to understand the owner. The manager. The department. The people who will work beside the new hire. The reason the position exists. What happened to the last person. And what has to be different this time.",
    "We also don’t believe that a 5- or 15-minute candidate conversation tells us enough to recommend someone to a client.",
  ],
  /* The figure that answers the competitor who sends people over after a
     fifteen-minute call. Nowhere on the site today. */
  stat: {
    value: "2½ hours",
    label: "minimum, per candidate we seriously represent",
    body: "Across our process, we spend no less than approximately 2½ hours evaluating and interacting with the candidates we seriously represent, and often considerably more depending upon the search. That can include interviews, multiple conversations, reference verification, direct conversations with references, meetings with our team, client interviews and specialized evaluation when appropriate.",
  },
  /* Three lines, set as three lines — the rhythm is the point. */
  creed: ["We don’t guess.", "We get to know both sides.", "Then we match."],
};

/* ---------- Where is your company? ----------
   Five questions, five clicks. No email, no score, no diagnosis: an owner
   will not fill in a survey that says his company has a problem, but he
   will click the line that sounds like him and draw his own conclusion. */
export const SELF_CHECK = {
  title: "Where Is Your Company?",
  lede: ["You don’t need to complete a 30-question assessment.", "Start with five simple questions."],
  questions: [
    {
      q: "Is everyone involved in the hire clear about what this person needs to accomplish?",
      options: ["Yes", "Mostly", "Not completely"],
    },
    {
      q: "Have you successfully hired this position before?",
      options: ["Yes — and the person stayed", "Yes — but we’ve had turnover", "No — this is new for us"],
    },
    {
      q: "Is the challenge primarily finding candidates — or getting the right candidate to accept, succeed and stay?",
      options: ["Finding them", "Getting them interested", "Keeping them", "We’re not completely sure"],
    },
    {
      q: "Will this person simply perform an established role — or are you expecting them to change something?",
      options: ["Established position", "Improve a department", "Own a major project", "Build something new"],
    },
    {
      q: "Is this hire connected to a larger business issue?",
      options: [
        "No — we simply need the right person",
        "Possibly",
        "Growth or expansion",
        "Turnover or management issues",
        "New department or product",
        "Competitive pressure",
        "Confidential replacement",
        "Acquisition or major business change",
      ],
    },
  ],
};

/* ---------- closing ---------- */
export const CLOSING = {
  title: "You Don’t Have to Know Which Recruiting Program You Need.",
  lede: "That’s part of our job.",
  body: [
    "Sometimes the answer is a straightforward search. Sometimes it’s a deeper collaborative search. Sometimes we need to understand why previous hires haven’t worked. And occasionally the conversation begins with recruiting and leads somewhere neither of us expected.",
  ],
  turn: "Tell us what you’re trying to accomplish. We’ll start there.",
  cta: { label: "Tell Us What You’re Trying to Accomplish", href: "#start" },
};
