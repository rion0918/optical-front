# team-review-load Specification

## Purpose

Provide an optional review-load visualization that surfaces each team member's pending GitHub PR review count, load level, contextual label, and the concrete PRs that need attention so teams can spot overloaded reviewers and act immediately.

## ADDED Requirements

### Requirement: Team review load summary

The system SHALL render a `TeamReviewLoad` component that accepts `TeamReviewLoadProps` (see data model) and displays one row per `MemberReviewLoad` entry consisting of the GitHub username, a color-coded load bar, the review count, the optional level label (e.g., "高負荷" or "空きあり"), and any pending PRs for that member. Every `MemberReviewLoad` SHALL support zero or more `PendingPullRequest` entries that carry the PR title, repository, number, GitHub URL, and a list of reviewer candidates. The PR list MUST be collapsed by default and provide a clear toggle so that users can focus on the load bar first and expand the PR details only when needed. The component SHALL rely on existing atoms (e.g., Card, Button, DropdownMenu, Separator) rather than importing the raw shadcn/ui primitives directly.

#### Scenario: Visualizing multiple load levels

- **GIVEN** the component receives three members with `loadLevel` values `high`, `medium`, and `low`, `barRate` values 1.0, 0.6, and 0.2, and the optional `levelLabel` text for the high and low members
- **WHEN** the component renders
- **THEN** the username is displayed as `@username`, the load bar reflects `barRate` data, the bar color is red for `high`, yellow for `medium`, and green for `low`, and the review count (e.g., "5 件") plus label (if present) appear next to the bar
- **AND** layout follows the documented pattern (username → load bar → count → label) with consistent spacing between rows

#### Scenario: Listing pending PRs

- **GIVEN** a member row includes two `PendingPullRequest` entries
- **WHEN** the component renders
- **THEN** each PR appears under the member row with its title, `repo#number`, and affordances to change the reviewer or open the PR on GitHub

#### Scenario: Synchronizing review counts

- **GIVEN** `pendingPullRequests` are provided for a member
- **WHEN** the row displays the review count and the "PR 一覧" toggle
- **THEN** both counts SHALL reflect the number of listed PRs so that the summary text (例: `5件`) and the toggle label match, preventing cases where the row claims five pending PRs while only two cards render

#### Scenario: Toggling PR visibility

- **GIVEN** a member has pending PRs
- **WHEN** the user clicks the "PR 一覧" toggle button
- **THEN** the list of PR cards expands underneath the load row
- **AND** clicking the toggle again collapses the list so that only the load metrics remain visible

### Requirement: Reviewer reassignment controls

`TeamReviewLoad` SHALL expose an optional `onReviewerChange` callback. When provided, each `PendingPullRequest` MUST show a "レビュアー変更" trigger that opens a candidate list sourced from `PendingPullRequest.reviewerOptions`. Selecting a candidate SHALL invoke `onReviewerChange` with `{ memberUsername, pullRequestId, reviewer }` and close the menu without the component issuing HTTP requests. When a PR has zero candidates or `onReviewerChange` is omitted, the UI SHALL replace the trigger with a "PR を開く" button that links to the PR URL so users can complete the action directly in GitHub.

#### Scenario: Changing reviewer from the dashboard

- **GIVEN** the parent passes `onReviewerChange` and a PR exposes reviewer options
- **WHEN** the user opens the menu and selects a candidate
- **THEN** the callback receives that member username, the PR identifier, and the selected reviewer payload
- **AND** the UI closes the menu and optionally shows a lightweight confirmation state without performing API calls itself

#### Scenario: Fallback to GitHub link

- **GIVEN** no reviewer options exist or `onReviewerChange` is undefined
- **WHEN** the PR list renders
- **THEN** the component shows a secondary "PR を開く" button that navigates to the provided `url`

### Requirement: Review load Storybook preview

The team review load visualization SHALL be documented and previewed in Storybook under `src/components/organisms/TeamReviewLoad/TeamReviewLoad.stories.tsx`. Storybook shall include at least: (1) a primary story using the mock dataset (高負荷/中負荷/空きあり) with pending PR rows and a mocked `onReviewerChange` handler, and (2) a fallback story where the handler is omitted so designers can see the "PR を開く" pathway. The Docs tab SHALL describe the `MemberReviewLoad`, `PendingPullRequest`, and `ReviewerOption` shapes and reiterate that GitHub API calls and reviewer availability logic live outside the component.

#### Scenario: Designer inspects story

- **GIVEN** Storybook is running
- **WHEN** a reviewer opens the `TeamReviewLoad` stories
- **THEN** they can switch between the handler-enabled and fallback states, tweak args for member/pr data, and read documentation about the props and callbacks
- **AND** no real GitHub requests are made because the stories use mocked data and console log the callback payload
