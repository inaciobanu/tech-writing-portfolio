---
id: process-improvement
title: Finding and Fixing a Broken Process
description: "Why scheduled SOP reviews stopped happening in practice, and the workflow automation built to fix it."
sidebar_label: Process Improvement
slug: /process-governance/process-improvement
---

# Finding and Fixing a Broken Process

Governance on paper and governance in practice aren't the same thing. That gap shows up the moment you check how many of the quarterly SOP reviews defined in the [governance model](./governance) actually happened on schedule.

## Where this breaks down

Naming an owner and setting a review date doesn't hold up on its own, and the gap is a predictable one: the review date sits quietly on the page, with nothing pointing at it. Someone has to remember to check, for every page they own, on a schedule they'd have to track themselves – and almost nobody keeps that up by memory alone, me included. Owners get named, dates get set, and reviews still don't happen on schedule.

That's more of a process problem than a documentation one. The pages themselves are fine – it's the thing meant to keep them that way that's missing a trigger.

## Mapping it

I sketched out the state this tends to fall into, next to the shorter future state I'd want instead:

![Review-reminder process before and after: current state shows a review date set on a page, nothing checks it, the page goes overdue unnoticed, and it's found by chance or the next audit; future state shows a review date set on a page, a weekly automated check, the owner nudged two weeks before it's due, and a second nudge if it goes overdue](/img/process-governance-reminder-flow.svg)

Three of the four steps on the left involve nobody doing anything, which is usually the sign that a process is relying on a person's memory instead of a system.

## What I built

A small scheduled workflow – the kind of thing you'd put together in n8n or Tines rather than anything custom-coded – that reads the review-due date on every page in the space once a week, and posts a message to the owner directly when a page is within two weeks of its due date, with a second, more pointed message if it goes overdue. It's not sophisticated. It doesn't need to be. It just moves the trigger off a person's memory and onto a clock.

The same weekly check also looks up whether each owner's account is still active in the directory. If it isn't, the page gets flagged for reassignment straight away, instead of waiting on the standing [offboarding step](./governance) to catch it. That's the specific gap that left nineteen pages ownerless before any of this existed – someone leaves, the offboarding checklist gets missed or half-followed, and the page just sits there until the next audit finds it.

Overdue reviews dropped off within a month of turning it on. Not because anyone got better at remembering – because they stopped having to.

## The other half of this: Capturing what people actually do

The reminder fixed timing. It didn't fix accuracy, which is a separate problem I ran into while writing the [site provisioning SOP](./template-sop). Picturing what the on-call engineer would actually do, step by step, against what the written procedure said turned up three places where the two would diverge – the kind of detail a straight description-from-memory wouldn't catch. It's the reason I'd rather sit with someone during a real change and write down what happens than take a page at its word.

I'd apply the same method to the change log process: picture sitting with a PM and tracing two change requests end to end. That surfaces a step where ticket status was being copied manually into a page nobody downstream was actually reading, because it used to matter and the reason it mattered was long gone. I wrote up a shorter version of the process and a simple flowchart of the change lifecycle, and that step came out.

Neither of these looked like documentation problems on the surface – the symptom was "the page is wrong" or "nobody's doing what the page says." The actual problem, both times, was upstream in the process itself. That's the part of this work I find genuinely interesting: the writing is often the easy half.

## What's next

The reminder system was the first automation I put in, not the last one I'd want. Two more are on my list: nudging new-page authors toward the right template before a page goes live, instead of catching drift at the next review, and automatically drafting a Troubleshooting page from a closed ticket the moment something new gets resolved, so the write-up starts before anyone has to remember to do it. Neither is built yet – the reminder system got the time first because it was the most widespread problem.
