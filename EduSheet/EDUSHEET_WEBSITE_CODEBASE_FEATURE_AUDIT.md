# EduSheet Website — Codebase Feature Audit

## Source audited
- App source: `EduSheet_QuestionDocument_Phase9_CanonicalRoundTrip_Hotfix_Full.zip`
- App version from `pubspec.yaml`: `1.2.2+6`
- Website baseline: uploaded `EduSheet(1).zip`

## Verified top-level app modules
The app source contains these real feature areas under `lib/features/`:

- Calculator
- Document Reader
- Editor / Create Paper / Saved Papers
- Geometry Builder
- Guided Experience
- Math Keyboard
- OCR
- OMR
- Paper Composer
- Premium infrastructure
- Question Bank
- Teaching Planner
- Word Converter

The actual Home screen also exposes:

- Create Paper
- Saved Papers
- OMR Generator
- Question Bank
- Teaching Planner
- Calculator
- PDF/Word Reader
- Word Converter
- Settings

## Teaching Planner capability verified from source
The source contains dedicated screens for:

- Teaching Planner home
- Syllabus Manager
- Lesson Planner
- Weekly / Teaching Calendar
- Lesson Detail
- Teaching Workspace
- Progress Tracker
- Progress / Insights / Backup

The source also contains a real Teaching Pack codec and Teaching Workspace share/import flow. This is why the website now markets Teaching Packs instead of using a generic placeholder collaboration claim.

## Website gaps found before the update
The existing site marketed Math Keyboard, paper creation, Question Bank, Geometry, OCR, OMR, export and utilities reasonably well, but under-marketed these existing app capabilities:

- Saved Papers as editable reusable work
- Lesson Planner
- Weekly teaching calendar
- Teaching Workspace
- Lesson-linked notes/files/images/videos/links/math/geometry/papers
- Shareable Teaching Packs
- Overall / subject / priority teaching progress
- Backlog / overdue teaching visibility
- Actual periods and reflection
- Guided workflows
- Adaptive Android / Windows planner experience

## What was added to the website

### Homepage
- Existing original math-first hero preserved.
- Hero converted into a horizontal scroll / swipe carousel.
- Added a second Teacher Workspace hero slide.
- Added circular progress visualization with Today / Backlog / Resources metrics.
- Added Teacher Workspace marketing section for Saved Papers, Lesson Planner, Weekly Planner, Progress & Insights, Teaching Workspace and Reader/Converter.
- Existing Math Keyboard and all original downstream sections retained.

### Features page
Existing cards were preserved, while new verified cards were added for:

- Paper Composer + Structured Questions
- Saved Papers + Editable Reopen
- Lesson Planner + Weekly Calendar
- Progress & Teaching Insights
- Teaching Workspace + Shareable Teaching Packs
- Guided Workflows + Adaptive Android/Windows UI

The existing Teacher Planner card keeps its original portable `.eds`, resources and adaptive-layout claims and now adds the newer lesson/week/progress workflow.

### Teacher Planner page
- Existing syllabus visualization preserved.
- Existing hierarchy/resources/adaptive messaging preserved.
- Added Lesson Planner, Weekly Planner, Teaching Workspace and Progress & Insights marketing workflow.
- Added circular progress presentation.
- Original `Keep portable .eds data` message preserved.

### Manual
- Added Teaching Planner to the actual Home module list.
- Added a full Teaching Planner manual section covering Syllabus, Lesson Planner, Weekly Planner, Teaching Workspace and Progress & Insights.
- Updated stale website version wording to the audited source version `1.2.2+6`.

## Claims deliberately NOT promoted as completed
The audit also found items that should not be advertised as finished/current paid functionality:

- Settings: Download AI Model — source still shows coming soon.
- Settings: Backup Cloud — source still shows coming soon.
- Settings: Import/Export Data — source still shows coming soon in this audited baseline.
- Premium purchases — source explicitly supports complimentary access / purchase-off states, so the website was not changed to claim an active subscription product.
- No online school backend, realtime collaboration or server-side permissions were claimed.

## Preservation rule applied
The update was implemented additively. Existing homepage sections, original hero content, Teacher Planner hierarchy/resources messaging, feature cards and manual sections were retained. New marketing content was inserted around the existing content rather than deleting the original product story.
