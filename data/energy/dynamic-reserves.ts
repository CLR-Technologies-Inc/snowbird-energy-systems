// NYISO Dynamic Reserves Market Design Reference Data
// Framework target: 2027 implementation (pending FERC regulatory acceptance)
// Source: NYISO Dynamic Reserves stakeholder materials, 2021–2024

export interface LmorpVariable {
  symbol: string;      // Unicode-friendly symbol string
  name: string;
  definition: string;
  unit: string;
}

export interface ReserveRequirement {
  region: string;
  productType: string;
  staticFloorMW: number | null;
  dynamicBasis: string;
  tsaOverride: string | null;  // Behaviour during Thunderstorm Alert events
  notes: string;
}

export interface TariffRevision {
  tariff: "MST" | "OATT";
  section: string;
  summary: string;
}

export interface ProjectMilestone {
  year: number;
  event: string;
}

// ── LMORP Formula Variables ───────────────────────────────────────────────────
// Formula: γ_{i,p} = λ_p^R − Σ_{k ∈ K} (GF_{ik} × μ_k)

export const LMORP_VARIABLES: LmorpVariable[] = [
  {
    symbol: "γ_{i,p}",
    name: "LMORP",
    definition:
      "Locational Marginal Operating Reserve Price for Operating Reserve product p at bus i. " +
      "Reflects the locational value of a resource's reserve schedule including a congestion component.",
    unit: "$/MWh",
  },
  {
    symbol: "λ_p^R",
    name: "System Marginal Reserve Price",
    definition:
      "The NYCA-wide system marginal Operating Reserve price for product p. " +
      "This is the baseline price before locational adjustments.",
    unit: "$/MWh",
  },
  {
    symbol: "GF_{ik}",
    name: "Generation Shift Factor",
    definition:
      "Shift factor for bus i on Locational Operating Reserve Constraint (LORC) k. " +
      "Models the specific relief an individual resource provides on a transmission constraint.",
    unit: "dimensionless",
  },
  {
    symbol: "μ_k",
    name: "LORC Shadow Price",
    definition:
      "Shadow price of Locational Operating Reserve Constraint k. " +
      "A positive shadow price indicates the constraint is binding — resources at relieving nodes receive a premium.",
    unit: "$/MWh",
  },
];

// ── Reserve Requirements ──────────────────────────────────────────────────────

export const RESERVE_REQUIREMENTS: ReserveRequirement[] = [
  {
    region: "NYCA",
    productType: "10-Minute Spin",
    staticFloorMW: null,
    dynamicBasis: "½ × largest supply contingency in the NYCA",
    tsaOverride: null,
    notes: "Fully dynamic — no static floor. Responds in real-time to contingency changes.",
  },
  {
    region: "NYCA",
    productType: "10-Minute Total",
    staticFloorMW: null,
    dynamicBasis: "Largest supply contingency in the NYCA",
    tsaOverride: null,
    notes: "Fully dynamic. Replaces static NYCA total reserve requirement.",
  },
  {
    region: "NYCA",
    productType: "30-Minute Total",
    staticFloorMW: null,
    dynamicBasis:
      "Largest contingency + 2nd largest contingency + max(0, Forecast Load − Scheduled Load)",
    tsaOverride: null,
    notes:
      "Integrates DAM Forecast Load to ensure sufficient energy exists to serve peak forecast demand. " +
      "Eliminates need for separate Forecast Pass commitments.",
  },
  {
    region: "NYC",
    productType: "10-Minute Total",
    staticFloorMW: 500,
    dynamicBasis: "Dynamic constraints may increase above 500 MW (e.g. to 530 MW+) when economically efficient",
    tsaOverride: "Static floor set to 0 MW during Thunderstorm Alert events; dynamic constraints take over",
    notes:
      "Maintains NERC/NPCC/NYSRC compliance floor. NYC Zone J congestion means LMORP typically " +
      "carries a premium over NYCA system price.",
  },
  {
    region: "Long Island",
    productType: "10-Minute Total",
    staticFloorMW: 120,
    dynamicBasis: "Dynamic constraints may increase above 120 MW floor",
    tsaOverride: null,
    notes:
      "MST 15.4 revision sunsets the existing special pricing rules for Long Island under Dynamic Reserves.",
  },
];

// ── Tariff Revisions ──────────────────────────────────────────────────────────

export const TARIFF_REVISIONS: TariffRevision[] = [
  { tariff: "MST", section: "2.12", summary: "Adds definition for LMORP (Locational Marginal Operating Reserve Price)." },
  { tariff: "MST", section: "2.19", summary: "Eliminates 'Scarcity Reserve Region' definitions — superseded by dynamic framework." },
  {
    tariff: "MST",
    section: "15.4",
    summary:
      "Establishes rules for dynamic requirements, nodal reserve pricing, and sunsets special pricing rules for Long Island.",
  },
  {
    tariff: "MST",
    section: "17",
    summary:
      "Revises LBMP calculations to include 30-minute Operating Reserve Constraints in the congestion component. " +
      "Shadow prices of reserve constraints now affect energy (LBMP) pricing.",
  },
  {
    tariff: "OATT",
    section: "6.5",
    summary:
      "Introduces the Forecast Reserve Charge (recovers DAM Forecast Reserve costs) and the " +
      "Operating Reserve Constraint Charge / ORCC (addresses TCC shortfalls caused by dynamic constraints).",
  },
  {
    tariff: "OATT",
    section: "19.9 & 20.1",
    summary: "Excludes Dynamic Reserve constraints from Centralized TCC Auctions and the DAM Constraint Residual definition.",
  },
  {
    tariff: "OATT",
    section: "20.2",
    summary: "Incorporates the ORCC into Net Congestion Rents settlement calculations.",
  },
];

// ── Project Timeline ──────────────────────────────────────────────────────────

export const PROJECT_MILESTONES: ProjectMilestone[] = [
  { year: 2021, event: "RECA Study — identifies limitations of static reserve regions" },
  { year: 2024, event: "NYISO refines design: ORCC, DAM prototyping, intermittency balancing merged" },
  { year: 2025, event: "Federal regulatory submission to FERC (planned)" },
  { year: 2027, event: "Target implementation date (pending regulatory acceptance)" },
];
