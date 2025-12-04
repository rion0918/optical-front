export type ScheduleStatus =
  | "default"
  | "info"
  | "success"
  | "warning"
  | "danger";

export type ScheduleItem = {
  id: string;
  title: string;
  memo?: string;
  location?: string;
  locationUrl?: string;
  members?: string[];
  calendarId?: string;
  calendarName?: string;
  status: ScheduleStatus;
  start: string;
  end?: string;
  calendarColor?: string;
};

export type ScheduleCalendar = {
  id: string;
  name: string;
  color: string;
  description?: string;
  imageUrl?: string;
  customOptions?: string[];
};

export type CalendarDetail = ScheduleCalendar;

export type ScheduleApiResponse = {
  date?: string;
  items: ScheduleItem[];
  calendars?: ScheduleCalendar[];
};

export type CalendarDetailResponse = {
  calendar: CalendarDetail;
};

export type CreateCalendarRequest = {
  name: string;
  color: string;
  members: string[];
  template: string;
  customOptions: string[];
  imageFileName: string | null;
};

export type CreateCalendarResponse = {
  calendar: CalendarDetail;
};
