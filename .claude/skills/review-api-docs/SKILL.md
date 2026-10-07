---
name: review-api-docs
description: Review one documentation page against docs-workflow/standards.md and its matching template. Use when a contributor wants a judgement review of a draft before opening a pull request.
---

# Review API docs

Review one page. Read the page, `docs-workflow/standards.md`, and the template in `docs-workflow/templates/` that matches the page's type. Do not edit the page. Where `standards.md` says nothing, judge against the Google developer documentation style guide, then the Microsoft Writing Style Guide.

## Scope

Check only what needs judgement. **Do not check spelling, dashes, links or terminology.** Vale and CI check those, and repeating them here adds noise.

## Output

Give a checklist. Mark each item PASS or FAIL. For every FAIL, quote the exact line (with its line number) and give a suggested fix. For a PASS, give one line of reason.

1. **Correct page type.** Does the content match the type it claims, and does it follow the matching template?
2. **One purpose per page.** Does the page do one job, or does it mix, for example, steps with explanation?
3. **Clear scope.** Does the opening say who the page is for and what it covers?
4. **Padding or hedging.** Are there sentences that add no information, or vague wording such as "might" or "usually" where a fact is known?
5. **Unsupported claims.** Is every claim about the API supported by `openapi/payflow.yaml` or the code? Quote any that are not.
6. **Unresolved markers.** Does the page still contain `[TO CONFIRM: ...]`? List each one.

## Verdict

End with one line: either "Verdict: ready for technical review" or "Verdict: not ready – N items to fix".
