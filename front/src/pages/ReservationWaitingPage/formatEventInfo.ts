import { getDate, getTime } from '@/utils/date.ts';

import type { EventInfo } from '@/type/index.ts';
import type { EventDetail } from '@/type/index.ts';

export const formatEventInfo = (event: EventDetail, placeName: string): EventInfo => {
  const { name: eventName, runningTime, events, reservationOpenDate } = event;
  const runningOpenDate = events[0].runningDate;
  return {
    name: eventName,
    place: placeName,
    runningTime: `${runningTime}분`,
    date: getDate(new Date(runningOpenDate)),
    time: getTime(new Date(runningOpenDate)),
    reservationOpenTime: getDate(new Date(reservationOpenDate)),
  };
};
