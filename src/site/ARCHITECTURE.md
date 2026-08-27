# Root site architecture

The root website served from `/` is a standalone professional site. Product/software websites remain independent deployment surfaces.

## Protected product boundaries

The root-site refactor does not own or import implementation code from:

- `devdesk/`
- `construction-erp/`
- `EduSheet/`
- `notivault-website/`
- `shoppilot erp/`
- `shoppilot-erp/`

The root page can link to these sites and display public product imagery, but their runtime code, styles, documentation, and release files remain independent.

## Public compatibility entrypoints

Existing public paths remain stable:

- `/index.html` — semantic root document
- `/style.css` — delegates to `src/site/styles/site.css`
- `/main.js` — delegates to `src/site/main.js`

## JavaScript modules

`src/site/main.js` is a small bootstrap only. Runtime responsibilities are separated into:

- `core/theme.js` — persistent light/dark theme state
- `core/navigation.js` — mobile navigation, scroll state, active-section state
- `interactions/reveal.js` — optional intersection-based content reveal
- `utilities/motion.js` — reduced-motion preference boundary

The previous all-in-one root runtime is removed. There is no particle engine, tilt manager, counter manager, FPS logger, typing loop, or dynamically injected presentation CSS in the professional site runtime.

## Style system

`styles/site.css` composes explicit layers:

- `foundation/` — tokens and base browser rules
- `layout/` — page shell and section composition
- `components/` — navigation, hero, about, software, engineering, contact, footer
- `utilities/` — motion/accessibility behavior

`components/easter-egg-compat.css` only preserves the existing debug-game surface until its dedicated isolation phase. It is not part of the normal page design language.

## Engineering-profile rule

The root page describes capabilities evidenced by the software in this repository. It does not use arbitrary skill percentages, invented clients, invented experience claims, or unverified technology claims.
