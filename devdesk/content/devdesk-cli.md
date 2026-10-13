# DevDesk command-line guide

Use `devdesk` for project files, knowledge, API tests, local data, and bounded
operations from a terminal. The standalone CLI does not require the Flutter
window to be open or a DevDesk account. It shares services with the app;
visual editing stays in the GUI.

The command reference below was checked against installed **DevDesk CLI
1.2.6+21 on 13 October 2026**. Store links install their currently published
build. Check `devdesk --version` and `devdesk --help` to confirm which commands
your installed package provides. The existing platform and GUI broker guidance
also draws on the reviewed 1.2.5 source.

## Start with your installed package

```text
devdesk --version
devdesk --help
devdesk doctor
devdesk tools list
```

- **Windows Store / MSIX:** current packaging registers the `devdesk.exe`
  App execution alias for the console CLI. Open a new terminal. If missing,
  check Windows **App execution aliases** and your installed version.
- **Windows Classic installer:** adds packaged `cli\bin` to the current
  user's PATH. Open a new terminal after installation.
- **Portable Windows bundle:** run `cli\bin\devdesk.exe` directly and keep
  its packaged payload intact.
- **Linux packages:** the Debian package installs `devdesk` and `devdesk-gui`;
  the portable archive uses `./bin/devdesk` and `./bin/devdesk-gui`. Build and
  packaging support exists in source; this site does not advertise a public
  Linux package download.

For a source checkout with Dart installed, PowerShell uses
`.\devdesk.ps1 doctor`; Command Prompt can use `devdesk.cmd doctor`.
Prefer `--file` or `--stdin` for multiline content. The PowerShell launcher
preserves multiline/quoted arguments; CMD has batch argument limitations.
Installed native executables do not need Dart or the wrappers.

## Command families

| Workflow | Commands |
| --- | --- |
| Health and scripting | `doctor`, `completion`, `diagnostics`, `exit-codes` |
| Projects and tools | `files`, `run`, `project`, `verify`, `git` |
| Knowledge and comparison | `markdown`, `knowledge`, `search`, `diff` |
| API and utilities | `api`, `openapi`, `tools` |
| Identity and local data | `workspace`, `snippets`, `notes`, `settings`, `backup` |
| Operations | `containers`, `adb` |
| AI and routines | `ai`, `agents`, `routines` |

Use `devdesk --help` for the full command list. Subcommand help is not universal:
`devdesk api run --help` works, while `devdesk adb --help` is not accepted by
the checked build. Many inspection commands support `--json` for scripts.
Mutations use their documented confirmation flags. See the
[complete command reference](#complete-command-reference) for every usage line.

## Create files from CMD or PowerShell

The `.` workspace means your current folder. Replace it with a quoted folder
path when working elsewhere. Relative file paths belong to that workspace.

```text
devdesk files mkdir . docs
devdesk files create . docs/hello.md --content "Hello from DevDesk"
devdesk files create . src/example.dart --content "void main() {}" --parents
devdesk files read . docs/hello.md
```

`mkdir` creates a folder; `--parents` creates missing parent directories for a
new file. `create` never overwrites an existing file. Use `--stdin` for longer
content; piping differs between CMD and PowerShell. For commands that support
`--file`, pass a saved file to avoid shell quoting problems.

## Inspect a project

```text
devdesk files list . --depth 3
devdesk files read . README.md
devdesk project inspect . --json
devdesk project search . "retry" --json
devdesk project read . README.md --start 1 --max-chars 4000 --json
devdesk git status . --json
devdesk git diff . README.md
devdesk git log . --limit 10 --json
devdesk markdown list . --json
devdesk markdown headings . README.md --json
devdesk markdown metadata . README.md --json
devdesk knowledge index . --documents 100 --json
devdesk knowledge search . "release" --limit 10 --json
devdesk knowledge links . notes/overview.md --json
devdesk knowledge backlinks . notes/overview.md --json
devdesk knowledge issues . --json
devdesk knowledge path . notes/overview.md notes/release.md --json
devdesk search . "release" --kind markdown,workspaceFile --json
devdesk diff files before.md after.md --exit-code
devdesk diff text "before" "after"
devdesk diff folders before-folder after-folder --ignore node_modules --json
```

Project paths stay inside the selected root; enumeration does not follow links.
`files create` refuses to overwrite files. Indexing/text sharing stays bounded
and excludes known credential paths. With `--exit-code`, diff returns `1` when
differences exist.

## API tests, OpenAPI, and utilities

```text
devdesk api request GET https://api.example.com/health --json --fail
devdesk api run devdesk-api-workspace.json --report junit --output api-report.xml
devdesk openapi validate openapi.yaml --json
devdesk openapi operations openapi.yaml --json
devdesk tools list
devdesk tools json pretty --file payload.json
devdesk tools base64 encode "hello"
devdesk tools uuid generate 3
```

Sending API requests contacts the selected destination. Collection assertions
and failures produce a non-zero exit code for scripts/CI. Utilities cover JSON,
Base64, URL, regex, UUID, timestamps, and JWT inspection.

## Portable workspace identity

```text
devdesk workspace manifest inspect .
devdesk workspace manifest init . --name "My Project"
devdesk workspace manifest validate devdesk.project
devdesk workspace manifest print .
devdesk workspace manifest upgrade .
```

The canonical manifest is `devdesk.project`. Legacy `project.devdesk` is still
accepted. `init` never replaces an accepted manifest. `upgrade` verifies the
legacy file and renames it only when the canonical destination is unused.

## Local data and backup

```text
devdesk snippets list --query retry
devdesk notes search "release checklist"
devdesk settings get theme_mode
devdesk backup export backup.json
devdesk backup validate backup.json
devdesk backup preview backup.json
devdesk backup restore backup.json
devdesk backup restore backup.json --merge --apply
```

Restore is a dry run until `--apply`. Destructive note/snippet/settings actions
require `--yes`. Secret-shaped settings are blocked and protected credentials
are excluded from portable backups. Backup JSON can contain other confidential
content. External workspace folders must be backed up separately.

Use `--data-dir PATH` or `DEVDESK_DATA_DIR` for an isolated profile. Close the GUI
before direct-storage mutations such as notes, snippets, settings, or restore.
Concurrent broker support applies only to the commands below.

## Use the CLI while the GUI is open

The desktop GUI remains the single Hive storage owner. Supported CLI commands
use an authenticated local broker: a Windows Named Pipe or Linux Unix Domain
Socket, with no TCP/HTTP listener. When the GUI closes, the CLI uses direct storage.

- Brokered inspection: `routines list/get/history`, `ai status/providers`.
- Brokered mutations: `routines add/enable/disable/delete/run/check`.
- Consequential mutations retain `--yes`; forwarding never grants automatic
  AI provider-send authority.

JSON storage-backed output reports `storageOwner` as `gui` or `cli` when that
field applies. Bounded retries and short-lived replay protection guard retried
mutations. An open GUI does not make every app-data command safe concurrently.
Use the same intended data profile on both sides.

## Run tools and inspect operations

```text
devdesk run . --timeout 120 -- flutter test
devdesk verify plan . --json
devdesk containers docker runtime --json
devdesk containers kube runtime --json
devdesk adb devices --json
```

`run` starts the exact program after `--` in the selected folder, without
interpreting an arbitrary shell string. Explicitly launched programs run with
your user's permissions. Timeout terminates the child process tree and returns `124`.

Verification uses detected approved adapter plans and consent for execution.
Docker offers inspection and guarded lifecycle actions. Kubernetes CLI inspection
is read-only; pod exec, Secret reveal, delete, scale, and rollout mutations are
absent. ADB offers bounded inspection and consent-gated control; root, fastboot,
arbitrary shell, install/uninstall, and device wipe are absent. Install the
relevant toolchains separately.

## Docker, Kubernetes, and Android inspection

```text
devdesk containers doctor --json
devdesk containers docker list
devdesk containers docker inspect <container>
devdesk containers docker logs <container>
devdesk containers docker stats <container>
devdesk containers kube contexts
devdesk containers kube namespaces
devdesk containers kube workloads --namespace default
devdesk containers kube pods --namespace default
devdesk containers kube describe deployment my-app --namespace default --json
devdesk containers kube logs my-pod --tail 100 --namespace default --json
devdesk adb capabilities --json
devdesk adb devices --json
devdesk adb screenshot emulator-5554 --output phone.png
devdesk adb ui emulator-5554 --limit 100 --json
devdesk adb logcat emulator-5554 --lines 100 --json
```

Replace angle-bracket placeholders with real IDs; do not type the brackets in
CMD, where they are redirection operators. Use `--context NAME` and
`--namespace NAME` to target Kubernetes inspection. ADB commands use a serial
from `adb devices`. Screenshot output is a PNG file; `--force` permits replacing
an existing output file.

Docker `start`, `stop`, `restart`, `pause`, and `unpause` require `--yes`.
ADB `connect`, `launch`, `tap`, `swipe`, `text`, and `key` also require `--yes`.
The reference lists the top-level syntax; consult `adb capabilities` for the
installed device-control capabilities. GUI container deployment and terminal
features have their own workflows in [Containers & Kubernetes](container-operations.html).

## AI and saved agents

```text
devdesk ai status . --json
devdesk ai providers . --json
devdesk ai plan . --prompt "Explain this error" --json
devdesk ai run . --file prompt.md --credential-env MY_AI_TOKEN --yes --json
devdesk agents list . --json
devdesk agents status . --json
devdesk agents activity . --limit 20 --json
devdesk agents automation list . --json
```

`ai run` sends only your explicit prompt and, when selected, the saved agent
system instruction. It requires `--yes`. Supply a credential environment-variable
name, never a literal key argument. CLI inspection does not reveal GUI protected
credentials. Workspace files, memory, terminal, browser, ADB, and model tools
are not attached automatically; provider tool-call attempts are rejected.
Saved-agent automation is limited to the read-only graph-health action and
respects workspace policy and consent.
`agents automation schedule-health` schedules the supported health task;
`run`, `enable`, and `disable` target a saved task ID. These actions require
`--yes`. `verify plan` lists detected verification command IDs before
`verify run . <command-id> --yes` executes a selected check.

## Routines from a terminal

```text
devdesk routines list --json
devdesk routines add --title "Daily review" --prompt "Plan my next three tasks" --cadence daily --at 2026-10-14T09:00:00+05:30 --json
devdesk routines get <routine-id> --json
devdesk routines disable <routine-id> --yes
devdesk routines enable <routine-id> --yes
devdesk routines run <routine-id> --yes --json
devdesk routines check --yes --json
devdesk routines history --limit 20 --json
```

`routines run` requests manual review. `routines check` leaves due automatic
modes for the app-owned runtime. Neither sends an AI provider request.
See [Notifications and AI routines](notifications-routines.html) for automatic
modes and the optional Windows Classic closed-app worker.

## Completion, diagnostics, and exit codes

```text
devdesk --no-color doctor
devdesk --quiet --version
devdesk completion powershell --output devdesk-completion.ps1
devdesk completion bash
devdesk completion zsh
devdesk diagnostics bundle --output devdesk-diagnostics.json
devdesk exit-codes --json
```

Global `--quiet` and `--no-color` go before the command. Quiet mode suppresses
normal DevDesk stdout while retaining errors/status; child-program output stays
visible. Completion/diagnostics do not overwrite files without `--force`.
Default diagnostics omit secrets, environment values, workspace contents, and
user/tool paths, and send no telemetry.

| Code | Meaning |
| ---: | --- |
| 0 | Success |
| 1 | Negative/status result, including a requested diff comparison |
| 2 | Unexpected internal CLI error |
| 64 | Invalid command/arguments or consent gate |
| 65 | Domain/data validation failure |
| 66 | Filesystem/path failure |
| 69 | Required executable/service unavailable |
| 124 | Configured timeout exceeded |

`run` normally returns the child program's exit code. Check each command's
contract before treating every non-zero result as a crash.

## Troubleshooting

For a missing command, open a fresh terminal, check the installed version and
Windows alias/PATH, and confirm that another installation is not taking
precedence. Use `doctor` for tool availability. For storage errors, confirm the
profile and close the GUI for commands outside broker support.
See [Downloads and installation](downloads-installation.html) and
[Troubleshooting](troubleshooting.html).

<!-- CLI_REFERENCE_START -->
## Complete command reference

Every usage line below comes from the installed `devdesk --help`. Square
brackets mark optional arguments; angle brackets mark values you must replace.
The `...` entries are exactly as summarized by the CLI, not expanded syntax.
Download the [plain-text help snapshot](../assets/downloads/devdesk-cli-help.txt)
or run `devdesk --help` locally to check your installed build.

### Files, projects, Git, and verification

```text
devdesk files list <workspace> [--depth 4] [--json]
devdesk files read <workspace> <relative-path>
devdesk files create <workspace> <relative-path> [--content <text>|--stdin] [--parents]
devdesk files mkdir <workspace> <relative-path>
devdesk run <workspace> [--timeout SECONDS] [--] <program> [arguments]
devdesk project inspect <workspace> [--json] [--files N]
devdesk project search <workspace> <query> [--content] [--limit N] [--json]
devdesk project read <workspace> <relative-path> [--start N] [--max-chars N] [--json]
devdesk git status <workspace> [--json]
devdesk git diff <workspace> <relative-path> [--staged]
devdesk git log <workspace> [--limit N] [--json]
devdesk verify plan <workspace> [--json]
devdesk verify run <workspace> <command-id...>|--all --yes [--json]
```

### Markdown, knowledge, search, and diff

```text
devdesk markdown list <workspace> [--limit N] [--json]
devdesk markdown read <workspace> <relative-path> [--json]
devdesk markdown headings <workspace> <relative-path> [--json]
devdesk markdown metadata <workspace> <relative-path> [--json]
devdesk knowledge index <workspace> [--documents N] [--json]
devdesk knowledge search <workspace> <query> [--limit N] [--json]
devdesk knowledge links <workspace> <document> [--json]
devdesk knowledge backlinks <workspace> <document> [--json]
devdesk knowledge issues <workspace> [--json]
devdesk knowledge path <workspace> <from> <to> [--json]
devdesk search <workspace> <query> [--kind KIND[,KIND]] [--limit N] [--json]
devdesk diff files <left-file> <right-file> [options]
devdesk diff text <left> <right> [options]
devdesk diff folders <left-dir> <right-dir> [--ignore NAME] [--all] [--json] [--exit-code]
```

### API requests, OpenAPI, and utilities

```text
devdesk api request <method> <url> [options]
devdesk api run <workspace.json> [collection runner options]
devdesk tools list
devdesk tools <json|base64|url|regex|uuid|timestamp|jwt> ...
devdesk openapi validate <spec-file> [--json]
devdesk openapi summary <spec-file> [--json]
devdesk openapi operations <spec-file> [--json]
```

### Workspace manifests and local data

```text
devdesk workspace manifest inspect <workspace> [--json]
devdesk workspace manifest init <workspace> [--name NAME] [--knowledge-root PATH] [--exclude PATH] [--json]
devdesk workspace manifest validate <file> [--json]
devdesk workspace manifest print <workspace> [--json]
devdesk workspace manifest upgrade <workspace> [--json]
devdesk snippets list [--query TEXT] [--tag TAG] [--limit N] [--json] [--data-dir PATH]
devdesk snippets get <id> [--json] [--data-dir PATH]
devdesk snippets add --title TITLE [--content TEXT|--file PATH|--stdin] [--tag TAG] [--json] [--data-dir PATH]
devdesk snippets update <id> [--title TITLE] [--content TEXT|--file PATH|--stdin] [--tag TAG] [--json] [--data-dir PATH]
devdesk snippets delete <id> --yes [--json] [--data-dir PATH]
devdesk notes list [--query TEXT] [--tag TAG] [--folder PATH] [--limit N] [--json] [--data-dir PATH]
devdesk notes get <id-or-title> [--json] [--data-dir PATH]
devdesk notes search <query> [--folder PATH] [--limit N] [--json] [--data-dir PATH]
devdesk notes add --title TITLE [--content TEXT|--file PATH|--stdin] [--folder PATH] [--json] [--data-dir PATH]
devdesk notes update <id> [--title TITLE] [--content TEXT|--file PATH|--stdin] [--folder PATH] [--json] [--data-dir PATH]
devdesk notes delete <id-or-title> --yes [--json] [--data-dir PATH]
devdesk settings path [--json] [--data-dir PATH]
devdesk settings list|get|set|delete|reset ... [--data-dir PATH]
devdesk backup validate|preview <backup.json> [--json]
devdesk backup export <backup.json> [--json] [--data-dir PATH]
devdesk backup restore <backup.json> [--merge] [--apply] [--json] [--data-dir PATH]
```

### Docker, Kubernetes, and ADB

```text
devdesk containers doctor [--json]
devdesk containers docker runtime|list|inspect|logs|stats ...
devdesk containers docker start|stop|restart|pause|unpause <container> --yes [options]
devdesk containers kube runtime|contexts|namespaces|workloads|pods ...
devdesk containers kube describe <kind> <name> [--context NAME] [--namespace NAME] [--cluster] [--json]
devdesk containers kube logs <pod> [--container NAME] [--tail N] [--previous] [--context NAME] [--namespace NAME] [--json]
devdesk adb capabilities [--json]
devdesk adb devices [--json]
devdesk adb connect <host:port> --yes [--json]
devdesk adb screenshot <serial> --output <png> [--max-bytes N] [--force] [--json]
devdesk adb ui <serial> [--limit N] [--json]
devdesk adb logcat <serial> [--lines N] [--json]
devdesk adb launch|tap|swipe|text|key ... --yes [--json]
```

### AI, saved agents, automation, and routines

```text
devdesk ai status|providers <workspace> [--json] [--data-dir PATH]
devdesk ai plan <workspace> (--prompt TEXT|--file PATH|--stdin) [--provider ID] [--model ID] [--agent ID] [--credential-env NAME] [--json] [--data-dir PATH]
devdesk ai run <workspace> (--prompt TEXT|--file PATH|--stdin) --yes [--provider ID] [--model ID] [--agent ID] [--credential-env NAME] [--allow-secret-values] [--json] [--data-dir PATH]
devdesk agents list|status <workspace> [--json] [--data-dir PATH]
devdesk agents activity <workspace> [--limit N] [--json] [--data-dir PATH]
devdesk agents automation list <workspace> [--json] [--data-dir PATH]
devdesk agents automation schedule-health <workspace> [--hours N] --yes [--json] [--data-dir PATH]
devdesk agents automation run|enable|disable <workspace> <task-id> --yes [--json] [--data-dir PATH]
devdesk routines list [--json] [--data-dir PATH]
devdesk routines get <id> [--json] [--data-dir PATH]
devdesk routines add --title TITLE (--prompt TEXT|--file PATH|--stdin) --cadence once|daily|weekdays|weekly --at ISO8601 [--mode review-first|ai-prepare|ai-auto-run] [--workspace-id ID] [--allow-workspace-context] [--allow-external-research] [--json] [--data-dir PATH]
devdesk routines enable|disable|delete|run <id> --yes [--json] [--data-dir PATH]
devdesk routines check --yes [--now ISO8601] [--json] [--data-dir PATH]
devdesk routines history [--limit N] [--json] [--data-dir PATH]
```

### Health, completion, diagnostics, and exit codes

```text
devdesk doctor [--json]
devdesk completion powershell|bash|zsh [--output PATH] [--force]
devdesk diagnostics bundle --output <diagnostics.json> [--force] [--json]
devdesk exit-codes [--json]
```

### Global, run, and HTTP request options

```text
Global options (place before the command):
  --quiet                      Suppress standard output; errors and exit codes remain.
  --no-color                   Disable ANSI color output (future-proof/no-op today).

Run options:
  --timeout <seconds>          Stop the child after 1-86400 seconds; exits 124.

API request options:
  --header "Name: value"       Repeat for multiple headers.
  --body <text>                Send a text body.
  --body-file <path>           Read a body from a file (maximum 5 MB).
  --body-stdin                 Read the body from stdin.
  --timeout <seconds>          1-300 seconds (default: 30).
  --no-redirect               Disable redirects.
  --output <path>              Save response bytes.
  --json                       Print a machine-readable response.
  --fail                       Exit 1 for HTTP 4xx/5xx responses.
```

### API collection runner options

`devdesk api run <workspace.json>` also accepts these options, checked with
`devdesk api run --help`:

```text
  --environment <id|name>   Select an environment.
  --collection <id|name>    Select a collection (default: first).
  --folder <id>             Run one folder recursively.
  --tag <tag>               Run tagged requests; repeatable.
  --data <csv|json>         Iteration data file.
  --iterations <n>          Iterations (default: 1).
  --concurrency <n>         Parallel requests, 1-32 (default: 1).
  --delay <ms>              Delay after requests.
  --retries <n>             Retry errors and 5xx responses, 0-10.
  --backoff <ms>            Exponential retry base delay.
  --rate <requests/sec>     Global start-rate limit.
  --stop-on-failure         Stop queued work after a failure.
  --secrets-stdin           Read a JSON secret object from stdin.
  --report <json|junit|html|markdown>
  --output <path>           Save report instead of printing it.
  --help
```

Secret environment variables use `DEVDESK_SECRET_<VARIABLE_NAME>`.
<!-- CLI_REFERENCE_END -->
