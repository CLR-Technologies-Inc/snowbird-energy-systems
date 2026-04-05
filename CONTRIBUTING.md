# Contributing to Snowbird Energy Systems

Thank you for your interest in contributing. This document explains how to get involved, what we're looking for, and how to submit changes effectively.

---

## Code of Conduct

By participating in this project you agree to maintain a respectful and constructive environment. We expect all contributors to:

- Use welcoming and inclusive language
- Accept constructive feedback graciously
- Focus criticism on ideas and code, not people
- Be patient with new contributors

Unacceptable behaviour should be reported to the maintainers via the contact details in [SECURITY.md](SECURITY.md).

---

## What We're Looking For

We welcome contributions in the following areas:

- **Data updates** — refreshed EIA SEDS annual data or NYISO Dynamic Reserves reference data
- **Chart improvements** — new visualisations or enhancements to existing Recharts components
- **New energy routes** — additional `/energy/*` pages that follow the existing server/client pattern
- **Bug fixes** — TypeScript errors, layout issues, or incorrect data references
- **Documentation** — improvements to the README, inline code comments, or data source references

We are **not** currently accepting contributions that:

- Add a database or external API dependency to the energy platform
- Modify the Headlesshost CMS integration (`app/[instance]/`) without a clearly stated reason
- Add authentication or user account features
- Introduce new external map libraries (borough zones are intentionally CSS-only)

If you are unsure whether your idea fits, open a Discussion before writing any code.

---

## Getting Started

### 1. Fork and clone

```bash
git clone <your-fork-url>
cd headlesshost-knowledgebase
npm install
```

### 2. Set up environment

```bash
cp .env.local.example .env.local
# Add your HEADLESSHOST_SITEID if working on CMS routes
```

The `/energy/*` routes require **no environment variables** — they run entirely on static data.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000/energy](http://localhost:3000/energy).

### 4. Verify the build passes before submitting

```bash
npm run build
npm run lint
```

All contributions must pass a clean `npm run build` with zero TypeScript errors.

---

## Project Structure

Understanding these conventions will help you contribute effectively:

| Path | Purpose |
| --- | --- |
| `data/energy/` | Static TypeScript constants — all EIA and NYISO source data lives here |
| `data/analysis/` | Gemini CLI output — gitignored, not for committing |
| `app/energy/` | Next.js App Router pages for the energy platform |
| `components/energy/` | Reusable energy components |
| `app/(snowbird)/` | Snowbird residential savings pages |
| `app/[instance]/` | Headlesshost CMS routes — do not modify without clear justification |

**Key conventions:**

- Chart components must be `"use client"` — data is fetched server-side and passed as props
- No data fetching inside client components
- Static data only — no runtime API calls from the energy platform
- TypeScript strict mode is enabled — no `any` types without justification

---

## Updating Energy Data

To update EIA or NYISO reference data:

1. Download the latest EIA SEDS export for New York State from the [EIA Open Data browser](https://www.eia.gov/opendata/browser/seds?frequency=annual&data=value;&facets=stateId;&stateId=NY;&sortColumn=period;&sortDirection=desc)
2. Update the relevant constants in `data/energy/eia-ny-2024.ts` (or create a new year file following the same structure)
3. Update any computed values in the overview and chart pages that reference the old constants
4. Run `npm run build` to confirm no type errors

When adding a new data year, follow the naming convention `eia-ny-YYYY.ts` and export the same interface shapes.

---

## Submitting a Pull Request

1. **Create a branch** from `main` with a descriptive name:
   ```bash
   git checkout -b feat/solar-capacity-chart
   git checkout -b fix/ev-tooltip-formatting
   git checkout -b data/eia-2025-update
   ```

2. **Make focused commits** — one logical change per commit. Include a clear commit message that explains *why*, not just *what*.

3. **Open a pull request** against `main` with:
   - A short title (under 70 characters)
   - A description covering: what changed, why, and how to test it
   - Screenshots or screen recordings for any visual changes

4. **Respond to review feedback** promptly. If a reviewer requests changes, push additional commits to the same branch — do not force-push after review has begun.

### Pull request checklist

Before submitting, confirm:

- [ ] `npm run build` passes with zero TypeScript errors
- [ ] `npm run lint` passes with no new warnings
- [ ] No `.env`, `.claude/`, or `scripts/` files are included in the commit
- [ ] New components follow the existing server/client boundary pattern
- [ ] Data changes include updated constants with correct interface shapes
- [ ] Visual changes include a screenshot in the PR description

---

## Reporting Issues

When opening an issue, please include:

- **Describe the problem** — what did you expect to happen, and what happened instead?
- **Steps to reproduce** — the minimal sequence of actions that triggers the issue
- **Environment** — Node.js version, browser, and operating system
- **Screenshots** — for visual or layout issues

For security vulnerabilities, do **not** open a public issue — follow the process in [SECURITY.md](SECURITY.md).

---

## External Resources

- [EIA Open Data API](https://www.eia.gov/opendata/) — source for all energy consumption and pricing data
- [NYISO Dynamic Reserves stakeholder materials](https://www.nyiso.com/energy-market-operational-data) — source for reserve market design data
- [Next.js App Router documentation](https://nextjs.org/docs/app) — routing and server/client component patterns
- [Recharts documentation](https://recharts.org/en-US/) — chart component API reference
- [Tailwind CSS documentation](https://tailwindcss.com/docs) — utility class reference
