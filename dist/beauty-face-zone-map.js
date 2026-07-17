import { css as P, LitElement as j, nothing as i, html as t } from "lit";
import { property as E, state as H } from "lit/decorators.js";
import { classMap as v } from "lit/directives/class-map.js";
import { styleMap as $ } from "lit/directives/style-map.js";
import { n as O, l as f, b as R, e as U, d as W, f as z, h as g, g as x, s as Y, t as d, i as m, r as q, p as V, a as X } from "./sharedStyles-cRSiglXC.js";
const B = P`
  .bfz-layout {
    display: grid;
    gap: 1.5rem;
    align-items: start;
  }

  @media (min-width: 860px) {
    .bfz-layout {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 2rem;
    }
    .bfz-layout--reverse {
      direction: inherit;
    }
    .bfz-layout--reverse .bfz-stage {
      order: 2;
    }
  }

  .bfz-stage {
    position: relative;
    width: 100%;
    max-width: 520px;
    margin-inline: auto;
    aspect-ratio: var(--bfz-aspect, 3 / 4);
    border-radius: var(--section-radius, 16px);
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #f2dde7) 40%, var(--card-bg, #fff));
    border: 1px solid var(--border-color, #f2dde7);
  }

  .bfz-stage__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .bfz-stage__empty {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    text-align: center;
    padding: 1.5rem;
    color: var(--muted-color, #8f7a86);
    font-size: 0.9rem;
  }

  .bfz-dot {
    position: absolute;
    transform: translate(-50%, -50%);
    inset-inline-start: var(--dot-x, 50%);
    top: var(--dot-y, 50%);
    width: var(--dot-size, 30px);
    height: var(--dot-size, 30px);
    min-width: 26px;
    min-height: 26px;
    display: grid;
    place-items: center;
    padding: 0;
    border-radius: 50%;
    border: 2px solid #fff;
    background: var(--dot-color, var(--accent-color, #c2527f));
    color: #fff;
    font-size: 0.8rem;
    font-weight: 800;
    line-height: 1;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(20, 14, 12, 0.28);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  /* RTL: mirror horizontal placement so % maps to the visual side authors expect */
  :host-context([dir='rtl']) .bfz-dot,
  :host([dir='rtl']) .bfz-dot {
    inset-inline-start: auto;
    inset-inline-end: var(--dot-x, 50%);
    transform: translate(50%, -50%);
  }

  .bfz-dot:hover {
    transform: translate(-50%, -50%) scale(1.12);
  }
  :host-context([dir='rtl']) .bfz-dot:hover,
  :host([dir='rtl']) .bfz-dot:hover {
    transform: translate(50%, -50%) scale(1.12);
  }

  .bfz-dot.is-active {
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--dot-color, var(--accent-color, #c2527f)) 35%, transparent),
      0 6px 16px rgba(20, 14, 12, 0.32);
  }

  .bfz-dot--ring {
    background: transparent;
    border-color: var(--dot-color, var(--accent-color, #c2527f));
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--dot-color, var(--accent-color, #c2527f)) 45%, transparent);
  }

  .bfz-dot--area {
    border-radius: 12px;
    background: color-mix(in srgb, var(--dot-color, var(--accent-color, #c2527f)) 22%, transparent);
    border-style: dashed;
    width: calc(var(--dot-size, 30px) * 2.2);
    height: calc(var(--dot-size, 30px) * 1.6);
  }

  .bfz-dot--icon {
    background: color-mix(in srgb, var(--dot-color, var(--accent-color, #c2527f)) 88%, #000);
  }

  .bfz-dot__pulse {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: inherit;
    opacity: 0.55;
    animation: bfz-pulse var(--bfz-pulse-speed, 2200ms) ease-out infinite;
    pointer-events: none;
  }

  @keyframes bfz-pulse {
    0% { transform: scale(1); opacity: 0.55; }
    70% { transform: scale(2.1); opacity: 0; }
    100% { transform: scale(2.1); opacity: 0; }
  }

  .bfz-dot__label {
    position: absolute;
    top: calc(100% + 4px);
    inset-inline-start: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 0.68rem;
    font-weight: 700;
    color: var(--text-color, #33232e);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, transparent);
    padding: 1px 6px;
    border-radius: 6px;
    pointer-events: none;
  }

  .bfz-panel {
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #f2dde7);
    border-radius: var(--section-radius, 16px);
    padding: 1.15rem 1.15rem 1.25rem;
    box-shadow: 0 10px 30px rgba(43, 33, 28, 0.07);
  }

  .bfz-panel__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .bfz-panel__title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
  }

  .bfz-nav {
    display: inline-flex;
    gap: 0.35rem;
  }

  .bfz-nav__btn {
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
  .bfz-nav__btn:hover { background: color-mix(in srgb, var(--accent-color, #c2527f) 10%, var(--card-bg, #fff)); }

  .bfz-panel__desc {
    margin: 0 0 0.9rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .bfz-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.9rem;
  }

  .bfz-tag {
    font-size: 0.74rem;
    font-weight: 700;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, #c2527f) 12%, var(--card-bg, #fff));
    color: var(--accent-color, #c2527f);
  }

  .bfz-block { margin-bottom: 0.9rem; }

  .bfz-block__title {
    margin: 0 0 0.4rem;
    font-size: 0.82rem;
    font-weight: 800;
    color: var(--text-color, #33232e);
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .bfz-steps {
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: bfz-step;
    display: grid;
    gap: 0.45rem;
  }

  .bfz-steps li {
    counter-increment: bfz-step;
    position: relative;
    padding-inline-start: 2rem;
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--text-color, #33232e);
  }

  .bfz-steps li::before {
    content: counter(bfz-step);
    position: absolute;
    inset-inline-start: 0;
    top: 0;
    width: 1.4rem;
    height: 1.4rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--accent-color, #c2527f);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 800;
  }

  .bfz-tips {
    margin: 0;
    padding-inline-start: 1.1rem;
    display: grid;
    gap: 0.35rem;
    color: var(--muted-color, #8f7a86);
    font-size: 0.86rem;
    line-height: 1.55;
  }

  .bfz-warn {
    display: flex;
    gap: 0.5rem;
    padding: 0.65rem 0.8rem;
    border-radius: 12px;
    background: color-mix(in srgb, #e0a100 14%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, #e0a100 40%, transparent);
    color: color-mix(in srgb, #8a5a00 70%, var(--text-color, #33232e));
    font-size: 0.84rem;
    line-height: 1.55;
    margin-bottom: 0.9rem;
  }

  .bfz-panel__img {
    width: 100%;
    border-radius: 12px;
    margin-bottom: 0.9rem;
    display: block;
  }

  .bfz-notice {
    margin-top: 1.25rem;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #8f7a86);
    line-height: 1.6;
  }

  .bfz-placeholder {
    color: var(--muted-color, #8f7a86);
    font-size: 0.9rem;
    text-align: center;
    padding: 1rem;
  }

  /* Bottom sheet on mobile */
  @media (max-width: 859px) {
    .bfz-layout--sheet .bfz-panel {
      position: fixed;
      inset-inline: 0;
      bottom: 0;
      z-index: 60;
      border-radius: 18px 18px 0 0;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 -12px 40px rgba(20, 14, 12, 0.28);
      animation: bfz-sheet-up 0.28s ease;
    }
    .bfz-sheet-backdrop {
      position: fixed;
      inset: 0;
      z-index: 55;
      background: rgba(20, 14, 12, 0.4);
      border: none;
    }
  }

  @keyframes bfz-sheet-up {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

  .bfz-sheet-close {
    display: none;
  }
  @media (max-width: 859px) {
    .bfz-layout--sheet .bfz-sheet-close {
      display: grid;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bfz-dot,
    .bfz-dot__pulse,
    .bfz-panel {
      animation: none !important;
      transition: none !important;
    }
  }
`, G = ["pulse", "ring", "number", "icon", "area", "label"];
function y(c) {
  const e = f(c, "");
  return e ? e.split(/\r?\n|،|;|,/).map((a) => a.trim()).filter(Boolean) : [];
}
function J(c) {
  return O(c).map((e, a) => {
    const s = f(e.name), r = f(e.title) || s;
    return {
      id: String(e.zone_id ?? "").trim() || `zone-${a + 1}`,
      name: s,
      x: z(g(e.x, 50), 0, 100),
      y: z(g(e.y, 50), 0, 100),
      dotSize: z(g(e.dot_size, 30), 12, 120),
      dotColor: String(e.dot_color ?? "").trim(),
      icon: String(e.icon ?? "").trim(),
      title: r,
      desc: f(e.desc),
      tags: W(e.tags),
      steps: y(e.steps),
      tips: y(e.tips),
      warning: f(e.warning),
      image: U(e.image),
      link: R(e.link)
    };
  }).filter((e) => e.name || e.title || e.desc);
}
function K(c) {
  const e = x(c.bfz_dot_shape, "pulse");
  return G.includes(e) ? e : "pulse";
}
function Q(c) {
  return x(c.bfz_detail_mode, "inline") === "sheet" ? "sheet" : "inline";
}
function F(c, e = "3/4") {
  return (x(c.bfz_aspect, e) || e).replace("/", " / ");
}
var Z = Object.defineProperty, w = (c, e, a, s) => {
  for (var r = void 0, o = c.length - 1, n; o >= 0; o--)
    (n = c[o]) && (r = n(e, a, r) || r);
  return r && Z(e, a, r), r;
};
const _ = class _ extends j {
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
  get zones() {
    var e;
    return J((e = this.config) == null ? void 0 : e.bfz_zones);
  }
  resolveActive(e) {
    var s;
    if (!e.length) return null;
    if (this.activeId) {
      const r = e.find((o) => o.id === this.activeId);
      if (r) return r;
    }
    const a = String(((s = this.config) == null ? void 0 : s.bfz_default_zone) ?? "").trim();
    if (a) {
      const r = e.find((o) => o.id === a);
      if (r) return r;
    }
    return null;
  }
  select(e) {
    this.activeId = e;
  }
  step(e, a) {
    var n;
    const s = this.resolveActive(e), o = ((s ? e.findIndex((l) => l.id === s.id) : -1) + a + e.length) % e.length;
    this.activeId = ((n = e[o]) == null ? void 0 : n.id) ?? "";
  }
  renderDot(e, a, s, r, o) {
    const n = this.activeId === e.id, l = e.name || e.title, h = a === "label" || o;
    return t`
      <button
        type="button"
        class=${v({
      "bfz-dot": !0,
      [`bfz-dot--${a}`]: !0,
      "is-active": n
    })}
        style=${$({
      "--dot-x": `${e.x}%`,
      "--dot-y": `${e.y}%`,
      "--dot-size": `${e.dotSize}px`,
      ...e.dotColor ? { "--dot-color": e.dotColor } : {}
    })}
        aria-pressed=${n ? "true" : "false"}
        aria-controls="bfz-detail"
        aria-label=${l}
        title=${l}
        @click=${() => this.select(e.id)}
      >
        ${s && a === "pulse" ? t`<span class="bfz-dot__pulse"></span>` : i}
        ${a === "number" ? t`<span>${r + 1}</span>` : a === "icon" && e.icon ? t`<span class=${e.icon.startsWith("sicon-") ? e.icon : ""}>${e.icon.startsWith("sicon-") ? "" : e.icon}</span>` : i}
        ${h ? t`<span class="bfz-dot__label">${l}</span>` : i}
      </button>
    `;
  }
  renderDetail(e, a) {
    if (!e)
      return t`<div class="bfz-panel">
        <p class="bfz-placeholder">
          ${d("اختاري منطقة من الخريطة لعرض تفاصيل العناية بها.", "Pick a zone on the map to see its care details.")}
        </p>
      </div>`;
    const s = this.config || {}, r = m(s.bfz_show_nav, !0) && this.zones.length > 1, o = d("خطوات العناية", "Care steps"), n = d("نصائح", "Tips");
    return t`
      <div class="bfz-panel" id="bfz-detail" role="region" aria-live="polite">
        <div class="bfz-panel__head">
          <h3 class="bfz-panel__title">${e.title || e.name}</h3>
          <div class="bfz-nav">
            ${a === "sheet" ? t`<button
                  type="button"
                  class="bfz-nav__btn bfz-sheet-close"
                  aria-label=${d("إغلاق", "Close")}
                  @click=${() => this.activeId = ""}
                >✕</button>` : i}
            ${r ? t`
                  <button type="button" class="bfz-nav__btn" aria-label=${d("السابق", "Previous")} @click=${() => this.step(this.zones, -1)}>‹</button>
                  <button type="button" class="bfz-nav__btn" aria-label=${d("التالي", "Next")} @click=${() => this.step(this.zones, 1)}>›</button>
                ` : i}
          </div>
        </div>

        ${e.image ? t`<img class="bfz-panel__img" src=${e.image} alt="" loading="lazy" decoding="async" />` : i}
        ${e.desc ? t`<p class="bfz-panel__desc">${e.desc}</p>` : i}

        ${e.tags.length ? t`<div class="bfz-tags">${e.tags.map((l) => t`<span class="bfz-tag">${l}</span>`)}</div>` : i}

        ${e.steps.length ? t`<div class="bfz-block">
              <h4 class="bfz-block__title">${o}</h4>
              <ol class="bfz-steps">${e.steps.map((l) => t`<li>${l}</li>`)}</ol>
            </div>` : i}

        ${e.tips.length ? t`<div class="bfz-block">
              <h4 class="bfz-block__title">${n}</h4>
              <ul class="bfz-tips">${e.tips.map((l) => t`<li>${l}</li>`)}</ul>
            </div>` : i}

        ${e.warning ? t`<div class="bfz-warn"><span>⚠︎</span><span>${e.warning}</span></div>` : i}

        ${e.link ? t`<a class="fs-btn" href=${e.link} target="_blank" rel="noopener noreferrer">
              ${d("اقرئي المزيد", "Read more")}
            </a>` : i}
      </div>
    `;
  }
  render() {
    const e = this.config || {}, a = q(e, "bfz_"), s = a.animate && !V(), r = this.zones, o = f(e.bfz_face_image), n = f(e.bfz_title), l = f(e.bfz_desc), h = K(e), b = Q(e), k = m(e.bfz_pulse, !0) && s, S = Math.max(600, g(e.bfz_pulse_speed, 2200)), C = m(e.bfz_reverse, !1), I = m(e.bfz_show_names, !1), L = F(e), u = this.resolveActive(r), T = m(e.bfz_show_notice, !0), D = f(e.bfz_notice) || d("المعلومات المعروضة توعوية ولا تُعد تشخيصًا طبيًا.", "The information shown is educational and is not a medical diagnosis.");
    if (!r.length)
      return t`<div class="fs-empty" role="status">
        ${d("أضيفي مناطق الوجه من إعدادات العنصر لعرض الخريطة التفاعلية.", "Add face zones in the element settings to show the interactive map.")}
      </div>`;
    const A = b === "sheet" && !!u;
    return t`
      <section
        class=${v({ "fs-section": !0, "fs-animate": s })}
        style=${$({
      ...X(a),
      "--bfz-aspect": L,
      "--bfz-pulse-speed": `${S}ms`
    })}
        aria-label=${n || d("خريطة مناطق الوجه والعناية", "Face care zone map")}
      >
        <div class="fs-container">
          ${n || l ? t`<div class="fs-header">
                ${n ? t`<h2 class="fs-title">${n}</h2>` : i}
                ${l ? t`<p class="fs-desc">${l}</p>` : i}
              </div>` : i}

          <div
            class=${v({
      "bfz-layout": !0,
      "bfz-layout--reverse": C,
      "bfz-layout--sheet": b === "sheet"
    })}
          >
            <div class="bfz-stage">
              ${o ? t`<img class="bfz-stage__img" src=${o} alt="" loading="lazy" decoding="async" />` : t`<div class="bfz-stage__empty">${d("أضيفي صورة وجه من الإعدادات", "Add a face image in settings")}</div>`}
              ${r.map((M, N) => this.renderDot(M, h, k, N, I))}
            </div>

            ${b === "sheet" ? A ? t`
                    <button class="bfz-sheet-backdrop" aria-label=${d("إغلاق", "Close")} @click=${() => this.activeId = ""}></button>
                    ${this.renderDetail(u, b)}
                  ` : i : this.renderDetail(u, b)}
          </div>

          ${T ? t`<p class="bfz-notice">${D}</p>` : i}
        </div>
      </section>
    `;
  }
};
_.styles = [Y, B];
let p = _;
w([
  E({ type: Object })
], p.prototype, "config");
w([
  H()
], p.prototype, "activeId");
typeof p < "u" && p.registerSallaComponent("salla-beauty-face-zone-map");
export {
  p as default
};
