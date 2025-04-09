/*
filterEventsByDate 유닛
getDateList 유닛
getTimeList 유닛
getSelectedEvent 유닛


 날짜/시간 필터링 로직
 날짜선택시 시간 필터링
 시간 선택시 예매하기 버튼 활성화

*/
import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { getDateList } from '@/pages/programDetail/utils/getDateList';
import { getSelectedEvent } from '@/pages/programDetail/utils/getSelectedEvent';
import { getTimeList } from '@/pages/programDetail/utils/getTimeList';

import { server } from '@/mocks/server.ts';
import { ProgramEvent } from '@/shared/types/data.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { ProgramDetailPage } from './index.tsx';

describe('ProgramDetailPage unittest', () => {
  const events: ProgramEvent[] = [
    {
      id: 1,
      runningDate: new Date('2024-03-20T19:00:00'),
    },
    {
      id: 2,
      runningDate: new Date('2024-03-21T19:00:00'),
    },
    {
      id: 3,
      runningDate: new Date('2024-03-20T20:00:00'),
    },
  ];

  it('getDateList 유닛', () => {
    const dateList = getDateList(events);
    expect(dateList).toEqual([
      new Date('2024-03-20T10:00:00.000Z'),
      new Date('2024-03-20T11:00:00.000Z'),
      new Date('2024-03-21T10:00:00.000Z'),
    ]);
    expect(dateList).not.toEqual([
      new Date('2024-03-20T10:00:00.000Z'),
      new Date('2024-03-21T10:00:00.000Z'),
      new Date('2024-03-20T11:00:00.000Z'),
    ]);
  });

  it('getTimeList 유닛 날짜 정렬', () => {
    const timeList = getTimeList(events, new Date('2024-03-20T10:00:00.000Z'));
    expect(timeList).toEqual(['19:00', '20:00']);
    expect(timeList).not.toEqual(['20:00', '19:00']);
  });

  it('getSelectedEvent 유닛', () => {
    const selectedEvent = getSelectedEvent(events, new Date('2024-03-20T10:00:00.000Z'), '19:00');
    expect(selectedEvent).toEqual({
      id: 1,
      runningDate: new Date('2024-03-20T10:00:00.000Z'),
    });
  });
});
const queryClient = new QueryClient();
const withRender = (target: ReactElement) =>
  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>{target}</QueryClientProvider>
    </BrowserRouter>,
  );
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useParams: () => ({ programId: '1' }),
  createBrowserRouter: () => vi.fn(),
  RouterProvider: () => vi.fn(),
  Outlet: () => vi.fn(),
  Navigate: () => vi.fn(),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('ProgramDetailPage 통합 테스트 ', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
  it('날짜 선택 라디오 렌더링', async () => {
    withRender(<ProgramDetailPage />);
    await screen.findAllByText('날짜');
    const dateList = screen.getAllByRole('radio');
    expect(dateList).toHaveLength(2);
  });

  it('날짜 선택시 시간 라디오 렌더링', async () => {
    withRender(<ProgramDetailPage />);
    const user = userEvent.setup();
    const dateList = screen.getAllByRole('radio');
    expect(dateList).toHaveLength(2);
    const date1 = dateList[0];
    // 날짜 선택
    await user.click(date1);
    const radioList = screen.getAllByRole('radio');
    expect(radioList).toHaveLength(3);
  });

  it('날짜,시간 선택시 예매하기 버튼 활성화', async () => {
    withRender(<ProgramDetailPage />);
    const user = userEvent.setup();
    const dateList = screen.getAllByRole('radio');
    expect(dateList).toHaveLength(2);
    const date1 = dateList[0];
    // 날짜 선택
    await user.click(date1);
    const radioList = screen.getAllByRole('radio');
    expect(radioList).toHaveLength(3);
    const time1 = radioList[radioList.length - 1];
    // 시간 선택
    await user.click(time1);
    const button = screen.getByRole('button', { name: '예매하기' });
    expect(button).toBeEnabled();
  });
});
