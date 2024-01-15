// import React from 'react'
// import "./LoginPage.css"
// import LoginComponent from './LoginComponent/LoginComponent'

// const LoginPage = () => {
//   return (
//     <div className="login-page">

//         <div className="left-container">

//             <div className="text-container">

//                 <div className="title-wrapper">
//                     Attendify
//                 </div>

//                 <div className="description-wrapper">
//                     Digitize attendance tracking.
//                 </div>

//             </div>
//         </div>

//         <div className="right-container">
//             <div className="overlapping-rectangles-container">

//                 <div className="rectangle-top">

//                     <LoginComponent/>

//                 </div>

//                 <div className="rectangle-bottom"></div>

//             </div>
//         </div>


//     </div>
//   )
// }

// export default LoginPage

import React from 'react';
import './LoginPage.css'; 

const LoginPage = () => {
  return (
    <div className="container">

    <div className="left-container">

        <div className="title-container">
            Attendify

        </div>

        <div className="description-container">
            <p>
                “ Streamline attendance tracking through digitization. "
            </p>

        </div>


    </div>

    <div className="right-container">
        
        <div className="top-rectangle">

            <div className="login-container">

                <div className="login-heading-wrapper">

                   <p>Login</p>

                </div><br/>

                <div className="username-wrapper">
                   <p> Username</p>
                    <input type="text" className="username-input-box"/>
                </div>


                <div className="password-wrapper">
                   <p>Password</p>
                    <input type="password" name="" id="" className="password-input-box"/>
                </div><br/><br/>

                <div className="login-button">
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