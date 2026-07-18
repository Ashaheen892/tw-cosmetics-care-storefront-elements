import {
  extractImageUrl,
  extractLink,
  getRadioValue,
  getUnitValue,
  normalizeCollection,
  t,
} from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import { REVEAL_MODES, type RevealItem, type RevealMode } from './types.js';

export function resolveMode(config: Record<string, unknown>): RevealMode {
  const val = getRadioValue(config.bcr_mode, 'box') as RevealMode;
  return REVEAL_MODES.includes(val) ? val : 'box';
}

/** Per-item stagger delay (ms), clamped to a sane range. */
export function revealStagger(config: Record<string, unknown>): number {
  const speed = getUnitValue(config.bcr_speed, 140);
  return Math.max(0, Math.min(600, speed));
}

/** Localized card count label after reveal. */
export function cardCountLabel(count: number): string {
  return count === 1
    ? t('بطاقة واحدة', '1 card')
    : t(`${count} بطاقات`, `${count} cards`);
}

/** Parse configurable content cards from the `bcr_items` collection. */
export function parseItems(raw: unknown): RevealItem[] {
  return normalizeCollection(raw)
    .map((row) => ({
      title: localizedString(row.title as LocaleValue),
      subtitle: localizedString(row.subtitle as LocaleValue),
      image: extractImageUrl(row.image),
      tag: localizedString(row.tag as LocaleValue),
      link: extractLink(row.link),
    } satisfies RevealItem))
    .filter((item) => item.title || item.image);
}
