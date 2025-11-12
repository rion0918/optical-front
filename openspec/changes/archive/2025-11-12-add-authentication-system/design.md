# Design: Authentication System

## Architecture Overview

認証システムは以下のコンポーネントで構成されます:

```
┌─────────────────────────────────────────────────┐
│           Landing Page                          │
│  ┌─────────────┐      ┌─────────────┐         │
│  │   Login     │      │   Signup    │         │
│  │   Form      │      │   Form      │         │
│  └─────────────┘      └─────────────┘         │
│         │                     │                 │
│         └──────────┬──────────┘                │
└────────────────────┼──────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │   Auth Provider        │
        │  (Context API)         │
        │                        │
        │  - login()             │
        │  - signup()            │
        │  - loginWithGoogle()   │
        │  - logout()            │
        │  - getUser()           │
        └────────────────────────┘
                     │
          ┏━━━━━━━━━┻━━━━━━━━━┓
          ┃                    ┃
          ▼                    ▼
   ┌─────────────┐      ┌─────────────┐
   │   API       │      │  Local      │
   │   Client    │      │  Storage    │
   │             │      │  (JWT)      │
   └─────────────┘      └─────────────┘
```

## Technical Decisions

### 1. 認証方式: JWT (JSON Web Token)

**選択理由:**

- ステートレスな認証が可能
- モバイルアプリへの拡張が容易
- バックエンドのスケーラビリティが高い

**トレードオフ:**

- httpOnly Cookie と比較して XSS リスクがある → Content Security Policy で対策
- トークンの無効化が困難 → 短い有効期限とリフレッシュトークンで対策(将来実装)

### 2. 状態管理: React Context API

**選択理由:**

- 軽量で追加のライブラリが不要
- 認証状態はアプリ全体で必要
- グローバルステートとして適切なスコープ

**代替案:**

- Redux/Zustand: 過剰な複雑性
- SWR/React Query: データフェッチに特化しすぎ

### 3. Google OAuth: リダイレクトベース

**フロー:**

```
1. ユーザーが「Googleでログイン」をクリック
2. `/api/auth/google` にリダイレクト
3. Googleの認証ページへリダイレクト
4. ユーザーが認証を承認
5. `/api/auth/google/callback` にリダイレクト
6. バックエンドがJWTを生成してクエリパラメータで返す
7. フロントエンドがJWTを保存してカレンダーページへ
```

### 4. エラーハンドリング

すべての API エラーは以下の形式で返される想定:

```typescript
{
  error: {
    code: number; // HTTPステータスコード
    message: string; // エラーメッセージ
  }
}
```

表示は `Toast` コンポーネント(sonner)を使用。

## Data Models

### User (Frontend)

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}
```

### Authentication Request/Response

#### Login Request

```typescript
interface LoginRequest {
  email: string;
  password: string;
}
```

#### Signup Request

```typescript
interface SignupRequest {
  name: string;
  email: string;
  password: string;
}
```

#### Auth Response

```typescript
interface AuthResponse {
  token: string;
  user: User;
}
```

#### Google Auth Callback

```typescript
interface GoogleAuthCallback {
  token: string;
  user: User;
}
```

## API Endpoints

| Method | Endpoint                    | Description                     |
| ------ | --------------------------- | ------------------------------- |
| POST   | `/api/auth/signup`          | メール/パスワードでサインアップ |
| POST   | `/api/auth/login`           | メール/パスワードでログイン     |
| POST   | `/api/auth/logout`          | ログアウト                      |
| GET    | `/api/auth/me`              | 現在のユーザー情報取得          |
| GET    | `/api/auth/google`          | Google OAuth 開始               |
| GET    | `/api/auth/google/callback` | Google OAuth コールバック       |

## File Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx           # ログインページ
│   │   ├── signup/
│   │   │   └── page.tsx           # サインアップページ
│   │   └── callback/
│   │       └── page.tsx           # OAuth コールバックページ
│   └── landing/
│       └── page.tsx               # ランディングページ(更新)
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx          # ログインフォーム
│   │   ├── SignupForm.tsx         # サインアップフォーム
│   │   └── GoogleLoginButton.tsx # Googleログインボタン
│   └── providers/
│       └── AuthProvider.tsx       # 認証プロバイダー
├── hooks/
│   └── useAuth.ts                 # 認証フック
├── lib/
│   ├── auth.ts                    # 認証ユーティリティ
│   └── api-client.ts              # APIクライアント
├── types/
│   └── auth.ts                    # 認証関連の型定義
└── mocks/
    └── handlers/
        └── authHandlers.ts        # 認証APIモック
```

## Security Considerations

### 1. JWT Storage

- localStorage に保存(httpOnly Cookie は使用不可)
- XSS 対策として Content Security Policy を設定

### 2. Password Handling

- フロントエンドでは平文のまま送信(HTTPS で保護)
- バックエンドでハッシュ化(bcrypt 等)

### 3. CSRF Protection

- JWT ベースのため基本的に不要
- ステートフルな処理がある場合は CSRF トークンを検討

### 4. Input Validation

- フロントエンド側でもバリデーション実施
- バックエンドでの検証が最終防衛線

## Testing Strategy

### Unit Tests

- `useAuth` フックのテスト
- API client のテスト
- Form validation のテスト

### Integration Tests

- Login flow のテスト
- Signup flow のテスト
- Google OAuth flow のテスト(モック)

### E2E Tests (将来)

- 完全な認証フローのテスト
- アクセス制御のテスト

## Performance Considerations

- JWT の検証はクライアント側では行わない(デコードのみ)
- 認証状態のチェックは必要最小限に
- トークンの有効期限チェックは API レスポンスで判断

## Migration Strategy

既存のコードへの影響:

1. `useUser` フックは `useAuth` に置き換え
2. 既存のモックハンドラーは認証チェックを追加
3. `layout.tsx` に `AuthProvider` を追加
4. カレンダーページに認証チェックを追加

## Future Enhancements

- リフレッシュトークン
- パスワードリセット
- 二要素認証
- ソーシャル認証の追加(Twitter, GitHub 等)
- アカウント設定ページ
