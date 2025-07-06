import { Outlet } from 'react-router';
import { AppNavLink } from './components/app-nav-link';

const AppTabLayout = () => {
  return (
    <>
      <div className="flex justify-center gap-8 border-b">
        <AppNavLink to="/">Apps</AppNavLink>
        <AppNavLink to="/blogs">Blogs</AppNavLink>
      </div>
      <div className="py-6 animate-fade-in animate-duration-500">
        <Outlet />
      </div>
    </>
  );
};

export default AppTabLayout;
