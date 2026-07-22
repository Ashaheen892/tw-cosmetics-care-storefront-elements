var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, b as extractLink, e as extractImageUrl, f as parseTags, g as getRadioValue, s as sharedSectionCss, p as prefersReducedMotion, t, i as isTruthy, r as readSectionTheme, a as themeStyleMap } from "./sharedStyles-CPLtr3dp.js";
import { r as renderCommerceCtaButton } from "./commerceOutcome-D0x70G-K.js";
const componentStyles = css`
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
`, LAYOUTS = ["wheel", "grid", "list"];
function splitList(raw) {
  const text = localizedString(raw, "");
  return text ? text.split(/\r?\n|،|;|,/).map((part) => part.trim()).filter(Boolean) : [];
}
__name(splitList, "splitList");
function parseFamilies(raw) {
  return normalizeCollection(raw).map((f, i) => {
    const name = localizedString(f.name);
    return {
      id: String(f.id ?? f.family_id ?? "").trim() || `family-${i + 1}`,
      name,
      color: String(f.color ?? "").trim(),
      icon: String(f.icon ?? "").trim(),
      desc: localizedString(f.desc),
      mood: parseTags(f.mood),
      top: splitList(f.top_notes),
      heart: splitList(f.heart_notes),
      base: splitList(f.base_notes),
      season: localizedString(f.season),
      occasion: localizedString(f.occasion),
      image: extractImageUrl(f.image),
      link: extractLink(f.link)
    };
  }).filter((f) => f.name || f.desc);
}
__name(parseFamilies, "parseFamilies");
function resolveLayout(config) {
  const value = getRadioValue(config.bff_layout, "grid");
  return LAYOUTS.includes(value) ? value : "grid";
}
__name(resolveLayout, "resolveLayout");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const REVEAL_DELAYS = [0, 400, 800], _BeautyFragranceFinder = class _BeautyFragranceFinder extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.revealStep = 0, this.boundLangHandler = () => this.requestUpdate(), this.revealTimers = [], this.lastRevealFamilyId = "";
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    this.clearRevealTimers(), window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    var _a;
    changed.has("config") && (this.activeId = "", this.revealStep = 0, this.lastRevealFamilyId = "");
    const familyId = ((_a = this.resolveActive(this.families)) == null ? void 0 : _a.id) ?? "";
    familyId && familyId !== this.lastRevealFamilyId && (this.lastRevealFamilyId = familyId, this.startRevealSequence());
  }
  clearRevealTimers() {
    this.revealTimers.forEach((id) => window.clearTimeout(id)), this.revealTimers = [];
  }
  startRevealSequence() {
    if (this.clearRevealTimers(), prefersReducedMotion()) {
      this.revealStep = 3;
      return;
    }
    this.revealStep = 0, REVEAL_DELAYS.forEach((delay, i) => {
      const id = window.setTimeout(() => {
        this.revealStep = i + 1;
      }, delay);
      this.revealTimers.push(id);
    });
  }
  get families() {
    var _a;
    return parseFamilies((_a = this.config) == null ? void 0 : _a.bff_families);
  }
  resolveActive(families) {
    var _a;
    if (!families.length) return null;
    if (this.activeId) {
      const found = families.find((f) => f.id === this.activeId);
      if (found) return found;
    }
    const preset = String(((_a = this.config) == null ? void 0 : _a.bff_default_family) ?? "").trim();
    if (preset) {
      const found = families.find((f) => f.id === preset);
      if (found) return found;
    }
    return families[0];
  }
  select(id) {
    id !== this.activeId && (this.activeId = id);
  }
  step(families, dir) {
    var _a;
    if (!families.length) return;
    const active = this.resolveActive(families), next = ((active ? families.findIndex((f) => f.id === active.id) : -1) + dir + families.length) % families.length;
    this.activeId = ((_a = families[next]) == null ? void 0 : _a.id) ?? "";
  }
  chipHint(family) {
    return family.season || family.mood[0] || "";
  }
  renderChip(family, layout, index, total) {
    var _a;
    const active = ((_a = this.resolveActive(this.families)) == null ? void 0 : _a.id) === family.id, isSicon = family.icon.startsWith("sicon-"), hint = this.chipHint(family), chipStyle = family.color ? { "--fam-color": family.color } : {};
    return layout === "wheel" && (chipStyle["--i-angle"] = `${360 / Math.max(total, 1) * index}deg`), html`
      <button
        type="button"
        class=${classMap({ "bff-chip": !0, "is-active": active })}
        style=${styleMap(chipStyle)}
        aria-pressed=${active ? "true" : "false"}
        aria-controls="bff-detail"
        title=${family.name}
        @click=${() => this.select(family.id)}
      >
        <span class="bff-chip__swatch" aria-hidden="true">
          ${family.icon ? isSicon ? html`<span class=${family.icon}></span>` : html`<span>${family.icon}</span>` : nothing}
        </span>
        <span class="bff-chip__meta">
          <span class="bff-chip__name">${family.name}</span>
          ${hint && layout !== "wheel" ? html`<span class="bff-chip__hint">${hint}</span>` : nothing}
        </span>
        ${layout !== "wheel" ? html`<span class="bff-chip__dot" aria-hidden="true"></span>` : nothing}
      </button>
    `;
  }
  renderTier(labelKey, label, notes, stepIndex) {
    const visible = this.revealStep >= stepIndex, reduced = prefersReducedMotion();
    return html`
      <div
        class=${classMap({
      "bff-tier": !0,
      [`bff-tier--${labelKey}`]: !0,
      "is-visible": visible,
      "is-instant": reduced
    })}
        role="listitem"
        aria-hidden=${visible ? "false" : "true"}
      >
        <span class="bff-tier__label">${label}</span>
        ${notes.length ? html`<div class="bff-tier__notes">
              ${notes.map(
      (note, i) => html`
                  <span
                    class=${classMap({ "bff-note": !0, "is-visible": visible, "is-instant": reduced })}
                    style=${styleMap(reduced ? {} : { "--note-i": String(i) })}
                    >${note}</span
                  >
                `
    )}
            </div>` : html`<span class="bff-tier__empty">${t("—", "—")}</span>`}
      </div>
    `;
  }
  renderDetail(family, families) {
    const c = this.config || {}, showNav = families.length > 1, showPyramid = isTruthy(c.bff_show_pyramid, !0), isSicon = family.icon.startsWith("sicon-"), topLabel = localizedString(c.bff_pyramid_top_label) || t("المقدمة", "Top"), heartLabel = localizedString(c.bff_pyramid_heart_label) || t("القلب", "Heart"), baseLabel = localizedString(c.bff_pyramid_base_label) || t("الأساس", "Base"), seasonLabel = localizedString(c.bff_season_label) || t("أنسب موسم", "Best season"), occasionLabel = localizedString(c.bff_occasion_label) || t("أنسب مناسبة", "Occasion"), hasPyramid = family.top.length || family.heart.length || family.base.length, style = family.color ? { "--fam-color": family.color } : {};
    return html`
      <article class="bff-story" id="bff-detail" role="region" aria-live="polite" style=${styleMap(style)}>
        <div class=${classMap({ "bff-hero": !0, "bff-hero--media": !!family.image })}>
          <div class="bff-hero__body">
            <div class="bff-hero__top">
              ${family.icon ? html`<span class="bff-hero__icon" aria-hidden="true">
                    ${isSicon ? html`<span class=${family.icon}></span>` : family.icon}
                  </span>` : html`<span class="bff-hero__icon" aria-hidden="true">✦</span>`}

              ${showNav ? html`<div class="bff-nav">
                    <button
                      type="button"
                      class="bff-nav__btn"
                      aria-label=${t("السابق", "Previous")}
                      @click=${() => this.step(families, -1)}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      class="bff-nav__btn"
                      aria-label=${t("التالي", "Next")}
                      @click=${() => this.step(families, 1)}
                    >
                      ›
                    </button>
                  </div>` : nothing}
            </div>

            <h3 class="bff-hero__title">${family.name}</h3>
            ${family.desc ? html`<p class="bff-hero__desc">${family.desc}</p>` : nothing}
            ${family.mood.length ? html`<div class="bff-mood">
                  ${family.mood.map((m) => html`<span class="bff-mood__tag">${m}</span>`)}
                </div>` : nothing}
          </div>

          ${family.image ? html`<div class="bff-hero__media">
                <img src=${family.image} alt="" loading="lazy" decoding="async" />
              </div>` : nothing}
        </div>

        ${showPyramid && hasPyramid ? html`<div class="bff-pyramid" role="list" aria-label=${t("هرم النوتات", "Notes pyramid")}>
              <p class="bff-pyramid__intro">${t("تتكشّف النوتات تدريجيًا…", "Notes unfold gradually…")}</p>
              ${this.renderTier("top", topLabel, family.top, 1)}
              ${this.renderTier("heart", heartLabel, family.heart, 2)}
              ${this.renderTier("base", baseLabel, family.base, 3)}
            </div>` : nothing}

        ${family.season || family.occasion ? html`<div class="bff-facts">
              ${family.season ? html`<div class="bff-fact">
                    <span class="bff-fact__label">${seasonLabel}</span>
                    <span class="bff-fact__value">${family.season}</span>
                  </div>` : nothing}
              ${family.occasion ? html`<div class="bff-fact">
                    <span class="bff-fact__label">${occasionLabel}</span>
                    <span class="bff-fact__value">${family.occasion}</span>
                  </div>` : nothing}
            </div>` : nothing}

        <div class="bff-panel__actions">
          ${family.link ? html`
              <a class="fs-btn fs-btn--ghost" href=${family.link} target="_blank" rel="noopener noreferrer">
                ${t("اقرئي المزيد", "Read more")}
              </a>
              ` : nothing}
          ${renderCommerceCtaButton(c, "bff_")}
        </div>
      </article>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bff_"), animate = theme.animate && !prefersReducedMotion(), families = this.families, title = localizedString(c.bff_title), desc = localizedString(c.bff_desc), layout = resolveLayout(c), showNotice = isTruthy(c.bff_show_notice, !0), notice = localizedString(c.bff_notice) || t(
      "اختيار العطر تجربة شخصية؛ هذه العائلات دليل استكشافي لمساعدتك على تحديد ما يناسب ذوقك.",
      "Choosing a fragrance is personal; these families are an exploratory guide to help you find what suits your taste."
    );
    if (!families.length)
      return html`<div class="fs-empty" role="status">
        ${t("أضيفي عائلات عطرية من إعدادات العنصر.", "Add fragrance families in the element settings.")}
      </div>`;
    const active = this.resolveActive(families), total = families.length;
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("محدد عائلة العطر", "Fragrance family finder")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="bff-shell">
            <aside class="bff-selector">
              <p class="bff-selector__label">${t("اختاري عائلة عطرية", "Pick a fragrance family")}</p>
              <div
                class=${classMap({
      "bff-chips": !0,
      [`bff-chips--${layout}`]: !0
    })}
                role="group"
                aria-label=${t("عائلات العطر", "Fragrance families")}
                style=${styleMap(layout === "wheel" ? { "--wheel-r": "120px" } : {})}
              >
                ${layout === "wheel" ? html`<div class="bff-wheel-core">${t("عائلات", "Families")}</div>` : nothing}
                ${families.map((family, i) => this.renderChip(family, layout, i, total))}
              </div>
            </aside>

            ${active ? this.renderDetail(active, families) : nothing}
          </div>

          ${showNotice ? html`<p class="bff-notice">${notice}</p>` : nothing}
        </div>
      </section>
    `;
  }
};
__name(_BeautyFragranceFinder, "BeautyFragranceFinder"), _BeautyFragranceFinder.styles = [sharedSectionCss, componentStyles];
let BeautyFragranceFinder = _BeautyFragranceFinder;
__decorateClass([
  property({ type: Object })
], BeautyFragranceFinder.prototype, "config");
__decorateClass([
  state()
], BeautyFragranceFinder.prototype, "activeId");
__decorateClass([
  state()
], BeautyFragranceFinder.prototype, "revealStep");
typeof BeautyFragranceFinder < "u" && BeautyFragranceFinder.registerSallaComponent("salla-beauty-fragrance-finder");
export {
  BeautyFragranceFinder as default
};
