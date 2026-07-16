import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatTodoDate(date: Date | string): string {
  const parsed = dayjs(date);

  if (!parsed.isValid()) {
    return "-";
  }

  return parsed.utc().local().format("DD.MM.YYYY HH:mm");
}

export function formatTodoDateFull(date: Date | string): string {
  const parsed = dayjs(date);

  if (!parsed.isValid()) {
    return "-";
  }

  return parsed.utc().local().format("DD.MM.YYYY HH:mm:ss");
}