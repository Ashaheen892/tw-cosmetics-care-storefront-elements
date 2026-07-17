import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  isTruthy,
  readSectionTheme,
  safeStorageGet,
  safeStorageSet,
  t,
  themeStyleMap,
  toNumber,
} from '../../utils/helpers.js';
import { getPageLocale, localizedString } from '../../utils/localizedString.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import {
  buildIcs,
  computeExpiry,
  formatDate,
  paoOptionLabel,
  parseCategories,
  parseDateInput,
  parsePaoOptions,
  resolveDateFormat,
  resolveInputMode,
  toInputValue,
} from './utils.js';
import type { ExpiryState, SavedRecord } from './types.js';

const STORAGE_KEY = 'tw-beauty-pao-records';

export default class BeautyPaoExpiryCalculator extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private catId = '';
  @state() private pao = 0;
  @state() private openDate = '';
  @state() private recName = '';
  @state() private note = '';
  @state() private records: SavedRecord[] = [];
  @state() private editingId = '';

  private boundLangHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
    this.records = safeStorageGet<SavedRecord[]>(STORAGE_KEY, []);
    this.openDate = toInputValue(new Date());
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config') && !this.pao) {
      this.pao = Math.max(0, toNumber(this.config?.bpa_default_pao, 0));
    }
  }

  private get locale(): 'ar' | 'en' {
    return getPageLocale() === 'en' ? 'en' : 'ar';
  }

  private persist(): void {
    safeStorageSet(STORAGE_KEY, this.records);
  }

  private onCategory(id: string, months: number): void {
    this.catId = id;
    if (months > 0) this.pao = months;
  }

  private saveRecord(): void {
    const open = parseDateInput(this.openDate);
    if (!open || this.pao <= 0) return;
    const max = Math.max(1, toNumber(this.config?.bpa_max_records, 12));
    if (this.records.length >= max) return;
    const record: SavedRecord = {
      id: `rec-${Date.now()}`,
      name: this.recName.trim() || (this.locale === 'en' ? 'Product' : 'منتج'),
      category: this.catId,
      open: this.openDate,
      pao: this.pao,
      note: this.note.trim(),
    };
    this.records = [record, ...this.records];
    this.persist();
    this.recName = '';
    this.note = '';
  }

  private deleteRecord(id: string): void {
    this.records = this.records.filter((r) => r.id !== id);
    this.persist();
  }

  private clearRecords(): void {
    this.records = [];
    this.persist();
  }

  private renameRecord(id: string, name: string): void {
    this.records = this.records.map((r) => (r.id === id ? { ...r, name: name.trim() || r.name } : r));
    this.persist();
  }

  private downloadIcs(title: string, expiry: Date): void {
    const ics = buildIcs(title, expiry);
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'beauty-pao.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  private stateColor(state: ExpiryState): string {
    const c = this.config || {};
    if (state === 'expired') return String(c.bpa_expired_color ?? '#cf4b4b');
    if (state === 'warn') return String(c.bpa_warn_color ?? '#e0a100');
    return String(c.bpa_safe_color ?? '#2f9e63');
  }

  private stateLabel(state: ExpiryState, days: number): string {
    const c = this.config || {};
    if (state === 'expired') return localizedString(c.bpa_state_expired as string) || t('انتهت المدة التقريبية', 'Approximate period ended');
    if (state === 'warn') return localizedString(c.bpa_state_warn as string) || t(`قرب الانتهاء — باقٍ ${days} يومًا`, `Ending soon — ${days} days left`);
    return localizedString(c.bpa_state_safe as string) || t(`صالح للاستخدام — باقٍ ${days} يومًا`, `Good to use — ${days} days left`);
  }

  private renderResult() {
    const c = this.config || {};
    const open = parseDateInput(this.openDate);
    if (!open || this.pao <= 0) {
      return html`<div class="bpa-result">
        <p class="bpa-notice">${t('اختاري مدة الاستخدام وتاريخ الفتح لعرض النتيجة.', 'Choose the period and open date to see the result.')}</p>
      </div>`;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (open.getTime() > today.getTime()) {
      return html`<div class="bpa-result">
        <div class="bpa-error">${t('تاريخ الفتح في المستقبل. اختاري تاريخًا صحيحًا.', 'The open date is in the future. Please pick a valid date.')}</div>
      </div>`;
    }

    const warnDays = Math.max(1, toNumber(c.bpa_warn_days, 30));
    const result = computeExpiry(open, this.pao, warnDays);
    const fmt = resolveDateFormat(c);
    const color = this.stateColor(result.state);
    const r = 80;
    const circ = 2 * Math.PI * r;
    const ratio = result.state === 'expired' ? 1 : result.elapsedRatio;
    const offset = circ * (1 - ratio);
    const enableCalendar = isTruthy(c.bpa_enable_calendar, false);
    const storageTips = localizedString(c.bpa_storage_tips as string);
    const stopSignals = localizedString(c.bpa_stop_signals as string);
    const calTitle = t('انتهاء صلاحية منتج التجميل', 'Beauty product expiry');

    return html`<div class="bpa-result" style=${styleMap({ '--bpa-color': color })}>
      <div class="bpa-dial" role="img" aria-label=${this.stateLabel(result.state, Math.max(0, result.daysRemaining))}>
        <svg viewBox="0 0 190 190">
          <circle class="bpa-dial__track" cx="95" cy="95" r=${r}></circle>
          <circle
            class="bpa-dial__value"
            cx="95" cy="95" r=${r}
            style=${styleMap({ strokeDasharray: `${circ}`, strokeDashoffset: `${offset}` })}
          ></circle>
        </svg>
        <div class="bpa-dial__center">
          <div>
            <div class="bpa-dial__days">${Math.abs(result.daysRemaining)}</div>
            <div class="bpa-dial__unit">${result.daysRemaining >= 0 ? t('يوم متبقٍ', 'days left') : t('يوم مضى', 'days over')}</div>
          </div>
        </div>
      </div>

      <span class="bpa-state">${this.stateLabel(result.state, Math.max(0, result.daysRemaining))}</span>

      <div class="bpa-dates">
        <div class="bpa-date-cell"><span>${t('تاريخ الفتح', 'Opened')}</span><b>${formatDate(open, fmt, this.locale)}</b></div>
        <div class="bpa-date-cell"><span>${t('المدة', 'Period')}</span><b>${t(`${this.pao} شهرًا`, `${this.pao} months`)}</b></div>
        <div class="bpa-date-cell"><span>${t('ينتهي تقريبًا', 'Approx. end')}</span><b>${formatDate(result.expiry, fmt, this.locale)}</b></div>
      </div>

      ${storageTips
        ? html`<div class="bpa-tips"><h4>${t('نصائح الحفظ', 'Storage tips')}</h4><p>${storageTips}</p></div>`
        : nothing}
      ${stopSignals
        ? html`<div class="bpa-tips"><h4>${t('متى تتوقفين عن الاستخدام', 'When to stop using')}</h4><p>${stopSignals}</p></div>`
        : nothing}

      <div class="bpa-result-actions">
        ${enableCalendar
          ? html`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.downloadIcs(calTitle, result.expiry)}>
              ${t('إضافة إلى التقويم', 'Add to calendar')}
            </button>`
          : nothing}
        ${isTruthy(c.bpa_enable_storage, true)
          ? html`<button type="button" class="fs-btn" @click=${() => this.saveRecord()}>${t('حفظ هذه العبوة', 'Save this product')}</button>`
          : nothing}
      </div>
    </div>`;
  }

  private renderSaved() {
    const c = this.config || {};
    if (!isTruthy(c.bpa_enable_storage, true)) return nothing;
    const fmt = resolveDateFormat(c);
    return html`<div class="bpa-saved">
      <div class="bpa-saved__head">
        <h3 class="bpa-saved__title">${t('عبواتي المحفوظة', 'My saved products')}</h3>
        ${this.records.length
          ? html`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.clearRecords()}>${t('مسح الكل', 'Clear all')}</button>`
          : nothing}
      </div>
      <p class="bpa-saved__note">${t('البيانات محفوظة على جهازك فقط ولا تُرسل إلى أي خادم.', 'Data is stored on your device only and never sent to any server.')}</p>
      ${this.records.length
        ? this.records.map((rec) => {
            const open = parseDateInput(rec.open);
            const warnDays = Math.max(1, toNumber(c.bpa_warn_days, 30));
            const res = open ? computeExpiry(open, rec.pao, warnDays) : null;
            const color = res ? this.stateColor(res.state) : 'var(--muted-color)';
            return html`<div class="bpa-record">
              <span class="bpa-record__dot" style=${styleMap({ background: color })}></span>
              <div class="bpa-record__info">
                ${this.editingId === rec.id
                  ? html`<input
                      class="bpa-record__edit"
                      .value=${rec.name}
                      aria-label=${t('اسم العبوة', 'Product name')}
                      @change=${(e: Event) => {
                        this.renameRecord(rec.id, (e.target as HTMLInputElement).value);
                        this.editingId = '';
                      }}
                    />`
                  : html`<div class="bpa-record__name">${rec.name}</div>`}
                <div class="bpa-record__meta">
                  ${res && open
                    ? t(`ينتهي ${formatDate(res.expiry, fmt, this.locale)}`, `Ends ${formatDate(res.expiry, fmt, this.locale)}`)
                    : ''}
                  ${rec.note ? html` · ${rec.note}` : nothing}
                </div>
              </div>
              <button type="button" class="bpa-icon-btn" aria-label=${t('تعديل الاسم', 'Rename')} @click=${() => (this.editingId = this.editingId === rec.id ? '' : rec.id)}>✎</button>
              <button type="button" class="bpa-icon-btn" aria-label=${t('حذف', 'Delete')} @click=${() => this.deleteRecord(rec.id)}>🗑</button>
            </div>`;
          })
        : html`<p class="bpa-saved__note">${t('لا توجد عبوات محفوظة بعد.', 'No saved products yet.')}</p>`}
    </div>`;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'bpa_');
    const title = localizedString(c.bpa_title as string);
    const desc = localizedString(c.bpa_desc as string);
    const inputMode = resolveInputMode(c);
    const categories = parseCategories(c.bpa_categories);
    const paoOptions = parsePaoOptions(c.bpa_pao_options);
    const notice =
      localizedString(c.bpa_notice as string) ||
      t(
        'النتيجة تقديرية وتعتمد على تاريخ الفتح والمدة المكتوبة على العبوة. اتبعي تعليمات الشركة المصنّعة وتوقّفي عن الاستخدام عند تغيّر الرائحة أو اللون أو القوام.',
        'The result is approximate and based on the open date and the period printed on the packaging. Follow the manufacturer instructions and stop using if the smell, color or texture changes.'
      );
    const showCategories = (inputMode === 'category' || categories.length > 0) && categories.length > 0;

    return html`
      <section
        class="fs-section"
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('حاسبة مدة الاستخدام بعد الفتح', 'PAO & expiry calculator')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="bpa-grid">
            <div class="bpa-form">
              ${showCategories
                ? html`<div class="bpa-field">
                    <label for="bpa-cat">${t('فئة المستحضر', 'Product category')}</label>
                    <select
                      id="bpa-cat"
                      class="bpa-select"
                      @change=${(e: Event) => {
                        const id = (e.target as HTMLSelectElement).value;
                        const cat = categories.find((x) => x.id === id);
                        this.onCategory(id, cat?.paoMonths ?? 0);
                      }}
                    >
                      <option value="">${t('اختياري — اختاري الفئة', 'Optional — choose a category')}</option>
                      ${categories.map((cat) => html`<option value=${cat.id} ?selected=${cat.id === this.catId}>${cat.name}${cat.paoMonths ? ` (${cat.paoMonths}${this.locale === 'en' ? 'M' : ' شهر'})` : ''}</option>`)}
                    </select>
                  </div>`
                : nothing}

              <div class="bpa-field">
                <label>${t('مدة الاستخدام بعد الفتح', 'Period after opening')}</label>
                ${paoOptions.length
                  ? html`<div class="bpa-pao-chips">
                      ${paoOptions.map(
                        (opt) => html`<button
                          type="button"
                          class="bpa-pao-chip ${this.pao === opt.months ? 'is-active' : ''}"
                          aria-pressed=${this.pao === opt.months ? 'true' : 'false'}
                          @click=${() => (this.pao = opt.months)}
                        >${paoOptionLabel(opt, this.locale)}</button>`
                      )}
                    </div>`
                  : html`<input
                      class="bpa-input"
                      type="number"
                      min="1"
                      max="60"
                      .value=${this.pao ? String(this.pao) : ''}
                      placeholder=${t('عدد الأشهر', 'Number of months')}
                      @input=${(e: Event) => (this.pao = Math.max(0, toNumber((e.target as HTMLInputElement).value, 0)))}
                    />`}
              </div>

              <div class="bpa-field">
                <label for="bpa-open">${t('تاريخ فتح العبوة', 'Open date')}</label>
                <input
                  id="bpa-open"
                  class="bpa-input"
                  type="date"
                  max=${toInputValue(new Date())}
                  .value=${this.openDate}
                  @input=${(e: Event) => (this.openDate = (e.target as HTMLInputElement).value)}
                />
              </div>

              ${isTruthy(c.bpa_enable_name, true)
                ? html`<div class="bpa-field">
                    <label for="bpa-name">${t('اسم العبوة (اختياري)', 'Product name (optional)')}</label>
                    <input id="bpa-name" class="bpa-input" .value=${this.recName} @input=${(e: Event) => (this.recName = (e.target as HTMLInputElement).value)} />
                  </div>`
                : nothing}

              ${isTruthy(c.bpa_enable_note, false)
                ? html`<div class="bpa-field">
                    <label for="bpa-note">${t('ملاحظة (اختياري)', 'Note (optional)')}</label>
                    <input id="bpa-note" class="bpa-input" .value=${this.note} @input=${(e: Event) => (this.note = (e.target as HTMLInputElement).value)} />
                  </div>`
                : nothing}
            </div>

            ${this.renderResult()}
          </div>

          ${this.renderSaved()}

          <p class="bpa-notice">${notice}</p>
        </div>
      </section>
    `;
  }
}
