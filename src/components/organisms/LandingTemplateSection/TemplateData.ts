// src/components/organisms/LandingTemplateSection/TemplateData.ts

export type TemplateDetail = {
  title: string;
  points: string[];
  image: string;
};

export type LandingTemplate = {
  id: string;
  name: string;
  description: string;
  targetUser: string;
  options: string[];
};

export const templateData: LandingTemplate[] = [
  {
    id: "standard",
    name: "スタンダード",
    description: "最低限の予定管理をシンプルに実現",
    targetUser: "個人利用のライトユーザー向け",
    options: ["Option", "Option", "Option"],
  },
  {
    id: "creator",
    name: "クリエイター",
    description: "複数人での予定共有とプロジェクト管理が可能",
    targetUser: "チーム利用向け",
    options: ["Option", "Option", "Option"],
  },
  {
    id: "family",
    name: "ファミリー",
    description: "複数人での予定共有と管理に最適化",
    targetUser: "家族、友人グループ向け",
    options: ["Option", "Option", "Option"],
  },
];
