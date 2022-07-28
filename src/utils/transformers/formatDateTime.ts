import { format } from "date-fns";

export const formatDateTimeInput = (date: Date) => {
  return format(date, "yyyy-MM-dd'T'HH:mm");
};
