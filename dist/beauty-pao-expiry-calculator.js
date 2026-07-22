var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { g as getRadioValue, n as normalizeCollection, j as toNumber, l as localizedString, s as sharedSectionCss, k as safeStorageGet, o as getPageLocale, m as safeStorageSet, t, i as isTruthy, r as readSectionTheme, a as themeStyleMap } from "./sharedStyles-Bu7Tok5Z.js";
import { r as renderCommerceCtaButton } from "./commerceOutcome-BLJKzvei.js";
const componentStyles = css`
  .bpa-shell {
    display: grid;
    gap: 1.35rem;
    align-items: start;
    max-width: 1080px;
    margin-inline: auto;
  }

  @media (min-width: 900px) {
    .bpa-shell {
      grid-template-columns: minmax(260px, 0.92fr) minmax(0, 1.18fr);
      gap: 1.75rem;
    }
  }

  /* —— Form card —— */
  .bpa-form-card {
    min-width: 0;
    padding: 1.15rem 1.15rem 1.25rem;
    border-radius: var(--section-radius, 20px);
    background: color-mix(in srgb, var(--card-bg, #fff) 90%, var(--section-bg, transparent));
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    box-shadow: 0 10px 28px rgba(120, 44, 82, 0.06);
  }

  .bpa-form-card__title {
    margin: 0 0 0.25rem;
    font-size: 1rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .bpa-form-card__hint {
    margin: 0 0 1rem;
    font-size: 0.8rem;
    line-height: 1.55;
    color: var(--muted-color, #666666);
  }

  .bpa-form {
    display: grid;
    gap: 1rem;
  }

  .bpa-field {
    display: grid;
    gap: 0.45rem;
  }

  .bpa-field label {
    font-size: 0.82rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .bpa-input,
  .bpa-select {
    width: 100%;
    min-height: 46px;
    padding: 0.65rem 0.8rem;
    border-radius: 14px;
    border: 1.5px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .bpa-input:focus,
  .bpa-select:focus {
    outline: none;
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 55%, var(--border-color, #e5e7eb));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, transparent);
  }

  .bpa-cat-chips,
  .bpa-pao-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .bpa-cat-chip,
  .bpa-pao-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    min-height: 44px;
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    border: 1.5px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 700;
    font-size: 0.82rem;
    cursor: pointer;
    transition:
      transform 0.15s ease,
      border-color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;
  }

  .bpa-cat-chip:hover,
  .bpa-pao-chip:hover {
    transform: translateY(-1px);
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
  }

  .bpa-cat-chip.is-active,
  .bpa-pao-chip.is-active {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    border-color: transparent;
    color: #fff;
    box-shadow: 0 8px 18px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
  }

  .bpa-cat-chip__icon {
    font-size: 0.95rem;
    line-height: 1;
  }

  .bpa-cat-chip__months {
    font-size: 0.7rem;
    font-weight: 700;
    opacity: 0.85;
  }

  /* —— Result hero —— */
  .bpa-hero {
    min-width: 0;
    background: var(--card-bg, #fff);
    border: 1.5px solid color-mix(in srgb, var(--bpa-color, var(--accent-color, var(--fs-store-primary))) 28%, var(--border-color, #e5e7eb));
    border-radius: var(--section-radius, 20px);
    padding: 1.45rem 1.25rem 1.35rem;
    text-align: center;
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--bpa-color, var(--accent-color, var(--fs-store-primary))) 12%, transparent),
      0 16px 36px rgba(120, 44, 82, 0.09);
  }

  .bpa-hero--safe {
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--bpa-color, #2f9e63) 14%, var(--card-bg, #fff)) 0%,
      var(--card-bg, #fff) 58%
    );
  }

  .bpa-hero--warn {
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--bpa-color, #e0a100) 16%, var(--card-bg, #fff)) 0%,
      var(--card-bg, #fff) 58%
    );
  }

  .bpa-hero--expired {
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--bpa-color, #cf4b4b) 16%, var(--card-bg, #fff)) 0%,
      var(--card-bg, #fff) 58%
    );
  }

  .bpa-hero--empty {
    border-style: dashed;
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, var(--border-color, #e5e7eb));
    box-shadow: none;
    background:
      radial-gradient(
        80% 70% at 50% 0%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent),
        transparent 70%
      ),
      color-mix(in srgb, var(--section-bg, transparent) 55%, var(--card-bg, #fff));
  }

  .bpa-hero__placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;
    padding: 2.4rem 1rem;
    color: var(--muted-color, #666666);
    font-size: 0.92rem;
    line-height: 1.65;
  }

  .bpa-hero__placeholder p {
    margin: 0;
    max-width: 22rem;
  }

  .bpa-hero__placeholder-icon {
    width: 3.5rem;
    height: 3.5rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 1.55rem;
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    border: 1px dashed color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, transparent);
  }

  .bpa-error {
    padding: 0.85rem 1rem;
    border-radius: 14px;
    background: color-mix(in srgb, #cf4b4b 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, #cf4b4b 35%, transparent);
    color: color-mix(in srgb, #cf4b4b 80%, #000);
    font-size: 0.88rem;
    font-weight: 600;
    line-height: 1.55;
  }

  .bpa-dial {
    position: relative;
    width: min(240px, 70vw);
    height: min(240px, 70vw);
    margin: 0.35rem auto 1.25rem;
    filter: drop-shadow(0 10px 24px color-mix(in srgb, var(--bpa-color, var(--accent-color, var(--fs-store-primary))) 18%, transparent));
  }

  .bpa-dial svg {
    transform: rotate(-90deg);
    width: 100%;
    height: 100%;
  }

  .bpa-dial__disc {
    fill: color-mix(in srgb, var(--bpa-color, var(--accent-color, var(--fs-store-primary))) 7%, var(--card-bg, #fff));
    stroke: color-mix(in srgb, var(--bpa-color, var(--accent-color, var(--fs-store-primary))) 14%, transparent);
    stroke-width: 1;
  }

  .bpa-dial__track {
    fill: none;
    stroke: color-mix(in srgb, var(--bpa-color, var(--border-color, #e5e7eb)) 14%, var(--border-color, #e5e7eb));
    stroke-width: 14;
    opacity: 0.55;
  }

  .bpa-dial__value {
    fill: none;
    stroke: var(--bpa-color, var(--accent-color, var(--fs-store-primary)));
    stroke-width: 14;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.65s ease, stroke 0.3s ease;
  }

  .bpa-dial__center {
    position: absolute;
    inset: 0;
    display: grid;
    place-content: center;
    justify-items: center;
    row-gap: 0.15rem;
    text-align: center;
    padding: 1.4rem;
  }

  .bpa-dial__days {
    font-size: clamp(2.5rem, 8vw, 3.4rem);
    font-weight: 800;
    line-height: 1;
    color: var(--bpa-color, var(--text-color, #33232e));
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }

  .bpa-dial__unit {
    font-size: 0.86rem;
    color: var(--text-color, #000000);
    font-weight: 800;
  }

  .bpa-dial__ratio {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--bpa-color, var(--muted-color, #8f7a86));
    padding: 0.18rem 0.6rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--bpa-color, var(--accent-color, var(--fs-store-primary))) 12%, var(--card-bg, #fff));
    margin-top: 0.25rem;
  }

  .bpa-state {
    display: inline-block;
    padding: 0.45rem 1.1rem;
    border-radius: 999px;
    font-weight: 800;
    font-size: 0.9rem;
    margin-bottom: 1.1rem;
    background: color-mix(in srgb, var(--bpa-color, var(--accent-color, var(--fs-store-primary))) 16%, var(--card-bg, #fff));
    color: var(--bpa-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--bpa-color, var(--accent-color, var(--fs-store-primary))) 22%, transparent);
  }

  .bpa-dates {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.55rem;
    margin: 0 0 1.05rem;
    text-align: start;
  }

  .bpa-date-cell {
    padding: 0.75rem 0.65rem;
    border-radius: 14px;
    background: color-mix(in srgb, var(--bpa-color, var(--accent-color, var(--fs-store-primary))) 6%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--bpa-color, var(--border-color, #e5e7eb)) 18%, var(--border-color, #e5e7eb));
  }

  .bpa-date-cell span {
    display: block;
    font-size: 0.7rem;
    color: var(--muted-color, #666666);
    margin-bottom: 0.25rem;
    font-weight: 700;
  }

  .bpa-date-cell b {
    font-size: 0.84rem;
    color: var(--text-color, #000000);
    font-weight: 800;
    line-height: 1.35;
  }

  .bpa-tips-grid {
    display: grid;
    gap: 0.55rem;
    margin-bottom: 0.9rem;
    text-align: start;
  }

  @media (min-width: 560px) {
    .bpa-tips-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .bpa-tips {
    padding: 0.8rem 0.9rem;
    border-radius: 14px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 7%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, var(--border-color, #e5e7eb));
    font-size: 0.84rem;
    line-height: 1.6;
    color: var(--text-color, #000000);
  }

  .bpa-tips h4 {
    margin: 0 0 0.35rem;
    font-size: 0.76rem;
    font-weight: 800;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bpa-tips p {
    margin: 0;
    color: var(--muted-color, #666666);
    white-space: pre-line;
  }

  .bpa-result-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    justify-content: center;
    margin-top: 0.15rem;
  }

  .bpa-notice {
    max-width: 1080px;
    margin: 1.25rem auto 0;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
    line-height: 1.65;
    text-align: center;
  }

  /* —— Saved records —— */
  .bpa-saved {
    max-width: 1080px;
    margin: 1.6rem auto 0;
    padding: 1.15rem;
    border-radius: var(--section-radius, 20px);
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    box-shadow: 0 10px 28px rgba(120, 44, 82, 0.05);
  }

  .bpa-saved__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.65rem;
    margin-bottom: 0.45rem;
  }

  .bpa-saved__title {
    margin: 0;
    font-size: 1rem;
    font-weight: 800;
  }

  .bpa-saved__note {
    font-size: 0.76rem;
    color: var(--muted-color, #666666);
    margin: 0 0 0.9rem;
    line-height: 1.55;
  }

  .bpa-saved__empty {
    padding: 1.4rem 1rem;
    text-align: center;
    border-radius: 14px;
    border: 1px dashed color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, var(--border-color, #e5e7eb));
    background: color-mix(in srgb, var(--section-bg, transparent) 55%, var(--card-bg, #fff));
    color: var(--muted-color, #666666);
    font-size: 0.88rem;
  }

  .bpa-records {
    display: grid;
    gap: 0.65rem;
  }

  .bpa-record {
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
    padding: 0.9rem 0.95rem;
    border: 1px solid color-mix(in srgb, var(--rec-color, var(--border-color, #e5e7eb)) 32%, var(--border-color, #e5e7eb));
    border-inline-start: 4px solid var(--rec-color, var(--border-color, #e5e7eb));
    border-radius: 16px;
    background: color-mix(in srgb, var(--rec-color, transparent) 4%, var(--card-bg, #fff));
    box-shadow: 0 4px 14px rgba(43, 33, 28, 0.04);
  }

  .bpa-record__status {
    position: relative;
    flex: 0 0 auto;
    width: 2.9rem;
    height: 2.9rem;
    display: grid;
    place-items: center;
  }

  .bpa-record__ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 3px solid color-mix(in srgb, var(--rec-color, var(--border-color, #e5e7eb)) 32%, transparent);
    background: color-mix(in srgb, var(--rec-color, var(--border-color, #e5e7eb)) 12%, var(--card-bg, #fff));
  }

  .bpa-record__days {
    position: relative;
    font-size: 0.74rem;
    font-weight: 800;
    color: var(--rec-color, var(--text-color, #33232e));
    line-height: 1;
  }

  .bpa-record__body {
    flex: 1 1 auto;
    min-width: 0;
  }

  .bpa-record__name {
    font-weight: 800;
    font-size: 0.92rem;
    color: var(--text-color, #000000);
    margin-bottom: 0.3rem;
  }

  .bpa-record__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem 0.5rem;
    font-size: 0.74rem;
    color: var(--muted-color, #666666);
  }

  .bpa-record__pill {
    display: inline-block;
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    font-size: 0.68rem;
    font-weight: 800;
    background: color-mix(in srgb, var(--rec-color, var(--border-color, #e5e7eb)) 16%, var(--card-bg, #fff));
    color: var(--rec-color, var(--text-color, #33232e));
  }

  .bpa-record__note {
    margin: 0.4rem 0 0;
    font-size: 0.76rem;
    color: var(--muted-color, #666666);
    line-height: 1.45;
  }

  .bpa-record__actions {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    flex: 0 0 auto;
  }

  .bpa-record__edit {
    width: 100%;
    min-height: 40px;
    padding: 0.4rem 0.55rem;
    border-radius: 10px;
    border: 1.5px solid var(--border-color, #e5e7eb);
    font: inherit;
    box-sizing: border-box;
  }

  .bpa-icon-btn {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--muted-color, #666666);
    cursor: pointer;
    flex: 0 0 auto;
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .bpa-icon-btn:hover {
    color: var(--accent-color, var(--fs-store-primary));
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
  }

  @media (max-width: 639px) {
    .bpa-dates {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bpa-dial__value,
    .bpa-cat-chip,
    .bpa-pao-chip {
      transition: none !important;
    }
  }
`, DAY_MS = 864e5;
function addMonths(date, months) {
  const d = new Date(date.getTime()), day = d.getDate();
  d.setDate(1), d.setMonth(d.getMonth() + months);
  const daysInTarget = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  return d.setDate(Math.min(day, daysInTarget)), d;
}
__name(addMonths, "addMonths");
function startOfDay(date) {
  const d = new Date(date.getTime());
  return d.setHours(0, 0, 0, 0), d;
}
__name(startOfDay, "startOfDay");
function parseDateInput(value) {
  if (!value) return null;
  const parts = value.split("-").map(Number);
  if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) return null;
  const [y, m, d] = parts, date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime()) ? null : startOfDay(date);
}
__name(parseDateInput, "parseDateInput");
function toInputValue(date) {
  const pad = /* @__PURE__ */ __name((n) => String(n).padStart(2, "0"), "pad");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
__name(toInputValue, "toInputValue");
function computeExpiry(open, months, warnDays) {
  const today = startOfDay(/* @__PURE__ */ new Date()), expiry = addMonths(open, months), totalDays = Math.max(1, Math.round((expiry.getTime() - open.getTime()) / DAY_MS)), daysRemaining = Math.round((expiry.getTime() - today.getTime()) / DAY_MS), elapsed = Math.round((today.getTime() - open.getTime()) / DAY_MS), elapsedRatio = Math.max(0, Math.min(1, elapsed / totalDays));
  let state2 = "safe";
  return daysRemaining <= 0 ? state2 = "expired" : daysRemaining <= warnDays && (state2 = "warn"), { expiry, daysRemaining, totalDays, elapsedRatio, state: state2 };
}
__name(computeExpiry, "computeExpiry");
function formatDate(date, fmt, locale) {
  const pad = /* @__PURE__ */ __name((n) => String(n).padStart(2, "0"), "pad");
  if (fmt === "short") return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
  if (fmt === "iso") return toInputValue(date);
  try {
    return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "ar", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  } catch {
    return toInputValue(date);
  }
}
__name(formatDate, "formatDate");
function parseCategories(raw) {
  return normalizeCollection(raw).map((c, i) => ({
    id: String(c.id ?? c.cat_id ?? "").trim() || `cat-${i + 1}`,
    name: localizedString(c.name),
    icon: String(c.icon ?? "").trim(),
    paoMonths: Math.max(0, toNumber(c.pao_months, 0))
  })).filter((c) => c.name);
}
__name(parseCategories, "parseCategories");
function parsePaoOptions(raw) {
  return normalizeCollection(raw).map((o) => ({
    months: Math.max(1, toNumber(o.months, 0)),
    label: localizedString(o.label)
  })).filter((o) => o.months > 0);
}
__name(parsePaoOptions, "parsePaoOptions");
function resolveInputMode(config) {
  return getRadioValue(config.bpa_input_mode, "direct") === "category" ? "category" : "direct";
}
__name(resolveInputMode, "resolveInputMode");
function resolveDateFormat(config) {
  const value = getRadioValue(config.bpa_date_format, "long");
  return ["long", "short", "iso"].includes(value) ? value : "long";
}
__name(resolveDateFormat, "resolveDateFormat");
function paoOptionLabel(option, locale) {
  return option.label ? option.label : locale === "en" ? `${option.months} months` : `${option.months} شهرًا`;
}
__name(paoOptionLabel, "paoOptionLabel");
function buildIcs(title, date) {
  const pad = /* @__PURE__ */ __name((n) => String(n).padStart(2, "0"), "pad"), stamp = /* @__PURE__ */ __name((d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`, "stamp"), end = new Date(date.getTime() + DAY_MS);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//beauty-pao-calculator//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@beauty-pao`,
    `DTSTART;VALUE=DATE:${stamp(date)}`,
    `DTEND;VALUE=DATE:${stamp(end)}`,
    `SUMMARY:${title.replace(/\r?\n/g, " ")}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join(`\r
`);
}
__name(buildIcs, "buildIcs");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const STORAGE_KEY = "tw-beauty-pao-records", _BeautyPaoExpiryCalculator = class _BeautyPaoExpiryCalculator extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.catId = "", this.pao = 0, this.openDate = "", this.recName = "", this.note = "", this.records = [], this.editingId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.records = safeStorageGet(STORAGE_KEY, []), this.openDate = toInputValue(/* @__PURE__ */ new Date());
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    var _a;
    changed.has("config") && !this.pao && (this.pao = Math.max(0, toNumber((_a = this.config) == null ? void 0 : _a.bpa_default_pao, 0)));
  }
  get locale() {
    return getPageLocale() === "en" ? "en" : "ar";
  }
  persist() {
    safeStorageSet(STORAGE_KEY, this.records);
  }
  onCategory(id, months) {
    this.catId = id, months > 0 && (this.pao = months);
  }
  saveRecord() {
    var _a;
    if (!parseDateInput(this.openDate) || this.pao <= 0) return;
    const max = Math.max(1, toNumber((_a = this.config) == null ? void 0 : _a.bpa_max_records, 12));
    if (this.records.length >= max) return;
    const record = {
      id: `rec-${Date.now()}`,
      name: this.recName.trim() || (this.locale === "en" ? "Product" : "منتج"),
      category: this.catId,
      open: this.openDate,
      pao: this.pao,
      note: this.note.trim()
    };
    this.records = [record, ...this.records], this.persist(), this.recName = "", this.note = "";
  }
  deleteRecord(id) {
    this.records = this.records.filter((r) => r.id !== id), this.persist();
  }
  clearRecords() {
    this.records = [], this.persist();
  }
  renameRecord(id, name) {
    this.records = this.records.map((r) => r.id === id ? { ...r, name: name.trim() || r.name } : r), this.persist();
  }
  downloadIcs(title, expiry) {
    const ics = buildIcs(title, expiry), blob = new Blob([ics], { type: "text/calendar;charset=utf-8" }), url = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = url, a.download = "beauty-pao.ics", document.body.appendChild(a), a.click(), document.body.removeChild(a), setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  stateColor(state2) {
    const c = this.config || {};
    return String(state2 === "expired" ? c.bpa_expired_color ?? "#cf4b4b" : state2 === "warn" ? c.bpa_warn_color ?? "#e0a100" : c.bpa_safe_color ?? "#2f9e63");
  }
  stateLabel(state2, days) {
    const c = this.config || {};
    return state2 === "expired" ? localizedString(c.bpa_state_expired) || t("انتهت المدة التقريبية", "Approximate period ended") : state2 === "warn" ? localizedString(c.bpa_state_warn) || t(`قرب الانتهاء — باقٍ ${days} يومًا`, `Ending soon — ${days} days left`) : localizedString(c.bpa_state_safe) || t(`صالح للاستخدام — باقٍ ${days} يومًا`, `Good to use — ${days} days left`);
  }
  renderResult() {
    const c = this.config || {}, open = parseDateInput(this.openDate);
    if (!open || this.pao <= 0)
      return html`<div class="bpa-hero bpa-hero--empty" role="status">
        <div class="bpa-hero__placeholder">
          <span class="bpa-hero__placeholder-icon" aria-hidden="true">◷</span>
          <p>
            ${t(
        "اختاري مدة الاستخدام بعد الفتح وتاريخ فتح العبوة لعرض النتيجة فورًا.",
        "Choose the period after opening and the open date to see the result instantly."
      )}
          </p>
        </div>
      </div>`;
    const today = /* @__PURE__ */ new Date();
    if (today.setHours(0, 0, 0, 0), open.getTime() > today.getTime())
      return html`<div class="bpa-hero bpa-hero--empty" role="alert">
        <div class="bpa-error">
          ${t("تاريخ الفتح في المستقبل. اختاري تاريخًا صحيحًا.", "The open date is in the future. Please pick a valid date.")}
        </div>
      </div>`;
    const warnDays = Math.max(1, toNumber(c.bpa_warn_days, 30)), result = computeExpiry(open, this.pao, warnDays), fmt = resolveDateFormat(c), color = this.stateColor(result.state), r = 92, circ = 2 * Math.PI * r, remainingRatio = result.state === "expired" ? 0 : Math.max(0, Math.min(1, result.daysRemaining / Math.max(1, result.totalDays))), offset = circ * (1 - remainingRatio), enableCalendar = isTruthy(c.bpa_enable_calendar, !0), storageTips = localizedString(c.bpa_storage_tips), stopSignals = localizedString(c.bpa_stop_signals), calTitle = t("انتهاء صلاحية منتج التجميل", "Beauty product expiry"), daysAbs = Math.abs(result.daysRemaining);
    return html`<div
      class="bpa-hero bpa-hero--${result.state}"
      style=${styleMap({ "--bpa-color": color })}
    >
      <div
        class="bpa-dial"
        role="img"
        aria-label=${this.stateLabel(result.state, Math.max(0, result.daysRemaining))}
      >
        <svg viewBox="0 0 210 210" aria-hidden="true">
          <circle class="bpa-dial__disc" cx="105" cy="105" r="80"></circle>
          <circle class="bpa-dial__track" cx="105" cy="105" r=${r}></circle>
          <circle
            class="bpa-dial__value"
            cx="105"
            cy="105"
            r=${r}
            style=${styleMap({ strokeDasharray: `${circ}`, strokeDashoffset: `${offset}` })}
          ></circle>
        </svg>
        <div class="bpa-dial__center">
          <div class="bpa-dial__days">${daysAbs}</div>
          <div class="bpa-dial__unit">
            ${result.daysRemaining >= 0 ? t("يوم متبقٍ", "days left") : t("يوم مضى", "days over")}
          </div>
          ${result.state !== "expired" ? html`<div class="bpa-dial__ratio">
                ${t(`${Math.round(remainingRatio * 100)}٪ من المدة`, `${Math.round(remainingRatio * 100)}% of period`)}
              </div>` : nothing}
        </div>
      </div>

      <span class="bpa-state bpa-state--${result.state}">${this.stateLabel(result.state, Math.max(0, result.daysRemaining))}</span>

      <div class="bpa-dates">
        <div class="bpa-date-cell">
          <span>${t("تاريخ الفتح", "Opened")}</span>
          <b>${formatDate(open, fmt, this.locale)}</b>
        </div>
        <div class="bpa-date-cell">
          <span>${t("المدة", "Period")}</span>
          <b>${t(`${this.pao} شهرًا`, `${this.pao} months`)}</b>
        </div>
        <div class="bpa-date-cell">
          <span>${t("ينتهي تقريبًا", "Approx. end")}</span>
          <b>${formatDate(result.expiry, fmt, this.locale)}</b>
        </div>
      </div>

      ${storageTips || stopSignals ? html`<div class="bpa-tips-grid">
            ${storageTips ? html`<div class="bpa-tips"><h4>${t("نصائح الحفظ", "Storage tips")}</h4><p>${storageTips}</p></div>` : nothing}
            ${stopSignals ? html`<div class="bpa-tips"><h4>${t("متى تتوقفين", "When to stop")}</h4><p>${stopSignals}</p></div>` : nothing}
          </div>` : nothing}

      <div class="bpa-result-actions">
        ${enableCalendar ? html`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.downloadIcs(calTitle, result.expiry)}>
              ${t("إضافة إلى التقويم", "Add to calendar")}
            </button>` : nothing}
        ${isTruthy(c.bpa_enable_storage, !0) ? html`<button type="button" class="fs-btn" @click=${() => this.saveRecord()}>${t("حفظ هذه العبوة", "Save this product")}</button>` : nothing}
        ${renderCommerceCtaButton(c, "bpa_")}
      </div>
    </div>`;
  }
  renderSaved() {
    const c = this.config || {};
    if (!isTruthy(c.bpa_enable_storage, !0)) return nothing;
    const fmt = resolveDateFormat(c), warnDays = Math.max(1, toNumber(c.bpa_warn_days, 30));
    return html`<div class="bpa-saved">
      <div class="bpa-saved__head">
        <h3 class="bpa-saved__title">${t("عبواتي المحفوظة", "My saved products")}</h3>
        ${this.records.length ? html`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.clearRecords()}>${t("مسح الكل", "Clear all")}</button>` : nothing}
      </div>
      <p class="bpa-saved__note">${t("البيانات محفوظة على جهازك فقط ولا تُرسل إلى أي خادم.", "Data is stored on your device only and never sent to any server.")}</p>
      ${this.records.length ? html`<div class="bpa-records">
            ${this.records.map((rec) => {
      const open = parseDateInput(rec.open), res = open ? computeExpiry(open, rec.pao, warnDays) : null, color = res ? this.stateColor(res.state) : "var(--muted-color)", stateClass = (res == null ? void 0 : res.state) ?? "unknown", daysLabel = res ? res.daysRemaining >= 0 ? t(`${res.daysRemaining} يوم`, `${res.daysRemaining} days`) : t(`منتهٍ ${Math.abs(res.daysRemaining)} يوم`, `Expired ${Math.abs(res.daysRemaining)}d ago`) : "";
      return html`<article
                class="bpa-record bpa-record--${stateClass}"
                style=${styleMap({ "--rec-color": color })}
              >
                <div class="bpa-record__status" aria-hidden="true">
                  <span class="bpa-record__ring"></span>
                  ${res ? html`<span class="bpa-record__days">${Math.abs(res.daysRemaining)}</span>` : nothing}
                </div>
                <div class="bpa-record__body">
                  ${this.editingId === rec.id ? html`<input
                        class="bpa-record__edit"
                        .value=${rec.name}
                        aria-label=${t("اسم العبوة", "Product name")}
                        @change=${(e) => {
        this.renameRecord(rec.id, e.target.value), this.editingId = "";
      }}
                      />` : html`<div class="bpa-record__name">${rec.name}</div>`}
                  <div class="bpa-record__meta">
                    ${res && open ? html`<span class="bpa-record__pill bpa-record__pill--${stateClass}">
                          ${res.state === "expired" ? t("منتهٍ", "Expired") : res.state === "warn" ? t("قرب الانتهاء", "Ending soon") : t("صالح", "Good")}
                        </span>` : nothing}
                    ${daysLabel ? html`<span>${daysLabel}</span>` : nothing}
                    ${res && open ? html`<span>· ${t("ينتهي", "Ends")} ${formatDate(res.expiry, fmt, this.locale)}</span>` : nothing}
                  </div>
                  ${rec.note ? html`<p class="bpa-record__note">${rec.note}</p>` : nothing}
                </div>
                <div class="bpa-record__actions">
                  <button type="button" class="bpa-icon-btn" aria-label=${t("تعديل الاسم", "Rename")} @click=${() => this.editingId = this.editingId === rec.id ? "" : rec.id}>✎</button>
                  <button type="button" class="bpa-icon-btn" aria-label=${t("حذف", "Delete")} @click=${() => this.deleteRecord(rec.id)}>🗑</button>
                </div>
              </article>`;
    })}
          </div>` : html`<div class="bpa-saved__empty">${t("لا توجد عبوات محفوظة بعد.", "No saved products yet.")}</div>`}
    </div>`;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bpa_"), title = localizedString(c.bpa_title), desc = localizedString(c.bpa_desc), inputMode = resolveInputMode(c), categories = parseCategories(c.bpa_categories), paoOptions = parsePaoOptions(c.bpa_pao_options), notice = localizedString(c.bpa_notice) || t(
      "النتيجة تقديرية وتعتمد على تاريخ الفتح والمدة المكتوبة على العبوة. اتبعي تعليمات الشركة المصنّعة وتوقّفي عن الاستخدام عند تغيّر الرائحة أو اللون أو القوام.",
      "The result is approximate and based on the open date and the period printed on the packaging. Follow the manufacturer instructions and stop using if the smell, color or texture changes."
    ), showCategories = inputMode === "category" && categories.length > 0;
    return html`
      <section
        class="fs-section"
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("حاسبة مدة الاستخدام بعد الفتح", "PAO & expiry calculator")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="bpa-shell">
            <aside class="bpa-form-card">
              <h3 class="bpa-form-card__title">${t("احسبي المدة", "Calculate the period")}</h3>
              <p class="bpa-form-card__hint">
                ${t(
      "اختاري الفئة أو المدة، ثم حدّدي تاريخ فتح العبوة.",
      "Pick a category or period, then set the open date."
    )}
              </p>

              <div class="bpa-form">
                ${showCategories ? html`<div class="bpa-field">
                      <label>${t("فئة المستحضر", "Product category")}</label>
                      <div class="bpa-cat-chips" role="group" aria-label=${t("فئات المستحضرات", "Product categories")}>
                        ${categories.map((cat) => {
      const active = cat.id === this.catId, isSicon = cat.icon.startsWith("sicon-");
      return html`<button
                            type="button"
                            class=${`bpa-cat-chip${active ? " is-active" : ""}`}
                            aria-pressed=${active ? "true" : "false"}
                            @click=${() => this.onCategory(cat.id, cat.paoMonths)}
                          >
                            ${cat.icon ? html`<span class="bpa-cat-chip__icon" aria-hidden="true">
                                  ${isSicon ? html`<span class=${cat.icon}></span>` : cat.icon}
                                </span>` : nothing}
                            <span>${cat.name}</span>
                            ${cat.paoMonths ? html`<span class="bpa-cat-chip__months"
                                  >${this.locale === "en" ? `${cat.paoMonths}M` : `${cat.paoMonths} شهر`}</span
                                >` : nothing}
                          </button>`;
    })}
                      </div>
                    </div>` : nothing}

                <div class="bpa-field">
                  <label>${t("مدة الاستخدام بعد الفتح", "Period after opening")}</label>
                  ${paoOptions.length ? html`<div class="bpa-pao-chips" role="group" aria-label=${t("مدد الاستخدام", "Use periods")}>
                        ${paoOptions.map(
      (opt) => html`<button
                            type="button"
                            class=${`bpa-pao-chip${this.pao === opt.months ? " is-active" : ""}`}
                            aria-pressed=${this.pao === opt.months ? "true" : "false"}
                            @click=${() => this.pao = opt.months}
                          >
                            ${paoOptionLabel(opt, this.locale)}
                          </button>`
    )}
                      </div>` : html`<input
                        class="bpa-input"
                        type="number"
                        min="1"
                        max="60"
                        .value=${this.pao ? String(this.pao) : ""}
                        placeholder=${t("عدد الأشهر", "Number of months")}
                        @input=${(e) => this.pao = Math.max(0, toNumber(e.target.value, 0))}
                      />`}
                </div>

                <div class="bpa-field">
                  <label for="bpa-open">${t("تاريخ فتح العبوة", "Open date")}</label>
                  <input
                    id="bpa-open"
                    class="bpa-input"
                    type="date"
                    max=${toInputValue(/* @__PURE__ */ new Date())}
                    .value=${this.openDate}
                    @input=${(e) => this.openDate = e.target.value}
                  />
                </div>

                ${isTruthy(c.bpa_enable_name, !0) ? html`<div class="bpa-field">
                      <label for="bpa-name">${t("اسم العبوة (اختياري)", "Product name (optional)")}</label>
                      <input
                        id="bpa-name"
                        class="bpa-input"
                        .value=${this.recName}
                        placeholder=${t("مثال: سيروم فيتامين C", "e.g. Vitamin C serum")}
                        @input=${(e) => this.recName = e.target.value}
                      />
                    </div>` : nothing}

                ${isTruthy(c.bpa_enable_note, !1) ? html`<div class="bpa-field">
                      <label for="bpa-note">${t("ملاحظة (اختياري)", "Note (optional)")}</label>
                      <input
                        id="bpa-note"
                        class="bpa-input"
                        .value=${this.note}
                        @input=${(e) => this.note = e.target.value}
                      />
                    </div>` : nothing}
              </div>
            </aside>

            ${this.renderResult()}
          </div>

          ${this.renderSaved()}

          <p class="bpa-notice">${notice}</p>
        </div>
      </section>
    `;
  }
};
__name(_BeautyPaoExpiryCalculator, "BeautyPaoExpiryCalculator"), _BeautyPaoExpiryCalculator.styles = [sharedSectionCss, componentStyles];
let BeautyPaoExpiryCalculator = _BeautyPaoExpiryCalculator;
__decorateClass([
  property({ type: Object })
], BeautyPaoExpiryCalculator.prototype, "config");
__decorateClass([
  state()
], BeautyPaoExpiryCalculator.prototype, "catId");
__decorateClass([
  state()
], BeautyPaoExpiryCalculator.prototype, "pao");
__decorateClass([
  state()
], BeautyPaoExpiryCalculator.prototype, "openDate");
__decorateClass([
  state()
], BeautyPaoExpiryCalculator.prototype, "recName");
__decorateClass([
  state()
], BeautyPaoExpiryCalculator.prototype, "note");
__decorateClass([
  state()
], BeautyPaoExpiryCalculator.prototype, "records");
__decorateClass([
  state()
], BeautyPaoExpiryCalculator.prototype, "editingId");
typeof BeautyPaoExpiryCalculator < "u" && BeautyPaoExpiryCalculator.registerSallaComponent("salla-beauty-pao-expiry-calculator");
export {
  BeautyPaoExpiryCalculator as default
};
