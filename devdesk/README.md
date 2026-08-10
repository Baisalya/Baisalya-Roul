# DevDesk product website and complete manual

This folder is the dependency-free public website for DevDesk. It explains the
product, provides transparent platform links, and publishes the detailed manual
for GitHub Pages or any static host.

## Product promise

**One folder. Every view. Every tool. Still your files.**

DevDesk is a portable local workspace for everyday plans, connected knowledge,
project files, saved API testing, and workspace-scoped Git. Ordinary files stay
the source of truth. A DevDesk account or DevDesk cloud copy is not required.

The defensible USP is the combination:

- one user-owned folder for normal work and developer context;
- List, Board, Calendar, Timeline, Outline, Files, and Relationships over the
  same source items;
- copy or Git-clone portability through `project.devdesk`;
- contextual Markdown, JSON, OpenAPI, API, Diff, OKF, and scoped Git tools;
- protected values and device trust kept out of portable project files;
- manual, review-first, or bounded recoverable automation.

See `PRODUCT_POSITIONING.md` for the message hierarchy and
`STORE_CREATIVE_PROMPTS.md` for copy-paste image-generation briefs.

## Website contents

- benefit-led landing page for everyday users and developers;
- transparent platform downloads page;
- a featured graph-to-code video and downloadable Tiny Multi-Agent Graph Demo;
- the original agent-ready workspace as a second guided practice demo;
- a complete beginner-first global manual plus 41 focused tool topics,
  including a five-page API Studio section;
- responsive sidebar and table of contents;
- offline search index;
- dark and light themes;
- copy buttons for commands and examples;
- service worker for deployed offline caching;
- sitemap, robots file, 404 page, and web manifest;
- Markdown-to-HTML refresh utility for maintained workspace pages.

## Configure download links

Edit `assets/js/site-config.js`.

- Android currently points to the Google Play package ID and is labelled
  production. The public text asks users to contact the developer to join.
- Windows points to the official Microsoft Store listing:
  `https://apps.microsoft.com/detail/9N8NH1LMZX1S?hl=en-us&gl=IN&ocid=pdpshare`.
- macOS and iOS remain disabled until real signed public releases exist.

## Demo downloads

**Demo 1** is the primary graph-to-code walkthrough. Its editable source is in
`assets/downloads/devdesk-tiny-multi-agent-graph-demo/`, its public archive is
`assets/downloads/devdesk-tiny-multi-agent-graph-demo.zip`, and its silent
recording is `assets/media/devdesk-tiny-multi-agent-graph-demo.mp4`. The page
auto-detects future narration tracks using the filenames documented in
`assets/audio/README.md`.

**Demo 2** is the original guided agent-ready workspace. Its editable source is
in `assets/downloads/devdesk-agent-ready-demo/` and its public archive is
`assets/downloads/devdesk-agent-ready-workspace-demo.zip`.

Keep every public demo free of connector URLs, access keys, account details,
and user-specific content. After changing a demo source, run its tests, rebuild
the ZIP, and check the video, archive, and page links locally.

## Refresh generated manual pages

Selected maintained pages are generated from `content/*.md` by
`tool/refresh_manual.dart`. Run it with a Dart package configuration containing
the `markdown` and `html` packages. The command also refreshes the search index
and shared brand message in manual chrome.

Review generated HTML, links, search, theme, mobile navigation, and download
destinations before publishing.

## Local preview

```bash
python -m http.server 8080
```

Open `http://localhost:8080/`.

## Deploy with GitHub Pages

1. Copy this folder to the publishing repository root.
2. In repository Settings > Pages, select the intended branch or workflow.
3. Update `robots.txt` and `sitemap.xml` if the deployed path changes.
4. Test in a private window at phone, tablet, and desktop widths.

## Documentation basis

The site is synchronized with the reviewed DevDesk application source and
bundled manuals as of 2026-07-28. It describes Android and Windows behavior
without presenting unreleased Apple packages as available. When UI labels
change, update the matching `content/*.md` source, regenerate, and verify the
search entry.
