---
id: roadmap
title: Roadmap
description: "The order I would work in on a real team, week by week, with a baseline survey."
sidebar_label: Roadmap
slug: /process-governance/roadmap
---

# Roadmap: The first 30 days

The other pages in this section show the method on a fictional team. This page is the order I would work in on a real one, and the points where I would expect a real team to change the plan.

:::note
This is a plan, not a result. I haven't run it on a live team, and I would adjust it after the first week.
:::

Three rules shape it. I listen before I change anything. I fix pages in order of risk, not in order of age. And I take a baseline on day one, so that any improvement can be shown later.

## Week 1: Listen and take a baseline

- Meet the engineers, the project managers, and whoever asked for the work. Ask what they open, what they distrust, and what they ask a colleague instead of reading.
- Send the [baseline survey](#the-baseline-survey) below, and hold short [interviews](#the-interview-questions) with subject-matter experts and project managers. The survey is what I repeat later.
- Find out what the Confluence plan allows (analytics, archiving, automation) and who approves changes. The design depends on this.
- Read the space analytics and run the searches a new starter would try. I've written more about [what Confluence analytics tells you, and what to do about it](https://medium.com/@ina_ciobanu/confluence-analytics-what-the-data-tells-you-and-what-to-do-about-it-8573b6d59c5e).

**Output:** a one-page findings note and the baseline.

## Week 2: Triage by risk

- Don't try to audit every page at once. Start with the most-read pages and the ones that matter during an incident or a change, and sample the rest.
- Score them with the seven risk dimensions in the [audit method](audit.md), record them in a tracking table like the one on that page, and decide whether each page is kept, updated, merged, or archived. Archive only when the owner agrees.
- A page with few views can still be the one that matters on a bad day, so views inform the order but don't decide it.

**Output:** a ranked list, with the first 10 to 15 pages chosen.

## Week 3: Agree the structure and the rules

- Show a proposed [structure](structure.md) to a few engineers before building it.
- Take the [ownership and review model](governance.md) as a starting point, then adjust the review cycles and the approval step to how the team already handles change.
- Agree naming, templates and style, starting with the [SOP template](template-sop.md).

**Output:** a structure and standards that the head of the team has approved.

## Week 4: Fix, map, and measure

- Rewrite the priority pages with an engineer reviewing each one, using the templates and the two reviews described in the [Confluence build](confluence-build.md).
- As in [Finding and Fixing a Broken Process](process-improvement.md), map one process that causes friction from start to finish with the people who run it. Propose one change.
- Set up the document register and the review reminder.
- Repeat the analytics check, and read the survey results again against the baseline in a later round.

**Output:** a 30-day report covering what changed, what's still open and what comes next.

## The baseline survey

The survey is short, anonymous, and takes about five minutes. I would send it in the first week, before I change anything, and send the same questions again after six months and after a year. The wording must not change between rounds, or the answers can't be compared.

| # | Question | Answer |
|---|---|---|
| 1 | The last time you needed a procedure, how long did it take to find? | Under 2 minutes, 2 to 10, 10 to 30, over 30, or I gave up |
| 2 | I trust the pages I use to be correct and current. | 1 (disagree) to 5 (agree) |
| 3 | I know who owns the pages I rely on. | 1 to 5 |
| 4 | When I can't find an answer, I ask a colleague or search chat or tickets instead. | Never, sometimes, often, always |
| 5 | I use the documentation during incidents and changes. | Never, sometimes, often, always |
| 6 | I know how to report a mistake in a page, and I would. | 1 to 5 |
| 7 | Which page or topic do you most wish were fixed, or existed? | Free text |
| 8 | What would make you use the documentation more? | Free text |

With a small team, I would report counts rather than percentages, and I would not treat a movement of one or two people as a trend. The survey shows how the team feels, so I would read it next to the harder measures on the Confluence build page: pages past their review date, and pages with both reviews done.

## The interview questions

I would hold a 30-minute interview with each engineer and project manager I can reach, and ask for recent examples, not opinions. I would write down the answers so that they can be compared across people.

1. Walk me through the last time you needed documentation for your work. What did you open first?
2. Tell me about a page that let you down. What happened?
3. What do you know that isn't written down anywhere, and who else knows it?
4. If a page were wrong during an incident or a change, which one would hurt most?
5. Who should own the pages in your area, and who can confirm they're technically correct?
6. What would make reviewing a page worth 15 minutes of your time?

For project managers I would add one more: where does work wait, or get passed back and forth? The answer feeds the process map in week 4.

## What I would not do in the first month

- Rewrite the whole space.
- Delete pages.
- Build automation before the team has agreed the ownership and review policy. Policy first, automation second.

## After the first month

The following months would migrate the remaining pages in batches, run the monthly analytics check, and start tracking the four measures on the [Confluence build](confluence-build.md) page, none of which is measured yet.

## Ideas for later

These go beyond the documentation itself. I would not start them in the first month, and some belong to the team rather than to me, so I would raise them once the basics are working.

- **Capturing knowledge that's only in people's heads.** I would interview the people who hold it, set up a handover routine for when someone leaves, and record what a departing engineer knows before they go. Question 3 in the interviews above starts this.
- **Feeding lessons back into the docs.** After each incident or change, the post-incident review should trigger an update to the relevant runbook. That keeps the docs tied to what happens in practice.
- **A champions network.** One person per sub-team who helps keep their pages current. It should spread the work beyond one author, and it gives the review step someone to rely on when engineers can't make the time.
- **A feedback route that people actually use.** A visible "report a mistake" link, a named person who answers, and a count of how many reports were handled. In my analytics check on the demo space, the guide for reporting a mistake had no views, and there were no comments.
- **Adoption and communication.** Short announcements, a short walkthrough for new starters, and an onboarding path through the key pages. A well-organised space still fails if nobody knows it changed.
- **Findability beyond structure.** Metadata, labels and search tuning, so that people find pages by the words they type. In the demo space I used descriptive titles and applied [topic labels](confluence-build.md#6-topic-labels-separate-from-status) to most pages. Search tuning is still to do.
- **Preparing content for AI assistants.** Clean, current, owned pages, with sensitive content kept separate, so that an assistant can answer only from pages the team has reviewed. It's the same principle as on the [Confluence build](confluence-build.md) page: AI suggests, and a person decides.
- **Retiring knowledge.** Archive rules, and a periodic check that old content is still needed. As in the [audit](audit.md), I would archive rather than delete.
