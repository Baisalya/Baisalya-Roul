# AI Agent Connector

The AI Agent Connector lets an MCP-compatible AI client ask DevDesk about the workspace you selected.

Examples include Codex and Gemini CLI. DevDesk does not provide or pay for the AI. You use your own client and its account, subscription, API plan, or local model.

The current connector is available on Windows. It works only while DevDesk is open and you have started it.

## What the connector adds

Without the connector, an AI reads Markdown only when you give it files or folder access through that AI client.

With the connector, the AI can ask DevDesk for:

- the active workspace and safe counts;
- matching documents;
- one redacted Markdown document, when you allow document text;
- connected graph nodes and links;
- broken links and other workspace issues;
- the current OKF structure report;
- change proposals waiting for your review.

This gives the AI the same indexed structure that DevDesk displays. It does not guarantee that every AI answer is correct.

## How graph nodes help an AI

A **node** is an indexed Markdown document.

A **connection** is a resolved written relationship, such as a wiki link or Markdown link from one document to another.

Example:

```markdown
# Release plan

See [[Testing checklist]] before release.
```

DevDesk can connect `Release plan.md` to `Testing checklist.md`. An AI can request the nearby graph neighborhood instead of searching every unrelated file.

The graph helps an AI:

1. Find relevant notes.
2. Follow written relationships.
3. See backlinks and broken links.
4. Keep requests inside the selected workspace.

A graph line does not prove meaning, truth, trust, or importance. It means DevDesk resolved a saved link. The AI still needs document text, reliable sources, and your instructions to understand the task.

## Start the connector

1. Open DevDesk on Windows.
2. Open or select the workspace you want the AI to use.
3. Open **Settings**.
4. Select **DevDesk Agent Connector**.
5. Review **Agent permissions**.
6. Select **Start connector**.

Expected result: the page shows **Running** and displays configurations for Codex and Gemini CLI.

If no workspace is selected, the connector can run, but workspace tools return a message asking you to select one.

## Try the Agent-ready demo

The [Agent-ready workspace demo](../downloads.html#agent-demo) is a small downloadable project for trying the complete flow before you connect an AI client to your own work.

1. Download and extract the demo ZIP from the Downloads page.
2. Open its `project.devdesk` file in DevDesk.
3. Open **Knowledge graph** to see the linked brief, architecture, tasks, and review checklist.
4. Start the connector and turn on **Share redacted Markdown text** for the reading demo.
5. Copy the configuration for Codex or Gemini CLI.
6. Run the read-only prompt in the demo's `docs/DEMO-SCRIPT.md` file.

The download includes `AGENTS.md` for Codex, `GEMINI.md` for Gemini CLI, clear prompts, a small Python module, and standard-library tests. It contains no connector URL, API key, AI account, or cloud copy of your project.

Start with the read-only task. Only then run the small coding task, and ask for a Markdown proposal rather than an automatic Markdown edit.

## Choose permissions

Both optional permissions are off by default.

### Share redacted Markdown text

Turn this on when the AI needs document bodies.

DevDesk removes common secret-like values before returning text. Redaction is conservative, but no automatic filter recognizes every possible secret. Review private files before sharing them with any AI.

Keep it off when the AI only needs paths, titles, graph connections, diagnostics, or OKF status.

### Allow review proposals

Turn this on when the AI should suggest an edit to an existing Markdown file.

The AI sends a complete proposed replacement and the fingerprint of the version it read. DevDesk stores a pending review. It does not change the file.

If the file changes before approval, DevDesk refuses the stale proposal.

## Connect Codex

1. Start the connector.
2. Select **Copy Codex config.toml**.
3. Open Codex **Settings > MCP servers**, or edit Codex `config.toml`.
4. Add the copied `devdesk` server block.
5. Restart or refresh MCP servers when Codex asks.
6. Ask Codex to list its DevDesk tools.

Expected result: Codex lists tools such as `get_active_workspace`, `search_documents`, and `get_graph_neighbors`.

For current client controls, see the official [Codex MCP guide](https://learn.chatgpt.com/docs/extend/mcp.md).

Codex automatically uses an `AGENTS.md` file in the project as durable project guidance. The demo's instructions ask it to read the task context first, keep changes small, run tests, and never expose a private connector URL.

## Connect Gemini CLI

1. Start the connector.
2. Select **Copy Gemini CLI settings.json**.
3. Merge the copied `devdesk` entry into the `mcpServers` object in Gemini CLI settings.
4. Start or restart Gemini CLI.
5. Run `/mcp`.

Expected result: Gemini CLI shows `devdesk` as a connected MCP server.

Do not replace existing `mcpServers` entries when merging the DevDesk entry. See the official [Gemini CLI MCP server guide](https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md).

Gemini CLI reads the demo's `GEMINI.md` project instructions. Use `/memory show` to inspect the loaded instructions if needed.

## Useful first requests

Start with a read-only question:

> Use DevDesk to tell me which workspace is active. Do not read document text.

Then try:

> Search DevDesk for release notes and show the connected graph neighborhood.

When document sharing is on:

> Read `Release plan.md`, explain the task in simple steps, and cite the workspace-relative files you used.

When proposals are on:

> Propose an improvement to `Release plan.md`. Do not claim the file changed. I will review it in DevDesk.

## Tools exposed by DevDesk

| Tool | Purpose | Writes a file? |
|---|---|---:|
| `get_active_workspace` | Safe workspace metadata and counts | No |
| `search_documents` | Find indexed documents | No |
| `read_document` | Read redacted Markdown when allowed | No |
| `get_graph_neighbors` | Follow resolved connections | No |
| `get_workspace_issues` | Read bounded workspace diagnostics | No |
| `get_okf_status` | Run the same read-only OKF validation | No |
| `list_change_proposals` | Show proposal status | No |
| `propose_document_change` | Queue a complete replacement for review | No |

DevDesk does not expose an MCP tool that approves, rejects, deletes, runs a terminal, or pushes Git changes.

## Review a proposed change

1. Return to **DevDesk Agent Connector**.
2. Find **Review agent proposals**.
3. Select **Review**.
4. Read the summary.
5. Compare **Current file** and **Proposed file**.
6. Select one action:
   - **Cancel** keeps it pending.
   - **Reject** closes it without changing the file.
   - **Approve and apply** saves it only if the original file is unchanged.

## Stop or remove access

Select **Stop connector** when the AI no longer needs access.

Select **Rotate access key** if you copied the configuration to the wrong place or no longer trust an old configuration. Replace the URL in every connected client.

The server listens only on the Windows loopback address. Other devices on the network cannot use it directly.

## Troubleshooting

### The AI cannot connect

1. Keep DevDesk open.
2. Confirm the connector says **Running**.
3. Copy the current configuration again.
4. Confirm another program is not using port `45873`.
5. Restart or refresh the AI client's MCP servers.

### The AI says no workspace is selected

Open a workspace in DevDesk and repeat the request. Only the active workspace is exposed.

### The AI cannot read a document

Turn on **Share redacted Markdown text**. Use the exact workspace-relative path returned by `search_documents`.

### A proposal was refused

Turn on **Allow review proposals**. If the file changed, ask the AI to read it again and create a fresh proposal.

## Privacy and cost

DevDesk does not add analytics, an AI subscription, an API key, or a hosted AI backend.

Your AI client decides where its prompts and tool results are processed. A cloud AI may send requested workspace context to its provider. A local model may keep processing on your device. Check the client's privacy and pricing before connecting it.

The connector access key is protected for the Windows user when platform protection is available. Otherwise DevDesk uses a session-only key.

For the protocol model and security guidance, see the official [Model Context Protocol documentation](https://modelcontextprotocol.io/docs/getting-started/intro) and [Streamable HTTP transport specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports).

## Terms

- **AI agent:** an AI client that can choose and call tools while completing a task.
- **MCP:** Model Context Protocol, a standard way for a client to discover and call tools.
- **Loopback:** a local-only network address that points back to the same computer.
- **Fingerprint:** a value used to detect whether a file changed after it was read.
- **Proposal:** a suggested replacement waiting for your explicit review.
