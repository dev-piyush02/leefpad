import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { login } from '../../services/public-services';
import { toast } from 'react-toastify';

const Login = ({ onLogin }) => {
  const [userData, setUserData] = useState({
    userid: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event, prop) => {
    setUserData({ ...userData, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.userid || !userData.password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      const resp = await login(userData);
      localStorage.setItem('loginFlag', resp);
      toast.success('Welcome !!');
      onLogin();
      navigate('/');
      setUserData({ userid: '', password: '' });
      setError('');
    } catch (err) {
      toast.error('Please check userid and password !!');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name:</label><br />
          <input
            type="text"
            value={userData.userid}
            onChange={(e) => handleChange(e, 'userid')}
            placeholder="What is your unique userid ??"
          />
        </div>
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={userData.password}
            onChange={(e) => handleChange(e, 'password')}
            placeholder="Not lookin, I swear !!"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
