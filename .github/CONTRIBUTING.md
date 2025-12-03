# 貢献ガイド

OptiCal Frontend への貢献ありがとうございます。以下のルールは **Copilot を含む全メンバー** に適用されます。やり取りは日本語で行ってください。

## プロジェクト前提

- Next.js 15.5 (App Router / Turbopack) + React 19 + TypeScript(strict)
- スタイリング: Tailwind CSS 4
- UI: Shadcn/ui を `src/components/ui/` に配置し、`atoms` で再ラップ
- Lint/Format: Biome 2.2（lint-staged + Husky）
- CI: Biome / TypeScript / Next.js Build / Bundle Size / Discord 通知

## 開発環境セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/TokujyouKaisennDonnburi/calendar-front.git
cd calendar-front

# 依存関係をインストール
pnpm install

# 開発サーバー起動
pnpm dev
```

## ブランチ命名規則

```
<type>/<issue-number>: <description>
```

### Type の種類

| Type       | 説明                         | 例                                     |
| ---------- | ---------------------------- | -------------------------------------- |
| `feat`     | 新機能追加                   | `feat/issue13: カレンダー作成ページ`   |
| `fix`      | バグ修正                     | `fix/issue10: スケジュール重なり修正`  |
| `refactor` | コード改善（動作変更なし）   | `refactor/issue15: コンポーネント分割` |
| `chore`    | 雑務（ビルド、依存関係など） | `chore: npm パッケージ更新`            |
| `ci`       | CI/CD 改善                   | `ci/issue39: GitHub Actions 設定`      |

## コミットメッセージ

```
<type>/<issue-number>: <description>
```

**ルール:**

- 一行目は 50 文字以内
- 命令形で記述（「〜した」ではなく「〜する」）
- Conventional Commits に従う

**例:**

```
feat/issue123: ユーザー認証機能を実装する
fix/issue45: ログインページのバグを修正する
```

## PR 作成時のチェックリスト

提出前に以下を全て満たしてください。

### コード品質

- [ ] `pnpm run lint` → Biome エラー無し
- [ ] `pnpm run format` or lint-staged で整形済み
- [ ] `pnpm run build` 成功（Husky でも走ります）
- [ ] `pnpm tsc --noEmit` で型エラー無し

### アーキテクチャ

- [ ] `@/components/ui/*` を直接 import していない
- [ ] 必要な Shadcn ラッパーを `atoms` に追加済み
- [ ] Atomic Design の階層 (atoms → molecules → organisms → templates) を尊重している

### ドキュメント / ガイド

- [ ] README や設計資料に変更が必要なら更新した
- [ ] 複雑なロジックには意図コメントを 1 行入れた
- [ ] 型定義 (`FooProps`, `FooState`) を明示した

## コードレビュー ガイドライン

詳細は [CODE_REVIEW_GUIDE.md](./CODE_REVIEW_GUIDE.md) と [copilot-instructions.md](./copilot-instructions.md) を参照してください。

### レビューの観点

1. **コンポーネント構成**: Atomic Design に従っているか
2. **UI ラッピング**: UI コンポーネントが atoms でラップされているか
3. **実装の簡潔性**: 不要な複雑さがないか
4. **型安全性**: TypeScript が正しく使用されているか
5. **可読性**: コードが理解しやすいか

### 指摘内容の形式

すべてのレビューコメントは **日本語** で記述してください。（Copilot を含む）

```
## 🔍 コードレビュー指摘

### [ファイル名]
❌ 問題: UI コンポーネントが直接インポートされています
  現在: import { Button } from "@/components/ui/button"
  推奨: import { Button } from "@/components/atoms"
  理由: atoms 層を経由することで、アーキテクチャの一貫性を保ちます
```

## ローカル開発

### コマンド一覧

```bash
# 開発サーバー起動（ホットリロード有効）
pnpm dev

# 本番ビルド
pnpm run build

# ビルド結果をプレビュー
pnpm start

# コード整形・リント
pnpm run lint        # チェックのみ
pnpm run format      # 自動修正

# Storybook（コンポーネント開発）
pnpm run storybook
pnpm run build-storybook
```

### Git フック（Husky）

```bash
.husky/pre-commit : pnpm exec lint-staged && pnpm run build
.husky/commit-msg : pnpm exec commitlint --edit "$1"
```

コミット失敗時は修正が適用されているか確認し、再度 `git add` してください。

## GitHub Actions

PR では次のワークフローが走ります：

| Workflow             | 内容                                                           |
| -------------------- | -------------------------------------------------------------- |
| `pr-checks.yml`      | Biome / TypeScript / Next.js Build                             |
| `bundle-size.yml`    | `ANALYZE=true pnpm run build` で bundle レポートを Artifact 化 |
| `discord-notify.yml` | Issue/PR イベントを Discord に通知                             |

全ジョブ成功までマージ不可です。Bundle size が増えた場合は PR 説明に理由を書いてください。

## トラブルシューティング

### Husky が動作しない

```bash
# フックの権限を確認
ls -la .husky/pre-commit

# 権限設定
chmod +x .husky/pre-commit

# 再度インストール
pnpm install
```

### 依存関係のエラー

```bash
# ロックファイルを削除して再インストール
rm pnpm-lock.yaml
pnpm install
```

### ビルドが失敗する

```bash
# キャッシュをクリア
rm -rf .next node_modules
pnpm install
pnpm run build
```

## 質問・フィードバック

問題や提案がある場合は、Issue を作成してください。

## ライセンス

このプロジェクトはプライベートリポジトリです。
