import type { Meta, StoryObj } from "@storybook/react";
import { LandingFeaturesSection } from "./LandingFeaturesSection";

const meta: Meta<typeof LandingFeaturesSection> = {
  title: "Organisms/FeaturesSection",
  component: LandingFeaturesSection,
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

type Story = StoryObj<typeof LandingFeaturesSection>;
export const Default: Story = {};
