import type { Meta, StoryObj } from "@storybook/react";
import { LandingFooter } from "./LandingFooter";

const meta: Meta<typeof LandingFooter> = {
  title: "Organisms/LandingFooter",
  component: LandingFooter,
};

export default meta;

type Story = StoryObj<typeof LandingFooter>;

export const Default: Story = {};
