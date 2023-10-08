import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import Button from '@mui/material/Button';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand h4" to="/">
          Vehicle Info Hub
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto justify-content-center text-end gap-2 mt-4 mt-md-0">
            {user ? (
              <li className="nav-item">
                <span className="nav-link">{user.email}</span>
              </li>
            ) : (
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                  Login
                </Button>
              </Link>
            )}

            {user ? (
              <li className="nav-item">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                >
                  Log out
                </Button>
              </li>
            ) : (
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" to="/signup">
                  Signup
                </Button>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
