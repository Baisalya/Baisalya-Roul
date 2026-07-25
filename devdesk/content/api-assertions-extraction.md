# Assertions, extraction, examples, and history

## Assertions

Assertions check response conditions such as:

- Status code equals an expected value
- Header exists or contains a value
- Response body or JSON path matches a condition
- Timing remains under a selected threshold

An assertion failure means the observed response did not match the rule; it does not necessarily mean DevDesk itself failed.

## Extraction rules

Extraction can save a response value for later requests, for example a created customer ID.

```json
{
  "id": "cus_123",
  "name": "Example Customer"
}
```

A rule might extract `id` into `customer_id`.

> [!WARNING] Do not extract passwords, access tokens, or personal data into an ordinary unprotected variable.

## Examples

Save representative responses as examples when they are safe to retain. Remove live credentials and personal data first.

## History

History is stored locally with limits. Treat it as potentially sensitive because request URLs, headers, bodies, and response excerpts can contain confidential information even after conservative redaction.
