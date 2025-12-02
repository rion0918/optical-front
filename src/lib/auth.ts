/**
 * 認証ユーティリティ
 * JWT トークンの保存・取得・削除と認証関連のヘルパー関数
 */

const TOKEN_KEY = "auth_token";

/**
 * JWT トークンを localStorage に保存する
 *
 * @param token - JWT トークン
 */
export function saveToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * localStorage から JWT トークンを取得する
 *
 * @returns JWT トークン、存在しない場合は null
 */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * localStorage から JWT トークンを削除する
 */
export function removeToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * 現在のトークンが有効かチェックする
 *
 * @returns トークンが有効な場合は true
 */
export function isAuthenticated(): boolean {
  const token = getToken();
  if (!token) {
    return false;
  }

  // トークンの有効期限チェック
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return false;
    }

    const payload = parts[1];
    const decoded = atob(payload);
    const data = JSON.parse(decoded) as Record<string, unknown>;

    if (typeof data.exp !== "number") {
      return false;
    }

    // exp は秒単位なので、ミリ秒に変換
    const expirationTime = data.exp * 1000;
    return Date.now() < expirationTime;
  } catch {
    return false;
  }
}
