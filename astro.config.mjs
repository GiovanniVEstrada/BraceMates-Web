import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Keep `site` in sync with `site.url` in src/data/site.ts.
export default defineConfig({
  site: 'https://bracematesdogtraining.com',
  output: 'static',
  integrations: [sitemap()],
});
