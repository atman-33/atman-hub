import { Outlet } from 'react-router';
import { AppNavLink } from './components/app-nav-link';

const AppTopLayout = () => {
  return (
    <>
      <div className="flex gap-12">
        <AppNavLink to="/">Blog</AppNavLink>
        <AppNavLink to="/Apps">Apps</AppNavLink>
        <AppNavLink to="/Tags">Tags</AppNavLink>
      </div>
      <Outlet />
    </>
  );
};

export default AppTopLayout;
