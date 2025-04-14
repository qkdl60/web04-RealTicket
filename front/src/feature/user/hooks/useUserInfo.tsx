import { useNavigate } from 'react-router-dom';

import type { CustomError } from '@/api/axios.ts';
import { deleteReservation, getReservation } from '@/api/reservation.ts';
import { postLogout } from '@/api/user.ts';

import { toast } from '@/shared/libs';
import { useAuthStore } from '@/shared/stores';
import { Reservation } from '@/shared/types/reservation';
import { useMutation, useMutationState, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

const RESERVATION_DELETE_MUTATION_KEY = ['reservation'];

export function useUserInfo() {
  const { userId } = useAuthStore((state) => state.auth);
  const { logout } = useAuthStore((state) => state.action);
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { data: reservationList } = useQuery<Reservation[], CustomError>({
    queryKey: [`reservation`],
    queryFn: getReservation,
    staleTime: Infinity,
    initialData: [],
  });
  const shortUserId = userId?.slice(0, 12);
  const beReservation = reservationList ? reservationList.length !== 0 : false;

  const { mutate: requestDeleteReservation } = useMutation<AxiosResponse, CustomError, number>({
    mutationKey: RESERVATION_DELETE_MUTATION_KEY,
    mutationFn: deleteReservation,
    onSuccess: () => {
      toast.warning('예매내역이 삭제되었습니다.');
      return queryClient.refetchQueries({ queryKey: ['reservation'] });
    },
    onError: (error) => {
      if (error.status === 500 || error.status === 401 || error.status === 403) return;
      toast.error('예매내역 삭제에 실패했습니다.\n 잠시 후 다시 시도해주세요');
    },
  });

  const deletingReservationIdList = useMutationState({
    filters: { mutationKey: RESERVATION_DELETE_MUTATION_KEY, status: 'pending' },
    select: (mutation) => mutation.state.variables,
  });

  const { mutate: requestLogout } = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      if (logout) {
        logout();
        toast.warning('로그아웃 되었습니다');
        navigate('/', { replace: true });
      }
    },
  });
  const handleLogOut = () => {
    requestLogout();
  };

  return {
    reservationList,
    handleLogOut,
    deletingReservationIdList,
    requestDeleteReservation,
    beReservation,
    shortUserId,
  };
}
