---
name: write-api-docs
description: Draft a new page or update an existing page of PayFlow API documentation for this portfolio. Use when a contributor wants to write an API overview, quickstart, how-to or explanation page, change a page after a product or spec change, or fix a reported error in a page.
---

# Write API docs

Draft or update one page. Follow the rules in `docs-workflow/standards.md` and the templates in `docs-workflow/templates/`. Do not copy those rules into your answers; read the files. Where `standards.md` says nothing, follow the Google developer documentation style guide, then the Microsoft Writing Style Guide.

## Steps

1. **Ask whether this is a new page or an update.** If it is an update, ask which page and follow "Updating an existing page" below. Do not accept a path under `docs/api/reference/`: those pages are generated from the spec. Tell the contributor that the wording belongs in `openapi/payflow.yaml`, which is synced from the `payflow-api` repository, and stop.
2. **Ask the contributor four questions, one at a time.** Wait for each answer before you ask the next.
   1. Who is the page for?
   2. What should they be able to do afterwards?
   3. What usually goes wrong?
   4. What do they need before they start?
3. **Read `openapi/payflow.yaml`.** Take paths, parameters, examples, status values and errors from it. The spec is the source of truth for facts about the API.
4. **Choose one page type** from `docs-workflow/standards.md` and tell the contributor which one and why. A page has one purpose and one type. If the answers describe two, say so and propose two pages.
5. **Draft from the matching file** in `docs-workflow/templates/`. Keep its sections and delete its comments.
6. **Never invent.** If neither the answers nor the spec confirm a fact, write `[TO CONFIRM: what is unknown, and who can confirm it]` in its place.
7. **Save the draft under `docs/`** in the section that fits (for example `docs/api/`), with front matter that has `id`, `title` and `description`.
8. **Finish by listing every `[TO CONFIRM: ...]` item** with its line. Tell the contributor that `sidebars.js` lists pages by hand, so a person has to add a new page, and that the page is not ready for review until the contributor has run the review skill.

## Updating an existing page

Replace steps 4 to 7 with these. Steps 2 and 3 still apply, but ask only what the update needs.

1. **Read the whole page.** Identify its page type. If it mixes types, say so and tell the contributor; do not rewrite the page to fix that unless asked.
2. **Ask what changed:** a spec change, a product change, or a reported error. Re-read the part of `openapi/payflow.yaml` that the change touches.
3. **Edit in place and change only what the update needs.** Leave the surrounding text alone, so a reviewer sees a small diff.
4. **Keep the front matter `id` and any `slug`.** A renamed page breaks links to it, and a broken link fails the build.
5. **Do not edit "last updated" dates.** The site takes them from git history.
6. **Say which code samples changed.** A changed sample has to be run again by a person before the page goes to review.
7. **Mark anything unconfirmed** with `[TO CONFIRM: ...]`, then finish as in step 8.

Do not run or change CI, the Vale rules or any file outside the page you are writing or updating.
