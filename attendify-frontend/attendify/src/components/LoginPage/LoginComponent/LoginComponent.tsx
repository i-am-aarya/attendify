import React, { useState } from "react";
import "./LoginComponent.css";
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

      try {
        const response = await fetch(
          "http://localhost:8080/login",
          {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            emailID: userEmail,
            password: userpassword,
          }),
        })

        console.log(response)

        const responseData = await response.json()

        console.log(responseData)


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
