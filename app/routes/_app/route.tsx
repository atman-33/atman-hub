import { Outlet } from 'react-router';
import Footer from '~/routes/_app/components/footer';
import Header from './components/header';
import { Profile } from './components/profile';

const AppLayout = () => {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              icon: <span className="i-mdi-github text-xl" />,
            },
            {
              name: 'Twitter',
              url: 'https://twitter.com/atman',
              icon: <span className="i-mdi-twitter text-xl" />,
            },
            {
              name: 'LinkedIn',
              url: 'https://linkedin.com/in/atman',
              icon: <span className="i-mdi-linkedin text-xl" />,
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
