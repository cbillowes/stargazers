import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import useUser from '../hooks/useUser';

const Navigation = () => {
  const { user } = useUser();

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
            {!user && (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <Link to="/profile">{user.email}</Link>
                </li>
                <li>
                  <button
                    onClick={async () => {
                      await signOut(getAuth());
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
