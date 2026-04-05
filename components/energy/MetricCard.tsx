import { TrendingUp, TrendingDown, Minus } from "lucide-react";

type ColorScheme = "sky" | "indigo" | "amber" | "emerald" | "rose" | "slate";
type Trend = "up" | "down" | "neutral";

interface MetricCardProps {
  label: string;
  value: string;
  subLabel?: string;
  trend?: Trend;
  colorScheme?: ColorScheme;
}

const borderColors: Record<ColorScheme, string> = {
  sky: "border-t-sky-500",
  indigo: "border-t-indigo-500",
  amber: "border-t-amber-500",
  emerald: "border-t-emerald-500",
  rose: "border-t-rose-500",
  slate: "border-t-slate-400",
};

const valueColors: Record<ColorScheme, string> = {
  sky: "text-sky-700",
  indigo: "text-indigo-700",
  amber: "text-amber-700",
  emerald: "text-emerald-700",
  rose: "text-rose-700",
  slate: "text-slate-700",
};

export default function MetricCard({
  label,
  value,
  subLabel,
  trend,
  colorScheme = "sky",
}: MetricCardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200 border-t-2 bg-white p-5 shadow-sm ${borderColors[colorScheme]}`}
    >
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${valueColors[colorScheme]}`}>{value}</p>
      {(subLabel || trend) && (
        <div className="mt-2 flex items-center gap-1.5">
          {trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />}
          {trend === "down" && <TrendingDown className="h-3.5 w-3.5 text-rose-500" />}
          {trend === "neutral" && <Minus className="h-3.5 w-3.5 text-slate-400" />}
          {subLabel && <p className="text-xs text-slate-400">{subLabel}</p>}
        </div>
      )}
    </div>
  );
}
