## Why

The calendar app needs an optional dashboard widget that surfaces each team member's GitHub review load so engineers can spot bottlenecks before they create downstream delays.

## What Changes

- Add a new capability for rendering a team review load section that takes externally computed load data and renders usernames, counts, colored bars, and labels.
- Provide a Storybook preview that demonstrates the UI with representative mock data and explains how to feed props to the component.

## Impact

- Affected specs: team-review-load (new capability for the optional feature)
- Affected code: `components/team-review-load/` (new components) and Storybook stories under `stories/team-review-load.stories.tsx`.
