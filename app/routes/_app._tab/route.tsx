import { Outlet } from 'react-router';
import { Separator } from '~/components/ui/separator';
import { AppNavLink } from './components/app-nav-link';

const AppTabLayout = () => {
  return (
    <>
      <div className="flex gap-12 rounded-md px-8 text-sm">
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
