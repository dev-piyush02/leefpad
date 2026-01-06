import { Link } from 'react-router-dom';
import logo from './idlelogo.png';
import './Header.css';

const Header = ({ isLoggedIn, onLogout, theme, toggleTheme }) => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="home-icon">
          <img src={logo} alt='idle-notes' />
        </Link>
      </div>
      <div className="header-right">
        {isLoggedIn ? (
          <button className="header-link" onClick={onLogout}>
            Logout
          </button>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="header-link">Login</Link>
            <Link to="/signup" className="header-link">Signup</Link>
          </div>
        )}
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
