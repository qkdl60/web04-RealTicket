import { useAuthStore } from '@/shared/stores';

import GuestLoginButton from './components/guestLoginButton';
import HeaderLogo from './components/headerLogo';
import LoginButton from './components/loginButton';
import SignupButton from './components/signupButton';
import UserInfoButton from './components/userInfoButton';

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
