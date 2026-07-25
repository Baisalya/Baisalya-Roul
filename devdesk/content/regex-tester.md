# Regex Tester

Regex Tester evaluates a regular expression against local test text.

## Steps

1. Enter a pattern.
2. Configure supported flags.
3. Add representative test text.
4. Review matches and groups.
5. Copy the final expression after testing edge cases.

## Performance

Some patterns can cause expensive backtracking. DevDesk applies bounded processing where supported, but avoid nested ambiguous quantifiers on large input.

## Examples

- Email-like text: test only for your application rules; do not treat a simple regex as complete email validation.
- Named identifiers: use anchors when the whole string must match.
- Search-and-extract: use capturing groups intentionally.

## Privacy

Pattern and test text remain local unless you copy or export them.

## Simple examples

Whole-string identifier:

```regex
^[A-Za-z][A-Za-z0-9_-]{2,31}$
```

Capture a version:

```regex
version:\s+(\d+\.\d+\.\d+)
```

## Read the result

- A **match** is text accepted by the pattern.
- A **capture group** is a parenthesized subpart.
- Anchors `^` and `$` constrain the start and end.
- Flags can change case sensitivity and multi-line behavior.

> [!CAUTION] A pattern that works on a short sample can become slow on a large hostile input. Avoid nested ambiguous quantifiers such as `(a+)+`.
