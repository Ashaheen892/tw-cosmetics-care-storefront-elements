var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, t, g as getRadioValue, s as sharedSectionCss, r as readSectionTheme, p as prefersReducedMotion, i as isTruthy, a as themeStyleMap } from "./sharedStyles-2kfPtH3m.js";
import { r as renderCommerceCtaButton } from "./commerceOutcome-BDH0KFrf.js";
const componentStyles = css`
  .bac-picker {
    display: grid;
    gap: 0;
    margin-top: 1.5rem;
    padding: 1rem;
    border-radius: var(--section-radius, 16px);
    border: 1px solid var(--border-color, #e5e7eb);
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 18%, var(--card-bg, #fff));
  }

  .bac-slot {
    display: grid;
    gap: 0.55rem;
    padding: 0.65rem 0;
  }

  .bac-slot__label {
    margin: 0;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--muted-color, #666666);
  }

  .bac-divider {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.15rem 0;
  }

  .bac-divider__line {
    flex: 1;
    height: 1px;
    background: var(--border-color, #e5e7eb);
  }

  .bac-divider__icon {
    flex: 0 0 auto;
    width: 1.75rem;
    height: 1.75rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e5e7eb);
    color: var(--muted-color, #666666);
    font-size: 0.75rem;
    font-weight: 800;
  }

  .bac-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .bac-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    min-height: 44px;
    padding: 0.5rem 0.85rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.86rem;
    font-weight: 600;
    line-height: 1.2;
    cursor: pointer;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
  }

  .bac-chip:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
  }

  .bac-chip:active {
    transform: scale(0.97);
  }

  .bac-chip.is-selected {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 30%, transparent);
  }

  .bac-chip__swatch {
    width: 0.95rem;
    height: 0.95rem;
    border-radius: 50%;
    flex: 0 0 auto;
    border: 1px solid color-mix(in srgb, #000 12%, transparent);
    background: var(--swatch, var(--accent-color, var(--fs-store-primary)));
  }

  /* —— Verdict card —— */
  .bac-verdict {
    padding: 1.35rem 1.25rem 1.4rem;
    border-radius: var(--section-radius, 16px);
    border: 2px solid color-mix(in srgb, var(--verdict-color, var(--accent-color, var(--fs-store-primary))) 35%, transparent);
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--verdict-color, var(--accent-color, var(--fs-store-primary))) 14%, var(--card-bg, #fff)) 0%,
      var(--card-bg, #fff) 55%
    );
    box-shadow: 0 12px 32px color-mix(in srgb, var(--verdict-color, #000) 12%, transparent);
    text-align: center;
  }

  .bac-verdict__title {
    margin: 0 0 0.35rem;
    font-size: 0.95rem;
    font-weight: 800;
    color: var(--text-color, #000000);
    text-align: center;
  }

  .bac-verdict__hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.65rem;
    margin-bottom: 1rem;
  }

  .bac-verdict__icon {
    width: 3.5rem;
    height: 3.5rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--verdict-color, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    font-size: 1.5rem;
    font-weight: 800;
    line-height: 1;
    box-shadow: 0 6px 20px color-mix(in srgb, var(--verdict-color, #000) 35%, transparent);
  }

  .bac-verdict__badge {
    display: inline-block;
    padding: 0.35rem 1rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--verdict-color, var(--accent-color, var(--fs-store-primary))) 18%, var(--card-bg, #fff));
    color: var(--verdict-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 0.92rem;
    font-weight: 800;
    letter-spacing: 0.01em;
  }

  .bac-verdict--unknown .bac-verdict__icon {
    background: color-mix(in srgb, var(--verdict-color, #6b7280) 85%, var(--card-bg, #fff));
    border: 2px dashed color-mix(in srgb, var(--verdict-color, #6b7280) 60%, transparent);
    color: var(--verdict-color, #6b7280);
    box-shadow: none;
  }

  .bac-pair {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.45rem 0.55rem;
    margin-bottom: 0.85rem;
  }

  .bac-pair__pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 35%, var(--card-bg, #fff));
    font-size: 0.84rem;
    font-weight: 700;
    color: var(--text-color, #000000);
  }

  .bac-pair__dot {
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 50%;
    display: inline-block;
    border: 1px solid color-mix(in srgb, #000 12%, transparent);
    flex: 0 0 auto;
  }

  .bac-pair__vs {
    color: var(--muted-color, #666666);
    font-weight: 800;
    font-size: 0.9rem;
  }

  .bac-verdict__note {
    margin: 0;
    color: var(--text-color, #000000);
    font-size: 0.94rem;
    line-height: 1.65;
    text-align: start;
  }

  .bac-tip {
    display: flex;
    gap: 0.55rem;
    align-items: flex-start;
    margin-top: 0.9rem;
    padding: 0.7rem 0.85rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--verdict-color, var(--accent-color, var(--fs-store-primary))) 10%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--verdict-color, var(--accent-color, var(--fs-store-primary))) 22%, transparent);
    text-align: start;
  }

  .bac-tip__label {
    flex: 0 0 auto;
    font-weight: 800;
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--verdict-color, var(--accent-color, var(--fs-store-primary)));
    padding-top: 0.15rem;
  }

  .bac-tip__text {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.55;
    color: var(--text-color, #000000);
    font-weight: 600;
  }

  .bac-timing {
    display: flex;
    gap: 0.55rem;
    align-items: flex-start;
    margin-top: 0.75rem;
    padding: 0.65rem 0.8rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, transparent);
    text-align: start;
  }

  .bac-timing__label {
    font-weight: 800;
    font-size: 0.82rem;
    color: var(--accent-color, var(--fs-store-primary));
    white-space: nowrap;
  }

  .bac-timing__text {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.6;
    color: var(--text-color, #000000);
  }

  .bac-notice {
    margin-top: 1.25rem;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
    line-height: 1.6;
  }

  @media (max-width: 639px) {
    .bac-tip,
    .bac-timing {
      flex-direction: column;
      gap: 0.3rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bac-chip {
      transition: none !important;
    }
  }
`, LEVELS = ["compatible", "caution", "avoid"];
function normalizeLevel(value) {
  const raw = getRadioValue(value, "compatible").toLowerCase();
  return LEVELS.includes(raw) ? raw : "compatible";
}
__name(normalizeLevel, "normalizeLevel");
function parseActives(raw) {
  return normalizeCollection(raw).map((row, i) => {
    const name = localizedString(row.name);
    return {
      id: String(row.id ?? row.active_id ?? "").trim() || `active-${i + 1}`,
      name,
      color: String(row.color ?? "").trim(),
      desc: localizedString(row.desc)
    };
  }).filter((a) => a.name);
}
__name(parseActives, "parseActives");
function parseRules(raw) {
  return normalizeCollection(raw).map((row) => ({
    a: String(row.a ?? "").trim(),
    b: String(row.b ?? "").trim(),
    level: normalizeLevel(row.level),
    note: localizedString(row.note),
    timing: localizedString(row.timing)
  })).filter((r) => r.a && r.b);
}
__name(parseRules, "parseRules");
function findVerdict(rules, a, b) {
  return !a || !b ? null : rules.find(
    (r) => r.a === a && r.b === b || r.a === b && r.b === a
  ) ?? null;
}
__name(findVerdict, "findVerdict");
const TIPS = {
  compatible: {
    ar: "يمكنك دمجهما في روتين واحد — راقبي بشرتك عند أول استخدام.",
    en: "You can use both in one routine — watch your skin on first use."
  },
  caution: {
    ar: "جرّبي على منطقة صغيرة أولًا، أو استخدميهما في أوقات مختلفة.",
    en: "Patch-test first, or use them at different times of day."
  },
  avoid: {
    ar: "لا تدمجيهما في نفس الروتين — اختاري واحدًا في كل مرة.",
    en: "Do not combine in the same routine — pick one at a time."
  }
};
function resolveVerdict(rules, aId, bId, defaultNote) {
  if (aId && bId && aId === bId)
    return {
      level: "same",
      note: t(
        "اخترتِ المكوّن نفسه مرتين. اختاري مكوّنًا مختلفًا لفحص التوافق بينهما.",
        "You picked the same ingredient twice. Choose a different one to check compatibility."
      ),
      tip: t("اختاري مكوّنًا ثانيًا مختلفًا عن الأول.", "Pick a second ingredient different from the first."),
      timing: "",
      hasRule: !1
    };
  const rule = findVerdict(rules, aId, bId);
  if (rule) {
    const tip = TIPS[rule.level];
    return {
      level: rule.level,
      note: rule.note || defaultNote,
      tip: t(tip.ar, tip.en),
      timing: rule.timing,
      hasRule: !0
    };
  }
  return {
    level: "unknown",
    note: defaultNote || t(
      "لا توجد قاعدة محددة لهذا الزوج — راجعي تعليمات المنتج أو استشيري مختصًا.",
      "No specific rule for this pair — check product labels or consult a professional."
    ),
    tip: t(
      "ابدئي باستخدام واحد فقط، ثم أضيفي الثاني تدريجيًا إذا لم تظهر تهيُّج.",
      "Start with one active, then add the second gradually if no irritation appears."
    ),
    timing: "",
    hasRule: !1
  };
}
__name(resolveVerdict, "resolveVerdict");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const VERDICT_COLORS = {
  compatible: "#2f7d5b",
  caution: "#b8791f",
  avoid: "#b23a4a",
  unknown: "#6b7280",
  same: "#8f7a86"
}, VERDICT_ICONS = {
  compatible: "✓",
  caution: "!",
  avoid: "✕",
  unknown: "?",
  same: "↔"
}, _BeautyActivesCompatibility = class _BeautyActivesCompatibility extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.selectedA = "", this.selectedB = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && (this.selectedA = "", this.selectedB = "");
  }
  get actives() {
    var _a;
    return parseActives((_a = this.config) == null ? void 0 : _a.bac_actives);
  }
  get rules() {
    var _a;
    return parseRules((_a = this.config) == null ? void 0 : _a.bac_rules);
  }
  resolvePick(actives, current, fallbackIndex) {
    var _a, _b;
    return current && actives.some((a) => a.id === current) ? current : ((_a = actives[fallbackIndex]) == null ? void 0 : _a.id) ?? ((_b = actives[0]) == null ? void 0 : _b.id) ?? "";
  }
  renderChips(actives, selectedId, onPick, slotLabel) {
    return html`
      <div class="bac-slot">
        <p class="bac-slot__label">${slotLabel}</p>
        <div class="bac-chips" role="group" aria-label=${slotLabel}>
          ${actives.map((active) => {
      const selected = active.id === selectedId;
      return html`
              <button
                type="button"
                class=${classMap({ "bac-chip": !0, "is-selected": selected })}
                style=${styleMap(active.color ? { "--swatch": active.color } : {})}
                aria-pressed=${selected ? "true" : "false"}
                title=${active.desc || active.name}
                @click=${() => onPick(active.id)}
              >
                <span class="bac-chip__swatch" aria-hidden="true"></span>
                <span>${active.name}</span>
              </button>
            `;
    })}
        </div>
      </div>
    `;
  }
  renderResult(actives, aId, bId) {
    const c = this.config || {}, activeA = actives.find((a) => a.id === aId) ?? null, activeB = actives.find((a) => a.id === bId) ?? null, defaultNote = localizedString(c.bac_default_note) || t(
      "لا توجد قاعدة محددة لهذا الزوج في قاعدة البيانات.",
      "No specific rule for this pair in the database."
    ), labels = {
      compatible: localizedString(c.bac_label_compatible) || t("متوافقان", "Compatible"),
      caution: localizedString(c.bac_label_caution) || t("بحذر", "Use with caution"),
      avoid: localizedString(c.bac_label_avoid) || t("تجنّبي الدمج", "Avoid"),
      unknown: localizedString(c.bac_label_unknown) || t("لا قاعدة / غير معروف", "No rule / unknown"),
      same: t("نفس المكوّن", "Same ingredient")
    }, verdict = resolveVerdict(this.rules, aId, bId, defaultNote), { level, note, tip, timing } = verdict, color = VERDICT_COLORS[level], resultTitle = localizedString(c.bac_result_title);
    return html`
      <div
        class=${classMap({ "bac-verdict": !0, [`bac-verdict--${level}`]: !0 })}
        role="region"
        aria-live="polite"
        aria-label=${labels[level]}
        style=${styleMap({ "--verdict-color": color })}
      >
        ${resultTitle ? html`<h3 class="bac-verdict__title">${resultTitle}</h3>` : nothing}
        <div class="bac-verdict__hero">
          <span class="bac-verdict__icon" aria-hidden="true">${VERDICT_ICONS[level]}</span>
          <span class="bac-verdict__badge">${labels[level]}</span>
        </div>

        ${activeA && activeB ? html`<div class="bac-pair" aria-label=${t("المكوّنان المختاران", "Selected pair")}>
              <span class="bac-pair__pill">
                <span
                  class="bac-pair__dot"
                  style=${styleMap(activeA.color ? { background: activeA.color } : {})}
                  aria-hidden="true"
                ></span>
                <span>${activeA.name}</span>
              </span>
              <span class="bac-pair__vs" aria-hidden="true">+</span>
              <span class="bac-pair__pill">
                <span
                  class="bac-pair__dot"
                  style=${styleMap(activeB.color ? { background: activeB.color } : {})}
                  aria-hidden="true"
                ></span>
                <span>${activeB.name}</span>
              </span>
            </div>` : nothing}

        <p class="bac-verdict__note">${note}</p>

        ${tip ? html`<div class="bac-tip">
              <span class="bac-tip__label">${t("نصيحة", "Tip")}</span>
              <p class="bac-tip__text">${tip}</p>
            </div>` : nothing}

        ${timing ? html`<div class="bac-timing">
              <span class="bac-timing__label">${t("التوقيت", "Timing")}</span>
              <p class="bac-timing__text">${timing}</p>
            </div>` : nothing}
        ${renderCommerceCtaButton(c, "bac_")}
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bac_"), animate = theme.animate && !prefersReducedMotion(), actives = this.actives, title = localizedString(c.bac_title), desc = localizedString(c.bac_desc), showNotice = isTruthy(c.bac_show_notice, !0), notice = localizedString(c.bac_notice) || t(
      "هذه المعلومات توعوية عامة ولا تُغني عن استشارة مختص العناية بالبشرة.",
      "This information is general and educational and does not replace advice from a skincare professional."
    );
    if (actives.length < 2)
      return html`
        <section
          class=${classMap({ "fs-section": !0, "fs-animate": animate })}
          style=${styleMap(themeStyleMap(theme))}
          aria-label=${title || t("مدقّق توافق المكونات الفعّالة", "Actives compatibility checker")}
        >
          <div class="fs-container">
            <div class="fs-empty" role="status">
              ${t("أضيفي مكوّنين على الأقل من إعدادات العنصر.", "Add at least two ingredients in the element settings.")}
            </div>
          </div>
        </section>
      `;
    const aId = this.resolvePick(actives, this.selectedA, 0), bId = this.resolvePick(actives, this.selectedB, 1), pickALabel = localizedString(c.bac_pick_a_label) || t("المكوّن الأول", "First active"), pickBLabel = localizedString(c.bac_pick_b_label) || t("المكوّن الثاني", "Second active");
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("مدقّق توافق المكونات الفعّالة", "Actives compatibility checker")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          ${this.renderResult(actives, aId, bId)}

          <div class="bac-picker" aria-label=${t("اختيار المكوّنين", "Pick ingredients")}>
            ${this.renderChips(actives, aId, (id) => this.selectedA = id, pickALabel)}
            <div class="bac-divider" aria-hidden="true">
              <span class="bac-divider__line"></span>
              <span class="bac-divider__icon">↕</span>
              <span class="bac-divider__line"></span>
            </div>
            ${this.renderChips(actives, bId, (id) => this.selectedB = id, pickBLabel)}
          </div>

          ${showNotice ? html`<p class="bac-notice">${notice}</p>` : nothing}
        </div>
      </section>
    `;
  }
};
__name(_BeautyActivesCompatibility, "BeautyActivesCompatibility"), _BeautyActivesCompatibility.styles = [sharedSectionCss, componentStyles];
let BeautyActivesCompatibility = _BeautyActivesCompatibility;
__decorateClass([
  property({ type: Object })
], BeautyActivesCompatibility.prototype, "config");
__decorateClass([
  state()
], BeautyActivesCompatibility.prototype, "selectedA");
__decorateClass([
  state()
], BeautyActivesCompatibility.prototype, "selectedB");
typeof BeautyActivesCompatibility < "u" && BeautyActivesCompatibility.registerSallaComponent("salla-beauty-actives-compatibility");
export {
  BeautyActivesCompatibility as default
};
