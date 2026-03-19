---
id: contributing
title: Contributing Guide
---

# Contributing to Logpilot

Thank you for your interest in contributing to Logpilot. This guide covers how to report bugs, propose new features, and submit pull requests.

## Code of Conduct

All contributors are expected to follow our [Code of Conduct](https://github.com/logpilot/logpilot/blob/main/CODE_OF_CONDUCT.md). We are committed to maintaining a welcoming and inclusive community.

## Ways to Contribute

- 🐛 **Report a bug** — open a GitHub issue
- 💡 **Propose a feature** — start a GitHub Discussion
- 📖 **Improve documentation** — edit any `.md` file and open a pull request
- 🧪 **Add tests** — increase coverage for edge cases
- 🔧 **Fix a bug or implement a feature** — see the workflow below

## Reporting Bugs

Before opening an issue, please search existing issues to avoid duplicates.

When reporting a bug, include:

- **Logpilot version** (`npm list logpilot`)
- **Node.js version** (`node --version`)
- **Operating system**
- **Minimal reproduction** — the smallest possible code that reproduces the issue
- **Expected vs actual behaviour**

Use the [bug report template](https://github.com/logpilot/logpilot/issues/new?template=bug_report.md) to get started.

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Git

### Fork and Clone

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/logpilot.git
cd logpilot

# 2. Add the upstream remote
git remote add upstream https://github.com/logpilot/logpilot.git

# 3. Install dependencies
npm install
```

### Run Tests

```bash
# Run the full test suite
npm test

# Run tests in watch mode during development
npm run test:watch

# Check coverage report
npm run coverage
```

All pull requests must maintain **≥95% code coverage**.

### Project Structure

```
logpilot/
├── src/
│   ├── index.js          # Public API entry point
│   ├── logger.js         # Core logger class
│   ├── transports/       # Built-in transport implementations
│   │   ├── stdout.js
│   │   ├── file.js
│   │   └── http.js
│   └── formatters/       # Log formatting utilities
├── test/
│   ├── logger.test.js
│   └── transports/
├── docs/                 # This documentation
├── CHANGELOG.md
└── package.json
```

## Pull Request Workflow

1. **Sync your fork** with the latest upstream changes:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

2. **Create a branch** for your change:

```bash
git checkout -b fix/null-metadata-crash
# or
git checkout -b feat/syslog-transport
```

3. **Make your changes** and write or update tests

4. **Lint and test** before committing:

```bash
npm run lint
npm test
```

5. **Commit** using [Conventional Commits](https://www.conventionalcommits.org/) format:

```bash
git commit -m "fix: handle null values in metadata object"
git commit -m "feat: add syslog transport"
git commit -m "docs: add transport configuration examples"
```

6. **Push** your branch and **open a pull request** against `main`

## Pull Request Checklist

Before submitting, confirm your PR:

- [ ] Passes all existing tests (`npm test`)
- [ ] Includes tests for any new behaviour
- [ ] Maintains ≥95% code coverage
- [ ] Follows the existing code style (`npm run lint` passes)
- [ ] Updates documentation if behaviour has changed
- [ ] Has a clear title following the Conventional Commits format
- [ ] References any related issues (e.g. `Fixes #42`)

## Review Process

A maintainer will review your pull request within **3–5 business days**. We may request changes — please don't take this personally. Once approved, a maintainer will merge your PR and credit you in the changelog.
