import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Captcha from '@/components/Captcha/index.tsx';
import Loading from '@/components/common/Loading.tsx';

import ReservationResult from '@/pages/ReservationPage/ReservationResult';
import SeatCountSelector from '@/pages/ReservationPage/SeatCountSelector';
import SectionAndSeat from '@/pages/ReservationPage/SectionAndSeat';
import { useEventAndPlaceDate } from '@/pages/reservationWaiting/hooks/useEventAndPlaceDate.tsx';
import { formatEventInfo } from '@/pages/reservationWaiting/utils/formatEventInfo.ts';

type ReservationStep = 'captcha' | 'setCount' | 'selectSeats' | 'result';

export default function ReservationPage() {
  const [step, setStep] = useState<ReservationStep>('selectSeats');
  const { eventId } = useParams();
  const { event, placeInfo, isPlaceInfoPending } = useEventAndPlaceDate(Number(eventId));
  const eventInfo = formatEventInfo(event);
  const layout = isPlaceInfoPending ? null : placeInfo?.layout;
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
        goNextStep={() => {
          setStep('selectSeats');
        }}
      />
    );
  }
  if (step === 'selectSeats') {
    return isPlaceInfoPending ? (
      <Loading />
    ) : (
      <SectionAndSeat
        goNextStep={() => {
          setStep('result');
        }}
        layout={layout!}
        eventInfo={eventInfo}
      />
    );
  }
  if (step === 'result') {
    return <ReservationResult event={event} />;
  }
}
