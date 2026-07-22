#!/usr/bin/env python3
"""Audit a Twilight element kit against Salla submission gates."""

from __future__ import annotations

import json
import re
import sys
import zipfile
from io import BytesIO
from pathlib import Path

UUID_V4 = re.compile(
    r"^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$",
    re.I,
)


def fail(msg: str) -> None:
    print(f"❌ {msg}")


def ok(msg: str) -> None:
    print(f"✅ {msg}")


def warn(msg: str) -> None:
    print(f"⚠️  {msg}")


def multilanguage_ids(bundle: dict) -> set[str]:
    ids: set[str] = set()

    def walk(fields):
        for field in fields or []:
            if not isinstance(field, dict):
                continue
            fid = field.get("id")
            if fid and field.get("multilanguage") in (True, "true", 1, "1"):
                ids.add(str(fid))
            if field.get("type") == "collection":
                walk(field.get("fields"))
            walk(field.get("fields"))

    for component in bundle.get("components") or []:
        walk(component.get("fields"))
    return ids


def collect_keys(bundle: dict) -> list[str]:
    keys: list[str] = []

    def walk(fields):
        for field in fields or []:
            if not isinstance(field, dict):
                continue
            if "key" in field and field.get("type") != "static":
                keys.append(str(field.get("key") or ""))
            for opt in field.get("options") or []:
                if isinstance(opt, dict) and "key" in opt:
                    keys.append(str(opt.get("key") or ""))
            if field.get("type") == "collection":
                walk(field.get("fields"))
            walk(field.get("fields"))

    for component in bundle.get("components") or []:
        walk(component.get("fields"))
    return keys


def component_slugs(root: Path, bundle: dict) -> list[str]:
    src = root / "src" / "components"
    if src.exists():
        return sorted(p.name for p in src.iterdir() if p.is_dir())
    # fallback: try infer from nothing
    return []


def audit_multilanguage_source(root: Path, ml_ids: set[str]) -> list[str]:
    issues: list[str] = []
    leaf = {i for i in ml_ids if "." not in i}
    for path in (root / "src").rglob("*.ts"):
        text = path.read_text(errors="ignore")
        for i, line in enumerate(text.splitlines(), 1):
            if "this.label(" in line:
                issues.append(f"{path.relative_to(root)}:{i} uses this.label()")
                continue
            if "${" not in line or "localizedString" in line:
                continue
            # Only this.config / standalone c. — avoid matching trailing "c" in words
            for m in re.finditer(
                r"(?:this\.config|[^a-zA-Z0-9_]c)\??\.([a-z0-9_]+)", line
            ):
                fid = m.group(1)
                if fid in leaf:
                    issues.append(
                        f"{path.relative_to(root)}:{i} raw multilanguage `{fid}`"
                    )
            for m in re.finditer(r"this\.config\??\.([a-z0-9_]+)", line):
                fid = m.group(1)
                if fid in leaf and "localizedString" not in line:
                    issues.append(
                        f"{path.relative_to(root)}:{i} raw multilanguage `{fid}`"
                    )
    # dedupe
    return sorted(set(issues))


def estimate_zip_bytes(root: Path) -> int:
    buf = BytesIO()
    include_root = [
        "package.json",
        "tsconfig.json",
        "vite.config.ts",
        "twilight-bundle.json",
        "README.md",
        ".gitignore",
        "pnpm-workspace.yaml",
        "audit_salla_submission.py",
    ]
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
        for name in include_root:
            fp = root / name
            if fp.is_file():
                zf.write(fp, name)
        essential_scripts = {
            "normalize_uuid_keys.py",
            "generate_bundle.py",
            "generate-automotive-bundle.py",
        }
        for folder in ("src", "dist", "scripts", "public"):
            base = root / folder
            if not base.exists():
                continue
            for fp in base.rglob("*"):
                if not fp.is_file():
                    continue
                if "clean-preview" in fp.name:
                    continue
                rel = fp.relative_to(root)
                if folder == "scripts" and fp.name not in essential_scripts:
                    continue
                if folder == "public" and fp.name != "twilight-bundle.json":
                    continue
                zf.write(fp, str(rel))
    return len(buf.getvalue())


def main() -> int:
    root = Path.cwd()
    if len(sys.argv) > 1:
        root = Path(sys.argv[1]).resolve()

    print(f"Auditing: {root.name}\n")
    errors = 0

    bundle_path = root / "twilight-bundle.json"
    if not bundle_path.exists():
        fail("missing twilight-bundle.json")
        return 1
    bundle = json.loads(bundle_path.read_text())

    loc = root / "src" / "utils" / "localizedString.ts"
    if loc.exists():
        ok("localizedString.ts present")
    else:
        fail("missing src/utils/localizedString.ts")
        errors += 1

    if (root / "scripts" / "normalize_uuid_keys.py").exists():
        ok("scripts/normalize_uuid_keys.py present")
    else:
        fail("missing scripts/normalize_uuid_keys.py")
        errors += 1

    ml_ids = multilanguage_ids(bundle)
    ok(f"multilanguage fields in bundle: {len(ml_ids)}")
    ml_issues = audit_multilanguage_source(root, ml_ids)
    if ml_issues:
        fail(f"multilanguage display risks: {len(ml_issues)}")
        for item in ml_issues[:20]:
            print(f"   - {item}")
        errors += 1
    else:
        ok("no raw multilanguage this.config display / this.label() found")

    keys = collect_keys(bundle)
    bad_keys = [k for k in keys if k and not UUID_V4.match(k)]
    if bad_keys:
        fail(f"non-UUID keys: {len(bad_keys)} (sample: {bad_keys[:5]})")
        errors += 1
    else:
        ok(f"all schema keys are UUID v4 ({len(keys)} keys)")

    slugs = component_slugs(root, bundle)
    missing = [s for s in slugs if not (root / "dist" / f"{s}.js").exists()]
    if not slugs:
        warn("no src/components found")
    elif missing:
        fail(f"missing dist/*.js for: {missing}")
        errors += 1
    else:
        ok(f"dist covers all {len(slugs)} components")

    # localizedString should appear in dist for review scanners
    dist_files = list((root / "dist").glob("*.js")) if (root / "dist").exists() else []
    if dist_files:
        with_name = sum(1 for p in dist_files if "localizedString" in p.read_text(errors="ignore"))
        if with_name == 0 and ml_ids:
            warn("no dist/*.js contains literal `localizedString` (Salla scanner may fail)")
        else:
            ok(f"dist files mentioning localizedString: {with_name}")

    size = estimate_zip_bytes(root)
    mb = size / (1024 * 1024)
    if mb >= 1:
        fail(f"estimated submission zip {mb:.2f} MB (>= 1 MB)")
        errors += 1
    else:
        ok(f"estimated submission zip {mb:.2f} MB (< 1 MB)")

    # Structure hints
    for banned in ("public", "scripts"):
        # only warn if tracked by git
        pass

    print()
    if errors:
        fail(f"{errors} gate(s) failed")
        return 1
    ok("All Salla submission gates passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
