# Attested Computation

An `Attested Computation` concept describes a sanctioned method for computing a value and how a runtime receipt can be checked. OKF records the contract; it does not require the Markdown consumer itself to execute arbitrary code.

## When to use

Use it only when a value must be reproducible through an approved computation—for example a business metric or deterministic transformation.

## Concept outline

```markdown
---
type: Attested Computation
title: Monthly active customers
status: stable
---
# Computation

```sql
SELECT COUNT(DISTINCT customer_id)
FROM analytics.events
WHERE event_date BETWEEN :start_date AND :end_date
```

# Parameters

- `start_date`: inclusive start
- `end_date`: inclusive end

# Verification

The approved attester checks the executor receipt and parameter range.
```

## Safety

- A computation block is documentation, not permission to execute untrusted code.
- DevDesk validation can inspect required contract structure but must not claim the calculation was run.
- A verification event should be recorded only after the appropriate person or process actually checked the output.
