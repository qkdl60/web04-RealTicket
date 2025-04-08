import { useNavigate } from 'react-router-dom';

import { CustomError } from '@/api/axios.ts';
import { UserData, postSignup } from '@/api/user.ts';

import { ROUTE_URL } from '@/constants/index.ts';
import { toast } from '@/shared/libs';
import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

export const useSignupMutation = () => {
  const navigate = useNavigate();
  const {
    mutate: signup,
    isPending,
    error,
  } = useMutation<AxiosResponse, CustomError, UserData>({
    mutationFn: postSignup,
    onError: async (error) => {
      toast.error(`회윈가입에 실패했습니다.\n사유:${error.response?.data.message}`);
    },
    onSuccess: () => {
      toast.success('화원가입에 성공했습니다.\n로그인 해주세요');
      navigate(ROUTE_URL.USER.LOGIN);
    },
  });
  return { signup, isPending, error };
};
