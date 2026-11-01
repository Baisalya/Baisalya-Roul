# Timestamp Converter

Timestamp Converter converts Unix timestamps and human-readable dates.

## Units

Confirm whether the source uses seconds or milliseconds. Confusing the two produces dates far in the past or future.

## Time zones

Unix timestamps represent an instant. The displayed calendar value depends on local or UTC presentation.

## Workflow

1. Enter a timestamp or date.
2. Select the appropriate unit and time-zone interpretation.
3. Review the converted value.
4. Copy the exact format needed by your system.

## Privacy

Conversion is local.

## Recognize the unit

```text
10 digits  → often Unix seconds
13 digits  → often Unix milliseconds
```

This is only a clue; confirm the source contract. A Unix value represents an instant, while the displayed date/time depends on UTC or local presentation.

## Worked example: compare two API fields

Consider an example response containing `created_at: 1704067200` and another service returning `created_at_ms: 1704067200000`. They describe the same instant when the first field uses seconds and the second uses milliseconds: **1 January 2024, 00:00:00 UTC**. In India Standard Time that instant is **1 January 2024, 05:30:00**.

Enter the first number and use **To Date** with the appropriate unit. Repeat with the millisecond value. Compare the converted instants, not just the printed local clock time. If the local display shows a different hour from a UTC log, that can be a display-zone difference rather than an error in the stored timestamp.

For a date-to-timestamp conversion, use **Pick Date & Time**, check the selected time and its interpretation, then choose **To Unix**. Preserve the unit alongside any value copied into a fixture or issue report. A bare number without a unit leaves the next reader guessing.

## Find a unit or time-zone mismatch

If a modern date appears close to 1970, inspect whether a seconds value was interpreted as milliseconds. If it lands far in the future or cannot be represented, check whether a millisecond value was treated as seconds. Digit length is a useful clue for contemporary records, but it is not a complete validation rule for every historical or future date.

A consistent offset of several hours suggests a zone interpretation problem. Record both the expected UTC instant and the local display, and identify which one the receiving system requests. Avoid manually adding an offset to a Unix value to make the clock display look right; doing that changes the instant itself.

## Keep a reproducible report

For a conversion issue, include the fictional input value, seconds or milliseconds, the selected date/time interpretation and the expected result. Do not include a full private log when one timestamp is enough. Use [JWT Decoder](jwt-decoder.html) for inspecting a token's time claims and this converter to understand their dates; the date conversion alone does not validate the token.
