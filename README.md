# Calendar Front

OptiCal のフロントエンドリポジトリです。

## 📋 目次

- [概要](#概要)
- [セットアップ](#セットアップ)
- [開発](#開発)
- [技術スタック](#テック-スタック)
- [プロジェクト構成](#プロジェクト構成)
- [開発ガイドライン](#開発ガイドライン)
- [Git ワークフロー](#git-ワークフロー)
- [CI/CD](#cicd)
- [トラブルシューティング](#トラブルシューティング)

## 概要

OptiCal は、全てのジャンルのユーザーが違和感なく利用できることを目指したカレンダーアプリケーションです。

## セットアップ

### 前提条件

- Node.js 20 以上
- pnpm 8 以上（推奨パッケージマネージャー）

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/TokujyouKaisennDonnburi/calendar-front.git
cd calendar-front

# 依存関係をインストール
pnpm install
```

### Husky の初期化（初回のみ）

```bash
# Git hooks が自動で設定されます
pnpm install

# または手動で初期化
pnpm exec husky init
```

## 開発

### 開発サーバー起動

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。ファイルの変更は自動的にリロードされます。

### ビルド

```bash
# 本番ビルド
pnpm run build

# ビルド結果をプレビュー
pnpm start
```

### Storybook

コンポーネントをカタログ化・検証：

```bash
# 開発モード
pnpm run storybook

# 本番ビルド
pnpm run build-storybook
```

### コード品質チェック

```bash
# フォーマット・リント チェック
pnpm run lint

# 自動フォーマット
pnpm run format
```

## テック スタック

| カテゴリ               | ツール       | バージョン |
| ---------------------- | ------------ | ---------- |
| **フレームワーク**     | Next.js      | 15.5+      |
| **ランタイム**         | React        | 19+        |
| **言語**               | TypeScript   | 5+         |
| **スタイリング**       | Tailwind CSS | 4+         |
| **UI コンポーネント**  | Shadcn/ui    | -          |
| **コンポーネント開発** | Storybook    | 8.6+       |
| **コード品質**         | Biome        | 2.2+       |
| **Git フック**         | Husky        | 9+         |
| **ファイル整形**       | Lint-Staged  | 16+        |
| **モック**             | MSW          | 2+         |

## プロジェクト構成

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # ルートレイアウト
│   ├── page.tsx                 # トップページ
│   ├── api/                     # API ルート
│   ├── calendars/               # カレンダー機能
│   └── landing/                 # ランディングページ
├── components/                   # React コンポーネント（Atomic Design）
│   ├── atoms/                   # 基本要素
│   ├── molecules/               # 小さなグループ
│   ├── organisms/               # 大きなグループ
│   ├── templates/               # レイアウトテンプレート
│   ├── ui/                      # Shadcn/ui ラッパー
│   └── providers/               # React Context/Providers
├── hooks/                        # React カスタムフック
├── mocks/                        # MSW モック定義
├── utils_constants_styles/       # ユーティリティ関数
└── app/
    ├── globals.css             # グローバルスタイル
    └── page.tsx                # ページコンポーネント

.github/
└── workflows/                   # GitHub Actions
    └── pr-checks.yml           # PR 自動チェック
```

## 開発ガイドライン

### 命名規則

#### ファイル名・コンポーネント名

- **パスカルケース** を使用します
- 例：`Button.tsx`, `UserCard.tsx`, `AccountMenu.tsx`

#### Props 型名

```typescript
// ✅ 良い例
type ButtonProps = {
  label: string;
  onClick: () => void;
};

interface CardProps {
  title: string;
}
```

#### 関数・変数名

- **キャメルケース** を使用します
- 例：`handleClick()`, `isLoggedIn`, `formatDate()`

#### ディレクトリ名

- **小文字またはケバブケース** を使用します
- 例：`atoms`, `molecules`, `organisms`, `today-schedule`

### Atomic Design の構成

| レベル        | 説明                   | 例                                 |
| ------------- | ---------------------- | ---------------------------------- |
| **Atoms**     | 最小単位の UI 要素     | Button, Badge, Input, Text         |
| **Molecules** | Atoms の組み合わせ     | SearchInput, SelectCalendarCard    |
| **Organisms** | Molecules の組み合わせ | CalendarGrid, GeneralScheduleBoard |
| **Templates** | ページレイアウト       | -                                  |
| **Pages**     | App Router の page.tsx | app/page.tsx                       |

## Git ワークフロー

### ブランチ命名規則

```
<type>/<issue-number>: <description>
```

| Type       | 説明                         | 例                                     |
| ---------- | ---------------------------- | -------------------------------------- |
| `feat`     | 新機能追加                   | `feat/issue13: カレンダー作成ページ`   |
| `fix`      | バグ修正                     | `fix/issue10: スケジュール重なり修正`  |
| `hotfix`   | 本番緊急修正                 | `hotfix/issue99: クリティカルバグ修正` |
| `chore`    | 雑務（ビルド、依存関係など） | `chore: npm パッケージ更新`            |
| `docs`     | ドキュメント修正             | `docs: README 更新`                    |
| `style`    | フォーマット（動作変更なし） | `style/issue14: スクロールバー最適化`  |
| `refactor` | リファクタリング             | `refactor: コンポーネント分割`         |
| `test`     | テスト関連                   | `test: ユニットテスト追加`             |
| `perf`     | パフォーマンス改善           | `perf: バンドルサイズ削減`             |
| `ci`       | CI/CD 改善                   | `ci/issue18: GitHub Actions 設定`      |

### コミットメッセージ

```
<type>/<issue-number>: <description>
```

#### ✅ 良い例

```
feat/issue123: ユーザー認証機能を実装した
```

#### ❌ 悪い例

```
fix stuff
update files
```

### ブランチルール(現在は無視、将来的に適応したい)

1. `main` ブランチ

   - 本番リリース版
   - 直接コミット禁止
   - PR レビュー必須

2. `develop` ブランチ

   - 開発版
   - 全機能は `develop` ベース
   - PR レビュー必須

3. フィーチャーブランチ
   - `feat/`, `fix/` などから作成
   - 作業終了後に PR を作成

## CI/CD

### 自動チェック

すべての PR で以下の自動チェックが実行されます：

#### 1. Biome Lint & Format

```bash
pnpm run lint
```

- コードスタイルの統一性をチェック
- フォーマットエラーを検出

#### 2. Unit Tests

```bash
pnpm test
```

- useSchedule.ts、useUser.ts などのテストを実行

#### 3. Next.js Build

```bash
pnpm run build
```

- ビルドエラーを事前検出
- 型エラーを検出

#### 4. Storybook Build

```bash
pnpm run build-storybook
```

- コンポーネントのビルド可能性を確認

### ローカル Git フック（Husky）

コミット時に自動実行：

```bash
# 事前条件
git add .
git commit -m "feat/issue123: 新機能を実装した"

# 自動実行される内容
✔ lint-staged が実行
✔ biome format --write でファイルを自動整形
✔ 修正後、修正内容でコミット
```

エラーがある場合はコミットが失敗し、修正が必要です。

### GitHub Actions ワークフロー

ファイル: `.github/workflows/pr-checks.yml`

**トリガー:**

- PR 作成時（全てのブランチ対象）

**実行内容:**

- 4 つのジョブが **並列実行**
- どのジョブが失敗したかが PR に表示される

## トラブルシューティング

### Husky が動作しない

```bash
# フックの権限を確認
ls -la .husky/pre-commit

# 権限がない場合
chmod +x .husky/pre-commit

# 再度インストール
pnpm install
```

### Biome format が修正内容を反映しない

```bash
# 手動でフォーマット
pnpm exec biome format --write src/

# リント確認
pnpm run lint
```

### Storybook がビルドできない

```bash
# 依存関係を再インストール
rm -rf node_modules pnpm-lock.yaml
pnpm install

# ビルドを再試行
pnpm run build-storybook
```

### GitHub Actions で pnpm が見つからない

- ワークフローで `pnpm/action-setup@v2` を使用していることを確認
- Node.js のバージョンが 20 以上であることを確認

## 関連リンク

- [Next.js ドキュメント](https://nextjs.org/docs)
- [Shadcn/ui](https://ui.shadcn.com)
- [Storybook](https://storybook.js.org)
- [Biome](https://biomejs.dev)
- [Tailwind CSS](https://tailwindcss.com)

## ライセンス

このプロジェクトはプライベートリポジトリです。

## お問い合わせ

質問や提案がある場合は、Issue を作成してください。
