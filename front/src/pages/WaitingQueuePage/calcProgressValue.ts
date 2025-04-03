export const calcProgressValue = (firstWaitingTime: number | null, waitingTime: number | null) => {
  if (firstWaitingTime === null || waitingTime === null) return 0;
  return ((firstWaitingTime - waitingTime) / firstWaitingTime) * 100;
};
