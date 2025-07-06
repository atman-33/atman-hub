import { Outlet } from 'react-router';
import Footer from '~/routes/_app/components/footer';
import Header from './components/header';
import { Profile } from './components/profile';

const AppLayout = () => {
  return (
    <>
      <div className="container mx-auto p-4">
        <Header />
        <Profile
          imageUrl="/profile.jpg"
          bio="Software Engineer specializing in web development and AI applications."
          socialLinks={[
            {
              name: 'GitHub',
              url: 'https://github.com/atman',
              icon: <span className="i-mdi-github text-2xl" />,
            },
            {
              name: 'Twitter',
              url: 'https://twitter.com/atman',
              icon: <span className="i-mdi-twitter text-2xl" />,
            },
            {
              name: 'LinkedIn',
              url: 'https://linkedin.com/in/atman',
              icon: <span className="i-mdi-linkedin text-2xl" />,
            },
          ]}
        />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
