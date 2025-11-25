import type { Meta, StoryObj } from "@storybook/react";
import { LandingOptionSection } from "./LandingOptionSection";

const meta: Meta<typeof LandingOptionSection> = {
  title: "Organisms/LandingOptionSection",
  component: LandingOptionSection,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LandingOptionSection>;

export const Default: Story = {};
