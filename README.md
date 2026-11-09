# AUREL

A fictional interior architecture and design studio, presented as a complete editorial website. Warm ivory, charcoal and muted champagne gold meet oversized serif typography, asymmetric photography and quiet, considered motion.

Built with React, TypeScript, Vite, Tailwind CSS v4, Framer Motion and Lucide.

## Run locally

```bash
npm install
npm run dev
```

The dev server starts at the URL Vite prints in the terminal.

```bash
npm run build      # type-check and production build
npm run preview    # preview the production build
npm run lint       # run Oxlint
```

## Sections

- A fixed glass navigation that turns opaque on scroll, with active-section tracking and an accessible full-screen mobile menu.
- A full-bleed image hero, the selected projects index and detailed case-study modals.
- The studio story with a portrait, principles and practice statistics.
- Four service disciplines and an invitation into the pricing estimator.
- Editorial testimonials and a validated contact form with studio information.
- A multi-column footer with an oversized wordmark.

## Project estimator

The five-step drawer collects project type, area, design package and optional services, then shows a live indicative estimate and review.

- Progress is visible at every step; past steps are editable.
- Each step validates before continuing.
- Areas default to a sensible size for the chosen project type, while preserving any area the user has set manually.
- Prices are calculated in `src/lib/pricing.ts` from typed data in `src/data/pricing.ts`.
- The fee model is: `area × project rate × package multiplier`, rounded to the nearest £100, with a ±9% indicative range, fixed add-on fees, a 25% deposit and an estimated timeline.
- All figures are illustrative and can be changed in the pricing data.

Selecting **Request a proposal** closes the drawer, pre-fills the contact form with the estimate, scrolls the form into view and focuses the first field.

## Contact form

The form validates name, email and project details, focuses the first invalid field and provides clear inline errors. Submission is intentionally simulated in the browser: after a short pause it shows a success state. **No enquiry is actually sent.** Connect `handleSubmit` in `src/components/sections/Contact.tsx` to your form endpoint before using this in production.

## Structure

```text
src/
  assets/fonts/          Self-hosted font files
  components/
    configurator/        Estimator drawer and steps
    layout/              Navigation, mobile menu and footer
    sections/            Page sections and project modal
    ui/                  Buttons, logo, links, reveals, labels
  data/                  Typed content and pricing data
  hooks/                 Estimator state, dialogs, scroll spy and UI helpers
  lib/                   Pricing logic, motion tokens and utilities
  types/                 Shared TypeScript types
public/
  images/                Optimised WebP photography
  fonts/                 SIL OFL font licences
  favicon.svg
```

Design tokens, font faces, base styles and reduced-motion rules live in `src/index.css`. Page composition and estimator-to-contact wiring live in `src/App.tsx`.

## Motion and responsiveness

Layouts are built for mobile, tablet and desktop, with touch-friendly controls, no horizontal overflow and navigation anchors aligned beneath the fixed header. Motion is handled with Framer Motion and respects `prefers-reduced-motion`; reduced-motion users get cut-down transitions, instant anchor jumps and immediately accessible content.

## Content and assets

- All studio details, projects, testimonials and statistics are fictional.
- Photography is sourced from [Unsplash](https://unsplash.com) under the Unsplash License and optimised to WebP. Source asset IDs are recorded below.
- **Cormorant Garamond** is by the Cormorant Project Authors (CatharsisFonts). **Manrope** is by the Manrope Project Authors. Both are licensed under the SIL Open Font License 1.1; the licence texts are in `public/fonts/`.
- Icons are from [Lucide](https://lucide.dev), licensed under the ISC License.

### Photography sources

| File | Unsplash asset |
| --- | --- |
| `hero-casa.webp` | `photo-1758565811178-6341e9999f48` |
| `project-casa-alba.webp` | `photo-1758565811176-ccd94357a844` |
| `project-maison-verre.webp` | `photo-1793891362426-ffe784f5d4d8` |
| `project-marlowe.webp` | `photo-1757524552833-4dba4949a5b2` |
| `project-kiln.webp` | `photo-1512972972907-6d71529c5e92` |
| `studio-atelier.webp` | `photo-1758800601052-37b407129be1` |

## Deployment

The site is published to **GitHub Pages** at <https://farsewin.github.io/AUREL/>.

Every push to `main` triggers `.github/workflows/deploy.yml`, which installs dependencies, lints, builds and deploys `dist/` through the official Pages actions.

Because Pages serves the site from a `/AUREL/` sub-path, `vite.config.ts` sets `base: '/AUREL/'`. Files in `public/` must be referenced through the `asset()` helper in `src/lib/utils.ts` so their URLs pick up the base path:

```ts
import { asset } from '../lib/utils'

<img src={asset('/images/hero-casa.webp')} />
```

Set `VITE_BASE=/` to build for a custom domain or root deployment.

## Notes

The contact details, email address and social profiles are placeholders for the fictional studio. Replace them alongside the form endpoint, canonical URL and social metadata before publishing.
