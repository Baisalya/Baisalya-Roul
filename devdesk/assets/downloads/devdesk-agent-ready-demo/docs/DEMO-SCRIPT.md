---
title: 10-minute demo script
tags: [demo, prompts, verification]
---

# 10-minute demo script

Run these prompts in order. They work with Codex and Gemini CLI after the DevDesk MCP connection is active.

## 1. Prove the connection is read-only

```text
Use DevDesk to confirm the active workspace. Read the Product Brief and list the linked notes relevant to the release. Do not change files.
```

Expected result: the agent identifies **DevDesk Agent-ready Workspace Demo**, explains the release goal, and names the linked notes.

## 2. Ask for a coding plan

```text
Read Task 02 and its linked Architecture note. Make a concise implementation and test plan. Do not change files.
```

Expected result: the agent identifies `src/release_summary.py` and `tests/test_release_summary.py`.

## 3. Complete a small, tested change

```text
Implement Task 02. Add count_completed_items(items), write focused tests, run the full test suite, and explain the changed files. Do not change Markdown files.
```

Expected result: only the source and test file change, and all tests pass.

## 4. Demonstrate review-first Markdown changes

```text
Use DevDesk to propose a short Completed section for Release Checklist.md based on the test result. Do not apply the proposal.
```

Expected result: DevDesk shows a pending proposal for you to review. The file stays unchanged until you select **Approve and apply**.

## 5. Optional safe automation

Turn on **Allow scheduled read-only checks** in DevDesk. Then ask:

```text
Use DevDesk to schedule a daily graph health check and show its plan. Do not change project files.
```

Expected result: DevDesk records the plan and local result log. It does not write project files.

Return to [Start here](../START-HERE.md) if a step is not ready.
