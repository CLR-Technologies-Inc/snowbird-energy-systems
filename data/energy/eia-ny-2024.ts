// EIA State Energy Data System (SEDS) — New York State, 2024
// Source: https://www.eia.gov/opendata/browser/seds?frequency=annual&data=value;&facets=stateId;&stateId=NY;&sortColumn=period;&sortDirection=desc

export interface SectorConsumption {
  year: number;
  residential: number;   // Million kWh  (ESRCP)
  commercial: number;    // Million kWh  (ESCCP)
  industrial: number;    // Million kWh  (ESICP)
  transport: number;     // Million kWh  (ESACP)
  total: number;         // Million kWh  (ESTCP)
}

export interface SectorPricing {
  year: number;
  residential: number;   // $/MMBtu  (ESRCD)
  commercial: number;    // $/MMBtu  (ESCCD)
  industrial: number;    // $/MMBtu  (ESICD)
  transport: number;     // $/MMBtu  (ESACD)
  average: number;       // $/MMBtu  (ESTCD)
}

export interface SectorExpenditure {
  year: number;
  residential: number;   // Million dollars  (ESRCV)
  commercial: number;    // Million dollars  (ESCCV)
  industrial: number;    // Million dollars  (ESICV)
  transport: number;     // Million dollars  (ESACV)
  total: number;         // Million dollars  (ESTCV)
}

export interface EvInfrastructure {
  year: number;
  totalPorts: number;           // Number  (EVCHN)
  level1Ports: number;          // Number  (EV1CN)
  level2Ports: number;          // Number  (EV2CN)
  dcFastPorts: number;          // Number  (EVDCN)
  totalLocations: number;       // Number  (EVCHP)
  level2PortsPerLocation: number; // Number  (EV2CR)
  dcFastPortsPerLocation: number; // Number  (EVDCR)
  networkedOnly: number;        // Locations with networked ports only  (EVNTP)
  nonNetworkedOnly: number;     // Locations with non-networked ports only  (EVNOP)
  publicPortsOnly: number;      // Locations with public ports only  (EVPUP)
  evStockThousands: number;     // Thousands of registered vehicles  (ELVHN)
  evSharePercent: number;       // Percent of total light-duty vehicles  (ELVHS)
  evConsumptionMWh: number;     // Million kWh consumed for EV use  (ESVHP)
}

export interface RenewablesGeneration {
  year: number;
  windTotalMWh: number;             // Million kWh  (WYTCP)
  windCapacityFactorPct: number;    // Percent  (WYCAS)
  windCapacityKW: number;           // Kilowatts  (WYGBP × 1000)
  solarTotalMWh: number;            // Million kWh  (SOTGP)
  solarCapacityFactorPct: number;   // Percent  (SPCAS)
  solarCapacityKW: number;          // Kilowatts  (SOGBP × 1000)
  solarResidentialMWh: number;      // Million kWh small-scale residential  (SOR7P)
  totalRenewableCapacityKW: number; // Kilowatts  (REGBP × 1000)
  totalRenewableProductionBtu: number; // Billion Btu  (REPRB)
}

export interface DegreeDays {
  year: number;
  heatingDegreeDays: number;  // Days  (ZWHDP)
  coolingDegreeDays: number;  // Days  (ZWCDP)
}

export interface ElectricityImports {
  year: number;
  importsExpendituresMillion: number; // Million dollars  (ELIMV)
  importsPriceDollarsPerMMBtu: number; // $/MMBtu  (ELIMD)
  netImportsMWh: number;              // Million kWh  (ELNIP)
}

// ── 2024 Constants ────────────────────────────────────────────────────────────

export const NY_CONSUMPTION_2024: SectorConsumption = {
  year: 2024,
  residential: 50857,
  commercial: 71053,
  industrial: 15805,
  transport: 2782,
  total: 140498,
};

export const NY_PRICING_2024: SectorPricing = {
  year: 2024,
  residential: 71.60,
  commercial: 55.01,
  industrial: 26.89,
  transport: 43.09,
  average: 57.62,
};

export const NY_EXPENDITURE_2024: SectorExpenditure = {
  year: 2024,
  residential: 12424.3,
  commercial: 13337.1,
  industrial: 1450.1,
  transport: 409.1,
  total: 27620.6,
};

export const NY_EV_2024: EvInfrastructure = {
  year: 2024,
  totalPorts: 18643,
  level1Ports: 40,
  level2Ports: 16438,
  dcFastPorts: 2165,
  totalLocations: 5002,
  level2PortsPerLocation: 3.62,
  dcFastPortsPerLocation: 4.05,
  networkedOnly: 4641,
  nonNetworkedOnly: 348,
  publicPortsOnly: 4733,
  evStockThousands: 269.8,
  evSharePercent: 2.6,
  evConsumptionMWh: 617,
};

export const NY_RENEWABLES_2024: RenewablesGeneration = {
  year: 2024,
  windTotalMWh: 6031,
  windCapacityFactorPct: 24.4,
  windCapacityKW: 2870000,
  solarTotalMWh: 7650,
  solarCapacityFactorPct: 16.9,
  solarCapacityKW: 2669000,
  solarResidentialMWh: 2033,
  totalRenewableCapacityKW: 10502000,
  totalRenewableProductionBtu: 144538,
};

export const NY_DEGREE_DAYS_2024: DegreeDays = {
  year: 2024,
  heatingDegreeDays: 5244,
  coolingDegreeDays: 766,
};

export const NY_IMPORTS_2024: ElectricityImports = {
  year: 2024,
  importsExpendituresMillion: 568.5,
  importsPriceDollarsPerMMBtu: 18.82,
  netImportsMWh: 6124,
};
