/**
 * TeamReviewLoadOption コンポーネント用の型定義
 *
 * 共通型 (src/types/github.ts) を使用し、コンポーネント固有の Props を定義します。
 */

import type {
  ChangeReviewerRequest,
  GitHubPullRequest,
  GitHubUser,
  ReviewLoadLevel,
  TeamMemberReviewLoad,
} from "@/types/github";

// 共通型を再エクスポート（使いやすさのため）
export type {
  ChangeReviewerRequest,
  GitHubPullRequest,
  GitHubUser,
  ReviewLoadLevel,
  TeamMemberReviewLoad,
};

/**
 * TeamReviewLoadOption の Props
 */
export interface TeamReviewLoadOptionProps {
  /** チームメンバーのレビュー負荷一覧 */
  members: TeamMemberReviewLoad[];
  /** レビュアー変更時のコールバック */
  onReviewerChange?: (payload: ChangeReviewerRequest) => void;
}

// 後方互換性のために旧型もエクスポート（非推奨）
/**
 * @deprecated ReviewLoadLevel を使用してください
 */
export type LoadLevel = "high" | "medium" | "low";

/**
 * @deprecated GitHubUser を使用してください
 */
export type ReviewerOption = {
  username: string;
  displayName?: string;
  avatarUrl?: string;
};

/**
 * @deprecated GitHubPullRequest を使用してください
 */
export type PendingPullRequest = {
  id: string;
  title: string;
  repo: string;
  number: number;
  url: string;
  currentReviewer?: string;
  reviewerOptions?: ReviewerOption[];
};

/**
 * @deprecated TeamMemberReviewLoad を使用してください
 */
export type MemberReviewLoad = {
  username: string;
  reviewCount: number;
  loadLevel: LoadLevel;
  levelLabel?: string;
  barRate: number;
  pendingPullRequests?: PendingPullRequest[];
};

/**
 * @deprecated ChangeReviewerRequest を使用してください
 */
export interface ReviewerChangePayload {
  memberUsername: string;
  pullRequestId: string;
  reviewer: ReviewerOption;
  pullRequest?: PendingPullRequest;
}
