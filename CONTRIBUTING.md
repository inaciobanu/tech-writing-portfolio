# Contributing

This file covers contributions to this documentation portfolio. It is not the contributing guide for Logpilot, a fictional library whose documentation is at `docs/opensource/contributing.md`.

Every page goes through the same nine steps.

## The workflow

1. **Choose a page type, or confirm the type of the page you are updating.** Pick one of `api-overview`, `api-quickstart`, `how-to` or `explanation`. A page has one purpose and one type. The definitions are in [`docs-workflow/standards.md`](docs-workflow/standards.md).
2. **Draft with the write skill.** The `write-api-docs` skill asks you a few questions, reads `openapi/payflow.yaml`, drafts the page from the matching template in `docs-workflow/templates/`, and marks anything it cannot confirm with `[TO CONFIRM: ...]`. To update an existing page, tell it which page. It edits that page in place and changes only what the update needs.
3. **Check with the review skill.** The `review-api-docs` skill reviews the draft for the things that need judgement: page type, scope, padding, unsupported claims and unresolved markers. Fix what it finds.
4. **Open a pull request.** Fill in the pull request template: page type, sources, whether AI was used, whether the code samples were run, and the technical reviewer's name.
5. **Automated checks run.** On a pull request, Vale checks prose style and errors fail the check. The site is built for a preview, and a broken internal link fails that build. The preview link is posted on the pull request. Checks on external links do not run on pull requests. They run after a merge to `main` and report only.
6. **Technical review.** A person checks that the content is correct, including that every code sample was run.
7. **Editorial review.** A person checks the page type, purpose, scope and plain language.
8. **Merge and publish.** A merge to `main` builds and deploys the site. A failed build stops the deploy.
9. **Improve the system.** If reviewers keep raising the same problem, change the standards, a template, a skill or a Vale rule, through a pull request like any other change.

## Generated pages

Do not edit the pages in `docs/api/reference/`. They are generated from `openapi/payflow.yaml`, and the next build overwrites any change. That spec is synced into this repository from another repository, so wording changes to the reference are made at the source of the spec.

## Using the skills

The two skills are in `.claude/skills/`. You need [Claude Code](https://claude.com/claude-code) to run them. Without it, follow [`docs-workflow/standards.md`](docs-workflow/standards.md) and the templates in `docs-workflow/templates/` by hand. The rules and the review are the same.

## Disclose AI use

State in the pull request whether AI was used, and for what: drafting, review, or something else. You are responsible for the content you submit, whether or not AI wrote it. Every code sample must have been run by a person.

## Who reviews what

[`.github/CODEOWNERS`](.github/CODEOWNERS) lists the reviewers for each folder. The folders that hold the rules (`docs-workflow/`, `.claude/` and `.vale/`) have an editorial reviewer, so a change to the rules is reviewed like a change to a page.
