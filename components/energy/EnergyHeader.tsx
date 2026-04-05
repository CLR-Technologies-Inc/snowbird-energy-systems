"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";
import type { EnergyNavItem } from "@/app/lib/types";

const NAV_ITEMS: EnergyNavItem[] = [
  { title: "Overview", href: "/energy/overview" },
  { title: "Consumption", href: "/energy/consumption" },
  { title: "Pricing", href: "/energy/pricing" },
  { title: "EV Infrastructure", href: "/energy/ev-infrastructure" },
  { title: "Renewables", href: "/energy/renewables" },
  { title: "Dynamic Reserves", href: "/energy/dynamic-reserves" },
  { title: "Prompts", href: "/energy/prompts" },
];

export default function EnergyHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo / wordmark */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
              <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
            </svg>
            snowbird
          </Link>
          <span className="text-slate-200">|</span>
          <Link href="/energy/overview" className="flex items-center gap-2 font-semibold text-slate-900">
            <Zap className="h-5 w-5 text-sky-500" />
            <span>NYC Energy Platform</span>
            <span className="ml-1 rounded bg-sky-100 px-1.5 py-0.5 text-xs font-medium text-sky-700">
              2024
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-sky-50 font-medium text-sky-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {open && (
        <nav className="lg:hidden border-t border-slate-100 bg-white px-4 py-3">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                      active
                        ? "bg-sky-50 font-medium text-sky-700"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2 border-t border-slate-100 mt-2">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                </svg>
                snowbird
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
