import {
  extractImageUrl,
  extractLink,
  getRadioValue,
  normalizeCollection,
  parseTags,
} from '../../utils/helpers.js';
import { getPageLocale, localizedString } from '../../utils/localizedString.js';
import type { Ingredient, TextureOption } from './types.js';

interface TextureDef {
  value: string;
  ar: string;
  en: string;
}

export const TEXTURES: TextureDef[] = [
  { value: 'serum', ar: 'سيروم', en: 'Serum' },
  { value: 'gel', ar: 'جل', en: 'Gel' },
  { value: 'cream', ar: 'كريم', en: 'Cream' },
  { value: 'oil', ar: 'زيت', en: 'Oil' },
  { value: 'foam', ar: 'رغوة', en: 'Foam' },
  { value: 'balm', ar: 'بلسم', en: 'Balm' },
  { value: 'powder', ar: 'بودرة', en: 'Powder' },
  { value: 'spray', ar: 'رذاذ', en: 'Spray' },
];

export function isEn(): boolean {
  return getPageLocale() === 'en';
}

export function textureLabel(value: string): string {
  const def = TEXTURES.find((tex) => tex.value === value);
  if (!def) return value;
  return isEn() ? def.en : def.ar;
}

/** Texture options limited to the ones actually used by the ingredients. */
export function usedTextures(ingredients: Ingredient[]): TextureOption[] {
  const present = new Set(ingredients.map((i) => i.texture).filter(Boolean));
  return TEXTURES.filter((tex) => present.has(tex.value)).map((tex) => ({
    value: tex.value,
    label: isEn() ? tex.en : tex.ar,
  }));
}

export function parseIngredients(raw: unknown): Ingredient[] {
  return normalizeCollection(raw)
    .map((row, index) => {
      return {
        id: `ingredient-${index}`,
        name: localizedString(row.name as string),
        image: extractImageUrl(row.image),
        color: localizedString(row.color as string) || '#c2527f',
        desc: localizedString(row.desc as string),
        benefits: parseTags(row.benefits),
        skin_types: parseTags(row.skin_types),
        usage_time: localizedString(row.usage_time as string),
        note: localizedString(row.note as string),
        texture: getRadioValue(row.texture, '').toLowerCase().trim(),
        link: extractLink(row.link ?? row['bil_ingredients.link']),
      } as Ingredient;
    })
    .filter((i) => i.name || i.desc || i.image);
}

export function filterByTexture(
  ingredients: Ingredient[],
  texture: string
): Ingredient[] {
  if (!texture) return ingredients;
  return ingredients.filter((i) => i.texture === texture);
}
