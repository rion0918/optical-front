import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/atoms/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/Dialog";
import { MultiSelectDropdown } from "@/components/molecules/MultiSelectDropdown/MultiSelectDropdown";
import { SearchInput } from "@/components/molecules/SearchInput/SearchInput";
import { PullRequestReviewOption } from "@/components/organisms/EngineerOption/PullRequestReviewOption";
import { TeamReviewLoadOption } from "@/components/organisms/EngineerOption/TeamReviewLoadOption";
import { startMockServiceWorker } from "@/mocks/browser";
import type {
  ChangeReviewerRequest,
  GitHubPullRequest,
  GitHubReviewOptionsResponse,
  TeamMemberReviewLoad,
} from "@/types/github";

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

  // GitHub レビューオプションの状態
  const [pullRequests, setPullRequests] = useState<GitHubPullRequest[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMemberReviewLoad[]>([]);
  const [allPrsUrl, setAllPrsUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // GitHub レビューオプションを取得
  const fetchGitHubReviewOptions = useCallback(async () => {
    setIsLoading(true);
    try {
      // MSW の初期化を待つ
      await startMockServiceWorker();

      const response = await fetch("/api/github/review-options");
      if (!response.ok) {
        throw new Error("Failed to fetch GitHub review options");
      }
      const data: GitHubReviewOptionsResponse = await response.json();
      setPullRequests(data.myPendingReviews);
      setTeamMembers(data.teamReviewLoads);
      setAllPrsUrl(data.allPullRequestsUrl);
    } catch (error) {
      console.error("Error fetching GitHub review options:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ダイアログが開かれたときにデータを取得
  useEffect(() => {
    if (isPreviewOpen) {
      fetchGitHubReviewOptions();
    }
  }, [isPreviewOpen, fetchGitHubReviewOptions]);

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
        <DialogContent className="w-[80vw] h-[80vh] max-w-8xl overflow-auto">
          <DialogHeader>
            <DialogTitle>OptiCal</DialogTitle>
          </DialogHeader>
          <div className="flex flex-row gap-6 p-4 w-full h-full">
            {isLoading ? (
              <div className="flex items-center justify-center w-full">
                <p className="text-muted-foreground">読み込み中...</p>
              </div>
            ) : (
              <>
                {/* PRレビュー待ち件数オプション */}
                <div className="flex-1 min-w-0 overflow-auto">
                  <PullRequestReviewOption
                    pullRequests={pullRequests}
                    allPrsUrl={allPrsUrl}
                  />
                </div>
                {/* チームレビュー負荷オプション */}
                <div className="flex-1 min-w-0 overflow-auto">
                  <TeamReviewLoadOption
                    members={teamMembers}
                    onReviewerChange={(payload: ChangeReviewerRequest) =>
                      console.log(
                        "Reviewer change requested:",
                        JSON.stringify(payload, null, 2),
                      )
                    }
                  />
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
