import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";

export const LandingHero = () => {
  return (
    <section className="h-[80vh] flex flex-col items-center justify-center text-center bg-gray-50 px-6">
      <Text as="h1" size="lg" weight="bold" className="text-5xl font-bold mb-4">
        最適化されたスケジュール管理
      </Text>

      <Text as="p" size="md" className="text-lg text-gray-700 mb-8">
        あなたのスタイルに合わせてカスタムされた<br />
        スケジュール管理を始めませんか
      </Text>

      <Button size="lg" className="px-8" asChild>
        <a href="/login">
          <Text as="span" size="md" weight="medium">新規登録</Text>
        </a>
      </Button>
    </section>
  );
};
