from __future__ import annotations

import re
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
MENU_DATA = ROOT / "src" / "data" / "menuData.ts"


def referenced_menu_images() -> list[Path]:
    source = MENU_DATA.read_text(encoding="utf-8")
    names = re.findall(r'menuImage\("([^"]+)"\)', source)
    return [PUBLIC / "menu-images" / name for name in names]


def convert(source: Path, maximum: int, quality: int) -> Path:
    destination = source.with_suffix(".webp")
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA" if "transparency" in image.info else "RGB")
        image.thumbnail((maximum, maximum), Image.Resampling.LANCZOS)
        image.save(destination, "WEBP", quality=quality, method=6)
    return destination


def main() -> None:
    menu_sources = referenced_menu_images()
    root_sources = [
        PUBLIC / "r73-logo.png",
        PUBLIC / "whatsapp-icon.png",
        PUBLIC / "instagram-icon.png",
        PUBLIC / "facebook-icon.png",
        PUBLIC / "grill-fire-realistic.png",
    ]

    missing = [path for path in [*menu_sources, *root_sources] if not path.exists()]
    if missing:
        raise FileNotFoundError("Missing image sources: " + ", ".join(map(str, missing)))

    before = sum(path.stat().st_size for path in [*menu_sources, *root_sources])
    outputs: list[Path] = []
    for source in menu_sources:
        outputs.append(convert(source, maximum=960, quality=80))
    for source in root_sources:
        maximum = 1200 if source.name == "grill-fire-realistic.png" else 800
        quality = 88 if source.name == "r73-logo.png" else 82
        outputs.append(convert(source, maximum=maximum, quality=quality))

    after = sum(path.stat().st_size for path in outputs)
    print(f"Converted {len(outputs)} images: {before} -> {after} bytes")


if __name__ == "__main__":
    main()
