---
id: rate-limits
title: Rate Limits
---

# Rate Limits

PayFlow enforces rate limits to ensure API stability for all users.

## Limits by Plan

| Plan | Requests per second | Requests per day |
|---|---|---|
| **Starter** | 10 | 50,000 |
| **Growth** | 50 | 500,000 |
| **Enterprise** | Custom | Custom |

## Rate Limit Headers

Every API response includes headers showing your current usage:

```
X-RateLimit-Limit: 50
X-RateLimit-Remaining: 47
X-RateLimit-Reset: 1742291400
```

| Header | Description |
|---|---|
| `X-RateLimit-Limit` | Maximum requests allowed per second |
| `X-RateLimit-Remaining` | Requests remaining in the current window |
| `X-RateLimit-Reset` | Unix timestamp when the limit resets |

## Handling 429 Errors

When you exceed your rate limit, the API returns `429 Too Many Requests`. Implement exponential backoff:

```python
import time
import requests

def request_with_backoff(url, headers, data, max_retries=5):
    for attempt in range(max_retries):
        response = requests.post(url, headers=headers, json=data)
        
        if response.status_code == 429:
            wait = 2 ** attempt  # 1s, 2s, 4s, 8s, 16s
            print(f"Rate limited. Retrying in {wait}s...")
            time.sleep(wait)
            continue
        
        return response
    
    raise Exception("Max retries exceeded")
```

## Tips for Staying Under Limits

- **Batch requests** where possible rather than making individual calls
- **Cache responses** — avoid re-fetching data you already have
- **Use webhooks** instead of polling for status updates
- **Implement idempotency keys** to safely retry failed requests without duplicate charges
