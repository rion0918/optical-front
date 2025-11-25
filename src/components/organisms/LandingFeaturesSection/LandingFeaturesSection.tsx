import { Card } from "@/components/atoms/Card";
import { Text } from "@/components/atoms/Text";

export const LandingFeaturesSection = () => {
  const features = [
    { title: "簡単導入", description: "すぐに始められる簡単セットアップ" },
    { title: "柔軟なオプション", description: "必要な機能だけを選択可能" },
    { title: "容易な管理", description: "複数グループを一括管理" },
  ];

  return (
    <section id="features" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6 text-center space-y-12">
        <Text as="h2" size="lg" weight="semibold" className="text-3xl">
          製品紹介
        </Text>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <Card key={idx} className="p-6 text-left">
              <Text as="h3" size="lg" weight="bold" className="mb-2">
                {f.title}
              </Text>
              <Text className="text-gray-700">{f.description}</Text>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
