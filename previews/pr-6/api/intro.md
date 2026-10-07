# PayFlow API Overview

> Overview of the PayFlow REST API: what it does, how it behaves, and a first request.

This section documents the PayFlow REST API. Use it to process payments, issue refunds, manage customers, and retrieve transaction history. For the current version and base URL, see the [API Reference](./reference/payflow-api).

:::tip Who is this for?
This reference is written for back-end developers integrating PayFlow into a web or mobile application. You should be comfortable with REST APIs and HTTP request/response patterns.
:::

## What you can do

| Feature | Description |
|---|---|
| **Payments** | Charge a customer and retrieve a payment by ID. |
| **Refunds** | Issue full or partial refunds against a payment. |
| **Customers** | Create and list customer records to charge against. |
| **Transaction history** | List payments to reconcile and report. |
| **Safe retries** | Send an `Idempotency-Key` on writes so a retry can't create a duplicate. |

## API design

The PayFlow API follows REST conventions:

- All requests use **HTTPS**
- Request and response bodies use **JSON**
- Standard **HTTP status codes** indicate success or failure
- All timestamps are returned in **ISO 8601** format (`2026-03-18T09:00:00Z`)
- Monetary values are expressed in **minor currency units** (for example, pence for GBP, cents for USD)

## Quick example

This request creates a £25.00 payment for an existing customer. You need a test key, which makes no real charges ([Authentication](./authentication)), and a customer ID ([Create a customer](./reference/create-customer)). Replace `YOUR_TEST_KEY` and `cus_9KZFXWr` with your own values. The amount is in pence, so `2500` is £25.00.

The `Idempotency-Key` header makes the request safe to retry: sending the same key again returns the original response instead of creating a second charge.

```bash
curl https://api.payflow.io/v2/payments \
  -H "Authorization: Bearer YOUR_TEST_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: f47ac10b-58cc-4372-a567-0e02b2c3d479" \
  -d '{
    "amount": 2500,
    "currency": "gbp",
    "customer_id": "cus_9KZFXWr",
    "description": "Q1 invoice"
  }'
```

**Response:**

```json
{
  "id": "pay_8xKq9mNw",
  "object": "payment",
  "status": "succeeded",
  "amount": 2500,
  "currency": "gbp",
  "created": "2026-03-18T09:00:00Z"
}
```

A `status` of `succeeded` means the payment went through. Keep the `id` to look up or refund the payment later.

## Next steps

- [Quickstart](../guides/quickstart) – make your first call step by step
- [Authentication](./authentication) – get your API keys and set up auth
- [API Reference](./reference/payflow-api) – every endpoint, with request and response examples
- [Error Codes](./errors) – understand and handle API errors
- [Rate Limits](./rate-limits) – avoid hitting request limits
