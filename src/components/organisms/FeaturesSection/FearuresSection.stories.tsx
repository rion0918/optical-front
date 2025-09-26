import type { Meta, StoryObj } from "@storybook/react";
import { FeaturesSection } from "./FeaturesSection";

const meta: Meta<typeof FeaturesSection> = {
  title: "Organisms/FeaturesSection",
  component: FeaturesSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "ランディングページの製品紹介セクション。カード形式で特徴を表示。",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof FeaturesSection>;
export const Default: Story = {};
