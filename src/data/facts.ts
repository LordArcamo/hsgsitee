/* ============================================================
   EDITABLE FACTS — single source of truth.
   Verify every figure before production publish, then edit here only.
   Rendered into any element carrying data-fact="<key>".
   ============================================================ */

export type FactKey =
  "years" | "yearsSentence" | "placements" | "network" | "partners" | "resumes";

export const FACTS: Record<FactKey, string> = {
  years: "30",
  yearsSentence: "30 years of recruiting experience",
  placements: "1,200+",
  network: "1,600+",
  partners: "1,600",
  resumes: "4.3M+",
};
