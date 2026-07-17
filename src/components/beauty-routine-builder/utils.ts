import {
  extractImageUrl,
  extractLink,
  getRadioValue,
  normalizeCollection,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type {
  Answers,
  Question,
  QuestionKey,
  QuestionOption,
  RoutineStep,
} from './types.js';

interface QuestionDef {
  key: QuestionKey;
  labelKey: string;
  labelAr: string;
  labelEn: string;
  options: Array<{ value: string; ar: string; en: string }>;
}

export const QUESTIONS: QuestionDef[] = [
  {
    key: 'skin',
    labelKey: 'brb_q_skin_label',
    labelAr: 'نوع البشرة',
    labelEn: 'Skin type',
    options: [
      { value: 'dry', ar: 'جافة', en: 'Dry' },
      { value: 'oily', ar: 'دهنية', en: 'Oily' },
      { value: 'combination', ar: 'مختلطة', en: 'Combination' },
      { value: 'normal', ar: 'عادية', en: 'Normal' },
      { value: 'sensitive', ar: 'حساسة', en: 'Sensitive' },
    ],
  },
  {
    key: 'concern',
    labelKey: 'brb_q_concern_label',
    labelAr: 'المشكلة الأساسية',
    labelEn: 'Main concern',
    options: [
      { value: 'dryness', ar: 'الجفاف', en: 'Dryness' },
      { value: 'acne', ar: 'الحبوب', en: 'Acne' },
      { value: 'pigmentation', ar: 'التصبغات', en: 'Pigmentation' },
      { value: 'pores', ar: 'المسام', en: 'Pores' },
      { value: 'dullness', ar: 'البهتان', en: 'Dullness' },
      { value: 'fine_lines', ar: 'الخطوط الدقيقة', en: 'Fine lines' },
    ],
  },
  {
    key: 'time',
    labelKey: 'brb_q_time_label',
    labelAr: 'وقت الاستخدام',
    labelEn: 'Usage time',
    options: [
      { value: 'morning', ar: 'صباحي', en: 'Morning' },
      { value: 'evening', ar: 'مسائي', en: 'Evening' },
      { value: 'both', ar: 'صباحي ومسائي', en: 'Morning & evening' },
    ],
  },
  {
    key: 'routine',
    labelKey: 'brb_q_routine_label',
    labelAr: 'نوع الروتين',
    labelEn: 'Routine type',
    options: [
      { value: 'quick', ar: 'روتين سريع', en: 'Quick routine' },
      { value: 'basic', ar: 'روتين أساسي', en: 'Basic routine' },
      { value: 'complete', ar: 'روتين متكامل', en: 'Complete routine' },
    ],
  },
];

const LEVEL_RANK: Record<string, number> = { quick: 1, basic: 2, complete: 3 };

export function isEn(): boolean {
  return (
    (typeof document !== 'undefined'
      ? document.documentElement.lang?.split(/[-_]/)[0]
      : 'ar'
    )?.toLowerCase() === 'en'
  );
}

export function buildQuestions(config: Record<string, unknown>): Question[] {
  const en = isEn();
  return QUESTIONS.map((q) => {
    const label =
      localizedString(config[q.labelKey] as string) || (en ? q.labelEn : q.labelAr);
    const options: QuestionOption[] = q.options.map((o) => ({
      value: o.value,
      label: en ? o.en : o.ar,
    }));
    return { key: q.key, label, options };
  });
}

function readMatch(row: Record<string, unknown>, key: string): string {
  const raw = row[key] ?? row[`brb_steps.${key}`];
  return getRadioValue(raw, '').toLowerCase().trim();
}

export function parseSteps(raw: unknown): RoutineStep[] {
  return normalizeCollection(raw)
    .map((row, index) => {
      const name = localizedString(row.step_name as string) || '';
      const step: RoutineStep = {
        id: `step-${index}`,
        step_name: name,
        step_desc: localizedString(row.step_desc as string),
        order: toNumber(row.order, index + 1),
        level: readMatch(row, 'level') || 'quick',
        skin: readMatch(row, 'skin'),
        concern: readMatch(row, 'concern'),
        time: readMatch(row, 'time'),
        image: extractImageUrl(row.image),
        name,
        link: extractLink(row.link ?? row['brb_steps.link']),
      };
      return step;
    })
    .filter((s) => s.step_name || s.step_desc);
}

function timeMatches(stepTime: string, selTime: string | undefined): boolean {
  if (!stepTime || !selTime) return true;
  if (stepTime === 'both' || selTime === 'both') return true;
  return stepTime === selTime;
}

/** Compute the ordered routine that matches the current answers. */
export function buildRoutine(steps: RoutineStep[], answers: Answers): RoutineStep[] {
  const maxRank = answers.routine ? LEVEL_RANK[answers.routine] ?? 3 : 3;
  return steps
    .filter((step) => {
      const levelOk = (LEVEL_RANK[step.level] ?? 1) <= maxRank;
      const skinOk = !answers.skin || !step.skin || step.skin === answers.skin;
      const concernOk =
        !answers.concern || !step.concern || step.concern === answers.concern;
      const timeOk = timeMatches(step.time, answers.time);
      return levelOk && skinOk && concernOk && timeOk;
    })
    .sort((a, b) => a.order - b.order);
}
