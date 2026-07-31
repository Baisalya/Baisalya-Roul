# DevDesk Agent-ready Workspace Demo — agent instructions

## Purpose

This is a small, safe demonstration of a coding agent using DevDesk as project context. Markdown notes describe the goal, design, tasks, and review rules; `src/` and `tests/` contain the runnable code.

## Start in this order

1. Read [START-HERE.md](START-HERE.md).
2. Use DevDesk to confirm the active workspace and follow the links in the relevant task.
3. Start with a read-only explanation before proposing or making a change.
4. For code changes, update the smallest relevant source file and its test, then run the complete test suite.

## Safe behavior

- Never paste, log, or share an MCP configuration URL. It contains a private local access key.
- Treat the DevDesk graph as navigation, not proof that a statement is correct; read the linked Markdown before acting.
- When using DevDesk's proposal workflow for Markdown, submit a complete proposal and wait for the user's review. Do not claim it was applied.
- Do not delete files, run network commands, add packages, change agent configuration, or alter `project.devdesk` unless the user explicitly asks.
- Keep code changes separate from Markdown plans unless the user asks to update both.

## Validation

On Windows, use one of these commands from the project root:

```powershell
py -3 -m unittest discover -s tests -v
```

```powershell
python -m unittest discover -s tests -v
```

Report changed files and the test result in plain language.
