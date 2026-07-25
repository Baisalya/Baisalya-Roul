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
