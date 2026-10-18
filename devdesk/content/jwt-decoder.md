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

## Worked inspection: why a readable payload can fail

Imagine a development API rejects a token whose payload contains `sub: "user-123"`, `aud: "example-web"` and `exp: 1704067200`. The decoder can make those fields readable, but the API might require audience `example-api`. The example expiration also describes 1 January 2024 at 00:00 UTC. Either condition can explain a rejection even when the token has three correctly separated parts.

Use a synthetic token from your own test environment. Paste it into **JWT Decoder**, inspect the header and payload, and compare the expected issuer and audience with the API's configuration. Treat `exp`, `iat` and `nbf` as seconds-based time claims; the [Timestamp Converter](timestamp.html) helps inspect their calendar values. Server-side verification remains the authority on whether a token is accepted.

Do not repair a real token by editing its decoded payload and encoding it again. Changing a claim changes the signed content. Request a new token from the intended issuer with the correct application settings instead. Similarly, the header's algorithm is data supplied with the token; it does not tell the verifier which algorithms it should trust.

## Distinguish token formats and failure types

A common signed JWT has three dot-separated segments. An encrypted token or an opaque access token may use a different format and will not necessarily be readable in this tool. A decode error is therefore not proof that every token with that shape is invalid for the service that issued it.

If decoding succeeds but a request returns `401`, check the API's authentication guidance: token expiry, intended audience, issuer, environment and signature validation are separate from Base64url decoding. If access is denied after authentication, the account may lack the requested permission. Do not post the token in a public issue to demonstrate either problem.

For a support report, share only sanitized claim names, fictional example values and the relevant error message. A screenshot of a decoded production payload can reveal personal data even if the signature is hidden.
