---
id: structure
title: Redesigning the Space Structure
description: "Redesigning a documentation space's information architecture around what its user groups actually need to find."
sidebar_label: Structure
slug: /process-governance/structure
---

# Redesigning the Space Structure

The old space grew by whoever needed a page adding one wherever seemed convenient that day. There was no model of what belonged where. Before drawing a new one, I asked a more basic question: who actually opens this space, and what are they trying to do in the two minutes after they land on it?

## Who's using it

**Network engineers** use it day to day, looking up a procedure or checking a standard. **New starters** use it to build a mental model of the network in their first few weeks, and they don't yet know what they don't know. **Security, compliance, and project stakeholders** check policy and status, not procedure. And **on-call engineers** during an incident need to find the right runbook in under a minute, because that's the one moment where slow documentation actually costs the business money, not just someone's patience.

## What I tried first

A couple of structures crossed my mind before I landed on this one, and neither survived scrutiny.

The first was organizing by audience instead of by content type – a section for engineers, one for new starters, one for stakeholders. It lines up neatly with who's actually using the space, but sketching it out further showed the problem: the same content ends up needing to live in two places at once. A stakeholder reading a postmortem still needs the incident SOP; a new starter still needs the architecture overview in their first week. Organizing by audience just meant duplicating pages or cross-linking constantly, which moves the maintenance problem around instead of solving it.

The second got further before it fell over. I kept architecture and operational runbooks in the same section, on the logic that they're both "how the network works." It held up until I actually pictured using it during an incident: nobody wants to scroll past design rationale to find the steps they need when something's down. That's the moment slow documentation gets expensive, not just annoying. I split them before it ever went out for review.

## The structure I landed on

1. **Home** – one entry point, with a short "if you're looking for" index pointing at the most common searches
2. **Architecture & Design** – topology, connectivity, the reasoning behind design decisions
3. **SOPs / Runbooks** – change management, incident response, the procedures people run under time pressure
4. **Policies & Governance** – security policy, naming conventions, documentation standards
5. **Onboarding & Training** – a new starter checklist and a glossary, so orientation has one home instead of being scattered across everything else
6. **Projects & Change Log** – active projects and a historical record of what changed and why
7. **Troubleshooting & Knowledge Base** – diagnostic content ("why is this happening"), which is a different kind of page from a runbook ("what do I do")

As a site map, it's flat on purpose – nothing buried more than one click below its section, and the same baseline standards apply underneath every section regardless of topic:

![Confluence space structure: Home, Architecture, SOPs, and Policies in the top row; Onboarding, Projects, and Troubleshoot in the second row; a cross-cutting standards panel underneath listing named owner per page, review-due date shown, consistent templates, and labels for filtering](/img/process-governance-structure.svg)

## Why it holds up

The split between architecture and runbooks is the one decision I'd point to first if someone asked why this structure and not another. Everything else follows roughly the same logic: put content where the person who needs it fastest will look first, without making the other three audiences pay much of a price for it.

See [Sample SOP Template](./template-sop) for what one of the standardised pages actually looks like, and [Governance Model](./governance) for how ownership gets enforced once the redesign is finished and nobody's paying close attention anymore.
