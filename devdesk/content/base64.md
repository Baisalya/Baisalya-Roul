# Base64 Tool

Base64 Tool converts text or bytes to and from Base64.

## Encode

Enter text and select encode. The result is an encoding, not encryption.

## Decode

Paste a valid Base64 string and select decode. Binary output may not be readable as text.

## Common mistakes

- Missing padding
- URL-safe Base64 used as standard Base64
- Treating Base64 as secure storage
- Decoding untrusted binary content without checking its type

## Privacy

Processing is local. Base64 can still contain credentials, tokens, files, or personal data.

## Example

```text
DevDesk → RGV2RGVzaw==
```

URL-safe Base64 may use `-` and `_` instead of `+` and `/`. Padding rules also vary by protocol.
