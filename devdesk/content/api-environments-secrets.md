# API environments and protected secrets

An environment is a named set of variables such as development, staging, or production.

## Example

```text
Environment: Staging
base_url       = https://staging-api.example.com
client_id      = devdesk-mobile
access_token   = [protected]
```

A request can reference variables:

```text
{{base_url}}/customers/{{customer_id}}
```

## Create an environment

1. Open the workspace environment area.
2. Create a clearly named environment.
3. Add ordinary non-sensitive values.
4. Mark credentials or tokens as protected where the UI supports it.
5. Save and select the environment before sending.

## Protected storage boundary

- Android uses a Keystore-backed encryption key.
- Windows uses DPAPI for the current Windows user.
- Protected values are excluded from supported portable backups and exports.
- Browser/web builds do not provide an equivalent persistent secret boundary; protected web values are session-only where supported.

## Safe practice

- Do not put a production token in a screenshot or public issue.
- Use short-lived test credentials.
- Confirm the selected environment before sending a destructive request.
- Avoid extracting a secret into an ordinary variable.
