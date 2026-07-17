import {
  extractLink,
  getRadioValue,
  normalizeCollection,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type {
  DimensionKey,
  Shade,
  ShadeSelection,
  StepDef,
  StepOption,
} from './types.js';

interface DimensionDef {
  key: DimensionKey;
  labelKey: string;
  labelAr: string;
  labelEn: string;
  options: Array<{ value: string; ar: string; en: string }>;
}

/** Fixed dimension values with editable labels — keeps shade matching robust. */
export const DIMENSIONS: DimensionDef[] = [
  {
    key: 'product_type',
    labelKey: 'bsf_step_type_label',
    labelAr: 'نوع المنتج',
    labelEn: 'Product type',
    options: [
      { value: 'foundation', ar: 'كريم أساس', en: 'Foundation' },
      { value: 'concealer', ar: 'كونسيلر', en: 'Concealer' },
      { value: 'blush', ar: 'بلاشر', en: 'Blush' },
      { value: 'lipstick', ar: 'أحمر شفاه', en: 'Lipstick' },
      { value: 'contour', ar: 'كونتور', en: 'Contour' },
      { value: 'powder', ar: 'بودرة', en: 'Powder' },
    ],
  },
  {
    key: 'skin',
    labelKey: 'bsf_step_skin_label',
    labelAr: 'درجة لون البشرة',
    labelEn: 'Skin depth',
    options: [
      { value: 'very_fair', ar: 'فاتحة جدًا', en: 'Very fair' },
      { value: 'fair', ar: 'فاتحة', en: 'Fair' },
      { value: 'medium', ar: 'متوسطة', en: 'Medium' },
      { value: 'tan', ar: 'حنطية', en: 'Tan' },
      { value: 'deep', ar: 'سمراء', en: 'Deep' },
      { value: 'dark', ar: 'داكنة', en: 'Dark' },
    ],
  },
  {
    key: 'undertone',
    labelKey: 'bsf_step_undertone_label',
    labelAr: 'الأندرتون',
    labelEn: 'Undertone',
    options: [
      { value: 'warm', ar: 'دافئ', en: 'Warm' },
      { value: 'cool', ar: 'بارد', en: 'Cool' },
      { value: 'neutral', ar: 'محايد', en: 'Neutral' },
      { value: 'olive', ar: 'زيتوني', en: 'Olive' },
    ],
  },
  {
    key: 'result',
    labelKey: 'bsf_step_result_label',
    labelAr: 'النتيجة المطلوبة',
    labelEn: 'Desired finish',
    options: [
      { value: 'natural', ar: 'طبيعية', en: 'Natural' },
      { value: 'radiant', ar: 'مشرقة', en: 'Radiant' },
      { value: 'matte', ar: 'مطفية', en: 'Matte' },
      { value: 'light', ar: 'تغطية خفيفة', en: 'Light coverage' },
      { value: 'medium_cov', ar: 'تغطية متوسطة', en: 'Medium coverage' },
      { value: 'full_cov', ar: 'تغطية عالية', en: 'Full coverage' },
    ],
  },
];

export function isEn(): boolean {
  return (
    (typeof document !== 'undefined'
      ? document.documentElement.lang?.split(/[-_]/)[0]
      : 'ar'
    )?.toLowerCase() === 'en'
  );
}

/** Build steps with merchant label overrides. */
export function buildSteps(config: Record<string, unknown>): StepDef[] {
  const en = isEn();
  return DIMENSIONS.map((dim) => {
    const label =
      localizedString(config[dim.labelKey] as string) ||
      (en ? dim.labelEn : dim.labelAr);
    const options: StepOption[] = dim.options.map((o) => ({
      value: o.value,
      label: en ? o.en : o.ar,
    }));
    return { key: dim.key, label, options };
  });
}

function readDimensionValue(row: Record<string, unknown>, key: DimensionKey): string {
  const raw = row[key] ?? row[`bsf_shades.${key}`];
  return getRadioValue(raw, '').toLowerCase().trim();
}

/** Parse merchant shade rows into product-free Shade objects. */
export function parseShades(raw: unknown): Shade[] {
  return normalizeCollection(raw)
    .map((row, index) => {
      const name = localizedString(row.shade_name as string);
      const shade: Shade = {
        id: `shade-${index}`,
        hex: localizedString(row.hex as string) || '#d9b48f',
        shade_name: name,
        shade_number: localizedString(row.shade_number as string),
        name,
        desc: localizedString(row.desc as string),
        link: extractLink(row.link),
        product_type: readDimensionValue(row, 'product_type'),
        skin: readDimensionValue(row, 'skin'),
        undertone: readDimensionValue(row, 'undertone'),
        result: readDimensionValue(row, 'result'),
      };
      return shade;
    })
    .filter((s) => s.shade_name || s.hex);
}

/** Shades matching the active selection (empty dimension = wildcard). */
export function filterShades(shades: Shade[], sel: ShadeSelection): Shade[] {
  const keys: DimensionKey[] = ['product_type', 'skin', 'undertone', 'result'];
  const exact = shades.filter((shade) =>
    keys.every((key) => {
      const chosen = sel[key];
      if (!chosen) return true;
      const shadeVal = shade[key];
      return !shadeVal || shadeVal === chosen;
    })
  );
  if (exact.length) return exact;

  // Relax to product type + skin depth so we always suggest something useful.
  const relaxed = shades.filter((shade) => {
    const typeOk = !sel.product_type || !shade.product_type || shade.product_type === sel.product_type;
    const skinOk = !sel.skin || !shade.skin || shade.skin === sel.skin;
    return typeOk && skinOk;
  });
  return relaxed.length ? relaxed : shades;
}
