import type { Meta, StoryObj } from "@storybook/react";
import { FeatureCard } from "./FeatureCard";

const meta: Meta<typeof FeatureCard> = {
  title: "Molecules/FeatureCard",
  component: FeatureCard,
};
export default meta;

type Story = StoryObj<typeof FeatureCard>;

export const Default: Story = {
  args: {
    title: "簡単導入",
    description: "すぐに始められる簡単セットアップ",
  },
};
