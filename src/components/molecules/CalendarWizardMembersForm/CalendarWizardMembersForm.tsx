"use client";

import { Plus, X } from "lucide-react";

import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Input } from "@/components/atoms/Input";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/utils_constants_styles/utils";

export type CalendarWizardMembersFormProps = {
  members: Array<{ id: string; email: string }>;
  onChangeMember: (memberId: string, email: string) => void;
  onAddMember: () => void;
  onRemoveMember: (memberId: string) => void;
  hasError: boolean;
  useSolo: boolean;
  onToggleUseSolo: (checked: boolean) => void;
};

export function CalendarWizardMembersForm({
  members,
  onChangeMember,
  onAddMember,
  onRemoveMember,
  hasError,
  useSolo,
  onToggleUseSolo,
}: CalendarWizardMembersFormProps) {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <Text as="h2" size="lg" weight="semibold">
          メンバーを招待
        </Text>
        <Text size="sm" className="text-muted-foreground">
          メールアドレスを追加すると、作成時に招待メールが送信されます。
        </Text>
      </header>
      <div className="flex items-center space-x-2 rounded-lg border border-border bg-muted/30 p-4">
        <Checkbox
          id="use-solo"
          checked={useSolo}
          onCheckedChange={onToggleUseSolo}
        />
        <label
          htmlFor="use-solo"
          className="flex-1 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          <Text size="md" weight="medium">
            一人で使う
          </Text>
          <Text size="sm" className="mt-1 text-muted-foreground font-normal">
            ~チームでの利用を予定していない場合はこちらをチェックしてください~
          </Text>
        </label>
      </div>
      {!useSolo && (
        <>
          <div className="space-y-3">
            {members.map((member) => {
              const trimmed = member.email.trim();
              const isInvalidFormat =
                trimmed.length > 0 &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

              // 重複チェック: 同じメールアドレスが他のメンバーに存在するか
              const isDuplicate =
                trimmed.length > 0 &&
                members.some(
                  (m) =>
                    m.id !== member.id &&
                    m.email.trim().toLowerCase() === trimmed.toLowerCase(),
                );

              const isInvalid = isInvalidFormat || isDuplicate;

              return (
                <div
                  key={member.id}
                  className={cn(
                    "flex flex-col gap-2 rounded-md border border-border p-3 sm:flex-row sm:items-center sm:gap-3",
                    isInvalid ? "border-destructive/60 bg-destructive/5" : "",
                  )}
                >
                  <Input
                    type="text"
                    autoComplete="off"
                    name={`member-email-${member.id}`}
                    value={member.email}
                    onChange={(event) => {
                      const target = event.target as HTMLInputElement;
                      const memberId = target.getAttribute("data-member-id");
                      const newValue = event.target.value;
                      // 値が実際に変更された場合のみ更新
                      if (memberId && member.email !== newValue) {
                        onChangeMember(memberId, newValue);
                      }
                    }}
                    data-member-id={member.id}
                    placeholder="member@example.com"
                    className="flex-1"
                  />
                  <div className="flex items-center gap-2">
                    {members.length > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => onRemoveMember(member.id)}
                        aria-label="このメンバーを削除"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    ) : null}
                  </div>
                  {isInvalidFormat ? (
                    <Text size="sm" className="text-destructive">
                      メールアドレスの形式が正しくありません。
                    </Text>
                  ) : null}
                  {!isInvalidFormat && isDuplicate ? (
                    <Text size="sm" className="text-destructive">
                      このメールアドレスはすでに追加されています。
                    </Text>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="space-y-2">
            <Button variant="outline" type="button" onClick={onAddMember}>
              <Plus className="mr-2 h-4 w-4" />
              メンバーを追加
            </Button>
            {hasError ? (
              <Text size="sm" className="text-destructive">
                {members.every((m) => !m.email.trim()) &&
                  "※少なくとも1名のメールアドレスを入力してください。"}
              </Text>
            ) : null}
          </div>
        </>
      )}
    </section>
  );
}
