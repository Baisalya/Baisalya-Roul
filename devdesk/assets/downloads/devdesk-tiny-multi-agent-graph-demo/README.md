# Tiny Multi-Agent Graph Demo

This intentionally small Python workspace demonstrates how DevDesk can give an
MCP-compatible AI agent focused code and knowledge context without loading an
entire large repository.

## Try the recorded workflow

1. Extract this ZIP to a normal writable folder.
2. Open `project.devdesk` in DevDesk.
3. Open [Start here](START-HERE.md) and inspect the knowledge graph.
4. Start the AI Agent Connector and connect Codex or another MCP client.
5. Send the single prompt below.
6. Review the proposed two-file change in DevDesk before applying it.

> Use DevDesk and treat `tasks/ADD-PERCENTAGE.md` as the complete task entry
> point. Automatically follow its graph relationships, build a bounded context
> pack, inspect the exact current source and test files, and understand the code
> structure. Then queue one complete reviewed implementation proposal with
> tests and a verification suggestion. Do not directly edit or apply files. Do
> not modify Markdown. I will review and approve.

The starter intentionally does not contain `completion_percent`. That is the
small feature the connected agent should propose.

## Baseline check

From the extracted project folder, run:

```powershell
python -m unittest discover -s tests -v
```

The baseline tests should pass before the proposed feature is applied.

Never publish or record the private connector URL. Rotate the DevDesk access
key immediately if it appears in a screenshot or video.
