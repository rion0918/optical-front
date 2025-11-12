import { HttpResponse, http } from "msw";

import { scheduleMock } from "@/mocks/data/schedule";

/**
 * スケジュールAPIのモックハンドラー
 * ログインユーザーのスケジュールのみを返却
 */
export const scheduleHandlers = [
  http.get("/api/today-schedule", ({ request }) => {
    // Authorization ヘッダーからトークンを取得
    const authHeader = request.headers.get("Authorization");

    // 認証されていない場合は401エラー
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return HttpResponse.json(
        {
          error: {
            code: 401,
            message: "認証が必要です",
          },
        },
        { status: 401 },
      );
    }

    const token = authHeader.replace("Bearer ", "");

    // トークンをデコードしてユーザーIDを取得
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid token");
      }

      const payload = JSON.parse(atob(parts[1]));
      const userId = payload.sub;

      // トークンの有効期限チェック
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        return HttpResponse.json(
          {
            error: {
              code: 401,
              message: "トークンの有効期限が切れています",
            },
          },
          { status: 401 },
        );
      }

      // ユーザーIDに基づいてカレンダーとスケジュールをフィルタリング
      const userCalendars = scheduleMock.calendars.filter(
        (calendar) => calendar.userId === userId,
      );
      const _userCalendarIds = userCalendars.map((calendar) => calendar.id);
      const userItems = scheduleMock.items.filter(
        (item) => item.userId === userId,
      );

      return HttpResponse.json({
        calendars: userCalendars,
        items: userItems,
      });
    } catch (_error) {
      return HttpResponse.json(
        {
          error: {
            code: 401,
            message: "無効なトークンです",
          },
        },
        { status: 401 },
      );
    }
  }),
];
