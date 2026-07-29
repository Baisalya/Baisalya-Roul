# Sources, trust, freshness, and lifecycle

These are optional advanced signals. A beginner can create and use OKF concepts
without them.

Add them only when the information is real. DevDesk never invents a source,
verification, or lifecycle decision.

## Add a real source

A source says where supporting information came from.

1. Open **Developer tools > Structure and OKF**.
2. Under **Manual knowledge maintenance**, select **Add source**.
3. Select the **Concept**.
4. Enter **Resource**.
5. Add **Source ID**, title, or author only when known.
6. Leave usage fields empty unless you have measured usage data.
7. Select **Preview**.
8. Review the proposed frontmatter.
9. Select **Apply reviewed plan**.

The **Resource** field is required. It can be a URL or a relative workspace
path, for example:

```text
references/privacy-policy.md
```

or:

```text
https://example.com/official-api-documentation
```

Do not enter a guessed or unrelated source.

## Source field meanings

| Field | Meaning |
|---|---|
| Resource | Where the supporting information can be found |
| Source ID | Short identifier for footnote attribution |
| Title | Human-readable source name |
| Author actor | Person, team, process, or producer responsible |
| Usage count | Measured number of uses |
| Usage window from/to | Dates represented by the usage count |
| Source last modified | Known source modification date |

If **Usage count** is supplied, both usage-window dates must also be supplied.

The saved form can look like:

```yaml
sources:
  - id: api-spec
    resource: references/customer-openapi.yaml
    title: Customer API OpenAPI document
    author: team:api-platform
    last_modified: 2026-07-20
```

## Record verification

Verification means a person or known process actually checked the concept.

1. Select **Record verification**.
2. Select the **Concept**.
3. Enter **Verification actor**.
4. Select **Preview**.
5. Confirm that the check really happened.
6. Select **Apply reviewed plan**.

Valid action actors include:

- `human:baishalya`
- `process:nightly-api-check`
- `devdesk-review/1.0`

Do not select this action just to remove an “Unverified” count.

DevDesk records the current time with the actor:

```yaml
verified:
  - by: human:baishalya
    at: 2026-07-29T11:00:00Z
```

## Understand trust labels

The app derives these display labels:

- **Unverified:** no verification events.
- **Machine confirmed:** at least one verification exists, but none use a
  `human:` actor.
- **Human reviewed:** at least one event uses a `human:` actor.

These labels are advisory. They are not login permissions, access control,
cryptographic proof, or a guarantee that the content is true.

## Update lifecycle

1. Select **Update lifecycle**.
2. Select the **Concept**.
3. Choose **Status**.
4. Add **Stale after** only when a real review date is useful.
5. Select **Preview**.
6. Select **Apply reviewed plan** after review.

Statuses:

- `draft`: unfinished or awaiting review.
- `stable`: currently accepted for normal use.
- `deprecated`: old content kept for history.

An absent status is interpreted as stable by the current app. New concepts
created by the form default to draft.

## Freshness

`stale_after` uses `YYYY-MM-DD`:

```yaml
status: stable
stale_after: 2026-12-31
```

The concept is shown as stale on or after that date. Stale means “review this
again.” It does not automatically mean false.

## Deprecation

When deprecating a concept, explain its replacement in the Markdown body:

```markdown
# Deprecated

Use [Customer API v2](customer-api-v2.md) instead.
```

DevDesk can recommend a replacement link, but it does not choose the replacement
for you.

## Generated is not verified

`generated` records who or what created a version:

```yaml
generated:
  by: devdesk/1.0
  at: 2026-07-29T10:00:00Z
```

It does not mean the concept was checked. Use **Record verification** only after
a real review.

## Safety

- Opening the page does not fetch source URLs.
- Adding a source does not prove the source is trustworthy.
- Recording a process actor does not run that process.
- A stale date does not delete or change content.
- Lifecycle and trust actions always use a previewed managed plan.
