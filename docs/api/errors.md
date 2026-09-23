---
id: errors
title: Error Codes
description: "PayFlow API error response format and standard HTTP status codes."
---

# Error Codes

The PayFlow API uses standard HTTP status codes. When an error occurs, the response body includes `error` and `message` fields.

## Error response format

```json
{
  "error": "card_declined",
  "message": "The card was declined by the issuing bank."
}
```

| Field | Description |
|---|---|
| `error` | Machine-readable error code |
| `message` | Human-readable explanation |

## HTTP status codes

| Status | Meaning |
|---|---|
| `200 OK` | Request succeeded |
| `400 Bad Request` | Invalid parameters |
| `401 Unauthorized` | Missing or invalid API key |
| `402 Payment Required` | Payment failed (card error) |
| `404 Not Found` | Resource does not exist |
| `409 Conflict` | Duplicate request (idempotency conflict) |
| `429 Too Many Requests` | Rate limit exceeded |
| `500 Internal Server Error` | PayFlow server error |

## Common error codes

Each table below covers one HTTP status. For the full Cause/Fix/Retry guidance behind each code, see the linked [API Reference](./reference/payflow-api) page – it's generated straight from the OpenAPI spec, so it can't drift from what the API actually returns.

### 401 – Authentication errors

| Code | Description | Quick fix |
|---|---|---|
| `no_api_key` | No API key was provided in the request | Send an `Authorization: Bearer <key>` header |
| `invalid_api_key` | The API key provided is not valid | Check the key is correct for this environment (live vs. test) |
| `api_key_expired` | The API key has expired | Rotate it in the Dashboard |

Returned by every endpoint. See [Authentication](./authentication) for how to send your key, or any [reference](./reference/payflow-api) page's 401 response for the full detail.

### 400 – Request errors

| Code | Description | Quick fix |
|---|---|---|
| `missing_param` | A required parameter was not provided | Add the missing field and resend |
| `invalid_param` | A parameter value is invalid | Correct the field value and resend |

See [Create a payment](./reference/create-payment)'s 400 response.

### 402 – Payment errors

| Code | Description | Quick fix |
|---|---|---|
| `card_declined` | The card was declined by the issuing bank | Ask the customer to use a different payment method or contact their issuer |
| `insufficient_funds` | The card has insufficient funds | Ask the customer to use a different payment method |
| `expired_card` | The card expiry date has passed | Ask the customer to use a different card |
| `incorrect_cvc` | The CVC number is incorrect | Ask the customer to re-enter their card details |
| `processing_error` | An error occurred while processing the card | Retry – often transient |

See [Create a payment](./reference/create-payment)'s 402 response, including the sandbox `customer_id` prefixes that trigger each case.

### 404 – Not found

| Code | Description | Quick fix |
|---|---|---|
| `resource_not_found` | The requested resource ID does not exist | Check the ID and that you're using the right API key/environment |

See [Retrieve a payment](./reference/retrieve-payment)'s 404 response.

### 409 – Idempotency conflict

| Code | Description | Quick fix |
|---|---|---|
| `idempotency_conflict` | A request reused an `Idempotency-Key` with a different request body | Use a new key for a different request, or resend the original body to replay it |

See [Create a payment](./reference/create-payment)'s 409 response.

### 429 and 500 – Rate limits and server errors

| Code | Description | Quick fix |
|---|---|---|
| `rate_limited` | Too many requests sent within the current window | Slow down and honor the `Retry-After` header |
| `server_error` | An unexpected failure on PayFlow's side | Retry; contact support if it persists |

Returned by every endpoint. See [Rate Limits](./rate-limits) for `rate_limited`; `server_error` isn't caused by anything in the request. Retrying won't fail again for that reason, but on a write (`createPayment`, `createRefund`, `createCustomer`) a retry without an `Idempotency-Key` risks a duplicate if the original request actually succeeded server-side despite returning `500` – always send one on writes so a retry replays the original response instead.

## Handling errors

```python
import requests

try:
    response = requests.post(
        "https://api.payflow.io/v2/payments",
        headers={"Authorization": "Bearer sk_live_abc123"},
        json={"amount": 2500, "currency": "gbp", "customer_id": "cus_9KZFXWr"}
    )
    response.raise_for_status()
    payment = response.json()

except requests.exceptions.HTTPError as e:
    body = e.response.json()
    print(f"Error {e.response.status_code}: {body['error']} – {body['message']}")
```
