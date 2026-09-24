/* ============================================================
   SITUATIONS WANTED — role groups and their candidate pools

   Ported from hsg-situations-wanted-role-data.js, per
   HSG_For_Companies_and_Situations_Wanted_Update.md.

   ALL PROFILES ARE FICTIONAL. No real HSG candidate identities,
   employers, resumes, contact details or confidential information.
   Replace these pools with the real consented feed before the page shows
   live candidates — and read the hosting note at the top of
   pages/situations-wanted/[role].astro before you do.

   The employer picks one of these groups from a controlled selector on the
   "For Companies" form, and the page for that group shows its six
   candidates and no others. A role outside these groups never reaches a
   results page at all: it goes to the Custom Search state instead. That
   rule is the whole point of this file — an SEO search must never be able
   to display engineering candidates.

   `aliases` are what the role combobox searches besides the label, so an
   employer who types "Controller" or "CRO" still finds the group that
   holds those people.
   ============================================================ */

export interface Professional {
  id: number;
  /** First name only, and an invented one. */
  name: string;
  /** Their current title, shown on the card and in the full table. */
  role: string;
  /**
   * What the four statistics cannot say: tools, specialty, and the kind of
   * company they want. Must NOT restate years at the current company, total
   * experience or salary — those sit beside it as statistics.
   */
  summary: string;
  yearsCurrentCompany: number;
  totalExperience: number;
  /**
   * Years of management experience. Not one of the four standardized card
   * statistics — it is the worked example of an OPTIONAL column, the kind of
   * thing an employer can ask us to add. Only the sample comparison shows it.
   */
  managementYears: number;
  /** Whole dollars; formatted to "$185K" for display. */
  currentSalary: number;
  credential: string;
  tools: string[];
  /** Kept for filtering a real feed; on the page it closes the summary. */
  workPreference: string;
}

export interface RoleGroup {
  /** URL segment and query value — "supply-chain". */
  key: string;
  /** How the group is named in the role selector. */
  label: string;
  /** How the group is named in the headings — already plural. */
  resultTitle: string;
  /** Extra search terms for the combobox. */
  aliases: string[];
  candidates: Professional[];
}

export const ROLE_GROUPS: Record<string, RoleGroup> = {
  finance: {
    key: "finance",
    label: "CFO / Finance Leadership",
    resultTitle: "Finance Leaders",
    aliases: ["CFO", "Chief Financial Officer", "VP Finance", "Finance Director", "Controller"],
    candidates: [
      {
        id: 1, name: "Daniel", role: "VP Finance",
        summary: "NetSuite / Power BI finance leader focused on forecasting, cash planning and stronger controls. Wants a privately held growth company with direct access to ownership.",
        yearsCurrentCompany: 4, totalExperience: 15, currentSalary: 185000, managementYears: 8,
        credential: "CPA / B.S. Accounting",
        tools: ["NetSuite", "Power BI", "Excel"],
        workPreference: "Privately held growth company",
      },
      {
        id: 2, name: "Maria", role: "Finance Director",
        summary: "FP&A leader using Oracle and Adaptive Planning. Wants a larger organization where she can lead planning, mentor analysts and build more structured forecasting.",
        yearsCurrentCompany: 5, totalExperience: 14, currentSalary: 175000, managementYears: 7,
        credential: "MBA Finance / B.S. Finance",
        tools: ["Oracle", "Workday Adaptive Planning", "Excel"],
        workPreference: "Larger organization with developed finance team",
      },
      {
        id: 3, name: "James", role: "Controller",
        summary: "Hands-on accounting leader with Sage Intacct and QuickBooks Enterprise experience across close, audit prep and operational reporting. Prefers a smaller company with broad ownership.",
        yearsCurrentCompany: 3, totalExperience: 12, currentSalary: 150000, managementYears: 5,
        credential: "CPA / B.S. Accounting",
        tools: ["Sage Intacct", "QuickBooks Enterprise", "Excel"],
        workPreference: "Smaller company with broad accounting ownership",
      },
      {
        id: 4, name: "Rachel", role: "VP Finance",
        summary: "Strategic finance leader experienced with SAP, board reporting and acquisition integration. Interested in a company preparing for expansion, acquisition or a future transaction.",
        yearsCurrentCompany: 4, totalExperience: 16, currentSalary: 195000, managementYears: 9,
        credential: "CMA / MBA",
        tools: ["SAP", "Tableau", "Excel"],
        workPreference: "Growth, acquisition or transaction environment",
      },
      {
        id: 5, name: "Steven", role: "Finance Director",
        summary: "Operational finance leader comfortable with Dynamics 365 and Power BI, with a focus on pricing, inventory and business-unit profitability. Wants close partnership with operations.",
        yearsCurrentCompany: 2, totalExperience: 13, currentSalary: 165000, managementYears: 4,
        credential: "B.S. Finance / CMA Candidate",
        tools: ["Dynamics 365", "Power BI", "Excel"],
        workPreference: "Cross-functional operational finance role",
      },
      {
        id: 6, name: "Nicole", role: "Controller",
        summary: "Accounting and systems leader experienced with NetSuite implementations, process clean-up and audit readiness. Wants a company strengthening systems before its next stage of growth.",
        yearsCurrentCompany: 3, totalExperience: 11, currentSalary: 145000, managementYears: 4,
        credential: "CPA / M.S. Accounting",
        tools: ["NetSuite", "FloQast", "Excel"],
        workPreference: "Company strengthening systems and controls",
      },
    ],
  },

  operations: {
    key: "operations",
    label: "COO / Operations Leadership",
    resultTitle: "Operations Leaders",
    aliases: ["COO", "Chief Operating Officer", "VP Operations", "Director of Operations", "Operations Executive"],
    candidates: [
      {
        id: 1, name: "Tim", role: "Director of Operations",
        summary: "Multi-site operations leader experienced with Lean methods, KPI dashboards and ERP-driven planning. Interested in a smaller privately held company where he can work closely with ownership.",
        yearsCurrentCompany: 4, totalExperience: 13, currentSalary: 165000, managementYears: 7,
        credential: "B.S. Business / Lean Six Sigma Black Belt",
        tools: ["Power BI", "NetSuite", "Lean Six Sigma"],
        workPreference: "Smaller privately held company",
      },
      {
        id: 2, name: "Larry", role: "VP Operations",
        summary: "Operations executive with Oracle ERP and continuous-improvement experience across multiple facilities. Looking for a larger team where he can build management depth and standardize operations.",
        yearsCurrentCompany: 5, totalExperience: 18, currentSalary: 210000, managementYears: 11,
        credential: "MBA / B.S. Operations Management",
        tools: ["Oracle ERP", "Power BI", "Lean"],
        workPreference: "Larger multi-site organization",
      },
      {
        id: 3, name: "Peter", role: "Director of Operations",
        summary: "Hands-on operator experienced with production planning, vendor coordination and warehouse flow using Dynamics 365. Prefers a local company where leadership stays close to daily operations.",
        yearsCurrentCompany: 3, totalExperience: 12, currentSalary: 155000, managementYears: 6,
        credential: "B.S. Supply Chain Management",
        tools: ["Dynamics 365", "Excel", "Power BI"],
        workPreference: "Local hands-on operating environment",
      },
      {
        id: 4, name: "David", role: "COO",
        summary: "Senior operations leader with acquisition integration, P&L ownership and cross-functional scaling experience. Interested in a growth-stage company where he can professionalize operations without losing speed.",
        yearsCurrentCompany: 4, totalExperience: 21, currentSalary: 265000, managementYears: 14,
        credential: "MBA / B.S. Engineering",
        tools: ["SAP", "Tableau", "Smartsheet"],
        workPreference: "Growth-stage company",
      },
      {
        id: 5, name: "Kevin", role: "VP Operations",
        summary: "Process-focused executive experienced with Epicor, S&OP and capacity planning. Looking for broader ownership across operations, supply chain and customer delivery.",
        yearsCurrentCompany: 3, totalExperience: 17, currentSalary: 195000, managementYears: 9,
        credential: "B.S. Industrial Engineering / Six Sigma",
        tools: ["Epicor", "S&OP", "Excel"],
        workPreference: "Broad operational ownership",
      },
      {
        id: 6, name: "Robert", role: "Director of Operations",
        summary: "Team-development oriented operator experienced with KPI systems, frontline leadership and service delivery. Wants an organization that values leadership development and gives managers room to improve systems.",
        yearsCurrentCompany: 2, totalExperience: 11, currentSalary: 150000, managementYears: 5,
        credential: "B.S. Management",
        tools: ["Power BI", "Monday.com", "Excel"],
        workPreference: "Leadership-focused organization",
      },
    ],
  },

  sales: {
    key: "sales",
    label: "VP / Director of Sales",
    resultTitle: "Sales Leaders",
    aliases: ["VP Sales", "Vice President of Sales", "Sales Director", "Head of Sales", "Chief Revenue Officer", "CRO"],
    candidates: [
      {
        id: 1, name: "Anthony", role: "VP Sales",
        summary: "B2B sales leader experienced with Salesforce, Gong and complex pipeline management. Wants a privately held company where he can help build a repeatable sales organization.",
        yearsCurrentCompany: 4, totalExperience: 16, currentSalary: 205000, managementYears: 9,
        credential: "B.S. Business Administration",
        tools: ["Salesforce", "Gong", "LinkedIn Sales Navigator"],
        workPreference: "Privately held growth company",
      },
      {
        id: 2, name: "Brian", role: "Sales Director",
        summary: "Sales manager experienced with HubSpot, channel development and coaching small teams. Looking for a growth-stage company where he can remain close to customers while taking broader leadership responsibility.",
        yearsCurrentCompany: 3, totalExperience: 12, currentSalary: 165000, managementYears: 5,
        credential: "B.A. Marketing",
        tools: ["HubSpot", "ZoomInfo", "LinkedIn Sales Navigator"],
        workPreference: "Growth-stage player-coach role",
      },
      {
        id: 3, name: "Carlos", role: "VP Sales",
        summary: "Enterprise sales leader using Salesforce and Clari for forecast discipline and strategic-account planning. Interested in a larger organization with a developed sales enablement function.",
        yearsCurrentCompany: 5, totalExperience: 18, currentSalary: 225000, managementYears: 11,
        credential: "MBA / B.S. Business",
        tools: ["Salesforce", "Clari", "Gong"],
        workPreference: "Larger organization with mature enablement",
      },
      {
        id: 4, name: "Eric", role: "Sales Director",
        summary: "Industrial and technical sales leader experienced with CRM adoption, distributor relationships and territory redesign. Prefers close collaboration with operations and engineering.",
        yearsCurrentCompany: 4, totalExperience: 14, currentSalary: 175000, managementYears: 7,
        credential: "B.S. Engineering Technology",
        tools: ["Dynamics 365", "Power BI", "ZoomInfo"],
        workPreference: "Cross-functional technical sales environment",
      },
      {
        id: 5, name: "Jason", role: "Head of Sales",
        summary: "Hands-on commercial leader experienced with Pipedrive, outbound strategy and early-stage team building. Wants an entrepreneurial company where he can create process from the ground up.",
        yearsCurrentCompany: 2, totalExperience: 11, currentSalary: 155000, managementYears: 4,
        credential: "B.S. Marketing",
        tools: ["Pipedrive", "Apollo", "LinkedIn Sales Navigator"],
        workPreference: "Entrepreneurial company",
      },
      {
        id: 6, name: "Mark", role: "VP Sales",
        summary: "Revenue leader with experience in account expansion, team restructuring and sales compensation design. Looking for a stable company with upside from improving sales discipline.",
        yearsCurrentCompany: 6, totalExperience: 19, currentSalary: 215000, managementYears: 12,
        credential: "B.S. Business Management",
        tools: ["Salesforce", "Tableau", "Gong"],
        workPreference: "Established company needing stronger sales discipline",
      },
    ],
  },

  marketing: {
    key: "marketing",
    label: "VP / Director of Marketing",
    resultTitle: "Marketing Leaders",
    aliases: ["VP Marketing", "Marketing Director", "Head of Marketing", "Chief Marketing Officer", "CMO"],
    candidates: [
      {
        id: 1, name: "Amanda", role: "Marketing Director",
        summary: "Demand-generation leader experienced with HubSpot, GA4 and paid/organic campaign integration. Wants a growth company where marketing can own pipeline contribution.",
        yearsCurrentCompany: 3, totalExperience: 12, currentSalary: 155000, managementYears: 5,
        credential: "B.S. Marketing",
        tools: ["HubSpot", "GA4", "Google Ads"],
        workPreference: "Growth company with sales alignment",
      },
      {
        id: 2, name: "Lauren", role: "VP Marketing",
        summary: "Brand and growth executive experienced with Salesforce, Marketo and multi-channel planning. Looking for an established organization that needs stronger positioning and marketing operations.",
        yearsCurrentCompany: 5, totalExperience: 17, currentSalary: 205000, managementYears: 10,
        credential: "MBA / B.A. Communications",
        tools: ["Marketo", "Salesforce", "Tableau"],
        workPreference: "Established company strengthening positioning",
      },
      {
        id: 3, name: "Megan", role: "Marketing Director",
        summary: "Digital marketing leader experienced with SEMrush, Ahrefs, GA4 and content-led growth. Prefers a smaller company where she can stay hands-on across SEO, content and analytics.",
        yearsCurrentCompany: 4, totalExperience: 11, currentSalary: 145000, managementYears: 4,
        credential: "B.A. Marketing",
        tools: ["SEMrush", "Ahrefs", "GA4"],
        workPreference: "Smaller company with broad hands-on ownership",
      },
      {
        id: 4, name: "Samantha", role: "VP Marketing",
        summary: "Product and go-to-market leader experienced with customer research, launches and executive messaging. Interested in a company entering new markets or launching new offerings.",
        yearsCurrentCompany: 3, totalExperience: 16, currentSalary: 195000, managementYears: 9,
        credential: "MBA / B.S. Business",
        tools: ["HubSpot", "Productboard", "Tableau"],
        workPreference: "New-market or new-offering environment",
      },
      {
        id: 5, name: "Jessica", role: "Marketing Director",
        summary: "Marketing operations leader using Pardot, Salesforce and Looker Studio to improve attribution and reporting. Looking for a team that values measurement and better use of marketing technology.",
        yearsCurrentCompany: 2, totalExperience: 10, currentSalary: 140000, managementYears: 3,
        credential: "B.S. Marketing Analytics",
        tools: ["Pardot", "Salesforce", "Looker Studio"],
        workPreference: "Data-driven organization",
      },
      {
        id: 6, name: "Erin", role: "Head of Marketing",
        summary: "Entrepreneurial marketing leader experienced with brand building, partnerships and community-driven growth. Wants a founder-led business where she can help define the message and build the function.",
        yearsCurrentCompany: 3, totalExperience: 13, currentSalary: 160000, managementYears: 6,
        credential: "B.A. Communications",
        tools: ["HubSpot", "Canva", "GA4"],
        workPreference: "Founder-led business",
      },
    ],
  },

  hr: {
    key: "hr",
    label: "HR Director / VP of HR",
    resultTitle: "HR Leaders",
    aliases: ["VP HR", "Vice President Human Resources", "HR Director", "Head of HR", "CHRO"],
    candidates: [
      {
        id: 1, name: "Michelle", role: "HR Director",
        summary: "HR leader experienced with ADP Workforce Now, employee relations and manager coaching. Interested in a privately held company where HR works closely with ownership.",
        yearsCurrentCompany: 4, totalExperience: 14, currentSalary: 155000, managementYears: 7,
        credential: "SHRM-SCP / B.A. Human Resources",
        tools: ["ADP Workforce Now", "Excel", "LinkedIn Recruiter"],
        workPreference: "Privately held company",
      },
      {
        id: 2, name: "Karen", role: "VP Human Resources",
        summary: "Senior HR executive experienced with Workday, organizational design and leadership development. Looking for a larger company going through growth or change.",
        yearsCurrentCompany: 5, totalExperience: 19, currentSalary: 210000, managementYears: 12,
        credential: "SPHR / M.S. Human Resources",
        tools: ["Workday", "Culture Amp", "Power BI"],
        workPreference: "Larger growth or transformation environment",
      },
      {
        id: 3, name: "Denise", role: "HR Director",
        summary: "Generalist HR leader experienced with BambooHR, policy development and performance systems. Prefers a smaller organization that needs its first fully developed HR function.",
        yearsCurrentCompany: 3, totalExperience: 12, currentSalary: 145000, managementYears: 5,
        credential: "SHRM-CP / B.S. Business",
        tools: ["BambooHR", "Paylocity", "Excel"],
        workPreference: "Smaller organization building HR function",
      },
      {
        id: 4, name: "Angela", role: "VP Human Resources",
        summary: "People and culture leader with experience in succession planning, executive coaching and post-acquisition integration. Interested in an organization where HR has a strategic seat at the table.",
        yearsCurrentCompany: 4, totalExperience: 17, currentSalary: 195000, managementYears: 10,
        credential: "SPHR / MBA",
        tools: ["Workday", "Lattice", "LinkedIn Talent Insights"],
        workPreference: "Strategic executive-level HR role",
      },
      {
        id: 5, name: "Tara", role: "HR Director",
        summary: "Operational HR leader using UKG Pro and structured performance systems across multi-site teams. Looking for a company where she can improve consistency while staying close to managers and employees.",
        yearsCurrentCompany: 2, totalExperience: 11, currentSalary: 140000, managementYears: 4,
        credential: "PHR / B.S. Human Resources",
        tools: ["UKG Pro", "Excel", "Power BI"],
        workPreference: "Multi-site company",
      },
      {
        id: 6, name: "Monica", role: "Head of HR",
        summary: "Hands-on HR leader experienced with Paylocity, recruiting process design and employee engagement. Wants an entrepreneurial company where she can build practical systems without unnecessary bureaucracy.",
        yearsCurrentCompany: 3, totalExperience: 13, currentSalary: 150000, managementYears: 6,
        credential: "SHRM-SCP / B.A. Psychology",
        tools: ["Paylocity", "Greenhouse", "Culture Amp"],
        workPreference: "Entrepreneurial company",
      },
    ],
  },

  engineering: {
    key: "engineering",
    label: "Engineering / Technical Leadership",
    resultTitle: "Engineering Leaders",
    aliases: ["VP Engineering", "Engineering Director", "Director of Engineering", "Head of Engineering", "Technical Director"],
    candidates: [
      {
        id: 1, name: "Tim", role: "Engineering Director",
        summary: "Product-focused engineering leader experienced with SOLIDWORKS and Ansys Mechanical. Interested in a smaller privately held company where engineering works closely with ownership.",
        yearsCurrentCompany: 4, totalExperience: 14, currentSalary: 175000, managementYears: 6,
        credential: "M.S. Mechanical Engineering",
        tools: ["SOLIDWORKS", "Ansys Mechanical"],
        workPreference: "Smaller privately held company",
      },
      {
        id: 2, name: "Larry", role: "Director of Engineering",
        summary: "Mechanical design leader working with PTC Creo across complex assemblies, design reviews and manufacturing handoffs. Looking for an established company with a larger technical team.",
        yearsCurrentCompany: 5, totalExperience: 15, currentSalary: 185000, managementYears: 7,
        credential: "B.S. Mechanical Engineering / PE",
        tools: ["PTC Creo", "Windchill"],
        workPreference: "Established company with larger technical team",
      },
      {
        id: 3, name: "Peter", role: "Engineering Manager",
        summary: "Hands-on engineering manager using Autodesk Inventor and AutoCAD Mechanical for industrial equipment and production support. Prefers a local manufacturing environment close to the shop floor.",
        yearsCurrentCompany: 3, totalExperience: 12, currentSalary: 160000, managementYears: 5,
        credential: "B.S. Mechanical Engineering",
        tools: ["Autodesk Inventor", "AutoCAD Mechanical"],
        workPreference: "Local hands-on manufacturing environment",
      },
      {
        id: 4, name: "David", role: "VP Engineering",
        summary: "Senior engineering leader with Siemens NX experience across complex product programs. Interested in a larger organization where he can lead specialist teams and formalize engineering processes.",
        yearsCurrentCompany: 4, totalExperience: 19, currentSalary: 225000, managementYears: 11,
        credential: "M.S. Mechanical Engineering / MBA",
        tools: ["Siemens NX", "Teamcenter"],
        workPreference: "Larger structured engineering organization",
      },
      {
        id: 5, name: "Kevin", role: "Engineering Director",
        summary: "Product-development leader comfortable in CATIA V5 and cross-functional design environments. Looking for a growth-oriented organization where engineering owns new-product development.",
        yearsCurrentCompany: 3, totalExperience: 13, currentSalary: 170000, managementYears: 6,
        credential: "M.S. Mechanical Engineering",
        tools: ["CATIA V5", "3DEXPERIENCE"],
        workPreference: "Growth-oriented company",
      },
      {
        id: 6, name: "Robert", role: "Engineering Manager",
        summary: "Engineering leader focused on design improvement and simulation using Autodesk Fusion and Inventor Nastran. Interested in a collaborative technical group where he can still own meaningful projects.",
        yearsCurrentCompany: 2, totalExperience: 11, currentSalary: 155000, managementYears: 4,
        credential: "B.S. Mechanical Engineering / EIT",
        tools: ["Autodesk Fusion", "Inventor Nastran"],
        workPreference: "Collaborative team with project ownership",
      },
    ],
  },

  "mechanical-engineer": {
    key: "mechanical-engineer",
    label: "Mechanical Engineer",
    resultTitle: "Mechanical Engineers",
    aliases: ["Mechanical Engineering", "Mechanical Design Engineer", "Design Engineer", "Product Development Engineer"],
    candidates: [
      {
        id: 1, name: "Tim", role: "Mechanical Engineer",
        summary: "Product-focused mechanical engineer experienced with SOLIDWORKS and Ansys Mechanical, with strong exposure to component design, prototyping, and design validation. Interested in joining a smaller privately held company where engineering works closely with ownership and where he can take greater responsibility for products from concept through production.",
        yearsCurrentCompany: 4, totalExperience: 6, currentSalary: 110000, managementYears: 3,
        credential: "B.S. Mechanical Engineering",
        tools: ["SOLIDWORKS", "Ansys Mechanical"],
        workPreference: "Smaller privately held company",
      },
      {
        id: 2, name: "Larry", role: "Mechanical Engineer",
        summary: "Mechanical design engineer who works primarily with PTC Creo and has experience supporting complex assemblies, design revisions, and manufacturing handoffs. Looking for an established company with a clear advancement path and a team where he can grow into greater technical and project leadership responsibility.",
        yearsCurrentCompany: 5, totalExperience: 6, currentSalary: 105000, managementYears: 2,
        credential: "B.S. Mechanical Engineering",
        tools: ["PTC Creo"],
        workPreference: "Established company with advancement path",
      },
      {
        id: 3, name: "Peter", role: "Mechanical Engineer",
        summary: "Hands-on mechanical engineer using Autodesk Inventor and AutoCAD Mechanical for machine components, production drawings, and manufacturing support. Prefers a local manufacturing environment where engineers stay close to the shop floor and can see their designs move from drawing through fabrication and final use.",
        yearsCurrentCompany: 3, totalExperience: 6, currentSalary: 95000, managementYears: 1,
        credential: "B.S. Mechanical Engineering",
        tools: ["Autodesk Inventor", "AutoCAD Mechanical"],
        workPreference: "Local hands-on manufacturing environment",
      },
      {
        id: 4, name: "David", role: "Mechanical Engineer",
        summary: "Design engineer with experience working in Siemens NX on larger assemblies and technically complex products. Interested in becoming part of a larger engineering team where he can collaborate with specialists, contribute to more complex programs, and continue developing within a structured engineering organization.",
        yearsCurrentCompany: 4, totalExperience: 7, currentSalary: 112000, managementYears: 0,
        credential: "B.S. Mechanical Engineering",
        tools: ["Siemens NX"],
        workPreference: "Larger structured engineering team",
      },
      {
        id: 5, name: "Kevin", role: "Mechanical Engineer",
        summary: "Product-development engineer comfortable in CATIA V5 and cross-functional design environments, with experience working alongside manufacturing, quality, and product teams. Looking for a growth-oriented organization where engineers have broad ownership and can contribute directly to new-product development rather than working in a narrowly defined role.",
        yearsCurrentCompany: 3, totalExperience: 5, currentSalary: 98000, managementYears: 0,
        credential: "M.S. Mechanical Engineering",
        tools: ["CATIA V5"],
        workPreference: "Growth-oriented company with broad ownership",
      },
      {
        id: 6, name: "Robert", role: "Mechanical Engineer",
        summary: "Mechanical engineer focused on design improvement and analysis, with experience using Autodesk Fusion and Inventor Nastran for modeling, iteration, and simulation work. Interested in a company where technical problem-solving is valued and where he can work with a collaborative engineering group while still owning meaningful projects.",
        yearsCurrentCompany: 2, totalExperience: 6, currentSalary: 102000, managementYears: 4,
        credential: "B.S. Mechanical Engineering / EIT",
        tools: ["Autodesk Fusion", "Inventor Nastran"],
        workPreference: "Collaborative team with individual project ownership",
      },
    ],
  },

  "supply-chain": {
    key: "supply-chain",
    label: "Supply Chain / Procurement Leadership",
    resultTitle: "Supply Chain Leaders",
    aliases: ["VP Supply Chain", "Supply Chain Director", "Procurement Director", "Head of Supply Chain", "VP Procurement"],
    candidates: [
      {
        id: 1, name: "George", role: "Supply Chain Director",
        summary: "Supply chain leader experienced with SAP, S&OP and supplier-performance programs. Interested in a manufacturer where he can connect planning, purchasing and operations.",
        yearsCurrentCompany: 4, totalExperience: 15, currentSalary: 170000, managementYears: 8,
        credential: "CSCP / B.S. Supply Chain",
        tools: ["SAP", "IBP", "Power BI"],
        workPreference: "Integrated manufacturing supply chain",
      },
      {
        id: 2, name: "Helen", role: "VP Supply Chain",
        summary: "Senior leader experienced with Oracle SCM Cloud, network optimization and global supplier strategy. Looking for a larger organization with complex sourcing and distribution challenges.",
        yearsCurrentCompany: 5, totalExperience: 19, currentSalary: 220000, managementYears: 12,
        credential: "MBA / CSCP",
        tools: ["Oracle SCM Cloud", "Tableau", "Excel"],
        workPreference: "Larger global supply chain",
      },
      {
        id: 3, name: "Frank", role: "Procurement Director",
        summary: "Procurement leader using Coupa and SAP Ariba for sourcing, category management and supplier negotiations. Prefers a company where procurement can influence margin and growth decisions.",
        yearsCurrentCompany: 3, totalExperience: 13, currentSalary: 160000, managementYears: 6,
        credential: "CPSM / B.S. Business",
        tools: ["Coupa", "SAP Ariba", "Power BI"],
        workPreference: "Strategic procurement role",
      },
      {
        id: 4, name: "Olivia", role: "Supply Chain Director",
        summary: "Planning and inventory leader experienced with Kinaxis and ERP-driven demand planning. Interested in an organization that wants stronger forecasting and sales-and-operations alignment.",
        yearsCurrentCompany: 4, totalExperience: 14, currentSalary: 165000, managementYears: 7,
        credential: "CPIM / B.S. Operations",
        tools: ["Kinaxis", "SAP", "Excel"],
        workPreference: "Company strengthening forecasting and S&OP",
      },
      {
        id: 5, name: "Samuel", role: "VP Supply Chain",
        summary: "End-to-end supply chain executive with warehouse, transportation and supplier-network experience. Looking for a growth company where he can redesign the operating model before scale creates problems.",
        yearsCurrentCompany: 3, totalExperience: 18, currentSalary: 205000, managementYears: 11,
        credential: "MBA / CSCP",
        tools: ["Blue Yonder", "Power BI", "SAP"],
        workPreference: "Growth company redesigning supply chain",
      },
      {
        id: 6, name: "Chloe", role: "Procurement Director",
        summary: "Supplier-development leader experienced with sourcing analytics, contract negotiation and dual-source strategies. Wants a collaborative organization where procurement works closely with engineering and quality.",
        yearsCurrentCompany: 2, totalExperience: 12, currentSalary: 155000, managementYears: 5,
        credential: "CPSM / B.S. Supply Chain",
        tools: ["Jaggaer", "Power BI", "Excel"],
        workPreference: "Cross-functional procurement",
      },
    ],
  },

  it: {
    key: "it",
    label: "CIO / IT Leadership",
    resultTitle: "Technology Leaders",
    aliases: ["CIO", "Chief Information Officer", "IT Director", "VP IT", "Head of IT"],
    candidates: [
      {
        id: 1, name: "Andrew", role: "IT Director",
        summary: "IT leader experienced with Microsoft 365, Azure and cybersecurity modernization. Interested in a privately held company where technology decisions are tied closely to business operations.",
        yearsCurrentCompany: 4, totalExperience: 14, currentSalary: 170000, managementYears: 7,
        credential: "CISSP / B.S. Information Systems",
        tools: ["Microsoft Azure", "Microsoft 365", "Sentinel"],
        workPreference: "Privately held company",
      },
      {
        id: 2, name: "Thomas", role: "CIO",
        summary: "Enterprise technology executive experienced with ERP transformation, data governance and cloud strategy. Looking for an organization entering a major modernization cycle with executive sponsorship.",
        yearsCurrentCompany: 5, totalExperience: 21, currentSalary: 250000, managementYears: 14,
        credential: "MBA / B.S. Computer Science",
        tools: ["AWS", "SAP", "Snowflake"],
        workPreference: "Enterprise modernization",
      },
      {
        id: 3, name: "Ryan", role: "VP IT",
        summary: "Infrastructure and security leader with ServiceNow, Azure and identity-management experience. Prefers a larger organization where he can build stronger governance and a deeper technical team.",
        yearsCurrentCompany: 4, totalExperience: 17, currentSalary: 205000, managementYears: 10,
        credential: "CISSP / ITIL",
        tools: ["ServiceNow", "Azure", "Okta"],
        workPreference: "Larger organization building governance",
      },
      {
        id: 4, name: "Melissa", role: "IT Director",
        summary: "Business-systems leader experienced with Dynamics 365, Power BI and workflow automation. Interested in a company where IT can improve operations and reporting rather than function only as support.",
        yearsCurrentCompany: 3, totalExperience: 13, currentSalary: 165000, managementYears: 6,
        credential: "B.S. Information Systems / PMP",
        tools: ["Dynamics 365", "Power BI", "Power Automate"],
        workPreference: "Business-facing IT role",
      },
      {
        id: 5, name: "Jonathan", role: "Head of IT",
        summary: "Hands-on technology leader experienced with Google Cloud, endpoint management and startup-scale infrastructure. Wants an entrepreneurial environment where he can build practical systems without excessive bureaucracy.",
        yearsCurrentCompany: 2, totalExperience: 11, currentSalary: 155000, managementYears: 4,
        credential: "B.S. Computer Science",
        tools: ["Google Cloud", "Jamf", "Okta"],
        workPreference: "Entrepreneurial company",
      },
      {
        id: 6, name: "Rebecca", role: "VP IT",
        summary: "Data and applications leader experienced with Salesforce, Snowflake and integration architecture. Looking for a company that wants to connect fragmented systems and make better use of operational data.",
        yearsCurrentCompany: 3, totalExperience: 16, currentSalary: 195000, managementYears: 9,
        credential: "M.S. Information Systems",
        tools: ["Salesforce", "Snowflake", "MuleSoft"],
        workPreference: "Systems integration and data environment",
      },
    ],
  },

  manufacturing: {
    key: "manufacturing",
    label: "Plant / Manufacturing Leadership",
    resultTitle: "Manufacturing Leaders",
    aliases: ["Plant Manager", "General Manager Manufacturing", "VP Manufacturing", "Manufacturing Director", "Operations Manager"],
    candidates: [
      {
        id: 1, name: "Paul", role: "Plant Manager",
        summary: "Plant leader experienced with Lean manufacturing, safety systems and daily management routines. Interested in a privately held manufacturer where he can work directly with ownership.",
        yearsCurrentCompany: 4, totalExperience: 15, currentSalary: 165000, managementYears: 8,
        credential: "B.S. Industrial Engineering / Lean Six Sigma Black Belt",
        tools: ["Epicor", "Power BI", "Lean"],
        workPreference: "Privately held manufacturer",
      },
      {
        id: 2, name: "Keith", role: "Manufacturing Director",
        summary: "Multi-site manufacturing leader experienced with SAP, OEE improvement and capital planning. Looking for a larger organization where he can standardize operating practices across facilities.",
        yearsCurrentCompany: 5, totalExperience: 18, currentSalary: 205000, managementYears: 11,
        credential: "MBA / B.S. Mechanical Engineering",
        tools: ["SAP", "Power BI", "OEE Systems"],
        workPreference: "Larger multi-site manufacturing organization",
      },
      {
        id: 3, name: "Ronald", role: "Plant Manager",
        summary: "Hands-on plant leader with experience in scheduling, labor planning and quality improvement. Prefers a local company where leadership is visible on the floor and decisions can be made quickly.",
        yearsCurrentCompany: 3, totalExperience: 13, currentSalary: 155000, managementYears: 6,
        credential: "B.S. Operations Management",
        tools: ["Plex", "Excel", "Power BI"],
        workPreference: "Local plant with visible leadership",
      },
      {
        id: 4, name: "Edward", role: "VP Manufacturing",
        summary: "Senior manufacturing executive experienced with network rationalization, automation and post-acquisition integration. Interested in a company planning significant expansion or transformation.",
        yearsCurrentCompany: 4, totalExperience: 20, currentSalary: 230000, managementYears: 13,
        credential: "M.S. Engineering Management",
        tools: ["Oracle ERP", "Tableau", "MES"],
        workPreference: "Expansion or transformation environment",
      },
      {
        id: 5, name: "Scott", role: "Manufacturing Director",
        summary: "Process-focused manufacturing leader experienced with Six Sigma, maintenance reliability and capacity improvement. Looking for broader responsibility that includes engineering and continuous improvement.",
        yearsCurrentCompany: 3, totalExperience: 16, currentSalary: 185000, managementYears: 9,
        credential: "B.S. Industrial Engineering / Six Sigma Black Belt",
        tools: ["Maximo", "Power BI", "Lean Six Sigma"],
        workPreference: "Broader manufacturing and engineering scope",
      },
      {
        id: 6, name: "Victor", role: "Plant Manager",
        summary: "Team-development oriented plant leader experienced with frontline supervision, safety culture and performance accountability. Wants a company that values people development as much as production output.",
        yearsCurrentCompany: 2, totalExperience: 12, currentSalary: 150000, managementYears: 5,
        credential: "B.S. Business / OSHA 30",
        tools: ["Microsoft Dynamics", "Excel", "Safety Management Systems"],
        workPreference: "People-focused manufacturing culture",
      },
    ],
  },

  "general-management": {
    key: "general-management",
    label: "President / General Management",
    resultTitle: "General Management Leaders",
    aliases: ["President", "General Manager", "Managing Director", "Division President", "Business Unit Leader"],
    candidates: [
      {
        id: 1, name: "Michael", role: "General Manager",
        summary: "P&L leader experienced across sales, operations and team development in a privately held business. Interested in a company where he can work closely with ownership and take full responsibility for a business unit.",
        yearsCurrentCompany: 4, totalExperience: 18, currentSalary: 210000, managementYears: 11,
        credential: "MBA / B.S. Business",
        tools: ["Power BI", "NetSuite", "Salesforce"],
        workPreference: "Privately held company with full P&L ownership",
      },
      {
        id: 2, name: "Christopher", role: "Division President",
        summary: "Senior general manager with acquisition integration, commercial growth and operational restructuring experience. Looking for a larger platform where he can lead a division through its next stage of growth.",
        yearsCurrentCompany: 5, totalExperience: 22, currentSalary: 285000, managementYears: 15,
        credential: "MBA / B.S. Engineering",
        tools: ["SAP", "Salesforce", "Tableau"],
        workPreference: "Larger platform with growth opportunities",
      },
      {
        id: 3, name: "Gregory", role: "General Manager",
        summary: "Hands-on business-unit leader experienced with customer relationships, operations and margin improvement. Prefers a smaller organization where senior leaders stay close to customers and employees.",
        yearsCurrentCompany: 3, totalExperience: 16, currentSalary: 195000, managementYears: 9,
        credential: "B.S. Management",
        tools: ["Dynamics 365", "Power BI", "Excel"],
        workPreference: "Smaller customer-close organization",
      },
      {
        id: 4, name: "Patrick", role: "Managing Director",
        summary: "Commercially focused general manager experienced with market expansion, partnerships and leadership-team development. Interested in a business entering new markets or building a new division.",
        yearsCurrentCompany: 4, totalExperience: 19, currentSalary: 235000, managementYears: 12,
        credential: "MBA / B.A. Economics",
        tools: ["Salesforce", "Power BI", "Smartsheet"],
        workPreference: "New-market or new-division environment",
      },
      {
        id: 5, name: "Nathan", role: "General Manager",
        summary: "Operations-heavy general manager experienced with manufacturing, supply chain and customer delivery. Wants broader commercial exposure and a path toward president-level responsibility.",
        yearsCurrentCompany: 3, totalExperience: 17, currentSalary: 205000, managementYears: 10,
        credential: "B.S. Industrial Engineering",
        tools: ["Epicor", "Power BI", "Excel"],
        workPreference: "Broader commercial exposure",
      },
      {
        id: 6, name: "Jeffrey", role: "Business Unit Leader",
        summary: "Growth-oriented leader experienced with strategic planning, team accountability and cross-functional execution. Looking for a company that needs more structure but still values entrepreneurial decision-making.",
        yearsCurrentCompany: 2, totalExperience: 15, currentSalary: 190000, managementYears: 8,
        credential: "MBA / B.S. Finance",
        tools: ["NetSuite", "Salesforce", "Power BI"],
        workPreference: "Entrepreneurial company adding structure",
      },
    ],
  },
};

/**
 * The supported groups, in role-selector order: the spec's ten, with
 * Mechanical Engineer added after Engineering / Technical Leadership.
 * Mechanical Engineer is the one individual-contributor group — its six are
 * the original Situations Wanted sample set, which predates the leadership
 * groups.
 */
export const ROLE_GROUP_LIST: RoleGroup[] = [
  "finance",
  "operations",
  "sales",
  "marketing",
  "hr",
  "engineering",
  "mechanical-engineer",
  "supply-chain",
  "it",
  "manufacturing",
  "general-management",
].map((key) => ROLE_GROUPS[key]!);

/**
 * The eleventh option. It is NOT a role group and has no candidates:
 * choosing it sends the employer to the custom-search state instead of a
 * results page, and anything typed that matches no group resolves to it.
 */
export const CUSTOM_ROLE = {
  key: "custom",
  label: "Custom Search",
} as const;

/** A group by key, or undefined — never a fallback to some other role. */
export const roleGroup = (key: string | undefined): RoleGroup | undefined =>
  key ? ROLE_GROUPS[key] : undefined;
