import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import {
  type CalendarWizardCustomOption,
  CalendarWizardOptionsForm,
  type CalendarWizardTemplate,
} from "./CalendarWizardOptionsForm";

const meta: Meta<typeof CalendarWizardOptionsForm> = {
  title: "Molecules/CalendarWizardOptionsForm",
  component: CalendarWizardOptionsForm,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CalendarWizardOptionsForm>;

const TEMPLATES: CalendarWizardTemplate[] = [
  {
    id: "collaboration",
    name: "コラボ",
    description: "共同で予定を作成し、コメントで調整できます。",
    accentColor: "#a855f7",
    badge: "推奨",
    features: [
      { label: "リアルタイム共同編集", included: true },
      { label: "コメント・レビュー", included: true },
      { label: "アクセス権限レベル", included: true },
      { label: "高度な分析レポート", included: false },
    ],
  },
  {
    id: "dev",
    name: "Dev",
    description: "開発チーム向けのボードと連携機能が含まれます。",
    accentColor: "#22c55e",
    features: [
      { label: "スプリントビュー", included: true },
      { label: "Git連携", included: true },
      { label: "ベロシティレポート", included: false },
      { label: "ステークホルダー共有", included: true },
    ],
  },
  {
    id: "full",
    name: "フル",
    description: "ビジネス全体を俯瞰するための完全なパッケージ。",
    accentColor: "#0ea5e9",
    features: [
      { label: "エグゼクティブダッシュボード", included: true },
      { label: "マルチチーム権限", included: true },
      { label: "外部顧客ポータル", included: true },
      { label: "AI予測支援", included: true },
    ],
  },
];

const CUSTOM_OPTIONS: CalendarWizardCustomOption[] = [
  {
    id: "reminder_digest",
    label: "リマインダーサマリメール",
    description: "翌日の予定をまとめてメール通知します。",
  },
  {
    id: "task_inbox",
    label: "インボックス連携",
    description: "メール経由で受け取ったタスクを自動で追加します。",
  },
  {
    id: "weekly_report",
    label: "週次レポート",
    description: "毎週のアクティビティをまとめて配信します。",
  },
];

export const Playground: Story = {
  render: () => {
    const [selectedTemplateId, setSelectedTemplateId] = useState(
      TEMPLATES[0].id,
    );
    const [selectedCustomOptions, setSelectedCustomOptions] = useState<
      Record<string, boolean>
    >({
      reminder_digest: true,
      task_inbox: false,
      weekly_report: false,
    });

    return (
      <CalendarWizardOptionsForm
        templates={TEMPLATES}
        selectedTemplateId={selectedTemplateId}
        onSelectTemplate={setSelectedTemplateId}
        customOptions={CUSTOM_OPTIONS}
        selectedCustomOptions={selectedCustomOptions}
        onToggleCustomOption={(optionId) =>
          setSelectedCustomOptions((prev) => ({
            ...prev,
            [optionId]: !prev[optionId],
          }))
        }
      />
    );
  },
};
