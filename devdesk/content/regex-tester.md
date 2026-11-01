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

## Worked example: inspect a version line

Enter `version:\s+(\d+\.\d+\.\d+)` in **Regex Pattern**. Use the following fictional **Sample Text**, keep **Case sensitive** enabled and choose **Test**:

```text
name: example-tool
version: 2.5.1
channel: demo
```

The intended full match is `version: 2.5.1`; the first capture group contains `2.5.1`. The escaped dots match literal periods. Without the backslashes, a dot normally accepts a character more broadly and could match a string you did not intend to recognize.

Now test `version: 2x5x1`, a missing version and `Version: 2.5.1`. These should not match that case-sensitive pattern. This negative set is as useful as the successful example: it shows whether the expression rejects malformed or differently capitalized data. If you disable **Case sensitive**, deliberately recheck the capitalization case and confirm the changed behavior is wanted.

## Match a complete value or search inside text

The identifier expression above uses `^` and `$` to constrain the value. Try `abc_12` as a positive example and `12abc` or `ab` as negative examples. With **Multiline** enabled, anchors can apply to line boundaries, so testing a multi-line document is different from validating one isolated field.

Use regex for the part of the format it can reliably express. Matching a date-shaped string does not establish that a calendar date exists, and a basic email-shaped match does not confirm that a mailbox is reachable. Add the appropriate parser or application validation after the text match.

## Transfer the result carefully

When copying an expression into source code, account for the destination language's string escaping. The backslashes entered directly in the tester may need another representation in a normal quoted string. Regex engines and supported syntax can also differ. Re-run the same positive and negative samples in the application where the final expression will execute.

If the tester reports an error, simplify to a small pattern and check unclosed brackets, parentheses and trailing backslashes. For a slow expression, reduce the sample and remove ambiguous repetition before trying a larger input again.
