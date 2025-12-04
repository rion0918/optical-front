// src/components/organisms/LandingTemplateSection/LandingTemplateSection.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { LandingTemplateSection } from "./LandingTemplateSection";

const meta: Meta<typeof LandingTemplateSection> = {
  title: "Organisms/LandingTemplateSection",
  component: LandingTemplateSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof LandingTemplateSection>;

export const Default: Story = {};

export const OpenModal: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 2枚目のカード（クリエイター）をクリック
    const creatorCard = await canvas.getByText("クリエイター");
    await userEvent.click(creatorCard);
  },
};
