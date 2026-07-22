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
  const raw = config?.bcr_mode;
  let val = getRadioValue(raw, 'box').toLowerCase().trim();

  // Extra pass: if config still holds the full dropdown field, map UUID → value.
  if (!REVEAL_MODES.includes(val as RevealMode) && raw && typeof raw === 'object') {
    const obj = raw as Record<string, unknown>;
    const options = Array.isArray(obj.options) ? obj.options : [];
    const selected = Array.isArray(obj.selected) ? obj.selected[0] : null;
    const sel =
      selected && typeof selected === 'object'
        ? (selected as Record<string, unknown>)
        : null;
    const needle = String(sel?.value ?? sel?.key ?? val).trim();
    for (const opt of options) {
      if (!opt || typeof opt !== 'object') continue;
      const row = opt as Record<string, unknown>;
      const optVal = String(row.value ?? '').trim();
      const optKey = String(row.key ?? '').trim();
      if (needle && (needle === optVal || needle === optKey) && optVal) {
        val = optVal.toLowerCase();
        break;
      }
    }
  }

  return REVEAL_MODES.includes(val as RevealMode) ? (val as RevealMode) : 'box';
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
