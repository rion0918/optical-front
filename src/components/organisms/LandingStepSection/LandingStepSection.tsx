import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text/Text";
import { StepCard } from "@/components/molecules/StepCard/StepCard";

export const LandingStepSection = () => {
  const steps = [
    {
      number: 1,
      title: "アカウント作成",
      description: "メールアドレスで簡単登録",
    },
    {
      number: 2,
      title: "テンプレート選択",
      description: "目的に合わせたテンプレートを選択",
    },
    {
      number: 3,
      title: "カスタマイズ開始",
      description: "オプションを追加してカスタマイズ",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <Text as="h2" size="lg" weight="semibold" className="text-3xl mb-12">
          簡単３ステップで始める
        </Text>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step) => (
            <StepCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>

        <Text
          as="h2"
          size="lg"
          weight="semibold"
          className="text-3xl mb-12 gap-8"
        >
          実際のデモ
        </Text>
        {/* デモ動画セクション */}
        <div className="w-full max-w-2xl mx-auto mt-12 mb-12">
          {" "}
          {/* 16:9のアスペクト比を維持 */}
          <iframe
            className="w-full aspect-video rounded-lg shadow-xl"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" //動画URLをここに挿入
            title="サービス紹介デモ" // 動画の内容に合わせて変更してください
            allow="accelerometer; autoplay; clipboard-write; 
                                    encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="container mx-auto px-6 text-center mt-12">
          <Button size="lg" className="px-8" asChild>
            <Link href="/auth/signup">
              <Text as="span" size="md" weight="medium">
                すぐにスケジュール管理を始める
              </Text>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
