/* ============================================================
   SITUATIONS WANTED — the employer's search, and the stat columns

   The candidates themselves live in data/role-groups.ts. This file is
   only about the search that produced them and the columns they are
   displayed through.

   Per HSG_For_Companies_and_Situations_Wanted_Update.md the role is no
   longer free text: the employer picks one of ten role groups, and that
   choice is the page they land on. Everything else on the criteria line
   is still theirs — location, experience band, new/replacement, career
   path and salary range — and arrives as a query string.

   Four of those five are controlled vocabularies, so they are round-
   tripped as short tokens ("15-20", "replacement") and read back through
   the tables below. Only location and salary are typed freely.
   ============================================================ */

/* ============================================================
   1. The controlled answers
   ============================================================ */

/**
 * Query keys, matched to the `name` attributes on the "For Companies"
 * form in components/AudienceBar.astro. Changing one means changing both.
 * `role` is not here: it is the URL segment, not a parameter.
 */
export const QUERY_KEYS = {
  location: "location",
  experience: "experience",
  position: "position",
  careerPath: "careerPath",
  salary: "salary",
} as const;

export interface Option {
  /** What travels in the URL. */
  value: string;
  /** What the form shows. */
  label: string;
  /** What the results page prints on the criteria line. */
  display: string;
}

/**
 * Leadership-level experience bands. The form shows `label`, the criteria
 * line shows `display`.
 *
 * `display` states the answer back rather than interpreting it: an employer
 * who said "Flexible / Not Sure" is told their experience range is flexible,
 * not given a reading of what that implies.
 */
export const EXPERIENCE_OPTIONS: Option[] = [
  { value: "5-8", label: "5–8 Years", display: "5–8 Years Experience" },
  { value: "8-12", label: "8–12 Years", display: "8–12 Years Experience" },
  { value: "12-15", label: "12–15 Years", display: "12–15 Years Experience" },
  { value: "15-20", label: "15–20 Years", display: "15–20 Years Experience" },
  { value: "20+", label: "20+ Years", display: "20+ Years Experience" },
  { value: "flexible", label: "Flexible / Not Sure", display: "Experience: Flexible" },
];

/** New or replacement. "New Position" and "Replacement Position" per spec. */
export const POSITION_OPTIONS: Option[] = [
  { value: "new", label: "New Role", display: "New Position" },
  { value: "replacement", label: "Replacement", display: "Replacement Position" },
];

/**
 * Career path. The criteria line repeats the employer's own answer — "No"
 * means they answered no, which is not the same claim as "No Career Path",
 * and "Not Sure" is not a verdict that the path is undecided.
 */
export const CAREER_PATH_OPTIONS: Option[] = [
  { value: "yes", label: "Yes", display: "Career Path: Yes" },
  { value: "no", label: "No", display: "Career Path: No" },
  { value: "not-sure", label: "Not Sure", display: "Career Path: Not Sure" },
];

const displayFor = (options: Option[], value: string): string =>
  options.find((o) => o.value === value)?.display ?? "";

/* ============================================================
   2. The two free-text answers

   Location and salary reach this page as the employer typed them, and
   whatever is in them lands on the criteria line. Typed as-is they read
   as broken: "newark, nj" gives "Newark, Nj", and a salary of "180"
   gives a chip that just says 180.

   None of this validates the search — it only presents it.
   ============================================================ */

/** Nothing pasted into a form field should be able to eat the layout. */
export const MAX_LENGTH = { location: 60, salary: 40 };

export const clean = (raw: string, max: number) =>
  raw.replace(/\s+/g, " ").trim().slice(0, max);

/** Small words that stay lowercase anywhere but the first position. */
const MINOR_WORDS = new Set(["a", "an", "and", "at", "for", "in", "of", "or", "the", "to"]);

function capitalizePart(part: string): string {
  if (!part) return part;
  // Something already carrying a capital was typed deliberately — "NYC",
  // "McKinsey" — so it is left exactly as it came in.
  if (/[A-Z]/.test(part)) return part;
  return part.charAt(0).toUpperCase() + part.slice(1);
}

/** Title-case a word, including each half of a hyphenated one. */
const capitalizeWord = (word: string) =>
  word.split("-").map(capitalizePart).join("-");

function titleCase(value: string): string {
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

/* ---------- salary, in both directions ---------- */

/**
 * Read the figures out of a typed salary range as whole thousands.
 * "$180K – $225K", "180-225", "180000 to 225000" all give [180, 225].
 * Anything with words in it ("DOE", "negotiable") gives null, and is then
 * carried through as typed rather than mangled into a number.
 */
function salaryFigures(value: string): number[] | null {
  if (!value) return null;
  // "to" and "and" are how people write a range, not words about money.
  const words = value
    .replace(/[$£€,]/g, "")
    .replace(/k/gi, "")
    .replace(/\b(?:to|and)\b/gi, "");
  if (/[a-z]/i.test(words)) return null;

  const figures = value.match(/\d[\d,]*(?:\.\d+)?k?/gi);
  if (!figures) return null;

  const thousands = figures.map((figure) => {
    const hasK = /k$/i.test(figure);
    const n = Number(figure.replace(/[,k]/gi, ""));
    if (!Number.isFinite(n) || n <= 0) return null;
    // A salary field on an executive search form: 180 never means $180.
    const dollars = hasK || n < 1000 ? n * 1000 : n;
    return dollars / 1000;
  });

  return thousands.some((n) => n === null) ? null : (thousands as number[]);
}

/**
 * Typed salary to the URL token the spec uses: "$180K – $225K" → "180-225".
 * Anything that is not a plain range travels as typed.
 */
export function encodeSalary(value: string): string {
  const figures = salaryFigures(value);
  if (!figures || figures.length === 0 || figures.length > 2) return value.trim();
  return figures.map((n) => String(Math.round(n))).join("-");
}

/** "180-225" → "$180K–$225K". Anything else is presented as it arrived. */
export function decodeSalary(value: string): string {
  const raw = value.trim();
  if (!raw) return "";
  const figures = salaryFigures(raw);
  if (!figures || figures.length === 0 || figures.length > 2) return raw;
  return figures.map((n) => `$${Math.round(n)}K`).join("–");
}

/* ============================================================
   3. Resolving the criteria
   ============================================================ */

export interface SearchCriteria {
  location: string;
  experienceRange: string;
  positionType: string;
  careerPath: string;
  salaryRange: string;
}

/**
 * The spec's worked example. Each role page is prerendered, so there is no
 * query string at build time and this is what the criteria line carries
 * until `scripts/situations.ts` replaces it with the real answers. On a
 * search-driven load the line is held invisible until that happens, so
 * this example is never shown in place of someone's actual search.
 */
export const EXAMPLE_CRITERIA: SearchCriteria = {
  location: "Newark, NJ",
  experienceRange: "15–20 Years Experience",
  positionType: "Replacement Position",
  careerPath: "Career Path: Yes",
  salaryRange: "$180K–$225K",
};

/**
 * Resolve the criteria to display from the query string.
 *
 * An answer that is absent or unrecognised resolves to an empty string and
 * its chip is dropped, rather than being filled in with something the
 * employer never said.
 */
export function criteriaFromQuery(params: URLSearchParams): SearchCriteria {
  const raw = (key: string) => (params.get(key) ?? "").trim();

  return {
    location: formatLocation(clean(raw(QUERY_KEYS.location), MAX_LENGTH.location)),
    experienceRange: displayFor(EXPERIENCE_OPTIONS, raw(QUERY_KEYS.experience)),
    positionType: displayFor(POSITION_OPTIONS, raw(QUERY_KEYS.position)),
    careerPath: displayFor(CAREER_PATH_OPTIONS, raw(QUERY_KEYS.careerPath)),
    salaryRange: decodeSalary(clean(raw(QUERY_KEYS.salary), MAX_LENGTH.salary)),
  };
}

/**
 * Some values now name themselves — "Career Path: Yes", "Experience:
 * Flexible" — and a screen reader announcing the chip's own label in front
 * of one reads "Career path: Career Path: Yes". Where the value already
 * opens with its label, the label is dropped instead.
 */
const srLabel = (label: string, value: string) =>
  value.toLowerCase().startsWith(label.toLowerCase()) ? "" : label;

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
  ].map((item) => ({ ...item, label: srLabel(item.label, item.value) }));
}

/* ============================================================
   3b. Ranking the six

   The role is a hard requirement and is already settled before any of this
   runs: the page the employer is on holds one profession's people and no
   others, so ranking cannot reach across professions. All it does is
   decide who is read first.

   Experience is the strong factor and salary the secondary one, so the two
   are put on one scale — a year of experience outside the requested band
   weighs the same as SALARY_PER_YEAR thousand dollars outside the requested
   range. Everyone inside both scores zero and keeps the order they were
   written in.

   None of this is shown. There is no percentage, no badge and no "97%
   match"; the employer sees six professionals in a considered order.

   Location, new/replacement and career path are deliberately NOT used. The
   candidate records carry no location, no opening type and no career-path
   field, so ranking on them would be theatre. They confirm the employer's
   search at the top of the page and nothing more, until real candidate data
   gives them something to match against.
   ============================================================ */

/** A year of experience off the band weighs this many $K off the range. */
const SALARY_PER_YEAR = 50;

const EXPERIENCE_BANDS: Record<string, [number, number]> = {
  "5-8": [5, 8],
  "8-12": [8, 12],
  "12-15": [12, 15],
  "15-20": [15, 20],
  "20+": [20, Infinity],
  // "flexible" is absent on purpose: it constrains nothing.
};

/** How far outside a range a figure sits. Inside it, zero. */
const outside = (value: number, [lo, hi]: [number, number]) =>
  value < lo ? lo - value : value > hi ? value - hi : 0;

/**
 * The only fields ranking needs. The cards carry them as data attributes,
 * so the browser can rank the rendered six without the whole candidate
 * dataset being shipped to it.
 */
export interface Rankable {
  id: number;
  totalExperience: number;
  currentSalary: number;
}

export function rankCandidates<T extends Rankable>(
  candidates: T[],
  params: URLSearchParams,
): T[] {
  const band = EXPERIENCE_BANDS[(params.get(QUERY_KEYS.experience) ?? "").trim()];
  const figures = salaryFigures(
    clean(params.get(QUERY_KEYS.salary) ?? "", MAX_LENGTH.salary),
  );
  const budget: [number, number] | undefined =
    figures && figures.length > 0
      ? [figures[0]!, figures[figures.length - 1]!]
      : undefined;

  /* Nothing to rank on — "Flexible / Not Sure" experience and a salary of
     "DOE" — so leave the six as written rather than inventing an order. */
  if (!band && !budget) return [...candidates];

  const distance = (c: T) =>
    (band ? outside(c.totalExperience, band) : 0) +
    (budget ? outside(c.currentSalary / 1000, budget) / SALARY_PER_YEAR : 0);

  // Stable: candidates that are equally close keep their original order.
  return [...candidates].sort((a, b) => distance(a) - distance(b));
}

/* ============================================================
   4. Columns — one definition, three renderings

   The cards, the quick comparison panel and the full table all read from
   these. `label` is the long form the cards use; `short` is the column
   header, because full labels across one table row will not fit.
   ============================================================ */

import type { Professional } from "./role-groups";

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

/** The four standardized card statistics, in the spec's order. */
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

/** Current title — full table only; the cards carry it under the name. */
const CURRENT_ROLE: Stat = {
  label: "Current Role",
  value: (p) => p.role,
  numeric: false,
};

/** The tools column — full table only; the cards carry it as chips. */
const TOOLS: Stat = {
  label: "Software / Tools",
  value: (p) => p.tools.join(", "),
  numeric: false,
};

/**
 * The compact panel that puts a comparison in front of HR before they have
 * scrolled past the first candidate. Deliberately only the two fields the
 * spec names — it is a preview, not a second table.
 */
export const QUICK_STATS: Stat[] = [STATS[1]!, STATS[2]!];

/** The full spreadsheet at the bottom, in the spec's column order. */
export const FULL_STATS: Stat[] = [CURRENT_ROLE, ...STATS, TOOLS];
