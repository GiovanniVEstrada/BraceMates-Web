import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Keep `site` in sync with `site.url` in src/data/site.ts.
export default defineConfig({
  site: 'https://bracematesdogtraining.com',
  output: 'static',
  // Build /about as about.html and link to /about (no trailing slash). Netlify serves it directly,
  // instead of answering /about with a redirect to /about/ on every internal navigation.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
});
