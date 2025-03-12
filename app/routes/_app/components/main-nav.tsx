import { Link } from 'react-router';
import { Logo } from '~/components/shared/logo';

export const MainNav = () => {
  return (
    <div className="hidden md:flex">
      <Link to="/">
        <Logo />
      </Link>
    </div>
  );
};
