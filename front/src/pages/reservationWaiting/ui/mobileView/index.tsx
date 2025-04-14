import { Button } from '@/shared/components';

import type { ReservationWaitingPageViewProps } from '../../types';
import { EventInfoSection } from '../eventInfoSection';

export const MobileReservationWaitingPageView = ({
  overviewImageURL,
  eventInfo,
  restTime,
  canGoNextPage,
  isReservationOpen,
  permissionAndGoNextPage,
}: ReservationWaitingPageViewProps) => {
  return (
    <div className="relative w-full">
      <div className="flex flex-col gap-8 px-8">
        <div className="w-ful h-full">
          <img className="h-full w-full" src={overviewImageURL} alt="좌석 배치도" />
        </div>
        <EventInfoSection eventInfo={eventInfo} restTime={restTime} />
      </div>
      <div className="space h-[200px] w-full"></div>
      <div className="fixed bottom-0 left-0 right-0 flex flex-col justify-between gap-4 bg-white shadow-[0_-1px_2px_0_rgba(0,0,0,0.05)]">
        <div className="px-8 py-4">
          <Button disabled={!canGoNextPage} className="my-4" onClick={permissionAndGoNextPage}>
            {isReservationOpen ? (
              <span className="text-label1 text-typo-display">예매하기</span>
            ) : (
              <span className="text-label1 text-typo-disable">예매 대기중</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
