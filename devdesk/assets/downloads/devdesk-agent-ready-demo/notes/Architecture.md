---
title: Architecture
tags: [architecture, python, tests]
---

# Architecture

The demo uses ordinary files only:

```text
notes and tasks → project intent and acceptance criteria
src/release_summary.py → small, reusable local logic
tests/test_release_summary.py → standard-library validation
```

`release_summary.py` must not read from the network or write files. It receives release items as a list of dictionaries with a Boolean `done` field.

## Related work

- [Product Brief](Product%20Brief.md)
- [Task 02 — Add a small feature](../tasks/02-Add%20a%20small%20feature.md)
- [Task 03 — Review the result](../tasks/03-Review%20the%20result.md)
