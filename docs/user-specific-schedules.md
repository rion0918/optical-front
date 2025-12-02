# ユーザー別スケジュール表示機能の実装

## 概要

カレンダーページで表示されるスケジュールデータを、ログイン中のユーザーに関連付けられたものだけに制限しました。

## 実装内容

### 1. モックユーザーデータの修正 ✅

**ファイル**: `src/mocks/data/users.ts`

**変更内容**:

- テストガイドと一致するようにユーザー名とメールアドレスを修正
- `user-1`: John Doe (john@example.com)
- `user-2`: Jane Smith (jane@example.com)
- `user-3`: Admin User (admin@example.com)
- `user-deleted`: Deleted User (deleted@example.com)

### 2. スケジュールデータへのユーザー紐付け ✅

**ファイル**: `src/mocks/data/schedule.ts`

**変更内容**:

- すべてのカレンダーに `userId` フィールドを追加
- すべてのスケジュールアイテムに `userId` フィールドを追加

**データ配分**:

- **John Doe (user-1)**:
  - カレンダー: company, development, pr, support, infra, product (6 個)
  - スケジュール: 全社会議、タウンホール準備、ランチ、開発関連スケジュール (6 個)
- **Jane Smith (user-2)**:
  - カレンダー: design, sales, marketing, qa (4 個)
  - スケジュール: デザイン関連、営業関連スケジュール (6 個)
- **Admin User (user-3)**:
  - カレンダー: hr, backoffice (2 個)
  - スケジュール: なし (今回のモックデータには含まれていない)

### 3. スケジュールハンドラーの修正 ✅

**ファイル**: `src/mocks/handlers/scheduleHandlers.ts`

**変更内容**:

- JWT トークンから認証ユーザーの ID を抽出
- ユーザー ID に基づいてカレンダーとスケジュールをフィルタリング
- 未認証の場合は 401 エラーを返却
- トークン有効期限切れの場合も 401 エラーを返却

**実装ロジック**:

```typescript
// 1. Authorization ヘッダーからトークンを取得
// 2. トークンをデコードしてユーザーIDを取得
// 3. カレンダーをフィルタリング (userId === ログインユーザーID)
// 4. スケジュールをフィルタリング (userId === ログインユーザーID)
// 5. フィルタリングされたデータを返却
```

## データフロー

```
[ユーザーログイン]
  ↓ JWT token (userId: "user-1")
[カレンダーページアクセス]
  ↓ GET /api/today-schedule (Authorization: Bearer <token>)
[scheduleHandlers]
  ↓ トークンデコード → userId: "user-1"
  ↓ フィルタリング
[John Doe のカレンダー・スケジュールのみ返却]
  - カレンダー: 6個 (company, development, pr, support, infra, product)
  - スケジュール: 6個 (全社会議、タウンホール準備、ランチ、開発関連)
```

## テスト手順

### 前提条件

開発サーバーが起動していること (`pnpm dev`)

### テストケース 1: John Doe のスケジュール表示

**手順**:

1. ブラウザで http://localhost:3000 にアクセス
2. ログインページで以下を入力:
   - メール: `john@example.com`
   - パスワード: `password123`
3. ログイン

**期待結果**:

- ✅ カレンダーページにリダイレクトされる
- ✅ 右上に "John Doe" が表示される
- ✅ 以下の 6 つのカレンダーが表示される:
  - 全社カレンダー
  - 開発チームカレンダー
  - 広報カレンダー
  - サポートカレンダー
  - インフラチーム
  - プロダクトカレンダー
- ✅ John Doe のスケジュール (6 件) のみが表示される:
  - 全社会議
  - タウンホール準備
  - ウェルカムランチ
  - スプリント計画
  - コードレビュー会
  - リリース判定会議

**確認方法**:

- ブラウザの DevTools → Network タブで `/api/today-schedule` のレスポンスを確認
- すべてのカレンダーとスケジュールに `userId: "user-1"` が含まれていることを確認

---

### テストケース 2: Jane Smith のスケジュール表示

**手順**:

1. ログアウト (右上のアカウントメニュー → Logout)
2. ログインページで以下を入力:
   - メール: `jane@example.com`
   - パスワード: `password456`
3. ログイン

**期待結果**:

- ✅ カレンダーページにリダイレクトされる
- ✅ 右上に "Jane Smith" が表示される
- ✅ 以下の 4 つのカレンダーが表示される:
  - デザインチームカレンダー
  - セールスカレンダー
  - マーケカレンダー
  - QA カレンダー
- ✅ Jane Smith のスケジュール (6 件) のみが表示される:
  - UI レビュー
  - デザインワークショップ
  - ユーザーテスト
  - パイプライン確認
  - デモ商談
  - フォローアップ MTG

**確認方法**:

- Network タブで `/api/today-schedule` のレスポンスを確認
- すべてのカレンダーとスケジュールに `userId: "user-2"` が含まれていることを確認

---

### テストケース 3: Admin User のスケジュール表示

**手順**:

1. ログアウト
2. ログインページで以下を入力:
   - メール: `admin@example.com`
   - パスワード: `adminpass`
3. ログイン

**期待結果**:

- ✅ カレンダーページにリダイレクトされる
- ✅ 右上に "Admin User" が表示される
- ✅ 以下の 2 つのカレンダーが表示される:
  - 人事カレンダー
  - バックオフィス
- ✅ スケジュールは 0 件 (Admin User のスケジュールはモックデータに含まれていない)

---

### テストケース 4: 未認証アクセスの確認

**手順**:

1. ログアウト状態で、ブラウザの DevTools Console で以下を実行:
   ```javascript
   fetch("/api/today-schedule", {
     headers: {
       "Content-Type": "application/json",
     },
   })
     .then((r) => r.json())
     .then(console.log);
   ```

**期待結果**:

- ✅ HTTP 401 エラーが返却される
- ✅ エラーメッセージ: "認証が必要です"

---

### テストケース 5: 無効なトークンでのアクセス

**手順**:

1. ログイン状態で、DevTools Console で以下を実行:
   ```javascript
   fetch("/api/today-schedule", {
     headers: {
       Authorization: "Bearer invalid-token",
       "Content-Type": "application/json",
     },
   })
     .then((r) => r.json())
     .then(console.log);
   ```

**期待結果**:

- ✅ HTTP 401 エラーが返却される
- ✅ エラーメッセージ: "無効なトークンです"

---

## 技術的な詳細

### トークンからユーザー ID を抽出する方法

```typescript
// JWT トークンは "header.payload.signature" の形式
const parts = token.split(".");
const payload = JSON.parse(atob(parts[1])); // Base64デコード
const userId = payload.sub; // ユーザーIDを取得
```

### フィルタリングロジック

```typescript
// カレンダーのフィルタリング
const userCalendars = scheduleMock.calendars.filter(
  (calendar) => calendar.userId === userId
);

// スケジュールのフィルタリング
const userItems = scheduleMock.items.filter((item) => item.userId === userId);
```

## セキュリティ考慮事項

1. **認証チェック**: すべてのリクエストで JWT トークンを検証
2. **トークン有効期限**: 期限切れトークンは拒否
3. **ユーザー分離**: 他のユーザーのデータにアクセス不可

## 今後の拡張

1. **共有カレンダー**: 複数ユーザーがアクセスできるカレンダー機能
2. **招待機能**: 他のユーザーをスケジュールに招待
3. **権限管理**: カレンダーごとの閲覧・編集権限
4. **フィルタリング**: 特定のカレンダーのみ表示

## トラブルシューティング

### 問題: すべてのユーザーで同じスケジュールが表示される

**原因**: MSW ハンドラーが正しく動作していない

**解決方法**:

1. ブラウザのコンソールで `[MSW] Mocking enabled.` が表示されているか確認
2. `src/mocks/browser.ts` に `authHandlers` が追加されているか確認
3. 開発サーバーを再起動

### 問題: ログイン後にカレンダーが表示されない

**原因**: API が 401 エラーを返している

**解決方法**:

1. DevTools Network タブで `/api/today-schedule` のレスポンスを確認
2. `Authorization` ヘッダーにトークンが含まれているか確認
3. localStorage に `auth_token` が保存されているか確認 (`localStorage.getItem('auth_token')`)

### 問題: カレンダーは表示されるがスケジュールが 0 件

**原因**: そのユーザーに割り当てられたスケジュールがない

**解決方法**:

- これは正常な動作です (例: Admin User)
- モックデータを追加する場合は `src/mocks/data/schedule.ts` を編集

## まとめ

✅ **完了した項目**:

- モックユーザーデータの修正
- スケジュールデータへの `userId` 追加
- スケジュールハンドラーのフィルタリング実装
- 認証チェックとエラーハンドリング
- コード品質チェック (lint/format)

🎯 **達成した目標**:

- ログインユーザーごとに異なるカレンダー・スケジュールを表示
- 未認証ユーザーのアクセスを拒否
- ユーザー間のデータ分離を実現

🚀 **次のステップ**:

1. 上記のテストケースを実行して動作を確認
2. 必要に応じてモックデータを追加
3. 共有カレンダー機能などの拡張を検討
