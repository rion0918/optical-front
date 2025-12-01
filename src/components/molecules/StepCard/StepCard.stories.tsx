import type { Meta, StoryObj } from "@storybook/react";
import { StepCard } from "./StepCard";

const meta: Meta<typeof StepCard> = {
    component: StepCard,
    title: "Molecules/StepCard",
    tags: ["autodocs"],
    argTypes: {
        number: { control: "number" },
        title: { control: "text" },
        description: { control: "text" },
    },
};

export default meta;
type Story = StoryObj<typeof StepCard>;

export const Default: Story = {
    args: {
        number: 1,
        title: "アカウント登録",
        description: "簡単な登録でアカウントを作成します。",
    },
};

export const StepTwo: Story = {
    args: {
        number: 2,
        title: "テンプレート選択",
        description: "目的に合ったテンプレートを選ぶ",
    },
};