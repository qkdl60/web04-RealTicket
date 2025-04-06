import useForm from '@/hooks/useForm.tsx';

import Button from '@/components/common/Button.tsx';
import Field from '@/components/common/Field.tsx';
import Icon from '@/components/common/Icon.tsx';
import Input from '@/components/common/Input.tsx';

import { useSignupMutation } from './hooks';
import { validatePassword, validatePasswordCheck } from './utils';

//TODO 타입 정의 이동
export type Form = {
  id: string;
  password: string;
  checkPassword: string;
};
export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const { signup, isPending, error } = useSignupMutation();

  const submit = async (data: Form) => {
    const { id, password } = data;
    signup({ loginId: id, loginPassword: password });
  };
  return (
    <div className="mx-auto flex items-center py-8">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex w-[420px] flex-col gap-6 rounded-xl border border-surface-cardBorder px-6 py-8 shadow-2xl">
        <h2 className="text-center text-heading1">회원가입</h2>
        <Field
          label="Id"
          isValid={!errors.id && !error}
          errorMessage={errors.id ? errors.id : error?.response?.data.message}
          helpMessage="4자 이상 12자 이하의 영문 소문자와 숫자로 구성해주세요.">
          <Input
            disabled={isPending}
            {...register('id', {
              validate: validatePassword,
            })}
            placeholder="아이디를 입력해주세요."
          />
        </Field>
        <Field
          label="Password"
          isValid={!errors.password && !error}
          errorMessage={errors.password ? errors.password : error?.response?.data.message}
          helpMessage="4자 이상 12자 이하의 영문 소문자와 숫자로 구성해주세요.">
          <Input
            type="password"
            disabled={isPending}
            autoComplete="off"
            {...register('password', {
              validate: validatePassword,
            })}
            placeholder="비밀번호를 입력해주세요."
          />
        </Field>
        <Field
          label="CheckPassword"
          isValid={!errors.checkPassword && !error}
          errorMessage={errors.checkPassword ? errors.checkPassword : error?.response?.data.message}>
          <Input
            type="password"
            autoComplete="off"
            {...register('checkPassword', {
              validate: validatePasswordCheck,
            })}
            placeholder="비밀번호를 입력해주세요."
          />
        </Field>

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Icon iconName="Loading" className="animate-spin" />
              <span className="text-label1 text-typo-disable">회원가입 중...</span>
            </>
          ) : (
            <span className="text-label1 text-typo-display">회원가입 </span>
          )}
        </Button>
      </form>
    </div>
  );
};
