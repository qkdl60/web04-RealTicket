import { ReservationWaitingPageViewProps } from '@/pages/reservationWaiting/types/index.ts';

import { Button } from '@/shared/components';

import { EventInfoSection } from '../eventInfoSection';

export const DesktopReservationWaitingPageView = ({
  overviewImageURL,
  eventInfo,
  restTime,
  canGoNextPage,
  isReservationOpen,
  permissionAndGoNextPage,
}: ReservationWaitingPageViewProps) => {
  return (
    <div>
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
        <div className="h-[32px] w-full"></div>
      </div>
    </div>
  );
};
