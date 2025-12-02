// src/components/organisms/LandingTemplateSection/LandingTemplateSection.tsx
"use client";

import { useState } from "react";
import { LandingTemplateCard } from "@/components/molecules/LandingTemplateCard";
import { Text } from "@/components/atoms/Text";
import { templateData, type LandingTemplate } from "./TemplateData";

export const LandingTemplateSection = () => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<LandingTemplate | null>(null);

  const handleCardClick = (id: string) => {
    const template = templateData.find((t) => t.id === id);
    if (template) {
      setSelectedTemplate(template);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <Text as="h2" size="lg" weight="semibold" className="text-3xl mb-12">
          テンプレートから始める
        </Text>
        <Text
          as="p"
          size="md"
          className="mx-auto mb-12 max-w-2xl text-gray-600"
        >
          個人利用からチーム、家族との共有まで、目的ごとに最適なテンプレートをご用意しました。
        </Text>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {templateData.map((template) => (
            <LandingTemplateCard
              key={template.id}
              template={template}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
