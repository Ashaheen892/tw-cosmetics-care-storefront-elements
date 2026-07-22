var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, e as extractImageUrl, g as getRadioValue, h as clamp, j as toNumber, s as sharedSectionCss, o as getPageLocale, p as prefersReducedMotion, i as isTruthy, t, r as readSectionTheme, a as themeStyleMap } from "./sharedStyles-2kfPtH3m.js";
import { r as renderCommerceCtaButton } from "./commerceOutcome-BDH0KFrf.js";
const componentStyles = css`
  .bta-samples {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .bta-sample {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    width: 5.5rem;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    font: inherit;
  }

  .bta-sample__blob {
    width: 3.4rem;
    height: 3.4rem;
    background: var(--sample-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: inset 0 -6px 10px rgba(0, 0, 0, 0.15), 0 6px 14px rgba(43, 33, 28, 0.18);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .bta-sample:hover .bta-sample__blob { transform: scale(1.08); }
  .bta-sample.is-active .bta-sample__blob {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--sample-color, var(--accent-color, var(--fs-store-primary))) 40%, transparent), 0 8px 18px rgba(43, 33, 28, 0.22);
  }

  .bta-sample__name { font-size: 0.78rem; font-weight: 700; color: var(--text-color, #000000); text-align: center; }

  /* shape variants */
  .bta-samples--drops .bta-sample__blob { border-radius: 50% 50% 50% 8px; transform: rotate(45deg); }
  .bta-samples--drops .bta-sample:hover .bta-sample__blob { transform: rotate(45deg) scale(1.08); }
  .bta-samples--circles .bta-sample__blob { border-radius: 50%; }
  .bta-samples--swatches .bta-sample__blob { border-radius: 14px; width: 4.2rem; height: 2.8rem; }
  .bta-samples--slides .bta-sample__blob { border-radius: 4px; width: 4.4rem; height: 2.4rem; background: linear-gradient(120deg, color-mix(in srgb, var(--sample-color) 55%, transparent), var(--sample-color)); border: 1px solid rgba(255,255,255,0.4); }
  .bta-samples--blobs .bta-sample__blob { border-radius: 42% 58% 63% 37% / 42% 44% 56% 58%; }
  .bta-samples--bubbles .bta-sample__blob { border-radius: 50%; background: radial-gradient(circle at 32% 30%, rgba(255,255,255,0.75), var(--sample-color) 60%); }

  /* experience area */
  .bta-stage {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: 1fr;
    align-items: start;
  }
  @media (min-width: 820px) {
    .bta-stage { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 1.75rem; }
  }

  .bta-play {
    position: relative;
    aspect-ratio: 4 / 3;
    border-radius: var(--section-radius, 16px);
    overflow: hidden;
    background: var(--bta-area, color-mix(in srgb, var(--border-color, #e5e7eb) 35%, var(--card-bg, #fff)));
    border: 1px solid var(--border-color, #e5e7eb);
    display: grid;
    place-items: center;
    touch-action: none;
  }

  .bta-play__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

  .bta-smear {
    width: 30%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(--sample-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: inset 0 -8px 14px rgba(0, 0, 0, 0.16);
    transform: scale(calc(0.5 + var(--spread, 0) * 1.9));
    opacity: calc(1 - var(--spread, 0) * 0.55);
    transition: transform var(--spread-speed, 500ms) ease, opacity var(--spread-speed, 500ms) ease;
    will-change: transform;
  }

  .bta-play__hint {
    position: absolute;
    inset-inline: 0;
    bottom: 3.5rem;
    text-align: center;
    font-size: 0.74rem;
    color: var(--muted-color, #666666);
    pointer-events: none;
  }

  .bta-play__cta {
    position: absolute;
    left: 50%;
    bottom: 0.85rem;
    transform: translateX(-50%);
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    min-height: 44px;
    padding: 0.55rem 1.25rem;
    border: none;
    border-radius: 999px;
    background: var(--sample-color, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    font: inherit;
    font-size: 0.88rem;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 8px 22px color-mix(in srgb, var(--sample-color, var(--accent-color, var(--fs-store-primary))) 45%, transparent);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    white-space: nowrap;
  }

  [dir='rtl'] .bta-play__cta {
    left: 50%;
    right: auto;
  }

  .bta-play__cta:hover,
  .bta-play__cta:focus-visible {
    transform: translateX(-50%) scale(1.02);
    box-shadow: 0 10px 26px color-mix(in srgb, var(--sample-color, var(--accent-color, var(--fs-store-primary))) 55%, transparent);
  }

  [dir='rtl'] .bta-play__cta:hover,
  [dir='rtl'] .bta-play__cta:focus-visible {
    transform: translateX(-50%) scale(1.02);
  }

  .bta-play__cta-icon {
    width: 1.35rem;
    height: 1.35rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.22);
    font-size: 0.72rem;
    line-height: 1;
  }

  .bta-details { display: grid; gap: 0.85rem; }
  .bta-details__name { margin: 0; font-size: 1.15rem; font-weight: 800; color: var(--text-color, #000000); }
  .bta-details__desc { margin: 0; color: var(--muted-color, #666666); line-height: 1.65; font-size: 0.9rem; }

  .bta-indicators { display: grid; gap: 0.55rem; }

  .bta-indicators .fs-meter {
    --meter-fill: var(--meter-color, var(--accent-color, var(--fs-store-primary)));
  }

  .bta-indicators .fs-meter > span {
    background: var(--meter-fill, var(--accent-color, var(--fs-store-primary)));
  }

  .bta-ind { display: grid; grid-template-columns: 7.5rem 1fr auto; align-items: center; gap: 0.6rem; font-size: 0.8rem; }
  .bta-ind__label { color: var(--muted-color, #666666); font-weight: 700; }
  .bta-ind__val { color: var(--meter-color, var(--accent-color, var(--fs-store-primary))); font-weight: 800; font-variant-numeric: tabular-nums; }

  .bta-dots { display: inline-flex; gap: 0.28rem; }
  .bta-dot { width: 0.72rem; height: 0.72rem; border-radius: 50%; background: color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent); }
  .bta-dot.is-on { background: var(--meter-color, var(--accent-color, var(--fs-store-primary))); }
  .bta-circle { width: 0.8rem; height: 0.8rem; border-radius: 50%; border: 2px solid var(--meter-color, var(--accent-color, var(--fs-store-primary))); }
  .bta-circle.is-on { background: var(--meter-color, var(--accent-color, var(--fs-store-primary))); }

  .bta-gauge {
    --p: 0;
    width: 3rem;
    height: 1.5rem;
    border-radius: 3rem 3rem 0 0;
    background:
      conic-gradient(from 270deg at 50% 100%, var(--meter-color, var(--accent-color, var(--fs-store-primary))) calc(var(--p) * 180deg), color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent) 0);
  }

  .bta-facts { display: grid; gap: 0.4rem; font-size: 0.84rem; }
  .bta-fact { display: flex; gap: 0.4rem; }
  .bta-fact b { color: var(--text-color, #000000); font-weight: 700; flex: 0 0 auto; }
  .bta-fact span { color: var(--muted-color, #666666); }

  .bta-note { margin: 0; font-size: 0.82rem; color: color-mix(in srgb, var(--fs-caution, #e0a100) 45%, var(--text-color, #000000)); }

  .bta-toolbar { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-top: 1.25rem; }

  /* compare */
  .bta-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.25rem; }
  .bta-compare__col {
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: var(--section-radius, 16px);
    padding: 1rem;
    display: grid;
    gap: 0.75rem;
  }
  .bta-compare__picks { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1.25rem; }
  .bta-compare__picks select {
    width: 100%;
    padding: 0.5rem 0.6rem;
    border-radius: 10px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 600;
  }
  .bta-ind__val.is-higher { color: var(--success-color, #2f9e63); }

  @media (max-width: 639px) {
    .bta-ind { grid-template-columns: 6rem 1fr auto; }
    .bta-compare { grid-template-columns: 1fr; }
    .bta-compare__picks { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .bta-smear, .bta-sample__blob, .bta-play__cta { transition: none !important; }
  }
`, SAMPLE_SHAPES = ["drops", "circles", "swatches", "slides", "blobs", "bubbles"], INDICATOR_TYPES = ["bars", "dots", "circles", "semicircle"], lvl = /* @__PURE__ */ __name((v) => clamp(toNumber(v, 0), 0, 5), "lvl");
function parseTextures(raw) {
  return normalizeCollection(raw).map((tx, i) => ({
    id: String(tx.id ?? tx.tex_id ?? "").trim() || `texture-${i + 1}`,
    name: localizedString(tx.name) || `${i + 1}`,
    icon: String(tx.icon ?? "").trim(),
    image: extractImageUrl(tx.image),
    color: String(tx.color ?? "").trim() || "#c9a24b",
    desc: localizedString(tx.desc),
    lightness: lvl(tx.lightness),
    thickness: lvl(tx.thickness),
    absorption: lvl(tx.absorption),
    hydration: lvl(tx.hydration),
    gloss: lvl(tx.gloss),
    greasiness: lvl(tx.greasiness),
    finish: localizedString(tx.finish),
    spread: localizedString(tx.spread),
    amount: localizedString(tx.amount),
    timing: localizedString(tx.timing),
    usage: localizedString(tx.usage),
    tips: localizedString(tx.tips),
    note: localizedString(tx.note)
  })).filter((tx) => tx.name || tx.desc);
}
__name(parseTextures, "parseTextures");
function indicatorRows(tx, locale) {
  return [
    ["lightness", ["الخفة", "Lightness"], tx.lightness],
    ["thickness", ["السماكة", "Thickness"], tx.thickness],
    ["absorption", ["سرعة الامتصاص", "Absorption"], tx.absorption],
    ["hydration", ["الترطيب", "Hydration"], tx.hydration],
    ["gloss", ["اللمعان", "Gloss"], tx.gloss],
    ["greasiness", ["الإحساس الدهني", "Greasiness"], tx.greasiness]
  ].filter(([, , v]) => v > 0).map(([key, [ar, en], value]) => ({ key, label: locale === "en" ? en : ar, value }));
}
__name(indicatorRows, "indicatorRows");
function resolveSampleShape(config) {
  const value = getRadioValue(config.bta_sample_shape, "drops");
  return SAMPLE_SHAPES.includes(value) ? value : "drops";
}
__name(resolveSampleShape, "resolveSampleShape");
function resolveIndicatorType(config) {
  const value = getRadioValue(config.bta_indicator_type, "bars");
  return INDICATOR_TYPES.includes(value) ? value : "bars";
}
__name(resolveIndicatorType, "resolveIndicatorType");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _BeautyTextureAbsorptionLab = class _BeautyTextureAbsorptionLab extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.selId = "", this.cmpA = "", this.cmpB = "", this.spread = 0, this.compareOpen = !1, this.boundLangHandler = () => this.requestUpdate(), this.onPlayPointer = (e) => {
      var _a;
      const area = e.currentTarget;
      (_a = area.setPointerCapture) == null || _a.call(area, e.pointerId);
      const rect = area.getBoundingClientRect(), ratio = getComputedStyle(this).direction === "rtl" ? (rect.right - e.clientX) / rect.width : (e.clientX - rect.left) / rect.width;
      this.spread = clamp(Number(ratio.toFixed(2)), 0, 1);
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && (this.selId = "", this.cmpA = "", this.cmpB = "", this.spread = 0);
  }
  get locale() {
    return getPageLocale() === "en" ? "en" : "ar";
  }
  get textures() {
    var _a;
    return parseTextures((_a = this.config) == null ? void 0 : _a.bta_textures);
  }
  active(textures) {
    var _a;
    const preset = String(((_a = this.config) == null ? void 0 : _a.bta_default_texture) ?? "").trim();
    return textures.find((tx) => tx.id === this.selId) || textures.find((tx) => tx.id === preset) || textures[0];
  }
  motionDisabled() {
    var _a;
    if (prefersReducedMotion()) return !0;
    if (isTruthy((_a = this.config) == null ? void 0 : _a.bta_disable_motion_mobile, !1))
      try {
        return window.matchMedia("(max-width: 639px)").matches;
      } catch {
        return !1;
      }
    return !1;
  }
  select(id) {
    this.selId = id, this.spread = 0;
  }
  toggleSpread() {
    this.spread = this.spread > 0.5 ? 0 : 1;
  }
  renderIndicators(tx, type, higher) {
    const rows = indicatorRows(tx, this.locale);
    return rows.length ? html`<div class="bta-indicators" style=${styleMap({ "--meter-color": tx.color })}>
      ${rows.map((row) => {
      const pct = row.value / 5 * 100;
      let visual;
      return type === "dots" || type === "circles" ? visual = html`<span class="bta-dots">
            ${[1, 2, 3, 4, 5].map(
        (n) => html`<span class=${classMap({ [type === "dots" ? "bta-dot" : "bta-circle"]: !0, "is-on": n <= row.value })}></span>`
      )}
          </span>` : type === "semicircle" ? visual = html`<span class="bta-gauge" style=${styleMap({ "--p": String(row.value / 5) })}></span>` : visual = html`<span class="fs-meter"><span style=${styleMap({ width: `${pct}%` })}></span></span>`, html`<div class="bta-ind">
          <span class="bta-ind__label">${row.label}</span>
          ${visual}
          <span class=${classMap({ "bta-ind__val": !0, "is-higher": !!(higher != null && higher[row.key]) })}>${row.value}/5</span>
        </div>`;
    })}
    </div>` : nothing;
  }
  renderFacts(tx) {
    const facts = [
      [t("اللمسة النهائية", "Finish"), tx.finish],
      [t("طريقة التوزيع", "Application"), tx.spread],
      [t("الكمية", "Amount"), tx.amount],
      [t("التوقيت", "When"), tx.timing],
      [t("الاستخدام المناسب", "Best for"), tx.usage]
    ].filter(([, v]) => !!v);
    return facts.length ? html`<div class="bta-facts">
      ${facts.map(([label, value]) => html`<div class="bta-fact"><b>${label}:</b><span>${value}</span></div>`)}
    </div>` : nothing;
  }
  renderExplore(textures) {
    const c = this.config || {}, tx = this.active(textures), indType = resolveIndicatorType(c), showIndicators = isTruthy(c.bta_show_indicators, !0), enableSpread = isTruthy(c.bta_enable_spread, !0), showImages = isTruthy(c.bta_show_images, !0), showTips = isTruthy(c.bta_show_tips, !0), showNotes = isTruthy(c.bta_show_notes, !0), speed = this.motionDisabled() ? 0 : Math.max(0, toNumber(c.bta_spread_speed, 500));
    return html`<div class="bta-stage" style=${styleMap({ "--sample-color": tx.color, "--meter-color": tx.color })}>
      <div
        class="bta-play"
        style=${styleMap({ "--spread": String(this.spread), "--spread-speed": `${speed}ms` })}
        @pointerdown=${enableSpread ? this.onPlayPointer : void 0}
        @pointermove=${enableSpread ? (e) => {
      e.buttons && this.onPlayPointer(e);
    } : void 0}
      >
        ${showImages && tx.image ? html`<img class="bta-play__img" src=${tx.image} alt=${tx.name} loading="lazy" decoding="async" />` : html`<span class="bta-smear"></span>`}
        ${enableSpread ? html`<button type="button" class="bta-play__cta" @click=${() => this.toggleSpread()}>
              <span class="bta-play__cta-icon" aria-hidden="true">${this.spread > 0.5 ? "↺" : "▶"}</span>
              ${this.spread > 0.5 ? t("إعادة", "Reset") : t("طبّقي القوام", "Apply texture")}
            </button>` : nothing}
        ${enableSpread && !tx.image ? html`<span class="bta-play__hint">${t("اسحبي داخل المساحة لرؤية الانتشار", "Drag inside the area to see it spread")}</span>` : nothing}
      </div>

      <div class="bta-details">
        <h3 class="bta-details__name">${tx.name}</h3>
        ${tx.desc ? html`<p class="bta-details__desc">${tx.desc}</p>` : nothing}
        ${showIndicators ? this.renderIndicators(tx, indType) : nothing}
        ${this.renderFacts(tx)}
        ${showTips && tx.tips ? html`<p class="bta-details__desc">💡 ${tx.tips}</p>` : nothing}
        ${showNotes && tx.note ? html`<p class="bta-note">★ ${tx.note}</p>` : nothing}
      </div>
    </div>`;
  }
  renderCompare(textures) {
    const c = this.config || {}, indType = resolveIndicatorType(c), a = textures.find((tx) => tx.id === this.cmpA) || textures[0], b = textures.find((tx) => tx.id === this.cmpB) || textures[1] || textures[0], keys = ["lightness", "thickness", "absorption", "hydration", "gloss", "greasiness"], higherA = {}, higherB = {};
    for (const k of keys)
      a[k] > b[k] ? higherA[k] = !0 : b[k] > a[k] && (higherB[k] = !0);
    const picker = /* @__PURE__ */ __name((id, current, onChange, label) => html`
      <div>
        <label style="font-size:0.76rem;font-weight:700;color:var(--muted-color);display:block;margin-bottom:0.25rem">${label}</label>
        <select id=${id} @change=${(e) => onChange(e.target.value)}>
          ${textures.map((tx) => html`<option value=${tx.id} ?selected=${tx.id === (current == null ? void 0 : current.id)}>${tx.name}</option>`)}
        </select>
      </div>
    `, "picker");
    return html`
      <div class="bta-compare__picks">
        ${picker("bta-a", a, (v) => this.cmpA = v, t("القوام الأول", "First texture"))}
        ${picker("bta-b", b, (v) => this.cmpB = v, t("القوام الثاني", "Second texture"))}
      </div>
      <div class="bta-compare">
        <div class="bta-compare__col" style=${styleMap({ "--sample-color": a.color, "--meter-color": a.color })}>
          <h3 class="bta-details__name">${a.name}</h3>
          ${this.renderIndicators(a, indType, higherA)}
          ${this.renderFacts(a)}
        </div>
        <div class="bta-compare__col" style=${styleMap({ "--sample-color": b.color, "--meter-color": b.color })}>
          <h3 class="bta-details__name">${b.name}</h3>
          ${this.renderIndicators(b, indType, higherB)}
          ${this.renderFacts(b)}
        </div>
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bta_"), animate = theme.animate && !prefersReducedMotion(), textures = this.textures, title = localizedString(c.bta_title), desc = localizedString(c.bta_desc), shape = resolveSampleShape(c), enableCompare = isTruthy(c.bta_enable_compare, !0) && textures.length >= 2, active = textures.length ? this.active(textures) : null;
    return textures.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap({
      ...themeStyleMap(theme),
      "--bta-area": String(c.bta_area_color ?? ""),
      "--success-color": "#2f9e63"
    })}
        aria-label=${title || t("مختبر القوام والامتصاص", "Texture & absorption lab")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class=${classMap({ "bta-samples": !0, [`bta-samples--${shape}`]: !0 })} role="tablist">
            ${textures.map(
      (tx) => html`<button
                type="button"
                role="tab"
                class=${classMap({ "bta-sample": !0, "is-active": tx.id === (active == null ? void 0 : active.id) && !this.compareOpen })}
                aria-selected=${tx.id === (active == null ? void 0 : active.id) ? "true" : "false"}
                style=${styleMap({ "--sample-color": tx.color })}
                @click=${() => {
        this.compareOpen = !1, this.select(tx.id);
      }}
              >
                <span class="bta-sample__blob">${tx.icon && !tx.icon.startsWith("sicon-") ? tx.icon : ""}</span>
                <span class="bta-sample__name">${tx.name}</span>
              </button>`
    )}
          </div>

          ${this.compareOpen && enableCompare ? this.renderCompare(textures) : this.renderExplore(textures)}

          <div class="bta-toolbar">
            ${enableCompare ? html`
                <button
                  type="button"
                  class=${this.compareOpen ? "fs-btn fs-btn--ghost" : "fs-btn"}
                  @click=${() => this.compareOpen = !1}
                >${t("استكشاف قوام", "Explore one")}</button>
                <button
                  type="button"
                  class=${this.compareOpen ? "fs-btn" : "fs-btn fs-btn--ghost"}
                  @click=${() => this.compareOpen = !0}
                >${t("مقارنة قوامين", "Compare two")}</button>
                ` : nothing}
            ${renderCommerceCtaButton(c, "bta_")}
          </div>
        </div>
      </section>
    ` : html`<div class="fs-empty" role="status">
        ${t("أضيفي أنواع القوام من إعدادات العنصر لعرض المختبر.", "Add texture types in the element settings to show the lab.")}
      </div>`;
  }
};
__name(_BeautyTextureAbsorptionLab, "BeautyTextureAbsorptionLab"), _BeautyTextureAbsorptionLab.styles = [sharedSectionCss, componentStyles];
let BeautyTextureAbsorptionLab = _BeautyTextureAbsorptionLab;
__decorateClass([
  property({ type: Object })
], BeautyTextureAbsorptionLab.prototype, "config");
__decorateClass([
  state()
], BeautyTextureAbsorptionLab.prototype, "selId");
__decorateClass([
  state()
], BeautyTextureAbsorptionLab.prototype, "cmpA");
__decorateClass([
  state()
], BeautyTextureAbsorptionLab.prototype, "cmpB");
__decorateClass([
  state()
], BeautyTextureAbsorptionLab.prototype, "spread");
__decorateClass([
  state()
], BeautyTextureAbsorptionLab.prototype, "compareOpen");
typeof BeautyTextureAbsorptionLab < "u" && BeautyTextureAbsorptionLab.registerSallaComponent("salla-beauty-texture-absorption-lab");
export {
  BeautyTextureAbsorptionLab as default
};
