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
      return html`<div class="bpa-hero bpa-hero--empty" role="status">
        <div class="bpa-hero__placeholder">
          <span class="bpa-hero__placeholder-icon" aria-hidden="true">◷</span>
          <p>
            ${t(
              'اختاري مدة الاستخدام بعد الفتح وتاريخ فتح العبوة لعرض النتيجة فورًا.',
              'Choose the period after opening and the open date to see the result instantly.'
            )}
          </p>
        </div>
      </div>`;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (open.getTime() > today.getTime()) {
      return html`<div class="bpa-hero bpa-hero--empty" role="alert">
        <div class="bpa-error">
          ${t('تاريخ الفتح في المستقبل. اختاري تاريخًا صحيحًا.', 'The open date is in the future. Please pick a valid date.')}
        </div>
      </div>`;
    }

    const warnDays = Math.max(1, toNumber(c.bpa_warn_days, 30));
    const result = computeExpiry(open, this.pao, warnDays);
    const fmt = resolveDateFormat(c);
    const color = this.stateColor(result.state);
    const r = 92;
    const circ = 2 * Math.PI * r;
    const remainingRatio =
      result.state === 'expired'
        ? 0
        : Math.max(0, Math.min(1, result.daysRemaining / Math.max(1, result.totalDays)));
    const offset = circ * (1 - remainingRatio);
    const enableCalendar = isTruthy(c.bpa_enable_calendar, true);
    const storageTips = localizedString(c.bpa_storage_tips as string);
    const stopSignals = localizedString(c.bpa_stop_signals as string);
    const calTitle = t('انتهاء صلاحية منتج التجميل', 'Beauty product expiry');
    const daysAbs = Math.abs(result.daysRemaining);

    return html`<div
      class="bpa-hero bpa-hero--${result.state}"
      style=${styleMap({ '--bpa-color': color })}
    >
      <div
        class="bpa-dial"
        role="img"
        aria-label=${this.stateLabel(result.state, Math.max(0, result.daysRemaining))}
      >
        <svg viewBox="0 0 210 210" aria-hidden="true">
          <circle class="bpa-dial__track" cx="105" cy="105" r=${r}></circle>
          <circle
            class="bpa-dial__value"
            cx="105"
            cy="105"
            r=${r}
            style=${styleMap({ strokeDasharray: `${circ}`, strokeDashoffset: `${offset}` })}
          ></circle>
        </svg>
        <div class="bpa-dial__center">
          <div class="bpa-dial__days">${daysAbs}</div>
          <div class="bpa-dial__unit">
            ${result.daysRemaining >= 0 ? t('يوم متبقٍ', 'days left') : t('يوم مضى', 'days over')}
          </div>
        </div>
      </div>

      <span class="bpa-state bpa-state--${result.state}">${this.stateLabel(result.state, Math.max(0, result.daysRemaining))}</span>

      <div class="bpa-dates">
        <div class="bpa-date-cell">
          <span>${t('تاريخ الفتح', 'Opened')}</span>
          <b>${formatDate(open, fmt, this.locale)}</b>
        </div>
        <div class="bpa-date-cell">
          <span>${t('المدة', 'Period')}</span>
          <b>${t(`${this.pao} شهرًا`, `${this.pao} months`)}</b>
        </div>
        <div class="bpa-date-cell">
          <span>${t('ينتهي تقريبًا', 'Approx. end')}</span>
          <b>${formatDate(result.expiry, fmt, this.locale)}</b>
        </div>
      </div>

      ${storageTips || stopSignals
        ? html`<div class="bpa-tips-grid">
            ${storageTips
              ? html`<div class="bpa-tips"><h4>${t('نصائح الحفظ', 'Storage tips')}</h4><p>${storageTips}</p></div>`
              : nothing}
            ${stopSignals
              ? html`<div class="bpa-tips"><h4>${t('متى تتوقفين', 'When to stop')}</h4><p>${stopSignals}</p></div>`
              : nothing}
          </div>`
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
    const warnDays = Math.max(1, toNumber(c.bpa_warn_days, 30));

    return html`<div class="bpa-saved">
      <div class="bpa-saved__head">
        <h3 class="bpa-saved__title">${t('عبواتي المحفوظة', 'My saved products')}</h3>
        ${this.records.length
          ? html`<button type="button" class="fs-btn fs-btn--ghost" @click=${() => this.clearRecords()}>${t('مسح الكل', 'Clear all')}</button>`
          : nothing}
      </div>
      <p class="bpa-saved__note">${t('البيانات محفوظة على جهازك فقط ولا تُرسل إلى أي خادم.', 'Data is stored on your device only and never sent to any server.')}</p>
      ${this.records.length
        ? html`<div class="bpa-records">
            ${this.records.map((rec) => {
              const open = parseDateInput(rec.open);
              const res = open ? computeExpiry(open, rec.pao, warnDays) : null;
              const color = res ? this.stateColor(res.state) : 'var(--muted-color)';
              const stateClass = res?.state ?? 'unknown';
              const daysLabel = res
                ? res.daysRemaining >= 0
                  ? t(`${res.daysRemaining} يوم`, `${res.daysRemaining} days`)
                  : t(`منتهٍ ${Math.abs(res.daysRemaining)} يوم`, `Expired ${Math.abs(res.daysRemaining)}d ago`)
                : '';
              return html`<article
                class="bpa-record bpa-record--${stateClass}"
                style=${styleMap({ '--rec-color': color })}
              >
                <div class="bpa-record__status" aria-hidden="true">
                  <span class="bpa-record__ring"></span>
                  ${res ? html`<span class="bpa-record__days">${Math.abs(res.daysRemaining)}</span>` : nothing}
                </div>
                <div class="bpa-record__body">
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
                      ? html`<span class="bpa-record__pill bpa-record__pill--${stateClass}">
                          ${res.state === 'expired'
                            ? t('منتهٍ', 'Expired')
                            : res.state === 'warn'
                              ? t('قرب الانتهاء', 'Ending soon')
                              : t('صالح', 'Good')}
                        </span>`
                      : nothing}
                    ${daysLabel ? html`<span>${daysLabel}</span>` : nothing}
                    ${res && open
                      ? html`<span>· ${t('ينتهي', 'Ends')} ${formatDate(res.expiry, fmt, this.locale)}</span>`
                      : nothing}
                  </div>
                  ${rec.note ? html`<p class="bpa-record__note">${rec.note}</p>` : nothing}
                </div>
                <div class="bpa-record__actions">
                  <button type="button" class="bpa-icon-btn" aria-label=${t('تعديل الاسم', 'Rename')} @click=${() => (this.editingId = this.editingId === rec.id ? '' : rec.id)}>✎</button>
                  <button type="button" class="bpa-icon-btn" aria-label=${t('حذف', 'Delete')} @click=${() => this.deleteRecord(rec.id)}>🗑</button>
                </div>
              </article>`;
            })}
          </div>`
        : html`<div class="bpa-saved__empty">${t('لا توجد عبوات محفوظة بعد.', 'No saved products yet.')}</div>`}
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
    const showCategories = inputMode === 'category' && categories.length > 0;

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

          <div class="bpa-shell">
            <aside class="bpa-form-card">
              <h3 class="bpa-form-card__title">${t('احسبي المدة', 'Calculate the period')}</h3>
              <p class="bpa-form-card__hint">
                ${t(
                  'اختاري الفئة أو المدة، ثم حدّدي تاريخ فتح العبوة.',
                  'Pick a category or period, then set the open date.'
                )}
              </p>

              <div class="bpa-form">
                ${showCategories
                  ? html`<div class="bpa-field">
                      <label>${t('فئة المستحضر', 'Product category')}</label>
                      <div class="bpa-cat-chips" role="group" aria-label=${t('فئات المستحضرات', 'Product categories')}>
                        ${categories.map((cat) => {
                          const active = cat.id === this.catId;
                          const isSicon = cat.icon.startsWith('sicon-');
                          return html`<button
                            type="button"
                            class=${`bpa-cat-chip${active ? ' is-active' : ''}`}
                            aria-pressed=${active ? 'true' : 'false'}
                            @click=${() => this.onCategory(cat.id, cat.paoMonths)}
                          >
                            ${cat.icon
                              ? html`<span class="bpa-cat-chip__icon" aria-hidden="true">
                                  ${isSicon ? html`<span class=${cat.icon}></span>` : cat.icon}
                                </span>`
                              : nothing}
                            <span>${cat.name}</span>
                            ${cat.paoMonths
                              ? html`<span class="bpa-cat-chip__months"
                                  >${this.locale === 'en' ? `${cat.paoMonths}M` : `${cat.paoMonths} شهر`}</span
                                >`
                              : nothing}
                          </button>`;
                        })}
                      </div>
                    </div>`
                  : nothing}

                <div class="bpa-field">
                  <label>${t('مدة الاستخدام بعد الفتح', 'Period after opening')}</label>
                  ${paoOptions.length
                    ? html`<div class="bpa-pao-chips" role="group" aria-label=${t('مدد الاستخدام', 'Use periods')}>
                        ${paoOptions.map(
                          (opt) => html`<button
                            type="button"
                            class=${`bpa-pao-chip${this.pao === opt.months ? ' is-active' : ''}`}
                            aria-pressed=${this.pao === opt.months ? 'true' : 'false'}
                            @click=${() => (this.pao = opt.months)}
                          >
                            ${paoOptionLabel(opt, this.locale)}
                          </button>`
                        )}
                      </div>`
                    : html`<input
                        class="bpa-input"
                        type="number"
                        min="1"
                        max="60"
                        .value=${this.pao ? String(this.pao) : ''}
                        placeholder=${t('عدد الأشهر', 'Number of months')}
                        @input=${(e: Event) =>
                          (this.pao = Math.max(0, toNumber((e.target as HTMLInputElement).value, 0)))}
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
                      <input
                        id="bpa-name"
                        class="bpa-input"
                        .value=${this.recName}
                        placeholder=${t('مثال: سيروم فيتامين C', 'e.g. Vitamin C serum')}
                        @input=${(e: Event) => (this.recName = (e.target as HTMLInputElement).value)}
                      />
                    </div>`
                  : nothing}

                ${isTruthy(c.bpa_enable_note, false)
                  ? html`<div class="bpa-field">
                      <label for="bpa-note">${t('ملاحظة (اختياري)', 'Note (optional)')}</label>
                      <input
                        id="bpa-note"
                        class="bpa-input"
                        .value=${this.note}
                        @input=${(e: Event) => (this.note = (e.target as HTMLInputElement).value)}
                      />
                    </div>`
                  : nothing}
              </div>
            </aside>

            ${this.renderResult()}
          </div>

          ${this.renderSaved()}

          <p class="bpa-notice">${notice}</p>
        </div>
      </section>
    `;
  }
}
