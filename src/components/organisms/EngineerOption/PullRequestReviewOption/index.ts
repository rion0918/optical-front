// 共通型を re-export（使いやすさのため）
export type { GitHubPullRequest } from "@/types/github";
export type { PullRequestReviewOptionProps } from "./PullRequestReviewOption";
export { PullRequestReviewOption } from "./PullRequestReviewOption";

// 後方互換性のため（非推奨）
export type { PullRequestInfo } from "./types";
