import { Loading } from "@/components/atoms/Loading";

export default function CalendarDetailLoading() {
  return (
    <Loading
      variant="fullscreen"
      size="lg"
      message="カレンダーを読み込み中..."
    />
  );
}
