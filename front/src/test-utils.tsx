import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient();

export const withRender = (target: ReactElement) =>
  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>{target}</QueryClientProvider>
    </BrowserRouter>,
  );

export const setupUser = () => userEvent.setup();

export const selectDateAndTime = async (dateIndex: number = 0, timeIndex: number = 0) => {
  const user = setupUser();

  // 날짜 선택
  const dateList = await screen.findAllByRole('radio');
  const dateRadio = dateList[dateIndex];
  await user.click(dateRadio);

  // 시간 선택
  const timeList = await screen.findAllByRole('radio');
  const timeRadio = timeList[timeList.length - 1 - timeIndex];
  await user.click(timeRadio);

  return { user, dateRadio, timeRadio };
};

export const waitForLoadingToFinish = async () => {
  await screen.findByRole('heading', { name: /프로그램 상세/i });
};
