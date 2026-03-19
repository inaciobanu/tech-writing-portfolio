---
id: architecture
title: Architecture
---

# Architecture

This page explains how Logpilot is structured internally — useful if you're contributing code or building a custom transport.

## Overview

Logpilot is built around three core concepts:

```
Your application
      │
      ▼
  Logger instance   ← Creates log entries with level, message, metadata
      │
      ▼
  Formatter         ← Transforms entries into the desired output format (JSON, text)
      │
      ▼
  Transport(s)      ← Writes formatted entries to a destination (stdout, file, HTTP)
```

Each of these layers is independent and replaceable.

## The Logger

The `Logger` class (`src/logger.js`) is the public-facing API. It:

- Accepts log calls (`log.info()`, `log.error()`, etc.)
- Applies the minimum log level filter
- Attaches standard fields: `timestamp`, `level`, `pid`
- Passes the entry to the configured formatter, then each transport

```javascript
const logger = new Logger({
  level: 'info',           // Minimum level to log
  formatter: jsonFormatter,
  transports: [stdoutTransport, fileTransport],
});
```

## Log Levels

Logpilot uses five levels, in ascending severity:

| Level | Value | Use for |
|---|---|---|
| `debug` | 10 | Detailed diagnostic information |
| `info` | 20 | Normal application events |
| `warn` | 30 | Unexpected situations that aren't errors |
| `error` | 40 | Errors that need attention |
| `fatal` | 50 | Application is about to crash |

Entries below the configured minimum level are discarded before formatting or transport.

## Formatters

A formatter is a pure function that takes a log entry object and returns a string:

```javascript
// src/formatters/json.js
function jsonFormatter(entry) {
  return JSON.stringify(entry);
}
```

Logpilot ships two built-in formatters:

- **`jsonFormatter`** (default) — compact single-line JSON, ideal for production and log aggregation tools
- **`prettyFormatter`** — colourised, human-readable output for local development

## Transports

A transport is an object with a `write(formattedString)` method. It receives the formatted log string and sends it somewhere.

### Built-in Transports

| Transport | Description |
|---|---|
| `StdoutTransport` | Writes to `process.stdout` (default) |
| `FileTransport` | Appends to a log file with optional rotation |
| `HttpTransport` | POSTs log batches to an HTTP endpoint |

### Writing a Custom Transport

Implement a `write` method and optionally a `close` method for cleanup:

```javascript
class SlackTransport {
  constructor({ webhookUrl, minLevel = 'error' }) {
    this.webhookUrl = webhookUrl;
    this.minLevel = minLevel;
  }

  async write(formattedString) {
    const entry = JSON.parse(formattedString);

    // Only send errors and above to Slack
    if (entry.levelValue < levels[this.minLevel]) return;

    await fetch(this.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: `*${entry.level.toUpperCase()}*: ${entry.message}` }),
    });
  }
}
```

Register it like any built-in transport:

```javascript
const log = new Logger({
  transports: [
    new StdoutTransport(),
    new SlackTransport({ webhookUrl: process.env.SLACK_WEBHOOK }),
  ],
});
```

## Error Handling

Logpilot handles transport errors internally so a logging failure never crashes your application. If a transport's `write` method throws, the error is emitted on the logger's `error` event:

```javascript
log.on('transportError', (err, transport) => {
  console.error(`Transport failed: ${transport.name}`, err);
});
```
