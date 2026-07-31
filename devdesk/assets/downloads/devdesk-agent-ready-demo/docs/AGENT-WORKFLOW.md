---
title: Agent workflow and safety
tags: [safety, workflow, review]
---

# Agent workflow and safety

## What DevDesk contributes

DevDesk gives the agent the selected workspace name, Markdown links, graph neighbors, document search, optional redacted document text, and safe graph diagnostics. It does not make the agent correct by itself.

## What stays under your control

- You choose the active workspace.
- You choose whether document text is shared.
- You approve an agent's Markdown proposal in DevDesk before it is applied.
- You approve any code-edit or command confirmation requested by your AI client.

## Recommended sequence

1. Ask a read-only question about [Product Brief](../notes/Product%20Brief.md).
2. Ask the agent to make a short plan for [Task 02](../tasks/02-Add%20a%20small%20feature.md).
3. Let it update only the source and test files for that task.
4. Run the test suite.
5. Optionally ask for a Markdown proposal for [Release checklist](../notes/Release%20Checklist.md), then review it inside DevDesk.

## Keep private

The connector URL is a private local capability. Do not put it in screenshots, a repository, chat messages, or this project. If you shared it accidentally, choose **Rotate access key** in DevDesk and copy the new configuration only to your own AI client.

Next: [Demo script](DEMO-SCRIPT.md).
