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
 * JWT トークンが存在するかチェックする
 *
 * @returns トークンが存在する場合は true
 */
export function hasToken(): boolean {
  return getToken() !== null;
}

/**
 * JWT トークンをデコードする（検証はしない）
 *
 * @param token - JWT トークン
 * @returns デコードされたペイロード
 */
export function decodeToken(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    const decoded = atob(payload);
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * JWT トークンの有効期限が切れているかチェックする
 *
 * @param token - JWT トークン
 * @returns 有効期限が切れている場合は true
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded || typeof decoded.exp !== "number") {
    return true;
  }

  // exp は秒単位なので、ミリ秒に変換
  const expirationTime = decoded.exp * 1000;
  return Date.now() >= expirationTime;
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

  return !isTokenExpired(token);
}
