import { getDate, getTime } from '@/shared/libs';
import type { ProgramEvent } from '@/shared/types/data';

export function getSelectedEvent(
  EventList: ProgramEvent[],
  selectedDate: Date | null,
  selectedTime: string | null,
) {
  if (!selectedDate || !selectedDate) return undefined;
  return EventList.find(
    (event) =>
      selectedDate &&
      selectedTime &&
      getDate(event.runningDate) == getDate(selectedDate) &&
      getTime(event.runningDate) == selectedTime,
  );
}
