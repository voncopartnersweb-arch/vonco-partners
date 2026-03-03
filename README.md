# Vonco Partners Website

Production website for Vonco Partners (taxi fleet in Poland), built with Next.js App Router, TypeScript, and `next-intl`.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- `next-intl` for internationalization
- `ai` SDK for chat endpoint
- `better-sqlite3` (legacy/local DB utility in `lib/cars.tsx`)

## Requirements

- Node.js 20+ (recommended for Next.js 16)
- npm 10+

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create local env file:

```bash
cp .env.local.example .env.local
```

If `.env.local.example` does not exist, create `.env.local` manually (see Environment Variables below).

3. Start dev server:

```bash
npm run dev
```

4. Open:

`http://localhost:3000`

Locale-prefixed pages are available, for example:

- `http://localhost:3000/en`
- `http://localhost:3000/pl`
- `http://localhost:3000/uk`

## Scripts

- `npm run dev` - start local development server
- `npm run build` - production build
- `npm run start` - start production server (after build)
- `npm run lint` - run ESLint
- `npm run build:analyze` - run bundle analysis (`ANALYZE=true`)
- `npm run lh:mobile` - Lighthouse mobile audit for `https://vonco.partners/en`
- `npm run lh:desktop` - Lighthouse desktop audit for `https://vonco.partners/en`
- `npm run lh:compare` - compare default before/after mobile reports in `.lighthouse/`
- `npm run lh:mobile:5` - run 5 mobile Lighthouse audits and save them in `.lighthouse/runs/`
- `npm run lh:mobile:summary` - print table + median summary for files in `.lighthouse/runs/`
- `npm run lh:mobile:5:summary` - run 5 audits and immediately print median summary

## Environment Variables

This project currently reads env in these places:

- `ANALYZE` in `next.config.ts` (optional, enables bundle analyzer)
- chat API route (`app/api/chat/route.ts`) loads `.env` via `dotenv/config`

Recommended `.env.local`:

```dotenv
# Optional: enable bundle analyzer during build
ANALYZE=false

# Required for chat model provider used by `ai` SDK.
# Add the key expected by your selected provider/model.
# Example for Google-based models:
# GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
```

## Project Structure

```text
app/
  [lang]/
    page.tsx
    cars/
    work/
    contacts/
    privacy-policy/
  api/chat/route.ts
  robots.ts
  sitemap.ts
Components/
data/
i18n/
messages/
public/
```

## Internationalization

- i18n routing config: `i18n/routing.ts`
- locale middleware: `proxy.ts`
- translation files: `messages/*.json`

Current configured locales:
`en`, `uk`, `pl`, `be`, `ro`, `ka`, `uz`, `tg`, `kk`, `az`, `hy`

## SEO and Metadata

- Localized metadata is generated in `app/[lang]/layout.tsx`
- Dynamic sitemap is generated in `app/sitemap.ts`
- Robots policy is defined in `app/robots.ts`

## Lighthouse / PageSpeed Workflow

1. Run baseline report:

```bash
npm run lh:mobile
```

2. Save it as "before":

```bash
cp .lighthouse/mobile.report.json .lighthouse/mobile-report.report.json
```

3. After changes/deploy, run one more report and save as "after":

```bash
npx lighthouse "https://vonco.partners/en" \
  --only-categories=performance,seo \
  --chrome-flags="--headless" \
  --output=json --output=html \
  --output-path=".lighthouse/mobile-report-after"
```

4. Compare:

```bash
npm run lh:compare
```

5. For stable results (recommended), run 5 mobile audits and use median:

```bash
npm run lh:mobile:5:summary
```

## Chat API

Endpoint:

- `POST /api/chat`

Expected body:

```json
{
  "message": "Your prompt text"
}
```

Response shape:

```json
{
  "status": "ok",
  "received": {}
}
```

## Current Known Issues

As of March 3, 2026 (local check):

1. `npm run lint` fails with ESLint config/runtime error (`Converting circular structure to JSON`).

## Deployment

Typical production flow:

1. Set environment variables on your hosting platform.
2. Run build: `npm run build`
3. Run server: `npm run start`

For Vercel deployment, standard Next.js deployment flow works once build/lint issues are resolved.
