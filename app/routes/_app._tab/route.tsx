import { Outlet } from 'react-router';
import { Separator } from '~/components/ui/separator';
import { AppNavLink } from './components/app-nav-link';

const AppTabLayout = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-2">
        <AppNavLink to="/">Apps</AppNavLink>
        <AppNavLink to="/blogs">Blogs</AppNavLink>
        <AppNavLink to="/games">Games</AppNavLink>
      </div>
      <Separator />
      <div className="py-4">
        <Outlet />
      </div>
    </>
  );
};

export default AppTabLayout;
