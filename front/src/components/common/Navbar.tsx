import { Link } from 'react-router-dom';

// import { useAuthContext } from '@/hooks/useAuthContext.tsx';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Popover from '@/components/common/Popover';
import Separator from '@/components/common/Separator.tsx';

import { getDate } from '@/utils/getDate.ts';

import { cx } from 'class-variance-authority';

const POPOVER_WIDTH = 400;

const isSignIn = true;
const userId = 'test112';

const reservations = [
  {
    id: '1',
    name: '2024 WORLD TOUR',
    runningDate: '1731258000000',
    place: '고척 스타이돔',
    seats: ['A구역 2행 3열', 'B구역 1행 5열'],
  },
  {
    id: '1',
    name: '2024 KOREA TOUR',
    runningDate: '1731420000000',
    place: '예술의 전당 콘서트홀werwerwerwr',
    seats: ['B구역 2행 3열', 'C구역 10행 15열', 'I구역 3행 17열'],
  },
];
export default function Navbar() {
  // const { isSignIn } = useAuthContext();

  return (
    <header className="flex w-full justify-between px-8 py-4">
      <Link to="/" className="flex items-center gap-5">
        <Icon iconName="Tickets" size={'big'} color={'primary'} />
        <span className="text-heading1 text-primary">RealTicket</span>
      </Link>
      {isSignIn ? (
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
                  {reservations.map((reservation) => (
                    <ReservationCard {...reservation} />
                  ))}
                </div>
                <Separator direction="row" />
                <Button intent="ghost" size="middle">
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
            <Link to="/signIn">
              <span className="text-label2 text-typo-display">로그인</span>
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
interface IReservation {
  id: string;
  name: string;
  runningDate: string;
  place: string;
  seats: string[];
}

function ReservationCard({ id, name, runningDate, place, seats }: IReservation) {
  //TODO api 처리 요청
  return (
    <div className="relative w-full rounded-xl border border-surface-cardBorder bg-surface-card p-6">
      <div className="flex max-w-[calc(100%-64px)] flex-col gap-6 text-left">
        <h3 className="truncate text-display1">{name}</h3>
        <div className="">
          <div className="truncate text-display1">{getDate(Number(runningDate))}</div>
          <div className="truncate text-display1 hover:overflow-visible hover:text-clip">{`공연장 : ${place}`}</div>
        </div>
        <div>
          <span className="truncate text-display1">좌석</span>
          <ul>
            {seats.map((seat) => (
              <li>{seat}</li>
            ))}
          </ul>
        </div>
      </div>
      <Button
        className="absolute right-0 top-0 mr-6 mt-6"
        intent={'outline'}
        size={'fit'}
        color={'error'}
        onClick={() => {
          console.log(id + '삭제 api 요청, 로딩 처리 ');
        }}>
        <Icon iconName="Trash" color={'error'} />
      </Button>
    </div>
  );
}