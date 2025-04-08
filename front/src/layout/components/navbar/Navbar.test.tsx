/**
 * 테스트 항목
 * 1. 로그인 여부에따라서 Navbar는 다르게 보인다.
 *
 *  로그인 상태
 *    1. UserInfoButton 클릭시 팝오버 된다 .
 *
 *  로그아웃상태
 *  4. 로그인, 회원가입, 버튼 확인
 *
 */
import { BrowserRouter } from 'react-router-dom';

import Navbar from '@/layout/components/navbar';
import { useAuthStore } from '@/shared/stores';
import type { AuthState } from '@/shared/stores';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

interface AuthStoreState extends AuthState {
  setAuth: (auth: { isLogin: boolean }) => void;
}

type Selector = (state: AuthStoreState) => AuthState;

type Mock = {
  mockImplementation: (fn: (selector: Selector) => AuthState) => void;
};

// Mock the auth store
vi.mock('@/stores/auth/authStore', () => ({
  useAuthStore: vi.fn((selector) =>
    selector({
      auth: { isLogin: false },
      action: {
        login: vi.fn(),
        logout: vi.fn(),
      },
      setAuth: vi.fn(),
    }),
  ),
}));

// Mock useQueryClient, useIsFetching, useQuery, useMutation, and useMutationState
vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({
    invalidateQueries: vi.fn(),
  }),
  useIsFetching: () => 0, // 기본적으로 로딩 중이 아님을 나타냄
  useQuery: () => ({
    data: [], // 빈 예약 목록 반환
    isLoading: false,
    error: null,
  }),
  useMutation: () => ({
    mutate: vi.fn(),
    isLoading: false,
    error: null,
  }),
  useMutationState: () => [], // 삭제 중인 예약 ID 목록이 비어있음을 나타냄
}));

// Mock ConfirmContext
vi.mock('@/hooks/useConfirm', () => ({
  default: () => ({
    confirmValue: null,
    setConfirm: vi.fn(),
    clearConfirm: vi.fn(),
  }),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Navbar view 확인', () => {
  (useAuthStore as unknown as Mock).mockImplementation((selector: Selector) =>
    selector({
      auth: { isLogin: false, userId: null },
      action: {
        login: vi.fn(),
        logout: vi.fn(),
      },
      setAuth: vi.fn(),
    }),
  );
  it('로그 아웃 상태 버튼 확인', () => {
    // Mock auth store to return logged out state
    renderWithRouter(<Navbar />);
    expect(screen.getByText('로그인')).toBeInTheDocument();
    expect(screen.getByText('회원가입')).toBeInTheDocument();
    expect(screen.getByText('게스트로 입장하기')).toBeInTheDocument();
  });

  it('로그인 상태 버튼 확인', () => {
    // Mock auth store to return logged in state
    (useAuthStore as unknown as Mock).mockImplementation((selector: Selector) =>
      selector({
        auth: { isLogin: true, userId: 'test-user-id' },
        action: { login: vi.fn(), logout: vi.fn() },
        setAuth: vi.fn(),
      }),
    );

    renderWithRouter(<Navbar />);
    expect(screen.getByText('test-user-id 님')).toBeInTheDocument();
  });
});
