import type { Metadata } from "next";
import EnergyHeader from "@/components/energy/EnergyHeader";
import EnergyNav from "@/components/energy/EnergyNav";

export const metadata: Metadata = {
  title: "NYC Energy Platform | Innovation Data Platform",
  description:
    "NYC energy opportunity analysis: sector consumption, pricing, EV infrastructure, renewables, and NYISO Dynamic Reserves market intelligence.",
};

export default function EnergyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EnergyHeader />
      <div className="container mx-auto flex max-w-7xl px-4 pt-6 pb-16">
        <aside className="hidden lg:block lg:w-52 xl:w-56 flex-none pr-6">
          <EnergyNav />
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </>
  );
}
