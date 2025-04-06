export const formatWaitingTime = (waitingTime: number | null) => {
  if (waitingTime === null || waitingTime < 100) return '1분 내외';
  return `${waitingTime} 초`;
};
