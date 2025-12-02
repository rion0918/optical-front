// src/components/molecules/LandingTemplateCard/LandingTemplateCard.stories.tsx

import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { templateData } from "@/components/organisms/LandingTemplateSection/TemplateData";
import { LandingTemplateCard } from "./LandingTemplateCard";

const meta: Meta<typeof LandingTemplateCard> = {
  title: "Molecules/LandingTemplateCard",
  component: LandingTemplateCard,
  tags: ["autodocs"],
  args: {
    onClick: action("card-click"),
  },
};

export default meta;
type Story = StoryObj<typeof LandingTemplateCard>;

export const Standard: Story = {
  args: {
    template: templateData[0],
  },
};

export const Creator: Story = {
  args: {
    template: templateData[1],
  },
};

export const Family: Story = {
  args: {
    template: templateData[2],
  },
};
