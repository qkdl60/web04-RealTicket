import type { ProgramEvent } from '@/shared/types/data';

export function getDateList(eventList: ProgramEvent[]) {
  const result = [...new Set(eventList.map((event) => event.runningDate))].sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );
  return result;
}
