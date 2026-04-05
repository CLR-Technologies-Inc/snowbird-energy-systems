import Image from "next/image";
import Link from "next/link";

export default function SnowbirdLanding() {
  return (
    <main className="w-full py-12 px-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <Image
            src="/snowbird-crane-logo.png"
            alt="snowbird systems"
            width={1536}
            height={1024}
            priority
            className="object-contain w-48 h-auto"
          />
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-4 font-display">
          Energy savings, put to work.
        </h1>

        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
          snowbird systems monitors your home&apos;s power footprint and channels your savings
          toward what matters most &mdash; whether that&apos;s giving back to your community
          or building passive income.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/savings?mode=charity"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-sky-500 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            Give to Charity
          </Link>

          <Link
            href="/savings?mode=income"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
              <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd" />
              <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
            </svg>
            Earn Passive Income
          </Link>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-8 space-y-3">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-4">Explore the platform</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
            <Link href="/savings-compare" className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors">
              Year-over-year comparison
            </Link>
            <Link href="/annual" className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors">
              Annual savings &amp; donations
            </Link>
            <Link href="/energy/overview" className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-4 py-2 text-sky-700 font-semibold hover:bg-sky-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
              </svg>
              NYC Energy Platform
            </Link>
          </div>
          <p className="text-xs text-slate-400 pt-1">
            NYISO Zone J day-ahead market data &middot; No hardware required
          </p>
        </div>
      </div>
    </main>
  );
}

export const metadata = {
  title: "Snowbird — Energy savings, put to work",
  description: "Monitor your home's power footprint and channel your savings toward charity or passive income.",
};
