/* ============================================================
   CAREER SOLUTIONS PAGE — /find-a-job/

   The page's words, kept out of the markup so they can be replaced in one
   place when Michael's Career Solutions answers arrive. Every string is
   tagged with where it came from:

     SPEC   HSG_Career_Solutions_Visual_Design_Page_Architecture_Michael_Review.md
     LIVE   published today on hiringsolutionsgroup.com/find-a-job/ —
            carried over, lightly tightened where the live text ran long
     SITE   already approved elsewhere on this prototype (the homepage
            Career Solutions section, the audience bar) or on another
            published HSG page (/testimonials/, /life-career-deep-dive-inventory/)
     DRAFT  suggested; replace with Michael's copy

   What is deliberately NOT carried over from the live page, and why:

   - "over 750 successful placements" and "a network of over 800 niche
     market recruiters" (video transcript) and "more than 1,000
     professionals" — three career-side figures that contradict the brand
     figures in facts.ts. The spec flags all three for review; none are
     rendered. See NETWORK.unconfirmed below.
   - "How coachable are you? / Coaching Solutions" — removed per the spec.
     Note the live button has no href at all, so it goes nowhere today.
   - The three employer success stories (Dream Hire, China, Hard-to-Fill) —
     removed per the spec; they belong to Hiring Solutions.
   - The full video transcript as a wall of text. Its content is used; the
     transcript itself is not a section.
   ============================================================ */

/* ---------- page meta ---------- */
export const PAGE_META = {
  path: "/find-a-job/",
  // DRAFT — the live title ("Optimize Your Job Search with Expert Career
  // Advice!") carries neither the brand nor the service name
  title: "Career Solutions & Job Search Support in New Jersey | Hiring Solutions Group",
  // LIVE meta description, kept almost as published
  description:
    "Career placement and job search support for professionals seeking new opportunities, better role alignment, and long-term career growth in New Jersey.",
};

/* ---------- the two real job-board destinations ----------
   Both are the live site's own URLs. Everything else on this page that
   claims to reach a job goes through one of these two. */
export const JOB_LINKS = {
  search: "https://hiringsolutionsgroup.com/job-search-2/#!/search", // LIVE
  apply: "https://hiringsolutionsgroup.com/job-search-2/#!/apply", // LIVE
  deepDive: "https://hiringsolutionsgroup.com/life-career-deep-dive-inventory/", // LIVE
  testimonials: "https://hiringsolutionsgroup.com/testimonials/", // LIVE
  contact: "https://hiringsolutionsgroup.com/contact/", // LIVE
};

/* ---------- 01 hero ---------- */
export const HERO = {
  eyebrow: "Career Solutions", // SPEC
  title: "Your Next Career Move Should Be the Right One.", // SPEC (working headline)
  /** The word set in the Career gold. */
  accent: "Right One",
  // LIVE — the live hero's own paragraph, with its internal links removed
  copy: "Looking for success? Our career solutions can help. Whether it's finding the right job, upgrading your resume, or prepping your references, we offer customized solutions.",
  // LIVE — the live page's own sub-headline, kept as the supporting line
  kicker: "Enhance Your Presentation and Career.",
  ctaPrimary: { label: "Search Jobs", href: JOB_LINKS.search }, // LIVE
  ctaSecondary: { label: "Submit Resume", href: JOB_LINKS.apply }, // LIVE
  imageNote: "Professional at a decision point — not a stock handshake.", // DRAFT
};

/* ---------- 02 what do you need right now ----------
   SPEC's two doors. Both land on something that already exists: the live
   job board, and this page's own services section. The supporting lines
   are the live page's own CSG bullets, which split the same two ways. */
export const DOORS = [
  {
    key: "now",
    eyebrow: "I'm looking for a job", // SPEC
    title: "Start with what's open.", // DRAFT
    // LIVE — "Career Solutions Group (CSG) provides you with the tools
    // required to: improve your job search skills"
    body: "For professionals who are actively looking for their next opportunity. Improve your job search skills and see the positions HSG is recruiting for now.",
    cta: { label: "Search Current Opportunities", href: JOB_LINKS.search },
    icon: "target",
  },
  {
    key: "next",
    eyebrow: "I'm planning my next career move", // SPEC
    title: "Start with the decision.", // DRAFT
    // LIVE — "prepare you for your next career move / jump start your next
    // career move"
    body: "For professionals who want to evaluate their direction, improve how they present themselves, identify gaps, or prepare before making a change.",
    cta: { label: "Explore Career Solutions", href: "#services" },
    icon: "compass",
  },
];

/* ---------- 03 Life & Career Deep Dive Inventory ----------
   Copy from the live /find-a-job/ block and from the inventory's own page.
   The column and section names are the inventory's real structure, which is
   a better answer than an invented five-step diagram. */
export const DEEP_DIVE = {
  eyebrow: "Life & Career Deep Dive Inventory", // LIVE
  title: "Understand Where You Are Before Deciding What's Next.", // SPEC
  // LIVE — /find-a-job/
  kicker: "A Respectful Career Assessment for Professionals",
  lede: [
    "Career transitions later in life are different. They require clarity, context, and respect for lived experience.", // LIVE
    "The Life & Career Deep Dive Inventory is a structured yet compassionate assessment designed to help individuals age 40+ understand where they are, what shaped their journey, and what direction makes sense next.", // LIVE
  ],
  // SITE — /life-career-deep-dive-inventory/
  pull: "This is not a test.",
  pullBody:
    "This is a strategic reflection tool used by career and business advisors to uncover strengths, barriers, and realistic next steps.", // LIVE
  note: "All questions are optional. Answer only what feels appropriate.", // LIVE
  // SITE — the inventory's own closing line
  promise: "No pressure. No guesswork. Just clarity.",
  /** The inventory's two real columns and the sections inside them. SITE. */
  columns: [
    {
      label: "Education & Career",
      items: [
        "Education Background",
        "Early Strengths & Development",
        "Education After High School",
        "Work History Snapshot",
        "Career Strengths & Challenges",
        "Skills Snapshot",
        "Current Career Readiness",
        "Motivation for Change",
      ],
    },
    {
      label: "Relationship & Family Life",
      items: [
        "Parenting & Caregiving",
        "Major Life Events & Challenges",
        "Support & Current Stability",
        "Final Reflections",
        "Future Family Plans",
      ],
    },
  ],
  cta: { label: "Learn About the Life & Career Deep Dive", href: JOB_LINKS.deepDive }, // LIVE ("LEARN MORE")
};

/* ---------- 04 more than a resume ----------
   The transcript says exactly three things HSG wants to understand first:
   "Understanding your goals, qualifications, and vision is the first step."
   Those three are the section, rather than an invented list of attributes.
   Deliberately a different shape from the Hiring page's Beyond the Resume. */
export const MORE_THAN = {
  eyebrow: "Before the Search Starts", // DRAFT
  title: "You Are More Than What's on Your Resume.", // SPEC
  // LIVE — video transcript, first line of the process
  lede: "We know that you are much more than what's on your resume. Understanding your goals, qualifications, and vision is the first step.",
  items: [
    {
      key: "goals",
      label: "Goals",
      // LIVE — Career Coaching, Analysis & Strategy
      body: "“Big picture” strategy planning to establish goals and milestones aimed at enhancing your marketability and securing your long-term success.",
      icon: "target",
    },
    {
      key: "qualifications",
      label: "Qualifications",
      // LIVE — Career Coaching, Analysis & Strategy (gap analysis)
      body: "Looking at your entire background, from training and education to previous jobs held, to identify the barriers that have inadvertently held you back from reaching your full potential.",
      icon: "clipboard",
    },
    {
      key: "vision",
      label: "Vision",
      // LIVE — Career Coaching, Analysis & Strategy (reality check)
      body: "Objective reality-checking to determine if the timing is right for a job change or simply a mindset change.",
      icon: "compass",
    },
  ],
  // LIVE — closing line of the transcript's opening
  close: "A proprietary process then connects you with the right employers.",
};

/* ---------- 05 the services ----------
   The live page publishes ten services. The homepage's approved Career
   Solutions menu groups its services under five headings. These are the
   live services, filed under the homepage's headings, so the page uses one
   approved vocabulary while every card still carries published HSG copy.

   `review: true` marks the three the spec asks Michael to confirm are still
   offered. They render with a note rather than being deleted.

   Two live services are NOT cards here:
   - Vetting Your References has its own section (06).
   - The networking pages of Career Coaching are split out as their own
     card, because the live copy gives them three paragraphs of their own.

   The homepage menu's fifth group, Growing Where You Are (Promotion
   Strategy, Internal Career Strategy, Leadership Development Planning), has
   no published copy on the live page, so it has no cards and is omitted
   rather than written from scratch. */
export interface Service {
  key: string;
  title: string;
  /** One line shown collapsed. */
  summary: string;
  /** Shown expanded. */
  body: string[];
  bullets?: string[];
  icon: string;
  review?: boolean;
}

export interface ServiceGroup {
  key: string;
  label: string;
  services: Service[];
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    key: "direction",
    label: "Direction & Timing", // SITE — homepage Career Solutions menu
    services: [
      {
        key: "strategy",
        title: "Career Coaching, Analysis & Strategy", // LIVE
        summary: "A holistic analysis of your past to plan for your future.", // LIVE
        body: [
          "During this exploratory phase, we run a holistic analysis of your past to plan for your future.",
          "We also include a comprehensive work gap analysis for clients who know precisely where they want to be in their career but can't figure out why they're not there yet. Many people simply need an objective expert outsider to take a thoughtful, strategic bird's eye view and pinpoint the chinks in their professional armor.",
          "After we have discovered your barriers to success, we'll work with you so that you can overcome them and guide you in presenting those strengths with confidence.",
        ],
        bullets: [
          "Breaking down your career decisions to flush out hazards to avoid going forward",
          "Objective reality-checking to determine if the timing is right for a job change or simply a mindset change",
          "“Big picture” strategy planning to establish goals and milestones",
        ],
        icon: "compass",
      },
      {
        key: "education",
        title: "Continued Education & Assessment", // LIVE
        summary: "The world is changing drastically and knowing how to evolve with it is crucial.", // LIVE
        body: [
          "The world is changing drastically and knowing how to evolve with it is crucial.",
          "To get the most out of your time and effort and to land the role that is right for you, we work with a variety of professionals to attune ourselves to your needs.",
          "Once our team determines your needs, we will recommend assessment(s), or further education, to help you evolve.",
        ],
        icon: "star",
      },
    ],
  },
  {
    key: "positioning",
    label: "Positioning & Materials", // SITE
    services: [
      {
        key: "resume",
        title: "Professional Resume Services", // LIVE
        summary: "Most hiring managers spend six seconds or less on a resume — if a human sees it at all.", // LIVE
        body: [
          "A flawless resume is your golden ticket to a job interview. However, most hiring managers will only spend 6 seconds or less looking at it. That is, assuming your resume is even seen by a human. Many organizations use automated applicant tracking software to pre-screen resumes and reject the ones lacking the right keywords.",
          "Our highly experienced HR experts know exactly how these behind-the-scenes processes work. We'll give you the insider scoop to ensure your resume features everything needed to move past the screening software and get forwarded to a live person.",
          "We'll edit, fine-tune, and polish your experiences, accomplishments, and skills so your finished resume highlights all the qualities that hiring managers are looking for. We will even help you draft a compelling cover letter, which complements your resume perfectly.",
        ],
        icon: "clipboard",
      },
      {
        key: "online",
        title: "Crafting an Online Presence", // LIVE
        summary: "Modern hiring managers are scrutinizing your public-facing online content.", // LIVE
        body: [
          "If you don't already have a prominent online presence, you're letting the competition get the positions you want.",
          "Our tech-savvy professionals will work with you to develop a high-impact, high-visibility presence that showcases your skills and experience, while marketing your best attributes to the world.",
          "We'll also screen for areas which could be working against you. Because make no mistake — modern hiring managers are scrutinizing your public-facing online content. You want to get noticed, but only for the right reasons.",
        ],
        icon: "globe",
      },
      {
        key: "reputation",
        title: "Reputation Management", // LIVE
        summary: "Don't let your past define your future.", // LIVE
        body: [
          "Don't let your past define your future.",
          "Free yourself of unfavorable Google results, bad press, web lies and unflattering photos. We work within the law to erase links and negative information, so they no longer show up online.",
        ],
        icon: "shield",
        review: true,
      },
    ],
  },
  {
    key: "access",
    label: "Search & Access", // SITE
    services: [
      {
        key: "networking",
        title: "Networking Strategy", // SITE (homepage menu name for the live page's networking pages)
        summary: "What good is having a network if you don't know how to use it?", // LIVE
        body: [
          "We review your current networking strategy. What good is having a network if you don't know how to use it?",
          "Time and again we encounter job seekers who possess truly outstanding connections through LinkedIn, alumni associations, friends and family, or professional and community ties. Then we discover that these well-connected individuals are failing to maximize the benefits of their relationships.",
          "We'll review your existing network connections, and scout for potential new ones. Then we'll work with you to formulate an unbeatable personalized plan to put these powerful ties to work.",
        ],
        icon: "network",
      },
      {
        key: "mentor",
        title: "Mentor/Sponsor Services", // LIVE
        summary: "The most successful people in business were often not alone on the way up.", // LIVE
        body: [
          "Here's an open secret: the most successful people in business were often not alone as they climbed that ladder to the top. Many reached their dreams by maintaining a long-term mentorship with a leader in their field; someone who worked with them each step of the way.",
          "After completing a few coaching sessions with our clients, we're able to suggest an appropriate mentor. There's no reason to go it alone when you can reap the benefits of having a tailor-fit mentor in your corner.",
        ],
        icon: "people",
        review: true,
      },
    ],
  },
  {
    key: "offer",
    label: "Interview & Offer", // SITE
    services: [
      {
        key: "interviews",
        title: "Simulated Interviews and Skills Practice", // LIVE
        summary: "Getting called in is the easy part. Many applicants fail at the interview because they go in unprepared.", // LIVE
        body: [
          "Believe it or not, getting called in for an interview is the “easy part.” Where many applicants fail is at that critical in-person interview stage. Why? Because they go in unprepared.",
          "Our team of professionals will run you through a gauntlet of realistic role-playing scenarios that will more than prepare you to handle the stressors of any live interview situation. We know all the popular interview questions that modern hiring managers love to ask and will ensure you're able to respond to them with confidence and poise.",
          "Interviewers love when candidates show that they've done their homework, because it demonstrates enthusiasm for the job. So we will teach you how to research companies, and the actual interviewers themselves.",
        ],
        bullets: [
          "Proven Pre-Interview Tactics",
          "Best Practice Phone Interview Techniques",
          "Critical In-Person Interview Practice",
          "Comprehensive Post-Interview Debrief",
        ],
        icon: "talk",
      },
      {
        key: "video",
        title: "Video Interview", // LIVE
        summary: "A recorded presentation, rehearsed until you are satisfied with it.", // LIVE
        body: [
          "For anyone to seriously boost their skills, they require not only practice but constructive feedback. However, feedback works best when it comes from objective individuals that are qualified to perform such assessments.",
          "This service provides insightful feedback and professional critiques of your presentation and self-promotion skills. Once these skills are honed through our coaching sessions, you'll appear in a brief recorded presentation where you'll introduce yourself and your background. We'll do multiple iterations until we've captured a performance that you are 100% satisfied with.",
        ],
        icon: "play",
        review: true,
      },
      {
        key: "negotiation",
        title: "Strategic Negotiation Skills", // LIVE
        summary: "Hiring organizations are very comfortable negotiating. They're counting on you not being.", // LIVE
        body: [
          "Do you get uncomfortable discussing salary negotiations? You must get over that, because hiring organizations are very comfortable with it. And they're counting on you not being comfortable with it.",
          "There's absolutely no reason to miss out on potentially thousands of dollars a year in wages. And yet, people do this all the time. We will teach you how to sidestep that pitfall by showing you simple tricks of the trade to determine your “value” within any given hiring scenario.",
          "Next, we'll train you to feel perfectly at ease as you negotiate from a well-informed position. Once an organization recognizes that the person they're dealing with knows what they are doing, they're far less likely to fiddle around.",
        ],
        icon: "chart",
      },
    ],
  },
];

/** Shown under the service grid, as the spec asks — not deleted, not silent. */
export const SERVICES_REVIEW_NOTE =
  "Reputation Management, Mentor/Sponsor Services and Video Interview are published on the current Career Solutions page. Michael to confirm each is still offered before launch."; // SPEC

/* ---------- 06 reference support / private vetting ----------
   The live copy is the strongest on the page and is kept close to verbatim.
   Named "Reference Support" here; the spec leaves the public use of
   "Private Vetting" for Michael to decide. */
export const REFERENCES = {
  eyebrow: "Reference Support", // SPEC
  title: "Don't Leave an Important Part of Your Candidacy to Chance.", // SPEC
  lede: "Applicants often submit contact information of references who may not be their best advocates.", // LIVE
  body: [
    "A coworker who you got along well with doesn't necessarily know much about offering a professional referral for you. Through no fault of their own, they simply may not know how to sufficiently identify your strengths and speak about them during an all-important reference check. Meanwhile, not all former supervisors are as eager to sing our praises as we might like to believe.", // LIVE
    "Organizations place significant weight on reference responses. We will assess the accuracy and suitability of your references and identify which ones can offer the strongest, most compelling referrals.", // LIVE
  ],
  /** The live section's own closing line, set apart. */
  close: "We'll make sure your advocates know how to seal the deal for you.", // LIVE
  /** SPEC's visual concept, using the live section's own nouns. */
  chain: [
    { label: "Your professional history", body: "What you actually did, and what it was worth." },
    { label: "Your references", body: "The people an employer will call about it." },
    { label: "How your strengths are communicated", body: "Whether those people can say it well." },
    { label: "Employer decision", body: "Organizations place significant weight on reference responses." },
  ],
};

/* ---------- 07 the career search journey ----------
   Eight stages, in the order the live video transcript describes them. Not
   an invented sequence: each stage's body is the transcript's own sentence
   for that step. SPEC asked for a journey; this is the journey HSG already
   publishes. */
export const JOURNEY = {
  eyebrow: "The Career Search Journey", // SPEC
  title: "From Where You Are to What's Next", // SPEC
  lede: "Looking for a job is a full-time job in itself. Yet it's a job most of us are not prepared for, with a steep learning curve.", // LIVE
  stages: [
    { key: "understand", label: "Understand", body: "Understanding your goals, qualifications, and vision is the first step." },
    { key: "present", label: "Optimize", body: "We optimize your first impression online, which is one aspect of what can make or break an interview or job offer. We make sure your profiles reflect your strengths." },
    { key: "network", label: "Network", body: "Our extended family is a virtual brain trust of successful candidates, employers, and HR experts. They provide confidential advice and support as you navigate toward a new job." },
    { key: "coach", label: "Coach", body: "We help you craft key messages and sharpen your presentation style by connecting you with expert-level professionals in your field, who provide feedback specific to you and your career." },
    { key: "connect", label: "Connect", body: "We utilize strategic industry relationships to identify and connect you with the right career opportunities. You quickly become a prime candidate for the positions best suited to your skills and experience." },
    { key: "interview", label: "Interview", body: "After your interview, we will debrief you to prepare you for the next steps of the process, including developing your strengths and addressing any areas that require additional support." },
    { key: "rehearse", label: "Rehearse", body: "Before an offer is put in writing, we help you to rehearse those critical moments and conversations with deep role playing." },
    { key: "negotiate", label: "Negotiate", body: "After you get an offer, we role play to help you negotiate the final steps to optimize salary, options, and benefits package." },
  ],
  // SPEC's caveat, kept on the page
  note: "This is how HSG describes its own Career Solutions process. It is not a claim that every professional follows the same sequence.",
};

/* ---------- 08 the career opportunity network ---------- */
export const NETWORK = {
  eyebrow: "Career Opportunity Network", // SPEC
  title: "Your Search Shouldn't Stop at the Job Boards.", // SPEC
  // LIVE — transcript, with the unconfirmed recruiter figure removed
  lede: "We work directly with employers and a network of niche market recruiters, using strategic industry relationships to identify and connect you with the right career opportunities.",
  /* The live transcript says "a network of over 800 niche market
     recruiters". The spec says do not reuse that number until Michael
     confirms it, and it disagrees with the 1,600+ professional network in
     facts.ts. Left here, unrendered, so nobody has to go looking for it. */
  unconfirmed: { recruiters: "800", placements: "750", professionals: "1,000+" },
  /** SPEC — the professional at the centre. */
  nodes: [
    { key: "hsg", label: "HSG Opportunities" },
    { key: "employers", label: "Employers" },
    { key: "recruiters", label: "Recruiting Partners" },
    { key: "industry", label: "Industry Relationships" },
    { key: "network", label: "Professional Network" },
    { key: "future", label: "Potential Opportunities" },
  ],
  centre: "You",
  // LIVE — FAQ answer, which is the clearest statement of why this matters
  close: "Our team works with employers across multiple industries and can help identify positions that may not be widely advertised through traditional job boards.",
};

/* ---------- 09 the two job actions ----------
   SPEC asked for a Current Opportunities board. The live site has no
   listings to show — jobs are an embedded board behind /job-search-2/ —
   and the spec forbids inventing them, so this section is the two real
   actions instead, framed with the live site's own words. */
export const OPPORTUNITIES = {
  eyebrow: "Current Opportunities", // SPEC
  title: "Two Ways In.", // DRAFT
  // LIVE — the "Continue to Jobs" popup's own line
  lede: "Tell us a little about yourself, and we'll take you to current job opportunities available in and around Passaic.",
  cards: [
    {
      key: "search",
      title: "Search Current Opportunities", // SPEC
      body: "See the positions HSG is recruiting for now, across professional, management, technical and executive-level roles.", // LIVE (FAQ)
      cta: { label: "View Our Jobs", href: JOB_LINKS.search },
      icon: "target",
    },
    {
      key: "apply",
      title: "Don't See the Right Role?", // SPEC
      // LIVE — FAQ answer, near verbatim
      body: "Even if you do not see a current opening that fits your background, we encourage you to submit your resume. New opportunities become available regularly, and our recruiters may be able to connect you with future positions.",
      cta: { label: "Submit Your Resume", href: JOB_LINKS.apply },
      icon: "clipboard",
    },
  ],
};

/* ---------- 10 candidate success ----------
   Candidate-side testimonials only, per the spec. Every quote is published
   verbatim on /testimonials/, which has its own "From Candidates" filter.

   The featured story is Eric Feinstein: the live Career Solutions page
   embeds his video testimonial but never shows his words, which are on
   /testimonials/. Nancy Rawson is the page's other video. */
export const FEATURED_CANDIDATE = {
  quote:
    "When I decided on a career change it appeared to me that the search was like driving in the country at night in a car with no headlights. Pretty soon I would have either hit a tree or driven off the road. Michael Schlager and his team were literally the lights in the dark, guiding me in the right direction.", // SITE
  name: "Eric Feinstein",
  role: "GTT, Account Directors",
  /** From his video transcript on /testimonials/ — the problem he arrived with. */
  before:
    "A lot of the jobs that I looked at, it was almost like it was the same level that I was at. It wasn't bringing me to the next level.", // SITE
};

export const CANDIDATE_QUOTES = [
  {
    quote:
      "Michael and his team went the extra mile by studying my background and redoing my resume, crafting a clear and complete picture of what I had to offer and where I wanted to go. They really got to know me and what I needed professionally and personally for my next career move. They helped me develop a strategy and action plan.",
    name: "Nancy Rawson",
    role: "Monell Center, Associate Director",
  }, // SITE
  {
    quote:
      "Michael and his team of professionals were instrumental in preparing me for some challenging interviews during a pivotal time in my career. Michael was also very helpful when it came to negotiating for a salary that was commensurate with my experience.",
    name: "Kenneth Steinberg",
    role: "EXL Service, Assistant Vice President — Tax",
  }, // SITE
  {
    quote:
      "When I was having difficulty in my job search, I worked with Michael Schlager and his Career Solutions division of HSG. He helped me narrow the focus of my job search and leverage the resources I had, which ultimately helped me land a great position with a top company.",
    name: "Ian Matthews",
    role: "UnitedHealth Group, Technology Development Senior Associate",
  }, // SITE
];

/* ---------- 11 FAQ ----------
   All six questions and answers exactly as published on /find-a-job/. They
   are also the page's FAQPage structured data. */
export const FAQS = [
  {
    q: "How can Hiring Solutions Group help me find a job?",
    a: "Hiring Solutions Group helps job seekers connect with opportunities that align with their experience, skills, and career goals. Our team works with employers across multiple industries and can help identify positions that may not be widely advertised through traditional job boards.",
  },
  {
    q: "What types of jobs does Hiring Solutions Group recruit for?",
    a: "We recruit for a wide range of professional, management, technical, and executive-level positions. Opportunities may include leadership roles, sales positions, operations management, finance, healthcare, manufacturing, technology, and other specialized industries throughout New Jersey and beyond.",
  },
  {
    q: "Does Hiring Solutions Group only work with executives?",
    a: "No. While we specialize in executive recruitment and leadership hiring, we also work with professionals seeking career advancement across a variety of industries and experience levels. Our goal is to connect qualified candidates with employers that match their skills and long-term career objectives.",
  },
  {
    q: "Can Hiring Solutions Group help with a career change?",
    a: "Yes. Many candidates use our services when transitioning into a new industry, pursuing leadership opportunities, or seeking greater career growth. We can help evaluate your experience, identify transferable skills, and connect you with opportunities that align with your goals.",
  },
  {
    q: "Is there a cost for job seekers to use Hiring Solutions Group?",
    a: "In most cases, employers retain Hiring Solutions Group to assist with recruiting and hiring. Qualified candidates can explore opportunities, submit resumes, and work with our recruiters without paying placement fees.",
  },
  {
    q: "What should I do if I don't see a job that matches my experience?",
    a: "Even if you do not see a current opening that fits your background, we encourage you to submit your resume. New opportunities become available regularly, and our recruiters may be able to connect you with future positions that align with your qualifications and career goals.",
  },
]; // all LIVE

/* ---------- 12 final CTA ---------- */
export const CONTACT = {
  eyebrow: "Get Started", // SITE
  title: "Ready to Take the Next Step?", // SPEC
  lede: "Career Solutions Group knows the value of a great placement and our team is committed to providing candidates with individualized solutions.", // LIVE (transcript)
  actions: [
    { label: "Search Jobs", href: JOB_LINKS.search }, // SPEC + LIVE
    { label: "Submit Your Resume", href: JOB_LINKS.apply }, // SPEC + LIVE
  ],
  conversation: { label: "Schedule a Career Solutions Conversation", href: JOB_LINKS.contact }, // SPEC + LIVE
};

/* ---------- structured data ---------- */
export const SERVICE = {
  name: "Career Solutions",
  serviceType: "Career coaching and job search support",
  description:
    "Career placement and job search support for professionals: career strategy and gap analysis, resume and online presence, interview preparation, reference support, and negotiation.",
  areaServed: ["New Jersey", "New York Metropolitan Area"],
};
