import {
  extractImageUrl,
  getRadioValue,
  isTruthy,
  normalizeCollection,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type {
  BoardDirection,
  BoardMode,
  BoardShape,
  LayerStep,
  Routine,
  StepPeriod,
} from './types.js';

const SHAPES: BoardShape[] = ['layers', 'drops', 'bottles', 'stairs', 'path', 'circles'];
const PERIODS: StepPeriod[] = ['morning', 'evening', 'both'];

function parseSteps(raw: unknown): LayerStep[] {
  return normalizeCollection(raw)
    .map((s, i) => {
      const period = getRadioValue(s.period, 'both') as StepPeriod;
      return {
        id: String(s.step_id ?? '').trim() || `step-${i + 1}`,
        title: localizedString(s.step_title as LocaleValue),
        icon: String(s.icon ?? '').trim(),
        image: extractImageUrl(s.image),
        descShort: localizedString(s.desc_short as LocaleValue),
        descLong: localizedString(s.desc_long as LocaleValue),
        timing: localizedString(s.timing as LocaleValue),
        wait: localizedString(s.wait as LocaleValue),
        amount: localizedString(s.amount as LocaleValue),
        note: localizedString(s.note as LocaleValue),
        color: String(s.color ?? '').trim(),
        optional: isTruthy(s.optional, false),
        period: PERIODS.includes(period) ? period : 'both',
        correctOrder: toNumber(s.correct_order, i + 1),
      } satisfies LayerStep;
    })
    .filter((s) => s.title);
}

export function parseRoutines(raw: unknown): Routine[] {
  return normalizeCollection(raw)
    .map((r, i) => ({
      id: String(r.routine_id ?? '').trim() || `routine-${i + 1}`,
      name: localizedString(r.name as LocaleValue) || `${i + 1}`,
      steps: parseSteps(r.steps),
    }))
    .filter((r) => r.steps.length);
}

/** Correct sequence = steps sorted ascending by correctOrder. */
export function sortedByCorrect(steps: LayerStep[]): LayerStep[] {
  return [...steps].sort((a, b) => a.correctOrder - b.correctOrder);
}

/** Fisher–Yates shuffle that guarantees a different order than the input when possible. */
export function shuffleOrder(steps: LayerStep[]): string[] {
  const ids = steps.map((s) => s.id);
  if (ids.length < 2) return ids;
  const correct = sortedByCorrect(steps).map((s) => s.id);
  let out = [...ids];
  for (let attempt = 0; attempt < 6; attempt += 1) {
    for (let i = out.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    if (out.some((id, idx) => id !== correct[idx])) return out;
  }
  // fallback: rotate
  out = [...correct.slice(1), correct[0]];
  return out;
}

export function resolveMode(config: Record<string, unknown>): BoardMode {
  return getRadioValue(config.brl_mode, 'guide') === 'quiz' ? 'quiz' : 'guide';
}

export function resolveShape(config: Record<string, unknown>): BoardShape {
  const value = getRadioValue(config.brl_shape, 'layers') as BoardShape;
  return SHAPES.includes(value) ? value : 'layers';
}

export function resolveDirection(config: Record<string, unknown>): BoardDirection {
  return getRadioValue(config.brl_direction, 'vertical') === 'horizontal'
    ? 'horizontal'
    : 'vertical';
}

export function periodLabel(period: StepPeriod, locale: 'ar' | 'en'): string {
  const map: Record<StepPeriod, [string, string]> = {
    morning: ['صباحي', 'Morning'],
    evening: ['مسائي', 'Evening'],
    both: ['صباحي ومسائي', 'AM / PM'],
  };
  return map[period][locale === 'en' ? 1 : 0];
}
