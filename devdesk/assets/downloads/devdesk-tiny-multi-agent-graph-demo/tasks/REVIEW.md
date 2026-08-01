---
title: Review checklist
tags: [review, verification]
---

# Review checklist

Before accepting the change, confirm:

- only `src/status_summary.py` and `tests/test_status_summary.py` changed;
- `completion_percent` calls the shared validator;
- valid `0/0` returns `0`;
- `1/4`, `2/3`, and `4/4` return `25`, `67`, and `100`;
- existing `format_progress` behavior is unchanged;
- no dependency, generated file, secret, or network behavior was added;
- the complete unittest command is suggested or run only with explicit trust.

Related context: [Architecture](../docs/ARCHITECTURE.md) and
[Add percentage task](ADD-PERCENTAGE.md).
