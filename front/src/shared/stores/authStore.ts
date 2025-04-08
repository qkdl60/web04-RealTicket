import { create } from 'zustand';

type Auth = {
  isLogin: boolean;
  userId: string | null;
};
type AuthAction = {
  login: (id: string) => void;
  logout: () => void;
};

export type AuthState = {
  auth: Auth;
  action: AuthAction;
};

export const useAuthStore = create<AuthState>()((set) => ({
  auth: { isLogin: false, userId: null },
  action: {
    login: (id: string) => set(() => ({ auth: { isLogin: true, userId: id } })),
    logout: () => set(() => ({ auth: { isLogin: false, userId: null } })),
  },
}));
