type RestTimeProps = {
  restTime: number;
};
const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MINUTE = 60;

export default function RestTime({ restTime }: RestTimeProps) {
  const restSeconds = Math.floor(restTime / 1000);
  if (restSeconds <= 0) return <span className="text-display1 text-error">000초</span>;
  if (restSeconds <= 100) {
    return (
      <span className="animate-bounce text-display1 text-warning">
        {restSeconds.toString().padStart(3, '0')}초
      </span>
    );
  } else {
    return (
      <span>{`${Math.floor(restSeconds / SECONDS_PER_HOUR)
        .toString()
        .padStart(2, '0')}시간 ${Math.floor((restSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE)
        .toString()
        .padStart(2, '0')}분 ${(restSeconds % 60).toString().padStart(2, '0')}초`}</span>
    );
  }
}
