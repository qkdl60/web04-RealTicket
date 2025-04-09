import { getDate, getTime } from '@/shared/libs';
import type { EventInfo } from '@/shared/types/data';
import type { EventDetail } from '@/shared/types/data';

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
