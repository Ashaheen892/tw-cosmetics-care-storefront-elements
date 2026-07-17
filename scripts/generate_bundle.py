# -*- coding: utf-8 -*-
"""Generate twilight-bundle.json for the cosmetics & care storefront elements.

All 15 components are cosmetics-native, product-free interactive/educational
tools built here with field ids that match exactly what each component reads
from `config`. Every component is prepended with the standard Salla element
editor controls (notmrb / has_container / background) for parity with the
default element editor.
"""
import json
import uuid
from copy import deepcopy
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BUNDLE_PATH = ROOT / "twilight-bundle.json"

PLACEHOLDER = "https://cdn.salla.network/images/themes/default/placeholder.jpg"


def unsplash(pid, w=900):
    """Real hosted default image (same convention as the reference fashion bundle)."""
    return f"https://images.unsplash.com/photo-{pid}?auto=format&fit=crop&w={w}&q=80"


# Verified beauty/cosmetics preview images (one per component, shown in the Salla editor).
PREVIEW_IMAGES = {
    "beauty-shade-finder": "1596462502278-27bfdc403348",
    "beauty-routine-builder": "1556228578-8c89e6adf883",
    "beauty-ingredient-lab": "1620916566398-39f1143ab7be",
    "beauty-care-assistant": "1487412720507-e7ab37603c6f",
    "beauty-collection-reveal": "1598440947619-2c35fc9aa908",
    "beauty-face-zone-map": "1570172619644-dfd03ed5d881",
    "beauty-routine-layering-board": "1556228578-8c89e6adf883",
    "beauty-lighting-finish-simulator": "1526080676457-4544bf0ebba9",
    "beauty-pao-expiry-calculator": "1608248543803-ba4f8c70ae0b",
    "beauty-texture-absorption-lab": "1512207736890-6ffed8a84e8d",
    "beauty-actives-compatibility": "1620916566398-39f1143ab7be",
    "beauty-fragrance-finder": "1541643600914-78b084683601",
    "beauty-spf-guide": "1556228578-8c89e6adf883",
    "beauty-color-harmony": "1522335789203-aabd1fc54bc9",
    "beauty-weekly-planner": "1506784983877-45594efa4cbe",
}

# Content images for the image-dependent components so they render fully out of the box.
FACE_IMAGE = unsplash("1512496015851-a90fb38ba796", 800)
LIGHT_IMAGES = {
    "daylight": unsplash("1526080676457-4544bf0ebba9", 800),
    "warm": unsplash("1503104834685-7205e8607eb9", 800),
    "cool": unsplash("1487412947147-5cebf100ffc2", 800),
    "evening": unsplash("1487412720507-e7ab37603c6f", 800),
}


def apply_preview_images(components):
    for c in components:
        pid = PREVIEW_IMAGES.get(c["name"])
        if pid:
            url = unsplash(pid)
            c["image"] = url
            c["preview_image"] = url


def u():
    return str(uuid.uuid4())


# ---------------------------------------------------------------------------
# Shared field builders (aligned with the fashion generator conventions)
# ---------------------------------------------------------------------------

LINK_SOURCES = [
    {"label": "منتج", "key": "products", "value": "products"},
    {"label": "تصنيف", "key": "categories", "value": "categories"},
    {"label": "ماركة تجارية", "key": "brands", "value": "brands"},
    {"label": "صفحة تعريفية", "key": "pages", "value": "pages"},
    {"label": "مقالة", "key": "blog_articles", "value": "blog_articles"},
    {"label": "التخفيضات", "key": "offers_link", "value": "offers_link"},
    {"label": "رابط خارجي", "key": "custom", "value": "custom"},
]


def cond_eq(field_id, value):
    return [{"id": field_id, "value": value, "operation": "="}]


def with_conditions(field, conditions=None):
    if conditions:
        field["conditions"] = conditions
    return field


def static_title(fid, title, conditions=None):
    return with_conditions(
        {
            "type": "static",
            "format": "title",
            "id": fid,
            "value": (
                "<div style='background: linear-gradient(135deg, #fdeef5 0%, #f6e0ec 100%); "
                "border-inline-start: 4px solid #c2527f; border-radius: 12px; "
                "padding: 13px 16px; margin-bottom: 18px !important; display: flex; "
                "align-items: center; gap: 10px;'>"
                "<span style='width: 8px; height: 8px; border-radius: 50%; background: #c2527f; "
                "box-shadow: 0 0 0 4px rgba(194,82,127,0.16); flex: 0 0 auto;'></span>"
                "<h6 style='color: #7b2c52; font-size: 14px; font-weight: 800; margin: 0; "
                f"letter-spacing: 0.2px;'>{title}</h6> </div>"
            ),
            "key": u(),
        },
        conditions,
    )


def multilang(fid, label, ar, en, fmt="text", max_len="160", desc=None, conditions=None):
    return with_conditions(
        {
            "id": fid,
            "key": u(),
            "type": "string",
            "format": fmt,
            "label": label,
            "description": desc,
            "labelHTML": None,
            "placeholder": label,
            "icon": "sicon-format-text-alt",
            "value": {"ar": ar, "en": en},
            "multilanguage": True,
            "required": False,
            "minLength": 0,
            "maxLength": max_len,
        },
        conditions,
    )


def text(fid, label, value="", fmt="text", max_len="200", desc=None,
         icon="sicon-format-text-alt", conditions=None):
    return with_conditions(
        {
            "id": fid,
            "key": u(),
            "type": "string",
            "format": fmt,
            "label": label,
            "description": desc,
            "labelHTML": None,
            "placeholder": label,
            "icon": icon,
            "value": value,
            "required": False,
            "minLength": 0,
            "maxLength": max_len,
        },
        conditions,
    )


def image(fid, label, value="", desc=None, conditions=None):
    return with_conditions(
        {
            "id": fid,
            "key": u(),
            "type": "string",
            "format": "image",
            "label": label,
            "description": desc,
            "labelHTML": None,
            "placeholder": "e.g. https://hostname.com/image.png",
            "icon": "sicon-image",
            "value": value,
            "required": False,
        },
        conditions,
    )


def color(fid, label, value, desc=None, conditions=None):
    return with_conditions(
        {
            "id": fid,
            "key": u(),
            "type": "string",
            "format": "color",
            "inputType": "color",
            "label": label,
            "description": desc,
            "labelHTML": None,
            "icon": "sicon-format-fill",
            "value": value,
            "required": False,
        },
        conditions,
    )


def number(fid, label, value, minimum=0, maximum=500, unit="px", desc=None, conditions=None):
    return with_conditions(
        {
            "id": fid,
            "class": "rounded-lg text-primary border hover:bg-gray-50 p-2",
            "key": u(),
            "type": "number",
            "format": "units",
            "label": label,
            "description": desc,
            "labelHTML": None,
            "placeholder": str(value),
            "icon": "sicon-percentage",
            "value": value,
            "required": False,
            "unit": unit,
            "minimum": minimum,
            "maximum": str(maximum),
        },
        conditions,
    )


def boolean(fid, label, value=True, desc=None, conditions=None):
    return with_conditions(
        {
            "id": fid,
            "key": u(),
            "type": "boolean",
            "format": "switch",
            "label": label,
            "description": desc,
            "labelHTML": None,
            "icon": "sicon-toggle-off",
            "value": value,
            "selected": bool(value),
            "required": False,
        },
        conditions,
    )


def variable_list(fid, label="الرابط", conditions=None):
    return with_conditions(
        {
            "type": "items",
            "icon": "sicon-link",
            "label": label,
            "id": fid,
            "value": None,
            "description": None,
            "required": False,
            "format": "variable-list",
            "searchable": True,
            "source": "offers_link",
            "sources": deepcopy(LINK_SOURCES),
            "key": u(),
        },
        conditions,
    )


def dropdown_manual(fid, label, options, selected_value, *, icon="sicon-keyboard_arrow_down",
                    multichoice=False, desc=None, conditions=None):
    opts = [{"key": val, "label": lbl, "value": val} for lbl, val in options]
    selected = next((o for o in opts if o["value"] == selected_value), opts[0])
    return with_conditions(
        {
            "id": fid,
            "icon": icon,
            "type": "items",
            "label": label,
            "format": "dropdown-list",
            "source": "Manual",
            "options": opts,
            "required": False,
            "selected": [selected],
            "description": desc,
            "multichoice": multichoice,
            "key": u(),
        },
        conditions,
    )


def collection(fid, label, fields, value, min_len=0, max_len=60, required=False, conditions=None):
    return with_conditions(
        {
            "id": fid,
            "type": "collection",
            "format": "collection",
            "required": required,
            "minLength": min_len,
            "maxLength": max_len,
            "item_label": label,
            "value": value,
            "fields": fields,
            "key": u(),
            "label": label,
        },
        conditions,
    )


def theme_fields(p, *, accent="#c2527f", bg="#fbf5f8", card="#ffffff"):
    return [
        static_title(f"{p}theme_title", "ألوان وتنسيق العنصر"),
        color(f"{p}bg", "لون الخلفية", bg),
        color(f"{p}text", "لون النص", "#33232e"),
        color(f"{p}muted", "لون النص الثانوي", "#8f7a86"),
        color(f"{p}accent", "اللون الرئيسي", accent),
        color(f"{p}card", "لون البطاقات", card),
        color(f"{p}border", "لون الحدود", "#f2dde7"),
        color(f"{p}button_bg", "خلفية الأزرار", accent),
        color(f"{p}button_color", "لون نص الأزرار", "#ffffff"),
        number(f"{p}radius", "تدوير الحواف", 20, 0, 40, "px"),
        boolean(f"{p}animate", "تفعيل الحركات والانتقالات", True,
                "يتوقف تلقائياً عند تفعيل خيار تقليل الحركة في الجهاز."),
        static_title(f"{p}space_title", "المسافة الخارجية أعلى وأسفل"),
        number(f"{p}space_desktop", "الكمبيوتر", 48, 0, 250, "px"),
        number(f"{p}space_mobile", "الجوال", 28, 0, 120, "px"),
    ]


def editor_controls():
    """Standard Salla element editor controls, mirroring the default element
    editor used across native storefront elements (notmrb / container /
    background). Prepended to every component so merchants get the exact same
    top-of-editor experience they expect from built-in elements."""
    return [
        boolean(
            "notmrb", "إزالة المسافة السفلية", False,
            "فعّل هذا الخيار لإزالة المسافة السفلية أسفل العنصر.",
        ),
        boolean(
            "has_container", "إضافة العنصر داخل حاوية (Container)", True,
            "فعّل هذا الخيار لعرض العنصر داخل حاوية منظّمة بعرض الصفحة مع باقي الأقسام.",
        ),
        boolean(
            "add_component_background_color", "إضافة لون خلفية للعنصر", False,
            "فعّل هذا الخيار لتخصيص لون خلفية كامل للعنصر.",
        ),
        color(
            "component_background_color", "لون خلفية العنصر", "#FCF5F0",
            "اختر لونًا مناسبًا يتناسق مع هوية متجرك.",
            conditions=cond_eq("add_component_background_color", True),
        ),
    ]


def prepend_editor_controls(components):
    for c in components:
        existing = {f.get("id") for f in c.get("fields", [])}
        if "notmrb" in existing:
            continue
        c["fields"] = editor_controls() + c["fields"]


def component(name, title, icon, fields, image_url=PLACEHOLDER):
    return {
        "key": u(),
        "name": name,
        "title": title,
        "icon": icon,
        "image": image_url,
        "preview_image": image_url,
        "fields": fields,
    }


# ---------------------------------------------------------------------------
# Fixed option sets (values must match component enums)
# ---------------------------------------------------------------------------

ANY_AR = "الكل — يناسب الجميع"

SKIN_OPTS = [(ANY_AR, ""), ("فاتحة جدًا", "very_fair"), ("فاتحة", "fair"),
             ("متوسطة", "medium"), ("حنطية", "tan"), ("سمراء", "deep"), ("داكنة", "dark")]
UNDERTONE_OPTS = [(ANY_AR, ""), ("دافئ", "warm"), ("بارد", "cool"),
                  ("محايد", "neutral"), ("زيتوني", "olive")]
RESULT_OPTS = [(ANY_AR, ""), ("طبيعية", "natural"), ("مشرقة", "radiant"), ("مطفية", "matte"),
               ("تغطية خفيفة", "light"), ("تغطية متوسطة", "medium_cov"), ("تغطية عالية", "full_cov")]
PRODUCT_TYPE_OPTS = [(ANY_AR, ""), ("كريم أساس", "foundation"), ("كونسيلر", "concealer"),
                     ("بلاشر", "blush"), ("أحمر شفاه", "lipstick"), ("كونتور", "contour"),
                     ("بودرة", "powder")]

SKIN_TYPE_OPTS = [(ANY_AR, ""), ("جافة", "dry"), ("دهنية", "oily"), ("مختلطة", "combination"),
                  ("عادية", "normal"), ("حساسة", "sensitive")]
CONCERN_OPTS = [(ANY_AR, ""), ("الجفاف", "dryness"), ("الحبوب", "acne"), ("التصبغات", "pigmentation"),
                ("المسام", "pores"), ("البهتان", "dullness"), ("الخطوط الدقيقة", "fine_lines")]
TIME_OPTS = [(ANY_AR, ""), ("صباحي", "morning"), ("مسائي", "evening"), ("صباحي ومسائي", "both")]
LEVEL_OPTS = [("روتين سريع", "quick"), ("روتين أساسي", "basic"), ("روتين متكامل", "complete")]
TEXTURE_OPTS = [("سيروم", "serum"), ("جل", "gel"), ("كريم", "cream"), ("زيت", "oil"),
                ("رغوة", "foam"), ("بلسم", "balm"), ("بودرة", "powder"), ("رذاذ", "spray")]


# ---------------------------------------------------------------------------
# Fresh component builders
# ---------------------------------------------------------------------------

def build_shade_finder():
    p = "bsf_"
    shade_fields = [
        text(f"{p}shades.shade_name", "اسم الدرجة", "N120 عاجي"),
        text(f"{p}shades.shade_number", "رقم الدرجة", "120"),
        color(f"{p}shades.hex", "كود اللون HEX", "#e8c4a0"),
        multilang(f"{p}shades.desc", "وصف الدرجة (اختياري)", "", "", "textarea", "260"),
        variable_list(f"{p}shades.link", "رابط صفحة أو دليل (اختياري)"),
        dropdown_manual(f"{p}shades.product_type", "نوع المنتج", PRODUCT_TYPE_OPTS, ""),
        dropdown_manual(f"{p}shades.skin", "درجة البشرة المناسبة", SKIN_OPTS, ""),
        dropdown_manual(f"{p}shades.undertone", "الأندرتون المناسب", UNDERTONE_OPTS, ""),
        dropdown_manual(f"{p}shades.result", "النتيجة المناسبة", RESULT_OPTS, ""),
    ]
    sample = [
        {"shade_name": "درجة عاجية", "shade_number": "120", "hex": "#f0d3b4"},
        {"shade_name": "درجة رملية", "shade_number": "220", "hex": "#e0b487"},
        {"shade_name": "درجة كراميل", "shade_number": "320", "hex": "#c8975f"},
        {"shade_name": "درجة عسلية", "shade_number": "420", "hex": "#a9743f"},
    ]
    return component(
        "beauty-shade-finder", "محدد درجة المكياج المناسبة", "sicon-format-fill",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "محدد درجتك المثالية",
                      "Find your perfect shade"),
            multilang(f"{p}desc", "الوصف",
                      "أجيبي عن الأسئلة لنقترح لكِ الدرجات الأنسب لبشرتك.",
                      "Answer a few questions and we will suggest the best shades for you.",
                      "textarea", "300"),
            multilang(f"{p}step_type_label", "عنوان خطوة نوع المنتج", "نوع المنتج", "Product type"),
            multilang(f"{p}step_skin_label", "عنوان خطوة درجة البشرة", "درجة لون البشرة", "Skin depth"),
            multilang(f"{p}step_undertone_label", "عنوان خطوة الأندرتون", "الأندرتون", "Undertone"),
            multilang(f"{p}step_result_label", "عنوان خطوة النتيجة", "النتيجة المطلوبة", "Desired finish"),
            multilang(f"{p}reset_btn", "نص زر إعادة التحديد", "إعادة التحديد", "Reset choices"),
            static_title(f"{p}shades_title", "درجات المكياج"),
            collection(f"{p}shades", "درجة", shade_fields, sample),
            static_title(f"{p}display_title", "خيارات العرض"),
            dropdown_manual(f"{p}swatch_shape", "شكل عينات الألوان",
                            [("دائري", "circle"), ("مربع", "square"), ("مدور الحواف", "rounded")], "circle"),
            boolean(f"{p}show_link", "إظهار رابط الدرجة إن وُجد", True),
            *theme_fields(p),
        ],
    )


def build_routine_builder():
    p = "brb_"
    step_fields = [
        multilang(f"{p}steps.step_name", "اسم الخطوة", "المنظف", "Cleanser"),
        multilang(f"{p}steps.step_desc", "وصف مختصر", "", "", "textarea", "260"),
        image(f"{p}steps.image", "صورة توضيحية (اختياري)"),
        variable_list(f"{p}steps.link", "رابط دليل أو صفحة (اختياري)"),
        number(f"{p}steps.order", "ترتيب الخطوة", 1, 1, 30, ""),
        dropdown_manual(f"{p}steps.level", "تظهر في روتين", LEVEL_OPTS, "quick",
                        desc="سريع = أساسية فقط، متكامل = كل الخطوات"),
        dropdown_manual(f"{p}steps.skin", "نوع البشرة المناسب", SKIN_TYPE_OPTS, ""),
        dropdown_manual(f"{p}steps.concern", "المشكلة المناسبة", CONCERN_OPTS, ""),
        dropdown_manual(f"{p}steps.time", "وقت الاستخدام", TIME_OPTS, ""),
    ]
    sample = [
        {"step_name": {"ar": "المنظف", "en": "Cleanser"}, "step_desc": {"ar": "ينظّف البشرة بلطف ويهيئها.", "en": ""}, "order": 1, "level": {"selected": [{"key": "quick", "label": "روتين سريع", "value": "quick"}]}},
        {"step_name": {"ar": "التونر", "en": "Toner"}, "step_desc": {"ar": "يوازن البشرة بعد التنظيف.", "en": ""}, "order": 2, "level": {"selected": [{"key": "basic", "label": "روتين أساسي", "value": "basic"}]}},
        {"step_name": {"ar": "السيروم", "en": "Serum"}, "step_desc": {"ar": "علاج مركّز حسب حاجة بشرتك.", "en": ""}, "order": 3, "level": {"selected": [{"key": "basic", "label": "روتين أساسي", "value": "basic"}]}},
        {"step_name": {"ar": "المرطب", "en": "Moisturizer"}, "step_desc": {"ar": "يرطّب ويحبس الترطيب.", "en": ""}, "order": 4, "level": {"selected": [{"key": "quick", "label": "روتين سريع", "value": "quick"}]}},
        {"step_name": {"ar": "واقي الشمس", "en": "Sunscreen"}, "step_desc": {"ar": "حماية يومية ضرورية صباحاً.", "en": ""}, "order": 5, "level": {"selected": [{"key": "quick", "label": "روتين سريع", "value": "quick"}]}, "time": {"selected": [{"key": "morning", "label": "صباحي", "value": "morning"}]}},
        {"step_name": {"ar": "كريم العين", "en": "Eye cream"}, "step_desc": {"ar": "يعتني بمنطقة العين الدقيقة.", "en": ""}, "order": 6, "level": {"selected": [{"key": "complete", "label": "روتين متكامل", "value": "complete"}]}},
    ]
    return component(
        "beauty-routine-builder", "منشئ روتين العناية", "sicon-list",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "ابني روتين عنايتك", "Build your care routine"),
            multilang(f"{p}desc", "الوصف",
                      "أجيبي عن الأسئلة وسنرتّب لكِ خطوات الروتين المناسبة.",
                      "Answer the questions and we will arrange the right routine steps for you.",
                      "textarea", "300"),
            multilang(f"{p}q_skin_label", "عنوان سؤال نوع البشرة", "نوع البشرة", "Skin type"),
            multilang(f"{p}q_concern_label", "عنوان سؤال المشكلة", "المشكلة الأساسية", "Main concern"),
            multilang(f"{p}q_time_label", "عنوان سؤال وقت الاستخدام", "وقت الاستخدام", "Usage time"),
            multilang(f"{p}q_routine_label", "عنوان سؤال نوع الروتين", "نوع الروتين", "Routine type"),
            multilang(f"{p}result_title", "عنوان النتيجة", "روتينك المقترح", "Your suggested routine"),
            multilang(f"{p}reset_btn", "نص زر إعادة الاختيار", "إعادة الاختيار", "Start over"),
            static_title(f"{p}steps_title", "خطوات الروتين"),
            collection(f"{p}steps", "خطوة", step_fields, sample),
            static_title(f"{p}display_title", "خيارات العرض"),
            image(f"{p}bg_image", "صورة خلفية اختيارية"),
            dropdown_manual(f"{p}card_shape", "شكل البطاقات",
                            [("ناعم", "soft"), ("حواف حادة", "sharp"), ("حواف دائرية", "pill")], "soft"),
            boolean(f"{p}show_link", "إظهار روابط الخطوات إن وُجدت", True),
            *theme_fields(p),
        ],
    )


def build_ingredient_lab():
    p = "bil_"
    ing_fields = [
        multilang(f"{p}ingredients.name", "اسم المكوّن", "حمض الهيالورونيك", "Hyaluronic acid"),
        image(f"{p}ingredients.image", "صورة أو أيقونة"),
        color(f"{p}ingredients.color", "لون المكوّن", "#6c8ea8"),
        multilang(f"{p}ingredients.desc", "وصف مختصر", "", "", "textarea", "300"),
        text(f"{p}ingredients.benefits", "الفوائد (افصلي بينها بفاصلة)",
             "ترطيب عميق, نضارة, ملء البشرة", "textarea", "400"),
        text(f"{p}ingredients.skin_types", "أنواع البشرة المناسبة (افصلي بفاصلة)",
             "جافة, عادية, حساسة"),
        text(f"{p}ingredients.usage_time", "وقت الاستخدام", "صباحاً ومساءً"),
        text(f"{p}ingredients.note", "ملاحظات أو تنبيهات", "", "textarea", "300"),
        dropdown_manual(f"{p}ingredients.texture", "القوام", TEXTURE_OPTS, "serum"),
        variable_list(f"{p}ingredients.link", "رابط دليل أو مقال (اختياري)"),
    ]
    sample = [
        {"name": {"ar": "حمض الهيالورونيك", "en": "Hyaluronic acid"}, "color": "#6c8ea8",
         "desc": {"ar": "يجذب الترطيب ويمنح البشرة نضارة وامتلاءً.", "en": ""},
         "benefits": "ترطيب عميق, نضارة, ملء الخطوط",
         "skin_types": "جافة, عادية, حساسة", "usage_time": "صباحاً ومساءً",
         "texture": {"selected": [{"key": "serum", "label": "سيروم", "value": "serum"}]}},
        {"name": {"ar": "النياسيناميد", "en": "Niacinamide"}, "color": "#c9a24b",
         "desc": {"ar": "يوحّد لون البشرة ويقلّل ظهور المسام.", "en": ""},
         "benefits": "توحيد اللون, تقليل المسام, تنظيم الدهون",
         "skin_types": "دهنية, مختلطة", "usage_time": "صباحاً ومساءً",
         "texture": {"selected": [{"key": "gel", "label": "جل", "value": "gel"}]}},
        {"name": {"ar": "فيتامين C", "en": "Vitamin C"}, "color": "#e08a3c",
         "desc": {"ar": "مضاد أكسدة يمنح إشراقة ويقلّل التصبغات.", "en": ""},
         "benefits": "إشراقة, مقاومة التصبغات, حماية",
         "skin_types": "جميع أنواع البشرة", "usage_time": "صباحاً",
         "texture": {"selected": [{"key": "cream", "label": "كريم", "value": "cream"}]}},
        {"name": {"ar": "الريتينول", "en": "Retinol"}, "color": "#b06a8a",
         "desc": {"ar": "يجدّد البشرة ويقلّل الخطوط الدقيقة.", "en": ""},
         "benefits": "تجديد, مقاومة التجاعيد, نعومة",
         "skin_types": "عادية, دهنية", "usage_time": "مساءً",
         "note": {"ar": "استخدمي واقي الشمس نهاراً عند استعماله.", "en": ""},
         "texture": {"selected": [{"key": "oil", "label": "زيت", "value": "oil"}]}},
    ]
    return component(
        "beauty-ingredient-lab", "مختبر المكونات والقوام", "sicon-star2",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "مختبر المكونات الفعّالة", "Active ingredient lab"),
            multilang(f"{p}desc", "الوصف",
                      "اكتشفي المكونات الفعّالة وفوائدها وأنسب أنواع البشرة لها.",
                      "Explore active ingredients, their benefits and the skin types they suit.",
                      "textarea", "300"),
            static_title(f"{p}ingredients_title", "المكونات الفعّالة"),
            collection(f"{p}ingredients", "مكوّن", ing_fields, sample),
            static_title(f"{p}display_title", "خيارات العرض"),
            boolean(f"{p}bubbles", "تأثير الفقاعات المتحركة", True),
            boolean(f"{p}show_link", "إظهار رابط المكوّن إن وُجد", True),
            *theme_fields(p),
        ],
    )


def build_care_assistant():
    p = "bca_"
    answer_fields = [
        multilang(f"{p}questions.answers.label", "نص الإجابة", "بشرة جافة", "Dry skin"),
        image(f"{p}questions.answers.image", "أيقونة أو صورة (اختياري)"),
        text(f"{p}questions.answers.next", "مفتاح السؤال التالي",
             "", desc="اتركيه فارغاً لعرض النتيجة النهائية مباشرة"),
        multilang(f"{p}questions.answers.result_title", "عنوان النتيجة", "", "", "text", "160"),
        multilang(f"{p}questions.answers.result_desc", "وصف النتيجة", "", "", "textarea", "300"),
        variable_list(f"{p}questions.answers.link", "رابط النتيجة (اختياري)"),
        multilang(f"{p}questions.answers.link_text", "نص زر الرابط", "انتقلي إلى النتيجة", "Go to result"),
    ]
    question_fields = [
        text(f"{p}questions.q_key", "مفتاح السؤال (فريد)", "start"),
        multilang(f"{p}questions.q_text", "نص السؤال", "ما نوع بشرتك؟", "What is your skin type?"),
        image(f"{p}questions.q_image", "صورة السؤال (اختياري)"),
        collection(f"{p}questions.answers", "إجابة", answer_fields, []),
    ]
    sample = [
        {"q_key": "start", "q_text": {"ar": "ما الذي تبحثين عنه اليوم؟", "en": "What are you looking for today?"},
         "answers": [
             {"label": {"ar": "عناية بالبشرة", "en": "Skincare"}, "next": "skin"},
             {"label": {"ar": "مكياج", "en": "Makeup"}, "next": "makeup"},
         ]},
        {"q_key": "skin", "q_text": {"ar": "ما نوع بشرتك؟", "en": "What is your skin type?"},
         "answers": [
             {"label": {"ar": "جافة", "en": "Dry"},
              "result_title": {"ar": "روتين ترطيب مكثّف", "en": "Deep hydration routine"},
              "result_desc": {"ar": "منتجات غنية بالترطيب لبشرتك الجافة.", "en": ""}},
             {"label": {"ar": "دهنية", "en": "Oily"},
              "result_title": {"ar": "روتين متوازن خفيف", "en": "Balanced lightweight routine"},
              "result_desc": {"ar": "منتجات خفيفة تنظّم الدهون.", "en": ""}},
         ]},
        {"q_key": "makeup", "q_text": {"ar": "ما النتيجة التي تفضّلينها؟", "en": "Which finish do you prefer?"},
         "answers": [
             {"label": {"ar": "طبيعية", "en": "Natural"},
              "result_title": {"ar": "إطلالة طبيعية", "en": "Natural look"},
              "result_desc": {"ar": "منتجات بتغطية خفيفة ولمسة طبيعية.", "en": ""}},
             {"label": {"ar": "تغطية عالية", "en": "Full coverage"},
              "result_title": {"ar": "إطلالة تغطية كاملة", "en": "Full coverage look"},
              "result_desc": {"ar": "منتجات بتغطية عالية وثبات طويل.", "en": ""}},
         ]},
    ]
    return component(
        "beauty-care-assistant", "مساعد اختيار منتجات الجمال", "sicon-list",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "مساعدتك لاختيار الأنسب", "Your beauty assistant"),
            multilang(f"{p}desc", "الوصف",
                      "أجيبي عن أسئلة بسيطة لنرشدك إلى الروتين أو النصيحة المناسبة.",
                      "Answer a few simple questions to get the right routine or advice.",
                      "textarea", "300"),
            text(f"{p}assistant_name", "اسم المساعدة", "خبيرة الجمال"),
            image(f"{p}avatar", "صورة المساعدة (اختياري)"),
            text(f"{p}start_key", "مفتاح سؤال البداية", "start",
                 desc="اتركيه فارغاً لبدء المساعد من أول سؤال"),
            static_title(f"{p}questions_title", "الأسئلة والإجابات المتفرعة"),
            collection(f"{p}questions", "سؤال", question_fields, sample),
            static_title(f"{p}display_title", "خيارات العرض"),
            dropdown_manual(f"{p}style", "شكل المساعد",
                            [("نافذة محادثة", "chat"), ("خبيرة تجميل افتراضية", "expert"),
                             ("مرآة ذكية", "mirror"), ("بطاقات أسئلة", "cards")], "chat"),
            multilang(f"{p}result_btn", "نص زر النتيجة الافتراضي", "انتقلي إلى النتيجة", "Go to result"),
            multilang(f"{p}restart_btn", "نص زر إعادة البدء", "إعادة البدء", "Start over"),
            *theme_fields(p),
        ],
    )


def build_collection_reveal():
    p = "bcr_"
    item_fields = [
        multilang(f"{p}items.title", "عنوان البطاقة", "الخطوة الأولى", "First step"),
        multilang(f"{p}items.subtitle", "وصف مختصر", "", "", "textarea", "260"),
        image(f"{p}items.image", "صورة البطاقة"),
        text(f"{p}items.tag", "وسم مختصر (اختياري)", ""),
        variable_list(f"{p}items.link", "رابط صفحة أو مقال (اختياري)"),
    ]
    item_sample = [
        {"title": {"ar": "التنظيف", "en": "Cleanse"},
         "subtitle": {"ar": "ابدئي بتنظيف لطيف يهيّئ البشرة.", "en": ""}, "tag": "خطوة 1"},
        {"title": {"ar": "الترطيب", "en": "Hydrate"},
         "subtitle": {"ar": "طبقة ترطيب خفيفة تمنح النعومة.", "en": ""}, "tag": "خطوة 2"},
        {"title": {"ar": "الحماية", "en": "Protect"},
         "subtitle": {"ar": "اختمي روتينك بحماية يومية.", "en": ""}, "tag": "خطوة 3"},
        {"title": {"ar": "اللمسة النهائية", "en": "Finish"},
         "subtitle": {"ar": "إطلالة مشرقة تدوم طوال اليوم.", "en": ""}, "tag": "خطوة 4"},
    ]
    return component(
        "beauty-collection-reveal", "الكشف الإبداعي عن المجموعة", "sicon-image",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "مجموعتنا الجديدة", "Our new collection"),
            multilang(f"{p}desc", "الوصف",
                      "اكشفي عن المجموعة بطريقة تفاعلية مميزة.",
                      "Reveal the collection in a delightful interactive way.", "textarea", "260"),
            multilang(f"{p}cover_title", "نص الغلاف", "المجموعة بانتظارك", "The collection awaits"),
            multilang(f"{p}reveal_btn", "نص زر الكشف", "اكشفي المجموعة", "Reveal collection"),
            image(f"{p}cover_image", "صورة الغلاف أو الصندوق أو الحقيبة"),
            static_title(f"{p}items_title", "بطاقات المجموعة"),
            collection(f"{p}items", "بطاقة", item_fields, item_sample),
            static_title(f"{p}display_title", "خيارات العرض والحركة"),
            dropdown_manual(f"{p}mode", "وضع الكشف",
                            [("حقيبة مكياج تفتح", "bag"), ("صندوق هدايا فاخر", "box"),
                             ("أدراج طاولة تجميل", "drawers"), ("بتلات زهرة تتفتح", "petals"),
                             ("ستارة حريرية تنسحب", "curtain"), ("منصة دائرية", "carousel")], "box"),
            number(f"{p}speed", "سرعة ظهور البطاقات (مللي ثانية بين كل بطاقة)", 140, 0, 600, ""),
            boolean(f"{p}auto_start", "بدء الكشف تلقائياً عند الظهور", False),
            boolean(f"{p}show_link", "إظهار روابط البطاقات إن وُجدت", True),
            *theme_fields(p),
        ],
    )


# ---------------------------------------------------------------------------
# New specialised cosmetics components (no products / prices / cart)
# ---------------------------------------------------------------------------

ASPECT_OPTS = [("مربع 1:1", "1/1"), ("طولي 3:4", "3/4"),
               ("عرضي 4:3", "4/3"), ("طولي 4:5", "4/5")]
FINISH_OPTS = [("عام", "any"), ("مطفي", "matte"), ("ندي", "dewy"),
               ("لامع", "glossy"), ("طبيعي", "natural"), ("مخملي", "velvet")]
PERIOD_OPTS = [("صباحي ومسائي", "both"), ("صباحي", "morning"), ("مسائي", "evening")]


def build_face_zone_map():
    p = "bfz_"
    zone_fields = [
        text(f"{p}zones.zone_id", "معرّف داخلي (فريد)", "forehead"),
        multilang(f"{p}zones.name", "اسم المنطقة", "الجبهة", "Forehead"),
        number(f"{p}zones.x", "الموضع الأفقي", 50, 0, 100, "%",
               "من يمين الصورة كنسبة مئوية"),
        number(f"{p}zones.y", "الموضع الرأسي", 50, 0, 100, "%",
               "من أعلى الصورة كنسبة مئوية"),
        number(f"{p}zones.dot_size", "حجم النقطة", 30, 12, 120, "px"),
        color(f"{p}zones.dot_color", "لون النقطة", "#c2527f"),
        text(f"{p}zones.icon", "أيقونة أو رمز (اختياري)", "",
             desc="رمز تعبيري أو اسم أيقونة sicon-"),
        multilang(f"{p}zones.title", "عنوان التفاصيل", "العناية بالجبهة", "Forehead care"),
        multilang(f"{p}zones.desc", "الوصف", "", "", "textarea", "400"),
        text(f"{p}zones.tags", "احتياجات شائعة (افصلي بفاصلة)", "لمعان, خطوط أفقية"),
        text(f"{p}zones.steps", "خطوات العناية (كل خطوة في سطر)", "", "textarea", "600"),
        text(f"{p}zones.tips", "نصائح (كل نصيحة في سطر)", "", "textarea", "500"),
        multilang(f"{p}zones.warning", "تنبيه (اختياري)", "", "", "text", "200"),
        image(f"{p}zones.image", "صورة توضيحية (اختياري)"),
        variable_list(f"{p}zones.link", "رابط صفحة أو مقال (اختياري)"),
    ]
    sample = [
        {"zone_id": "forehead", "name": {"ar": "الجبهة", "en": "Forehead"}, "x": 50, "y": 18,
         "dot_color": "#b06a8a", "title": {"ar": "منطقة الجبهة", "en": "Forehead"},
         "desc": {"ar": "منطقة تميل للمعان ضمن منطقة T. تحتاج تنظيفًا لطيفًا وترطيبًا متوازنًا.", "en": ""},
         "tags": "لمعان, خطوط أفقية", "steps": "نظّفي بلطف\nاستخدمي تونر متوازن\nرطّبي بقوام خفيف"},
        {"zone_id": "eyes", "name": {"ar": "محيط العين", "en": "Eye area"}, "x": 34, "y": 36,
         "dot_color": "#6c8ea8", "title": {"ar": "محيط العين", "en": "Eye area"},
         "desc": {"ar": "بشرة رقيقة وحسّاسة تحتاج عناية خاصة.", "en": ""},
         "tags": "انتفاخ, هالات, جفاف", "steps": "ضعي كمية صغيرة\nربّتي بلطف بالبنصر",
         "warning": {"ar": "تجنّبي ملامسة العين مباشرة.", "en": ""}},
        {"zone_id": "cheeks", "name": {"ar": "الخدين", "en": "Cheeks"}, "x": 68, "y": 50,
         "dot_color": "#c9a24b", "title": {"ar": "الخدّان", "en": "Cheeks"},
         "desc": {"ar": "منطقة تميل للجفاف وتحتاج ترطيبًا وحماية.", "en": ""},
         "tags": "جفاف, احمرار", "steps": "رطّبي جيدًا\nاختمي بواقي الشمس نهارًا"},
        {"zone_id": "chin", "name": {"ar": "الذقن", "en": "Chin"}, "x": 50, "y": 78,
         "dot_color": "#c2527f", "title": {"ar": "الذقن", "en": "Chin"},
         "desc": {"ar": "جزء من منطقة T وقد تظهر بها حبوب.", "en": ""},
         "tags": "حبوب, مسام"},
    ]
    return component(
        "beauty-face-zone-map", "خريطة مناطق الوجه والعناية", "sicon-user",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "خريطة العناية بالوجه", "Face care zone map"),
            multilang(f"{p}desc", "الوصف",
                      "اضغطي على أي منطقة من الوجه لعرض خطوات العناية والنصائح الخاصة بها.",
                      "Tap any face zone to see its tailored care steps and tips.",
                      "textarea", "300"),
            image(f"{p}face_image", "صورة الوجه أو الرسم التوضيحي", FACE_IMAGE),
            static_title(f"{p}zones_title", "مناطق الوجه"),
            collection(f"{p}zones", "منطقة", zone_fields, sample),
            static_title(f"{p}display_title", "خيارات العرض"),
            dropdown_manual(f"{p}aspect", "نسبة أبعاد الصورة", ASPECT_OPTS, "3/4"),
            boolean(f"{p}reverse", "عكس ترتيب الصورة والمحتوى", False),
            dropdown_manual(f"{p}dot_shape", "شكل النقاط",
                            [("دائرة نابضة", "pulse"), ("حلقة", "ring"), ("نقطة برقم", "number"),
                             ("أيقونة", "icon"), ("منطقة شفافة", "area"), ("خط باسم المنطقة", "label")],
                            "pulse"),
            boolean(f"{p}pulse", "تفعيل نبض النقاط", True),
            number(f"{p}pulse_speed", "سرعة النبض (مللي ثانية)", 2200, 600, 5000, ""),
            dropdown_manual(f"{p}detail_mode", "طريقة عرض التفاصيل",
                            [("بجانب الصورة", "inline"), ("لوحة سفلية على الجوال", "sheet")], "inline"),
            text(f"{p}default_zone", "المنطقة المفتوحة افتراضيًا (المعرّف)", ""),
            boolean(f"{p}show_nav", "إظهار أزرار السابق والتالي", True),
            boolean(f"{p}show_names", "إظهار أسماء المناطق فوق الصورة", False),
            boolean(f"{p}show_notice", "إظهار التنبيه التوعوي", True),
            multilang(f"{p}notice", "نص التنبيه التوعوي",
                      "المعلومات المعروضة توعوية ولا تُعد تشخيصًا طبيًا.",
                      "The information shown is educational and is not a medical diagnosis.",
                      "textarea", "300"),
            *theme_fields(p),
        ],
    )


def build_layering_board():
    p = "brl_"
    step_fields = [
        text(f"{p}routines.steps.step_id", "معرّف الخطوة (فريد)", ""),
        multilang(f"{p}routines.steps.step_title", "اسم الخطوة", "المنظف", "Cleanser"),
        text(f"{p}routines.steps.icon", "أيقونة أو رمز (اختياري)", ""),
        image(f"{p}routines.steps.image", "صورة (اختياري)"),
        multilang(f"{p}routines.steps.desc_short", "وصف مختصر", "", "", "text", "160"),
        multilang(f"{p}routines.steps.desc_long", "شرح موقع الخطوة", "", "", "textarea", "400"),
        text(f"{p}routines.steps.timing", "التوقيت", "صباحاً ومساءً"),
        text(f"{p}routines.steps.wait", "مدة الانتظار قبل التالية", ""),
        text(f"{p}routines.steps.amount", "الكمية", ""),
        multilang(f"{p}routines.steps.note", "ملاحظة (اختياري)", "", "", "text", "200"),
        color(f"{p}routines.steps.color", "لون الخطوة", "#c2527f"),
        boolean(f"{p}routines.steps.optional", "خطوة اختيارية", False),
        dropdown_manual(f"{p}routines.steps.period", "وقت الاستخدام", PERIOD_OPTS, "both"),
        number(f"{p}routines.steps.correct_order", "الترتيب الصحيح", 1, 1, 30, ""),
    ]
    routine_fields = [
        text(f"{p}routines.routine_id", "معرّف الروتين (فريد)", "morning"),
        multilang(f"{p}routines.name", "اسم الروتين", "روتين صباحي", "Morning routine"),
        collection(f"{p}routines.steps", "خطوة", step_fields, []),
    ]
    sample = [
        {"routine_id": "morning", "name": {"ar": "روتين صباحي", "en": "Morning routine"},
         "steps": [
             {"step_title": {"ar": "المنظف", "en": "Cleanser"}, "correct_order": 1, "color": "#6c8ea8",
              "desc_short": {"ar": "ابدئي بتنظيف لطيف.", "en": ""}},
             {"step_title": {"ar": "التونر", "en": "Toner"}, "correct_order": 2, "color": "#7fae9b"},
             {"step_title": {"ar": "السيروم", "en": "Serum"}, "correct_order": 3, "color": "#c9a24b",
              "desc_short": {"ar": "علاج مركّز حسب الحاجة.", "en": ""}},
             {"step_title": {"ar": "المرطب", "en": "Moisturizer"}, "correct_order": 4, "color": "#b06a8a"},
             {"step_title": {"ar": "واقي الشمس", "en": "Sunscreen"}, "correct_order": 5, "color": "#e08a3c",
              "period": "morning", "desc_short": {"ar": "آخر خطوة صباحية دائمًا.", "en": ""}},
         ]},
        {"routine_id": "evening", "name": {"ar": "روتين مسائي", "en": "Evening routine"},
         "steps": [
             {"step_title": {"ar": "مزيل المكياج", "en": "Makeup remover"}, "correct_order": 1, "color": "#c2527f"},
             {"step_title": {"ar": "المنظف", "en": "Cleanser"}, "correct_order": 2, "color": "#6c8ea8"},
             {"step_title": {"ar": "السيروم", "en": "Serum"}, "correct_order": 3, "color": "#c9a24b"},
             {"step_title": {"ar": "كريم الليل", "en": "Night cream"}, "correct_order": 4, "color": "#b06a8a"},
         ]},
    ]
    return component(
        "beauty-routine-layering-board", "ترتيب طبقات روتين العناية", "sicon-list",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "ترتيب طبقات الروتين", "Routine layering board"),
            multilang(f"{p}desc", "الوصف",
                      "تعرّفي على الترتيب الصحيح لطبقات روتينك، أو اختبري معلوماتك بترتيب الخطوات بنفسك.",
                      "Learn the correct order of your routine layers, or test yourself by ordering the steps.",
                      "textarea", "300"),
            static_title(f"{p}routines_title", "الروتينات وخطواتها"),
            collection(f"{p}routines", "روتين", routine_fields, sample),
            static_title(f"{p}display_title", "خيارات العرض والتفاعل"),
            dropdown_manual(f"{p}mode", "وضع العنصر",
                            [("دليل الترتيب", "guide"), ("اختبار الترتيب", "quiz")], "guide"),
            dropdown_manual(f"{p}shape", "الشكل البصري",
                            [("طبقات", "layers"), ("قطرات", "drops"), ("عبوات", "bottles"),
                             ("درجات سلم", "stairs"), ("مسار", "path"), ("دوائر متصلة", "circles")], "layers"),
            dropdown_manual(f"{p}direction", "اتجاه الترتيب",
                            [("رأسي", "vertical"), ("أفقي", "horizontal")], "vertical"),
            text(f"{p}default_routine", "الروتين المفتوح افتراضيًا (المعرّف)", ""),
            boolean(f"{p}enable_drag", "تفعيل السحب وإعادة الترتيب (وضع الاختبار)", True),
            boolean(f"{p}enable_check", "تفعيل زر التحقق", True),
            boolean(f"{p}show_answer", "السماح بإظهار الترتيب الصحيح", True),
            boolean(f"{p}enable_retry", "تفعيل إعادة المحاولة", True),
            multilang(f"{p}success_msg", "رسالة النجاح", "أحسنتِ! هذا هو الترتيب الصحيح.", "Well done! Correct order.", "text", "200"),
            multilang(f"{p}retry_msg", "رسالة المحاولة", "قريب! عدّلي الترتيب وحاولي مجددًا.", "Close! Adjust and try again.", "text", "200"),
            number(f"{p}card_radius", "تدوير البطاقات", 14, 0, 32, "px"),
            color(f"{p}step_color", "لون الخطوة الافتراضي", "#c2527f"),
            color(f"{p}success_color", "لون النجاح", "#2f9e63"),
            color(f"{p}error_color", "لون الخطأ", "#cf4b4b"),
            *theme_fields(p),
        ],
    )


def build_lighting_simulator():
    p = "bls_"
    light_fields = [
        text(f"{p}lights.light_id", "معرّف داخلي (فريد)", "daylight"),
        multilang(f"{p}lights.name", "اسم الحالة", "ضوء النهار", "Daylight"),
        text(f"{p}lights.icon", "أيقونة أو رمز (اختياري)", ""),
        image(f"{p}lights.image", "الصورة"),
        image(f"{p}lights.image_mobile", "صورة الجوال (اختياري)"),
        dropdown_manual(f"{p}lights.finish", "اللمسة النهائية (عند تفعيل طبقة اللمسات)", FINISH_OPTS, "any"),
        multilang(f"{p}lights.desc", "وصف المظهر", "", "", "textarea", "300"),
        multilang(f"{p}lights.color_effect", "تأثير اللون", "", "", "text", "160"),
        number(f"{p}lights.gloss", "مستوى اللمعان", 3, 0, 5, ""),
        number(f"{p}lights.clarity", "وضوح اللون", 3, 0, 5, ""),
        number(f"{p}lights.contrast", "التباين", 3, 0, 5, ""),
        text(f"{p}lights.palette", "لوحة ألوان (أكواد HEX مفصولة بفاصلة)", ""),
        multilang(f"{p}lights.note", "ملاحظة (اختياري)", "", "", "text", "200"),
        variable_list(f"{p}lights.link", "رابط (اختياري)"),
    ]
    sample = [
        {"light_id": "daylight", "name": {"ar": "ضوء النهار", "en": "Daylight"}, "finish": "natural",
         "image": LIGHT_IMAGES["daylight"],
         "desc": {"ar": "إضاءة طبيعية متوازنة تُظهر الألوان كما هي.", "en": ""},
         "color_effect": {"ar": "ألوان حقيقية ومتوازنة", "en": ""}, "gloss": 3, "clarity": 5, "contrast": 3,
         "palette": "#e8c4a0, #c98f6a, #7d4b39"},
        {"light_id": "warm", "name": {"ar": "إضاءة دافئة", "en": "Warm indoor"}, "finish": "dewy",
         "image": LIGHT_IMAGES["warm"],
         "desc": {"ar": "تمنح دفئًا وإشراقة ذهبية للبشرة.", "en": ""},
         "color_effect": {"ar": "ميل نحو الذهبي", "en": ""}, "gloss": 4, "clarity": 3, "contrast": 2,
         "palette": "#f0cba0, #d99a5c, #9c5e37"},
        {"light_id": "cool", "name": {"ar": "إضاءة باردة", "en": "Cool indoor"}, "finish": "matte",
         "image": LIGHT_IMAGES["cool"],
         "desc": {"ar": "تبرز الدرجات الباردة وتقلّل الاحمرار.", "en": ""},
         "color_effect": {"ar": "ميل نحو الوردي/الأزرق", "en": ""}, "gloss": 2, "clarity": 4, "contrast": 4,
         "palette": "#e6c4b8, #b98c86, #6f4a52"},
        {"light_id": "evening", "name": {"ar": "إضاءة مسائية", "en": "Evening"}, "finish": "glossy",
         "image": LIGHT_IMAGES["evening"],
         "desc": {"ar": "إضاءة خافتة تبرز اللمعان والعمق.", "en": ""},
         "color_effect": {"ar": "درجات أعمق وأكثر درامية", "en": ""}, "gloss": 5, "clarity": 2, "contrast": 5,
         "palette": "#caa07e, #92603f, #4e2f22"},
    ]
    return component(
        "beauty-lighting-finish-simulator", "محاكي الإضاءة والمظهر", "sicon-image",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "كيف تبدو تحت كل إضاءة؟", "How does it look in each light?"),
            multilang(f"{p}desc", "الوصف",
                      "شاهدي كيف تتغيّر الإطلالة والألوان تحت أنواع مختلفة من الإضاءة.",
                      "See how the look and colors change under different lighting.",
                      "textarea", "300"),
            static_title(f"{p}lights_title", "حالات الإضاءة"),
            collection(f"{p}lights", "حالة إضاءة", light_fields, sample),
            static_title(f"{p}display_title", "خيارات العرض"),
            dropdown_manual(f"{p}view_mode", "وضع العرض",
                            [("عرض مفرد", "single"), ("مقارنة", "compare")], "single"),
            boolean(f"{p}show_compare", "السماح بوضع المقارنة", True),
            dropdown_manual(f"{p}compare_style", "أسلوب المقارنة",
                            [("شريط سحب", "slider"), ("تقسيم", "split"), ("جنبًا إلى جنب", "side")], "slider"),
            boolean(f"{p}enable_finish", "تفعيل طبقة اختيار اللمسة النهائية", False),
            text(f"{p}default_light", "حالة الإضاءة الافتراضية (المعرّف)", ""),
            dropdown_manual(f"{p}default_finish", "اللمسة الافتراضية", FINISH_OPTS, "any"),
            boolean(f"{p}show_indicators", "إظهار مؤشرات المظهر", True),
            boolean(f"{p}show_palette", "إظهار لوحة الألوان", True),
            dropdown_manual(f"{p}aspect", "نسبة أبعاد الصورة", ASPECT_OPTS, "4/5"),
            dropdown_manual(f"{p}transition", "نوع الانتقال",
                            [("تلاشٍ", "fade"), ("بدون", "none")], "fade"),
            number(f"{p}speed", "سرعة الانتقال (مللي ثانية)", 400, 0, 1200, ""),
            dropdown_manual(f"{p}preload", "تحميل الصور",
                            [("عند الطلب", "lazy"), ("مسبقًا", "eager")], "lazy"),
            color(f"{p}active_color", "لون الخيار النشط", "#c2527f"),
            *theme_fields(p),
        ],
    )


def build_pao_calculator():
    p = "bpa_"
    cat_fields = [
        text(f"{p}categories.cat_id", "معرّف الفئة (فريد)", "mascara"),
        multilang(f"{p}categories.name", "اسم الفئة", "ماسكارا", "Mascara"),
        text(f"{p}categories.icon", "أيقونة أو رمز (اختياري)", ""),
        number(f"{p}categories.pao_months", "المدة المقترحة (أشهر)", 6, 1, 60, ""),
    ]
    pao_fields = [
        number(f"{p}pao_options.months", "عدد الأشهر", 12, 1, 60, ""),
        multilang(f"{p}pao_options.label", "التسمية (اختياري)", "", "", "text", "60"),
    ]
    cat_sample = [
        {"cat_id": "mascara", "name": {"ar": "ماسكارا", "en": "Mascara"}, "pao_months": 3},
        {"cat_id": "cream", "name": {"ar": "كريم", "en": "Cream"}, "pao_months": 12},
        {"cat_id": "serum", "name": {"ar": "سيروم", "en": "Serum"}, "pao_months": 6},
        {"cat_id": "sunscreen", "name": {"ar": "واقي شمس", "en": "Sunscreen"}, "pao_months": 12},
        {"cat_id": "lipstick", "name": {"ar": "أحمر شفاه", "en": "Lipstick"}, "pao_months": 18},
        {"cat_id": "perfume", "name": {"ar": "عطر", "en": "Perfume"}, "pao_months": 24},
    ]
    pao_sample = [
        {"months": 3}, {"months": 6}, {"months": 9},
        {"months": 12}, {"months": 18}, {"months": 24},
    ]
    return component(
        "beauty-pao-expiry-calculator", "حاسبة مدة الاستخدام بعد الفتح", "sicon-clock",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "متى تنتهي صلاحية منتجك بعد الفتح؟", "When does your product expire after opening?"),
            multilang(f"{p}desc", "الوصف",
                      "احسبي التاريخ التقريبي لانتهاء الاستخدام بعد فتح العبوة.",
                      "Estimate the approximate end-of-use date after opening the product.",
                      "textarea", "300"),
            multilang(f"{p}notice", "التنبيه التوعوي (إلزامي)",
                      "النتيجة تقديرية وتعتمد على تاريخ الفتح والمدة المكتوبة على العبوة. اتبعي تعليمات الشركة المصنّعة وتوقّفي عن الاستخدام عند تغيّر الرائحة أو اللون أو القوام.",
                      "The result is approximate. Follow the manufacturer instructions and stop using if the smell, color or texture changes.",
                      "textarea", "400"),
            static_title(f"{p}cats_title", "الفئات ومددها المقترحة"),
            collection(f"{p}categories", "فئة", cat_fields, cat_sample),
            static_title(f"{p}pao_title", "مدد الاستخدام المتاحة"),
            collection(f"{p}pao_options", "مدة", pao_fields, pao_sample),
            static_title(f"{p}display_title", "خيارات العرض والحساب"),
            dropdown_manual(f"{p}input_mode", "طريقة الإدخال",
                            [("إدخال مباشر", "direct"), ("اختيار فئة", "category")], "direct"),
            number(f"{p}default_pao", "المدة الافتراضية (أشهر)", 12, 0, 60, ""),
            number(f"{p}warn_days", "عتبة قرب الانتهاء (أيام)", 30, 1, 180, ""),
            dropdown_manual(f"{p}date_format", "تنسيق التاريخ",
                            [("مطوّل (15 يوليو 2026)", "long"), ("مختصر (15/07/2026)", "short"), ("ISO", "iso")], "long"),
            boolean(f"{p}enable_storage", "تفعيل حفظ العبوات على الجهاز", True),
            number(f"{p}max_records", "الحد الأقصى للسجلات", 12, 1, 100, ""),
            boolean(f"{p}enable_name", "تفعيل اسم العبوة", True),
            boolean(f"{p}enable_note", "تفعيل ملاحظة المستخدم", False),
            boolean(f"{p}enable_calendar", "تفعيل زر إضافة إلى التقويم", True),
            multilang(f"{p}storage_tips", "نصائح الحفظ (اختياري)", "", "", "textarea", "400"),
            multilang(f"{p}stop_signals", "علامات التوقف عن الاستخدام (اختياري)", "", "", "textarea", "400"),
            multilang(f"{p}state_safe", "نص الحالة الآمنة", "", "", "text", "160"),
            multilang(f"{p}state_warn", "نص حالة الاقتراب", "", "", "text", "160"),
            multilang(f"{p}state_expired", "نص حالة الانتهاء", "", "", "text", "160"),
            color(f"{p}safe_color", "لون الحالة الآمنة", "#2f9e63"),
            color(f"{p}warn_color", "لون حالة الاقتراب", "#e0a100"),
            color(f"{p}expired_color", "لون حالة الانتهاء", "#cf4b4b"),
            *theme_fields(p),
        ],
    )


def build_texture_lab():
    p = "bta_"
    tex_fields = [
        text(f"{p}textures.tex_id", "معرّف داخلي (فريد)", "serum"),
        multilang(f"{p}textures.name", "اسم القوام", "سيروم", "Serum"),
        text(f"{p}textures.icon", "أيقونة أو رمز (اختياري)", ""),
        image(f"{p}textures.image", "صورة قوام حقيقية (اختياري)"),
        color(f"{p}textures.color", "لون العينة", "#c9a24b"),
        multilang(f"{p}textures.desc", "وصف", "", "", "textarea", "300"),
        number(f"{p}textures.lightness", "الخفة", 4, 0, 5, ""),
        number(f"{p}textures.thickness", "السماكة", 2, 0, 5, ""),
        number(f"{p}textures.absorption", "سرعة الامتصاص", 4, 0, 5, ""),
        number(f"{p}textures.hydration", "الترطيب", 3, 0, 5, ""),
        number(f"{p}textures.gloss", "اللمعان", 2, 0, 5, ""),
        number(f"{p}textures.greasiness", "الإحساس الدهني", 1, 0, 5, ""),
        multilang(f"{p}textures.finish", "اللمسة النهائية", "", "", "text", "120"),
        multilang(f"{p}textures.spread", "طريقة التوزيع", "", "", "text", "160"),
        multilang(f"{p}textures.amount", "الكمية", "", "", "text", "120"),
        multilang(f"{p}textures.timing", "التوقيت", "", "", "text", "120"),
        multilang(f"{p}textures.usage", "الاستخدام المناسب", "", "", "text", "200"),
        multilang(f"{p}textures.tips", "نصائح (اختياري)", "", "", "textarea", "300"),
        multilang(f"{p}textures.note", "ملاحظة (اختياري)", "", "", "text", "200"),
    ]
    sample = [
        {"tex_id": "serum", "name": {"ar": "سيروم", "en": "Serum"}, "color": "#c9a24b",
         "desc": {"ar": "قوام خفيف سريع الامتصاص يتغلغل بسرعة.", "en": ""},
         "lightness": 5, "thickness": 1, "absorption": 5, "hydration": 3, "gloss": 2, "greasiness": 1,
         "finish": {"ar": "ناعم غير دهني", "en": ""}, "spread": {"ar": "ينتشر بسرعة في مساحة صغيرة", "en": ""}},
        {"tex_id": "gel", "name": {"ar": "جل", "en": "Gel"}, "color": "#7fae9b",
         "desc": {"ar": "منعش خفيف ينتشر بسهولة ويمتص بسرعة.", "en": ""},
         "lightness": 4, "thickness": 2, "absorption": 4, "hydration": 3, "gloss": 2, "greasiness": 1,
         "finish": {"ar": "منعش", "en": ""}},
        {"tex_id": "cream", "name": {"ar": "كريم", "en": "Cream"}, "color": "#e6c9a8",
         "desc": {"ar": "قوام غني يرطّب بعمق ويحتاج توزيعًا أطول.", "en": ""},
         "lightness": 2, "thickness": 4, "absorption": 2, "hydration": 5, "gloss": 3, "greasiness": 3,
         "finish": {"ar": "مغذٍّ", "en": ""}},
        {"tex_id": "oil", "name": {"ar": "زيت", "en": "Oil"}, "color": "#e0a13c",
         "desc": {"ar": "ينتشر تدريجيًا ويترك لمعانًا مغذّيًا.", "en": ""},
         "lightness": 2, "thickness": 3, "absorption": 2, "hydration": 4, "gloss": 5, "greasiness": 4,
         "finish": {"ar": "لامع مغذٍّ", "en": ""}, "spread": {"ar": "ينتشر تدريجيًا", "en": ""}},
    ]
    return component(
        "beauty-texture-absorption-lab", "مختبر القوام والامتصاص", "sicon-drop",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "مختبر القوام والامتصاص", "Texture & absorption lab"),
            multilang(f"{p}desc", "الوصف",
                      "اكتشفي الفروق بين أنواع القوام وطريقة انتشارها وإحساسها على البشرة.",
                      "Explore the differences between textures, how they spread and feel on the skin.",
                      "textarea", "300"),
            static_title(f"{p}textures_title", "أنواع القوام"),
            collection(f"{p}textures", "قوام", tex_fields, sample),
            static_title(f"{p}display_title", "خيارات العرض"),
            dropdown_manual(f"{p}sample_shape", "شكل العينات",
                            [("قطرات", "drops"), ("دوائر", "circles"), ("مسحات", "swatches"),
                             ("شرائح زجاجية", "slides"), ("كتل ناعمة", "blobs"), ("فقاعات", "bubbles")], "drops"),
            text(f"{p}default_texture", "القوام المفتوح افتراضيًا (المعرّف)", ""),
            dropdown_manual(f"{p}indicator_type", "شكل المؤشرات",
                            [("أشرطة", "bars"), ("نقاط", "dots"), ("دوائر", "circles"), ("مقياس نصف دائري", "semicircle")], "bars"),
            boolean(f"{p}show_indicators", "إظهار المؤشرات الحسية", True),
            boolean(f"{p}enable_compare", "تفعيل مقارنة قوامين", True),
            boolean(f"{p}enable_spread", "تفعيل محاكي الانتشار", True),
            number(f"{p}spread_speed", "سرعة الانتشار (مللي ثانية)", 500, 0, 1500, ""),
            boolean(f"{p}disable_motion_mobile", "إيقاف الحركة على الجوال", False),
            boolean(f"{p}show_images", "إظهار صور القوام", True),
            boolean(f"{p}show_tips", "إظهار النصائح", True),
            boolean(f"{p}show_notes", "إظهار الملاحظات", True),
            color(f"{p}area_color", "لون منطقة التجربة", "#f7ebf1"),
            *theme_fields(p),
        ],
    )


# ---------------------------------------------------------------------------
# New specialised cosmetics components (replace the former fashion clones).
# All are product-free interactive/educational tools.
# ---------------------------------------------------------------------------

def build_actives_compatibility():
    p = "bac_"
    active_fields = [
        text(f"{p}actives.active_id", "معرّف داخلي (فريد)", "retinol"),
        multilang(f"{p}actives.name", "اسم المكوّن", "الريتينول", "Retinol"),
        color(f"{p}actives.color", "لون المكوّن", "#b06a8a"),
        multilang(f"{p}actives.desc", "وصف مختصر", "", "", "textarea", "300"),
    ]
    active_sample = [
        {"active_id": "retinol", "name": {"ar": "الريتينول", "en": "Retinol"}, "color": "#b06a8a",
         "desc": {"ar": "مشتق فيتامين A لتجديد البشرة والخطوط الدقيقة.", "en": ""}},
        {"active_id": "vitc", "name": {"ar": "فيتامين C", "en": "Vitamin C"}, "color": "#e0a52e",
         "desc": {"ar": "مضاد أكسدة يوحّد اللون ويمنح إشراقة.", "en": ""}},
        {"active_id": "niacinamide", "name": {"ar": "النياسيناميد", "en": "Niacinamide"}, "color": "#6c8ea8",
         "desc": {"ar": "يهدّئ ويقلّل ظهور المسام ويوازن الدهون.", "en": ""}},
        {"active_id": "aha_bha", "name": {"ar": "أحماض AHA/BHA", "en": "AHA/BHA acids"}, "color": "#c97b5a",
         "desc": {"ar": "تقشير كيميائي لتنعيم البشرة وتنظيف المسام.", "en": ""}},
        {"active_id": "hyaluronic", "name": {"ar": "حمض الهيالورونيك", "en": "Hyaluronic acid"}, "color": "#5aa3a0",
         "desc": {"ar": "ترطيب عميق يناسب جميع المكوّنات تقريبًا.", "en": ""}},
    ]
    rule_fields = [
        text(f"{p}rules.a", "المكوّن الأول (المعرّف)", "retinol"),
        text(f"{p}rules.b", "المكوّن الثاني (المعرّف)", "vitc"),
        dropdown_manual(f"{p}rules.level", "درجة التوافق",
                        [("متوافقان", "compatible"), ("بحذر", "caution"), ("يُفضّل تجنّبهما معًا", "avoid")],
                        "caution"),
        multilang(f"{p}rules.note", "الشرح", "", "", "textarea", "400"),
        multilang(f"{p}rules.timing", "توصية التوقيت", "", "", "textarea", "300"),
    ]
    rule_sample = [
        {"a": "retinol", "b": "vitc", "level": "caution",
         "note": {"ar": "يمكن استخدامهما لكن قد يسبّبان تهيّجًا لبعض البشرات.", "en": ""},
         "timing": {"ar": "استخدمي فيتامين C صباحًا والريتينول مساءً.", "en": ""}},
        {"a": "retinol", "b": "aha_bha", "level": "avoid",
         "note": {"ar": "الجمع بينهما قد يزيد التهيّج والجفاف والحساسية.", "en": ""},
         "timing": {"ar": "بدّلي بينهما في ليالٍ مختلفة.", "en": ""}},
        {"a": "niacinamide", "b": "vitc", "level": "compatible",
         "note": {"ar": "يعملان معًا بأمان لتوحيد اللون والإشراق.", "en": ""},
         "timing": {"ar": "يمكن استخدامهما في نفس الروتين.", "en": ""}},
        {"a": "hyaluronic", "b": "retinol", "level": "compatible",
         "note": {"ar": "الهيالورونيك يقلّل جفاف الريتينول.", "en": ""},
         "timing": {"ar": "ضعي الهيالورونيك قبل الريتينول لترطيب أفضل.", "en": ""}},
    ]
    return component(
        "beauty-actives-compatibility", "مدقّق توافق المكوّنات الفعّالة", "sicon-flask",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "هل يمكن الجمع بينهما؟", "Can you combine them?"),
            multilang(f"{p}desc", "الوصف",
                      "اختاري مكوّنين فعّالين لمعرفة مدى توافقهما وكيفية استخدامهما بأمان.",
                      "Pick two actives to see if they pair well and how to use them safely.",
                      "textarea", "300"),
            static_title(f"{p}actives_title", "المكوّنات الفعّالة"),
            collection(f"{p}actives", "مكوّن", active_fields, active_sample),
            static_title(f"{p}rules_title", "قواعد التوافق"),
            collection(f"{p}rules", "قاعدة", rule_fields, rule_sample),
            static_title(f"{p}labels_title", "النصوص والعرض"),
            multilang(f"{p}pick_a_label", "نص اختيار المكوّن الأول", "المكوّن الأول", "First active"),
            multilang(f"{p}pick_b_label", "نص اختيار المكوّن الثاني", "المكوّن الثاني", "Second active"),
            multilang(f"{p}result_title", "عنوان النتيجة", "نتيجة التوافق", "Compatibility result"),
            multilang(f"{p}label_compatible", "نص «متوافقان»", "متوافقان", "Compatible"),
            multilang(f"{p}label_caution", "نص «بحذر»", "استخدمي بحذر", "Use with caution"),
            multilang(f"{p}label_avoid", "نص «تجنّب»", "يُفضّل عدم الجمع", "Better not combined"),
            multilang(f"{p}default_note", "نص عند عدم وجود قاعدة",
                      "لا يوجد تعارض معروف بين هذين المكوّنين.",
                      "No known conflict between these two ingredients.", "textarea", "300"),
            boolean(f"{p}show_notice", "إظهار التنبيه التوعوي", True),
            multilang(f"{p}notice", "نص التنبيه التوعوي",
                      "المعلومات إرشادية عامة وليست بديلاً عن استشارة أخصائي البشرة.",
                      "This is general educational guidance, not a substitute for a dermatologist.",
                      "textarea", "300"),
            *theme_fields(p),
        ],
    )


def build_fragrance_finder():
    p = "bff_"
    fam_fields = [
        text(f"{p}families.family_id", "معرّف داخلي (فريد)", "floral"),
        multilang(f"{p}families.name", "اسم العائلة", "الزهري", "Floral"),
        color(f"{p}families.color", "اللون", "#d98cae"),
        text(f"{p}families.icon", "أيقونة أو رمز (اختياري)", "🌸"),
        multilang(f"{p}families.desc", "الوصف", "", "", "textarea", "400"),
        text(f"{p}families.mood", "الطابع (افصلي بفاصلة)", "أنثوي, رومانسي, ناعم"),
        text(f"{p}families.top_notes", "مقدمة العطر (كل نوتة في سطر)", "", "textarea", "300"),
        text(f"{p}families.heart_notes", "قلب العطر (كل نوتة في سطر)", "", "textarea", "300"),
        text(f"{p}families.base_notes", "قاعدة العطر (كل نوتة في سطر)", "", "textarea", "300"),
        multilang(f"{p}families.season", "أنسب موسم", "الربيع", "Spring"),
        multilang(f"{p}families.occasion", "أنسب مناسبة", "النهار واللقاءات", "Daytime & outings"),
        image(f"{p}families.image", "صورة توضيحية (اختياري)"),
        variable_list(f"{p}families.link", "رابط صفحة أو مقال (اختياري)"),
    ]
    fam_sample = [
        {"family_id": "floral", "name": {"ar": "الزهري", "en": "Floral"}, "color": "#d98cae", "icon": "🌸",
         "desc": {"ar": "عائلة أنثوية ناعمة تعتمد على الورود والياسمين والزهور البيضاء.", "en": ""},
         "mood": "أنثوي, رومانسي, ناعم",
         "top_notes": "برغموت\nليمون", "heart_notes": "ورد\nياسمين\nزهر البرتقال", "base_notes": "مسك\nخشب أبيض",
         "season": {"ar": "الربيع", "en": "Spring"}, "occasion": {"ar": "النهار واللقاءات", "en": "Daytime"}},
        {"family_id": "woody", "name": {"ar": "الخشبي", "en": "Woody"}, "color": "#9c7a4e", "icon": "🌳",
         "desc": {"ar": "عائلة دافئة راقية تقوم على خشب الصندل والأرز والعنبر.", "en": ""},
         "mood": "دافئ, راقٍ, ثابت",
         "top_notes": "هيل\nفلفل", "heart_notes": "خشب الأرز\nباتشولي", "base_notes": "صندل\nعنبر\nمسك",
         "season": {"ar": "الشتاء", "en": "Winter"}, "occasion": {"ar": "المساء والمناسبات", "en": "Evening"}},
        {"family_id": "oriental", "name": {"ar": "الشرقي", "en": "Oriental"}, "color": "#b5562f", "icon": "🔥",
         "desc": {"ar": "عائلة غنية وجريئة تجمع التوابل والفانيليا والراتنجات.", "en": ""},
         "mood": "جريء, غني, فاخر",
         "top_notes": "زعفران\nقرفة", "heart_notes": "بخور\nورد داكن", "base_notes": "فانيليا\nعنبر\nعود",
         "season": {"ar": "الشتاء", "en": "Winter"}, "occasion": {"ar": "السهرات", "en": "Nights out"}},
        {"family_id": "fresh", "name": {"ar": "المنعش", "en": "Fresh"}, "color": "#5aa6c9", "icon": "💧",
         "desc": {"ar": "عائلة خفيفة نظيفة تعتمد على الحمضيات والنوتات المائية.", "en": ""},
         "mood": "منعش, نظيف, حيوي",
         "top_notes": "ليمون\nنعناع", "heart_notes": "نوتة مائية\nخزامى", "base_notes": "مسك أبيض\nطحالب",
         "season": {"ar": "الصيف", "en": "Summer"}, "occasion": {"ar": "الرياضة والنهار", "en": "Sport & day"}},
    ]
    return component(
        "beauty-fragrance-finder", "محدد عائلة العطر", "sicon-heart",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "اكتشفي عائلة عطرك", "Find your fragrance family"),
            multilang(f"{p}desc", "الوصف",
                      "استكشفي العائلات العطرية وتعرّفي على نوتاتها وأنسب المواسم والمناسبات لها.",
                      "Explore fragrance families and discover their notes, seasons and occasions.",
                      "textarea", "300"),
            static_title(f"{p}families_title", "العائلات العطرية"),
            collection(f"{p}families", "عائلة", fam_fields, fam_sample),
            static_title(f"{p}display_title", "خيارات العرض"),
            dropdown_manual(f"{p}layout", "طريقة العرض",
                            [("شبكة", "grid"), ("عجلة دائرية", "wheel"), ("قائمة", "list")], "grid"),
            text(f"{p}default_family", "العائلة المفتوحة افتراضيًا (المعرّف)", "floral"),
            boolean(f"{p}show_pyramid", "إظهار هرم النوتات", True),
            multilang(f"{p}pyramid_top_label", "نص المقدمة", "المقدمة", "Top notes"),
            multilang(f"{p}pyramid_heart_label", "نص القلب", "القلب", "Heart notes"),
            multilang(f"{p}pyramid_base_label", "نص الأساس", "الأساس", "Base notes"),
            multilang(f"{p}season_label", "نص الموسم", "أنسب موسم", "Best season"),
            multilang(f"{p}occasion_label", "نص المناسبة", "أنسب مناسبة", "Best occasion"),
            boolean(f"{p}show_notice", "إظهار التنبيه", True),
            multilang(f"{p}notice", "نص التنبيه",
                      "الوصف إرشادي لمساعدتك على اختيار العائلة العطرية المفضّلة.",
                      "This guide helps you discover your preferred fragrance family.",
                      "textarea", "300"),
            *theme_fields(p),
        ],
    )


def build_spf_guide():
    p = "bsg_"
    pt_fields = [
        text(f"{p}phototypes.pt_id", "معرّف داخلي (فريد)", "fair"),
        multilang(f"{p}phototypes.name", "اسم النوع", "بشرة فاتحة", "Fair skin"),
        multilang(f"{p}phototypes.desc", "وصف مختصر", "", "", "text", "200"),
        number(f"{p}phototypes.base_minutes", "دقائق الحماية الطبيعية", 15, 1, 120, ""),
        color(f"{p}phototypes.color", "اللون", "#f0d3b4"),
    ]
    pt_sample = [
        {"pt_id": "very_fair", "name": {"ar": "فاتحة جدًا", "en": "Very fair"},
         "desc": {"ar": "تحترق بسرعة ونادرًا ما تسمرّ.", "en": ""}, "base_minutes": 10, "color": "#f7e2cf"},
        {"pt_id": "fair", "name": {"ar": "فاتحة", "en": "Fair"},
         "desc": {"ar": "تحترق بسهولة وتسمرّ قليلًا.", "en": ""}, "base_minutes": 15, "color": "#f0d3b4"},
        {"pt_id": "medium", "name": {"ar": "متوسطة", "en": "Medium"},
         "desc": {"ar": "تحترق أحيانًا وتسمرّ تدريجيًا.", "en": ""}, "base_minutes": 25, "color": "#d9ab7e"},
        {"pt_id": "tan", "name": {"ar": "حنطية", "en": "Tan"},
         "desc": {"ar": "نادرًا ما تحترق وتسمرّ بسهولة.", "en": ""}, "base_minutes": 35, "color": "#b07d4f"},
        {"pt_id": "deep", "name": {"ar": "داكنة", "en": "Deep"},
         "desc": {"ar": "نادرًا جدًا ما تحترق.", "en": ""}, "base_minutes": 45, "color": "#7c4f30"},
    ]
    spf_fields = [
        number(f"{p}spf_values.spf", "قيمة عامل الحماية", 30, 2, 100, ""),
        multilang(f"{p}spf_values.label", "نص بديل (اختياري)", "", "", "text", "40"),
    ]
    spf_sample = [
        {"spf": 15}, {"spf": 30}, {"spf": 50},
    ]
    cond_fields = [
        text(f"{p}conditions.cond_id", "معرّف داخلي (فريد)", "normal"),
        multilang(f"{p}conditions.name", "اسم الحالة", "يوم عادي", "Normal day"),
        number(f"{p}conditions.factor", "معامل التأثير", 1, 0, 3, ""),
        multilang(f"{p}conditions.desc", "وصف مختصر", "", "", "text", "160"),
    ]
    cond_sample = [
        {"cond_id": "normal", "name": {"ar": "يوم عادي", "en": "Normal day"}, "factor": 1,
         "desc": {"ar": "تعرّض معتدل للشمس.", "en": ""}},
        {"cond_id": "beach", "name": {"ar": "شاطئ أو ثلج", "en": "Beach or snow"}, "factor": 0.5,
         "desc": {"ar": "انعكاس عالٍ للأشعة، حماية أقل فعليًا.", "en": ""}},
        {"cond_id": "cloudy", "name": {"ar": "يوم غائم", "en": "Cloudy"}, "factor": 1.2,
         "desc": {"ar": "أشعة أقل لكنها تصل للبشرة.", "en": ""}},
        {"cond_id": "indoor", "name": {"ar": "داخلي/ظل", "en": "Indoor / shade"}, "factor": 2,
         "desc": {"ar": "تعرّض محدود قرب النوافذ.", "en": ""}},
    ]
    tip_fields = [multilang(f"{p}tips.tip", "نصيحة", "", "", "text", "200")]
    tip_sample = [
        {"tip": {"ar": "ضعي كمية كافية توازي ملعقة صغيرة للوجه.", "en": ""}},
        {"tip": {"ar": "أعيدي التطبيق بعد السباحة أو التعرّق مباشرة.", "en": ""}},
        {"tip": {"ar": "لا تنسي الأذنين والرقبة وظهر اليدين.", "en": ""}},
    ]
    return component(
        "beauty-spf-guide", "دليل الحماية من الشمس", "sicon-sun",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "دليل الحماية من الشمس", "Sun protection guide"),
            multilang(f"{p}desc", "الوصف",
                      "اختاري نوع بشرتك وعامل الحماية وحالة الطقس لمعرفة إرشادات إعادة التطبيق والحماية.",
                      "Pick your skin type, SPF and conditions for reapplication and protection guidance.",
                      "textarea", "300"),
            static_title(f"{p}phototypes_title", "أنواع البشرة"),
            collection(f"{p}phototypes", "نوع", pt_fields, pt_sample),
            static_title(f"{p}spf_title", "قيم عامل الحماية"),
            collection(f"{p}spf_values", "قيمة", spf_fields, spf_sample),
            static_title(f"{p}conditions_title", "حالات التعرّض"),
            collection(f"{p}conditions", "حالة", cond_fields, cond_sample),
            static_title(f"{p}tips_title", "نصائح"),
            collection(f"{p}tips", "نصيحة", tip_fields, tip_sample),
            static_title(f"{p}labels_title", "النصوص والعرض"),
            multilang(f"{p}phototype_label", "نص خطوة نوع البشرة", "نوع البشرة", "Skin type"),
            multilang(f"{p}spf_label", "نص خطوة عامل الحماية", "عامل الحماية", "SPF"),
            multilang(f"{p}condition_label", "نص خطوة الحالة", "حالة الطقس", "Conditions"),
            multilang(f"{p}result_title", "عنوان النتيجة", "إرشادات الحماية", "Protection guidance"),
            number(f"{p}reapply_minutes", "فترة إعادة التطبيق (دقيقة)", 120, 30, 360, ""),
            multilang(f"{p}reapply_note", "نص إعادة التطبيق",
                      "أعيدي التطبيق كل ساعتين، وبعد السباحة أو التعرّق.",
                      "Reapply every two hours, and after swimming or sweating.", "textarea", "260"),
            boolean(f"{p}show_meter", "إظهار مؤشّر الحماية", True),
            boolean(f"{p}show_notice", "إظهار التنبيه التوعوي", True),
            multilang(f"{p}notice", "نص التنبيه التوعوي",
                      "هذه إرشادات توعوية عامة وليست نصيحة طبية.",
                      "This is general educational guidance, not medical advice.", "textarea", "300"),
            *theme_fields(p),
        ],
    )


def build_color_harmony():
    p = "bch_"
    color_fields = [
        text(f"{p}colors.color_id", "معرّف داخلي (فريد)", "rose"),
        multilang(f"{p}colors.name", "اسم الدرجة", "وردي", "Rose"),
        color(f"{p}colors.hex", "كود اللون", "#d94f70"),
    ]
    color_sample = [
        {"color_id": "rose", "name": {"ar": "وردي", "en": "Rose"}, "hex": "#d94f70"},
        {"color_id": "coral", "name": {"ar": "مرجاني", "en": "Coral"}, "hex": "#f0785a"},
        {"color_id": "berry", "name": {"ar": "توتي", "en": "Berry"}, "hex": "#9c3b63"},
        {"color_id": "nude", "name": {"ar": "نود", "en": "Nude"}, "hex": "#c98a6b"},
        {"color_id": "plum", "name": {"ar": "برقوقي", "en": "Plum"}, "hex": "#7d4f8c"},
    ]
    return component(
        "beauty-color-harmony", "عجلة تناسق ألوان المكياج", "sicon-format-fill",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "نسّقي ألوان مكياجك", "Harmonize your makeup colors"),
            multilang(f"{p}desc", "الوصف",
                      "اختاري لونًا أساسيًا لتظهر لكِ درجات متناسقة معه للشفاه والعيون والخدود.",
                      "Pick a base color to see harmonious shades for lips, eyes and cheeks.",
                      "textarea", "300"),
            static_title(f"{p}colors_title", "الدرجات الأساسية"),
            collection(f"{p}colors", "درجة", color_fields, color_sample),
            static_title(f"{p}display_title", "خيارات العرض"),
            text(f"{p}default_color", "الدرجة المختارة افتراضيًا (المعرّف)", "rose"),
            boolean(f"{p}show_complementary", "إتاحة التناسق المتكامل (Complementary)", True),
            boolean(f"{p}show_analogous", "إتاحة التناسق المتجاور (Analogous)", True),
            boolean(f"{p}show_triadic", "إتاحة التناسق الثلاثي (Triadic)", True),
            multilang(f"{p}harmony_label", "نص نوع التناسق", "نوع التناسق", "Harmony type"),
            multilang(f"{p}lips_label", "نص الشفاه", "الشفاه", "Lips"),
            multilang(f"{p}eyes_label", "نص العيون", "العيون", "Eyes"),
            multilang(f"{p}cheeks_label", "نص الخدود", "الخدود", "Cheeks"),
            boolean(f"{p}show_hex", "إظهار أكواد الألوان", True),
            boolean(f"{p}show_notice", "إظهار التنبيه", True),
            multilang(f"{p}notice", "نص التنبيه",
                      "اقتراحات الألوان إرشادية لمساعدتك على التنسيق.",
                      "Color suggestions are guidance to help you coordinate.", "textarea", "260"),
            *theme_fields(p),
        ],
    )


def build_weekly_planner():
    p = "bwp_"
    step_fields = [
        text(f"{p}steps.step_id", "معرّف داخلي (فريد)", "cleanser"),
        multilang(f"{p}steps.name", "اسم الخطوة", "المنظّف", "Cleanser"),
        color(f"{p}steps.color", "اللون", "#6c8ea8"),
        text(f"{p}steps.icon", "أيقونة أو رمز (اختياري)", "🧴"),
        dropdown_manual(f"{p}steps.slot", "وقت الاستخدام",
                        [("صباحًا ومساءً", "both"), ("صباحًا", "am"), ("مساءً", "pm")], "both"),
        dropdown_manual(f"{p}steps.frequency", "التكرار الأسبوعي",
                        [("يوميًا", "daily"), ("٣ مرات", "x3"), ("مرتين", "x2"),
                         ("مرة واحدة", "x1"), ("يوم بعد يوم", "alternate")], "daily"),
        multilang(f"{p}steps.note", "ملاحظة (اختياري)", "", "", "text", "200"),
    ]
    step_sample = [
        {"step_id": "cleanser", "name": {"ar": "المنظّف", "en": "Cleanser"}, "color": "#6c8ea8",
         "icon": "🧴", "slot": "both", "frequency": "daily"},
        {"step_id": "vitc", "name": {"ar": "سيروم فيتامين C", "en": "Vitamin C serum"}, "color": "#e0a52e",
         "icon": "🍊", "slot": "am", "frequency": "daily"},
        {"step_id": "retinol", "name": {"ar": "الريتينول", "en": "Retinol"}, "color": "#b06a8a",
         "icon": "🌙", "slot": "pm", "frequency": "x3",
         "note": {"ar": "ابدئي تدريجيًا لتجنّب التهيّج.", "en": ""}},
        {"step_id": "exfoliant", "name": {"ar": "المقشّر", "en": "Exfoliant"}, "color": "#c97b5a",
         "icon": "✨", "slot": "pm", "frequency": "x2"},
        {"step_id": "moisturizer", "name": {"ar": "المرطّب", "en": "Moisturizer"}, "color": "#5aa3a0",
         "icon": "💧", "slot": "both", "frequency": "daily"},
        {"step_id": "sunscreen", "name": {"ar": "واقي الشمس", "en": "Sunscreen"}, "color": "#e6b422",
         "icon": "☀️", "slot": "am", "frequency": "daily"},
    ]
    return component(
        "beauty-weekly-planner", "مخطّط الروتين الأسبوعي", "sicon-calendar",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "خطّتك الأسبوعية للعناية", "Your weekly care plan"),
            multilang(f"{p}desc", "الوصف",
                      "توزيع مقترح لخطوات روتينك على أيام الأسبوع حسب التكرار المناسب لكل خطوة.",
                      "A suggested weekly distribution of your routine steps by recommended frequency.",
                      "textarea", "300"),
            static_title(f"{p}steps_title", "خطوات الروتين"),
            collection(f"{p}steps", "خطوة", step_fields, step_sample),
            static_title(f"{p}display_title", "خيارات العرض"),
            dropdown_manual(f"{p}start_day", "أول أيام الأسبوع",
                            [("السبت", "sat"), ("الأحد", "sun"), ("الإثنين", "mon")], "sat"),
            dropdown_manual(f"{p}view_default", "العرض الافتراضي",
                            [("الأسبوع كامل", "week"), ("صباحًا", "am"), ("مساءً", "pm")], "week"),
            boolean(f"{p}show_view_toggle", "إظهار أزرار التبديل (صباح/مساء/كامل)", True),
            boolean(f"{p}show_legend", "إظهار مفتاح الخطوات", True),
            boolean(f"{p}show_notice", "إظهار التنبيه", True),
            multilang(f"{p}notice", "نص التنبيه",
                      "خطة إرشادية؛ عدّليها حسب حاجة بشرتك أو توصية الأخصائي.",
                      "A guiding plan; adjust it to your skin's needs or a specialist's advice.",
                      "textarea", "300"),
            *theme_fields(p),
        ],
    )


# ---------------------------------------------------------------------------
# Assembly
# ---------------------------------------------------------------------------

def build_components():
    return [
        # Cosmetics-native interactive/educational tools (product-free)
        build_shade_finder(),
        build_routine_builder(),
        build_ingredient_lab(),
        build_care_assistant(),
        build_collection_reveal(),
        # Specialised cosmetics tools (product-free)
        build_face_zone_map(),
        build_layering_board(),
        build_lighting_simulator(),
        build_pao_calculator(),
        build_texture_lab(),
        # New specialised tools replacing the former fashion clones (product-free)
        build_actives_compatibility(),
        build_fragrance_finder(),
        build_spf_guide(),
        build_color_harmony(),
        build_weekly_planner(),
    ]


def count_fields(fields):
    total = 0
    for field in fields:
        total += 1
        if field.get("type") == "collection" and field.get("fields"):
            for nested in field["fields"]:
                total += 1
                if nested.get("type") == "collection" and nested.get("fields"):
                    total += len(nested["fields"])
    return total


def validate(bundle):
    components = bundle["components"]
    names = [c["name"] for c in components]
    assert len(names) == len(set(names)), "duplicate component names"
    assert len(components) == 15, f"expected 15 components, got {len(components)}"
    for comp in components:
        assert comp.get("key"), f"missing component key: {comp['name']}"
        ids = [f["id"] for f in comp["fields"]]
        assert len(ids) == len(set(ids)), f"duplicate field ids in {comp['name']}"
    json.dumps(bundle)
    return True


def main():
    with BUNDLE_PATH.open(encoding="utf-8") as fh:
        bundle = json.load(fh)

    bundle["name"] = {
        "ar": "عناصر واجهة التجميل والعناية",
        "en": "Cosmetics & Care Storefront Elements",
    }
    bundle["description"] = {
        "ar": "عناصر تفاعلية لمتاجر مستحضرات التجميل والعناية: محدد الدرجات، منشئ الروتين، مختبر المكونات، مساعد الاختيار والمزيد.",
        "en": "Interactive elements for cosmetics & beauty-care stores: shade finder, routine builder, ingredient lab, care assistant and more.",
    }
    bundle["components"] = build_components()
    prepend_editor_controls(bundle["components"])
    apply_preview_images(bundle["components"])

    # Match the reference/fashion bundle's top-level schema exactly:
    # drop the stray "templates.test" placeholder (missing assets, not part of the kit).
    bundle.pop("templates", None)

    validate(bundle)

    with BUNDLE_PATH.open("w", encoding="utf-8") as fh:
        json.dump(bundle, fh, ensure_ascii=False, indent=4)
        fh.write("\n")

    total_fields = sum(count_fields(c["fields"]) for c in bundle["components"])
    print(f"Validation OK: {len(bundle['components'])} components, {total_fields} fields")
    print(f"Written: {BUNDLE_PATH}")


if __name__ == "__main__":
    main()
