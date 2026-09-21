# 📝 Ina's Technical Writing Portfolio

A Docusaurus-powered technical writing portfolio showcasing API documentation, developer guides, user manuals, open source documentation, documentation systems work, and facilities management operations – built docs-as-code, with CI enforcing prose style and link integrity.

**🌐 Live site:** [inaciobanu.github.io/tech-writing-portfolio](https://inaciobanu.github.io/tech-writing-portfolio)

[![Deploy](https://github.com/inaciobanu/tech-writing-portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/inaciobanu/tech-writing-portfolio/actions/workflows/deploy.yml) [![PR Preview](https://github.com/inaciobanu/tech-writing-portfolio/actions/workflows/pr-preview.yml/badge.svg)](https://github.com/inaciobanu/tech-writing-portfolio/actions/workflows/pr-preview.yml) [![Lint](https://github.com/inaciobanu/tech-writing-portfolio/actions/workflows/lint.yml/badge.svg)](https://github.com/inaciobanu/tech-writing-portfolio/actions/workflows/lint.yml)

---

## Portfolio Contents

| Section | Description |
|---|---|
| 🔌 **API Documentation** | REST API reference for a payments API – authentication, endpoints, error codes, and rate limiting. The endpoint reference is generated from an OpenAPI spec, not hand-written. |
| 🛠️ **Developer Guides** | Quickstart, integration walkthrough, production best practices, and a Code in Docs style guide |
| 📖 **User Manuals** | End-user documentation covering onboarding, dashboard features, and troubleshooting |
| 🌐 **Open Source Docs** | Contributing guide, architecture overview, and changelog for an open source Node.js library |
| 🗂️ **Process & Governance** | Case study on auditing and redesigning a documentation space – information architecture, ownership, review workflows, a sample SOP, and workflow automation |
| 🏢 **FM Operations** | Case study on auditing and transforming fragmented global facilities management documentation across three regions – master inventory, risk-based prioritisation, and a sample PPM procedure |

---

## Documentation Engineering

This isn't just written content – the repo enforces it:

- **Prose linting in CI** ([`vale`](https://vale.sh/)) – every hand-written page is checked on every push and pull request against the Google and Microsoft developer documentation style guides plus a house style in `.vale/styles/Portfolio/` – a rule that enforces the site's spaced en dash and one that bans aspirational self-description. Gated on `error`-level findings; `.vale.ini` documents what's deliberately excluded and why
- **Broken-link CI gate** – `onBrokenLinks` and `onBrokenMarkdownLinks` are set to `throw`, not `warn`, so a dangling internal link fails the build instead of shipping silently
- **PR preview deployments** – every pull request publishes its own rendered copy of the site under `previews/pr-<n>/` and posts the link as a PR comment, so reviewers see built pages rather than a Markdown diff; the preview is removed when the PR closes
- **Spec-driven API reference** – `openapi/payflow.yaml` generates the entire API endpoint reference via `docusaurus-plugin-openapi-docs`; the spec is the source of truth, not the rendered page
- **Git-based freshness** – every doc page shows a "last updated" date pulled straight from git history, not a manually maintained timestamp
- **Code example maintenance** – the Code in Docs guide defines language labels, copy-safe samples, verification status, ownership, review triggers, audits, and reader feedback loops

---

## About This Portfolio

I'm a London-based technical writer with experience documenting APIs, developer tools, and SaaS products. I work docs-as-code – writing in Markdown, collaborating in Git, and shipping documentation alongside the product.

**Skills:** Docusaurus · MkDocs · OpenAPI/Swagger · Markdown · Git · Postman · Confluence · JIRA · Vale

**Style guides I follow:** Google Developer Documentation Style Guide · Microsoft Writing Style Guide

📩 **Available for remote, full-time roles** → [inatechwriter@gmail.com](mailto:inatechwriter@gmail.com)

---

## Run Locally

**Requirements:** Node.js 18+

```bash
# Clone the repo
git clone https://github.com/inaciobanu/tech-writing-portfolio.git
cd tech-writing-portfolio

# Install dependencies
npm install

# Start the development server
npm start
```

The site will open at `http://localhost:3000`.

### Regenerating the API reference

After editing `openapi/payflow.yaml`:

```bash
npm run gen-api-docs
```

This regenerates `docs/api/reference/`. The sidebar entries for it are hand-maintained in `sidebars.js` – keep them in sync with the plugin's output if you add or remove endpoints.

### Regenerating the favicon and social preview image

After editing `assets/social/favicon.svg` or `assets/social/og-image.svg`:

```bash
npm run gen-social-images
```

This renders both to PNG in `static/img/`. `sharp` is a devDependency used only by this script – it isn't part of the site build itself.

### Running the prose linter locally

Requires the [Vale CLI](https://vale.sh/docs/install) installed separately (not an npm package):

```bash
vale sync   # fetches the Google/Microsoft style packages
vale docs/
```

---

## Deploy to GitHub Pages

The site is published by GitHub Actions – GitHub Pages must be set to deploy from **GitHub Actions** (**Settings → Pages → Source**), not from a branch.

- **`deploy.yml`** – runs on every push to `main`, builds the site, and deploys it to GitHub Pages. To republish without a merge, run this workflow manually from the **Actions** tab.
- **`pr-preview.yml`** – runs on every pull request, builds it with a `previews/pr-<n>/` base URL, and posts the preview link as a PR comment. Preview builds are stored on the `gh-pages` branch, which `deploy.yml` folds into the live site. When the PR closes, the preview is removed and the site is republished.
- **`lint.yml`** – runs Vale on every push and pull request.

---

## Project Structure

```
tech-writing-portfolio/
├── docs/
│   ├── api/                     # API reference documentation
│   │   ├── intro.md
│   │   ├── authentication.md
│   │   ├── errors.md
│   │   ├── rate-limits.md
│   │   ├── rotko-sample.md      # Portfolio writing sample (fictional)
│   │   ├── connect-api-sample.md # Portfolio writing sample (real work, PrimaryBid)
│   │   └── reference/           # Generated from openapi/payflow.yaml – do not edit by hand
│   ├── guides/                  # Developer guides and Code in Docs style guide
│   ├── manuals/                 # User manuals
│   ├── opensource/              # Open source project docs
│   ├── process-governance/      # Documentation systems and operations case study
│   └── about/                   # Bio, experience, testimonials
├── openapi/
│   └── payflow.yaml             # OpenAPI spec – source of truth for docs/api/reference/
├── .vale.ini                    # Vale config: styles, vocab, rule exclusions
├── .vale/styles/config/vocabularies/Base/accept.txt  # Custom technical vocabulary
├── .github/workflows/
│   ├── deploy.yml               # Build + deploy to GitHub Pages (includes stored PR previews)
│   ├── pr-preview.yml           # Build + publish a preview for each pull request
│   └── lint.yml                 # Vale prose linting
├── src/
│   ├── css/custom.css           # Custom styling
│   └── pages/index.js           # Homepage
├── static/                      # Static assets
├── docusaurus.config.js         # Site configuration
├── sidebars.js                  # Sidebar navigation
└── package.json
```

---

## Adding a New Section

1. Create a folder under `docs/` (e.g. `docs/tutorials/`)
2. Add `.md` files with front matter (`id`, `title`)
3. Add a sidebar entry in `sidebars.js`
4. Add a nav link in `docusaurus.config.js` under `navbar.items`

---

## Built With

- [Docusaurus 3](https://docusaurus.io/) – documentation framework by Meta
- [docusaurus-plugin-openapi-docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs) – generates API reference pages from an OpenAPI spec
- [Vale](https://vale.sh/) – prose linter, enforcing the Google and Microsoft style guides in CI
- [GitHub Pages](https://pages.github.com/) – free static site hosting
- [Prism](https://prismjs.com/) – syntax highlighting

---

*Built by Ina · [inatechwriter@gmail.com](mailto:inatechwriter@gmail.com) · London, UK*
