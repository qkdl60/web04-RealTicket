import { useState } from 'react';

import { ResponsiveView } from '@/shared/components';
import { useForm } from '@/shared/hooks';
import type { LoginForm } from '@/shared/types/user';

import { useLoginMutation } from './hooks';
import { DesktopLoginPageView, MobileLoginPageView } from './ui';

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
  const [formData, setFormData] = useState<LoginForm>({
    id: '',
    password: '',
  });

  const onSubmit = handleSubmit(submit);
  return (
    <ResponsiveView
      mobile={
        <MobileLoginPageView
          register={register}
          onSubmit={onSubmit}
          isPending={isPending}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          error={error}
        />
      }
      desktop={
        <DesktopLoginPageView
          register={register}
          onSubmit={onSubmit}
          isPending={isPending}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          error={error}
        />
      }
    />
  );
};
