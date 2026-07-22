#!/usr/bin/env python3
"""Add recommended image size hints to twilight-bundle.json image fields."""
from __future__ import annotations
import json
from pathlib import Path

RULES = [
  (("banner", "promo", "hero", "bg_image", "background", "wide", "garage", "spb_", "bpb_", "gpb_", "video_hero", "vh_"),
   "1920×800", "بانر عريض", "wide banner"),
  (("before", "after", "bpa_", "sba_", "img_a", "img_b", "parts-before", "style-before"),
   "1000×1200", "صورة قبل/بعد عمودية", "portrait before/after"),
  (("avatar",), "256×256", "صورة شخصية مربعة", "square avatar"),
  (("icon", "logo", "brand_image"), "512×512", "أيقونة أو شعار مربع", "square icon/logo"),
  (("category", "categories", "bcat_", "scat_", "pcat_"), "600×600", "صورة تصنيف مربعة", "square category"),
  (("map", "car_image", "zone", "face_zone", "icpm_"), "1200×900", "صورة خريطة/واجهة", "map/diagram"),
  (("poster", "cover", "thumbnail_video"), "1280×720", "غلاف فيديو", "video cover"),
  (("macro", "fabric", "texture", "swatch", "shade"), "800×800", "مربع تفصيلي للمنتج", "detail square"),
  (("step", "thumb", "card", "collection", "look", "wardrobe", "scene", "passport", "ingredient", "light", "finish"),
   "800×800", "بطاقة أو خطوة مربعة", "square card/step"),
]
DEFAULT = ("800×800", "مربع عام", "general square")

def guide_for(fid: str):
  low = (fid or "").lower()
  for keys, size, role_ar, role_en in RULES:
    if any(k in low for k in keys):
      return size, role_ar, role_en
  return DEFAULT

def make_desc(size, role_ar, role_en):
  return (
    f"المقاس المقترح: {size} بكسل ({role_ar}). "
    f"Recommended size: {size}px ({role_en}). "
    f"يفضّل JPG أو WebP بجودة عالية."
  )

def make_label_html(size, role_ar):
  return (
    f'<small style="display:block;margin-top:4px;opacity:.85">'
    f'📐 المقاس المقترح: <b>{size}</b> بكسل — {role_ar}'
    f'</small>'
  )

def patch_fields(fields):
  n = 0
  for f in fields or []:
    if not isinstance(f, dict):
      continue
    if f.get("format") == "image":
      fid = str(f.get("id") or "")
      size, role_ar, role_en = guide_for(fid)
      desc = make_desc(size, role_ar, role_en)
      html = make_label_html(size, role_ar)
      old = f.get("description")
      if isinstance(old, str) and old.strip() and "المقاس المقترح" not in old and "Recommended size" not in old:
        desc = f"{old.strip()} — {desc}"
      f["description"] = desc
      f["labelHTML"] = html
      n += 1
    if f.get("type") == "collection":
      n += patch_fields(f.get("fields"))
    else:
      n += patch_fields(f.get("fields"))
  return n

def main():
  root = Path(__file__).resolve().parent
  path = root / "twilight-bundle.json"
  data = json.loads(path.read_text())
  total = 0
  for c in data.get("components") or []:
    total += patch_fields(c.get("fields"))
  text = json.dumps(data, ensure_ascii=False, indent=4) + "\n"
  path.write_text(text)
  for rel in ("dist/twilight-bundle.json", "public/twilight-bundle.json"):
    dst = root / rel
    if dst.parent.exists():
      dst.write_text(text)
  print(f"Updated {total} image fields in {path.name}")

if __name__ == "__main__":
  main()
