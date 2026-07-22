import { css as L, LitElement as I, nothing as s, html as a } from "lit";
import { property as C, state as z } from "lit/decorators.js";
import { classMap as h } from "lit/directives/class-map.js";
import { styleMap as g } from "lit/directives/style-map.js";
import { n as R, l as f, b as A, e as E, f as j, g as F, s as H, p as w, t as c, i as S, r as N, a as P } from "./sharedStyles-DKbcXBPy.js";
import { r as M } from "./commerceOutcome-Dk8p2VWM.js";
const Y = L`
  .bff-shell {
    display: grid;
    gap: 1.35rem;
    align-items: start;
    max-width: 1080px;
    margin-inline: auto;
  }

  @media (min-width: 900px) {
    .bff-shell {
      grid-template-columns: minmax(240px, 0.85fr) minmax(0, 1.35fr);
      gap: 1.75rem;
    }
  }

  /* —— Family selector —— */
  .bff-selector {
    min-width: 0;
    padding: 1rem 1rem 1.1rem;
    border-radius: var(--section-radius, 20px);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, transparent));
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 90%, #fff);
    box-shadow: 0 10px 28px rgba(120, 44, 82, 0.06);
  }

  .bff-selector__label {
    margin: 0 0 0.75rem;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: var(--muted-color, #666666);
  }

  .bff-chips {
    display: grid;
    gap: 0.55rem;
  }

  .bff-chips--grid {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 900px) {
    .bff-chips--grid {
      grid-template-columns: 1fr;
    }
  }

  .bff-chips--list {
    grid-template-columns: 1fr;
  }

  .bff-chip {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.65rem;
    min-height: 52px;
    padding: 0.55rem 0.7rem;
    border: 1.5px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 20px) * 0.65);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.25;
    cursor: pointer;
    text-align: start;
    box-shadow: 0 2px 8px rgba(43, 33, 28, 0.04);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease;
  }

  .bff-chip:hover {
    transform: translateY(-1px);
    border-color: color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 45%, var(--border-color, #e5e7eb));
    box-shadow: 0 8px 18px rgba(43, 33, 28, 0.08);
  }

  .bff-chip.is-active {
    border-color: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 8%, var(--card-bg, #fff));
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 22%, transparent),
      0 10px 22px rgba(43, 33, 28, 0.1);
  }

  .bff-chip__swatch {
    flex: 0 0 auto;
    width: 2.15rem;
    height: 2.15rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    font-size: 1rem;
    line-height: 1;
    box-shadow:
      inset 0 0 0 2px color-mix(in srgb, #fff 40%, transparent),
      0 4px 10px color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 35%, transparent);
  }

  .bff-chip__meta {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .bff-chip__name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bff-chip__hint {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--muted-color, #666666);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bff-chip__dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: transparent;
    box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--muted-color, #8f7a86) 55%, transparent);
  }

  .bff-chip.is-active .bff-chip__dot {
    background: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: none;
  }

  /* —— Wheel layout —— */
  .bff-chips--wheel {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0 0.5rem;
  }

  .bff-chips--wheel .bff-chip {
    display: inline-flex;
    grid-template-columns: none;
    border-radius: 999px;
    padding: 0.45rem 0.85rem 0.45rem 0.5rem;
    padding-inline: 0.5rem 0.85rem;
  }

  .bff-chips--wheel .bff-chip__meta,
  .bff-chips--wheel .bff-chip__hint,
  .bff-chips--wheel .bff-chip__dot {
    display: none;
  }

  .bff-chips--wheel .bff-chip__name {
    display: inline;
  }

  @media (min-width: 560px) {
    .bff-chips--wheel {
      position: relative;
      min-height: 300px;
      border-radius: 50%;
    }

    .bff-chips--wheel .bff-chip {
      position: absolute;
      top: 50%;
      inset-inline-start: 50%;
      transform: translate(-50%, -50%)
        rotate(var(--i-angle, 0deg)) translate(var(--wheel-r, 120px))
        rotate(calc(-1 * var(--i-angle, 0deg)));
    }

    .bff-chips--wheel .bff-chip:hover {
      transform: translate(-50%, -50%)
        rotate(var(--i-angle, 0deg)) translate(var(--wheel-r, 120px))
        rotate(calc(-1 * var(--i-angle, 0deg))) scale(1.05);
    }

    .bff-wheel-core {
      display: grid;
      position: absolute;
      top: 50%;
      inset-inline-start: 50%;
      transform: translate(-50%, -50%);
      width: 5.25rem;
      height: 5.25rem;
      place-items: center;
      text-align: center;
      border-radius: 50%;
      background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
      border: 1px dashed color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, transparent);
      color: var(--muted-color, #666666);
      font-size: 0.72rem;
      font-weight: 700;
      padding: 0.5rem;
      pointer-events: none;
    }
  }

  .bff-wheel-core {
    display: none;
  }

  /* —— Story panel —— */
  .bff-story {
    min-width: 0;
    padding: 1.15rem;
    border-radius: var(--section-radius, 20px);
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 28%, var(--border-color, #e5e7eb));
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 12%, transparent),
      0 16px 36px rgba(120, 44, 82, 0.09);
  }

  .bff-hero {
    position: relative;
    display: grid;
    gap: 1rem;
    margin-bottom: 1.1rem;
  }

  @media (min-width: 640px) {
    .bff-hero--media {
      grid-template-columns: minmax(0, 1.1fr) minmax(160px, 0.75fr);
      align-items: stretch;
    }
  }

  .bff-hero__body {
    position: relative;
    z-index: 1;
    min-width: 0;
    padding: 0.15rem 0.1rem 0;
  }

  .bff-hero__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.55rem;
  }

  .bff-hero__icon {
    display: inline-grid;
    place-items: center;
    width: 2.65rem;
    height: 2.65rem;
    border-radius: 50%;
    background: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    font-size: 1.2rem;
    box-shadow:
      inset 0 0 0 2px color-mix(in srgb, #fff 40%, transparent),
      0 8px 18px color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 35%, transparent);
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
    border: 1px solid var(--border-color, #e5e7eb);
    background: color-mix(in srgb, var(--card-bg, #fff) 70%, var(--section-bg, transparent));
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 1.05rem;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .bff-nav__btn:hover {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
  }

  .bff-hero__title {
    margin: 0 0 0.4rem;
    font-size: clamp(1.35rem, 3.2vw, 1.75rem);
    font-weight: 800;
    color: var(--text-color, #000000);
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .bff-hero__desc {
    margin: 0 0 0.8rem;
    color: var(--muted-color, #666666);
    line-height: 1.7;
    font-size: 0.93rem;
  }

  .bff-mood {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .bff-mood__tag {
    font-size: 0.74rem;
    font-weight: 700;
    padding: 0.28rem 0.7rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 14%, var(--card-bg, #fff));
    color: color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 78%, var(--text-color, #33232e));
  }

  .bff-hero__media {
    position: relative;
    min-width: 0;
    border-radius: calc(var(--section-radius, 20px) * 0.7);
    overflow: hidden;
    background:
      linear-gradient(
        160deg,
        color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 28%, transparent),
        transparent 55%
      ),
      color-mix(in srgb, var(--border-color, #e5e7eb) 35%, var(--card-bg, #fff));
    aspect-ratio: 4 / 5;
    max-height: 280px;
  }

  @media (max-width: 639px) {
    .bff-hero__media {
      aspect-ratio: 16 / 10;
      max-height: 220px;
    }
  }

  .bff-hero__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .bff-hero__media::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 45%,
      color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 22%, transparent)
    );
    pointer-events: none;
  }

  /* —— Notes pyramid —— */
  .bff-pyramid {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.45rem;
    margin: 0 0 1.1rem;
    padding: 1rem 0.85rem 1.05rem;
    border-radius: calc(var(--section-radius, 20px) * 0.7);
    background:
      radial-gradient(
        90% 80% at 50% 0%,
        color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 10%, transparent),
        transparent 70%
      ),
      color-mix(in srgb, var(--section-bg, transparent) 65%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 18%, var(--border-color, #e5e7eb));
  }

  .bff-pyramid__intro {
    margin: 0 0 0.55rem;
    font-size: 0.76rem;
    font-weight: 700;
    color: var(--muted-color, #666666);
    text-align: center;
  }

  .bff-tier {
    width: 100%;
    border-radius: 14px;
    padding: 0.75rem 0.9rem;
    background: color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) var(--tier-tint, 10%), var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 28%, transparent);
    box-sizing: border-box;
    text-align: center;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.45s ease, transform 0.45s ease, width 0.35s ease;
  }

  .bff-tier.is-visible,
  .bff-tier.is-instant {
    opacity: 1;
    transform: translateY(0);
  }

  .bff-tier--top {
    width: 58%;
    --tier-tint: 8%;
  }

  .bff-tier--heart {
    width: 78%;
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
    letter-spacing: 0.03em;
    color: color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 85%, var(--text-color, #33232e));
    margin-bottom: 0.4rem;
  }

  .bff-tier__notes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.35rem;
  }

  .bff-note {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-color, #000000);
    background: color-mix(in srgb, var(--card-bg, #fff) 82%, transparent);
    padding: 0.22rem 0.65rem;
    border-radius: 999px;
    line-height: 1.4;
    opacity: 0;
    transform: scale(0.92);
    transition: opacity 0.35s ease, transform 0.35s ease;
    transition-delay: calc(var(--note-i, 0) * 80ms);
  }

  .bff-note.is-visible,
  .bff-note.is-instant {
    opacity: 1;
    transform: scale(1);
  }

  .bff-tier__empty {
    font-size: 0.76rem;
    color: var(--muted-color, #666666);
  }

  @media (max-width: 480px) {
    .bff-tier--top,
    .bff-tier--heart,
    .bff-tier--base {
      width: 100%;
    }
  }

  /* —— Facts —— */
  .bff-facts {
    display: grid;
    gap: 0.55rem;
    margin-bottom: 0.25rem;
  }

  @media (min-width: 480px) {
    .bff-facts {
      grid-template-columns: 1fr 1fr;
    }
  }

  .bff-fact {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.75rem 0.85rem;
    border-radius: 14px;
    background: color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 7%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 18%, var(--border-color, #e5e7eb));
  }

  .bff-fact__label {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--muted-color, #666666);
  }

  .bff-fact__value {
    font-size: 0.92rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .bff-panel__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-top: 1rem;
  }

  .bff-notice {
    max-width: 1080px;
    margin: 1.25rem auto 0;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
    line-height: 1.65;
  }

  @media (prefers-reduced-motion: reduce) {
    .bff-chip,
    .bff-tier,
    .bff-note,
    .bff-nav__btn {
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
`, O = ["wheel", "grid", "list"];
function y(d) {
  const e = f(d, "");
  return e ? e.split(/\r?\n|،|;|,/).map((r) => r.trim()).filter(Boolean) : [];
}
function q(d) {
  return R(d).map((e, r) => {
    const t = f(e.name);
    return {
      id: String(e.id ?? e.family_id ?? "").trim() || `family-${r + 1}`,
      name: t,
      color: String(e.color ?? "").trim(),
      icon: String(e.icon ?? "").trim(),
      desc: f(e.desc),
      mood: j(e.mood),
      top: y(e.top_notes),
      heart: y(e.heart_notes),
      base: y(e.base_notes),
      season: f(e.season),
      occasion: f(e.occasion),
      image: E(e.image),
      link: A(e.link)
    };
  }).filter((e) => e.name || e.desc);
}
function D(d) {
  const e = F(d.bff_layout, "grid");
  return O.includes(e) ? e : "grid";
}
var U = Object.defineProperty, $ = (d, e, r, t) => {
  for (var i = void 0, o = d.length - 1, n; o >= 0; o--)
    (n = d[o]) && (i = n(e, r, i) || i);
  return i && U(e, r, i), i;
};
const W = [0, 400, 800], k = class k extends I {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.revealStep = 0, this.boundLangHandler = () => this.requestUpdate(), this.revealTimers = [], this.lastRevealFamilyId = "";
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    this.clearRevealTimers(), window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    var t;
    e.has("config") && (this.activeId = "", this.revealStep = 0, this.lastRevealFamilyId = "");
    const r = ((t = this.resolveActive(this.families)) == null ? void 0 : t.id) ?? "";
    r && r !== this.lastRevealFamilyId && (this.lastRevealFamilyId = r, this.startRevealSequence());
  }
  clearRevealTimers() {
    this.revealTimers.forEach((e) => window.clearTimeout(e)), this.revealTimers = [];
  }
  startRevealSequence() {
    if (this.clearRevealTimers(), w()) {
      this.revealStep = 3;
      return;
    }
    this.revealStep = 0, W.forEach((r, t) => {
      const i = window.setTimeout(() => {
        this.revealStep = t + 1;
      }, r);
      this.revealTimers.push(i);
    });
  }
  get families() {
    var e;
    return q((e = this.config) == null ? void 0 : e.bff_families);
  }
  resolveActive(e) {
    var t;
    if (!e.length) return null;
    if (this.activeId) {
      const i = e.find((o) => o.id === this.activeId);
      if (i) return i;
    }
    const r = String(((t = this.config) == null ? void 0 : t.bff_default_family) ?? "").trim();
    if (r) {
      const i = e.find((o) => o.id === r);
      if (i) return i;
    }
    return e[0];
  }
  select(e) {
    e !== this.activeId && (this.activeId = e);
  }
  step(e, r) {
    var n;
    if (!e.length) return;
    const t = this.resolveActive(e), o = ((t ? e.findIndex((l) => l.id === t.id) : -1) + r + e.length) % e.length;
    this.activeId = ((n = e[o]) == null ? void 0 : n.id) ?? "";
  }
  chipHint(e) {
    return e.season || e.mood[0] || "";
  }
  renderChip(e, r, t, i) {
    var m;
    const o = ((m = this.resolveActive(this.families)) == null ? void 0 : m.id) === e.id, n = e.icon.startsWith("sicon-"), l = this.chipHint(e), p = e.color ? { "--fam-color": e.color } : {};
    return r === "wheel" && (p["--i-angle"] = `${360 / Math.max(i, 1) * t}deg`), a`
      <button
        type="button"
        class=${h({ "bff-chip": !0, "is-active": o })}
        style=${g(p)}
        aria-pressed=${o ? "true" : "false"}
        aria-controls="bff-detail"
        title=${e.name}
        @click=${() => this.select(e.id)}
      >
        <span class="bff-chip__swatch" aria-hidden="true">
          ${e.icon ? n ? a`<span class=${e.icon}></span>` : a`<span>${e.icon}</span>` : s}
        </span>
        <span class="bff-chip__meta">
          <span class="bff-chip__name">${e.name}</span>
          ${l && r !== "wheel" ? a`<span class="bff-chip__hint">${l}</span>` : s}
        </span>
        ${r !== "wheel" ? a`<span class="bff-chip__dot" aria-hidden="true"></span>` : s}
      </button>
    `;
  }
  renderTier(e, r, t, i) {
    const o = this.revealStep >= i, n = w();
    return a`
      <div
        class=${h({
      "bff-tier": !0,
      [`bff-tier--${e}`]: !0,
      "is-visible": o,
      "is-instant": n
    })}
        role="listitem"
        aria-hidden=${o ? "false" : "true"}
      >
        <span class="bff-tier__label">${r}</span>
        ${t.length ? a`<div class="bff-tier__notes">
              ${t.map(
      (l, p) => a`
                  <span
                    class=${h({ "bff-note": !0, "is-visible": o, "is-instant": n })}
                    style=${g(n ? {} : { "--note-i": String(p) })}
                    >${l}</span
                  >
                `
    )}
            </div>` : a`<span class="bff-tier__empty">${c("—", "—")}</span>`}
      </div>
    `;
  }
  renderDetail(e, r) {
    const t = this.config || {}, i = r.length > 1, o = S(t.bff_show_pyramid, !0), n = e.icon.startsWith("sicon-"), l = f(t.bff_pyramid_top_label) || c("المقدمة", "Top"), p = f(t.bff_pyramid_heart_label) || c("القلب", "Heart"), m = f(t.bff_pyramid_base_label) || c("الأساس", "Base"), v = f(t.bff_season_label) || c("أنسب موسم", "Best season"), u = f(t.bff_occasion_label) || c("أنسب مناسبة", "Occasion"), x = e.top.length || e.heart.length || e.base.length, _ = e.color ? { "--fam-color": e.color } : {};
    return a`
      <article class="bff-story" id="bff-detail" role="region" aria-live="polite" style=${g(_)}>
        <div class=${h({ "bff-hero": !0, "bff-hero--media": !!e.image })}>
          <div class="bff-hero__body">
            <div class="bff-hero__top">
              ${e.icon ? a`<span class="bff-hero__icon" aria-hidden="true">
                    ${n ? a`<span class=${e.icon}></span>` : e.icon}
                  </span>` : a`<span class="bff-hero__icon" aria-hidden="true">✦</span>`}

              ${i ? a`<div class="bff-nav">
                    <button
                      type="button"
                      class="bff-nav__btn"
                      aria-label=${c("السابق", "Previous")}
                      @click=${() => this.step(r, -1)}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      class="bff-nav__btn"
                      aria-label=${c("التالي", "Next")}
                      @click=${() => this.step(r, 1)}
                    >
                      ›
                    </button>
                  </div>` : s}
            </div>

            <h3 class="bff-hero__title">${e.name}</h3>
            ${e.desc ? a`<p class="bff-hero__desc">${e.desc}</p>` : s}
            ${e.mood.length ? a`<div class="bff-mood">
                  ${e.mood.map((T) => a`<span class="bff-mood__tag">${T}</span>`)}
                </div>` : s}
          </div>

          ${e.image ? a`<div class="bff-hero__media">
                <img src=${e.image} alt="" loading="lazy" decoding="async" />
              </div>` : s}
        </div>

        ${o && x ? a`<div class="bff-pyramid" role="list" aria-label=${c("هرم النوتات", "Notes pyramid")}>
              <p class="bff-pyramid__intro">${c("تتكشّف النوتات تدريجيًا…", "Notes unfold gradually…")}</p>
              ${this.renderTier("top", l, e.top, 1)}
              ${this.renderTier("heart", p, e.heart, 2)}
              ${this.renderTier("base", m, e.base, 3)}
            </div>` : s}

        ${e.season || e.occasion ? a`<div class="bff-facts">
              ${e.season ? a`<div class="bff-fact">
                    <span class="bff-fact__label">${v}</span>
                    <span class="bff-fact__value">${e.season}</span>
                  </div>` : s}
              ${e.occasion ? a`<div class="bff-fact">
                    <span class="bff-fact__label">${u}</span>
                    <span class="bff-fact__value">${e.occasion}</span>
                  </div>` : s}
            </div>` : s}

        <div class="bff-panel__actions">
          ${e.link ? a`
              <a class="fs-btn fs-btn--ghost" href=${e.link} target="_blank" rel="noopener noreferrer">
                ${c("اقرئي المزيد", "Read more")}
              </a>
              ` : s}
          ${M(t, "bff_")}
        </div>
      </article>
    `;
  }
  render() {
    const e = this.config || {}, r = N(e, "bff_"), t = r.animate && !w(), i = this.families, o = f(e.bff_title), n = f(e.bff_desc), l = D(e), p = S(e.bff_show_notice, !0), m = f(e.bff_notice) || c(
      "اختيار العطر تجربة شخصية؛ هذه العائلات دليل استكشافي لمساعدتك على تحديد ما يناسب ذوقك.",
      "Choosing a fragrance is personal; these families are an exploratory guide to help you find what suits your taste."
    );
    if (!i.length)
      return a`<div class="fs-empty" role="status">
        ${c("أضيفي عائلات عطرية من إعدادات العنصر.", "Add fragrance families in the element settings.")}
      </div>`;
    const v = this.resolveActive(i), u = i.length;
    return a`
      <section
        class=${h({ "fs-section": !0, "fs-animate": t })}
        style=${g(P(r))}
        aria-label=${o || c("محدد عائلة العطر", "Fragrance family finder")}
      >
        <div class="fs-container">
          ${o || n ? a`<div class="fs-header">
                ${o ? a`<h2 class="fs-title">${o}</h2>` : s}
                ${n ? a`<p class="fs-desc">${n}</p>` : s}
              </div>` : s}

          <div class="bff-shell">
            <aside class="bff-selector">
              <p class="bff-selector__label">${c("اختاري عائلة عطرية", "Pick a fragrance family")}</p>
              <div
                class=${h({
      "bff-chips": !0,
      [`bff-chips--${l}`]: !0
    })}
                role="group"
                aria-label=${c("عائلات العطر", "Fragrance families")}
                style=${g(l === "wheel" ? { "--wheel-r": "120px" } : {})}
              >
                ${l === "wheel" ? a`<div class="bff-wheel-core">${c("عائلات", "Families")}</div>` : s}
                ${i.map((x, _) => this.renderChip(x, l, _, u))}
              </div>
            </aside>

            ${v ? this.renderDetail(v, i) : s}
          </div>

          ${p ? a`<p class="bff-notice">${m}</p>` : s}
        </div>
      </section>
    `;
  }
};
k.styles = [H, Y];
let b = k;
$([
  C({ type: Object })
], b.prototype, "config");
$([
  z()
], b.prototype, "activeId");
$([
  z()
], b.prototype, "revealStep");
typeof b < "u" && b.registerSallaComponent("salla-beauty-fragrance-finder");
export {
  b as default
};
