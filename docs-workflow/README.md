# Documentation workflow map

This folder holds the rules and templates for writing pages in this portfolio. It sits outside `docs/`, so the site does not publish it. The list below covers every piece of the workflow and where it lives.

## Rules and templates

| Path | What it does |
|---|---|
| [`docs-workflow/standards.md`](standards.md) | Sets the page types, plain-language rules and code sample rules, and says what a machine checks and what a person checks. |
| [`docs-workflow/templates/api-overview.md`](templates/api-overview.md) | Template for a page that orients a reader to the API. |
| [`docs-workflow/templates/api-quickstart.md`](templates/api-quickstart.md) | Template for a page that takes a new reader to one working call. |
| [`docs-workflow/templates/how-to.md`](templates/how-to.md) | Template for a page that shows how to finish one task. |
| [`docs-workflow/templates/explanation.md`](templates/explanation.md) | Template for a page that explains why something works as it does. |

## Skills

| Path | What it does |
|---|---|
| [`.claude/skills/write-api-docs/SKILL.md`](../.claude/skills/write-api-docs/SKILL.md) | Asks the contributor questions, reads the spec, chooses a page type and drafts a page from a template. |
| [`.claude/skills/review-api-docs/SKILL.md`](../.claude/skills/review-api-docs/SKILL.md) | Reviews one page for the points that need judgement and gives a pass or fail checklist. |

## Automated checks

| Path | What it does |
|---|---|
| [`.vale.ini`](../.vale.ini) | Configures Vale: which styles apply to which files, and which rules are turned off. |
| [`.vale/styles/Portfolio/Aspiring.yml`](../.vale/styles/Portfolio/Aspiring.yml) | Flags aspirational and cliché self-description. |
| [`.vale/styles/Portfolio/Dashes.yml`](../.vale/styles/Portfolio/Dashes.yml) | Enforces the spaced en dash as the only punctuation dash. |
| [`.vale/styles/Portfolio/Slop.yml`](../.vale/styles/Portfolio/Slop.yml) | Flags stock phrases that read as padded or generated. |

## Contribution and review

| Path | What it does |
|---|---|
| [`CONTRIBUTING.md`](../CONTRIBUTING.md) | Explains the nine-step workflow, when AI use must be disclosed, and how to work without Claude Code. |
| [`.github/pull_request_template.md`](../.github/pull_request_template.md) | Asks for the page type, sources, AI use, whether samples were run, and the technical reviewer. |
| [`.github/CODEOWNERS`](../.github/CODEOWNERS) | Lists who reviews each folder, including the folders that hold the rules. |
