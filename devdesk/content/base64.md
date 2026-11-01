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

## Worked text round trip

Open **Base64 Tool** and use the **Text** view. Enter exactly `DevDesk`, without quotes or an extra line break, and encode it. The expected standard Base64 result is `RGV2RGVzaw==`. Copy that result into the input and decode it. You should recover `DevDesk` with the same capitalization.

This small round trip is useful before diagnosing a larger API payload. If your result differs, first check whether the source includes a newline, space or byte-order mark. These are data too, so their encoded result can legitimately differ. Compare the original input rather than editing the output until it happens to match an example.

## Work with a file without treating it as text

Use **File / binary** when the source is a PDF, image or another binary file. **Open file & encode** reads the selected bytes; **Copy Base64** or **Save .b64** lets you keep the encoded representation. For the reverse direction, open the Base64 text file, set a suitable **Decoded filename**, then use **Decode & save file**. Save to a separate destination so the original remains available.

After decoding, open a trusted output file in its normal viewer and confirm the expected pages or image appear. A successful Base64 decode only establishes that the encoded bytes could be read. It does not establish that the underlying file is a valid PDF, that its extension is accurate, or that it is safe to open.

## Diagnose common failures

- **A string starts with `data:image/...;base64,`:** that is a data URL wrapper. Check what the receiver expects before passing the whole value as plain Base64.
- **Decoded output is unreadable:** it may be binary or a different text encoding. Use the file workflow for binary data instead of expecting readable characters.
- **A request rejects valid-looking output:** confirm whether its contract requires standard Base64 or Base64url and whether padding is expected.
- **The result is unexpectedly large:** Base64 increases the data size. For a large attachment, check whether the API supports a normal file upload instead.

Use synthetic input in examples. Anyone who receives an encoded secret can decode it; encoding offers no access control. For building a request, continue with [Saved API testing](api-workspaces.html).
