/**
 * PullRequestReviewOption コンポーネント用の型定義
 *
 * 共通型 (src/types/github.ts) を使用し、コンポーネント固有の Props を定義します。
 */

import type { GitHubPullRequest } from "@/types/github";

/**
 * PullRequestReviewOption の Props
 */
export type PullRequestReviewOptionProps = {
  /** レビュー待ちの PR 一覧 */
  pullRequests: GitHubPullRequest[];
  /** GitHub リポジトリの PR 一覧へのリンク（フッター用） */
  allPrsUrl?: string;
  /** カスタム className */
  className?: string;
};

// 後方互換性のために旧型もエクスポート（非推奨）
/**
 * @deprecated GitHubPullRequest を使用してください
 */
export type PullRequestInfo = {
  id: number;
  title: string;
  url: string;
  author: string;
  isUrgent?: boolean;
};
