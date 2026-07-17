import { css as L, LitElement as S, nothing as n, html as t } from "lit";
import { property as C, state as I } from "lit/decorators.js";
import { classMap as x } from "lit/directives/class-map.js";
import { styleMap as h } from "lit/directives/style-map.js";
import { n as T, l, b as j, e as A, d as P, g as M, s as H, t as s, i as y, r as N, p as O, a as D } from "./sharedStyles-cRSiglXC.js";
const E = L`
  .bff-layout {
    display: grid;
    gap: 1.5rem;
    align-items: start;
  }

  @media (min-width: 860px) {
    .bff-layout {
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
      gap: 2rem;
    }
  }

  /* —— Selector —— */
  .bff-selector {
    min-width: 0;
  }

  .bff-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .bff-chips--list {
    flex-direction: column;
    flex-wrap: nowrap;
  }

  .bff-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    min-height: 44px;
    padding: 0.5rem 0.9rem 0.5rem 0.6rem;
    padding-inline: 0.6rem 0.9rem;
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: 999px;
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-size: 0.88rem;
    font-weight: 700;
    line-height: 1.2;
    cursor: pointer;
    text-align: start;
    box-shadow: 0 3px 10px rgba(43, 33, 28, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }

  .bff-chips--list .bff-chip {
    width: 100%;
    justify-content: flex-start;
    border-radius: calc(var(--section-radius, 16px) * 0.7);
  }

  .bff-chip:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(43, 33, 28, 0.1);
  }

  .bff-chip.is-active {
    border-color: var(--fam-color, var(--accent-color, #c2527f));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 30%, transparent),
      0 8px 18px rgba(43, 33, 28, 0.12);
  }

  .bff-chip__swatch {
    flex: 0 0 auto;
    width: 1.6rem;
    height: 1.6rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--fam-color, var(--accent-color, #c2527f));
    color: #fff;
    font-size: 0.9rem;
    line-height: 1;
    box-shadow: inset 0 0 0 2px color-mix(in srgb, #fff 45%, transparent);
  }

  .bff-chip__name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bff-chips--list .bff-chip__name {
    white-space: normal;
  }

  /* —— Wheel layout: radial arrangement —— */
  .bff-chips--wheel {
    position: relative;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
  }

  @media (min-width: 560px) {
    .bff-chips--wheel {
      min-height: 320px;
      border-radius: 50%;
    }
    .bff-chips--wheel .bff-chip {
      position: absolute;
      top: 50%;
      inset-inline-start: 50%;
      transform: translate(-50%, -50%)
        rotate(var(--i-angle, 0deg)) translate(var(--wheel-r, 130px))
        rotate(calc(-1 * var(--i-angle, 0deg)));
    }
    .bff-chips--wheel .bff-chip:hover {
      transform: translate(-50%, -50%)
        rotate(var(--i-angle, 0deg)) translate(var(--wheel-r, 130px))
        rotate(calc(-1 * var(--i-angle, 0deg))) scale(1.06);
    }
    .bff-wheel-core {
      position: absolute;
      top: 50%;
      inset-inline-start: 50%;
      transform: translate(-50%, -50%);
      width: 5.5rem;
      height: 5.5rem;
      display: grid;
      place-items: center;
      text-align: center;
      border-radius: 50%;
      background: color-mix(in srgb, var(--accent-color, #c2527f) 12%, var(--card-bg, #fff));
      border: 1px dashed color-mix(in srgb, var(--accent-color, #c2527f) 45%, transparent);
      color: var(--muted-color, #8f7a86);
      font-size: 0.72rem;
      font-weight: 700;
      padding: 0.5rem;
      pointer-events: none;
    }
  }

  .bff-wheel-core {
    display: none;
  }

  /* —— Detail panel —— */
  .bff-panel {
    padding: 1.15rem 1.15rem 1.25rem;
    min-width: 0;
  }

  .bff-panel__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.6rem;
  }

  .bff-panel__title {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    margin: 0;
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
    min-width: 0;
  }

  .bff-panel__badge {
    flex: 0 0 auto;
    width: 1.9rem;
    height: 1.9rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--fam-color, var(--accent-color, #c2527f));
    color: #fff;
    font-size: 1rem;
    line-height: 1;
    box-shadow: inset 0 0 0 2px color-mix(in srgb, #fff 45%, transparent);
  }

  .bff-nav {
    display: inline-flex;
    gap: 0.35rem;
    flex: 0 0 auto;
  }

  .bff-nav__btn {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    border: 1px solid var(--border-color, #f2dde7);
    background: var(--card-bg, #fff);
    color: var(--accent-color, #c2527f);
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .bff-nav__btn:hover {
    background: color-mix(in srgb, var(--accent-color, #c2527f) 10%, var(--card-bg, #fff));
  }

  .bff-panel__img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 0.9rem;
    display: block;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 40%, var(--card-bg, #fff));
  }

  .bff-panel__desc {
    margin: 0 0 0.9rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .bff-mood {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1rem;
  }

  .bff-mood__tag {
    font-size: 0.74rem;
    font-weight: 700;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 14%, var(--card-bg, #fff));
    color: color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 80%, var(--text-color, #33232e));
  }

  /* —— Notes pyramid —— */
  .bff-pyramid {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .bff-tier {
    width: 100%;
    border-radius: 12px;
    padding: 0.7rem 0.9rem;
    background: color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) var(--tier-tint, 10%), var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 30%, transparent);
    box-sizing: border-box;
    text-align: center;
    transition: width 0.35s ease;
  }

  .bff-tier--top {
    width: 62%;
    --tier-tint: 8%;
  }
  .bff-tier--heart {
    width: 82%;
    --tier-tint: 14%;
  }
  .bff-tier--base {
    width: 100%;
    --tier-tint: 20%;
  }

  .bff-tier__label {
    display: block;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: color-mix(in srgb, var(--fam-color, var(--accent-color, #c2527f)) 85%, var(--text-color, #33232e));
    margin-bottom: 0.35rem;
  }

  .bff-tier__notes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.3rem 0.4rem;
  }

  .bff-note {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text-color, #33232e);
    background: color-mix(in srgb, var(--card-bg, #fff) 78%, transparent);
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    line-height: 1.4;
  }

  .bff-tier__empty {
    font-size: 0.76rem;
    color: var(--muted-color, #8f7a86);
  }

  @media (max-width: 480px) {
    .bff-tier--top,
    .bff-tier--heart,
    .bff-tier--base {
      width: 100%;
    }
  }

  /* —— Facts rows —— */
  .bff-facts {
    display: grid;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  @media (min-width: 480px) {
    .bff-facts {
      grid-template-columns: 1fr 1fr;
    }
  }

  .bff-fact {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    padding: 0.6rem 0.75rem;
    border-radius: 10px;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 22%, var(--card-bg, #fff));
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bff-fact__label {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--muted-color, #8f7a86);
  }

  .bff-fact__value {
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--text-color, #33232e);
  }

  .bff-panel__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .bff-notice {
    margin-top: 1.25rem;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.6;
  }

  @media (prefers-reduced-motion: reduce) {
    .bff-chip,
    .bff-tier,
    .bff-nav__btn {
      transition: none !important;
    }
  }
`, R = ["wheel", "grid", "list"];
function w(d) {
  const e = l(d, "");
  return e ? e.split(/\r?\n|،|;|,/).map((a) => a.trim()).filter(Boolean) : [];
}
function U(d) {
  return T(d).map((e, a) => {
    const o = l(e.name);
    return {
      id: String(e.family_id ?? "").trim() || `family-${a + 1}`,
      name: o,
      color: String(e.color ?? "").trim(),
      icon: String(e.icon ?? "").trim(),
      desc: l(e.desc),
      mood: P(e.mood),
      top: w(e.top_notes),
      heart: w(e.heart_notes),
      base: w(e.base_notes),
      season: l(e.season),
      occasion: l(e.occasion),
      image: A(e.image),
      link: j(e.link)
    };
  }).filter((e) => e.name || e.desc);
}
function W(d) {
  const e = M(d.bff_layout, "grid");
  return R.includes(e) ? e : "grid";
}
var Y = Object.defineProperty, k = (d, e, a, o) => {
  for (var r = void 0, i = d.length - 1, c; i >= 0; i--)
    (c = d[i]) && (r = c(e, a, r) || r);
  return r && Y(e, a, r), r;
};
const $ = class $ extends S {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && (this.activeId = "");
  }
  get families() {
    var e;
    return U((e = this.config) == null ? void 0 : e.bff_families);
  }
  resolveActive(e) {
    var o;
    if (!e.length) return null;
    if (this.activeId) {
      const r = e.find((i) => i.id === this.activeId);
      if (r) return r;
    }
    const a = String(((o = this.config) == null ? void 0 : o.bff_default_family) ?? "").trim();
    if (a) {
      const r = e.find((i) => i.id === a);
      if (r) return r;
    }
    return e[0];
  }
  select(e) {
    this.activeId = e;
  }
  step(e, a) {
    var c;
    if (!e.length) return;
    const o = this.resolveActive(e), i = ((o ? e.findIndex((f) => f.id === o.id) : -1) + a + e.length) % e.length;
    this.activeId = ((c = e[i]) == null ? void 0 : c.id) ?? "";
  }
  renderChip(e, a, o, r) {
    var p;
    const i = ((p = this.resolveActive(this.families)) == null ? void 0 : p.id) === e.id, c = e.icon.startsWith("sicon-"), f = e.color ? { "--fam-color": e.color } : {};
    return a === "wheel" && (f["--i-angle"] = `${360 / Math.max(r, 1) * o}deg`), t`
      <button
        type="button"
        class=${x({ "bff-chip": !0, "is-active": i })}
        style=${h(f)}
        aria-pressed=${i ? "true" : "false"}
        aria-controls="bff-detail"
        title=${e.name}
        @click=${() => this.select(e.id)}
      >
        <span class="bff-chip__swatch">
          ${e.icon ? c ? t`<span class=${e.icon}></span>` : t`<span>${e.icon}</span>` : n}
        </span>
        <span class="bff-chip__name">${e.name}</span>
      </button>
    `;
  }
  renderTier(e, a, o) {
    return t`
      <div class=${`bff-tier bff-tier--${e}`}>
        <span class="bff-tier__label">${a}</span>
        ${o.length ? t`<div class="bff-tier__notes">
              ${o.map((r) => t`<span class="bff-note">${r}</span>`)}
            </div>` : t`<span class="bff-tier__empty">${s("—", "—")}</span>`}
      </div>
    `;
  }
  renderDetail(e, a) {
    const o = this.config || {}, r = a.length > 1, i = y(o.bff_show_pyramid, !0), c = e.icon.startsWith("sicon-"), f = l(o.bff_pyramid_top_label) || s("المقدمة", "Top"), p = l(o.bff_pyramid_heart_label) || s("القلب", "Heart"), g = l(o.bff_pyramid_base_label) || s("الأساس", "Base"), m = l(o.bff_season_label) || s("أفضل موسم", "Best season"), v = l(o.bff_occasion_label) || s("المناسبة", "Occasion"), u = e.top.length || e.heart.length || e.base.length, _ = e.color ? { "--fam-color": e.color } : {};
    return t`
      <div class="fs-card bff-panel" id="bff-detail" role="region" aria-live="polite" style=${h(_)}>
        <div class="bff-panel__head">
          <h3 class="bff-panel__title">
            ${e.icon ? t`<span class="bff-panel__badge">${c ? t`<span class=${e.icon}></span>` : e.icon}</span>` : n}
            <span>${e.name}</span>
          </h3>
          ${r ? t`<div class="bff-nav">
                <button type="button" class="bff-nav__btn" aria-label=${s("السابق", "Previous")} @click=${() => this.step(a, -1)}>‹</button>
                <button type="button" class="bff-nav__btn" aria-label=${s("التالي", "Next")} @click=${() => this.step(a, 1)}>›</button>
              </div>` : n}
        </div>

        ${e.image ? t`<img class="bff-panel__img" src=${e.image} alt="" loading="lazy" decoding="async" />` : n}
        ${e.desc ? t`<p class="bff-panel__desc">${e.desc}</p>` : n}

        ${e.mood.length ? t`<div class="bff-mood">
              ${e.mood.map((z) => t`<span class="bff-mood__tag">${z}</span>`)}
            </div>` : n}

        ${i && u ? t`<div class="bff-pyramid" role="list">
              ${this.renderTier("top", f, e.top)}
              ${this.renderTier("heart", p, e.heart)}
              ${this.renderTier("base", g, e.base)}
            </div>` : n}

        ${e.season || e.occasion ? t`<div class="bff-facts">
              ${e.season ? t`<div class="bff-fact">
                    <span class="bff-fact__label">${m}</span>
                    <span class="bff-fact__value">${e.season}</span>
                  </div>` : n}
              ${e.occasion ? t`<div class="bff-fact">
                    <span class="bff-fact__label">${v}</span>
                    <span class="bff-fact__value">${e.occasion}</span>
                  </div>` : n}
            </div>` : n}

        ${e.link ? t`<div class="bff-panel__actions">
              <a class="fs-btn fs-btn--ghost" href=${e.link} target="_blank" rel="noopener noreferrer">
                ${s("اقرئي المزيد", "Read more")}
              </a>
            </div>` : n}
      </div>
    `;
  }
  render() {
    const e = this.config || {}, a = N(e, "bff_"), o = a.animate && !O(), r = this.families, i = l(e.bff_title), c = l(e.bff_desc), f = W(e), p = y(e.bff_show_notice, !0), g = l(e.bff_notice) || s(
      "اختيار العطر تجربة شخصية؛ هذه العائلات دليل استكشافي لمساعدتك على تحديد ما يناسب ذوقك.",
      "Choosing a fragrance is personal; these families are an exploratory guide to help you find what suits your taste."
    );
    if (!r.length)
      return t`<div class="fs-empty" role="status">
        ${s("أضيفي عائلات عطرية من إعدادات العنصر.", "Add fragrance families in the element settings.")}
      </div>`;
    const m = this.resolveActive(r), v = r.length;
    return t`
      <section
        class=${x({ "fs-section": !0, "fs-animate": o })}
        style=${h(D(a))}
        aria-label=${i || s("محدد عائلة العطر", "Fragrance family finder")}
      >
        <div class="fs-container">
          ${i || c ? t`<div class="fs-header">
                ${i ? t`<h2 class="fs-title">${i}</h2>` : n}
                ${c ? t`<p class="fs-desc">${c}</p>` : n}
              </div>` : n}

          <div class="bff-layout">
            <div class="bff-selector">
              <div
                class=${x({
      "bff-chips": !0,
      [`bff-chips--${f}`]: !0
    })}
                role="group"
                aria-label=${s("عائلات العطر", "Fragrance families")}
                style=${h(f === "wheel" ? { "--wheel-r": "130px" } : {})}
              >
                ${f === "wheel" ? t`<div class="bff-wheel-core">${s("اختاري عائلة", "Pick a family")}</div>` : n}
                ${r.map((u, _) => this.renderChip(u, f, _, v))}
              </div>
            </div>

            ${m ? this.renderDetail(m, r) : n}
          </div>

          ${p ? t`<p class="bff-notice">${g}</p>` : n}
        </div>
      </section>
    `;
  }
};
$.styles = [H, E];
let b = $;
k([
  C({ type: Object })
], b.prototype, "config");
k([
  I()
], b.prototype, "activeId");
typeof b < "u" && b.registerSallaComponent("salla-beauty-fragrance-finder");
export {
  b as default
};
