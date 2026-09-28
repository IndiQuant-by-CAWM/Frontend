// The status strip is the one place the site names its current phase. These
// tests keep it that way, and keep the strip accessible and motion-safe.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { STATUS_ITEMS, STATUS_SHORT, STATUS_TEXT } from "./status";
import { ROUND_CLOSES_IST, ROUND_OPENS_IST } from "./schedule";
import { StatusStrip } from "../components/site/StatusStrip";

const SRC = join(import.meta.dirname, "..");
const read = (p: string) => readFileSync(join(SRC, p), "utf8");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return sourceFiles(p);
    return /\.(ts|tsx|css)$/.test(name) && !/\.test\.ts$/.test(name) ? [p] : [];
  });
}

test("the phase is named only in lib/status.ts", () => {
  const offenders = sourceFiles(SRC)
    .filter((p) => relative(SRC, p) !== join("lib", "status.ts"))
    .filter((p) => /testnet|paper capital/i.test(readFileSync(p, "utf8")))
    .map((p) => relative(SRC, p));
  assert.deepEqual(offenders, []);
});

test("the guard above can fail: status.ts itself does name the phase", () => {
  assert.match(read("lib/status.ts"), /Testnet/);
  assert.match(STATUS_ITEMS[0], /^Current phase: testnet/);
});

test("the strip states the current round window from lib/schedule.ts", () => {
  const rounds = STATUS_ITEMS.find((s) => s.startsWith("Core rounds"));
  assert.ok(rounds);
  assert.ok(rounds.includes(ROUND_OPENS_IST) && rounds.includes(ROUND_CLOSES_IST));
  assert.equal(ROUND_OPENS_IST, "19:00 IST");
});

test("status copy keeps to the platform vocabulary", () => {
  for (const s of [...STATUS_ITEMS, STATUS_SHORT, STATUS_TEXT]) {
    assert.doesNotMatch(s, /\b(game|gam(ed|ing)|play\w*|win\w*|bet\w*|stak\w*|guarantee\w*)\b/i, s);
  }
});

test("the strip renders the message once for screen readers and hides the moving copies", () => {
  const html = renderToStaticMarkup(createElement(StatusStrip));
  assert.match(html, /role="note"/);
  assert.match(html, /aria-label="Company status"/);
  assert.doesNotMatch(html, /aria-live/);
  // Exactly one copy outside aria-hidden: the visually hidden paragraph.
  assert.equal(html.split(STATUS_TEXT).length - 1, 1);
  assert.match(html, /<div aria-hidden="true" class="iq-status-viewport/);
  // Two identical halves, so the -50% loop is seamless.
  const halves = html.match(/data-copy="\d"/g) ?? [];
  assert.deepEqual(halves, ['data-copy="0"', 'data-copy="1"']);
  // A pause control (WCAG 2.2.2), not only hover.
  assert.match(html, /<button[^>]*aria-label="Pause the status ticker"/);
  // Speed is set from width, never a JS timer.
  assert.match(html, /animation-duration:\d+(\.\d)?s/);
  assert.doesNotMatch(
    read("components/site/StatusStrip.tsx"),
    /setInterval|setTimeout|requestAnimationFrame/,
  );
});

test("the CSS pauses on hover and focus, and stops for reduced motion", () => {
  const css = read("styles.css");
  assert.match(
    css,
    /\.iq-status:hover \.iq-status-track,\s*\.iq-status:focus-within \.iq-status-track/,
  );
  assert.match(css, /animation-play-state: paused/);
  const reduced = css.slice(css.lastIndexOf("@media (prefers-reduced-motion: reduce)"));
  assert.match(reduced, /\.iq-status-track \{\s*display: none;/);
  assert.match(reduced, /\.iq-status-static \{\s*display: block;/);
});

test("the strip is part of the shared header, so it is on every page with a nav bar", () => {
  assert.match(read("components/site/Navbar.tsx"), /<StatusStrip \/>/);
  assert.match(read("components/site/PageShell.tsx"), /<Navbar \/>/);
  assert.match(read("routes/index.tsx"), /<Navbar \/>/);
});
