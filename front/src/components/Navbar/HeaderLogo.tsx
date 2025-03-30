import { Link } from 'react-router-dom';

import Icon from '@/components/common/Icon.tsx';

export default function HeaderLogo() {
  return (
    <Link to="/" className="flex items-center gap-5">
      <Icon iconName="Tickets" size={'big'} color={'primary'} />
      <span className="text-heading1 text-primary">RealTicket</span>
    </Link>
  );
}
