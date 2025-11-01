import { Text } from "@/components/atoms/Text";

export default function NewCalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col px-4 lg:px-0">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 pt-8">
        <header className="text-center">
          <Text size="lg" weight="bold">
            カレンダー作成
          </Text>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
