## 1. Implementation

- [x] 1.1 Define the `PullRequestInfo` type and component props so GitHub data is injected from callers rather than fetched internally.
- [x] 1.2 Build the `PullRequestReviewOption` component using existing button/badge/popover primitives to render the bell icon, count badge, and dropdown list with title prefix, PR link, author, and urgency chip.
- [x] 1.3 Implement empty-state copy, keyboard focus handling, and aria labels so the widget is accessible when no PRs are pending.
- [x] 1.4 Add Storybook stories (default, urgent, empty) with mocked data and controls for designers to validate the component.
- [x] 1.5 Add tests or Storybook interaction checks that assert the badge count, list rendering, and GitHub links to guard future regressions.
