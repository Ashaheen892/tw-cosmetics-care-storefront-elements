import { css as L, LitElement as I, nothing as b, html as i } from "lit";
import { property as j, state as M } from "lit/decorators.js";
import { classMap as E } from "lit/directives/class-map.js";
import { styleMap as x } from "lit/directives/style-map.js";
import { n as A, l as u, t as d, i as y, s as F, r as N, p as O, a as P } from "./sharedStyles--LaFqDVC.js";
const Z = L`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .bch-wrap {
    display: grid;
    gap: 1.5rem;
    width: 100%;
    max-width: 1040px;
    margin-inline: auto;
  }

  .bch-controls {
    display: grid;
    gap: 1.15rem;
    padding: 1.15rem 1.2rem;
    border-radius: var(--section-radius, 20px);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    box-shadow: 0 10px 28px rgba(120, 44, 82, 0.06);
  }

  .bch-group {
    display: grid;
    gap: 0.65rem;
  }

  .bch-group__label {
    margin: 0;
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.01em;
    color: var(--muted-color, #8f7a86);
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
    min-height: 44px;
    padding: 0.4rem 0.85rem 0.4rem 0.4rem;
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: 999px;
    background: var(--card-bg, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-size: 0.88rem;
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
    width: 1.75rem;
    height: 1.75rem;
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
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  @media (min-width: 640px) {
    .bch-types {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .bch-type {
    display: grid;
    gap: 0.2rem;
    min-height: 64px;
    padding: 0.7rem 0.9rem;
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: calc(var(--section-radius, 16px) * 0.65);
    background: color-mix(in srgb, var(--section-bg, #fbf5f8) 55%, #fff);
    color: var(--text-color, #33232e);
    font: inherit;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    text-align: start;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }

  .bch-type__label {
    line-height: 1.3;
  }

  .bch-type__hint {
    font-size: 0.74rem;
    font-weight: 600;
    color: var(--muted-color, #8f7a86);
    line-height: 1.35;
  }

  .bch-type[aria-pressed='true'] .bch-type__hint {
    color: rgba(255, 255, 255, 0.85);
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
    gap: 1.15rem;
  }

  @media (min-width: 900px) {
    .bch-result {
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
      align-items: start;
    }
  }

  .bch-preview,
  .bch-zones-wrap {
    display: grid;
    gap: 0.8rem;
    min-width: 0;
  }

  .bch-preview {
    padding: 1.2rem;
    border-radius: calc(var(--section-radius, 16px) * 0.9);
    background: linear-gradient(
      160deg,
      color-mix(in srgb, var(--accent-color, #c2527f) 10%, var(--card-bg, #fff)),
      var(--card-bg, #fff)
    );
    border: 1px solid var(--border-color, #f2dde7);
    box-shadow: 0 12px 32px rgba(43, 33, 28, 0.08);
  }

  .bch-zones-wrap {
    padding: 1.2rem;
    border-radius: calc(var(--section-radius, 16px) * 0.9);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bch-preview__label {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: var(--muted-color, #8f7a86);
  }

  .bch-strip {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    gap: 0.75rem;
  }

  .bch-swatch {
    display: grid;
    gap: 0.45rem;
    justify-items: center;
    text-align: center;
    min-width: 0;
  }

  .bch-swatch__chip {
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: calc(var(--section-radius, 16px) * 0.55);
    border: 1px solid color-mix(in srgb, #000 8%, transparent);
    box-shadow: 0 8px 20px rgba(20, 14, 12, 0.16);
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

  .bch-zones {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: 1fr;
  }

  @media (min-width: 640px) {
    .bch-zones {
      grid-template-columns: 1fr;
    }
  }

  .bch-zone {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem;
    background: color-mix(in srgb, var(--section-bg, #fbf5f8) 60%, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: calc(var(--section-radius, 16px) * 0.7);
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
    font-size: 0.92rem;
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
    font-size: 0.82rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.6;
  }

  @media (prefers-reduced-motion: reduce) {
    .bch-color,
    .bch-type {
      transition: none !important;
    }
  }
`, B = "#cccccc";
function R(s) {
  if (typeof s == "string") return s.trim();
  if (typeof s == "number" && Number.isFinite(s)) return String(s);
  if (s && typeof s == "object") {
    const e = s;
    for (const r of ["hex", "value", "color", "code"]) {
      const t = e[r];
      if (typeof t == "string" && t.trim()) return t.trim();
    }
  }
  return "";
}
function q(s) {
  return A(s).map((e, r) => {
    const t = u(e.name), o = H(R(e.hex ?? e.color));
    return {
      id: String(e.color_id ?? e.id ?? "").trim() || `color-${r + 1}`,
      name: t,
      hex: o
    };
  }).filter((e) => !!(e.name || e.hex));
}
function H(s) {
  const e = String(s || "").trim(), r = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.exec(e);
  if (!r) return B;
  let t = r[1].toLowerCase();
  return t.length === 3 && (t = t.split("").map((o) => o + o).join("")), `#${t}`;
}
function T(s) {
  const e = H(s), r = parseInt(e.slice(1, 3), 16) / 255, t = parseInt(e.slice(3, 5), 16) / 255, o = parseInt(e.slice(5, 7), 16) / 255, a = Math.max(r, t, o), l = Math.min(r, t, o), c = a - l;
  let n = 0;
  c !== 0 && (a === r ? n = (t - o) / c % 6 : a === t ? n = (o - r) / c + 2 : n = (r - t) / c + 4, n *= 60, n < 0 && (n += 360));
  const h = (a + l) / 2, m = c === 0 ? 0 : c / (1 - Math.abs(2 * h - 1));
  return {
    h: Math.round(n),
    s: Math.round(m * 100),
    l: Math.round(h * 100)
  };
}
function p(s) {
  const e = (s.h % 360 + 360) % 360, r = C(s.s / 100), t = C(s.l / 100), o = (1 - Math.abs(2 * t - 1)) * r, a = o * (1 - Math.abs(e / 60 % 2 - 1)), l = t - o / 2;
  let c = 0, n = 0, h = 0;
  e < 60 ? [c, n, h] = [o, a, 0] : e < 120 ? [c, n, h] = [a, o, 0] : e < 180 ? [c, n, h] = [0, o, a] : e < 240 ? [c, n, h] = [0, a, o] : e < 300 ? [c, n, h] = [a, 0, o] : [c, n, h] = [o, 0, a];
  const m = (g) => Math.round((g + l) * 255).toString(16).padStart(2, "0");
  return `#${m(c)}${m(n)}${m(h)}`;
}
function C(s) {
  return Math.min(1, Math.max(0, s));
}
function v(s, e) {
  return { ...s, h: ((s.h + e) % 360 + 360) % 360 };
}
function K(s, e) {
  const r = T(s);
  switch (e) {
    case "complementary":
      return [p(r), p(v(r, 180))];
    case "analogous":
      return [
        p(v(r, -30)),
        p(r),
        p(v(r, 30))
      ];
    case "triadic":
      return [
        p(r),
        p(v(r, 120)),
        p(v(r, 240))
      ];
    default:
      return [p(r)];
  }
}
function U(s, e) {
  const r = T(e), t = s[0] || p(r), o = s[1] || s[0] || p(r), a = s[2] || p({
    h: r.h,
    s: Math.round(r.s * 0.55),
    l: Math.min(92, Math.round(r.l + (100 - r.l) * 0.4))
  });
  return { lips: t, eyes: o, cheeks: a };
}
function V(s) {
  const e = {
    complementary: ["ألوان متعاكسة", "Opposite colors"],
    analogous: ["ألوان متقاربة", "Neighboring colors"],
    triadic: ["ثلاثة ألوان متوازنة", "Three balanced colors"]
  }, [r, t] = e[s];
  return d(r, t);
}
function X(s) {
  const e = {
    complementary: ["تباين جريء", "Bold contrast"],
    analogous: ["انسجام ناعم", "Soft blend"],
    triadic: ["توازن حيوي", "Vibrant balance"]
  }, [r, t] = e[s];
  return d(r, t);
}
function D(s) {
  const e = [];
  return y(s.bch_show_complementary, !0) && e.push("complementary"), y(s.bch_show_analogous, !0) && e.push("analogous"), y(s.bch_show_triadic, !0) && e.push("triadic"), e;
}
var G = Object.defineProperty, _ = (s, e, r, t) => {
  for (var o = void 0, a = s.length - 1, l; a >= 0; a--)
    (l = s[a]) && (o = l(e, r, o) || o);
  return o && G(e, r, o), o;
};
const w = class w extends I {
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
    var t;
    if (!e.length) return null;
    if (this.selectedColorId) {
      const o = e.find((a) => a.id === this.selectedColorId);
      if (o) return o;
    }
    const r = String(((t = this.config) == null ? void 0 : t.bch_default_color) ?? "").trim();
    if (r) {
      const o = e.find((a) => a.id === r);
      if (o) return o;
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
    return i`
      <div class="bch-colors" role="group" aria-label=${d("اختاري لون الأساس", "Choose base color")}>
        ${e.map((t) => {
      const o = (r == null ? void 0 : r.id) === t.id, a = t.name || t.hex;
      return i`
            <button
              type="button"
              class="bch-color"
              style=${x({ "--swatch": t.hex })}
              aria-pressed=${o ? "true" : "false"}
              aria-label=${`${a} ${t.hex}`}
              @click=${() => this.selectColor(t.id)}
            >
              <span class="bch-color__swatch" aria-hidden="true"></span>
              ${t.name ? i`<span class="bch-color__name">${t.name}</span>` : b}
            </button>
          `;
    })}
      </div>
    `;
  }
  renderTypes(e, r) {
    if (!e.length) return b;
    const t = this.config || {}, o = u(t.bch_harmony_label) || d("2) اختاري نوع التناسق", "2) Choose harmony style");
    return i`
      <div class="bch-group">
        <p class="bch-group__label">${o}</p>
        <div class="bch-types" role="group" aria-label=${o}>
          ${e.map((a) => {
      const l = r === a, c = V(a), n = X(a);
      return i`
              <button
                type="button"
                class="bch-type"
                aria-pressed=${l ? "true" : "false"}
                aria-describedby=${n ? `bch-hint-${a}` : b}
                @click=${() => this.selectHarmony(a)}
              >
                <span class="bch-type__label">${c}</span>
                ${n ? i`<span class="bch-type__hint" id=${`bch-hint-${a}`}>${n}</span>` : b}
              </button>
            `;
    })}
        </div>
      </div>
    `;
  }
  renderStrip(e, r) {
    return i`
      <div class="bch-strip">
        ${e.map(
      (t) => i`
            <div class="bch-swatch">
              <div
                class="bch-swatch__chip"
                style=${x({ "--swatch": t })}
                role="img"
                aria-label=${t}
              ></div>
              ${r ? i`<span class="bch-swatch__hex">${t}</span>` : b}
            </div>
          `
    )}
      </div>
    `;
  }
  renderZones(e, r) {
    const t = this.config || {}, o = [
      { key: "lips", label: u(t.bch_lips_label) || d("الشفاه", "Lips") },
      { key: "eyes", label: u(t.bch_eyes_label) || d("العيون", "Eyes") },
      { key: "cheeks", label: u(t.bch_cheeks_label) || d("الخدود", "Cheeks") }
    ];
    return i`
      <div class="bch-zones">
        ${o.map((a) => {
      const l = e[a.key];
      return i`
            <div class="bch-zone">
              <span
                class="bch-zone__swatch"
                style=${x({ "--swatch": l })}
                role="img"
                aria-label=${`${a.label} ${l}`}
              ></span>
              <div class="bch-zone__body">
                <span class="bch-zone__label">${a.label}</span>
                ${r ? i`<span class="bch-zone__hex">${l}</span>` : b}
              </div>
            </div>
          `;
    })}
      </div>
    `;
  }
  render() {
    const e = this.config || {}, r = N(e, "bch_"), t = r.animate && !O(), o = this.colors, a = u(e.bch_title), l = u(e.bch_desc), c = y(e.bch_show_hex, !0), n = y(e.bch_show_notice, !0), h = u(e.bch_notice) || d(
      "اقتراحات الألوان إرشادية لمساعدتك على التنسيق.",
      "Color suggestions are guidance to help you coordinate."
    );
    if (!o.length)
      return i`<div class="fs-empty" role="status">
        ${d(
        "أضيفي درجات ألوان من إعدادات العنصر.",
        "Add color shades in the element settings."
      )}
      </div>`;
    const m = D(e);
    if (!m.length)
      return i`<div class="fs-empty" role="status">
        ${d(
        "فعّلي نوع تناسق واحدًا على الأقل من الإعدادات.",
        "Enable at least one harmony type in the settings."
      )}
      </div>`;
    const g = this.resolveColor(o), $ = this.resolveHarmony(m), z = (g == null ? void 0 : g.hex) ?? o[0].hex, k = K(z, $), S = U(k, z);
    return i`
      <section
        class=${E({ "fs-section": !0, "fs-animate": t })}
        style=${x(P(r))}
        aria-label=${a || d("عجلة تناسق ألوان المكياج", "Makeup color harmony wheel")}
      >
        <div class="fs-container">
          ${a || l ? i`<div class="fs-header">
                ${a ? i`<h2 class="fs-title">${a}</h2>` : b}
                ${l ? i`<p class="fs-desc">${l}</p>` : b}
              </div>` : b}

          <div class="bch-wrap">
            <div class="bch-controls">
              <div class="bch-group">
                <p class="bch-group__label">${d("1) اختاري لون الأساس", "1) Choose a base color")}</p>
                ${this.renderColors(o, g)}
              </div>
              ${this.renderTypes(m, $)}
            </div>

            <div class="bch-result">
              <div class="bch-preview">
                <p class="bch-preview__label">${d("لوحة التناسق", "Harmony palette")}</p>
                ${this.renderStrip(k, c)}
              </div>
              <div class="bch-zones-wrap">
                <p class="bch-preview__label">${d("توزيع على الوجه", "Face placement")}</p>
                ${this.renderZones(S, c)}
              </div>
            </div>

            ${n ? i`<p class="bch-notice">${h}</p>` : b}
          </div>
        </div>
      </section>
    `;
  }
};
w.styles = [F, Z];
let f = w;
_([
  j({ type: Object })
], f.prototype, "config");
_([
  M()
], f.prototype, "selectedColorId");
_([
  M()
], f.prototype, "harmonyType");
typeof f < "u" && f.registerSallaComponent("salla-beauty-color-harmony");
export {
  f as default
};
