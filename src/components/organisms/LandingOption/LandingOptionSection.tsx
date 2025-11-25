"use client";

import { useState } from "react";
import { LandingOptionCard } from "@/components/molecules/LandingOptionCard/LandingOptionCard";
import { LandingOptionModal } from "./LandingOptionModal";
import { optionData as OPTIONS, LandingOption } from "./OptionData";
import { Text } from "@/components/atoms/Text";

export const LandingOptionSection = () => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const selectedOption: LandingOption | undefined = OPTIONS.find(
    (opt) => opt.id === selectedOptionId
  );

  return (
    <section id="options" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6 text-center space-y-12">
        <Text as="h2" size="lg" weight="semibold" className="text-3xl">
          Option 制について
        </Text>
        <Text as="p" size="md" className="text-lg text-gray-700 mb-8">
          あなたに最適なスタイルを選ぶために、目的ごとのオプションを用意しています
        </Text>
      </div>

      {/* 横並びカード */}
      <div className="grid md:grid-cols-3 gap-8">
        {OPTIONS.map((option) => (
          <LandingOptionCard
            key={option.id}
            option={option}
            onClick={(id) => setSelectedOptionId(id)}
          />
        ))}
      </div>

      {/* モーダル表示 */}
      {selectedOption && (
        <LandingOptionModal
          option={selectedOption}
          onClose={() => setSelectedOptionId(null)}
        />
      )}
    </section>
  );
};
