import useForm from '@/hooks/useForm';

import { Button, Field, Icon, Input } from '@/shared/components';
import type { LoginForm } from '@/type/user.ts';

import { LOGIN_FAILED_MESSAGE } from './const';
import { useLoginMutation } from './hooks';
import { validateLength } from './utils';

export const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginForm>();

  const { login, isPending, error } = useLoginMutation();

  const submit = async (data: LoginForm) => {
    const { id, password } = data;
    login({ loginId: id, loginPassword: password });
  };

  return (
    <div className="mx-auto flex items-center py-8">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex w-[420px] flex-col gap-6 rounded-xl border border-surface-cardBorder px-6 py-8 shadow-2xl">
        <h2 className="text-center text-heading1">로그인</h2>
        <Field
          label="Id"
          isValid={!errors.id && !error}
          errorMessage={errors.id ? errors.id : LOGIN_FAILED_MESSAGE}>
          <Input
            disabled={isPending}
            {...register('id', {
              validate: validateLength,
            })}
            placeholder="아이디를 입력해주세요."
          />
        </Field>
        <Field
          label="Password"
          isValid={!errors.password && !error}
          errorMessage={errors.password ? errors.password : LOGIN_FAILED_MESSAGE}>
          <Input
            type="password"
            disabled={isPending}
            autoComplete="off"
            {...register('password', {
              validate: validateLength,
            })}
            placeholder="비밀번호를 입력해주세요."
          />
        </Field>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Icon iconName="Loading" className="animate-spin" />
              <span className="text-label1 text-typo-disable">로그인 중...</span>
            </>
          ) : (
            <span className="text-label1 text-typo-display">로그인</span>
          )}
        </Button>
      </form>
    </div>
  );
};
