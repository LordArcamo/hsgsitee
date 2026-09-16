/* ============================================================
   SITUATIONS WANTED — employer-side results data

   Built to HSG_Situations_Wanted_Claude_Code_Spec.md.

   Two separate things live here:

   1. SEARCH CRITERIA — whatever the employer typed into the
      "For Companies" form. Nothing about it is hard-coded: the page
      renders EXAMPLE_SEARCH as its default and `criteriaFromQuery`
      replaces it with the real answers at runtime.

   2. THE DEMONSTRATION POOL — seven fictional profiles. ALL PROFILES
      ARE FICTIONAL: no real candidate names, employers, resumes or
      contact details. They are a mechanical-engineering sample set and
      do not vary by searched role; replace `PROFESSIONALS` with the
      real, consented HSG feed before this page shows live candidates.

   Cards and the comparison table are both generated from `PROFESSIONALS`
   through `STATS` — there is no second copy of any figure.
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
    title: pick(raw(QUERY_KEYS.title), EXAMPLE_SEARCH.title),
    location: pick(raw(QUERY_KEYS.location), EXAMPLE_SEARCH.location),
    experienceRange: pick(experienceLabel(years), EXAMPLE_SEARCH.experienceRange),
    positionType: pick(
      opening ? (POSITION_LABELS[opening] ?? opening) : "",
      EXAMPLE_SEARCH.positionType,
    ),
    careerPath: pick(
      path ? (CAREER_PATH_LABELS[path] ?? path) : "",
      EXAMPLE_SEARCH.careerPath,
    ),
    salaryRange: pick(raw(QUERY_KEYS.salary), EXAMPLE_SEARCH.salaryRange),
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
  summary: string;
  yearsCurrentCompany: number;
  totalExperience: number;
  /** Whole dollars; formatted to "$110K" for display. */
  currentSalary: number;
  credential: string;
}

export const PROFESSIONALS: Professional[] = [
  {
    id: 1,
    name: "Tim",
    role: "Mechanical Engineer",
    summary:
      "Mechanical Engineer with 6 years of experience supporting product development, manufacturing improvement, and cross-functional engineering projects. Currently works in a mid-sized manufacturing environment and is interested in a role offering greater responsibility and a defined career path.",
    yearsCurrentCompany: 4,
    totalExperience: 6,
    currentSalary: 110000,
    credential: "B.S. Mechanical Engineering",
  },
  {
    id: 2,
    name: "Larry",
    role: "Mechanical Engineer",
    summary:
      "Mechanical Engineer with 6 years of experience in equipment design, process improvement, CAD modeling, and manufacturing support. Has progressed within his current organization and is exploring a position with stronger advancement opportunities.",
    yearsCurrentCompany: 5,
    totalExperience: 6,
    currentSalary: 105000,
    credential: "B.S. Mechanical Engineering",
  },
  {
    id: 3,
    name: "Peter",
    role: "Mechanical Engineer",
    summary:
      "Mechanical Engineer with 6 years of experience across mechanical design, testing, documentation, and production support. Interested in joining an organization where engineering responsibilities can expand alongside the business.",
    yearsCurrentCompany: 3,
    totalExperience: 6,
    currentSalary: 95000,
    credential: "B.S. Mechanical Engineering",
  },
  {
    id: 4,
    name: "David",
    role: "Mechanical Engineer",
    summary:
      "Mechanical Engineer with 7 years of experience in manufacturing engineering, equipment optimization, root-cause analysis, and continuous improvement. Looking for a role where technical experience can lead to greater project ownership and advancement.",
    yearsCurrentCompany: 4,
    totalExperience: 7,
    currentSalary: 112000,
    credential: "B.S. Mechanical Engineering",
  },
  {
    id: 5,
    name: "Kevin",
    role: "Mechanical Engineer",
    summary:
      "Mechanical Engineer with 5 years of experience in product design, prototyping, CAD, technical documentation, and collaboration with manufacturing teams. Interested in a position with broader engineering responsibility and long-term growth.",
    yearsCurrentCompany: 3,
    totalExperience: 5,
    currentSalary: 98000,
    credential: "M.S. Mechanical Engineering",
  },
  {
    id: 6,
    name: "Robert",
    role: "Mechanical Engineer",
    summary:
      "Mechanical Engineer with 6 years of experience supporting industrial equipment, design modifications, testing, and process improvement initiatives. Interested in joining a company offering stronger technical growth and advancement opportunities.",
    yearsCurrentCompany: 2,
    totalExperience: 6,
    currentSalary: 102000,
    credential: "B.S. Mechanical Engineering / EIT",
  },
  {
    id: 7,
    name: "Jason",
    role: "Mechanical Engineer",
    summary:
      "Mechanical Engineer with 4 years of experience in mechanical systems, product testing, design support, and manufacturing operations. Looking for a long-term position with increased responsibility and a clear career path.",
    yearsCurrentCompany: 3,
    totalExperience: 4,
    currentSalary: 92000,
    credential: "B.S. Mechanical Engineering",
  },
];

/* ============================================================
   3. The four statistics — one definition, two renderings
   ============================================================ */

const years = (n: number) => `${n} ${n === 1 ? "Year" : "Years"}`;
const salary = (n: number) => `$${Math.round(n / 1000)}K`;

export interface Stat {
  /** Used verbatim as the card label AND as the table column header. */
  label: string;
  value: (p: Professional) => string;
  /** Figures are right-aligned in the table and get tabular numerals. */
  numeric: boolean;
}

/**
 * The four statistics, in the one order they appear in — on every card and
 * as the columns of the comparison table. Add a statistic here and both
 * renderings pick it up; there is nowhere else to edit.
 */
export const STATS: Stat[] = [
  {
    label: "Years at Current Company",
    value: (p) => years(p.yearsCurrentCompany),
    numeric: true,
  },
  {
    label: "Overall Experience",
    value: (p) => years(p.totalExperience),
    numeric: true,
  },
  {
    label: "Current Salary",
    value: (p) => salary(p.currentSalary),
    numeric: true,
  },
  {
    label: "Highest Degree / Certification",
    value: (p) => p.credential,
    numeric: false,
  },
];
