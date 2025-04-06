import { useEffect } from 'react';

import { useWaitingInfoStore } from '@/stores/booking/waitingInfoStore.ts';

const useResetUserOrder = () => {
  const resetUserOrder = useWaitingInfoStore((state) => state.action.resetUserOrder);

  useEffect(() => {
    return () => {
      resetUserOrder();
    };
  }, [resetUserOrder]);

  return resetUserOrder;
};

export default useResetUserOrder;
