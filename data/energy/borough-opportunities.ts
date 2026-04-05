// NYC Borough Reserve Opportunity Zones
// Context: NYISO Dynamic Reserves market (2027 implementation target)
// Borough data reflects 2020–2024 infrastructure growth trends

export interface BoroughOpportunity {
  borough: string;
  nyisoNode: string;
  reservePotentialMW: number;
  primaryOpportunity: "Commercial HVAC" | "EV Fleet" | "Industrial DR" | "Mixed";
  lorcs: string[];
  evPortsApprox: number;       // Approximate EV charging ports (borough-level estimate)
  keyAssetType: string;        // Recommended DR asset for reserve market
  deployTimelineMonths: number; // Estimated months to deploy before 2027
  notes: string;
}

export const BOROUGH_OPPORTUNITIES: BoroughOpportunity[] = [
  {
    borough: "Manhattan",
    nyisoNode: "NYC-ZONE-J",
    reservePotentialMW: 180,
    primaryOpportunity: "Commercial HVAC",
    lorcs: ["NYC-I", "NYC-II"],
    evPortsApprox: 3200,
    keyAssetType: "Commercial building HVAC demand response aggregation",
    deployTimelineMonths: 18,
    notes:
      "Highest LMORP congestion premium in NYC due to load density and transmission constraints. " +
      "Commercial building DR (HVAC curtailment, battery storage) is fastest to enroll and can " +
      "ramp within 10 minutes. Midtown and Lower Manhattan office stock offers large aggregated MW.",
  },
  {
    borough: "Brooklyn",
    nyisoNode: "NYC-ZONE-J",
    reservePotentialMW: 120,
    primaryOpportunity: "Mixed",
    lorcs: ["NYC-II"],
    evPortsApprox: 3800,
    keyAssetType: "Mixed portfolio: industrial waterfront load + EV fleet aggregation",
    deployTimelineMonths: 20,
    notes:
      "Growing EV adoption in South Brooklyn combined with industrial waterfront operations " +
      "(food cold-storage, logistics) creates a mixed DR portfolio. Navy Yard and Sunset Park " +
      "industrial zones offer fast-ramping interruptible loads with high coincident peak exposure.",
  },
  {
    borough: "Queens",
    nyisoNode: "NYC-ZONE-J",
    reservePotentialMW: 110,
    primaryOpportunity: "EV Fleet",
    lorcs: ["NYC-II", "LI-Connect"],
    evPortsApprox: 4100,
    keyAssetType: "Airport ground service vehicle V2G fleet + taxi/rideshare charging aggregation",
    deployTimelineMonths: 24,
    notes:
      "JFK and LaGuardia electrification programmes create the largest captive EV fleet opportunity " +
      "in NYC. V2G-capable charging at airport depots could provide significant 10-minute reserve. " +
      "Adjacent to LI interface — positions well for cross-constraint LORC value.",
  },
  {
    borough: "Bronx",
    nyisoNode: "NYC-ZONE-J",
    reservePotentialMW: 55,
    primaryOpportunity: "Industrial DR",
    lorcs: ["NYC-I"],
    evPortsApprox: 2200,
    keyAssetType: "Food distribution and cold-storage interruptible load",
    deployTimelineMonths: 16,
    notes:
      "Hunts Point food distribution hub offers fast-ramping refrigeration loads capable of " +
      "10-minute response. Shortest deployment timeline due to existing demand response programme " +
      "participation. Constrained NYC-I LORC exposure creates meaningful shadow price opportunity.",
  },
  {
    borough: "Staten Island",
    nyisoNode: "NYC-ZONE-J",
    reservePotentialMW: 35,
    primaryOpportunity: "EV Fleet",
    lorcs: ["NYC-II"],
    evPortsApprox: 1100,
    keyAssetType: "Ferry fleet V2G + residential EV smart-charging aggregation",
    deployTimelineMonths: 28,
    notes:
      "Staten Island Ferry electrification provides a single large-block controllable load. " +
      "Residential EV aggregation is growing but requires Virtual Power Plant (VPP) enrolment " +
      "infrastructure. Longest deployment timeline; lower MW potential but strategically positions " +
      "for post-2027 market growth.",
  },
];

// Total addressable reserve potential across all boroughs
export const TOTAL_NYC_RESERVE_POTENTIAL_MW = BOROUGH_OPPORTUNITIES.reduce(
  (sum, b) => sum + b.reservePotentialMW,
  0
);
