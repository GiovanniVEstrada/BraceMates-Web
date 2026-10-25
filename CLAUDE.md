# Brace Mates Dog Training — Website Build Brief

**For:** Claude Code (or any developer) working in VS Code
**Goal:** Turn the approved mockup into a fast, accessible production website and deploy it.
**Owner:** Gio (building the site for the business). Trainer: Lance Beson-Montoya.

> **Start here (paste into Claude Code):**
> "Read `HANDOFF.md` and every file in `reference/`. Then build the site in the order given in section 15. Copy all text verbatim from the reference files. Don't invent prices, credentials, testimonials or contact details. Ask me before adding sections or changing the design."

---

## 0. What's in this folder

| File | What it is |
|---|---|
| `HANDOFF.md` | This brief: stack, design system, page specs, deploy steps |
| `reference/Main.dc.html` | **Home, desktop (1440px)**, approved mockup |
| `reference/HomeMobile.dc.html` | **Home, mobile (390px)** |
| `reference/About.dc.html` | About, mobile |
| `reference/Services.dc.html` | Services, mobile |
| `reference/Gallery.dc.html` | Gallery, mobile |
| `reference/FAQ.dc.html` | FAQ, mobile |
| `reference/Contact.dc.html` | Contact, mobile |

**How to read the reference files.** They were exported from a design-canvas tool. Treat them as reference markup, not production code:

- **Source of truth:** all copy, section order, inline `style="…"` values (colors, sizes, spacing, radii) and the inline SVG icons.
- **Ignore these tool-only constructs:** `<x-dc>`, `<helmet>`, `<sc-if>`, `{{ … }}` template holes, `<script type="text/x-dc">`, `data-props`, `support.js`, and `.dc.html` link targets. Map links to real routes (`Main.dc.html`/`HomeMobile.dc.html` → `/`, `About.dc.html` → `/about`, and so on).
- **Interactivity in the mockup:** the mobile menu toggle and the FAQ accordion. Rebuild these as described below. The mockup's contact form and its "sent" state are **not** built (see section 8).
- Only Home has a desktop mockup. **Design the desktop layouts of the inner pages** by extending Home's desktop patterns (section 7).
- Home copy: use `Main.dc.html` as canonical. The mobile mockup trims the hero eyebrow and subtitle slightly. Using the shorter mobile strings under 640px is optional.

---

## 1. Stack

- **Astro** (latest), static output, TypeScript. A brochure site gets the best SEO and speed from plain HTML, and Astro gives shared layouts and components without shipping a JS framework.
- **Plain CSS** with custom properties (`src/styles/global.css`) plus component-scoped `<style>`. No Tailwind needed.
- **Minimal JS:** only the mobile menu toggle (a small inline script). The FAQ uses native `<details>`/`<summary>`.
- **Hosting:** Netlify (free tier). There is no contact form and no backend; visitors reach Lance by phone, email or his links page.
- Node 20+.

> If the owner prefers React + Vite instead, everything below still applies. Keep the output static or prerendered for SEO.

---

## 2. Project structure

```
src/
  data/
    site.ts          # business info + every [PLACEHOLDER] in one place
    services.ts      # 4 services (name, tag, description, included[], price, priceNote)
    faq.ts           # grouped Q&As
  styles/global.css  # tokens, reset, base type, focus styles
  layouts/BaseLayout.astro   # <head>, fonts, skip link, Header, Footer, StickyCTA
  components/
    Header.astro  Footer.astro  StickyCTA.astro
    Wordmark.astro  Button.astro  Eyebrow.astro  Icon.astro
    PhotoPlaceholder.astro  ServiceCard.astro  ServiceCardCompact.astro
    Testimonial.astro  StepList.astro  CTABand.astro
  pages/
    index.astro  about.astro  services.astro  gallery.astro
    faq.astro  contact.astro  404.astro
  assets/images/     # real photos go here (optimized by astro:assets)
public/
  favicon.svg  robots.txt  og-image.jpg
scripts/
  check-placeholders.mjs
```

---

## 3. Design tokens

Put these in `:root` in `global.css`. **Use the tokens, never raw hex values, in components.**

### Core palette (from the owner)

| Token | Hex | Name | Role |
|---|---|---|---|
| `--espresso` | `#211D18` | Dark Espresso | Footer bg, darkest text, text on copper buttons, `<body>` bg |
| `--walnut` | `#3C3327` | Walnut | Header bg, all headings, CTA band bg |
| `--leather` | `#65523A` | Leather | Eyebrow labels, step numbers, quote marks, dashed placeholder borders |
| `--od-green` | `#596044` | OD Green | Links, outline buttons, icons, Home service cards, service tags, FAQ toggles |
| `--copper` | `#B56D43` | Burnt Copper | **Primary CTA buttons only**, plus the focus ring |
| `--linen` | `#EFE3D0` | Warm Linen | Page background |

### Derived tokens

| Token | Value | Use |
|---|---|---|
| `--linen-light` | `#F7F0E6` | Cards, text on dark backgrounds |
| `--linen-dark` | `#E0D6C2` | Alternating section bands ("How it works", philosophy, CTAs on light) |
| `--text` | `#463C30` | Body text |
| `--text-muted` | `#635545` | Secondary text (captions, labels) |
| `--on-dark-muted` | `#CDBFA8` | Secondary text on walnut/espresso |
| `--input-bg` | `#FFFBF4` | Form fields |
| `--placeholder` | `#6B5D4C` | Input placeholder text |
| `--border` | `rgba(60, 51, 39, 0.15)` | Hairlines on light (0.18 for section dividers, 0.35 for inputs) |
| `--border-on-dark` | `rgba(205, 191, 168, 0.2)` | Hairlines on dark (0.45–0.6 for outlined pills) |
| `--hero-overlay` | `rgba(33, 29, 24, 0.6)` | Over the hero photo; tune 0.45–0.7 once the real photo is in |

Photo placeholder tones (until real photos exist): `#B3B297`, `#C2B39B`, `#DCCDB3`, `#CF9F80`; hero base `#4A3F31`. Each uses a subtle 135° white hatch, as in the reference files.

### Contrast rules (don't break these)

- **Copper buttons get espresso text at ≥19px, weight 700.** Copper is a mid-tone. Espresso on copper is about 4.2:1, which passes WCAG AA only as large/bold text. **Never put light text on copper**, and never use copper for body-size text.
- Light text on OD green (`--linen-light`) is about 5.8:1. That's fine at any size.
- Leather and OD green text on linen pass AA (about 5.9:1 and 5.2:1).
- Step numbers on the `--linen-dark` band use leather, not copper (copper fails there).
- Focus ring: `outline: 3px solid var(--copper); outline-offset: 3px` on `:focus-visible`.

---

## 4. Typography

- **Display:** Bricolage Grotesque, weights 700–800, letter-spacing −0.02em to −0.025em, `text-wrap: balance` on headings.
- **Body:** Figtree, weights 400–700, line-height 1.6.
- Self-host with Fontsource variable packages (`@fontsource-variable/bricolage-grotesque`, `@fontsource-variable/figtree`). If one isn't available, use the Google Fonts `<link>` from the reference files.
- Fallback stacks: `'Bricolage Grotesque', 'Avenir Next', 'Segoe UI', sans-serif` and `'Figtree', 'Helvetica Neue', Arial, sans-serif`.

| Element | Desktop | Mobile |
|---|---|---|
| H1 (hero) | `clamp(44px, 6vw, 78px)`, 800, lh 1.02 | 42px |
| H1 (inner pages) | ~56px | 40px, 800 |
| H2 | `clamp(32px, 3.4vw, 46px)`, 700, lh 1.1 | 30px |
| H3 | 24–26px, 700 | 21–22px |
| Body | 18px | 17px (16px inside cards) |
| Eyebrow | 13px, 700, uppercase, tracking 0.2em, `--leather` | 12px, tracking 0.18em |

**Wordmark (until the real logo arrives):** "Brace Mates" in Bricolage 800 (28px desktop / 23px mobile, tracking −0.02em). Below it, "DOG TRAINING" at 10–11px, 700, uppercase, tracking 0.26em, in `--on-dark-muted`. Build it as a component so the logo can replace it in one place.

---

## 5. Layout and components

- Container `max-width: 1176px` (header 1240px). Side padding `clamp(20px, 4vw, 32px)`.
- Section padding: 96–112px desktop, 56–64px mobile.
- Grids use `repeat(auto-fit, minmax(min(<n>px, 100%), 1fr))` so they collapse cleanly. No horizontal scroll at 320px.
- Radii: cards 18–20px, small cards 14px, inputs 12px, buttons and pills 999px.
- **Primary button:** copper pill, espresso text 19px/700, min-height 56px, 16px × 28px padding, trailing arrow icon.
- **Secondary button:** transparent, 1.5px `--od-green` border and text, min-height 46–52px.
- On dark sections (hero, walnut CTA bands) the primary button stays copper.
- Touch targets ≥44px everywhere.
- **Icons:** Lucide-style stroke icons, 2px stroke, `currentColor`: phone, menu, x, check, arrow-right, camera, mail, map-pin, plus, minus. Use `lucide-astro` or inline the SVGs from the reference files.
- **Breakpoints:** mobile layout ≤ 767px (match the 390px mockups), desktop ≥ 768px (match `Main.dc.html` at 1440px).
- Respect `prefers-reduced-motion` (no smooth-scroll or transitions when set).

---

## 6. Global elements

**Header** (`--walnut` bg)
- **Desktop:** wordmark left; nav (Home, About, Services, Gallery, FAQ, Contact) with the current page as a translucent pill (`aria-current="page"`); right side has an outlined "Call [PHONE]" `tel:` pill with a phone icon.
- **Mobile:** wordmark, a 44px phone icon button (`tel:`, `aria-label="Call [PHONE]"`) and a 44px menu button (`aria-expanded`, `aria-controls`). The menu opens a panel below the header bar with large nav links (48px rows) and a full-width "Call [PHONE]" outline pill. Close it on Escape and on link click.

**Footer** (`--espresso` bg): wordmark plus the one-liner "In-home dog training in [CITY / AREA]. Practical help for you and your dog, together." Then columns:
- **Contact:** phone, email, "Serving [CITY / AREA] and nearby"
- **Explore:** page links
- **Follow along:** Instagram / Facebook / Google reviews outline pills, with URLs from `site.ts`
- **Bottom row:** © current year, Brace Mates Dog Training

**Sticky mobile CTA:** a fixed bar at the bottom below 768px. Translucent linen background, top hairline, soft upward shadow, and a full-width copper "Book a free call" button with a phone icon linking to `/contact`. On `/contact` it becomes a plain `tel:` "Call" link instead. Add `padding-bottom` to `<body>` so it never covers the footer, and include `env(safe-area-inset-bottom)`. Hide it on desktop.

---

## 7. Pages

Section order and copy come from the reference files. Desktop notes for inner pages are guidance; keep them consistent with Home desktop.

**Home** (`/`). References: `Main.dc.html` and `HomeMobile.dc.html`.
1. **Hero:** full-width photo with `--hero-overlay`, min-height 680px desktop / 600px mobile, content left-aligned.
   - Eyebrow, then the H1 "In-home dog training in [CITY / AREA]", then the subtitle.
   - Primary CTA "Book a free consultation" → `/contact`, plus the link "or call [PHONE]".
2. **Problems:** eyebrow "Sound familiar?", H2, two paragraphs. Two columns on desktop.
3. **Services preview:** four compact OD-green cards with linen-light text.
   - Each card: tag pill, name, one-liner, "Starting at [$___]", "Details" → `/services`.
   - Header row has the "See all services" outline button.
4. **How it works** (`--linen-dark` band): three numbered steps with leather numerals and a 2px walnut top rule, then the primary CTA.
5. **Testimonials:** three **placeholder** cards (dashed leather border, "Placeholder" badge, bracketed instructions instead of quotes). Three columns on desktop; horizontal scroll-snap on mobile. **Do not write fake reviews.** Real quotes come from the owner, with client permission.
6. **Final CTA** (`--walnut` band): centered H2, paragraph, primary CTA, "or call" link.

**About** (`/about`). Reference: `About.dc.html`.
- Sections: intro ("Hi, I'm Lance.") → portrait photo (4:5) → "How I got here" story → "How I train" (four principles on a `--linen-dark` band) → "Training & credentials" (four checklist tiles) → CTA band.
- Desktop: photo left (~45%) and intro + story right; principles in a 2×2 grid.

**Services** (`/services`). Reference: `Services.dc.html`.
- Intro, then four full cards. Each card has:
  - a tag pill
  - name and description
  - a "What's included" checklist with OD-green checks
  - a price block ("Starting at" / [$___] / bracketed note)
  - an "Ask about this" outline button → `/contact`
- Then the "Not sure which one fits?" band.
- Desktop: two-column card grid.

**Gallery** (`/gallery`). Reference: `Gallery.dc.html`.
- Intro, then a 12-tile grid with `grid-auto-flow: dense` and the spans shown in the reference (one large 2×2, two tall, two wide). Then the CTA band.
- Desktop: four columns with `grid-auto-rows: 220px`.
- Use `astro:assets` `<Image>` with `loading="lazy"` and real alt text. Until photos exist, render `PhotoPlaceholder` with the tile labels from the reference.

**FAQ** (`/faq`). Reference: `FAQ.dc.html`.
- Intro, then four groups: Training methods, Session length, What to expect, Ages & breeds. Nine Q&As as `<details>`/`<summary>`.
- The first item in each group is open by default. The +/− indicator sits in an OD-green circle.
- Then the "Still have a question?" band with Call (primary) and Email (outline) buttons.
- Desktop: single column, `max-width: 760px`.
- Also emit `FAQPage` JSON-LD from `faq.ts`.

**Contact** (`/contact`). Reference: `Contact.dc.html`.
- Sections: intro → three contact tiles (Call or text, Email, Service area) → "Service area" section → "Follow along" link pills (from `site.socials`, including the links page).
- Desktop: two columns, intro and tiles left, service area and links right.
- **No form.** The mockup's form card, "Send message" button, "Prefer to talk?" line and the `/thanks` success page are intentionally not built (owner decision).

**404:** a short friendly message plus links to Home and Contact, in the same style.

---

## 8. Contact method (no form)

The site has no contact form, no Netlify Forms and no `/thanks` page. Visitors contact Lance directly through `tel:` and `mailto:` links and his links page (`site.socials`). Do not add a form or any message-sending feature without asking the owner.

---

## 9. Images

- **Target files** (owner supplies later):
  - `hero.jpg`: landscape, about 2400×1350, subject right of center with open space on the left for text. Also needs a portrait-friendly crop for mobile; use `object-position`.
  - `about.jpg`: portrait 4:5, Lance with a dog in natural light.
  - `gallery-01.jpg` … `gallery-12.jpg`
- Store them in `src/assets/images/` so `astro:assets` outputs responsive WebP/AVIF.
- Build `PhotoPlaceholder.astro` to match the mockup (tone + hatch + camera icon + label). Make it easy to swap for `<Image>` per slot.
- Write descriptive alt text when the real photos arrive. Placeholders get `role="img"` and an `aria-label`.

---

## 10. SEO and local-business basics

- Unique `<title>` and meta description per page. Pattern: "In-home Dog Training in [CITY / AREA] | Brace Mates Dog Training". Draft the descriptions from page copy.
- Open Graph and Twitter tags. `og-image.jpg` is 1200×630; use the hero photo plus the wordmark when available.
- JSON-LD `LocalBusiness` on every page, built from `site.ts`: name, url, telephone, email, areaServed, sameAs (socials). Don't output fields that are still placeholders.
- `@astrojs/sitemap`, `robots.txt`, canonical URLs, `<html lang="en">`.
- Skip-to-content link and semantic landmarks (`header`, `nav`, `main`, `footer`).
- `favicon.svg`: a simple "BM" monogram in copper on espresso until the real logo exists.

---

## 11. Accessibility checklist

- [ ] Contrast follows section 3; check every text/background pair.
- [ ] `:focus-visible` copper ring on all interactive elements.
- [ ] Menu button has `aria-expanded`/`aria-controls`; Escape closes the menu.
- [ ] FAQ works by keyboard (native `<details>`).
- [ ] Icon-only buttons have `aria-label`; decorative SVGs have `aria-hidden="true"`.
- [ ] Touch targets ≥44px; no horizontal scroll at 320px.
- [ ] `prefers-reduced-motion` respected.

---

## 12. Placeholders: keep, centralize, never invent

Every `[BRACKETED]` value in the reference files is something the owner still has to confirm. **Keep the brackets visible** until filled, and pull them from `src/data/site.ts`, `services.ts` and `faq.ts` so they're edited in one place:

- **Contact:**
  - `[CITY / AREA]`
  - `[PHONE]`
  - `[EMAIL]`
  - service-area towns `[Town]` ×3
  - travel fee note
- **Pricing:**
  - "Starting at" prices ×4
  - session counts `[3]` / `[4]` / `[6]`
  - price notes
- **Offer details:**
  - free call length `[20 minutes]`
  - evaluation `[free / $___]`
  - `[text support between sessions]`
  - session lengths `[60 minutes]` / `[45 minutes]`
  - manners estimate `[3–4 sessions]`
  - reply time `[1 business day]`
- **Ages:**
  - puppy range `[8–20 weeks]`
  - minimum age `[8 weeks]`
  - breed exceptions note
- **Anxiety & Confidence service:**
  - `[Video check-ins…]`
  - `[Referral to a vet behaviorist…]`
- **About:**
  - bracketed story details
  - certifications ×4 (name, organization, year)
  - insurance provider
  - training-method confirmation (also in the FAQ)
- **Testimonials:** three real client quotes with names, dogs' names and neighborhoods, used with permission
- **Social:** Instagram, Facebook and Google reviews URLs

Add `scripts/check-placeholders.mjs` and `npm run check:placeholders`. It scans `src/` for `[` + uppercase/`$` patterns and lists any that remain. Run it before launch.

---

## 13. Deploy (Netlify)

1. `git init`, commit, push to a new GitHub repo.
2. Netlify → **Add new site → Import from Git** → pick the repo. Build command `npm run build`, publish directory `dist`.
3. After the first deploy, click through every page and every `tel:`, `mailto:` and social link.
4. **Domain:** buy one (e.g. bracematesdogtraining.com, availability unchecked), add it under **Domain management**, point DNS to Netlify. HTTPS is automatic.
5. Submit `sitemap-index.xml` in Google Search Console. A Google Business Profile matters a lot for a local service business; link it from the footer once it exists.

---

## 14. Acceptance checklist

- [ ] Home matches `Main.dc.html` at 1440px and `HomeMobile.dc.html` at 390px. Inner pages match their mockups at 390px.
- [ ] Desktop inner pages are consistent with Home desktop.
- [ ] All copy is verbatim from the reference files; no invented facts, prices, credentials or reviews.
- [ ] All nav, footer, `tel:` and `mailto:` links work.
- [ ] The sticky CTA shows only on mobile and never hides content.
- [ ] Lighthouse ≥ 95 for Performance, Accessibility, Best Practices and SEO (mobile).
- [ ] `npm run check:placeholders` is clean, or the owner has approved what remains, before going public.

---

## 15. Build order

Commit after each step.

1. Scaffold Astro (minimal template, TypeScript strict), add the sitemap integration and fonts.
2. `global.css`: tokens, reset, base typography, focus styles, utility container.
3. Data files: `site.ts`, `services.ts`, `faq.ts`, with all placeholders.
4. `BaseLayout`, `Header` (with mobile menu), `Footer`, `StickyCTA`, `Wordmark`, `Button`, `Icon`, `PhotoPlaceholder`.
5. Home: mobile first, then desktop. Compare against both references.
6. About, Services, Gallery, FAQ, Contact (mobile per reference, desktop per section 7).
7. `404` (no form or `/thanks`; see section 8).
8. SEO: meta, Open Graph, JSON-LD, sitemap, robots, favicon.
9. QA pass: section 11, then section 14. Then deploy (section 13).

**Ask the owner before:** adding sections or pages, changing colors or fonts, or writing any copy that isn't in the reference files.
