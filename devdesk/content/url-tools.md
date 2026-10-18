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

## Worked example: a query value containing an ampersand

Suppose the search value is `site report & photos`. Encode that value as a component to obtain `site%20report%20%26%20photos`. In a fictional request, the completed URL becomes:

```text
https://example.com/search?q=site%20report%20%26%20photos
```

The ampersand inside the value is encoded as `%26` so it cannot be mistaken for a separator between query parameters. The `https://`, path and `?q=` structure remain intact. Decode the component again and check that you recover the original text, including spaces and the ampersand.

Keep source values and already encoded values distinguishable. Encoding `%26` a second time produces `%2526`, because the percent sign itself is encoded. When a server receives the literal text `%26` instead of `&`, double encoding is one of the first things to check.

## Choose the right interpretation

Percent encoding and HTML escaping solve different problems. The `&amp;` written in an HTML link attribute represents an ampersand in HTML; it is not the same transformation as encoding a query-value ampersand to `%26`. Work with the URL value in this tool, then let the surrounding HTML or request builder handle its own representation.

A plus sign also needs context. Some form/query conventions interpret `+` as a space, while a literal plus in a value may need `%2B`. Check the receiver's contract instead of replacing all plus signs or spaces across a complete URL. A path segment containing a slash requires similar care because a slash can change the route structure.

## Before opening the result

Review the hostname and query values before following an encoded link. Encoding does not make a destination trustworthy or hide its values from the receiving server. Use fictional search terms for debugging and keep tokens and personal data out of examples.

If decoding fails, inspect incomplete percent escapes such as `%2` and confirm that the input is the intended component. If the destination returns an unexpected result, compare the original value, the encoded value and the final URL separately. Continue with [Saved API testing](api-workspaces.html) when the request needs additional parameters or headers.
