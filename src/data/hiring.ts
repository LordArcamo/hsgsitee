/* ============================================================
   HIRING SOLUTIONS PAGE — /find-talent/

   The page's words, kept out of the markup so they can be replaced in one
   place when Michael's Hiring Solutions answers arrive. Every string is
   tagged with where it came from:

     SPEC   HSG_Hiring_Solutions_Final_Visual_Design_Page_Architecture.md
     LIVE   published today on hiringsolutionsgroup.com/find-talent/ —
            carried over, lightly tightened where the live text ran long
     SITE   already approved elsewhere on this prototype (the homepage)
     DRAFT  suggested; replace with Michael's copy

   The live page's own problems are deliberately NOT carried over: the
   "25 years" figure, the Good to Great paragraph, the job-seeker video and
   its "750 placements" transcript, the coaching block, and the "Expertise
   and Innovation" card that repeated the Targeted Search text.
   ============================================================ */

/* ---------- page meta ---------- */
export const PAGE_META = {
  path: "/find-talent/",
  // DRAFT — the live title ("Hire Top Talent - Expert Recruitment Solutions")
  // carries neither the brand nor the location
  title: "Executive Search & Hiring Solutions in New Jersey | Hiring Solutions Group",
  // LIVE meta description, with the page's new headline worked in
  description:
    "Executive recruiting that helps companies find and hire the leaders they need next — structured search, deep evaluation, and long-term fit. Hiring Solutions Group, New Jersey.",
};

/* ---------- 01 hero ---------- */
export const HERO = {
  eyebrow: "Hiring Solutions", // SPEC
  title: "Find the Leaders Your Business Needs Next.", // SPEC
  /** The word set in the Hiring green. */
  accent: "Leaders",
  // LIVE — the live hero's own paragraph
  copy: "We specialize in the art of finding the perfect match for your business. Our dedicated team conducts thorough assessments and evaluations to ensure a seamless fit between candidates' skills, personality, and your company's unique needs.",
  imageNote: "Executive interview or business leadership photography.", // SPEC
  /** One floating proof card (SPEC). Not the figure that opens the strip below it. */
  proof: { fact: "interviews", label: "Interviews conducted" },
};

/* ---------- 04 Collaborative Search® ----------
   The seven stage names are shared with the homepage, which shows the names
   only. The details are the live page's own description of the method. */
export interface CollabStage {
  key: string;
  name: string;
  detail: string;
}

export const COLLAB_STAGES: CollabStage[] = [
  {
    key: "understand",
    name: "Understand", // SPEC
    // LIVE — "Evaluate and Assess Your Staff"
    detail:
      "Before the search begins, our team studies your company's goals, challenges, and vision for the future. It is the foundation of a custom-tailored hiring strategy.",
  },
  {
    key: "search",
    name: "Search",
    // LIVE — FAQ, "How do you find candidates who are not actively job searching?"
    detail:
      "Direct outreach, referrals, market knowledge, and long-standing professional networks reach the people who are not actively job searching.",
  },
  {
    key: "evaluate",
    name: "Evaluate",
    // LIVE — "Candidate Assessment"
    detail:
      "Interviews, skills assessments, reference checks, and background screenings identify candidates who meet the qualifications and align with your culture and values.",
  },
  {
    key: "interview",
    name: "Interview",
    // LIVE — "Real-World Technical Interviews" + "Holistic Hiring Approach"
    detail:
      "Detailed, industry-specific interviews, including focused interviews on-site — with HSG in the room for as many of them as you want.",
  },
  {
    key: "vet",
    name: "Vet",
    // LIVE — "Candidate Assessment & Background Screening"
    detail:
      "A network of screening partners thoroughly vets candidates, capturing the most qualified while filtering out the unsuitable.",
  },
  {
    key: "decide",
    name: "Decide",
    // LIVE — FAQ, "What is your executive recruitment process step-by-step?"
    detail:
      "The real work happens between the steps: where expectations are clarified, misalignment shows up, and decisions get made. It is where most searches either succeed or fall apart.",
  },
  {
    key: "support",
    name: "Support",
    // LIVE — "Onboarding & Long-Term Support"
    detail:
      "A seamless onboarding process for every new hire, with continuous HR support during and after the transition.",
  },
];

/* How involved HSG gets — the live page's most distinctive promise. */
export const INVOLVEMENT = {
  // LIVE — "The Power of a Holistic Hiring Approach"
  quote: "We won't just tell you what you need to do. We will work with you every step of the way until it's done.",
  lead: "Unlike recruiters who prefer to provide their opinions remotely, we are committed to being as involved as you desire.",
  // LIVE — "Many clients want us to be present for every interview, others wish
  // to operate independently, and some want something more flexible."
  options: [
    { title: "At Every Interview", body: "Many clients want HSG present for every interview." },
    { title: "Independent", body: "Others prefer to run the process themselves." },
    { title: "Flexible", body: "Some want something in between." },
  ],
};

/* ---------- 05 What Collaborative Search® evaluates ----------
   All five of the spec's cards — the live page's five method steps. Short
   here, on purpose: sections 04 and 09 carry the detail. */
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
    icon: "clipboard",
    title: "Candidate Assessment",
    body: "Evaluate experience, fit, motivation, background, and the requirements that actually matter.", // SPEC
  },
  {
    icon: "window",
    title: "Real-World Evaluation",
    body: "Where appropriate, use technical interviews and workplace-style scenarios to better understand capability.", // SPEC
  },
  {
    icon: "flag",
    // non-breaking hyphen: a narrow card was splitting it "Long- / Term"
    title: "Onboarding & Long‑Term Support",
    body: "The search doesn't necessarily end when the offer is accepted.", // SPEC
  },
] as const;

/* ---------- 06 Why companies choose HSG ----------
   SPEC's six titles; each body is the live card's own text, cut to its
   first point. */
export const BENEFITS = [
  { icon: "target", title: "Targeted Search", body: "Focused strategies to identify and attract top-tier candidates with the skill sets and qualifications the role actually needs." },
  { icon: "clipboard", title: "Candidate Assessment", body: "Interviews, skills assessments, reference checks, and background screenings — for a fit with your culture and values, not just the job description." },
  { icon: "network", title: "Access to Networks", body: "Professional networks across numerous industries and niches reach exceptional talent that traditional methods may overlook." },
  { icon: "lock", title: "Confidentiality", body: "Robust protocols for sensitive or confidential positions, so information is handled securely and discreetly." },
  { icon: "clock", title: "Time Savings", body: "From the first call to signing the contract, HSG handles the process — so you can stay focused on your core responsibilities." },
  { icon: "sprout", title: "Onboarding & Retention", body: "A smooth transition for new hires, and guidance on compensation, career development, and engagement to keep top talent." },
] as const;

/* ---------- 07 From candidate pool to hiring decision ---------- */
export const FUNNEL = {
  eyebrow: "From Candidate Pool to Hiring Decision", // SPEC
  title: "Finding Candidates Is Only the Beginning.", // SPEC
  // SITE — the homepage demonstration's closing line
  lede: "Experience gets someone into consideration. Deeper evaluation determines who deserves a closer look.",
  stages: [
    { count: 50, label: "Candidate Profiles" }, // SPEC
    { count: 25, label: "Initial Alignment" },
    { count: 12, label: "Deeper Evaluation" },
    { count: 6, label: "Strong Matches" },
    { count: 3, label: "Finalists" },
  ],
  decision: "Your Hiring Decision", // SPEC
  note: "Candidate counts and filtering are illustrative. Every search is different.", // SPEC
};

/* ---------- 08 Experience from both sides ----------
   SPEC lists, with "Culture" written "Cultural Fit" to match the homepage. */
export const BOTH_SIDES = {
  eyebrow: "Both Sides of the Table", // SITE
  title: "Experience From Both Sides. Representation on One.", // SPEC
  outcome: "The Right Alignment", // SPEC
  note: "HSG never represents both sides in the same search.", // SPEC
  company: ["Business Objectives", "Leadership Requirements", "Team Dynamics", "Cultural Fit", "Growth Stage", "Future Expectations"],
  candidate: ["Career Direction", "Motivation", "Leadership Opportunity", "Compensation", "Environment", "Long-Term Fit"],
};

/* ---------- 09 Real-world evaluation ----------
   SPEC titles; bodies from the live page's method steps. */
export const EVALUATION_CARDS = [
  {
    icon: "people",
    title: "Behavioral Interviews",
    body: "Analytical behavioral assessments look at the soft skills that decide success — emotional intelligence, leadership, and communication.",
  },
  {
    icon: "code",
    title: "Technical Evaluation",
    body: "HSG's S.M.A.R.T. team conducts detailed, industry-specific interviews using relevant data.",
  },
  {
    icon: "window",
    title: "Workplace Simulation",
    body: "Candidates work through realistic workplace simulations — at your workspace or in one of our testing environments — to test their abilities.",
  },
  {
    icon: "shield",
    title: "Vetting & References",
    body: "Reference checks, background screening, and Private Vetting take the decision beyond what a candidate chose to share.",
  },
] as const;

/* LIVE — a published testimonial from someone who went through a simulation. */
export const SIMULATION_QUOTE = {
  text: "Part of my interview was a “workplace simulation” with an employee, which gave me great insights into the company as well.",
  name: "Carlo Diciolla",
  role: "Strategic Account Manager, BOWMAN Dispensers",
};

/* ---------- 10 Search reach ---------- */
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
  // LIVE — FAQ answers on executive search and passive candidates
  lede: "The best leaders are usually not applying anywhere. You do not just find these candidates when you need them — you build relationships over time.",
  // SITE — the homepage Hiring Solutions reach line
  partnersLine: "approximately 1,600 partners throughout the United States, Canada, England, and China",
};

/* ---------- 11 Client success ---------- */
/* LIVE — published testimonial. The live page credits Jeff Arbeit two
   different ways ("General, CFO & COO" and "Monell Center, Associate
   Director"), so only his name is shown until one is confirmed. */
export const TESTIMONIAL = {
  text: "Michael has recruited and consulted for me on many occasions (over 30). His commitment to our company and the candidates comes through both in his dedication and sincere insights into his work. On occasion, he got to know us well enough to say “you will like candidate A, but candidate B is best for you for the following reasons…”. He was right on those occasions and many others.",
  name: "Jeff Arbeit",
  role: "",
};

/* ---------- 12 FAQ ----------
   The live page's ten published questions and answers, plus two the spec
   asks for, answered in copy the homepage already carries. All published
   copy, so the page emits FAQPage structured data — as the live page does
   today. */
export const FAQS = [
  {
    q: "What does an executive recruiting firm do?",
    a: "An executive recruiting firm helps companies identify, attract, evaluate, and secure high-level talent through targeted search, strong networks, and structured candidate assessment. That is the simple version. The real work usually starts before the search begins. Most companies are not fully clear on what they actually need. We spend time getting that right first because if that part is off, even a great candidate will not solve the problem.",
  },
  {
    q: "How is executive search different from traditional recruiting?",
    a: "Executive search is a proactive process focused on senior-level and hard-to-fill roles, often engaging candidates who are not actively job searching. Traditional recruiting tends to react. Executive search goes out and finds the right people. The best leaders are usually not applying anywhere. The real question is how you approach them and whether your opportunity is strong enough to make them listen.",
  },
  {
    q: "How does Collaborative Search® work?", // SPEC question, SITE answer
    a: "Collaborative Search® looks beyond the hiring manager to better understand the people, relationships, expectations, and working environment surrounding the role. It moves through seven stages — Understand, Search, Evaluate, Interview, Vet, Decide, and Support.",
  },
  {
    q: "How long does it take to fill an executive role?",
    a: "Most executive roles take between 60 and 120 days to fill, depending on the position, market conditions, and internal decision-making speed. That timeline works when everyone is aligned. When there is confusion internally, things slow down quickly. We have seen searches drag because no one agrees on what success looks like. We have also seen them move very fast when clarity is there from day one.",
  },
  {
    q: "How involved is HSG during the interview process?", // SPEC question, SITE + LIVE answer
    a: "As involved as you want us to be. Depending on the engagement, HSG may help prepare interviews, participate in the interview process, conduct assessments, gather feedback, evaluate candidates, and support the client throughout the decision. Many clients want us present for every interview; others prefer to operate independently.",
  },
  {
    q: "Why should companies use executive recruiters instead of hiring internally?",
    a: "Executive recruiters provide access to passive candidates, reduce hiring risk, and bring an outside, objective perspective to the hiring process. Internal teams are strong, but they are also close to the situation. Sometimes too close. We come in with a different lens. In many cases, we are not just finding candidates. We are helping fix the thinking behind the hire.",
  },
  {
    q: "What industries do you specialize in for executive recruiting?",
    a: "We support executive recruiting across industries including healthcare, finance, technology, manufacturing, and professional services. Industries matter, but patterns matter more. Leadership, communication, and decision-making show up everywhere. We focus on how people operate, not just where they have been.",
  },
  {
    q: "How do you find candidates who are not actively job searching?",
    a: "We use direct outreach, referrals, market knowledge, and long-standing professional networks to connect with passive candidates. You do not just find these candidates when you need them. You build relationships over time. The best candidates move when something speaks to them. If your opportunity does not connect, they will not move no matter how strong their background is.",
  },
  {
    q: "What is your executive recruitment process step-by-step?",
    a: "Our executive recruitment process includes discovery, role definition, sourcing, screening, interviews, alignment, and offer support. That is the structure. The real work happens between those steps, where expectations are clarified, misalignment shows up, and decisions get made. That is where most searches either succeed or fall apart.",
  },
  {
    q: "How do you evaluate leadership candidates for cultural fit?",
    a: "We evaluate leadership candidates by reviewing communication style, values, leadership behavior, and overall alignment with your organization's environment and goals. Culture fit is one of the most misunderstood parts of hiring. Sometimes companies say they want fit, but what they really need is change. We look at whether the person can succeed in your environment and whether your environment is ready for them.",
  },
  {
    q: "What happens if the hire does not work out?",
    a: "Many executive recruiting firms offer a replacement guarantee for a defined period if the hire does not succeed. That matters. But the better question is why it did not work. Most failed hires are not just about the candidate. It is expectations, onboarding, and leadership alignment. If those are not addressed, the next hire may face the same issues.",
  },
  {
    q: "How much does executive recruiting cost?",
    a: "Executive recruiting fees often range from 20 percent to 35 percent of the placed candidate's first-year compensation, depending on the role and search scope. Cost is always part of the conversation. But a bad hire costs far more than the fee. Lost time, lost momentum, and frustrated teams add up quickly. The real question is what result you are getting, not just what you are paying.",
  },
] as const;

/* ---------- 13 final CTA ---------- */
export const CONTACT = {
  title: "Let's Talk About the Person Your Business Needs Next.", // SPEC
  copy: "Tell us about the role, your company, and what needs to change. We'll start by understanding the problem before beginning the search.", // SPEC
};

/* ---------- structured data ----------
   LIVE — the Service node the live page publishes today, kept so the move
   to the new build loses nothing. */
export const SERVICE = {
  name: "Executive Recruiting & Hiring Solutions",
  serviceType: "Executive Recruiting and Talent Acquisition",
  description:
    "Hiring Solutions Group helps companies identify, attract, evaluate, and hire top executive talent through a collaborative search process focused on culture fit, leadership alignment, and long-term retention.",
  areaServed: ["Northern New Jersey", "Passaic", "New Jersey"],
};
