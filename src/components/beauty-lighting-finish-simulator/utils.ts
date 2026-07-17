import {
  clamp,
  extractImageUrl,
  extractLink,
  getRadioValue,
  normalizeCollection,
  parseTags,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type {
  CompareStyle,
  Finish,
  LightState,
  TransitionKind,
  ViewMode,
} from './types.js';

const FINISHES: Finish[] = ['any', 'matte', 'dewy', 'glossy', 'natural', 'velvet'];

export function parseLights(raw: unknown): LightState[] {
  return normalizeCollection(raw)
    .map((l, i) => {
      const finish = getRadioValue(l.finish, 'any') as Finish;
      return {
        id: String(l.light_id ?? '').trim() || `light-${i + 1}`,
        name: localizedString(l.name as LocaleValue) || `${i + 1}`,
        icon: String(l.icon ?? '').trim(),
        image: extractImageUrl(l.image),
        imageMobile: extractImageUrl(l.image_mobile),
        finish: FINISHES.includes(finish) ? finish : 'any',
        desc: localizedString(l.desc as LocaleValue),
        colorEffect: localizedString(l.color_effect as LocaleValue),
        gloss: clamp(toNumber(l.gloss, 0), 0, 5),
        clarity: clamp(toNumber(l.clarity, 0), 0, 5),
        contrast: clamp(toNumber(l.contrast, 0), 0, 5),
        palette: parseTags(l.palette),
        note: localizedString(l.note as LocaleValue),
        link: extractLink(l.link),
      } satisfies LightState;
    })
    .filter((l) => l.image || l.name);
}

export function resolveViewMode(config: Record<string, unknown>): ViewMode {
  return getRadioValue(config.bls_view_mode, 'single') === 'compare' ? 'compare' : 'single';
}

export function resolveCompareStyle(config: Record<string, unknown>): CompareStyle {
  const value = getRadioValue(config.bls_compare_style, 'slider') as CompareStyle;
  return (['split', 'slider', 'side'] as CompareStyle[]).includes(value) ? value : 'slider';
}

export function resolveTransition(config: Record<string, unknown>): TransitionKind {
  const value = getRadioValue(config.bls_transition, 'fade') as TransitionKind;
  return (['fade', 'slide', 'none'] as TransitionKind[]).includes(value) ? value : 'fade';
}

export function resolveAspect(config: Record<string, unknown>, fallback = '4/5'): string {
  const value = getRadioValue(config.bls_aspect, fallback) || fallback;
  return value.replace('/', ' / ');
}

export function finishLabel(finish: Finish, locale: 'ar' | 'en'): string {
  const map: Record<Finish, [string, string]> = {
    any: ['عام', 'Any'],
    matte: ['مطفي', 'Matte'],
    dewy: ['ندي', 'Dewy'],
    glossy: ['لامع', 'Glossy'],
    natural: ['طبيعي', 'Natural'],
    velvet: ['مخملي', 'Velvet'],
  };
  return map[finish][locale === 'en' ? 1 : 0];
}

/** Distinct finishes present across the states (excluding the generic "any"). */
export function usedFinishes(lights: LightState[]): Finish[] {
  const seen = new Set<Finish>();
  for (const l of lights) if (l.finish !== 'any') seen.add(l.finish);
  return FINISHES.filter((f) => seen.has(f));
}
