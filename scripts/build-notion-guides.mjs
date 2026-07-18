/**
 * Build Notion markdown content for each cosmetics element from twilight-bundle.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const bundle = JSON.parse(fs.readFileSync(path.join(ROOT, 'twilight-bundle.json'), 'utf8'));
const urlsPath = path.join(ROOT, 'notion-screenshots', 'gifs', 'urls.json');
const urls = fs.existsSync(urlsPath) ? JSON.parse(fs.readFileSync(urlsPath, 'utf8')) : {};

const CATEGORIES = {
  'beauty-shade-finder': 'اختيار ومطابقة',
  'beauty-fragrance-finder': 'اختيار ومطابقة',
  'beauty-color-harmony': 'اختيار ومطابقة',
  'beauty-care-assistant': 'اختيار ومطابقة',
  'beauty-routine-builder': 'روتين وعناية',
  'beauty-routine-layering-board': 'روتين وعناية',
  'beauty-weekly-planner': 'روتين وعناية',
  'beauty-face-zone-map': 'روتين وعناية',
  'beauty-ingredient-lab': 'مكونات وعلوم',
  'beauty-actives-compatibility': 'مكونات وعلوم',
  'beauty-texture-absorption-lab': 'مكونات وعلوم',
  'beauty-spf-guide': 'مكونات وعلوم',
  'beauty-pao-expiry-calculator': 'أدوات ذكية',
  'beauty-lighting-finish-simulator': 'عرض وتجربة',
  'beauty-collection-reveal': 'عرض وتجربة',
};

const IDEAS = {
  'beauty-shade-finder': {
    role: 'اختبار تفاعلي يساعد الزائرة على اكتشاف درجة المكياج المناسبة حسب نوع المنتج ودرجة البشرة والأندرتون واللمسة النهائية.',
    uses: ['تقليل التردد قبل شراء الفاونديشن أو الكونسيلر', 'تثقيف العميل حول الأندرتون', 'رفع ثقة الشراء داخل الصفحة'],
    tip: 'أضف درجات واضحة بأسماء مألوفة وصور قريبة من الواقع، واترك تلميح الأندرتون مختصرًا.',
  },
  'beauty-routine-builder': {
    role: 'يبني روتين عناية مقترحًا حسب نوع البشرة والمشكلة ووقت الاستخدام ومستوى الروتين.',
    uses: ['إرشاد المبتدئات لخطوات واضحة', 'عرض منتجات الروتين بشكل مرتب', 'تقليل أسئلة العناية المتكررة'],
    tip: 'اجعل أسئلة الروتين قصيرة، ورتّب الخطوات من التنظيف إلى الحماية.',
  },
  'beauty-ingredient-lab': {
    role: 'يعرض المكونات والقوام بشكل بصري تفاعلي لشرح فوائدها واستخدامها.',
    uses: ['تثقيف العميل حول المكونات', 'إبراز نقاط قوة التركيبة', 'تعزيز الثقة بالمنتج'],
    tip: 'استخدم صورًا نظيفة لكل مكوّن ونصوصًا قصيرة سهلة القراءة.',
  },
  'beauty-care-assistant': {
    role: 'محادثة إرشادية تقود الزائرة بأسئلة متسلسلة حتى توصية مناسبة.',
    uses: ['تجربة اختيار شخصية', 'توجيه سريع حسب الهدف', 'رفع التفاعل داخل الصفحة'],
    tip: 'ابدأ بسؤال واضح، وحدّد مسارًا قصيرًا (3–5 أسئلة) حتى النتيجة.',
  },
  'beauty-collection-reveal': {
    role: 'يكشف بطاقات المجموعة بأسلوب درامي جذاب بعد الضغط أو تلقائيًا.',
    uses: ['إطلاق مجموعة جديدة', 'حملة موسمية', 'إبراز قصص المنتجات'],
    tip: 'اختر صورة غلاف قوية ونص زر واضح مثل «اكشفي المجموعة».',
  },
  'beauty-face-zone-map': {
    role: 'خريطة تفاعلية لمناطق الوجه مع شرح ونصائح لكل منطقة.',
    uses: ['تعليم نقاط العناية', 'ربط كل منطقة بمنتجات مناسبة', 'تجربة بصرية راقية'],
    tip: 'ضع النقاط فوق المناطق الصحيحة وفعّل النبض بحذر حتى لا يشتت.',
  },
  'beauty-routine-layering-board': {
    role: 'يوضح ترتيب طبقات الروتين صباحًا ومساءً مع إمكانية التحقق أو السحب.',
    uses: ['تعليم ترتيب الاستخدام الصحيح', 'تقليل أخطاء الطبقة', 'تعزيز الالتزام بالروتين'],
    tip: 'اجعل كل طبقة بصورة واسم واضح، وفعّل التحقق لتجربة تعليمية ممتعة.',
  },
  'beauty-lighting-finish-simulator': {
    role: 'يحاكي مظهر المكياج تحت إضاءات مختلفة ومع لمسات نهائية متعددة.',
    uses: ['شرح الفرق بين النهار والليل', 'مساعدة اختيار اللمسة النهائية', 'تقليل خيبات الأمل بعد الشراء'],
    tip: 'وفّر صورتين على الأقل (نهار/مساء) وفعّل المقارنة إن أمكن.',
  },
  'beauty-pao-expiry-calculator': {
    role: 'يحسب تاريخ انتهاء الاستخدام بعد الفتح حسب مدة PAO مع تنبيهات توعوية.',
    uses: ['تثقيف حول صلاحية المنتجات', 'تقليل استخدام منتجات منتهية', 'خدمة ما بعد الشراء'],
    tip: 'أبقِ التنبيه التوعوي ظاهرًا وواضحًا، واضبط عتبة قرب الانتهاء.',
  },
  'beauty-texture-absorption-lab': {
    role: 'يقارن قوام المنتجات ومؤشرات الإحساس والامتصاص والانتشار.',
    uses: ['مساعدة اختيار القوام المناسب', 'شرح الفروق بين الجل والكريم والزيت', 'تجربة حسية بصرية'],
    tip: 'فعّل المقارنة بين قوامين لزيادة وضوح القرار.',
  },
  'beauty-actives-compatibility': {
    role: 'يدقّق توافق مكوّنين فعّالين ويعرض نتيجة: متوافقان / بحذر / غير مناسبين معًا.',
    uses: ['تقليل تهيج البشرة بسبب خلط خاطئ', 'تثقيف حول الترتيب الزمني', 'رفع مصداقية المتجر'],
    tip: 'أضف قواعد واضحة بين المكونات الشائعة (ريتينول، فيتامين C، AHA...).',
  },
  'beauty-fragrance-finder': {
    role: 'يستكشف عائلات العطور ونوتاتها (مقدمة/قلب/أساس) بأسلوب بصري.',
    uses: ['توجيه لعشاق العطور', 'شرح هرم النوتات', 'اكتشاف عائلة مناسبة'],
    tip: 'فعّل هرم النوتات واكتب أوصافًا حسية قصيرة لكل عائلة.',
  },
  'beauty-spf-guide': {
    role: 'يرشد لاختيار عامل الحماية المناسب حسب نوع البشرة والحالة والنشاط.',
    uses: ['تثقيف حول الحماية اليومية', 'اقتراح SPF مناسب', 'تعزيز ثقافة الوقاية'],
    tip: 'اربط كل نتيجة بنصيحة عملية عن إعادة التطبيق.',
  },
  'beauty-color-harmony': {
    role: 'عجلة تناسق ألوان تساعد على اقتراح ألوان الشفاه والعيون والخدود المتناسقة.',
    uses: ['إلهام لوكات مكياج', 'تسهيل اختيار الألوان', 'رفع متوسط قيمة الطلب'],
    tip: 'وفّر درجات كافية وفعّل أنواع التناسق التي تناسب هوية متجرك.',
  },
  'beauty-weekly-planner': {
    role: 'مخطّط أسبوعي لخطوات العناية صباحًا ومساءً مع مفتاح توضيحي.',
    uses: ['تنظيم روتين الأسبوع', 'تذكير بخطوات العلاج', 'تجربة التزام بصرية'],
    tip: 'اجعل الرموز والألوان متسقة، وأظهر التنبيه إن وُجدت خطوات حساسة.',
  },
};

function labelOf(field) {
  if (!field) return '';
  if (typeof field.label === 'string') return field.label;
  if (field.label && typeof field.label === 'object') return field.label.ar || field.label.en || '';
  return field.id || '';
}

function typeOf(field) {
  if (field.type === 'collection') return 'مجموعة';
  if (field.format === 'color' || field.inputType === 'color') return 'لون';
  if (field.format === 'switch' || field.type === 'boolean') return 'تبديل';
  if (field.format === 'dropdown-list' || field.format === 'items') return 'قائمة';
  if (field.format === 'image' || field.inputType === 'image') return 'صورة';
  if (field.type === 'number' || field.format === 'units') return 'رقم/وحدة';
  if (field.format === 'textarea') return 'نص طويل';
  if (field.format === 'text') return 'نص';
  return field.format || field.type || 'حقل';
}

function descOf(field) {
  const d = field.description;
  if (!d) {
    if (field.type === 'collection') return 'مجموعة عناصر قابلة للإضافة والترتيب';
    if (field.format === 'color') return 'لون عنصر الواجهة';
    if (field.format === 'switch') return 'تفعيل/إيقاف خيار العرض';
    return 'خيار قابل للتخصيص من محرر سلة';
  }
  if (typeof d === 'string') return d;
  return d.ar || d.en || 'خيار قابل للتخصيص من محرر سلة';
}

function sectionTitle(field) {
  if (field.type !== 'static' || field.format !== 'title') return null;
  const v = String(field.value || '');
  const m = v.match(/<h6[^>]*>([^<]+)<\/h6>/i) || v.match(/>([^<]{3,40})</);
  return m ? m[1].trim() : null;
}

function groupFields(fields) {
  const groups = [];
  let current = { title: 'محتوى العنصر', fields: [] };
  for (const f of fields || []) {
    const st = sectionTitle(f);
    if (st) {
      if (current.fields.length) groups.push(current);
      current = { title: st, fields: [] };
      continue;
    }
    if (!f?.id || f.type === 'static') continue;
    if (String(f.id).startsWith('static-')) continue;
    if (['notmrb', 'has_container', 'add_component_background_color', 'component_background_color'].includes(f.id)) {
      continue; // documented once globally
    }
    current.fields.push(f);
  }
  if (current.fields.length) groups.push(current);
  return groups;
}

function tableFor(fields) {
  const rows = fields
    .map((f) => {
      const label = labelOf(f).replace(/\|/g, '\\|');
      const type = typeOf(f).replace(/\|/g, '\\|');
      const desc = descOf(f).replace(/\|/g, '\\|').replace(/\n/g, ' ');
      return `<tr>\n<td>${label}</td>\n<td>${type}</td>\n<td>${desc}</td>\n</tr>`;
    })
    .join('\n');
  return `<table fit-page-width="true" header-row="true">
<tr>
<td>**الخيار**</td>
<td>**النوع**</td>
<td>**الشرح**</td>
</tr>
${rows}
</table>`;
}

function buildPage(comp) {
  const idea = IDEAS[comp.name] || {
    role: 'عنصر تفاعلي لتحسين تجربة متجر التجميل والعناية.',
    uses: ['تحسين تجربة العميل', 'دعم قرار الشراء', 'رفع التفاعل'],
    tip: 'ابدأ بالمحتوى ثم الألوان، واختبر على الجوال.',
  };
  const gif = urls[comp.name] || comp.image || '';
  const groups = groupFields(comp.fields);
  const settings = groups
    .map((g) => `### ${g.title}\n${tableFor(g.fields)}`)
    .join('\n');

  return {
    name: comp.name,
    title: `عنصر ${comp.title}`,
    category: CATEGORIES[comp.name] || 'عناصر التجميل',
    cover: gif,
    content: `${gif ? `![${comp.title}](${gif})` : ''}
# دليل استخدام عنصر ${comp.title}
${idea.role}
---
## وظيفة العنصر
${idea.uses.map((u) => `- ${u}`).join('\n')}
---
## كيفية الإضافة
1. لوحة سلة → **التصميم** → الصفحة المطلوبة → **إضافة عنصر**
2. اختر **${comp.title}**
3. رتّب موقعه ثم **احفظ**
---
## إعدادات العنصر
${settings}
### خيارات الحاوية والمظهر العام
<table fit-page-width="true" header-row="true">
<tr>
<td>**الخيار**</td>
<td>**النوع**</td>
<td>**الشرح**</td>
</tr>
<tr>
<td>إزالة المسافة السفلية</td>
<td>تبديل</td>
<td>يزيل المسافة السفلية أسفل العنصر</td>
</tr>
<tr>
<td>إضافة العنصر داخل حاوية (Container)</td>
<td>تبديل</td>
<td>يعرض العنصر داخل حاوية بعرض منسّق مع باقي الأقسام</td>
</tr>
<tr>
<td>إضافة لون خلفية للعنصر</td>
<td>تبديل</td>
<td>يفعّل اختيار لون خلفية كامل للعنصر</td>
</tr>
<tr>
<td>لون خلفية العنصر</td>
<td>لون</td>
<td>يظهر عند تفعيل خيار خلفية العنصر</td>
</tr>
</table>
---
## كيفية العمل
1. أضف العنصر في المكان المناسب من الصفحة.
2. املأ المحتوى والمجموعات أولًا.
3. اضبط الألوان والمسافات لتطابق هوية المتجر.
4. احفظ وراجع المعاينة على الجوال والكمبيوتر.
---
## أفضل الممارسات
- ابدأ بالمحتوى قبل الألوان.
- استخدم صورًا واضحة وبنفس الأسلوب البصري.
- اختبر الروابط والأزرار قبل النشر.
---
<callout icon="💡" color="yellow_bg">
	**نصيحة:** ${idea.tip}
</callout>
`,
  };
}

const pages = (bundle.components || []).map(buildPage);
const out = path.join(ROOT, 'notion-screenshots', 'notion-pages.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(pages, null, 2));
console.log('Wrote', pages.length, 'page payloads →', out);
