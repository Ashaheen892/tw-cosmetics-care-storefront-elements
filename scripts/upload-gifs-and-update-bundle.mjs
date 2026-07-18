/**
 * Upload GIFs to catbox.moe and update twilight-bundle.json image/preview_image.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const GIF_DIR = path.join(ROOT, 'notion-screenshots', 'gifs');
const BUNDLE = path.join(ROOT, 'twilight-bundle.json');
const URLS_OUT = path.join(GIF_DIR, 'urls.json');

async function uploadCatbox(filePath) {
  const buf = fs.readFileSync(filePath);
  const blob = new Blob([buf], { type: 'image/gif' });
  const form = new FormData();
  form.append('reqtype', 'fileupload');
  form.append('fileToUpload', blob, path.basename(filePath));
  const res = await fetch('https://catbox.moe/user/api.php', {
    method: 'POST',
    body: form,
  });
  const text = (await res.text()).trim();
  if (!res.ok || !text.startsWith('https://')) {
    throw new Error(`Upload failed for ${path.basename(filePath)}: ${text}`);
  }
  return text;
}

const files = fs
  .readdirSync(GIF_DIR)
  .filter((f) => f.endsWith('.gif'))
  .sort();

if (!files.length) {
  console.error('No GIFs found in', GIF_DIR);
  process.exit(1);
}

const urls = {};
for (const file of files) {
  const name = file.replace(/\.gif$/, '');
  process.stdout.write(`upload ${name}... `);
  const url = await uploadCatbox(path.join(GIF_DIR, file));
  urls[name] = url;
  console.log(url);
}

fs.writeFileSync(URLS_OUT, JSON.stringify(urls, null, 2));

const bundle = JSON.parse(fs.readFileSync(BUNDLE, 'utf8'));
let updated = 0;
for (const comp of bundle.components || []) {
  if (urls[comp.name]) {
    comp.image = urls[comp.name];
    comp.preview_image = urls[comp.name];
    updated++;
  }
}
fs.writeFileSync(BUNDLE, JSON.stringify(bundle, null, 4) + '\n');
console.log(`Updated ${updated} components in twilight-bundle.json`);
console.log('URLs saved to', URLS_OUT);
