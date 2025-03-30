import GuestLoginButton from '@/components/Navbar/GuestLoginButton.tsx';
import HeaderLogo from '@/components/Navbar/HeaderLogo.tsx';
import LoginButton from '@/components/Navbar/LoginButton.tsx';
import SignupButton from '@/components/Navbar/SignupButton.tsx';
import UserInfoButton from '@/components/Navbar/UserInfoButton.tsx';

import { useAuthStore } from '@/stores/auth/authStore.ts';

export default function Navbar() {
  const { isLogin } = useAuthStore((state) => state.auth);
  return (
    <header className="flex w-full justify-between bg-white px-8 py-4">
      <HeaderLogo />
      {isLogin ? (
        <UserInfoButton />
      ) : (
        <nav className="flex gap-4">
          <GuestLoginButton />
          <SignupButton />
          <LoginButton />
        </nav>
      )}
    </header>
  );
}
