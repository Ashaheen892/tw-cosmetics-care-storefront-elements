var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { g as getRadioValue, n as normalizeCollection, l as localizedString, t, s as sharedSectionCss, r as readSectionTheme, p as prefersReducedMotion, a as themeStyleMap, i as isTruthy } from "./sharedStyles-CPLtr3dp.js";
const componentStyles = css`
  .bwp-toolbar {
    display: flex;
    justify-content: center;
    margin-bottom: 1.25rem;
  }

  .bwp-toggle {
    display: inline-flex;
    gap: 0.25rem;
    padding: 0.28rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 40%, var(--card-bg, #fff));
    border: 1px solid var(--border-color, #e5e7eb);
    flex-wrap: wrap;
    justify-content: center;
  }

  .bwp-toggle__btn {
    min-height: 40px;
    padding: 0.45rem 1rem;
    border: none;
    border-radius: 999px;
    background: transparent;
    color: var(--muted-color, #666666);
    font: inherit;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .bwp-toggle__btn:hover {
    color: var(--text-color, #000000);
  }

  .bwp-toggle__btn[aria-pressed='true'] {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    box-shadow: 0 4px 12px rgba(43, 33, 28, 0.18);
  }

  .bwp-grid-scroll {
    overflow: visible;
    border-radius: calc(var(--section-radius, 20px) * 0.85);
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, var(--section-bg, transparent)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 3%, var(--card-bg, #fff))
    );
    border: 1px solid var(--border-color, #e5e7eb);
    padding: 0.75rem;
  }

  .bwp-grid {
    display: grid;
    gap: 0.65rem;
  }

  /* Mobile / tablet: readable vertical day cards */
  .bwp-grid {
    grid-template-columns: 1fr;
  }

  .bwp-grid--am .bwp-day__head,
  .bwp-grid--pm .bwp-day__head {
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, var(--card-bg, #fff)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff))
    );
  }

  .bwp-day {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 20px) * 0.65);
    background: var(--card-bg, #fff);
    overflow: hidden;
    box-shadow: 0 4px 14px rgba(43, 33, 28, 0.06);
    min-height: 0;
  }

  .bwp-day.is-empty {
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 18%, var(--card-bg, #fff));
  }

  .bwp-day__head {
    padding: 0.75rem 0.9rem;
    text-align: start;
    font-size: 0.95rem;
    font-weight: 800;
    color: var(--text-color, #000000);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, var(--card-bg, #fff));
    border-bottom: 1px solid var(--border-color, #e5e7eb);
    letter-spacing: 0.01em;
  }

  .bwp-day__body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.8rem 0.85rem 0.9rem;
    flex: 1 1 auto;
  }

  .bwp-slots {
    display: grid;
    gap: 0.75rem;
  }

  @media (min-width: 480px) {
    .bwp-slots--split {
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }
  }

  .bwp-slot {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    min-width: 0;
  }

  .bwp-slot__label {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.8rem;
    font-weight: 800;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .bwp-slot__label::before {
    content: '';
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.7;
  }

  .bwp-chips {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .bwp-chip {
    display: flex;
    align-items: flex-start;
    gap: 0.45rem;
    padding: 0.55rem 0.65rem;
    border-radius: 0.7rem;
    background: color-mix(in srgb, var(--chip-color, var(--accent-color, var(--fs-store-primary))) 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--chip-color, var(--accent-color, var(--fs-store-primary))) 28%, transparent);
    font-size: 0.9rem;
    line-height: 1.45;
    color: var(--text-color, #000000);
  }

  .bwp-chip__dot {
    flex: 0 0 auto;
    width: 0.75rem;
    height: 0.75rem;
    margin-top: 0.28rem;
    border-radius: 50%;
    background: var(--chip-color, var(--accent-color, var(--fs-store-primary)));
  }

  .bwp-chip__icon {
    flex: 0 0 auto;
    margin-top: 0.1rem;
    font-size: 1rem;
    line-height: 1;
  }

  .bwp-chip__name {
    min-width: 0;
    flex: 1 1 auto;
    font-weight: 700;
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
    word-break: break-word;
  }

  .bwp-slot--empty,
  .bwp-day__empty {
    display: grid;
    place-items: center;
    flex: 1;
    min-height: 3rem;
    font-size: 0.9rem;
    font-weight: 700;
    font-style: italic;
    color: color-mix(in srgb, var(--muted-color, #8f7a86) 75%, var(--accent-color, var(--fs-store-primary)));
    opacity: 0.9;
    padding: 0.65rem 0.4rem;
    text-align: center;
  }

  .bwp-day.is-empty .bwp-day__empty {
    background: radial-gradient(
      circle at 50% 40%,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, transparent),
      transparent 70%
    );
  }

  /* Legend */
  .bwp-legend {
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.65rem;
  }

  .bwp-legend__item {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 0.7rem 0.8rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 20px) * 0.55);
    background: var(--card-bg, #fff);
  }

  .bwp-legend__swatch {
    flex: 0 0 auto;
    width: 1.1rem;
    height: 1.1rem;
    margin-top: 0.15rem;
    border-radius: 50%;
    background: var(--chip-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--chip-color, var(--accent-color, var(--fs-store-primary))) 22%, transparent);
  }

  .bwp-legend__text {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
    flex: 1 1 auto;
  }

  .bwp-legend__name {
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--text-color, #000000);
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    flex-wrap: wrap;
    line-height: 1.4;
  }

  .bwp-legend__freq {
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
    line-height: 1.5;
    white-space: normal;
  }

  .bwp-legend__slot {
    margin-inline-start: auto;
    flex: 0 0 auto;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    padding: 0.2rem 0.55rem;
    border-radius: 999px;
    white-space: nowrap;
  }

  .bwp-notice {
    margin-top: 1.35rem;
    text-align: center;
    font-size: 0.84rem;
    color: var(--muted-color, #666666);
    line-height: 1.65;
  }

  /* Desktop: classic 7-day week table */
  @media (min-width: 960px) {
    .bwp-grid-scroll {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-x: contain;
      scrollbar-width: thin;
    }

    .bwp-grid {
      grid-template-columns: repeat(7, minmax(0, 1fr));
      gap: 0.55rem;
      min-width: 0;
    }

    .bwp-day {
      min-height: 8rem;
    }

    .bwp-day__head {
      text-align: center;
      font-size: 0.84rem;
      padding: 0.6rem 0.4rem;
    }

    .bwp-day__body {
      padding: 0.55rem 0.45rem 0.65rem;
      gap: 0.5rem;
    }

    .bwp-slots--split {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .bwp-slot__label {
      font-size: 0.72rem;
    }

    .bwp-chip {
      font-size: 0.8rem;
      padding: 0.4rem 0.5rem;
      align-items: center;
    }

    .bwp-chip__dot {
      margin-top: 0;
    }

    .bwp-chip__name {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .bwp-legend {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bwp-toggle__btn {
      transition: none !important;
    }
  }
`, FREQUENCIES = ["daily", "x3", "x2", "x1", "alternate"], SLOTS = ["am", "pm", "both"], START_DAYS = ["sat", "sun", "mon"], VIEWS = ["week", "am", "pm"], CANONICAL_WEEK = [
  { ar: "السبت", en: "Saturday" },
  { ar: "الأحد", en: "Sunday" },
  { ar: "الإثنين", en: "Monday" },
  { ar: "الثلاثاء", en: "Tuesday" },
  { ar: "الأربعاء", en: "Wednesday" },
  { ar: "الخميس", en: "Thursday" },
  { ar: "الجمعة", en: "Friday" }
], START_OFFSET = { sat: 0, sun: 1, mon: 2 };
function resolveStartDay(config) {
  const value = getRadioValue(config.bwp_start_day, "sat");
  return START_DAYS.includes(value) ? value : "sat";
}
__name(resolveStartDay, "resolveStartDay");
function resolveView(config) {
  const value = getRadioValue(config.bwp_view_default, "week");
  return VIEWS.includes(value) ? value : "week";
}
__name(resolveView, "resolveView");
function resolveFrequency(raw) {
  const value = getRadioValue(raw, "daily");
  return FREQUENCIES.includes(value) ? value : "daily";
}
__name(resolveFrequency, "resolveFrequency");
function resolveSlot(raw) {
  const value = getRadioValue(raw, "both");
  return SLOTS.includes(value) ? value : "both";
}
__name(resolveSlot, "resolveSlot");
function parseSteps(raw) {
  return normalizeCollection(raw).map((s, i) => {
    const name = localizedString(s.name);
    return {
      id: String(s.id ?? s.step_id ?? "").trim() || `step-${i + 1}`,
      name,
      color: String(s.color ?? "").trim(),
      icon: String(s.icon ?? "").trim(),
      slot: resolveSlot(s.slot),
      frequency: resolveFrequency(s.frequency),
      note: localizedString(s.note)
    };
  }).filter((s) => !!s.name);
}
__name(parseSteps, "parseSteps");
function frequencyDays(freq) {
  switch (freq) {
    case "daily":
      return [0, 1, 2, 3, 4, 5, 6];
    case "x3":
      return [0, 2, 4];
    case "x2":
      return [1, 4];
    case "x1":
      return [1];
    case "alternate":
      return [0, 2, 4, 6];
    default:
      return [0, 1, 2, 3, 4, 5, 6];
  }
}
__name(frequencyDays, "frequencyDays");
function weekdayNames(startDay) {
  const offset = START_OFFSET[startDay] ?? 0;
  return Array.from({ length: 7 }, (_, i) => {
    const day = CANONICAL_WEEK[(offset + i) % 7];
    return t(day.ar, day.en);
  });
}
__name(weekdayNames, "weekdayNames");
function emptyDayLabel() {
  return t("راحة", "Rest");
}
__name(emptyDayLabel, "emptyDayLabel");
function frequencyLabel(freq) {
  switch (freq) {
    case "daily":
      return t("يوميًا", "Daily");
    case "x3":
      return t("3 مرات أسبوعيًا", "3× per week");
    case "x2":
      return t("مرتين أسبوعيًا", "2× per week");
    case "x1":
      return t("مرة أسبوعيًا", "Once a week");
    case "alternate":
      return t("يوم بعد يوم", "Every other day");
    default:
      return t("يوميًا", "Daily");
  }
}
__name(frequencyLabel, "frequencyLabel");
function buildSchedule(steps, _startDay, view) {
  const schedule = Array.from({ length: 7 }, () => ({
    am: [],
    pm: []
  }));
  for (const step of steps) {
    const inAm = step.slot === "am" || step.slot === "both", inPm = step.slot === "pm" || step.slot === "both";
    for (const day of frequencyDays(step.frequency))
      day < 0 || day > 6 || (inAm && view !== "pm" && schedule[day].am.push(step), inPm && view !== "am" && schedule[day].pm.push(step));
  }
  return schedule;
}
__name(buildSchedule, "buildSchedule");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _BeautyWeeklyPlanner = class _BeautyWeeklyPlanner extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.view = "week", this.viewSynced = !1, this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    var _a;
    if (!changed.has("config")) return;
    const nextDefault = getRadioValue((_a = this.config) == null ? void 0 : _a.bwp_view_default, "week"), prev = changed.get("config"), prevDefault = prev ? getRadioValue(prev.bwp_view_default, "week") : void 0;
    (!this.viewSynced || prevDefault !== nextDefault) && (this.view = resolveView(this.config || {}), this.viewSynced = !0);
  }
  get steps() {
    var _a;
    return parseSteps((_a = this.config) == null ? void 0 : _a.bwp_steps);
  }
  setView(view) {
    this.view = view;
  }
  renderChip(step) {
    const isSicon = step.icon.startsWith("sicon-");
    return html`
      <span
        class="bwp-chip"
        style=${styleMap(step.color ? { "--chip-color": step.color } : {})}
      >
        <span class="bwp-chip__dot"></span>
        ${step.icon ? html`<span class="bwp-chip__icon ${isSicon ? step.icon : ""}">${isSicon ? "" : step.icon}</span>` : nothing}
        <span class="bwp-chip__name" title=${step.name}>${step.name}</span>
      </span>
    `;
  }
  renderSlot(label, steps) {
    return html`
      <div class="bwp-slot">
        <span class="bwp-slot__label">${label}</span>
        ${steps.length ? html`<div class="bwp-chips">${steps.map((s) => this.renderChip(s))}</div>` : html`<span class="bwp-slot--empty">${t("لا خطوات", "No steps")}</span>`}
      </div>
    `;
  }
  renderToggle() {
    const options = [
      { id: "week", label: t("الأسبوع الكامل", "Full week") },
      { id: "am", label: t("صباحًا", "Morning") },
      { id: "pm", label: t("مساءً", "Evening") }
    ];
    return html`
      <div class="bwp-toolbar">
        <div class="bwp-toggle" role="group" aria-label=${t("طريقة العرض", "View mode")}>
          ${options.map(
      (opt) => html`
              <button
                type="button"
                class="bwp-toggle__btn"
                aria-pressed=${this.view === opt.id ? "true" : "false"}
                @click=${() => this.setView(opt.id)}
              >
                ${opt.label}
              </button>
            `
    )}
        </div>
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "bwp_"), animate = theme.animate && !prefersReducedMotion(), steps = this.steps, title = localizedString(c.bwp_title), desc = localizedString(c.bwp_desc);
    if (!steps.length)
      return html`
        <section
          class=${classMap({ "fs-section": !0, "fs-animate": animate })}
          style=${styleMap(themeStyleMap(theme))}
          aria-label=${title || t("مخطط الروتين الأسبوعي", "Weekly routine planner")}
        >
          <div class="fs-container">
            ${title || desc ? html`<div class="fs-header">
                  ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                  ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
                </div>` : nothing}
            <div class="fs-empty" role="status">
              ${t("أضيفي خطوات الروتين من إعدادات العنصر.", "Add routine steps in the element settings.")}
            </div>
          </div>
        </section>
      `;
    const startDay = resolveStartDay(c), days = weekdayNames(startDay), schedule = buildSchedule(steps, startDay, this.view), showToggle = isTruthy(c.bwp_show_view_toggle, !0), showLegend = isTruthy(c.bwp_show_legend, !0), showNotice = isTruthy(c.bwp_show_notice, !0), notice = localizedString(c.bwp_notice) || t(
      "خطة إرشادية؛ عدّليها حسب توصية أخصائي بشرتك.",
      "A guiding plan; adjust it to your skincare specialist’s advice."
    ), amLabel = t("صباحًا", "Morning"), pmLabel = t("مساءً", "Evening"), bothLabel = t("صباحًا ومساءً", "Morning & evening");
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("مخطط الروتين الأسبوعي", "Weekly routine planner")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          ${showToggle ? this.renderToggle() : nothing}

          <div class="bwp-grid-scroll">
            <div class=${classMap({ "bwp-grid": !0, [`bwp-grid--${this.view}`]: !0 })} role="list">
              ${days.map((dayName, i) => {
      const cell = schedule[i], hasContent = cell.am.length > 0 || cell.pm.length > 0;
      return html`
                  <div class=${classMap({ "bwp-day": !0, "is-empty": !hasContent })} role="listitem">
                    <div class="bwp-day__head">${dayName}</div>
                    <div class="bwp-day__body">
                      ${hasContent ? this.view === "week" ? html`<div class="bwp-slots bwp-slots--split">
                              ${this.renderSlot(amLabel, cell.am)}
                              ${this.renderSlot(pmLabel, cell.pm)}
                            </div>` : html`<div class="bwp-chips">
                              ${[...cell.am, ...cell.pm].map((s) => this.renderChip(s))}
                            </div>` : html`<span class="bwp-day__empty">${emptyDayLabel()}</span>`}
                    </div>
                  </div>
                `;
    })}
            </div>
          </div>

          ${showLegend ? html`<div class="bwp-legend">
                ${steps.map((step) => {
      const isSicon = step.icon.startsWith("sicon-"), slotText = step.slot === "am" ? amLabel : step.slot === "pm" ? pmLabel : bothLabel;
      return html`
                    <div
                      class="bwp-legend__item"
                      style=${styleMap(step.color ? { "--chip-color": step.color } : {})}
                    >
                      <span class="bwp-legend__swatch"></span>
                      <span class="bwp-legend__text">
                        <span class="bwp-legend__name">
                          ${step.icon ? html`<span class="${isSicon ? step.icon : ""}">${isSicon ? "" : step.icon}</span>` : nothing}
                          ${step.name}
                        </span>
                        <span class="bwp-legend__freq">
                          ${frequencyLabel(step.frequency)}${step.note ? html` · ${step.note}` : nothing}
                        </span>
                      </span>
                      <span class="bwp-legend__slot">${slotText}</span>
                    </div>
                  `;
    })}
              </div>` : nothing}

          ${showNotice ? html`<p class="bwp-notice">${notice}</p>` : nothing}
        </div>
      </section>
    `;
  }
};
__name(_BeautyWeeklyPlanner, "BeautyWeeklyPlanner"), _BeautyWeeklyPlanner.styles = [sharedSectionCss, componentStyles];
let BeautyWeeklyPlanner = _BeautyWeeklyPlanner;
__decorateClass([
  property({ type: Object })
], BeautyWeeklyPlanner.prototype, "config");
__decorateClass([
  state()
], BeautyWeeklyPlanner.prototype, "view");
typeof BeautyWeeklyPlanner < "u" && BeautyWeeklyPlanner.registerSallaComponent("salla-beauty-weekly-planner");
export {
  BeautyWeeklyPlanner as default
};
