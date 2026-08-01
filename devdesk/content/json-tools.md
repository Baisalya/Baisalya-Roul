# JSON Tools

JSON Tools validates, formats, minifies, and explores JSON.

## Use JSON Tools in a workspace

When opened from a Developer Workspace, JSON Tools uses only `.json` files in
that active workspace. If no compatible file is selected, choose **Choose
workspace file** to see the project's JSON files or **Create in workspace** to
create a new `data.json` starter. DevDesk does not reuse a selected `.txt` file
or fall back to independent JSON from another tool.

The project Save action writes to the selected workspace-relative file with
fingerprint conflict protection. Export actions create a separate copy. JSON
opened outside a workspace remains independent until you explicitly import or
assign it.

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
