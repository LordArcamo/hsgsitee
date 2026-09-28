/* ============================================================
   10 QUESTIONS — /questions-to-ask-an-executive-recruiter/

   Source: Client_Solutions_Questions_Handoff_Full.pdf, with
   Client_Solutions_Questions_Executive_Summary.pdf and
   Client_Solutions_Questions_Implementation_Notes.pdf.

   Every word below is HSG's, transcribed from the handoff. The
   implementation notes say to use the finalized copy "without shortening
   the substance too aggressively", so nothing is cut — the long answers are
   only split into paragraphs so they can be read on a screen.

   Four phrases here appear NOWHERE on the live site, on staging, or
   anywhere else in this build. They become HSG's published language the day
   this ships, so Michael should confirm each one first:

     "Meaningful Defense"          (Q4, Q10)
     "And Then Some…"              (Q7, Q9)
     "fly-on-the-wall approach"    (Q1)
     "prorated protection structure" (Q7)

   The optional "What Great Builders Say About Hiring the Best" quote strip
   is deliberately NOT built. It calls for headshots and quotations from
   well-known business figures beside the HSG logo, and the handoff's own
   brand note says to keep editorial inspiration separate from testimonial
   or endorsement. HSG's real, attributed client quotes on /testimonials/
   do the same job without that risk. See QUOTE_STRIP below.
   ============================================================ */

export const PAGE_META = {
  path: "/questions-to-ask-an-executive-recruiter/",
  title: "10 Questions to Ask Before Hiring an Executive Recruiter | Hiring Solutions Group",
  description:
    "If one hire could affect your growth, your culture, your customers and your future, these are the ten questions worth asking before you bring in an executive recruiter. Answered in full by Hiring Solutions Group.",
};

export const HERO = {
  // The handoff's hero title and subtitle, unchanged.
  title: "Not Quite One of My Classes From 30 Years Ago… But Look at Them Now!",
  subtitle:
    "If your next hire could affect your growth, your culture, your customers, and your future, these are the 10 questions worth asking before you bring in an executive recruiter.",
  /* The handoff's suggested alt text reads "Michael Schlager-like presenter".
     That is a note to the illustrator, not alt text: it tells a screen-reader
     user the scene depicts a real, named person, which it does not. This
     describes what is actually shown. */
  imageAlt:
    "An illustrated classroom scene: a presenter at a blackboard headed “What do great builders have in common? They invest in the right people.”, addressing a room of business people, with Hiring Solutions Group branding on a banner beside him.",
  imageCaption: "Conceptual image for editorial use.",
};

export const INTRO = {
  title: "Questions Small Companies Should Ask Before Hiring an Executive Recruiter",
  lead: "If you’re nervous about bringing an executive recruiter into your company, ask tough questions. We would.",
  body: "For a privately held company, one hire can influence an entire department, a major customer, a product launch, or sometimes the direction of the business itself. You should know what your recruiter actually does before trusting them with that responsibility.",
};

export interface Question {
  q: string;
  /** Paragraphs. Joined with a space to build the FAQPage answer text. */
  a: string[];
}

export const QUESTIONS: Question[] = [
  {
    q: "How do you make sure you really understand the position before you start recruiting?",
    a: [
      "We usually start one step before the position. In a smaller privately held company, the owner may be wearing five different hats. By the time we are called, he or she may already have tried hiring the position several times and reached the point of saying, ‘Maybe I shouldn’t be doing this myself.’",
      "Before we can understand the position, we need to understand the company and the people leading it. How does the owner manage? How open is management to new ideas? How are disagreements handled? Will the new person actually be allowed to implement the ideas they’re being hired for? Are commitments made during the interview likely to be honored six months later? Those questions have a tremendous effect on retention.",
      "Then we look at the job description. Who wrote it? Did the people who actually work with this position contribute to it? Does the written description accurately reflect what the person will really be doing?",
      "After that, we go into the market and speak with people who already perform this type of work. Sometimes we’ll even bring one of our specialized recruiting partners into a technical conversation with the client. In highly technical engineering, scientific, or specialized searches, we sometimes use what we call our ‘fly-on-the-wall approach.’ If we’re not the technical expert in the room, we listen while people who are talk shop. You can learn an awful lot when everyone temporarily forgets the recruiter is listening.",
    ],
  },
  {
    q: "How much time do you actually spend evaluating a candidate before you present them to us?",
    a: [
      "Enough time to be able to defend why we’re presenting them. Over more than 30 years, we have never believed that a short phone screen and a good-looking resume are enough.",
      "Depending upon the position, our work may include repeated conversations, in-person interaction, verified assessments, reference vetting, direct conversations with references, technical evaluation, observing other interviews and comparing what we’re learning with what the client actually needs.",
      "Occasionally we can move very quickly because we’ve already done much of the homework. Sometimes the evaluation takes hours. Sometimes years of relationships allow us to reach an answer faster. The important part is that the work gets done.",
    ],
  },
  {
    q: "How do you know whether someone will fit our company—not just whether they can do the job?",
    a: [
      "Whenever possible, we involve the people who will actually work with the new hire. Not only the owner. Not only HR. The people on the floor, in the department, beside the desk, in the plant or in the field often understand aspects of the position that aren’t written anywhere. Their questions can be extraordinarily revealing.",
      "We’ve watched owners discover during an interview that employees were working with inadequate lighting, uncomfortable temperatures, confusing processes or responsibilities that management didn’t fully understand. That’s not necessarily a reason to abandon the search. Sometimes it’s the beginning of making the company better.",
      "We often prepare employees before involving them so an interview doesn’t turn into an airing of grievances in front of a candidate. The objective is to learn, make appropriate improvements and understand whether the person being considered can thrive in the environment you’re actually offering.",
      "Fit isn’t about whether somebody is ‘nice.’ It’s whether the way they naturally operate and the way your company actually operates can work together.",
    ],
  },
  {
    q: "What happens if the person interviews well but isn’t actually as strong as they appear?",
    a: [
      "That’s exactly why we don’t rely on the interview alone. Depending upon the assignment, we may use reference verification, direct reference conversations, repeated coordinated interactions, technical specialists, in-person assessments, customized testing, recorded or monitored assessments and cross-checking of information gathered at different stages.",
      "One of our greatest advantages is often the network behind the reference. A reference responding to a stranger may give a polite answer. A reference speaking with someone whose reputation or relationships they respect often has a very different conversation. Through our recruiting network and relationships built over decades, we can sometimes vet not only the candidate—but the credibility of the person vouching for the candidate.",
      "Anyone can forward paper. We would rather send fewer candidates and be able to provide what we call a Meaningful Defense of why each one deserves your time. We don’t gamble with our clients’ time.",
    ],
  },
  {
    q: "How do you recruit for a company like ours if we don’t have a big name, fancy office, or huge benefits package?",
    a: [
      "Sometimes being smaller is actually part of the opportunity. Not everybody wants to be employee number 42,713. Some people want to know the owner. Some want their ideas heard. Some want to see the results of their work. Some want equity or upside. Some want the family-like environment that a smaller company can genuinely provide. And sometimes they simply want to matter.",
      "But the most important part isn’t what we think will motivate the candidate. It’s listening long enough to learn what actually matters to them. We don’t stop at ‘Why are you leaving?’ We want the third answer—the answer underneath the interview answer.",
      "Because we may be discussing multiple opportunities with someone, we can often say, in effect: ‘Be honest with us. If this isn’t right, we’ll keep talking about what might be.’ That creates a different conversation. A polished document doesn’t necessarily mean you’ve found the right person. Our conversations, current industry training, relationships and experience help us get behind the document and understand the human being.",
      "Benefits differences can often be addressed creatively as well. And the office? It doesn’t have to look like Google’s headquarters. Most strong employees would rather work with good people who respect them than sit in a beautiful building where nobody does. If parts of your employment experience need improvement, we’re willing to help there too. Sometimes a few relatively small changes dramatically improve the story you’re able to tell prospective employees.",
    ],
  },
  {
    q: "What happens if you discover that the reason we can’t hire or keep people is actually something inside our company?",
    a: [
      "We’re not there to embarrass the owner. We’re there to solve the problem. Every company has things that were just fixed, things currently being fixed and things everyone knows probably should have been fixed already. What’s important is what happens after we discover them.",
      "Sometimes the recruiting deposit ultimately funds consulting work first—and we return to hiring several weeks or months later. That’s okay with us if it means the eventual hire has a real chance of succeeding.",
      "We may uncover a compensation promise that wasn’t kept, a responsibility that changed dramatically after someone joined, communication problems between departments, management practices hurting retention, or financial realities the company hasn’t yet figured out how to explain. Those conversations are handled privately.",
      "Sometimes the answer reaches beyond Human Resources entirely. In one situation, two competitors were essentially damaging one another—stealing employees, undercutting each other, fighting over suppliers and pushing both businesses toward serious trouble. Instead of continuing the war, we helped create a conversation. With assistance from our Business Solutions Group, the companies ultimately developed a structured agreement, redefined areas of their businesses to complement rather than destroy one another and stopped trying to win at any cost.",
      "Sometimes hiring exposes a people problem. Sometimes the people problem exposes a business problem. We want to help solve the right one.",
    ],
  },
  {
    q: "How do you protect confidentiality if we’re replacing someone who is still employed here?",
    a: [
      "Very carefully. We’ve managed confidential searches many times, and the smallest details matter. Who knows about the search? What exactly do they know? Who is permitted to discuss it? Which outside sources can be used in vetting? At what point can the candidate learn the identity of the company? When does the owner enter the process? What can each person appropriately ask? Who communicates what—and when?",
      "On higher-level confidential searches, those rules should be defined before outreach begins, not after somebody accidentally says too much.",
      "It can absolutely work. But confidentiality alone isn’t the long-term answer. The company still has to deliver on the environment and commitments that persuaded the person to join. Getting somebody through the front door is only the beginning. That’s one reason we’ve developed longer-term support programs, including our prorated protection structure and our ‘And Then Some…’ offering.",
    ],
  },
  {
    q: "Are you going to contact our employees, customers, vendors or competitors without our permission?",
    a: [
      "Not without your blessing. Trust is the foundation of the relationship. Some companies have worked with us for more than 25 years. Relationships like that don’t exist if a recruiter starts making reckless phone calls around the owner’s business.",
      "There are situations where contacting people connected to the organization makes enormous sense, but we discuss it first. Sometimes those conversations create opportunities the client hadn’t considered.",
      "For example, imagine that you know a layoff may eventually be necessary. You don’t want the disruption. You don’t want morale collapsing. You don’t want people discovering it through rumors. And ideally you’d rather help good employees land somewhere else than simply terminate them. That’s where outplacement can become part of the conversation. It’s just one example of why we look at recruiting as part of a much larger people strategy.",
    ],
  },
  {
    q: "What happens after we hire the person? Are we basically on our own?",
    a: [
      "We hope not. The first day isn’t the finish line. It’s when a different part of the work begins.",
      "Our collaborative searches include post-hire support, with different protection periods depending upon the client, company history and engagement. We also offer extended prorated options. And our ‘And Then Some…’ program is designed for companies that want us to remain connected with both the employee and company beyond the traditional placement period.",
      "Why? Because circumstances change. Compensation changes. People move. Offices relocate. Families change. Managers change. Responsibilities change. Sometimes somebody who appears to be suddenly leaving has actually been quietly unhappy for six months. We’d much rather receive the call when someone is thinking about leaving than after their resignation letter is sitting on the owner’s desk.",
      "Small-company rumors also travel extraordinarily fast. Poorly managed uncertainty destroys morale. Good planning gives you options. Earlier conversations usually cost far less than emergency ones.",
    ],
  },
  {
    q: "How do we know you won’t just send us the first five people who look good on paper?",
    a: [
      "You shouldn’t accept that from us—or anybody else. Meaningful Defense is a reasonable expectation. Sending resumes and asking the client to figure out which ones are good is not executive recruiting.",
      "Before we search, we often visit the company. We meet the people working around the position. We learn how the business operates. We understand the culture, goals, challenges, management style and what success actually looks like. We may even create our own internal branding and search document so everyone working on the assignment understands why the right person would want this job and why the wrong person probably won’t stay.",
      "Then we search. Our goal isn’t five resumes. It isn’t ten resumes. It isn’t a giant inbox. Our goal is to identify the strongest people we can find and be able to explain, in meaningful terms, why we’re putting each one in front of you.",
      "We’re not in the paper-moving business. We’re in the matching business.",
    ],
  },
];

/* The handoff's optional authority strip, recorded but not built. See the
   note at the top of this file. Delete this block once HSG decides. */
export const QUOTE_STRIP = {
  built: false,
  headline: "What Great Builders Say About Hiring the Best",
  note: "Needs 4–6 sourced, attributed quotations. Not built: quoting well-known business figures beside the HSG logo reads as endorsement, which the handoff's own brand note warns against. HSG's attributed client quotes on /testimonials/ carry the same authority and are real.",
};

export const CLOSING = {
  quote:
    "Hiring the right person is never just about filling a seat. It’s about protecting your culture, strengthening your company, and building what comes next.",
  cta: { label: "Ask Us the Tough Questions", href: "/find-talent/#start" },
  secondary: { label: "See how we search", href: "/find-talent/#collaborative" },
};
