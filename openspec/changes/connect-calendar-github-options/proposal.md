## Why

カレンダー作成ウィザードで GitHub 連携オプションを選択しても保存されず、検索ヘッダーのプレビューダイアログにも反映されないため、エンジニア向け GitHub オプションが UX とデータフローの両面で断絶している。

## What Changes

- ステップ 3 の既存カスタムオプションに `pull_request_review_wait_count` と `team_review_load` の 2 つを追加し、他のオプションと同様にトグル式で選択できるようにする。
- カレンダー作成 API (POST /api/calendars) に `engineerOptions: string[]` を追加し、保存後はサマリーにも表示・成功時リセットを行う。GET 系 API からも `engineerOptions` を取得できるようにする。
- SearchHeader プレビューは選択中カレンダーの `engineerOptions` を取得して必要なコンポーネントだけ描画し、未選択時は GitHub フェッチをスキップする。

## Impact

- Affected specs: `calendar-engineer-options` (新規 capability)
- Affected code:
  - `src/components/organisms/CalendarCreationWizard/CalendarCreationWizard.tsx`
  - `src/components/molecules/CalendarWizardOptionsForm/CalendarWizardOptionsForm.tsx`
  - `src/components/molecules/CalendarWizardSummary/CalendarWizardSummary.tsx`
  - `src/components/organisms/SearchHeader/SearchHeader.tsx`
  - `src/mocks/handlers/scheduleHandlers.ts` (POST /api/calendars モック)
  - `src/mocks/handlers/githubHandlers.ts` (/api/github/review-options モック)
