# JWT Decoder

JWT Decoder displays the header and payload of a JSON Web Token locally.

## Important limitation

Decoding is not verification. A readable token can still have an invalid signature, be expired, use an unexpected issuer, or be unsafe to trust.

## Steps

1. Paste a token.
2. Review decoded header and payload.
3. Inspect time-related claims such as `exp`, `iat`, or `nbf`.
4. Verify the signature in the system that owns the correct key and algorithm.

## Privacy

Decoding is local. Tokens often contain credentials or personal information, so avoid screenshots, public issues, logs, and unnecessary clipboard copies.

## JWT shape

```text
base64url(header).base64url(payload).signature
```

Decoded example:

```json
{
  "sub": "user-123",
  "iss": "https://issuer.example",
  "exp": 1780000000
}
```

Check issuer, audience, time claims, algorithm, and signature in the system that owns the verification key. Never paste a real production token into screenshots or public support tickets.
