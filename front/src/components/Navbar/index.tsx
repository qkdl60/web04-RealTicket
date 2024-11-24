import { Link } from 'react-router-dom';

import { CustomError } from '@/api/axios.ts';
import { deleteReservation, getReservation } from '@/api/reservation.ts';
import { postLogout } from '@/api/user.ts';

import { useAuthContext } from '@/hooks/useAuthContext.tsx';

import ReservationCard from '@/components/Navbar/ReservationCard.tsx';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Popover from '@/components/common/Popover';
import Separator from '@/components/common/Separator.tsx';

import type { Reservation } from '@/type/reservation.ts';
import { useMutation, useMutationState, useQuery, useQueryClient } from '@tanstack/react-query';
import { cx } from 'class-variance-authority';

const POPOVER_WIDTH = 400;

//TODO url 상수화, 자동로그인 추가, 삭제 중인 카드 로딩 초링
const RESERVATION_DELETE_MUTATION_KEY = ['reservation'];

export default function Navbar() {
  const { isLogin, userId, logout } = useAuthContext();
  const queryClient = useQueryClient();
  const { data: reservations } = useQuery<Reservation[], CustomError>({
    queryKey: [`reservation`],
    queryFn: getReservation,
    enabled: isLogin,
    staleTime: Infinity,
  });

  const { mutate: requestDeleteReservation } = useMutation({
    mutationKey: RESERVATION_DELETE_MUTATION_KEY,
    mutationFn: deleteReservation,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['reservation'] });
    },
  });

  const deletingReservationIdList = useMutationState({
    filters: { mutationKey: RESERVATION_DELETE_MUTATION_KEY, status: 'pending' },
    select: (mutation) => mutation.state.variables,
  });

  const { mutate: requestLogout } = useMutation({
    mutationFn: postLogout,
    onError: () => {},
    onSuccess: () => {
      if (logout) logout();
    },
  });

  const handleLogOut = () => {
    requestLogout();
  };
  //TODO 예약 내역
  const isReservation = reservations && reservations.length > 0;
  return (
    <header className="flex w-full justify-between px-8 py-4">
      <Link to="/" className="flex items-center gap-5">
        <Icon iconName="Tickets" size={'big'} color={'primary'} />
        <span className="text-heading1 text-primary">RealTicket</span>
      </Link>
      {isLogin ? (
        <Popover.Root>
          <Popover.Trigger
            render={(togglePopover, triggerRef) => (
              <Button size="middle" intent={'ghost'} onClick={togglePopover} ref={triggerRef}>
                <Icon iconName="User" />
                <span className="text-label2 text-typo">{userId}</span>
                <Icon iconName="DownArrow" />
              </Button>
            )}
          />
          <Popover.Overlay>
            <Popover.Content>
              <div
                className={cx(
                  `w-[${POPOVER_WIDTH}px]`,
                  `flex flex-col gap-6 rounded-xl border bg-white p-6 shadow-2xl`,
                )}>
                <h3 className="px-4 text-left text-heading3">예매 현황</h3>
                <Separator direction="row" />
                <div className="flex flex-col gap-6">
                  {isReservation ? (
                    reservations.map((reservation) => (
                      <ReservationCard
                        {...reservation}
                        isDeleting={deletingReservationIdList.includes(reservation.id)}
                        handleDeleteReservation={() => requestDeleteReservation(reservation.id)}
                      />
                    ))
                  ) : (
                    <div className="w-full text-heading2 text-typo-sub">현재 예매된 내역이 없습니다. </div>
                  )}
                </div>
                <Separator direction="row" />
                <Button intent="ghost" size="middle" onClick={handleLogOut}>
                  <Icon iconName="LogOut" color="error" />
                  <span className="text-label1 text-error">로그아웃</span>
                </Button>
              </div>
            </Popover.Content>
          </Popover.Overlay>
        </Popover.Root>
      ) : (
        <nav className="flex gap-4">
          <Button intent={'outline'} color={'primary'} size={'middle'} asChild>
            <Link to={'/signUp'}>
              <span className="text-label2 text-primary">회원가입</span>
            </Link>
          </Button>
          <Button color={'primary'} size={'middle'} asChild>
            <Link to="/login">
              <span className="text-label2 text-typo-display">로그인</span>
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}

// const reservations = [
//   {
//     id: 1,
//     programName: '2024 WORLD TOUR',
//     runningDate: '1731258000000',
//     placeName: '고척 스타이돔',
//     seats: ['A구역 2행 3열', 'B구역 1행 5열'],
//   },
//   {
//     id: 2,
//     programName: '2024 KOREA TOUR',
//     runningDate: '1731420000000',
//     placeName: '예술의 전당 콘서트홀werwerwerwr',
//     seats: ['B구역 2행 3열', 'C구역 10행 15열', 'I구역 3행 17열'],
//   },
// ];