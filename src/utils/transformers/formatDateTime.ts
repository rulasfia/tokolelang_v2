import { Time } from "@internationalized/date";
import { format } from "date-fns";

export const formatDateTimeInput = (date: Date) => {
  return format(date, "yyyy-MM-dd'T'HH:mm");
};

export const formatDateInput = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

export const formatTime = (time: Date) => {
  return format(time, "HH:mm");
};

export const formatTimeInput = (time: Date) => {
  return new Time(time.getHours(), time.getMinutes());
};

export const formatDateTimeLelang = (date: Date) => {
  return format(date, "dd/MM/yyyy - HH:mm");
};
