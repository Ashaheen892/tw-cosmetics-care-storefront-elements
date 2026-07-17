import { css as O, LitElement as P, html as d, nothing as l } from "lit";
import { property as V, state as v } from "lit/decorators.js";
import { styleMap as w } from "lit/directives/style-map.js";
import { g as C, n as L, h as f, l as b, s as U, k as j, j as F, m as Y, t as s, i as _, r as G, a as H } from "./sharedStyles-cRSiglXC.js";
const B = O`
  .bpa-grid {
    display: grid;
    gap: 1.5rem;
    align-items: start;
  }

  @media (min-width: 820px) {
    .bpa-grid {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
      gap: 2rem;
    }
  }

  .bpa-form {
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: var(--section-radius, 16px);
    padding: 1.15rem 1.15rem 1.25rem;
    display: grid;
    gap: 0.9rem;
  }

  .bpa-field { display: grid; gap: 0.35rem; }
  .bpa-field label { font-size: 0.82rem; font-weight: 700; color: var(--text-color, #33232e); }

  .bpa-input,
  .bpa-select {
    width: 100%;
    padding: 0.6rem 0.7rem;
    border-radius: 12px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    box-sizing: border-box;
  }

  .bpa-pao-chips { display: flex; flex-wrap: wrap; gap: 0.45rem; }
  .bpa-pao-chip {
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-weight: 700;
    font-size: 0.82rem;
    cursor: pointer;
  }
  .bpa-pao-chip.is-active {
    background: var(--accent-color, #c2527f);
    border-color: var(--accent-color, #c2527f);
    color: #fff;
  }

  .bpa-error {
    padding: 0.6rem 0.8rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--bpa-expired, #cf4b4b) 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--bpa-expired, #cf4b4b) 40%, transparent);
    color: color-mix(in srgb, var(--bpa-expired, #cf4b4b) 75%, #000);
    font-size: 0.84rem;
    font-weight: 600;
  }

  /* result */
  .bpa-result {
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: var(--section-radius, 16px);
    padding: 1.25rem;
    text-align: center;
  }

  .bpa-dial {
    position: relative;
    width: 190px;
    height: 190px;
    margin: 0 auto 1rem;
  }
  .bpa-dial svg { transform: rotate(-90deg); width: 100%; height: 100%; }
  .bpa-dial__track { fill: none; stroke: color-mix(in srgb, var(--border-color, #f2dde7) 70%, transparent); stroke-width: 12; }
  .bpa-dial__value { fill: none; stroke: var(--bpa-color, var(--accent-color, #c2527f)); stroke-width: 12; stroke-linecap: round; transition: stroke-dashoffset 0.6s ease, stroke 0.3s ease; }
  .bpa-dial__center {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    text-align: center;
  }
  .bpa-dial__days { font-size: 1.9rem; font-weight: 800; line-height: 1; color: var(--text-color, #33232e); }
  .bpa-dial__unit { font-size: 0.78rem; color: var(--muted-color, #8f7a86); margin-top: 0.2rem; }

  .bpa-state {
    display: inline-block;
    padding: 0.3rem 0.9rem;
    border-radius: 999px;
    font-weight: 800;
    font-size: 0.85rem;
    margin-bottom: 0.85rem;
    background: color-mix(in srgb, var(--bpa-color, var(--accent-color, #c2527f)) 15%, var(--card-bg, #fff));
    color: var(--bpa-color, var(--accent-color, #c2527f));
  }

  .bpa-dates {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    margin: 0.5rem 0 1rem;
  }
  .bpa-date-cell {
    padding: 0.6rem 0.4rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 30%, var(--card-bg, #fff));
  }
  .bpa-date-cell span { display: block; font-size: 0.72rem; color: var(--muted-color, #8f7a86); margin-bottom: 0.2rem; }
  .bpa-date-cell b { font-size: 0.82rem; color: var(--text-color, #33232e); }

  .bpa-tips {
    text-align: start;
    margin: 0.75rem 0;
    padding: 0.75rem 0.85rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 6%, var(--card-bg, #fff));
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--text-color, #33232e);
  }
  .bpa-tips h4 { margin: 0 0 0.3rem; font-size: 0.8rem; }
  .bpa-tips p { margin: 0; color: var(--muted-color, #8f7a86); white-space: pre-line; }

  .bpa-result-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-top: 0.5rem; }

  .bpa-notice {
    margin-top: 1rem;
    font-size: 0.78rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.6;
    text-align: center;
  }

  /* saved records */
  .bpa-saved { margin-top: 1.5rem; }
  .bpa-saved__head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.6rem; }
  .bpa-saved__title { margin: 0; font-size: 0.95rem; font-weight: 800; }
  .bpa-saved__note { font-size: 0.74rem; color: var(--muted-color, #8f7a86); margin: 0 0 0.6rem; }

  .bpa-record {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 0.7rem;
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: 12px;
    margin-bottom: 0.5rem;
    background: var(--card-bg, #fff);
  }
  .bpa-record__dot { width: 0.7rem; height: 0.7rem; border-radius: 50%; flex: 0 0 auto; }
  .bpa-record__info { flex: 1 1 auto; min-width: 0; }
  .bpa-record__name { font-weight: 700; font-size: 0.86rem; color: var(--text-color, #33232e); }
  .bpa-record__meta { font-size: 0.74rem; color: var(--muted-color, #8f7a86); }
  .bpa-record__edit {
    flex: 1 1 auto;
    padding: 0.35rem 0.5rem;
    border-radius: 8px;
    border: 1px solid var(--border-color, #f2dde7);
    font: inherit;
  }
  .bpa-icon-btn {
    width: 32px; height: 32px;
    display: grid; place-items: center;
    border-radius: 8px;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--muted-color, #8f7a86);
    cursor: pointer;
    flex: 0 0 auto;
  }
  .bpa-icon-btn:hover { color: var(--accent-color, #c2527f); }

  @media (max-width: 639px) {
    .bpa-dial { width: 160px; height: 160px; }
    .bpa-dates { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .bpa-dial__value { transition: none !important; }
  }
`, k = 864e5;
function q(r, e) {
  const t = new Date(r.getTime()), a = t.getDate();
  t.setDate(1), t.setMonth(t.getMonth() + e);
  const i = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
  return t.setDate(Math.min(a, i)), t;
}
function z(r) {
  const e = new Date(r.getTime());
  return e.setHours(0, 0, 0, 0), e;
}
function S(r) {
  if (!r) return null;
  const e = r.split("-").map(Number);
  if (e.length !== 3 || e.some((n) => !Number.isFinite(n))) return null;
  const [t, a, i] = e, o = new Date(t, a - 1, i);
  return Number.isNaN(o.getTime()) ? null : z(o);
}
function M(r) {
  const e = (t) => String(t).padStart(2, "0");
  return `${r.getFullYear()}-${e(r.getMonth() + 1)}-${e(r.getDate())}`;
}
function N(r, e, t) {
  const a = z(/* @__PURE__ */ new Date()), i = q(r, e), o = Math.max(1, Math.round((i.getTime() - r.getTime()) / k)), n = Math.round((i.getTime() - a.getTime()) / k), u = Math.round((a.getTime() - r.getTime()) / k), m = Math.max(0, Math.min(1, u / o));
  let h = "safe";
  return n <= 0 ? h = "expired" : n <= t && (h = "warn"), { expiry: i, daysRemaining: n, totalDays: o, elapsedRatio: m, state: h };
}
function D(r, e, t) {
  const a = (i) => String(i).padStart(2, "0");
  if (e === "short") return `${a(r.getDate())}/${a(r.getMonth() + 1)}/${r.getFullYear()}`;
  if (e === "iso") return M(r);
  try {
    return new Intl.DateTimeFormat(t === "en" ? "en-GB" : "ar", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(r);
  } catch {
    return M(r);
  }
}
function K(r) {
  return L(r).map((e, t) => ({
    id: String(e.cat_id ?? "").trim() || `cat-${t + 1}`,
    name: b(e.name),
    icon: String(e.icon ?? "").trim(),
    paoMonths: Math.max(0, f(e.pao_months, 0))
  })).filter((e) => e.name);
}
function W(r) {
  return L(r).map((t) => ({
    months: Math.max(1, f(t.months, 0)),
    label: b(t.label)
  })).filter((t) => t.months > 0);
}
function J(r) {
  return C(r.bpa_input_mode, "direct") === "category" ? "category" : "direct";
}
function I(r) {
  const e = C(r.bpa_date_format, "long");
  return ["long", "short", "iso"].includes(e) ? e : "long";
}
function Q(r, e) {
  return r.label ? r.label : e === "en" ? `${r.months} months` : `${r.months} شهرًا`;
}
function X(r, e) {
  const t = (o) => String(o).padStart(2, "0"), a = (o) => `${o.getFullYear()}${t(o.getMonth() + 1)}${t(o.getDate())}`, i = new Date(e.getTime() + k);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//beauty-pao-calculator//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@beauty-pao`,
    `DTSTART;VALUE=DATE:${a(e)}`,
    `DTEND;VALUE=DATE:${a(i)}`,
    `SUMMARY:${r.replace(/\r?\n/g, " ")}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join(`\r
`);
}
var Z = Object.defineProperty, g = (r, e, t, a) => {
  for (var i = void 0, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (i = n(e, t, i) || i);
  return i && Z(e, t, i), i;
};
const E = "tw-beauty-pao-records", R = class R extends P {
  constructor() {
    super(...arguments), this.config = {}, this.catId = "", this.pao = 0, this.openDate = "", this.recName = "", this.note = "", this.records = [], this.editingId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.records = j(E, []), this.openDate = M(/* @__PURE__ */ new Date());
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    var t;
    e.has("config") && !this.pao && (this.pao = Math.max(0, f((t = this.config) == null ? void 0 : t.bpa_default_pao, 0)));
  }
  get locale() {
    return F() === "en" ? "en" : "ar";
  }
  persist() {
    Y(E, this.records);
  }
  onCategory(e, t) {
    this.catId = e, t > 0 && (this.pao = t);
  }
  saveRecord() {
    var i;
    if (!S(this.openDate) || this.pao <= 0) return;
    const t = Math.max(1, f((i = this.config) == null ? void 0 : i.bpa_max_records, 12));
    if (this.records.length >= t) return;
    const a = {
      id: `rec-${Date.now()}`,
      name: this.recName.trim() || (this.locale === "en" ? "Product" : "منتج"),
      category: this.catId,
      open: this.openDate,
      pao: this.pao,
      note: this.note.trim()
    };
    this.records = [a, ...this.records], this.persist(), this.recName = "", this.note = "";
  }
  deleteRecord(e) {
    this.records = this.records.filter((t) => t.id !== e), this.persist();
  }
  clearRecords() {
    this.records = [], this.persist();
  }
  renameRecord(e, t) {
    this.records = this.records.map((a) => a.id === e ? { ...a, name: t.trim() || a.name } : a), this.persist();
  }
  downloadIcs(e, t) {
    const a = X(e, t), i = new Blob([a], { type: "text/calendar;charset=utf-8" }), o = URL.createObjectURL(i), n = document.createElement("a");
    n.href = o, n.download = "beauty-pao.ics", document.body.appendChild(n), n.click(), document.body.removeChild(n), setTimeout(() => URL.revokeObjectURL(o), 1e3);
  }
  stateColor(e) {
    const t = this.config || {};
    return String(e === "expired" ? t.bpa_expired_color ?? "#cf4b4b" : e === "warn" ? t.bpa_warn_color ?? "#e0a100" : t.bpa_safe_color ?? "#2f9e63");
  }
  stateLabel(e, t) {
    const a = this.config || {};
    return e === "expired" ? b(a.bpa_state_expired) || s("انتهت المدة التقريبية", "Approximate period ended") : e === "warn" ? b(a.bpa_state_warn) || s(`قرب الانتهاء — باقٍ ${t} يومًا`, `Ending soon — ${t} days left`) : b(a.bpa_state_safe) || s(`صالح للاستخدام — باقٍ ${t} يومًا`, `Good to use — ${t} days left`);
  }
  renderResult() {
    const e = this.config || {}, t = S(this.openDate);
    if (!t || this.pao <= 0)
      return d`<div class="bpa-result">
        <p class="bpa-notice">${s("اختاري مدة الاستخدام وتاريخ الفتح لعرض النتيجة.", "Choose the period and open date to see the result.")}</p>
      </div>`;
    const a = /* @__PURE__ */ new Date();
    if (a.setHours(0, 0, 0, 0), t.getTime() > a.getTime())
      return d`<div class="bpa-result">
        <div class="bpa-error">${s("تاريخ الفتح في المستقبل. اختاري تاريخًا صحيحًا.", "The open date is in the future. Please pick a valid date.")}</div>
      </div>`;
    const i = Math.max(1, f(e.bpa_warn_days, 30)), o = N(t, this.pao, i), n = I(e), u = this.stateColor(o.state), m = 80, h = 2 * Math.PI * m, c = o.state === "expired" ? 1 : o.elapsedRatio, x = h * (1 - c), $ = _(e.bpa_enable_calendar, !1), y = b(e.bpa_storage_tips), T = b(e.bpa_stop_signals), A = s("انتهاء صلاحية منتج التجميل", "Beauty product expiry");
    return d`<div class="bpa-result" style=${w({ "--bpa-color": u })}>
      <div class="bpa-dial" role="img" aria-label=${this.stateLabel(o.state, Math.max(0, o.daysRemaining))}>
        <svg viewBox="0 0 190 190">
          <circle class="bpa-dial__track" cx="95" cy="95" r=${m}></circle>
          <circle
            class="bpa-dial__value"
            cx="95" cy="95" r=${m}
            style=${w({ strokeDasharray: `${h}`, strokeDashoffset: `${x}` })}
          ></circle>
        </svg>
        <div class="bpa-dial__center">
          <div>
            <div class="bpa-dial__days">${Math.abs(o.daysRemaining)}</div>
            <div class="bpa-dial__unit">${o.daysRemaining >= 0 ? s("يوم متبقٍ", "days left") : s("يوم مضى", "days over")}</div>
          </div>
        </div>
      </div>

      <span class="bpa-state">${this.stateLabel(o.state, Math.max(0, o.daysRemaining))}</span>

      <div class="bpa-dates">
        <div class="bpa-date-cell"><span>${s("تاريخ الفتح", "Opened")}</span><b>${D(t, n, this.locale)}</b></div>
        <div class="bpa-date-cell"><span>${s("المدة", "Period")}</span><b>${s(`${this.pao} شهرًا`, `${this.pao} months`)}</b></div>
        <div class="bpa-date-cell"><span>${s("ينتهي تقريبًا", "Approx. end")}</span><b>${D(o.expiry, n, this.locale)}</b></div>
      </div>

      ${y ? d`<div class="bpa-tips"><h4>${s("نصائح الحفظ", "Storage tips")}</h4><p>${y}</p></div>` : l}
      ${T ? d`<div class="bpa-tips"><h4>${s("متى تتوقفين عن الاستخدام", "When to stop using")}</h4><p>${T}</p></div>` : l}

      <div class="bpa-result-actions">
        ${$ ? d`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.downloadIcs(A, o.expiry)}>
              ${s("إضافة إلى التقويم", "Add to calendar")}
            </button>` : l}
        ${_(e.bpa_enable_storage, !0) ? d`<button type="button" class="fs-btn" @click=${() => this.saveRecord()}>${s("حفظ هذه العبوة", "Save this product")}</button>` : l}
      </div>
    </div>`;
  }
  renderSaved() {
    const e = this.config || {};
    if (!_(e.bpa_enable_storage, !0)) return l;
    const t = I(e);
    return d`<div class="bpa-saved">
      <div class="bpa-saved__head">
        <h3 class="bpa-saved__title">${s("عبواتي المحفوظة", "My saved products")}</h3>
        ${this.records.length ? d`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.clearRecords()}>${s("مسح الكل", "Clear all")}</button>` : l}
      </div>
      <p class="bpa-saved__note">${s("البيانات محفوظة على جهازك فقط ولا تُرسل إلى أي خادم.", "Data is stored on your device only and never sent to any server.")}</p>
      ${this.records.length ? this.records.map((a) => {
      const i = S(a.open), o = Math.max(1, f(e.bpa_warn_days, 30)), n = i ? N(i, a.pao, o) : null, u = n ? this.stateColor(n.state) : "var(--muted-color)";
      return d`<div class="bpa-record">
              <span class="bpa-record__dot" style=${w({ background: u })}></span>
              <div class="bpa-record__info">
                ${this.editingId === a.id ? d`<input
                      class="bpa-record__edit"
                      .value=${a.name}
                      aria-label=${s("اسم العبوة", "Product name")}
                      @change=${(m) => {
        this.renameRecord(a.id, m.target.value), this.editingId = "";
      }}
                    />` : d`<div class="bpa-record__name">${a.name}</div>`}
                <div class="bpa-record__meta">
                  ${n && i ? s(`ينتهي ${D(n.expiry, t, this.locale)}`, `Ends ${D(n.expiry, t, this.locale)}`) : ""}
                  ${a.note ? d` · ${a.note}` : l}
                </div>
              </div>
              <button type="button" class="bpa-icon-btn" aria-label=${s("تعديل الاسم", "Rename")} @click=${() => this.editingId = this.editingId === a.id ? "" : a.id}>✎</button>
              <button type="button" class="bpa-icon-btn" aria-label=${s("حذف", "Delete")} @click=${() => this.deleteRecord(a.id)}>🗑</button>
            </div>`;
    }) : d`<p class="bpa-saved__note">${s("لا توجد عبوات محفوظة بعد.", "No saved products yet.")}</p>`}
    </div>`;
  }
  render() {
    const e = this.config || {}, t = G(e, "bpa_"), a = b(e.bpa_title), i = b(e.bpa_desc), o = J(e), n = K(e.bpa_categories), u = W(e.bpa_pao_options), m = b(e.bpa_notice) || s(
      "النتيجة تقديرية وتعتمد على تاريخ الفتح والمدة المكتوبة على العبوة. اتبعي تعليمات الشركة المصنّعة وتوقّفي عن الاستخدام عند تغيّر الرائحة أو اللون أو القوام.",
      "The result is approximate and based on the open date and the period printed on the packaging. Follow the manufacturer instructions and stop using if the smell, color or texture changes."
    ), h = (o === "category" || n.length > 0) && n.length > 0;
    return d`
      <section
        class="fs-section"
        style=${w(H(t))}
        aria-label=${a || s("حاسبة مدة الاستخدام بعد الفتح", "PAO & expiry calculator")}
      >
        <div class="fs-container">
          ${a || i ? d`<div class="fs-header">
                ${a ? d`<h2 class="fs-title">${a}</h2>` : l}
                ${i ? d`<p class="fs-desc">${i}</p>` : l}
              </div>` : l}

          <div class="bpa-grid">
            <div class="bpa-form">
              ${h ? d`<div class="bpa-field">
                    <label for="bpa-cat">${s("فئة المستحضر", "Product category")}</label>
                    <select
                      id="bpa-cat"
                      class="bpa-select"
                      @change=${(c) => {
      const x = c.target.value, $ = n.find((y) => y.id === x);
      this.onCategory(x, ($ == null ? void 0 : $.paoMonths) ?? 0);
    }}
                    >
                      <option value="">${s("اختياري — اختاري الفئة", "Optional — choose a category")}</option>
                      ${n.map((c) => d`<option value=${c.id} ?selected=${c.id === this.catId}>${c.name}${c.paoMonths ? ` (${c.paoMonths}${this.locale === "en" ? "M" : " شهر"})` : ""}</option>`)}
                    </select>
                  </div>` : l}

              <div class="bpa-field">
                <label>${s("مدة الاستخدام بعد الفتح", "Period after opening")}</label>
                ${u.length ? d`<div class="bpa-pao-chips">
                      ${u.map(
      (c) => d`<button
                          type="button"
                          class="bpa-pao-chip ${this.pao === c.months ? "is-active" : ""}"
                          aria-pressed=${this.pao === c.months ? "true" : "false"}
                          @click=${() => this.pao = c.months}
                        >${Q(c, this.locale)}</button>`
    )}
                    </div>` : d`<input
                      class="bpa-input"
                      type="number"
                      min="1"
                      max="60"
                      .value=${this.pao ? String(this.pao) : ""}
                      placeholder=${s("عدد الأشهر", "Number of months")}
                      @input=${(c) => this.pao = Math.max(0, f(c.target.value, 0))}
                    />`}
              </div>

              <div class="bpa-field">
                <label for="bpa-open">${s("تاريخ فتح العبوة", "Open date")}</label>
                <input
                  id="bpa-open"
                  class="bpa-input"
                  type="date"
                  max=${M(/* @__PURE__ */ new Date())}
                  .value=${this.openDate}
                  @input=${(c) => this.openDate = c.target.value}
                />
              </div>

              ${_(e.bpa_enable_name, !0) ? d`<div class="bpa-field">
                    <label for="bpa-name">${s("اسم العبوة (اختياري)", "Product name (optional)")}</label>
                    <input id="bpa-name" class="bpa-input" .value=${this.recName} @input=${(c) => this.recName = c.target.value} />
                  </div>` : l}

              ${_(e.bpa_enable_note, !1) ? d`<div class="bpa-field">
                    <label for="bpa-note">${s("ملاحظة (اختياري)", "Note (optional)")}</label>
                    <input id="bpa-note" class="bpa-input" .value=${this.note} @input=${(c) => this.note = c.target.value} />
                  </div>` : l}
            </div>

            ${this.renderResult()}
          </div>

          ${this.renderSaved()}

          <p class="bpa-notice">${m}</p>
        </div>
      </section>
    `;
  }
};
R.styles = [U, B];
let p = R;
g([
  V({ type: Object })
], p.prototype, "config");
g([
  v()
], p.prototype, "catId");
g([
  v()
], p.prototype, "pao");
g([
  v()
], p.prototype, "openDate");
g([
  v()
], p.prototype, "recName");
g([
  v()
], p.prototype, "note");
g([
  v()
], p.prototype, "records");
g([
  v()
], p.prototype, "editingId");
typeof p < "u" && p.registerSallaComponent("salla-beauty-pao-expiry-calculator");
export {
  p as default
};
