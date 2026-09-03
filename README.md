# 📝 Ina's Technical Writing Portfolio

A Docusaurus-powered technical writing portfolio showcasing API documentation, developer guides, user manuals, open source documentation, and documentation governance — built docs-as-code, with CI enforcing prose style and link integrity.

**🌐 Live site:** [inaciobanu.github.io/tech-writing-portfolio](https://inaciobanu.github.io/tech-writing-portfolio)

---

## Portfolio Contents

| Section | Description |
|---|---|
| 🔌 **API Documentation** | REST API reference for a payments API — authentication, endpoints, error codes, and rate limiting. The endpoint reference is generated from an OpenAPI spec, not hand-written. |
| 🛠️ **Developer Guides** | Quickstart, integration walkthrough, and production best practices |
| 📖 **User Manuals** | End-user documentation covering onboarding, dashboard features, and troubleshooting |
| 🌐 **Open Source Docs** | Contributing guide, architecture overview, and changelog for an open source Node.js library |
| 🗂️ **Process & Governance** | Case study on auditing and redesigning a documentation space — information architecture, ownership and review-cycle governance, a sample SOP, and a workflow-automation example |

---

## Documentation Engineering

This isn't just written content — the repo enforces it:

- **Prose linting in CI** ([`vale`](https://vale.sh/)) — the Process & Governance section is checked against the Google and Microsoft developer documentation style guides on every push, gated on `error`-level findings (see `.vale.ini` for what's deliberately excluded and why)
- **Broken-link CI gate** — `onBrokenLinks` and `onBrokenMarkdownLinks` are set to `throw`, not `warn`, so a dangling internal link fails the build instead of shipping silently
- **Spec-driven API reference** — `openapi/payflow.yaml` generates the entire API endpoint reference via `docusaurus-plugin-openapi-docs`; the spec is the source of truth, not the rendered page
- **Git-based freshness** — every doc page shows a "last updated" date pulled straight from git history, not a manually maintained timestamp

---

## About This Portfolio

I'm a London-based technical writer with experience documenting APIs, developer tools, and SaaS products. I work docs-as-code — writing in Markdown, collaborating in Git, and shipping documentation alongside the product.

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

This regenerates `docs/api/reference/`. The sidebar entries for it are hand-maintained in `sidebars.js` — keep them in sync with the plugin's output if you add or remove endpoints.

### Running the prose linter locally

Requires the [Vale CLI](https://vale.sh/docs/install) installed separately (not an npm package):

```bash
vale sync   # fetches the Google/Microsoft style packages
vale docs/process-governance/
```

---

## Deploy to GitHub Pages

This portfolio is configured for GitHub Pages deployment.

### One-time setup

1. In `docusaurus.config.js`, replace the placeholder values:

```js
url: 'https://inaciobanu.github.io',
baseUrl: '/tech-writing-portfolio/',
organizationName: 'inaciobanu',
projectName: 'tech-writing-portfolio',
```

2. Push the repo to GitHub

3. In your GitHub repo, go to **Settings → Pages → Source** and select **GitHub Actions**

### Deploy

```bash
npm run deploy
```

Or push to `main` and let the GitHub Actions workflow handle it automatically (see `.github/workflows/deploy.yml`). A separate workflow, `.github/workflows/lint.yml`, runs Vale on every push and pull request.

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
│   │   ├── kdbai-sample.md      # Portfolio writing sample (fictional)
│   │   ├── connect-api-sample.md # Portfolio writing sample (real work, PrimaryBid)
│   │   └── reference/           # Generated from openapi/payflow.yaml — do not edit by hand
│   ├── guides/                  # Developer guides
│   ├── manuals/                 # User manuals
│   ├── opensource/              # Open source project docs
│   ├── process-governance/      # Documentation governance case study
│   └── about/                   # Bio, experience, testimonials
├── openapi/
│   └── payflow.yaml             # OpenAPI spec — source of truth for docs/api/reference/
├── .vale.ini                    # Vale config: styles, vocab, rule exclusions
├── .vale/styles/config/vocabularies/Base/accept.txt  # Custom technical vocabulary
├── .github/workflows/
│   ├── deploy.yml               # Build + deploy to GitHub Pages
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

## Customising This Portfolio

### Update your details

1. **`docusaurus.config.js`** — update your name, GitHub username, LinkedIn URL, and email
2. **`src/pages/index.js`** — update the homepage bio and skills
3. **`docs/`** — replace sample content with your own writing

### Add a new section

1. Create a folder under `docs/` (e.g. `docs/tutorials/`)
2. Add your `.md` files with front matter (`id`, `title`)
3. Add a new sidebar entry in `sidebars.js`
4. Add a nav link in `docusaurus.config.js` under `navbar.items`

---

## Built With

- [Docusaurus 3](https://docusaurus.io/) — documentation framework by Meta
- [docusaurus-plugin-openapi-docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs) — generates API reference pages from an OpenAPI spec
- [Vale](https://vale.sh/) — prose linter, enforcing the Google and Microsoft style guides in CI
- [GitHub Pages](https://pages.github.com/) — free static site hosting
- [Prism](https://prismjs.com/) — syntax highlighting

---

*Built by Ina · [inatechwriter@gmail.com](mailto:inatechwriter@gmail.com) · London, UK*
