"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { title: "Home", href: "/" },
  { title: "Savings", href: "/savings" },
  { title: "Year-over-year", href: "/savings-compare" },
  { title: "Annual summary", href: "/annual" },
];

export default function SnowbirdHeader() {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md shadow-slate-900/5 transition duration-500">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 lg:px-8 py-3">

          {/* Left: mobile toggle + logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden"
              aria-label="Open navigation"
              onClick={() => setShowNav(true)}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" className="h-6 w-6 stroke-slate-500">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <Link href="/" aria-label="Home">
              <Image
                src="/snowbird-long-logo.png"
                alt="Snowbird"
                width={608}
                height={286}
                priority
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  pathname === link.href
                    ? "bg-slate-100 font-semibold text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {link.title}
              </Link>
            ))}
            <Link
              href="/energy/overview"
              className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
              </svg>
              Energy Platform
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      {showNav && (
        <div className="fixed inset-0 overflow-y-auto bg-slate-900/20 backdrop-blur z-50">
          <div className="min-h-full w-full bg-white max-w-xs pt-7 pb-16 px-6">
            <div className="flex justify-end mb-6">
              <button onClick={() => setShowNav(false)} aria-label="Close navigation">
                <svg className="h-6 w-6 stroke-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setShowNav(false)}
                  className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                    pathname === link.href
                      ? "bg-slate-100 font-semibold text-slate-900"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {link.title}
                </Link>
              ))}
              <Link
                href="/energy/overview"
                onClick={() => setShowNav(false)}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1.5 text-sm font-semibold text-sky-700 hover:bg-sky-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
                </svg>
                Energy Platform
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
