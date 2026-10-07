# Documentation standards

This page sets the rules that drafts and reviews are checked against. It is a short summary. For code samples, the full guide is [Code in Docs Style Guide](../docs/guides/code-in-docs.md); for ownership and review, see [Ownership and review model](../docs/process-governance/governance.md).

## Base style

The base is the [Google developer documentation style guide](https://developers.google.com/style), with the [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/) as a second reference. Vale applies rules from both (see `.vale.ini`). Where this page differs from them, this page wins. The differences are deliberate:

| Difference | Why |
|---|---|
| British English spelling | The site is written in British English. `Google.Spelling` is turned off. |
| A spaced en dash ( – ) as the only punctuation dash | House rule, enforced by `Portfolio/Dashes.yml`. |
| Title case for the page title (H1), sentence case below it | Existing site convention. A person checks it. |
| First person on the case-study pages | They are written as narrative. |
| Uncontracted forms in product and API pages | Contractions are reported as warnings, not errors. |

## Page types

Every page has one purpose and one type. If a page needs two, split it into two pages and link them.

| Type | Purpose |
|---|---|
| `api-overview` | Orients a reader to the API: what it does, its conventions, and where to go next. It contains no task steps. |
| `api-quickstart` | Takes a new reader from nothing to one working API call in as few steps as possible. |
| `how-to` | Shows a reader who knows the basics how to finish one specific task. |
| `explanation` | Explains why or how something works so the reader understands it. It contains no steps to follow. |

### Mapping to DITA and Diátaxis

The mapping is approximate. DITA and Diátaxis divide content in slightly different ways, so a type here does not always match one name exactly.

| Type | DITA topic type | Diátaxis |
|---|---|---|
| `api-overview` | concept | explanation |
| `api-quickstart` | task | tutorial |
| `how-to` | task | how-to guide |
| `explanation` | concept | explanation |
| Endpoint reference (generated, not a type authors write) | reference | reference |

## Plain-language rules

- Write in British English. Use a spaced en dash ( – ) as the only punctuation dash, never an em dash.
- Use plain words, not jargon. Define a term once in the glossary instead of explaining it again on each page.
- Use the active voice and the present tense.
- Address the reader as "you" for anything they have to do.
- Use numbered steps for anything done in order, with one action per step.
- End a step or a table cell with a full stop if it is a full sentence. Do not add one to a fragment. Keep each list or column consistent.
- Put a warning in a labelled Caution or Important line, not inside a paragraph.
- Describe what the product does. Do not use marketing wording or describe the work as aspirational.
- Write the page title (H1) in title case and every heading below it in sentence case.

## Code sample rules

- Give every code block a language identifier, and label tabs with the language name.
- Keep input, commands, output and errors in separate blocks, each with a clear role. Leave prompts out of commands the reader will copy.
- Mark every value the reader must replace with a visible placeholder such as `YOUR_TEST_KEY`. Say what to replace in the text before the block. Never use a value that looks like a real credential.
- Show the expected result and say what matters about it.
- Run a sample before it is published: run it in the stated environment with test credentials, and record who ran it and when. If it cannot be run, label it as illustrative and keep it off the main path.

For the reasoning and further rules, see the [full guide](../docs/guides/code-in-docs.md).

## Reference pages are generated

The endpoint reference pages in `docs/api/reference/` are generated from `openapi/payflow.yaml`. Never write or edit them by hand: the next build regenerates them.

To change wording in the reference, change the description in the spec. In this repository, the spec is updated by automated commits from `github-actions[bot]`, so a hand edit to `openapi/payflow.yaml` here can be overwritten. Raise wording changes against the source of the spec, not against the generated pages.

## What a machine checks and what a person checks

| Check | Who | When |
|---|---|---|
| Prose style (Vale): errors fail the check; warnings are reported but do not fail it. Includes the house rules for dashes and self-description. | Machine | Pull requests and pushes to `main` |
| Site build, including broken internal links and broken Markdown links | Machine | Pull request previews and deploys from `main` |
| External links | Machine | After a merge to `main`. The result is reported and does not stop the deploy. |
| Rendered preview of the page | Person, using the preview link | Pull requests |
| Technical accuracy, and whether each sample was run | Person (a technical reviewer) | Before merge |
| Page type, one purpose per page, plain language, British spelling, heading case | Person (an editorial reviewer) | Before merge |

A person checks British spelling and heading case. `.vale.ini` turns off the `Google.Spelling` rule and states that heading case is enforced by review, not by CI.
