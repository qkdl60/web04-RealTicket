import { useEffect } from 'react';
import { LoadCanvasTemplate, loadCaptchaEnginge } from 'react-simple-captcha';

import { CAPTCHA_TEXT_LENGTH, HELP_MESSAGE_LIST } from '@/pages/checkCaptcha/const';
import type { ViewProps } from '@/pages/checkCaptcha/types';

import { Button, Field, Input, Separator } from '@/shared/components';

export const DesktopCheckCaptchaView = ({
  isValid,
  InputRef,
  inputData,
  changeInput,
  validateAndGoNextStep,
}: ViewProps) => {
  useEffect(() => {
    loadCaptchaEnginge(CAPTCHA_TEXT_LENGTH, 'white', 'black', 'upper');
  }, []);
  return (
    <div>
      <div className="flex w-[420px] flex-col gap-8 rounded-xl border border-surface-cardBorder p-6 shadow-xl">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-heading1">자동 예매 방지 문자</h2>
          <p className="text-display2 text-typo-sub">
            부정 예매 방지를 위해 보안 문자를 정확히 입력해주세요.
          </p>
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
          <Button color={'primary'} size={'full'} onClick={validateAndGoNextStep}>
            <span className="text-label1 text-typo-display">확인</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
