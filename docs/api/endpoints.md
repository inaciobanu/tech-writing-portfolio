---
id: endpoints
title: Endpoints
---

# Endpoints

## Payments

### Create a Payment

```
POST /payments
```

Charges a customer's payment method. Returns a payment object.

**Request body:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `amount` | integer | ✅ | Amount in minor units (e.g. `2500` = £25.00) |
| `currency` | string | ✅ | ISO 4217 currency code (`gbp`, `usd`, `eur`) |
| `customer_id` | string | ✅ | ID of an existing customer |
| `description` | string | | Human-readable description |
| `metadata` | object | | Key-value pairs for your own use |

**Example request:**

```bash
curl https://api.payflow.io/v2/payments \
  -H "Authorization: Bearer sk_live_abc123" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 4999,
    "currency": "gbp",
    "customer_id": "cus_9KZFXWr",
    "description": "Pro plan — March 2026",
    "metadata": { "order_id": "ord_1029" }
  }'
```

**Example response:**

```json
{
  "id": "pay_8xKq9mNw",
  "object": "payment",
  "status": "succeeded",
  "amount": 4999,
  "currency": "gbp",
  "customer_id": "cus_9KZFXWr",
  "description": "Pro plan — March 2026",
  "created": "2026-03-18T09:00:00Z",
  "metadata": { "order_id": "ord_1029" }
}
```

---

### Retrieve a Payment

```
GET /payments/{id}
```

Returns a single payment object by ID.

```bash
curl https://api.payflow.io/v2/payments/pay_8xKq9mNw \
  -H "Authorization: Bearer sk_live_abc123"
```

---

### List Payments

```
GET /payments
```

Returns a paginated list of payments, newest first.

**Query parameters:**

| Parameter | Type | Description |
|---|---|---|
| `limit` | integer | Number of results (1–100, default `20`) |
| `customer_id` | string | Filter by customer |
| `status` | string | Filter by status: `succeeded`, `failed`, `pending` |
| `created[gte]` | timestamp | Filter by creation date (from) |
| `created[lte]` | timestamp | Filter by creation date (to) |

---

## Refunds

### Create a Refund

```
POST /refunds
```

Issues a full or partial refund for a payment.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `payment_id` | string | ✅ | ID of the payment to refund |
| `amount` | integer | | Partial refund amount. Omit to refund in full. |
| `reason` | string | | `duplicate`, `fraudulent`, or `requested_by_customer` |

---

## Customers

### Create a Customer

```
POST /customers
```

| Parameter | Type | Description |
|---|---|---|
| `email` | string | Customer email address |
| `name` | string | Full name |
| `metadata` | object | Your custom data |

### List Customers

```
GET /customers
```

Returns paginated list of customers. Supports `limit`, `email`, and `created` filters.
