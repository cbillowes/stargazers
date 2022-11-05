import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-blue-900 text-blue-300 py-2 px-5">
      <div className="max-w-3xl flex justify-between mx-auto">
        <div>
          <ul className="flex space-x-5">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex space-x-5">
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
