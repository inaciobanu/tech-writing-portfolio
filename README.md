# 📝 Ina's Technical Writing Portfolio

A Docusaurus-powered technical writing portfolio showcasing API documentation, developer guides, user manuals, and open source documentation.

**🌐 Live site:** [inaciobanu.github.io/tech-writing-portfolio](https://inaciobanu.github.io/tech-writing-portfolio)

---

## Portfolio Contents

| Section | Description |
|---|---|
| 🔌 **API Documentation** | REST API reference for a payments API — authentication, endpoints, error codes, and rate limiting |
| 🛠️ **Developer Guides** | Quickstart, integration walkthrough, and production best practices |
| 📖 **User Manuals** | End-user documentation covering onboarding, dashboard features, and troubleshooting |
| 🌐 **Open Source Docs** | Contributing guide, architecture overview, and changelog for an open source Node.js library |

---

## About This Portfolio

I'm a London-based technical writer with experience documenting APIs, developer tools, and SaaS products. I work docs-as-code — writing in Markdown, collaborating in Git, and shipping documentation alongside the product.

**Skills:** Docusaurus · MkDocs · OpenAPI/Swagger · Markdown · Git · Postman · Confluence · JIRA

**Style guides I follow:** Google Developer Documentation Style Guide · Microsoft Writing Style Guide

📩 **Available for freelance and full-time roles** → [ina@withinlondon.com](mailto:ina@withinlondon.com)

---

## Run Locally

**Requirements:** Node.js 18+

```bash
# Clone the repo
git clone https://github.com/YOUR-USERNAME/tech-writing-portfolio.git
cd tech-writing-portfolio

# Install dependencies
npm install

# Start the development server
npm start
```

The site will open at `http://localhost:3000`.

---

## Deploy to GitHub Pages

This portfolio is configured for GitHub Pages deployment.

### One-time setup

1. In `docusaurus.config.js`, replace the placeholder values:

```js
url: 'https://YOUR-GITHUB-USERNAME.github.io',
baseUrl: '/tech-writing-portfolio/',
organizationName: 'YOUR-GITHUB-USERNAME',
projectName: 'tech-writing-portfolio',
```

2. Push the repo to GitHub

3. In your GitHub repo, go to **Settings → Pages → Source** and select **GitHub Actions**

### Deploy

```bash
npm run deploy
```

Or push to `main` and let the GitHub Actions workflow handle it automatically (see `.github/workflows/deploy.yml`).

---

## Project Structure

```
tech-writing-portfolio/
├── docs/
│   ├── api/                 # API reference documentation
│   │   ├── intro.md
│   │   ├── authentication.md
│   │   ├── endpoints.md
│   │   ├── errors.md
│   │   └── rate-limits.md
│   ├── guides/              # Developer guides
│   │   ├── intro.md
│   │   ├── quickstart.md
│   │   ├── integration.md
│   │   └── best-practices.md
│   ├── manuals/             # User manuals
│   │   ├── intro.md
│   │   ├── getting-started.md
│   │   ├── dashboard.md
│   │   └── troubleshooting.md
│   └── opensource/          # Open source project docs
│       ├── intro.md
│       ├── contributing.md
│       ├── architecture.md
│       └── changelog.md
├── src/
│   ├── css/custom.css       # Custom styling
│   └── pages/index.js       # Homepage
├── static/                  # Static assets
├── docusaurus.config.js     # Site configuration
├── sidebars.js              # Sidebar navigation
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
- [GitHub Pages](https://pages.github.com/) — free static site hosting
- [Prism](https://prismjs.com/) — syntax highlighting

---

*Built by Ina · [withinlondon.com](https://withinlondon.com) · London, UK*
