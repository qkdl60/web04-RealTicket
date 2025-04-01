import { useNavigate } from 'react-router-dom';

import { getPermission } from '@/api/booking.ts';

import { ROUTE_URL } from '@/constants/index.ts';
import type { PermissionResult } from '@/type/booking.ts';
import { useIsFetching, useQueryClient } from '@tanstack/react-query';

const PERMISSION_QUERY_KEY = ['permission'];
export default function usePermission(eventId: number) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isPermissionFetching = useIsFetching({ queryKey: PERMISSION_QUERY_KEY });

  const permissionAndGoNextPage = async () => {
    const { enteringStatus, userOrder } = await queryClient.fetchQuery<PermissionResult>({
      queryKey: PERMISSION_QUERY_KEY,
      queryFn: getPermission(Number(eventId)),
      staleTime: 0,
    });

    if (enteringStatus) {
      navigate(ROUTE_URL.EVENT.DETAIL(Number(eventId)));
    } else {
      //TODO state 제거, react router는 라우팅 역할만, 상태x
      navigate(ROUTE_URL.EVENT.WAITING_ROOM(Number(eventId)), { state: { userOrder } });
    }
  };

  return { permissionAndGoNextPage, isPermissionFetching };
}
