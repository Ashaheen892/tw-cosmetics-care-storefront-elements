import {
  getRadioValue,
  normalizeCollection,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type {
  DateFormat,
  ExpiryResult,
  ExpiryState,
  InputMode,
  PaoCategory,
  PaoOption,
} from './types.js';

const DAY_MS = 86_400_000;

/** Add whole months, clamping the day to the target month's length (handles day 31 → shorter months). */
export function addMonths(date: Date, months: number): Date {
  const d = new Date(date.getTime());
  const day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + months);
  const daysInTarget = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, daysInTarget));
  return d;
}

function startOfDay(date: Date): Date {
  const d = new Date(date.getTime());
  d.setHours(0, 0, 0, 0);
  return d;
}

export function parseDateInput(value: string): Date | null {
  if (!value) return null;
  const parts = value.split('-').map(Number);
  if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) return null;
  const [y, m, d] = parts;
  const date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime()) ? null : startOfDay(date);
}

export function toInputValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function computeExpiry(open: Date, months: number, warnDays: number): ExpiryResult {
  const today = startOfDay(new Date());
  const expiry = addMonths(open, months);
  const totalDays = Math.max(1, Math.round((expiry.getTime() - open.getTime()) / DAY_MS));
  const daysRemaining = Math.round((expiry.getTime() - today.getTime()) / DAY_MS);
  const elapsed = Math.round((today.getTime() - open.getTime()) / DAY_MS);
  const elapsedRatio = Math.max(0, Math.min(1, elapsed / totalDays));

  let state: ExpiryState = 'safe';
  if (daysRemaining <= 0) state = 'expired';
  else if (daysRemaining <= warnDays) state = 'warn';

  return { expiry, daysRemaining, totalDays, elapsedRatio, state };
}

export function formatDate(date: Date, fmt: DateFormat, locale: 'ar' | 'en'): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  if (fmt === 'short') return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
  if (fmt === 'iso') return toInputValue(date);
  try {
    return new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'ar', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return toInputValue(date);
  }
}

export function parseCategories(raw: unknown): PaoCategory[] {
  return normalizeCollection(raw)
    .map((c, i) => ({
      id: String(c.cat_id ?? '').trim() || `cat-${i + 1}`,
      name: localizedString(c.name as LocaleValue),
      icon: String(c.icon ?? '').trim(),
      paoMonths: Math.max(0, toNumber(c.pao_months, 0)),
    }))
    .filter((c) => c.name);
}

export function parsePaoOptions(raw: unknown): PaoOption[] {
  const list = normalizeCollection(raw)
    .map((o) => ({
      months: Math.max(1, toNumber(o.months, 0)),
      label: localizedString(o.label as LocaleValue),
    }))
    .filter((o) => o.months > 0);
  return list;
}

export function resolveInputMode(config: Record<string, unknown>): InputMode {
  return getRadioValue(config.bpa_input_mode, 'direct') === 'category' ? 'category' : 'direct';
}

export function resolveDateFormat(config: Record<string, unknown>): DateFormat {
  const value = getRadioValue(config.bpa_date_format, 'long') as DateFormat;
  return (['long', 'short', 'iso'] as DateFormat[]).includes(value) ? value : 'long';
}

export function paoOptionLabel(option: PaoOption, locale: 'ar' | 'en'): string {
  if (option.label) return option.label;
  return locale === 'en' ? `${option.months} months` : `${option.months} شهرًا`;
}

/** Build a minimal all-day iCalendar event (no external service). */
export function buildIcs(title: string, date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const stamp = (d: Date) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const end = new Date(date.getTime() + DAY_MS);
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//beauty-pao-calculator//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@beauty-pao`,
    `DTSTART;VALUE=DATE:${stamp(date)}`,
    `DTEND;VALUE=DATE:${stamp(end)}`,
    `SUMMARY:${title.replace(/\r?\n/g, ' ')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
