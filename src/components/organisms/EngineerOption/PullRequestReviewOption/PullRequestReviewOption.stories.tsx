import type { Meta, StoryObj } from "@storybook/react";
import type { GitHubPullRequest } from "@/types/github";
import { PullRequestReviewOption } from "./index";

const mockRepository = {
  owner: "example",
  name: "repo",
};

const mockPullRequests: GitHubPullRequest[] = [
  {
    id: 1,
    number: 123,
    title: "fix: ログインバグの修正",
    url: "https://github.com/example/repo/pull/123",
    repository: mockRepository,
    author: { username: "yamada", displayName: "Yamada Taro" },
    reviewers: [],
    isUrgent: true,
    state: "open",
    createdAt: "2025-12-01T10:00:00Z",
    updatedAt: "2025-12-02T15:30:00Z",
  },
  {
    id: 2,
    number: 125,
    title: "feat: カレンダーAPI連携",
    url: "https://github.com/example/repo/pull/125",
    repository: mockRepository,
    author: { username: "tanaka", displayName: "Tanaka Hanako" },
    reviewers: [],
    isUrgent: false,
    state: "open",
    createdAt: "2025-12-02T09:00:00Z",
    updatedAt: "2025-12-02T14:00:00Z",
  },
  {
    id: 3,
    number: 127,
    title: "docs: READMEの更新",
    url: "https://github.com/example/repo/pull/127",
    repository: mockRepository,
    author: { username: "suzuki", displayName: "Suzuki Jiro" },
    reviewers: [],
    state: "open",
    createdAt: "2025-12-03T08:00:00Z",
    updatedAt: "2025-12-03T08:00:00Z",
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
        number: 200,
        title: "fix: 本番環境でのクリティカルバグ",
        url: "https://github.com/example/repo/pull/200",
        repository: mockRepository,
        author: { username: "hotfix-bot" },
        reviewers: [],
        isUrgent: true,
        state: "open",
        createdAt: "2025-12-01T10:00:00Z",
        updatedAt: "2025-12-01T10:00:00Z",
      },
      {
        id: 2,
        number: 201,
        title: "fix: セキュリティ脆弱性の修正",
        url: "https://github.com/example/repo/pull/201",
        repository: mockRepository,
        author: { username: "security-team" },
        reviewers: [],
        isUrgent: true,
        state: "open",
        createdAt: "2025-12-01T11:00:00Z",
        updatedAt: "2025-12-01T11:00:00Z",
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
        number: 123,
        title: "fix: ログインバグの修正",
        url: "https://github.com/example/repo/pull/123",
        repository: mockRepository,
        author: { username: "yamada" },
        reviewers: [],
        isUrgent: true,
        state: "open",
        createdAt: "2025-12-01T10:00:00Z",
        updatedAt: "2025-12-01T10:00:00Z",
      },
      {
        id: 2,
        number: 125,
        title: "feat: カレンダーAPI連携",
        url: "https://github.com/example/repo/pull/125",
        repository: mockRepository,
        author: { username: "tanaka" },
        reviewers: [],
        isUrgent: false,
        state: "open",
        createdAt: "2025-12-01T11:00:00Z",
        updatedAt: "2025-12-01T11:00:00Z",
      },
      {
        id: 3,
        number: 127,
        title: "docs: READMEの更新",
        url: "https://github.com/example/repo/pull/127",
        repository: mockRepository,
        author: { username: "suzuki" },
        reviewers: [],
        state: "open",
        createdAt: "2025-12-01T12:00:00Z",
        updatedAt: "2025-12-01T12:00:00Z",
      },
      {
        id: 4,
        number: 130,
        title: "feat: ユーザープロフィール機能追加",
        url: "https://github.com/example/repo/pull/130",
        repository: mockRepository,
        author: { username: "sato" },
        reviewers: [],
        isUrgent: true,
        state: "open",
        createdAt: "2025-12-01T13:00:00Z",
        updatedAt: "2025-12-01T13:00:00Z",
      },
      {
        id: 5,
        number: 132,
        title: "refactor: コンポーネント構成の見直し",
        url: "https://github.com/example/repo/pull/132",
        repository: mockRepository,
        author: { username: "takahashi" },
        reviewers: [],
        state: "open",
        createdAt: "2025-12-01T14:00:00Z",
        updatedAt: "2025-12-01T14:00:00Z",
      },
      {
        id: 6,
        number: 135,
        title: "fix: モバイル表示の崩れを修正",
        url: "https://github.com/example/repo/pull/135",
        repository: mockRepository,
        author: { username: "watanabe" },
        reviewers: [],
        state: "open",
        createdAt: "2025-12-01T15:00:00Z",
        updatedAt: "2025-12-01T15:00:00Z",
      },
    ],
    allPrsUrl: "https://github.com/example/repo/pulls",
  },
};
