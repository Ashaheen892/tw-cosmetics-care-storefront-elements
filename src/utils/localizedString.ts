export type LocaleValue =
  | string
  | number
  | Record<string, unknown>
  | null
  | undefined;

/**
 * Resolve storefront locale the same way as
 * tw-increase-sales-and-professional-presentation:
 * Salla.lang → <html lang> → ar
 */
export function getPageLocale(): string {
  try {
    const sallaLocale =
      typeof Salla !== 'undefined' ? Salla?.lang?.getLocale?.() : undefined;
    const htmlLocale = document.documentElement.lang?.split('-')[0];
    return String(sallaLocale || htmlLocale || 'ar').toLowerCase();
  } catch {
    return 'ar';
  }
}

export function localizedString(
  value: LocaleValue,
  fallback = ''
): string {
  if (value == null) {
    return fallback;
  }

  if (typeof value === 'string') {
    return value.trim() || fallback;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    const locale = getPageLocale();
    const candidates = [locale, 'ar', 'en', ...Object.keys(obj)];

    for (const key of candidates) {
      const v = obj[key];
      if (typeof v === 'string' && v.trim()) {
        return v.trim();
      }
    }
  }

  return fallback;
}
