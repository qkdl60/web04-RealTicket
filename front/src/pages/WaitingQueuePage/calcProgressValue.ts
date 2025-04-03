export const calcProgressValue = (initialWaitingTime: number | null, waitingTime: number | null) => {
  if (initialWaitingTime === null || waitingTime === null) return 0;
  return ((initialWaitingTime - waitingTime) / initialWaitingTime) * 100;
};
