export const calcSeatNameList = (seatList: boolean[], colLength: number, sectionName: string) => {
  let columnCount = 1;
  return seatList.map((seat, seatIndex) => {
    const rowsCount = Math.floor(seatIndex / colLength) + 1;
    const isNewLine = seatIndex % colLength === 0;
    if (isNewLine) columnCount = 1;
    const seatName = seat ? `${sectionName}구역 ${rowsCount}행 ${columnCount}열` : `empty`;
    if (seat) columnCount++;
    return seatName;
  });
};
