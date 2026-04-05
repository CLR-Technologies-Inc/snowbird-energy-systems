// Reusable prompt templates for energy platform data refresh and analysis
// These are displayed on /energy/prompts and can be piped to gemini or Claude
//
// NOTE: promptText uses String.raw so that {{PLACEHOLDER}} tokens are preserved
// as literal text and not interpreted as JS template expressions.

export type PromptCategory =
  | "eia-data-refresh"
  | "borough-opportunity"
  | "lmorp-calculation"
  | "market-design-update";

export interface PromptTemplate {
  id: string;
  title: string;
  category: PromptCategory;
  description: string;
  promptText: string;
  variables: string[];   // Placeholder tokens the user should fill before running
  targetModel: "gemini" | "claude" | "both";
}

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: "eia-refresh-consumption",
    title: "EIA Consumption Data Refresh",
    category: "eia-data-refresh",
    description:
      "Parses a new EIA SEDS tab-separated export and outputs an updated NY_CONSUMPTION_YYYY TypeScript constant.",
    promptText: String.raw`You are a TypeScript data engineer. Below is a new EIA SEDS tab-separated export for New York state (period: {{YEAR}}).

Parse the following series IDs and produce an updated NY_CONSUMPTION_{{YEAR}} constant matching this interface:

interface SectorConsumption {
  year: number;
  residential: number;   // Million kWh  ESRCP
  commercial: number;    // Million kWh  ESCCP
  industrial: number;    // Million kWh  ESICP
  transport: number;     // Million kWh  ESACP
  total: number;         // Million kWh  ESTCP
}

TSV DATA:
{{PASTE_TSV_HERE}}

Return only the updated TypeScript constant — no explanation, no imports.`,
    variables: ["{{YEAR}}", "{{PASTE_TSV_HERE}}"],
    targetModel: "both",
  },
  {
    id: "eia-refresh-pricing",
    title: "EIA Pricing Data Refresh",
    category: "eia-data-refresh",
    description:
      "Parses a new EIA SEDS export and outputs an updated NY_PRICING_YYYY TypeScript constant.",
    promptText: String.raw`You are a TypeScript data engineer. Parse the following EIA SEDS tab-separated data for New York state pricing (year: {{YEAR}}).

Produce an updated NY_PRICING_{{YEAR}} constant matching this interface:

interface SectorPricing {
  year: number;
  residential: number;   // $/MMBtu  ESRCD
  commercial: number;    // $/MMBtu  ESCCD
  industrial: number;    // $/MMBtu  ESICD
  transport: number;     // $/MMBtu  ESACD
  average: number;       // $/MMBtu  ESTCD
}

TSV DATA:
{{PASTE_TSV_HERE}}

Return only the updated TypeScript constant.`,
    variables: ["{{YEAR}}", "{{PASTE_TSV_HERE}}"],
    targetModel: "both",
  },
  {
    id: "eia-refresh-ev",
    title: "EIA EV Infrastructure Refresh",
    category: "eia-data-refresh",
    description:
      "Updates the EV infrastructure constant from a new EIA SEDS export (charging ports, stock, consumption).",
    promptText: String.raw`Parse the following EIA SEDS tab-separated data for New York state EV infrastructure (year: {{YEAR}}).

Produce an updated NY_EV_{{YEAR}} constant. Key series to extract:
- EVCHN  -> totalPorts (Number)
- EV1CN  -> level1Ports (Number)
- EV2CN  -> level2Ports (Number)
- EVDCN  -> dcFastPorts (Number)
- EVCHP  -> totalLocations (Number)
- EV2CR  -> level2PortsPerLocation (Number)
- EVDCR  -> dcFastPortsPerLocation (Number)
- EVNTP  -> networkedOnly (Number)
- EVNOP  -> nonNetworkedOnly (Number)
- EVPUP  -> publicPortsOnly (Number)
- ELVHN  -> evStockThousands (Thousands of registered vehicles)
- ELVHS  -> evSharePercent (Percent)
- ESVHP  -> evConsumptionMWh (Million kWh)

TSV DATA:
{{PASTE_TSV_HERE}}

Return only the updated TypeScript constant.`,
    variables: ["{{YEAR}}", "{{PASTE_TSV_HERE}}"],
    targetModel: "both",
  },
  {
    id: "borough-reserve-analysis",
    title: "NYC Borough Reserve Opportunity Analysis",
    category: "borough-opportunity",
    description:
      "Ranks NYC boroughs for Dynamic Reserves participation given current NYISO conditions and updated EV/load data.",
    promptText: String.raw`You are a power market analyst specialising in the NYISO Dynamic Reserves market (target implementation 2027).

Current NYC borough reserve opportunity data:
{{PASTE_BOROUGH_DATA}}

Current NYISO conditions:
- NYC 10-Minute Total reserve floor: 500 MW (static)
- Dynamic constraint extension to: {{DYNAMIC_FLOOR_MW}} MW
- Real-time LBMP at NYC Zone J: [LBMP_PRICE] $/MWh
- Active LORCs: {{ACTIVE_LORCS}}

Rank all 5 boroughs for deploying a new demand-response asset. For each borough provide:
1. Rank (1 = best opportunity)
2. Estimated LMORP premium range ($/MWh) vs. NYCA system price
3. Recommended asset type and MW target
4. Key risk or dependency
5. 2-sentence strategic justification

Then identify 2 cross-borough coordination opportunities.

Format: markdown ranked table, then borough detail sections.`,
    variables: ["{{PASTE_BOROUGH_DATA}}", "{{DYNAMIC_FLOOR_MW}}", "{{LBMP_PRICE}}", "{{ACTIVE_LORCS}}"],
    targetModel: "both",
  },
  {
    id: "lmorp-calculation",
    title: "LMORP Calculation Walkthrough",
    category: "lmorp-calculation",
    description:
      "Walks through a worked LMORP calculation for a specific generator or demand resource node.",
    promptText: String.raw`Explain the NYISO LMORP (Locational Marginal Operating Reserve Price) calculation for a resource at {{NODE_NAME}}.

Formula: gamma_{i,p} = lambda_p^R - sum_k (GF_{ik} x mu_k)

Use these values:
- System marginal reserve price (lambda_p^R): [LAMBDA_R] $/MWh
- Active Locational Operating Reserve Constraints (LORCs):
{{LORC_DATA}}
  Each row: LORC name | Shift factor GF_{ik} | Shadow price mu_k ($/MWh)

Steps required:
1. Calculate the congestion component: sum_k (GF_{ik} x mu_k)
2. Calculate LMORP: lambda_p^R minus the congestion component
3. Explain whether the result is a premium or discount vs. the NYCA system price
4. Describe the investment signal this sends to a demand-response asset owner at this node

Show arithmetic step-by-step. Keep language accessible to a commercial energy buyer.`,
    variables: ["{{NODE_NAME}}", "{{LAMBDA_R}}", "{{LORC_DATA}}"],
    targetModel: "both",
  },
  {
    id: "market-design-update",
    title: "Dynamic Reserves Market Design Update",
    category: "market-design-update",
    description:
      "Converts a NYISO stakeholder document excerpt into website-ready content for the dynamic-reserves page.",
    promptText: String.raw`You are a technical writer for an energy services website. Summarise the following NYISO stakeholder document excerpt into content for the Dynamic Reserves page.

Audience: sophisticated commercial/industrial energy buyers and demand-response aggregators — not power systems engineers.
Tone: authoritative but accessible.
Focus on: implications for reserve market participants, changes to LMORP pricing, what actions buyers should consider before 2027.

Output format:
- 3 short paragraphs of plain prose (no markdown headers or bullet points in the body)
- A "Key Takeaways" bullet list of 3-5 actionable points
- A suggested page headline (max 10 words)

DOCUMENT EXCERPT:
{{PASTE_DOCUMENT}}`,
    variables: ["{{PASTE_DOCUMENT}}"],
    targetModel: "both",
  },
];

export const CATEGORY_LABELS: Record<PromptCategory, string> = {
  "eia-data-refresh": "EIA Data Refresh",
  "borough-opportunity": "Borough Opportunity",
  "lmorp-calculation": "LMORP Calculation",
  "market-design-update": "Market Design Update",
};
