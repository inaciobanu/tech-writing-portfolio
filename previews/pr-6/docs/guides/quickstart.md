# Quickstart

> Make your first PayFlow API call in under 5 minutes.

## Step 1: Get your API key

1. Log in to the [PayFlow Dashboard](https://dashboard.payflow.io).
2. Navigate to **Settings → API Keys**.
3. Copy your **test secret key** (`sk_test_...`).

:::warning Use test keys for development
Never use your live key (`sk_live_...`) during development. Test keys process no real payments.
:::

## Step 2: Make your first request

Replace `YOUR_TEST_KEY` with your test key:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**cURL**

```bash
curl https://api.payflow.io/v2/payments \
  -H "Authorization: Bearer YOUR_TEST_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 2500,
    "currency": "gbp",
    "customer_id": "cus_test_example",
    "description": "Test payment"
  }'
```

**Python**

```python
import requests

response = requests.post(
    "https://api.payflow.io/v2/payments",
    headers={
        "Authorization": "Bearer YOUR_TEST_KEY",
        "Content-Type": "application/json"
    },
    json={
        "amount": 2500,
        "currency": "gbp",
        "customer_id": "cus_test_example",
        "description": "Test payment"
    }
)

print(response.json())
```

**Node.js**

```javascript
const response = await fetch('https://api.payflow.io/v2/payments', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TEST_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    amount: 2500,
    currency: 'gbp',
    customer_id: 'cus_test_example',
    description: 'Test payment',
  }),
});

const payment = await response.json();
console.log(payment);
```

## Step 3: Check the response

A successful payment returns a `200 OK` with a payment object:

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

Confirm it in your Dashboard under **Payments → Test Payments**.

## What's next?

- [Integration Guide](./integration) – add PayFlow to a real application
- [API Reference](../api/reference/payflow-api) – full reference for all available endpoints
- [Error Handling](../api/errors) – handle failures gracefully
