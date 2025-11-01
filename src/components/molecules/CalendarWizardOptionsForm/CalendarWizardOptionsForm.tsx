"use client";

import { Check, Circle } from "lucide-react";

import { cn } from "@/utils_constants_styles/utils";

export type CalendarWizardTemplate = {
  id: string;
  name: string;
  description: string;
  accentColor: string;
  badge?: string;
  features: Array<{
    label: string;
    included: boolean;
  }>;
};

export type CalendarWizardCustomOption = {
  id: string;
  label: string;
  description: string;
};

export type CalendarWizardOptionsFormProps = {
  templates: CalendarWizardTemplate[];
  selectedTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
  customOptions: CalendarWizardCustomOption[];
  selectedCustomOptions: Record<string, boolean>;
  onToggleCustomOption: (optionId: string) => void;
};

export function CalendarWizardOptionsForm({
  templates,
  selectedTemplateId,
  onSelectTemplate,
  customOptions,
  selectedCustomOptions,
  onToggleCustomOption,
}: CalendarWizardOptionsFormProps) {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold">オプション</h2>
        <p className="text-sm text-muted-foreground">
          テンプレートを選び、必要に応じて追加機能を選択します。
        </p>
      </header>
      <div className="grid gap-3 lg:grid-cols-3">
        {templates.map((template) => {
          const isSelected = template.id === selectedTemplateId;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelectTemplate(template.id)}
              className={cn(
                "flex h-full flex-col gap-3 rounded-lg border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/40 hover:bg-primary/5",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: template.accentColor }}
                  />
                  <span className="text-base font-semibold">
                    {template.name}
                  </span>
                </div>
                {template.badge ? (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                    {template.badge}
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
              <ul className="space-y-1 text-sm">
                {template.features.map((feature) => (
                  <li
                    key={`${template.id}-${feature.label}`}
                    className="flex items-center gap-2"
                  >
                    {feature.included ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span
                      className={
                        feature.included
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }
                    >
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
      <div className="space-y-3 rounded-lg border border-border/70 bg-card p-4">
        <div>
          <h3 className="text-base font-semibold">カスタムオプション</h3>
          <p className="text-sm text-muted-foreground">
            必要な機能だけを選択できます。選択内容はいつでも変更できます。
          </p>
        </div>
        <div className="space-y-2">
          {customOptions.map((option) => {
            const checked = Boolean(selectedCustomOptions[option.id]);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onToggleCustomOption(option.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-md border border-border bg-background px-3 py-2 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  checked ? "border-primary bg-primary/10" : "",
                )}
                aria-pressed={checked}
              >
                <span
                  className={cn(
                    "mt-1 grid h-4 w-4 place-items-center rounded-sm border border-input",
                    checked
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-transparent",
                  )}
                >
                  <Check className="h-3 w-3" />
                </span>
                <span className="flex flex-col text-left">
                  <span className="font-medium">{option.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {option.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
