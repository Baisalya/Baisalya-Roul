# AI Harness, Workbench, and coding agents

AI Harness is DevDesk's standalone optional AI tool. The same canonical engine
also appears as AI Workbench inside a selected project. It is separate from
the **AI Agent Connector**:

- **AI Harness / Workbench** runs a model conversation inside DevDesk and can use
  DevDesk tools under the permissions you choose.
- **AI Agent Connector** lets an external MCP-compatible client, such as Codex
  or Gemini CLI, request bounded DevDesk workspace context.

Neither feature is required for normal notes, project files, diagrams, API
testing, knowledge graphs, or Git work.

## Before you start

You provide the AI service. DevDesk does not include free model usage. Depending
on the provider, you need an API key, an account, a compatible endpoint, or a
local model server.

Supported connection styles include:

- OpenAI Responses;
- OpenAI-compatible chat endpoints;
- compatible hosted providers configured through their endpoint and model;
- local OpenAI-compatible servers such as Ollama or LM Studio.

Provider compatibility depends on the endpoint implementing the protocol and
streaming behavior DevDesk expects. A preset fills common values; it does not
guarantee that every account, model, proxy, or local server supports every tool.

## Create a provider safely

1. Open **All tools → AI Harness**, or open AI Workbench inside a project.
2. Open provider settings.
3. Choose a preset or a custom compatible endpoint.
4. Enter the model identifier required by that provider.
5. Add the credential only when the endpoint requires one.
6. Test the connection with a short, read-only request.

On Windows and Android, supported provider credentials use the operating
system's protected storage boundary. They are not placed in project files,
portable workspace manifests, supported backups, or exported AI transcripts.
Do not paste API keys into chat messages, source files, tool arguments, or
screenshots.

## Attach a file or photo

Select **File or photo** beside the composer.

- Safe text files are limited to 192 KB, decoded locally, and passed through
  DevDesk secret redaction before they become prompt context.
- PNG, JPEG, WebP, and GIF images are limited to 8 MB and require a model that
  advertises vision support.
- Up to eight explicit attachments fit within the visible bounded context.
- A selected attachment is disclosed only when you send that request. Image
  bytes are transient and are not copied into chat history or backups.

Remove an attachment chip before sending if it should not reach the configured
provider. Multi-agent analysis and Parallel Coding do not currently carry
composer attachments, so use normal Send when the file or image is required.

## Understand the three autonomy profiles

DevDesk keeps model reasoning separate from authority. A model asking for an
action does not itself grant permission.

### Manual

Use Manual when you want answers and explanations without automatic tool work.
You choose the context and initiate every meaningful operation.

### Review changes

Use Review changes for normal coding assistance. The agent may inspect allowed
context and prepare a proposal, but the main workspace remains unchanged until
you review and approve it in DevDesk.

### Bounded automatic work

Use the automatic profile only for a workspace you trust. DevDesk may run
allowlisted read-only or verification operations within the selected session
permissions. Workspace writes and sensitive external actions still keep their
specific safety boundaries.

Changing the saved profile does not silently create a permanent terminal or
browser permission. Session grants are narrower and are revoked when their
documented scope ends.

## Give the model focused project context

AI Workbench works best when the request names an outcome, constraints, and a
verification method. Use project pins, selected files, bounded context packs,
diagnostics, and relevant knowledge documents instead of attaching an entire
repository without a reason.

A focused coding request can follow this shape:

> Diagnose the failing workspace test. Read only the related implementation,
> test, and configuration files. Prepare a reviewed proposal, then run the
> detected focused verification after approval. Do not delete or rename files.

Project maps and code-structure results are navigation aids. The current
cross-language structure service is bounded and lexical; it is not a compiler,
language server, or proof that a symbol reference is valid.

## Review-first changes

The primary agent does not silently replace files in the main workspace.
Instead it queues a proposal with the current file fingerprints and the full
proposed UTF-8 content.

Before approval:

1. Read the summary and affected paths.
2. Expand every before-and-after comparison.
3. Confirm that no unrelated behavior was removed.
4. Select relevant detected checks.
5. Approve only when the scope matches your request.

DevDesk rechecks fingerprints before applying a proposal. If a file changed
after the proposal was prepared, the proposal becomes stale instead of
overwriting the newer version. Reviewed application uses a recovery journal and
can roll back a partial failure.

Current reviewed proposals create new files or replace existing UTF-8 files.
Treat directory creation, file deletion, file rename, binary editing, and large
generated-file rewrites as manual operations unless the current UI explicitly
offers a reviewed action for them.

## Terminal commands and verification on Windows

Trusted Windows workspaces can use detected project verification and explicitly
approved terminal commands or terminal plans.

Important boundary: the terminal process runs with the authority of your
current Windows user. DevDesk classifies commands, narrows approvals, limits
retained output, and supports cancellation, but it is not an operating-system
sandbox. Review the exact command, working directory, reason, and permission
scope before approval.

A terminal plan runs sequentially. Progress, bounded redacted output, failure
diagnosis, retry state, and a recovery checkpoint can remain attached to the
owning chat. A later retry can skip already verified steps when the checkpoint
still matches the same plan and workspace.

Detected checks may include Flutter analyzer/tests and common ecosystem
adapters. Project-controlled test scripts can execute repository code. Run them
only in a project you trust.

Android can inspect supported document-tree projects and participate in
reviewed edits, but DevDesk does not provide the Windows CMD, PowerShell, Git
Bash, Git worktree, or desktop project-terminal execution path on Android.

## Verification-driven repair

A professional repair loop is evidence-driven:

1. reproduce or identify the failure;
2. inspect the smallest relevant context;
3. prepare and review a change;
4. run the focused check;
5. retain the check result;
6. diagnose a failure and prepare another reviewed repair when necessary;
7. run broader regression checks before release.

DevDesk distinguishes a proposed change from an applied change and an applied
change from a verified result. A model response saying "fixed" is not
verification evidence.

## Background and long-running tasks

An active AI run can appear as a background task with its phase, latest safe
event, terminal progress, proposal link, and verification state. The owning
chat keeps the durable checkpoint. You can return to that chat, inspect the
evidence, retry an eligible failed plan, review a proposal, or cancel active
work.

Agent turns, tool calls, context, output, retained events, memory, and repair
attempts are bounded. Reaching a limit is a controlled stop, not permission to
continue outside the harness.

Completed user and assistant messages may be restored for a saved work session.
Transient tool arguments, tool results, provider continuation identifiers, and
private model reasoning are not treated as a portable transcript.

## Parallel analysis and implementation workers

DevDesk has two different parallel workflows:

- **Read-only specialists** analyze bounded context concurrently and return
  evidence to a coordinator. They cannot write project files or run commands.
- **Implementation workers** can work in isolated Git worktrees on Windows.
  Each worker receives a scoped task, can make bounded text-file changes inside
  its worktree, and may run allowed detected verification. A read-only reviewer
  evaluates the result before DevDesk queues an integration proposal.

The main workspace is not changed merely because a worker completed. Review the
integration proposal and conflict information before applying it. Worktree
workers do not receive unrestricted shell or Git authority, cannot escape their
worktree, and cannot approve their own integration.

Use parallel workers only for genuinely independent tasks. Two workers should
not own the same file or depend on an uncommitted change that their worktree
cannot see.

## Browser Agent on Windows

The Browser Agent uses a visible, isolated Microsoft Edge window. It can
navigate and inspect supported page structure, use approved interactions, and
retain browser assertions as part of a coding verification result.

For passwords, one-time codes, payment details, or another sensitive sign-in:

1. switch the session to **User control**;
2. enter the sensitive value directly in Edge;
3. confirm that the page reached the intended signed-in state;
4. return control only after reviewing the resume request.

DevDesk does not expose the proposed sensitive text in the browser approval
preview. Old element references are invalid after the secure handoff.

Current browser limits include:

- Windows and Microsoft Edge only;
- a separate visible browser window, not an embedded tab;
- no screenshot or visual-coordinate grounding;
- no arbitrary JavaScript execution;
- no automated file upload or download workflow;
- no portable cookie/storage export;
- no persistent browser session after the isolated session closes;
- limited support for deep cross-origin page structures.

Browser assertions supplement project checks. They do not replace analyzer,
unit, integration, accessibility, security, or clean-device testing.

## External MCP tools

AI Workbench can discover configured MCP servers. External tools are not trusted
merely because a server advertises them. DevDesk exposes only tools whose trust
decision and read-only behavior match the current policy; side-effecting or
unknown external tools remain blocked unless a future reviewed policy explicitly
allows them.

Never connect an untrusted MCP server to a workspace containing confidential
files or credentials.

## Release checklist for AI-assisted changes

Before shipping a build produced with AI assistance:

- make the working tree reproducible from a known commit;
- run `flutter analyze` with no issues;
- run the complete Flutter test suite;
- build the Windows release from the same commit and lockfile;
- run focused Browser Agent and permission tests;
- smoke-test the visible Edge secure-handoff flow;
- install the final MSIX on a clean Windows account or VM;
- run Windows App Certification Kit on the final package;
- confirm Store descriptions and the public privacy policy match the exact
  shipped behavior.

AI can accelerate implementation and review. The release owner still decides
what is accepted, which external services are trusted, and whether the retained
evidence is sufficient to publish.

## Related guides

- [AI Agent Connector](agent-connector.html)
- [Workspace workbench](workspace-workbench.html)
- [Privacy and security](privacy-security.html)
- [Troubleshooting](troubleshooting.html)
