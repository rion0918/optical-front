import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/atoms/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/Dialog";
import { MultiSelectDropdown } from "@/components/molecules/MultiSelectDropdown/MultiSelectDropdown";
import { SearchInput } from "@/components/molecules/SearchInput/SearchInput";

type LabeledOption = { label: string; value: string };

type SearchHeaderProps = {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  calendarOptions?: Array<string | LabeledOption>;
  selectedCalendars?: string[];
  onCalendarChange?: (value: string[]) => void;
  yearOptions?: number[];
};

export function SearchHeader({
  searchValue,
  onSearchChange,
  calendarOptions,
  selectedCalendars,
  onCalendarChange,
  yearOptions,
}: SearchHeaderProps) {
  const [search, setSearch] = useState(searchValue ?? ""); // 検索バーの入力値
  const [calendar, setCalendar] = useState<string[]>(selectedCalendars ?? []); // カレンダーフィルターの選択値
  const [period, setPeriod] = useState<string[]>([]); // 期間フィルターの選択値
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // プレビュー表示用ダイアログの開閉状態

  useEffect(() => {
    setSearch(searchValue ?? "");
  }, [searchValue]);

  useEffect(() => {
    setCalendar(selectedCalendars ?? []);
  }, [selectedCalendars]);

  const availableCalendars = useMemo(() => {
    return calendarOptions ?? [];
  }, [calendarOptions]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange?.(value);
  };

  const handleCalendarChange = (value: string[]) => {
    setCalendar(value);
    onCalendarChange?.(value);
  };

  // クリアボタンの処理
  const handleClear = () => {
    handleSearchChange("");
    handleCalendarChange([]);
    setPeriod([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        {/* 検索バー */}
        <div className="w-[500px]">
          <SearchInput
            value={search}
            onChange={handleSearchChange}
            onSelect={handleSearchChange}
            placeholder="スケジュール、参加者、場所を検索..."
          />
        </div>

        {/* カレンダーフィルター */}
        <div className="w-[190px]">
          <MultiSelectDropdown
            options={availableCalendars}
            placeholder="カレンダーの指定"
            value={calendar}
            onChange={handleCalendarChange}
          />
        </div>

        {/* 期間フィルター */}
        <div className="w-[120px]">
          <MultiSelectDropdown
            options={(yearOptions ?? []).map((y) => y.toString())}
            placeholder="年数の指定"
            value={period}
            onChange={setPeriod}
          />
        </div>

        <div className="ml-auto flex gap-15">
          {/* クリアボタン */}
          <Button variant="outline" onClick={handleClear}>
            クリア
          </Button>

          {/* プレビューボタン */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsPreviewOpen(true)}
            aria-label="選択内容を表示"
          >
            <Image src="/optical.png" alt="OptiCal" width={24} height={24} />
          </Button>
        </div>
      </div>

      {/* 選択内容プレビュー用ダイアログ */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="w-[60vw] h-[80vh] max-w-8xl">
          <DialogHeader>
            <DialogTitle>OptiCal</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground">
            選択したコンポーネントは今後ここに表示されます。
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
