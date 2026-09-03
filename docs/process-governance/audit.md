---
id: audit
title: Auditing an Existing Documentation Space
sidebar_label: Audit
slug: /process-governance/audit
---

# Auditing an Existing Documentation Space

Before I touched the structure, I needed to know what was actually in the space. Redesigning it without doing that first just moves the same mess into better-looking folders. I've done that the wrong way round before, on a smaller project, and had to go back and redo it.

## Where I started

83 pages, going back six years, no single owner across the whole space. A few things stood out fast.

Three separate pages walked through "how to add a new site," each written by a different engineer at a different point, and each one slightly wrong about something the others got right. The topology diagrams hadn't been touched since a data-centre migration two years earlier, and they were still linked from the space's homepage as if they were current. Nineteen pages had no owner listed at all – either the field was left blank, or the person who wrote them had since moved teams. And the procedure people actually followed for a couple of common tasks wasn't written down anywhere; it lived in a Slack channel and in two engineers' heads.

None of that is unusual for a space that's grown for six years without anyone responsible for its upkeep.

## How I went through it

I went page by page and sorted each one into Keep, Update, Merge, or Archive:

- **Keep** – the content was accurate and someone was already using it.
- **Update** – the topic still mattered but the detail was wrong or missing.
- **Merge** – two or three pages said the same thing, sometimes contradicting each other, and needed to become one page.
- **Archive** – the underlying system or process didn't exist anymore.

My first instinct was to delete the Archive pile outright – it was outdated, why keep it. That's not a call to make alone, though: from a compliance angle, some of that content needed to stay findable for audit purposes even once it stopped being current. So I moved it into a separate Archive space instead of deleting it: out of the way, but not gone. That's the version that made it into the final structure.

Two flags mattered more than the Keep/Update/Merge/Archive call itself: whether a page had a named owner, and whether it had ever been reviewed. A page can be Keep-worthy today and still be one departure away from going stale, if nobody's accountable for checking it.

## Tracking it

| Page | Owner | Last Updated | Status | Action |
|---|---|---|---|---|
| Adding a New Site (v1) | – (left the team) | Mar 2022 | Superseded by two other versions | Merge |
| Adding a New Site (v2) | – | Nov 2023 | Most current of the three | Merge (becomes the base page) |
| Site Topology Diagrams | – | Aug 2023 | Predates the DC migration | Update |
| Change Management Process | Owned, actively maintained | Jun 2026 | Accurate | Keep |
| VPN Setup (Legacy) | – | Jan 2021 | Decommissioned provider | Archive |
| Incident Response – Core Switch Failure | – | Feb 2024 | Correct steps, split across two pages | Merge |
| Naming Conventions | – | Unknown | No review date on record | Update |

## What came out of it

Two things fed directly into the next stage: a ranked list of what needed merging or updating before it went anywhere near the new structure, and a list of ownerless pages that became the starting point for [assigning ownership](./governance).

See [Redesigning the Space Structure](./structure) for what I built once the audit was done.
