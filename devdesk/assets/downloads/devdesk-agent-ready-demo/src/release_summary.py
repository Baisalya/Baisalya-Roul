"""Small local helpers for the DevDesk Agent-ready Workspace Demo."""

from __future__ import annotations


def normalize_title(title: str) -> str:
    """Return a readable title with leading, trailing, and repeated spaces removed."""
    return " ".join(title.split())


def count_open_items(items: list[dict[str, object]]) -> int:
    """Return the number of items that are not marked done."""
    return sum(item.get("done") is not True for item in items)


def build_release_summary(title: str, items: list[dict[str, object]]) -> str:
    """Build a local, human-readable summary of the supplied release items."""
    clean_title = normalize_title(title)
    total = len(items)
    open_items = count_open_items(items)
    return f"{clean_title}: {total} items, {open_items} open"
