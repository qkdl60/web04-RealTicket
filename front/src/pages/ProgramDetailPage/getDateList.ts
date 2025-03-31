import type { ProgramEvent } from '@/type/index.ts';

export function getDateList(eventList: ProgramEvent[]) {
  const result = [...new Set(eventList.map((event) => event.runningDate))].sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );
  return result;
}
