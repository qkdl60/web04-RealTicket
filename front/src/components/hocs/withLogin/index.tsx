import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTE_URL } from '@/constants/index.ts';
import { useAuthStore } from '@/stores/auth/authStore.ts';

export const WithLogin = ({ children }: PropsWithChildren) => {
  const { isLogin } = useAuthStore((state) => state.auth);

  if (!isLogin) {
    return <Navigate to={ROUTE_URL.USER.LOGIN} />;
  }
  return children;
};
