---
id: connect-api-sample
title: "Sample: PrimaryBid Connect API"
sidebar_label: "Connect API Developer Portal (Sample)"
---

:::info Portfolio sample
This is a **portfolio writing sample** demonstrating developer portal documentation for a fintech API. It reflects the style and scope of the Connect API Developer Portal I owned at PrimaryBid.
:::

# PrimaryBid Connect API — Developer Portal

The **Connect API** allows distribution partners and institutional clients to integrate PrimaryBid's IPO and follow-on offering access directly into their own platforms. With Connect, your users can browse live offers, submit indications of interest, and receive allocations — all without leaving your product.

**Base URL:** `https://connect.primarybid.com/api/v1`

---

## Who Is This For?

This portal is for **software engineers** at partner organisations building integrations with the PrimaryBid platform. You should be comfortable with:

- REST APIs and HTTP request/response patterns
- OAuth 2.0 authentication flows
- JSON request/response handling
- Webhook event processing

If you're a retail investor or internal PrimaryBid user, see the [User Guide](../manuals/intro) instead.

---

## Quickstart

### 1. Get API Credentials

Contact your PrimaryBid account manager to receive:

- `client_id`
- `client_secret`
- Your sandbox environment URL

### 2. Obtain an Access Token

Connect uses **OAuth 2.0 Client Credentials** flow:

```bash
curl -X POST https://auth.primarybid.com/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET"
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

Tokens expire after **1 hour**. Implement token refresh before expiry to avoid request failures.

### 3. Browse Live Offers

```bash
curl https://connect.primarybid.com/api/v1/offers \
  -H "Authorization: Bearer eyJhbGci..."
```

---

## Core Endpoints

### List Offers

```
GET /offers
```

Returns all currently active IPO and follow-on offers available to your distribution agreement.

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `status` | string | Filter by status: `live`, `upcoming`, `closed` |
| `type` | string | Filter by type: `ipo`, `placing`, `retail_offer` |
| `limit` | integer | Results per page (default `20`, max `100`) |

**Example response:**

```json
{
  "offers": [
    {
      "id": "offer_7Xk2mNp",
      "company": "Acme Renewables plc",
      "ticker": "ACMR",
      "type": "ipo",
      "status": "live",
      "price_per_share": 2.50,
      "currency": "gbp",
      "minimum_investment": 500,
      "closes_at": "2026-03-20T17:00:00Z"
    }
  ],
  "total": 1,
  "page": 1
}
```

---

### Submit an Indication of Interest

```
POST /offers/{offer_id}/indications
```

Submits a retail investor's indication of interest for an active offer.

**Request body:**

```json
{
  "investor_id": "inv_9KZFXWr",
  "amount": 1000,
  "currency": "gbp",
  "terms_accepted": true,
  "terms_version": "2.1"
}
```

| Field | Required | Description |
|---|---|---|
| `investor_id` | ✅ | Your platform's identifier for this investor |
| `amount` | ✅ | Gross investment amount in minor currency units |
| `currency` | ✅ | ISO 4217 code (`gbp`, `eur`) |
| `terms_accepted` | ✅ | Must be `true` — investor has accepted current terms |
| `terms_version` | ✅ | Version of terms accepted (retrieve from `/terms`) |

---

## Webhook Events

PrimaryBid fires webhook events for key lifecycle changes. Configure your endpoint in the Connect Dashboard under **Settings → Webhooks**.

| Event | Fired when |
|---|---|
| `offer.opened` | A new offer becomes live |
| `offer.closing_soon` | An offer has 1 hour remaining |
| `offer.closed` | An offer closes for new indications |
| `indication.received` | An indication is successfully submitted |
| `allocation.confirmed` | An investor receives a confirmed allocation |
| `allocation.scaled` | An allocation is scaled back due to oversubscription |

**Example payload — `allocation.confirmed`:**

```json
{
  "event": "allocation.confirmed",
  "timestamp": "2026-03-20T18:05:00Z",
  "data": {
    "investor_id": "inv_9KZFXWr",
    "offer_id": "offer_7Xk2mNp",
    "shares_allocated": 400,
    "amount_allocated": 1000.00,
    "currency": "gbp"
  }
}
```

### Verifying Webhook Signatures

Every webhook includes a `PrimaryBid-Signature` header. Verify it to ensure the payload is genuine:

```python
import hmac
import hashlib

def verify_webhook(payload_body: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode(),
        payload_body,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)
```

---

## Changelog

### v1.4.0 — 2026-01-10
- Added `allocation.scaled` webhook event
- `GET /offers` now supports `type` filter parameter
- Improved error messages for invalid `terms_version` submissions

### v1.3.0 — 2025-09-15
- Added `offer.closing_soon` webhook (1-hour warning before close)
- Rate limit increased to 100 requests/minute for Growth tier partners

### v1.2.0 — 2025-06-01
- Initial public release of Connect API
