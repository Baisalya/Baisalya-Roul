# Markdown basics

Markdown is plain text with lightweight punctuation. DevDesk stores and edits normal Markdown, so the same files remain readable in GitHub, editors, terminals, and other compatible tools.

## Headings

```markdown
# Page title
## Major section
### Smaller section
```

Use one clear `#` title and meaningful `##` sections. Headings power the Outline panel and improve search and agent retrieval.

## Lists and tasks

```markdown
- First item
- Second item

1. Open the workspace
2. Review the change
3. Save the document

- [ ] Pending review
- [x] Approved
```

## Code

````markdown
Run the command:

```powershell
flutter analyze
```
````

Use fenced code blocks and name the language when known.

## Tables

```markdown
| Field | Meaning |
|---|---|
| `type` | Kind of concept |
| `status` | Draft, stable, or deprecated |
```

## Emphasis and inline code

```markdown
**Important** text, *emphasis*, and `inline_code`.
```

## Images

```markdown
![Architecture diagram](images/architecture.png)
```

DevDesk blocks remote Markdown images in safe preview paths to avoid silent tracking requests. Prefer local images inside the selected folder.

## A readable document pattern

```markdown
# Title

One-sentence summary.

## Why this exists

Explain the problem.

## How it works

Use steps, diagrams, and examples.

## Related documents

- [API contract](../api/customer-api.md)
- [Runbook](../runbooks/release-checklist.md)
```
