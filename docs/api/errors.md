---
id: errors
title: Error Codes
---

# Error Codes

The PayFlow API uses standard HTTP status codes. When an error occurs, the response body includes an `error` object with details.

## Error Response Format

```json
{
  "error": {
    "code": "card_declined",
    "message": "Your card was declined.",
    "param": "payment_method",
    "doc_url": "https://docs.payflow.io/errors#card_declined"
  }
}
```

| Field | Description |
|---|---|
| `code` | Machine-readable error identifier |
| `message` | Human-readable explanation |
| `param` | The request parameter that caused the error (if applicable) |
| `doc_url` | Link to this documentation page |

## HTTP Status Codes

| Status | Meaning |
|---|---|
| `200 OK` | Request succeeded |
| `201 Created` | Resource created successfully |
| `400 Bad Request` | Invalid parameters |
| `401 Unauthorized` | Missing or invalid API key |
| `402 Payment Required` | Payment failed (card error) |
| `404 Not Found` | Resource does not exist |
| `409 Conflict` | Duplicate request (idempotency conflict) |
| `429 Too Many Requests` | Rate limit exceeded |
| `500 Internal Server Error` | PayFlow server error |

## Common Error Codes

### Authentication Errors

| Code | Description |
|---|---|
| `invalid_api_key` | The API key provided is not valid |
| `api_key_expired` | The API key has expired — rotate it in the Dashboard |
| `no_api_key` | No API key was provided in the request |

### Payment Errors

| Code | Description |
|---|---|
| `card_declined` | The card was declined by the issuing bank |
| `insufficient_funds` | The card has insufficient funds |
| `expired_card` | The card expiry date has passed |
| `incorrect_cvc` | The CVC number is incorrect |
| `processing_error` | An error occurred while processing the card |

### Request Errors

| Code | Description |
|---|---|
| `missing_param` | A required parameter was not provided |
| `invalid_param` | A parameter value is invalid |
| `resource_not_found` | The requested resource ID does not exist |
| `idempotency_conflict` | A request with this idempotency key already exists with different parameters |

## Handling Errors

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
    error = e.response.json().get("error", {})
    print(f"Error {e.response.status_code}: {error.get('code')} — {error.get('message')}")
```
