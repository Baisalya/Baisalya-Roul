---
title: Multi-agent workflow
tags: [agents, mcp, safety]
---

# Multi-agent workflow

Each connected MCP session is pinned to one DevDesk workspace. Opening another
workspace does not silently redirect an existing session.

For this demo, the agent should:

1. Use the [Add percentage task](../tasks/ADD-PERCENTAGE.md) as the entry point.
2. Follow the linked [Project brief](PROJECT-BRIEF.md),
   [Architecture](ARCHITECTURE.md), and
   [Review checklist](../tasks/REVIEW.md).
3. Build a bounded context pack and inspect the exact source and test files.
4. Queue one complete two-file proposal.
5. Wait for the user to approve or reject it in DevDesk.

The agent cannot approve its own proposal or silently write project files.
