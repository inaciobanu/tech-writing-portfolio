---
id: template-sop
title: Sample SOP Template
description: "A sample standard operating procedure for adding a new site to the network, written to Google style guide conventions."
sidebar_label: Sample SOP
slug: /process-governance/template-sop
---

# SOP: Adding a New Site to the Network

I wrote this one the way I'd ideally do it: sit with the engineer who actually runs this procedure and write down what they do, rather than repeat what the old page claimed. In practice the two wouldn't fully match – more on that in [Finding and Fixing a Broken Process](./process-improvement).

**Owner:** Network Infrastructure (site provisioning) · **Backup owner:** Change Management lead
**Last reviewed:** 2026-06-15 · **Next review due:** 2026-09-15
**Status:** Active

This follows the standard SOP template from the [Governance Model](./governance) – Purpose, Scope, Owner, Last Reviewed, Prerequisites, Procedure, Rollback, Related pages, in that order, every time. Same layout on every runbook means nobody has to relearn the page structure just because they've moved to a different one.

## Purpose

This procedure provisions a new site – an office, data centre, or remote point of presence – onto the corporate network, from initial network allocation through to go-live and handover to operations.

## Scope

This procedure applies to physical sites that require WAN connectivity, a local network, and integration with existing monitoring and access control. It doesn't cover cloud-only or virtual-site deployments; see *Provisioning a Cloud Region* for that procedure.

## Prerequisites

- [ ] Site has an approved entry in **Projects & Change Log**, with a project sponsor named
- [ ] IP address allocation requested and approved by the addressing team
- [ ] Site has physical network hardware installed and powered (site build team, tracked separately)
- [ ] Change request raised and approved per the **Change Management Process**
- [ ] Access to the site's management VLAN confirmed

## Step-by-step procedure

1. **Confirm the IP allocation.** Check the addressing team's record and note the assigned subnets.

   **Caution:** Don't provision against a tentative or "nearly final" allocation. If the confirmed range differs, steps 2–4 have to be redone.

2. **Configure the site router.** Apply the standard config template (`site-router-base-config`). Update the hostname, management IP, and subnet declarations to match the allocation.

3. **Establish WAN connectivity.** Bring the WAN link up per the provider's activation instructions, then confirm it's passing traffic with a basic reachability test to the nearest core site.

4. **Configure routing.** Advertise the new site's routes into BGP, the WAN routing protocol in use (see *Architecture & Design → WAN Routing Overview*). Confirm propagation by checking the routing table on an adjacent core router.

5. **Enable monitoring.** Add the site's devices using the standard device template, then trigger a test alert to confirm it reaches the on-call channel.

   **Important:** Don't skip this step, even under time pressure. Missed monitoring has previously delayed incident detection on this site.

6. **Apply access control and firewall policy.** Apply the standard site ACL and perimeter firewall ruleset, restricting management access to approved jump hosts per **Naming Conventions and Access Standards**.

7. **Validate end-to-end.** From a test device on the new site, confirm all of the following:
   - Internet and internal application access work as expected.
   - The site appears correctly in the monitoring dashboard.
   - Management access via the jump host succeeds.

8. **Hand over to operations.** Update the site's entry in **Architecture & Design** with the final config summary and topology diagram, then notify operations via the standard handover checklist.

## Rollback steps

If validation fails and the issue can't be resolved within the change window:

1. Remove the site's routes from the WAN routing configuration.
2. Disable the site in monitoring, so it doesn't generate false alerts.
3. Revert the site router to its pre-provisioning state (factory config, powered but unconfigured).
4. Update the change request with the rollback reason and notify the project sponsor.
5. Log the failure and root cause in **Projects & Change Log**, so the retry starts with that context instead of repeating the same mistake.

## Related pages

- [Governance Model](./governance) – ownership and review policy for this page
- [Finding and Fixing a Broken Process](./process-improvement) – why site provisioning procedures need checking against what engineers actually do
- *Architecture & Design → WAN Routing Overview*
- *Policies & Governance → Naming Conventions and Access Standards*
- *SOPs / Runbooks → Change Management Process*
- *Troubleshooting & Knowledge Base → Common Site Provisioning Issues*
