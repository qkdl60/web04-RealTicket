import { useNavigate } from 'react-router-dom';

import { CustomError } from '@/api/axios.ts';
import { UserData } from '@/api/user.ts';
import { postLogin } from '@/api/user.ts';

import { toast } from '@/components/Toast/index.ts';

import { LOGIN_FAILED_MESSAGE } from '@/constants/user.ts';
import { useAuthStore } from '@/stores/auth/authStore.ts';
import { useMutation } from '@tanstack/react-query';

//TODO 타입 정의 이동
export type LoginResponse = {
  loginId: string;
};

export const useLoginMutation = () => {
  const { login } = useAuthStore((state) => state.action);
  const navigation = useNavigate();
  const {
    mutate: requestLogin,
    isPending,
    error,
  } = useMutation<LoginResponse, CustomError, UserData>({
    mutationFn: postLogin,
    onError: () => {
      toast.error(`로그인 실패\n 사유 : ${LOGIN_FAILED_MESSAGE}`);
    },
    onSuccess: (data) => {
      const { loginId } = data;
      if (loginId && login) login(loginId);
      toast.success('로그인 성공');
      navigation('/');
    },
  });

  return { login: requestLogin, isPending, error };
};
