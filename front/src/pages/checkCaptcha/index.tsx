import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';

import { DesktopCheckCaptchaView, MobileCheckCaptchaView } from '@/pages/checkCaptcha/ui';

import { useReservationStore } from '@/feature/reservation/stores/reservationStore';
import { ResponsiveView } from '@/shared/components';
import { ROUTE_URL } from '@/shared/const';
import { RESERVATION_STEP } from '@/shared/const/reservation';

import './index.css';

//TODO 취소 버튼 관리
const CAPTCHA_TEXT_LENGTH = 6;

export const CaptchaPage = () => {
  const [inputData, setInputData] = useState<string>('');
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [isValid, setIsValid] = useState<boolean>(true);
  const setIsCheckCaptcha = useReservationStore((state) => state.flagAction.setIsCheckCaptcha);
  const initReservationStore = useReservationStore((state) => state.initReservation);
  const InputRef = useRef(null);
  useEffect(() => {
    loadCaptchaEnginge(CAPTCHA_TEXT_LENGTH, 'white', 'black', 'upper');
    initReservationStore();
  }, [initReservationStore]);

  const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const upperValue = value.toUpperCase();
    setInputData(upperValue);
  };

  const goNextStep = () => {
    setIsCheckCaptcha(true);
    navigate(`${ROUTE_URL.EVENT.DEFAULT}/${eventId}/reservation/${RESERVATION_STEP.SELECT_COUNT}`);
  };
  const validateAndGoNextStep = () => {
    if (validateCaptcha(inputData)) {
      goNextStep();
    } else {
      setIsValid(false);
      if (InputRef.current) {
        const input = InputRef.current! as HTMLInputElement;
        setInputData('');
        input.focus();
      }
    }
  };

  return (
    <ResponsiveView
      desktop={
        <DesktopCheckCaptchaView
          isValid={isValid}
          InputRef={InputRef}
          inputData={inputData}
          changeInput={changeInput}
          validateAndGoNextStep={validateAndGoNextStep}
        />
      }
      mobile={
        <MobileCheckCaptchaView
          isValid={isValid}
          InputRef={InputRef}
          inputData={inputData}
          changeInput={changeInput}
          validateAndGoNextStep={validateAndGoNextStep}
        />
      }
    />
  );
};
