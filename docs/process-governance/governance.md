---
id: governance
title: Governance Model
sidebar_label: Governance
slug: /process-governance/governance
---

# Governance Model

A new structure doesn't stay new by itself. Something has to stop the space sliding back into the state the [audit](./audit) found it in. That's what this page is: who owns what, how often it gets checked, and what happens when an owner leaves.

## Ownership

Every page has a named owner and a backup, both visible on the page itself, not buried in a separate spreadsheet nobody opens. The owner is accountable for accuracy and does the review when it comes due. The backup covers it if the owner is out, moves teams, or leaves – a page should never be more than one departure away from going ownerless again, which is exactly what happened to nineteen pages before this.

Reassigning pages is now a standing step in offboarding, not something left for the next audit to catch. That step doesn't always get followed, though, so it has a backstop: the [review-reminder workflow](./process-improvement) also checks whether an owner's account is still active and flags the page directly if it isn't.

## Review cycles

Not every page carries the same risk if it goes stale, so the cycle is tiered instead of one rule applied everywhere:

| Page type | Cycle | Why |
|---|---|---|
| SOPs / Runbooks | Quarterly | Highest traffic, and the ones people rely on under time pressure |
| Architecture & Design | Quarterly | Goes stale the moment the network changes |
| Policies & Governance | Annually | Changes rarely, but still worth confirming |
| Onboarding & Training | Annually | Stable, checked yearly for drifted terminology |
| Troubleshooting & Knowledge Base | As needed | Updated when a new issue gets resolved, not on a fixed clock |

A review usually just means the owner confirms the page is still right and updates the date. It doesn't have to mean a rewrite.

Appointing an owner and setting a date helps, but on its own it's not quite enough – neither one necessarily prompts anyone to look. What closes that gap is a separate story – see [Finding and Fixing a Broken Process](./process-improvement).

## Naming and templates

Pages follow `[Category] - [Topic] - [Status]` – `SOP - Adding a New Site - Active`, for example. When something's superseded, its status changes to Archived and it moves to the Archive space rather than being deleted, keeping the audit trail intact without cluttering search.

Three templates cover most of the space: the SOP template shown in [Sample SOP Template](./template-sop), an architecture doc template (system overview, current topology, design rationale, dependencies, change history), and a meeting notes template (attendees, decisions, action items with named owners, linked back to the project they relate to). Same template, same page type, every time – a reader who's learned to navigate one SOP can navigate all of them without relearning the layout.

There's a short style standard sitting behind all of it, too, loosely built on Google's developer documentation style guide: plain language over jargon, active voice, present tense, second person for anything the reader has to do, and numbered steps for anything sequential. Warnings go in a labelled Caution or Important line, not buried in a paragraph. Any term that isn't obvious gets one entry in the Onboarding & Training glossary instead of being re-explained inline on every page that uses it.

## Working across teams

None of this holds up if it's designed in isolation. Ideally, the review cadence for SOPs gets checked against the change management lead directly, to confirm it matches how often the underlying process actually changes. The naming convention would go through review rounds with security too, since they're the ones who need to tell policy pages from procedure pages at a glance for their own audit purposes. And the [site provisioning SOP](./template-sop) only holds up if it reflects what the engineer running it actually does day to day, not just what the previous version of the page claimed – which is why I'd want to sit down with them directly rather than take the page at its word.

## Beyond one team

Nothing here is specific to networking. The ownership model, review cadence, and templates would transfer to another team's space directly – only the section topics in [Redesigning the Space Structure](./structure) would need to change. A shared template library, held centrally rather than reinvented per team, means other teams adopting this doesn't mean everyone designing their own version from scratch. And running the audit again a year later is a direct way to check whether any of it held: fewer ownerless pages and fewer overdue reviews than last time means it worked.
