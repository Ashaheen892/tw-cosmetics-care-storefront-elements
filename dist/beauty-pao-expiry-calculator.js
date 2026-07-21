import { css as P, LitElement as V, html as c, nothing as l } from "lit";
import { property as U, state as u } from "lit/decorators.js";
import { styleMap as y } from "lit/directives/style-map.js";
import { g as C, n as I, j as v, l as g, s as j, k as F, o as Y, m as G, t as a, i as x, r as H, a as B, b as W } from "./sharedStyles-BgfDOkwJ.js";
const q = P`
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
    background: color-mix(in srgb, var(--card-bg, #fff) 90%, var(--section-bg, #fbf5f8));
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 90%, #fff);
    box-shadow: 0 10px 28px rgba(120, 44, 82, 0.06);
  }

  .bpa-form-card__title {
    margin: 0 0 0.25rem;
    font-size: 1rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bpa-form-card__hint {
    margin: 0 0 1rem;
    font-size: 0.8rem;
    line-height: 1.55;
    color: var(--muted-color, #8f7a86);
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
    color: var(--text-color, #33232e);
  }

  .bpa-input,
  .bpa-select {
    width: 100%;
    min-height: 46px;
    padding: 0.65rem 0.8rem;
    border-radius: 14px;
    border: 1.5px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .bpa-input:focus,
  .bpa-select:focus {
    outline: none;
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 55%, var(--border-color, #f2dde7));
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
    border: 1.5px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
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
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #f2dde7));
  }

  .bpa-cat-chip.is-active,
  .bpa-pao-chip.is-active {
    background: linear-gradient(
      135deg,
      var(--accent-color, var(--fs-store-primary)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 65%, #5a2f4d)
    );
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
    border: 1.5px solid color-mix(in srgb, var(--bpa-color, var(--accent-color, var(--fs-store-primary))) 28%, var(--border-color, #f2dde7));
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
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, var(--border-color, #f2dde7));
    box-shadow: none;
    background:
      radial-gradient(
        80% 70% at 50% 0%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent),
        transparent 70%
      ),
      color-mix(in srgb, var(--section-bg, #fbf5f8) 55%, var(--card-bg, #fff));
  }

  .bpa-hero__placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;
    padding: 2.4rem 1rem;
    color: var(--muted-color, #8f7a86);
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
    stroke: color-mix(in srgb, var(--bpa-color, var(--border-color, #f2dde7)) 14%, var(--border-color, #f2dde7));
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
    color: var(--text-color, #33232e);
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
    border: 1px solid color-mix(in srgb, var(--bpa-color, var(--border-color, #f2dde7)) 18%, var(--border-color, #f2dde7));
  }

  .bpa-date-cell span {
    display: block;
    font-size: 0.7rem;
    color: var(--muted-color, #8f7a86);
    margin-bottom: 0.25rem;
    font-weight: 700;
  }

  .bpa-date-cell b {
    font-size: 0.84rem;
    color: var(--text-color, #33232e);
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
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, var(--border-color, #f2dde7));
    font-size: 0.84rem;
    line-height: 1.6;
    color: var(--text-color, #33232e);
  }

  .bpa-tips h4 {
    margin: 0 0 0.35rem;
    font-size: 0.76rem;
    font-weight: 800;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bpa-tips p {
    margin: 0;
    color: var(--muted-color, #8f7a86);
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
    color: var(--muted-color, #8f7a86);
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
    border: 1px solid color-mix(in srgb, var(--border-color, #f2dde7) 90%, #fff);
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
    color: var(--muted-color, #8f7a86);
    margin: 0 0 0.9rem;
    line-height: 1.55;
  }

  .bpa-saved__empty {
    padding: 1.4rem 1rem;
    text-align: center;
    border-radius: 14px;
    border: 1px dashed color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, var(--border-color, #f2dde7));
    background: color-mix(in srgb, var(--section-bg, #fbf5f8) 55%, var(--card-bg, #fff));
    color: var(--muted-color, #8f7a86);
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
    border: 1px solid color-mix(in srgb, var(--rec-color, var(--border-color, #f2dde7)) 32%, var(--border-color, #f2dde7));
    border-inline-start: 4px solid var(--rec-color, var(--border-color, #f2dde7));
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
    border: 3px solid color-mix(in srgb, var(--rec-color, var(--border-color, #f2dde7)) 32%, transparent);
    background: color-mix(in srgb, var(--rec-color, var(--border-color, #f2dde7)) 12%, var(--card-bg, #fff));
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
    color: var(--text-color, #33232e);
    margin-bottom: 0.3rem;
  }

  .bpa-record__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem 0.5rem;
    font-size: 0.74rem;
    color: var(--muted-color, #8f7a86);
  }

  .bpa-record__pill {
    display: inline-block;
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    font-size: 0.68rem;
    font-weight: 800;
    background: color-mix(in srgb, var(--rec-color, var(--border-color, #f2dde7)) 16%, var(--card-bg, #fff));
    color: var(--rec-color, var(--text-color, #33232e));
  }

  .bpa-record__note {
    margin: 0.4rem 0 0;
    font-size: 0.76rem;
    color: var(--muted-color, #8f7a86);
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
    border: 1.5px solid var(--border-color, #f2dde7);
    font: inherit;
    box-sizing: border-box;
  }

  .bpa-icon-btn {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--muted-color, #8f7a86);
    cursor: pointer;
    flex: 0 0 auto;
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .bpa-icon-btn:hover {
    color: var(--accent-color, var(--fs-store-primary));
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #f2dde7));
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
`, $ = 864e5;
function K(i, r) {
  const e = new Date(i.getTime()), n = e.getDate();
  e.setDate(1), e.setMonth(e.getMonth() + r);
  const o = new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate();
  return e.setDate(Math.min(n, o)), e;
}
function L(i) {
  const r = new Date(i.getTime());
  return r.setHours(0, 0, 0, 0), r;
}
function R(i) {
  if (!i) return null;
  const r = i.split("-").map(Number);
  if (r.length !== 3 || r.some((s) => !Number.isFinite(s))) return null;
  const [e, n, o] = r, t = new Date(e, n - 1, o);
  return Number.isNaN(t.getTime()) ? null : L(t);
}
function w(i) {
  const r = (e) => String(e).padStart(2, "0");
  return `${i.getFullYear()}-${r(i.getMonth() + 1)}-${r(i.getDate())}`;
}
function T(i, r, e) {
  const n = L(/* @__PURE__ */ new Date()), o = K(i, r), t = Math.max(1, Math.round((o.getTime() - i.getTime()) / $)), s = Math.round((o.getTime() - n.getTime()) / $), f = Math.round((n.getTime() - i.getTime()) / $), m = Math.max(0, Math.min(1, f / t));
  let b = "safe";
  return s <= 0 ? b = "expired" : s <= e && (b = "warn"), { expiry: o, daysRemaining: s, totalDays: t, elapsedRatio: m, state: b };
}
function S(i, r, e) {
  const n = (o) => String(o).padStart(2, "0");
  if (r === "short") return `${n(i.getDate())}/${n(i.getMonth() + 1)}/${i.getFullYear()}`;
  if (r === "iso") return w(i);
  try {
    return new Intl.DateTimeFormat(e === "en" ? "en-GB" : "ar", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(i);
  } catch {
    return w(i);
  }
}
function J(i) {
  return I(i).map((r, e) => ({
    id: String(r.id ?? r.cat_id ?? "").trim() || `cat-${e + 1}`,
    name: g(r.name),
    icon: String(r.icon ?? "").trim(),
    paoMonths: Math.max(0, v(r.pao_months, 0))
  })).filter((r) => r.name);
}
function Q(i) {
  return I(i).map((e) => ({
    months: Math.max(1, v(e.months, 0)),
    label: g(e.label)
  })).filter((e) => e.months > 0);
}
function X(i) {
  return C(i.bpa_input_mode, "direct") === "category" ? "category" : "direct";
}
function E(i) {
  const r = C(i.bpa_date_format, "long");
  return ["long", "short", "iso"].includes(r) ? r : "long";
}
function Z(i, r) {
  return i.label ? i.label : r === "en" ? `${i.months} months` : `${i.months} شهرًا`;
}
function rr(i, r) {
  const e = (t) => String(t).padStart(2, "0"), n = (t) => `${t.getFullYear()}${e(t.getMonth() + 1)}${e(t.getDate())}`, o = new Date(r.getTime() + $);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//beauty-pao-calculator//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@beauty-pao`,
    `DTSTART;VALUE=DATE:${n(r)}`,
    `DTEND;VALUE=DATE:${n(o)}`,
    `SUMMARY:${i.replace(/\r?\n/g, " ")}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join(`\r
`);
}
var er = Object.defineProperty, h = (i, r, e, n) => {
  for (var o = void 0, t = i.length - 1, s; t >= 0; t--)
    (s = i[t]) && (o = s(r, e, o) || o);
  return o && er(r, e, o), o;
};
const N = "tw-beauty-pao-records", z = class z extends V {
  constructor() {
    super(...arguments), this.config = {}, this.catId = "", this.pao = 0, this.openDate = "", this.recName = "", this.note = "", this.records = [], this.editingId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.records = F(N, []), this.openDate = w(/* @__PURE__ */ new Date());
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(r) {
    var e;
    r.has("config") && !this.pao && (this.pao = Math.max(0, v((e = this.config) == null ? void 0 : e.bpa_default_pao, 0)));
  }
  get locale() {
    return Y() === "en" ? "en" : "ar";
  }
  persist() {
    G(N, this.records);
  }
  onCategory(r, e) {
    this.catId = r, e > 0 && (this.pao = e);
  }
  saveRecord() {
    var o;
    if (!R(this.openDate) || this.pao <= 0) return;
    const e = Math.max(1, v((o = this.config) == null ? void 0 : o.bpa_max_records, 12));
    if (this.records.length >= e) return;
    const n = {
      id: `rec-${Date.now()}`,
      name: this.recName.trim() || (this.locale === "en" ? "Product" : "منتج"),
      category: this.catId,
      open: this.openDate,
      pao: this.pao,
      note: this.note.trim()
    };
    this.records = [n, ...this.records], this.persist(), this.recName = "", this.note = "";
  }
  deleteRecord(r) {
    this.records = this.records.filter((e) => e.id !== r), this.persist();
  }
  clearRecords() {
    this.records = [], this.persist();
  }
  renameRecord(r, e) {
    this.records = this.records.map((n) => n.id === r ? { ...n, name: e.trim() || n.name } : n), this.persist();
  }
  downloadIcs(r, e) {
    const n = rr(r, e), o = new Blob([n], { type: "text/calendar;charset=utf-8" }), t = URL.createObjectURL(o), s = document.createElement("a");
    s.href = t, s.download = "beauty-pao.ics", document.body.appendChild(s), s.click(), document.body.removeChild(s), setTimeout(() => URL.revokeObjectURL(t), 1e3);
  }
  stateColor(r) {
    const e = this.config || {};
    return String(r === "expired" ? e.bpa_expired_color ?? "#cf4b4b" : r === "warn" ? e.bpa_warn_color ?? "#e0a100" : e.bpa_safe_color ?? "#2f9e63");
  }
  stateLabel(r, e) {
    const n = this.config || {};
    return r === "expired" ? g(n.bpa_state_expired) || a("انتهت المدة التقريبية", "Approximate period ended") : r === "warn" ? g(n.bpa_state_warn) || a(`قرب الانتهاء — باقٍ ${e} يومًا`, `Ending soon — ${e} days left`) : g(n.bpa_state_safe) || a(`صالح للاستخدام — باقٍ ${e} يومًا`, `Good to use — ${e} days left`);
  }
  renderResult() {
    const r = this.config || {}, e = R(this.openDate);
    if (!e || this.pao <= 0)
      return c`<div class="bpa-hero bpa-hero--empty" role="status">
        <div class="bpa-hero__placeholder">
          <span class="bpa-hero__placeholder-icon" aria-hidden="true">◷</span>
          <p>
            ${a(
        "اختاري مدة الاستخدام بعد الفتح وتاريخ فتح العبوة لعرض النتيجة فورًا.",
        "Choose the period after opening and the open date to see the result instantly."
      )}
          </p>
        </div>
      </div>`;
    const n = /* @__PURE__ */ new Date();
    if (n.setHours(0, 0, 0, 0), e.getTime() > n.getTime())
      return c`<div class="bpa-hero bpa-hero--empty" role="alert">
        <div class="bpa-error">
          ${a("تاريخ الفتح في المستقبل. اختاري تاريخًا صحيحًا.", "The open date is in the future. Please pick a valid date.")}
        </div>
      </div>`;
    const o = Math.max(1, v(r.bpa_warn_days, 30)), t = T(e, this.pao, o), s = E(r), f = this.stateColor(t.state), m = 92, b = 2 * Math.PI * m, d = t.state === "expired" ? 0 : Math.max(0, Math.min(1, t.daysRemaining / Math.max(1, t.totalDays))), _ = b * (1 - d), k = x(r.bpa_enable_calendar, !0), D = g(r.bpa_storage_tips), M = g(r.bpa_stop_signals), A = a("انتهاء صلاحية منتج التجميل", "Beauty product expiry"), O = Math.abs(t.daysRemaining);
    return c`<div
      class="bpa-hero bpa-hero--${t.state}"
      style=${y({ "--bpa-color": f })}
    >
      <div
        class="bpa-dial"
        role="img"
        aria-label=${this.stateLabel(t.state, Math.max(0, t.daysRemaining))}
      >
        <svg viewBox="0 0 210 210" aria-hidden="true">
          <circle class="bpa-dial__disc" cx="105" cy="105" r="80"></circle>
          <circle class="bpa-dial__track" cx="105" cy="105" r=${m}></circle>
          <circle
            class="bpa-dial__value"
            cx="105"
            cy="105"
            r=${m}
            style=${y({ strokeDasharray: `${b}`, strokeDashoffset: `${_}` })}
          ></circle>
        </svg>
        <div class="bpa-dial__center">
          <div class="bpa-dial__days">${O}</div>
          <div class="bpa-dial__unit">
            ${t.daysRemaining >= 0 ? a("يوم متبقٍ", "days left") : a("يوم مضى", "days over")}
          </div>
          ${t.state !== "expired" ? c`<div class="bpa-dial__ratio">
                ${a(`${Math.round(d * 100)}٪ من المدة`, `${Math.round(d * 100)}% of period`)}
              </div>` : l}
        </div>
      </div>

      <span class="bpa-state bpa-state--${t.state}">${this.stateLabel(t.state, Math.max(0, t.daysRemaining))}</span>

      <div class="bpa-dates">
        <div class="bpa-date-cell">
          <span>${a("تاريخ الفتح", "Opened")}</span>
          <b>${S(e, s, this.locale)}</b>
        </div>
        <div class="bpa-date-cell">
          <span>${a("المدة", "Period")}</span>
          <b>${a(`${this.pao} شهرًا`, `${this.pao} months`)}</b>
        </div>
        <div class="bpa-date-cell">
          <span>${a("ينتهي تقريبًا", "Approx. end")}</span>
          <b>${S(t.expiry, s, this.locale)}</b>
        </div>
      </div>

      ${D || M ? c`<div class="bpa-tips-grid">
            ${D ? c`<div class="bpa-tips"><h4>${a("نصائح الحفظ", "Storage tips")}</h4><p>${D}</p></div>` : l}
            ${M ? c`<div class="bpa-tips"><h4>${a("متى تتوقفين", "When to stop")}</h4><p>${M}</p></div>` : l}
          </div>` : l}

      <div class="bpa-result-actions">
        ${k ? c`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.downloadIcs(A, t.expiry)}>
              ${a("إضافة إلى التقويم", "Add to calendar")}
            </button>` : l}
        ${x(r.bpa_enable_storage, !0) ? c`<button type="button" class="fs-btn" @click=${() => this.saveRecord()}>${a("حفظ هذه العبوة", "Save this product")}</button>` : l}
      </div>
    </div>`;
  }
  renderSaved() {
    const r = this.config || {};
    if (!x(r.bpa_enable_storage, !0)) return l;
    const e = E(r), n = Math.max(1, v(r.bpa_warn_days, 30));
    return c`<div class="bpa-saved">
      <div class="bpa-saved__head">
        <h3 class="bpa-saved__title">${a("عبواتي المحفوظة", "My saved products")}</h3>
        ${this.records.length ? c`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.clearRecords()}>${a("مسح الكل", "Clear all")}</button>` : l}
      </div>
      <p class="bpa-saved__note">${a("البيانات محفوظة على جهازك فقط ولا تُرسل إلى أي خادم.", "Data is stored on your device only and never sent to any server.")}</p>
      ${this.records.length ? c`<div class="bpa-records">
            ${this.records.map((o) => {
      const t = R(o.open), s = t ? T(t, o.pao, n) : null, f = s ? this.stateColor(s.state) : "var(--muted-color)", m = (s == null ? void 0 : s.state) ?? "unknown", b = s ? s.daysRemaining >= 0 ? a(`${s.daysRemaining} يوم`, `${s.daysRemaining} days`) : a(`منتهٍ ${Math.abs(s.daysRemaining)} يوم`, `Expired ${Math.abs(s.daysRemaining)}d ago`) : "";
      return c`<article
                class="bpa-record bpa-record--${m}"
                style=${y({ "--rec-color": f })}
              >
                <div class="bpa-record__status" aria-hidden="true">
                  <span class="bpa-record__ring"></span>
                  ${s ? c`<span class="bpa-record__days">${Math.abs(s.daysRemaining)}</span>` : l}
                </div>
                <div class="bpa-record__body">
                  ${this.editingId === o.id ? c`<input
                        class="bpa-record__edit"
                        .value=${o.name}
                        aria-label=${a("اسم العبوة", "Product name")}
                        @change=${(d) => {
        this.renameRecord(o.id, d.target.value), this.editingId = "";
      }}
                      />` : c`<div class="bpa-record__name">${o.name}</div>`}
                  <div class="bpa-record__meta">
                    ${s && t ? c`<span class="bpa-record__pill bpa-record__pill--${m}">
                          ${s.state === "expired" ? a("منتهٍ", "Expired") : s.state === "warn" ? a("قرب الانتهاء", "Ending soon") : a("صالح", "Good")}
                        </span>` : l}
                    ${b ? c`<span>${b}</span>` : l}
                    ${s && t ? c`<span>· ${a("ينتهي", "Ends")} ${S(s.expiry, e, this.locale)}</span>` : l}
                  </div>
                  ${o.note ? c`<p class="bpa-record__note">${o.note}</p>` : l}
                </div>
                <div class="bpa-record__actions">
                  <button type="button" class="bpa-icon-btn" aria-label=${a("تعديل الاسم", "Rename")} @click=${() => this.editingId = this.editingId === o.id ? "" : o.id}>✎</button>
                  <button type="button" class="bpa-icon-btn" aria-label=${a("حذف", "Delete")} @click=${() => this.deleteRecord(o.id)}>🗑</button>
                </div>
              </article>`;
    })}
          </div>` : c`<div class="bpa-saved__empty">${a("لا توجد عبوات محفوظة بعد.", "No saved products yet.")}</div>`}
    </div>`;
  }
  render() {
    const r = this.config || {}, e = H(r, "bpa_"), n = g(r.bpa_title), o = g(r.bpa_desc), t = X(r), s = J(r.bpa_categories), f = Q(r.bpa_pao_options), m = g(r.bpa_notice) || a(
      "النتيجة تقديرية وتعتمد على تاريخ الفتح والمدة المكتوبة على العبوة. اتبعي تعليمات الشركة المصنّعة وتوقّفي عن الاستخدام عند تغيّر الرائحة أو اللون أو القوام.",
      "The result is approximate and based on the open date and the period printed on the packaging. Follow the manufacturer instructions and stop using if the smell, color or texture changes."
    ), b = t === "category" && s.length > 0;
    return c`
      <section
        class="fs-section"
        style=${y(B(e))}
        aria-label=${n || a("حاسبة مدة الاستخدام بعد الفتح", "PAO & expiry calculator")}
      >
        <div class="fs-container">
          ${n || o ? c`<div class="fs-header">
                ${n ? c`<h2 class="fs-title">${n}</h2>` : l}
                ${o ? c`<p class="fs-desc">${o}</p>` : l}
              </div>` : l}

          <div class="bpa-shell">
            <aside class="bpa-form-card">
              <h3 class="bpa-form-card__title">${a("احسبي المدة", "Calculate the period")}</h3>
              <p class="bpa-form-card__hint">
                ${a(
      "اختاري الفئة أو المدة، ثم حدّدي تاريخ فتح العبوة.",
      "Pick a category or period, then set the open date."
    )}
              </p>

              <div class="bpa-form">
                ${b ? c`<div class="bpa-field">
                      <label>${a("فئة المستحضر", "Product category")}</label>
                      <div class="bpa-cat-chips" role="group" aria-label=${a("فئات المستحضرات", "Product categories")}>
                        ${s.map((d) => {
      const _ = d.id === this.catId, k = d.icon.startsWith("sicon-");
      return c`<button
                            type="button"
                            class=${`bpa-cat-chip${_ ? " is-active" : ""}`}
                            aria-pressed=${_ ? "true" : "false"}
                            @click=${() => this.onCategory(d.id, d.paoMonths)}
                          >
                            ${d.icon ? c`<span class="bpa-cat-chip__icon" aria-hidden="true">
                                  ${k ? c`<span class=${d.icon}></span>` : d.icon}
                                </span>` : l}
                            <span>${d.name}</span>
                            ${d.paoMonths ? c`<span class="bpa-cat-chip__months"
                                  >${this.locale === "en" ? `${d.paoMonths}M` : `${d.paoMonths} شهر`}</span
                                >` : l}
                          </button>`;
    })}
                      </div>
                    </div>` : l}

                <div class="bpa-field">
                  <label>${a("مدة الاستخدام بعد الفتح", "Period after opening")}</label>
                  ${f.length ? c`<div class="bpa-pao-chips" role="group" aria-label=${a("مدد الاستخدام", "Use periods")}>
                        ${f.map(
      (d) => c`<button
                            type="button"
                            class=${`bpa-pao-chip${this.pao === d.months ? " is-active" : ""}`}
                            aria-pressed=${this.pao === d.months ? "true" : "false"}
                            @click=${() => this.pao = d.months}
                          >
                            ${Z(d, this.locale)}
                          </button>`
    )}
                      </div>` : c`<input
                        class="bpa-input"
                        type="number"
                        min="1"
                        max="60"
                        .value=${this.pao ? String(this.pao) : ""}
                        placeholder=${a("عدد الأشهر", "Number of months")}
                        @input=${(d) => this.pao = Math.max(0, v(d.target.value, 0))}
                      />`}
                </div>

                <div class="bpa-field">
                  <label for="bpa-open">${a("تاريخ فتح العبوة", "Open date")}</label>
                  <input
                    id="bpa-open"
                    class="bpa-input"
                    type="date"
                    max=${w(/* @__PURE__ */ new Date())}
                    .value=${this.openDate}
                    @input=${(d) => this.openDate = d.target.value}
                  />
                </div>

                ${x(r.bpa_enable_name, !0) ? c`<div class="bpa-field">
                      <label for="bpa-name">${a("اسم العبوة (اختياري)", "Product name (optional)")}</label>
                      <input
                        id="bpa-name"
                        class="bpa-input"
                        .value=${this.recName}
                        placeholder=${a("مثال: سيروم فيتامين C", "e.g. Vitamin C serum")}
                        @input=${(d) => this.recName = d.target.value}
                      />
                    </div>` : l}

                ${x(r.bpa_enable_note, !1) ? c`<div class="bpa-field">
                      <label for="bpa-note">${a("ملاحظة (اختياري)", "Note (optional)")}</label>
                      <input
                        id="bpa-note"
                        class="bpa-input"
                        .value=${this.note}
                        @input=${(d) => this.note = d.target.value}
                      />
                    </div>` : l}
              </div>
            </aside>

            ${this.renderResult()}
          </div>

          ${this.renderSaved()}

          <p class="bpa-notice">${m}</p>
          ${W({ config: r, prefix: "bpa_", ready: !0 })}
        </div>
      </section>
    `;
  }
};
z.styles = [j, q];
let p = z;
h([
  U({ type: Object })
], p.prototype, "config");
h([
  u()
], p.prototype, "catId");
h([
  u()
], p.prototype, "pao");
h([
  u()
], p.prototype, "openDate");
h([
  u()
], p.prototype, "recName");
h([
  u()
], p.prototype, "note");
h([
  u()
], p.prototype, "records");
h([
  u()
], p.prototype, "editingId");
typeof p < "u" && p.registerSallaComponent("salla-beauty-pao-expiry-calculator");
export {
  p as default
};
