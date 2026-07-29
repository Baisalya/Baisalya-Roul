# DevDesk complete user manual

This is the beginner-first guide to DevDesk on Windows and Android. Read only
the section you need. Every major tool also has a shorter focused manual linked
from this page.

## Welcome to DevDesk

DevDesk turns a normal folder into a workspace for plans, tasks, notes,
connected knowledge, project files, API testing, and developer tools.

The main idea is simple:

> Your folder remains the source of truth. DevDesk gives the same files useful
> views and tools without locking them into a DevDesk cloud.

DevDesk is useful for students, writers, project planners, researchers, and
software developers. A beginner can start with tasks and notes. Technical tools
stay optional.

### Local-first and user-owned files

**Local-first** means DevDesk works with data on your device before depending on
an online service. Project Markdown, JSON, OpenAPI, and related files remain in
the folder you choose.

You can open supported files in another editor. You can copy the folder, put
appropriate files in Git, or back it up with your normal backup tool.

### What DevDesk does not do

- It does not upload your project folder to a DevDesk-operated cloud.
- It does not make every API request offline. Sending a request uses the network.
- It does not make a linked note true or verified.
- It does not run Git, scripts, or project commands merely because you opened a folder.
- It does not put protected secrets into portable project files by default.
- It does not replace a complete Git client. Verified Git actions are deliberately scoped.

## Start Here: Your First Five Minutes

### Create a workspace

1. Open DevDesk.
2. On **Home**, select **New workspace**.
3. Choose a profile such as **Personal plan**, **Study**, **Business project**,
   **Research / writing**, **Software project**, or **Blank**.
4. Enter a name such as `My First App Project`.
5. Review the preview of folders and starter files.
6. Choose the parent folder.
7. Confirm creation.

**What should appear:** DevDesk opens the new workspace. The folder contains
`project.devdesk` and only the starter files shown in the preview.

**If it does not appear:** Check that the parent folder is writable. Choose a
name that does not already exist. DevDesk will not silently replace an existing
folder or file.

### Create the first note

1. Select **New**.
2. Select **Note**.
3. Name it `Project overview`.
4. Type one sentence describing the project.
5. Save the note if the editor shows a **Save** action.

**What should appear:** The note is visible under **Notes** and **Files**.

### Create the first task

1. Select **New**.
2. Select **Task**.
3. Type `Plan the first screen`.
4. Choose a status, priority, or deadline only if you need one.
5. Save the task.

**What should appear:** The task appears in **Tasks** and in compatible List,
Board, Calendar, or Timeline views.

### Find the files and reopen the workspace

1. Open **Files**.
2. Select **Open explorer** when you need the advanced project tree.
3. Note the folder containing `project.devdesk`.
4. Close DevDesk.
5. Reopen DevDesk and use **Continue working**, or open `project.devdesk`.

On Windows, an installed build can associate `project.devdesk` with DevDesk.
On Android, select the folder that directly contains that file when the system
folder picker asks.

## Choose What You Want to Do

| I want to… | Start here |
|---|---|
| Plan a project | **Tasks**, then List or Board |
| Write notes | **Notes**, then [Markdown basics](markdown-basics.html) |
| Connect knowledge | Add links, then open **Relationships** |
| Test an API | [Quick API](quick-api.html) for one request or [API Workspaces](api-workspaces.html) for saved work |
| Inspect JSON | [JSON Tools](json-tools.html) |
| Manage a developer project | **New workspace > Software project** |
| Move to another computer | [Moving and Backing Up a Workspace](#moving-and-backing-up-a-workspace) |
| Learn every control | [Home, workspace, and navigation](interface-tour.html) |

## Understanding a DevDesk Workspace

A **workspace** is the folder you selected. It can contain normal files and
subfolders. DevDesk adds views, search, relationships, and optional tools around
those files.

### Portable and device-local information

| Information | Portable? | Notes |
|---|---|---|
| Markdown, JSON, OpenAPI, source files | Yes | Normal project-owned files |
| `project.devdesk` | Yes | Stable identity and safe relative settings |
| Sanitized `devdesk-api-workspace.json` | Yes | API structure without protected secrets |
| Graph positions and recent items | No | Personal device state |
| Tokens, cookies, execution trust | No | Protected local state |

`project.devdesk` does not contain absolute paths, passwords, commands, scripts,
recent files, or personal layout.

### Safe folder locations

- Choose a folder you can read and write.
- Keep a separate backup.
- Avoid placing the only copy on an unreliable removable drive.
- In a cloud-synced folder, let synchronization finish before editing the same
  file on another device.
- Keep secrets out of ordinary Markdown and JSON.

### Moving or renaming a folder

Copy or move the complete folder, including `project.devdesk`. Open the manifest
from the new location. Its stable project ID does not depend on the old absolute
path.

See [Folders, portability, and scoped Git](developer-workspaces.html) for the
full boundary and recovery rules.

## Planning Your Work

DevDesk can show the same underlying work in different views:

- **List:** a straightforward ordered view.
- **Board:** groups work by status.
- **Calendar:** places items with dates on a calendar.
- **Timeline:** shows work across time.
- **Outline:** shows hierarchy and structure.
- **Relationships:** shows links between items.

A **task** is an action to complete. **Status** shows its current stage.
**Priority** helps you decide what matters first. A **deadline** is the date by
which work should be completed.

### Beginner workflow

1. Create tasks with short action names.
2. Add a deadline only when it is real.
3. Use List while learning.
4. Open Board when status groups help.
5. Open Calendar or Timeline when dates matter.
6. Change an item in one view.
7. Confirm the same change appears in the other views.

The views should not create separate copies of the same task. If an item is
missing from a date-based view, confirm that it has a valid date and that active
filters are clear.

## Markdown for Complete Beginners

**Markdown** is plain text that uses small punctuation marks for formatting.
DevDesk uses it because the file remains readable without DevDesk.

### A small example

Type:

```markdown
# My Project

## Tasks

- [ ] Plan the project
- [ ] Build the first screen
- [x] Create the workspace
```

DevDesk displays a large title, a smaller Tasks heading, two empty checkboxes,
and one completed checkbox.

### Common formatting

```markdown
# Page title
## Section

**Bold**
*Italic*

- Bulleted item
1. Numbered item

> A quoted note

[DevDesk website](../index.html)
![Diagram description](images/diagram.png)

`inline code`
```

A code block uses three backticks before and after the code:

````markdown
```json
{
  "name": "DevDesk"
}
```
````

A table looks like this:

```markdown
| Task | Status |
|---|---|
| Plan screen | Ready |
```

### Create a Markdown file

1. Open **Files**.
2. Select **Open explorer**.
3. Open the destination folder.
4. Select **New file**.
5. Choose **Markdown**.
6. Enter a safe file name.
7. Write and save.

DevDesk adds the extension when needed and refuses names that would escape the
workspace or replace an existing path.

For more examples, open [Markdown basics](markdown-basics.html).

## Connecting Notes

A **link** points from one note to another. A **backlink** is the automatic
incoming view shown on the target note.

Standard link:

```markdown
See the [API plan](api-plan.md).
```

Supported wiki-style link:

```markdown
See [[API plan]].
```

Standard Markdown links are the most portable form.

### Create a safe connection

1. Open the source note.
2. Explain the relationship in a sentence.
3. Insert a normal Markdown link.
4. Save.
5. Open the target note and inspect backlinks.
6. Open **Relationships** to see the connection.

### Broken links and renames

A broken link points to a file that cannot be resolved. Check spelling,
capitalization, spaces, and the relative path. When renaming a linked file,
review incoming links and save every intended update.

Graph link editing changes only the active source note's managed connection
block. Manual prose and links outside the block remain untouched. See
[Edit graph connections](graph-connection-editing.html).

## Properties and Metadata

**Metadata** is small descriptive information about an item, such as its status,
date, tags, or priority. It helps DevDesk filter and organize work.

Start with the visual **Properties** panel when available:

1. Open a note or task.
2. Open **Properties**.
3. Add a tag such as `release`.
4. Choose a status such as `draft`.
5. Add a date or priority only when useful.
6. Save.

Advanced users may see the same information as YAML **frontmatter** at the top
of a Markdown file:

```yaml
---
tags: [release, windows]
status: draft
priority: high
---
```

Frontmatter is a structured text block. It begins and ends with exactly three
dashes. Use spaces, not tabs. See
[YAML frontmatter and properties](frontmatter-properties.html).

## Knowledge Graph

A **node** is a Markdown file shown in the graph. A **connection** is a saved
link between files.

The graph helps answer questions such as:

- Which notes explain this decision?
- What links to this API plan?
- Which notes are disconnected?

### Open and use the graph

1. Open a workspace and select a Markdown note.
2. Open **Views > Relationships**, or the focused graph from the Markdown tool.
3. Choose **Local** for nearby notes or **Workspace** for a bounded project view.
4. Pan by dragging the canvas.
5. Zoom with **+**, **-**, touch, mouse, or trackpad.
6. Select **Fit view** after changing the window or filters.
7. Search or filter by title, path, type, or tag.
8. Select a node to inspect or open its note.

The graph reads saved Markdown links. It does not prove that a claim is correct.
Node size does not mean truth or priority.

### Missing or disconnected nodes

- Save the note.
- Clear filters.
- Turn on **Orphans**.
- Select **Fit view**.
- Check the file is inside configured knowledge roots.
- Fix unresolved or ambiguous links.
- Refresh the project index when watching is unavailable.

See [Relationships and graph](knowledge-graph.html).

## Open Knowledge Format (OKF)

OKF means **Open Knowledge Format**. In DevDesk, it is an optional way to make a
folder of Markdown notes easier to browse, check, and move.

You do not need to learn OKF before using it. Your notes remain normal Markdown
files that work in other editors.

An **OKF bundle** is the workspace folder. A **concept** is one Markdown file
with a small YAML information block and a normal Markdown body.

### Do I need OKF?

Use it when you want consistent titles and types, folder indexes, source
tracking, review status, or freshness reminders. Ignore it when ordinary notes
already meet your needs.

### Safest first-time workflow

1. Back up the workspace.
2. Open **Developer tools > Structure and OKF**.
3. Wait for **Analyzing portable structured knowledge...**.
4. Select **Review safe fixes**.
5. Keep **Project profile** set to **Software project** for a normal software
   project.
6. Keep **Mark newly structured documents as draft** enabled.
7. Select **Analyze and preview**.
8. Review every proposed file and reason.
9. Select **Apply reviewed plan** only when the preview is correct.

**What should appear:** DevDesk adds or normalizes portable metadata and can
create managed indexes. It preserves Markdown body text and unknown metadata.

**Important:** **Analyze and preview** does not immediately change files.

### Create the first structured concept

1. Select **Create concept**.
2. Choose **Project documentation**.
3. Enter title `Release checklist`.
4. Review the suggested path `concepts/release-checklist.md`.
5. Add description `Checks the app before a public release.`
6. Add tags `release, testing`.
7. Keep status `draft`.
8. Keep generated by `devdesk/1.0`.
9. Leave advanced optional fields empty.
10. Select **Create**.

**What should appear:** A normal Markdown file containing portable YAML
frontmatter and starter headings. DevDesk does not replace an existing path.

### Required rules

For a normal concept, the current app requires:

1. parseable YAML frontmatter;
2. a non-empty `type`.

Reserved `index.md` and `log.md` files follow their reserved structures when
present. Missing optional metadata, missing indexes, unknown types, and broken
links do not automatically make the bundle non-conformant.

### Understand the findings

- **Required fixes:** fix these first.
- **Specification warnings:** optional fields or structures need review.
- **DevDesk recommendations:** helpful but not required.
- **Information:** context that needs no change.

### Import existing Markdown

Open the existing folder as a workspace, then open Structure and OKF. DevDesk
analyzes first. It does not need to rewrite files merely to inspect them.

The reviewed conversion can suggest a type, title, first-paragraph description,
draft status, compatible v0.1 migration, indexes, and an optional update log.
Existing Markdown bodies, unknown fields, custom index prose, and wiki links are
preserved.

### Manual advanced actions

Use these only when the information is real:

- **Record verification**
- **Add source**
- **Update lifecycle**
- **Preview indexes**
- **Add log entry**

DevDesk never invents sources, human verification, lifecycle decisions,
attestation results, trust conclusions, or computation results.

### Recovery and read-only protection

Managed plans store recovery information before writing. A changed file stops a
stale plan. Partial verified writes can be rolled back, external edits are
preserved, and a successful managed plan may remain undoable after restart.

Unknown future OKF versions and non-writable workspaces remain available for
diagnostic analysis, but write actions are disabled.

See [Structure checks (OKF)](structured-knowledge-okf.html),
[OKF bundle structure](okf-bundle-structure.html),
[OKF concepts and metadata](okf-concepts-metadata.html), and
[Analyze, improve, and migrate project knowledge](okf-conversion-migration.html).

## API Workspaces

An **API** is a defined way for software to communicate. A **request** is the
message you send. A **response** is the message returned.

Important words:

- **URL:** the destination address.
- **Method:** the intended action, such as GET or POST.
- **Header:** extra request information.
- **Query parameter:** a small value attached to the URL.
- **Body:** the main data sent with some requests.
- **Status code:** a number such as 200 or 404 describing the result.

Use **Quick API** for one temporary request. Use **API Workspaces** for saved
collections, environments, protected values, assertions, and repeatable runs.

### Safe public example

1. Open **Quick API** or create a saved request.
2. Choose **GET**.
3. Enter `https://jsonplaceholder.typicode.com/todos/1`.
4. Do not add credentials.
5. Select **Send**.

**What should appear:** A response status and a small JSON object.

**If it fails:** Check the URL, internet connection, VPN, proxy, TLS error, and
whether the public service is available. A `200` status does not by itself prove
that every returned value is correct.

### Environments and secrets

An **environment** stores target-specific values such as a development base URL.
Use placeholders such as:

```text
{{baseUrl}}/customers/{{customerId}}
```

Mark tokens, passwords, cookies, and credentials as protected secrets. Never
place real credentials in screenshots, examples, ordinary notes, Git, or public
support reports.

See [Saved API testing](api-workspaces.html) and
[API environments and protected secrets](api-environments-secrets.html).

## OpenAPI Studio

**OpenAPI** is a standard description of an HTTP API. It lists endpoints,
parameters, request bodies, responses, and schemas.

1. Open **OpenAPI Studio**.
2. Paste or open a supported Swagger 2.0, OpenAPI 3.0, or OpenAPI 3.1 JSON/YAML file.
3. Select **Validate and inspect**.
4. Review the title, version, endpoints, and schemas.
5. Open validation messages and fix the source document.
6. Choose **Create collection** only after review.

A **schema** describes the expected structure of data. Validation checks the
document structure; it does not contact the server or prove that the API is
safe.

Remote `$ref` files are not fetched automatically. Bundle required references
locally. See [OpenAPI Studio](openapi-studio.html).

## JSON Tools

**JSON** is a text format for structured data. An **object** uses curly braces
and contains key/value pairs. An **array** uses square brackets and contains an
ordered list.

```json
{
  "name": "DevDesk",
  "status": "ready"
}
```

Here, `name` is a key and `DevDesk` is its value.

### Format and validate JSON

1. Open **JSON Tools**.
2. Paste or open the JSON.
3. Select **Format**.
4. Read any parsing error.
5. Fix missing commas, quotes, or brackets.
6. Copy or save only after reviewing sensitive data.

**Minify** removes unnecessary whitespace. It does not encrypt the data.
See [JSON Tools](json-tools.html).

## Git Tools

**Git** records versions of files in a **repository**. A **change** is a file
difference. A **commit** is a named saved checkpoint. A **branch** is a line of
work. A **diff** shows what changed.

DevDesk deliberately restricts Git actions to the selected workspace, even when
the real repository is a parent folder.

### Verified DevDesk Git boundary

- Opening `project.devdesk` does not run Git or grant trust.
- Git status needs a separate device-local trust decision.
- Status, diff, stage, unstage, and protected discard stay inside the workspace.
- DevDesk does not automatically fetch, pull, push, commit, run hooks, or manage credentials.

### Beginner workflow

1. Back up important work.
2. Open **Developer tools > Git status** on an eligible local Windows project.
3. Review the repository root and displayed workspace scope.
4. Grant local execution trust only when both are correct.
5. Refresh status.
6. Review a diff.
7. Stage only the intended workspace path.
8. Create the commit with your normal Git client after one more review.

Example in the workspace root:

```powershell
git status
git diff --staged
git commit -m "Add first DevDesk project notes"
```

If the wrong file is staged, unstage it before committing. If Git is unavailable,
confirm it is installed, the folder is inside the intended repository, and the
workspace is an eligible local Windows folder.

See [Compare files and workspace-scoped Git](diff-git.html).

## Search, Navigation, and Shortcuts

- Use Home search to find workspaces and tools.
- Use workspace Search for a quick filter.
- Use **Developer tools > Search workspace** for full indexed search.
- Use **Files > Open explorer** for nested folders and exact file selection.
- Press `/` on this website to search the manual.
- Use `Tab` and `Shift+Tab` to move focus.
- Use `Enter` or `Space` to activate focused buttons.
- Use `Esc` to close a focused panel where supported.

Editor shortcuts such as `Ctrl+S` depend on the active tool. Tooltips are the
authoritative local hint. See [Keyboard shortcuts](keyboard-shortcuts.html).

## Connect an AI Agent

The Windows **DevDesk Agent Connector** lets an MCP-compatible client such as
Codex or Gemini CLI request selected-workspace context.

DevDesk does not include an AI provider or AI subscription. You bring your own
client, account, API plan, or local model.

### What the AI can learn

- safe active-workspace metadata;
- indexed document paths, titles, tags, and fingerprints;
- graph nodes, resolved written links, and backlinks;
- workspace issues and OKF status;
- redacted Markdown text only when you enable it.

Nodes and links help an AI follow relevant written relationships. They do not
prove that an answer is true or that two documents have an unstated semantic
relationship.

### Start and connect

1. Open a Windows workspace.
2. Open **Settings > DevDesk Agent Connector**.
3. Review the two optional permissions.
4. Select **Start connector**.
5. Copy the Codex or Gemini CLI configuration.
6. Add it to the AI client's MCP settings.
7. Ask the client to list DevDesk tools.

### Review-only changes

When **Allow review proposals** is on, an agent may queue a complete Markdown
replacement. It cannot apply the replacement.

Open **Review agent proposals**, compare the current and proposed file, then
choose **Cancel**, **Reject**, or **Approve and apply**. Approval uses a
fingerprint and stops if the file changed after the agent read it.

The connector has no terminal, delete, approval, or Git-push tool. Stop it when
you finish, and rotate its access key if an old configuration is no longer
trusted.

See [AI Agent Connector](agent-connector.html) for exact Codex and Gemini CLI
steps, tool names, troubleshooting, privacy, and official MCP references.

## Moving and Backing Up a Workspace

### Copy to another computer

1. Save all open files.
2. Close editors that may still write to the folder.
3. Copy the complete folder, including `project.devdesk`.
4. Use an external drive, private cloud-synced folder, or ZIP.
5. Wait for the copy to finish.
6. Compare file counts or inspect important files.
7. On the other computer, open `project.devdesk`.
8. Re-enter protected secrets locally.

### Create a ZIP backup

1. Close DevDesk or finish saving.
2. Create a ZIP of the complete workspace folder.
3. Store it separately from the original.
4. Open the ZIP and verify that `project.devdesk` and important files exist.
5. Protect the ZIP if the project contains private data.

DevDesk's Settings backup covers supported private application records. It does
not automatically include external project folders or protected secrets.

Avoid editing the same cloud-synced file on two devices at once. Resolve sync or
Git conflicts before continuing. See [Backup and restore](backup-restore.html).

## Windows Guide

### Install

1. Open the
   [official DevDesk Microsoft Store listing](https://apps.microsoft.com/detail/9N8NH1LMZX1S?hl=en-us&gl=IN&ocid=pdpshare).
2. Confirm the product name and publisher shown by Microsoft Store.
3. Select **Get** or **Install**.
4. Start DevDesk from the Start menu.

### Update

Microsoft Store can update apps automatically. To check manually, open
Microsoft Store and use its update/library controls. See
[Microsoft Support: Get updates for apps and games](https://support.microsoft.com/en-us/accounts-billing/get-updates-for-apps-and-games-in-microsoft-store).

### Files, windows, and keyboard

- Double-clicking `project.devdesk` works when the installed package registered
  the file association.
- A portable ZIP build cannot install that association.
- Resize or snap the window; optional side panels should collapse as space narrows.
- Use keyboard focus and shortcuts shown in tooltips.

### Uninstall and data preservation

Back up DevDesk-private records and external workspace folders before
uninstalling. Removing the app is not a substitute for deleting or preserving
user-owned project folders. Verify your files independently.

## Android Guide

Android is currently in closed testing.

1. Open the DevDesk support page.
2. Contact the developer to request testing access.
3. Use the Google account approved for the closed test.
4. Install the Play-delivered build.

Do not post tester email addresses or credentials publicly.

### Folder access

Android uses the system Storage Access Framework. When opening
`project.devdesk`, choose the folder that directly contains it and approve the
folder permission. If access is revoked, select the same folder again instead
of creating a duplicate workspace.

### Phone, tablet, and resizable layouts

- Phone portrait uses compact navigation and stacked content.
- Tablet or landscape can show more panels.
- Split-screen and freeform windows may collapse optional navigation.
- When the keyboard opens, scroll the focused field into view.
- At large text sizes, close optional panels and use a wider window when possible.

For transfer, export or copy the complete workspace through a provider that can
preserve all files. Verify the destination before deleting the source.

## Privacy and Security

### What stays local

Project files remain in the selected folder. DevDesk can also keep device-local
registry records, indexes, graph positions, drafts, recovery journals, recent
state, permissions, and trust choices.

### What may leave the device

Only based on verified documented actions:

- API content goes to the destination you choose when you select **Send**.
- Supported GitHub comparison fetches the public URL/content you select.
- Link checks and external Store, support, privacy, or reference pages use the network.
- A connected AI client can receive the DevDesk tool results it requests. The
  client decides whether those results stay local or go to an AI provider.

The destination can receive normal connection information such as your public IP
address.

### Credentials and boundaries

- Android uses a Keystore-backed local boundary where supported.
- Windows uses DPAPI for the current Windows user where supported.
- Protected values are excluded from supported portable exports and backups.
- Clipboard and exported files leave DevDesk's private storage boundary.
- A project manifest cannot grant command execution trust.

No analytics or tracking behavior is documented as part of the reviewed DevDesk
product. See [Privacy and security](privacy-security.html) for the detailed
boundary.

## Troubleshooting

### Workspace does not open

Confirm the folder and `project.devdesk` exist. On Android, reselect the folder
containing the manifest. On Windows, check permissions, removable-drive
availability, and security software. DevDesk does not overwrite corrupt or
future-version manifests automatically.

### File cannot be saved

Check write permission, invalid names, and whether another program changed the
file. Choose a new name if the destination already exists. Preserve external
edits and reopen before retrying.

### Link does not work

Check the relative path, extension, capitalization, spaces, and whether the
target is inside the workspace.

### Graph node is missing

Save the note, clear filters, enable Orphans, select **Fit view**, and refresh
the project index.

### API request fails

Check the final URL, method, network, environment, authentication, cookies,
timeout, proxy, TLS, and server response.

### JSON is invalid

Look for a missing comma, unquoted key, unmatched bracket, invalid escape, or
trailing text.

### Git action is unavailable

Use an eligible local Windows project, confirm Git is installed, review the
workspace scope, and grant device-local trust only for the intended boundary.

### External link does not open

Check the default browser, internet connection, parental/enterprise policy, and
popup protection. Copy the visible URL only when you trust the destination.

### Android permission problem

Open the system folder picker again and select the folder that directly contains
`project.devdesk`.

### Windows Store update problem

Open Microsoft Store, sign in if required, check Library/updates, restart the
Store, and use Microsoft's Store troubleshooting guidance.

### AI Agent Connector does not connect

Keep DevDesk open, confirm the connector says **Running**, copy the current
configuration, and refresh MCP servers in the AI client. Another program may be
using port `45873`. If the access key was rotated, remove the old URL.

### Layout or text is too large

Resize the window, close optional panels, use compact navigation, and scroll code
examples horizontally. Keep the operating-system text size you need; do not
reduce accessibility settings merely to reveal a broken layout.

Open [Troubleshooting](troubleshooting.html) for more detailed recovery steps.

## Glossary

| Word | Simple meaning |
|---|---|
| API | A defined way for software to communicate |
| Backlink | An incoming reference from another note |
| Branch | A Git line of work |
| Commit | A named Git checkpoint |
| Frontmatter | YAML metadata at the top of a Markdown file |
| Git | A system that records file versions |
| JSON | A text format for structured data |
| Knowledge graph | A view of notes and their saved links |
| Local-first | Device and user-owned files are primary |
| Markdown | Plain text with lightweight formatting marks |
| Metadata | Descriptive fields such as tags, status, or date |
| Node | A note shown in the graph |
| OKF | Open Knowledge Format |
| OpenAPI | A standard description of an HTTP API |
| Repository | A folder whose history is managed by Git |
| Schema | Rules describing data structure |
| Workspace | The folder opened and managed in context |

## Frequently Asked Questions

### Is DevDesk only for developers?

No. Personal, Study, Business, and Research / writing profiles keep normal work
first. Developer tools stay optional.

### Does DevDesk upload my folder?

No DevDesk-operated project upload or cloud sync is documented. Deliberate API
requests and external links still use the network.

### Can another editor read my notes?

Yes. DevDesk uses ordinary Markdown and other normal project files.

### Does removing a workspace delete its folder?

No. It removes the private registration. Always verify the exact confirmation
before any destructive operation.

### Are backups encrypted?

Treat exported backup JSON and workspace ZIPs as sensitive. Protected secrets
are excluded from supported backups, but ordinary confidential content can
remain.

### Can DevDesk create Git commits?

The verified DevDesk Git UI provides bounded status, diff, stage, unstage, and
protected discard actions. Use your normal Git client for commit, fetch, pull,
push, remotes, and credentials.

See the complete [Frequently asked questions](faq.html).

## Learn More and References

DevDesk's manual is sufficient for normal use. These optional official sources
go deeper:

- [CommonMark specification](https://spec.commonmark.org/current/) — Markdown syntax.
- [RFC 8259](https://www.rfc-editor.org/info/rfc8259) — JSON standard.
- [RFC 9110](https://www.rfc-editor.org/info/rfc9110) — HTTP semantics.
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) — API description standard.
- [Git documentation](https://git-scm.com/doc) — official Git reference.
- [Microsoft Store app updates](https://support.microsoft.com/en-us/accounts-billing/get-updates-for-apps-and-games-in-microsoft-store) — Windows update help.
- [Android Storage Access Framework](https://developer.android.com/guide/topics/providers/document-provider) — Android file and folder access.
- [OKF v0.2 specification](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) — the external OKF contract checked by DevDesk.

The first seven links describe general standards or platform behavior. The
DevDesk manuals describe how this application uses those concepts.

## Contact, Support, Downloads, and Microsoft Store

- [Download DevDesk](../downloads.html)
- [Get DevDesk for Windows on Microsoft Store](https://apps.microsoft.com/detail/9N8NH1LMZX1S?hl=en-us&gl=IN&ocid=pdpshare)
- [DevDesk support](https://baisalya.github.io/devdesk-support/)
- [Privacy policy](https://baisalya.github.io/devdesk-support/privacy-policy.html)
- Android closed testing — contact the developer through the support page to join.

Never include tokens, passwords, private project files, or personal API data in
a public support report.

## Complete Beginner Walkthrough: My First App Project

This tutorial combines planning, notes, links, properties, graph, API, JSON,
Git, and backup without using real credentials.

### 1. Create the workspace

1. On **Home**, select **New workspace**.
2. Choose **Software project**.
3. Name it `My First App Project`.
4. Review the exact preview.
5. Choose a parent folder and create it.

**Expected:** The workspace opens and contains `project.devdesk`.

**If missing:** Check folder permission and whether a folder with that name
already exists.

### 2. Create the project overview

1. Select **New > Note**.
2. Name it `Project overview`.
3. Type:

```markdown
# My First App Project

This app helps me learn DevDesk.

## Goal

Create one small screen and document the work.
```

4. Save.

**Expected:** The note appears under Notes and Files.

**If missing:** Clear search and check the workspace root in Files.

### 3. Create a task list

1. Create another note named `Tasks`.
2. Type:

```markdown
# Tasks

- [ ] Plan the screen
- [ ] Build the screen
- [ ] Test the screen
- [ ] Back up the workspace
```

3. Save.

**Expected:** Four unchecked tasks appear in the rendered view.

**If not:** Confirm each line starts with `- [ ]`.

### 4. Create and link two notes

1. Create `Design.md` with a `# Design` heading.
2. Create `Testing.md` with a `# Testing` heading.
3. In `Project overview`, add:

```markdown
Read the [design plan](Design.md) and [testing plan](Testing.md).
```

4. Save all three notes.

**Expected:** The links open the target notes and backlinks appear.

**If not:** Check the file names and relative paths.

### 5. Add tags or properties

1. Open `Design.md`.
2. Open **Properties** when available.
3. Add tags `design` and `beginner`.
4. Set status to `draft`.
5. Save.

Advanced text equivalent:

```yaml
---
tags: [design, beginner]
status: draft
---
```

**Expected:** Properties or metadata show the saved values.

**If not:** Ensure frontmatter is the first block and uses spaces.

### 6. Open the knowledge graph

1. Open `Project overview`.
2. Open **Views > Relationships** or the focused graph.
3. Select **Local**.
4. Select **Fit view**.

**Expected:** Project overview connects to Design and Testing.

**If not:** Save the files, clear filters, and refresh the project index.

### 7. Create a simple API request

1. Open **Quick API**.
2. Choose **GET**.
3. Enter `https://jsonplaceholder.typicode.com/todos/1`.
4. Select **Send**.

**Expected:** A success status and a small response.

**If not:** Check network access and the final URL. Do not add credentials.

### 8. Inspect the JSON response

1. Copy the safe response body.
2. Open **JSON Tools**.
3. Paste the response.
4. Select **Format**.
5. Expand the tree when available.

**Expected:** Keys and values are indented and readable.

**If not:** Return to the Raw response and confirm you copied JSON rather than
an HTML error page.

### 9. Create a safe Git checkpoint when Git is available

1. Open **Developer tools > Git status**.
2. Confirm the repository and workspace boundaries.
3. Review each diff.
4. Stage only the tutorial files.
5. Use your normal Git client to commit:

```powershell
git diff --staged
git commit -m "Add My First App Project tutorial files"
```

**Expected:** Git records one commit containing only reviewed files.

**If unavailable:** Install Git or skip this optional step. Do not broaden trust
or move files merely to make the button appear.

### 10. Back up the workspace

1. Save everything.
2. Close active editors.
3. Create a ZIP of the complete `My First App Project` folder.
4. Open the ZIP and verify `project.devdesk`, `Project overview.md`, `Tasks.md`,
   `Design.md`, and `Testing.md`.

**Expected:** The backup contains all tutorial files.

**If not:** Recreate the ZIP from the workspace folder, not from one selected file.

### 11. Reopen and verify

1. Close DevDesk.
2. Reopen `project.devdesk` or select **Continue working**.
3. Open Project overview.
4. Open the graph.
5. Confirm the tasks, links, properties, and files are present.

Protected API secrets would need to be entered again on a different device.
This tutorial deliberately used none.
