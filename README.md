# Snowbird Systems — NYC Innovation Energy Data Platform

Snowbird Systems monitors residential energy footprints and channels demand-response savings toward charity or passive income, powered by NYISO Zone J day-ahead market pricing.

The platform also provides a full data application evaluating localized nodal opportunities for electrical service deployment across New York City's five boroughs, powered by EIA Open Data and NYISO's Dynamic Reserves market framework.

Built on [Next.js](https://nextjs.org/) and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

---

## Overview

This platform supports a new electrical service offering designed to take advantage of localized changes in power demand across NYC. It visualises New York State energy metrics, models borough-level reserve market opportunities, and provides analysis tools for commercial and industrial energy buyers positioning for NYISO's 2027 Dynamic Reserves implementation.

Key capabilities:

- **Residential savings engine** — tracks day-ahead NYISO Zone J pricing and accrues demand-response savings directed toward charity or passive income
- **Energy dashboards** — sector consumption, pricing differentials, EV infrastructure, and renewable generation, all seeded from EIA SEDS 2024 baseline data
- **Dynamic Reserves intelligence** — NYISO LMORP (Locational Marginal Operating Reserve Price) formula explainer, reserve requirement visualisations, and NYC borough opportunity mapping
- **Arbitrage analysis** — highlights the $44.71/MMBtu spread between residential and industrial electricity prices as a primary investment signal
- **Prompts library** — copyable prompt templates for refreshing data and running analyses using your preferred AI tooling

---

## Data Sources

### EIA State Energy Data System (SEDS)

Baseline data sourced from the U.S. Energy Information Administration Open Data API for New York State (2024):

> [https://www.eia.gov/opendata/browser/seds](https://www.eia.gov/opendata/browser/seds?frequency=annual&data=value;&facets=stateId;&stateId=NY;&sortColumn=period;&sortDirection=desc)

Key series used: sector consumption (ESRCP, ESCCP, ESICP, ESACP), sector pricing (ESRCD, ESCCD, ESICD, ESACD), EV infrastructure (EVCHN, EVDCN, ELVHN), renewables (WYTCP, SOTGP, WYGBP, SOGBP), and degree days (ZWHDP, ZWCDP). All values are seeded as static TypeScript constants in `data/energy/eia-ny-2024.ts`.

### NYISO Dynamic Reserves

Market design reference data sourced from NYISO stakeholder documentation (2021–2024), including the Reserve Enhancements for Constrained Areas (RECA) study and subsequent design refinements. Key data is in `data/energy/dynamic-reserves.ts`.

The LMORP formula underpinning nodal reserve pricing:

```latex
γ_{i,p} = λ_p^R − Σ_{k ∈ K} (GF_{ik} × μ_k)
```

---

## Market Context & Policy Framework

### NYISO Dynamic Reserves (2027 Target)

The New York Independent System Operator is transitioning from static reserve requirements to a dynamic framework that sets operating reserve requirements based on the largest real-time contingencies. This is a first-of-its-kind market design in the United States.

**Key policy drivers:**

- **RECA Study (2021):** Identified that static reserve regions prevent optimal scheduling above 1,310 MW from individual suppliers and restrict reserve procurement shifts to lower-cost regions
- **Renewable intermittency:** As wind and solar generation grows under the Climate Leadership and Community Protection Act (CLCPA), dynamic reserves provide a real-time mechanism to adjust backup power levels
- **Nodal pricing:** Introduction of LMORP creates locational revenue signals for demand-response assets at constrained transmission nodes — particularly in NYC Zone J

**Regulatory timeline:**

- 2021 — RECA study establishes the case for dynamic requirements
- 2024 — NYISO refines design, integrating Operating Reserve Constraint Charge (ORCC) and DAM Forecast Load
- 2025 — Federal regulatory submission to FERC (planned)
- 2027 — Target implementation date

**NYC-specific requirements:**

- 500 MW static floor for 10-Minute Total Operating Reserve (maintained for NERC/NPCC/NYSRC compliance)
- Dynamic constraints can extend this floor (e.g. to 530 MW+) when economically efficient
- Thunderstorm Alert (TSA) events: static floor drops to zero; dynamic constraints take over

**Proposed tariff revisions** include MST §15.4 (nodal reserve pricing rules), MST §17 (LBMP congestion component update), and OATT §6.5 (Forecast Reserve Charge and Operating Reserve Constraint Charge).

### NYC Borough Opportunity Framework

The platform models addressable demand-response capacity across all five boroughs based on load density, EV infrastructure growth (2020–2024), and LORC exposure:

| Borough | Reserve Potential | Primary Opportunity |
| --- | --- | --- |
| Manhattan | 180 MW | Commercial HVAC demand response |
| Brooklyn | 120 MW | Mixed: industrial waterfront + EV fleet |
| Queens | 110 MW | Airport EV fleet V2G (JFK/LGA) |
| Bronx | 55 MW | Industrial DR (Hunts Point cold-storage) |
| Staten Island | 35 MW | Ferry electrification + residential EV |

Total addressable: **500 MW** across NYC — matching the static reserve floor requirement.

### Energy Arbitrage Signal

The 2024 spread between residential ($71.60/MMBtu) and industrial ($26.89/MMBtu) electricity prices creates a **$44.71/MMBtu** differential. Combined with the LMORP congestion premium at NYC Zone J nodes, demand-response assets can capture both energy cost savings and reserve market revenue.

---

## Routes

| Route | Description |
| --- | --- |
| `/` | Snowbird landing page — Charity / Passive Income CTAs |
| `/savings` | Day-ahead savings estimate + real-time accruing counter |
| `/savings-compare` | Year-over-year savings comparison (2024 vs 2025) |
| `/annual` | Annual savings, charity donations, and passive income summary |
| `/energy/overview` | NYC Energy Platform — KPI dashboard |
| `/energy/consumption` | Sector electricity consumption BarChart |
| `/energy/pricing` | Sector pricing BarChart (arbitrage delta highlighted) |
| `/energy/ev-infrastructure` | EV ports + EV stock ComposedChart |
| `/energy/renewables` | Wind/Solar AreaChart + Degree Days BarChart |
| `/energy/dynamic-reserves` | LMORP formula, borough opportunity map, tariff changes |
| `/energy/prompts` | Copyable prompt library for data refresh and analysis |

---

## AI-Assisted Analysis

This project uses Claude and Gemini for data analysis, content generation, and code assistance. Neither model has live API access within the application — all data is static. AI tools are used in two ways:

1. **Development assistance** — Claude was used to help design the platform architecture, write TypeScript components, and validate EIA data parsing

The **Prompts Library** (`/energy/prompts`) provides copyable templates for refreshing the EIA data constants, running borough opportunity analyses, walking through LMORP calculations, and converting NYISO stakeholder documents into website-ready content.

---

## Getting Started

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd headlesshost-knowledgebase
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the Snowbird landing page, or [http://localhost:3000/energy](http://localhost:3000/energy) for the energy data platform directly.

The CMS knowledgebase is available at [http://localhost:3000/knowledgebase](http://localhost:3000/knowledgebase) and requires a `HEADLESSHOST_SITEID` environment variable. Copy `.env.local.example` to `.env.local` and supply your own site ID from [Headlesshost](https://headlesshost.com).

---

## Architecture

- **Framework:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts (`BarChart`, `AreaChart`, `ComposedChart`)
- **Icons:** Lucide React
- **Data:** Static TypeScript constants in `data/energy/` — no database required
- **CMS:** Headlesshost API (existing knowledgebase routes — independent of the energy platform)

The `/energy/*` route tree is fully standalone and does not depend on the Headlesshost CMS. Next.js App Router static segment precedence ensures `/energy` routes are captured before the dynamic `[instance]` CMS segment.

---

## License

This project is provided for demonstration and educational purposes. EIA data is public domain. NYISO market design information is sourced from publicly available stakeholder documents.
