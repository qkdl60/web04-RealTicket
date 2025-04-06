import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Captcha from '@/components/Captcha/index.tsx';

import ReservationResult from '@/pages/ReservationPage/ReservationResult';
import SeatCountSelector from '@/pages/ReservationPage/SeatCountSelector';
import type { SelectedSeat } from '@/pages/ReservationPage/SectionAndSeat';
import SectionAndSeat from '@/pages/ReservationPage/SectionAndSeat';
import useEventAndPlaceDate from '@/pages/reservationWaiting/hooks/useEventAndPlaceDate';

import type { SeatCount } from '@/type/reservation.ts';

type ReservationStep = 'captcha' | 'setCount' | 'selectSeats' | 'result';

export default function ReservationPage() {
  const { eventId } = useParams();
  const { event, placeInfo, isPlaceInfoPending } = useEventAndPlaceDate(Number(eventId));

  const [seatCount, setSeatCount] = useState<SeatCount>(DEFAULT_SEAT_COUNT);
  const [reservationResult, setReservationResult] = useState<SelectedSeat[]>([]);
  const [step, setStep] = useState<ReservationStep>('selectSeats');

  const isReadyReservationResult = reservationResult !== null && step === 'result';
  const isReadyPlaceInfo = !isPlaceInfoPending && !!placeInfo;
  if (step === 'captcha') {
    return (
      <Captcha
        goNextStep={() => {
          setStep('setCount');
        }}
      />
    );
  }

  if (step === 'setCount') {
    return (
      <SeatCountSelector
        setSeatCount={setSeatCount}
        seatCount={seatCount}
        goNextStep={() => {
          setStep('selectSeats');
        }}
      />
    );
  }
  if (step === 'selectSeats') {
    return (
      isReadyPlaceInfo && (
        <SectionAndSeat
          setSeatCount={setSeatCount}
          placeInformation={placeInfo!}
          event={event}
          seatCount={seatCount}
          setReservationResult={setReservationResult}
          goNextStep={() => {
            setStep('result');
          }}
        />
      )
    );
  }
  if (isReadyReservationResult) {
    return <ReservationResult event={event} reservationResult={reservationResult} />;
  }
}

const DEFAULT_SEAT_COUNT = 1;
