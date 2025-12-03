/**
 * GitHub PR 情報の型定義
 */
export type PullRequestInfo = {
  /** PR の一意識別子 */
  id: number;
  /** PR のタイトル（例: "fix: ログインバグの修正"） */
  title: string;
  /** PR への GitHub URL */
  url: string;
  /** PR 作成者のユーザー名（例: "yamada"） */
  author: string;
  /** 緊急対応が必要かどうか */
  isUrgent?: boolean;
};
