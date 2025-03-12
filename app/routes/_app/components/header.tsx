import type { User } from '@prisma/client';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router';
import { siteConfig } from '~/config/site-config';
import { LoginButton } from './login-button';
import { MainNav } from './main-nav';
import { SearchButton } from './search-button';
import { ThemeDropdown } from './theme-dropdown';

interface HeaderProps {
  user: Omit<User, 'password'> | undefined;
}

export const Header = ({ user }: HeaderProps) => {
  return (
    <header className="top-0 z-50 mx-auto flex justify-center border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 flex h-14 w-full items-center justify-center md:container md:w-10/12">
        <MainNav />
        {/* <MobileNav docsConfig={docsConfig} /> */}
        <Link to="/">
          <span className="ml-2 text-nowrap font-bold text-lg md:text-xl">
            {siteConfig.name}
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* <CommandMenu /> */}
          </div>
          <nav className="hidden items-center sm:flex sm:gap-4">
            <div className="w-6">
              <SearchButton />
            </div>
            <div className="w-6">
              <ThemeDropdown />
            </div>
            <Link to={siteConfig.links.github} target="_blank" rel="noreferrer">
              <FaGithub className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              to={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
          </nav>
          <div className="ml-4 flex items-center">
            <LoginButton user={user} />
          </div>
        </div>
      </div>
    </header>
  );
};
