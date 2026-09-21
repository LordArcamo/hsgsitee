/* ============================================================
   HIRING SOLUTIONS PAGE — /find-talent/

   The page's words, kept out of the markup so they can be replaced in one
   place when Michael's Hiring Solutions answers arrive. Every string is
   tagged with where it came from:

     SPEC   working copy from HSG_Hiring_Solutions_Final_Visual_Design_
            Page_Architecture.md — use as written
     SITE   already approved elsewhere on this site, reused here
     DRAFT  suggested for the prototype so the design reads as finished.
            Replace with Michael's copy. Drafts deliberately avoid numbers,
            timelines and claims that are not already on the site.
   ============================================================ */

/* ---------- page meta ----------
   DRAFT — the spec lists the SEO title and description as a step still to
   do. These are written to the live site's /find-talent/ intent. */
export const PAGE_META = {
  path: "/find-talent/",
  title: "Executive Search & Hiring Solutions in New Jersey | Hiring Solutions Group",
  description:
    "Find the leaders your business needs next. HSG's Collaborative Search® starts by understanding your company, then searches, evaluates, interviews and vets candidates beyond the resume.",
};

/* ---------- 01 hero ---------- */
export const HERO = {
  eyebrow: "Hiring Solutions", // SPEC
  title: "Find the Leaders Your Business Needs Next.", // SPEC
  // SITE — the homepage's Hiring Solutions lede, until the page has its own
  copy: [
    "Hiring an executive is not a resume transaction.",
    "Before HSG recommends a candidate, we work to understand the organization, its leadership, expectations, culture, challenges, and what success in the position actually requires.",
  ],
  imageNote: "Executive interview or business leadership photography.", // SPEC
};

/* ---------- 04 Collaborative Search® ----------
   The seven stages are shared with the homepage, which shows the names
   only. The page opens each one into a short explanation. */
export interface CollabStage {
  key: string;
  name: string;
  detail: string;
}

export const COLLAB_STAGES: CollabStage[] = [
  {
    key: "understand",
    name: "Understand", // SPEC
    // DRAFT — built from the homepage Hiring Solutions copy
    detail:
      "Learn the organization, its leadership, expectations, culture and challenges — and what success in the position actually requires — before the search begins.",
  },
  {
    key: "search",
    name: "Search",
    // DRAFT — from the spec's Targeted Search and Search Reach notes
    detail:
      "Reach beyond active applicants, through HSG's candidate database, recruiting partners and professional networks, to people who fit the actual opportunity.",
  },
  {
    key: "evaluate",
    name: "Evaluate",
    // DRAFT — the homepage's Candidate Assessment card
    detail:
      "Look beyond credentials at experience, leadership, communication, behavior and alignment with the role and the people around it.",
  },
  {
    key: "interview",
    name: "Interview",
    // DRAFT — homepage Collaborative Search and Forensic Interviewing copy
    detail:
      "Help prepare the interviews and, where the engagement calls for it, take part in them — looking past rehearsed answers to how someone thinks and operates.",
  },
  {
    key: "vet",
    name: "Vet",
    // DRAFT — the homepage's Private Vetting card
    detail:
      "Take reference checking further through Private Vetting, so the decision rests on more than what a candidate chose to share.",
  },
  {
    key: "decide",
    name: "Decide",
    // DRAFT — homepage Collaborative Search copy
    detail:
      "Gather feedback, compare finalists on the requirements that actually matter, and support the people making the decision.",
  },
  {
    key: "support",
    name: "Support",
    // DRAFT — the spec's onboarding line
    detail:
      "The search doesn't necessarily end when the offer is accepted. Onboarding and retention support help the right hire succeed.",
  },
];

/* ---------- 05 What Collaborative Search® evaluates ----------
   Three of the spec's five cards. Candidate Assessment lives in section 06
   and Real-World Evaluation has section 09 to itself, so neither repeats. */
export const EVALUATES = [
  {
    icon: "building",
    title: "Company Story", // SPEC
    body: "Understand what makes the organization, opportunity, leadership, and future compelling.", // SPEC
  },
  {
    icon: "talk",
    title: "Behavioral Evaluation",
    body: "Go beyond prepared interview answers to better understand how someone thinks and operates.", // SPEC
  },
  {
    icon: "flag",
    // non-breaking hyphen: a narrow card was splitting it "Long- / Term"
    title: "Onboarding & Long‑Term Support",
    body: "The search doesn't necessarily end when the offer is accepted.", // SPEC
  },
] as const;

/* ---------- 06 Why companies choose HSG ---------- */
export const BENEFITS = [
  { icon: "target", title: "Targeted Search", body: "Find people who fit the actual opportunity rather than simply generating resumes." }, // SPEC
  { icon: "clipboard", title: "Candidate Assessment", body: "Evaluate beyond credentials." }, // SPEC
  { icon: "network", title: "Access to Networks", body: "Reach beyond active applicants." }, // SPEC
  { icon: "lock", title: "Confidentiality", body: "Protect sensitive searches and conversations." }, // SPEC
  { icon: "clock", title: "Time Savings", body: "Let HSG handle research, outreach, screening, and evaluation." }, // SPEC
  { icon: "sprout", title: "Onboarding & Retention", body: "Help create the conditions for the right hire to succeed." }, // SPEC
] as const;

/* ---------- 07 From candidate pool to hiring decision ----------
   The homepage's shortlist demonstration under this page's headings. */
export const SHORTLIST = {
  eyebrow: "From Candidate Pool to Hiring Decision", // SPEC
  title: "Finding Candidates Is Only the Beginning.", // SPEC
  // SITE — the homepage demonstration's own ledes, minus the one the title now says
  ledes: [
    "Understanding which person has the experience, leadership style, judgment, motivations, working style, and organizational fit to succeed is where the real work begins.",
    "HSG goes beyond the resume to help clients narrow a large candidate pool into a smaller group of people worth serious consideration.",
  ],
  payoff: {
    title: "Your Hiring Decision.", // SPEC
    // DRAFT — the spec's stated emphasis for the section, as a sentence
    body: "HSG's value is not simply generating applicants. It is understanding why someone should — or should not — move forward.",
    href: "#start",
    label: "Start a Search",
  },
};

/* ---------- 08 Experience from both sides ----------
   SPEC lists, with "Culture" written "Cultural Fit" to match the homepage. */
export const BOTH_SIDES = {
  eyebrow: "Both Sides of the Table", // SITE
  title: "Experience From Both Sides. Representation on One.", // SPEC
  // SITE — the homepage's lede for the same idea
  lede: "HSG has spent decades working with both employers and professionals. That experience continues to give us a deeper understanding of what each side needs, expects, and considers when making an important hiring or career decision. But our commitment in every engagement is clear: HSG represents only one side.",
  outcome: "The Right Alignment", // SPEC
  note: "HSG never represents both sides in the same search.", // SPEC
  company: [
    "Business Objectives",
    "Leadership Requirements",
    "Team Dynamics",
    "Cultural Fit",
    "Growth Stage",
    "Future Expectations",
  ],
  candidate: [
    "Career Direction",
    "Motivation",
    "Leadership Opportunity",
    "Compensation",
    "Environment",
    "Long-Term Fit",
  ],
};

/* ---------- 09 Real-world evaluation ----------
   Titles are SPEC. Bodies are DRAFT, assembled from copy the site already
   carries — the spec asks for Michael's own account of how HSG runs these. */
export const EVALUATION_CARDS = [
  {
    icon: "people",
    title: "Behavioral Interviews",
    body: "Uncover the experiences, behaviors and motivations that influence whether someone succeeds after the interview is over.",
  },
  {
    icon: "code",
    title: "Technical Evaluation",
    body: "Where the role calls for it, technical interviews test the capability a resume can only claim.",
  },
  {
    icon: "window",
    title: "Workplace Simulation",
    body: "Workplace-style scenarios show how a candidate approaches the problems the role will actually bring.",
  },
  {
    icon: "shield",
    title: "Vetting & References",
    body: "Private Vetting takes reference checking to a deeper level before a decision is made.",
  },
] as const;

/* ---------- 10 Search reach ----------
   Node names are SPEC. Only the two nodes the site has figures for carry a
   caption; the rest stay labels until there is something true to say. */
export const NETWORK_NODES = [
  { key: "database", label: "Candidate Database", fact: "resumes" },
  { key: "partners", label: "Recruiting Partners", fact: "partners" },
  { key: "specialists", label: "Industry Specialists" },
  { key: "professional", label: "Professional Networks" },
  { key: "passive", label: "Passive Candidates" },
  { key: "referral", label: "Referral Network" },
] as const;

export const REACH = {
  title: "The Right Person May Not Be Applying.", // SPEC
  // DRAFT — from the spec's stated purpose for the section
  lede: "The strongest candidate for a role is often not looking. HSG's search reaches past the people actively applying, to the people who fit the opportunity.",
  // SITE — the homepage Hiring Solutions reach line
  partnersLine: "approximately 1,600 partners throughout the United States, Canada, England, and China",
};

/* ---------- 12 FAQ ----------
   Questions are SPEC. Answers are DRAFT — kept to what the site already
   says, with no timelines or promises — and are flagged as drafts on the
   page. There is deliberately no FAQPage structured data: placeholder
   answers must not be published to search engines as HSG's answers. */
export const FAQS = [
  {
    q: "What does an executive recruiter do?",
    a: "An executive recruiter helps a company find, evaluate and hire leaders for the roles that matter most. At HSG that starts with understanding the organization and what success in the position requires, then searching, assessing, interviewing and vetting candidates before helping the client make the decision.",
  },
  {
    q: "How is executive search different from traditional recruiting?",
    a: "Some recruiters compete on how quickly they can send resumes. Executive search invests the time to understand the company, the people making the decision, the position and the candidates being considered — looking beyond the resume to how someone thinks, leads and works with others.",
  },
  {
    q: "How long does an executive search take?",
    a: "Every search is different. Timing depends on the role, the market for that experience and the interview schedule on the client's side. HSG sets expectations at the start of each engagement.",
  },
  {
    q: "Does HSG recruit passive candidates?",
    a: "Yes. The right person may not be applying. HSG's search reaches beyond active applicants through its candidate database, recruiting partners and professional networks.",
  },
  {
    q: "What industries does HSG serve?",
    a: "HSG recruits for leadership and specialized roles across finance, operations, sales, marketing, HR, engineering, supply chain, IT, manufacturing and general management.",
  },
  {
    q: "How does Collaborative Search® work?",
    a: "Collaborative Search® looks beyond the hiring manager to understand the people, relationships, expectations and working environment surrounding the role. It moves through seven stages — Understand, Search, Evaluate, Interview, Vet, Decide and Support.",
  },
  {
    q: "What happens after a candidate accepts an offer?",
    a: "The search doesn't necessarily end when the offer is accepted. Depending on the engagement, HSG provides onboarding and retention support to help create the conditions for the right hire to succeed.",
  },
  {
    q: "How involved is HSG during the interview process?",
    a: "Depending on the engagement, HSG may help prepare interviews, participate in the interview process, conduct assessments, gather feedback, evaluate candidates, and support the client throughout the decision.",
  },
] as const;

/* ---------- 13 final CTA ---------- */
export const CONTACT = {
  title: "Let's Talk About the Person Your Business Needs Next.", // SPEC
  copy: "Tell us about the role, your company, and what needs to change. We'll start by understanding the problem before beginning the search.", // SPEC
};
