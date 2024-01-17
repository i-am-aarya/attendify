import React, { useState, ChangeEvent } from 'react';
import './LoginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setError('');
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginClick = () => {
    // Validate if the email ends with "ncit.edu.np"
    const isGmail = /@ncit.edu\.np$/.test(email);

    if (isGmail) {
      // Perform login logic
      console.log('Login successful');
    } else {
      setError('Please enter a valid college email');
    }
  };

  return (
    <div className="container">
      <div className="left-container">
        <div className="title-container">Attendify</div>
        <div className="description-container">
          <p>Streamline attendance tracking through digitization.</p>
        </div>
      </div>

      <div className="right-container">
        <div className="top-rectangle">
          <div className="login-container">
            <div className="login-heading-wrapper">
              <p>Login</p>
            </div>

            <div className="username-wrapper">
              <p>Email</p>
              <input
                type="text"
                className="username-input-box"
                value={email}
                onChange={handleEmailChange}
              />
              {error && <div className="error-message">{error}</div>}
            </div>
            <br />

            <div className="password-wrapper">
              <p>Password</p>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="password-input-box"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <div className="toggle-password" onClick={handleTogglePassword}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </div>
              </div>
            </div>

            <div className="login-button" onClick={handleLoginClick}>
              <p>Login</p>
            </div>
          </div>
        </div>

        <div className="bottom-rectangle"></div>
      </div>
    </div>
  );
};

export default LoginPage;
