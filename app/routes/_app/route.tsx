import { Link, Outlet } from 'react-router';

// --- Layout

const AppLayout = () => {
  return (
    <>
      <div className="flex justify-center bg-gray-100 p-4">
        <Link to="/" className="mr-4">
          <div className="font-bold text-xl">React Router v7 Boilerplate</div>
        </Link>
      </div>
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
