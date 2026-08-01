"""Small, dependency-free task progress helpers."""


def _validate_progress(completed: int, total: int) -> None:
    if isinstance(completed, bool) or isinstance(total, bool):
        raise TypeError("completed and total must be integers")
    if not isinstance(completed, int) or not isinstance(total, int):
        raise TypeError("completed and total must be integers")
    if completed < 0 or total < 0:
        raise ValueError("completed and total cannot be negative")
    if completed > total:
        raise ValueError("completed cannot exceed total")


def format_progress(completed: int, total: int) -> str:
    """Return a compact human-readable progress summary."""
    _validate_progress(completed, total)
    item_label = "item" if total == 1 else "items"
    return f"{completed}/{total} {item_label} complete"
