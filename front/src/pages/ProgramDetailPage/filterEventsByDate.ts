import { getDate } from '@/utils/date.ts';

import type { ProgramEvent } from '@/type/index.ts';

export function filterEventsByDate(eventList: ProgramEvent[], selectedDate: Date | null) {
  if (!selectedDate) return [];
  const filteredEventList = eventList.filter(
    (event) => selectedDate && getDate(event.runningDate) === getDate(selectedDate),
  );

  return filteredEventList;
}
