## 1. Implementation

- [x] 1.1 Implement `src/components/organisms/TeamReviewLoad/` (TeamReviewLoad + MemberLoadItem) so it consumes `TeamReviewLoadProps`, renders username/load bars/labels via atom components, and lists each member's pending PRs beneath the row
- [x] 1.2 Extend the data model with `PendingPullRequest` and `ReviewerOption`, wire an `onReviewerChange` callback, and add a dropdown-based reviewer picker plus fallback "PR を開く" buttons
- [x] 1.3 Ensure the UI surfaces reviewer candidates only when provided, clamps bar rates, and keeps layout responsive for long usernames/PR titles
- [x] 1.4 Add `src/components/organisms/TeamReviewLoad/TeamReviewLoad.stories.tsx` with (a) mock reviewer-change interactions and (b) a fallback story without the callback, along with Docs text describing the props/data flow
- [x] 1.5 Verify the component reuses atoms (Card, Button, DropdownMenu, Separator, etc.) instead of importing shadcn/ui primitives directly

## 2. Validation

- [x] 2.1 Run `pnpm lint` (and tests if applicable) to cover new files; note/resolve any issues related to this change set _(fails only due to pre-existing warnings in `src/mocks/data/schedule.ts`, `src/app/globals.css`, and `src/components/organisms/SearchHeader/SearchHeader.tsx`)_
- [x] 2.2 Run `openspec validate add-team-review-load-option --strict` and address any issues
