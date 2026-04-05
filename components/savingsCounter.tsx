"use client";

import { useEffect, useRef, useState } from "react";

// April 4, 2024 NYC Zone J hourly profile
// Each entry: [startHour, endHour, usageKwhPerHr, daPriceDollarsPerMwh]
const HOURLY_PROFILE = [
  { start: 0,  end: 6,  usageKwh: 0.5, daPrice: 28 },  // midnight–6am (low usage, low price)
  { start: 6,  end: 7,  usageKwh: 0.8, daPrice: 38 },  // 6–7am ramp up
  { start: 7,  end: 9,  usageKwh: 1.5, daPrice: 55 },  // morning peak
  { start: 9,  end: 15, usageKwh: 1.0, daPrice: 38 },  // midday
  { start: 15, end: 16, usageKwh: 1.5, daPrice: 48 },  // afternoon ramp
  { start: 16, end: 20, usageKwh: 2.0, daPrice: 62 },  // evening peak
  { start: 20, end: 22, usageKwh: 1.2, daPrice: 44 },  // evening
  { start: 22, end: 24, usageKwh: 0.8, daPrice: 32 },  // late night
];

const SAVINGS_RATE = 0.20; // 20%
const RETAIL_RATE = 0.22;  // $/kWh residential retail

function getSavingsRateForHour(hour: number): number {
  const slot = HOURLY_PROFILE.find((s) => hour >= s.start && hour < s.end) ?? HOURLY_PROFILE[0];
  // Savings per hour in dollars (retail rate)
  return slot.usageKwh * SAVINGS_RATE * RETAIL_RATE;
}

function getTotalSavingsUpToNow(hour: number, minuteFraction: number): number {
  let total = 0;
  for (const slot of HOURLY_PROFILE) {
    if (slot.end <= hour) {
      // Full hours before current
      total += (slot.end - slot.start) * slot.usageKwh * SAVINGS_RATE * RETAIL_RATE;
    } else if (slot.start < hour + minuteFraction / 60) {
      // Partial current hour
      const elapsed = Math.max(0, hour + minuteFraction / 60 - slot.start);
      total += elapsed * slot.usageKwh * SAVINGS_RATE * RETAIL_RATE;
    }
  }
  return total;
}

interface SavingsCounterProps {
  mode: "charity" | "income";
}

export default function SavingsCounter({ mode }: SavingsCounterProps) {
  const [savings, setSavings] = useState(0);
  const [currentRate, setCurrentRate] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Simulate April 4, 2024 — start counter at current real-world time-of-day
    const now = new Date();
    const hour = now.getHours();
    const minuteFraction = now.getMinutes() + now.getSeconds() / 60;

    const initialSavings = getTotalSavingsUpToNow(hour, minuteFraction);
    const rate = getSavingsRateForHour(hour); // $ per hour

    setSavings(initialSavings);
    setCurrentRate(rate);
    startTimeRef.current = Date.now() - (minuteFraction * 60 * 1000) % 3600000;

    const interval = setInterval(() => {
      const elapsed = (Date.now() - (startTimeRef.current ?? Date.now())) / 3600000; // hours elapsed since top of this hour
      const nowInner = new Date();
      const h = nowInner.getHours();
      const mf = nowInner.getMinutes() + nowInner.getSeconds() / 60 + nowInner.getMilliseconds() / 60000;
      setSavings(getTotalSavingsUpToNow(h, mf));
      setCurrentRate(getSavingsRateForHour(h));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const label = mode === "charity" ? "donated to charity today" : "earned as passive income today";
  const accent = mode === "charity" ? "text-sky-600" : "text-emerald-600";
  const bg = mode === "charity" ? "bg-sky-50 border-sky-200" : "bg-emerald-50 border-emerald-200";

  return (
    <div className={`rounded-2xl border p-8 text-center ${bg}`}>
      <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">
        Live savings meter
      </p>
      <div className={`text-5xl font-bold font-mono tabular-nums ${accent} mb-1`}>
        ${savings.toFixed(4)}
      </div>
      <p className="text-slate-600 text-sm mt-2">{label}</p>
      <p className="text-slate-400 text-xs mt-4">
        Rate: ${(currentRate).toFixed(4)}/hr &middot; Based on April 4, 2024 NYISO Zone J day-ahead pricing &middot; 20% home savings
      </p>
    </div>
  );
}
