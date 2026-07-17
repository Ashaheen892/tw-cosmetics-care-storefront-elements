import {
  extractImageUrl,
  extractLink,
  getRadioValue,
  normalizeCollection,
  parseTags,
} from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type { FamilyLayout, FragranceFamily } from './types.js';

const LAYOUTS: FamilyLayout[] = ['wheel', 'grid', 'list'];

/** Split a textarea/string value into trimmed items (newline first, then Arabic/Latin commas). */
export function splitList(raw: LocaleValue): string[] {
  const text = localizedString(raw, '');
  if (!text) return [];
  return text
    .split(/\r?\n|،|;|,/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function parseFamilies(raw: unknown): FragranceFamily[] {
  return normalizeCollection(raw)
    .map((f, i) => {
      const name = localizedString(f.name as LocaleValue);
      return {
        id: String(f.family_id ?? '').trim() || `family-${i + 1}`,
        name,
        color: String(f.color ?? '').trim(),
        icon: String(f.icon ?? '').trim(),
        desc: localizedString(f.desc as LocaleValue),
        mood: parseTags(f.mood),
        top: splitList(f.top_notes as LocaleValue),
        heart: splitList(f.heart_notes as LocaleValue),
        base: splitList(f.base_notes as LocaleValue),
        season: localizedString(f.season as LocaleValue),
        occasion: localizedString(f.occasion as LocaleValue),
        image: extractImageUrl(f.image),
        link: extractLink(f.link),
      } satisfies FragranceFamily;
    })
    .filter((f) => f.name || f.desc);
}

export function resolveLayout(config: Record<string, unknown>): FamilyLayout {
  const value = getRadioValue(config.bff_layout, 'grid') as FamilyLayout;
  return LAYOUTS.includes(value) ? value : 'grid';
}

export function findFamilyIndex(families: FragranceFamily[], id: string): number {
  return families.findIndex((f) => f.id === id);
}
