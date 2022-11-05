import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout = () => {
  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen">
      <Navigation />
      <div className="max-w-3xl mx-auto p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
