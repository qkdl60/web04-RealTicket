import { Form } from '@/pages/signup';

import { Validate } from '@/shared/hooks/useForm';

export const validatePasswordCheck: Validate<Form> = ({ value, formData }) => {
  const { password } = formData;
  if (value.length === 0) return '비밀번호를 다시 입력해주세요.';
  const isEqual = password == value;
  if (!isEqual) return '비밀번호와 일치하지 않습니다.';
  return null;
};
