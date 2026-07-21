import { normalizeCollection, extractImageUrl, t } from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type { BeforeAfterPair } from './types.js';

const BEFORE =
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1000&q=80';
const AFTER =
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80';

const DEFAULT_PAIR: BeforeAfterPair = {
  before_image: BEFORE,
  after_image: AFTER,
  before_label: t('قبل', 'Before'),
  after_label: t('بعد', 'After'),
  title: t('النتيجة بعد أسبوعين', '2-week results'),
};

export function parsePairs(raw: unknown): BeforeAfterPair[] {
  const rows = normalizeCollection(raw);
  const parsed = rows
    .map((row) => ({
      before_image: extractImageUrl(row.before_image),
      after_image: extractImageUrl(row.after_image),
      before_label: localizedString(row.before_label as LocaleValue, ''),
      after_label: localizedString(row.after_label as LocaleValue, ''),
      title: localizedString(row.title as LocaleValue, ''),
    }))
    .filter((p) => p.before_image || p.after_image || p.title);

  if (!parsed.length) return [{ ...DEFAULT_PAIR }];
  return parsed.map((p) => ({
    ...p,
    before_image: p.before_image || DEFAULT_PAIR.before_image,
    after_image: p.after_image || DEFAULT_PAIR.after_image,
    before_label: p.before_label || DEFAULT_PAIR.before_label,
    after_label: p.after_label || DEFAULT_PAIR.after_label,
    title: p.title || DEFAULT_PAIR.title,
  }));
}

export function defaultSingleImages(): { before: string; after: string } {
  return { before: BEFORE, after: AFTER };
}

export function clampPosition(value: number): number {
  return Math.max(0, Math.min(100, value));
}
