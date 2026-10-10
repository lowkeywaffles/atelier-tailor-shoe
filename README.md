# Atelier Tailor & Shoe Repair: website demo

Demo website for Atelier Tailor & Shoe Repair, 5930 W Park Blvd, Ste 850, Plano, TX 75093 · (972) 818-6767.

- Single static page (`index.html`), English/Spanish (`?lang=es`).
- Wax-seal language switch, shoe-polish-tin light/dark switch, live open/closed status.

## Needed before going live
- [ ] Is Natalie still the owner, and OK to feature her by name? (from a 2019 Hoodline write-up)
- [ ] Photos of the shop, finished gowns, draperies and repaired shoes
- [ ] Full shoe/leather service list (heels, soles, purses, zippers, belts?)
- [ ] Wedding gown booking lead time and typical pricing
- [ ] Logo, if they have one

## Stack
- **Next.js** (static export) + **TypeScript** + **Tailwind CSS v4**
- **Magic UI** (Marquee, MagicCard, BorderBeam), **Motion**, **GSAP**, **Lenis** smooth scroll, **Phosphor** icons
- Strings live in `src/content/strings.json` (English plus each translation); the page is `src/app/page.tsx`

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```
Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/pages.yml`).
