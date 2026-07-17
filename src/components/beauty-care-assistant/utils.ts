import {
  extractImageUrl,
  extractLink,
  getRadioValue,
  normalizeCollection,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { AssistantAnswer, AssistantQuestion, AssistantStyle } from './types.js';

function slug(value: string, fallback: string): string {
  const s = value.trim().toLowerCase().replace(/\s+/g, '-');
  return s || fallback;
}

function parseAnswers(raw: unknown, qKey: string): AssistantAnswer[] {
  return normalizeCollection(raw)
    .map((row, index) => {
      return {
        id: `${qKey}-a${index}`,
        label: localizedString(row.label as string),
        image: extractImageUrl(row.image),
        next: localizedString(row.next as string).trim(),
        result_title: localizedString(row.result_title as string),
        result_desc: localizedString(row.result_desc as string),
        link: extractLink(row.link),
        link_text: localizedString(row.link_text as string),
      } as AssistantAnswer;
    })
    .filter((a) => a.label || a.result_title || a.link);
}

export function parseQuestions(raw: unknown): AssistantQuestion[] {
  return normalizeCollection(raw)
    .map((row, index) => {
      const key = slug(localizedString(row.q_key as string), `q${index + 1}`);
      return {
        key,
        text: localizedString(row.q_text as string),
        image: extractImageUrl(row.q_image),
        answers: parseAnswers(row.answers, key),
      } as AssistantQuestion;
    })
    .filter((q) => q.text || q.answers.length);
}

export function resolveStartKey(
  config: Record<string, unknown>,
  questions: AssistantQuestion[]
): string {
  const configured = localizedString(config.bca_start_key as string)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
  if (configured && questions.some((q) => q.key === configured)) return configured;
  return questions[0]?.key ?? '';
}

export function findQuestion(
  questions: AssistantQuestion[],
  key: string
): AssistantQuestion | null {
  return questions.find((q) => q.key === key) ?? null;
}

/** An answer is terminal when it points to no valid next question. */
export function isTerminal(
  answer: AssistantAnswer,
  questions: AssistantQuestion[]
): boolean {
  if (!answer.next) return true;
  return !questions.some((q) => q.key === answer.next);
}

export function resolveStyle(config: Record<string, unknown>): AssistantStyle {
  const val = getRadioValue(config.bca_style, 'chat');
  if (val === 'expert' || val === 'mirror' || val === 'cards') return val;
  return 'chat';
}
