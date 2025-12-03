## Why

Engineers using the option-based calendar cannot currently see how many assigned GitHub PRs are waiting for their review. This forces them to leave the app context and slows their response time, undermining the value of the option feature set.

## What Changes

- Add a props-driven `PullRequestReviewOption` UI component that surfaces a bell icon with a pending-review badge and a popover listing each assigned PR with metadata and GitHub links.
- Showcase the component in Storybook with mocked GitHub responses, covering default, urgent, and empty states for designers and reviewers.
- Capture the new option capability in the `github-pr-review-option` spec so future work aligns with the contract.

## Impact

- Affected specs: github-pr-review-option
- Affected code: src/components/organisms (new option component), src/stories (storybook entry)
