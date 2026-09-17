/* ============================================================
   SITUATIONS WANTED — employer-side results data

   Built to HSG_Situations_Wanted_Claude_Code_Spec_v2.md.

   Two separate things live here:

   1. SEARCH CRITERIA — whatever the employer typed into the
      "For Companies" form. Nothing about it is hard-coded: the page
      renders EXAMPLE_SEARCH as its default and `criteriaFromQuery`
      replaces it with the real answers at runtime.

   2. THE DEMONSTRATION POOL — six fictional profiles. ALL PROFILES
      ARE FICTIONAL: no real candidate names, employers, resumes or
      contact details. They are a mechanical-engineering sample set and
      do not vary by searched role; replace `PROFESSIONALS` with the
      real, consented HSG feed before this page shows live candidates.

   The cards, the quick comparison panel and the full comparison table are
   all generated from `PROFESSIONALS` through the column definitions at the
   bottom of this file — there is no second copy of any figure.

   Summaries deliberately do NOT restate years, tenure or salary: those are
   the four statistics beside them, and per the copy doc the paragraph is
   there to add what the statistics cannot — software, specialty, and the
   kind of company the person is actually looking for.
   ============================================================ */

/* ============================================================
   1. Search criteria
   ============================================================ */

export interface SearchCriteria {
  /** Role searched for, singular, as the employer typed it. */
  title: string;
  location: string;
  /** Display-ready, e.g. "4–7 Years Experience". */
  experienceRange: string;
  /** Display-ready, e.g. "New Position". */
  positionType: string;
  /** Display-ready, e.g. "Career Path". */
  careerPath: string;
  /** As typed, e.g. "$90K–$120K". */
  salaryRange: string;
}

/**
 * The prototype example from the spec. This is the DEFAULT the page is
 * built with — it is not a hard-coded search. Any query string from the
 * "For Companies" form overrides every field of it.
 */
export const EXAMPLE_SEARCH: SearchCriteria = {
  title: "Mechanical Engineer",
  location: "Newark, NJ",
  experienceRange: "4–7 Years Experience",
  positionType: "New Position",
  careerPath: "Career Path",
  salaryRange: "$90K–$120K",
};

/**
 * Query keys, matched to the `name` attributes on the "For Companies"
 * form in components/AudienceBar.astro. Changing one means changing both.
 */
export const QUERY_KEYS = {
  title: "title",
  location: "location",
  years: "years",
  opening: "opening",
  path: "path",
  salary: "salary",
} as const;

/*
 * The form stores short answers ("New role", "Not sure"); the results line
 * states them back the way an employer would read them. Only "New Position"
 * and "Career Path" are given in the copy doc — the other three are
 * mechanical parallels and are PENDING CLIENT WORDING.
 */
const POSITION_LABELS: Record<string, string> = {
  "New role": "New Position",
  "New Position": "New Position",
  Replacement: "Replacement Position",
};

const CAREER_PATH_LABELS: Record<string, string> = {
  Yes: "Career Path",
  No: "No Career Path",
  "Not sure": "Career Path Undecided",
};

/** "3–5 years" and "4–7 Years" both read back as "… Years Experience". */
function experienceLabel(raw: string): string {
  const range = raw.trim().replace(/\s*years?\s*$/i, "");
  return range ? `${range} Years Experience` : "";
}

/* ============================================================
   Tidying what was typed

   Three free-text fields reach this page straight from the form, and
   whatever is in them becomes a 46px heading. Typed as-is they read as
   broken: "mechanical engineer" gives "Situations Wanted for mechanical
   engineers", "newark, nj" gives "Newark, Nj", and a salary of "100"
   gives a criteria chip that just says 100.

   None of this validates the search — it only presents it. An unknown
   word is still shown, because it is what the employer asked for.
   ============================================================ */

/** Nothing pasted into a form field should be able to eat the heading. */
const MAX_LENGTH = { title: 60, location: 60, salary: 40 };

const clean = (raw: string, max: number) =>
  raw.replace(/\s+/g, " ").trim().slice(0, max);

/** Small words that stay lowercase anywhere but the first position. */
const MINOR_WORDS = new Set([
  "a", "an", "and", "at", "for", "in", "of", "or", "the", "to",
]);

/** Job-title acronyms people type in lower case. */
const ACRONYMS = new Set([
  "cfo", "ceo", "coo", "cto", "cio", "cmo", "chro", "vp", "svp", "evp",
  "hr", "it", "qa", "ux", "ui", "pm", "gm", "ehs", "erp", "sap",
]);

function capitalizePart(part: string): string {
  if (!part) return part;
  if (ACRONYMS.has(part.toLowerCase())) return part.toUpperCase();
  // Something already carrying a capital was typed deliberately — "CFO",
  // "McKinsey", "iOS" — so it is left exactly as it came in.
  if (/[A-Z]/.test(part)) return part;
  return part.charAt(0).toUpperCase() + part.slice(1);
}

/** Title-case a word, including each half of a hyphenated one. */
const capitalizeWord = (word: string) =>
  word.split("-").map(capitalizePart).join("-");

export function titleCase(value: string): string {
  return value
    .split(" ")
    .map((word, i) =>
      i > 0 && MINOR_WORDS.has(word.toLowerCase())
        ? word.toLowerCase()
        : capitalizeWord(word),
    )
    .join(" ");
}

/** As titleCase, but a two-letter token is a state code, not a word. */
export function formatLocation(value: string): string {
  return titleCase(value)
    .split(" ")
    .map((word) => {
      const bare = word.replace(/[^A-Za-z]/g, "");
      return bare.length === 2 ? word.toUpperCase() : word;
    })
    .join(" ");
}

/**
 * Money, from a field with no format and only a placeholder to guide it.
 *
 * Anything already carrying a currency symbol is trusted and left alone.
 * A bare figure is read as thousands — "100" and "100k" and "100000" all
 * become "$100K" — because this field is a salary on an executive search
 * form, where 100 never means one hundred dollars. A figure that is not a
 * round number of thousands keeps its precision ("95500" → "$95,500"),
 * and anything containing words is left exactly as typed.
 *
 * NOTE: the thousands reading is an assumption about intent. It is the one
 * judgement call in here and is easy to drop if HSG would rather see the
 * raw entry.
 */
export function formatSalary(value: string): string {
  if (!value) return "";
  if (/[$£€]/.test(value)) return value;
  // Leave anything with words in it alone — "DOE", "negotiable", "per hour" —
  // but "to" and "and" are how people write a range, not words about money.
  const bare = value.replace(/k/gi, "").replace(/\b(?:to|and)\b/gi, "");
  if (/[a-z]/i.test(bare)) return value;

  const figures = value.match(/\d[\d,]*(?:\.\d+)?k?/gi);
  if (!figures) return value;

  const money = (figure: string) => {
    const hasK = /k$/i.test(figure);
    const n = Number(figure.replace(/[,k]/gi, ""));
    if (!Number.isFinite(n) || n <= 0) return null;
    const dollars = hasK || n < 1000 ? n * 1000 : n;
    return dollars % 1000 === 0
      ? `$${dollars / 1000}K`
      : `$${dollars.toLocaleString("en-US")}`;
  };

  const parts = figures.map(money);
  if (parts.some((p) => p === null)) return value;
  return parts.join(" – ");
}

/**
 * Resolve the criteria to display. Every field falls back to the example,
 * so a visitor who reaches this page with no query string — or with a
 * half-filled one — still sees a coherent search rather than a gap.
 */
export function criteriaFromQuery(params: URLSearchParams): SearchCriteria {
  const raw = (key: string) => (params.get(key) ?? "").trim();
  const pick = (value: string, fallback: string) => value || fallback;

  const years = raw(QUERY_KEYS.years);
  const opening = raw(QUERY_KEYS.opening);
  const path = raw(QUERY_KEYS.path);

  return {
    title: pick(
      titleCase(clean(raw(QUERY_KEYS.title), MAX_LENGTH.title)),
      EXAMPLE_SEARCH.title,
    ),
    location: pick(
      formatLocation(clean(raw(QUERY_KEYS.location), MAX_LENGTH.location)),
      EXAMPLE_SEARCH.location,
    ),
    experienceRange: pick(experienceLabel(years), EXAMPLE_SEARCH.experienceRange),
    positionType: pick(
      opening ? (POSITION_LABELS[opening] ?? opening) : "",
      EXAMPLE_SEARCH.positionType,
    ),
    careerPath: pick(
      path ? (CAREER_PATH_LABELS[path] ?? path) : "",
      EXAMPLE_SEARCH.careerPath,
    ),
    salaryRange: pick(
      formatSalary(clean(raw(QUERY_KEYS.salary), MAX_LENGTH.salary)),
      EXAMPLE_SEARCH.salaryRange,
    ),
  };
}

/** The criteria line, in the order the spec prints it. */
export function criteriaRow(
  c: SearchCriteria,
): { key: string; label: string; value: string }[] {
  return [
    { key: "location", label: "Location", value: c.location },
    { key: "experience", label: "Experience", value: c.experienceRange },
    { key: "position", label: "Opening", value: c.positionType },
    { key: "careerPath", label: "Career path", value: c.careerPath },
    { key: "salary", label: "Salary range", value: c.salaryRange },
  ];
}

/* ---------- pluralising the searched title ---------- */

function pluralWord(word: string): string {
  if (/[^aeiou]y$/i.test(word)) return `${word.slice(0, -1)}ies`;
  if (/(s|x|z|ch|sh)$/i.test(word)) return `${word}es`;
  return `${word}s`;
}

/**
 * "Mechanical Engineer" → "Mechanical Engineers", but
 * "Director of Operations" → "Directors of Operations": the head noun is
 * what pluralises, and in a title containing " of " that is the word in
 * front of it, not the last word. A head noun that is already plural
 * ("Sales", "Operations") is left alone.
 */
export function pluralizeTitle(title: string): string {
  const trimmed = title.trim();
  if (!trimmed) return trimmed;

  const of = trimmed.search(/\s+of\s+/i);
  const head = of > -1 ? trimmed.slice(0, of) : trimmed;
  const tail = of > -1 ? trimmed.slice(of) : "";

  const words = head.split(/\s+/);
  const last = words[words.length - 1] ?? "";
  if (/s$/i.test(last) && !/ss$/i.test(last)) return trimmed;

  words[words.length - 1] = pluralWord(last);
  return words.join(" ") + tail;
}

/* ============================================================
   2. The demonstration pool — ALL PROFILES FICTIONAL
   ============================================================ */

export interface Professional {
  id: number;
  /** First name only, and an invented one. */
  name: string;
  role: string;
  /**
   * What the four statistics cannot say: software, specialty, and the kind
   * of company they want. Must NOT restate tenure, total experience or
   * salary — those sit beside it as statistics.
   */
  summary: string;
  yearsCurrentCompany: number;
  totalExperience: number;
  /** Whole dollars; formatted to "$110K" for display. */
  currentSalary: number;
  credential: string;
  /** One or two real tools — enough to tell the profiles apart, not a list. */
  software: string[];
  /**
   * The kind of company they want. Not shown as its own field — it is the
   * closing thought of the summary — but kept here so a real feed can be
   * filtered on it.
   */
  workPreference: string;
}

export const PROFESSIONALS: Professional[] = [
  {
    id: 1,
    name: "Tim",
    role: "Mechanical Engineer",
    summary:
      "Product-focused mechanical engineer experienced with SOLIDWORKS and Ansys Mechanical, with strong exposure to component design, prototyping, and design validation. Interested in joining a smaller privately held company where engineering works closely with ownership and where he can take greater responsibility for products from concept through production.",
    yearsCurrentCompany: 4,
    totalExperience: 6,
    currentSalary: 110000,
    credential: "B.S. Mechanical Engineering",
    software: ["SOLIDWORKS", "Ansys Mechanical"],
    workPreference: "Smaller privately held company",
  },
  {
    id: 2,
    name: "Larry",
    role: "Mechanical Engineer",
    summary:
      "Mechanical design engineer who works primarily with PTC Creo and has experience supporting complex assemblies, design revisions, and manufacturing handoffs. Looking for an established company with a clear advancement path and a team where he can grow into greater technical and project leadership responsibility.",
    yearsCurrentCompany: 5,
    totalExperience: 6,
    currentSalary: 105000,
    credential: "B.S. Mechanical Engineering",
    software: ["PTC Creo"],
    workPreference: "Established company with advancement path",
  },
  {
    id: 3,
    name: "Peter",
    role: "Mechanical Engineer",
    summary:
      "Hands-on mechanical engineer using Autodesk Inventor and AutoCAD Mechanical for machine components, production drawings, and manufacturing support. Prefers a local manufacturing environment where engineers stay close to the shop floor and can see their designs move from drawing through fabrication and final use.",
    yearsCurrentCompany: 3,
    totalExperience: 6,
    currentSalary: 95000,
    credential: "B.S. Mechanical Engineering",
    software: ["Autodesk Inventor", "AutoCAD Mechanical"],
    workPreference: "Local hands-on manufacturing environment",
  },
  {
    id: 4,
    name: "David",
    role: "Mechanical Engineer",
    summary:
      "Design engineer with experience working in Siemens NX on larger assemblies and technically complex products. Interested in becoming part of a larger engineering team where he can collaborate with specialists, contribute to more complex programs, and continue developing within a structured engineering organization.",
    yearsCurrentCompany: 4,
    totalExperience: 7,
    currentSalary: 112000,
    credential: "B.S. Mechanical Engineering",
    software: ["Siemens NX"],
    workPreference: "Larger structured engineering team",
  },
  {
    id: 5,
    name: "Kevin",
    role: "Mechanical Engineer",
    summary:
      "Product-development engineer comfortable in CATIA V5 and cross-functional design environments, with experience working alongside manufacturing, quality, and product teams. Looking for a growth-oriented organization where engineers have broad ownership and can contribute directly to new-product development rather than working in a narrowly defined role.",
    yearsCurrentCompany: 3,
    totalExperience: 5,
    currentSalary: 98000,
    credential: "M.S. Mechanical Engineering",
    software: ["CATIA V5"],
    workPreference: "Growth-oriented company with broad ownership",
  },
  {
    id: 6,
    name: "Robert",
    role: "Mechanical Engineer",
    summary:
      "Mechanical engineer focused on design improvement and analysis, with experience using Autodesk Fusion and Inventor Nastran for modeling, iteration, and simulation work. Interested in a company where technical problem-solving is valued and where he can work with a collaborative engineering group while still owning meaningful projects.",
    yearsCurrentCompany: 2,
    totalExperience: 6,
    currentSalary: 102000,
    credential: "B.S. Mechanical Engineering / EIT",
    software: ["Autodesk Fusion", "Inventor Nastran"],
    workPreference: "Collaborative team with individual project ownership",
  },
];

/* ============================================================
   3. Columns — one definition, three renderings

   The cards, the quick comparison panel and the full table all read from
   these. `label` is the long form the cards use; `short` is the column
   header, because six full labels across one table row will not fit.
   ============================================================ */

const years = (n: number) => `${n} ${n === 1 ? "Year" : "Years"}`;
const salary = (n: number) => `$${Math.round(n / 1000)}K`;

export interface Stat {
  /** Long form — the card's label for this statistic. */
  label: string;
  /** Column header. Falls back to `label` where they are the same. */
  short?: string;
  value: (p: Professional) => string;
  /** Figures are right-aligned and get tabular numerals. */
  numeric: boolean;
}

/** Column header for a stat — `short` when it has one. */
export const header = (s: Stat): string => s.short ?? s.label;

/**
 * The four card statistics, in the one order they appear in on every card.
 */
export const STATS: Stat[] = [
  {
    label: "Years at Current Company",
    short: "Current Co.",
    value: (p) => years(p.yearsCurrentCompany),
    numeric: true,
  },
  {
    label: "Overall Experience",
    short: "Overall Exp.",
    value: (p) => years(p.totalExperience),
    numeric: true,
  },
  {
    label: "Current Salary",
    short: "Salary",
    value: (p) => salary(p.currentSalary),
    numeric: true,
  },
  {
    label: "Highest Degree / Certification",
    short: "Degree / Certification",
    value: (p) => p.credential,
    numeric: false,
  },
];

/** The software column — full table only; the cards carry it as chips. */
const SOFTWARE: Stat = {
  label: "Software / Tools",
  value: (p) => p.software.join(", "),
  numeric: false,
};

/**
 * The compact panel that puts a comparison in front of HR before they have
 * scrolled past the first candidate. Deliberately only the two fields an
 * employer triages on — it is a preview, not a second table.
 */
export const QUICK_STATS: Stat[] = [STATS[1]!, STATS[2]!];

/** The full spreadsheet at the bottom: the four statistics, plus software. */
export const FULL_STATS: Stat[] = [...STATS, SOFTWARE];
