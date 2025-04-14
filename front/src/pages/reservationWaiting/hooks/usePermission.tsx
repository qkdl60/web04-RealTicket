import { useNavigate } from 'react-router-dom';

import { getPermission } from '@/api/booking.ts';

import { useWaitingInfoStore } from '@/feature/reservation/stores';
import { ROUTE_URL } from '@/shared/const';
import type { PermissionResult } from '@/shared/types/booking';
import { useIsFetching, useQueryClient } from '@tanstack/react-query';

export const usePermission = (eventId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setUserOrder = useWaitingInfoStore((state) => state.action.setUserOrder);
  const isPermissionFetching = useIsFetching({ queryKey: ['permission'] });

  const permissionAndGoNextPage = async () => {
    const { enteringStatus, userOrder } = await queryClient.fetchQuery<PermissionResult>({
      queryKey: ['permission'],
      queryFn: getPermission(Number(eventId)),
      staleTime: 0,
    });

    if (enteringStatus) {
      setUserOrder(0);
      navigate(`${ROUTE_URL.EVENT.DETAIL(Number(eventId))}/reservation/captcha`);
    } else {
      setUserOrder(userOrder!);
      navigate(ROUTE_URL.EVENT.WAITING_ROOM(Number(eventId)));
    }
  };

  return { permissionAndGoNextPage, isPermissionFetching };
};
