import type { Meta, StoryObj } from "@storybook/react";
import { type PullRequestInfo, PullRequestReviewOption } from "./index";

const mockPullRequests: PullRequestInfo[] = [
  {
    id: 1,
    title: "fix: ログインバグの修正",
    url: "https://github.com/example/repo/pull/123",
    author: "yamada",
    isUrgent: true,
  },
  {
    id: 2,
    title: "feat: カレンダーAPI連携",
    url: "https://github.com/example/repo/pull/125",
    author: "tanaka",
    isUrgent: false,
  },
  {
    id: 3,
    title: "docs: READMEの更新",
    url: "https://github.com/example/repo/pull/127",
    author: "suzuki",
  },
];

const meta: Meta<typeof PullRequestReviewOption> = {
  title: "Organisms/PullRequestReviewOption",
  component: PullRequestReviewOption,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## PR レビュー待ち通知ウィジェット

GitHub API から取得した PR 情報を props として受け取り、
ベルアイコン + バッジ + ドロップダウンで表示するオプションコンポーネント。

### 使い方

\`\`\`tsx
import { PullRequestReviewOption } from "@/components/organisms/EngineerOption/PullRequestReviewOption";

// GitHub API からデータを取得（呼び出し元の責務）
const pullRequests = await fetchAssignedPRs();

<PullRequestReviewOption
  pullRequests={pullRequests}
  allPrsUrl="https://github.com/owner/repo/pulls"
/>
\`\`\`

### GitHub API をモックする手順

1. MSW (Mock Service Worker) でハンドラを定義
2. \`PullRequestInfo[]\` 形式でレスポンスを返す
3. コンポーネントに props として渡す

コンポーネント自体は API を呼ばず、渡されたデータを表示するだけなので、
Storybook では直接モックデータを渡して確認できます。
        `,
      },
    },
  },
  argTypes: {
    pullRequests: {
      description: "レビュー待ちの PR 一覧",
      control: "object",
    },
    allPrsUrl: {
      description: "GitHub リポジトリの PR 一覧へのリンク",
      control: "text",
    },
  },
};
export default meta;

type Story = StoryObj<typeof PullRequestReviewOption>;

/** デフォルト: 複数の PR がある状態 */
export const Default: Story = {
  args: {
    pullRequests: mockPullRequests,
    allPrsUrl: "https://github.com/example/repo/pulls",
  },
};

/** 緊急タグ付きの PR を含む */
export const WithUrgent: Story = {
  args: {
    pullRequests: [
      {
        id: 1,
        title: "fix: 本番環境でのクリティカルバグ",
        url: "https://github.com/example/repo/pull/200",
        author: "hotfix-bot",
        isUrgent: true,
      },
      {
        id: 2,
        title: "fix: セキュリティ脆弱性の修正",
        url: "https://github.com/example/repo/pull/201",
        author: "security-team",
        isUrgent: true,
      },
    ],
    allPrsUrl: "https://github.com/example/repo/pulls",
  },
};

/** 空状態: レビュー待ちがない */
export const Empty: Story = {
  args: {
    pullRequests: [],
    allPrsUrl: "https://github.com/example/repo/pulls",
  },
};

/** フッターリンクなし */
export const WithoutFooterLink: Story = {
  args: {
    pullRequests: mockPullRequests.slice(0, 2),
  },
};

/** 3件以上: スクロール表示 */
export const WithScroll: Story = {
  args: {
    pullRequests: [
      {
        id: 1,
        title: "fix: ログインバグの修正",
        url: "https://github.com/example/repo/pull/123",
        author: "yamada",
        isUrgent: true,
      },
      {
        id: 2,
        title: "feat: カレンダーAPI連携",
        url: "https://github.com/example/repo/pull/125",
        author: "tanaka",
        isUrgent: false,
      },
      {
        id: 3,
        title: "docs: READMEの更新",
        url: "https://github.com/example/repo/pull/127",
        author: "suzuki",
      },
      {
        id: 4,
        title: "feat: ユーザープロフィール機能追加",
        url: "https://github.com/example/repo/pull/130",
        author: "sato",
        isUrgent: true,
      },
      {
        id: 5,
        title: "refactor: コンポーネント構成の見直し",
        url: "https://github.com/example/repo/pull/132",
        author: "takahashi",
      },
      {
        id: 6,
        title: "fix: モバイル表示の崩れを修正",
        url: "https://github.com/example/repo/pull/135",
        author: "watanabe",
      },
    ],
    allPrsUrl: "https://github.com/example/repo/pulls",
  },
};
