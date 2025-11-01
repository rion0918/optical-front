import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { CalendarWizardStepIndicator } from "./CalendarWizardStepIndicator";

const meta: Meta<typeof CalendarWizardStepIndicator> = {
  title: "Molecules/CalendarWizardStepIndicator",
  component: CalendarWizardStepIndicator,
  tags: ["autodocs"],
  args: {
    steps: [
      { label: "基本情報" },
      { label: "メンバー招待" },
      { label: "オプション選択" },
    ],
    currentIndex: 0,
  },
};

export default meta;

type Story = StoryObj<typeof CalendarWizardStepIndicator>;

export const Default: Story = {
  render: (args) => {
    const [currentIndex, setCurrentIndex] = useState(args.currentIndex ?? 0);
    return (
      <div className="max-w-3xl space-y-4">
        <CalendarWizardStepIndicator {...args} currentIndex={currentIndex} />
        <div className="flex gap-2 text-sm">
          {args.steps?.map((step, index) => (
            <button
              key={step.label}
              type="button"
              className="rounded border border-border px-3 py-1 hover:border-primary"
              onClick={() => setCurrentIndex(index)}
            >
              Step {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  },
};
