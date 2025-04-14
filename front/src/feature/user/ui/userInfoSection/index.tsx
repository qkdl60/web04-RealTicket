import { ReservationCard } from '@/feature/reservation/ui';
import { Button, Icon, Separator } from '@/shared/components';
import { cx } from 'class-variance-authority';

import { useUserInfo } from '../../hooks';

export function UserInfoSection() {
  const {
    reservationList,
    handleLogOut,
    deletingReservationIdList,
    requestDeleteReservation,
    beReservation,
    shortUserId,
  } = useUserInfo();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Icon iconName="User" />
        <span className="text-label2 text-typo">{`${shortUserId} 님`}</span>
      </div>
      <div className={cx(`flex max-h-[80vh] min-h-[300px] flex-col gap-6 rounded-xl bg-white`)}>
        <h3 className="text-left text-heading3">예매 현황</h3>
        <Separator direction="row" />
        <div className="flex max-h-[800px] flex-grow flex-col gap-6 overflow-y-scroll pr-4">
          {beReservation ? (
            reservationList!.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                {...reservation}
                isDeleting={deletingReservationIdList.includes(reservation.id)}
                handleDeleteReservation={() => requestDeleteReservation(reservation.id)}
              />
            ))
          ) : (
            <div className="m-auto w-full text-heading2 text-typo-sub">현재 예매된 내역이 없습니다. </div>
          )}
        </div>
        <Separator direction="row" />
      </div>

      <Button color={'error'} size="full" onClick={handleLogOut}>
        <Icon iconName="LogOut" color="display" />
        <span className="text-label1 text-typo-display">로그아웃</span>
      </Button>
    </div>
  );
}
