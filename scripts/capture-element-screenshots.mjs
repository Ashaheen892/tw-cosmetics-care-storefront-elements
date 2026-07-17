import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DEMO_URL = 'http://127.0.0.1:5173/node_modules/.salla-temp/index.html';
const OUT_DIR = path.resolve('notion-screenshots');

const COMPONENTS = [
  { name: 'abaya-length-calculator', pageId: '39fb8c46-c8df-8134-92eb-d749a4e68381' },
  { name: 'abaya-care-assistant', pageId: '39fb8c46-c8df-81f8-a528-dc06fc89f7a9' },
  { name: 'abaya-fabric-lab', pageId: '39fb8c46-c8df-81a9-9ac7-c1698cceee57' },
  { name: 'abaya-style-duel', pageId: '39fb8c46-c8df-8153-a84b-c9d4f8fe4c96' },
  { name: 'abaya-style-swipe', pageId: '39fb8c46-c8df-8199-be17-d51bbd429117' },
  { name: 'collection-reveal', pageId: '39fb8c46-c8df-81e5-82ca-f9a13125a3eb' },
  { name: 'virtual-abaya-boutique', pageId: '39fb8c46-c8df-81b4-9f8f-e44bcf7cc6e9' },
  { name: 'abaya-comparison-arena', pageId: '39fb8c46-c8df-81eb-8fc4-c005207c9c62' },
  { name: 'abaya-look-builder', pageId: '39fb8c46-c8df-810a-8394-d8df50b40087' },
  { name: 'abaya-configurator', pageId: '39fb8c46-c8df-814a-adb6-d02f39090940' },
  { name: 'echo-salon', pageId: '39fb8c46-c8df-81ee-9d28-f4f3a424624a' },
  { name: 'silhouette-fit-ritual', pageId: '39fb8c46-c8df-81ec-a666-c8748fe8be40' },
  { name: 'inquiry-parlour', pageId: '39fb8c46-c8df-814e-8a26-d4f008a0b92d' },
  { name: 'abaya-motion-mirror', pageId: '39fb8c46-c8df-81e6-86b7-e7f15bddc99e' },
  { name: 'abaya-light-studio', pageId: '39fb8c46-c8df-8196-8c5f-c600c063c2bc' },
  { name: 'abaya-embroidery-map', pageId: '39fb8c46-c8df-81f8-a84e-cfa0cf1b1a23' },
];

fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1600, height: 1400 },
  deviceScaleFactor: 2,
});

await page.goto(DEMO_URL, { waitUntil: 'networkidle', timeout: 120000 });
await page.waitForSelector('.component-card[data-component]', { timeout: 60000 });
await page.waitForTimeout(6000);

const results = [];

for (const comp of COMPONENTS) {
  const outPath = path.join(OUT_DIR, `${comp.name}.png`);
  const card = page.locator(`.component-card[data-component="${comp.name}"]`).first();
  await card.waitFor({ state: 'visible', timeout: 30000 });
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  // Screenshot the rendered custom element inside the card
  const target = await card.evaluateHandle((el, name) => {
    const custom = [...el.querySelectorAll('*')].find((n) =>
      n.tagName.toLowerCase().startsWith(`salla-${name}`)
    );
    return custom || el;
  }, comp.name);

  const element = target.asElement();
  if (!element) {
    results.push({ ...comp, ok: false, error: 'no element' });
    continue;
  }

  await element.screenshot({
    path: outPath,
    type: 'png',
    animations: 'disabled',
  });

  const size = fs.statSync(outPath).size;
  const hash = crypto.createHash('md5').update(fs.readFileSync(outPath)).digest('hex');
  results.push({ ...comp, outPath, size, hash, ok: size > 5000 });
  console.log(`${comp.name}: ${size}b hash=${hash.slice(0, 8)}`);
}

const unique = new Set(results.filter((r) => r.ok).map((r) => r.hash)).size;
console.log(`DONE unique=${unique}/${results.filter((r) => r.ok).length}`);
fs.writeFileSync(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(results, null, 2));
await browser.close();
