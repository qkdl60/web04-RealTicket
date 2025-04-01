import Icon from '@/components/common/Icon.tsx';

import RestTime from '@/pages/ReservationWaitingPage/RestTime.tsx';

type ReservationTimeInfoProps = {
  reservationOpenTime: string;
  restTime: number;
};
export default function ReservationTimeInfo({ reservationOpenTime, restTime }: ReservationTimeInfoProps) {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col gap-1 text-typo">
        <span className="flex items-center gap-2 text-heading2">
          <Icon iconName="Clock" />
          예매 오픈 시간
        </span>
        <span> {reservationOpenTime}</span>
      </div>
      <div className="gap-2S flex flex-col gap-1">
        <span className="flex items-center gap-2 text-heading2">
          <Icon iconName="Clock" />
          예매 오픈까지 남은 시간
        </span>
        <RestTime restTime={restTime} />
      </div>
    </div>
  );
}
