import React, { useEffect } from "react";
import "./MainContent.css";
import StudentComponent from "../StudentComponent/StudentComponent";
import Sidebar from "../sidebar/Sidebar";
import NavBar from "../navbar/NavBar";
// import { useNavigate } from "react-router-dom";
// import { useJwt } from "react-jwt";

// const token = "my JWT"

const MainContent = () => {
  // const navigate = useNavigate()

  // const {decodedToken, isExpired} = useJwt(token)

  // useEffect(() => {

  //   const cookies = document.cookie



  // }, [navigate])

  return (
    <>
      <div className="main-content">
        <NavBar />

        {/* contains sidebar and the students display area */}
        <div className="sidebar-students-display-area">
          <Sidebar />

          <div className="students-display-area">
          <div className="students-text-wrapper">Students</div>
            No Students Found
            <StudentComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
