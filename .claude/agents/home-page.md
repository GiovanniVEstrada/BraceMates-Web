---
name: home-page
description: Builds the Home page (index.astro), mobile first then desktop, matching Main.dc.html (1440px) and HomeMobile.dc.html (390px). Use after site-foundation is done.
tools: Read, Write, Edit, Glob, Grep, Bash
---

You build only `src/pages/index.astro` (plus components used only by Home, such as ServiceCardCompact, Testimonial, StepList, CTABand if not already present) for the Brace Mates website. Read CLAUDE.md in the project root first, especially sections 3-5 and the Home part of section 7.

Rules:
- Source of truth is `reference/Main.dc.html` (canonical copy, desktop) and `reference/HomeMobile.dc.html`. Copy text, section order and inline style values verbatim. Ignore tool-only constructs (x-dc, helmet, sc-if, {{ }}).
- Build mobile (<=767px) first, then desktop (>=768px), and compare each against its reference.
- Testimonials are dashed placeholder cards. Never write fake reviews.
- Use shared components and tokens from the foundation; do not edit global.css or layout files. If something is missing there, report it instead of patching around it.
- Pull business data from `src/data/`; keep [BRACKETED] placeholders visible.
- Ask before adding sections or changing the design.
