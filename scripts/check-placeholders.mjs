// Lists remaining [PLACEHOLDER] patterns in src/. Informational: always exits 0.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('../src', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const pattern = /\[[A-Z$]/;
const exts = /\.(astro|ts|tsx|js|mjs|md|mdx|json|css)$/;
const hits = [];

const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (exts.test(name)) {
      readFileSync(full, 'utf8').split(/\r?\n/).forEach((line, i) => {
        if (pattern.test(line)) hits.push(`${relative(process.cwd(), full)}:${i + 1}  ${line.trim()}`);
      });
    }
  }
};

walk(decodeURIComponent(root));
hits.forEach((h) => console.log(h));
console.log(`\n${hits.length} placeholder line(s) remaining in src/.`);
process.exit(0);
