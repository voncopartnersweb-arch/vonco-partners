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

As of March 1, 2026 (local check):

1. `npm run build` fails on a TypeScript mismatch in `data/cars.tsx` (`fuel` union type does not match values such as `Hybrid + LPG`).
2. `npm run lint` fails with ESLint config/runtime error (`Converting circular structure to JSON`).

These should be fixed before production deployment.

## Deployment

Typical production flow:

1. Set environment variables on your hosting platform.
2. Run build: `npm run build`
3. Run server: `npm run start`

For Vercel deployment, standard Next.js deployment flow works once build/lint issues are resolved.
