## ADDED Requirements

### Requirement: PR Review Notification Widget

オプションコンポーネントは `PullRequestInfo[]`(id, title, url, author, isUrgent?) を props として受け取り、ベルアイコンと未レビュー件数バッジ、および詳細ポップオーバーを表示しなければならない (MUST)。GitHub への遷移リンクを各 PR 行とフッターに表示しなければならない (SHALL)。

#### Scenario: Reviewer opens notification list

**Given** コンポーネントが 3 件の `PullRequestInfo` を受け取っている
**When** ユーザーがベルボタンをクリックする、または Enter キーでアクティブにする
**Then** ポップオーバーに各 PR の prefix(例: `fix:`)、タイトル、`#<番号>` リンク、`@author` が表示される
**And** `isUrgent` が true の行には視覚的な緊急タグが表示される
**And** バッジは 3 を表示し、フッターの「全ての PR を見る -> GitHub へ」リンクが props で渡された URL に遷移する

#### Scenario: No pending reviews

**Given** コンポーネントが空の `PullRequestInfo[]` を受け取っている
**When** コンポーネントが表示される
**Then** バッジは 0 を表示し、ポップオーバーには「レビュー待ちはありません」といった空状態メッセージが表示される
**And** PR 行は表示されない

#### Scenario: Data provided externally

**Given** 呼び出し元が GitHub API からデータを取得済みである
**When** コンポーネントに `PullRequestInfo[]` と任意の GitHub ベース URL を渡す
**Then** コンポーネントは追加の API リクエストを発行せず、受け取ったデータだけを表示する
**And** GitHub 認証やトークン管理ロジックは呼び出し元に委ねられる

### Requirement: Storybook Preview

コンポーネントは Storybook で確認できなければならない (MUST)。ストーリーはモックデータ、状態切り替え、使い方の説明を提供しなければならない (SHALL)。

#### Scenario: Designers review mocked states

**Given** Storybook が起動している
**When** デザイナーが「PullRequestReviewOption」ストーリーを開く
**Then** デフォルト(複数件)、緊急タグ付き、空状態の各ストーリーが用意されている
**And** Controls/Args で件数や `isUrgent` を切り替えられる
**And** ドキュメンテーションパネルに props 情報と GitHub API をモックする手順が記載されている
