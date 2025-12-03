import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card";
import { Separator } from "@/components/atoms/Separator";
import type {
  ChangeReviewerRequest,
  TeamMemberReviewLoad,
} from "@/types/github";
import { MemberLoadItem } from "./MemberLoadItem";

export interface TeamReviewLoadOptionProps {
  /** チームメンバーのレビュー負荷一覧 */
  members: TeamMemberReviewLoad[];
  /** レビュアー変更時のコールバック */
  onReviewerChange?: (payload: ChangeReviewerRequest) => void;
}

export function TeamReviewLoadOption({
  members,
  onReviewerChange,
}: TeamReviewLoadOptionProps) {
  return (
    <Card>
      <CardHeader className="space-y-1 pb-3">
        <CardTitle className="text-base">チームレビュー負荷</CardTitle>
        <CardDescription>
          GitHub のレビュー待ち PR 件数と負荷をチームで比較できます。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {members.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            レビュー待ちはありません。
          </p>
        ) : (
          members.map((memberLoad, index) => (
            <div key={memberLoad.member.username} className="space-y-2">
              <MemberLoadItem
                member={memberLoad}
                onReviewerChange={onReviewerChange}
              />
              {index < members.length - 1 && (
                <Separator className="bg-border" />
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
