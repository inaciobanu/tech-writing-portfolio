# Building the Space in Confluence

> How I built a governed Confluence documentation space for a fictional network infrastructure team: the structure, the ownership and review model, what is automated, and what I learned.

# Building the space in Confluence

The case study so far describes a method: [audit](./audit) a documentation space, redesign its
[structure](./structure), and put an [ownership and review model](./governance) behind it so it does not decay again.
This page shows the other half, which is what that looks like built in Confluence, and where it stops being a design
and becomes something that runs. In the DMAIC terms from the [overview](./intro), it is the Control phase made
concrete: the parts that stop the space decaying again.

The space is a representative demo for a fictional network infrastructure team. Every site, circuit, name and
incident in it is invented, and it uses no real employer's information.

## Who lands on a documentation space, and why

I started from the question the [structure page](./structure) asks: what is someone trying to do in the two minutes after they land?
The answers are more varied than "search" and "write a page". Someone is fixing an outage. Someone is following a
routine procedure. Someone is looking up a site or a contact. Someone is new. Someone wants to know whether a page can
be trusted, or who owns it. Someone has found a mistake.

So the landing page is a single table, "I want to … / Start here", with one row for each intent. The urgent rows come
first and are shaded, and the row for writing or updating a page links to step-by-step instructions. The last row
links to a short guide on reporting a mistake, so that a report reaches the page owner and not a dead end.

![Landing page of the Confluence demo space: a table headed "What do you need?" with one row for each thing a visitor might want to do, such as fixing something that is broken, doing a routine task, or writing a new page, each linking to the right section; the two most urgent rows are shaded red](/img/confluence-landing-page.gif)

Below the table, the space map shows the whole structure at a glance. The blue sections are the core structure from the
earlier case study. The green ones I added for this role: incident and change as their own sections, automation,
processes, the document register and the archive.

![Space map: twelve linked sections in three rows of four, coloured blue for the core structure and green for sections added for this role, with a row of four cross-cutting standards underneath: a named owner, a review-due date, consistent templates, and labels for filtering](/img/confluence-space-map.gif)

## Five decisions, and why

### 1. Organise by what people are doing, not by who wrote it

Incident response and change management each got their own section, because the person who needs a runbook is
under pressure and should not have to browse. Architecture is kept apart from procedures, because the two are read in
very different moments.

That is also where the diagrams live. The logical topology rebuilds the architecture diagram from the
[structure page](./structure) as an editable table, so anyone on the team can update it without a drawing tool. It has
a title, a legend, a one-sentence caption and a last-updated date, and it uses the same site codes as the connectivity
register, so the two cannot disagree.

The two pages differ in one detail, on purpose. The structure page describes the replication link as a single dedicated
circuit, which is how the demo's network was first built. In the demo's worked examples, an incident shows that one
circuit is a single point of failure, and a second circuit from a different carrier is added. So the topology now draws
one logical link that is really two circuits, and the single dashed link in the structure page's diagram is the same
link at a higher level.

![Logical topology page: three exchange boxes feed a primary, active colo, which is joined by a failover link to a standby disaster recovery colo; below them a firewall labelled monitoring and change access only leads to a segmented corporate network with no direct path to production, and a colour legend sits underneath](/img/confluence-topology.gif)

### 2. Every page has an owner, a backup owner and a status

The table at the top of each page records the owner, a backup owner on operational pages, the status, the system and
the next review date. A page should never be more than one departure away from being ownerless. This was the failure
the [audit](./audit) found, with nineteen of the 83 pages ownerless, so the fix lives on the page itself, not in a
spreadsheet nobody opens.

The [ownership model](./governance) says every page has a backup. In the demo I narrowed that to operational pages,
such as procedures, runbooks and designs, because a backup on a set of meeting notes is more upkeep than it is worth.

![Properties table at the top of a procedure page showing owner, backup owner, steward, status In review, system and next review date, above a note saying the page is a sample](/img/confluence-page-properties.gif)

A document register then pulls those properties into one table, so a manager can see every page with its owner, status, system and next review date in one place without opening anything. Template pages are left out, because they are not real documents.

![Document register table listing each page title with its owner, a coloured status badge, its system and its next review date](/img/confluence-document-register.gif)

### 3. Two separate reviews, each recorded

Operational pages pass two reviews by two different people before they are Current. The author runs a **style check**,
and an engineer who did not write the page does the **technical review**. They are separate because the person who
spots a warning in the wrong place is rarely the person who knows whether a value is correct. Each review is recorded
in the page's properties, and the engineer leaves a comment with their name and the date.

This is the accuracy half of the problem on the [process improvement page](./process-improvement). The review reminder
fixed timing, so reviews happen. It did not fix whether a page is right, and the technical review is there for
that. It also extends the lifecycle on the [governance page](./governance), which has seven steps: the demo adds a
style check before the subject-matter expert's review, so that step becomes the technical review.

A row in a table is a record, not a lock. Confluence on its own cannot stop a page being published without both reviews.
Enforcing it needs approvals, where a plan includes them, or an app that adds a workflow. So the space reports on
exceptions instead, and the policy says so plainly.

![Table showing the eight steps a page passes through: author, style check, technical review by a subject-matter expert, owner, approver, published, periodic review, and update or retire, with the status shown under each step](/img/confluence-publishing-path.gif)

### 4. Templates with worked examples

There are six templates. Three are the ones the [governance page](./governance) describes: the [SOP](./template-sop),
an architecture document and meeting notes. The others are a change request, a post-incident review and a project
closure. Each one links to a completed example. The examples tell one connected story, so people see how the
pages relate: an incident leads to a planning meeting, then a project, a change request and an updated design.
Template panels use a short numbered list, because the order matters and a numbered list is easier to follow while
switching between two pages.

### 5. Rules first, AI second, a person last

Anything with a yes-or-no answer, such as a missing owner or an overdue review, should be a rule. The monthly
reminder on the [process improvement page](./process-improvement) is the first example: a clock doing the remembering,
not a person. AI is for judgement
checks a rule cannot make, and it works as suggestions only. A person decides whether something is technically correct.

![Summary table of four documentation automations with status badges: the monthly review reminder is live, the style check is manual today and designed as an agent, drafting from a source is proposed for later, and a related-pages check is an untested idea](/img/confluence-automation-approach.gif)

## What is live, and what is only designed

| Item | Status |
|---|---|
| Monthly review reminder, emailing each owner a linked list of pages due for review | Live, as a Confluence Automation rule. The rule, its audit log and the email it sends are shown on [Finding and fixing a broken process](./process-improvement). |
| The three automations that page lists as next: a two-stage nudge with a directory check, a template prompt for new pages, and a draft Troubleshooting page from a closed ticket | Not built, as that page says. |
| Style check, using a documentation style reviewer | Manual: I run it with Claude on request. |
| The same check as an agent that runs from the page | Designed, not built. |
| The style reviewer's instructions, kept on a page in the space so they are visible and versioned | Written. The agent they are meant for is not built, and the instructions are untested in an agent. |
| Drafting a page from a named source, with unknowns marked | Proposed for later. |
| A document register that lists every page with its owner, status, system and next review date | Built, and the columns display. |

The style check, the agent design and the drafting idea are additions since the process improvement page was written.
That page's three "what's next" automations are still unbuilt.

## How I used AI

I used Claude to help build the space and to review pages against my style guide. I made the structural and
governance decisions and checked what it produced. The rule I built the process around is that AI never decides what
is technically correct. It must not change a command, a value, a threshold, a name, a number or the order of steps, and
anything it cannot confirm becomes a question for the engineer, marked `[TO CONFIRM: …]`.

## What I would do first on a real team

1. Read the existing space and talk to the people who use it, before touching anything.
2. Audit every page: keep, update, merge or archive, and flag the ones nobody owns.
3. Fix the pages used during incidents first.
4. Agree the structure, templates and ownership model with the team, then migrate in batches.
5. Put the review reminder in place before the first review date arrives, as described on the
   [process improvement page](./process-improvement).

## Things I learned

- Placeholder text in a template shows only while someone is editing, so a template page looks bare when viewed.
  Say so in the instructions, and link a worked example.
- A copied template keeps its default values. If the template says Current, every copy looks reviewed, so default the
  review rows to Not done.
- A report that lists pages by their properties reads only pages that use the right macro, and template pages need
  excluding from it.
- Free-tier automation limits shaped the design. The [process improvement page](./process-improvement) explains why the
  review reminder runs monthly with one flag.
- Look at the pages in a browser, and give them a moment to finish loading. A page can look right in its source and
  wrong when rendered, and a report macro can look empty for a second before it fills in.
