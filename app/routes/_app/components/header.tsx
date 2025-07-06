import { Link } from 'react-router';
import { ThemeToggle } from './theme-toggle';

const Header = () => {
  return (
    <header className="mb-4 flex items-center justify-between border-b pb-4">
      <Link to="/" className="flex items-center">
        <img
          src={`${import.meta.env.BASE_URL}favicons/android-chrome-192x192.png`}
          alt="TubeLoopPlayer logo"
          className="mr-2 w-8 h-8"
        />
        <h1 className="font-semibold text-2xl">AtmanHub</h1>
      </Link>
      <ThemeToggle />
    </header>
  );
};

export default Header;
