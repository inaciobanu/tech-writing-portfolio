---
id: intro
title: API Documentation
sidebar_label: Overview
slug: /api/intro
---

# PayFlow API — Reference Documentation

**Version:** 2.4.0 · **Base URL:** `https://api.payflow.io/v2`

This reference documents the PayFlow REST API. Use the PayFlow API to process payments, manage subscriptions, issue refunds, and retrieve transaction history programmatically.

:::tip Who is this for?
This reference is written for backend developers integrating PayFlow into a web or mobile application. You should be comfortable with REST APIs and HTTP request/response patterns.
:::

## What You Can Do

| Feature | Description |
|---|---|
| **Payments** | Charge cards, process refunds, and capture authorisations |
| **Subscriptions** | Create and manage recurring billing plans |
| **Customers** | Store customer payment methods securely |
| **Webhooks** | Receive real-time event notifications |
| **Reports** | Export transaction data in CSV or JSON |

## API Design

The PayFlow API follows REST conventions:

- All requests use **HTTPS**
- Request and response bodies use **JSON**
- Standard **HTTP status codes** indicate success or failure
- All timestamps are returned in **ISO 8601** format (`2026-03-18T09:00:00Z`)
- Monetary values are expressed in **minor currency units** (e.g. pence for GBP, cents for USD)

## Quick Example

```bash
curl https://api.payflow.io/v2/payments \
  -H "Authorization: Bearer sk_live_abc123" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 2500,
    "currency": "gbp",
    "customer_id": "cus_9KZFXWr",
    "description": "Annual subscription"
  }'
```

**Response:**

```json
{
  "id": "pay_8xKq9mNw",
  "status": "succeeded",
  "amount": 2500,
  "currency": "gbp",
  "created": "2026-03-18T09:00:00Z"
}
```

## Next Steps

- [Authentication](./authentication) — get your API keys and set up auth
- [Endpoints Reference](./endpoints) — full list of available endpoints
- [Error Codes](./errors) — understand and handle API errors
- [Rate Limits](./rate-limits) — avoid hitting request limits
