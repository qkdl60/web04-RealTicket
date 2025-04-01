/*
오픈 시간전 버튼 비활성화
오픈 후 버튼 활성화

RestTime 시간별 텍스트 변경

*/
import ReservationWaitingPageView from '@/pages/ReservationWaitingPage/ReservationWaitingPageView.tsx';
import RestTime from '@/pages/ReservationWaitingPage/RestTime.tsx';

import { EventInfo } from '@/type/index.ts';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('남은 시간별 텍스트 형태', () => {
  it('남은 시간이 100초 이상일 때', () => {
    render(<RestTime restTime={140_000} />);
    console.log(screen.debug());
    expect(screen.queryByText(/00시간 02분 20초/)).toBeInTheDocument();
  });
  it('남은 시간이 100초 미만일 때', () => {
    render(<RestTime restTime={60_000} />);
    expect(screen.getByText('060초')).toBeInTheDocument();
  });
  it('남은 시간이 0초 미만일 때', () => {
    render(<RestTime restTime={-100} />);
    expect(screen.getByText('000초')).toBeInTheDocument();
  });
});

describe('오픈 시간 버튼 상태 ', () => {
  const eventInfo: EventInfo = {
    name: 'Test Event',
    place: 'Test Place',
    runningTime: '2시간',
    date: '2024-03-20',
    time: '19:00',
    reservationOpenTime: '2024-03-19 10:00:00',
  };

  it('오픈 시간전 버튼 비활성화', () => {
    render(
      <ReservationWaitingPageView
        eventInfo={eventInfo}
        isReservationOpen={false}
        isReadyPlaceInfo={true}
        overviewImageURL={''}
        restTime={1000}
        canGoNextPage={false}
        permissionAndGoNextPage={() => {}}
      />,
    );
    const button = screen.getByRole('button', { name: '예매 대기중' });
    expect(button).toBeDisabled();
  });

  it('오픈 시간 후 버튼 활성화', () => {
    render(
      <ReservationWaitingPageView
        eventInfo={eventInfo}
        isReservationOpen={true}
        isReadyPlaceInfo={true}
        overviewImageURL={''}
        restTime={-100}
        canGoNextPage={true}
        permissionAndGoNextPage={() => {}}
      />,
    );
    const button = screen.getByRole('button', { name: '예매하기' });
    expect(button).toBeEnabled();
  });
});
