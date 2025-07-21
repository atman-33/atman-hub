import { Outlet } from 'react-router';
import { AppNavLink } from './components/app-nav-link';

const AppTabLayout = () => {
  return (
    <>
      {/* Modern tab navigation with glass effect */}
      <div className="flex justify-center mb-8">
        <div className="glass rounded-2xl p-2 border-white/20">
          <div className="flex gap-2">
            <AppNavLink to="/">Apps</AppNavLink>
            <AppNavLink to="/blogs">Blogs</AppNavLink>
          </div>
        </div>
      </div>

      <div className="animate-fade-in animate-duration-700 animate-delay-200">
        <Outlet />
      </div>
    </>
  );
};

export default AppTabLayout;
