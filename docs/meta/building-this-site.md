---
id: how-this-site-is-built
title: How This Site Is Built
description: "The pipelines behind this portfolio: spec-driven API reference generation, a cross-repo sync from a live mock API, a Vale prose gate with house rules, and PR previews built on a storage trick."
---

# How This Site Is Built

This is a Docusaurus site, but the parts worth explaining aren't the theme – they're the build. Six pieces keep the content honest without me touching it by hand: the API reference, the prose gate, the PR previews, the cross-repo sync, the social images, and the agent-facing export.

## The API reference is generated, not written

[`openapi/payflow.yaml`](https://github.com/inaciobanu/tech-writing-portfolio/blob/main/openapi/payflow.yaml) is the source of truth for [API Documentation](/docs/api/intro). `docusaurus-plugin-openapi-docs` turns it into the endpoint pages under `docs/api/reference/` – I don't hand-write those, and the deploy workflow wipes and regenerates that folder on every build so a stale cached copy can't ship by accident.

Two things follow from the spec being the source, not the pages:

- **The sidebar is hand-maintained.** The plugin generates the reference pages, but `sidebars.js` lists them explicitly. Add or remove an endpoint in the spec and the sidebar needs a matching edit, or the new page exists with nothing linking to it.
- **Prose in the reference isn't linted.** Vale (below) excludes `docs/api/reference/**` – wording there comes from the spec's descriptions, so the fix belongs in `payflow.yaml`, not in the generated Markdown.

The current API version and base URL only ever appear in one place: the generated reference page, printed fresh from the spec every time `gen-api-docs` runs. Earlier, the overview page also stated the version directly, and it went stale the first time the spec moved on without a matching edit there – the fix wasn't to make the overview page clever about reading the spec too, just to stop duplicating a value that the reference already states correctly.

## The spec itself arrives by sync, not by hand

The spec isn't written in this repo either. `payflow-api` – a small mock payments service I built separately – owns `openapi.yaml` as its source of truth, and a workflow in that repo pushes it into `openapi/payflow.yaml` here on every push to its `main`, authenticating with a fine-grained PAT scoped to this repo. Those commits land under the `github-actions[bot]` author, distinct from anything I write by hand.

That means the API reference on this site is a build output twice over: once when `payflow-api` syncs its spec here, and again when this repo's build regenerates the reference pages from it. Neither step is a copy-paste I could forget to redo.

## Every hand-written page goes through a Vale gate

`lint.yml` runs [Vale](https://vale.sh/) against every Markdown and MDX page under `docs/`, on every push and pull request, gated at error level – a failing page fails the build, not just the check. It's based on the Google and Microsoft developer style guides, plus a house style in `.vale/styles/Portfolio/`:

- **`Dashes.yml`** enforces a spaced en dash (word – word) as the only punctuation dash on the site, and flags em dashes, double hyphens, and one-sided en dashes instead.

`.vale.ini` documents every exclusion inline, with the reason next to it: British spelling and punctuation instead of the American default, contractions downgraded to a warning rather than an error in the API reference and glossary (which intentionally keep the uncontracted form), and the generated reference folder excluded outright, for the reason above.

## Pull requests get a rendered preview, not a Markdown diff

`pr-preview.yml` builds the site on every pull request and stores the result on the `gh-pages` branch, under `previews/pr-<number>/`. GitHub Pages only serves what `deploy.yml` uploads, though, so that workflow's build step also pulls whatever's stored in `previews/` on `gh-pages` and copies it into the live build before publishing. `gh-pages` is storage for previews, not the deployment source – the live site is built from `main` every time.

A comment on the pull request links to the rendered preview once it's live, so a reviewer sees built pages rather than a diff of raw Markdown. When the PR closes, the preview folder is deleted and the site is republished without it.

## Social images are generated from editable sources

`static/img/favicon.png` and `static/img/og-image.png` aren't edited directly – they're rendered from SVG sources in `assets/social/` by `scripts/generate-social-images.js` (`npm run gen-social-images`), using `sharp`. Editing the SVG and forgetting to regenerate the PNG is the failure mode this avoids; the PNGs are a build output of the SVGs, not a separate asset to keep in sync by hand.

## The site exports itself for agents, not just browsers

`docusaurus-plugin-llms` runs inside the same production build and writes `/llms.txt` (a linked table of contents), `/llms-full.txt` (everything in one file), and a raw `.md` file next to every page – so an agent reading this site gets the same source Vale already gates, not a separate export that can drift from it.

That export is a plain-text reader, though, not a browser: it reads whatever's on disk and does light cleanup, but it can't evaluate React. The API overview page originally read its version and base URL from a live component, which meant the export would have shown the raw unevaluated code instead of a number.

The fix was to drop that page back to a plain link to the [API Reference](/docs/api/reference/payflow-api) – which already prints its version as static text, regenerated fresh by `gen-api-docs` on every build – rather than duplicate it with something clever that only works for a browser. 

One honest gap remains: the reference pages themselves are still full of the OpenAPI theme's own React components (schema tabs, the API explorer), so their raw `.md` exports are noisier than the hand-written pages. Vale already excludes that folder from prose linting for the same underlying reason; the LLMs export doesn't have an equivalent exclusion yet.
