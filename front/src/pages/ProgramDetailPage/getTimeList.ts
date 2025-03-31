import { getTime } from '@/utils/date.ts';

import type { EventDetail } from '@/type/index.ts';

type ProgramEvent = Pick<EventDetail, 'id' | 'runningDate'>;

export function getTimeList(filteredEventList: ProgramEvent[]) {
  const timeList = [...new Set(filteredEventList.map((event) => getTime(event.runningDate)))].sort();

  return timeList;
}
