---
id: intro
title: Open Source Documentation
sidebar_label: Overview
slug: /opensource/intro
---

# Logpilot — Open Source Documentation

**Logpilot** is a lightweight, open source structured logging library for Node.js. It outputs clean, queryable JSON logs with zero configuration and pluggable transports for common destinations (stdout, files, cloud logging services).

[![npm version](https://img.shields.io/npm/v/logpilot)](https://npmjs.com/package/logpilot)
[![license](https://img.shields.io/github/license/logpilot/logpilot)](https://github.com/logpilot/logpilot/blob/main/LICENSE)
[![build](https://img.shields.io/github/actions/workflow/status/logpilot/logpilot/ci.yml)](https://github.com/logpilot/logpilot/actions)

## Quick Install

```bash
npm install logpilot
```

```javascript
const log = require('logpilot');

log.info('Server started', { port: 3000, env: 'production' });
// → {"level":"info","message":"Server started","port":3000,"env":"production","timestamp":"2026-03-18T09:00:00Z"}
```

## In This Section

| Page | Description |
|---|---|
| [Contributing Guide](./contributing) | How to report bugs, propose features, and submit pull requests |
| [Architecture](./architecture) | How Logpilot is structured under the hood |
| [Changelog](./changelog) | Release history and migration notes |

## Why Logpilot?

Most Node.js logging libraries require significant configuration before they produce useful output. Logpilot works out of the box with sensible defaults, while remaining fully configurable for production environments.

- **Zero config** — structured JSON logs immediately
- **Tiny footprint** — under 8KB minified, zero production dependencies  
- **Pluggable transports** — stdout, file, HTTP, or write your own
- **TypeScript support** — full type definitions included
- **Tested** — 98% code coverage

## Community

- [GitHub Issues](https://github.com/logpilot/logpilot/issues) — bug reports and feature requests
- [Discussions](https://github.com/logpilot/logpilot/discussions) — questions and ideas
- [Discord](https://discord.gg/logpilot) — real-time chat with maintainers and contributors
