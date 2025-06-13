import { Outlet } from 'react-router';
import { Separator } from '~/components/shadcn/ui/separator';
import { AppNavLink } from './components/app-nav-link';

const AppTopLayout = () => {
  return (
    <>
      <div className="flex gap-12 rounded-md px-8 text-sm">
        <AppNavLink to="/">Posts</AppNavLink>
        <AppNavLink to="/Apps">Apps</AppNavLink>
        <AppNavLink to="/Tags">Tags</AppNavLink>
      </div>
      <Separator />
      <div className="py-4">
        <Outlet />
      </div>
    </>
  );
};

export default AppTopLayout;
