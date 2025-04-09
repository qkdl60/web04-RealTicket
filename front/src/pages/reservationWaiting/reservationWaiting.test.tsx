/*
오픈 시간전 버튼 비활성화
오픈 후 버튼 활성화

RestTime 시간별 텍스트 변경

TODO 훅 테스트 추가 

*/
import { EventInfo } from '@/shared/types/data';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ReservationWaitingPageView } from './ui';

describe('오픈 시간 버튼 상태 테스트', () => {
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
