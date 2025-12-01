import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";

export const LandingHero = () => {
  return (
    <section className="min-h-screen flex flex-col items-start justify-start text-left bg-gray-50 pt-[20%]">
      <div className="container mx-auto px-6 flex flex-col items-start flex-grow">
        {/* テキストの左寄せ表示 */}
        <div>
          <Text
            as="h1"
            size="lg"
            weight="bold"
            className="text-5xl font-bold mb-8"
          >
            最適化されたスケジュール管理
          </Text>

          <Text as="p" size="md" className="text-lg text-gray-700 mb-8">
            あなたのスタイルに合わせてカスタムされた
            <br />
            スケジュール管理を始めませんか
          </Text>
        </div>

        {/* ボタンは右寄せ表示 */}
        <div className="mt-auto pb-[10%] flex justify-end w-full">
          <Link href="/auth/signup">
            <Button size="lg" className="px-25 mr-[10%]" asChild>
              <Text as="span" size="md" weight="medium">
                カレンダーを作成する
              </Text>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};