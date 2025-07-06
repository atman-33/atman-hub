import { Outlet } from 'react-router';
import GithubIcon from '~/components/icons/github-icon';
import XIcon from '~/components/icons/x-icon';
import Footer from '~/routes/_app/components/footer';
import Header from './components/header';
import { Profile } from './components/profile';

const AppLayout = () => {
  return (
    <>
      <div className="container mx-auto pt-4 px-4 sm:px-6 lg:px-8">
        <Header />
        <Profile
          imageUrl="/profile.jpg"
          bio={
            <>
              Hello, I'm Atman — a software engineer focused on developing
              practical apps through personal projects.
              <br />
              Thanks for visiting!
            </>
          }
          socialLinks={[
            {
              name: 'GitHub',
              url: 'https://github.com/atman',
              icon: <GithubIcon className="w-5 h-5" />,
            },
            {
              name: 'X',
              url: 'https://twitter.com/atman',
              icon: <XIcon className="w-5 h-5" />,
            },
          ]}
        />
        <div className="animate-fade-in animate-duration-500">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
