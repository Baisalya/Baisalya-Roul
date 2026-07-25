# Create a project knowledge structure

A non-developer can create a useful structure with folders and plain text files. Start small; DevDesk can index additional files later.

## Recommended starter structure


```text
my-project-knowledge/
├── index.md                     # Bundle entry point; may declare okf_version
├── log.md                       # Optional update history, newest date first
├── architecture/
│   ├── index.md                 # Optional directory listing
│   ├── system-overview.md       # One concept
│   └── data-flow.md             # One concept
├── api/
│   ├── index.md
│   └── customer-api.md
├── decisions/
│   └── adr-001-local-storage.md
├── runbooks/
│   └── release-checklist.md
└── references/                  # Optional mirrored source material or scripts
    └── api-schema.md
```


## Windows PowerShell command

```powershell
$root = "$HOME\Documents\MyProjectKnowledge"
$folders = @(
  $root,
  "$root\architecture",
  "$root\api",
  "$root\decisions",
  "$root\runbooks",
  "$root\references"
)
$folders | ForEach-Object { New-Item -ItemType Directory -Force $_ | Out-Null }

@"
---
okf_version: "0.2"
---
# My Project Knowledge

## Start here

- [System overview](architecture/system-overview.md)
- [Customer API](api/customer-api.md)
- [Release runbook](runbooks/release-checklist.md)
"@ | Set-Content -Encoding utf8 "$root\index.md"

@"
# Directory Update Log

## $(Get-Date -Format yyyy-MM-dd)
- **Initialization**: Created the initial knowledge structure.
"@ | Set-Content -Encoding utf8 "$root\log.md"
```

## macOS or Linux command

```bash
root="$HOME/Documents/MyProjectKnowledge"
mkdir -p "$root"/{architecture,api,decisions,runbooks,references}
cat > "$root/index.md" <<'EOF'
---
okf_version: "0.2"
---
# My Project Knowledge

## Start here

- [System overview](architecture/system-overview.md)
- [Customer API](api/customer-api.md)
- [Release runbook](runbooks/release-checklist.md)
EOF

cat > "$root/log.md" <<EOF
# Directory Update Log

## $(date +%F)
- **Initialization**: Created the initial knowledge structure.
EOF
```

## Create the first concept

Save this as `architecture/system-overview.md`:

```markdown
---
type: Architecture

title: System overview

description: A high-level map of the application and its major boundaries.

tags: [architecture, overview]

status: draft
---

# Purpose

Explain what the system does and who uses it.

# Components

- Mobile and desktop application
- Local data storage
- API destinations selected by the user

# Related knowledge

See the [Customer API](../api/customer-api.md) and the
[Release runbook](../runbooks/release-checklist.md).
```

> [!TIP] Blank lines inside YAML are allowed by YAML, but compact frontmatter is easier to scan. DevDesk preserves unknown fields where possible.
