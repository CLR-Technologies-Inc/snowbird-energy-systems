import MetricCard from "./MetricCard";

interface MetricCardData {
  label: string;
  value: string;
  subLabel?: string;
  trend?: "up" | "down" | "neutral";
  colorScheme?: "sky" | "indigo" | "amber" | "emerald" | "rose" | "slate";
}

interface MetricCardGridProps {
  cards: MetricCardData[];
}

export default function MetricCardGrid({ cards }: MetricCardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, i) => (
        <MetricCard key={i} {...card} />
      ))}
    </div>
  );
}
