# AI Agent Connector

The AI Agent Connector gives each MCP-compatible AI client an isolated session
that can ask DevDesk about one explicitly assigned workspace.

Examples include Codex and Gemini CLI. DevDesk does not provide or pay for the AI. You use your own client and its account, subscription, API plan, or local model.

The connector is available on Windows and Android. It works only while DevDesk
is open and you have started it. On Android, the compatible MCP client must run
on the same device; keep DevDesk open because Android can stop background apps.

## What the connector adds

Without the connector, an AI reads project files only when you give it files or
folder access through that AI client.

With the connector, the AI can ask DevDesk for:

- the active workspace and safe counts;
- a bounded metadata-only project map with detected stacks, languages, file
  roles, sizes, and workspace-relative paths;
- project-file search by path, language, and role;
- redacted source, configuration, test, and Markdown text only when you allow
  workspace text sharing;
- a token-budgeted context pack that combines relevant project snippets,
  detected stacks, and connected Markdown knowledge;
- a bounded cross-language symbol and dependency map without running project
  code;
- matching documents;
- connected graph nodes and links;
- broken links and other workspace issues;
- the current OKF structure report;
- workspace-scoped multi-file project proposals waiting for review;
- detected analyzer/test/validation plans and completed check results;
- local read-only automation plans, results, and retry state.

This gives the AI the same indexed structure that DevDesk displays. It does not guarantee that every AI answer is correct.

## Universal project intelligence and lower token use

DevDesk detects common Flutter/Dart, JavaScript/TypeScript, Rust, Go, Python,
JVM, PHP, Ruby, Swift, C/C++, .NET, container, Terraform, and OKF evidence.
`get_code_structure` adds a bounded language-neutral map of common classes,
interfaces, functions, imports, includes, and package uses. It never starts a
language server or executes project code, so it also works for Android
document-tree workspaces.

For a focused coding task, the agent should build a small context pack, follow
the code structure and connected OKF/Markdown, then read only the exact current
files it plans to change. This reduces repeated whole-project context, but the
map is not a compiler-grade semantic model and does not prove code correctness.
Context packs also include bounded `codeKnowledgeLinks` when source
paths/snippets and knowledge documents share useful terms. They are labeled as
lexical navigation suggestions, not saved graph relationships or proof.

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

1. Open DevDesk on Windows or Android.
2. Open or select the workspace you want the AI to use.
3. Open **Settings**.
4. Select **DevDesk Agent Connector**.
5. Review **Agent permissions**.
6. Select **Start connector**.

Expected result: the page shows **Running** and displays configurations for
Codex, Gemini CLI, and another compatible MCP client.

When a workspace is selected, a newly initialized agent session is assigned to
that workspace. With no selection it stays **Independent / unassigned** until
you assign it from **Connected agents**. Opening another workspace in DevDesk
never silently redirects an existing agent.

## Agent operations and multiple workspaces

The connector page is a local operations center:

- **Agent operations** summarizes connector, connected, working, and review
  counts.
- **Connected agents** shows client name/version, fixed workspace, presence,
  request count, current observable tool, and effective permissions.
- **Live activity and audit** shows redacted tool events, duration, status, and
  safe error codes without storing prompts, file contents, access keys, or
  private model reasoning.
- **Review agent proposals** keeps every write behind human approval.

An idle session can be explicitly assigned, left independent, paused, resumed,
or revoked. Multiple agents may read concurrently. Approved writes are
serialized per workspace and rechecked with fingerprints. Overlapping pending
proposals are warned and a stale proposal fails instead of overwriting a newer
change. Agents assigned to different workspaces remain independent.

DevDesk issues an opaque MCP session ID and uses recent requests to report
**Online**, **Working**, **Waiting for review**, **Idle**, or **Disconnected**.
A compatible HTTP client returns the `Mcp-Session-Id` header. A client shown as
**Legacy session** omitted that header and should be updated before parallel
multi-agent use.

The audit can be filtered, copied as privacy-safe JSON, cleared, and retained
for 1, 7, 30, or 90 days.

## Try the featured graph-to-code demo

The [Tiny Multi-Agent Graph Demo](../downloads.html#agent-demo) is the fastest way to see the complete DevDesk workflow. The page includes a silent screen recording, a downloadable workspace ZIP, and the exact one-prompt task used in the recording.

1. Download and extract **Demo 1** from the Downloads page.
2. Open `project.devdesk` in DevDesk.
3. Open **Knowledge graph** and confirm that the task links to the project brief, architecture note, workflow, source, tests, and review checklist.
4. Open **AI Agent**, start the connector, choose this workspace, and enable only the permissions needed for the demo.
5. Connect Codex or another compatible MCP client.
6. Send the prompt from `START-HERE.md`: “Read the ready task and its linked project context. Implement it, add focused tests, and queue one reviewed DevDesk proposal. Do not apply files or run commands.”
7. In DevDesk, open **Review agent proposals**, inspect both proposed files, and approve only if the change matches the task.
8. If you trust the local workspace, run the suggested standard-library test command from the review screen.

Demo 1 intentionally begins with a small incomplete Python project. Its linked Markdown graph gives the agent bounded architecture and acceptance criteria without requiring one giant prompt. The ZIP contains no connector URL, access key, AI account, or cloud copy of your files.

The recording is currently silent. Future narration files named `devdesk-demo-en.mp3`, `devdesk-demo-hi-en.mp3`, and `devdesk-demo-or-en.mp3` will automatically appear as English, Hinglish, and Odia + English choices when they are uploaded beside the website audio README. Until then, choose **Silent** and use the on-page steps.

The [original agent-ready workspace](../downloads.html#agent-ready-demo) remains available as **Demo 2**. Use it for a slower read-only walkthrough with Codex and Gemini CLI instructions before trying reviewed code changes.

## Choose permissions

All optional permissions are off by default. Page-level switches update the
default. Use **Permissions** on one agent to narrow that session independently.

### Share redacted workspace text

Turn this on when the AI needs bounded source, configuration, test, or Markdown
content. It controls content search, exact project-file reads, context packs,
and Markdown document bodies. The project map remains metadata-only, and
project search can still match paths, languages, and roles while this permission
is off.

DevDesk skips generated folders, symbolic links, and paths that commonly contain
credentials. Returned UTF-8 text is size-limited and common secret-like values
are redacted. Redaction is conservative, but no automatic filter recognizes
every possible secret. Review private files before sharing them with any AI.

Keep it off when the AI only needs paths, titles, graph connections, diagnostics, or OKF status.

### Allow project change reviews

Turn this on when the AI should queue reviewed source, test, configuration, or
knowledge changes.

An agent may queue up to 25 complete UTF-8 replacements or exclusive new-file
creates with exact current fingerprints. DevDesk stores the before/after
snapshots and optional verification suggestions locally. Queueing changes no
file and runs no command.

DevDesk checks the complete set before the first write, creates a private
recovery journal, rolls back a partial apply in reverse order, and offers
verified undo after success. Any stale target refuses the complete set.

Detected verification adapters cover Flutter/Dart, Node, Rust, Go, Python,
Maven/Java, Gradle/JVM, PHP, Ruby, Swift, CMake/C/C++, .NET, and Terraform.
On Windows they require local workspace execution trust and explicit selection
inside the review. DevDesk starts fixed adapter executables/arguments, not an
agent-supplied shell string. Package tests can still execute project-controlled
scripts, so trust only projects you know.

### Allow scheduled read-only checks

Turn this on only when the agent should schedule recurring graph-health checks.

These tasks keep a local plan, step log, result, retry count, and next-run time.
They can report broken, ambiguous, duplicate, malformed, skipped, or orphaned
knowledge items, but they cannot edit project files. Tasks run only while
DevDesk is open; an overdue check resumes after the app reopens.

You can also schedule a daily graph check directly from the Agent Connector,
pause a task, run it now, or retry a failed task. Disabling the permission
pauses scheduled checks.

## Connect Codex

Use this configuration only in a Codex client running on the same device as
DevDesk. For Android, use the generic MCP endpoint with a compatible local
client that supports HTTP MCP servers.

1. Start the connector.
2. Select **Copy Codex config.toml**.
3. Open Codex **Settings > MCP servers**, or edit Codex `config.toml`.
4. Add the copied `devdesk` server block.
5. Restart or refresh MCP servers when Codex asks.
6. Ask Codex to list its DevDesk tools.

Expected result: Codex lists tools such as `get_active_workspace`,
`get_project_map`, `search_project_files`, `build_context_pack`,
`get_code_structure`, `get_verification_plan`, `propose_project_change`, and
`get_change_proposal`.

For current client controls, see the official [Codex MCP guide](https://learn.chatgpt.com/docs/extend/mcp.md).

Codex automatically uses an `AGENTS.md` file in the project as durable project guidance. The demo's instructions ask it to read the task context first, keep changes small, run tests, and never expose a private connector URL.

## Connect Gemini CLI

Use this configuration only in a Gemini CLI client running on the same device
as DevDesk. For Android, use the generic MCP endpoint with a compatible local
client that supports HTTP MCP servers.

1. Start the connector.
2. Select **Copy Gemini CLI settings.json**.
3. Merge the copied `devdesk` entry into the `mcpServers` object in Gemini CLI settings.
4. Start or restart Gemini CLI.
5. Run `/mcp`.

Expected result: Gemini CLI shows `devdesk` as a connected MCP server.

Do not replace existing `mcpServers` entries when merging the DevDesk entry. See the official [Gemini CLI MCP server guide](https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md).

Gemini CLI reads the demo's `GEMINI.md` project instructions. Use `/memory show` to inspect the loaded instructions if needed.

## Connect another MCP-compatible agent

1. Start the connector in DevDesk.
2. Select **Copy** beside **Compatible MCP endpoint URL**.
3. In your agent's MCP settings, add that value as a local HTTP MCP server.
4. Keep DevDesk open, then restart or refresh the agent's MCP servers.

The exact settings format differs by client. DevDesk uses JSON-RPC over local
HTTP POST, so the client must support HTTP MCP servers. Never share the copied
URL: it contains the local access key for the current connector session.

After initialization, the client should return DevDesk's `Mcp-Session-Id` on
later requests. Rotating the connector access key disconnects all sessions;
revoking one Connected agent affects only that session.

### Android checklist

1. Start DevDesk and the compatible MCP client on the same Android device.
2. Keep DevDesk open while the client uses the connector.
3. Use the copied `127.0.0.1` endpoint exactly as shown; do not replace it
   with a network IP address.
4. If Android pauses DevDesk and the connection drops, reopen DevDesk and
   restart or refresh the MCP client.

## Useful first requests

Start with a read-only question:

> Use DevDesk to tell me which workspace is active. Do not read document text.

Then try:

> Search DevDesk for release notes and show the connected graph neighborhood.

When document sharing is on:

> Read `Release plan.md`, explain the task in simple steps, and cite the workspace-relative files you used.

For a software project when workspace text sharing is on:

> Build a 4,000-token context pack for the login failure. Summarize the detected
> stack and cite the project-relative source, configuration, test, and knowledge
> files used. Do not edit anything.

When proposals are on:

> Build a focused context pack for the login issue, inspect code structure and
> connected knowledge, read every target again, then queue one multi-file
> project proposal with exact fingerprints and relevant verification IDs. Do
> not claim files changed or checks ran. I will review both in DevDesk.

When scheduled read-only checks are on:

> Schedule a graph health check every 24 hours. Do not edit any files.

## Tools exposed by DevDesk

| Tool | Purpose | Writes a file? |
|---|---|---:|
| `get_active_workspace` | Safe workspace metadata and counts | No |
| `get_project_map` | Bounded stacks, languages, roles, and file metadata without content | No |
| `search_project_files` | Search project metadata and, when allowed, redacted text | No |
| `read_project_file` | Read one bounded redacted UTF-8 project file when allowed | No |
| `build_context_pack` | Assemble relevant redacted project snippets and connected knowledge within a requested approximate token budget | No |
| `get_code_structure` | Build bounded cross-language symbols and dependencies | No |
| `get_verification_plan` | List detected allowlisted checks and execution availability | No |
| `search_documents` | Find indexed documents | No |
| `read_document` | Read redacted Markdown when allowed | No |
| `get_graph_neighbors` | Follow resolved connections | No |
| `get_workspace_issues` | Read bounded workspace diagnostics | No |
| `get_okf_status` | Run the same read-only OKF validation | No |
| `list_change_proposals` | Show proposal status | No |
| `get_change_proposal` | Show one proposal and redacted verification results | No |
| `list_automation_tasks` | Show local task plans, logs, results, and retries | No |
| `schedule_graph_health_check` | Schedule a recurring read-only graph check | No |
| `run_automation_task` | Run one existing read-only task now | No |
| `propose_document_change` | Queue a complete replacement for review | No |
| `propose_project_change` | Queue a fingerprinted multi-file change set for review | No |

DevDesk does not expose an MCP tool that approves, rejects, undoes, deletes,
runs an arbitrary terminal command, or pushes Git changes.

## Professional coding and repair loop

1. The agent builds a bounded project map and context pack.
2. It follows code symbols/dependencies and connected OKF/Markdown.
3. It reads every exact target file and current fingerprint.
4. It gets the verification plan and queues one multi-file proposal.
5. You expand and compare every before/after file and select checks.
6. DevDesk preflights, journals, applies, and verifies or rolls back.
7. The agent polls `get_change_proposal` and may queue a new reviewed repair.

The agent cannot approve its own work. This workflow reduces unnecessary
context and supports many project types, but no professional tool can promise
that every AI will finish every project correctly.

## Review a proposed change

1. Return to **DevDesk Agent Connector** and select **Review**.
2. Expand every affected file and compare current/proposed content.
3. If a conflict appears, ask the agent to reread all targets.
4. Optionally select detected verification checks; suggestions are not
   pre-approved.
5. Cancel, reject, or select **Approve and apply** for the complete set.

Recent decisions show status and verification. Verified **Undo** is available
only while every affected file still matches the approved result.

## Android behavior

Android supports project mapping, redacted reads, context packs, code
structure, multi-file review, recoverable apply, rollback, and undo when the
document provider grants the required capabilities. DevDesk does not bundle
desktop compiler/test toolchains into Android, so verification commands are
disabled there and must run on a trusted Windows development workspace or
external worker.

## Stop or remove access

Select **Stop connector** when the AI no longer needs access.

Use **Pause** or **Revoke** to stop only one Connected agent. Stopping the
connector marks all current sessions disconnected.

Select **Rotate access key** if you copied the configuration to the wrong place or no longer trust an old configuration. Replace the URL in every connected client.

The server listens only on the device loopback address. Other devices on the
network cannot use it directly. On Android, this also means the MCP client must
run on the same Android device.

## Troubleshooting

### The AI cannot connect

1. Keep DevDesk open.
2. Confirm the connector says **Running**.
3. Copy the current configuration again.
4. Confirm another program is not using port `45873`.
5. Restart or refresh the AI client's MCP servers. On Android, confirm the
   client is on the same device and that DevDesk remains open.

### The AI says no workspace is selected

Open **Connected agents**, select **Assign workspace**, and choose the intended
workspace. Opening another workspace does not redirect an existing session.

### Two agents appear to share a legacy session

Update clients shown as **Legacy session** so they return the supplied
`Mcp-Session-Id`, reconnect them, and revoke the old legacy session.

### The AI cannot read a project file or document

Turn on **Share redacted workspace text**. Use the exact workspace-relative path
returned by `search_project_files` or `search_documents`. Credential-like paths,
generated folders, binary or non-UTF-8 files, files outside the active project
scope, and reads beyond the enforced limits remain unavailable.

### A proposal was refused

Turn on **Allow project change reviews**. If any target changed, ask the AI to
read every file again and queue a fresh complete proposal. Credential-like,
generated, dependency-owned, linked, oversized, absolute, and traversal paths
remain blocked.

### Verification is disabled

On Windows, approve execution trust only if you trust the project and install
its toolchain. On Android, review/apply remains available but compiler and test
commands must run on a trusted development machine or worker.

### A scheduled check does not run

Turn on **Allow scheduled read-only checks**, keep the task enabled, and keep
DevDesk open. Confirm the workspace automation policy still allows read-only
refresh. Overdue tasks resume when DevDesk reopens.

## Privacy and cost

DevDesk does not add analytics, an AI subscription, an API key, or a hosted AI backend.

Exact proposal snapshots and recovery journals stay in private device storage
and are excluded from portable DevDesk backups. Back up workspace folders
separately. After reinstall, restore the DevDesk recovery kit, grant folder
access again, and have the agent reread current files rather than relying on an
old pending proposal.

Privacy-safe activity events are recoverable DevDesk data and follow the chosen
retention. Live credentials and connected state do not return after uninstall
or app-data removal: agents reconnect, and Android folder grants may need to be
approved again. Independent data stays independent until imported or assigned.

Your AI client decides where its prompts and tool results are processed. A cloud
AI may send requested project maps, redacted source/configuration snippets,
Markdown, and graph context to its provider. A local model may keep processing
on your device. Check the client's privacy and pricing before connecting it.

The connector access key is protected by the device security boundary when
platform protection is available. Otherwise DevDesk uses a session-only key.

For the protocol model and security guidance, see the official [Model Context Protocol documentation](https://modelcontextprotocol.io/docs/getting-started/intro) and [Streamable HTTP transport specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports).

## Terms

- **AI agent:** an AI client that can choose and call tools while completing a task.
- **MCP:** Model Context Protocol, a standard way for a client to discover and call tools.
- **Agent session:** one revocable client identity pinned to one workspace or
  deliberately left independent.
- **Loopback:** a local-only network address that points back to the same device.
- **Fingerprint:** a value used to detect whether a file changed after it was read.
- **Proposal:** a suggested replacement waiting for your explicit review.
