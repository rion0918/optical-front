# Spec: Authentication

## ADDED Requirements

### Requirement: Email/Password Authentication

システムはメールアドレスとパスワードを使用したユーザー認証をサポートしなければならない (MUST)。ユーザーはメールアドレスとパスワードを使用してサインアップおよびログインできなければならない (SHALL)。

#### Scenario: User signs up with email and password

**Given** ユーザーがサインアップページにアクセスしている  
**When** ユーザーが名前、有効なメールアドレス、パスワードを入力して「サインアップ」ボタンをクリックする  
**Then** システムは `/api/auth/signup` に POST リクエストを送信する  
**And** 成功時、JWT トークンとユーザー情報を受け取る  
**And** トークンを localStorage に保存する  
**And** ユーザーをカレンダーページにリダイレクトする

#### Scenario: User signs up with invalid email

**Given** ユーザーがサインアップページにアクセスしている  
**When** ユーザーが無効な形式のメールアドレスを入力する  
**Then** フォームはクライアント側のバリデーションエラーを表示する  
**And** API リクエストは送信されない

#### Scenario: User signs up with existing email

**Given** ユーザーがサインアップページにアクセスしている  
**When** ユーザーが既に登録済みのメールアドレスを入力してサインアップを試みる  
**Then** システムは `/api/auth/signup` に POST リクエストを送信する  
**And** API は 400 エラーを返す  
**Then** エラーメッセージ「このメールアドレスは既に登録されています」が表示される

#### Scenario: User logs in with email and password

**Given** ユーザーがログインページにアクセスしている  
**When** ユーザーが登録済みのメールアドレスとパスワードを入力して「ログイン」ボタンをクリックする  
**Then** システムは `/api/auth/login` に POST リクエストを送信する  
**And** 成功時、JWT トークンとユーザー情報を受け取る  
**And** トークンを localStorage に保存する  
**And** ユーザーをカレンダーページにリダイレクトする

#### Scenario: User logs in with incorrect credentials

**Given** ユーザーがログインページにアクセスしている  
**When** ユーザーが誤ったメールアドレスまたはパスワードを入力する  
**Then** システムは `/api/auth/login` に POST リクエストを送信する  
**And** API は 401 エラーを返す  
**Then** エラーメッセージ「メールアドレスまたはパスワードが正しくありません」が表示される

---

### Requirement: Google OAuth Authentication

システムは Google OAuth を使用したユーザー認証をサポートしなければならない (MUST)。ユーザーは Google アカウントを使用してサインアップおよびログインできなければならない (SHALL)。

#### Scenario: User initiates Google authentication

**Given** ユーザーがログインまたはサインアップページにアクセスしている  
**When** ユーザーが「Google でログイン」ボタンをクリックする  
**Then** システムはユーザーを `/api/auth/google` にリダイレクトする  
**And** バックエンドは Google の認証ページにリダイレクトする

#### Scenario: User completes Google authentication successfully

**Given** ユーザーが Google の認証ページで認証を完了した  
**When** Google がユーザーを `/api/auth/google/callback` にリダイレクトする  
**Then** バックエンドは Google アカウント情報を検証する  
**And** 新規ユーザーの場合は `google_ids` テーブルにレコードを作成する  
**And** JWT トークンを生成してクエリパラメータとして返す  
**Then** フロントエンドのコールバックページがトークンを localStorage に保存する  
**And** ユーザーをカレンダーページにリダイレクトする

#### Scenario: User cancels Google authentication

**Given** ユーザーが Google の認証ページにリダイレクトされた  
**When** ユーザーが認証をキャンセルする  
**Then** Google はユーザーを `/api/auth/google/callback` にエラー付きでリダイレクトする  
**And** エラーメッセージ「Google 認証がキャンセルされました」が表示される  
**And** ユーザーはログインページに留まる

---

### Requirement: Authentication State Management

システムはアプリケーション全体で認証状態を管理しなければならない (MUST)。認証が必要なページへのアクセスは適切に制御されなければならない (SHALL)。

#### Scenario: Authenticated user accesses protected page

**Given** ユーザーがログイン済みで JWT トークンが localStorage に保存されている  
**When** ユーザーがカレンダーページにアクセスする  
**Then** システムは localStorage からトークンを読み込む  
**And** `/api/auth/me` に GET リクエストを送信してユーザー情報を取得する  
**And** ユーザー情報が認証コンテキストに保存される  
**And** カレンダーページが正常に表示される

#### Scenario: Unauthenticated user tries to access protected page

**Given** ユーザーが未ログインで JWT トークンが localStorage に存在しない  
**When** ユーザーがカレンダーページに直接アクセスを試みる  
**Then** 認証チェックが失敗する  
**And** ユーザーはランディングページにリダイレクトされる

#### Scenario: User with expired token tries to access protected page

**Given** ユーザーの JWT トークンが有効期限切れ  
**When** ユーザーがカレンダーページにアクセスする  
**Then** システムは `/api/auth/me` に GET リクエストを送信する  
**And** API は 401 エラーを返す  
**Then** localStorage からトークンが削除される  
**And** ユーザーはランディングページにリダイレクトされる

#### Scenario: Authenticated user accesses landing page

**Given** ユーザーがログイン済み  
**When** ユーザーがランディングページにアクセスする  
**Then** システムは認証状態を確認する  
**And** ユーザーは自動的にカレンダーページにリダイレクトされる

---

### Requirement: User Logout

システムはログアウト機能を提供しなければならない (MUST)。ユーザーはログアウトして認証状態をクリアできなければならない (SHALL)。

#### Scenario: User logs out

**Given** ユーザーがログイン済みでカレンダーページにアクセスしている  
**When** ユーザーがログアウトボタンをクリックする  
**Then** システムは `/api/auth/logout` に POST リクエストを送信する  
**And** localStorage から JWT トークンを削除する  
**And** 認証コンテキストがクリアされる  
**And** ユーザーはランディングページにリダイレクトされる

---

### Requirement: Error Handling

システムはすべての認証エラーを適切に処理しなければならない (MUST)。エラーはユーザーに分かりやすく表示されなければならない (SHALL)。

#### Scenario: Network error during authentication

**Given** ユーザーが認証操作を実行している  
**When** ネットワークエラーが発生する  
**Then** エラーメッセージ「ネットワークエラーが発生しました。もう一度お試しください。」が表示される  
**And** ユーザーは再試行できる

#### Scenario: Server error during authentication

**Given** ユーザーが認証操作を実行している  
**When** サーバーが 500 エラーを返す  
**Then** エラーメッセージ「サーバーエラーが発生しました。しばらくしてからもう一度お試しください。」が表示される

#### Scenario: Deleted user tries to log in

**Given** ユーザーのアカウントが削除されている(`deleted_at` が設定されている)  
**When** ユーザーがログインを試みる  
**Then** API は 403 エラーを返す  
**Then** エラーメッセージ「このアカウントは削除されています」が表示される

---

### Requirement: Form Validation

ログインとサインアップフォームは適切なクライアント側バリデーションを持たなければならない (MUST)。バリデーションエラーはユーザーに即座に表示されなければならない (SHALL)。

#### Scenario: User submits empty login form

**Given** ユーザーがログインページにアクセスしている  
**When** ユーザーがフィールドを空のままログインボタンをクリックする  
**Then** 各必須フィールドに「このフィールドは必須です」エラーが表示される  
**And** API リクエストは送信されない

#### Scenario: User enters weak password during signup

**Given** ユーザーがサインアップページにアクセスしている  
**When** ユーザーが 8 文字未満のパスワードを入力する  
**Then** パスワードフィールドに「パスワードは 8 文字以上である必要があります」エラーが表示される  
**And** API リクエストは送信されない

#### Scenario: User enters invalid email format

**Given** ユーザーがログインまたはサインアップページにアクセスしている  
**When** ユーザーが無効な形式のメールアドレス(例: "user@")を入力する  
**Then** メールフィールドに「有効なメールアドレスを入力してください」エラーが表示される  
**And** API リクエストは送信されない

---

### Requirement: UI Components

システムは認証に必要なすべての UI コンポーネントを実装しなければならない (MUST)。UI コンポーネントは一貫性のあるデザインとアクセシビリティを持たなければならない (SHALL)。

#### Scenario: Login page displays correctly

**Given** ユーザーがログインページ(`/auth/login`)にアクセスする  
**Then** ページには以下が表示される:

- メールアドレス入力フィールド
- パスワード入力フィールド
- 「ログイン」ボタン
- 「Google でログイン」ボタン
- 「アカウントをお持ちでない方はこちら」リンク(サインアップページへ)

#### Scenario: Signup page displays correctly

**Given** ユーザーがサインアップページ(`/auth/signup`)にアクセスする  
**Then** ページには以下が表示される:

- 名前入力フィールド
- メールアドレス入力フィールド
- パスワード入力フィールド
- 「サインアップ」ボタン
- 「Google でサインアップ」ボタン
- 「既にアカウントをお持ちの方はこちら」リンク(ログインページへ)

#### Scenario: Landing page displays authentication options

**Given** ユーザーがランディングページ(`/landing`)にアクセスする  
**Then** ページには以下が表示される:

- アプリケーションの説明
- 「ログイン」ボタン
- 「サインアップ」ボタン
