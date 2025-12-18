import { Link } from 'react-router-dom';
import logo from './idlelogo.png';
import './Header.css';

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="home-icon">
          <img src={logo} alt='idle-notes' />
        </Link>
      </div>
      <div className="header-right">
        {isLoggedIn ? (
          <Link className="header-link" onClick={onLogout}>
            Logout
          </Link>
        ) : (
          <>
            <Link to="/login" className="header-link">Login</Link>
            <Link to="/signup" className="header-link">Signup</Link>
          </>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
