# calendar-engineer-options Specification

## Purpose

カレンダー作成時に選択した GitHub 連携オプションを保存し、検索ヘッダーのプレビューダイアログで選択内容に応じたウィジェットのみを表示できるようにする。

## ADDED Requirements

### Requirement: Engineer option selection UI

カレンダー作成ウィザードのステップ 3 の既存カスタムオプションセクションに `pull_request_review_wait_count` と `team_review_load` の 2 つを追加しなければならない (MUST)。これらは他のカスタムオプションと同様にトグル式で選択でき、選択状態は既存の `customOptions: Record<string, boolean>` で管理されなければならない (SHALL)。選択結果はウィザード右側のサマリーにも他のオプションと同様に表示されること (SHALL)。

#### Scenario: Selecting both GitHub options

- **GIVEN** ユーザーがステップ 3 の「カスタムオプション」セクションを開いている
- **WHEN** `pull_request_review_wait_count` と `team_review_load` の両方をトグルで ON にする
- **THEN** 2 つのオプションカードが選択スタイルで表示され、`customOptions` に両 ID が true で格納され、サマリーにも表示される

#### Scenario: Resetting the UI after completion

- **GIVEN** ユーザーが GitHub オプションを 1 件以上選択した状態でカレンダー作成に成功した
- **WHEN** 完了カードで「もう一度作成する」を押してウィザードを再開する
- **THEN** `customOptions` が初期化され、GitHub オプションのトグルとサマリー表示も全て未選択に戻る

### Requirement: Engineer option persistence

カレンダー作成 API の既存 `customOptions: string[]` に GitHub オプション ID を含めて送信し、カレンダーレコードに永続化しなければならない (MUST)。保存済みオプションはカレンダー取得 API からも同じ順序で返され、UI は取得結果をそのまま表示できなければならない (SHALL)。

#### Scenario: Payload contains GitHub options in customOptions

- **GIVEN** ユーザーが GitHub オプションを `pull_request_review_wait_count` で確定した
- **WHEN** POST /api/calendars が呼ばれる
- **THEN** リクエスト本文の `customOptions` に `"pull_request_review_wait_count"` が含まれ、バックエンドはその配列をカレンダーに保存し、レスポンスでも同じ値を返す

#### Scenario: Fetching stored options

- **GIVEN** 既存カレンダーが `customOptions` に `"team_review_load"` を含んで保存されている
- **WHEN** フロントエンドが GET /api/calendars/{calendarId} を呼び出す
- **THEN** レスポンスの `customOptions` に同じ ID が含まれ、クライアントはその値をプレビューダイアログの判定に利用できる

### Requirement: Option-driven preview rendering

検索ヘッダーのプレビューダイアログは、現在選択中のカレンダー ID に紐づく `customOptions` を読み込み、GitHub オプション ID (`pull_request_review_wait_count`, `team_review_load`) が含まれている場合のみ該当コンポーネントを描画しなければならない (MUST)。GitHub データ取得 (`/api/github/review-options`) は少なくとも 1 つの GitHub オプションが選択されている場合にのみ実行し、未選択時は「GitHub オプションは選択されていません」メッセージを表示してフェッチをスキップしなければならない (SHALL)。複数カレンダーがフィルター選択されている場合は先頭 ID をデフォルト対象とし、ユーザーが別のカレンダーを選ぶと `customOptions` と GitHub データを再取得する UI を提供する (SHALL)。

#### Scenario: Rendering PR widget only when selected

- **GIVEN** プレビューダイアログがカレンダーの `customOptions` に `"pull_request_review_wait_count"` のみ含まれている
- **WHEN** ダイアログを開く
- **THEN** `PullRequestReviewOption` だけが表示され、`TeamReviewLoadOption` は描画されない

#### Scenario: No GitHub options selected

- **GIVEN** 対象カレンダーの `customOptions` に GitHub オプション ID が含まれていない
- **WHEN** ユーザーがプレビューボタンを押す
- **THEN** ダイアログには「GitHub オプションは選択されていません」などのプレースホルダーが表示され、`/api/github/review-options` へのリクエストは送信されない

#### Scenario: Switching selected calendar reloads preview

- **GIVEN** ユーザーがカレンダーフィルターで A と B の 2 つを選択している
- **WHEN** プレビューダイアログ内で B を対象カレンダーとして選択する
- **THEN** UI は B の `customOptions` を再取得し、必要であれば GitHub データを再フェッチしてウィジェット表示を更新する
