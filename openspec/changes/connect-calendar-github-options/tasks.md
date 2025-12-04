## 1. UI / State

- [x] 1.1 `CUSTOM_OPTIONS_WITH_DEFAULT` に `pull_request_review_wait_count` と `team_review_load` の 2 項目を追加
- [x] 1.2 既存の `customOptions` state で GitHub オプションも管理されるようになるため、追加の state は不要
- [x] 1.3 `CalendarWizardSummary` は既存の `customOptions` props を通じて GitHub オプションも表示される（変更不要）
- [x] 1.4 作成完了時のリセット処理は既存の `createInitialState()` で対応済み（変更不要）

## 2. API / データ

- [x] 2.1 POST /api/calendars の既存 `customOptions` に GitHub オプション ID が含まれるようになる（変更不要）
- [x] 2.2 GET /api/calendars/{id} の既存 `customOptions` から GitHub オプションを取得可能にする
- [x] 2.3 `scheduleMock` のカレンダーデータに GitHub オプションを含む `customOptions` サンプルを追加

## 3. プレビューダイアログ

- [x] 3.1 `SearchHeader` に現在選択中のカレンダー ID を取得して `customOptions` を参照するロジックを追加
- [x] 3.2 `customOptions` に GitHub オプション ID が含まれない場合は「GitHub オプションは選択されていません」メッセージを表示し、`/api/github/review-options` フェッチをスキップ
- [x] 3.3 `pull_request_review_wait_count` が含まれる場合のみ `PullRequestReviewOption` を描画
- [x] 3.4 `team_review_load` が含まれる場合のみ `TeamReviewLoadOption` を描画
- [x] 3.5 複数カレンダー選択時は先頭 ID を対象とし、対象カレンダー切り替え UI と再フェッチを実装

## 4. Validation

- [x] 4.1 `pnpm lint` を実行して新規ファイルのエラーを解消
- [x] 4.2 `CalendarWizardOptionsForm.stories.tsx` に GitHub オプション表示ストーリーを追加
- [x] 4.3 `openspec validate connect-calendar-github-options --strict` を実行して問題を解消
