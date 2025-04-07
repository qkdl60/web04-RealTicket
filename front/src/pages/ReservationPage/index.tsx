import { useState } from 'react';

import ReservationResult from '@/pages/ReservationPage/ReservationResult';
import SeatCountSelector from '@/pages/ReservationPage/SeatCountSelector';
import SectionAndSeat from '@/pages/ReservationPage/SectionAndSeat';

// import { Captcha } from '@/pages/checkCaptcha';

type ReservationStep = 'captcha' | 'setCount' | 'selectSeats' | 'result';

export default function ReservationPage() {
  const [step, setStep] = useState<ReservationStep>('selectSeats');
  if (step === 'captcha') {
    // return (
    //   <Captcha
    //     goNextStep={() => {
    //       setStep('setCount');
    //     }}
    //   />
    // );
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
    <SectionAndSeat />;
  }
  if (step === 'result') {
    return <ReservationResult />;
  }
}
