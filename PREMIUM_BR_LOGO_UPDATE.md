# Premium BR Logo Update

## What changed
- Generated and added a new premium **BR** brand logo.
- Preserved the existing file path `assets/brand/br-mark.svg` by replacing it with an SVG wrapper containing the new generated premium mark.
- Added the original generated PNG asset at `assets/brand/br-mark-premium.png`.
- Added a 192x192 convenience PNG at `assets/brand/br-mark-192.png`.
- No product sub-sites were modified.
- No header/game/coffee/email behavior was changed.

## Why this approach
Keeping `assets/brand/br-mark.svg` intact avoids breaking existing HTML references, validation scripts, favicon usage, and identity-card/logo placements across the root site.

## Modified files
- assets/brand/br-mark.svg
- assets/brand/br-mark-premium.png
- assets/brand/br-mark-192.png
