# Cosmetics & Care Storefront Elements

عناصر واجهة تفاعلية (Twilight Bundles) لمتاجر مستحضرات التجميل والعناية على منصة سلة.
عشرة عناصر مستقلة، كل عنصر بفكرة وتصميم وتجربة تفاعلية مختلفة، بدعم كامل للعربية واتجاه RTL،
وقابلة للتخصيص بالكامل من إعدادات التاجر، دون أي خدمات خارجية أو ذكاء اصطناعي.

## العناصر العشرة

| Tag (`salla-*`) | المجلد | الوصف |
| --- | --- | --- |
| `salla-beauty-shade-finder` | `beauty-shade-finder` | محدد درجة المكياج المناسبة عبر عينات ألوان تفاعلية |
| `salla-beauty-routine-builder` | `beauty-routine-builder` | منشئ روتين العناية عبر أسئلة متتابعة ينتج خطوات مرتبة |
| `salla-makeup-look-builder` | `makeup-look-builder` | منشئ إطلالة المكياج خطوة بخطوة مع ملخص وسعر إجمالي |
| `salla-beauty-ingredient-lab` | `beauty-ingredient-lab` | مختبر المكونات الفعّالة والقوام ببطاقات زجاجية |
| `salla-beauty-product-swipe` | `beauty-product-swipe` | سحب واكتشاف المنتجات (Like / Skip) مع نتيجة مقترحة |
| `salla-beauty-comparison-arena` | `beauty-comparison-arena` | ساحة مقارنة بصرية بين منتجين أو ثلاثة |
| `salla-beauty-care-assistant` | `beauty-care-assistant` | مساعد تفاعلي بنظام أسئلة متفرعة (شجرة قرار) |
| `salla-beauty-routine-duel` | `beauty-routine-duel` | مواجهة اختيارات متقابلة تنتهي بنتيجة |
| `salla-beauty-collection-reveal` | `beauty-collection-reveal` | كشف إبداعي عن المجموعة بستة أوضاع (حقيبة/صندوق/أدراج/بتلات/ستارة/منصة) |
| `salla-virtual-beauty-boutique` | `virtual-beauty-boutique` | متجر جمال افتراضي بنقاط تفاعلية على صورة مشهد |

تُسجَّل كل العناصر تلقائياً عبر `sallaTransformPlugin` باسم `salla-<اسم-المجلد>`.

## البنية

```
src/
  components/<name>/
    index.ts     # مكوّن LitElement (export default) — يقرأ الإعدادات من config
    styles.ts    # أنماط CSS الخاصة بالعنصر
    types.ts     # أنواع TypeScript
    utils.ts     # منطق تحليل الإعدادات وربط المنتجات
  utils/          # أدوات مشتركة (Salla API، بطاقة المنتج، الترجمة، الأنماط، إلخ)
scripts/
  generate_bundle.py           # يولّد twilight-bundle.json
  capture-element-screenshots.mjs
twilight-bundle.json           # إعدادات جميع العناصر (المصدر النهائي المعتمد)
```

## الأدوات المشتركة (`src/utils`)

- `sallaApi.ts` — استدعاءات Salla SDK بصمت (منتجات، تفاصيل، سلة، قائمة أمنيات).
- `productResolver.ts` — تحويل قيم منتقي المنتجات إلى بطاقات جاهزة مع جلب التفاصيل الناقصة.
- `productCard.ts` — بطاقة منتج موحّدة (صورة، خصم، سعر، تقييم، أمنيات، إضافة للسلة).
- `productPicker.ts` — قراءة مصادر المنتجات/التصنيفات وبناء خصائص `salla-products-slider`.
- `helpers.ts` — قراءة الثيم، الترجمة `t()`، الألوان، الأسعار، عملة المتجر، وغيرها.
- `localizedString.ts` — قراءة النصوص متعددة اللغات حسب لغة الصفحة.
- `sharedStyles.ts` — هيكل القسم المشترك ونقاط الكسر واحترام `prefers-reduced-motion`.

## التطوير والبناء

```bash
pnpm install
pnpm dev        # بيئة معاينة مع بيانات افتراضية من twilight-bundle.json
pnpm build      # ينتج ملفات dist/ لكل عنصر
pnpm typecheck  # فحص TypeScript
```

## توليد إعدادات العناصر

`twilight-bundle.json` هو المصدر المعتمد وهو موجود في المستودع جاهزاً. لإعادة توليده:

```bash
python3 scripts/generate_bundle.py
```

خمسة عناصر (`makeup-look-builder`، `beauty-product-swipe`، `beauty-comparison-arena`،
`beauty-routine-duel`، `virtual-beauty-boutique`) تشترك في نفس كود المشروع المرجعي للأزياء،
لذا يقرأ المولّد مخطط حقولها من الحزمة الشقيقة `tw-fashion-style-storefront-elements`
ويكيّف نصوصها للتجميل. باقي العناصر تُبنى داخل المولّد مباشرةً. (إعادة التوليد اختيارية فقط.)

## ملاحظات تقنية

- دعم كامل لـ RTL/LTR باستخدام CSS Logical Properties.
- تنظيف مستمعي الأحداث في `disconnectedCallback` واحترام تقليل الحركة.
- حالات فارغة واضحة عند غياب المنتجات أو الصور، دون كسر العنصر.
- الأسعار والصور وروابط المنتجات تأتي من Salla SDK عبر منتقي المنتجات.
- لا توجد مكتبات خارجية سوى `lit`.

## License

MIT
