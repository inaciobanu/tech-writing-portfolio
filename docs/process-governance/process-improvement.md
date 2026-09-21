---
id: process-improvement
title: Finding and Fixing a Broken Process
description: "Why scheduled SOP reviews stopped happening in practice, and the workflow automation built to fix it."
sidebar_label: Process Improvement
slug: /process-governance/process-improvement
---

# Finding and fixing a broken process

Ownership on paper and ownership in practice aren't the same thing. That gap shows up the moment you check how many of the quarterly SOP reviews defined in the [ownership and review model](./governance) actually happened on schedule.

## Where this breaks down

Naming an owner and setting a review date doesn't hold up on its own, and the gap is a predictable one: the review date sits on the page, with nothing pointing at it. Someone has to remember to check, for every page they own, on a schedule they'd have to track themselves – and almost nobody keeps that up by memory alone, me included. Owners get named, dates get set, and reviews still don't happen on schedule.

That's more of a process problem than a documentation one. The pages themselves are fine – it's the thing meant to keep them that way that's missing a trigger.

## Mapping it

I sketched out the state this tends to fall into, next to the shorter state I wanted instead:

![Review-reminder process before and after: current state shows a review date set on a page, nothing checks it, the page goes overdue unnoticed, and it's found by chance or the next audit; target state shows a review date set on a page, a scheduled automated check, and the owner nudged directly once a page is overdue](/img/process-governance-reminder-flow.svg)

Three of the four steps on the left involve nobody doing anything, which is usually the sign that a process is relying on a person's memory instead of a system.

## What I built

I built it as a rule in Confluence's own Automation rather than reaching for a separate tool – the space already lived there, and it kept the whole thing on one platform instead of adding an integration to maintain. The rule branches over each page in the space, checks whether it's past its review date and has an owner's email on record, and sends that owner a flagged email directly:

![Confluence Automation rule canvas: a scheduled trigger runs monthly, branches for each inactive page, checks the page author's email address is not empty, then sends a customised review email to the owner](/img/process-improvement/confluence-automation-canvas.png)

It's not sophisticated. It doesn't need to be. It just moves the trigger off a person's memory and onto a clock.

One real constraint shaped the current version: the free Automation tier caps a space at around ten rule-runs a month, so this runs monthly rather than weekly, and it's a single flag rather than the two-stage early-warning-then-overdue nudge in the sketch above. Here's it firing end to end – the scheduled trigger, the branch over inactive pages, the smart-value check, and the send, each step confirmed:

![Confluence Automation audit log, expanded: Scheduled, Branch flow for each inactive page, Advanced branching, smart values condition, and Send customised email, all marked successful](/img/process-improvement/confluence-automation-audit-trail.jpg)

And here's what actually landed in the owner's inbox – ten pages that hadn't been touched in a while, each one linked directly with its review status and last-updated date, rather than making the owner go hunting for it:

![Email titled "For review: These pages may need updating", sent from Confluence automation, listing ten pages with their review status (review due or published) and last-updated date, each linked directly](/img/process-improvement/confluence-automation-email.png)

The second nudge and the directory active-account check from the original sketch aren't in this version – they'd need either a paid Automation tier with a higher run quota, or moving the logic to a general-purpose tool like n8n or Tines that isn't capped by page-count the way Confluence's own automation is. That's the honest gap between what I mapped and what I shipped first: I built the smallest version that proved the mechanism, not the full design.

## The other half of this: Capturing what people actually do

The reminder fixed timing. It didn't fix accuracy, which is a separate problem I ran into while writing the [site provisioning SOP](./template-sop). Picturing what the on-call engineer would actually do, step by step, against what the written procedure said turned up three places where the two would diverge – the kind of detail a straight description-from-memory wouldn't catch. It's the reason I'd rather sit with someone during a real change and write down what happens than take a page at its word.

I'd apply the same method to the change log process: picture sitting with a PM and tracing two change requests end to end. That surfaces a step where ticket status was being copied manually into a page nobody downstream was actually reading, because it used to matter and the reason it mattered was long gone. I wrote up a shorter version of the process and a simple flowchart of the change lifecycle, and that step came out.

Neither of these looked like documentation problems on the surface – the symptom was "the page is wrong" or "nobody's doing what the page says." The actual problem, both times, was upstream in the process itself. That's the part of this work I find genuinely interesting: the writing is often the easy half.

## What's next

The reminder rule was the first automation I put in, not the last one I'd want. Three more are on my list: extending the reminder itself to a two-stage nudge with a directory active-account check once it's on a tier with room for weekly runs; nudging new-page authors toward the right template before a page goes live, instead of catching drift at the next review; and automatically drafting a Troubleshooting page from a closed ticket the moment something new gets resolved, so the write-up starts before anyone has to remember to do it. None of the three are built yet – the reminder rule got the time first because it was the most widespread problem.
