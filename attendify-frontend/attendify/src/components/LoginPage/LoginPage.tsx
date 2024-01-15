import React from 'react'
import "./LoginPage.css"
import "./background-image.png"
import LoginComponent from './LoginComponent/LoginComponent'

const LoginPage = () => {
  return (
    <div className="login-page">

        <div className="left-container">

            <div className="text-container">

                <div className="title-wrapper">
                    Attendify
                </div>

                <div className="description-wrapper">
                    Digitize attendance tracking.
                </div>

            </div>
        </div>

        <div className="right-container">
            <div className="overlapping-rectangles-container">

                <div className="rectangle-top">

                    <LoginComponent/>

                </div>

                <div className="rectangle-bottom"></div>

            </div>
        </div>


    </div>
  )
}

export default LoginPage