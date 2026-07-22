var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, b as extractLink, g as getRadioValue, o as getPageLocale, s as sharedSectionCss, t, d as isExternalUrl, i as isTruthy, r as readSectionTheme, p as prefersReducedMotion, a as themeStyleMap } from "./sharedStyles-Bu7Tok5Z.js";
import { r as renderCommerceCtaButton } from "./commerceOutcome-BLJKzvei.js";
const componentStyles = css`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .bsf-wrap {
    display: grid;
    gap: 1.25rem;
    width: 100%;
    max-width: 760px;
    margin-inline: auto;
  }

  .bsf-wrap:has(.bsf-results) {
    max-width: 960px;
  }

  .bsf-progress {
    display: grid;
    gap: 0.45rem;
  }

  .bsf-progress__bar {
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 70%, #fff);
    overflow: hidden;
  }

  .bsf-progress__bar span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      var(--accent-color, var(--fs-store-primary)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, #7b2c52)
    );
    transition: width 0.25s ease;
  }

  .bsf-progress__text {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--muted-color, #666666);
  }

  .bsf-question {
    display: grid;
    gap: 0.75rem;
    padding: 1.15rem 1.2rem;
    border-radius: var(--section-radius, 16px);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e5e7eb);
    box-shadow: 0 8px 24px rgba(194, 82, 127, 0.06);
  }

  .bsf-question__title {
    margin: 0;
    font-size: 1.12rem;
    font-weight: 800;
    line-height: 1.35;
    color: var(--text-color, #000000);
  }

  .bsf-question__hint {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--text-color, #000000);
    padding: 0.7rem 0.85rem;
    border-radius: 12px;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 14%,
      var(--fs-surface, var(--card-bg, #f0f0f0))
    );
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 75%, transparent);
    border-inline-start: 3px solid var(--accent-color, var(--fs-store-primary));
  }

  :host([data-fs-theme='dark']) .bsf-question__hint {
    color: #ffffff;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 18%,
      var(--fs-surface, #0a0a0a)
    );
    border-color: rgba(255, 255, 255, 0.12);
  }

  .bsf-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .bsf-chip {
    min-height: 44px;
    padding: 0.55rem 1.1rem;
    border-radius: 999px;
    border: 1.5px solid var(--border-color, #e5e7eb);
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
      transform 0.15s ease;
  }

  .bsf-chip:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
  }

  .bsf-chip[aria-pressed='true'] {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    border-color: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    transform: translateY(-1px);
  }

  .bsf-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
  }

  .bsf-nav .fs-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .bsf-results {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.95fr);
    gap: 1.25rem;
    align-items: start;
    padding: 1.25rem;
    border-radius: var(--section-radius, 20px);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, transparent));
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    box-shadow: 0 12px 30px rgba(120, 44, 82, 0.05);
  }

  .bsf-results__head {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .bsf-results__title {
    margin: 0;
    font-size: 1.08rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .bsf-results__count {
    min-width: 2rem;
    height: 2rem;
    padding: 0 0.65rem;
    display: inline-grid;
    place-items: center;
    border-radius: 999px;
    font-size: 0.82rem;
    font-weight: 800;
    color: #fff;
    background: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 4px 12px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
  }

  .bsf-results__actions {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .bsf-swatches {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(4.6rem, 1fr));
    gap: 0.75rem 0.55rem;
    padding: 0.85rem;
    border-radius: 16px;
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 85%, #fff);
    max-height: min(420px, 55vh);
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .bsf-swatch {
    position: relative;
    display: grid;
    gap: 0.4rem;
    justify-items: center;
    padding: 0.35rem 0.2rem;
    border: none;
    background: none;
    cursor: pointer;
    text-align: center;
    font: inherit;
  }

  .bsf-swatch__ring {
    width: 3.6rem;
    height: 3.6rem;
    padding: 3px;
    border-radius: 999px;
    box-sizing: border-box;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 70%, #fff);
    transition:
      background 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
  }

  .bsf-swatch__chip {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.35),
      inset 0 -8px 14px rgba(0, 0, 0, 0.16),
      0 4px 10px rgba(43, 33, 28, 0.12);
  }

  .bsf-swatch--square .bsf-swatch__ring,
  .bsf-swatch--square .bsf-swatch__chip {
    border-radius: 12px;
  }

  .bsf-swatch--rounded .bsf-swatch__ring,
  .bsf-swatch--rounded .bsf-swatch__chip {
    border-radius: 18px;
  }

  .bsf-swatch:hover .bsf-swatch__ring {
    transform: translateY(-2px) scale(1.04);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, var(--border-color, #e5e7eb));
  }

  .bsf-swatch.is-active .bsf-swatch__ring,
  .bsf-swatch[aria-pressed='true'] .bsf-swatch__ring {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    box-shadow:
      0 0 0 4px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, transparent),
      0 8px 18px rgba(120, 44, 82, 0.16);
    transform: scale(1.06);
  }

  .bsf-swatch__name {
    width: 100%;
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--muted-color, #666666);
    line-height: 1.25;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .bsf-swatch.is-active .bsf-swatch__name,
  .bsf-swatch[aria-pressed='true'] .bsf-swatch__name {
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bsf-detail {
    display: grid;
    gap: 0.75rem;
    padding: 1rem 1.05rem 1.1rem;
    border-radius: calc(var(--section-radius, 20px) * 0.85);
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    box-shadow: 0 10px 26px rgba(120, 44, 82, 0.06);
  }

  .bsf-detail__media {
    aspect-ratio: 16 / 10;
    border-radius: 14px;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.28),
      inset 0 -36px 48px rgba(0, 0, 0, 0.14),
      0 8px 20px rgba(43, 33, 28, 0.1);
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 55%, transparent);
  }

  .bsf-detail__name {
    margin: 0;
    font-size: 1.08rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .bsf-detail__number {
    font-size: 0.84rem;
    font-weight: 700;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bsf-detail__desc {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--muted-color, #666666);
  }

  .bsf-detail__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .bsf-detail__chip {
    opacity: 0.5;
  }

  .bsf-detail__chip--on {
    opacity: 1;
  }

  .bsf-detail__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.15rem;
  }

  @media (max-width: 720px) {
    .bsf-results {
      grid-template-columns: 1fr;
    }

    .bsf-swatches {
      grid-template-columns: repeat(auto-fill, minmax(4.2rem, 1fr));
      max-height: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bsf-chip,
    .bsf-swatch__ring,
    .bsf-progress__bar span {
      transition: none;
    }
  }
`, DIMENSIONS = [
  {
    key: "product_type",
    labelKey: "bsf_step_type_label",
    labelAr: "نوع المنتج",
    labelEn: "Product type",
    options: [
      { value: "foundation", ar: "كريم أساس", en: "Foundation" },
      { value: "concealer", ar: "كونسيلر", en: "Concealer" },
      { value: "blush", ar: "بلاشر", en: "Blush" },
      { value: "lipstick", ar: "أحمر شفاه", en: "Lipstick" },
      { value: "contour", ar: "كونتور", en: "Contour" },
      { value: "powder", ar: "بودرة", en: "Powder" }
    ]
  },
  {
    key: "skin",
    labelKey: "bsf_step_skin_label",
    labelAr: "درجة لون البشرة",
    labelEn: "Skin depth",
    options: [
      { value: "very_fair", ar: "فاتحة جدًا", en: "Very fair" },
      { value: "fair", ar: "فاتحة", en: "Fair" },
      { value: "medium", ar: "متوسطة", en: "Medium" },
      { value: "tan", ar: "حنطية", en: "Tan" },
      { value: "deep", ar: "سمراء", en: "Deep" },
      { value: "dark", ar: "داكنة", en: "Dark" }
    ]
  },
  {
    key: "undertone",
    labelKey: "bsf_step_undertone_label",
    labelAr: "الأندرتون",
    labelEn: "Undertone",
    options: [
      { value: "warm", ar: "دافئ", en: "Warm" },
      { value: "cool", ar: "بارد", en: "Cool" },
      { value: "neutral", ar: "محايد", en: "Neutral" },
      { value: "olive", ar: "زيتوني", en: "Olive" }
    ]
  },
  {
    key: "result",
    labelKey: "bsf_step_result_label",
    labelAr: "النتيجة المطلوبة",
    labelEn: "Desired finish",
    options: [
      { value: "natural", ar: "طبيعية", en: "Natural" },
      { value: "radiant", ar: "مشرقة", en: "Radiant" },
      { value: "matte", ar: "مطفية", en: "Matte" },
      { value: "light", ar: "تغطية خفيفة", en: "Light coverage" },
      { value: "medium_cov", ar: "تغطية متوسطة", en: "Medium coverage" },
      { value: "full_cov", ar: "تغطية عالية", en: "Full coverage" }
    ]
  }
];
function isEn() {
  return getPageLocale() === "en";
}
__name(isEn, "isEn");
function buildSteps(config) {
  const en = isEn();
  return DIMENSIONS.map((dim) => {
    const label = localizedString(config[dim.labelKey]) || (en ? dim.labelEn : dim.labelAr), options = dim.options.map((o) => ({
      value: o.value,
      label: en ? o.en : o.ar
    }));
    return { key: dim.key, label, options };
  });
}
__name(buildSteps, "buildSteps");
function readDimensionValue(row, key) {
  const raw = row[key] ?? row[`bsf_shades.${key}`];
  return getRadioValue(raw, "").toLowerCase().trim();
}
__name(readDimensionValue, "readDimensionValue");
function parseShades(raw) {
  return normalizeCollection(raw).map((row, index) => {
    const name = localizedString(row.shade_name);
    return {
      id: `shade-${index}`,
      hex: localizedString(row.hex) || "#d9b48f",
      shade_name: name,
      shade_number: localizedString(row.shade_number),
      name,
      desc: localizedString(row.desc),
      link: extractLink(row.link),
      product_type: readDimensionValue(row, "product_type"),
      skin: readDimensionValue(row, "skin"),
      undertone: readDimensionValue(row, "undertone"),
      result: readDimensionValue(row, "result")
    };
  }).filter((s) => s.shade_name || s.hex);
}
__name(parseShades, "parseShades");
function filterShades(shades, sel) {
  const keys = ["product_type", "skin", "undertone", "result"], exact = shades.filter(
    (shade) => keys.every((key) => {
      const chosen = sel[key];
      if (!chosen) return !0;
      const shadeVal = shade[key];
      return !shadeVal || shadeVal === chosen;
    })
  );
  if (exact.length) return exact;
  const relaxed = shades.filter((shade) => {
    const typeOk = !sel.product_type || !shade.product_type || shade.product_type === sel.product_type, skinOk = !sel.skin || !shade.skin || shade.skin === sel.skin;
    return typeOk && skinOk;
  });
  return relaxed.length ? relaxed : shades;
}
__name(filterShades, "filterShades");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _BeautyShadeFinder = class _BeautyShadeFinder extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.selection = {}, this.shades = [], this.selectedShadeId = "", this.stepIndex = 0, this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.load();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && this.load();
  }
  load() {
    var _a;
    this.shades = parseShades((_a = this.config) == null ? void 0 : _a.bsf_shades), this.ensureSelectedShade();
  }
  get steps() {
    return buildSteps(this.config || {});
  }
  get onResults() {
    return this.stepIndex >= this.steps.length;
  }
  get filtered() {
    return filterShades(this.shades, this.selection);
  }
  ensureSelectedShade() {
    var _a;
    const list = this.filtered;
    list.some((s) => s.id === this.selectedShadeId) || (this.selectedShadeId = ((_a = list[0]) == null ? void 0 : _a.id) ?? "");
  }
  get selectedShade() {
    return this.filtered.find((s) => s.id === this.selectedShadeId) || null;
  }
  pick(key, value) {
    this.selection = { ...this.selection, [key]: value }, this.ensureSelectedShade();
  }
  goNext() {
    const max = this.steps.length;
    this.stepIndex < max && (this.stepIndex += 1);
  }
  goBack() {
    this.stepIndex > 0 && (this.stepIndex -= 1);
  }
  reset() {
    this.selection = {}, this.stepIndex = 0, this.ensureSelectedShade();
  }
  selectShade(id) {
    this.selectedShadeId = id;
  }
  renderProgress(total) {
    const current = Math.min(this.stepIndex + 1, total), pct = total ? Math.round(Math.min(this.stepIndex, total) / total * 100) : 0;
    return html`
      <div class="bsf-progress" aria-hidden="true">
        <div class="bsf-progress__bar"><span style=${styleMap({ width: `${pct}%` })}></span></div>
        <span class="bsf-progress__text">
          ${this.onResults ? t("النتيجة", "Result") : t(`السؤال ${current} من ${total}`, `Question ${current} of ${total}`)}
        </span>
      </div>
    `;
  }
  renderQuestion(step) {
    var _a;
    const hint = step.key === "undertone" ? localizedString((_a = this.config) == null ? void 0 : _a.bsf_undertone_hint) || t("نصيحة: الأوردة الخضراء غالبًا دافئة، والزرقاء باردة، والمختلطة محايدة.", "Tip: greenish veins often mean warm, bluish mean cool, mixed mean neutral.") : "";
    return html`
      <div class="bsf-question">
        <h3 class="bsf-question__title">${step.label}</h3>
        ${hint ? html`<p class="bsf-question__hint">${hint}</p>` : nothing}
        <div class="bsf-chips" role="group" aria-label=${step.label}>
          ${step.options.map((opt) => {
      const active = this.selection[step.key] === opt.value;
      return html`<button
              type="button"
              class="bsf-chip"
              aria-pressed=${active ? "true" : "false"}
              @click=${() => this.pick(step.key, opt.value)}
            >
              ${opt.label}
            </button>`;
    })}
        </div>
      </div>
    `;
  }
  renderNav(canNext) {
    var _a, _b, _c;
    const back = localizedString((_a = this.config) == null ? void 0 : _a.bsf_back_btn) || t("السابق", "Back"), next = localizedString((_b = this.config) == null ? void 0 : _b.bsf_next_btn) || t("التالي", "Next"), see = localizedString((_c = this.config) == null ? void 0 : _c.bsf_see_btn) || t("عرض الدرجات", "See shades"), lastQ = this.stepIndex === this.steps.length - 1;
    return html`
      <div class="bsf-nav">
        ${this.stepIndex > 0 ? html`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
              ${back}
            </button>` : html`<span></span>`}
        <button
          type="button"
          class="fs-btn fs-tap"
          ?disabled=${!canNext}
          @click=${() => this.goNext()}
        >
          ${lastQ ? see : next}
        </button>
      </div>
    `;
  }
  matchChips(shade) {
    const steps = this.steps, chips = [];
    for (const step of steps) {
      const chosen = this.selection[step.key];
      if (!chosen) continue;
      const shadeVal = shade[step.key], opt = step.options.find((o) => o.value === chosen);
      chips.push({
        label: (opt == null ? void 0 : opt.label) || chosen,
        active: !shadeVal || shadeVal === chosen
      });
    }
    return chips;
  }
  renderDetail(shade, showLink) {
    const external = shade.link ? isExternalUrl(shade.link) : !1, chips = this.matchChips(shade);
    return html`
      <div class="bsf-detail" aria-live="polite">
        <div
          class="bsf-detail__media"
          style=${styleMap({ background: shade.hex })}
          role="img"
          aria-label=${shade.name || shade.shade_number || t("عينة اللون", "Shade swatch")}
        ></div>
        <h4 class="bsf-detail__name">
          ${shade.name || t("درجة مقترحة", "Suggested shade")}
          ${shade.shade_number ? html`<span class="bsf-detail__number"> · ${shade.shade_number}</span>` : nothing}
        </h4>
        ${shade.desc ? html`<p class="bsf-detail__desc">${shade.desc}</p>` : nothing}
        ${chips.length ? html`<div class="bsf-detail__chips" aria-label=${t("سبب المطابقة", "Match reasons")}>
              ${chips.map(
      (chip) => html`<span
                  class=${classMap({
        "fs-pill": !0,
        "bsf-detail__chip": !0,
        "bsf-detail__chip--on": chip.active
      })}
                >${chip.label}</span>`
    )}
            </div>` : nothing}
        ${showLink && shade.link ? html`<div class="bsf-detail__actions">
              <a
                class="fs-btn fs-btn--ghost"
                href=${shade.link}
                target=${external ? "_blank" : "_self"}
                rel=${external ? "noopener noreferrer" : nothing}
              >
                ${t("التفاصيل", "Details")}
              </a>
            </div>` : nothing}
      </div>
    `;
  }
  renderResults() {
    var _a, _b, _c;
    const c = this.config || {}, filtered = this.filtered, selected = this.selectedShade, showLink = isTruthy(c.bsf_show_link, !0), shape = getRadioValue(c.bsf_swatch_shape, "circle"), resultsTitle = localizedString((_a = this.config) == null ? void 0 : _a.bsf_results_title) || t("الدرجات المناسبة لكِ", "Shades that suit you");
    return html`
      <div class="bsf-results">
        <div class="bsf-results__head">
          <h3 class="bsf-results__title">${resultsTitle}</h3>
          <span class="bsf-results__count">${filtered.length}</span>
        </div>
        <div class="bsf-swatches" role="listbox" aria-label=${resultsTitle}>
          ${filtered.map((shade) => {
      const active = shade.id === this.selectedShadeId, label = shade.shade_number || shade.shade_name || shade.name;
      return html`<button
              type="button"
              class=${classMap({
        "bsf-swatch": !0,
        "bsf-swatch--square": shape === "square",
        "bsf-swatch--rounded": shape === "rounded",
        "is-active": active
      })}
              role="option"
              aria-selected=${active ? "true" : "false"}
              aria-pressed=${active ? "true" : "false"}
              aria-label=${shade.name || label || t("درجة", "Shade")}
              @click=${() => this.selectShade(shade.id)}
            >
              <span class="bsf-swatch__ring">
                <span class="bsf-swatch__chip" style=${styleMap({ background: shade.hex || "#c4a484" })}></span>
              </span>
              ${label ? html`<span class="bsf-swatch__name">${label}</span>` : nothing}
            </button>`;
    })}
        </div>
        ${selected ? this.renderDetail(selected, showLink) : html`<p class="fs-empty">${t("لا توجد درجات مطابقة", "No matching shades")}</p>`}
        <div class="bsf-results__actions">
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${() => this.goBack()}>
            ${localizedString((_b = this.config) == null ? void 0 : _b.bsf_back_btn) || t("تعديل الإجابات", "Edit answers")}
          </button>
          <button type="button" class="fs-btn fs-tap" @click=${() => this.reset()}>
            ${localizedString((_c = this.config) == null ? void 0 : _c.bsf_reset_btn) || t("ابدئي من جديد", "Start over")}
          </button>
          ${renderCommerceCtaButton(c, "bsf_")}
        </div>
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bsf_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.bsf_title), desc = localizedString(c.bsf_desc), steps = this.steps, current = steps[this.stepIndex], answered = current ? !!this.selection[current.key] : !1;
    return this.shades.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("محدد درجة المكياج المناسبة", "Beauty shade finder")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="bsf-wrap">
            ${this.renderProgress(steps.length)}
            ${this.onResults ? this.renderResults() : html`
                  ${current ? this.renderQuestion(current) : nothing}
                  ${this.renderNav(answered)}
                `}
          </div>
        </div>
      </section>
    ` : html`<div class="fs-empty" role="status">
        ${t("أضيفي درجات المكياج من إعدادات العنصر", "Add makeup shades in the element settings")}
      </div>`;
  }
};
__name(_BeautyShadeFinder, "BeautyShadeFinder"), _BeautyShadeFinder.styles = [sharedSectionCss, componentStyles];
let BeautyShadeFinder = _BeautyShadeFinder;
__decorateClass([
  property({ type: Object })
], BeautyShadeFinder.prototype, "config");
__decorateClass([
  state()
], BeautyShadeFinder.prototype, "selection");
__decorateClass([
  state()
], BeautyShadeFinder.prototype, "shades");
__decorateClass([
  state()
], BeautyShadeFinder.prototype, "selectedShadeId");
__decorateClass([
  state()
], BeautyShadeFinder.prototype, "stepIndex");
typeof BeautyShadeFinder < "u" && BeautyShadeFinder.registerSallaComponent("salla-beauty-shade-finder");
export {
  BeautyShadeFinder as default
};
