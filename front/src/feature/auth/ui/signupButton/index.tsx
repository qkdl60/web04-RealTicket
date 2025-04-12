import { Link } from 'react-router-dom';

import { Button } from '@/shared/components';

export function SignupButton({ size = 'middle' }: { size?: 'middle' | 'full' }) {
  return (
    <Button intent={'outline'} color={'primary'} size={size} asChild>
      <Link to={'/signup'}>
        <span className="text-label2 text-primary">회원가입</span>
      </Link>
    </Button>
  );
}
