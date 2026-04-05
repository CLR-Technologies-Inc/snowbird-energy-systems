"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { EnergyNavItem } from "@/app/lib/types";

const NAV_ITEMS: EnergyNavItem[] = [
  { title: "Overview", href: "/energy/overview", description: "Key metrics dashboard" },
  { title: "Consumption", href: "/energy/consumption", description: "Sector electricity use" },
  { title: "Pricing", href: "/energy/pricing", description: "Sector price differentials" },
  { title: "EV Infrastructure", href: "/energy/ev-infrastructure", description: "Charging ports & EV stock" },
  { title: "Renewables", href: "/energy/renewables", description: "Wind, solar & degree days" },
  { title: "Dynamic Reserves", href: "/energy/dynamic-reserves", description: "NYISO LMORP & borough map" },
  { title: "Prompts Library", href: "/energy/prompts", description: "Copyable analysis prompts" },
];

export default function EnergyNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-6">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400 px-3">
        Energy Platform
      </p>
      <ul className="space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-sky-50 font-medium text-sky-700 border-l-2 border-sky-500"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
