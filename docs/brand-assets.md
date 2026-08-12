# Vonco Partners — web asset register

Source: [Brandbook Vonco Partners on Google Drive](https://drive.google.com/drive/folders/11CZkb5QNKZJkYLncRhQLucPPmjb8xAc_)

The Drive folder is the canonical archive for print-ready AI/PDF files and original high-resolution artwork. The repository contains only files that are useful for the website: local fonts, compact SVG icons and optimized WebP derivatives.

## Fonts

- `public/brand/source/Onest-VariableFont_wght.ttf` — official variable body font, weights 100–900.
- `public/brand/source/Oswald-Bold.ttf` — official display font, weight 700.
- `public/brand/source/Onest-OFL.txt` — Onest license shipped with the source package.

The fonts are loaded with `next/font/local` in `app/[lang]/layout.tsx`. Next.js preloads and serves them from the application build. The TTF files are preserved because they are the supplied official sources; a future brand package may replace them with approved WOFF2 exports.

## Optimized brand artwork

| File | Original | Intended use |
| --- | --- | --- |
| `vonco-assistant.webp` | `персонаж.png` | General assistance and onboarding |
| `vonco-fleet-character.webp` | `Персонаж 2.png` | Fleet, rental and vehicle pages |
| `vonco-contact-character.webp` | `Персонаж 3.png` | Contact and community sections |
| `vonco-official-pattern.webp` | `Паттерн 3.png` | Dark branded panels and CTA backgrounds |
| `vonco-loop-purple.webp` | `Элемент 3.png` | Optional decorative campaign artwork |
| `vonco-loop-yellow.webp` | `Элемент 4.png` | Optional decorative campaign artwork |

The original PNG files are 0.9–4.2 MB each and must not be copied into a page or the service-worker precache. The WebP derivatives are resized and compressed for web delivery.

## SVG icons

`public/brand/icons/icon-01.svg` through `icon-08.svg` are untouched official vector assets. Their source names do not describe their meaning, so they should only replace functional UI icons after a semantic mapping has been approved. Decorative use should have empty alternative text.

## Logo files

The Drive archive includes six official SVG variants, but each raw export is about 424 KB and contains editor data. The current `vonco-logo-light.png`, `vonco-logo-dark.png`, `vonco-mark.svg` and `vonco-mark-yellow.svg` are already optimized for the website. Do not deploy the raw SVG exports without cleaning and validating them first.

## Rules

1. Keep AI and print PDF files in Drive; do not add them to `public/`.
2. Use `next/image` with explicit `sizes`; do not preload mascot or pattern images.
3. Do not add optional artwork to the service-worker static asset list. Let the runtime cache store it after first use.
4. Re-export new raster artwork as WebP or AVIF before publishing.
5. Preserve light/dark contrast and keep the yellow accent for actions, not paragraph text.
