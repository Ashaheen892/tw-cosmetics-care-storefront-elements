/**
 * Capture step-by-step demo GIFs (1600×1200) from editor-free preview.
 * Each frame shows an Arabic step label + a real UI interaction.
 *
 * Usage:
 *   pnpm exec vite --host 127.0.0.1 --port 5173
 *   node scripts/capture-element-gifs.mjs
 *   node scripts/capture-element-gifs.mjs --thumbs-only   # 6 Desktop thumbnails
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import gifenc from 'gifenc';
import { fileURLToPath } from 'url';

const { GIFEncoder, quantize, applyPalette } = gifenc;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'notion-screenshots', 'gifs');
const DESKTOP_THUMBS = path.join(
  process.env.HOME || '',
  'Desktop',
  'ثامبنيلز-عناصر-التجميل-GIF'
);
const DEMO_URL =
  process.env.DEMO_URL || 'http://127.0.0.1:5173/node_modules/.salla-temp/preview.html';
const W = 1600;
const H = 1200;
const FRAME_MS = 900;

const ALL = [
  'beauty-shade-finder',
  'beauty-routine-builder',
  'beauty-ingredient-lab',
  'beauty-care-assistant',
  'beauty-collection-reveal',
  'beauty-face-zone-map',
  'beauty-routine-layering-board',
  'beauty-lighting-finish-simulator',
  'beauty-pao-expiry-calculator',
  'beauty-texture-absorption-lab',
  'beauty-actives-compatibility',
  'beauty-fragrance-finder',
  'beauty-spf-guide',
  'beauty-color-harmony',
  'beauty-weekly-planner',
  'beauty-categories',
  'beauty-before-after',
  'beauty-promo-banners',
];

/** 6 featured thumbnails for Desktop folder */
const THUMB_SIX = [
  'beauty-shade-finder',
  'beauty-routine-builder',
  'beauty-collection-reveal',
  'beauty-face-zone-map',
  'beauty-lighting-finish-simulator',
  'beauty-color-harmony',
];

const thumbsOnly = process.argv.includes('--thumbs-only');
const COMPONENTS = thumbsOnly ? THUMB_SIX : ALL;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(DESKTOP_THUMBS, { recursive: true });

function fitToCanvas(pngBuffer, bg = [252, 245, 240]) {
  const src = PNG.sync.read(pngBuffer);
  const out = new PNG({ width: W, height: H });
  for (let i = 0; i < W * H; i++) {
    const o = i * 4;
    out.data[o] = bg[0];
    out.data[o + 1] = bg[1];
    out.data[o + 2] = bg[2];
    out.data[o + 3] = 255;
  }
  const scale = Math.min(W / src.width, H / src.height, 1);
  const dw = Math.max(1, Math.round(src.width * scale));
  const dh = Math.max(1, Math.round(src.height * scale));
  const ox = Math.floor((W - dw) / 2);
  const oy = Math.floor((H - dh) / 2);
  for (let y = 0; y < dh; y++) {
    for (let x = 0; x < dw; x++) {
      const sx = Math.min(src.width - 1, Math.floor(x / scale));
      const sy = Math.min(src.height - 1, Math.floor(y / scale));
      const si = (sy * src.width + sx) * 4;
      const di = ((oy + y) * W + (ox + x)) * 4;
      const a = src.data[si + 3] / 255;
      out.data[di] = Math.round(src.data[si] * a + bg[0] * (1 - a));
      out.data[di + 1] = Math.round(src.data[si + 1] * a + bg[1] * (1 - a));
      out.data[di + 2] = Math.round(src.data[si + 2] * a + bg[2] * (1 - a));
      out.data[di + 3] = 255;
    }
  }
  return out.data;
}

function encodeGif(framesRgba) {
  const gif = GIFEncoder();
  let palette;
  for (const data of framesRgba) {
    if (!palette) palette = quantize(data, 256);
    gif.writeFrame(applyPalette(data, palette), W, H, {
      palette,
      delay: FRAME_MS,
      dispose: 1,
    });
  }
  gif.finish();
  return Buffer.from(gif.bytes());
}

async function getHost(card) {
  const handle = await card.evaluateHandle((el) => {
    const name = el.getAttribute('data-component');
    return (
      [...el.querySelectorAll('*')].find((n) =>
        n.tagName.toLowerCase().startsWith(`salla-${name}`)
      ) || el
    );
  });
  return handle.asElement();
}

async function setStepBadge(card, label, step, total) {
  await card.evaluate(
    (el, payload) => {
      let bar = el.querySelector('.gif-demo-bar');
      if (!bar) {
        bar = document.createElement('div');
        bar.className = 'gif-demo-bar';
        bar.setAttribute(
          'style',
          [
            'position:sticky',
            'top:0',
            'z-index:50',
            'display:flex',
            'align-items:center',
            'justify-content:space-between',
            'gap:12px',
            'padding:14px 18px',
            'background:linear-gradient(90deg,#7b2c52,#c2527f)',
            'color:#fff',
            'font:800 18px/1.35 "Segoe UI",Tahoma,sans-serif',
            'border-bottom:1px solid rgba(255,255,255,.2)',
            'direction:rtl',
          ].join(';')
        );
        el.insertBefore(bar, el.firstChild);
      }
      bar.innerHTML = `<span>${payload.label}</span><span style="opacity:.9;font-size:14px;font-weight:700">الخطوة ${payload.step} من ${payload.total}</span>`;
    },
    { label, step, total }
  );
}

async function clickInHost(page, host, selectors, index = 0) {
  return page.evaluate(
    ({ el, selectors, index }) => {
      const root = el.shadowRoot || el;
      for (const sel of selectors) {
        const nodes = [...root.querySelectorAll(sel)].filter((n) => {
          const s = getComputedStyle(n);
          const r = n.getBoundingClientRect();
          return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 4 && r.height > 4 && !n.disabled;
        });
        if (nodes[index]) {
          nodes[index].click();
          return true;
        }
      }
      return false;
    },
    { el: host, selectors, index }
  );
}

async function clickPrimaryNav(page, host) {
  // Prefer main CTA (not ghost/back)
  return page.evaluate((el) => {
    const root = el.shadowRoot || el;
    const btns = [...root.querySelectorAll('button.fs-btn, button')].filter((n) => {
      const s = getComputedStyle(n);
      const r = n.getBoundingClientRect();
      const cls = n.className?.toString?.() || '';
      return (
        s.display !== 'none' &&
        s.visibility !== 'hidden' &&
        r.width > 20 &&
        !n.disabled &&
        !cls.includes('ghost') &&
        !cls.includes('close') &&
        !cls.includes('dismiss')
      );
    });
    const prefer = btns.find((b) => /التالي|عرض|نتيجة|تحق|اكشف|ابدأ|Next|Reveal|Check/i.test(b.textContent || ''));
    (prefer || btns[btns.length - 1])?.click();
    return Boolean(prefer || btns.length);
  }, host);
}

/** Per-component demo: returns ordered Arabic step labels; performs action BEFORE each frame except first. */
const DEMOS = {
  async 'beauty-shade-finder'(page, host, shot) {
    const steps = [
      'البداية: اختيار نوع المكياج',
      'اختيار خيار ثم الضغط على التالي',
      'تحديد درجة البشرة',
      'اختيار الأندرتون',
      'عرض النتائج والدرجة المناسبة',
    ];
    await shot(steps[0]);
    await clickInHost(page, host, ['.bsf-chip', 'button'], 0);
    await page.waitForTimeout(350);
    await clickPrimaryNav(page, host);
    await page.waitForTimeout(450);
    await shot(steps[1]);
    await clickInHost(page, host, ['.bsf-chip', 'button'], 1);
    await page.waitForTimeout(300);
    await clickPrimaryNav(page, host);
    await page.waitForTimeout(450);
    await shot(steps[2]);
    await clickInHost(page, host, ['.bsf-chip', 'button'], 0);
    await page.waitForTimeout(300);
    await clickPrimaryNav(page, host);
    await page.waitForTimeout(450);
    await shot(steps[3]);
    await clickInHost(page, host, ['.bsf-chip', 'button'], 0);
    await page.waitForTimeout(300);
    await clickPrimaryNav(page, host);
    await page.waitForTimeout(550);
    await shot(steps[4]);
  },

  async 'beauty-routine-builder'(page, host, shot) {
    const steps = [
      'البداية: سؤال نوع البشرة',
      'اختيار الإجابة والانتقال للسؤال التالي',
      'تحديد مشكلة البشرة',
      'اختيار وقت الاستخدام',
      'عرض روتين العناية المقترح',
    ];
    await shot(steps[0]);
    for (let i = 1; i <= 3; i++) {
      await clickInHost(page, host, ['.brb-chip', 'button'], 0);
      await page.waitForTimeout(280);
      await clickPrimaryNav(page, host);
      await page.waitForTimeout(450);
      await shot(steps[i]);
    }
    await clickInHost(page, host, ['.brb-chip', 'button'], 0);
    await page.waitForTimeout(280);
    await clickPrimaryNav(page, host);
    await page.waitForTimeout(550);
    await shot(steps[4]);
  },

  async 'beauty-ingredient-lab'(page, host, shot) {
    const steps = [
      'استعراض مختبر المكونات',
      'اختيار مكوّن أول لاستكشافه',
      'عرض تفاصيل المكوّن والفوائد',
      'التنقل لمكوّن آخر',
      'مقارنة سريعة بين المكونات',
    ];
    await shot(steps[0]);
    await clickInHost(page, host, ['button', '[role="button"]', 'article', '.bil-card', 'a'], 0);
    await page.waitForTimeout(500);
    await shot(steps[1]);
    await clickInHost(page, host, ['button', '[role="button"]'], 1);
    await page.waitForTimeout(450);
    await shot(steps[2]);
    await clickInHost(page, host, ['button', '[role="button"]', 'article'], 2);
    await page.waitForTimeout(450);
    await shot(steps[3]);
    await clickInHost(page, host, ['button', '[role="button"]'], 0);
    await page.waitForTimeout(450);
    await shot(steps[4]);
  },

  async 'beauty-care-assistant'(page, host, shot) {
    const steps = [
      'بداية المحادثة مع المساعدة',
      'اختيار إجابة السؤال الأول',
      'متابعة الأسئلة المتفرعة',
      'تحديد الهدف من الاستخدام',
      'عرض التوصية النهائية',
    ];
    await shot(steps[0]);
    for (let i = 1; i < 5; i++) {
      await clickInHost(page, host, ['button', '[role="button"]', '.bca-option', '.chip'], 0);
      await page.waitForTimeout(500);
      await shot(steps[i]);
    }
  },

  async 'beauty-collection-reveal'(page, host, shot) {
    const steps = [
      'غلاف المجموعة قبل الكشف',
      'الضغط على زر الكشف',
      'بدء ظهور البطاقات',
      'اكتمال كشف المجموعة',
      'استعراض بطاقات المنتجات',
    ];
    await shot(steps[0]);
    await clickInHost(page, host, ['.bcr-cover__btn', 'button.fs-btn', 'button'], 0);
    await page.waitForTimeout(400);
    await shot(steps[1]);
    await page.waitForTimeout(700);
    await shot(steps[2]);
    await page.waitForTimeout(900);
    await shot(steps[3]);
    await page.waitForTimeout(500);
    await shot(steps[4]);
  },

  async 'beauty-face-zone-map'(page, host, shot) {
    const steps = [
      'عرض خريطة مناطق الوجه',
      'اختيار منطقة من الخريطة',
      'قراءة تفاصيل العناية للمنطقة',
      'التنقل لمنطقة تالية',
      'استعراض النصائح والخطوات',
    ];
    await clickInHost(page, host, ['.bfz-coach__dismiss', 'button'], 0);
    await page.waitForTimeout(200);
    await shot(steps[0]);
    await clickInHost(page, host, ['.bfz-dot', 'button.bfz-dot', '[class*="bfz-dot"]'], 0);
    await page.waitForTimeout(500);
    await shot(steps[1]);
    await page.waitForTimeout(400);
    await shot(steps[2]);
    await clickInHost(page, host, ['.bfz-nav__btn', 'button'], 1);
    await page.waitForTimeout(450);
    await shot(steps[3]);
    await clickInHost(page, host, ['.bfz-dot', 'button'], 2);
    await page.waitForTimeout(450);
    await shot(steps[4]);
  },

  async 'beauty-routine-layering-board'(page, host, shot) {
    const steps = [
      'عرض طبقات الروتين',
      'التبديل بين روتين صباحي/مسائي',
      'توسيع تفاصيل خطوة',
      'إعادة ترتيب الطبقات',
      'التحقق من الترتيب الصحيح',
    ];
    await shot(steps[0]);
    await clickInHost(page, host, ['.brl-tabs button', 'button[role="tab"]', 'button'], 1);
    await page.waitForTimeout(450);
    await shot(steps[1]);
    await clickInHost(page, host, ['.brl-step__toggle', 'button'], 0);
    await page.waitForTimeout(450);
    await shot(steps[2]);
    await clickInHost(page, host, ['.brl-handle', 'button'], 1);
    await page.waitForTimeout(400);
    await shot(steps[3]);
    await clickInHost(page, host, ['.brl-actions button', 'button.fs-btn'], 0);
    await page.waitForTimeout(500);
    await shot(steps[4]);
  },

  async 'beauty-lighting-finish-simulator'(page, host, shot) {
    const steps = [
      'معاينة المظهر تحت الإضاءة الافتراضية',
      'اختيار نوع إضاءة مختلف',
      'تغيير اللمسة النهائية',
      'مقارنة التأثير على الألوان',
      'قراءة مؤشرات المظهر',
    ];
    await shot(steps[0]);
    await clickInHost(page, host, ['.bls-chips button', '.bls-chip', 'button'], 1);
    await page.waitForTimeout(500);
    await shot(steps[1]);
    await clickInHost(page, host, ['.bls-finish-chips button', 'button'], 1);
    await page.waitForTimeout(450);
    await shot(steps[2]);
    await clickInHost(page, host, ['.bls-chips button', 'button'], 2);
    await page.waitForTimeout(450);
    await shot(steps[3]);
    await clickInHost(page, host, ['.bls-chips button', 'button'], 0);
    await page.waitForTimeout(450);
    await shot(steps[4]);
  },

  async 'beauty-pao-expiry-calculator'(page, host, shot) {
    const steps = [
      'فتح حاسبة مدة الاستخدام بعد الفتح',
      'اختيار فئة المنتج',
      'تحديد مدة PAO',
      'إدخال تاريخ الفتح',
      'عرض تاريخ انتهاء الاستخدام والتنبيه',
    ];
    await shot(steps[0]);
    await clickInHost(page, host, ['button', 'select', '[role="button"]', 'label'], 0);
    await page.waitForTimeout(400);
    await shot(steps[1]);
    await clickInHost(page, host, ['button', 'select', '[role="option"]', 'label'], 1);
    await page.waitForTimeout(400);
    await shot(steps[2]);
    await clickInHost(page, host, ['input', 'button'], 0);
    await page.waitForTimeout(350);
    await shot(steps[3]);
    await clickPrimaryNav(page, host);
    await page.waitForTimeout(500);
    await shot(steps[4]);
  },

  async 'beauty-texture-absorption-lab'(page, host, shot) {
    const steps = [
      'استعراض عينات القوام',
      'اختيار قوام أول',
      'قراءة مؤشرات الإحساس والامتصاص',
      'تفعيل المقارنة مع قوام آخر',
      'محاكاة الانتشار على البشرة',
    ];
    await shot(steps[0]);
    await clickInHost(page, host, ['button', '[role="button"]', 'article'], 0);
    await page.waitForTimeout(450);
    await shot(steps[1]);
    await page.waitForTimeout(350);
    await shot(steps[2]);
    await clickInHost(page, host, ['button', '[role="button"]'], 1);
    await page.waitForTimeout(450);
    await shot(steps[3]);
    await clickInHost(page, host, ['button', '[role="button"]'], 2);
    await page.waitForTimeout(450);
    await shot(steps[4]);
  },

  async 'beauty-actives-compatibility'(page, host, shot) {
    const steps = [
      'فتح مدقّق توافق المكونات',
      'اختيار المكوّن الأول',
      'اختيار المكوّن الثاني',
      'عرض نتيجة التوافق',
      'قراءة التوصية والنصيحة',
    ];
    await shot(steps[0]);
    await clickInHost(page, host, ['button', 'select', '[role="button"]', 'option'], 0);
    await page.waitForTimeout(400);
    await shot(steps[1]);
    await clickInHost(page, host, ['button', 'select', '[role="button"]'], 1);
    await page.waitForTimeout(400);
    await shot(steps[2]);
    await clickPrimaryNav(page, host);
    await page.waitForTimeout(500);
    await shot(steps[3]);
    await page.waitForTimeout(400);
    await shot(steps[4]);
  },

  async 'beauty-fragrance-finder'(page, host, shot) {
    const steps = [
      'استعراض عائلات العطر',
      'اختيار عائلة عطرية',
      'عرض هرم النوتات (مقدمة/قلب/أساس)',
      'قراءة وصف العائلة',
      'استكشاف عائلة أخرى',
    ];
    await shot(steps[0]);
    await clickInHost(page, host, ['button', '[role="button"]', 'article', 'a'], 0);
    await page.waitForTimeout(500);
    await shot(steps[1]);
    await page.waitForTimeout(400);
    await shot(steps[2]);
    await page.waitForTimeout(350);
    await shot(steps[3]);
    await clickInHost(page, host, ['button', '[role="button"]', 'article'], 1);
    await page.waitForTimeout(450);
    await shot(steps[4]);
  },

  async 'beauty-spf-guide'(page, host, shot) {
    const steps = [
      'بداية دليل الحماية من الشمس',
      'اختيار نوع البشرة',
      'تحديد عامل الحماية SPF',
      'اختيار حالة التعرض للشمس',
      'عرض التوصية والنصائح',
    ];
    await shot(steps[0]);
    for (let i = 1; i <= 3; i++) {
      await clickInHost(page, host, ['button', '[role="button"]', 'label'], 0);
      await page.waitForTimeout(350);
      await clickPrimaryNav(page, host);
      await page.waitForTimeout(450);
      await shot(steps[i]);
    }
    await clickInHost(page, host, ['button', '[role="button"]'], 0);
    await page.waitForTimeout(300);
    await clickPrimaryNav(page, host);
    await page.waitForTimeout(500);
    await shot(steps[4]);
  },

  async 'beauty-color-harmony'(page, host, shot) {
    const steps = [
      'عرض عجلة تناسق الألوان',
      'اختيار درجة لون أساسية',
      'تفعيل نوع تناسق (متكامل/متجاور)',
      'اقتراح ألوان الشفاه والعيون',
      'تجربة درجة أخرى',
    ];
    await shot(steps[0]);
    await clickInHost(page, host, ['button', '[role="button"]', '.swatch', 'circle'], 1);
    await page.waitForTimeout(450);
    await shot(steps[1]);
    await clickInHost(page, host, ['button', '[role="tab"]', 'label'], 1);
    await page.waitForTimeout(450);
    await shot(steps[2]);
    await page.waitForTimeout(350);
    await shot(steps[3]);
    await clickInHost(page, host, ['button', '[role="button"]'], 3);
    await page.waitForTimeout(450);
    await shot(steps[4]);
  },

  async 'beauty-categories'(page, host, shot) {
    const steps = [
      'استعراض دوائر التصنيفات',
      'تمييز تصنيف عند المرور عليه',
      'تمييز تصنيف آخر',
      'استعراض بقية التصنيفات',
      'جاهزة للانتقال لصفحة التصنيف',
    ];
    const hoverItem = async (i) => {
      await page.evaluate(
        ({ el, i }) => {
          const root = el.shadowRoot || el;
          const items = [...root.querySelectorAll('.bcat-item')];
          items.forEach((n) => n.classList.remove('bcat-hover'));
          const target = items[i];
          if (target) {
            target.classList.add('bcat-hover');
            target.style.transform = 'translateY(-4px)';
            const disc = target.querySelector('.bcat-disc');
            if (disc) {
              disc.style.borderColor = 'var(--accent-color, #c2527f)';
              disc.style.boxShadow =
                '0 0 0 5px color-mix(in srgb, var(--accent-color, #c2527f) 16%, transparent), 0 14px 28px rgba(120,44,82,.14)';
            }
          }
        },
        { el: host, i }
      );
    };
    await shot(steps[0]);
    await hoverItem(0);
    await page.waitForTimeout(350);
    await shot(steps[1]);
    await hoverItem(1);
    await page.waitForTimeout(350);
    await shot(steps[2]);
    await hoverItem(2);
    await page.waitForTimeout(350);
    await shot(steps[3]);
    await hoverItem(3);
    await page.waitForTimeout(350);
    await shot(steps[4]);
  },

  async 'beauty-before-after'(page, host, shot) {
    const steps = [
      'عرض المقارنة قبل/بعد',
      'سحب المقبض نحو «قبل»',
      'العودة إلى المنتصف',
      'سحب المقبض نحو «بعد»',
      'استخدام الأزرار السريعة للمقارنة',
    ];
    const setPos = async (pos) => {
      await page.evaluate(
        ({ el, pos }) => {
          const root = el.shadowRoot || el;
          const range = root.querySelector('.bba-range__input');
          if (range) {
            range.value = String(pos);
            range.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
          }
        },
        { el: host, pos }
      );
    };
    await shot(steps[0]);
    await setPos(85);
    await page.waitForTimeout(400);
    await shot(steps[1]);
    await setPos(50);
    await page.waitForTimeout(400);
    await shot(steps[2]);
    await setPos(15);
    await page.waitForTimeout(400);
    await shot(steps[3]);
    await clickInHost(page, host, ['.bba-quick__btn', 'button'], 1);
    await page.waitForTimeout(400);
    await shot(steps[4]);
  },

  async 'beauty-promo-banners'(page, host, shot) {
    const steps = [
      'استعراض بنرات العروض',
      'التمرير إلى البنر التالي',
      'قراءة تفاصيل العرض',
      'التمرير لبنر آخر',
      'زر تسوقي الآن جاهز للنقر',
    ];
    const scrollTrack = async (ratio) => {
      await page.evaluate(
        ({ el, ratio }) => {
          const root = el.shadowRoot || el;
          const track = root.querySelector('.bpb-track');
          if (track) track.scrollTo({ left: track.scrollWidth * ratio, behavior: 'instant' });
        },
        { el: host, ratio }
      );
    };
    await shot(steps[0]);
    await scrollTrack(0.3);
    await page.waitForTimeout(400);
    await shot(steps[1]);
    await page.waitForTimeout(300);
    await shot(steps[2]);
    await scrollTrack(0.7);
    await page.waitForTimeout(400);
    await shot(steps[3]);
    await scrollTrack(1);
    await page.waitForTimeout(400);
    await shot(steps[4]);
  },

  async 'beauty-weekly-planner'(page, host, shot) {
    const steps = [
      'عرض مخطّط الروتين الأسبوعي',
      'التبديل إلى عرض الصباح',
      'التبديل إلى عرض المساء',
      'استعراض مفتاح الخطوات',
      'مراجعة جدول الأسبوع كاملًا',
    ];
    await shot(steps[0]);
    await clickInHost(page, host, ['button', '[role="tab"]'], 0);
    await page.waitForTimeout(450);
    await shot(steps[1]);
    await clickInHost(page, host, ['button', '[role="tab"]'], 1);
    await page.waitForTimeout(450);
    await shot(steps[2]);
    await clickInHost(page, host, ['button', '[role="tab"]'], 2);
    await page.waitForTimeout(450);
    await shot(steps[3]);
    await clickInHost(page, host, ['button', '[role="tab"]'], 0);
    await page.waitForTimeout(450);
    await shot(steps[4]);
  },
};

async function captureComponent(page, name) {
  const card = page.locator(`.component-card[data-component="${name}"]`).first();
  await card.waitFor({ state: 'visible', timeout: 60000 });
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  const host = await getHost(card);
  if (!host) throw new Error(`No host for ${name}`);

  const frames = [];
  let stepIndex = 0;
  let totalSteps = 5;

  const shot = async (label) => {
    stepIndex += 1;
    await setStepBadge(card, label, stepIndex, totalSteps);
    await page.waitForTimeout(220);
    // Capture card (includes step badge + component)
    const buf = await card.screenshot({ type: 'png', animations: 'allow' });
    frames.push(fitToCanvas(buf));
  };

  const demo = DEMOS[name];
  if (demo) {
    // Pre-count by wrapping — we know demos use 5 shots
    totalSteps = 5;
    await demo(page, host, shot);
  } else {
    await shot('استعراض العنصر');
    for (let i = 0; i < 4; i++) {
      await clickInHost(page, host, ['button', '[role="button"]'], i % 3);
      await page.waitForTimeout(400);
      await shot(`تفاعل ${i + 2}`);
    }
  }

  if (frames.length < 3) throw new Error('Too few frames');
  return encodeGif(frames);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: W, height: H + 260 },
  deviceScaleFactor: 1,
});

console.log(thumbsOnly ? 'Mode: 6 Desktop thumbnails' : 'Mode: all element step GIFs');
console.log('Opening preview (no editor)...');
await page.goto(DEMO_URL, { waitUntil: 'networkidle', timeout: 120000 });
await page.waitForSelector('.component-card[data-component]', { timeout: 90000 });
await page.waitForTimeout(5000);

const results = [];
for (const name of COMPONENTS) {
  process.stdout.write(`${name}... `);
  try {
    const gif = await captureComponent(page, name);
    const outPath = path.join(OUT_DIR, `${name}.gif`);
    fs.writeFileSync(outPath, gif);

    if (THUMB_SIX.includes(name)) {
      const desk = path.join(DESKTOP_THUMBS, `${name}.gif`);
      fs.copyFileSync(outPath, desk);
    }

    console.log(`${(gif.length / 1024).toFixed(0)} KB`);
    results.push({ name, outPath, size: gif.length, ok: true });
  } catch (err) {
    console.log('FAIL', err.message);
    results.push({ name, ok: false, error: String(err.message || err) });
  }
}

// Ensure Desktop has exactly the 6 thumbs even if only some ran
if (!thumbsOnly) {
  for (const name of THUMB_SIX) {
    const src = path.join(OUT_DIR, `${name}.gif`);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(DESKTOP_THUMBS, `${name}.gif`));
  }
}

fs.writeFileSync(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(results, null, 2));
await browser.close();
console.log(`DONE ${results.filter((r) => r.ok).length}/${results.length}`);
console.log(`Desktop thumbs → ${DESKTOP_THUMBS}`);
