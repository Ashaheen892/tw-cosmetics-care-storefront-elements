import { css as N, LitElement as O, nothing as s, html as t } from "lit";
import { property as Z, state as j } from "lit/decorators.js";
import { classMap as v } from "lit/directives/class-map.js";
import { styleMap as _ } from "lit/directives/style-map.js";
import { n as R, l as p, b as U, e as W, f as q, h as y, j as u, g as w, s as F, k as G, m as K, t as i, i as h, r as V, p as X, a as B } from "./sharedStyles-DKbcXBPy.js";
import { r as J } from "./commerceOutcome-Dk8p2VWM.js";
const Q = N`
  :host {
    display: block;
    direction: inherit;
    width: 100%;
  }

  .bfz-layout {
    display: grid;
    gap: 1.35rem;
    align-items: start;
    width: 100%;
  }

  @media (min-width: 860px) {
    .bfz-layout {
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      gap: 1.75rem;
    }

    .bfz-layout--reverse .bfz-stage-wrap {
      order: 2;
    }

    .bfz-layout--reverse .bfz-panel {
      order: 1;
    }

    .bfz-panel {
      position: sticky;
      top: 1rem;
    }
  }

  /* —— Map stage —— */
  .bfz-stage-wrap {
    position: relative;
    width: 100%;
    min-width: 0;
    display: grid;
    gap: 0.85rem;
  }

  .bfz-stage {
    position: relative;
    width: 100%;
    aspect-ratio: var(--bfz-aspect, 3 / 4);
    border-radius: var(--section-radius, 20px);
    overflow: hidden;
    background:
      radial-gradient(
        90% 70% at 50% 20%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent),
        transparent 60%
      ),
      color-mix(in srgb, var(--border-color, #e5e7eb) 35%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent),
      0 18px 40px rgba(120, 44, 82, 0.08);
  }

  .bfz-stage::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, #fff 35%, transparent);
    z-index: 2;
  }

  .bfz-stage__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .bfz-stage__empty,
  .bfz-stage__missing {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1.5rem;
    color: var(--muted-color, #666666);
    font-size: 0.88rem;
    line-height: 1.55;
    background: repeating-linear-gradient(
      -45deg,
      color-mix(in srgb, var(--border-color, #e5e7eb) 25%, var(--card-bg, #fff)),
      color-mix(in srgb, var(--border-color, #e5e7eb) 25%, var(--card-bg, #fff)) 10px,
      color-mix(in srgb, var(--border-color, #e5e7eb) 12%, var(--card-bg, #fff)) 10px,
      color-mix(in srgb, var(--border-color, #e5e7eb) 12%, var(--card-bg, #fff)) 20px
    );
  }

  .bfz-stage__missing p {
    margin: 0;
    max-width: 14rem;
    font-weight: 600;
  }

  .bfz-stage__missing-icon {
    font-size: 2.5rem;
    opacity: 0.35;
    margin-bottom: 0.5rem;
    line-height: 1;
  }

  /* —— Zone legend —— */
  .bfz-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    justify-content: center;
  }

  .bfz-legend__btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 36px;
    padding: 0.35rem 0.85rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
      transform 0.15s ease;
  }

  .bfz-legend__btn:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
  }

  .bfz-legend__btn.is-active {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    border-color: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    transform: translateY(-1px);
  }

  .bfz-legend__swatch {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: var(--dot-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: 0 0 0 2px color-mix(in srgb, #fff 70%, transparent);
    flex: 0 0 auto;
  }

  .bfz-legend__btn.is-active .bfz-legend__swatch {
    box-shadow: 0 0 0 2px color-mix(in srgb, #fff 35%, transparent);
  }

  /* —— Hotspots —— */
  .bfz-dot {
    position: absolute;
    z-index: 3;
    transform: translate(-50%, -50%);
    inset-inline-start: var(--dot-x, 50%);
    top: var(--dot-y, 50%);
    width: var(--dot-size, 30px);
    height: var(--dot-size, 30px);
    min-width: 28px;
    min-height: 28px;
    display: grid;
    place-items: center;
    padding: 0;
    border-radius: 50%;
    border: 2.5px solid #fff;
    background: var(--dot-color, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    font-size: 0.8rem;
    font-weight: 800;
    line-height: 1;
    cursor: pointer;
    box-shadow: 0 6px 16px rgba(20, 14, 12, 0.28);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  :host-context([dir='rtl']) .bfz-dot,
  :host([dir='rtl']) .bfz-dot {
    inset-inline-start: auto;
    inset-inline-end: var(--dot-x, 50%);
    transform: translate(50%, -50%);
  }

  .bfz-dot:hover,
  .bfz-dot:focus-visible {
    transform: translate(-50%, -50%) scale(1.14);
    outline: none;
  }

  :host-context([dir='rtl']) .bfz-dot:hover,
  :host-context([dir='rtl']) .bfz-dot:focus-visible,
  :host([dir='rtl']) .bfz-dot:hover,
  :host([dir='rtl']) .bfz-dot:focus-visible {
    transform: translate(50%, -50%) scale(1.14);
  }

  .bfz-dot.is-active {
    box-shadow:
      0 0 0 5px color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 32%, transparent),
      0 8px 18px rgba(20, 14, 12, 0.3);
  }

  .bfz-dot--ring {
    background: color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 12%, transparent);
    border-color: var(--dot-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 28%, transparent);
  }

  .bfz-dot--area {
    border-radius: 14px;
    background: color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 22%, transparent);
    border-style: dashed;
    width: calc(var(--dot-size, 30px) * 2.2);
    height: calc(var(--dot-size, 30px) * 1.6);
  }

  .bfz-dot--icon {
    background: color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 88%, #000);
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
    0% {
      transform: scale(1);
      opacity: 0.55;
    }
    70% {
      transform: scale(2.1);
      opacity: 0;
    }
    100% {
      transform: scale(2.1);
      opacity: 0;
    }
  }

  .bfz-dot__label {
    position: absolute;
    top: calc(100% + 6px);
    inset-inline-start: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--text-color, #000000);
    background: color-mix(in srgb, var(--card-bg, #fff) 92%, transparent);
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent);
    padding: 0.15rem 0.45rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(43, 33, 28, 0.08);
    pointer-events: none;
  }

  /* —— Detail panel —— */
  .bfz-panel {
    min-width: 0;
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    border-radius: var(--section-radius, 20px);
    padding: 1.2rem 1.25rem 1.35rem;
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent),
      0 16px 36px rgba(120, 44, 82, 0.08);
    display: grid;
    gap: 0.95rem;
  }

  .bfz-panel__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .bfz-panel__eyebrow {
    margin: 0 0 0.25rem;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: var(--accent-color, var(--fs-store-primary));
    text-transform: uppercase;
  }

  .bfz-panel__title {
    margin: 0;
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    font-weight: 800;
    line-height: 1.3;
    color: var(--text-color, #000000);
  }

  .bfz-nav {
    display: inline-flex;
    gap: 0.35rem;
    flex: 0 0 auto;
  }

  .bfz-nav__btn {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    border: 1px solid var(--border-color, #e5e7eb);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, transparent));
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 1.05rem;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  }

  .bfz-nav__btn:hover,
  .bfz-nav__btn:focus-visible {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
    outline: none;
  }

  .bfz-panel__img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    border-radius: calc(var(--section-radius, 20px) - 8px);
    display: block;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, #f2ece8);
  }

  .bfz-panel__desc {
    margin: 0;
    color: var(--muted-color, #666666);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .bfz-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .bfz-tag {
    font-size: 0.74rem;
    font-weight: 700;
    padding: 0.28rem 0.7rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, transparent);
  }

  .bfz-block {
    display: grid;
    gap: 0.55rem;
    padding-top: 0.15rem;
  }

  .bfz-block__title {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: var(--text-color, #000000);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .bfz-block__title::before {
    content: '';
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    flex: 0 0 auto;
  }

  .bfz-steps {
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: bfz-step;
    display: grid;
    gap: 0.5rem;
  }

  .bfz-steps li {
    counter-increment: bfz-step;
    position: relative;
    padding-block: 0.65rem;
    padding-inline: 2.45rem 0.75rem;
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--text-color, #000000);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 5%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent);
    border-radius: 12px;
  }

  .bfz-steps li::before {
    content: counter(bfz-step);
    position: absolute;
    inset-inline-start: 0.55rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.45rem;
    height: 1.45rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    font-size: 0.72rem;
    font-weight: 800;
  }

  .bfz-tips {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0.4rem;
  }

  .bfz-tips li {
    position: relative;
    padding-inline-start: 1.15rem;
    color: var(--muted-color, #666666);
    font-size: 0.86rem;
    line-height: 1.55;
  }

  .bfz-tips li::before {
    content: '';
    position: absolute;
    inset-inline-start: 0;
    top: 0.55em;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, #fff);
  }

  .bfz-warn {
    display: flex;
    gap: 0.55rem;
    align-items: flex-start;
    padding: 0.75rem 0.85rem;
    border-radius: 14px;
    background: color-mix(in srgb, #e0a100 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, #e0a100 34%, transparent);
    color: color-mix(in srgb, var(--fs-caution, #e0a100) 45%, var(--text-color, #000000));
    font-size: 0.84rem;
    line-height: 1.55;
  }

  .bfz-panel .fs-btn {
    justify-self: start;
    margin-top: 0.15rem;
  }

  .bfz-notice {
    margin: 1.35rem 0 0;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
    line-height: 1.6;
  }

  .bfz-dot.is-coach-pulse {
    animation: bfz-coach-dot 1.8s ease-in-out infinite;
  }

  @keyframes bfz-coach-dot {
    0%,
    100% {
      box-shadow:
        0 6px 16px rgba(20, 14, 12, 0.28),
        0 0 0 0 color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 45%, transparent);
    }
    50% {
      box-shadow:
        0 6px 16px rgba(20, 14, 12, 0.28),
        0 0 0 10px color-mix(in srgb, var(--dot-color, var(--accent-color, var(--fs-store-primary))) 0%, transparent);
    }
  }

  .bfz-coach {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.65rem;
    padding: 0.7rem 0.9rem;
    border-radius: 14px;
    background: linear-gradient(
      135deg,
      var(--text-color, #33232e),
      color-mix(in srgb, var(--text-color, #33232e) 78%, var(--accent-color, var(--fs-store-primary)))
    );
    color: #fff;
    font-size: 0.84rem;
    font-weight: 700;
    box-shadow: 0 10px 28px rgba(20, 14, 12, 0.2);
    animation: bfz-coach-in 0.35s ease;
  }

  .bfz-coach__text {
    margin: 0;
  }

  .bfz-coach__dismiss {
    flex: 0 0 auto;
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border: none;
    border-radius: 50%;
    background: color-mix(in srgb, #fff 18%, transparent);
    color: #fff;
    cursor: pointer;
    font-size: 0.75rem;
  }

  @keyframes bfz-coach-in {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .bfz-panel--empty {
    min-height: 14rem;
    place-items: center;
  }

  .bfz-empty-state {
    text-align: center;
    padding: 1.35rem 1rem;
    max-width: 20rem;
    margin-inline: auto;
  }

  .bfz-empty-state__icon {
    display: grid;
    place-items: center;
    width: 3rem;
    height: 3rem;
    margin: 0 auto 0.75rem;
    border-radius: 50%;
    font-size: 1.25rem;
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    line-height: 1;
  }

  .bfz-empty-state__title {
    margin: 0 0 0.4rem;
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .bfz-empty-state__text {
    margin: 0;
    font-size: 0.86rem;
    color: var(--muted-color, #666666);
    line-height: 1.65;
  }

  .bfz-layout--sheet .bfz-sheet-close {
    display: grid;
  }

  @media (max-width: 859px) {
    .bfz-layout--sheet .bfz-panel--empty {
      display: none;
    }

    .bfz-layout--sheet .bfz-panel:not(.bfz-panel--empty) {
      position: fixed;
      inset-inline: 0;
      bottom: 0;
      z-index: 60;
      border-radius: 20px 20px 0 0;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 -14px 44px rgba(20, 14, 12, 0.28);
      animation: bfz-sheet-up 0.28s ease;
    }

    .bfz-sheet-backdrop {
      position: fixed;
      inset: 0;
      z-index: 55;
      background: rgba(20, 14, 12, 0.42);
      border: none;
    }
  }

  @keyframes bfz-sheet-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bfz-dot,
    .bfz-dot__pulse,
    .bfz-dot.is-coach-pulse,
    .bfz-coach,
    .bfz-panel,
    .bfz-legend__btn {
      animation: none !important;
      transition: none !important;
    }
  }
`, ee = ["pulse", "ring", "number", "icon", "area", "label"];
function S(d) {
  const e = p(d, "");
  return e ? e.split(/\r?\n|،|;|,/).map((a) => a.trim()).filter(Boolean) : [];
}
function re(d) {
  return R(d).map((e, a) => {
    const r = p(e.name), o = p(e.title) || r;
    return {
      id: String(e.id ?? e.zone_id ?? "").trim() || `zone-${a + 1}`,
      name: r,
      x: y(u(e.x, 50), 0, 100),
      y: y(u(e.y, 50), 0, 100),
      dotSize: y(u(e.dot_size, 30), 12, 120),
      dotColor: String(e.dot_color ?? "").trim(),
      icon: String(e.icon ?? "").trim(),
      title: o,
      desc: p(e.desc),
      tags: q(e.tags),
      steps: S(e.steps),
      tips: S(e.tips),
      warning: p(e.warning),
      image: W(e.image),
      link: U(e.link)
    };
  }).filter((e) => e.name || e.title || e.desc);
}
function te(d) {
  const e = w(d.bfz_dot_shape, "pulse");
  return ee.includes(e) ? e : "pulse";
}
function ae(d) {
  return w(d.bfz_detail_mode, "inline") === "sheet" ? "sheet" : "inline";
}
function oe(d, e = "3/4") {
  return (w(d.bfz_aspect, e) || e).replace("/", " / ");
}
var se = Object.defineProperty, $ = (d, e, a, r) => {
  for (var o = void 0, c = d.length - 1, n; c >= 0; c--)
    (n = d[c]) && (o = n(e, a, o) || o);
  return o && se(e, a, o), o;
};
const L = "tw-bfz-coach-seen", k = class k extends O {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.showCoach = !1, this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.showCoach = !G(L, !1);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && (this.activeId = this.defaultZoneId(this.zones));
  }
  dismissCoach() {
    this.showCoach = !1, K(L, !0);
  }
  get zones() {
    var e;
    return re((e = this.config) == null ? void 0 : e.bfz_zones);
  }
  /** Merchant preset, otherwise the first zone — never leave the panel empty. */
  defaultZoneId(e) {
    var r, o;
    if (!e.length) return "";
    const a = String(((r = this.config) == null ? void 0 : r.bfz_default_zone) ?? "").trim();
    return a && e.some((c) => c.id === a) ? a : ((o = e[0]) == null ? void 0 : o.id) ?? "";
  }
  resolveActive(e) {
    if (!e.length || this.activeId === "__none__") return null;
    if (this.activeId) {
      const r = e.find((o) => o.id === this.activeId);
      if (r) return r;
    }
    const a = this.defaultZoneId(e);
    return e.find((r) => r.id === a) ?? e[0] ?? null;
  }
  select(e) {
    this.activeId = e, this.dismissCoach();
  }
  step(e, a) {
    var n;
    const r = this.resolveActive(e), c = ((r ? e.findIndex((f) => f.id === r.id) : -1) + a + e.length) % e.length;
    this.activeId = ((n = e[c]) == null ? void 0 : n.id) ?? "", this.dismissCoach();
  }
  renderDot(e, a, r, o, c, n, f) {
    const l = f === e.id, b = e.name || e.title, x = a === "label" || c, z = r || n;
    return t`
      <button
        type="button"
        class=${v({
      "bfz-dot": !0,
      [`bfz-dot--${a}`]: !0,
      "is-active": l,
      "is-coach-pulse": n && !l
    })}
        style=${_({
      "--dot-x": `${e.x}%`,
      "--dot-y": `${e.y}%`,
      "--dot-size": `${e.dotSize}px`,
      ...e.dotColor ? { "--dot-color": e.dotColor } : {}
    })}
        aria-pressed=${l ? "true" : "false"}
        aria-controls="bfz-detail"
        aria-label=${b}
        title=${b}
        @click=${() => this.select(e.id)}
      >
        ${z ? t`<span class="bfz-dot__pulse" aria-hidden="true"></span>` : s}
        ${a === "number" ? t`<span>${o + 1}</span>` : a === "icon" && e.icon ? t`<span class=${e.icon.startsWith("sicon-") ? e.icon : ""}>${e.icon.startsWith("sicon-") ? "" : e.icon}</span>` : s}
        ${x ? t`<span class="bfz-dot__label">${b}</span>` : s}
      </button>
    `;
  }
  renderEmptyPanel(e) {
    return t`<div class="bfz-panel bfz-panel--empty" id="bfz-detail" role="region">
      <div class="bfz-empty-state">
        <span class="bfz-empty-state__icon" aria-hidden="true">◎</span>
        <h3 class="bfz-empty-state__title">${i("اختاري منطقة", "Pick a zone")}</h3>
        <p class="bfz-empty-state__text">
          ${i(
      "اضغطي على أي نقطة في الخريطة لعرض خطوات العناية والنصائح الخاصة بكل منطقة.",
      "Tap any hotspot on the map to see care steps and tips for that zone."
    )}
        </p>
      </div>
    </div>`;
  }
  renderLegend(e, a) {
    return e.length < 2 ? s : t`
      <div class="bfz-legend" role="tablist" aria-label=${i("مناطق الوجه", "Face zones")}>
        ${e.map(
      (r) => t`
            <button
              type="button"
              role="tab"
              class=${v({ "bfz-legend__btn": !0, "is-active": a === r.id })}
              style=${_(r.dotColor ? { "--dot-color": r.dotColor } : {})}
              aria-selected=${a === r.id ? "true" : "false"}
              @click=${() => this.select(r.id)}
            >
              <span class="bfz-legend__swatch" aria-hidden="true"></span>
              <span>${r.name || r.title}</span>
            </button>
          `
    )}
      </div>
    `;
  }
  renderDetail(e, a) {
    if (!e)
      return this.renderEmptyPanel(a);
    const r = this.config || {}, o = h(r.bfz_show_nav, !0) && this.zones.length > 1, c = i("خطوات العناية", "Care steps"), n = i("نصائح", "Tips"), f = this.zones.findIndex((l) => l.id === e.id);
    return t`
      <div class="bfz-panel" id="bfz-detail" role="region" aria-live="polite">
        <div class="bfz-panel__head">
          <div>
            <p class="bfz-panel__eyebrow">
              ${i("منطقة العناية", "Care zone")}${f >= 0 ? ` · ${f + 1}/${this.zones.length}` : ""}
            </p>
            <h3 class="bfz-panel__title">${e.title || e.name}</h3>
          </div>
          <div class="bfz-nav">
            ${a === "sheet" ? t`<button
                  type="button"
                  class="bfz-nav__btn bfz-sheet-close"
                  aria-label=${i("إغلاق", "Close")}
                  @click=${() => this.activeId = "__none__"}
                >✕</button>` : s}
            ${o ? t`
                  <button type="button" class="bfz-nav__btn" aria-label=${i("السابق", "Previous")} @click=${() => this.step(this.zones, -1)}>‹</button>
                  <button type="button" class="bfz-nav__btn" aria-label=${i("التالي", "Next")} @click=${() => this.step(this.zones, 1)}>›</button>
                ` : s}
          </div>
        </div>

        ${e.image ? t`<img class="bfz-panel__img" src=${e.image} alt="" loading="lazy" decoding="async" />` : s}
        ${e.desc ? t`<p class="bfz-panel__desc">${e.desc}</p>` : s}

        ${e.tags.length ? t`<div class="bfz-tags">${e.tags.map((l) => t`<span class="bfz-tag">${l}</span>`)}</div>` : s}

        ${e.steps.length ? t`<div class="bfz-block">
              <h4 class="bfz-block__title">${c}</h4>
              <ol class="bfz-steps">${e.steps.map((l) => t`<li>${l}</li>`)}</ol>
            </div>` : s}

        ${e.tips.length ? t`<div class="bfz-block">
              <h4 class="bfz-block__title">${n}</h4>
              <ul class="bfz-tips">${e.tips.map((l) => t`<li>${l}</li>`)}</ul>
            </div>` : s}

        ${e.warning ? t`<div class="bfz-warn"><span aria-hidden="true">⚠︎</span><span>${e.warning}</span></div>` : s}

        <div class="fs-actions">
          ${J(r, "bfz_", { href: e.link })}
        </div>
      </div>
    `;
  }
  render() {
    const e = this.config || {}, a = V(e, "bfz_"), r = a.animate && !X(), o = this.zones, c = p(e.bfz_face_image), n = p(e.bfz_title), f = p(e.bfz_desc), l = te(e), b = ae(e), x = h(e.bfz_pulse, !0) && r, z = Math.max(600, u(e.bfz_pulse_speed, 2200)), D = h(e.bfz_reverse, !1), T = h(e.bfz_show_names, !1), A = oe(e), m = this.resolveActive(o), E = h(e.bfz_show_notice, !0), M = p(e.bfz_notice) || i("المعلومات المعروضة توعوية ولا تُعد تشخيصًا طبيًا.", "The information shown is educational and is not a medical diagnosis."), C = (m == null ? void 0 : m.id) ?? "", I = this.showCoach && !m;
    if (!o.length)
      return t`<div class="fs-empty" role="status">
        ${i("أضيفي مناطق الوجه من إعدادات العنصر لعرض الخريطة التفاعلية.", "Add face zones in the element settings to show the interactive map.")}
      </div>`;
    const P = b === "sheet" && !!m;
    return t`
      <section
        class=${v({ "fs-section": !0, "fs-animate": r })}
        style=${_({
      ...B(a),
      "--bfz-aspect": A,
      "--bfz-pulse-speed": `${z}ms`
    })}
        aria-label=${n || i("خريطة مناطق الوجه والعناية", "Face care zone map")}
      >
        <div class="fs-container">
          ${n || f ? t`<div class="fs-header">
                ${n ? t`<h2 class="fs-title">${n}</h2>` : s}
                ${f ? t`<p class="fs-desc">${f}</p>` : s}
              </div>` : s}

          <div
            class=${v({
      "bfz-layout": !0,
      "bfz-layout--reverse": D,
      "bfz-layout--sheet": b === "sheet"
    })}
          >
            <div class="bfz-stage-wrap">
              <div class="bfz-stage">
                ${c ? t`<img class="bfz-stage__img" src=${c} alt="" loading="lazy" decoding="async" />` : t`<div class="bfz-stage__missing" role="img" aria-label=${i("صورة وجه غير متوفرة", "Face image not available")}>
                      <span class="bfz-stage__missing-icon" aria-hidden="true">👤</span>
                      <p>${i("أضيفي صورة وجه من الإعدادات", "Add a face image in settings")}</p>
                    </div>`}
                ${o.map(
      (Y, H) => this.renderDot(Y, l, x, H, T, I && r, C)
    )}
              </div>

              ${this.renderLegend(o, C)}

              ${I ? t`<div class="bfz-coach" role="status">
                    <p class="bfz-coach__text">${i("اضغطي على منطقة في الخريطة", "Tap a zone on the map")}</p>
                    <button type="button" class="bfz-coach__dismiss" aria-label=${i("إخفاء", "Dismiss")} @click=${() => this.dismissCoach()}>✕</button>
                  </div>` : s}
            </div>

            ${b === "sheet" ? t`
                  ${P ? t`<button
                        class="bfz-sheet-backdrop"
                        aria-label=${i("إغلاق", "Close")}
                        @click=${() => this.activeId = "__none__"}
                      ></button>` : s}
                  ${this.renderDetail(m, b)}
                ` : this.renderDetail(m, b)}
          </div>

          ${E ? t`<p class="bfz-notice">${M}</p>` : s}
        </div>
      </section>
    `;
  }
};
k.styles = [F, Q];
let g = k;
$([
  Z({ type: Object })
], g.prototype, "config");
$([
  j()
], g.prototype, "activeId");
$([
  j()
], g.prototype, "showCoach");
typeof g < "u" && g.registerSallaComponent("salla-beauty-face-zone-map");
export {
  g as default
};
