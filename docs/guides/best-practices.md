---
id: best-practices
title: Best Practices
---

# Best Practices

Follow these patterns to build a reliable, production-ready PayFlow integration.

## Use Idempotency Keys

Idempotency keys prevent duplicate charges if a request is retried after a network failure. Include a unique `Idempotency-Key` header on all payment requests:

```javascript
const { v4: uuidv4 } = require('uuid');

const payment = await payflow.payments.create(
  { amount: 2500, currency: 'gbp', customer_id: 'cus_9KZFXWr' },
  { idempotencyKey: uuidv4() } // Generate once, store with your order
);
```

If you retry the request with the same key, PayFlow returns the original response rather than creating a duplicate payment.

## Never Trust Client-Side Amounts

Always calculate payment amounts on your server, never from data sent by the client:

```javascript
// ❌ Don't do this — a user could manipulate the amount
const { amount } = req.body;

// ✅ Do this instead — look up the price server-side
const product = await db.products.findById(req.body.productId);
const amount = product.price;
```

## Store Payment IDs Immediately

Save the payment ID to your database before responding to the customer, not after. This prevents lost transactions if the response fails to deliver:

```javascript
const payment = await payflow.payments.create({ ... });

// Save FIRST, then respond
await db.orders.update({ id: orderId }, { paymentId: payment.id, status: 'paid' });

res.json({ success: true });
```

## Use Webhooks for Fulfilment

Don't rely on the payment API response alone to fulfil orders. Use webhooks as your source of truth, since they handle asynchronous payment methods, retries, and bank delays:

```
payment.create() → immediate response (use for UX feedback)
webhook payment.succeeded → fulfil order (use for business logic)
```

## Log Everything

Log payment IDs, error codes, and customer IDs for every transaction. This is essential for debugging disputes and customer support:

```javascript
const payment = await payflow.payments.create({ ... });

logger.info({
  event: 'payment_created',
  payment_id: payment.id,
  customer_id: customerId,
  amount: payment.amount,
  currency: payment.currency,
});
```

## Test All Error Scenarios

PayFlow provides [test card numbers](https://docs.payflow.io/testing) that trigger specific errors in test mode. Always test:

- ✅ Successful payment
- ❌ Card declined
- ❌ Insufficient funds
- ❌ Network timeout (use retry logic)
- ❌ Duplicate request (confirm idempotency works)
