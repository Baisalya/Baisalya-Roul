# UUID Generator

UUID Generator creates random version 4 UUID values.

## Generate

Choose the quantity and generate. Review the list, then copy the value or values you need.

## Use cases

- Local record identifiers
- Test fixtures
- Correlation IDs
- Temporary development data

## Limitations

A UUID is not a password, secret, signature, authorization token, or proof of uniqueness across hostile input.

## Privacy

Generation is local.

## Example

```text
8b7b50db-2a87-4fd7-a20f-1b7ff6cbd56c
```

Do not use a UUID as an authentication secret. It is an identifier format, not proof that a request is authorized.

## Worked example: stable test records

Suppose an API test needs three independent customer records. Open **UUID Generator**, set **Count** to `3`, then choose **Generate**. Copy one generated value into each record's `id` field. Keep a small mapping in your test fixture so you can recognize which customer each ID belongs to.

```json
{
  "id": "8b7b50db-2a87-4fd7-a20f-1b7ff6cbd56c",
  "displayName": "Example Customer"
}
```

Your generated values will differ from this example. The goal is three separate identifiers, not reproducing this particular string. Save the fixture after generating the IDs. Generating a new ID every time you edit the same record can make an update look like a new customer and break references from related orders.

For a correlation ID, generate one value at the beginning of the operation and carry it through the relevant requests and diagnostic records. A different value on every log line makes it harder to follow one operation. For reusable examples in a README, use fictional records and state that the values are sample identifiers.

## Check the destination before pasting

A typical text representation has five groups separated by hyphens. Check whether the receiving system accepts that representation or expects a different identifier type. An integer-only database field will not accept a UUID merely because the value is unique-looking. Keep the receiving database's uniqueness constraints; random generation does not replace validation or conflict handling.

If nothing appears, check that **Count** contains a supported positive quantity and generate again. If a copied value is rejected, check for leading spaces, line breaks or a destination expecting another format. Copy one UUID for a single-ID field rather than the whole generated list.

For the next step, see [Saved API testing](api-workspaces.html) to use fictional identifiers in request bodies, or [Snippets and Notes](snippets-notes.html) to keep a reusable, non-sensitive example.
