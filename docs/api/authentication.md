---
id: authentication
title: Authentication
description: "How to authenticate requests to the PayFlow API using bearer token API keys."
---

# Authentication

The PayFlow API uses **Bearer token authentication**. Every request must include your API key in the `Authorization` header.

## API keys

You have two types of API keys:

| Key Type | Prefix | Use |
|---|---|---|
| **Live key** | `sk_live_` | Production requests – charges real cards |
| **Test key** | `sk_test_` | Development and testing – no real charges |

The two aren't interchangeable. Using a test key where a live key is expected, or the reverse, returns `invalid_api_key`.

:::warning Keep your keys secret
Never expose API keys in client-side code, public repositories, or logs. Call PayFlow from your backend, not from a browser or mobile app. If a key is compromised, [rotate it](#rotating-api-keys) immediately.
:::

## Get your API keys

1. Log in to the [PayFlow Dashboard](https://dashboard.payflow.io).
2. Go to **Settings → API Keys**.
3. Copy your **test secret key** (`sk_test_...`).

Use the test key while you build. Switch to the live key only when you're ready to charge real cards.

## Making authenticated requests

Include your API key as a Bearer token in every request. This request lists your payments:

```bash
curl https://api.payflow.io/v2/payments \
  -H "Authorization: Bearer YOUR_TEST_KEY"
```

Replace `YOUR_TEST_KEY` with your key. A `200` response means your key works. A `401` means it doesn't – see [Authentication errors](#authentication-errors).

## Using environment variables

Store your API key in an environment variable rather than hardcoding it:

```bash
# .env file (never commit this to version control)
PAYFLOW_SECRET_KEY=YOUR_TEST_KEY
```

```python
import os
import requests

headers = {
    "Authorization": f"Bearer {os.environ['PAYFLOW_SECRET_KEY']}",
    "Content-Type": "application/json"
}
```

## Rotating API keys

If you suspect a key has been compromised:

1. Go to **Dashboard → Settings → API Keys**.
2. Select **Rotate** next to the compromised key. The old key stops working immediately.
3. Update your environment variables with the new key.

Until you update it, requests that use the old key fail with `401` and `api_key_expired`.

## Authentication errors

If authentication fails, the API returns a `401 Unauthorized` response with one of three error codes:

- `no_api_key`: the `Authorization` header is missing.
- `invalid_api_key`: the key isn't a recognized PayFlow key, or it's a test key used where a live key is expected (or the reverse).
- `api_key_expired`: the key was rotated or revoked.

For example:

```json
{
  "error": "invalid_api_key",
  "message": "The API key provided is not valid."
}
```

See [Error Codes](./errors) for the fix for each code.
