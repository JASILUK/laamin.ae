# LAAMIN Services content update

## Files in this package

- `data/services.ts` — canonical service content for four main services and two specialist visa pages.
- `app/services/page.tsx` — updated services overview.
- `app/services/[slug]/page.tsx` — updated reusable service detail page, metadata, navigation and enquiry links.

## Apply carefully

1. Back up your current three files.
2. Replace the matching files with these versions. If your project uses a different route folder structure, copy the code into the matching existing files rather than creating duplicate routes.
3. Keep your existing `PageHero`, `ContactCta`, `Container`, `ProcessSteps`, `Eyebrow`, `SectionHeading`, and `ButtonLink` components. This update reuses them.
4. The canonical business setup route is `/services/business-setup-services`, matching the homepage service slug. The old `/services/business-setup` route is preserved through a permanent redirect.
5. Family Visa and Golden Visa pages are added as `/services/family-visa` and `/services/golden-visa`.
6. Your homepage currently imports service content separately from `@/lib/data`. This package does not replace that file, so update its visible labels/copy separately if you want the homepage text to match exactly. Preserve the homepage's existing image assets and animations.
7. Run your project's lint, type-check and production build before deploying.

## Content accuracy

Service copy is deliberately qualified with “where applicable”, “coordination”, and “subject to requirements” where the proposal does not prove that every service is universally available. Confirm current offerings, jurisdictions, regulated-provider arrangements, plan inclusions and fees with the business before publishing.

No government approval or processing-time guarantee is made.
