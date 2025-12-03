/**
 * GitHub 関連のモックデータ
 * 開発環境でテストに使用する GitHub PR・レビュー情報
 */

import type {
  GitHubPullRequest,
  GitHubRepository,
  TeamMemberReviewLoad,
} from "@/types/github";

/**
 * 共通リポジトリ情報
 */
export const mockRepository: GitHubRepository = {
  owner: "TokujyouKaisennDonnburi",
  name: "calendar-front",
};

/**
 * モック Pull Request データ
 * PullRequestReviewOption コンポーネントで使用
 */
export const mockPullRequests: GitHubPullRequest[] = [
  {
    id: 1001,
    number: 123,
    title:
      "fix: ログインバグの修正を行うことで素晴らしいユーザー体験を提供する",
    url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/123",
    repository: mockRepository,
    author: { username: "yamada", displayName: "Yamada Taro" },
    reviewers: [{ username: "tanaka" }],
    isUrgent: true,
    state: "open",
    createdAt: "2025-12-01T10:00:00Z",
    updatedAt: "2025-12-02T15:30:00Z",
  },
  {
    id: 1002,
    number: 125,
    title: "feat: カレンダーAPI連携",
    url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/125",
    repository: mockRepository,
    author: { username: "tanaka", displayName: "Tanaka Hanako" },
    reviewers: [{ username: "suzuki" }],
    isUrgent: false,
    state: "open",
    createdAt: "2025-12-02T09:00:00Z",
    updatedAt: "2025-12-02T14:00:00Z",
  },
  {
    id: 1003,
    number: 127,
    title: "docs: READMEの更新",
    url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/127",
    repository: mockRepository,
    author: { username: "suzuki", displayName: "Suzuki Jiro" },
    reviewers: [],
    state: "open",
    createdAt: "2025-12-03T08:00:00Z",
    updatedAt: "2025-12-03T08:00:00Z",
  },
];

/**
 * モックチームメンバーレビュー負荷データ
 * TeamReviewLoadOption コンポーネントで使用
 */
export const mockTeamMembers: TeamMemberReviewLoad[] = [
  {
    member: { username: "yamada", displayName: "Yamada Taro" },
    reviewCount: 5,
    loadLevel: "high",
    loadLevelLabel: "高負荷",
    loadBarRate: 1,
    availableReviewers: [
      { username: "tanaka", displayName: "Tanaka Hanako" },
      { username: "suzuki", displayName: "Suzuki Jiro" },
    ],
    pendingPullRequests: [
      {
        id: 2001,
        number: 201,
        title: "fix: ログインバグの修正",
        url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/201",
        repository: mockRepository,
        author: { username: "someone" },
        reviewers: [{ username: "yamada" }],
        state: "open",
        createdAt: "2025-12-01T10:00:00Z",
        updatedAt: "2025-12-02T15:30:00Z",
      },
      {
        id: 2002,
        number: 202,
        title: "feat: 新しいダッシュボード",
        url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/202",
        repository: mockRepository,
        author: { username: "someone" },
        reviewers: [{ username: "yamada" }],
        state: "open",
        createdAt: "2025-12-01T11:00:00Z",
        updatedAt: "2025-12-02T16:00:00Z",
      },
      {
        id: 2003,
        number: 203,
        title: "refactor: ユーティリティ関数",
        url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/203",
        repository: mockRepository,
        author: { username: "someone" },
        reviewers: [{ username: "yamada" }],
        state: "open",
        createdAt: "2025-12-01T12:00:00Z",
        updatedAt: "2025-12-02T17:00:00Z",
      },
      {
        id: 2004,
        number: 204,
        title: "docs: API ドキュメント更新",
        url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/204",
        repository: mockRepository,
        author: { username: "someone" },
        reviewers: [{ username: "yamada" }],
        state: "open",
        createdAt: "2025-12-01T13:00:00Z",
        updatedAt: "2025-12-02T18:00:00Z",
      },
      {
        id: 2005,
        number: 205,
        title: "chore: 依存パッケージ更新",
        url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/205",
        repository: mockRepository,
        author: { username: "someone" },
        reviewers: [{ username: "yamada" }],
        state: "open",
        createdAt: "2025-12-01T14:00:00Z",
        updatedAt: "2025-12-02T19:00:00Z",
      },
    ],
  },
  {
    member: { username: "tanaka", displayName: "Tanaka Hanako" },
    reviewCount: 3,
    loadLevel: "medium",
    loadBarRate: 0.6,
    availableReviewers: [
      { username: "yamada", displayName: "Yamada Taro" },
      { username: "suzuki", displayName: "Suzuki Jiro" },
    ],
    pendingPullRequests: [
      {
        id: 3001,
        number: 301,
        title: "fix: タイムゾーン対応",
        url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/301",
        repository: mockRepository,
        author: { username: "someone" },
        reviewers: [{ username: "tanaka" }],
        state: "open",
        createdAt: "2025-12-02T09:00:00Z",
        updatedAt: "2025-12-03T10:00:00Z",
      },
      {
        id: 3002,
        number: 302,
        title: "feat: 通知設定オプション",
        url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/302",
        repository: mockRepository,
        author: { username: "someone" },
        reviewers: [{ username: "tanaka" }],
        state: "open",
        createdAt: "2025-12-02T10:00:00Z",
        updatedAt: "2025-12-03T11:00:00Z",
      },
      {
        id: 3003,
        number: 303,
        title: "test: ユニットテスト追加",
        url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/303",
        repository: mockRepository,
        author: { username: "someone" },
        reviewers: [{ username: "tanaka" }],
        state: "open",
        createdAt: "2025-12-02T11:00:00Z",
        updatedAt: "2025-12-03T12:00:00Z",
      },
    ],
  },
  {
    member: { username: "suzuki", displayName: "Suzuki Jiro" },
    reviewCount: 1,
    loadLevel: "low",
    loadLevelLabel: "空きあり",
    loadBarRate: 0.2,
    availableReviewers: [
      { username: "yamada", displayName: "Yamada Taro" },
      { username: "tanaka", displayName: "Tanaka Hanako" },
    ],
    pendingPullRequests: [
      {
        id: 4001,
        number: 401,
        title: "docs: README 更新",
        url: "https://github.com/TokujyouKaisennDonnburi/calendar-front/pull/401",
        repository: mockRepository,
        author: { username: "someone" },
        reviewers: [{ username: "suzuki" }],
        state: "open",
        createdAt: "2025-12-03T08:00:00Z",
        updatedAt: "2025-12-03T09:00:00Z",
      },
    ],
  },
];

/**
 * 全 PR を見る GitHub URL
 */
export const mockAllPrsUrl = "https://github.com/pulls/review-requested";
