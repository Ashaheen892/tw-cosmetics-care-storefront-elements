import {
  extractImageUrl,
  extractLink,
  getRadioValue,
  normalizeCollection,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { AssistantAnswer, AssistantQuestion, AssistantStyle, TrailStep } from './types.js';

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

/** Longest path from start to any terminal answer — used for honest progress. */
export function estimateMaxDepth(
  questions: AssistantQuestion[],
  startKey: string
): number {
  if (!startKey || !questions.length) return 1;

  const byKey = new Map(questions.map((q) => [q.key, q]));
  let maxDepth = 1;

  function walk(key: string, depth: number, seen: Set<string>): void {
    const question = byKey.get(key);
    if (!question) {
      maxDepth = Math.max(maxDepth, depth);
      return;
    }
    if (seen.has(key)) {
      maxDepth = Math.max(maxDepth, depth);
      return;
    }
    const nextSeen = new Set(seen);
    nextSeen.add(key);

    let branched = false;
    for (const answer of question.answers) {
      if (isTerminal(answer, questions)) {
        maxDepth = Math.max(maxDepth, depth + 1);
        branched = true;
      } else if (answer.next) {
        branched = true;
        walk(answer.next, depth + 1, nextSeen);
      }
    }
    if (!branched) maxDepth = Math.max(maxDepth, depth);
  }

  walk(startKey, 1, new Set());
  return Math.max(maxDepth, 1);
}

/** Current depth along the answered path (1-based). */
export function currentDepth(trail: TrailStep[], hasResult: boolean): number {
  return trail.length + (hasResult ? 1 : 1);
}

/** Honest progress percentage — reaches 100% only on the result screen. */
export function computeProgress(
  trail: TrailStep[],
  hasResult: boolean,
  maxDepth: number
): number {
  if (hasResult) return 100;
  const depth = trail.length + 1;
  const cap = Math.max(maxDepth, depth);
  return Math.min(92, Math.round((depth / cap) * 100));
}
