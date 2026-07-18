import { getRadioValue, normalizeCollection } from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import { t } from '../../utils/helpers.js';
import type { Active, CompatibilityLevel, Rule, VerdictResult } from './types.js';

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

const TIPS: Record<CompatibilityLevel, { ar: string; en: string }> = {
  compatible: {
    ar: 'يمكنك دمجهما في روتين واحد — راقبي بشرتك عند أول استخدام.',
    en: 'You can use both in one routine — watch your skin on first use.',
  },
  caution: {
    ar: 'جرّبي على منطقة صغيرة أولًا، أو استخدميهما في أوقات مختلفة.',
    en: 'Patch-test first, or use them at different times of day.',
  },
  avoid: {
    ar: 'لا تدمجيهما في نفس الروتين — اختاري واحدًا في كل مرة.',
    en: 'Do not combine in the same routine — pick one at a time.',
  },
};

export function resolveVerdict(
  rules: Rule[],
  aId: string,
  bId: string,
  defaultNote: string
): VerdictResult {
  if (aId && bId && aId === bId) {
    return {
      level: 'same',
      note: t(
        'اخترتِ المكوّن نفسه مرتين. اختاري مكوّنًا مختلفًا لفحص التوافق بينهما.',
        'You picked the same ingredient twice. Choose a different one to check compatibility.'
      ),
      tip: t('اختاري مكوّنًا ثانيًا مختلفًا عن الأول.', 'Pick a second ingredient different from the first.'),
      timing: '',
      hasRule: false,
    };
  }

  const rule = findVerdict(rules, aId, bId);
  if (rule) {
    const tip = TIPS[rule.level];
    return {
      level: rule.level,
      note: rule.note || defaultNote,
      tip: t(tip.ar, tip.en),
      timing: rule.timing,
      hasRule: true,
    };
  }

  return {
    level: 'unknown',
    note:
      defaultNote ||
      t(
        'لا توجد قاعدة محددة لهذا الزوج — راجعي تعليمات المنتج أو استشيري مختصًا.',
        'No specific rule for this pair — check product labels or consult a professional.'
      ),
    tip: t(
      'ابدئي باستخدام واحد فقط، ثم أضيفي الثاني تدريجيًا إذا لم تظهر تهيُّج.',
      'Start with one active, then add the second gradually if no irritation appears.'
    ),
    timing: '',
    hasRule: false,
  };
}
