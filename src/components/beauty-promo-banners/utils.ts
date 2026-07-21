import { normalizeCollection, extractImageUrl, extractLink, t } from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type { PromoBanner } from './types.js';

const DEFAULTS: PromoBanner[] = [
  {
    title: t('عروض الصيف', 'Summer Sale'),
    subtitle: t('خصم حتى 40%', 'Up to 40% off'),
    image:
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1400&q=80',
    link: '',
    cta_label: t('تسوقي الآن', 'Shop now'),
  },
  {
    title: t('وصل حديثًا', 'New Arrivals'),
    subtitle: t('اكتشفي أحدث المنتجات', 'Discover the latest'),
    image:
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1400&q=80',
    link: '',
    cta_label: t('اكتشفي', 'Explore'),
  },
];

export function parseBanners(raw: unknown): PromoBanner[] {
  const rows = normalizeCollection(raw);
  const parsed = rows
    .map((row) => ({
      title: localizedString(row.title as LocaleValue, ''),
      subtitle: localizedString(
        (row.subtitle as LocaleValue) || (row.desc as LocaleValue),
        ''
      ),
      image: extractImageUrl(row.image),
      link: extractLink(row.link ?? row.url),
      cta_label: localizedString(
        (row.cta_label as LocaleValue) || (row.button as LocaleValue),
        ''
      ),
    }))
    .filter((b) => b.title || b.image);

  if (!parsed.length) return DEFAULTS.map((d) => ({ ...d }));
  return parsed.map((b, i) => {
    const d = DEFAULTS[i % DEFAULTS.length];
    return {
      ...b,
      image: b.image || d.image,
      title: b.title || d.title,
      subtitle: b.subtitle || d.subtitle,
      cta_label: b.cta_label || d.cta_label,
    };
  });
}
