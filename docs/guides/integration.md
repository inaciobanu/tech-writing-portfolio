---
id: integration
title: Integration Guide
---

# Integration Guide

This guide walks through integrating PayFlow into a Node.js Express application. The same patterns apply to other languages and frameworks.

## Project Setup

Install the PayFlow Node.js SDK:

```bash
npm install payflow-node dotenv
```

Create a `.env` file:

```bash
PAYFLOW_SECRET_KEY=sk_test_your_key_here
```

## Initialise the Client

```javascript
// payflow.js
require('dotenv').config();
const PayFlow = require('payflow-node');

const payflow = new PayFlow(process.env.PAYFLOW_SECRET_KEY);

module.exports = payflow;
```

## Create a Payment Endpoint

```javascript
// routes/payments.js
const express = require('express');
const router = express.Router();
const payflow = require('../payflow');

router.post('/charge', async (req, res) => {
  const { amount, currency, customerId } = req.body;

  try {
    const payment = await payflow.payments.create({
      amount,
      currency,
      customer_id: customerId,
    });

    res.json({ success: true, paymentId: payment.id });

  } catch (error) {
    // Handle specific error codes
    if (error.code === 'card_declined') {
      return res.status(402).json({ error: 'Your card was declined.' });
    }

    res.status(500).json({ error: 'Payment failed. Please try again.' });
  }
});

module.exports = router;
```

## Handle Webhooks

PayFlow sends webhook events for asynchronous payment updates. Set up a webhook endpoint to listen for these:

```javascript
// routes/webhooks.js
const express = require('express');
const router = express.Router();
const payflow = require('../payflow');

// Use raw body for signature verification
router.post('/', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['payflow-signature'];

  let event;
  try {
    event = payflow.webhooks.constructEvent(
      req.body,
      signature,
      process.env.PAYFLOW_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook signature verification failed.`);
  }

  switch (event.type) {
    case 'payment.succeeded':
      console.log('Payment succeeded:', event.data.id);
      // fulfil order, send confirmation email, etc.
      break;
    case 'payment.failed':
      console.log('Payment failed:', event.data.id);
      // notify customer, log for review, etc.
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router;
```

## Register Your Webhook

In the Dashboard, go to **Settings → Webhooks → Add endpoint** and add your webhook URL. Select the events you want to receive.

:::tip Test webhooks locally
Use the [PayFlow CLI](https://docs.payflow.io/cli) or [ngrok](https://ngrok.com) to forward webhook events to your local development server.
:::
