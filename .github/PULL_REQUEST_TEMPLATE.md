## Summary

<!-- Describe what this PR changes and why. One paragraph is enough for small changes. -->

## Type of change

- [ ] Bug fix
- [ ] Data update (EIA SEDS / NYISO)
- [ ] New chart or visualisation
- [ ] New route or page
- [ ] Documentation update
- [ ] Dependency update
- [ ] Other (describe below)

## Related issues

<!-- Link any related issues: Closes #123, Fixes #456 -->

## How to test

<!-- Step-by-step instructions for a reviewer to verify the change works. -->

1.
2.
3.

## Screenshots

<!-- For visual changes, include before/after screenshots or a screen recording. -->

## Checklist

- [ ] `npm run build` passes with zero TypeScript errors
- [ ] `npm run lint` passes with no new warnings
- [ ] No `.env`, `.claude/`, or `scripts/` files are included
- [ ] New components follow the server/client boundary pattern (charts are `"use client"`, data passed as props)
- [ ] Data changes include updated TypeScript constants with correct interface shapes
- [ ] Documentation updated if behaviour has changed
