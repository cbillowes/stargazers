import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout = () => {
  return (
    <div className="bg-slate-900 text-slate-300">
      <Navigation />
      <div className="max-w-3xl mx-auto py-5 px-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
