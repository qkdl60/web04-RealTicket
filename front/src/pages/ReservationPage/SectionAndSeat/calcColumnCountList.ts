import { getCache, setCache } from '@/utils/cache.ts';

export const calcSeatNameList = (
  seatList: boolean[],
  colLength: number,
  sectionName: string,
  eventId: number,
  sectionId: number,
) => {
  const cacheKey = `${eventId}-${sectionId}`;
  const cache = getCache(cacheKey);
  if (cache) {
    return cache;
  }
  let columnCount = 1;
  const seatNameList = seatList.map((seat, seatIndex) => {
    const rowsCount = Math.floor(seatIndex / colLength) + 1;
    const isNewLine = seatIndex % colLength === 0;
    if (isNewLine) columnCount = 1;
    const seatName = seat ? `${sectionName}구역 ${rowsCount}행 ${columnCount}열` : `empty`;
    if (seat) columnCount++;
    return seatName;
  });
  setCache(cacheKey, seatNameList);
  return seatNameList;
};
