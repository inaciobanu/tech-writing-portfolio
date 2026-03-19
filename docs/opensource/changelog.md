---
id: changelog
title: Changelog
---

# Changelog

All notable changes to Logpilot are documented here. This project follows [Semantic Versioning](https://semver.org/) and [Keep a Changelog](https://keepachangelog.com/).

## [2.1.0] — 2026-03-01

### Added
- **HTTP transport** — batch log entries and POST them to any HTTP endpoint ([#88](https://github.com/logpilot/logpilot/pull/88))
- **`transportError` event** — emitted when a transport's `write` method throws, so failures never crash the host application ([#91](https://github.com/logpilot/logpilot/pull/91))
- TypeScript: exported `Transport` and `Formatter` interfaces for custom implementations

### Changed
- `FileTransport` now creates parent directories automatically if they don't exist

### Fixed
- Fixed `prettyFormatter` dropping metadata fields that contained `null` values ([#94](https://github.com/logpilot/logpilot/issues/94))

---

## [2.0.0] — 2026-01-15

### Breaking Changes

:::caution Migrating from v1?
Version 2.0 includes breaking changes. See the [migration guide](#migrating-from-v1) below.
:::

- **Removed:** `log.log()` method — use the specific level methods (`log.info()`, `log.error()`, etc.) instead
- **Changed:** The `format` config option is now called `formatter` and accepts a function, not a string
- **Changed:** `FileTransport` option `path` renamed to `filename` for clarity

### Added
- `fatal` log level (severity 50) — higher than `error`, intended for unrecoverable failures
- `prettyFormatter` for colourised development output
- `log.child(metadata)` — create a child logger with pre-attached context fields

### Improved
- Timestamp precision increased from seconds to milliseconds
- 40% reduction in memory allocation per log entry (benchmark: [#72](https://github.com/logpilot/logpilot/pull/72))

---

## [1.3.2] — 2025-11-20

### Fixed
- `StdoutTransport` was not flushing the buffer before process exit on Windows ([#61](https://github.com/logpilot/logpilot/issues/61))
- Circular references in metadata no longer throw — they are replaced with `[Circular]`

---

## [1.3.0] — 2025-09-05

### Added
- `FileTransport` with daily log rotation and configurable retention period
- `log.setLevel(level)` — change the minimum log level at runtime

---

## [1.0.0] — 2025-06-01

Initial stable release.

- `Logger` class with `debug`, `info`, `warn`, and `error` levels
- `jsonFormatter` — structured JSON output
- `StdoutTransport` — write to stdout
- Full TypeScript definitions

---

## Migrating from v1

### Update the formatter config

```javascript
// v1
const log = new Logger({ format: 'json' });

// v2
const { jsonFormatter } = require('logpilot/formatters');
const log = new Logger({ formatter: jsonFormatter });
```

### Replace `log.log()` calls

```javascript
// v1
log.log('info', 'Server started');

// v2
log.info('Server started');
```

### Update FileTransport option name

```javascript
// v1
new FileTransport({ path: './logs/app.log' });

// v2
new FileTransport({ filename: './logs/app.log' });
```
