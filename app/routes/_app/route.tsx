import { Outlet } from 'react-router';
import GithubIcon from '~/components/icons/github-icon';
import XIcon from '~/components/icons/x-icon';
import { siteConfig } from '~/config/site-config';
import Footer from '~/routes/_app/components/footer';
import Header from './components/header';
import { Profile } from './components/profile';

const AppLayout = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto pt-6 px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Glass container for main content */}
          <div className="glass rounded-3xl p-8 mb-8">
            <Header />
            <Profile
              imageUrl={siteConfig.profileImageUrl}
              bio={
                <>
                  Hello, I'm{' '}
                  <span className="gradient-text font-semibold">Atman</span> — a
                  software engineer focused on developing practical apps through
                  personal projects.
                  <br />
                  Thanks for visiting!
                </>
              }
              socialLinks={[
                {
                  name: 'GitHub',
                  url: siteConfig.githubUrl,
                  icon: <GithubIcon className="w-8 h-8" />,
                },
                {
                  name: 'X',
                  url: siteConfig.xUrl,
                  icon: <XIcon className="w-8 h-8" />,
                },
              ]}
            />
          </div>

          {/* Content area with glass effect */}
          <div className="glass rounded-3xl p-8 mb-8 animate-fade-in animate-duration-700">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
