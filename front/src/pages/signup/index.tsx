import { useState } from 'react';

import { ResponsiveView } from '@/shared/components';
import { useForm } from '@/shared/hooks';
import type { SignupForm } from '@/shared/types';

import { useSignupMutation } from './hooks';
import { DesktopSignupView, MobileSignupView } from './ui';

//TODO 타입 정의 이동

export const SignUpPage = () => {
  const [formData, setFormData] = useState<SignupForm>({
    id: '',
    password: '',
    checkPassword: '',
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>();

  const { signup, isPending, error } = useSignupMutation();

  const submit = async (data: SignupForm) => {
    const { id, password } = data;
    signup({ loginId: id, loginPassword: password });
  };

  const onSubmit = handleSubmit(submit);
  return (
    <ResponsiveView
      mobile={
        <MobileSignupView
          onSubmit={onSubmit}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          error={error}
          isPending={isPending}
          register={register}
        />
      }
      desktop={
        <DesktopSignupView
          onSubmit={onSubmit}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          error={error}
          isPending={isPending}
          register={register}
        />
      }
    />
  );
};
