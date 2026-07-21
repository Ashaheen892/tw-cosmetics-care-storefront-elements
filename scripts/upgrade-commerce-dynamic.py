#!/usr/bin/env python3
"""Upgrade commerce fields in cosmetics / fragrance / fashion twilight bundles.

Adds products_source (default: latest) + categories + product_brands pickers
without wiping component content / sample collections / preview images.
"""

from __future__ import annotations

import json
from pathlib import Path
from uuid import uuid4

KITS = {
    "tw-cosmetics-care-storefront-elements": {
        "beauty-shade-finder": "bsf_",
        "beauty-routine-builder": "brb_",
        "beauty-ingredient-lab": "bil_",
        "beauty-care-assistant": "bca_",
        "beauty-collection-reveal": "bcr_",
        "beauty-face-zone-map": "bfz_",
        "beauty-routine-layering-board": "brl_",
        "beauty-lighting-finish-simulator": "bls_",
        "beauty-pao-expiry-calculator": "bpa_",
        "beauty-texture-absorption-lab": "bta_",
        "beauty-actives-compatibility": "bac_",
        "beauty-fragrance-finder": "bff_",
        "beauty-spf-guide": "bsg_",
        "beauty-color-harmony": "bch_",
        "beauty-weekly-planner": "bwp_",
    },
    "tw-fragrance-experience-elements": {
        "fragrance-family-map": "ffm_",
        "scent-personality-finder": "spf_",
        "occasion-scent-guide": "osg_",
        "scent-scene": "ssc_",
        "fragrance-wardrobe": "fwd_",
        "ingredient-stories": "igs_",
        "scent-mood-compass": "smc_",
        "interactive-notes-pyramid": "inp_",
        "fragrance-layering-lab": "fll_",
        "smart-gift-builder": "sgb_",
        "scent-passport": "spa_",
        "spray-ritual-guide": "srg_",
        "perfume-quality-lab": "pql_",
        "scent-evolution-timeline": "set_",
        "fragrance-performance-meter": "fpm_",
    },
    "tw-fashion-style-storefront-elements": {
        "abaya-length-calculator": "alc_",
        "inquiry-parlour": "ip_",
        "new-arrivals-lookbook": "nal_",
        "collection-reveal": "cr_",
        "abaya-style-duel": "asd_",
        "abaya-fabric-lab": "afl_",
        "abaya-light-studio": "als_",
        "abaya-configurator": "acfg_",
        "virtual-abaya-boutique": "vab_",
        "abaya-style-swipe": "ass_",
        "abaya-look-builder": "alb_",
        "echo-salon": "es_",
        "abaya-embroidery-map": "aem_",
        "abaya-comparison-arena": "acm_",
        "shine-videos": "sv_",
        "abaya-care-assistant": "aca_",
        "abaya-motion-mirror": "amm_",
        "silhouette-fit-ritual": "sfr_",
    },
}

BASE = Path("/Users/ahmedshaheen/Desktop/ثيمات  سلة")

SOURCE_OPTIONS = [
    {"key": "latest", "label": "أحدث المنتجات", "value": "latest"},
    {"key": "sales", "label": "الأكثر مبيعًا", "value": "sales"},
    {"key": "selected", "label": "منتجات مختارة", "value": "selected"},
    {"key": "categories", "label": "منتجات من تصنيف", "value": "categories"},
    {"key": "brands", "label": "الماركات التجارية", "value": "brands"},
]

LINK_SOURCES = [
    {"label": "منتج", "key": "products", "value": "products"},
    {"label": "تصنيف", "key": "categories", "value": "categories"},
    {"label": "ماركة تجارية", "key": "brands", "value": "brands"},
    {"label": "صفحة تعريفية", "key": "pages", "value": "pages"},
    {"label": "مقالة", "key": "blog_articles", "value": "blog_articles"},
    {"label": "تصنيف ضمن المدونة", "key": "blog_categories", "value": "blog_categories"},
    {"label": "التخفيضات", "key": "offers_link", "value": "offers_link"},
    {"label": "الماركات التجارية", "key": "brands_link", "value": "brands_link"},
    {"label": "المدونة", "key": "blog_link", "value": "blog_link"},
    {"label": "رابط خارجي", "key": "custom", "value": "custom"},
]


def uid() -> str:
    return str(uuid4())


def cond(fid: str, value) -> dict:
    return {"id": fid, "value": value, "operation": "="}


def commerce_fields(prefix: str) -> list[dict]:
    show = f"{prefix}show_products"
    source = f"{prefix}products_source"
    show_cta = f"{prefix}show_cta"
    return [
        {
            "type": "static",
            "format": "title",
            "id": f"{prefix}commerce_title",
            "key": uid(),
            "value": "<h6 style='font-size:14px;font-weight:800;margin:22px 0 8px'>التوصيات والتحويل التجاري</h6>",
        },
        {
            "id": show,
            "key": uid(),
            "type": "boolean",
            "format": "switch",
            "label": "تفعيل عرض المنتجات",
            "description": "معطّل افتراضيًا. عند التفعيل تُعرض المنتجات حسب المصدر المختار.",
            "icon": "sicon-toggle-off",
            "value": False,
            "selected": False,
            "required": False,
        },
        {
            "id": source,
            "key": uid(),
            "icon": "sicon-t-shirt",
            "type": "items",
            "label": "نوع مصدر المنتجات",
            "format": "dropdown-list",
            "source": "Manual",
            "options": list(SOURCE_OPTIONS),
            "required": False,
            "selected": [SOURCE_OPTIONS[0]],
            "description": "الافتراضي: أحدث المنتجات.",
            "multichoice": False,
            "conditions": [cond(show, True)],
        },
        {
            "id": f"{prefix}chosen_products",
            "key": uid(),
            "icon": "sicon-keyboard_arrow_down",
            "type": "items",
            "label": "المنتجات المختارة",
            "format": "dropdown-list",
            "source": "products",
            "options": [],
            "required": False,
            "selected": [],
            "maxLength": 24,
            "minLength": 0,
            "searchable": True,
            "multichoice": True,
            "description": "منتجات سلة الحقيقية — بدون عينات وهمية.",
            "conditions": [cond(source, "selected")],
        },
        {
            "id": f"{prefix}categories",
            "key": uid(),
            "icon": "sicon-keyboard_arrow_down",
            "type": "items",
            "label": "التصنيف",
            "format": "dropdown-list",
            "source": "categories",
            "options": [],
            "required": False,
            "selected": [],
            "searchable": True,
            "conditions": [cond(source, "categories")],
        },
        {
            "id": f"{prefix}product_brands",
            "key": uid(),
            "icon": "sicon-keyboard_arrow_down",
            "type": "items",
            "label": "الماركات التجارية",
            "format": "dropdown-list",
            "source": "brands",
            "options": [],
            "required": False,
            "selected": [],
            "searchable": True,
            "description": "عرض منتجات من الماركات التجارية.",
            "conditions": [cond(source, "brands")],
        },
        {
            "id": f"{prefix}products_limit",
            "key": uid(),
            "type": "number",
            "format": "units",
            "label": "عدد المنتجات المعروضة",
            "icon": "sicon-percentage",
            "value": 8,
            "required": False,
            "unit": "",
            "minimum": 1,
            "maximum": "24",
            "conditions": [cond(show, True)],
        },
        {
            "id": f"{prefix}products_title",
            "key": uid(),
            "type": "string",
            "format": "text",
            "label": "عنوان قسم المنتجات",
            "icon": "sicon-format-text-alt",
            "value": {"ar": "منتجات مختارة لك", "en": "Selected for you"},
            "multilanguage": True,
            "required": False,
            "conditions": [cond(show, True)],
        },
        {
            "id": f"{prefix}slides_per_view",
            "key": uid(),
            "type": "number",
            "format": "units",
            "label": "عدد البطاقات الظاهرة في السلايدر",
            "icon": "sicon-percentage",
            "value": 4.2,
            "required": False,
            "unit": "",
            "minimum": 1,
            "maximum": "5",
            "conditions": [cond(show, True)],
        },
        {
            "id": f"{prefix}product_shadow",
            "key": uid(),
            "type": "boolean",
            "format": "switch",
            "label": "ظل بطاقة المنتج عند المرور",
            "icon": "sicon-toggle-off",
            "value": True,
            "selected": True,
            "required": False,
            "conditions": [cond(show, True)],
        },
        {
            "id": f"{prefix}hide_add_btn",
        f"{prefix}show_product_options",
            "key": uid(),
            "type": "boolean",
            "format": "switch",
            "label": "إخفاء زر إضافة للسلة على البطاقة",
            "icon": "sicon-toggle-off",
            "value": False,
            "selected": False,
            "required": False,
            "conditions": [cond(show, True)],
        },
        {
            "id": f"{prefix}show_product_options",
            "key": uid(),
            "type": "boolean",
            "format": "switch",
            "label": "عرض خيارات المنتج على البطاقة",
            "description": "مثل ثيم رائد: ألوان/مقاسات وخيارات المنتج تظهر داخل بطاقة المنتج.",
            "icon": "sicon-toggle-off",
            "value": False,
            "selected": False,
            "required": False,
            "conditions": [cond(show, True)],
        },
        {
            "id": show_cta,
            "key": uid(),
            "type": "boolean",
            "format": "switch",
            "label": "عرض زر رابط بعد النتيجة",
            "description": "زر يوجّه العميل لرابط تختاره.",
            "icon": "sicon-toggle-off",
            "value": False,
            "selected": False,
            "required": False,
        },
        {
            "id": f"{prefix}result_link",
            "key": uid(),
            "type": "items",
            "icon": "sicon-link",
            "label": "رابط زر التسوق",
            "format": "variable-list",
            "source": "offers_link",
            "sources": LINK_SOURCES,
            "value": None,
            "required": False,
            "searchable": True,
            "conditions": [cond(show_cta, True)],
        },
        {
            "id": f"{prefix}cta_label",
            "key": uid(),
            "type": "string",
            "format": "text",
            "label": "نص زر التسوق",
            "icon": "sicon-format-text-alt",
            "value": {"ar": "تسوق الآن", "en": "Shop now"},
            "multilanguage": True,
            "required": False,
            "conditions": [cond(show_cta, True)],
        },
    ]


def commerce_ids(prefix: str) -> set[str]:
    return {
        f"{prefix}commerce_title",
        f"{prefix}commerce_heading",
        f"{prefix}products",
        f"{prefix}show_products",
        f"{prefix}products_source",
        f"{prefix}chosen_products",
        f"{prefix}categories",
        f"{prefix}brands",
        f"{prefix}product_brands",
        f"{prefix}products_limit",
        f"{prefix}products_title",
        f"{prefix}slides_per_view",
        f"{prefix}product_shadow",
        f"{prefix}hide_add_btn",
        f"{prefix}show_cta",
        f"{prefix}result_link",
        f"{prefix}cta_label",
        f"{prefix}cta_link",
    }


def patch_kit(kit: str, prefixes: dict[str, str]) -> None:
    root = BASE / kit
    for rel in ("twilight-bundle.json", "public/twilight-bundle.json"):
        path = root / rel
        if not path.exists():
            continue
        bundle = json.loads(path.read_text())
        for component in bundle.get("components", []):
            name = component.get("name")
            prefix = prefixes.get(name)
            if not prefix:
                continue
            drop = commerce_ids(prefix)

            def is_content_collection(f: dict) -> bool:
                # Keep content collections (e.g. acm_products compare rows with a
                # nested Salla picker) — they are element content, not commerce UI.
                return f.get("format") == "collection"

            component["fields"] = [
                f
                for f in component.get("fields", [])
                if f.get("id") not in drop or is_content_collection(f)
            ]
            component["fields"].extend(commerce_fields(prefix))
        path.write_text(json.dumps(bundle, ensure_ascii=False, indent=2) + "\n")
        print(f"patched {kit}/{rel}")


def main() -> None:
    for kit, prefixes in KITS.items():
        patch_kit(kit, prefixes)


if __name__ == "__main__":
    main()
