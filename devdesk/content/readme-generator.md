# README Generator

README Generator builds a structured Markdown README through guided sections.

## Workflow

1. Enter project name and summary.
2. Add installation, usage, features, configuration, and contribution details.
3. Review the live Markdown preview.
4. Copy or save the generated file.

## Good README practice

- Describe the real project rather than adding ranking claims.
- Use commands that users can copy.
- State platform and dependency requirements.
- Keep secrets and private endpoints out of examples.
- Add license and support information only when accurate.

## Output

The generator produces ordinary Markdown that can be edited in DevDesk or another editor.

## Suggested section order

```text
Project name
One-sentence purpose
Screenshots or demo
Features
Requirements
Installation
Usage
Configuration
Privacy/security notes
Contributing
License
Support
```

## Command example

````markdown
## Development setup

```bash
flutter pub get
flutter analyze
flutter test
```
````

Do not copy secrets, local paths, test tokens, or ranking language into the generated README.

## Worked example: document a small team utility

Consider a fictional project called **Visit Notes**, which turns a team's Markdown visit records into a review folder. In the generator, use a one-sentence purpose that explains the reader's task: “Organize visit notes into a dated handover.” List only features the project actually has and state which operating systems and runtimes the current release supports.

In installation, write the real setup command and say where to run it. In usage, give one complete example with fictional file names and explain the output location. If the utility has not been tested on a platform, do not imply that a generated platform section establishes support. A short, accurate requirement is more helpful than a long list copied from a different project.

Use the preview to check heading order, fenced command blocks and links before copying or saving the result as `README.md`. The generator structures the document; you still need to run the documented setup against the actual project to confirm it works.

## Review the saved Markdown

Open the file from its destination folder and follow every relative link. A link such as `docs/setup.md` is resolved from the saved README's location, so a link that looked plausible in the form can point to a missing file after saving elsewhere. Store screenshots in a real project folder and provide text that explains what each image demonstrates.

If a code block consumes the rest of the preview, check that opening and closing fences match. When demonstrating a Markdown code block inside another example, use a longer outer fence so the inner fence is displayed rather than closing the example early.

Before publishing, replace sample commands with verified ones, remove private endpoints and confirm the license with the actual project license file. Do not add a license simply because the generator offers a section for it. See [Create a project knowledge structure](project-folder-structure.html) for organizing the supporting files beside the README.
