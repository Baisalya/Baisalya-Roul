---
title: Connect Codex or Gemini CLI
tags: [setup, codex, gemini, mcp]
---

# Connect Codex or Gemini CLI

DevDesk creates the local connection details for your current Windows user and current session. Do not use a URL copied from someone else.

## Before you copy anything

1. Open `project.devdesk` in DevDesk.
2. Open **Settings → DevDesk Agent Connector**.
3. Turn on **Share redacted Markdown text** for this demo.
4. Select **Start connector**. The page should show **Running**.

## Codex

1. Select **Copy Codex config.toml** in DevDesk.
2. Add the copied block to your personal Codex configuration. On Windows, the fallback location is `C:\Users\<you>\.codex\config.toml`.
3. Restart Codex fully, then start a new task.
4. Ask: `Use DevDesk to confirm the active workspace. Do not read document text.`

If Codex has an MCP server screen, you can add the copied configuration there. The local DevDesk server does not use an OAuth sign-in; the private URL already identifies the local session.

## Gemini CLI

1. Select **Copy Gemini CLI settings.json** in DevDesk.
2. Merge the copied `devdesk` entry into `mcpServers` in your Gemini CLI settings. Do not replace other servers.
3. Restart Gemini CLI and run `/mcp` to confirm `devdesk` is connected.
4. Run the first prompt in [Demo script](DEMO-SCRIPT.md).

Gemini CLI automatically reads this project's `GEMINI.md` file. Use `/memory show` if you want to confirm the project instructions are loaded.

Next: [Demo script](DEMO-SCRIPT.md).
