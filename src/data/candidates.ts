/* ============================================================
   SHORTLIST DEMONSTRATION DATA

   ALL PROFILES ARE FICTIONAL. No real candidate data, no real names,
   no identifiable employers. Edit freely — nothing here is a claim.
   ============================================================ */

/** How well a profile evidences one role requirement. */
export const enum Evidence {
  NotEvidenced = 0,
  Limited = 1,
  Evidenced = 2,
}

/** Human-readable label for each evidence level, shown in the detail list. */
export const EVIDENCE_LABEL: Record<Evidence, string> = {
  [Evidence.Evidenced]: "Yes",
  [Evidence.Limited]: "Limited",
  [Evidence.NotEvidenced]: "Not evidenced",
};

/**
 * The six role requirements, in the order they appear on the role card and
 * in every candidate's `criteria` tuple.
 */
export const CANDIDATE_CRITERIA = [
  "Multi-site operations", "P&L responsibility", "Leadership development",
  "Process improvement", "Cross-functional communication", "Growth-stage experience"
] as const;

/** Six evidence levels, positionally matched to CANDIDATE_CRITERIA. */
export type CriteriaScores = [
  Evidence, Evidence, Evidence, Evidence, Evidence, Evidence,
];

export interface Candidate {
  id: number;
  role: string;
  years: number;
  industry: string;
  /** Size of the team led, as displayed (e.g. "180+"). */
  teamSize: string;
  /** Budget or P&L scope, as displayed (e.g. "$120M P&L"). */
  scope: string;
  criteria: CriteriaScores;
  strength: string;
  watchPoint: string;
  /**
   * Stage index at which the profile leaves the pool:
   * 2 Evaluate · 3 Interview · 4 Vet · 5 Decide.
   * `0` marks a finalist, who never leaves.
   */
  exitsAt: number;
  /** Reason shown on the card as it leaves. Empty for finalists. */
  exitReason: string;
}

export const CANDIDATES: Candidate[] = [
  /* --- leave at Evaluate: scope or accountability below the role --- */
  { id: 1, role: "Director of Operations", years: 14, industry: "Consumer Products", teamSize: "55", scope: "$38M unit", criteria: [0,1,2,2,1,1], strength: "Process improvement", watchPoint: "First potential VP role", exitsAt: 2, exitReason: "No multi-site operations experience"},
  { id: 2, role: "Plant General Manager", years: 17, industry: "Manufacturing", teamSize: "120", scope: "$65M facility", criteria: [0,2,2,2,1,1], strength: "Culture turnaround", watchPoint: "Limited corporate-level exposure", exitsAt: 2, exitReason: "Single-site scope only"},
  { id: 3, role: "Operations Manager", years: 11, industry: "Packaging", teamSize: "40", scope: "Department budget", criteria: [0,0,1,2,1,1], strength: "Scheduling discipline", watchPoint: "No budget ownership", exitsAt: 2, exitReason: "No P&L responsibility"},
  { id: 4, role: "Director of Manufacturing", years: 15, industry: "Automotive Supply", teamSize: "90", scope: "$44M plant", criteria: [0,1,1,2,1,0], strength: "Lean deployment", watchPoint: "Narrow commercial exposure", exitsAt: 2, exitReason: "Single-site scope only"},
  { id: 5, role: "Senior Operations Manager", years: 12, industry: "Food & Beverage", teamSize: "65", scope: "Cost centre", criteria: [0,0,1,2,2,1], strength: "Throughput gains", watchPoint: "Has not carried a P&L", exitsAt: 2, exitReason: "No P&L responsibility"},
  { id: 6, role: "Director of Continuous Improvement", years: 16, industry: "Electronics", teamSize: "22", scope: "Programme budget", criteria: [1,0,1,2,2,1], strength: "Six Sigma programme design", watchPoint: "Staff rather than line role", exitsAt: 2, exitReason: "No P&L responsibility"},
  { id: 7, role: "Plant Manager", years: 19, industry: "Chemicals", teamSize: "140", scope: "$58M site", criteria: [0,1,2,2,1,1], strength: "Safety record", watchPoint: "Long tenure at one site", exitsAt: 2, exitReason: "Single-site scope only"},
  { id: 8, role: "Operations Director", years: 13, industry: "Printing", teamSize: "48", scope: "$21M unit", criteria: [0,1,1,1,1,1], strength: "Client delivery", watchPoint: "Declining sector experience", exitsAt: 2, exitReason: "Scope below the role requirement"},
  { id: 9, role: "VP Manufacturing", years: 22, industry: "Textiles", teamSize: "210", scope: "$95M", criteria: [1,2,2,1,1,0], strength: "Capacity planning", watchPoint: "Two sites, closely co-located", exitsAt: 2, exitReason: "Multi-site exposure limited to two locations"},
  { id: 10, role: "Director of Logistics", years: 14, industry: "Distribution", teamSize: "70", scope: "Network budget", criteria: [1,0,1,2,2,1], strength: "Carrier negotiation", watchPoint: "Functional rather than general management", exitsAt: 2, exitReason: "No P&L responsibility"},
  { id: 11, role: "General Manager", years: 18, industry: "Building Products", teamSize: "85", scope: "$40M branch", criteria: [0,2,1,1,1,1], strength: "Branch turnaround", watchPoint: "Regional remit only", exitsAt: 2, exitReason: "Single-site scope only"},
  { id: 12, role: "Operations Lead", years: 9, industry: "Contract Manufacturing", teamSize: "30", scope: "Cost centre", criteria: [0,0,1,2,1,2], strength: "Rapid ramp-up", watchPoint: "Early in management career", exitsAt: 2, exitReason: "No P&L responsibility"},
  { id: 13, role: "Director of Operations", years: 16, industry: "Medical Devices", teamSize: "58", scope: "$33M", criteria: [0,1,2,2,2,1], strength: "Regulated environment delivery", watchPoint: "Single facility throughout career", exitsAt: 2, exitReason: "No multi-site operations experience"},
  { id: 14, role: "Plant Director", years: 20, industry: "Metal Fabrication", teamSize: "160", scope: "$72M site", criteria: [0,2,1,2,1,0], strength: "Capital project delivery", watchPoint: "Little exposure outside operations", exitsAt: 2, exitReason: "Single-site scope only"},
  { id: 15, role: "Manufacturing Manager", years: 10, industry: "Plastics", teamSize: "35", scope: "Department", criteria: [0,0,1,2,1,1], strength: "Changeover reduction", watchPoint: "No general management remit", exitsAt: 2, exitReason: "No P&L responsibility"},
  { id: 16, role: "Regional Manager", years: 15, industry: "Industrial Services", teamSize: "60", scope: "$26M region", criteria: [1,1,1,1,2,1], strength: "Customer retention", watchPoint: "Service rather than production", exitsAt: 2, exitReason: "Scope below the role requirement"},
  { id: 17, role: "Director of Supply Chain", years: 17, industry: "Apparel", teamSize: "42", scope: "Function budget", criteria: [1,0,2,2,2,1], strength: "Supplier development", watchPoint: "Functional leadership only", exitsAt: 2, exitReason: "No P&L responsibility"},
  { id: 18, role: "Operations Director", years: 12, industry: "E-commerce Fulfilment", teamSize: "110", scope: "$29M", criteria: [1,1,1,2,1,2], strength: "Peak season scaling", watchPoint: "Short tenure pattern", exitsAt: 2, exitReason: "Scope below the role requirement"},
  { id: 19, role: "Site Operations Manager", years: 13, industry: "Aerospace Components", teamSize: "75", scope: "Cost centre", criteria: [0,0,2,2,1,1], strength: "Quality systems", watchPoint: "No commercial accountability", exitsAt: 2, exitReason: "No P&L responsibility"},
  { id: 20, role: "Director of Production", years: 18, industry: "Furniture", teamSize: "95", scope: "$36M plant", criteria: [0,1,1,2,1,0], strength: "Labour relations", watchPoint: "Mature, static business", exitsAt: 2, exitReason: "Single-site scope only"},
  { id: 21, role: "Operations Manager", years: 8, industry: "Specialty Materials", teamSize: "24", scope: "Department", criteria: [0,0,1,1,1,2], strength: "Technical depth", watchPoint: "Limited management span", exitsAt: 2, exitReason: "No P&L responsibility"},
  { id: 22, role: "Divisional Operations Manager", years: 16, industry: "Pharma Services", teamSize: "68", scope: "$31M", criteria: [1,1,1,2,2,1], strength: "Validation and compliance", watchPoint: "Division smaller than target", exitsAt: 2, exitReason: "Scope below the role requirement"},
  { id: 23, role: "Plant General Manager", years: 21, industry: "Industrial Manufacturing", teamSize: "175", scope: "$88M site", criteria: [0,2,2,1,1,1], strength: "Union negotiation", watchPoint: "One employer for 15 years", exitsAt: 2, exitReason: "Single-site scope only"},
  { id: 24, role: "Director of Fulfilment", years: 12, industry: "Consumer Products", teamSize: "130", scope: "Network budget", criteria: [1,0,1,2,1,1], strength: "Automation rollout", watchPoint: "Reports into supply chain, not GM", exitsAt: 2, exitReason: "No P&L responsibility"},
  { id: 25, role: "Operations Director", years: 14, industry: "Third-Party Logistics", teamSize: "80", scope: "$24M", criteria: [1,1,1,1,2,1], strength: "Client onboarding", watchPoint: "Contract operations only", exitsAt: 2, exitReason: "Scope below the role requirement"},

  /* --- leave at Interview: how they lead and communicate --- */
  { id: 26, role: "VP Operations", years: 19, industry: "Distribution", teamSize: "150", scope: "$78M P&L", criteria: [2,2,1,2,1,1], strength: "Network optimisation", watchPoint: "Runs lean on succession planning", exitsAt: 3, exitReason: "Limited evidence of developing leaders beneath them"},
  { id: 27, role: "SVP Operations", years: 26, industry: "Logistics", teamSize: "450+", scope: "Multi-state P&L", criteria: [2,2,1,2,0,1], strength: "Complex operations", watchPoint: "Industry transition required", exitsAt: 3, exitReason: "Cross-functional working style raised concerns"},
  { id: 28, role: "VP Operations", years: 17, industry: "Packaging", teamSize: "165", scope: "$70M P&L", criteria: [2,2,0,2,2,1], strength: "Cost discipline", watchPoint: "High turnover in prior teams", exitsAt: 3, exitReason: "No track record of leadership development"},
  { id: 29, role: "COO", years: 24, industry: "Distribution", teamSize: "300+", scope: "$190M", criteria: [2,2,1,1,1,0], strength: "Scaling operations", watchPoint: "Compensation may exceed range", exitsAt: 3, exitReason: "Limited evidence of developing leaders beneath them"},
  { id: 30, role: "VP Manufacturing", years: 20, industry: "Chemicals", teamSize: "220", scope: "$105M P&L", criteria: [2,2,1,2,0,1], strength: "Technical operations", watchPoint: "Prefers to work through operations only", exitsAt: 3, exitReason: "Cross-functional working style raised concerns"},
  { id: 31, role: "VP Operations", years: 18, industry: "Food & Beverage", teamSize: "190", scope: "$82M P&L", criteria: [2,2,0,2,1,2], strength: "Rapid expansion delivery", watchPoint: "Team built by hiring, not developing", exitsAt: 3, exitReason: "No track record of leadership development"},
  { id: 32, role: "VP Supply Chain & Operations", years: 19, industry: "Medical Devices", teamSize: "95", scope: "$80M division", criteria: [2,2,1,2,1,1], strength: "Cross-functional leadership", watchPoint: "Less direct commercial exposure", exitsAt: 3, exitReason: "Limited evidence of developing leaders beneath them"},
  { id: 33, role: "Group Operations Director", years: 22, industry: "Building Products", teamSize: "240", scope: "$96M P&L", criteria: [2,2,1,1,0,1], strength: "Multi-site consolidation", watchPoint: "Communication style described as directive", exitsAt: 3, exitReason: "Cross-functional working style raised concerns"},
  { id: 34, role: "VP Operations", years: 16, industry: "Electronics", teamSize: "115", scope: "$61M P&L", criteria: [2,2,0,2,2,2], strength: "New product introduction", watchPoint: "First VP tenure still short", exitsAt: 3, exitReason: "No track record of leadership development"},
  { id: 35, role: "Divisional VP", years: 23, industry: "Automotive Supply", teamSize: "260", scope: "$130M P&L", criteria: [2,2,1,2,0,0], strength: "Programme management", watchPoint: "Sector in structural decline", exitsAt: 3, exitReason: "Cross-functional working style raised concerns"},
  { id: 36, role: "VP Operations", years: 21, industry: "Plastics", teamSize: "140", scope: "$74M P&L", criteria: [2,2,1,1,1,1], strength: "Asset utilisation", watchPoint: "Bench strength thin", exitsAt: 3, exitReason: "Limited evidence of developing leaders beneath them"},
  { id: 37, role: "Head of Operations", years: 18, industry: "Pharma Services", teamSize: "125", scope: "$67M P&L", criteria: [2,2,1,2,0,2], strength: "Regulated scale-up", watchPoint: "Strained relationship with commercial team", exitsAt: 3, exitReason: "Cross-functional working style raised concerns"},
  { id: 38, role: "VP Operations", years: 25, industry: "Metal Fabrication", teamSize: "205", scope: "$112M P&L", criteria: [2,2,0,2,1,0], strength: "Operational recovery", watchPoint: "Mature business throughout", exitsAt: 3, exitReason: "No track record of leadership development"},

  /* --- leave at Vet: what deeper enquiry surfaced --- */
  { id: 39, role: "VP Operations", years: 20, industry: "Industrial Manufacturing", teamSize: "180+", scope: "$120M P&L", criteria: [2,2,2,1,2,1], strength: "Multi-site leadership", watchPoint: "Limited recent transformation work", exitsAt: 4, exitReason: "Process improvement depth did not hold up under vetting"},
  { id: 40, role: "COO", years: 23, industry: "Consumer Products", teamSize: "280", scope: "$155M", criteria: [2,2,2,1,2,2], strength: "Commercial partnership", watchPoint: "Improvement results largely inherited", exitsAt: 4, exitReason: "Improvement record thinner than presented"},
  { id: 41, role: "VP Global Operations", years: 27, industry: "Aerospace Components", teamSize: "310", scope: "$168M P&L", criteria: [2,2,2,0,2,1], strength: "International footprint", watchPoint: "Delegated all improvement work", exitsAt: 4, exitReason: "No sustained ownership of process improvement"},
  { id: 42, role: "SVP Operations", years: 24, industry: "Third-Party Logistics", teamSize: "390", scope: "$140M P&L", criteria: [2,2,2,1,2,0], strength: "Client scale delivery", watchPoint: "Growth came through acquisition only", exitsAt: 4, exitReason: "Process improvement depth did not hold up under vetting"},
  { id: 43, role: "VP Operations", years: 19, industry: "Furniture", teamSize: "160", scope: "$76M P&L", criteria: [2,2,2,1,1,2], strength: "Demand volatility management", watchPoint: "Results difficult to corroborate", exitsAt: 4, exitReason: "Improvement record thinner than presented"},
  { id: 44, role: "Group COO", years: 26, industry: "Specialty Materials", teamSize: "340", scope: "$175M", criteria: [2,2,2,0,2,1], strength: "Portfolio oversight", watchPoint: "Distant from operating detail", exitsAt: 4, exitReason: "No sustained ownership of process improvement"},

  /* --- leave at Decide: fit for a growth-stage business --- */
  { id: 45, role: "VP Operations", years: 21, industry: "Industrial Manufacturing", teamSize: "180+", scope: "$120M P&L", criteria: [2,2,2,2,2,1], strength: "Multi-site leadership at scale", watchPoint: "Career built in mature, stable businesses", exitsAt: 5, exitReason: "Growth-stage experience below the requirement"},
  { id: 46, role: "COO", years: 22, industry: "Distribution", teamSize: "265", scope: "$148M", criteria: [2,2,2,2,2,0], strength: "Running a large, steady operation", watchPoint: "No expansion-phase exposure", exitsAt: 5, exitReason: "No growth-stage experience"},
  { id: 47, role: "VP Operations", years: 24, industry: "Packaging", teamSize: "215", scope: "$118M P&L", criteria: [2,2,2,2,2,1], strength: "Complex multi-site delivery", watchPoint: "Growth limited to acquisition integration", exitsAt: 5, exitReason: "Growth-stage experience below the requirement"},

  /* --- finalists --- */
  { id: 48, role: "VP Operations", years: 18, industry: "Industrial Manufacturing", teamSize: "165", scope: "$92M P&L", criteria: [2,2,2,2,2,2], strength: "Opened two greenfield sites while running the core business", watchPoint: "Would relocate; timing tied to a Q3 milestone", exitsAt: 0, exitReason: ""},
  { id: 49, role: "COO", years: 20, industry: "Consumer Products", teamSize: "240", scope: "$134M", criteria: [2,2,2,2,2,2], strength: "Took the business from $60M to $134M in six years", watchPoint: "Compensation sits at the top of the range", exitsAt: 0, exitReason: ""},
  { id: 50, role: "VP Operations", years: 16, industry: "Medical Devices", teamSize: "140", scope: "$88M P&L", criteria: [2,2,2,2,2,2], strength: "Developed four direct reports into general management roles", watchPoint: "Least tenured of the three finalists", exitsAt: 0, exitReason: "" },
];

export interface Stage {
  /** Stage name, as shown on the stage button. */
  key: string;
  /** Caption shown beneath the pool while this stage is current. */
  note: string;
  /** Indices into CANDIDATE_CRITERIA to highlight during this stage. */
  hot: number[];
}

/*
 * Stage definitions — deliberately the Collaborative Search vocabulary,
 * so this reads as a preview of the section below, not a rival method.
 */
export const STAGES: Stage[] = [
  { key: "Understand", note: "Requirements agreed with the leadership team before a single candidate is contacted.", hot: [0, 1, 2, 3, 4, 5] },
  { key: "Search",     note: "Sourcing across HSG's network, referrals, and direct outreach.",                     hot: [] },
  { key: "Evaluate",   note: "Scope and accountability measured against what the role actually requires.",          hot: [0, 1] },
  { key: "Interview",  note: "Conversations that test how each person actually leads and communicates.",            hot: [2, 4] },
  { key: "Vet",        note: "Private Vetting adds context that references alone rarely surface.",                  hot: [3] },
  { key: "Decide",     note: "Leadership, culture, working style, motivation, and long-term fit.",                  hot: [5] },
];

export interface FunnelStep {
  /** Headline count shown in the strip. */
  count: number;
  label: string;
  /** Stage index at or beyond which this step reads as reached. */
  fromStage: number;
}

/** The narrowing strip beneath the pool. */
export const FUNNEL: FunnelStep[] = [
  { count: 50, label: "Search",    fromStage: 1 },
  { count: 25, label: "Evaluate",  fromStage: 2 },
  { count: 12, label: "Interview", fromStage: 3 },
  { count: 6,  label: "Vet",       fromStage: 4 },
  { count: 3,  label: "Decide",    fromStage: 5 },
];
