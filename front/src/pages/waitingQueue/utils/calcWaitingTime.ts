export const calcWaitingTime = (restCount: number | null, throughputRate: number | null) => {
  if (restCount === null || throughputRate === null) return null;

  const waitingTime = Math.floor(restCount / throughputRate);
  return waitingTime;
};
