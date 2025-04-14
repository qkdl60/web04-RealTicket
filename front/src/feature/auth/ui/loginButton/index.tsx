import { Link } from 'react-router-dom';

import { Button } from '@/shared/components';

export function LoginButton({ size = 'middle' }: { size?: 'middle' | 'full' }) {
  return (
    <Button color={'primary'} size={size} asChild>
      <Link to="/login">
        <span className="text-label2 text-typo-display">로그인</span>
      </Link>
    </Button>
  );
}
