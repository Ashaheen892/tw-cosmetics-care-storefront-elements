import { css as I, LitElement as A, nothing as u, html as c } from "lit";
import { property as E, state as H } from "lit/decorators.js";
import { classMap as j } from "lit/directives/class-map.js";
import { styleMap as v } from "lit/directives/style-map.js";
import { n as F, l as m, i as x, s as O, t as p, r as Z, p as B, a as N } from "./sharedStyles-cRSiglXC.js";
const P = I`
  .bch-wrap {
    display: grid;
    gap: 1.5rem;
  }

  .bch-group {
    display: grid;
    gap: 0.65rem;
  }

  .bch-group__label {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.01em;
    color: var(--muted-color, #8f7a86);
    text-transform: uppercase;
  }

  /* —— base color chips —— */
  .bch-colors {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .bch-color {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.4rem 0.7rem 0.4rem 0.4rem;
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: 999px;
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-size: 0.85rem;
    font-weight: 700;
    line-height: 1.2;
    cursor: pointer;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
  }

  .bch-color:hover {
    border-color: color-mix(in srgb, var(--accent-color, #c2527f) 40%, var(--border-color, #f2dde7));
  }

  .bch-color[aria-pressed='true'] {
    border-color: var(--accent-color, #c2527f);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-color, #c2527f) 32%, transparent);
  }

  .bch-color__swatch {
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 50%;
    flex: 0 0 auto;
    border: 2px solid #fff;
    box-shadow: 0 2px 6px rgba(20, 14, 12, 0.22);
    background: var(--swatch, #ccc);
  }

  .bch-color__name {
    white-space: nowrap;
  }

  /* —— harmony type chips —— */
  .bch-types {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .bch-type {
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: 999px;
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }

  .bch-type:hover {
    border-color: color-mix(in srgb, var(--accent-color, #c2527f) 40%, var(--border-color, #f2dde7));
  }

  .bch-type[aria-pressed='true'] {
    background: var(--accent-color, #c2527f);
    border-color: var(--accent-color, #c2527f);
    color: #fff;
  }

  /* —— result area —— */
  .bch-result {
    display: grid;
    gap: 1.25rem;
  }

  .bch-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .bch-swatch {
    flex: 1 1 100px;
    min-width: 88px;
    display: grid;
    gap: 0.4rem;
    justify-items: center;
    text-align: center;
  }

  .bch-swatch__chip {
    width: 100%;
    aspect-ratio: 3 / 2;
    border-radius: calc(var(--section-radius, 16px) * 0.65);
    border: 1px solid color-mix(in srgb, #000 8%, transparent);
    box-shadow: 0 6px 16px rgba(20, 14, 12, 0.14);
    background: var(--swatch, #ccc);
  }

  .bch-swatch__hex {
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--muted-color, #8f7a86);
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
  }

  /* —— zone mapping cards —— */
  .bch-zones {
    display: grid;
    gap: 0.85rem;
    grid-template-columns: 1fr;
  }

  @media (min-width: 640px) {
    .bch-zones {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .bch-zone {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.85rem;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: calc(var(--section-radius, 16px) * 0.75);
    box-shadow: 0 6px 18px rgba(43, 33, 28, 0.05);
  }

  .bch-zone__swatch {
    width: 2.75rem;
    height: 2.75rem;
    flex: 0 0 auto;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 3px 10px rgba(20, 14, 12, 0.2);
    background: var(--swatch, #ccc);
  }

  .bch-zone__body {
    display: grid;
    gap: 0.15rem;
    min-width: 0;
  }

  .bch-zone__label {
    font-size: 0.9rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bch-zone__hex {
    font-size: 0.76rem;
    font-weight: 700;
    color: var(--muted-color, #8f7a86);
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
  }

  .bch-notice {
    margin: 0;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.6;
  }

  @media (prefers-reduced-motion: reduce) {
    .bch-color,
    .bch-type {
      transition: none !important;
    }
  }
`, R = "#cccccc";
function q(a) {
  return F(a).map((e, r) => {
    const s = m(e.name), t = T(String(e.hex ?? "").trim());
    return {
      id: String(e.color_id ?? "").trim() || `color-${r + 1}`,
      name: s,
      hex: t
    };
  }).filter((e) => e.name || e.hex);
}
function T(a) {
  const e = String(a || "").trim(), r = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.exec(e);
  if (!r) return R;
  let s = r[1].toLowerCase();
  return s.length === 3 && (s = s.split("").map((t) => t + t).join("")), `#${s}`;
}
function S(a) {
  const e = T(a), r = parseInt(e.slice(1, 3), 16) / 255, s = parseInt(e.slice(3, 5), 16) / 255, t = parseInt(e.slice(5, 7), 16) / 255, o = Math.max(r, s, t), i = Math.min(r, s, t), n = o - i;
  let l = 0;
  n !== 0 && (o === r ? l = (s - t) / n % 6 : o === s ? l = (t - r) / n + 2 : l = (r - s) / n + 4, l *= 60, l < 0 && (l += 360));
  const d = (o + i) / 2, b = n === 0 ? 0 : n / (1 - Math.abs(2 * d - 1));
  return {
    h: Math.round(l),
    s: Math.round(b * 100),
    l: Math.round(d * 100)
  };
}
function h(a) {
  const e = (a.h % 360 + 360) % 360, r = k(a.s / 100), s = k(a.l / 100), t = (1 - Math.abs(2 * s - 1)) * r, o = t * (1 - Math.abs(e / 60 % 2 - 1)), i = s - t / 2;
  let n = 0, l = 0, d = 0;
  e < 60 ? [n, l, d] = [t, o, 0] : e < 120 ? [n, l, d] = [o, t, 0] : e < 180 ? [n, l, d] = [0, t, o] : e < 240 ? [n, l, d] = [0, o, t] : e < 300 ? [n, l, d] = [o, 0, t] : [n, l, d] = [t, 0, o];
  const b = (g) => Math.round((g + i) * 255).toString(16).padStart(2, "0");
  return `#${b(n)}${b(l)}${b(d)}`;
}
function k(a) {
  return Math.min(1, Math.max(0, a));
}
function y(a, e) {
  return { ...a, h: ((a.h + e) % 360 + 360) % 360 };
}
function K(a, e) {
  const r = S(a);
  switch (e) {
    case "complementary":
      return [h(r), h(y(r, 180))];
    case "analogous":
      return [
        h(y(r, -30)),
        h(r),
        h(y(r, 30))
      ];
    case "triadic":
      return [
        h(r),
        h(y(r, 120)),
        h(y(r, 240))
      ];
    default:
      return [h(r)];
  }
}
function U(a, e) {
  const r = S(e), s = a[0] || h(r), t = a[1] || a[0] || h(r), o = a[2] || h({
    h: r.h,
    s: Math.round(r.s * 0.55),
    l: Math.min(92, Math.round(r.l + (100 - r.l) * 0.4))
  });
  return { lips: s, eyes: t, cheeks: o };
}
function X(a) {
  const e = [];
  return x(a.bch_show_complementary, !0) && e.push("complementary"), x(a.bch_show_analogous, !0) && e.push("analogous"), x(a.bch_show_triadic, !0) && e.push("triadic"), e;
}
var Y = Object.defineProperty, _ = (a, e, r, s) => {
  for (var t = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (t = i(e, r, t) || t);
  return t && Y(e, r, t), t;
};
const M = {
  complementary: { ar: "متتام", en: "Complementary" },
  analogous: { ar: "متجاور", en: "Analogous" },
  triadic: { ar: "ثلاثي", en: "Triadic" }
}, w = class w extends A {
  constructor() {
    super(...arguments), this.config = {}, this.selectedColorId = "", this.harmonyType = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && (this.selectedColorId = "", this.harmonyType = "");
  }
  get colors() {
    var e;
    return q((e = this.config) == null ? void 0 : e.bch_colors);
  }
  resolveColor(e) {
    var s;
    if (!e.length) return null;
    if (this.selectedColorId) {
      const t = e.find((o) => o.id === this.selectedColorId);
      if (t) return t;
    }
    const r = String(((s = this.config) == null ? void 0 : s.bch_default_color) ?? "").trim();
    if (r) {
      const t = e.find((o) => o.id === r);
      if (t) return t;
    }
    return e[0];
  }
  resolveHarmony(e) {
    return this.harmonyType && e.includes(this.harmonyType) ? this.harmonyType : e[0];
  }
  selectColor(e) {
    this.selectedColorId = e;
  }
  selectHarmony(e) {
    this.harmonyType = e;
  }
  renderColors(e, r) {
    return c`
      <div class="bch-colors" role="group" aria-label=${p("اختاري لون الأساس", "Choose base color")}>
        ${e.map((s) => {
      const t = (r == null ? void 0 : r.id) === s.id, o = s.name || s.hex;
      return c`
            <button
              type="button"
              class="bch-color"
              style=${v({ "--swatch": s.hex })}
              aria-pressed=${t ? "true" : "false"}
              aria-label=${`${o} ${s.hex}`}
              @click=${() => this.selectColor(s.id)}
            >
              <span class="bch-color__swatch" aria-hidden="true"></span>
              ${s.name ? c`<span class="bch-color__name">${s.name}</span>` : u}
            </button>
          `;
    })}
      </div>
    `;
  }
  renderTypes(e, r) {
    if (e.length < 2) return u;
    const s = this.config || {}, t = m(s.bch_harmony_label) || p("نوع التناسق", "Harmony type");
    return c`
      <div class="bch-group">
        <p class="bch-group__label">${t}</p>
        <div class="bch-types" role="group" aria-label=${t}>
          ${e.map((o) => {
      const i = r === o, n = p(M[o].ar, M[o].en);
      return c`
              <button
                type="button"
                class="bch-type"
                aria-pressed=${i ? "true" : "false"}
                @click=${() => this.selectHarmony(o)}
              >
                ${n}
              </button>
            `;
    })}
        </div>
      </div>
    `;
  }
  renderStrip(e, r) {
    return c`
      <div class="bch-strip">
        ${e.map(
      (s) => c`
            <div class="bch-swatch">
              <div
                class="bch-swatch__chip"
                style=${v({ "--swatch": s })}
                role="img"
                aria-label=${s}
              ></div>
              ${r ? c`<span class="bch-swatch__hex">${s}</span>` : u}
            </div>
          `
    )}
      </div>
    `;
  }
  renderZones(e, r) {
    const s = this.config || {}, t = [
      { key: "lips", label: m(s.bch_lips_label) || p("الشفاه", "Lips") },
      { key: "eyes", label: m(s.bch_eyes_label) || p("العيون", "Eyes") },
      { key: "cheeks", label: m(s.bch_cheeks_label) || p("الخدود", "Cheeks") }
    ];
    return c`
      <div class="bch-zones">
        ${t.map((o) => {
      const i = e[o.key];
      return c`
            <div class="bch-zone">
              <span
                class="bch-zone__swatch"
                style=${v({ "--swatch": i })}
                role="img"
                aria-label=${`${o.label} ${i}`}
              ></span>
              <div class="bch-zone__body">
                <span class="bch-zone__label">${o.label}</span>
                ${r ? c`<span class="bch-zone__hex">${i}</span>` : u}
              </div>
            </div>
          `;
    })}
      </div>
    `;
  }
  render() {
    const e = this.config || {}, r = Z(e, "bch_"), s = r.animate && !B(), t = this.colors, o = m(e.bch_title), i = m(e.bch_desc), n = x(e.bch_show_hex, !0), l = x(e.bch_show_notice, !0), d = m(e.bch_notice) || p(
      "اقتراحات الألوان إرشادية لمساعدتك على التنسيق.",
      "Color suggestions are guidance to help you coordinate."
    );
    if (!t.length)
      return c`<div class="fs-empty" role="status">
        ${p(
        "أضيفي درجات ألوان من إعدادات العنصر.",
        "Add color shades in the element settings."
      )}
      </div>`;
    const b = X(e);
    if (!b.length)
      return c`<div class="fs-empty" role="status">
        ${p(
        "فعّلي نوع تناسق واحدًا على الأقل من الإعدادات.",
        "Enable at least one harmony type in the settings."
      )}
      </div>`;
    const g = this.resolveColor(t), $ = this.resolveHarmony(b), z = (g == null ? void 0 : g.hex) ?? t[0].hex, C = K(z, $), L = U(C, z);
    return c`
      <section
        class=${j({ "fs-section": !0, "fs-animate": s })}
        style=${v(N(r))}
        aria-label=${o || p("عجلة تناسق ألوان المكياج", "Makeup color harmony wheel")}
      >
        <div class="fs-container">
          ${o || i ? c`<div class="fs-header">
                ${o ? c`<h2 class="fs-title">${o}</h2>` : u}
                ${i ? c`<p class="fs-desc">${i}</p>` : u}
              </div>` : u}

          <div class="bch-wrap">
            <div class="bch-group">
              <p class="bch-group__label">${p("لون الأساس", "Base color")}</p>
              ${this.renderColors(t, g)}
            </div>

            ${this.renderTypes(b, $)}

            <div class="bch-result">
              ${this.renderStrip(C, n)}
              ${this.renderZones(L, n)}
            </div>

            ${l ? c`<p class="bch-notice">${d}</p>` : u}
          </div>
        </div>
      </section>
    `;
  }
};
w.styles = [O, P];
let f = w;
_([
  E({ type: Object })
], f.prototype, "config");
_([
  H()
], f.prototype, "selectedColorId");
_([
  H()
], f.prototype, "harmonyType");
typeof f < "u" && f.registerSallaComponent("salla-beauty-color-harmony");
export {
  f as default
};
