import { Button } from '@/shared/components';
import type { EventInfo } from '@/shared/types/data';

import { EventInfoSection } from '../eventInfoSection';

type ReservationWaitingPageViewProps = {
  overviewImageURL: string | undefined;
  eventInfo: EventInfo;
  restTime: number;
  canGoNextPage: boolean;
  isReservationOpen: boolean;
  permissionAndGoNextPage: () => void;
};
export const ReservationWaitingPageView = ({
  overviewImageURL,
  eventInfo,
  restTime,
  canGoNextPage,
  isReservationOpen,
  permissionAndGoNextPage,
}: ReservationWaitingPageViewProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="h-[420px] w-[700px]">
        <img className="h-full w-full" src={overviewImageURL} alt="좌석 배치도" />
      </div>
      <EventInfoSection eventInfo={eventInfo} restTime={restTime} />
      <Button disabled={!canGoNextPage} className="my-4" onClick={permissionAndGoNextPage}>
        {isReservationOpen ? (
          <span className="text-label1 text-typo-display">예매하기</span>
        ) : (
          <span className="text-label1 text-typo-disable">예매 대기중</span>
        )}
      </Button>
    </div>
  );
};
