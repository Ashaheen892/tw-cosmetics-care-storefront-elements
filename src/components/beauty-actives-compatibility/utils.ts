import { getRadioValue, normalizeCollection } from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type { Active, CompatibilityLevel, Rule } from './types.js';

const LEVELS: CompatibilityLevel[] = ['compatible', 'caution', 'avoid'];

export function normalizeLevel(value: unknown): CompatibilityLevel {
  const raw = getRadioValue(value, 'compatible').toLowerCase();
  return (LEVELS as string[]).includes(raw) ? (raw as CompatibilityLevel) : 'compatible';
}

export function parseActives(raw: unknown): Active[] {
  return normalizeCollection(raw)
    .map((row, i) => {
      const name = localizedString(row.name as LocaleValue);
      return {
        id: String(row.active_id ?? '').trim() || `active-${i + 1}`,
        name,
        color: String(row.color ?? '').trim(),
        desc: localizedString(row.desc as LocaleValue),
      } satisfies Active;
    })
    .filter((a) => a.name);
}

export function parseRules(raw: unknown): Rule[] {
  return normalizeCollection(raw)
    .map((row) => {
      return {
        a: String(row.a ?? '').trim(),
        b: String(row.b ?? '').trim(),
        level: normalizeLevel(row.level),
        note: localizedString(row.note as LocaleValue),
        timing: localizedString(row.timing as LocaleValue),
      } satisfies Rule;
    })
    .filter((r) => r.a && r.b);
}

/** Find a rule matching the pair regardless of order (a/b or b/a). */
export function findVerdict(rules: Rule[], a: string, b: string): Rule | null {
  if (!a || !b) return null;
  return (
    rules.find(
      (r) => (r.a === a && r.b === b) || (r.a === b && r.b === a)
    ) ?? null
  );
}
