import React, { useState } from "react";
import "./LoginComponent.css";
import "crypto-js";
import CryptoJS from "crypto-js";
import Base64 from "crypto-js/enc-base64";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState("");
  const [userpassword, setUserPassword] = useState("");
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [areCredentialsCorrect, setAreCredentialsCorrect] = useState(false);

  function checkIfFormFilled() {
    setIsFormFilled(userEmail && userpassword ? true : false);
  }

  const handleSubmit = async (event: any) => {
      event.preventDefault();

      console.log(JSON.stringify({
        emailID: userEmail,
        password: Base64.stringify(CryptoJS.SHA512(userpassword)),
      }))

      try {
        const response = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailID: userEmail,
            password: Base64.stringify(CryptoJS.SHA512(userpassword)),
          }),
        })

        const data = await response.json()

        console.log(data)

        if (data.login) {
          navigate("/dashboard")
        }

      } catch (error) {
        console.error("Error during login: ", error)
      }

  }

  return (
    <div className="login-component">
      <div className="login-heading">Login</div>

      <form onSubmit={handleSubmit}>
        <div className="credentials-input-container">
          <label htmlFor="userEmail" className="input-label">
            userEmail
          </label>
          <input
            id="userEmail"
            type="text"
            className="email-input-box"
            placeholder="Enter userEmail"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
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
            userEmail && userpassword ? "login-button" : "login-button-disabled"
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
