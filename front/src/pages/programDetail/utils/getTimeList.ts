import { getDate, getTime } from '@/shared/libs';
import type { ProgramEvent } from '@/shared/types/data';

export function getTimeList(EventList: ProgramEvent[], selectedDate: Date | null) {
  const filteredEventList = filterEventsByDate(EventList, selectedDate);
  const timeList = [...new Set(filteredEventList.map((event) => getTime(event.runningDate)))].sort();

  return timeList;
}

function filterEventsByDate(eventList: ProgramEvent[], selectedDate: Date | null) {
  if (!selectedDate) return [];
  const filteredEventList = eventList.filter(
    (event) => selectedDate && getDate(event.runningDate) === getDate(selectedDate),
  );

  return filteredEventList;
}
