import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { CalendarWizardMembersForm } from "./CalendarWizardMembersForm";

const meta: Meta<typeof CalendarWizardMembersForm> = {
  title: "Molecules/CalendarWizardMembersForm",
  component: CalendarWizardMembersForm,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CalendarWizardMembersForm>;

const createMember = (id: number, email = "") => ({
  id: `member-${id}`,
  email,
});

export const Playground: Story = {
  render: () => {
    const [members, setMembers] = useState([
      createMember(1, "team@example.com"),
      createMember(2),
    ]);

    return (
      <div className="max-w-2xl">
        <CalendarWizardMembersForm
          members={members}
          hasError={members.some((member) => {
            const trimmed = member.email.trim();
            return (
              trimmed.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
            );
          })}
          onChangeMember={(memberId, email) => {
            setMembers((prev) =>
              prev.map((member) =>
                member.id === memberId ? { ...member, email } : member,
              ),
            );
          }}
          onAddMember={() => {
            setMembers((prev) => [...prev, createMember(prev.length + 1)]);
          }}
          onRemoveMember={(memberId) => {
            setMembers((prev) =>
              prev.filter((member) => member.id !== memberId),
            );
          }}
        />
      </div>
    );
  },
};
