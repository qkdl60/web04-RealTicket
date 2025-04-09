import { Link } from 'react-router-dom';

import { Button } from '@/shared/components';

export function SignupButton() {
  return (
    <Button intent={'outline'} color={'primary'} size={'middle'} asChild>
      <Link to={'/signup'}>
        <span className="text-label2 text-primary">회원가입</span>
      </Link>
    </Button>
  );
}
