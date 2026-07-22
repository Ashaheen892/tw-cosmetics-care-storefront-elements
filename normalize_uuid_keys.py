#!/usr/bin/env python3
"""Ensure every Twilight schema `key` is an RFC 4122 UUID v4."""

from __future__ import annotations

import json
import uuid
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGETS = (
    ROOT / "twilight-bundle.json",
    ROOT / "public" / "twilight-bundle.json",
    ROOT / "dist" / "twilight-bundle.json",
)


def is_uuid_v4(value: object) -> bool:
    if not isinstance(value, str):
        return False
    try:
        parsed = uuid.UUID(value)
    except (ValueError, AttributeError):
        return False
    return parsed.version == 4 and str(parsed) == value.lower()


def normalize(node: object, replacements: dict[str, str]) -> int:
    changed = 0
    if isinstance(node, dict):
        key = node.get("key")
        if isinstance(key, str) and not is_uuid_v4(key):
            node["key"] = replacements.setdefault(key, str(uuid.uuid4()))
            changed += 1
        for value in node.values():
            changed += normalize(value, replacements)
    elif isinstance(node, list):
        for value in node:
            changed += normalize(value, replacements)
    return changed


def main() -> None:
    source = ROOT / "twilight-bundle.json"
    bundle = json.loads(source.read_text(encoding="utf-8"))
    replacements: dict[str, str] = {}
    changed = normalize(bundle, replacements)
    text = json.dumps(bundle, ensure_ascii=False, indent=4) + "\n"

    for target in TARGETS:
        if target == source or target.parent.exists():
            target.write_text(text, encoding="utf-8")

    print(f"UUID v4 keys normalized: {changed}")


if __name__ == "__main__":
    main()
