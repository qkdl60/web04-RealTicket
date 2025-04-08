import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';

import { ROUTE_URL } from '@/constants/index.ts';
import { RESERVATION_STEP } from '@/constants/reservation.ts';
import { useReservationStore } from '@/feature/reservation/stores/reservationStore';
import { Button, Field, Input, Separator } from '@/shared/components';

import './index.css';

//TODO 취소 버튼 관리
const CAPTCHA_TEXT_LENGTH = 6;
const HELP_MESSAGE_LIST = [
  '대소문자 구분 없이 입력해주세요.',
  '문자가 정확히 보기 어려우시면 보안문자 우측의 새로고침 버튼을 눌러주세요.',
];

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
    <div className="flex w-[420px] flex-col gap-8 rounded-xl border border-surface-cardBorder p-6 shadow-xl">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-heading1">자동 예매 방지 문자</h2>
        <p className="text-display2 text-typo-sub">부정 예매 방지를 위해 보안 문자를 정확히 입력해주세요.</p>
      </div>

      <Separator direction="row" />
      <div className="captcha">
        <LoadCanvasTemplate reloadText=" " />
      </div>
      <Field label="입력" isValid={isValid} errorMessage="보안문자를 정확히 입력해주세요">
        <Input
          ref={InputRef}
          placeholder="대소문자 구분없이 보안문자 입력"
          value={inputData}
          onChange={changeInput}
        />
      </Field>
      <Separator direction="row" />
      <ul className="list-disc px-4">
        {HELP_MESSAGE_LIST.map((message) => (
          <li key={message} className="text-caption1 text-typo-sub">
            {message}
          </li>
        ))}
      </ul>

      <div className="flex gap-4">
        <Button color={'cancel'} asChild>
          <Link to={'/'} className="text-label1 text-typo-display">
            취소
          </Link>
        </Button>
        <Button color={'primary'} onClick={validateAndGoNextStep}>
          <span className="text-label1 text-typo-display">확인</span>
        </Button>
      </div>
    </div>
  );
};
