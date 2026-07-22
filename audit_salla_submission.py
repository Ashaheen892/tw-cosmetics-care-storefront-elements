#!/usr/bin/env python3
"""Local Salla submission gates for Twilight element kits."""

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


def ok(msg: str) -> None:
    print(f"✅ {msg}")


def fail(msg: str) -> None:
    print(f"❌ {msg}")


def multilanguage_ids(node, out=None):
    if out is None:
        out = set()
    if isinstance(node, dict):
        if node.get("multilanguage") is True and isinstance(node.get("id"), str):
            out.add(node["id"])
        for v in node.values():
            multilanguage_ids(v, out)
    elif isinstance(node, list):
        for v in node:
            multilanguage_ids(v, out)
    return out


def all_keys(node, out=None):
    if out is None:
        out = []
    if isinstance(node, dict):
        if "key" in node:
            out.append(node["key"])
        for v in node.values():
            all_keys(v, out)
    elif isinstance(node, list):
        for v in node:
            all_keys(v, out)
    return out


def audit_multilanguage_source(root: Path, ml_ids: set[str]) -> list[str]:
    issues = []
    for fp in (root / "src").rglob("*.ts"):
        text = fp.read_text(errors="ignore")
        if re.search(r"this\.label\s*\(", text):
            issues.append(f"{fp.relative_to(root)}: this.label()")
        for mid in ml_ids:
            # raw this.config?.id without localizedString nearby is hard; keep light check
            if re.search(rf"this\.config\?\.\s*{re.escape(mid)}(?!\s*as)", text):
                # allow if localizedString( wraps it on same or nearby lines - simplified
                if f"localizedString(this.config" in text and mid in text:
                    continue
                if f"localizedString(this.config?.{mid}" in text or f'localizedString(this.config?.{mid}' in text:
                    continue
    # Prefer explicit bad patterns only
    issues = []
    for fp in (root / "src").rglob("*.ts"):
        text = fp.read_text(errors="ignore")
        if re.search(r"this\.label\s*\(", text):
            issues.append(f"{fp.relative_to(root)}: this.label()")
        for m in re.finditer(r"\$\{([^}]*this\.config\?\.[a-zA-Z0-9_]+[^}]*)\}", text):
            expr = m.group(1)
            if "localizedString" not in expr and any(mid in expr for mid in ml_ids):
                issues.append(f"{fp.relative_to(root)}: raw multilanguage expr {expr.strip()[:80]}")
    return issues


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
        "normalize_uuid_keys.py",
        "generate_bundle.py",
        "generate-automotive-bundle.py",
        "audit_salla_submission.py",
    ]
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
        for name in include_root:
            fp = root / name
            if fp.is_file():
                zf.write(fp, name)
        for folder in ("src", "dist"):
            base = root / folder
            if not base.exists():
                continue
            for fp in base.rglob("*"):
                if not fp.is_file():
                    continue
                if "clean-preview" in fp.name:
                    continue
                zf.write(fp, str(fp.relative_to(root)))
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

    if (root / "normalize_uuid_keys.py").exists():
        ok("normalize_uuid_keys.py at project root")
    else:
        fail("missing normalize_uuid_keys.py at project root")
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

    keys = all_keys(bundle)
    bad = [k for k in keys if not (isinstance(k, str) and UUID_V4.match(k))]
    if bad:
        fail(f"non-UUID keys: {len(bad)}")
        errors += 1
    else:
        ok(f"all schema keys are UUID v4 ({len(keys)} keys)")

    comps = [c.get("name") for c in bundle.get("components", []) if c.get("name")]
    missing = [n for n in comps if not (root / "dist" / f"{n}.js").exists()]
    if missing:
        fail(f"dist missing components: {missing[:10]}")
        errors += 1
    else:
        ok(f"dist covers all {len(comps)} components")

    dist_hits = 0
    for fp in (root / "dist").glob("*.js"):
        if "localizedString" in fp.read_text(errors="ignore"):
            dist_hits += 1
    if dist_hits:
        ok(f"dist files mentioning localizedString: {dist_hits}")
    else:
        fail("localizedString not found readable in dist")
        errors += 1

    z = estimate_zip_bytes(root)
    mb = z / (1024 * 1024)
    if mb >= 1:
        fail(f"estimated submission zip {mb:.2f} MB (>= 1 MB)")
        errors += 1
    else:
        ok(f"estimated submission zip {mb:.2f} MB (< 1 MB)")

    print()
    if errors:
        fail(f"{errors} gate(s) failed")
        return 1
    ok("All Salla submission gates passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
