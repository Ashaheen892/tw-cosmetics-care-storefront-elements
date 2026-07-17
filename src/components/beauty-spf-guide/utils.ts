import { clamp, normalizeCollection, t, toNumber } from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type { Phototype, SpfValue, SunCondition } from './types.js';

export function parsePhototypes(raw: unknown): Phototype[] {
  return normalizeCollection(raw)
    .map((row, i) => {
      const name = localizedString(row.name as LocaleValue);
      return {
        id: String(row.pt_id ?? '').trim() || `pt-${i + 1}`,
        name,
        desc: localizedString(row.desc as LocaleValue),
        baseMinutes: clamp(toNumber(row.base_minutes, 15), 1, 240),
        color: String(row.color ?? '').trim(),
      } satisfies Phototype;
    })
    .filter((row) => row.name);
}

export function parseSpfValues(raw: unknown): SpfValue[] {
  return normalizeCollection(raw)
    .map((row) => {
      const spf = clamp(Math.round(toNumber(row.spf, 30)), 1, 100);
      const label = localizedString(row.label as LocaleValue) || `SPF ${spf}`;
      return { spf, label } satisfies SpfValue;
    })
    .filter((row) => row.spf > 0);
}

export function parseConditions(raw: unknown): SunCondition[] {
  return normalizeCollection(raw)
    .map((row, i) => {
      const name = localizedString(row.name as LocaleValue);
      return {
        id: String(row.cond_id ?? '').trim() || `cond-${i + 1}`,
        name,
        factor: clamp(toNumber(row.factor, 1), 0.1, 1.5),
        desc: localizedString(row.desc as LocaleValue),
      } satisfies SunCondition;
    })
    .filter((row) => row.name);
}

export function parseTips(raw: unknown): string[] {
  return normalizeCollection(raw)
    .map((row) => localizedString(row.tip as LocaleValue))
    .filter(Boolean);
}

/** Rough educational estimate of protected sun-exposure minutes. */
export function estimateMinutes(base: number, spf: number, factor: number): number {
  return clamp(base * spf * factor, 0, 100000);
}

/** Localized "Xس Yد" (ar) / "Xh Ym" (en) duration string. */
export function formatDuration(minutes: number): string {
  const total = Math.max(0, Math.round(minutes));
  const hours = Math.floor(total / 60);
  const mins = total % 60;
  const hUnit = t('س', 'h');
  const mUnit = t('د', 'm');
  if (hours <= 0) return `${mins}${mUnit}`;
  if (mins <= 0) return `${hours}${hUnit}`;
  return `${hours}${hUnit} ${mins}${mUnit}`;
}
