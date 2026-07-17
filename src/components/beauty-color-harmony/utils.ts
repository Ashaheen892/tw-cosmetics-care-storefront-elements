import { isTruthy, normalizeCollection } from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type { HarmonyColor, HarmonyType, Hsl, ZoneMap } from './types.js';

const FALLBACK_HEX = '#cccccc';

/** Parse merchant color rows into HarmonyColor objects (id, name, hex). */
export function parseColors(raw: unknown): HarmonyColor[] {
  return normalizeCollection(raw)
    .map((row, i) => {
      const name = localizedString(row.name as LocaleValue);
      const hex = normalizeHex(String(row.hex ?? '').trim());
      return {
        id: String(row.color_id ?? '').trim() || `color-${i + 1}`,
        name,
        hex,
      } satisfies HarmonyColor;
    })
    .filter((color) => color.name || color.hex);
}

/** Normalize a user hex string to a 6-digit `#rrggbb`, else fallback. */
export function normalizeHex(input: string): string {
  const value = String(input || '').trim();
  const match = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.exec(value);
  if (!match) return FALLBACK_HEX;
  let hex = match[1].toLowerCase();
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((ch) => ch + ch)
      .join('');
  }
  return `#${hex}`;
}

/** Convert a hex color to HSL. Handles 3/6-digit hex; invalid → fallback grey. */
export function hexToHsl(hex: string): Hsl {
  const normalized = normalizeHex(hex);
  const r = parseInt(normalized.slice(1, 3), 16) / 255;
  const g = parseInt(normalized.slice(3, 5), 16) / 255;
  const b = parseInt(normalized.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/** Convert an HSL value back to a 6-digit hex string. */
export function hslToHex(hsl: Hsl): string {
  const h = ((hsl.h % 360) + 360) % 360;
  const s = clamp01(hsl.s / 100);
  const l = clamp01(hsl.l / 100);

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toByte = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${toByte(r)}${toByte(g)}${toByte(b)}`;
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/** Rotate the hue of an HSL color by `deg`, wrapping to 0..360. */
export function rotateHue(hsl: Hsl, deg: number): Hsl {
  return { ...hsl, h: (((hsl.h + deg) % 360) + 360) % 360 };
}

/** Build an ordered harmony palette (hex strings) from a base hex + type. */
export function buildHarmony(baseHex: string, type: HarmonyType): string[] {
  const base = hexToHsl(baseHex);
  switch (type) {
    case 'complementary':
      return [hslToHex(base), hslToHex(rotateHue(base, 180))];
    case 'analogous':
      return [
        hslToHex(rotateHue(base, -30)),
        hslToHex(base),
        hslToHex(rotateHue(base, 30)),
      ];
    case 'triadic':
      return [
        hslToHex(base),
        hslToHex(rotateHue(base, 120)),
        hslToHex(rotateHue(base, 240)),
      ];
    default:
      return [hslToHex(base)];
  }
}

/** Map a harmony palette to makeup zones deterministically. */
export function mapToZones(harmony: string[], baseHex: string): ZoneMap {
  const base = hexToHsl(baseHex);
  const lips = harmony[0] || hslToHex(base);
  const eyes = harmony[1] || harmony[0] || hslToHex(base);
  const cheeks =
    harmony[2] ||
    hslToHex({
      h: base.h,
      s: Math.round(base.s * 0.55),
      l: Math.min(92, Math.round(base.l + (100 - base.l) * 0.4)),
    });
  return { lips, eyes, cheeks };
}

/** Enabled harmony types in a fixed order, honoring bch_show_* booleans. */
export function enabledHarmonies(config: Record<string, unknown>): HarmonyType[] {
  const out: HarmonyType[] = [];
  if (isTruthy(config.bch_show_complementary, true)) out.push('complementary');
  if (isTruthy(config.bch_show_analogous, true)) out.push('analogous');
  if (isTruthy(config.bch_show_triadic, true)) out.push('triadic');
  return out;
}
