import { useEffect } from 'react';

import { useWaitingInfoStore } from '@/feature/reservation/stores';

export const useResetUserOrder = () => {
  const resetUserOrder = useWaitingInfoStore((state) => state.action.resetUserOrder);

  useEffect(() => {
    return () => {
      resetUserOrder();
    };
  }, [resetUserOrder]);

  return resetUserOrder;
};
