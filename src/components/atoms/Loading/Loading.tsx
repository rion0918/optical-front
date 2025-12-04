import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/utils_constants_styles/utils";

export type LoadingSize = "sm" | "md" | "lg" | "xl";
export type LoadingVariant = "default" | "overlay" | "inline" | "fullscreen";

export type LoadingProps = {
  /** ローディングのサイズ */
  size?: LoadingSize;
  /** ローディングの表示バリアント */
  variant?: LoadingVariant;
  /** ローディングメッセージ */
  message?: string;
  /** 追加のクラス名 */
  className?: string;
};

const sizeClasses: Record<LoadingSize, string> = {
  sm: "size-4",
  md: "size-6",
  lg: "size-10",
  xl: "size-16",
};

const containerClasses: Record<LoadingVariant, string> = {
  default: "flex items-center justify-center gap-3",
  inline: "inline-flex items-center gap-2",
  overlay:
    "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
  fullscreen: "flex h-screen w-screen items-center justify-center bg-muted/10",
};

/**
 * プロジェクト共通のローディングコンポーネント
 *
 * @example
 * // 基本的な使用
 * <Loading />
 *
 * @example
 * // メッセージ付き
 * <Loading message="読み込み中..." />
 *
 * @example
 * // オーバーレイ表示
 * <Loading variant="overlay" message="カレンダーを読み込み中..." />
 *
 * @example
 * // フルスクリーン表示
 * <Loading variant="fullscreen" size="lg" message="読み込み中..." />
 *
 * @example
 * // インライン表示
 * <Loading variant="inline" size="sm" message="処理中" />
 */
export function Loading({
  size = "md",
  variant = "default",
  message,
  className,
}: LoadingProps) {
  return (
    <div className={cn(containerClasses[variant], className)}>
      <div className="flex flex-col items-center gap-3">
        <Spinner className={cn(sizeClasses[size], "text-primary")} />
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    </div>
  );
}
