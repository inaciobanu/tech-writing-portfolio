---
id: authentication
title: Authentication
---

# Authentication

The PayFlow API uses **Bearer token authentication**. Every request must include your API key in the `Authorization` header.

## API Keys

You have two types of API keys:

| Key Type | Prefix | Use |
|---|---|---|
| **Live key** | `sk_live_` | Production requests — charges real cards |
| **Test key** | `sk_test_` | Development and testing — no real charges |

:::warning Keep your keys secret
Never expose API keys in client-side code, public repositories, or logs. If a key is compromised, rotate it immediately from the Dashboard.
:::

## Making Authenticated Requests

Include your API key as a Bearer token in every request:

```bash
curl https://api.payflow.io/v2/payments \
  -H "Authorization: Bearer sk_live_abc123" \
  -H "Content-Type: application/json"
```

## Using Environment Variables

Store your API key in an environment variable rather than hardcoding it:

```bash
# .env file (never commit this to version control)
PAYFLOW_SECRET_KEY=sk_live_abc123
```

```python
import os
import requests

headers = {
    "Authorization": f"Bearer {os.environ['PAYFLOW_SECRET_KEY']}",
    "Content-Type": "application/json"
}
```

## Rotating API Keys

If you suspect a key has been compromised:

1. Go to **Dashboard → Settings → API Keys**
2. Click **Rotate** next to the compromised key
3. Update your environment variables with the new key
4. The old key is invalidated immediately

## Authentication Errors

If authentication fails, the API returns a `401 Unauthorized` response:

```json
{
  "error": {
    "code": "invalid_api_key",
    "message": "No valid API key provided.",
    "doc_url": "https://docs.payflow.io/errors#invalid_api_key"
  }
}
```

See [Error Codes](./errors) for a full list of authentication-related errors.
