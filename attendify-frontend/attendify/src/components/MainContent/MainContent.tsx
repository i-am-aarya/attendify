import React from "react";
import "./MainContent.css";
import StudentComponent from "../StudentComponent/StudentComponent";
import Sidebar from "../sidebar/Sidebar";
import NavBar from "../navbar/NavBar";

const MainContent = () => {
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
