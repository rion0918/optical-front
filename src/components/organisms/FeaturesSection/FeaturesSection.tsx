import { FeatureCard } from "@/components/molecules/FeatureCard";

export const FeaturesSection = () => {
  const features = [
    { title: "簡単導入", description: "すぐに始められる簡単セットアップ" },
    { title: "柔軟なオプション", description: "必要な機能だけを選択可能" },
    { title: "容易な管理", description: "複数グループを一括管理" },
  ];

  return (
    <section id="features" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6 text-center space-y-12">
        <h2 className="text-3xl font-semibold">製品紹介</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <FeatureCard key={idx} title={f.title} description={f.description} />
          ))}
        </div>
      </div>
    </section>
  );
};
