# Frequently asked questions

## Why should I use DevDesk instead of separate planning, notes, and developer apps?

Use DevDesk when those activities belong to the same folder. The same ordinary files can power task views, connected notes, portable project identity, saved API testing, structure checks, and workspace-scoped Git. You can still open the files in other tools.

## Is DevDesk only for developers?

No. Personal, Study, Business, and Research / writing profiles hide developer complexity until it is useful. A normal user can begin with New, Today, Tasks, Notes, and familiar views.

## What is `project.devdesk`?

It is a portable UTF-8 JSON file that stores project identity and project-relative configuration. It is not project content, a secret store, or an executable workspace.

## Can I open a project by clicking `project.devdesk`?

Yes. The installed Windows setup/MSIX registers the file with the DevDesk icon,
so double-clicking opens that project. On Android, tap it in a compatible Files
provider, choose DevDesk, then approve the containing folder through Android's
system folder picker. A portable Windows ZIP cannot install file associations;
use **Open with** or install DevDesk. The same manifest stays portable because
it stores project-relative settings rather than device-specific paths.

## Must every folder have a manifest?

No. **Open once without writing** registers a folder only on the current device. Add a manifest when you want the identity and settings to travel with the folder.

## Does opening a project run commands?

No. Opening and indexing are data operations. Git status or another bounded execution feature needs separate device-local trust and an explicit user action.

## Does DevDesk upload my project folder?

No DevDesk-operated project upload or cloud-sync service is included. User-initiated network tools can still send data to destinations you choose.

## What can Safe automatic change?

Only deterministic reversible DevDesk-managed maintenance, such as managed indexes. It cannot invent sources, verification, trust, lifecycle, computation results, or project facts.

## Can I review and undo automation?

Yes. **Review changes** stores a durable accept/reject plan. Managed batches record recovery information first. A successful plan can remain undoable across restart while affected files are unchanged.

## Does removing a workspace delete the folder?

No. It removes only the private DevDesk registration.

## Can the graph change Markdown?

Yes, when you explicitly edit a relationship. New managed relationships use standard Markdown links inside a marked managed block. Manual links and prose outside the block remain untouched.

## Why do graph labels disappear when zoomed out?

The graph collapses distant labels into compact type-colored markers to reduce clutter. The selected note remains labeled, and hovering a node shows its details.

## Is Structured Knowledge an AI feature?

No online AI provider is required. Current validation and managed maintenance use deterministic local rules and do not invent semantic facts.

## Can I connect Codex or Gemini CLI?

Yes, on Windows and Android. Open **Settings > DevDesk Agent Connector**,
select a workspace, start the connector, and copy the matching MCP
configuration. On Android, the compatible MCP client must run on the same
device and DevDesk must remain open. You provide the AI client and its account
or local model.

## Does the graph make an AI understand my project?

It gives the AI useful structure: document nodes, written links, backlinks, issues, and OKF status. A graph line is not proof that an AI answer is true; document content, source quality, and your instructions still matter.

## Can the Agent Connector help an AI understand source code?

Yes, within explicit limits. The metadata-only project map detects common stacks,
languages, file roles, and manifest signals. When **Share redacted workspace
text** is enabled, the agent can search bounded source/configuration content,
read one eligible UTF-8 file, or request a token-budgeted context pack that also
includes connected Markdown knowledge. DevDesk skips generated folders, links,
common credential paths, binary files, and oversized content, then applies
conservative secret redaction. No connector tool edits source files.

## Can an AI agent change my files automatically?

No. The connector can queue a Markdown replacement only when review proposals are enabled. You compare both versions. Only **Approve and apply** performs a conflict-checked save.

## Is every OKF warning a failure?

No. Required errors, warnings, DevDesk advice, and extensions are separate. Optional metadata and unknown producer fields are not false conformance errors.

## Can I use wiki links?

Existing wiki links remain readable as a DevDesk extension. Standard Markdown links are the portable form and are used for new graph-managed relationships.

## Are API requests offline?

Building and storing a request is local. Sending it uses the network and transmits data to the chosen destination.

## Are backups encrypted?

Portable backup JSON should be treated as sensitive. Protected secret values are excluded, but other confidential content may remain.

## Does a Reinstall Recovery Kit contain my workspace folders?

No. It contains supported independent app records plus a sanitized catalog of
workspace identity and location hints. Back up each external workspace folder
separately. After importing the kit, use **Reconnect Recorded Workspaces** and
the normal folder picker. Protected secrets, permission tokens, execution
trust, and Agent Connector access keys must be supplied again.

## Can I recover after uninstalling DevDesk?

Yes, when you prepare first. Export a **Reinstall Recovery Kit** and separately
protect the external workspace folders. After reinstall, import the kit to
restore independent API workspaces, Vault notes, snippets, history, and
settings, then explicitly reconnect each external workspace folder. Android
requires folder permission again. Protected secrets and trust decisions are
not restored.

## Can DevDesk initialize a Git repository?

Yes, on a trusted local Windows workspace when Git is installed and no
repository already contains the workspace. The confirmed action creates only
`.git` in the displayed workspace folder. It does not stage files, create a
commit or remote, connect an account, or use the network. If a parent repository
already exists, DevDesk uses that repository and refuses to create a nested one.

## Can DevDesk edit project text and source files?

Yes, for the supported text extensions shown in the workspace guide. Save
writes only the active workspace-relative file with fingerprint conflict
protection. Save As exports an independent copy. Markdown, JSON, and OpenAPI
documents keep their specialist editors, and binary files are not treated as
general text.

## Why is macOS shown without a download?

A platform card communicates availability. It does not claim a signed, notarized package exists before one is released.
