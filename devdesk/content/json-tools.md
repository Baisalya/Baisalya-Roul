# JSON Tools

JSON Tools validates, formats, minifies, and explores JSON.

## Format JSON

1. Paste or open JSON.
2. Select **Format**.
3. Review the output and any parsing error.
4. Copy or save only after checking sensitive values.

## Minify

Minification removes unnecessary whitespace without changing data structure.

## Tree view

The tree view helps inspect nested arrays and objects. Large or deeply nested input may use bounded processing to keep the UI responsive.

## Common errors

- Missing comma
- Unquoted key
- Extra closing bracket
- Invalid escape
- Trailing characters after the root value

## Privacy

JSON processing is local. Clipboard and exported content can still be read by other apps or services according to the operating system.

## Example

Input:

```json
{"name":"DevDesk","platforms":["Android","Windows"],"offline":true}
```

Formatted:

```json
{
  "name": "DevDesk",
  "platforms": [
    "Android",
    "Windows"
  ],
  "offline": true
}
```

## JSON is not JavaScript

JSON requires double-quoted keys and strings. It does not support comments, functions, `undefined`, or trailing commas.
