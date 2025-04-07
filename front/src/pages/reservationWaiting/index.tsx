import { useReservationWaitingPage } from './hooks';
import { ReservationWaitingPageView } from './ui';

/*

view 와 logic 분리
- 장점 테스트 시 분리된 view에 대해서만 통합 테스트를 할 수 있고 의존성 주입이 쉬워진다.
- 단점 컴포넌트가 너무 많아지고 props 도 길어질 수 있다.  컴포넌트가 depth가 깊어진다. 
 */
export const ReservationWaitingPage = () => {
  const {
    isReservationOpen,
    restTime,
    eventInfo,
    canGoNextPage,

    overviewImageURL,
    permissionAndGoNextPage,
  } = useReservationWaitingPage();

  return (
    <ReservationWaitingPageView
      eventInfo={eventInfo}
      isReservationOpen={isReservationOpen}
      overviewImageURL={overviewImageURL}
      restTime={restTime}
      canGoNextPage={canGoNextPage}
      permissionAndGoNextPage={permissionAndGoNextPage}
    />
  );
};
