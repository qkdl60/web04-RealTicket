import Button from '@/components/common/Button.tsx';

import EventInfoSection from '@/pages/ReservationWaitingPage/EventInfoSection.tsx';
import useReservationWaitingPage from '@/pages/ReservationWaitingPage/useReservationWaitingPage.tsx';

export default function ReservationWaitingPage() {
  const {
    isReservationOpen,
    restTime,
    eventInfo,
    canGoNextPage,
    isReadyPlaceInfo,
    overviewImageURL,
    permissionAndGoNextPage,
  } = useReservationWaitingPage();

  return (
    <div className="flex flex-col gap-8">
      <div className="h-[420px] w-[700px]">
        {isReadyPlaceInfo ? (
          <img className="h-full w-full" src={overviewImageURL} alt="좌석 배치도" />
        ) : (
          <div>loading</div>
        )}
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
}
