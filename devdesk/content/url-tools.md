# URL Encoder / Decoder

URL Tools encode or decode URL components.

## Encode only the right part

Encode a query value or path segment rather than repeatedly encoding a complete URL. Encoding an already encoded value can produce incorrect `%25` sequences.

## Decode

Decode a component when you need to inspect the original characters. Malformed percent sequences should be corrected before use.

## Example

A space in a query value may become `%20`. Reserved characters have different meaning depending on whether they appear in a path, query, or fragment.

## Privacy

Processing is local. Opening a resulting link sends information to the selected destination through the browser or network stack.

## Example

```text
Original query value: developer workspace
Encoded value: developer%20workspace
```

A complete URL might become invalid if the scheme separators and reserved characters are encoded indiscriminately. Encode the component, not the entire already-structured URL.
