import { Link } from 'react-router';
import { ThemeToggle } from './theme-toggle';

const Header = () => {
  return (
    <header className="mb-8 flex items-center justify-between pb-6 border-b border-white/20">
      <Link
        to="/"
        className="flex items-center group transition-all duration-300 hover:scale-105"
      >
        <div className="relative mr-3">
          <img
            src={`${import.meta.env.BASE_URL}favicons/android-chrome-192x192.png`}
            alt="AtmanHub logo"
            className="w-10 h-10 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </div>
        <h1 className="font-bold text-3xl gradient-text tracking-tight">
          AtmanHub
        </h1>
      </Link>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
