import type { Meta, StoryObj } from "@storybook/react";
import { LandingStepSection } from "./LandingStepSection";

const meta: Meta<typeof LandingStepSection> = {
    component: LandingStepSection,
    title: "Organisms/LandingStepSection",
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LandingStepSection>;

export const Default: Story = {};