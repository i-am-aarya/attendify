import React, { useState } from "react";
import "./LoginComponent.css";
import "crypto-js";
import CryptoJS from "crypto-js";
import Base64 from "crypto-js/enc-base64";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [userpassword, setUserPassword] = useState("");
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [areCredentialsCorrect, setAreCredentialsCorrect] = useState(false);

  function checkIfFormFilled() {
    setIsFormFilled(username && userpassword ? true : false);
  }

  function handleSubmit(event: any) {
      event.preventDefault();

      const response = fetch("http://localhost:8080/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: Base64.stringify(CryptoJS.SHA512(userpassword)),
        }),
        credentials: "include",
      }).catch((error) => {
        console.error(error);
      });

      // check response and update page accordingly
  }

  return (
    <div className="login-component">
      <div className="login-heading">Login</div>

      <form onSubmit={handleSubmit}>
        <div className="credentials-input-container">
          <label htmlFor="userName" className="input-label">
            Username
          </label>
          <input
            id="userName"
            type="text"
            className="username-input-box"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              checkIfFormFilled();
            }}
          />


          <label htmlFor="passWord" className="input-label">
            Password
          </label>
          <input
            id="passWord"
            type="password"
            className="password-input-box"
            placeholder="Enter Password"
            value={userpassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
              checkIfFormFilled();
            }}
          />
          <div className="divider"></div>
        </div>
        <div className="form-submit-response">
          {areCredentialsCorrect && <span>Check Password & Try Again</span>}
        </div>
        <button
          type="submit"
          className={
            username && userpassword ? "login-button" : "login-button-disabled"
          }
          disabled={!isFormFilled}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
