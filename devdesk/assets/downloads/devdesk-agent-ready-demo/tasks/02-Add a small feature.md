---
title: Task 02 — Add a small feature
tags: [task, code, testing]
status: ready
---

# Task 02 — Add a small feature

## Goal

Add `count_completed_items(items)` to `src/release_summary.py`.

## Rules

- Count an item only when its `done` value is exactly `True`.
- Return `0` for an empty list.
- Add tests for normal, empty, and mixed lists.
- Do not change Markdown files during the coding task.

## Verification

Run:

```powershell
py -3 -m unittest discover -s tests -v
```

## Linked context

- [Architecture](../notes/Architecture.md)
- [Product Brief](../notes/Product%20Brief.md)
- [Task 03 — Review the result](03-Review%20the%20result.md)

Use the third prompt in [Demo script](../docs/DEMO-SCRIPT.md).
