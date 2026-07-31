# DevDesk Agent-ready Workspace Demo — Gemini instructions

@START-HERE.md
@docs/AGENT-WORKFLOW.md

## Gemini CLI task rules

- Read the task and its linked notes before editing code.
- Start with the read-only prompt in `docs/DEMO-SCRIPT.md`.
- Ask for confirmation before an edit or command when Gemini CLI requests it.
- Keep DevDesk Markdown proposal review separate from normal source-code edits.
- Do not expose the DevDesk MCP URL, edit `project.devdesk`, add a dependency, or delete files unless the user explicitly asks.

## Test command

```powershell
py -3 -m unittest discover -s tests -v
```

After changing code, state what changed and whether all tests passed.
