import { Outlet } from 'react-router';
import { AppNavLink } from './components/app-nav-link';

const AppTopLayout = () => {
  return (
    <>
      <div className="flex gap-12 rounded-md bg-foreground/5 px-8">
        <AppNavLink to="/">Blog</AppNavLink>
        <AppNavLink to="/Apps">Apps</AppNavLink>
        <AppNavLink to="/Tags">Tags</AppNavLink>
      </div>
      <div className="py-4">
        <Outlet />
      </div>
    </>
  );
};

export default AppTopLayout;
