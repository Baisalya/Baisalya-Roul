---
title: Architecture
tags: [architecture, python, constraints]
---

# Architecture

The project uses Python's standard library only.

- Production helpers live in `src/status_summary.py`.
- Unit tests live in `tests/test_status_summary.py`.
- `_validate_progress` is the single validation boundary for progress values.
- Public helpers remain pure functions with no file, network, or environment access.
- The existing `format_progress` result must not change.

The [Add percentage task](../tasks/ADD-PERCENTAGE.md) should change only the
source helper and its focused test file. Completion is checked by the
[Review checklist](../tasks/REVIEW.md).
