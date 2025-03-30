import ReservationCard from '@/components/Navbar/ReservationCard.tsx';
import useUserInfoButton from '@/components/Navbar/useUserInfoButton.tsx';
import Button from '@/components/common/Button.tsx';
import Icon from '@/components/common/Icon.tsx';
import Popover from '@/components/common/Popover.tsx';
import Separator from '@/components/common/Separator.tsx';

import { cx } from 'class-variance-authority';

const POPOVER_WIDTH = 460;

export default function UserInfoButton() {
  const widthClass = `w-[${POPOVER_WIDTH}px]`;
  const {
    shortUserId,
    beReservation,
    reservationList,
    deletingReservationIdList,
    requestDeleteReservation,
    handleLogOut,
  } = useUserInfoButton();

  return (
    <Popover.Root>
      <Popover.Trigger
        render={(togglePopover, triggerRef) => (
          <Button size="middle" intent={'ghost'} onClick={togglePopover} ref={triggerRef}>
            <Icon iconName="User" />
            <span className="text-label2 text-typo">{`${shortUserId} 님`}</span>
            <Icon iconName="DownArrow" />
          </Button>
        )}
      />
      <Popover.Overlay>
        <Popover.Content>
          <div
            className={cx(
              widthClass,
              `flex max-h-[80vh] min-h-[300px] flex-col gap-6 rounded-xl border bg-white p-6 shadow-2xl`,
            )}>
            <h3 className="px-4 text-left text-heading3">예매 현황</h3>
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
            <Button intent="ghost" size="middle" onClick={handleLogOut}>
              <Icon iconName="LogOut" color="error" />
              <span className="text-label1 text-error">로그아웃</span>
            </Button>
          </div>
        </Popover.Content>
      </Popover.Overlay>
    </Popover.Root>
  );
}
