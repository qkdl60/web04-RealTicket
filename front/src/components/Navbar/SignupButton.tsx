import { Link } from 'react-router-dom';

import Button from '@/components/common/Button.tsx';

export default function SignupButton() {
  return (
    <Button intent={'outline'} color={'primary'} size={'middle'} asChild>
      <Link to={'/signUp'}>
        <span className="text-label2 text-primary">회원가입</span>
      </Link>
    </Button>
  );
}
