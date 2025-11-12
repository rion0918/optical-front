"use client";

/**
 * ログインフォームコンポーネント
 */

import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useAuth } from "@/hooks/useAuth";

/**
 * ログインフォーム
 */
export function LoginForm() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  /**
   * フォームのバリデーション
   */
  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    // メールアドレスの検証
    if (!email) {
      newErrors.email = "メールアドレスは必須です";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }

    // パスワードの検証
    if (!password) {
      newErrors.password = "パスワードは必須です";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * フォーム送信ハンドラー
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // バリデーション
    if (!validate()) {
      return;
    }

    try {
      await login({ email, password });
    } catch {
      // エラーは AuthProvider で処理される
    }
  };

  return (
    <Card className="w-full border-0 shadow-xl">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold text-center">
          ログイン
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* メールアドレス */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              メールアドレス
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="h-11"
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-sm text-red-600 flex items-center gap-1"
              >
                <span className="text-xs">⚠</span>
                {errors.email}
              </p>
            )}
          </div>

          {/* パスワード */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              パスワード
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              className="h-11"
            />
            {errors.password && (
              <p
                id="password-error"
                className="text-sm text-red-600 flex items-center gap-1"
              >
                <span className="text-xs">⚠</span>
                {errors.password}
              </p>
            )}
          </div>

          {/* ログインボタン */}
          <Button
            type="submit"
            className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                ログイン中...
              </span>
            ) : (
              "ログイン"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
