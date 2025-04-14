import { Validate } from '@/shared/hooks/useForm';
import type { SignupForm } from '@/shared/types/user';

export const validatePassword: Validate<SignupForm> = ({ value }) => {
  const isRightLength = value.length >= 4 && value.length <= 12;
  const patternReg = new RegExp(/^[a-z0-9]+$/);
  const isRightPattern = patternReg.test(value);
  if (!isRightLength) return '최소 4자리, 최대 12자리 입니다.';
  if (!isRightPattern) return '소문자 영어, 숫자 조합으로 작성해주세요.';
  return null;
};
