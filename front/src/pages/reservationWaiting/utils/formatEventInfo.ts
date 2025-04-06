import { getDate, getTime } from '@/utils/date.ts';

import type { EventInfo } from '@/type/index.ts';
import type { EventDetail } from '@/type/index.ts';

export const formatEventInfo = (event: EventDetail): EventInfo => {
  const { name: eventName, runningTime, runningDate, reservationOpenDate, place } = event;
  const placeName = place.name;

  return {
    name: eventName,
    place: placeName,
    runningTime: `${runningTime}분`,
    date: getDate(new Date(runningDate)),
    time: getTime(new Date(runningDate)),
    reservationOpenTime: getDate(new Date(reservationOpenDate)),
  };
};
