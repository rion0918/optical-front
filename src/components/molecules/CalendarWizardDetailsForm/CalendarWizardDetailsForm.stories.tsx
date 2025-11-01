import type { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";

import { CalendarWizardDetailsForm } from "./CalendarWizardDetailsForm";

const meta: Meta<typeof CalendarWizardDetailsForm> = {
  title: "Molecules/CalendarWizardDetailsForm",
  component: CalendarWizardDetailsForm,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CalendarWizardDetailsForm>;

const COLOR_OPTIONS = [
  "#f97316",
  "#22c55e",
  "#0ea5e9",
  "#8b5cf6",
  "#ef4444",
  "#eab308",
  "#14b8a6",
  "#4b5563",
];

export const Playground: Story = {
  render: () => {
    const [name, setName] = useState("プロジェクトA");
    const [color, setColor] = useState(COLOR_OPTIONS[0]);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    return (
      <div className="max-w-2xl">
        <CalendarWizardDetailsForm
          name={name}
          color={color}
          colorOptions={COLOR_OPTIONS}
          imagePreviewUrl={imagePreviewUrl}
          imageError={null}
          onNameChange={setName}
          onSelectColor={setColor}
          onImageChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result;
              if (typeof result === "string") {
                setImagePreviewUrl(result);
              }
            };
            reader.readAsDataURL(file);
          }}
          onRemoveImage={() => {
            if (imageInputRef.current) {
              imageInputRef.current.value = "";
            }
            setImagePreviewUrl(null);
          }}
          imageInputRef={imageInputRef}
        />
      </div>
    );
  },
};
