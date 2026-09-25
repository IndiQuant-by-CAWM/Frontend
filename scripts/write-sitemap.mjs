// Writes dist/client/sitemap.xml from the pages the static build actually
// produced, after `vite build` has prerendered them.
//
// Replaces TanStack Start's built-in sitemap, which listed noindex redirect
// pages (/sign-in, /sign-up, /forgot-password, /tournaments/), listed a
// "/#contribute" fragment as if it were a page, used URLs without the trailing
// slash GitHub Pages redirects to, and declared the sitemap namespace over
// https, which is not the namespace the protocol defines.
//
// A page is listed when it has an index.html and does not ask to be kept out
// of the index. Nothing here needs editing when a route is added.

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = "dist/client";
const HOST = "https://indiquantresearch.in";
const NOINDEX = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i;

function* htmlPages(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* htmlPages(path);
    else if (name === "index.html") yield path;
  }
}

const today = new Date().toISOString().slice(0, 10);
const urls = [];
for (const file of htmlPages(ROOT)) {
  if (NOINDEX.test(readFileSync(file, "utf8"))) continue;
  const dir = relative(ROOT, file).split(sep).slice(0, -1).join("/");
  urls.push(dir ? `${HOST}/${dir}/` : `${HOST}/`);
}
urls.sort((a, b) => a.length - b.length || a.localeCompare(b));

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`),
  "</urlset>",
  "",
].join("\n");

writeFileSync(join(ROOT, "sitemap.xml"), xml);
console.log(`[sitemap] ${urls.length} pages -> ${ROOT}/sitemap.xml`);
