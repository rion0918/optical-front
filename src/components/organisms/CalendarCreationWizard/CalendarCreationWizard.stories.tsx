import type { Meta, StoryObj } from "@storybook/react";

import { CalendarCreationWizard } from "./CalendarCreationWizard";

const meta: Meta<typeof CalendarCreationWizard> = {
  title: "Organisms/CalendarCreationWizard",
  component: CalendarCreationWizard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof CalendarCreationWizard>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <CalendarCreationWizard />
    </div>
  ),
};
