import { getDate, getTime } from '@/utils/date.ts';

import type { ProgramEvent } from '@/type/index.ts';

export function getSelectedEvent(
  filteredEventList: ProgramEvent[],
  selectedDate: Date | null,
  selectedTime: string | null,
) {
  if (!selectedDate || !selectedDate) return undefined;
  return filteredEventList.find(
    (event) =>
      selectedDate &&
      selectedTime &&
      getDate(event.runningDate) == getDate(selectedDate) &&
      getTime(event.runningDate) == selectedTime,
  );
}
