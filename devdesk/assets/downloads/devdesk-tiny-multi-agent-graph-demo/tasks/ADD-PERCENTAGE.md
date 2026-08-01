---
title: Add completion percentage
tags: [task, python, small-change]
status: ready
---

# Add completion percentage

Add this public function to `src/status_summary.py`:

```python
completion_percent(completed, total) -> int
```

## Acceptance criteria

1. Reuse the existing input validation.
2. Return a rounded whole-number percentage.
3. Return `0` when both values are zero.
4. Do not change `format_progress` output.
5. Add focused tests for `0/0`, `1/4`, `2/3`, and `4/4`.
6. The complete test suite passes with no new dependency.

The context is in [Project brief](../docs/PROJECT-BRIEF.md) and
[Architecture](../docs/ARCHITECTURE.md). Completion is checked in the
[Review checklist](REVIEW.md), and the agent boundary is described in
[Multi-agent workflow](../docs/MULTI-AGENT-WORKFLOW.md).
