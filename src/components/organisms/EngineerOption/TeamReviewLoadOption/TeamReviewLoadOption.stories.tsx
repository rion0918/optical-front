import type { Meta, StoryObj } from "@storybook/react";
import type { TeamMemberReviewLoad } from "@/types/github";
import { TeamReviewLoadOption } from "./TeamReviewLoadOption";

const exampleRepo = {
  owner: "TokujyouKaisennDonnburi",
  name: "calendar-front",
};

const mockMembers: TeamMemberReviewLoad[] = [
  {
    member: { username: "sato", displayName: "Sato Taro" },
    reviewCount: 5,
    loadLevel: "high",
    loadLevelLabel: "高負荷",
    loadBarRate: 1,
    availableReviewers: [
      { username: "suzuki", displayName: "Akari Suzuki" },
      { username: "you", displayName: "You" },
      { username: "nakamura", displayName: "Nakamura" },
    ],
    pendingPullRequests: [
      {
        id: 134,
        number: 134,
        title: "fix: カレンダーウィザードのバリデーション",
        url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/134",
        repository: exampleRepo,
        author: { username: "someone" },
        reviewers: [{ username: "sato" }],
        state: "open",
        createdAt: "2025-12-01T10:00:00Z",
        updatedAt: "2025-12-02T15:30:00Z",
      },
      {
        id: 140,
        number: 140,
        title: "chore: Storybook CI improvements",
        url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/140",
        repository: exampleRepo,
        author: { username: "someone" },
        reviewers: [{ username: "sato" }],
        state: "open",
        createdAt: "2025-12-01T11:00:00Z",
        updatedAt: "2025-12-02T16:00:00Z",
      },
      {
        id: 141,
        number: 141,
        title: "refactor: useSchedule メモ化",
        url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/141",
        repository: exampleRepo,
        author: { username: "someone" },
        reviewers: [{ username: "sato" }],
        state: "open",
        createdAt: "2025-12-01T12:00:00Z",
        updatedAt: "2025-12-02T17:00:00Z",
      },
      {
        id: 142,
        number: 142,
        title: "feat: カレンダー共有設定",
        url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/142",
        repository: exampleRepo,
        author: { username: "someone" },
        reviewers: [{ username: "sato" }],
        state: "open",
        createdAt: "2025-12-01T13:00:00Z",
        updatedAt: "2025-12-02T18:00:00Z",
      },
      {
        id: 143,
        number: 143,
        title: "fix: PR ロード指標",
        url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/143",
        repository: exampleRepo,
        author: { username: "someone" },
        reviewers: [{ username: "sato" }],
        state: "open",
        createdAt: "2025-12-01T14:00:00Z",
        updatedAt: "2025-12-02T19:00:00Z",
      },
    ],
  },
  {
    member: { username: "suzuki", displayName: "Akari Suzuki" },
    reviewCount: 3,
    loadLevel: "medium",
    loadBarRate: 0.6,
    availableReviewers: [
      { username: "sato", displayName: "Sato Taro" },
      { username: "you", displayName: "You" },
    ],
    pendingPullRequests: [
      {
        id: 120,
        number: 120,
        title: "feat: Slack 通知オプション",
        url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/120",
        repository: exampleRepo,
        author: { username: "someone" },
        reviewers: [{ username: "suzuki" }],
        state: "open",
        createdAt: "2025-12-02T09:00:00Z",
        updatedAt: "2025-12-03T10:00:00Z",
      },
      {
        id: 121,
        number: 121,
        title: "docs: QA ガイドライン",
        url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/121",
        repository: exampleRepo,
        author: { username: "someone" },
        reviewers: [{ username: "suzuki" }],
        state: "open",
        createdAt: "2025-12-02T10:00:00Z",
        updatedAt: "2025-12-03T11:00:00Z",
      },
      {
        id: 122,
        number: 122,
        title: "chore: lint ワークフロー",
        url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/122",
        repository: exampleRepo,
        author: { username: "someone" },
        reviewers: [{ username: "suzuki" }],
        state: "open",
        createdAt: "2025-12-02T11:00:00Z",
        updatedAt: "2025-12-03T12:00:00Z",
      },
    ],
  },
  {
    member: { username: "you", displayName: "You" },
    reviewCount: 1,
    loadLevel: "low",
    loadLevelLabel: "空きあり",
    loadBarRate: 0.2,
    availableReviewers: [
      { username: "sato", displayName: "Sato Taro" },
      { username: "suzuki", displayName: "Akari Suzuki" },
    ],
    pendingPullRequests: [
      {
        id: 150,
        number: 150,
        title: "docs: API ガイドの更新",
        url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/150",
        repository: exampleRepo,
        author: { username: "someone" },
        reviewers: [{ username: "you" }],
        state: "open",
        createdAt: "2025-12-03T08:00:00Z",
        updatedAt: "2025-12-03T09:00:00Z",
      },
    ],
  },
];

const meta: Meta<typeof TeamReviewLoadOption> = {
  title: "Organisms/TeamReviewLoadOption",
  component: TeamReviewLoadOption,
  parameters: {
    docs: {
      description: {
        component:
          "チームメンバーごとのレビュー待ち PR 件数・負荷レベル・PR リスト・レビュアー候補を props で受け取り描画するオプション UI。データ取得／負荷分類／レビュアー候補計算／GitHub API 呼び出しは上位層の責務であり、このコンポーネントは受け取った値を表示し、ユーザー操作イベントをコールバックで通知するだけです。",
        story:
          "モックデータと action logger を組み合わせ、レビュアー変更時にどの payload が発火するかを Storybook 上で確認できます。",
      },
    },
  },
  args: {
    members: mockMembers,
    onReviewerChange: (payload) =>
      console.log("reviewer-change", JSON.stringify(payload, null, 2)),
  },
  argTypes: {
    members: {
      control: { type: "object" },
      description:
        "GitHub API など外部で取得した `TeamMemberReviewLoad[]` を渡します。pendingPullRequests や availableReviewers も含め、表示前に整形してください。",
    },
    onReviewerChange: {
      action: "reviewer-change",
      description:
        "レビュアー変更トリガーを受け取るコールバック。ChangeReviewerRequest 型のペイロードが渡されます。API 呼び出しは上位レイヤーで行います。",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TeamReviewLoadOption>;

export const Primary: Story = {
  args: {
    members: mockMembers,
  },
};

export const LinkOnlyFallback: Story = {
  args: {
    members: mockMembers,
    onReviewerChange: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          "レビュアー変更コールバックを渡さない場合、各 PR には GitHub への遷移ボタンのみが表示されます。",
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    members: [],
  },
  parameters: {
    docs: {
      description: {
        story: "メンバーがいない状態を確認するためのストーリー。",
      },
    },
  },
};
