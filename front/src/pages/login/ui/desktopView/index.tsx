import { LOGIN_FAILED_MESSAGE } from '@/pages/login/const/index.ts';

import { Button, Field, Icon, Input } from '@/shared/components';

import type { ViewProps } from '../../types';
import { validateLength } from '../../utils';

export const DesktopLoginPageView = ({
  onSubmit,
  formData,
  setFormData,
  errors,
  error,
  isPending,
  register,
}: ViewProps) => {
  return (
    <div className="mx-auto flex items-center py-8">
      <form
        onSubmit={onSubmit}
        className="flex w-[420px] flex-col gap-6 rounded-xl border border-surface-cardBorder px-6 py-8 shadow-2xl">
        <h2 className="text-center text-heading1">로그인</h2>
        <Field
          label="Id"
          isValid={!errors.id && !error}
          errorMessage={errors.id ? errors.id : LOGIN_FAILED_MESSAGE}>
          <Input
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
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
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
