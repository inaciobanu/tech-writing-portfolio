---
id: rate-limits
title: Rate Limits
description: "PayFlow API rate limits by plan, and how to handle rate-limit errors."
---

# Rate Limits

PayFlow enforces rate limits to ensure API stability for all users.

:::note Sandbox note
The rate limit contract below is documented on every operation, but the sandbox mock doesn't implement it yet – no request will actually get a `429` in the sandbox. Build against the documented headers and status code so your integration is ready when enforcement ships.
:::

## Limits by plan

| Plan | Requests per window | Requests per day |
|---|---|---|
| **Starter** | 100 | 50,000 |
| **Growth** | 500 | 500,000 |
| **Enterprise** | Custom | Custom |

## Rate limit headers

API responses include headers showing your current usage:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1732104000
```

A `429` response also includes a `Retry-After` header:

```
Retry-After: 30
```

| Header | Description |
|---|---|
| `X-RateLimit-Limit` | Maximum requests allowed per window |
| `X-RateLimit-Remaining` | Requests remaining in the current window |
| `X-RateLimit-Reset` | Unix timestamp when the current window resets |
| `Retry-After` | Seconds to wait before retrying (sent on `429` only) |

## Handling 429 errors

When you exceed your rate limit, the API returns `429 Too Many Requests`. Wait out the window and honor `Retry-After` rather than retrying immediately or on a fixed backoff schedule:

```python
import time
import requests

def request_with_retry_after(url, headers, data):
    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 429:
        wait = int(response.headers.get("Retry-After", 1))
        print(f"Rate limited. Retrying in {wait}s...")
        time.sleep(wait)
        return requests.post(url, headers=headers, json=data)

    return response
```

## Tips for staying under limits

- **Batch requests** where possible rather than making individual calls
- **Cache responses** – avoid re-fetching data you already have
- **Implement idempotency keys** to safely retry failed requests without duplicate charges
