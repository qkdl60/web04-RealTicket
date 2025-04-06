/*
  좌석 선택시 반영 여부, 올바른 정보 확인

  좌석 취소 여부 확인

 좌석 개수 변경시 좌석 선택 초기화 여부 확인


  좌석 개수 초과 여부 확인

  
 좌석 선택 완료시 예매 버튼 활성화 여부 확인

*/
import { ConfirmProvider } from '@/app/providers/confirmProvider';
import { SeatCount } from '@/type/reservation.ts';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import SectionAndSeat from './';

const withRender = (children: React.ReactNode) => render(<ConfirmProvider>{children}</ConfirmProvider>);

//TODO init 부분 분리 필요
vi.mock('@/hooks/useConfirm', () => ({
  default: vi.fn().mockReturnValue({
    confirm: vi.fn().mockReturnValue(true),
    cancel: vi.fn(),
  }),
}));
vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn().mockReturnValue({
    mutate: vi.fn((_, { onSuccess, onSettled }) => {
      onSuccess?.();
      onSettled?.();
    }),
    isPending: false,
  }),
  useQueryClient: vi.fn(),
  useMutationState: vi.fn().mockReturnValue([]),
}));
vi.mock('@/hooks/usePreventLeave', () => ({
  default: vi.fn().mockImplementation(() => {
    return {
      block: vi.fn(), // 페이지 이동을 차단하는 함수
      unblock: vi.fn(), // 차단 해제 함수
    };
  }),
}));
vi.mock('@/hooks/useSSE', () => ({
  default: vi.fn().mockReturnValue({
    data: {
      seatStatus: [[true, true, true]],
    },
    isLoading: false,
  }),
}));
vi.mock(`@/api/booking`, () => ({
  postSeat: vi.fn().mockResolvedValue({ data: true }),
  postSeatCount: vi.fn().mockResolvedValue({ data: true }),
}));
const mockProps = {
  seatCount: 2 as SeatCount,
  goNextStep: vi.fn(),
  setReservationResult: vi.fn(),
  event: {
    id: 1,
    name: 'test',
    price: 10000,
    place: {
      id: 1,
      name: 'test',
    },
    runningTime: 100,
    runningDate: new Date(),
    reservationOpenDate: new Date(),
    reservationCloseDate: new Date(),
  },
  placeInformation: {
    id: 1,
    layout: {
      overview: 'test',
      overviewWidth: 100,
      overviewHeight: 100,
      overviewPoints: '[{"id":"A","points":[[931,1050],[2431,1050],[2431,1661.374],[931,1661.374]]}]',
      sections: [
        {
          id: 1,
          name: 'A',
          seats: [true, true, true],
          colLen: 3,
        },
      ],
    },
  },
  setSeatCount: vi.fn(),
};
const user = userEvent.setup();

describe('좌석 선택 테스트', () => {
  it('섹션 선택 후 좌석 선택 배치 및 좌석 상태 확인 선택, 취소 기능 테스트', async () => {
    withRender(<SectionAndSeat {...mockProps} />);
    const sectionList = screen.getAllByRole('radio', { name: 'A 섹션 선택' });
    const section = sectionList[0];
    await user.click(section);
    const seat = screen.getByRole('button', { name: /1행 1열/ });
    expect(seat).toBeInTheDocument();
    expect(seat).toBeEnabled();

    await user.click(seat);
    expect(seat).toHaveClass('bg-success');

    await user.click(seat);
    expect(seat).toHaveClass('bg-primary');
  });

  it('좌석 선택 후 좌석 개수 변경 시 좌석 선택 초기화', async () => {
    withRender(<SectionAndSeat {...mockProps} />);
    const sectionList = screen.getAllByRole('radio', { name: 'A 섹션 선택' });
    const section = sectionList[0];
    await user.click(section);

    const seat = screen.getByRole('button', { name: /1행 1열/ });
    await user.click(seat);
    expect(seat).toHaveClass('bg-success');

    const seatCountSelector = screen.getByText('2매');
    await user.click(seatCountSelector);

    const oneCountOption = screen.getByText(/1매/);
    await user.click(oneCountOption);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/));

    expect(seat).toHaveClass('bg-primary');
  });

  it('좌석 개수 이상 좌석 선택x, 모든 좌석 선택 완료시 완료 버튼 활성화 ', async () => {
    withRender(<SectionAndSeat {...mockProps} seatCount={1 as SeatCount} />);
    const sectionList = screen.getAllByRole('radio', { name: 'A 섹션 선택' });
    const section = sectionList[0];
    await user.click(section);

    const disableBookingButton = screen.getByRole('button', { name: /좌석을 모두 선택해주세요/ });

    expect(disableBookingButton).toBeInTheDocument();
    expect(disableBookingButton).toBeDisabled();
    const seat1 = screen.getByRole('button', { name: /1행 1열/ });
    const seat2 = screen.getByRole('button', { name: /1행 2열/ });
    await user.click(seat1);

    await waitFor(() => expect(seat1).toHaveClass('bg-success'));

    await user.click(seat2);

    expect(seat1).toHaveClass('bg-success');
    expect(seat2).toHaveClass('bg-primary');

    const completeButton = screen.getByRole('button', { name: /예매하기/ });
    expect(completeButton).toBeInTheDocument();
    expect(completeButton).toBeEnabled();
  });
});
