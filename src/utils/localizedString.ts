export type LocaleValue =
  | string
  | number
  | Record<string, unknown>
  | null
  | undefined;

export function getPageLocale(): string {
  try {
    const sallaLocale =
      typeof Salla !== 'undefined' ? Salla?.lang?.getLocale?.() : undefined;
    const htmlLocale = document.documentElement.lang?.split(/[-_]/)[0];
    return (sallaLocale || htmlLocale || 'ar').toLowerCase();
  } catch {
    return 'ar';
  }
}

export function localizedString(
  value: LocaleValue,
  fallback = ''
): string {
  if (value == null) return fallback;

  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed || fallback;
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    const locale = getPageLocale();
    const candidates = [locale, 'ar', 'en', ...Object.keys(obj)];

    for (const key of candidates) {
      const v = obj[key];
      if (typeof v === 'string' && v.trim()) return v.trim();
      if (typeof v === 'number' && Number.isFinite(v)) return String(v);
    }
  }

  return fallback;
}
