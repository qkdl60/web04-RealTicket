import { useParams } from 'react-router-dom';

import { DesktopView, MobileView } from '@/pages/reservationResult/ui';
import { useSuspenseEventQuery } from '@/pages/waitingQueue/hooks/useSuspenseEventQuery.tsx';

import { useReservationStore } from '@/feature/reservation/stores/reservationStore';
import { ResponsiveView } from '@/shared/components';

export function ReservationResult() {
  const { eventId } = useParams();
  const event = useSuspenseEventQuery(Number(eventId));
  const { name, runningDate, place, price } = event;
  const placeName = place.name;
  const reservationList = useReservationStore((state) => state.seat.selectedSeatList);
  console.log(reservationList);
  return (
    <ResponsiveView
      mobile={
        <MobileView
          name={name}
          runningDate={runningDate}
          placeName={placeName}
          price={price}
          reservationList={reservationList}
        />
      }
      desktop={
        <DesktopView
          name={name}
          runningDate={runningDate}
          placeName={placeName}
          price={price}
          reservationList={reservationList}
        />
      }
    />
  );
}
