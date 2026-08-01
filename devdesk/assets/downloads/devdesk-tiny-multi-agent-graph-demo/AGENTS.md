# Agent instructions

1. Read [Start here](START-HERE.md), then build a small DevDesk context pack.
2. Follow only the task in [Add percentage task](tasks/ADD-PERCENTAGE.md).
3. Keep changes inside `src/` and `tests/` unless the user explicitly requests a reviewed Markdown proposal.
4. Run `python -m unittest discover -s tests -v` after code changes.
5. Do not add dependencies, network access, generated files, or secrets.
6. Report exact changed paths and test results. Do not claim a DevDesk proposal was applied until the user approves it.

Completion is defined by the [Review checklist](tasks/REVIEW.md).
