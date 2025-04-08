import { GuestLoginButton, LoginButton, SignupButton } from '@/feature/auth/ui';
import { UserInfoButton } from '@/feature/user/ui';
import { LogoButton } from '@/shared/components';
import { useAuthStore } from '@/shared/stores';

export function Header() {
  const { isLogin } = useAuthStore((state) => state.auth);
  return (
    <header className="flex w-full justify-between bg-white px-8 py-4">
      <LogoButton />
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
