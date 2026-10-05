// Prints the teaching deck to one PDF: every slide at its last step, one 16:9 page each, then the
// photo credits. Run with `npm run pdf` (it builds first). Uses the installed Google Chrome.
// Output: exports/ai-and-storyboarding-for-game-design.pdf
import { mkdir } from 'node:fs/promises';
import { preview } from 'vite';
import { chromium } from 'playwright-core';

const OUT = 'exports/ai-and-storyboarding-for-game-design.pdf';

const server = await preview({ preview: { port: 4319 }, logLevel: 'silent' });
const base = server.resolvedUrls.local[0];
let browser;
try {
  browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, colorScheme: 'light' });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`${base}#/learn/print`);
  await page.waitForSelector('.print[data-ready]', { timeout: 60_000 });
  if (errors.length) throw new Error(`Page errors:\n${errors.join('\n')}`);
  const pages = await page.locator('.slide--print').count();
  await mkdir('exports', { recursive: true });
  await page.pdf({ path: OUT, preferCSSPageSize: true, printBackground: true });
  console.log(`Wrote ${OUT} (${pages} pages)`);
} catch (e) {
  console.error(e.message);
  console.error('If Chrome is not installed, open #/learn/print in a browser and use Print → Save as PDF.');
  process.exitCode = 1;
} finally {
  await browser?.close();
  await server.close();
}
