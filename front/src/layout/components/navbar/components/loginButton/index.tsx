import { Link } from 'react-router-dom';

import Button from '@/components/common/Button.tsx';

export default function LoginButton() {
  return (
    <Button color={'primary'} size={'middle'} asChild>
      <Link to="/login">
        <span className="text-label2 text-typo-display">로그인</span>
      </Link>
    </Button>
  );
}
