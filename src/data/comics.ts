/* ---------- The comic strips ----------
   Michael, on the call: a comic strip on almost every page, because the HR
   people at his convention were burnt out and a comic gives them somewhere
   comfortable to land. Michael is the main character; the purple squirrel is
   in the background, in the circle.

   WHY THE CAPTIONS LIVE HERE AND NOT IN THE ARTWORK

   Ruben's note was that the text may not be readable, and he was right.
   Measured: the strips arrive 1448px wide and their largest lettering — the
   yellow caption bars — is 20px tall. Rendered as one six-panel image that
   is 15.9px on a desktop and 4.9px on a phone. Everything smaller than the
   caption, which is every speech bubble and every sign in the art, is worse.

   Two things follow:

   1. Six panels, not one image. One panel gets the full column on a phone
      rather than a third of it, which is three times the size for free.
   2. The caption comes out of the picture and becomes type. It stays sharp
      at any width, a screen reader can read it, Google can read it, and
      Michael can change a line without anyone regenerating the artwork.

   The speech bubbles stay in the art. They are drawn lettering and part of
   the joke; the alt text carries them for anyone who cannot see them. */

export interface ComicPanel {
  /** Matches the file name in src/assets/comics/. */
  key: string;
  /** Was the yellow bar. Now type. */
  caption: string;
  /** What is happening, for a screen reader and for Google. The drawn
      dialogue is quoted here because it is not text anywhere else. */
  alt: string;
}

export interface ComicStrip {
  id: string;
  eyebrow: string;
  title: string;
  lede: string;
  panels: ComicPanel[];
}

/* The employer side: what it takes to reach someone who is not looking. */
export const DIG: ComicStrip = {
  id: "comic-dig",
  eyebrow: "The short version",
  title: "Some Opportunities Are Worth Digging For",
  lede: "The person you want is usually not answering job ads. Here is what reaching them actually looks like.",
  panels: [
    {
      key: "dig-1",
      caption: "Michael goes the extra mile to find the right person.",
      alt: "Michael at his desk under a Hiring Solutions Group sign reading “Great People Change Companies”, thinking of a candidate: “Perfect fit… just need to reach him!” A whiteboard lists Find, Connect, Create Opportunity, Change Lives, Repeat.",
    },
    {
      key: "dig-2",
      caption: "He literally tunnels to find him.",
      alt: "A cutaway of the ground between two offices. Michael digs through the earth with a pickaxe, from his own office towards one marked “Passive Candidate”. A dotted arrow reads “Some opportunities are worth digging for.”",
    },
    {
      key: "dig-3",
      caption: "The passive candidate is overwhelmed.",
      alt: "The candidate sits buried between towers of paper labelled Reports, Meetings, Deadlines, Budgets, Planning, Emails and Compliance, thinking “I would do anything to get out of here!” His mug reads “Just one more thing…”",
    },
    {
      key: "dig-4",
      caption: "Michael makes the offer.",
      alt: "Michael bursts up through the office floor in a shower of earth, holding a three-sided sign: “Want to come with me?”, “The other side: job description”, and “Come now. If it doesn’t work out, you’ll be back in 30 minutes.” The candidate stares, astonished.",
    },
    {
      key: "dig-5",
      caption: "The candidate joins the journey.",
      alt: "In a lantern-lit tunnel, Michael reaches back and pulls the candidate up by the hand. Signposts along the way read “Better conversations”, “New possibilities” and “A brighter next chapter”.",
    },
    {
      key: "dig-6",
      caption: "Back at the office — a brighter next step.",
      alt: "The candidate, still dusty, sits with Michael and a colleague under a sign reading “Same people. Brighter futures.” She asks, “Where did you get that — what were you digging for gold?” He answers, “Sort of.”",
    },
  ],
};

/* The candidate side: what happens to your name after the conversation. */
export const NET: ComicStrip = {
  id: "comic-net",
  eyebrow: "The short version",
  title: "We Leave No Stone Unturned",
  lede: "What actually happens to your name once we have had the conversation.",
  panels: [
    {
      key: "net-1",
      caption: "Michael meets the candidate.",
      alt: "Michael talks with a candidate across his desk: “Tell me about your experience, your goals, and what would be the right next step for you.” She answers that it is exactly the kind of opportunity she has been looking for. Books beside them read Listen, Understand, Build Rapport, Find Their Fit, Referral Network.",
    },
    {
      key: "net-2",
      caption: "He writes the summary.",
      alt: "Michael types a candidate summary on screen, with sections for key experience, core skills, career goals, ideal opportunities and why she is a great fit. A note reads “Great people deserve great opportunities.”",
    },
    {
      key: "net-3",
      caption: "The referral network goes to work.",
      alt: "Michael presses a large red “Send to my referral network” button. Envelopes fly out towards emails, LinkedIn outreach, texts to key contacts and former colleagues.",
    },
    {
      key: "net-4",
      caption: "Three tubes cover the territory.",
      alt: "Michael loads capsules into three pneumatic tubes labelled New York, Northern New Jersey and All New Jersey, under a sign reading “Referral network dispatch”.",
    },
    {
      key: "net-5",
      caption: "Even the carrier pigeons get involved.",
      alt: "Michael stands with a row of carrier pigeons wearing small satchels: “Email, tubes, texts… and a few trusted pigeons too! Let’s get this everywhere!” A checklist covers email, LinkedIn, industry friends, former colleagues, client partners and beyond.",
    },
    {
      key: "net-6",
      caption: "We leave no stone unturned.",
      alt: "Michael lifts the last of a field of stones labelled referrals, alumni, past candidates, former colleagues, clients, community, events, partners and LinkedIn. A banner reads “We leave no stone unturned.”",
    },
  ],
};
