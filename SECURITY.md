# Security Policy

## Supported Versions

This project is currently in active development. Security fixes are applied to the latest version on the `main` branch only.

| Version | Supported |
| --- | --- |
| Latest (`main`) | :white_check_mark: |
| Older commits | :x: |

## Scope

This repository contains a static Next.js data platform. There is no user authentication, no database, and no server-side data processing beyond static site generation. The attack surface is limited to:

- **Third-party dependencies** — npm packages (Next.js, Recharts, Tailwind CSS, Lucide React)
- **Environment variables** — the `HEADLESSHOST_SITEID` CMS site identifier
- **External API calls** — read-only requests to the Headlesshost CMS API

The following are **out of scope** for this project:

- Vulnerabilities in external services (Headlesshost, EIA, NYISO)
- Issues requiring a live deployment environment not provided by this repository
- Social engineering attacks

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please **do not open a public GitHub issue**.

Report vulnerabilities privately via GitHub's built-in security advisory feature:

1. Navigate to the repository on GitHub
2. Click the **Security** tab
3. Click **Report a vulnerability**
4. Provide as much detail as possible, including steps to reproduce

You can expect an acknowledgement within **72 hours** and a resolution or status update within **14 days**.

## Sensitive File Handling

The following files must never be committed to this repository:

| File | Contains |
| --- | --- |
| `.env` | `HEADLESSHOST_SITEID` — private CMS site identifier |
| `.env.local` | Local environment overrides |
| `.claude/` | Internal AI tooling configuration |
| `scripts/` | Internal analysis scripts |

All of the above are covered by `.gitignore`. If you believe any sensitive data has been accidentally committed, please report it immediately using the process above.

## Dependencies

This project uses npm for dependency management. To audit dependencies for known vulnerabilities:

```bash
npm audit
```

We recommend running `npm audit` before deploying and keeping dependencies up to date with:

```bash
npm audit fix
```
