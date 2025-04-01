import ReservationTimeInfo from '@/pages/ReservationWaitingPage/ReservationTimeInfo.tsx';

import { EVENT_INFO_LABEL } from '@/constants/index.ts';
import type { EventInfo } from '@/type/index.ts';

type EventInfoSectionProps = {
  eventInfo: EventInfo;
  restTime: number;
};
export default function EventInfoSection({ eventInfo, restTime }: EventInfoSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-heading1 text-typo">{eventInfo.name}</h3>
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-4 text-display1">
          {['place', 'runningTime', 'date', 'time'].map((infoKey) => (
            <span>
              {EVENT_INFO_LABEL[infoKey as keyof typeof EVENT_INFO_LABEL]} :{' '}
              {eventInfo[infoKey as keyof EventInfo]}
            </span>
          ))}
        </div>
        <ReservationTimeInfo reservationOpenTime={eventInfo.reservationOpenTime} restTime={restTime} />
      </div>
    </div>
  );
}
