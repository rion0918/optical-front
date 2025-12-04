import type { Meta, StoryObj } from "@storybook/react";
import { GeneralSearchHeader } from "./GeneralSearchHeader";

const meta: Meta<typeof GeneralSearchHeader> = {
  title: "Organisms/GeneralSearchHeader",
  component: GeneralSearchHeader,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GeneralSearchHeader>;

export const Default: Story = {
  render: () => <GeneralSearchHeader />,
};

export const WithPreselectedFilters: Story = {
  render: () => {
    // Wrapper コンポーネントを使って初期値を設定する
    return (
      <div className="space-y-4">
        <GeneralSearchHeader />
      </div>
    );
  },
};
