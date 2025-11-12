"use client";

/**
 * OAuth コールバックページ
 * Google 認証後にリダイレクトされるページ
 */

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { saveToken } from "@/lib/auth";

/**
 * OAuth コールバックページコンポーネント
 */
export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshAuth } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      // トークンを取得
      const token = searchParams.get("token");
      const errorParam = searchParams.get("error");

      // エラーがある場合
      if (errorParam) {
        const errorMessage = "Google認証に失敗しました";
        setError(errorMessage);
        toast.error(errorMessage);

        // 数秒後にログインページにリダイレクト
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
        return;
      }

      // トークンが存在しない場合
      if (!token) {
        const errorMessage = "認証トークンが見つかりません";
        setError(errorMessage);
        toast.error(errorMessage);

        // 数秒後にログインページにリダイレクト
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
        return;
      }

      // トークンを保存
      saveToken(token);

      // 認証状態を更新
      await refreshAuth();

      // 成功メッセージ
      toast.success("Googleでログインしました");

      // カレンダーページにリダイレクト
      router.push("/");
    };

    void handleCallback();
  }, [searchParams, router, refreshAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        {error ? (
          <>
            <div className="text-red-600">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                role="img"
                aria-label="Error icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              認証に失敗しました
            </h2>
            <p className="text-gray-600">{error}</p>
            <p className="text-sm text-gray-500">
              ログインページにリダイレクトします...
            </p>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">認証中...</h2>
            <p className="text-gray-600">
              Google認証を処理しています。しばらくお待ちください。
            </p>
          </>
        )}
      </div>
    </div>
  );
}
