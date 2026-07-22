import { normalizeCollection, extractImageUrl, extractLink, getRadioValue, t } from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type { CategoryItem } from './types.js';

const DEFAULTS: CategoryItem[] = [
  { title: t('العناية بالبشرة', 'Skincare'), image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80", link: '' },
  { title: t('المكياج', 'Makeup'), image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80", link: '' },
  { title: t('العطور', 'Fragrances'), image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80", link: '' },
  { title: t('العناية بالشعر', 'Haircare'), image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80", link: '' },
];

export function parseItems(raw: unknown): CategoryItem[] {
  const rows = normalizeCollection(raw);
  const parsed = rows
    .map((row) => ({
      title: localizedString(row.title as LocaleValue || row.name as LocaleValue, ''),
      image: extractImageUrl(row.image),
      link: extractLink(row.link ?? row.url),
    }))
    .filter((item) => item.title || item.image);

  if (!parsed.length) return DEFAULTS.map((d) => ({ ...d }));
  return parsed.map((item, i) => ({
    ...item,
    image: item.image || DEFAULTS[i % DEFAULTS.length].image,
    title: item.title || DEFAULTS[i % DEFAULTS.length].title,
  }));
}

export function resolveLayout(raw: unknown): 'slider' | 'grid' {
  const val = getRadioValue(raw, 'slider').toLowerCase().trim();
  if (val === 'grid') return 'grid';
  return 'slider';
}
