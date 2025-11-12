"use client";

/**
 * 認証フック
 * AuthContext にアクセスするための便利なフック
 */

import { useContext } from "react";
import { AuthContext } from "@/components/providers/AuthProvider";

/**
 * 認証フック
 *
 * @returns 認証コンテキスト
 * @throws AuthProvider の外で使用された場合はエラー
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
