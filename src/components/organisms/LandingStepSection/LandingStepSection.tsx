import { Text } from "@/components/atoms/Text/Text";
import { Button } from "@/components/atoms/Button";

export const LandingStepSection = () => {
    const steps = [
        { number: 1,
            title: "テンプレート選択",
            description: "目的に合ったテンプレートを選ぶ"
        },
        { number: 2,
            title: "オプション選択",
            description: "用途に合わせたオプションを選択"
        },
        { number: 3,
            title: "スケジュール管理開始",
            description: "予定の追加・共有を始める"
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 text-center">
                <Text as="h2" size="lg" weight="semibold" className="text-3xl mb-12">
                    あなたに合ったスケジュール管理を始めるまでの3ステップ
                </Text>
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step) => (
                        <div key={step.number} className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-4xl font-bold text-blue-600 mb-4">
                                {step.number}
                            </div>
                            <Text as="h3" size="lg" weight="bold" className="mb-2">
                                {step.title}
                            </Text>
                            <Text className="text-gray-700">
                                {step.description}
                            </Text>
                        </div>
                    ))}
                </div>
                {/* デモ動画セクション */}
                <div className="relative w-full max-w-2xl mx-auto mt-12 mb-12" style={{ paddingTop: '56.25%' }}> {/* 16:9のアスペクト比を維持 */}
                    <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-xl"
                            src=""//動画URLをここに挿入
                            title="サービス紹介デモ" // 動画の内容に合わせて変更してください
                            allow="accelerometer; autoplay; clipboard-write; 
                                    encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                    ></iframe>
                </div>
                <div className="container mx-auto px-6 text-center mt-12">
                    <Button size="lg" className="px-8" asChild>
                        <a href="/login">
                            <Text as="span" size="md" weight="medium">すぐにスケジュール管理を始める</Text>
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
};