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
