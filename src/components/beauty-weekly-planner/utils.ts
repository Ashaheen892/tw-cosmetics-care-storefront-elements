import {
  getRadioValue,
  normalizeCollection,
  t,
} from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type {
  DaySchedule,
  Frequency,
  PlannerSlot,
  PlannerStep,
  PlannerView,
  StartDay,
} from './types.js';

const FREQUENCIES: Frequency[] = ['daily', 'x3', 'x2', 'x1', 'alternate'];
const SLOTS: PlannerSlot[] = ['am', 'pm', 'both'];
const START_DAYS: StartDay[] = ['sat', 'sun', 'mon'];
const VIEWS: PlannerView[] = ['week', 'am', 'pm'];

/** Canonical week ordered from Saturday (matches Salla/GCC default). */
const CANONICAL_WEEK: { ar: string; en: string }[] = [
  { ar: 'السبت', en: 'Saturday' },
  { ar: 'الأحد', en: 'Sunday' },
  { ar: 'الإثنين', en: 'Monday' },
  { ar: 'الثلاثاء', en: 'Tuesday' },
  { ar: 'الأربعاء', en: 'Wednesday' },
  { ar: 'الخميس', en: 'Thursday' },
  { ar: 'الجمعة', en: 'Friday' },
];

const START_OFFSET: Record<StartDay, number> = { sat: 0, sun: 1, mon: 2 };

export function resolveStartDay(config: Record<string, unknown>): StartDay {
  const value = getRadioValue(config.bwp_start_day, 'sat') as StartDay;
  return START_DAYS.includes(value) ? value : 'sat';
}

export function resolveView(config: Record<string, unknown>): PlannerView {
  const value = getRadioValue(config.bwp_view_default, 'week') as PlannerView;
  return VIEWS.includes(value) ? value : 'week';
}

function resolveFrequency(raw: unknown): Frequency {
  const value = getRadioValue(raw, 'daily') as Frequency;
  return FREQUENCIES.includes(value) ? value : 'daily';
}

function resolveSlot(raw: unknown): PlannerSlot {
  const value = getRadioValue(raw, 'both') as PlannerSlot;
  return SLOTS.includes(value) ? value : 'both';
}

export function parseSteps(raw: unknown): PlannerStep[] {
  return normalizeCollection(raw)
    .map((s, i) => {
      const name = localizedString(s.name as LocaleValue);
      return {
        id: String(s.id ?? s.step_id ?? '').trim() || `step-${i + 1}`,
        name,
        color: String(s.color ?? '').trim(),
        icon: String(s.icon ?? '').trim(),
        slot: resolveSlot(s.slot),
        frequency: resolveFrequency(s.frequency),
        note: localizedString(s.note as LocaleValue),
      } satisfies PlannerStep;
    })
    .filter((s) => !!s.name);
}

/** Deterministic, evenly-spread day indices (0..6) for a weekly frequency. */
export function frequencyDays(freq: Frequency): number[] {
  switch (freq) {
    case 'daily':
      return [0, 1, 2, 3, 4, 5, 6];
    case 'x3':
      return [0, 2, 4];
    case 'x2':
      return [1, 4];
    case 'x1':
      return [1];
    case 'alternate':
      return [0, 2, 4, 6];
    default:
      return [0, 1, 2, 3, 4, 5, 6];
  }
}

/** 7 localized weekday names ordered from the configured week start. */
export function weekdayNames(startDay: StartDay): string[] {
  const offset = START_OFFSET[startDay] ?? 0;
  return Array.from({ length: 7 }, (_, i) => {
    const day = CANONICAL_WEEK[(offset + i) % 7];
    return t(day.ar, day.en);
  });
}

/** Soft label for days with no scheduled steps. */
export function emptyDayLabel(): string {
  return t('راحة', 'Rest');
}

/** Human-readable, localized frequency label. */
export function frequencyLabel(freq: Frequency): string {
  switch (freq) {
    case 'daily':
      return t('يوميًا', 'Daily');
    case 'x3':
      return t('3 مرات أسبوعيًا', '3× per week');
    case 'x2':
      return t('مرتين أسبوعيًا', '2× per week');
    case 'x1':
      return t('مرة أسبوعيًا', 'Once a week');
    case 'alternate':
      return t('يوم بعد يوم', 'Every other day');
    default:
      return t('يوميًا', 'Daily');
  }
}

/**
 * Auto-distribute steps across the 7 days (indices already map to the
 * reordered week), filtered by the active view.
 */
export function buildSchedule(
  steps: PlannerStep[],
  _startDay: StartDay,
  view: PlannerView
): DaySchedule[] {
  const schedule: DaySchedule[] = Array.from({ length: 7 }, () => ({
    am: [],
    pm: [],
  }));

  for (const step of steps) {
    const inAm = step.slot === 'am' || step.slot === 'both';
    const inPm = step.slot === 'pm' || step.slot === 'both';
    for (const day of frequencyDays(step.frequency)) {
      if (day < 0 || day > 6) continue;
      if (inAm && view !== 'pm') schedule[day].am.push(step);
      if (inPm && view !== 'am') schedule[day].pm.push(step);
    }
  }

  return schedule;
}
