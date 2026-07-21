#!/usr/bin/env node
/**
 * Clears Chrome/Chromium HTTP disk caches before Vite (macOS).
 * Does NOT wipe Local Storage / cookies — those break the Salla demo editor.
 */
import fs from 'fs';
import os from 'os';
import path from 'path';

const home = os.homedir();
const targets = [
  'Library/Caches/Google/Chrome/Default/Cache',
  'Library/Caches/Google/Chrome/Default/Code Cache',
  'Library/Caches/Google/Chrome/Default/GPUCache',
  'Library/Caches/Google/Chrome/Default/Media Cache',
  'Library/Caches/Chromium/Default/Cache',
  'Library/Caches/Chromium/Default/Code Cache',
];

let cleared = 0;
for (const rel of targets) {
  const full = path.join(home, rel);
  if (!fs.existsSync(full)) continue;
  try {
    fs.rmSync(full, { recursive: true, force: true });
    cleared += 1;
    console.log(`[cache] cleared ${rel}`);
  } catch (err) {
    console.warn(`[cache] skip ${rel}: ${err?.message || err}`);
  }
}
console.log(cleared ? `[cache] done (${cleared} folders)` : '[cache] no Chrome cache folders found');
