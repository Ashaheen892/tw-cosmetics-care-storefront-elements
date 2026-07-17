import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  getUnitValue,
  isTruthy,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { getPageLocale, localizedString } from '../../utils/localizedString.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import {
  parseRoutines,
  periodLabel,
  resolveDirection,
  resolveMode,
  resolveShape,
  shuffleOrder,
  sortedByCorrect,
} from './utils.js';
import type { LayerStep, Routine } from './types.js';

export default class BeautyRoutineLayeringBoard extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private routineId = '';
  @state() private expandedId = '';
  @state() private order: string[] = [];
  @state() private orderKey = '';
  @state() private checked = false;
  @state() private revealed = false;
  @state() private draggingId = '';
  @state() private announce = '';

  private boundLangHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.routineId = '';
      this.resetQuiz();
    }
  }

  private get routines(): Routine[] {
    return parseRoutines(this.config?.brl_routines);
  }

  private currentRoutine(routines: Routine[]): Routine | null {
    if (!routines.length) return null;
    const preset = String(this.config?.brl_default_routine ?? '').trim();
    return (
      routines.find((r) => r.id === this.routineId) ||
      routines.find((r) => r.id === preset) ||
      routines[0]
    );
  }

  private resetQuiz(): void {
    this.checked = false;
    this.revealed = false;
    this.expandedId = '';
    this.orderKey = '';
    this.order = [];
  }

  private ensureOrder(routine: Routine): string[] {
    if (this.orderKey !== routine.id || this.order.length !== routine.steps.length) {
      this.order = shuffleOrder(routine.steps);
      this.orderKey = routine.id;
      this.checked = false;
      this.revealed = false;
    }
    return this.order;
  }

  private selectRoutine(id: string): void {
    if (id === this.routineId) return;
    this.routineId = id;
    this.resetQuiz();
  }

  private toggleExpand(id: string): void {
    this.expandedId = this.expandedId === id ? '' : id;
  }

  // —— quiz reordering ——
  private moveStep(index: number, dir: number): void {
    const target = index + dir;
    if (target < 0 || target >= this.order.length) return;
    const next = [...this.order];
    [next[index], next[target]] = [next[target], next[index]];
    this.order = next;
    this.checked = false;
    this.announceOrder();
  }

  private moveIdTo(id: string, targetIndex: number): void {
    const from = this.order.indexOf(id);
    if (from < 0 || from === targetIndex) return;
    const next = [...this.order];
    next.splice(from, 1);
    next.splice(targetIndex, 0, id);
    this.order = next;
  }

  private onPointerDown(e: PointerEvent, id: string): void {
    if (this.revealed) return;
    this.draggingId = id;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  }

  private onPointerMove(e: PointerEvent): void {
    if (!this.draggingId) return;
    const el = this.shadowRoot?.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
    const row = el?.closest('[data-step]') as HTMLElement | null;
    const overId = row?.getAttribute('data-step');
    if (!overId || overId === this.draggingId) return;
    this.moveIdTo(this.draggingId, this.order.indexOf(overId));
  }

  private onPointerUp(): void {
    if (!this.draggingId) return;
    this.draggingId = '';
    this.checked = false;
    this.announceOrder();
  }

  private announceOrder(): void {
    this.announce = t('تم تحديث ترتيب الخطوات.', 'Step order updated.');
  }

  private verify(routine: Routine): void {
    this.checked = true;
    const correct = sortedByCorrect(routine.steps).map((s) => s.id);
    const score = this.order.filter((id, i) => id === correct[i]).length;
    this.announce =
      score === routine.steps.length
        ? t('ترتيب صحيح تمامًا.', 'Perfect order.')
        : t(`${score} من ${routine.steps.length} في مكانها الصحيح.`, `${score} of ${routine.steps.length} in the correct place.`);
  }

  private showAnswer(routine: Routine): void {
    this.order = sortedByCorrect(routine.steps).map((s) => s.id);
    this.checked = true;
    this.revealed = true;
  }

  private retry(routine: Routine): void {
    this.order = shuffleOrder(routine.steps);
    this.checked = false;
    this.revealed = false;
    this.announceOrder();
  }

  private renderMeta(step: LayerStep) {
    const bits = [
      step.timing ? html`<span>${t('التوقيت', 'When')}: <b>${step.timing}</b></span>` : nothing,
      step.wait ? html`<span>${t('الانتظار', 'Wait')}: <b>${step.wait}</b></span>` : nothing,
      step.amount ? html`<span>${t('الكمية', 'Amount')}: <b>${step.amount}</b></span>` : nothing,
    ].filter((x) => x !== nothing);
    return bits.length ? html`<div class="brl-meta">${bits}</div>` : nothing;
  }

  private renderMarker(step: LayerStep, display: number) {
    return html`<span
      class="brl-step__marker"
      style=${styleMap(step.color ? { '--step-color': step.color } : {})}
    >
      ${step.icon
        ? step.icon.startsWith('sicon-')
          ? html`<span class="brl-icon ${step.icon}"></span>`
          : html`<span class="brl-icon">${step.icon}</span>`
        : display}
    </span>`;
  }

  private renderGuide(routine: Routine, locale: 'ar' | 'en') {
    const steps = sortedByCorrect(routine.steps);
    return html`<div
      class=${classMap({ 'brl-board': true, [`brl-board--${resolveShape(this.config)}`]: true, 'brl-board--horizontal': resolveDirection(this.config) === 'horizontal' })}
    >
      ${steps.map((step, i) => {
        const expanded = this.expandedId === step.id;
        return html`<div class="brl-step" style=${styleMap(step.color ? { '--step-color': step.color } : {})}>
          ${this.renderMarker(step, i + 1)}
          <div class="brl-step__body">
            <h3 class="brl-step__title">
              ${step.title}
              ${step.optional ? html`<span class="brl-badge">${t('اختيارية', 'Optional')}</span>` : nothing}
              ${step.period !== 'both' ? html`<span class="brl-badge">${periodLabel(step.period, locale)}</span>` : nothing}
            </h3>
            ${step.descShort ? html`<p class="brl-step__short">${step.descShort}</p>` : nothing}
            ${this.renderMeta(step)}
            ${expanded
              ? html`
                  ${step.descLong ? html`<p class="brl-step__long">${step.descLong}</p>` : nothing}
                  ${step.note ? html`<p class="brl-step__note">★ ${step.note}</p>` : nothing}
                `
              : nothing}
          </div>
          ${step.descLong || step.note
            ? html`<button
                type="button"
                class="brl-step__toggle"
                aria-expanded=${expanded ? 'true' : 'false'}
                aria-label=${expanded ? t('إخفاء التفاصيل', 'Hide details') : t('عرض التفاصيل', 'Show details')}
                @click=${() => this.toggleExpand(step.id)}
              >${expanded ? '−' : '+'}</button>`
            : nothing}
        </div>`;
      })}
    </div>`;
  }

  private renderQuiz(routine: Routine, locale: 'ar' | 'en') {
    const order = this.ensureOrder(routine);
    const byId = new Map(routine.steps.map((s) => [s.id, s]));
    const correct = sortedByCorrect(routine.steps).map((s) => s.id);
    const enableDrag = isTruthy(this.config?.brl_enable_drag, true) && !this.revealed;

    return html`<div
      class=${classMap({ 'brl-board': true, [`brl-board--${resolveShape(this.config)}`]: true, 'brl-board--horizontal': resolveDirection(this.config) === 'horizontal' })}
      @pointermove=${this.onPointerMove}
      @pointerup=${this.onPointerUp}
      @pointercancel=${this.onPointerUp}
    >
      ${order.map((id, i) => {
        const step = byId.get(id);
        if (!step) return nothing;
        const ok = this.checked ? id === correct[i] : null;
        return html`<div
          class=${classMap({
            'brl-step': true,
            'is-dragging': this.draggingId === id,
            'is-ok': ok === true,
            'is-bad': ok === false,
          })}
          data-step=${id}
          style=${styleMap(step.color ? { '--step-color': step.color } : {})}
        >
          ${enableDrag
            ? html`<div class="brl-handles">
                <button
                  type="button"
                  class="brl-handle brl-handle--drag"
                  aria-label=${t('اسحبي لإعادة الترتيب', 'Drag to reorder')}
                  @pointerdown=${(e: PointerEvent) => this.onPointerDown(e, id)}
                >⠿</button>
                <button type="button" class="brl-handle" ?disabled=${i === 0} aria-label=${t('نقل لأعلى', 'Move up')} @click=${() => this.moveStep(i, -1)}>▲</button>
                <button type="button" class="brl-handle" ?disabled=${i === order.length - 1} aria-label=${t('نقل لأسفل', 'Move down')} @click=${() => this.moveStep(i, 1)}>▼</button>
              </div>`
            : nothing}
          ${this.renderMarker(step, i + 1)}
          <div class="brl-step__body">
            <h3 class="brl-step__title">
              ${step.title}
              ${step.optional ? html`<span class="brl-badge">${t('اختيارية', 'Optional')}</span>` : nothing}
              ${step.period !== 'both' ? html`<span class="brl-badge">${periodLabel(step.period, locale)}</span>` : nothing}
            </h3>
            ${this.checked && step.descShort ? html`<p class="brl-step__short">${step.descShort}</p>` : nothing}
          </div>
          ${ok === null
            ? nothing
            : html`<span class="brl-step__result ${ok ? 'brl-step__result--ok' : 'brl-step__result--bad'}" aria-hidden="true">${ok ? '✓' : '✗'}</span>`}
        </div>`;
      })}
    </div>`;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'brl_');
    const animate = theme.animate && !prefersReducedMotion();
    const routines = this.routines;
    const title = localizedString(c.brl_title as string);
    const desc = localizedString(c.brl_desc as string);
    const mode = resolveMode(c);
    const locale = getPageLocale() === 'en' ? 'en' : 'ar';
    const cardRadius = `${getUnitValue(c.brl_card_radius, 14)}px`;

    if (!routines.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي روتينًا واحدًا على الأقل مع خطواته من إعدادات العنصر.', 'Add at least one routine with its steps in the element settings.')}
      </div>`;
    }

    const routine = this.currentRoutine(routines);
    if (!routine) return nothing;

    const win = mode === 'quiz' && this.checked && this.order.every((id, i) => id === sortedByCorrect(routine.steps).map((s) => s.id)[i]);
    const successMsg = localizedString(c.brl_success_msg as string) || t('أحسنتِ! هذا هو الترتيب الصحيح.', 'Well done! This is the correct order.');
    const retryMsg = localizedString(c.brl_retry_msg as string) || t('قريب! عدّلي الترتيب وحاولي مجددًا.', 'Close! Adjust the order and try again.');

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap({
          ...themeStyleMap(theme),
          '--brl-card-radius': cardRadius,
          '--step-color': String(c.brl_step_color ?? theme.accent),
          '--success-color': String(c.brl_success_color ?? '#2f9e63'),
          '--error-color': String(c.brl_error_color ?? '#cf4b4b'),
        })}
        aria-label=${title || t('ترتيب طبقات روتين العناية', 'Routine layering board')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          ${routines.length > 1
            ? html`
                <div class="brl-tabs" role="tablist">
                  ${routines.map(
                    (r) => html`<button
                      type="button"
                      role="tab"
                      class=${classMap({ 'brl-tab': true, 'is-active': r.id === routine.id })}
                      aria-selected=${r.id === routine.id ? 'true' : 'false'}
                      @click=${() => this.selectRoutine(r.id)}
                    >${r.name}</button>`
                  )}
                </div>
                <select
                  class="brl-select"
                  aria-label=${t('اختاري الروتين', 'Choose routine')}
                  @change=${(e: Event) => this.selectRoutine((e.target as HTMLSelectElement).value)}
                >
                  ${routines.map((r) => html`<option value=${r.id} ?selected=${r.id === routine.id}>${r.name}</option>`)}
                </select>
              `
            : nothing}

          ${mode === 'quiz'
            ? html`<div class="brl-toolbar">
                <p class="brl-hint">${t('رتّبي الخطوات بالسحب أو بالأسهم ثم تحققي.', 'Order the steps by dragging or with arrows, then check.')}</p>
              </div>`
            : nothing}

          ${mode === 'quiz' ? this.renderQuiz(routine, locale) : this.renderGuide(routine, locale)}

          ${mode === 'quiz' && this.checked
            ? html`<div class=${classMap({ 'brl-feedback': true, 'brl-feedback--win': win, 'brl-feedback--retry': !win })} role="status">
                ${win ? successMsg : retryMsg}
                <span class="brl-feedback__score">
                  ${(() => {
                    const correct = sortedByCorrect(routine.steps).map((s) => s.id);
                    const score = this.order.filter((id, i) => id === correct[i]).length;
                    return t(`${score} من ${routine.steps.length} صحيحة`, `${score} of ${routine.steps.length} correct`);
                  })()}
                </span>
              </div>`
            : nothing}

          ${mode === 'quiz'
            ? html`<div class="brl-actions">
                ${isTruthy(c.brl_enable_check, true) && !this.revealed
                  ? html`<button type="button" class="fs-btn" @click=${() => this.verify(routine)}>${t('تحقّقي من الترتيب', 'Check order')}</button>`
                  : nothing}
                ${isTruthy(c.brl_enable_retry, true)
                  ? html`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.retry(routine)}>${t('إعادة المحاولة', 'Try again')}</button>`
                  : nothing}
                ${isTruthy(c.brl_show_answer, true)
                  ? html`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.showAnswer(routine)}>${t('إظهار الترتيب الصحيح', 'Show correct order')}</button>`
                  : nothing}
              </div>`
            : nothing}

          <span class="brl-sr" role="status" aria-live="polite">${this.announce}</span>
        </div>
      </section>
    `;
  }
}
