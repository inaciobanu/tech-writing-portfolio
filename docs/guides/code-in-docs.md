---
id: code-in-docs
title: Code in Docs Style Guide
description: "A practical style guide for presenting code, commands, inputs, outputs, and errors in technical documentation."
sidebar_label: Code in Docs Style Guide
slug: /guides/code-in-docs
---

# Code in Docs Style Guide

Code examples are part of the product experience. A reader should be able to tell what to copy, what to replace, what the code does, and what success looks like without reverse-engineering the page.

This guide defines how to present code in developer documentation. It covers inline code, commands, configuration, request and response bodies, application code, logs, errors, and multi-language examples.

## The standard

A code sample is ready to publish when a reader can answer these questions:

1. What language, shell, format, or tool is this?
2. Where does it run?
3. Which values must I replace?
4. What does the important line do?
5. What should I see when it works?
6. Can I copy it without copying the prompt, output, or explanation?
7. Does it remain usable on a narrow screen?

If the page does not answer these questions, improve the surrounding explanation before adding more code.

## Use the smallest useful sample

Show the shortest complete path to the task. Remove imports, configuration, and error handling that do not affect the point being explained. Link to a complete example when the omitted context matters.

Prefer this:

```javascript
const payment = await payflow.payments.create({
  amount: 2500,
  currency: 'gbp',
});
```

Over this:

```javascript
// A complete application with unrelated setup, routing, logging,
// configuration, test fixtures, and application-specific helpers...
```

A short sample must still be honest. Do not remove a required header, import, permission, or setup step just to make the example look smaller.

## Identify every code block

Always give a fenced code block a language identifier. The identifier controls syntax highlighting, helps readers using assistive technology understand the content, and gives tooling a reliable signal about how to process the block.

````markdown
```javascript
const result = await client.run();
```
````

Use the language or format that the reader is actually seeing:

| Content | Use |
|---|---|
| Shell command | `bash` or `sh` |
| JavaScript | `javascript` |
| TypeScript | `typescript` |
| Python | `python` |
| JSON data | `json` |
| YAML configuration | `yaml` |
| HTTP request or response | `http` |
| Plain output, logs, or errors | `text` |
| SQL | `sql` |
| A file tree | `text` |

Do not use `javascript` for JSON, `bash` for output, or `text` when the content is valid code in a known language. Do not leave the identifier blank unless the block is deliberately mixed-format and you explain why.

### Language names and tabs

Use the language's familiar name in visible labels: **Node.js**, **Python**, **TypeScript**, and **cURL**. Use the renderer's stable identifier in the fence: `javascript`, `python`, `typescript`, and `bash`.

When the same task has multiple implementations, use tabs. Keep the conceptual steps and result identical across tabs. Do not make one language tab a complete implementation while another is only a fragment.

````mdx
<Tabs>
<TabItem value="python" label="Python">

```python
response = client.payments.create(amount=2500, currency="gbp")
```

</TabItem>
<TabItem value="node" label="Node.js">

```javascript
const response = await client.payments.create({
  amount: 2500,
  currency: 'gbp',
});
```

</TabItem>
</Tabs>
````

The same pattern renders like this:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python-live" label="Python">

```python
response = client.payments.create(amount=2500, currency="gbp")
```

</TabItem>
<TabItem value="node-live" label="Node.js">

```javascript
const response = await client.payments.create({
  amount: 2500,
  currency: 'gbp',
});
```

</TabItem>
</Tabs>

Include a tab only when the supported language has a meaningful, maintained example. Two accurate examples are better than six neglected ones.

## Inline code

Use inline code for exact names that a reader may need to recognise or type:

- commands: `npm run build`
- file names: `docusaurus.config.js`
- paths: `/v1/payments`
- parameters: `customer_id`
- environment variables: `PAYFLOW_SECRET_KEY`
- values: `sk_test_...`
- types and methods: `PaymentRequest`, `createPayment()`
- status codes: `401 Unauthorized`

Use normal prose for concepts and actions:

> Set the `PAYFLOW_SECRET_KEY` environment variable before starting the application.

Do not put an entire sentence in inline code. Do not use bold, quotation marks, or inline code interchangeably for exact technical tokens. Pick one convention and apply it consistently.

## Explain code in prose first

Use prose to explain intent, decisions, and relationships. Use comments only to clarify something a reader must understand while reading or copying the code.

Prefer:

> Store the idempotency key with the order before retrying the request. Reusing the same key makes a retry safe if the network fails after the server receives the request.
>
> ```javascript
> const payment = await payflow.payments.create(payload, {
>   idempotencyKey: order.idempotencyKey,
> });
> ```

Avoid turning the sample into a transcript of the prose:

```javascript
// Create a payment
const payment = await payflow.payments.create(payload);

// Log the payment ID
console.log(payment.id);
```

### When a comment belongs in the sample

Keep a comment when it:

- explains a non-obvious constraint visible at the point of use;
- marks a value the reader must replace;
- warns about a security, data-loss, or environment concern;
- separates two related setup sections in a long file;
- records a deliberate exception or compatibility workaround.

Keep comments short and actionable. Never use comments to hide a missing explanation, excuse broken sample code, or narrate every line.

```javascript
const client = new PayFlow(process.env.PAYFLOW_SECRET_KEY);

// Use the raw body here. Parsing it first breaks signature verification.
app.post('/webhooks', express.raw({ type: 'application/json' }), handler);
```

If the comment would be useful before the code, write it as prose instead.

## Mark replaceable values clearly

Use readable placeholders that describe the required value:

```bash
curl https://api.payflow.io/v2/payments \
  -H "Authorization: Bearer YOUR_TEST_KEY" \
  -d '{"amount":2500,"currency":"gbp"}'
```

Use one placeholder style throughout a product. Good placeholders are explicit about format or source: `YOUR_TEST_KEY`, `PROJECT_ID`, and `path/to/file`. Avoid values that look real enough to copy into production, and never publish credentials, personal data, or private hostnames.

Explain replacements immediately before the block, not in a footnote below it.

## Separate input, command, output, and errors

Do not combine user input, a command, application output, and explanatory prose in one unlabeled block. Give each part a clear role.

```bash
curl https://api.payflow.io/v2/payments \
  -H "Authorization: Bearer YOUR_TEST_KEY"
```

```text
HTTP/1.1 401 Unauthorized
{
  "error": "invalid_api_key"
}
```

Use these conventions:

| Material | Format | Prompt included? |
|---|---|---|
| Command the reader types | `bash`, `sh`, or the relevant shell | No |
| Request body | `json`, `xml`, or the relevant format | No |
| Successful response | `json`, `http`, or `text` | No |
| Log or error output | `text` | No |
| Interactive transcript | `console`, `pycon`, or a clearly named format | Yes, when the interaction matters |

For ordinary copyable commands, omit `$`, `>`, and other prompts. Reserve them for a transcript where the distinction between user input and program output is essential.

### Show the expected result

A command without an expected result leaves the reader guessing. Show a small, representative response and say what matters about it.

```json
{
  "id": "pay_8xKq9mNw",
  "status": "succeeded"
}
```

> The `status` value confirms that the payment was accepted. The `id` is the identifier to store and use when retrieving the payment later.

Do not claim that a sample response is exhaustive if it is abbreviated. Say when fields have been omitted.

## Interactive transcripts and copy behaviour

Interactive sessions are useful for showing a prompt, a response, or a stateful sequence. They are poor formats for copy-and-run instructions because prompts and output are mixed together.

Use a transcript when the interaction itself is the lesson:

```pycon
>>> items = [1, 2, 3]
>>> sum(items)
6
```

For a command readers should run, provide a separate copyable block without prompts:

```python
items = [1, 2, 3]
print(sum(items))
```

If a site must support copying from transcripts, mark the block explicitly and strip prompts only from copied text. Never mutate the visible sample. A progressive-enhancement implementation can look like this:

```javascript
document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-copy-code]');
  if (!button) return;

  const code = document.querySelector(button.dataset.copyCode);
  const text = code?.textContent ?? '';
  const cleanText = button.dataset.stripPrompts === 'true'
    ? text.replace(/^\s*(>>> |\.\.\. |\$ |> )/gm, '')
    : text;

  navigator.clipboard.writeText(cleanText.trimEnd());
});
```

The control must provide visible feedback, work with keyboard focus, and have a non-JavaScript fallback. Do not silently strip characters from arbitrary code blocks: only opt in blocks whose metadata says that prompts are present.

## Long samples: structure before collapse

Do not use a collapsible block to conceal a confusing example. First split the sample into meaningful steps, remove irrelevant setup, and link to the complete source. Collapse only material that is useful but not needed for the first successful path.

Use these as review triggers:

- up to 20 lines: show the complete sample;
- 21–40 lines: review whether it can be split into steps;
- more than 40 lines: show the essential path and place the complete version behind a labelled disclosure.

These are not laws. A 50-line configuration may be easier to use than five disconnected fragments.

Use a descriptive summary, not `Show code`:

````mdx
<details>
<summary>Complete webhook handler</summary>

```javascript
// Full example here.
```

</details>
````

The collapsed content must still be searchable, keyboard accessible, and available without JavaScript. Native `<details>` and `<summary>` are preferable to a custom JavaScript accordion. Never collapse an error message or the only copyable command on the page.

## File context and titles

When a sample belongs in a file, identify the file:

```javascript title="src/payments/createPayment.js"
export async function createPayment(client, order) {
  return client.payments.create({
    amount: order.amount,
    currency: order.currency,
  });
}
```

Use a title when it prevents ambiguity. Do not add invented file names to tiny snippets where the location is irrelevant. For multi-file examples, introduce the structure first:

```text
src/
├── payments/
│   └── createPayment.js
└── server.js
```

## Make samples safe to run

Every runnable sample should have a known environment and a safe default:

- use test or sandbox credentials;
- avoid destructive commands unless the command is the subject of the guide;
- show required installation and setup once, before the first sample;
- pin versions when behaviour depends on a version;
- use deterministic input where possible;
- do not rely on undeclared files, variables, services, or operating-system state;
- test the sample from a clean environment.

If a sample is illustrative rather than runnable, say so. Readers should never have to guess whether an ellipsis, placeholder, or fictional endpoint is executable.

### Verification is the publication gate

On a user-facing documentation site, the default status for a published runnable example is **Verified**. “It looks right” is not verification. Someone must run the sample in the stated environment, confirm the result, and record when it was last checked.

Other statuses are useful for internal maintenance, but they should not quietly become reader-facing substitutes for verification:

| Status | Use internally | Publish as the main path? |
|---|---|---|
| **Verified** | Executed successfully in the supported environment | Yes |
| **Illustrative** | Shows shape or syntax but is intentionally incomplete | No; label clearly or keep out of the runnable path |
| **Generated** | Produced from a schema, SDK, or template and awaiting human and technical checks | No, until verified |
| **Manually verified** | Checked outside automation because CI cannot reproduce the environment | Yes, if the limitation and date are recorded |
| **Deprecated** | Kept for migration or historical context | No; move it out of the main task path |

Generated is a production method, not a quality claim. Manually verified is still verified; it simply tells maintainers how the check was performed. Illustrative and Deprecated samples need visible context so a reader does not mistake them for current instructions.

### Record sample metadata

For substantial or reused examples, keep a small metadata record with the source file or page. The exact format can vary by toolchain; the important thing is that the information exists and can be reviewed.

```yaml
sample:
  owner: Payments Platform
  reviewer: Developer Education
  status: verified
  language: javascript
  runtime: Node.js 20+
  apiVersion: v2
  source: examples/payments/create-payment.js
  lastTested: 2026-08-12
  reviewTrigger: API schema or SDK release
```

Keep metadata close enough to the example that a future maintainer will find it. Reader-facing labels should stay focused on language, version, prerequisites, and expected result.

### Score examples consistently

Use a simple scorecard during reviews. A sample does not need a perfect score to be published, but any low score should have a named action.

| Area | Question | Score |
|---|---|---|
| Correctness | Does it work in the stated environment? | 0–2 |
| Completeness | Does it include everything needed for the task? | 0–2 |
| Copyability | Can a reader copy only the intended code? | 0–2 |
| Readability | Can a reader understand the important parts quickly? | 0–2 |
| Safety | Are credentials, permissions, and destructive actions handled safely? | 0–2 |
| Accessibility | Does it work with keyboard navigation, assistive technology, and narrow screens? | 0–2 |
| Maintenance | Is there an owner, source of truth, and review trigger? | 0–2 |

Treat correctness and safety as publication blockers. A sample that is beautifully formatted but wrong is still a failed sample.

### Example audit

Consider this sample:

```javascript
const payment = await client.payments.create({ amount: 2500 });
console.log(payment);
```

It looks plausible, but an audit finds that it omits the required currency, does not show how the client is authenticated, has no runtime or API version, and has no expected result. It should not be published as verified.

A corrected version makes the assumptions visible:

```javascript title="src/payments/create-payment.js"
const client = new PayFlow(process.env.PAYFLOW_SECRET_KEY);

const payment = await client.payments.create({
  amount: 2500,
  currency: 'gbp',
});

console.log(payment.id, payment.status);
```

The surrounding page should state that it runs on Node.js 20+, uses a sandbox key, and returns a payment ID with a `succeeded` status. The sample can then be run, scored, assigned an owner, and marked **Verified**.

## Security and versioning

Code examples are copied into real systems. Review them as carefully as production-adjacent code.

### Security rules

- Use test credentials and visibly named placeholders such as `YOUR_TEST_KEY`.
- Never include real tokens, customer data, private URLs, or internal hostnames.
- Do not log access tokens, full payment details, passwords, or personal data.
- Mark destructive commands before the code, and show a safe test or cleanup path.
- Explain required permissions and scopes where they affect the result.
- Prefer secure defaults even when a shorter insecure example is easier to write.
- Route suspected secret exposure to a private security channel, not a public issue.

### Version rules

Label an example when behaviour depends on a version of the API, SDK, language, runtime, or dependency. When a breaking change occurs:

1. update the current example and its test;
2. update the expected result and surrounding explanation;
3. search for copied versions of the old example;
4. provide migration guidance if readers must change their code;
5. move the old example out of the main task path or label it **Deprecated**;
6. remove it when it no longer helps a supported migration.

Do not keep multiple versions merely because they exist. Keep them when readers still need them to migrate from a supported version, and give each version a clear support boundary.

## Keep equivalent examples equivalent

Multi-language examples should represent the same request, data, and outcome. Differences in naming and idiom are expected; differences in behaviour are not.

Review language tabs for:

- the same endpoint and HTTP method;
- the same required fields and values;
- the same authentication method;
- equivalent error handling;
- equivalent output or a clear explanation of a language-specific difference.

Prefer native, idiomatic code over mechanically translated code. A Python example should read like Python, and a Go example should follow Go conventions. Language guides are useful implementation references, but they do not replace the product documentation's task and audience requirements.

## Accessibility and responsive behaviour

Code must remain usable, not merely visible:

- use a real language identifier and a visible language label where tabs are used;
- preserve keyboard access for tabs, copy controls, and disclosures;
- provide an accessible name for icon-only copy buttons;
- allow horizontal scrolling instead of wrapping code into unreadable lines;
- do not encode meaning only through syntax colour;
- keep contrast high enough in both light and dark themes;
- ensure copied text does not include hidden labels, line numbers, or output unless intended.

A line-number gutter is presentation, not code. It must not be included in copied text.

## Maintain examples over time

Code samples go stale for the same reasons other documentation goes stale: a product changes, ownership is unclear, and nobody has a review trigger. Treat an important example as a maintained documentation asset, not as decoration around the prose.

### Give every important sample an owner

The documentation team owns presentation and reader experience. The product or engineering team owns technical correctness. Name both when the sample is important enough to be reused across pages.

| Field | Example |
|---|---|
| Sample owner | Developer Education |
| Technical reviewer | Payments Platform team |
| Source of truth | `examples/payments/create-payment.js` |
| Applies to | PayFlow API v2, Node.js 20+ |
| Verification | CI smoke test |
| Review trigger | API schema or SDK release |
| Next review | 2026-09-30 |

Do not assign ownership only to the person who wrote the sample. Writers can maintain the explanation and presentation while engineers confirm that the implementation still works.

### Keep one source of truth

If the same sample appears in a tutorial, a reference page, and a README, decide which copy is authoritative. Prefer generating or embedding repeated examples from a tested source file when the toolchain supports it. If that is not practical, link to the canonical example and give copied versions an explicit review owner.

Generated examples are not automatically correct. Review the generated output for task order, safe placeholders, error handling, and language idiom before publishing it.

### Define review triggers

Review a sample when any of these events occurs:

- the API contract, authentication, or required parameter changes;
- an SDK, language, runtime, or dependency version changes;
- a response schema or error code changes;
- the source example fails its test or a reader reports a failure;
- a security, privacy, or compliance requirement changes;
- the sample has passed its scheduled review date;
- ownership changes or the responsible team is reorganised.

Do not rely on a calendar review alone. A sample can become wrong the day after its review date; a product change is the stronger signal.

### Audit a representative sample set

An audit does not need to start with every code block on the site. Begin with the examples readers are most likely to copy:

1. List the top tasks, endpoints, and languages by usage or business importance.
2. Find every page that contains an example for those tasks.
3. Record the owner, source of truth, language, supported version, last test, and current status.
4. Run the sample from a clean environment, or record why it cannot be verified and keep it out of the main task path.
5. Classify the action as **Keep**, **Update**, **Merge**, or **Archive**.
6. Assign an owner and review trigger before closing the audit.

Use a small register rather than relying on memory:

| Sample | Owner | Last tested | Status | Action |
|---|---|---|---|---|
| Create a payment, Node.js | Payments Platform | 2026-08-12 | Accurate | Keep |
| Create a payment, Python | – | Unknown | Similar to Node.js sample | Update and assign owner |
| Legacy webhook handler | Integrations | 2024-02-10 | Uses retired signature scheme | Archive |

The point of the register is not administration for its own sake. It makes the next failure visible: an ownerless or untested example is a known risk, not a surprise discovered by a reader.

### Automate what machines can check

Use automation for repeatable checks and human review for meaning. Useful automated checks include:

- every fenced block has a supported language identifier;
- code blocks marked `copy` do not contain unresolved prompts or secrets;
- examples compile, lint, or execute in a sandbox;
- request examples match the current OpenAPI schema;
- links and referenced file paths still resolve;
- language tabs use the same endpoint, inputs, and expected outcome;
- samples display a supported runtime or API version;
- generated examples are reproducible from their source.

Automation should report the page, sample, and failure clearly. A failing check that only says `code sample invalid` creates another investigation for the writer.

### Record exceptions

Sometimes a sample cannot be executed in CI because it needs a paid service, a private environment, or an interactive device. Do not pretend automation ran it. Record the limitation, the manual test method, the owner, the verification date, and the next review date. If a person checks it successfully, mark it **Manually verified**. If nobody has checked it, mark it **Illustrative** and do not use it as the main user-facing path.

## Contributing changes

For a shared style guide or documentation repository, make the contribution path as clear as the authoring rules:

1. Open an issue describing the example, problem, and expected behaviour.
2. Identify whether the change affects correctness, safety, presentation, accessibility, or maintenance.
3. Update the canonical sample and its documentation together.
4. Run the relevant sample, lint, link, and rendering checks.
5. Ask the technical owner to review correctness and the documentation owner to review reader experience.
6. Record the verification method and update the sample metadata.
7. Merge and link the published change from the issue.

Useful issue types include **Broken example**, **Missing language**, **Accessibility problem**, **Security concern**, and **Style suggestion**. A contribution should leave the example easier to maintain, not only make the current page look better.

## Give readers a way to report a wrong sample

Even a tested sample can become wrong after a product release. Make reporting easy at the point where the problem is found. A reader should not have to work out which team owns the page or search for an email address.

Offer one clear route, such as **Report a problem with this example**, that opens a pre-filled issue or feedback form with:

- page URL and sample title;
- language, runtime, SDK, or API version if known;
- the steps that failed;
- the expected result;
- the actual result or error message;
- a safe way to share a minimal reproduction;
- an option to report a security issue privately instead of in a public tracker.

Do not ask readers to paste credentials, tokens, customer data, or private source code. The form should say this next to the fields, not bury it in a separate policy page.

### Triage reports by reader impact

Use a small set of priorities so the response matches the harm:

| Priority | Example | First action |
|---|---|---|
| Urgent | The sample exposes a secret, deletes data, or gives unsafe security advice | Remove or correct it immediately; notify the security or product owner |
| High | The documented path cannot work for a supported version or blocks a common task | Assign an owner and publish a correction as soon as possible |
| Normal | The sample works but is unclear, incomplete, or out of date | Add it to the next maintenance cycle |
| Low | Formatting, naming, or discoverability issue | Fix during the next related edit |

The person triaging the report does not need to be the person who fixes it. They do need to assign an owner, record the status, and tell the reporter what will happen next.

### Close the loop

A report is not finished when someone edits the page. Close it when the replacement sample has been checked and the record explains what changed:

1. Acknowledge the report and set its priority.
2. Reproduce the problem, or record why it cannot currently be reproduced.
3. Identify the technical owner and documentation owner.
4. Update the canonical example and every known copy of it.
5. Test the corrected sample in the supported environment.
6. Ask the reporter to verify the result when that is practical.
7. Link the fix to the report, release, or pull request.
8. Look for the same failure in related examples and add a prevention check if one is justified.

Tell the reporter when the fix is live. That small final step is what turns occasional feedback into trust and makes people more likely to report the next problem.

### Learn from repeated reports

Review feedback periodically for patterns rather than counting tickets alone. Repeated reports may point to:

- one outdated source file copied across many pages;
- a missing language or version label;
- an SDK change that is not triggering documentation review;
- a copy button that includes prompts or output;
- an example that needs a different task flow, not another comment.

Add a regression test, ownership rule, template change, or review trigger when the same class of problem appears more than once. The purpose of the feedback loop is not just to repair examples; it is to make the next repair less likely.

## Review checklist

Before publishing a code sample, check:

- [ ] The block has the correct language or format identifier.
- [ ] The visible label matches the language readers are using.
- [ ] The sample is the smallest complete path to the task.
- [ ] Replaceable values are clearly marked and safe.
- [ ] Required setup is documented before the sample.
- [ ] Comments explain constraints, not obvious syntax.
- [ ] Input, output, logs, and errors are separated and labelled.
- [ ] The expected result is shown and explained.
- [ ] The sample is copyable without prompts, line numbers, or prose.
- [ ] Any prompt-stripping behaviour is explicitly opted in.
- [ ] Long code is split or disclosed with a useful summary.
- [ ] Tabs contain equivalent, maintained examples.
- [ ] The example has been tested in a clean environment.
- [ ] The published status is **Verified** or **Manually verified**.
- [ ] The verification date and environment are recorded.
- [ ] Keyboard and narrow-screen behaviour has been checked.
- [ ] The owner and technical reviewer are known.
- [ ] The source of truth is identified.
- [ ] The supported language, runtime, and API version are recorded.
- [ ] Review triggers and the next review date are defined.
- [ ] Automated checks cover what can be tested reliably.
- [ ] Any manual-test limitation is labelled and recorded.
- [ ] Readers have a clear way to report a broken or misleading sample.
- [ ] The feedback route explains what information is safe to share.
- [ ] Reports have an owner, priority, status, and resolution record.
- [ ] Repeated failures are reviewed for a prevention change.

## References and further reading

This guide is an original house style informed by established documentation and language guidance:

- [Google developer documentation style: Code in text](https://developers.google.com/style/code-in-text)
- [Google developer documentation style: Code syntax](https://developers.google.com/style/code-syntax)
- [Microsoft Writing Style Guide: Code comments](https://learn.microsoft.com/en-us/style-guide/code-comments)
- [Python Enhancement Proposal 8](https://peps.python.org/pep-0008/)
- [The Rust Programming Language](https://doc.rust-lang.org/book/)
- [Effective Go](https://go.dev/doc/effective_go)
- [The Python Tutorial](https://docs.python.org/3/tutorial/)
