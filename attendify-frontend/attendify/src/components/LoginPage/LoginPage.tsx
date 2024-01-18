import React, { useState, ChangeEvent, useEffect } from 'react';
import './LoginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface LoginResponse {
  token: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginClick = async (event: React.FormEvent) => {
    event.preventDefault()

    // Validate if the email ends with "ncit.edu.np"
    const isGmail = /@ncit.edu\.np$/.test(email);

    if (!isGmail) {
      setEmailError('Please enter a valid college email');
      return
    }
    if(!password.trim()){
      setPasswordError('Please enter your password');
      return;
    }

    console.log("Request can be sent")

    try {
      const response = await axios.post<LoginResponse>('http://localhost:8080/login', {
        emailID: email,
        password: password
      })

      localStorage.setItem('token', response.data.token)
      const decodedToken = jwtDecode(response.data.token)

      console.log(decodedToken)

      navigate('/dashboard')


    } catch (error) {
      console.error(error)
    }

  };

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/dashboard')
    }
  })

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
                onChange={(e) => {setEmail(e.target.value); setEmailError('')}}
              />
              {emailError && <div className="email-error">{emailError}</div>}
            </div><br/>

            <div className="password-wrapper">
              <p>Password</p>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="password-input-box"
                  value={password}
                  onChange={(e) => {setPassword(e.target.value); setPasswordError('')}}
                />
                <div className="toggle-password" onClick={handleTogglePassword}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </div>
              </div>
              {passwordError && <div className="password-error">{passwordError}</div>}
            </div>

            <button type="submit" className="login-button" onClick={handleLoginClick}>
              Login
            </button>
            
          </div>
        </div>

        <div className="bottom-rectangle"></div>
      </div>
    </div>
  );
};

export default LoginPage;