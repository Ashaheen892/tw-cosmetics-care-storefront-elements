import {
  clamp,
  extractImageUrl,
  extractLink,
  getRadioValue,
  normalizeCollection,
  parseTags,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type { DetailMode, DotShape, FaceZone } from './types.js';

const DOT_SHAPES: DotShape[] = ['pulse', 'ring', 'number', 'icon', 'area', 'label'];

/** Split a textarea value into trimmed lines (newline first, then Arabic/Latin commas). */
export function splitList(raw: LocaleValue): string[] {
  const text = localizedString(raw, '');
  if (!text) return [];
  return text
    .split(/\r?\n|،|;|,/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function parseZones(raw: unknown): FaceZone[] {
  return normalizeCollection(raw)
    .map((z, i) => {
      const name = localizedString(z.name as LocaleValue);
      const title = localizedString(z.title as LocaleValue) || name;
      return {
        id: String(z.id ?? z.zone_id ?? '').trim() || `zone-${i + 1}`,
        name,
        x: clamp(toNumber(z.x, 50), 0, 100),
        y: clamp(toNumber(z.y, 50), 0, 100),
        dotSize: clamp(toNumber(z.dot_size, 30), 12, 120),
        dotColor: String(z.dot_color ?? '').trim(),
        icon: String(z.icon ?? '').trim(),
        title,
        desc: localizedString(z.desc as LocaleValue),
        tags: parseTags(z.tags),
        steps: splitList(z.steps as LocaleValue),
        tips: splitList(z.tips as LocaleValue),
        warning: localizedString(z.warning as LocaleValue),
        image: extractImageUrl(z.image),
        link: extractLink(z.link),
      } satisfies FaceZone;
    })
    .filter((z) => z.name || z.title || z.desc);
}

export function resolveDotShape(config: Record<string, unknown>): DotShape {
  const value = getRadioValue(config.bfz_dot_shape, 'pulse') as DotShape;
  return DOT_SHAPES.includes(value) ? value : 'pulse';
}

export function resolveDetailMode(config: Record<string, unknown>): DetailMode {
  return getRadioValue(config.bfz_detail_mode, 'inline') === 'sheet' ? 'sheet' : 'inline';
}

export function resolveAspect(config: Record<string, unknown>, fallback = '3/4'): string {
  const value = getRadioValue(config.bfz_aspect, fallback) || fallback;
  return value.replace('/', ' / ');
}

export function findZoneIndex(zones: FaceZone[], id: string): number {
  return zones.findIndex((z) => z.id === id);
}
