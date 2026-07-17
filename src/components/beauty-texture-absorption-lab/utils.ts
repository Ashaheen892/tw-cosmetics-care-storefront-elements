import {
  clamp,
  extractImageUrl,
  getRadioValue,
  normalizeCollection,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type { IndicatorRow, IndicatorType, SampleShape, Texture } from './types.js';

const SAMPLE_SHAPES: SampleShape[] = ['drops', 'circles', 'swatches', 'slides', 'blobs', 'bubbles'];
const INDICATOR_TYPES: IndicatorType[] = ['bars', 'dots', 'circles', 'semicircle'];

const lvl = (v: unknown) => clamp(toNumber(v, 0), 0, 5);

export function parseTextures(raw: unknown): Texture[] {
  return normalizeCollection(raw)
    .map((tx, i) => ({
      id: String(tx.tex_id ?? '').trim() || `texture-${i + 1}`,
      name: localizedString(tx.name as LocaleValue) || `${i + 1}`,
      icon: String(tx.icon ?? '').trim(),
      image: extractImageUrl(tx.image),
      color: String(tx.color ?? '').trim() || '#c9a24b',
      desc: localizedString(tx.desc as LocaleValue),
      lightness: lvl(tx.lightness),
      thickness: lvl(tx.thickness),
      absorption: lvl(tx.absorption),
      hydration: lvl(tx.hydration),
      gloss: lvl(tx.gloss),
      greasiness: lvl(tx.greasiness),
      finish: localizedString(tx.finish as LocaleValue),
      spread: localizedString(tx.spread as LocaleValue),
      amount: localizedString(tx.amount as LocaleValue),
      timing: localizedString(tx.timing as LocaleValue),
      usage: localizedString(tx.usage as LocaleValue),
      tips: localizedString(tx.tips as LocaleValue),
      note: localizedString(tx.note as LocaleValue),
    }))
    .filter((tx) => tx.name || tx.desc);
}

export function indicatorRows(tx: Texture, locale: 'ar' | 'en'): IndicatorRow[] {
  const defs: Array<[string, [string, string], number]> = [
    ['lightness', ['الخفة', 'Lightness'], tx.lightness],
    ['thickness', ['السماكة', 'Thickness'], tx.thickness],
    ['absorption', ['سرعة الامتصاص', 'Absorption'], tx.absorption],
    ['hydration', ['الترطيب', 'Hydration'], tx.hydration],
    ['gloss', ['اللمعان', 'Gloss'], tx.gloss],
    ['greasiness', ['الإحساس الدهني', 'Greasiness'], tx.greasiness],
  ];
  return defs
    .filter(([, , v]) => v > 0)
    .map(([key, [ar, en], value]) => ({ key, label: locale === 'en' ? en : ar, value }));
}

export function resolveSampleShape(config: Record<string, unknown>): SampleShape {
  const value = getRadioValue(config.bta_sample_shape, 'drops') as SampleShape;
  return SAMPLE_SHAPES.includes(value) ? value : 'drops';
}

export function resolveIndicatorType(config: Record<string, unknown>): IndicatorType {
  const value = getRadioValue(config.bta_indicator_type, 'bars') as IndicatorType;
  return INDICATOR_TYPES.includes(value) ? value : 'bars';
}
