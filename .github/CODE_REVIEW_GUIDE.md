# コードレビューガイドライン

Copilot および人間レビュアーが **日本語** で一貫したレビューを行うための指針です。Atomic Design・Next.js 15・Tailwind 4・Shadcn/ui という本プロジェクトの前提に合わせています。

## プロジェクト前提

- Next.js 15.5 (App Router, Turbopack) + React 19 + TypeScript Strict
- `src/components/ui/` は Shadcn/ui ラッパー。UI レイヤーは atoms を経由して提供
- Biome で lint / format、自動 import 整理
- Storybook は任意、PR チェックは Biome / TypeScript / Next.js Build / Bundle size

## レビュー基準サマリー

| 優先度        | チェック内容                    | 観点                         |
| ------------- | ------------------------------- | ---------------------------- |
| ❌ Critical   | UI コンポーネント直 import 禁止 | Atomic Design 破壊は即修正   |
| ⚠️ Warning    | 冗長な実装 / 状態管理           | もっと簡単に書けないか       |
| 💡 Suggestion | 型の強化・命名                  | 可読性/保守性向上            |
| 🔄 Refactor   | パフォーマンス・bundle          | 不要再レンダや不要依存の削減 |

## 1. コンポーネント層の順守 (Critical)

- `src/components/ui/*` は **Shadcn/ui** のみを扱う層。実際に画面から利用するのは `src/components/atoms/*`
- atoms から molecules → organisms → templates という流れを崩さない
- `atoms/index.ts` や `@/components/atoms` から再輸出されているかを必ず確認
- 直接 import を見つけたら即指摘。例:
  ```
  ❌ UI コンポーネントが直接インポートされています
    現在: import { Button } from "@/components/ui/button"
    推奨: import { Button } from "@/components/atoms"
    理由: Atomic Design を保ち UI ライブラリ差し替えに強くするため
  ```

## 2. 実装の簡潔性 (Warning)

### 不要な状態管理

```tsx
// ❌ NG
const [count, setCount] = useState(initialCount);
useEffect(() => setCount(initialCount), [initialCount]);
return <div>{count}</div>;

// ✅ OK
return <div>{initialCount}</div>;
```

```
📌 状態管理を削減できます
  現在: useState + useEffect で props を複写
  推奨: props を直接描画
  理由: 同じ挙動をより少ないコードで実現できます
```

### ネストし過ぎた条件

```tsx
// ✅ user?.isAdmin && user?.isActive を使う
```

### 配列処理

`filter` / `map` / `reduce` で意図を明確化する。push ループは代替を提案。

## 3. 型安全性と命名 (Suggestion)

- Props には `FooProps` を必ず定義 (React.ComponentProps 可)
- `any` 禁止。Union / generics を活用
- コンポーネント名: PascalCase、関数・変数: camelCase、ディレクトリ: kebab-case
- Context / hook には戻り値の型を付ける

コメント例:

```
⚠️ 型が曖昧です
  現在: type Props = any
  推奨: type Props = { label: string; onClick: () => void }
  理由: Strict モードを活かし潜在バグを防ぎます
```

## 4. パフォーマンス / バンドル (Refactor)

- 重いコンポーネントは `React.memo` や `useCallback`
- inline 宣言で子へ props 渡す場合はメモ化検討
- 依存関係（icons, day-picker 等）を安易に増やさない
- Bundle size workflow の結果を参照し、サイズ増加があれば PR で理由を説明

## 5. レビュー手順

1. **Diff 全体把握**: 何の層を触っているか確認
2. **層チェック**: `@/components/ui` 直 import が無いか検索 (`rg "components/ui" src`)
3. **簡潔性チェック**: 繰り返し構文・不要 state を把握
4. **型/命名**: Props の型、hook 戻り値、命名規則を確認
5. **コメント提出**: 下記テンプレートを使用し日本語で投稿

## コメントテンプレート

```
[ICON] [優先度ラベル]: [タイトル]
  現在: [該当コードやアプローチ]
  推奨: [改善案]
  理由: [なぜ必要か]

💡 [補足 / 期待される効果]
```

例:

```
❌ Atomic Design の層を超えています
  現在: import { Dialog } from "@/components/ui/dialog"
  推奨: atoms/Dialog を経由してください
  理由: UI ライブラリ差し替えやデザイン刷新時に影響範囲を局所化するため

💡 atoms に未登録の場合は追加も検討してください
```

## 参考資料

- [Atomic Design](https://atomicdesign.bradfrost.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [.github/CONTRIBUTING.md](./CONTRIBUTING.md)
