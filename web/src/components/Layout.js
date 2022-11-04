import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import '../styles.css';

const Layout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Layout;
