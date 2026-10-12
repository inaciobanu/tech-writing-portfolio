---
id: changelog
title: Changelog
description: "PayFlow API release history, with migration notes for upgrading to 2.5 and from v1 to v2."
---

# Changelog

Release history for the PayFlow API. Versions follow [Semantic Versioning](https://semver.org/), and the major version is part of the base URL (`https://api.payflow.io/v2`).

- **Patch releases** (2.5.1 to 2.5.2) fix bugs and change no documented behavior.
- **Minor releases** (2.4 to 2.5) add endpoints, parameters, fields, and error codes. Your integration should ignore response fields it doesn't recognize, and treat an unknown `error` code as a generic failure.
- **Major releases** (v1 to v2) contain breaking changes, and each one has a migration section below.

The current version is **2.5.2**.

## 2.5.2 – 2026-09-08

### Fixed
- `GET /payments` ignored `created[lte]` when `created[gte]` was also set. Both bounds now apply.

## 2.5.1 – 2026-08-12

### Fixed
- `POST /refunds` returned `500 server_error` when `amount` was greater than the refundable balance of the payment. It now returns `400 invalid_param`.

## 2.5.0 – 2026-07-14

### Added
- `created[gte]` and `created[lte]` query parameters on `GET /payments`, to list payments in a date range.

### Changed
- A rotated or revoked API key now returns `401 api_key_expired`. Previously it returned `401 invalid_api_key`, so you couldn't tell an expired key from a wrong one. See [Handle `api_key_expired`](#handle-api_key_expired).

## 2.4.0 – 2026-04-21

### Added
- `Idempotency-Key` header on `POST /payments`, `POST /refunds`, and `POST /customers`. Replaying a key with the same body returns the original response.
- `409 idempotency_conflict`, returned when a key is replayed with a different body.

## 2.0.0 – 2026-01-12

### Breaking changes

:::caution Migrating from v1?
Version 2 changes the base URL, authentication, amounts, and error format. See [Migrate from v1 to v2](#migrate-from-v1-to-v2).
:::

- **Changed:** the base URL is now `https://api.payflow.io/v2`.
- **Changed:** you authenticate with an `Authorization: Bearer` header. The `api_key` query parameter is removed.
- **Changed:** `amount` is an integer in minor currency units (`2500` for £25.00). It was a decimal string.
- **Changed:** `currency` is a lowercase ISO 4217 code (`gbp`). It was uppercase.
- **Changed:** errors are a flat `error` and `message` pair. They were nested under `error.code`.
- **Renamed:** `/charges` is now `/payments`, and the `customer` field is now `customer_id`.
- **Moved:** `POST /payments/{id}/refund` is now `POST /refunds`, with `payment_id` in the request body.

---

## Handle `api_key_expired`

**Applies to:** 2.5.0 and later. No change is required, but you should handle the new code if your integration reacts to authentication failures.

If your code treats every `invalid_api_key` response as a signal to alert someone that the key is wrong, an expired key now falls through to your generic `401` handling. Branch on both codes:

```javascript
// Before 2.5.0
if (err.error === 'invalid_api_key') {
  alertOps('PayFlow key is invalid or has been rotated');
}

// 2.5.0 and later
switch (err.error) {
  case 'invalid_api_key':
    alertOps('PayFlow key is not valid for this environment');
    break;
  case 'api_key_expired':
    alertOps('PayFlow key was rotated or revoked – generate a new one in the Dashboard');
    break;
}
```

## Migrate from v1 to v2

Work through these steps in order. Test each one against a test key before you switch to your live key.

### 1. Update the base URL and authentication

```bash
# v1
curl "https://api.payflow.io/v1/charges?api_key=YOUR_KEY" \
  -d amount=25.00 \
  -d currency=GBP \
  -d customer=cus_9KZFXWr

# v2
curl https://api.payflow.io/v2/payments \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 2500,
    "currency": "gbp",
    "customer_id": "cus_9KZFXWr"
  }'
```

### 2. Convert amounts to minor units

Multiply each v1 value by 100 and round the result to an integer. Floating-point multiplication can leave a fraction (`19.99 * 100` gives `1998.9999999999998`), and the API rejects non-integer amounts.

```javascript
// v1
{ amount: '25.00' }

// v2
{ amount: Math.round(25.00 * 100) } // 2500
```

### 3. Update refund calls

```bash
# v1
curl -X POST https://api.payflow.io/v1/payments/pay_8xKq9mNw/refund

# v2
curl -X POST https://api.payflow.io/v2/refunds \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "payment_id": "pay_8xKq9mNw" }'
```

Omit `amount` to refund in full, as before.

### 4. Update error handling

```javascript
// v1
const code = body.error.code;

// v2
const code = body.error; // for example, "card_declined"
const message = body.message;
```

For the full list of codes, see [Error Codes](./errors).

### 5. Adopt idempotency keys (recommended)

Version 2.4 added the `Idempotency-Key` header. Send a unique key on every write so that a retry after a network failure can't create a duplicate charge. For guidance, see [Best Practices](../guides/best-practices#use-idempotency-keys).
