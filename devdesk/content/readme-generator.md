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

```markdown
## Development setup

```bash
flutter pub get
flutter analyze
flutter test
```
```

Do not copy secrets, local paths, test tokens, or ranking language into the generated README.
