/* ============================================================
   JOB TEASER DATA — DESIGN EXAMPLES ONLY.
   Per the copy doc these must NOT ship as live openings. Replace this
   array with the real HSG job feed before launch; 5 roles per page,
   rotating calmly with a pause control.
   ============================================================ */

export interface Job {
  title: string;
  industry: string;
  location: string;
}

/** One inner array per rotating page of the opportunities board. */
export const JOB_PAGES: Job[][] = [
  [
    {
      title: "General & Operations Manager",
      industry: "Operations",
      location: "New Jersey / New York Metro",
    },
    {
      title: "Finance Executive / CFO",
      industry: "Finance",
      location: "New Jersey / Northeast",
    },
    {
      title: "Software & Technology Leader",
      industry: "Technology",
      location: "New Jersey / Remote",
    },
    {
      title: "Sales & Business Development Executive",
      industry: "Sales",
      location: "New Jersey / New York Metro",
    },
    {
      title: "Medical & Health Services Manager",
      industry: "Healthcare",
      location: "New Jersey",
    },
  ],
  [
    {
      title: "Accounting & Finance Professional",
      industry: "Finance",
      location: "New Jersey / New York Metro",
    },
    {
      title: "Management & Business Strategy Professional",
      industry: "Management",
      location: "New Jersey",
    },
    {
      title: "Information Security / Cybersecurity Professional",
      industry: "Technology",
      location: "New Jersey / Remote",
    },
    {
      title: "Data & Analytics Professional",
      industry: "Technology",
      location: "New Jersey / Remote",
    },
    {
      title: "Healthcare Executive / Administrator",
      industry: "Healthcare",
      location: "New Jersey",
    },
  ],
];
